const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  light: {
    primary: '#2563EB',
    secondary: '#3B82F6',
    cta: '#F97316',
    bg: '#F8FAFC',
    card: '#FFFFFF',
    cardAlt: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    border: '#E2E8F0',
    success: '#10B981',
    danger: '#EF4444',
    overlay: 'rgba(15,23,42,0.5)',
    tabBar: '#FFFFFF',
    tabInactive: '#94A3B8',
    shimmer: 'rgba(37,99,235,0.08)',
  },
  dark: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    cta: '#FB923C',
    bg: '#0F172A',
    card: '#1E293B',
    cardAlt: '#334155',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#334155',
    success: '#34D399',
    danger: '#F87171',
    overlay: 'rgba(0,0,0,0.7)',
    tabBar: '#1E293B',
    tabInactive: '#64748B',
    shimmer: 'rgba(59,130,246,0.12)',
  },
};

const glimmerData = [
  { id: 1, title: 'The Fibonacci Spiral in Sunflowers', category: 'Nature', rarity: 'Rare', color: '#10B981', desc: 'Sunflower seeds arrange in intersecting spirals that follow Fibonacci numbers — 34 spirals one way, 55 the other — optimizing packing efficiency through pure mathematics.', collected: true },
  { id: 2, title: 'Vantablack: The Darkest Material', category: 'Science', rarity: 'Epic', color: '#8B5CF6', desc: 'Vantablack absorbs 99.965% of visible light, making 3D objects appear as flat voids. It was originally developed for satellite calibration.', collected: true },
  { id: 3, title: 'The Great Emu War of 1932', category: 'History', rarity: 'Common', color: '#F59E0B', desc: 'Australia deployed soldiers with machine guns against 20,000 emus destroying crops. The emus won, proving surprisingly resilient to military tactics.', collected: true },
  { id: 4, title: 'Chromatophores: Living Pixels', category: 'Biology', rarity: 'Rare', color: '#EC4899', desc: 'Cuttlefish skin contains millions of chromatophore cells that expand and contract to change color in 200 milliseconds — faster than any display technology.', collected: false },
  { id: 5, title: 'The Library of Babel', category: 'Literature', rarity: 'Legendary', color: '#2563EB', desc: 'Borges imagined a library containing every possible 410-page book. It would hold all truths, all lies, and every possible arrangement of characters.', collected: false },
  { id: 6, title: 'Bismuth Crystal Geometry', category: 'Chemistry', rarity: 'Epic', color: '#8B5CF6', desc: 'Bismuth crystals form perfect staircase-like hopper structures with iridescent oxide layers, creating rainbow geometric formations that look almost alien.', collected: true },
];

const seasonData = {
  name: 'Season of Renaissance Rebels',
  progress: 67,
  daysLeft: 12,
  totalGlimmers: 15,
  collected: 10,
};

const quizData = {
  question: 'Which creature can change its skin color faster than any display technology?',
  options: ['Chameleon', 'Cuttlefish', 'Octopus', 'Mantis Shrimp'],
  correct: 1,
};

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [theme, setTheme] = useState('light');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [streakCount] = useState(7);
  const [showGlimmerDetail, setShowGlimmerDetail] = useState(null);
  const [archiveFilter, setArchiveFilter] = useState('All');
  const [animateIn, setAnimateIn] = useState(true);

  const t = themes[theme];

  useEffect(() => {
    setAnimateIn(true);
    const timer = setTimeout(() => setAnimateIn(false), 400);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const rarityColors = { Common: '#94A3B8', Rare: '#10B981', Epic: '#8B5CF6', Legendary: '#F97316' };

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.8 });
  };

  // ── Home Screen ──
  function HomeScreen() {
    const todayGlimmer = glimmerData[3];
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 } }, 'Day ' + streakCount + ' Streak'),
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Glimmer Archive'),
        ),
        React.createElement('button', {
          onClick: toggleTheme,
          style: { width: 44, height: 44, borderRadius: 22, border: 'none', background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: theme === 'light' ? 'Moon' : 'Sun', size: 20, color: t.textSecondary })),
      ),

      // Streak bar
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '14px 16px', marginBottom: 20, border: `1px solid ${t.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
          React.createElement(Icon, { name: 'Flame', size: 18, color: t.cta }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, streakCount + '-day streak'),
          React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, marginLeft: 'auto' } }, '3 more for bonus'),
        ),
        React.createElement('div', { style: { height: 6, background: t.cardAlt, borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '70%', background: `linear-gradient(90deg, ${t.cta}, #FBBF24)`, borderRadius: 3, animation: 'shimmer 2s ease infinite' } }),
        ),
      ),

      // Today's Glimmer card
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 } }, "Today's Glimmer"),
        React.createElement('div', {
          onClick: () => setActiveScreen('discover'),
          style: {
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            borderRadius: 20, padding: '24px 20px', cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(37,99,235,0.25)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }
        },
          React.createElement('div', { style: { position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
          React.createElement('div', { style: { position: 'absolute', bottom: -40, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' } },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#FDE68A', background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5, textTransform: 'uppercase' } }, todayGlimmer.rarity),
            React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)' } }, todayGlimmer.category),
          ),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px', letterSpacing: -0.3, position: 'relative' } }, todayGlimmer.title),
          React.createElement('p', { style: { fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5, position: 'relative' } }, todayGlimmer.desc.slice(0, 100) + '...'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, position: 'relative' } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: '#FFFFFF' } }, 'Tap to collect'),
            React.createElement(Icon, { name: 'ArrowRight', size: 16, color: '#FFFFFF' }),
          ),
        ),
      ),

      // Season progress
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', marginBottom: 20, border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Crown', size: 18, color: '#F59E0B' }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, seasonData.name),
          ),
          React.createElement('span', { style: { fontSize: 13, color: t.cta, fontWeight: 600 } }, seasonData.daysLeft + 'd left'),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 13, color: t.textSecondary } }, seasonData.collected + '/' + seasonData.totalGlimmers + ' collected'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.primary } }, seasonData.progress + '%'),
        ),
        React.createElement('div', { style: { height: 8, background: t.cardAlt, borderRadius: 4, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: seasonData.progress + '%', background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, borderRadius: 4, transition: 'width 0.6s ease' } }),
        ),
      ),

      // Quick stats
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        [
          { icon: 'Sparkles', label: 'Collected', value: '24', color: t.primary },
          { icon: 'Zap', label: 'Rare+', value: '8', color: '#8B5CF6' },
          { icon: 'Trophy', label: 'Rank', value: '#42', color: t.cta },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: '14px 12px', textAlign: 'center', border: `1px solid ${t.border}` } },
            React.createElement(Icon, { name: stat.icon, size: 20, color: stat.color, style: { marginBottom: 6 } }),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5 } }, stat.value),
            React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 500, marginTop: 2 } }, stat.label),
          )
        ),
      ),
    );
  }

  // ── Discover Screen ──
  function DiscoverScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 4px' } }, 'Discover'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 24px' } }, 'Complete the challenge to collect this Glimmer'),

      // Challenge card
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '24px 20px', marginBottom: 20, border: `1px solid ${t.border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement(Icon, { name: 'HelpCircle', size: 20, color: t.primary }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.8 } }, 'Curio Challenge'),
        ),
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 20px', lineHeight: 1.3 } }, quizData.question),
        ...quizData.options.map((opt, i) => {
          const isSelected = quizAnswer === i;
          const isCorrect = quizSubmitted && i === quizData.correct;
          const isWrong = quizSubmitted && isSelected && i !== quizData.correct;
          let optBg = t.cardAlt;
          let optBorder = t.border;
          let optColor = t.text;
          if (isSelected && !quizSubmitted) { optBg = t.shimmer; optBorder = t.primary; optColor = t.primary; }
          if (isCorrect) { optBg = '#ECFDF5'; optBorder = '#10B981'; optColor = '#065F46'; }
          if (isWrong) { optBg = '#FEF2F2'; optBorder = '#EF4444'; optColor = '#991B1B'; }
          if (theme === 'dark' && isCorrect) { optBg = 'rgba(16,185,129,0.15)'; optColor = '#34D399'; }
          if (theme === 'dark' && isWrong) { optBg = 'rgba(239,68,68,0.15)'; optColor = '#F87171'; }
          return React.createElement('button', {
            key: i,
            onClick: () => { if (!quizSubmitted) setQuizAnswer(i); },
            style: {
              width: '100%', padding: '14px 16px', marginBottom: 10,
              borderRadius: 12, border: `2px solid ${optBorder}`,
              background: optBg, cursor: quizSubmitted ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'all 0.2s ease', fontSize: 15, fontWeight: 500, color: optColor,
              fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
            }
          },
            React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, border: `2px solid ${isSelected ? t.primary : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: isSelected ? t.primary : 'transparent', transition: 'all 0.15s ease' } },
              isSelected && React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#FFFFFF' } }),
            ),
            opt,
            quizSubmitted && isCorrect && React.createElement(Icon, { name: 'Check', size: 18, color: '#10B981', style: { marginLeft: 'auto' } }),
            quizSubmitted && isWrong && React.createElement(Icon, { name: 'X', size: 18, color: '#EF4444', style: { marginLeft: 'auto' } }),
          );
        }),
        React.createElement('button', {
          onClick: () => { if (quizAnswer !== null) setQuizSubmitted(true); },
          style: {
            width: '100%', padding: '16px', marginTop: 8,
            borderRadius: 14, border: 'none',
            background: quizSubmitted ? (quizAnswer === quizData.correct ? t.success : t.danger) : (quizAnswer !== null ? t.cta : t.cardAlt),
            color: quizAnswer !== null || quizSubmitted ? '#FFFFFF' : t.textTertiary,
            fontSize: 17, fontWeight: 700, cursor: quizAnswer !== null && !quizSubmitted ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
          }
        }, quizSubmitted ? (quizAnswer === quizData.correct ? 'Glimmer Collected!' : 'Try Again Tomorrow') : 'Submit Answer'),
      ),

      // Glimmer preview
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: '16px', border: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'Glimmer Preview'),
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${glimmerData[3].color}, ${t.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Dna', size: 24, color: '#FFFFFF' }),
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 4 } }, glimmerData[3].title),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.5 } }, glimmerData[3].desc.slice(0, 90) + '...'),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: rarityColors[glimmerData[3].rarity] + '20', color: rarityColors[glimmerData[3].rarity] } }, glimmerData[3].rarity),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 6, background: t.cardAlt, color: t.textSecondary } }, glimmerData[3].category),
            ),
          ),
        ),
      ),
    );
  }

  // ── Archive Screen ──
  function ArchiveScreen() {
    const categories = ['All', 'Nature', 'Science', 'History', 'Literature', 'Chemistry', 'Biology'];
    const collected = glimmerData.filter(g => g.collected);
    const filtered = archiveFilter === 'All' ? collected : collected.filter(g => g.category === archiveFilter);
    const iconMap = { Nature: 'Leaf', Science: 'FlaskConical', History: 'Landmark', Literature: 'BookOpen', Chemistry: 'Atom', Biology: 'Dna' };

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Archive'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', { style: { width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`, background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
            React.createElement(Icon, { name: 'LayoutGrid', size: 18, color: t.primary }),
          ),
        ),
      ),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 16px' } }, collected.length + ' Glimmers in your collection'),

      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 } },
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat,
            onClick: () => setArchiveFilter(cat),
            style: {
              padding: '8px 14px', borderRadius: 20, border: 'none', whiteSpace: 'nowrap',
              background: archiveFilter === cat ? t.primary : t.cardAlt,
              color: archiveFilter === cat ? '#FFFFFF' : t.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease',
              fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
            }
          }, cat)
        ),
      ),

      // Glimmer grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
        ...filtered.map((glimmer, i) =>
          React.createElement('div', {
            key: glimmer.id,
            onClick: () => setShowGlimmerDetail(glimmer),
            style: {
              background: t.card, borderRadius: 16, padding: '16px', cursor: 'pointer',
              border: `1px solid ${t.border}`,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
              position: 'relative', overflow: 'hidden',
            }
          },
            React.createElement('div', { style: { position: 'absolute', top: -15, right: -15, width: 50, height: 50, borderRadius: '50%', background: glimmer.color + '15' } }),
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${glimmer.color}30, ${glimmer.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
              React.createElement(Icon, { name: iconMap[glimmer.category] || 'Sparkles', size: 20, color: glimmer.color }),
            ),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 6, lineHeight: 1.3 } }, glimmer.title),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: rarityColors[glimmer.rarity] } }),
              React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 500 } }, glimmer.rarity),
            ),
          )
        ),
      ),

      // Detail modal
      showGlimmerDetail && React.createElement('div', {
        onClick: () => setShowGlimmerDetail(null),
        style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50, animation: 'fadeIn 0.2s ease' }
      },
        React.createElement('div', {
          onClick: (e) => e.stopPropagation(),
          style: { background: t.card, borderRadius: 24, padding: '28px 20px', width: '100%', maxWidth: 320, animation: 'slideUp 0.3s ease', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }
        },
          React.createElement('div', { style: { width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${showGlimmerDetail.color}, ${t.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 } },
            React.createElement(Icon, { name: iconMap[showGlimmerDetail.category] || 'Sparkles', size: 28, color: '#FFFFFF' }),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: rarityColors[showGlimmerDetail.rarity] + '20', color: rarityColors[showGlimmerDetail.rarity], textTransform: 'uppercase', letterSpacing: 0.5 } }, showGlimmerDetail.rarity),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 8, background: t.cardAlt, color: t.textSecondary } }, showGlimmerDetail.category),
          ),
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 10px', letterSpacing: -0.3 } }, showGlimmerDetail.title),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 20px', lineHeight: 1.6 } }, showGlimmerDetail.desc),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            React.createElement('button', { style: { flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: t.primary, color: '#FFFFFF', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif" } },
              React.createElement(Icon, { name: 'Share2', size: 16, color: '#FFFFFF' }),
              React.createElement('span', null, 'Share'),
            ),
            React.createElement('button', {
              onClick: () => setShowGlimmerDetail(null),
              style: { flex: 1, padding: '12px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.cardAlt, color: t.text, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif" }
            }, 'Close'),
          ),
        ),
      ),
    );
  }

  // ── Seasons Screen ──
  function SeasonsScreen() {
    const seasons = [
      { name: 'Renaissance Rebels', icon: 'Palette', color: '#F59E0B', active: true, glimmers: '10/15', progress: 67 },
      { name: 'Deep Space Wonders', icon: 'Telescope', color: '#8B5CF6', active: false, glimmers: '0/12', progress: 0, upcoming: true },
      { name: 'Ocean Mysteries', icon: 'Waves', color: '#06B6D4', active: false, glimmers: '12/12', progress: 100, complete: true },
      { name: 'Ancient Civilizations', icon: 'Landmark', color: '#F97316', active: false, glimmers: '9/10', progress: 90, complete: true },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 4px' } }, 'Seasons'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 24px' } }, 'Themed expeditions with exclusive Glimmers'),

      // Active season banner
      React.createElement('div', { style: { background: `linear-gradient(135deg, #F59E0B, #D97706)`, borderRadius: 20, padding: '20px', marginBottom: 20, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(245,158,11,0.3)' } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
          React.createElement(Icon, { name: 'Zap', size: 14, color: '#FEF3C7' }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#FEF3C7', textTransform: 'uppercase', letterSpacing: 1 } }, 'Active Now'),
        ),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px' } }, 'Season of Renaissance Rebels'),
        React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '0 0 14px' } }, 'Explore art, invention, and rebellion of the Renaissance era'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
          React.createElement('span', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)' } }, '10 of 15 Glimmers'),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: '#FFFFFF' } }, '12 days left'),
        ),
        React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: '67%', background: '#FFFFFF', borderRadius: 3 } }),
        ),
      ),

      // Season list
      ...seasons.filter(s => !s.active).map((season, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 16, padding: '16px', marginBottom: 12,
            border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
            opacity: season.upcoming ? 0.6 : 1, cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }
        },
          React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: season.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: season.icon, size: 22, color: season.color }),
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 4 } }, season.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              season.complete && React.createElement(Icon, { name: 'CheckCircle', size: 14, color: t.success }),
              React.createElement('span', { style: { fontSize: 13, color: season.complete ? t.success : t.textSecondary, fontWeight: season.complete ? 600 : 400 } },
                season.upcoming ? 'Coming Soon' : season.complete ? 'Completed' : season.glimmers
              ),
            ),
          ),
          !season.upcoming && React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textTertiary }),
          ),
          season.upcoming && React.createElement(Icon, { name: 'Lock', size: 16, color: t.textTertiary }),
        )
      ),

      // Rewards section
      React.createElement('div', { style: { marginTop: 8 } },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 } }, 'Season Rewards'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          [
            { icon: 'Frame', label: 'Gold Frame', earned: true },
            { icon: 'Gem', label: 'Crystal Theme', earned: true },
            { icon: 'Star', label: 'Master Badge', earned: false },
          ].map((reward, i) =>
            React.createElement('div', {
              key: i,
              style: { background: reward.earned ? t.primary + '10' : t.cardAlt, borderRadius: 14, padding: '14px 8px', textAlign: 'center', border: `1px solid ${reward.earned ? t.primary + '30' : t.border}` }
            },
              React.createElement(Icon, { name: reward.icon, size: 22, color: reward.earned ? t.primary : t.textTertiary, style: { marginBottom: 6 } }),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 500, color: reward.earned ? t.text : t.textTertiary } }, reward.label),
              reward.earned && React.createElement(Icon, { name: 'Check', size: 12, color: t.success, style: { marginTop: 4 } }),
            )
          ),
        ),
      ),
    );
  }

  // ── Profile Screen ──
  function ProfileScreen() {
    const stats = [
      { label: 'Total Glimmers', value: '24', icon: 'Sparkles' },
      { label: 'Day Streak', value: '7', icon: 'Flame' },
      { label: 'Seasons Done', value: '2', icon: 'Crown' },
      { label: 'Challenges Won', value: '19', icon: 'Target' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 24px' } }, 'Profile'),

      // Profile card
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '24px 20px', marginBottom: 20, border: `1px solid ${t.border}`, textAlign: 'center' } },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 4px 16px ${t.primary}40` } },
          React.createElement(Icon, { name: 'User', size: 32, color: '#FFFFFF' }),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Curious Explorer'),
        React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 16 } }, 'Joined March 2026'),
        React.createElement('div', { style: { display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' } },
          ['Renaissance Rebel', 'Ocean Scholar', '7-Day Streak'].map((badge, i) =>
            React.createElement('span', { key: i, style: { fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: [t.cta + '15', '#06B6D4' + '15', '#10B981' + '15'][i], color: [t.cta, '#06B6D4', '#10B981'][i] } }, badge)
          ),
        ),
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 } },
        ...stats.map((stat, i) =>
          React.createElement('div', { key: i, style: { background: t.card, borderRadius: 14, padding: '16px', border: `1px solid ${t.border}` } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement(Icon, { name: stat.icon, size: 16, color: t.primary }),
              React.createElement('span', { style: { fontSize: 13, color: t.textSecondary } }, stat.label),
            ),
            React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5 } }, stat.value),
          )
        ),
      ),

      // Settings menu
      React.createElement('div', { style: { background: t.card, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` } },
        [
          { icon: 'Bell', label: 'Ambient Notifications', toggle: true },
          { icon: 'Palette', label: 'Archive Theme', value: 'Classic' },
          { icon: 'Shield', label: 'Privacy', value: '' },
          { icon: 'HelpCircle', label: 'Help & FAQ', value: '' },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12,
              borderBottom: i < 3 ? `1px solid ${t.border}` : 'none', cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.cardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: item.icon, size: 18, color: t.primary }),
            ),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 500, color: t.text, flex: 1 } }, item.label),
            item.toggle ? React.createElement('div', { style: { width: 48, height: 28, borderRadius: 14, background: t.success, padding: 2, cursor: 'pointer' } },
              React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: '#FFFFFF', marginLeft: 20, transition: 'margin 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' } }),
            ) : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              item.value && React.createElement('span', { style: { fontSize: 13, color: t.textTertiary } }, item.value),
              React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textTertiary }),
            ),
          )
        ),
      ),
    );
  }

  const screens = { home: HomeScreen, discover: DiscoverScreen, archive: ArchiveScreen, seasons: SeasonsScreen, profile: ProfileScreen };
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'discover', icon: 'Compass', label: 'Discover' },
    { id: 'archive', icon: 'Archive', label: 'Archive' },
    { id: 'seasons', icon: 'Crown', label: 'Seasons' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const ScreenComponent = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
    }
  },
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        borderRadius: 44, overflow: 'hidden',
        background: t.bg,
        position: 'relative',
        boxShadow: '0 20px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Content area
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 8, paddingBottom: 0,
        }
      },
        React.createElement(ScreenComponent),
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          background: t.tabBar,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingTop: 8, paddingBottom: 28, flexShrink: 0,
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 8px', minWidth: 44, minHeight: 44,
              transition: 'all 0.15s ease',
            }
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.primary : t.tabInactive,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 500,
                color: activeScreen === tab.id ? t.primary : t.tabInactive,
                transition: 'color 0.15s ease',
              }
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
