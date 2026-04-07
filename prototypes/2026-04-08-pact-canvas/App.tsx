const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animateIn, setAnimateIn] = useState(true);
  const [prevScreen, setPrevScreen] = useState('home');

  const themes = {
    dark: {
      bg: '#0A0A0B',
      surface: '#18181B',
      surfaceAlt: '#1E1E22',
      card: '#27272A',
      cardHover: '#2E2E33',
      text: '#FAFAFA',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#EC4899',
      ctaHover: '#F472B6',
      ctaGlow: 'rgba(236, 72, 153, 0.3)',
      border: '#3F3F46',
      borderLight: '#27272A',
      gradient1: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
      gradient2: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
      gradient3: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      overlay: 'rgba(0,0,0,0.6)',
      tabBg: '#111113',
      success: '#22C55E',
      warning: '#F59E0B',
    },
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F4F5',
      card: '#FFFFFF',
      cardHover: '#F9F9FA',
      text: '#18181B',
      textSecondary: '#52525B',
      textMuted: '#A1A1AA',
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#EC4899',
      ctaHover: '#DB2777',
      ctaGlow: 'rgba(236, 72, 153, 0.2)',
      border: '#E4E4E7',
      borderLight: '#F4F4F5',
      gradient1: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
      gradient2: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
      gradient3: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      overlay: 'rgba(0,0,0,0.3)',
      tabBg: '#FFFFFF',
      success: '#16A34A',
      warning: '#D97706',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const switchScreen = (screen) => {
    if (screen === activeScreen) return;
    setPrevScreen(activeScreen);
    setAnimateIn(false);
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimateIn(true);
    }, 150);
  };

  // Lucide icons helper
  const Icon = ({ name, size = 24, color, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  // Animated number
  const AnimNumber = ({ value, suffix = '' }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let start = 0;
      const step = Math.ceil(value / 30);
      const timer = setInterval(() => {
        start += step;
        if (start >= value) { setDisplay(value); clearInterval(timer); }
        else setDisplay(start);
      }, 20);
      return () => clearInterval(timer);
    }, [value]);
    return React.createElement('span', null, display.toLocaleString() + suffix);
  };

  // Progress ring
  const ProgressRing = ({ percent, size = 48, stroke = 3, color = t.cta }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return React.createElement('svg', { width: size, height: size, style: { transform: 'rotate(-90deg)' } },
      React.createElement('circle', { cx: size/2, cy: size/2, r, fill: 'none', stroke: t.border, strokeWidth: stroke }),
      React.createElement('circle', { cx: size/2, cy: size/2, r, fill: 'none', stroke: color, strokeWidth: stroke, strokeDasharray: circ, strokeDashoffset: offset, strokeLinecap: 'round', style: { transition: 'stroke-dashoffset 1s ease' } })
    );
  };

  // Avatar component
  const Avatar = ({ name, size = 40, bg }) => {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
    return React.createElement('div', { style: { width: size, height: size, borderRadius: '50%', background: bg || t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontWeight: 700, fontSize: size * 0.38, color: '#fff', flexShrink: 0 } }, initials);
  };

  // Badge pill
  const Badge = ({ label, color = t.cta, small = false }) => {
    return React.createElement('span', { style: { background: color + '20', color, fontSize: small ? 11 : 13, fontWeight: 600, padding: small ? '2px 8px' : '4px 10px', borderRadius: 20, fontFamily: font, whiteSpace: 'nowrap' } }, label);
  };

  // Button component
  const Btn = ({ label, onClick, primary = true, icon, small = false, full = false, style: extraStyle = {} }) => {
    const [pressed, setPressed] = useState(false);
    return React.createElement('button', {
      onClick, onMouseDown: () => setPressed(true), onMouseUp: () => setPressed(false), onMouseLeave: () => setPressed(false),
      style: {
        background: primary ? t.cta : 'transparent',
        color: primary ? '#fff' : t.text,
        border: primary ? 'none' : `1.5px solid ${t.border}`,
        borderRadius: 14, padding: small ? '8px 16px' : '12px 24px',
        fontFamily: font, fontWeight: 600, fontSize: small ? 14 : 16,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : 'auto',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        boxShadow: primary ? `0 4px 20px ${t.ctaGlow}` : 'none',
        transition: 'all 150ms ease', minHeight: 44, ...extraStyle
      }
    }, icon && React.createElement(Icon, { name: icon, size: small ? 16 : 18, color: primary ? '#fff' : t.text }),
       React.createElement('span', null, label));
  };

  // ===== HOME SCREEN =====
  const HomeScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState('trending');
    const filters = ['trending', 'new', 'ending soon', 'top backed'];

    const pacts = [
      { id: 1, creator: 'Maya Chen', title: '30-Day Watercolor Series', desc: 'One watercolor landscape every day for 30 days, documenting my journey across the Pacific Northwest.', goal: 2500, backed: 1875, backers: 34, days: 12, progress: 65, milestones: 19, category: 'Visual Art', gradient: t.gradient1 },
      { id: 2, creator: 'Jamal Rivers', title: 'Ambient Album "Drift"', desc: 'Producing a full 8-track ambient electronic album in 6 weeks. Live updates from the studio.', goal: 5000, backed: 3200, backers: 67, days: 24, progress: 45, milestones: 8, category: 'Music', gradient: t.gradient2 },
      { id: 3, creator: 'Lina Park', title: 'Short Film: "Between Frames"', desc: 'A 12-minute animated short exploring memory and identity. From storyboard to final render.', goal: 8000, backed: 6400, backers: 112, days: 18, progress: 80, milestones: 24, category: 'Film', gradient: t.gradient3 },
    ];

    return React.createElement('div', { style: { padding: '0 20px', paddingBottom: 100 } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 24, animation: 'fadeIn 0.6s ease' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Pact Canvas'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0', fontWeight: 400 } }, 'Commit. Create. Earn.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', { onClick: () => setIsDark(!isDark), style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms ease' } },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.textSecondary })
          ),
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' } },
            React.createElement(Icon, { name: 'Bell', size: 20, color: t.textSecondary }),
            React.createElement('div', { style: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: '50%', background: t.cta, animation: 'pulse 2s infinite' } })
          )
        )
      ),

      // Stats bar
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 24, animation: 'slideUp 0.5s ease' } },
        [{ label: 'Active Pacts', value: 847, icon: 'Flame' }, { label: 'Backed Today', value: 12400, icon: 'TrendingUp', prefix: '$' }, { label: 'Creators', value: 2300, icon: 'Users' }].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surfaceAlt, borderRadius: 16, padding: '14px 12px', textAlign: 'center', border: `1px solid ${t.borderLight}` } },
            React.createElement(Icon, { name: stat.icon, size: 18, color: t.cta, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text } }, stat.prefix || '', React.createElement(AnimNumber, { value: stat.value })),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, fontWeight: 500 } }, stat.label)
          )
        )
      ),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', animation: 'slideUp 0.6s ease' } },
        filters.map(f =>
          React.createElement('button', { key: f, onClick: () => setSelectedFilter(f), style: {
            background: selectedFilter === f ? t.cta : t.surfaceAlt,
            color: selectedFilter === f ? '#fff' : t.textSecondary,
            border: 'none', borderRadius: 20, padding: '8px 16px', fontFamily: font, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 200ms ease', minHeight: 36,
            boxShadow: selectedFilter === f ? `0 2px 12px ${t.ctaGlow}` : 'none'
          } }, f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),

      // Pact cards
      pacts.map((pact, i) =>
        React.createElement('div', { key: pact.id, onClick: () => switchScreen('pactDetail'), style: {
          background: t.card, borderRadius: 20, padding: 0, marginBottom: 16, overflow: 'hidden',
          border: `1px solid ${t.borderLight}`, cursor: 'pointer',
          transition: 'all 200ms ease', animation: `slideUp ${0.5 + i * 0.15}s ease`
        } },
          // Card header with gradient
          React.createElement('div', { style: { background: pact.gradient, padding: '16px 18px', position: 'relative', overflow: 'hidden' } },
            React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' } }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', null,
                React.createElement(Badge, { label: pact.category, color: '#fff', small: true }),
                React.createElement('h3', { style: { fontFamily: font, fontSize: 19, fontWeight: 700, color: '#fff', margin: '8px 0 0', letterSpacing: -0.3 } }, pact.title)
              ),
              React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 10px', backdropFilter: 'blur(10px)' } },
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: '#fff', fontWeight: 600 } }, pact.days + 'd left')
              )
            )
          ),
          // Card body
          React.createElement('div', { style: { padding: '14px 18px 18px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
              React.createElement(Avatar, { name: pact.creator, size: 32 }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text } }, pact.creator),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, pact.milestones + ' updates')
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, pact.desc),
            // Progress
            React.createElement('div', { style: { marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, pact.progress + '% complete'),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta } }, '$' + pact.backed.toLocaleString() + ' / $' + pact.goal.toLocaleString())
              ),
              React.createElement('div', { style: { height: 6, background: t.borderLight, borderRadius: 3, overflow: 'hidden' } },
                React.createElement('div', { style: { width: (pact.backed / pact.goal * 100) + '%', height: '100%', background: t.gradient1, borderRadius: 3, transition: 'width 1s ease', animation: 'shimmer 2s infinite' } })
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, pact.backers + ' backers')
              ),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: 'Heart', size: 16, color: t.textMuted })
                ),
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: 'Share2', size: 16, color: t.textMuted })
                )
              )
            )
          )
        )
      )
    );
  };

  // ===== PACT DETAIL SCREEN =====
  const PactDetailScreen = () => {
    const [activeTab, setActiveTab] = useState('milestones');
    const [boosted, setBoosted] = useState(false);
    const [backed, setBacked] = useState(false);

    const milestones = [
      { date: 'Apr 7', title: 'Color palette finalized', desc: 'Settled on a warm, muted palette inspired by PNW autumn light.', type: 'update', likes: 18 },
      { date: 'Apr 5', title: 'Day 19: Crater Lake', desc: 'Challenging reflections today. Used wet-on-wet technique for the water.', type: 'sketch', likes: 42 },
      { date: 'Apr 3', title: 'Day 17: Mount Hood', desc: 'Experimented with atmospheric perspective. Really happy with the depth.', type: 'sketch', likes: 35 },
      { date: 'Apr 1', title: 'Milestone: 15 paintings done!', desc: 'Halfway mark reached! Feeling more confident with each piece.', type: 'milestone', likes: 89 },
    ];

    return React.createElement('div', { style: { paddingBottom: 100 } },
      // Back header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 12 } },
        React.createElement('div', { onClick: () => switchScreen('home'), style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
          React.createElement(Icon, { name: 'ChevronLeft', size: 22 })
        ),
        React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, flex: 1 } }, 'Pact Details'),
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
          React.createElement(Icon, { name: 'MoreHorizontal', size: 22 })
        )
      ),

      // Hero
      React.createElement('div', { style: { margin: '0 20px 20px', background: t.gradient1, borderRadius: 24, padding: '24px 20px', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.5s ease' } },
        React.createElement('div', { style: { position: 'absolute', bottom: -30, right: -10, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', top: -20, left: '50%', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
        React.createElement(Badge, { label: 'Visual Art', color: '#fff', small: true }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 24, fontWeight: 800, color: '#fff', margin: '10px 0 6px', letterSpacing: -0.5 } }, '30-Day Watercolor Series'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement(Avatar, { name: 'Maya Chen', size: 28 }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500 } }, 'Maya Chen'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, '12 days remaining')
        ),
        // Progress
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff' } }, '$1,875'),
            React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.7)' } }, 'of $2,500')
          ),
          React.createElement('div', { style: { height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { width: '75%', height: '100%', background: '#fff', borderRadius: 3, animation: 'shimmer 2s infinite' } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, '34 backers'),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, '65% complete')
          )
        )
      ),

      // Action buttons
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 20px', marginBottom: 24, animation: 'slideUp 0.5s ease' } },
        React.createElement('button', { onClick: () => setBacked(!backed), style: {
          flex: 2, background: backed ? t.success : t.cta, color: '#fff', border: 'none', borderRadius: 14,
          padding: '14px 0', fontFamily: font, fontWeight: 700, fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 4px 20px ${backed ? 'rgba(34,197,94,0.3)' : t.ctaGlow}`,
          transition: 'all 200ms ease', minHeight: 48
        } },
          React.createElement(Icon, { name: backed ? 'Check' : 'HandCoins', size: 20, color: '#fff' }),
          React.createElement('span', null, backed ? 'Backed!' : 'Back this Pact')
        ),
        React.createElement('button', { onClick: () => setBoosted(!boosted), style: {
          flex: 1, background: boosted ? t.warning + '20' : t.surfaceAlt, color: boosted ? t.warning : t.text,
          border: `1.5px solid ${boosted ? t.warning : t.border}`, borderRadius: 14,
          padding: '14px 0', fontFamily: font, fontWeight: 600, fontSize: 15, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 200ms ease', minHeight: 48
        } },
          React.createElement(Icon, { name: 'Zap', size: 18, color: boosted ? t.warning : t.textSecondary }),
          React.createElement('span', null, 'Boost')
        )
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', padding: '0 20px', gap: 0, marginBottom: 20, background: t.surfaceAlt, borderRadius: 14, marginLeft: 20, marginRight: 20, padding: 4 } },
        ['milestones', 'critiques', 'details'].map(tab =>
          React.createElement('button', { key: tab, onClick: () => setActiveTab(tab), style: {
            flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', fontFamily: font, fontSize: 14, fontWeight: 600,
            background: activeTab === tab ? t.card : 'transparent', color: activeTab === tab ? t.text : t.textMuted,
            cursor: 'pointer', transition: 'all 200ms ease', boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
          } }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Milestones list
      React.createElement('div', { style: { padding: '0 20px' } },
        milestones.map((m, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', gap: 14, marginBottom: 20, animation: `slideUp ${0.4 + i * 0.1}s ease`
          } },
            // Timeline dot
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 } },
              React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: m.type === 'milestone' ? t.cta : t.border, boxShadow: m.type === 'milestone' ? `0 0 8px ${t.ctaGlow}` : 'none' } }),
              i < milestones.length - 1 && React.createElement('div', { style: { width: 2, flex: 1, background: t.borderLight, marginTop: 4 } })
            ),
            // Content
            React.createElement('div', { style: { flex: 1, background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.borderLight}` } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, fontWeight: 500 } }, m.date),
                m.type === 'milestone' && React.createElement(Badge, { label: 'Milestone', color: t.cta, small: true })
              ),
              React.createElement('h4', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, m.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: '0 0 10px', lineHeight: 1.45 } }, m.desc),
              React.createElement('div', { style: { display: 'flex', gap: 16 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' } },
                  React.createElement(Icon, { name: 'Heart', size: 14, color: t.textMuted }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, m.likes)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' } },
                  React.createElement(Icon, { name: 'MessageCircle', size: 14, color: t.textMuted }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, 'Reply')
                )
              )
            )
          )
        )
      )
    );
  };

  // ===== EXPLORE SCREEN =====
  const ExploreScreen = () => {
    const [searchFocus, setSearchFocus] = useState(false);

    const categories = [
      { name: 'Visual Art', icon: 'Palette', count: 234 },
      { name: 'Music', icon: 'Music', count: 189 },
      { name: 'Writing', icon: 'PenTool', count: 156 },
      { name: 'Film', icon: 'Film', count: 98 },
      { name: 'Design', icon: 'Layers', count: 312 },
      { name: 'Code', icon: 'Code', count: 145 },
    ];

    const challenges = [
      { title: '7-Day Portrait Challenge', guild: 'Brushstrokes Guild', participants: 89, days: 3, gradient: t.gradient1 },
      { title: 'Beat-a-Day Producer Sprint', guild: 'Sound Forge Guild', participants: 45, days: 5, gradient: t.gradient2 },
    ];

    const leaderboard = [
      { rank: 1, name: 'Aria Morales', pacts: 28, completed: 27, streak: 14, badge: 'Legendary' },
      { rank: 2, name: 'Dex Langford', pacts: 22, completed: 21, streak: 9, badge: 'Master' },
      { rank: 3, name: 'Yuki Sato', pacts: 19, completed: 19, streak: 19, badge: 'Perfectionist' },
      { rank: 4, name: 'Sam Okafor', pacts: 17, completed: 15, streak: 6, badge: 'Rising Star' },
    ];

    return React.createElement('div', { style: { padding: '0 20px', paddingBottom: 100 } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '16px 0 20px', animation: 'fadeIn 0.4s ease' } }, 'Explore'),

      // Search
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, borderRadius: 14, padding: '12px 16px',
        marginBottom: 24, border: `1.5px solid ${searchFocus ? t.cta : t.borderLight}`,
        transition: 'all 200ms ease', animation: 'slideUp 0.4s ease'
      } },
        React.createElement(Icon, { name: 'Search', size: 20, color: t.textMuted }),
        React.createElement('input', { placeholder: 'Search pacts, creators, guilds...', onFocus: () => setSearchFocus(true), onBlur: () => setSearchFocus(false), style: {
          flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: font, fontSize: 16, color: t.text
        } })
      ),

      // Categories
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Categories'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          categories.map((cat, i) =>
            React.createElement('div', { key: cat.name, style: {
              background: t.card, borderRadius: 16, padding: '16px 12px', textAlign: 'center',
              border: `1px solid ${t.borderLight}`, cursor: 'pointer',
              transition: 'all 200ms ease', animation: `slideUp ${0.3 + i * 0.08}s ease`
            } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.cta + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { name: cat.icon, size: 20, color: t.cta })
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text } }, cat.name),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, marginTop: 2 } }, cat.count + ' pacts')
            )
          )
        )
      ),

      // Guild Challenges
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Guild Challenges'),
          React.createElement(Icon, { name: 'ArrowRight', size: 20, color: t.textMuted })
        ),
        challenges.map((ch, i) =>
          React.createElement('div', { key: i, style: {
            background: ch.gradient, borderRadius: 20, padding: '20px 18px', marginBottom: 12,
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
            animation: `slideUp ${0.5 + i * 0.15}s ease`
          } },
            React.createElement('div', { style: { position: 'absolute', top: -15, right: 20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
              React.createElement(Icon, { name: 'Shield', size: 16, color: 'rgba(255,255,255,0.8)' }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 } }, ch.guild)
            ),
            React.createElement('h3', { style: { fontFamily: font, fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 10px' } }, ch.title),
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 14, color: 'rgba(255,255,255,0.7)' }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, ch.participants + ' joined')
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Clock', size: 14, color: 'rgba(255,255,255,0.7)' }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' } }, ch.days + ' days left')
              )
            )
          )
        )
      ),

      // Leaderboard
      React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Top Creators'),
        leaderboard.map((user, i) =>
          React.createElement('div', { key: i, onClick: () => switchScreen('profile'), style: {
            display: 'flex', alignItems: 'center', gap: 14, background: t.card, borderRadius: 16,
            padding: '14px 16px', marginBottom: 10, border: `1px solid ${t.borderLight}`,
            cursor: 'pointer', transition: 'all 200ms ease', animation: `slideUp ${0.5 + i * 0.1}s ease`
          } },
            React.createElement('div', { style: { width: 28, fontFamily: font, fontSize: 17, fontWeight: 800, color: i === 0 ? t.cta : t.textMuted, textAlign: 'center' } }, '#' + user.rank),
            React.createElement(Avatar, { name: user.name, size: 40, bg: i === 0 ? t.gradient1 : i === 1 ? t.gradient2 : i === 2 ? t.gradient3 : t.secondary }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, user.name),
              React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, user.completed + '/' + user.pacts + ' pacts completed')
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement(Badge, { label: user.badge, color: i === 0 ? t.cta : i === 1 ? '#8B5CF6' : i === 2 ? '#06B6D4' : t.success, small: true }),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 } },
                React.createElement(Icon, { name: 'Flame', size: 12, color: t.warning }),
                user.streak + ' streak'
              )
            )
          )
        )
      )
    );
  };

  // ===== CREATE SCREEN =====
  const CreateScreen = () => {
    const [step, setStep] = useState(1);
    const [pactType, setPactType] = useState(null);

    const types = [
      { id: 'personal', title: 'Personal Pact', desc: 'Set a creative goal with public accountability', icon: 'Target', gradient: t.gradient1 },
      { id: 'commission', title: 'Commission Pact', desc: 'Open your creative skills for client commissions', icon: 'Handshake', gradient: t.gradient2 },
      { id: 'challenge', title: 'Challenge Entry', desc: 'Join an active Guild Challenge', icon: 'Trophy', gradient: t.gradient3 },
    ];

    return React.createElement('div', { style: { padding: '0 20px', paddingBottom: 100 } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '16px 0 8px', animation: 'fadeIn 0.4s ease' } }, 'Create Pact'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 24px', animation: 'fadeIn 0.5s ease' } }, 'Transform your creative intention into a commitment'),

      // Step indicator
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 28, animation: 'slideUp 0.4s ease' } },
        [1, 2, 3].map(s =>
          React.createElement('div', { key: s, style: { flex: 1, height: 4, borderRadius: 2, background: s <= step ? t.cta : t.borderLight, transition: 'all 300ms ease' } })
        )
      ),

      step === 1 && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 16px', letterSpacing: -0.3 } }, 'Choose your Pact type'),
        types.map((type, i) =>
          React.createElement('div', { key: type.id, onClick: () => { setPactType(type.id); setStep(2); }, style: {
            background: pactType === type.id ? t.cta + '10' : t.card, borderRadius: 20, padding: '20px 18px',
            marginBottom: 12, border: `1.5px solid ${pactType === type.id ? t.cta : t.borderLight}`,
            cursor: 'pointer', transition: 'all 200ms ease', display: 'flex', gap: 16, alignItems: 'center',
            animation: `slideUp ${0.4 + i * 0.12}s ease`
          } },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: 16, background: type.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: type.icon, size: 26, color: '#fff' })
            ),
            React.createElement('div', null,
              React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, type.title),
              React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0, lineHeight: 1.4 } }, type.desc)
            ),
            React.createElement(Icon, { name: 'ChevronRight', size: 20, color: t.textMuted })
          )
        )
      ),

      step === 2 && React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { onClick: () => setStep(1), style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, cursor: 'pointer' } },
          React.createElement(Icon, { name: 'ChevronLeft', size: 18, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, color: t.textMuted } }, 'Back')
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 20px', letterSpacing: -0.3 } }, 'Pact Details'),

        // Form fields
        [
          { label: 'Title', placeholder: 'Give your pact a compelling name', icon: 'Type' },
          { label: 'Description', placeholder: 'What will you create? Be specific...', icon: 'AlignLeft', multi: true },
        ].map((field, i) =>
          React.createElement('div', { key: i, style: { marginBottom: 18 } },
            React.createElement('label', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, display: 'block', marginBottom: 8 } }, field.label),
            React.createElement(field.multi ? 'textarea' : 'input', { placeholder: field.placeholder, rows: field.multi ? 4 : undefined, style: {
              width: '100%', boxSizing: 'border-box', background: t.surfaceAlt, border: `1.5px solid ${t.borderLight}`, borderRadius: 14,
              padding: '14px 16px', fontFamily: font, fontSize: 16, color: t.text, outline: 'none',
              resize: field.multi ? 'vertical' : 'none', lineHeight: 1.5, transition: 'border 200ms ease'
            } })
          )
        ),

        // Payout & deadline row
        React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 18 } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('label', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, display: 'block', marginBottom: 8 } }, 'Payout Goal'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', background: t.surfaceAlt, border: `1.5px solid ${t.borderLight}`, borderRadius: 14, padding: '0 16px' } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 18, fontWeight: 600, color: t.textMuted } }, '$'),
              React.createElement('input', { placeholder: '0', type: 'number', style: { flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: font, fontSize: 16, color: t.text, padding: '14px 8px' } })
            )
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('label', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, display: 'block', marginBottom: 8 } }, 'Deadline'),
            React.createElement('input', { type: 'date', style: { width: '100%', boxSizing: 'border-box', background: t.surfaceAlt, border: `1.5px solid ${t.borderLight}`, borderRadius: 14, padding: '14px 16px', fontFamily: font, fontSize: 16, color: t.text, outline: 'none' } })
          )
        ),

        // Category select
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('label', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text, display: 'block', marginBottom: 8 } }, 'Category'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            ['Visual Art', 'Music', 'Writing', 'Film', 'Design', 'Code', 'Photography', 'Crafts'].map(cat =>
              React.createElement('button', { key: cat, style: { background: t.surfaceAlt, border: `1.5px solid ${t.borderLight}`, borderRadius: 20, padding: '8px 14px', fontFamily: font, fontSize: 13, fontWeight: 500, color: t.textSecondary, cursor: 'pointer', transition: 'all 200ms ease' } }, cat)
            )
          )
        ),

        React.createElement(Btn, { label: 'Continue to Milestones', onClick: () => setStep(3), primary: true, full: true, icon: 'ArrowRight' })
      ),

      step === 3 && React.createElement('div', { style: { animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { onClick: () => setStep(2), style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, cursor: 'pointer' } },
          React.createElement(Icon, { name: 'ChevronLeft', size: 18, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, color: t.textMuted } }, 'Back')
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: -0.3 } }, 'Set Milestones'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textMuted, margin: '0 0 24px', lineHeight: 1.5 } }, 'Break your pact into checkpoints. Backers will see these as proof of progress.'),

        [
          { title: 'Research & Concept', desc: 'Gather references and sketch initial concepts' },
          { title: 'First Draft', desc: 'Produce the first complete version' },
          { title: 'Refine & Polish', desc: 'Incorporate feedback and finalize' },
        ].map((m, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 14, background: t.card, borderRadius: 16,
            padding: '16px', marginBottom: 10, border: `1px solid ${t.borderLight}`,
            animation: `slideUp ${0.3 + i * 0.1}s ease`
          } },
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.cta + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontSize: 14, fontWeight: 700, color: t.cta } }, i + 1),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, m.title),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, m.desc)
            ),
            React.createElement(Icon, { name: 'GripVertical', size: 18, color: t.textMuted })
          )
        ),

        React.createElement('button', { style: {
          width: '100%', background: 'transparent', border: `2px dashed ${t.border}`, borderRadius: 16,
          padding: '16px', fontFamily: font, fontSize: 14, fontWeight: 600, color: t.textMuted,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 24, transition: 'all 200ms ease', minHeight: 48
        } },
          React.createElement(Icon, { name: 'Plus', size: 18, color: t.textMuted }),
          'Add Milestone'
        ),

        React.createElement(Btn, { label: 'Publish Pact', onClick: () => { setStep(1); switchScreen('home'); }, primary: true, full: true, icon: 'Rocket' })
      )
    );
  };

  // ===== SHOWCASE SCREEN =====
  const ShowcaseScreen = () => {
    const works = [
      { title: 'Pacific Northwest Series', creator: 'Maya Chen', type: 'Watercolor Collection', price: 450, sold: 12, gradient: t.gradient1, status: 'Available' },
      { title: 'Drift - Ambient Album', creator: 'Jamal Rivers', type: 'Digital Album', price: 15, sold: 234, gradient: t.gradient2, status: 'Pre-order' },
      { title: 'Between Frames', creator: 'Lina Park', type: 'Animated Short', price: 25, sold: 89, gradient: t.gradient3, status: 'Coming Soon' },
      { title: 'Typography Zine Vol. 3', creator: 'Dex Langford', type: 'Digital Print', price: 12, sold: 56, gradient: 'linear-gradient(135deg, #10B981, #3B82F6)', status: 'Available' },
    ];

    const featured = works[0];

    return React.createElement('div', { style: { padding: '0 20px', paddingBottom: 100 } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '16px 0 20px', animation: 'fadeIn 0.4s ease' } }, 'Showcase'),

      // Featured work
      React.createElement('div', { style: {
        background: featured.gradient, borderRadius: 24, padding: '28px 22px', marginBottom: 24,
        position: 'relative', overflow: 'hidden', animation: 'slideUp 0.5s ease', cursor: 'pointer'
      } },
        React.createElement('div', { style: { position: 'absolute', top: '50%', right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' } }),
        React.createElement(Badge, { label: 'Featured', color: '#fff' }),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 24, fontWeight: 800, color: '#fff', margin: '12px 0 6px', letterSpacing: -0.5 } }, featured.title),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement(Avatar, { name: featured.creator, size: 28 }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, color: 'rgba(255,255,255,0.9)' } }, featured.creator)
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff' } }, '$' + featured.price),
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, featured.sold + ' sold')
          ),
          React.createElement('button', { style: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 14, padding: '12px 24px', fontFamily: font, fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)', minHeight: 44 } }, 'View Work')
        )
      ),

      // Section title
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Completed Pacts'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          ['All', 'Art', 'Music'].map((f, i) =>
            React.createElement('button', { key: f, style: { background: i === 0 ? t.cta : t.surfaceAlt, color: i === 0 ? '#fff' : t.textMuted, border: 'none', borderRadius: 10, padding: '6px 12px', fontFamily: font, fontSize: 12, fontWeight: 600, cursor: 'pointer' } }, f)
          )
        )
      ),

      // Works grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
        works.slice(1).map((work, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.borderLight}`,
            cursor: 'pointer', transition: 'all 200ms ease', animation: `slideUp ${0.4 + i * 0.12}s ease`
          } },
            React.createElement('div', { style: { background: work.gradient, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' } },
              React.createElement('div', { style: { position: 'absolute', top: 8, right: 8 } },
                React.createElement(Badge, { label: work.status, color: '#fff', small: true })
              ),
              React.createElement(Icon, { name: 'Play', size: 32, color: 'rgba(255,255,255,0.8)' })
            ),
            React.createElement('div', { style: { padding: '12px 14px' } },
              React.createElement('h4', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 3px', lineHeight: 1.3 } }, work.title),
              React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, marginBottom: 8 } }, work.creator),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.cta } }, '$' + work.price),
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.textMuted } }, work.sold + ' sold')
              )
            )
          )
        )
      ),

      // Recent reviews
      React.createElement('div', { style: { marginTop: 28 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Community Reviews'),
        [
          { author: 'Kai Brennan', text: 'Maya\'s watercolors capture light in a way I\'ve never seen before. The daily progress was so inspiring to follow.', rating: 5, pact: 'Pacific Northwest Series' },
          { author: 'Risa Tanaka', text: 'Incredible production quality on Drift. Watching Jamal build each track from scratch was educational and mesmerizing.', rating: 5, pact: 'Drift Album' },
        ].map((review, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.borderLight}`,
            animation: `slideUp ${0.6 + i * 0.1}s ease`
          } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
              React.createElement(Avatar, { name: review.author, size: 32 }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: t.text } }, review.author),
                React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textMuted } }, review.pact)
              ),
              React.createElement('div', { style: { display: 'flex', gap: 2 } },
                [1,2,3,4,5].map(s =>
                  React.createElement(Icon, { key: s, name: 'Star', size: 12, color: s <= review.rating ? '#F59E0B' : t.borderLight })
                )
              )
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 14, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, review.text)
          )
        )
      )
    );
  };

  // ===== PROFILE SCREEN =====
  const ProfileScreen = () => {
    const [activeProfileTab, setActiveProfileTab] = useState('active');

    const stats = [
      { label: 'Pacts', value: 12 },
      { label: 'Completed', value: 10 },
      { label: 'Earned', value: '$8,420' },
      { label: 'Streak', value: '7d' },
    ];

    const badges = [
      { name: 'First Pact', icon: 'Award', color: '#EC4899' },
      { name: '10x Creator', icon: 'Star', color: '#8B5CF6' },
      { name: 'Perfect Streak', icon: 'Flame', color: '#F59E0B' },
      { name: 'Community Fav', icon: 'Heart', color: '#EF4444' },
      { name: 'Speed Demon', icon: 'Zap', color: '#06B6D4' },
    ];

    return React.createElement('div', { style: { padding: '0 20px', paddingBottom: 100 } },
      // Header
      React.createElement('div', { style: { textAlign: 'center', paddingTop: 16, marginBottom: 24, animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { style: { position: 'relative', display: 'inline-block', marginBottom: 12 } },
          React.createElement(Avatar, { name: 'You Creator', size: 80, bg: t.gradient1 }),
          React.createElement('div', { style: { position: 'absolute', bottom: 0, right: -4, width: 28, height: 28, borderRadius: '50%', background: t.success, border: `3px solid ${t.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'Check', size: 14, color: '#fff' })
          )
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.3 } }, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 4px' } }, 'Illustrator & Motion Designer'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 } }, 'Member since Jan 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 } },
          React.createElement(Btn, { label: 'Edit Profile', small: true, primary: false, icon: 'Edit3' }),
          React.createElement(Btn, { label: 'Share', small: true, primary: false, icon: 'Share2' })
        )
      ),

      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 24, animation: 'slideUp 0.4s ease' } },
        stats.map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.card, borderRadius: 14, padding: '14px 8px', textAlign: 'center', border: `1px solid ${t.borderLight}` } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 18, fontWeight: 800, color: t.text } }, typeof stat.value === 'number' ? React.createElement(AnimNumber, { value: stat.value }) : stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted, fontWeight: 500 } }, stat.label)
          )
        )
      ),

      // Badges
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' } }, 'Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', animation: 'slideUp 0.5s ease' } },
          badges.map((badge, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 60 } },
              React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: badge.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${badge.color}30` } },
                React.createElement(Icon, { name: badge.icon, size: 22, color: badge.color })
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 10, color: t.textMuted, fontWeight: 500, textAlign: 'center', lineHeight: 1.2 } }, badge.name)
            )
          )
        )
      ),

      // Pact tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 16, background: t.surfaceAlt, borderRadius: 14, padding: 4 } },
        ['active', 'completed', 'backed'].map(tab =>
          React.createElement('button', { key: tab, onClick: () => setActiveProfileTab(tab), style: {
            flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', fontFamily: font, fontSize: 14, fontWeight: 600,
            background: activeProfileTab === tab ? t.card : 'transparent', color: activeProfileTab === tab ? t.text : t.textMuted,
            cursor: 'pointer', transition: 'all 200ms ease', boxShadow: activeProfileTab === tab ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
          } }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Active pacts list
      [
        { title: 'Isometric City Series', progress: 72, goal: 1800, backed: 1296, days: 8 },
        { title: 'Character Design Bootcamp', progress: 35, goal: 3000, backed: 1050, days: 21 },
      ].map((pact, i) =>
        React.createElement('div', { key: i, style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 10, border: `1px solid ${t.borderLight}`,
          animation: `slideUp ${0.5 + i * 0.12}s ease`
        } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', null,
              React.createElement('h4', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, pact.title),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, pact.days + ' days left')
            ),
            React.createElement(ProgressRing, { percent: pact.progress, size: 44, stroke: 3 })
          ),
          React.createElement('div', { style: { height: 5, background: t.borderLight, borderRadius: 3, overflow: 'hidden' } },
            React.createElement('div', { style: { width: pact.progress + '%', height: '100%', background: t.gradient1, borderRadius: 3 } })
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, pact.progress + '% complete'),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta } }, '$' + pact.backed + ' / $' + pact.goal)
          )
        )
      ),

      // Settings link
      React.createElement('div', { style: { marginTop: 20 } },
        [
          { icon: 'Settings', label: 'Settings' },
          { icon: 'CreditCard', label: 'Payments & Payouts' },
          { icon: 'HelpCircle', label: 'Help & Support' },
        ].map((item, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: t.card,
            borderRadius: 14, marginBottom: 8, cursor: 'pointer', border: `1px solid ${t.borderLight}`,
            transition: 'all 200ms ease'
          } },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: item.icon, size: 20, color: t.textSecondary })
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text, flex: 1 } }, item.label),
            React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
          )
        )
      )
    );
  };

  // ===== SCREEN MAP =====
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    create: CreateScreen,
    showcase: ShowcaseScreen,
    profile: ProfileScreen,
    pactDetail: PactDetailScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'create', label: 'Create', icon: 'PlusCircle' },
    { id: 'showcase', label: 'Showcase', icon: 'Gem' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const currentScreen = activeScreen === 'pactDetail' ? 'pactDetail' : activeScreen;

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font } },
    // Style tag for animations
    React.createElement('style', null, `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.3); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      input::placeholder, textarea::placeholder {
        color: ${t.textMuted};
      }
      ::-webkit-scrollbar { display: none; }
      * { -webkit-tap-highlight-color: transparent; scrollbar-width: none; }
    `),

    // Phone frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
      background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
      display: 'flex', flexDirection: 'column'
    } },

      // Scrollable content area
      React.createElement('div', { style: {
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        opacity: animateIn ? 1 : 0, transition: 'opacity 150ms ease'
      } },
        React.createElement(screens[currentScreen])
      ),

      // Bottom tab bar
      activeScreen !== 'pactDetail' && React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.tabBg, borderTop: `1px solid ${t.borderLight}`,
        padding: '8px 8px 28px', display: 'flex', justifyContent: 'space-around',
        backdropFilter: 'blur(20px)', zIndex: 100
      } },
        tabs.map(tab =>
          React.createElement('div', { key: tab.id, onClick: () => switchScreen(tab.id), style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', minWidth: 50, padding: '4px 0',
            transition: 'all 200ms ease', minHeight: 44, justifyContent: 'center'
          } },
            tab.id === 'create'
              ? React.createElement('div', { style: {
                  width: 44, height: 44, borderRadius: 14, background: t.cta,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 16px ${t.ctaGlow}`,
                  transform: activeScreen === tab.id ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 200ms ease'
                } },
                  React.createElement(Icon, { name: tab.icon, size: 22, color: '#fff' }),
                  React.createElement('span', { style: { display: 'none' } }, tab.label)
                )
              : React.createElement(React.Fragment, null,
                  React.createElement(Icon, { name: tab.icon, size: 22, color: activeScreen === tab.id ? t.cta : t.textMuted }),
                  React.createElement('span', { style: {
                    fontFamily: font, fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 400,
                    color: activeScreen === tab.id ? t.cta : t.textMuted,
                    transition: 'all 200ms ease'
                  } }, tab.label)
                )
          )
        )
      )
    )
  );
}
