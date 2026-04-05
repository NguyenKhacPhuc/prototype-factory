const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#EFF6FF',
    text: '#0F172A',
    textMuted: '#475569',
    textLight: '#94A3B8',
    border: '#E2E8F0',
    primary: '#2563EB',
    secondary: '#3B82F6',
    cta: '#F97316',
    cardBg: '#FFFFFF',
    navBg: '#FFFFFF',
    inputBg: '#F1F5F9',
    groveBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EDE9FE 100%)',
  },
  dark: {
    bg: '#0F172A',
    surface: '#1E293B',
    surfaceAlt: '#172554',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    textLight: '#64748B',
    border: '#334155',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    cta: '#F97316',
    cardBg: '#1E293B',
    navBg: '#0F172A',
    inputBg: '#334155',
    groveBg: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #172554 100%)',
  },
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeScreen, setActiveScreen] = useState('grove');
  const [promptInput, setPromptInput] = useState('');
  const [promptSubmitted, setPromptSubmitted] = useState(false);
  const [promptTab, setPromptTab] = useState('today');

  const t = isDark ? themes.dark : themes.light;

  const keyframeStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@300;400;500;600;700&display=swap');

    @keyframes floatOrb {
      0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
      33% { transform: translateY(-18px) translateX(12px) scale(1.06); }
      66% { transform: translateY(10px) translateX(-8px) scale(0.94); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.65; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    @keyframes rotateRingCW {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    @keyframes rotateRingCCW {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.85; }
      50% { transform: scale(1.04); opacity: 1; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(24px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .echo-card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.14); }
    .prompt-card-hover:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .nav-btn:hover { background: rgba(37,99,235,0.09); }
    .stream-card:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    textarea { outline: none; }
    button { outline: none; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.25); border-radius: 2px; }
  `;

  // ─── GROVE SCREEN ───────────────────────────────────────────────────────────
  function GroveScreen() {
    const orbs = [
      { c: '#2563EB', s: 110, top: '14%', left: '18%', d: '0s',   dur: '8s'  },
      { c: '#F97316', s:  75, top: '38%', left: '62%', d: '1.4s', dur: '10s' },
      { c: '#3B82F6', s:  58, top: '58%', left: '22%', d: '2.8s', dur: '7s'  },
      { c: '#10B981', s:  88, top: '22%', left: '68%', d: '0.6s', dur: '12s' },
      { c: '#8B5CF6', s:  48, top: '72%', left: '54%', d: '2.0s', dur: '9s'  },
      { c: '#F59E0B', s:  38, top: '82%', left: '34%', d: '3.5s', dur: '6s'  },
      { c: '#EC4899', s:  32, top: '8%',  left: '52%', d: '1.0s', dur: '11s' },
    ];
    const recentEchoes = [
      { type: 'Color',   text: 'Dusty rose gradient at horizon line',    time: '2h ago', swatch: '#F9A8D4' },
      { type: 'Sound',   text: 'Rain on leaves, rhythmic and unhurried',  time: '1d ago', swatch: '#93C5FD' },
      { type: 'Texture', text: 'Rough bark contrasting smooth wet moss',  time: '2d ago', swatch: '#6EE7B7' },
    ];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', fontFamily: "'Poppins', sans-serif", animation: 'fadeInUp 0.35s ease' } },
      // ── Header
      React.createElement('div', { style: { padding: '20px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' } }, 'Spring Season · Week 3'),
          React.createElement('h1', { style: { fontFamily: "'Righteous', cursive", fontSize: '26px', color: t.text, fontWeight: '400' } }, 'Your Grove'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: '42px', height: '42px', borderRadius: '13px', background: t.surface, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms' },
        }, React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 18, color: t.primary })),
      ),
      // ── Grove Canvas
      React.createElement('div', {
        style: { margin: '0 16px', height: '238px', borderRadius: '22px', background: t.groveBg, position: 'relative', overflow: 'hidden', border: `1px solid ${t.border}` },
      },
        ...orbs.map((o, i) => React.createElement('div', {
          key: i,
          style: { position: 'absolute', width: o.s, height: o.s, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${o.c}cc, ${o.c}33)`, top: o.top, left: o.left, animation: `floatOrb ${o.dur} ${o.d} ease-in-out infinite`, filter: 'blur(1.5px)' },
        })),
        React.createElement('div', { style: { position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', border: '2px solid rgba(37,99,235,0.28)', top: '50%', left: '50%', animation: 'rotateRingCW 22s linear infinite' } }),
        React.createElement('div', { style: { position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid rgba(249,115,22,0.35)', top: '50%', left: '50%', animation: 'rotateRingCCW 16s linear infinite' } }),
        React.createElement('div', { style: { position: 'absolute', width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #F97316)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'pulseGlow 3s ease-in-out infinite', boxShadow: '0 0 32px rgba(37,99,235,0.55)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: '11px', left: '12px', background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(8px)', borderRadius: '8px', padding: '4px 10px' } },
          React.createElement('p', { style: { color: '#fff', fontSize: '11px', fontFamily: "'Poppins', sans-serif" } }, 'Live Generative Grove · 47 Active Echoes'),
        ),
        React.createElement('div', { style: { position: 'absolute', top: '11px', right: '12px', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', borderRadius: '9px', padding: '4px 10px' } },
          React.createElement('p', { style: { color: '#fff', fontSize: '11px', fontWeight: '600', fontFamily: "'Poppins', sans-serif" } }, 'Lvl 7 Grove'),
        ),
      ),
      // ── Stats Row
      React.createElement('div', { style: { display: 'flex', gap: '10px', padding: '14px 16px' } },
        ...[
          { label: 'Echoes',    value: '47',  Icon: window.lucide.Sparkles, color: '#2563EB' },
          { label: 'Resonance', value: '312', Icon: window.lucide.Waves,    color: '#F97316' },
          { label: 'Streak',    value: '12d', Icon: window.lucide.Flame,    color: '#10B981' },
        ].map((s, i) => React.createElement('div', {
          key: i,
          style: { flex: 1, background: t.cardBg, borderRadius: '15px', padding: '13px 8px', textAlign: 'center', border: `1px solid ${t.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
        },
          React.createElement(s.Icon, { size: 18, color: s.color }),
          React.createElement('p', { style: { fontSize: '19px', fontWeight: '700', color: t.text, fontFamily: "'Righteous', cursive", marginTop: '4px' } }, s.value),
          React.createElement('p', { style: { fontSize: '10px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' } }, s.label),
        )),
      ),
      // ── Today's Prompt CTA
      React.createElement('div', {
        onClick: () => setActiveScreen('prompts'),
        style: { margin: '0 16px 14px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, borderRadius: '18px', padding: '16px', cursor: 'pointer', transition: 'all 200ms' },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', { style: { flex: 1, marginRight: '10px' } },
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.72)', fontSize: '10px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '5px' } }, "Today's Echo Prompt"),
            React.createElement('p', { style: { color: '#fff', fontSize: '14px', fontWeight: '600', lineHeight: '1.45' } }, '"Describe the quality of light you see right now..."'),
          ),
          React.createElement('div', { style: { width: '38px', height: '38px', borderRadius: '11px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(window.lucide.ArrowRight, { size: 18, color: '#fff' }),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '11px' } },
          React.createElement('div', { style: { width: '6px', height: '6px', borderRadius: '50%', background: '#FDE68A', animation: 'pulseGlow 2s infinite' } }),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.78)', fontSize: '11px' } }, 'New prompt available · 7h remaining'),
        ),
      ),
      // ── Recent Echoes
      React.createElement('div', { style: { padding: '0 16px 20px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '16px', color: t.text, fontWeight: '400', marginBottom: '11px' } }, 'Your Recent Echoes'),
        ...recentEchoes.map((e, i) => React.createElement('div', {
          key: i,
          className: 'echo-card-hover',
          style: { display: 'flex', alignItems: 'center', gap: '11px', padding: '12px', background: t.cardBg, borderRadius: '13px', marginBottom: '8px', border: `1px solid ${t.border}`, transition: 'all 200ms', cursor: 'pointer' },
        },
          React.createElement('div', { style: { width: '42px', height: '42px', borderRadius: '11px', background: e.swatch, flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '10px', color: t.primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' } }, e.type + ' Echo'),
            React.createElement('p', { style: { fontSize: '13px', color: t.text, lineHeight: '1.35' } }, e.text),
          ),
          React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, flexShrink: 0 } }, e.time),
        )),
      ),
    );
  }

  // ─── PROMPTS SCREEN ─────────────────────────────────────────────────────────
  function PromptsScreen() {
    const prompts = [
      { title: 'The Quality of Light', desc: "Describe the exact quality of light you're experiencing right now. Is it sharp or diffuse? Warm or cold? What does it illuminate that it shouldn't?", cat: 'Light & Shadow', pts: 15, color: '#F97316', Icon: window.lucide.Sun, bg: isDark ? 'linear-gradient(135deg,#7C2D12,#78350F)' : 'linear-gradient(135deg,#FED7AA,#FEF3C7)' },
      { title: 'Urban Sound Portrait', desc: 'Close your eyes. What is the furthest sound you can hear? What is the closest? Describe both and the charged silence between.', cat: 'Sound & Silence', pts: 20, color: '#2563EB', Icon: window.lucide.Mic, bg: isDark ? 'linear-gradient(135deg,#1E3A8A,#2E1065)' : 'linear-gradient(135deg,#DBEAFE,#EDE9FE)' },
      { title: 'Surface Conversation', desc: 'Find a surface near you and describe its texture in 3 unexpected words—then explain why those words chose you.', cat: 'Texture & Touch', pts: 12, color: '#10B981', Icon: window.lucide.Fingerprint, bg: isDark ? 'linear-gradient(135deg,#064E3B,#022C22)' : 'linear-gradient(135deg,#D1FAE5,#ECFDF5)' },
    ];
    const pastEchoes = [
      { prompt: 'Cloud Texture Study',   echo: 'Cotton pulled thin, like silence made visible',                              date: 'Yesterday'  },
      { prompt: 'Morning Sound Map',     echo: 'Distant traffic hum beneath birdsong, layered like geological strata',       date: '2 days ago' },
      { prompt: 'Color Palette at Dusk', echo: 'Burnt sienna bleeding into violet, with one defiant orange thread',          date: '3 days ago' },
    ];
    const seasonalThemes = [
      { title: 'Lunar Cycle Observations', weeks: '4–6', locked: false, color: '#8B5CF6', Icon: window.lucide.Moon   },
      { title: 'Urban Bloom Watch',        weeks: '7–9', locked: true,  color: '#F97316', Icon: window.lucide.Leaf   },
      { title: 'Solstice Sound Archive',   weeks: '10–13', locked: true, color: '#10B981', Icon: window.lucide.Wind  },
    ];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', fontFamily: "'Poppins', sans-serif", animation: 'fadeInUp 0.35s ease' } },
      React.createElement('div', { style: { padding: '20px 16px 14px' } },
        React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' } }, 'Spring · Week 3 of 13'),
        React.createElement('h1', { style: { fontFamily: "'Righteous', cursive", fontSize: '26px', color: t.text, fontWeight: '400' } }, 'Ephemera Prompts'),
      ),
      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: '8px', padding: '0 16px 14px' } },
        ...[['today', 'Today'], ['seasonal', 'Seasonal'], ['history', 'History']].map(([id, label]) =>
          React.createElement('button', {
            key: id, onClick: () => setPromptTab(id),
            style: { flex: 1, padding: '9px 4px', borderRadius: '11px', border: `1px solid ${promptTab === id ? t.primary : t.border}`, background: promptTab === id ? t.primary : t.surface, color: promptTab === id ? '#fff' : t.textMuted, fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 200ms' },
          }, label),
        ),
      ),
      // Today tab
      promptTab === 'today' && React.createElement('div', { style: { padding: '0 16px', animation: 'fadeInUp 0.3s ease' } },
        // Featured prompt card
        React.createElement('div', { style: { background: prompts[0].bg, borderRadius: '22px', padding: '20px', marginBottom: '14px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '11px' } },
            React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: prompts[0].color, borderRadius: '9px', padding: '5px 10px' } },
              React.createElement(prompts[0].Icon, { size: 13, color: '#fff' }),
              React.createElement('span', { style: { color: '#fff', fontSize: '11px', fontWeight: '600' } }, prompts[0].cat),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(249,115,22,0.14)', borderRadius: '8px', padding: '4px 8px' } },
              React.createElement(window.lucide.Star, { size: 12, color: '#F97316' }),
              React.createElement('span', { style: { color: '#F97316', fontSize: '11px', fontWeight: '600' } }, `+${prompts[0].pts} pts`),
            ),
          ),
          React.createElement('h2', { style: { fontFamily: "'Righteous', cursive", fontSize: '21px', color: t.text, fontWeight: '400', marginBottom: '8px' } }, prompts[0].title),
          React.createElement('p', { style: { fontSize: '14px', color: t.textMuted, lineHeight: '1.6', marginBottom: '16px' } }, prompts[0].desc),
          // Input / submitted state
          promptSubmitted
            ? React.createElement('div', { style: { background: 'linear-gradient(135deg,#10B981,#059669)', borderRadius: '13px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeInUp 0.3s ease' } },
                React.createElement(window.lucide.CheckCircle, { size: 20, color: '#fff' }),
                React.createElement('div', null,
                  React.createElement('p', { style: { color: '#fff', fontWeight: '600', fontSize: '13px' } }, 'Echo released to the Grove!'),
                  React.createElement('p', { style: { color: 'rgba(255,255,255,0.78)', fontSize: '11px', marginTop: '2px' } }, 'Your echo is weaving into the ecosystem'),
                ),
              )
            : React.createElement('div', null,
                React.createElement('textarea', {
                  value: promptInput, onChange: e => setPromptInput(e.target.value),
                  placeholder: 'What do you observe? Write freely, without judgment...',
                  style: { width: '100%', minHeight: '78px', borderRadius: '13px', border: `1px solid ${t.border}`, padding: '12px', fontSize: '14px', fontFamily: "'Poppins', sans-serif", color: t.text, background: t.inputBg, resize: 'none', lineHeight: '1.5' },
                }),
                React.createElement('button', {
                  onClick: () => { if (promptInput.trim()) setPromptSubmitted(true); },
                  style: { marginTop: '10px', width: '100%', padding: '14px', borderRadius: '13px', border: 'none', background: promptInput.trim() ? 'linear-gradient(135deg,#F97316,#FB923C)' : t.inputBg, color: promptInput.trim() ? '#fff' : t.textMuted, fontSize: '14px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: promptInput.trim() ? 'pointer' : 'default', transition: 'all 200ms' },
                }, 'Release Echo to Grove'),
              ),
        ),
        // Other prompts
        React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '16px', color: t.text, fontWeight: '400', marginBottom: '11px' } }, 'More Today'),
        ...prompts.slice(1).map((p, i) => React.createElement('div', {
          key: i, className: 'prompt-card-hover',
          style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: t.cardBg, borderRadius: '15px', marginBottom: '10px', border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'all 200ms' },
        },
          React.createElement('div', { style: { width: '46px', height: '46px', borderRadius: '13px', background: `${p.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(p.Icon, { size: 21, color: p.color }),
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '10px', color: p.color, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' } }, p.cat),
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '600', color: t.text } }, p.title),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '3px' } },
            React.createElement(window.lucide.Star, { size: 13, color: '#F97316' }),
            React.createElement('span', { style: { fontSize: '12px', color: '#F97316', fontWeight: '600' } }, `+${p.pts}`),
          ),
        )),
        React.createElement('div', { style: { height: '20px' } }),
      ),
      // Seasonal tab
      promptTab === 'seasonal' && React.createElement('div', { style: { padding: '0 16px 20px', animation: 'fadeInUp 0.3s ease' } },
        React.createElement('div', { style: { background: isDark ? 'linear-gradient(135deg,#1E3A5F,#172554)' : 'linear-gradient(135deg,#EFF6FF,#EDE9FE)', borderRadius: '18px', padding: '18px', marginBottom: '12px', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '9px' } },
            React.createElement(window.lucide.TreePine, { size: 20, color: t.primary }),
            React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '18px', color: t.text, fontWeight: '400' } }, 'Spring Awakening'),
          ),
          React.createElement('p', { style: { fontSize: '13px', color: t.textMuted, lineHeight: '1.65', marginBottom: '12px' } }, 'The Spring season brings prompts focused on emergence, new beginnings, and the delicate quality of natural light. Complete all 13 weeks to unlock the Aurora Weave aesthetic.'),
          React.createElement('div', { style: { background: t.inputBg, borderRadius: '8px', height: '6px', overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: '35%', background: 'linear-gradient(90deg,#2563EB,#F97316)', borderRadius: '8px' } }),
          ),
          React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, marginTop: '6px' } }, '5 of 13 weeks complete'),
        ),
        ...seasonalThemes.map((st, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: t.cardBg, borderRadius: '15px', marginBottom: '10px', border: `1px solid ${t.border}`, opacity: st.locked ? 0.55 : 1 },
        },
          React.createElement('div', { style: { width: '46px', height: '46px', borderRadius: '13px', background: `${st.color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(st.locked ? window.lucide.Lock : st.Icon, { size: 21, color: st.color }),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '14px', fontWeight: '600', color: t.text, marginBottom: '2px' } }, st.title),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, `Weeks ${st.weeks} · ${st.locked ? 'Locked' : 'Active'}`),
          ),
        )),
      ),
      // History tab
      promptTab === 'history' && React.createElement('div', { style: { padding: '0 16px 20px', animation: 'fadeInUp 0.3s ease' } },
        ...pastEchoes.map((item, i) => React.createElement('div', {
          key: i,
          style: { padding: '14px', background: t.cardBg, borderRadius: '15px', marginBottom: '10px', border: `1px solid ${t.border}`, animation: `fadeInUp ${0.15 + i * 0.1}s ease` },
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
            React.createElement('p', { style: { fontSize: '12px', color: t.primary, fontWeight: '600' } }, item.prompt),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, item.date),
          ),
          React.createElement('p', { style: { fontSize: '13px', color: t.text, fontStyle: 'italic', lineHeight: '1.55' } }, `"${item.echo}"`),
        )),
      ),
    );
  }

  // ─── CODEX SCREEN ───────────────────────────────────────────────────────────
  function CodexScreen() {
    const tiers = [
      { name: 'Seedling',    Icon: window.lucide.Sprout,     color: '#10B981', req: 0,   active: true  },
      { name: 'Sapling',     Icon: window.lucide.Leaf,       color: '#3B82F6', req: 75,  active: false },
      { name: 'Bloom',       Icon: window.lucide.Flower2,    color: '#EC4899', req: 175, active: false },
      { name: 'Weaver',      Icon: window.lucide.Layers,     color: '#8B5CF6', req: 350, active: false },
      { name: 'Grove Master',Icon: window.lucide.Crown,      color: '#F97316', req: 700, active: false },
    ];
    const swatches = [
      '#F9A8D4','#93C5FD','#6EE7B7','#FDE68A','#C4B5FD','#FCA5A5',
      '#67E8F9','#A7F3D0','#BBF7D0','#DDD6FE','#FED7AA','#FECDD3',
    ];
    const tools = [
      { name: 'Dusk Palette',      desc: 'Warm twilight hues for your echoes',        Icon: window.lucide.Palette   },
      { name: 'Whisper Typeface',  desc: 'Delicate font for subtle observations',      Icon: window.lucide.Type      },
      { name: 'Echo Bloom Filter', desc: 'Organic treatment for color submissions',    Icon: window.lucide.Sparkles  },
    ];
    const current = 47, nextAt = 75;
    const pct = Math.round((current / nextAt) * 100);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', fontFamily: "'Poppins', sans-serif", animation: 'fadeInUp 0.35s ease' } },
      React.createElement('div', { style: { padding: '20px 16px 14px' } },
        React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' } }, 'Your Journey'),
        React.createElement('h1', { style: { fontFamily: "'Righteous', cursive", fontSize: '26px', color: t.text, fontWeight: '400' } }, 'Echo Codex'),
      ),
      // Weaver tier hero
      React.createElement('div', { style: { margin: '0 16px 14px', background: 'linear-gradient(135deg,#2563EB 0%,#8B5CF6 100%)', borderRadius: '22px', padding: '20px', position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: '-28px', right: '-28px', width: '115px', height: '115px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.68)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' } }, 'Current Tier'),
            React.createElement('h2', { style: { fontFamily: "'Righteous', cursive", fontSize: '30px', color: '#fff', fontWeight: '400', marginBottom: '4px' } }, 'Seedling'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.68)', fontSize: '12px' } }, `${current} of ${nextAt} echoes to Sapling`),
          ),
          React.createElement('div', { style: { width: '58px', height: '58px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 3s ease-in-out infinite' } },
            React.createElement(window.lucide.Sprout, { size: 29, color: '#fff' }),
          ),
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: '8px', height: '8px', overflow: 'hidden', marginBottom: '7px' } },
          React.createElement('div', { style: { height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#fff,#FED7AA)', borderRadius: '8px', transition: 'width 1.2s ease' } }),
        ),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.68)', fontSize: '11px' } }, `${pct}% — ${nextAt - current} more echoes needed`),
      ),
      // Tier path
      React.createElement('div', { style: { padding: '0 16px 14px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '16px', color: t.text, fontWeight: '400', marginBottom: '11px' } }, 'Weaver Path'),
        React.createElement('div', { style: { display: 'flex', gap: '7px', overflowX: 'auto', paddingBottom: '4px' } },
          ...tiers.map((tier, i) => React.createElement('div', {
            key: i,
            style: { flexShrink: 0, width: '72px', padding: '12px 8px', borderRadius: '15px', background: tier.active ? `${tier.color}1a` : t.cardBg, border: `2px solid ${tier.active ? tier.color : t.border}`, textAlign: 'center', opacity: i > 1 ? 0.5 : 1, transition: 'all 200ms' },
          },
            React.createElement(tier.Icon, { size: 22, color: tier.color }),
            React.createElement('p', { style: { fontSize: '10px', fontWeight: '600', color: t.text, marginTop: '5px', lineHeight: '1.25' } }, tier.name),
            React.createElement('p', { style: { fontSize: '9px', color: tier.active ? tier.color : t.textMuted, fontWeight: tier.active ? '600' : '400', marginTop: '2px' } }, tier.active ? 'Current' : `${tier.req}`),
          )),
        ),
      ),
      // Echo collection
      React.createElement('div', { style: { padding: '0 16px 14px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '11px' } },
          React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '16px', color: t.text, fontWeight: '400' } }, 'Echo Collection'),
          React.createElement('span', { style: { fontSize: '12px', color: t.primary, fontWeight: '600' } }, '6/12'),
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' } },
          ...swatches.map((sw, i) => React.createElement('div', {
            key: i,
            style: { aspectRatio: '1', borderRadius: '11px', background: i < 6 ? sw : t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i < 6 ? 1 : 0.42, cursor: 'pointer', transition: 'all 200ms', animation: i < 6 ? `breathe ${3 + i * 0.3}s ease-in-out infinite` : 'none' },
          }, i >= 6 && React.createElement(window.lucide.Lock, { size: 12, color: t.textLight }))),
        ),
      ),
      // Unlocked tools
      React.createElement('div', { style: { padding: '0 16px 22px' } },
        React.createElement('h3', { style: { fontFamily: "'Righteous', cursive", fontSize: '16px', color: t.text, fontWeight: '400', marginBottom: '11px' } }, 'Unlocked Tools'),
        ...tools.map((tool, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '13px', background: t.cardBg, borderRadius: '14px', marginBottom: '9px', border: `1px solid ${t.border}` },
        },
          React.createElement('div', { style: { width: '42px', height: '42px', borderRadius: '12px', background: `${t.primary}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(tool.Icon, { size: 18, color: t.primary }),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: t.text, marginBottom: '2px' } }, tool.name),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, tool.desc),
          ),
        )),
      ),
    );
  }

  // ─── STREAM SCREEN ──────────────────────────────────────────────────────────
  function StreamScreen() {
    const [activeFilter, setActiveFilter] = useState('All');
    const items = [
      { weaver: 'morning.light',  tier: 'Sapling',     prompt: 'Urban Sound Portrait',   echo: 'The city breathes like a sleeping animal—distant sirens, then nothing. Then everything at once.', type: 'sound',    colors: ['#93C5FD','#6366F1','#A5B4FC'], res: 42,  time: '12m ago', typeColor: '#2563EB' },
      { weaver: 'threadbare.sky', tier: 'Bloom',        prompt: 'Quality of Light',       echo: 'Winter light has no ambition. It simply arrives, pale and honest, neither warming nor accusing.',  type: 'light',    colors: ['#FDE68A','#FEF3C7','#F9A8D4'], res: 87,  time: '34m ago', typeColor: '#F59E0B' },
      { weaver: 'velvet.grove',   tier: 'Weaver',       prompt: 'Surface Conversation',   echo: 'Cold stone remembers rain differently than we do. Patient. Without language.',                     type: 'texture',  colors: ['#6EE7B7','#A7F3D0','#D1FAE5'], res: 156, time: '1h ago',  typeColor: '#10B981' },
      { weaver: 'amber.drift',    tier: 'Seedling',     prompt: 'Color Palette at Dusk',  echo: 'Seven shades of one color, each a different kind of quiet.',                                        type: 'color',    colors: ['#FED7AA','#FB923C','#F97316'], res: 23,  time: '2h ago',  typeColor: '#F97316' },
      { weaver: 'soft.static',    tier: 'Sapling',      prompt: 'Lunar Cycle',            echo: 'New moon means visible stars means invisible ceiling means vertigo in the best possible way.',     type: 'celestial',colors: ['#DDD6FE','#8B5CF6','#4C1D95'], res: 61,  time: '3h ago',  typeColor: '#8B5CF6' },
    ];
    const filters = ['All', 'Sound', 'Light', 'Texture', 'Color', 'Celestial'];
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', fontFamily: "'Poppins', sans-serif", animation: 'fadeInUp 0.35s ease' } },
      React.createElement('div', { style: { padding: '20px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
        React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' } }, 'Collective'),
          React.createElement('h1', { style: { fontFamily: "'Righteous', cursive", fontSize: '26px', color: t.text, fontWeight: '400' } }, 'Resonance Stream'),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px', background: `${t.primary}14`, borderRadius: '10px', padding: '6px 10px' } },
          React.createElement('div', { style: { width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 2s infinite' } }),
          React.createElement('span', { style: { fontSize: '11px', color: t.primary, fontWeight: '600' } }, '2.1k weavers'),
        ),
      ),
      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: '7px', padding: '10px 16px 14px', overflowX: 'auto' } },
        ...filters.map((f, i) => React.createElement('button', {
          key: i, onClick: () => setActiveFilter(f),
          style: { flexShrink: 0, padding: '6px 14px', borderRadius: '20px', border: `1px solid ${activeFilter === f ? t.primary : t.border}`, background: activeFilter === f ? t.primary : t.surface, color: activeFilter === f ? '#fff' : t.textMuted, fontSize: '12px', fontWeight: '500', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 200ms' },
        }, f)),
      ),
      // Feed
      React.createElement('div', { style: { padding: '0 16px 20px' } },
        ...items.map((item, i) => React.createElement('div', {
          key: i, className: 'stream-card',
          style: { background: t.cardBg, borderRadius: '18px', marginBottom: '12px', border: `1px solid ${t.border}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 200ms', animation: `fadeInUp ${0.15 + i * 0.08}s ease` },
        },
          // Color strip
          React.createElement('div', { style: { display: 'flex', height: '5px' } },
            ...item.colors.map((c, j) => React.createElement('div', { key: j, style: { flex: 1, background: c } })),
          ),
          React.createElement('div', { style: { padding: '14px' } },
            // Header row
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '9px' } },
                React.createElement('div', { style: { width: '33px', height: '33px', borderRadius: '50%', background: `linear-gradient(135deg,${item.colors[0]},${item.colors[2]})` } }),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, item.weaver),
                  React.createElement('p', { style: { fontSize: '10px', color: item.typeColor, fontWeight: '600', marginTop: '1px' } }, item.tier + ' Weaver'),
                ),
              ),
              React.createElement('p', { style: { fontSize: '11px', color: t.textMuted } }, item.time),
            ),
            // Prompt tag
            React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '4px', background: `${item.typeColor}14`, borderRadius: '6px', padding: '3px 8px', marginBottom: '9px' } },
              React.createElement(window.lucide.BookOpen, { size: 11, color: item.typeColor }),
              React.createElement('span', { style: { fontSize: '10px', color: item.typeColor, fontWeight: '600' } }, item.prompt),
            ),
            // Echo text
            React.createElement('p', { style: { fontSize: '13px', color: t.text, fontStyle: 'italic', lineHeight: '1.65', marginBottom: '12px' } }, `"${item.echo}"`),
            // Actions row
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('button', { style: { display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 13px', borderRadius: '9px', border: `1px solid ${t.border}`, background: t.inputBg, cursor: 'pointer', transition: 'all 150ms' } },
                React.createElement(window.lucide.Waves, { size: 14, color: t.primary }),
                React.createElement('span', { style: { fontSize: '12px', color: t.text, fontFamily: "'Poppins', sans-serif", fontWeight: '600' } }, item.res),
              ),
              React.createElement('div', { style: { display: 'flex', gap: '7px' } },
                React.createElement('button', { style: { padding: '7px 10px', borderRadius: '9px', border: `1px solid ${t.border}`, background: t.inputBg, cursor: 'pointer' } },
                  React.createElement(window.lucide.Bookmark, { size: 14, color: t.textMuted }),
                ),
                React.createElement('button', { style: { padding: '7px 10px', borderRadius: '9px', border: `1px solid ${t.border}`, background: t.inputBg, cursor: 'pointer' } },
                  React.createElement(window.lucide.Share2, { size: 14, color: t.textMuted }),
                ),
              ),
            ),
          ),
        )),
      ),
    );
  }

  const screens = { grove: GroveScreen, prompts: PromptsScreen, codex: CodexScreen, stream: StreamScreen };
  const navItems = [
    { id: 'grove',   label: 'Grove',   Icon: window.lucide.TreePine   },
    { id: 'prompts', label: 'Prompts', Icon: window.lucide.Feather    },
    { id: 'codex',   label: 'Codex',   Icon: window.lucide.BookMarked },
    { id: 'stream',  label: 'Stream',  Icon: window.lucide.Waves      },
  ];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  },
    React.createElement('style', { dangerouslySetInnerHTML: { __html: keyframeStyles } }),
    // Phone frame
    React.createElement('div', {
      style: { width: '375px', height: '812px', background: t.bg, borderRadius: '44px', boxShadow: '0 30px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '8px solid #1a1a1a', transition: 'background 300ms' },
    },
      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' } },
        React.createElement(screens[activeScreen]),
      ),
      // Bottom Navigation
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', padding: '4px 8px 10px', transition: 'background 300ms' },
      },
        ...navItems.map(item => React.createElement('button', {
          key: item.id,
          className: 'nav-btn',
          onClick: () => setActiveScreen(item.id),
          style: { flex: 1, padding: '10px 4px 6px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', borderRadius: '12px', transition: 'all 150ms' },
        },
          React.createElement(item.Icon, { size: 22, color: activeScreen === item.id ? t.primary : t.textLight, strokeWidth: activeScreen === item.id ? 2.5 : 1.5 }),
          React.createElement('span', { style: { fontSize: '10px', fontFamily: "'Poppins', sans-serif", fontWeight: activeScreen === item.id ? '600' : '400', color: activeScreen === item.id ? t.primary : t.textLight, transition: 'all 150ms' } }, item.label),
          activeScreen === item.id && React.createElement('div', { style: { width: '4px', height: '4px', borderRadius: '50%', background: t.cta, marginTop: '-1px' } }),
        )),
      ),
    ),
  );
}
