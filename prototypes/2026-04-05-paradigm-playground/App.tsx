function App() {
  const { useState, useEffect, useRef } = React;

  const themes = {
    dark: {
      bg: '#0A0E1A',
      surface: '#111827',
      surface2: '#1A2235',
      surface3: '#1E2D40',
      border: '#1E3A5F',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      cardBg: '#131C2E',
      accent: '#1D4ED8',
      success: '#10B981',
      warning: '#F59E0B',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surface2: '#F1F5F9',
      surface3: '#E2E8F0',
      border: '#CBD5E1',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      cardBg: '#FFFFFF',
      accent: '#1D4ED8',
      success: '#059669',
      warning: '#D97706',
    },
  };

  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = themes[isDark ? 'dark' : 'light'];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Comic+Neue:wght@300;400;700&display=swap');
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 10px rgba(37, 99, 235, 0.3); }
      50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.6); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .pp-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,0.18) !important; }
    .pp-card { transition: all 0.2s ease; }
    .pp-btn:active { transform: scale(0.97); }
    .pp-btn { transition: all 0.15s ease; cursor: pointer; }
    .pp-tab:hover { opacity: 0.85; }
    .nav-tab { transition: all 0.2s ease; }
    .screen-anim { animation: fadeIn 0.3s ease; }
    .challenge-card:hover { border-color: #3B82F6 !important; }
    .challenge-card { transition: border-color 0.2s ease; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 4px; }
  `;

  // ── ICONS ──
  const Icon = ({ name, size = 20, color, style = {} }) => {
    const LucideIcon = window.lucide[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color: color || t.textSecondary, style, strokeWidth: 1.8 });
  };

  // ── HOME SCREEN ──
  function HomeScreen() {
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const challenges = [
      { id: 1, type: 'Haiku', topic: 'Quantum Entanglement', audience: 'A curious 8-year-old', difficulty: 'Medium', xp: 120, tag: 'Science' },
      { id: 2, type: 'Tweet Thread', topic: 'The French Revolution', audience: 'Gen-Z social media user', difficulty: 'Easy', xp: 80, tag: 'History' },
      { id: 3, type: 'CEO Memo', topic: 'Climate Change Economics', audience: 'Fortune 500 Board', difficulty: 'Hard', xp: 200, tag: 'Economics' },
    ];
    const diffColor = { Easy: '#10B981', Medium: '#F59E0B', Hard: '#EF4444' };

    return React.createElement('div', { className: 'screen-anim', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 12px', background: `linear-gradient(180deg, ${t.surface} 0%, transparent 100%)` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, color: t.textPrimary, lineHeight: 1.1 } }, 'Paradigm'),
            React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #2563EB, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 } }, 'Playground'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
            React.createElement('div', { onClick: () => setIsDark(!isDark), className: 'pp-btn', style: { width: 36, height: 36, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}` } },
              React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.secondary })
            ),
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: 'User', size: 16, color: '#fff' })
            ),
          )
        ),
        // Streak bar
        React.createElement('div', { style: { background: t.surface2, borderRadius: 14, padding: '12px 16px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12, animation: 'glow 3s ease infinite' } },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #F97316, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Flame', size: 22, color: '#fff' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.cta } }, '7-Day Remix Streak!'),
            React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, '3 challenges completed today'),
          ),
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, color: t.textPrimary } }, '7'),
        )
      ),

      // Today's Challenge
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 16, fontWeight: 700, color: t.textPrimary, marginBottom: 12 } }, "Today's Challenges"),
        challenges.map((c, i) =>
          React.createElement('div', {
            key: c.id, className: 'pp-card challenge-card',
            onClick: () => setActiveScreen('canvas'),
            style: {
              background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              animation: `slideUp ${0.3 + i * 0.1}s ease`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                React.createElement('div', { style: { background: t.surface2, borderRadius: 8, padding: '4px 8px' } },
                  React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, fontWeight: 700, color: t.secondary } }, c.tag),
                ),
                React.createElement('div', { style: { background: `${diffColor[c.difficulty]}22`, borderRadius: 8, padding: '4px 8px' } },
                  React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, fontWeight: 700, color: diffColor[c.difficulty] } }, c.difficulty),
                ),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Zap', size: 13, color: t.warning }),
                React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.warning } }, `+${c.xp} XP`),
              )
            ),
            React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 15, fontWeight: 700, color: t.textPrimary, marginBottom: 4 } },
              `Rewrite as a ${c.type}`
            ),
            React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textSecondary, marginBottom: 10 } },
              `Topic: "${c.topic}" • For: ${c.audience}`
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('div', { style: { width: 20, height: 20, borderRadius: 6, background: t.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: 'FileText', size: 11, color: t.textMuted })
                ),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, 'From your library'),
              ),
              React.createElement('div', { className: 'pp-btn', style: { background: 'linear-gradient(135deg, #2563EB, #3B82F6)', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 12, fontWeight: 700, color: '#fff' } }, 'Start Remix'),
                React.createElement(Icon, { name: 'ArrowRight', size: 12, color: '#fff' })
              )
            )
          )
        ),
      ),

      // Quick Stats
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 16, fontWeight: 700, color: t.textPrimary, marginBottom: 12 } }, 'Your Progress'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          [
            { icon: 'BookOpen', label: 'Remixes Created', val: '47', color: t.primary },
            { icon: 'Users', label: 'Community Likes', val: '312', color: t.cta },
            { icon: 'TrendingUp', label: 'Topics Mastered', val: '12', color: '#10B981' },
            { icon: 'Star', label: 'Level', val: 'Level 8', color: '#F59E0B' },
          ].map(s =>
            React.createElement('div', { key: s.label, className: 'pp-card', style: { background: t.cardBg, borderRadius: 14, padding: 14, border: `1px solid ${t.border}` } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 } },
                React.createElement(Icon, { name: s.icon, size: 18, color: s.color })
              ),
              React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 18, fontWeight: 800, color: t.textPrimary } }, s.val),
              React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.textMuted } }, s.label),
            )
          )
        )
      )
    );
  }

  // ── SOURCE SCRAMBLE SCREEN ──
  function SourceScreen() {
    const [inputText, setInputText] = useState('');
    const [parsed, setParsed] = useState(false);
    const sources = [
      { title: 'Quantum Computing Basics', type: 'Article', concepts: 8, date: '2 days ago', icon: 'Atom' },
      { title: 'The French Revolution', type: 'Wikipedia', concepts: 14, date: '1 week ago', icon: 'Globe' },
      { title: 'Climate Economics 101', type: 'Paper', concepts: 11, date: '2 weeks ago', icon: 'BookOpen' },
    ];

    return React.createElement('div', { className: 'screen-anim', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, color: t.textPrimary, marginBottom: 4 } }, 'Source Scramble'),
        React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textMuted, marginBottom: 20 } }, 'Ingest any content to remix'),
      ),

      // Paste area
      React.createElement('div', { style: { margin: '0 20px 20px' } },
        React.createElement('div', { style: { background: t.surface2, borderRadius: 16, padding: 16, border: `2px dashed ${parsed ? t.primary : t.border}`, transition: 'border-color 0.3s' } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textSecondary, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'FileInput', size: 16, color: t.secondary }),
            'Paste or type your content'
          ),
          React.createElement('textarea', {
            value: inputText,
            onChange: e => setInputText(e.target.value),
            placeholder: 'Paste an article, paper, meeting transcript, or any text you want to master...',
            style: {
              width: '100%', minHeight: 100, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: "'Comic Neue'", fontSize: 13, color: t.textPrimary, resize: 'none', lineHeight: 1.6,
              boxSizing: 'border-box',
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } },
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('div', { className: 'pp-btn', style: { background: t.surface3, borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Link', size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, 'URL'),
              ),
              React.createElement('div', { className: 'pp-btn', style: { background: t.surface3, borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Upload', size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, 'Upload'),
              ),
            ),
            React.createElement('div', {
              className: 'pp-btn', onClick: () => setParsed(true),
              style: { background: inputText ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : t.surface3, borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 12, fontWeight: 700, color: inputText ? '#fff' : t.textMuted } }, 'Parse'),
              React.createElement(Icon, { name: 'Wand2', size: 13, color: inputText ? '#fff' : t.textMuted }),
            )
          )
        ),
        parsed && React.createElement('div', { style: { marginTop: 12, background: `${t.success}15`, borderRadius: 12, padding: 12, border: `1px solid ${t.success}44`, animation: 'fadeIn 0.3s ease' } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.success, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'CheckCircle', size: 14, color: t.success }),
            '6 Key Concepts Extracted'
          ),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            ['Core argument', 'Key data points', 'Causal links', 'Counterpoints', 'Evidence', 'Context'].map(tag =>
              React.createElement('div', { key: tag, style: { background: `${t.primary}22`, borderRadius: 20, padding: '4px 10px' } },
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.secondary } }, tag)
              )
            )
          )
        )
      ),

      // Library
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 16, fontWeight: 700, color: t.textPrimary, marginBottom: 12 } }, 'Your Library'),
        sources.map(s =>
          React.createElement('div', { key: s.title, className: 'pp-card', style: { background: t.cardBg, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Icon, { name: s.icon, size: 20, color: t.secondary })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textPrimary } }, s.title),
                React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, `${s.type} • ${s.concepts} concepts • ${s.date}`)
              ),
              React.createElement('div', { className: 'pp-btn', onClick: () => setActiveScreen('canvas'), style: { width: 32, height: 32, borderRadius: 8, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'ArrowRight', size: 14, color: '#fff' })
              )
            )
          )
        )
      )
    );
  }

  // ── REMIX CANVAS SCREEN ──
  function CanvasScreen() {
    const [step, setStep] = useState('challenge');
    const [text, setText] = useState('');
    const [toneIdx, setToneIdx] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const tones = ['Academic', 'Casual', 'Poetic', 'Direct'];
    const templates = ['Hook → Context → Twist', '3-Act Narrative', 'Socratic Dialogue', 'Bullet Manifesto'];

    const handleSubmit = () => {
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
    };

    if (submitted) return React.createElement('div', { className: 'screen-anim', style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' } },
      React.createElement('div', { style: { width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 2s infinite' } },
        React.createElement(Icon, { name: 'CheckCircle', size: 40, color: '#fff' })
      ),
      React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 24, fontWeight: 800, color: t.textPrimary, marginBottom: 8 } }, 'Remix Published!'),
      React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 14, color: t.textSecondary, marginBottom: 8 } }, 'Your explanation has been shared with the community'),
      React.createElement('div', { style: { background: `${t.cta}22`, borderRadius: 12, padding: '10px 20px', marginBottom: 24 } },
        React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 18, fontWeight: 800, color: t.cta } }, '+120 XP Earned!')
      ),
      React.createElement('div', { className: 'pp-btn', onClick: () => { setSubmitted(false); setText(''); setStep('challenge'); setActiveScreen('gallery'); }, style: { background: 'linear-gradient(135deg, #2563EB, #3B82F6)', borderRadius: 12, padding: '14px 32px', cursor: 'pointer' } },
        React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 15, fontWeight: 700, color: '#fff' } }, 'View in Gallery')
      )
    );

    return React.createElement('div', { className: 'screen-anim', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '20px 20px 16px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 20, fontWeight: 800, color: t.textPrimary } }, 'Remix Canvas'),
          React.createElement('div', { style: { background: `${t.warning}22`, borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Zap', size: 13, color: t.warning }),
            React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.warning } }, '+120 XP')
          )
        ),
        React.createElement('div', { style: { background: t.surface2, borderRadius: 12, padding: 12, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.textMuted, marginBottom: 2 } }, 'CHALLENGE'),
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textPrimary } }, 'Write a Haiku about Quantum Entanglement'),
          React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted, marginTop: 2 } }, 'Audience: A curious 8-year-old • Format: 5-7-5 syllables'),
        )
      ),

      // Writing area
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.textSecondary, marginBottom: 8 } }, 'Your Remix'),
        React.createElement('div', { style: { background: t.surface2, borderRadius: 14, padding: 14, border: `1px solid ${text ? t.primary : t.border}`, transition: 'border-color 0.3s' } },
          React.createElement('textarea', {
            value: text,
            onChange: e => setText(e.target.value),
            placeholder: 'Start writing your haiku here...\n\nParticles entwined\nAcross the universe, linked\nDistance disappears',
            style: { width: '100%', minHeight: 120, background: 'transparent', border: 'none', outline: 'none', fontFamily: "'Comic Neue'", fontSize: 14, color: t.textPrimary, resize: 'none', lineHeight: 1.8, boxSizing: 'border-box' }
          }),
          text && React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginTop: 8 } },
            React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.textMuted } }, `${text.length} chars`)
          )
        ),

        // AI Tools Row
        React.createElement('div', { style: { marginTop: 14 } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.textSecondary, marginBottom: 8 } }, 'AI Writing Tools'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
            [
              { icon: 'Lightbulb', label: 'Analogy Prompt', color: '#F59E0B' },
              { icon: 'RefreshCw', label: 'Rephrase', color: '#10B981' },
              { icon: 'Volume2', label: 'Tone Adjust', color: '#8B5CF6' },
              { icon: 'Layout', label: 'Templates', color: '#EC4899' },
            ].map(tool =>
              React.createElement('div', { key: tool.label, className: 'pp-btn pp-card', style: { background: t.cardBg, borderRadius: 10, padding: '10px 12px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: `${tool.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: tool.icon, size: 14, color: tool.color })
                ),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, fontWeight: 700, color: t.textSecondary } }, tool.label)
              )
            )
          )
        ),

        // Tone selector
        React.createElement('div', { style: { marginTop: 14 } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.textSecondary, marginBottom: 8 } }, 'Tone'),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            tones.map((tone, i) =>
              React.createElement('div', {
                key: tone, className: 'pp-btn',
                onClick: () => setToneIdx(i),
                style: { background: i === toneIdx ? t.primary : t.surface2, borderRadius: 20, padding: '6px 12px', border: `1px solid ${i === toneIdx ? t.primary : t.border}` }
              },
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, fontWeight: 700, color: i === toneIdx ? '#fff' : t.textMuted } }, tone)
              )
            )
          )
        ),

        // Submit
        React.createElement('div', {
          className: 'pp-btn', onClick: handleSubmit,
          style: { marginTop: 20, background: text ? 'linear-gradient(135deg, #F97316, #EF4444)' : t.surface2, borderRadius: 14, padding: 16, textAlign: 'center', cursor: text ? 'pointer' : 'default', animation: submitting ? 'pulse 0.5s infinite' : 'none' }
        },
          React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 16, fontWeight: 800, color: text ? '#fff' : t.textMuted } },
            submitting ? 'Submitting...' : 'Publish Remix'
          )
        )
      )
    );
  }

  // ── GALLERY SCREEN ──
  function GalleryScreen() {
    const [activeTab, setActiveTab] = useState('trending');
    const remixes = [
      { author: 'Alex M.', avatar: 'A', topic: 'Quantum Entanglement', format: 'Haiku', likes: 142, comments: 18, preview: 'Particles entwined\nAcross the cosmos, linked souls\nDistance disappears', quality: 98 },
      { author: 'Sarah K.', avatar: 'S', topic: 'The French Revolution', format: 'Tweet Thread', likes: 89, comments: 31, preview: '🧵 THREAD: Why 1789 changed everything (and why you should care today) 1/12...', quality: 91 },
      { author: 'James T.', avatar: 'J', topic: 'Climate Economics', format: 'CEO Memo', likes: 67, comments: 9, preview: 'To: All Stakeholders\nRe: Q4 Carbon Exposure — our models show a $2.3B risk...', quality: 87 },
    ];

    return React.createElement('div', { className: 'screen-anim', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, color: t.textPrimary, marginBottom: 4 } }, 'Concept Gallery'),
        React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textMuted, marginBottom: 16 } }, 'Explore how others remix ideas'),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
          ['trending', 'latest', 'mine'].map(tab =>
            React.createElement('div', {
              key: tab, className: 'pp-btn',
              onClick: () => setActiveTab(tab),
              style: { background: activeTab === tab ? t.primary : t.surface2, borderRadius: 20, padding: '7px 14px', border: `1px solid ${activeTab === tab ? t.primary : t.border}` }
            },
              React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: activeTab === tab ? '#fff' : t.textMuted, textTransform: 'capitalize' } }, tab)
            )
          )
        )
      ),

      React.createElement('div', { style: { padding: '0 20px' } },
        remixes.map((r, i) =>
          React.createElement('div', {
            key: i, className: 'pp-card',
            style: { background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 12, border: `1px solid ${t.border}`, animation: `slideUp ${0.2 + i * 0.1}s ease` }
          },
            // Author row
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 800, color: '#fff' } }, r.avatar)
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: t.textPrimary } }, r.author),
                  React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.textMuted } }, r.format),
                )
              ),
              React.createElement('div', { style: { background: `${t.success}22`, borderRadius: 8, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Award', size: 12, color: t.success }),
                React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 12, fontWeight: 700, color: t.success } }, `${r.quality}%`)
              )
            ),
            // Topic chip
            React.createElement('div', { style: { background: t.surface2, borderRadius: 8, padding: '4px 10px', display: 'inline-block', marginBottom: 8 } },
              React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.secondary, fontWeight: 700 } }, r.topic)
            ),
            // Preview
            React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textSecondary, lineHeight: 1.6, marginBottom: 10, whiteSpace: 'pre-line' } }, r.preview),
            // Actions
            React.createElement('div', { style: { display: 'flex', gap: 12, borderTop: `1px solid ${t.border}`, paddingTop: 10 } },
              React.createElement('div', { className: 'pp-btn', style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Heart', size: 15, color: '#EF4444' }),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, r.likes)
              ),
              React.createElement('div', { className: 'pp-btn', style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'MessageCircle', size: 15, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, r.comments)
              ),
              React.createElement('div', { className: 'pp-btn', style: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' } },
                React.createElement(Icon, { name: 'Share2', size: 15, color: t.secondary }),
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.secondary } }, 'Share')
              ),
            )
          )
        )
      )
    );
  }

  // ── ANALYTICS SCREEN ──
  function AnalyticsScreen() {
    const topics = [
      { name: 'Quantum Physics', score: 78, remixes: 6, color: '#3B82F6' },
      { name: 'History', score: 91, remixes: 11, color: '#10B981' },
      { name: 'Economics', score: 55, remixes: 4, color: '#F59E0B' },
      { name: 'Biology', score: 63, remixes: 5, color: '#8B5CF6' },
      { name: 'Philosophy', score: 44, remixes: 3, color: '#EC4899' },
    ];
    const weekData = [40, 65, 50, 80, 70, 90, 75];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const maxVal = 90;

    return React.createElement('div', { className: 'screen-anim', style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '20px 20px 0' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 22, fontWeight: 800, color: t.textPrimary, marginBottom: 4 } }, 'Understanding Flow'),
        React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textMuted, marginBottom: 16 } }, 'Your comprehension analytics'),
      ),

      // Weekly activity chart
      React.createElement('div', { style: { margin: '0 20px 20px', background: t.cardBg, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 14 } }, 'Weekly Activity'),
        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 80, marginBottom: 8 } },
          weekData.map((val, i) =>
            React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement('div', {
                style: {
                  width: '100%', height: `${(val / maxVal) * 70}px`,
                  background: i === 5 ? 'linear-gradient(180deg, #3B82F6, #2563EB)' : `${t.primary}44`,
                  borderRadius: 4, transition: 'height 0.5s ease',
                }
              }),
              React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 10, color: t.textMuted } }, days[i])
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.textMuted } }, 'This week: 47 remixes'),
          React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, color: t.success } }, '+18% vs last week'),
        )
      ),

      // Communication styles
      React.createElement('div', { style: { margin: '0 20px 20px', background: t.cardBg, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 12 } }, 'Communication Styles Developed'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          [
            { label: 'Narrative', level: 'Expert', color: '#10B981' },
            { label: 'Analytical', level: 'Advanced', color: '#3B82F6' },
            { label: 'Persuasive', level: 'Intermediate', color: '#F59E0B' },
            { label: 'Creative', level: 'Expert', color: '#8B5CF6' },
            { label: 'Technical', level: 'Beginner', color: '#64748B' },
          ].map(s =>
            React.createElement('div', { key: s.label, style: { background: `${s.color}18`, borderRadius: 20, padding: '6px 12px', border: `1px solid ${s.color}44` } },
              React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 12, fontWeight: 700, color: s.color } }, `${s.label} · ${s.level}`)
            )
          )
        )
      ),

      // Topics
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: 12 } }, 'Topic Mastery'),
        topics.map(topic =>
          React.createElement('div', { key: topic.name, style: { marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
              React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 13, fontWeight: 700, color: t.textSecondary } }, topic.name),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontFamily: "'Comic Neue'", fontSize: 11, color: t.textMuted } }, `${topic.remixes} remixes`),
                React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: topic.color } }, `${topic.score}%`),
              )
            ),
            React.createElement('div', { style: { background: t.surface2, borderRadius: 20, height: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${topic.score}%`, height: '100%', background: `linear-gradient(90deg, ${topic.color}88, ${topic.color})`, borderRadius: 20, transition: 'width 1s ease' } })
            )
          )
        ),

        // Recommendation
        React.createElement('div', { style: { marginTop: 16, background: `${t.primary}15`, borderRadius: 14, padding: 14, border: `1px solid ${t.primary}44` } },
          React.createElement('div', { style: { fontFamily: "'Baloo 2'", fontSize: 14, fontWeight: 700, color: t.secondary, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'Target', size: 16, color: t.secondary }),
            'AI Recommendation'
          ),
          React.createElement('div', { style: { fontFamily: "'Comic Neue'", fontSize: 13, color: t.textSecondary, lineHeight: 1.5 } },
            'Your Philosophy score (44%) is your biggest growth opportunity. Try remixing Plato\'s Allegory of the Cave as a modern startup pitch to boost it!'
          ),
          React.createElement('div', { className: 'pp-btn', onClick: () => setActiveScreen('canvas'), style: { marginTop: 10, background: t.primary, borderRadius: 10, padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 6 } },
            React.createElement('span', { style: { fontFamily: "'Baloo 2'", fontSize: 13, fontWeight: 700, color: '#fff' } }, 'Try This Challenge'),
            React.createElement(Icon, { name: 'ArrowRight', size: 13, color: '#fff' })
          )
        )
      )
    );
  }

  const screens = { home: HomeScreen, source: SourceScreen, canvas: CanvasScreen, gallery: GalleryScreen, analytics: AnalyticsScreen };
  const nav = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'source', icon: 'FileText', label: 'Sources' },
    { id: 'canvas', icon: 'PenTool', label: 'Remix' },
    { id: 'gallery', icon: 'Globe', label: 'Gallery' },
    { id: 'analytics', icon: 'BarChart2', label: 'Flow' },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Comic Neue', sans-serif" } },
    React.createElement('style', null, fontStyle),
    React.createElement('div', {
      style: {
        width: 375, height: 812, background: t.bg, borderRadius: 40, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
      }
    },
      // Content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' } },
        React.createElement(ActiveScreen)
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          height: 72, background: t.surface, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingBottom: 4, flexShrink: 0,
        }
      },
        nav.map(item =>
          React.createElement('div', {
            key: item.id, className: 'pp-btn nav-tab',
            onClick: () => setActiveScreen(item.id),
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 12px', minWidth: 44, minHeight: 44, justifyContent: 'center', cursor: 'pointer' }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: activeScreen === item.id ? `${t.primary}22` : 'transparent',
                transition: 'background 0.2s ease',
              }
            },
              React.createElement(Icon, { name: item.icon, size: 18, color: activeScreen === item.id ? t.secondary : t.textMuted })
            ),
            React.createElement('span', {
              style: {
                fontFamily: "'Baloo 2'",
                fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 400,
                color: activeScreen === item.id ? t.secondary : t.textMuted,
              }
            }, item.label)
          )
        )
      )
    )
  );
}
