const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animateIn, setAnimateIn] = useState(true);
  const [activeBlend, setActiveBlend] = useState(null);
  const [sparkCompleted, setSparkCompleted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [learningDNA, setLearningDNA] = useState({ visual: 72, auditory: 45, kinesthetic: 88, reading: 61 });

  const themes = {
    dark: {
      bg: '#0F172A',
      surface: '#1E293B',
      surfaceAlt: '#334155',
      card: '#1E293B',
      cardAlt: '#253349',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaLight: '#FFF7ED',
      border: '#334155',
      navBg: '#0F172A',
      tabActive: '#2563EB',
      tabInactive: '#64748B',
      shadow: 'rgba(0,0,0,0.4)',
      inputBg: '#1E293B',
      badgeBg: 'rgba(37,99,235,0.2)',
      successBg: 'rgba(34,197,94,0.15)',
      success: '#22C55E',
    },
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      card: '#FFFFFF',
      cardAlt: '#F1F5F9',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      ctaLight: '#FFF7ED',
      border: '#E2E8F0',
      navBg: '#FFFFFF',
      tabActive: '#2563EB',
      tabInactive: '#94A3B8',
      shadow: 'rgba(0,0,0,0.08)',
      inputBg: '#F1F5F9',
      badgeBg: 'rgba(37,99,235,0.08)',
      successBg: 'rgba(34,197,94,0.08)',
      success: '#22C55E',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const navigate = (screen) => {
    setActiveScreen(screen);
    setActiveBlend(null);
    setQuizAnswer(null);
  };

  const Icon = ({ name, size = 22, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 2 });
  };

  // ===== HOME SCREEN =====
  function HomeScreen() {
    const streakDays = 12;
    const blendCount = 47;

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Synapse'),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.cta, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Blend')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 44, height: 44, borderRadius: 14, background: t.surface, border: `3px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 12px ${t.shadow}, 0 2px 4px ${t.shadow}`, transition: 'transform 0.2s' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.cta })),
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid rgba(255,255,255,0.2)', boxShadow: `0 4px 12px ${t.shadow}` } },
            React.createElement(Icon, { name: 'User', size: 20, color: '#FFFFFF' })
          )
        )
      ),

      // Streak Card
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${t.primary}, #7C3AED)`, borderRadius: 20, padding: '20px 20px', marginBottom: 20, border: '3px solid rgba(255,255,255,0.15)', boxShadow: `0 8px 24px rgba(37,99,235,0.3), 0 4px 8px ${t.shadow}`, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: 30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 4 } }, 'Blend Streak'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5 } }, `${streakDays} days`),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 } }, `${blendCount} blends created`)
          ),
          React.createElement('div', { style: { width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid rgba(255,255,255,0.2)', animation: 'pulse 2s ease infinite' } },
            React.createElement(Icon, { name: 'Zap', size: 32, color: '#FCD34D' })
          )
        )
      ),

      // Daily Spark
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, "Today's Spark"),
          React.createElement(Icon, { name: 'Sparkles', size: 20, color: t.cta })
        ),
        React.createElement('button', {
          onClick: () => { navigate('spark'); },
          style: { width: '100%', background: t.card, borderRadius: 20, padding: 18, border: `3px solid ${t.cta}`, boxShadow: `0 6px 20px ${t.shadow}, 0 2px 6px ${t.shadow}`, cursor: 'pointer', textAlign: 'left', transition: 'transform 0.15s, box-shadow 0.15s' },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(249,115,22,0.2)' } },
              React.createElement(Icon, { name: 'Flame', size: 24, color: t.cta })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 } }, 'Quantum Computing Basics'),
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 400, color: t.textSecondary, lineHeight: 1.4 } }, 'Remix a 5-min explainer into a visual concept map with quiz'),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary, background: t.badgeBg, padding: '4px 10px', borderRadius: 10, border: `2px solid ${t.primary}30` } }, 'Visual'),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta, background: 'rgba(249,115,22,0.1)', padding: '4px 10px', borderRadius: 10, border: '2px solid rgba(249,115,22,0.2)' } }, '+50 XP')
              )
            )
          )
        )
      ),

      // Learning DNA Quick View
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 12px 0' } }, 'Your Learning DNA'),
        React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: 18, border: `3px solid ${t.border}`, boxShadow: `0 6px 20px ${t.shadow}` } },
          ['Visual', 'Auditory', 'Kinesthetic', 'Reading'].map((type, i) => {
            const values = [learningDNA.visual, learningDNA.auditory, learningDNA.kinesthetic, learningDNA.reading];
            const icons = ['Eye', 'Headphones', 'Hand', 'BookOpen'];
            const colors = [t.primary, '#8B5CF6', t.cta, t.success];
            return React.createElement('div', { key: type, style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 3 ? 14 : 0 } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${colors[i]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Icon, { name: icons[i], size: 18, color: colors[i] })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                  React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, type),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: colors[i] } }, `${values[i]}%`)
                ),
                React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden' } },
                  React.createElement('div', { style: { height: '100%', width: `${values[i]}%`, borderRadius: 4, background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}CC)`, transition: 'width 0.6s ease' } })
                )
              )
            );
          })
        )
      ),

      // Recent Blends
      React.createElement('div', null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0 } }, 'Recent Blends'),
          React.createElement('button', { onClick: () => navigate('library'), style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary, background: 'none', border: 'none', cursor: 'pointer' } }, 'See all')
        ),
        [
          { title: 'Neural Networks Decoded', sources: 3, widgets: 8, color: t.primary, icon: 'Brain' },
          { title: 'React Hooks Deep Dive', sources: 5, widgets: 12, color: '#8B5CF6', icon: 'Code2' },
          { title: 'Climate Science 101', sources: 4, widgets: 6, color: t.success, icon: 'Leaf' },
        ].map((blend, i) => React.createElement('button', {
          key: i,
          onClick: () => { setActiveBlend(blend); navigate('blend'); },
          style: { width: '100%', display: 'flex', gap: 14, alignItems: 'center', background: t.card, borderRadius: 18, padding: 16, marginBottom: 12, border: `3px solid ${t.border}`, boxShadow: `0 4px 12px ${t.shadow}`, cursor: 'pointer', textAlign: 'left', transition: 'transform 0.15s' },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${blend.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `3px solid ${blend.color}30` } },
            React.createElement(Icon, { name: blend.icon, size: 26, color: blend.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 } }, blend.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, `${blend.sources} sources \u00B7 ${blend.widgets} widgets`)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textMuted })
        ))
      )
    );
  }

  // ===== EXPLORE / COMMUNITY SCREEN =====
  function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('trending');

    const communityBlends = [
      { title: 'Mastering SQL Joins', author: 'DataDiva', rating: 4.9, remixes: 234, icon: 'Database', color: '#8B5CF6', tags: ['SQL', 'Database'] },
      { title: 'Intro to Psychology', author: 'MindMapper', rating: 4.7, remixes: 189, icon: 'Heart', color: '#EC4899', tags: ['Psychology', 'Science'] },
      { title: 'Spanish Verb Conjugation', author: 'LinguaLab', rating: 4.8, remixes: 312, icon: 'Languages', color: t.cta, tags: ['Language', 'Spanish'] },
      { title: 'Organic Chemistry Essentials', author: 'ChemWiz', rating: 4.6, remixes: 156, icon: 'Beaker', color: t.success, tags: ['Chemistry', 'Science'] },
      { title: 'Music Theory Foundations', author: 'BeatBuilder', rating: 4.9, remixes: 278, icon: 'Music', color: t.primary, tags: ['Music', 'Theory'] },
    ];

    const categories = [
      { name: 'Science', icon: 'Atom', color: t.primary },
      { name: 'Tech', icon: 'Cpu', color: '#8B5CF6' },
      { name: 'Language', icon: 'Languages', color: t.cta },
      { name: 'Math', icon: 'Calculator', color: t.success },
      { name: 'Art', icon: 'Palette', color: '#EC4899' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 20px 0' } }, 'Explore'),

      // Search bar
      React.createElement('div', { style: { position: 'relative', marginBottom: 20 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 1 } },
          React.createElement(Icon, { name: 'Search', size: 20, color: t.textMuted })
        ),
        React.createElement('input', {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: 'Search blends, topics, creators...',
          style: { width: '100%', padding: '14px 16px 14px 44px', fontFamily: font, fontSize: 17, fontWeight: 400, color: t.text, background: t.inputBg, border: `3px solid ${t.border}`, borderRadius: 16, outline: 'none', boxSizing: 'border-box', boxShadow: `0 4px 12px ${t.shadow}` }
        })
      ),

      // Categories
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 } },
        categories.map((cat) => React.createElement('button', {
          key: cat.name,
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 14px', background: t.card, borderRadius: 16, border: `3px solid ${t.border}`, cursor: 'pointer', minWidth: 72, flexShrink: 0, boxShadow: `0 4px 12px ${t.shadow}`, transition: 'transform 0.15s' },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.93)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: cat.icon, size: 22, color: cat.color })
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary } }, cat.name)
        ))
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 16, background: t.surfaceAlt, borderRadius: 14, padding: 4, border: `2px solid ${t.border}` } },
        ['trending', 'newest', 'top rated'].map((tab) => React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: { flex: 1, padding: '10px 4px', fontFamily: font, fontSize: 15, fontWeight: 600, color: activeTab === tab ? '#FFFFFF' : t.textSecondary, background: activeTab === tab ? t.primary : 'transparent', borderRadius: 10, border: 'none', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }
        }, tab))
      ),

      // Community blends
      communityBlends.map((blend, i) => React.createElement('button', {
        key: i,
        onClick: () => { setActiveBlend(blend); navigate('blend'); },
        style: { width: '100%', background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `3px solid ${t.border}`, boxShadow: `0 6px 20px ${t.shadow}`, cursor: 'pointer', textAlign: 'left', transition: 'transform 0.15s', animation: `slideUp 0.4s ease ${i * 0.08}s both` },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 16, background: `${blend.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `3px solid ${blend.color}30` } },
            React.createElement(Icon, { name: blend.icon, size: 28, color: blend.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 4 } }, blend.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, marginBottom: 6 } }, `by ${blend.author}`),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              blend.tags.map((tag) => React.createElement('span', { key: tag, style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textSecondary, background: t.surfaceAlt, padding: '2px 8px', borderRadius: 8, border: `1px solid ${t.border}` } }, tag))
            )
          ),
          React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 } },
              React.createElement(Icon, { name: 'Star', size: 14, color: '#FBBF24' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text } }, blend.rating)
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, `${blend.remixes} remixes`)
          )
        )
      ))
    );
  }

  // ===== CREATE / REMIX SCREEN =====
  function CreateScreen() {
    const [step, setStep] = useState(0);
    const sourceTypes = [
      { name: 'Article / Text', icon: 'FileText', color: t.primary, desc: 'Paste or type text content' },
      { name: 'YouTube Video', icon: 'Youtube', color: '#EF4444', desc: 'Link a video to extract insights' },
      { name: 'Podcast', icon: 'Headphones', color: '#8B5CF6', desc: 'Import audio transcripts' },
      { name: 'Document', icon: 'Upload', color: t.cta, desc: 'Upload PDF, DOCX, or notes' },
      { name: 'Handwritten Notes', icon: 'PenTool', color: t.success, desc: 'Scan & digitize your notes' },
      { name: 'Web Link', icon: 'Globe', color: '#06B6D4', desc: 'Import from any URL' },
    ];

    const remixTools = [
      { name: 'Summarize', icon: 'Sparkles', color: t.primary, desc: 'AI-powered condensation' },
      { name: 'Flashcards', icon: 'Layers', color: '#8B5CF6', desc: 'Auto-generate study cards' },
      { name: 'Quiz', icon: 'HelpCircle', color: t.cta, desc: 'Multiple choice & fill-blank' },
      { name: 'Concept Map', icon: 'GitBranch', color: t.success, desc: 'Visual knowledge graph' },
      { name: 'Visual Notes', icon: 'Image', color: '#EC4899', desc: 'AI-illustrated summaries' },
      { name: 'Timeline', icon: 'Clock', color: '#06B6D4', desc: 'Chronological breakdown' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 8px 0' } }, 'New Blend'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 400, color: t.textSecondary, margin: '0 0 24px 0' } }, step === 0 ? 'Choose your source materials' : 'Select remix tools'),

      // Steps indicator
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center' } },
        [0, 1, 2].map((s) => React.createElement('div', { key: s, style: { flex: 1, height: 6, borderRadius: 3, background: s <= step ? `linear-gradient(90deg, ${t.primary}, ${t.secondary})` : t.surfaceAlt, transition: 'background 0.3s' } })),
        React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textMuted, marginLeft: 8 } }, `${step + 1}/3`)
      ),

      step === 0 && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px 0' } }, 'Add Sources'),
        sourceTypes.map((source, i) => React.createElement('button', {
          key: i,
          onClick: () => setStep(1),
          style: { width: '100%', display: 'flex', gap: 14, alignItems: 'center', background: t.card, borderRadius: 18, padding: 16, marginBottom: 12, border: `3px solid ${t.border}`, boxShadow: `0 4px 14px ${t.shadow}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', animation: `slideUp 0.4s ease ${i * 0.06}s both` },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${source.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `3px solid ${source.color}30` } },
            React.createElement(Icon, { name: source.icon, size: 26, color: source.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 2 } }, source.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, source.desc)
          ),
          React.createElement(Icon, { name: 'Plus', size: 22, color: t.primary })
        ))
      ),

      step === 1 && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px 0' } }, 'Remix Tools'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 16px 0' } }, 'The Adaptive Remix Engine suggests these based on your Learning DNA'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          remixTools.map((tool, i) => React.createElement('button', {
            key: i,
            onClick: () => setStep(2),
            style: { background: t.card, borderRadius: 20, padding: 18, border: `3px solid ${t.border}`, boxShadow: `0 6px 20px ${t.shadow}`, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s', animation: `slideUp 0.4s ease ${i * 0.06}s both` },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.93)'; e.currentTarget.style.borderColor = tool.color; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = t.border; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = t.border; },
          },
            React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: `${tool.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: `3px solid ${tool.color}30` } },
              React.createElement(Icon, { name: tool.icon, size: 26, color: tool.color })
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 } }, tool.name),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, tool.desc)
          ))
        ),
        React.createElement('button', {
          onClick: () => setStep(0),
          style: { width: '100%', marginTop: 16, padding: '14px', fontFamily: font, fontSize: 15, fontWeight: 600, color: t.textSecondary, background: 'transparent', border: `2px solid ${t.border}`, borderRadius: 14, cursor: 'pointer' }
        }, 'Back to Sources')
      ),

      step === 2 && React.createElement('div', { style: { textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.5s ease' } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: `0 8px 32px rgba(37,99,235,0.3)`, animation: 'pulse 1.5s ease infinite' } },
          React.createElement(Icon, { name: 'Sparkles', size: 40, color: '#FFFFFF' })
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Creating Your Blend...'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginBottom: 24, lineHeight: 1.5 } }, 'The Adaptive Remix Engine is analyzing your sources and generating personalized learning widgets.'),
        React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.surfaceAlt, overflow: 'hidden', maxWidth: 260, margin: '0 auto 24px' } },
          React.createElement('div', { style: { height: '100%', width: '65%', borderRadius: 4, background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, animation: 'shimmer 1.5s ease infinite' } })
        ),
        React.createElement('button', {
          onClick: () => setStep(0),
          style: { padding: '14px 32px', fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, borderRadius: 16, border: '3px solid rgba(255,255,255,0.2)', cursor: 'pointer', boxShadow: `0 6px 20px rgba(37,99,235,0.3)` }
        }, 'Start New Blend')
      )
    );
  }

  // ===== LIBRARY SCREEN =====
  function LibraryScreen() {
    const [filter, setFilter] = useState('all');

    const blends = [
      { title: 'Neural Networks Decoded', sources: 3, widgets: 8, color: t.primary, icon: 'Brain', progress: 85, lastEdit: '2h ago', tags: ['AI', 'Deep Learning'] },
      { title: 'React Hooks Deep Dive', sources: 5, widgets: 12, color: '#8B5CF6', icon: 'Code2', progress: 100, lastEdit: '1d ago', tags: ['React', 'JavaScript'] },
      { title: 'Climate Science 101', sources: 4, widgets: 6, color: t.success, icon: 'Leaf', progress: 60, lastEdit: '3d ago', tags: ['Science', 'Environment'] },
      { title: 'Calculus Made Visual', sources: 6, widgets: 14, color: t.cta, icon: 'TrendingUp', progress: 45, lastEdit: '5d ago', tags: ['Math', 'Visual'] },
      { title: 'Art History: Renaissance', sources: 3, widgets: 9, color: '#EC4899', icon: 'Palette', progress: 30, lastEdit: '1w ago', tags: ['Art', 'History'] },
      { title: 'Data Structures & Algo', sources: 7, widgets: 18, color: '#06B6D4', icon: 'GitBranch', progress: 92, lastEdit: '2d ago', tags: ['CS', 'Algorithms'] },
    ];

    const filters = ['all', 'in progress', 'completed', 'shared'];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Library'),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary, background: t.badgeBg, padding: '6px 12px', borderRadius: 12, border: `2px solid ${t.primary}30` } }, `${blends.length} blends`)
        )
      ),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 } },
        filters.map((f) => React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: { padding: '8px 16px', fontFamily: font, fontSize: 13, fontWeight: 600, color: filter === f ? '#FFFFFF' : t.textSecondary, background: filter === f ? t.primary : t.card, borderRadius: 12, border: filter === f ? `3px solid ${t.primary}` : `3px solid ${t.border}`, cursor: 'pointer', textTransform: 'capitalize', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s', boxShadow: filter === f ? `0 4px 12px rgba(37,99,235,0.3)` : `0 2px 8px ${t.shadow}` }
        }, f))
      ),

      // Stats row
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 } },
        [
          { label: 'Total Sources', value: '28', icon: 'FileText', color: t.primary },
          { label: 'Widgets', value: '67', icon: 'Layers', color: '#8B5CF6' },
          { label: 'Study Hours', value: '34', icon: 'Clock', color: t.cta },
        ].map((stat) => React.createElement('div', {
          key: stat.label,
          style: { background: t.card, borderRadius: 16, padding: 14, border: `3px solid ${t.border}`, boxShadow: `0 4px 12px ${t.shadow}`, textAlign: 'center' }
        },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
            React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })
          ),
          React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, stat.value),
          React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, stat.label)
        ))
      ),

      // Blend list
      blends.map((blend, i) => React.createElement('button', {
        key: i,
        onClick: () => { setActiveBlend(blend); navigate('blend'); },
        style: { width: '100%', background: t.card, borderRadius: 20, padding: 16, marginBottom: 12, border: `3px solid ${t.border}`, boxShadow: `0 4px 14px ${t.shadow}`, cursor: 'pointer', textAlign: 'left', transition: 'transform 0.15s', animation: `slideUp 0.35s ease ${i * 0.05}s both` },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${blend.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `3px solid ${blend.color}30` } },
            React.createElement(Icon, { name: blend.icon, size: 24, color: blend.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text } }, blend.title),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${blend.sources} sources \u00B7 ${blend.widgets} widgets \u00B7 ${blend.lastEdit}`)
          ),
          blend.progress === 100 && React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: t.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'Check', size: 16, color: t.success })
          )
        ),
        React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${blend.progress}%`, borderRadius: 3, background: blend.progress === 100 ? t.success : `linear-gradient(90deg, ${blend.color}, ${blend.color}CC)`, transition: 'width 0.5s ease' } })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 10 } },
          blend.tags.map((tag) => React.createElement('span', { key: tag, style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.textSecondary, background: t.surfaceAlt, padding: '2px 8px', borderRadius: 8, border: `1px solid ${t.border}` } }, tag))
        )
      ))
    );
  }

  // ===== BLEND DETAIL SCREEN =====
  function BlendScreen() {
    const blend = activeBlend || { title: 'Neural Networks Decoded', sources: 3, widgets: 8, color: t.primary, icon: 'Brain' };

    const widgets = [
      { type: 'Flashcards', count: 12, icon: 'Layers', color: '#8B5CF6' },
      { type: 'Quiz', count: 5, icon: 'HelpCircle', color: t.cta },
      { type: 'Concept Map', count: 1, icon: 'GitBranch', color: t.success },
      { type: 'Summary', count: 3, icon: 'FileText', color: t.primary },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Back button
      React.createElement('button', {
        onClick: () => navigate('home'),
        style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px 0', fontFamily: font, fontSize: 17, fontWeight: 600, color: t.primary }
      },
        React.createElement(Icon, { name: 'ChevronLeft', size: 22, color: t.primary }),
        React.createElement('span', null, 'Back')
      ),

      // Blend header
      React.createElement('div', { style: { background: `linear-gradient(135deg, ${blend.color || t.primary}, ${blend.color || t.primary}CC)`, borderRadius: 24, padding: '28px 20px', marginBottom: 20, border: '3px solid rgba(255,255,255,0.15)', boxShadow: `0 8px 32px ${blend.color || t.primary}40`, position: 'relative', overflow: 'hidden' } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, border: '3px solid rgba(255,255,255,0.2)' } },
          React.createElement(Icon, { name: blend.icon || 'Brain', size: 32, color: '#FFFFFF' })
        ),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0', letterSpacing: -0.5 } }, blend.title),
        React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)' } }, `${blend.sources || 3} sources \u00B7 ${blend.widgets || 8} interactive widgets`)
      ),

      // AI Insights
      React.createElement('div', { style: { background: t.badgeBg, borderRadius: 18, padding: 16, marginBottom: 20, border: `2px solid ${t.primary}30`, display: 'flex', gap: 12, alignItems: 'flex-start' } },
        React.createElement(Icon, { name: 'Sparkles', size: 20, color: t.primary, style: { flexShrink: 0, marginTop: 2 } }),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary, marginBottom: 4 } }, 'Adaptive Engine Insight'),
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 400, color: t.text, lineHeight: 1.4 } }, 'Based on your Learning DNA, try adding a timeline widget. Visual-kinesthetic learners retain 40% more with chronological organization.')
        )
      ),

      // Widgets
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px 0' } }, 'Learning Widgets'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 } },
        widgets.map((w, i) => React.createElement('button', {
          key: i,
          style: { background: t.card, borderRadius: 18, padding: 16, border: `3px solid ${t.border}`, boxShadow: `0 4px 14px ${t.shadow}`, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.93)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${w.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: `3px solid ${w.color}30` } },
            React.createElement(Icon, { name: w.icon, size: 24, color: w.color })
          ),
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 } }, w.type),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${w.count} items`)
        ))
      ),

      // Quick Quiz
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px 0' } }, 'Quick Quiz'),
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: 18, border: `3px solid ${t.border}`, boxShadow: `0 6px 20px ${t.shadow}` } },
        React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 14, lineHeight: 1.4 } }, 'What is the primary function of an activation function in a neural network?'),
        ['Introduces non-linearity', 'Normalizes weights', 'Reduces overfitting', 'Increases learning rate'].map((opt, i) => React.createElement('button', {
          key: i,
          onClick: () => setQuizAnswer(i),
          style: { width: '100%', padding: '14px 16px', fontFamily: font, fontSize: 15, fontWeight: 500, color: quizAnswer === i ? (i === 0 ? '#FFFFFF' : '#FFFFFF') : t.text, background: quizAnswer === i ? (i === 0 ? t.success : '#EF4444') : t.surfaceAlt, borderRadius: 14, border: quizAnswer === i ? `3px solid ${i === 0 ? t.success : '#EF4444'}` : `3px solid ${t.border}`, cursor: 'pointer', marginBottom: 8, textAlign: 'left', transition: 'all 0.2s' }
        }, opt))
      ),

      // Actions
      React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 20 } },
        React.createElement('button', { style: { flex: 1, padding: '16px', fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, borderRadius: 16, border: '3px solid rgba(255,255,255,0.2)', cursor: 'pointer', boxShadow: `0 6px 20px rgba(37,99,235,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'Shuffle', size: 20, color: '#FFFFFF' }),
          React.createElement('span', null, 'Remix')
        ),
        React.createElement('button', { style: { padding: '16px 20px', fontFamily: font, fontSize: 17, fontWeight: 700, color: t.primary, background: t.badgeBg, borderRadius: 16, border: `3px solid ${t.primary}30`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'Share2', size: 20, color: t.primary }),
          React.createElement('span', null, 'Share')
        )
      )
    );
  }

  // ===== SPARK SCREEN =====
  function SparkScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('button', {
        onClick: () => navigate('home'),
        style: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px 0', fontFamily: font, fontSize: 17, fontWeight: 600, color: t.primary }
      },
        React.createElement(Icon, { name: 'ChevronLeft', size: 22, color: t.primary }),
        React.createElement('span', null, 'Back')
      ),

      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg, ${t.cta}, #FBBF24)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: `0 8px 24px rgba(249,115,22,0.3)`, animation: 'pulse 2s ease infinite' } },
          React.createElement(Icon, { name: 'Flame', size: 36, color: '#FFFFFF' })
        ),
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 6px 0' } }, "Today's Spark"),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0 } }, 'April 6, 2026')
      ),

      // Spark challenge
      React.createElement('div', { style: { background: t.card, borderRadius: 24, padding: 22, border: `3px solid ${t.cta}`, boxShadow: `0 8px 28px ${t.shadow}`, marginBottom: 20 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 8px 0' } }, 'Quantum Computing Basics'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 400, color: t.textSecondary, lineHeight: 1.5, margin: '0 0 16px 0' } },
          'Watch a 5-minute explainer on quantum superposition, then create a visual concept map connecting qubits, entanglement, and quantum gates. Finish with a 3-question self-quiz.'
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 } },
          ['Concept Map', 'Quiz', 'Visual Notes'].map((tag) => React.createElement('span', { key: tag, style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta, background: 'rgba(249,115,22,0.1)', padding: '6px 12px', borderRadius: 10, border: '2px solid rgba(249,115,22,0.2)' } }, tag))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 16, paddingTop: 16, borderTop: `2px solid ${t.border}` } },
          [
            { label: 'Difficulty', value: 'Medium', icon: 'Gauge' },
            { label: 'Est. Time', value: '15 min', icon: 'Clock' },
            { label: 'XP Reward', value: '+50', icon: 'Trophy' },
          ].map((stat) => React.createElement('div', { key: stat.label, style: { flex: 1, textAlign: 'center' } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' } },
              React.createElement(Icon, { name: stat.icon, size: 16, color: t.textSecondary })
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text } }, stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, stat.label)
          ))
        )
      ),

      // Suggested sources
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px 0' } }, 'Suggested Sources'),
      [
        { title: 'Quantum Computing in 5 Minutes', platform: 'YouTube', icon: 'Youtube', color: '#EF4444', duration: '5:32' },
        { title: 'Qubits Explained Simply', platform: 'Article', icon: 'FileText', color: t.primary, duration: '8 min read' },
        { title: 'Quantum Podcast: Episode 42', platform: 'Podcast', icon: 'Headphones', color: '#8B5CF6', duration: '22:10' },
      ].map((source, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', gap: 12, alignItems: 'center', background: t.card, borderRadius: 16, padding: 14, marginBottom: 10, border: `3px solid ${t.border}`, boxShadow: `0 4px 12px ${t.shadow}`, animation: `slideUp 0.4s ease ${i * 0.08}s both` }
      },
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${source.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${source.color}30` } },
          React.createElement(Icon, { name: source.icon, size: 22, color: source.color })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, source.title),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${source.platform} \u00B7 ${source.duration}`)
        ),
        React.createElement(Icon, { name: 'Plus', size: 20, color: t.primary })
      )),

      // Start button
      React.createElement('button', {
        onClick: () => navigate('create'),
        style: { width: '100%', marginTop: 16, padding: '18px', fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', background: `linear-gradient(135deg, ${t.cta}, #FBBF24)`, borderRadius: 18, border: '3px solid rgba(255,255,255,0.2)', cursor: 'pointer', boxShadow: `0 8px 24px rgba(249,115,22,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'transform 0.15s' },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
      },
        React.createElement(Icon, { name: 'Zap', size: 22, color: '#FFFFFF' }),
        React.createElement('span', null, 'Start This Spark')
      )
    );
  }

  // ===== SCREEN MAP =====
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    create: CreateScreen,
    library: LibraryScreen,
    blend: BlendScreen,
    spark: SparkScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'create', label: 'Create', icon: 'PlusCircle' },
    { id: 'library', label: 'Library', icon: 'BookOpen' },
  ];

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0', fontFamily: font }
  },
    // Style tag for animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
        100% { transform: translateX(100%); }
      }
      input::placeholder { color: ${t.textMuted}; }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: { width: 375, height: 812, borderRadius: 44, background: t.bg, boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 4px ${isDark ? '#1a1a2e' : '#d1d5db'}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'background 0.3s ease' }
    },
      // Scrollable content
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8 }
      },
        React.createElement(ScreenComponent)
      ),

      // Bottom Navigation
      (activeScreen !== 'blend' && activeScreen !== 'spark') && React.createElement('div', {
        style: { display: 'flex', borderTop: `2px solid ${t.border}`, background: t.navBg, padding: '8px 8px 28px', gap: 0 }
      },
        tabs.map((tab) => {
          const isActive = activeScreen === tab.id;
          const isCreate = tab.id === 'create';
          return React.createElement('button', {
            key: tab.id,
            onClick: () => navigate(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.15s',
              minHeight: 44,
              minWidth: 44,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.9)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            isCreate
              ? React.createElement('div', { style: { width: 48, height: 48, borderRadius: 16, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 14px rgba(37,99,235,0.35)`, border: '3px solid rgba(255,255,255,0.2)', marginTop: -14 } },
                React.createElement(Icon, { name: tab.icon, size: 24, color: '#FFFFFF' })
              )
              : React.createElement(Icon, { name: tab.icon, size: 24, color: isActive ? t.tabActive : t.tabInactive }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? t.tabActive : t.tabInactive } }, tab.label)
          );
        })
      )
    )
  );
}
