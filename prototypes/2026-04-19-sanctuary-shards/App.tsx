const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [collectedShards, setCollectedShards] = useState(7);
  const [totalShards] = useState(24);
  const [activeRitual, setActiveRitual] = useState(null);
  const [ritualTimer, setRitualTimer] = useState(0);
  const [ritualRunning, setRitualRunning] = useState(false);
  const [unlockedLore, setUnlockedLore] = useState([0, 1, 2]);
  const [whisperSent, setWhisperSent] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [showRitualComplete, setShowRitualComplete] = useState(false);

  const themes = {
    dark: {
      bg: '#0B1120',
      surface: '#131B2E',
      surfaceAlt: '#1A2540',
      card: '#162036',
      text: '#F0F9FF',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      cta: '#F97316',
      border: '#1E293B',
      navBg: 'rgba(11, 17, 32, 0.95)',
      overlay: 'rgba(0,0,0,0.6)',
      shimmer: 'rgba(14, 165, 233, 0.1)',
    },
    light: {
      bg: '#F0F9FF',
      surface: '#FFFFFF',
      surfaceAlt: '#E0F2FE',
      card: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      cta: '#F97316',
      border: '#E2E8F0',
      navBg: 'rgba(240, 249, 255, 0.95)',
      overlay: 'rgba(0,0,0,0.3)',
      shimmer: 'rgba(14, 165, 233, 0.08)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const tagline = 'Collect calm, unlock worlds.';
  useEffect(() => {
    if (activeScreen === 'home') {
      setTypedText('');
      let i = 0;
      const interval = setInterval(() => {
        if (i < tagline.length) {
          setTypedText(tagline.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [activeScreen]);

  useEffect(() => {
    let interval;
    if (ritualRunning && ritualTimer > 0) {
      interval = setInterval(() => {
        setRitualTimer(prev => {
          if (prev <= 1) {
            setRitualRunning(false);
            setShowRitualComplete(true);
            setCollectedShards(s => Math.min(s + 1, totalShards));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [ritualRunning, ritualTimer]);

  const icons = window.lucide || {};
  const createIcon = (IconComponent, size = 24, color = t.text, props = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, strokeWidth: 1.8, ...props });
  };

  const serenitySites = [
    { id: 1, name: 'Whispering Willows Park', type: 'Nature', distance: '0.3 mi', shards: 3, total: 5, ritual: 'Mindful Listening', desc: 'A secluded grove where ancient willows create a natural cathedral of calm.', lore: 'The willows were planted by a poet in 1892 who believed trees could hold memories of peaceful moments.' },
    { id: 2, name: 'Harbor View Alcove', type: 'Viewpoint', distance: '0.8 mi', shards: 2, total: 4, ritual: 'Sensory Observation', desc: 'A hidden alcove overlooking the harbor where the water meets the sky.', lore: 'Sailors once called this point "The Breathing Rock" because the rhythm of waves here matches resting breath.' },
    { id: 3, name: 'Museum Quiet Gallery', type: 'Indoor', distance: '1.2 mi', shards: 1, total: 6, ritual: 'Color Discovery', desc: 'The forgotten east wing where light filters through stained glass onto marble floors.', lore: 'The gallery was designed so that at 3pm each day, the light creates a perfect circle of color on the floor.' },
    { id: 4, name: 'Rooftop Garden Sanctuary', type: 'Urban', distance: '0.5 mi', shards: 0, total: 3, ritual: 'Focused Breathing', desc: 'An urban oasis perched above the city noise, filled with lavender and rosemary.', lore: 'Locked. Collect shards to reveal this sanctuary\'s story.' },
    { id: 5, name: 'Old Library Reading Nook', type: 'Indoor', distance: '1.5 mi', shards: 1, total: 4, ritual: 'Gentle Awareness', desc: 'A velvet-cushioned corner where the scent of old books invites stillness.', lore: 'For decades, a librarian left small notes of encouragement tucked between the pages.' },
  ];

  const rituals = [
    { id: 1, name: 'Mindful Listening', duration: 90, prompt: 'Close your eyes. Listen for the furthest sound you can detect. Now the nearest. Let them coexist.', icon: icons.Ear },
    { id: 2, name: 'Sensory Observation', duration: 60, prompt: 'Find three distinct shades of blue around you. Notice how each one makes you feel.', icon: icons.Eye },
    { id: 3, name: 'Focused Breathing', duration: 90, prompt: 'Breathe in for 4 counts. Hold for 4. Release for 6. Feel the ground beneath you.', icon: icons.Wind },
    { id: 4, name: 'Color Discovery', duration: 45, prompt: 'Look around slowly. Find a color you haven\'t noticed before. Study its edges and depth.', icon: icons.Palette },
    { id: 5, name: 'Gentle Awareness', duration: 60, prompt: 'Without moving, notice five things you can see. Four you can touch. Three you can hear.', icon: icons.Sparkles },
  ];

  const whispers = [
    { id: 1, user: 'Wanderer', site: 'Whispering Willows Park', message: 'The morning dew made everything shimmer today. Pure magic.', time: '12 min ago' },
    { id: 2, user: 'SeaBreeze', site: 'Harbor View Alcove', message: 'Sunset was extraordinary. The water turned to liquid amber.', time: '1 hr ago' },
    { id: 3, user: 'QuietSeeker', site: 'Museum Quiet Gallery', message: 'Found the light circle at exactly 3pm. It\'s real. Breathtaking.', time: '3 hrs ago' },
    { id: 4, user: 'LeafListener', site: 'Rooftop Garden Sanctuary', message: 'The lavender is in full bloom. You can smell it from the stairwell.', time: '5 hrs ago' },
  ];

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.08); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.3); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes cursorBlink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `);

  // --- HOME SCREEN ---
  function HomeScreen() {
    const progress = (collectedShards / totalShards) * 100;

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.5s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Sanctuary'),
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.primary, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Shards'),
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, createIcon(isDark ? icons.Sun : icons.Moon, 20, t.textSecondary))
      ),

      // Tagline with typing effect
      React.createElement('div', { style: { marginBottom: 28, minHeight: 28 } },
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: t.textSecondary, fontWeight: 400, margin: 0 } },
          typedText,
          React.createElement('span', { style: { animation: 'cursorBlink 1s infinite', color: t.primary, marginLeft: 1 } }, '|')
        )
      ),

      // Progress Card
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
        borderRadius: 20, padding: 24, marginBottom: 20, position: 'relative', overflow: 'hidden',
        animation: 'slideUp 0.6s ease'
      } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.1)', animation: 'breathe 4s ease-in-out infinite' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)', animation: 'breathe 5s ease-in-out infinite 1s' } }),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1.2, margin: '0 0 8px' } }, 'Your Journey'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: -1 } }, collectedShards),
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.7)' } }, `/ ${totalShards} shards`)
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 6, height: 8, marginTop: 12, overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${progress}%`, height: '100%', background: '#fff', borderRadius: 6, transition: 'width 0.8s ease' } })
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 0 } }, `${3 - (collectedShards % 3)} more shards to unlock next Lore`)
      ),

      // Nearby Sites
      React.createElement('div', { style: { marginBottom: 20, animation: 'slideUp 0.7s ease' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Nearby Sites'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, color: t.primary, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          },
            React.createElement('span', null, 'See All'),
          )
        ),
        serenitySites.slice(0, 3).map((site, i) =>
          React.createElement('div', {
            key: site.id,
            onClick: () => { setSelectedSite(site); setActiveScreen('explore'); },
            style: {
              background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              animation: `slideUp ${0.7 + i * 0.1}s ease`,
            },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 24px ${t.overlay}`; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                  React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    createIcon(site.type === 'Nature' ? icons.TreePine : site.type === 'Viewpoint' ? icons.Mountain : site.type === 'Indoor' ? icons.Building2 : icons.Flower2, 18, t.primary)
                  ),
                  React.createElement('div', null,
                    React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, site.name),
                    React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 } }, `${site.distance} · ${site.type}`)
                  )
                ),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: `${t.primary}15`, padding: '4px 10px', borderRadius: 12 } },
                createIcon(icons.Gem, 14, t.primary),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary } }, `${site.shards}/${site.total}`)
              )
            )
          )
        )
      ),

      // Recent Whispers
      React.createElement('div', { style: { animation: 'slideUp 0.9s ease' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: 0, letterSpacing: -0.3 } }, 'Whispers'),
          React.createElement('button', {
            onClick: () => setActiveScreen('community'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, color: t.primary, fontWeight: 600, cursor: 'pointer' }
          }, React.createElement('span', null, 'View All'))
        ),
        whispers.slice(0, 2).map((w, i) =>
          React.createElement('div', {
            key: w.id,
            style: { background: t.card, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, background: `${t.secondary}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                createIcon(icons.MessageCircle, 14, t.secondary)
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, w.user),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `· ${w.time}`)
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5 } }, `"${w.message}"`)
          )
        )
      )
    );
  }

  // --- EXPLORE SCREEN ---
  function ExploreScreen() {
    const [mapFilter, setMapFilter] = useState('all');
    const filters = ['all', 'Nature', 'Viewpoint', 'Indoor', 'Urban'];
    const filtered = mapFilter === 'all' ? serenitySites : serenitySites.filter(s => s.type === mapFilter);

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Explore'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 16px' } }, 'Discover Serenity Sites near you'),

      // Map placeholder
      React.createElement('div', { style: {
        background: isDark ? '#0C1829' : '#DBEAFE', borderRadius: 20, height: 200, marginBottom: 16,
        position: 'relative', overflow: 'hidden', border: `1px solid ${t.border}`
      } },
        // Grid lines for map feel
        ...[0, 1, 2, 3, 4].map(i =>
          React.createElement('div', { key: `h${i}`, style: { position: 'absolute', top: `${20 + i * 20}%`, left: 0, right: 0, height: 1, background: `${t.textMuted}15` } })
        ),
        ...[0, 1, 2, 3, 4].map(i =>
          React.createElement('div', { key: `v${i}`, style: { position: 'absolute', left: `${20 + i * 15}%`, top: 0, bottom: 0, width: 1, background: `${t.textMuted}15` } })
        ),
        // Map pins
        ...serenitySites.map((site, i) => {
          const positions = [
            { top: '25%', left: '30%' },
            { top: '55%', left: '65%' },
            { top: '35%', left: '50%' },
            { top: '70%', left: '25%' },
            { top: '45%', left: '78%' },
          ];
          return React.createElement('div', {
            key: site.id,
            onClick: () => setSelectedSite(site),
            style: {
              position: 'absolute', ...positions[i],
              width: 36, height: 36, borderRadius: 18,
              background: selectedSite?.id === site.id ? t.cta : t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: `0 4px 12px ${t.primary}40`,
              transition: 'transform 0.2s ease, background 0.2s ease',
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              transform: selectedSite?.id === site.id ? 'scale(1.2)' : 'scale(1)',
              zIndex: selectedSite?.id === site.id ? 10 : 1,
            }
          }, createIcon(icons.MapPin, 18, '#fff'));
        }),
        // Location indicator
        React.createElement('div', { style: { position: 'absolute', top: '48%', left: '40%', width: 14, height: 14, borderRadius: 7, background: t.cta, border: '3px solid #fff', boxShadow: `0 0 0 6px ${t.cta}30`, zIndex: 5 } }),
        React.createElement('div', { style: { position: 'absolute', top: '48%', left: '40%', width: 14, height: 14, borderRadius: 7, animation: 'ripple 2s infinite', border: `2px solid ${t.cta}` } }),
      ),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 } },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setMapFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none',
              background: mapFilter === f ? t.primary : t.surfaceAlt,
              color: mapFilter === f ? '#fff' : t.textSecondary,
              fontFamily: font, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s ease', minHeight: 44,
            }
          }, f === 'all' ? 'All Sites' : f)
        )
      ),

      // Selected site detail or list
      selectedSite ? React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: 20, border: `1px solid ${t.border}`,
        animation: 'slideUp 0.4s ease', marginBottom: 12
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px', letterSpacing: -0.3 } }, selectedSite.name),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 } }, `${selectedSite.distance} · ${selectedSite.type}`)
          ),
          React.createElement('button', {
            onClick: () => setSelectedSite(null),
            style: { width: 36, height: 36, borderRadius: 18, background: t.surfaceAlt, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, createIcon(icons.X, 18, t.textMuted))
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 16px', lineHeight: 1.6 } }, selectedSite.desc),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
          React.createElement('div', { style: { flex: 1, background: `${t.primary}12`, borderRadius: 12, padding: 12, textAlign: 'center' } },
            createIcon(icons.Gem, 20, t.primary),
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '4px 0 0' } }, `${selectedSite.shards}/${selectedSite.total}`),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 } }, 'Shards')
          ),
          React.createElement('div', { style: { flex: 1, background: `${t.secondary}12`, borderRadius: 12, padding: 12, textAlign: 'center' } },
            createIcon(icons.Clock, 20, t.secondary),
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, margin: '4px 0 0' } }, '60-90s'),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 } }, 'Ritual')
          )
        ),
        React.createElement('button', {
          onClick: () => {
            const r = rituals.find(ri => ri.name === selectedSite.ritual) || rituals[0];
            setActiveRitual(r);
            setRitualTimer(r.duration);
            setRitualRunning(false);
            setShowRitualComplete(false);
            setActiveScreen('ritual');
          },
          style: {
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontFamily: font, fontSize: 17, fontWeight: 700,
            cursor: 'pointer', minHeight: 50, transition: 'transform 0.15s ease',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('span', null, `Begin ${selectedSite.ritual}`),
        )
      ) :
      // Site list
      filtered.map((site, i) =>
        React.createElement('div', {
          key: site.id,
          onClick: () => setSelectedSite(site),
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s ease',
            animation: `slideUp ${0.4 + i * 0.08}s ease`,
          },
          onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.borderColor = t.primary; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = t.border; },
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: `${t.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                createIcon(site.type === 'Nature' ? icons.TreePine : site.type === 'Viewpoint' ? icons.Mountain : site.type === 'Indoor' ? icons.Building2 : icons.Flower2, 22, t.primary)
              ),
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 } }, site.name),
                React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' } }, `${site.distance} · ${site.ritual}`)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(icons.Gem, 16, site.shards >= site.total ? t.cta : t.textMuted),
              React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 600, color: site.shards >= site.total ? t.cta : t.textMuted } }, `${site.shards}/${site.total}`)
            )
          )
        )
      )
    );
  }

  // --- RITUAL SCREEN ---
  function RitualScreen() {
    const ritual = activeRitual || rituals[0];
    const progress = ritual ? ((ritual.duration - ritualTimer) / ritual.duration) * 100 : 0;
    const circumference = 2 * Math.PI * 80;
    const strokeDash = circumference * (progress / 100);

    if (showRitualComplete) {
      return React.createElement('div', { style: {
        padding: '20px 16px 100px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', minHeight: 600,
        animation: 'fadeIn 0.6s ease', textAlign: 'center'
      } },
        React.createElement('div', { style: { width: 100, height: 100, borderRadius: 50, background: `${t.cta}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'pulse 2s infinite' } },
          createIcon(icons.Gem, 44, t.cta)
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: '0 0 8px', letterSpacing: -0.5 } }, 'Shard Collected'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: t.textSecondary, margin: '0 0 32px', lineHeight: 1.5, maxWidth: 280 } }, 'A moment of calm, now woven into the tapestry of this place. Your presence here matters.'),
        React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 20, border: `1px solid ${t.border}`, width: '100%', maxWidth: 300, marginBottom: 24 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'Shard Progress'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, `${collectedShards}/${totalShards}`),
          React.createElement('div', { style: { background: `${t.primary}20`, borderRadius: 6, height: 6, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${(collectedShards / totalShards) * 100}%`, height: '100%', background: t.primary, borderRadius: 6, transition: 'width 1s ease' } })
          )
        ),
        React.createElement('button', {
          onClick: () => { setShowRitualComplete(false); setActiveScreen('home'); },
          style: {
            padding: '14px 40px', borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            color: '#fff', fontFamily: font, fontSize: 17, fontWeight: 700,
            cursor: 'pointer', minHeight: 50,
          }
        }, React.createElement('span', null, 'Return Home'))
      );
    }

    return React.createElement('div', { style: {
      padding: '20px 16px 100px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', animation: 'fadeIn 0.5s ease'
    } },
      // Back button
      React.createElement('div', { style: { width: '100%', marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => { setRitualRunning(false); setActiveScreen('explore'); },
          style: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: 0 }
        },
          createIcon(icons.ChevronLeft, 22, t.textSecondary),
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, color: t.textSecondary } }, 'Back')
        )
      ),

      React.createElement('h2', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5, textAlign: 'center' } }, ritual.name),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 40px', textAlign: 'center' } }, selectedSite?.name || 'Serenity Site'),

      // Timer circle
      React.createElement('div', { style: { position: 'relative', width: 200, height: 200, marginBottom: 32 } },
        React.createElement('svg', { width: 200, height: 200, viewBox: '0 0 200 200' },
          React.createElement('circle', { cx: 100, cy: 100, r: 80, fill: 'none', stroke: `${t.primary}20`, strokeWidth: 6 }),
          React.createElement('circle', {
            cx: 100, cy: 100, r: 80, fill: 'none', stroke: t.primary, strokeWidth: 6,
            strokeDasharray: circumference, strokeDashoffset: circumference - strokeDash,
            strokeLinecap: 'round', transform: 'rotate(-90 100 100)',
            style: { transition: 'stroke-dashoffset 1s linear' }
          }),
        ),
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 48, fontWeight: 800, color: t.text, letterSpacing: -1 } },
            `${Math.floor(ritualTimer / 60)}:${(ritualTimer % 60).toString().padStart(2, '0')}`
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 4 } }, ritualRunning ? 'Breathe...' : 'Ready')
        )
      ),

      // Ritual prompt
      React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: 24, marginBottom: 32,
        border: `1px solid ${t.border}`, width: '100%', textAlign: 'center'
      } },
        React.createElement('div', { style: { marginBottom: 12 } }, createIcon(ritual.icon || icons.Sparkles, 28, t.primary)),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: t.text, margin: 0, lineHeight: 1.6, fontWeight: 400 } }, ritual.prompt)
      ),

      // Start/Pause button
      React.createElement('button', {
        onClick: () => {
          if (ritualTimer === 0) {
            setRitualTimer(ritual.duration);
          }
          setRitualRunning(!ritualRunning);
        },
        style: {
          width: 72, height: 72, borderRadius: 36, border: 'none',
          background: ritualRunning ? t.cta : `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: `0 8px 24px ${ritualRunning ? t.cta : t.primary}40`,
          transition: 'all 0.2s ease',
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.92)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
      }, createIcon(ritualRunning ? icons.Pause : icons.Play, 32, '#fff'))
    );
  }

  // --- ATLAS SCREEN ---
  function AtlasScreen() {
    const loreEntries = [
      { id: 0, title: 'The Poet\'s Grove', site: 'Whispering Willows Park', text: 'In 1892, a wandering poet named Eleanor Vane planted seven willow saplings in a perfect circle, claiming they would "hold the silence between words." Over a century later, visitors report an unusual calm within the grove — a hush that seems to absorb the city\'s noise.', shards: 3 },
      { id: 1, title: 'The Breathing Rock', site: 'Harbor View Alcove', text: 'Old maritime logs reference a rock formation where "the sea inhales and exhales in perfect time." Researchers discovered the waves here follow a 4-7-8 rhythm — matching the breathing pattern used by monks for centuries.', shards: 4 },
      { id: 2, title: 'The Light Circle', site: 'Museum Quiet Gallery', text: 'Architect Maria Santos designed the east wing so that at precisely 3pm, sunlight through the rose window creates a perfect circle on the marble floor. She called it "the daily miracle." Most visitors walk right over it.', shards: 5 },
      { id: 3, title: 'The Urban Garden', site: 'Rooftop Garden Sanctuary', text: 'Locked. Collect 3 more shards from this site to unlock its story.', shards: 3, locked: true },
      { id: 4, title: 'The Librarian\'s Notes', site: 'Old Library Reading Nook', text: 'Locked. Collect 3 more shards from this site to unlock its story.', shards: 4, locked: true },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Calm Atlas'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Your mindful journey, beautifully mapped'),

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
        [
          { label: 'Shards', value: collectedShards, icon: icons.Gem, color: t.primary },
          { label: 'Lore', value: unlockedLore.length, icon: icons.BookOpen, color: t.secondary },
          { label: 'Sites', value: 4, icon: icons.MapPin, color: t.cta },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: 16,
              border: `1px solid ${t.border}`, textAlign: 'center',
              animation: `slideUp ${0.4 + i * 0.1}s ease`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 8 } }, createIcon(stat.icon, 22, stat.color)),
            React.createElement('p', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: -0.3 } }, stat.value),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: '2px 0 0' } }, stat.label)
          )
        )
      ),

      // Lore entries
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Unlocked Lore'),
      loreEntries.map((lore, i) =>
        React.createElement('div', {
          key: lore.id,
          style: {
            background: lore.locked ? `${t.surfaceAlt}` : t.card,
            borderRadius: 18, padding: 20, marginBottom: 12,
            border: `1px solid ${lore.locked ? t.border : t.primary}30`,
            position: 'relative', overflow: 'hidden',
            animation: `slideUp ${0.5 + i * 0.08}s ease`,
            opacity: lore.locked ? 0.6 : 1,
          }
        },
          lore.locked && React.createElement('div', { style: { position: 'absolute', top: 16, right: 16 } },
            createIcon(icons.Lock, 18, t.textMuted)
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: lore.locked ? t.textMuted : t.primary, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 6px' } }, lore.site),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 19, fontWeight: 700, color: t.text, margin: '0 0 8px' } }, lore.title),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.65 } }, lore.text),
          !lore.locked && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 } },
            createIcon(icons.Gem, 14, t.cta),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600 } }, `Unlocked with ${lore.shards} shards`)
          )
        )
      )
    );
  }

  // --- COMMUNITY SCREEN ---
  function CommunityScreen() {
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, margin: '0 0 4px', letterSpacing: -0.5 } }, 'Community'),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px' } }, 'Whisper Alerts from fellow seekers'),

      // Send whisper
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}15, ${t.secondary}15)`,
        borderRadius: 18, padding: 20, marginBottom: 20,
        border: `1px solid ${t.primary}30`,
        animation: 'slideUp 0.5s ease'
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
          createIcon(icons.Send, 20, t.primary),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, 'Share a Whisper')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5 } }, 'Anonymously share a moment of calm with nearby seekers'),
        React.createElement('button', {
          onClick: () => setWhisperSent(true),
          disabled: whisperSent,
          style: {
            width: '100%', padding: '12px', borderRadius: 12, border: 'none',
            background: whisperSent ? t.surfaceAlt : t.primary,
            color: whisperSent ? t.textMuted : '#fff',
            fontFamily: font, fontSize: 15, fontWeight: 600,
            cursor: whisperSent ? 'default' : 'pointer', minHeight: 44,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('span', null, whisperSent ? 'Whisper Sent' : 'Send a Whisper')
        )
      ),

      // Collective progress
      React.createElement('div', { style: {
        background: t.card, borderRadius: 18, padding: 20, marginBottom: 20,
        border: `1px solid ${t.border}`, animation: 'slideUp 0.6s ease'
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } },
          createIcon(icons.Users, 20, t.secondary),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 } }, 'Collective Lore Progress')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 12px' } }, '47 seekers have contributed to uncovering the region\'s stories'),
        React.createElement('div', { style: { background: `${t.primary}20`, borderRadius: 8, height: 10, overflow: 'hidden', marginBottom: 8 } },
          React.createElement('div', { style: { width: '68%', height: '100%', background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 8, animation: 'shimmer 2s infinite', backgroundSize: '200% 100%' } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, '142 / 210 shards collected'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary } }, '68%')
        )
      ),

      // Whisper feed
      React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', letterSpacing: -0.3 } }, 'Recent Whispers'),
      whispers.map((w, i) =>
        React.createElement('div', {
          key: w.id,
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`,
            animation: `slideUp ${0.5 + i * 0.08}s ease`,
            transition: 'border-color 0.2s ease',
          },
          onMouseEnter: (e) => e.currentTarget.style.borderColor = `${t.primary}40`,
          onMouseLeave: (e) => e.currentTarget.style.borderColor = t.border,
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 18, background: `${t.secondary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                createIcon(icons.User, 18, t.secondary)
              ),
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, w.user),
                React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, margin: 0 } }, w.time)
              )
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: `${t.primary}12`, padding: '4px 10px', borderRadius: 10 } },
              createIcon(icons.MapPin, 12, t.primary),
              React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.primary, fontWeight: 500 } }, w.site.split(' ')[0])
            )
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5, fontStyle: 'italic' } }, `"${w.message}"`)
        )
      )
    );
  }

  // --- NAVIGATION ---
  const navItems = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'explore', label: 'Explore', icon: icons.Compass },
    { id: 'ritual', label: 'Ritual', icon: icons.Sparkles },
    { id: 'atlas', label: 'Atlas', icon: icons.Map },
    { id: 'community', label: 'Whispers', icon: icons.MessageCircle },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    ritual: RitualScreen,
    atlas: AtlasScreen,
    community: CommunityScreen,
  };

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font } },
    styleTag,
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
      background: t.bg, position: 'relative',
      boxShadow: '0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
    } },
      // Scrollable content
      React.createElement('div', { style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 0 } },
        React.createElement(screens[activeScreen])
      ),

      // Bottom navigation
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingBottom: 20, paddingTop: 8, height: 50,
      } },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 8px',
              minWidth: 44, minHeight: 44, justifyContent: 'center',
              transition: 'transform 0.15s ease',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.88)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            createIcon(item.icon, 24, activeScreen === item.id ? t.primary : t.textMuted),
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 10, fontWeight: 600,
              color: activeScreen === item.id ? t.primary : t.textMuted,
              transition: 'color 0.2s ease'
            } }, item.label)
          )
        )
      )
    )
  );
}
