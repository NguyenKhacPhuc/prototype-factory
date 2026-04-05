const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [contributionText, setContributionText] = useState('');
  const [hasContributed, setHasContributed] = useState(false);
  const [expandedBranch, setExpandedBranch] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [showNewCircle, setShowNewCircle] = useState(false);
  const [selectedCuriosity, setSelectedCuriosity] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [activeScreen]);

  const themes = {
    light: {
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#EC4899',
      bg: '#FAFAFA',
      card: '#FFFFFF',
      cardBorder: '#E4E4E7',
      muted: '#71717A',
      subtle: '#F4F4F5',
      inputBg: '#F4F4F5',
      overlay: 'rgba(24,24,27,0.06)',
      ctaLight: 'rgba(236,72,153,0.08)',
      ctaMed: 'rgba(236,72,153,0.15)',
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      cta: '#EC4899',
      bg: '#18181B',
      card: '#27272A',
      cardBorder: '#3F3F46',
      muted: '#A1A1AA',
      subtle: '#27272A',
      inputBg: '#3F3F46',
      overlay: 'rgba(255,255,255,0.04)',
      ctaLight: 'rgba(236,72,153,0.12)',
      ctaMed: 'rgba(236,72,153,0.2)',
    }
  };

  const t = isDark ? themes.dark : themes.light;

  const icons = window.lucide || {};
  const Icon = ({ name, size = 20, color, strokeWidth = 2, style = {} }) => {
    const IconComp = icons[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color: color || t.primary, strokeWidth, style });
  };

  // Seed data
  const todaySeed = {
    text: "The lighthouse keeper discovered that each beam of light carried a whispered secret from a distant shore...",
    theme: "Echoes Across Water",
    contributors: 47,
    branches: 12,
  };

  const narrativeBranches = [
    { id: 1, title: "The Keeper's Lament", depth: 8, contributors: 12, lastFragment: "...and the waves answered back in a language only the moonlit understood.", author: "Marina S.", time: "2h ago", fragments: ["The lighthouse keeper discovered...", "Each beam carried whispered secrets...", "From shores no map could name...", "The keeper pressed an ear to glass...", "Hearing tides that spoke in riddles...", "Of ships that sailed between the stars...", "And the waves answered back...", "In a language only the moonlit understood."] },
    { id: 2, title: "Fractured Horizons", depth: 5, contributors: 8, lastFragment: "Between the cracks of dawn, someone had planted words like wildflower seeds.", author: "Theo K.", time: "4h ago", fragments: ["Light fractured against the horizon...", "Each shard a different color of memory...", "The keeper collected them in jars...", "Between the cracks of dawn...", "Someone had planted words like wildflower seeds."] },
    { id: 3, title: "The Signal", depth: 14, contributors: 23, lastFragment: "The signal was never meant for ships. It was a love letter to the void.", author: "Ava R.", time: "1h ago", fragments: ["The signal pulsed without pattern...", "Not for ships, not for shore...", "But for something listening between...", "The void leaned closer...", "And whispered back: I remember you."] },
    { id: 4, title: "Tidepool Cartography", depth: 3, contributors: 5, lastFragment: "Each pool reflected a different sky, none of them belonging to this world.", author: "Luca M.", time: "6h ago", fragments: ["In the tidepools below the lighthouse...", "Maps dissolved and reformed...", "Each pool reflected a different sky, none of them belonging to this world."] },
  ];

  const curiosities = [
    { id: 1, title: "Whispers of the Luminous Deep", pieces: 34, contributors: 19, preview: "Beneath the keeper's tower, the ocean floor glowed with bioluminescent scripture\u2014ancient texts written by creatures who had learned to dream. Each night, a new verse rose to the surface, tangling with moonlight and the keeper's own whispered prayers. The deep and the light had always been in conversation; humanity had simply forgotten how to listen. Now, through the collective fragments of forty-seven dreamers, the conversation resumed...", tags: ["Ocean", "Light", "Dreams"] },
    { id: 2, title: "The Cartographer's Confession", pieces: 21, contributors: 11, preview: "Every map I drew was a lie\u2014not because the coastlines were wrong, but because I left out the spaces between breaths, the pauses where meaning lives. The lighthouse was my compass, but it pointed inward, toward a geography of feeling that no survey could capture. Contributors wove a tapestry of longing and precision...", tags: ["Maps", "Truth", "Longing"] },
    { id: 3, title: "Seeds in Static", pieces: 28, contributors: 15, preview: "The radio crackled with fragments of songs from stations that had never existed. Each frequency carried a different era's hope\u2014jazz-age optimism tangled with cyberpunk resignation, lullabies merging with manifestos. The collective ear pressed closer, and from the noise, a new music emerged...", tags: ["Sound", "Time", "Hope"] },
  ];

  const weaveCircles = [
    { id: 1, name: "Midnight Poets", members: 5, theme: "Nocturnal musings", active: true, lastActivity: "12m ago", color: '#7C3AED' },
    { id: 2, name: "Sci-fi Drift", members: 8, theme: "Speculative fragments", active: true, lastActivity: "1h ago", color: '#0EA5E9' },
    { id: 3, name: "Haiku Garden", members: 3, theme: "Nature in miniature", active: false, lastActivity: "2d ago", color: '#10B981' },
  ];

  const userStats = {
    contributions: 42,
    branchesStarted: 7,
    circlesMember: 3,
    streak: 12,
    weaveScore: 856,
  };

  // --- Screens ---

  function HomeScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 28, fontWeight: 700, color: t.primary, margin: 0, letterSpacing: -0.5 } }, 'Echo Loom'),
          React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.muted, margin: '2px 0 0' } }, 'Weave collective stories with AI')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 12, border: 'none', background: t.subtle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18 })),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: { width: 40, height: 40, borderRadius: 12, border: 'none', background: t.cta, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#fff' }))
        )
      ),

      // Daily Seed Card
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
        borderRadius: 20, padding: '28px 24px', marginBottom: 24, position: 'relative', overflow: 'hidden',
        animation: 'slideUp 0.5s ease'
      } },
        React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(236,72,153,0.15)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(236,72,153,0.1)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 } },
          React.createElement(Icon, { name: 'Sparkles', size: 16, color: '#EC4899' }),
          React.createElement('span', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 12, fontWeight: 600, color: '#EC4899', textTransform: 'uppercase', letterSpacing: 1.5 } }, "Today's Seed")
        ),
        React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 17, color: '#FAFAFA', lineHeight: 1.6, margin: '0 0 18px', fontStyle: 'italic', position: 'relative', zIndex: 1 } }, `"${todaySeed.text}"`),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: 'rgba(250,250,250,0.6)', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 13, color: 'rgba(250,250,250,0.6)' }), `${todaySeed.contributors} weavers`
            ),
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: 'rgba(250,250,250,0.6)', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'GitBranch', size: 13, color: 'rgba(250,250,250,0.6)' }), `${todaySeed.branches} branches`
            )
          ),
          React.createElement('span', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 11, color: 'rgba(250,250,250,0.5)', background: 'rgba(250,250,250,0.08)', padding: '4px 10px', borderRadius: 8 } }, todaySeed.theme)
        )
      ),

      // Contribute
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('h2', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 18, fontWeight: 600, color: t.primary, margin: '0 0 12px' } }, 'Add Your Thread'),
        !hasContributed ? React.createElement('div', null,
          React.createElement('textarea', {
            value: contributionText,
            onChange: (e) => setContributionText(e.target.value),
            placeholder: 'Weave your fragment into the tapestry...',
            maxLength: 280,
            style: {
              width: '100%', minHeight: 88, borderRadius: 16, border: `1.5px solid ${t.cardBorder}`, background: t.inputBg,
              padding: '14px 16px', fontFamily: '"Nunito", sans-serif', fontSize: 15, color: t.primary, resize: 'none',
              outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
            }
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 } },
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted } }, `${contributionText.length}/280`),
            React.createElement('button', {
              onClick: () => { if (contributionText.trim()) setHasContributed(true); },
              style: {
                background: contributionText.trim() ? t.cta : t.cardBorder, color: '#fff', border: 'none', borderRadius: 14, padding: '12px 28px',
                fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, cursor: contributionText.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s', transform: 'scale(1)', display: 'flex', alignItems: 'center', gap: 8,
              },
              onMouseDown: (e) => { if (contributionText.trim()) e.currentTarget.style.transform = 'scale(0.96)'; },
              onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            },
              React.createElement(Icon, { name: 'Send', size: 15, color: '#fff' }),
              'Weave'
            )
          )
        ) : React.createElement('div', { style: { background: t.ctaLight, borderRadius: 16, padding: '20px', textAlign: 'center', animation: 'fadeIn 0.4s ease' } },
          React.createElement(Icon, { name: 'Check', size: 28, color: t.cta }),
          React.createElement('p', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 15, color: t.cta, margin: '8px 0 4px', fontWeight: 600 } }, 'Thread woven!'),
          React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.muted } }, 'Your fragment is now part of the tapestry. Check back to see where it leads.')
        )
      ),

      // Trending Branches
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 18, fontWeight: 600, color: t.primary, margin: 0 } }, 'Trending Branches'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: { background: 'none', border: 'none', fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.cta, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }
        }, React.createElement('span', null, 'See all'), React.createElement(Icon, { name: 'ArrowRight', size: 14, color: t.cta }))
      ),

      // Horizontal scroll branches
      React.createElement('div', { style: { display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } },
        ...narrativeBranches.slice(0, 3).map((branch, i) =>
          React.createElement('div', {
            key: branch.id,
            onClick: () => { setExpandedBranch(branch); setActiveScreen('explore'); },
            style: {
              minWidth: 240, background: t.card, borderRadius: 18, padding: '20px 18px', border: `1px solid ${t.cardBorder}`,
              cursor: 'pointer', scrollSnapAlign: 'start', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: `0 2px 12px ${t.overlay}`, flexShrink: 0,
            },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${t.overlay}`; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 12px ${t.overlay}`; },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'GitBranch', size: 15, color: t.cta })
              ),
              React.createElement('span', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, color: t.primary } }, branch.title)
            ),
            React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.muted, lineHeight: 1.5, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, branch.lastFragment),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 11, color: t.muted } }, `${branch.depth} deep`),
              React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 11, color: t.muted } }, `${branch.contributors} weavers`)
            )
          )
        )
      ),

      // Quick Stats
      React.createElement('div', { style: { marginTop: 28 } },
        React.createElement('h2', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 18, fontWeight: 600, color: t.primary, margin: '0 0 14px' } }, 'Your Loom'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
          ...[
            { label: 'Contributions', value: userStats.contributions, icon: 'Pen' },
            { label: 'Day Streak', value: userStats.streak, icon: 'Flame' },
            { label: 'Branches', value: userStats.branchesStarted, icon: 'GitBranch' },
            { label: 'Weave Score', value: userStats.weaveScore, icon: 'Trophy' },
          ].map(stat =>
            React.createElement('div', { key: stat.label, style: { background: t.card, borderRadius: 16, padding: '18px 16px', border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: stat.icon, size: 18, color: t.cta })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 20, fontWeight: 700, color: t.primary } }, stat.value),
                React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 11, color: t.muted } }, stat.label)
              )
            )
          )
        )
      )
    );
  }

  function ExploreScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('h1', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 26, fontWeight: 700, color: t.primary, margin: '0 0 4px' } }, 'Explore'),
      React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.muted, margin: '0 0 24px' } }, 'Follow the threads of collective imagination'),

      // Search
      React.createElement('div', { style: { position: 'relative', marginBottom: 24 } },
        React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' } },
          React.createElement(Icon, { name: 'Search', size: 16, color: t.muted })
        ),
        React.createElement('input', {
          placeholder: 'Search branches, themes, weavers...',
          style: {
            width: '100%', height: 48, borderRadius: 14, border: `1.5px solid ${t.cardBorder}`, background: t.inputBg,
            paddingLeft: 42, paddingRight: 16, fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.primary,
            outline: 'none', boxSizing: 'border-box',
          }
        })
      ),

      // Filter chips
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 } },
        ...['All', 'Trending', 'New', 'Deep', 'Your Threads'].map((chip, i) =>
          React.createElement('button', {
            key: chip,
            style: {
              background: i === 0 ? t.primary : t.subtle, color: i === 0 ? (isDark ? '#18181B' : '#FAFAFA') : t.secondary,
              border: 'none', borderRadius: 10, padding: '8px 16px', fontFamily: '"Fredoka", sans-serif', fontSize: 13,
              fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
            }
          }, chip)
        )
      ),

      // Branches list
      ...narrativeBranches.map((branch) =>
        React.createElement('div', { key: branch.id, style: { marginBottom: 16 } },
          React.createElement('div', {
            onClick: () => setExpandedBranch(expandedBranch?.id === branch.id ? null : branch),
            style: {
              background: t.card, borderRadius: 18, padding: '20px', border: `1px solid ${expandedBranch?.id === branch.id ? t.cta : t.cardBorder}`,
              cursor: 'pointer', transition: 'all 0.25s', boxShadow: expandedBranch?.id === branch.id ? `0 4px 20px ${t.ctaMed}` : `0 2px 8px ${t.overlay}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.ctaLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                  React.createElement(Icon, { name: 'GitBranch', size: 16, color: t.cta })
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 16, fontWeight: 600, color: t.primary } }, branch.title),
                  React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted, marginTop: 2 } }, `${branch.author} \u00B7 ${branch.time}`)
                )
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: t.subtle, borderRadius: 8, padding: '4px 10px' } },
                React.createElement(Icon, { name: 'Layers', size: 13, color: t.muted }),
                React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted } }, `${branch.depth}`)
              )
            ),
            React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.secondary, lineHeight: 1.6, margin: '0 0 14px', fontStyle: 'italic' } }, `"${branch.lastFragment}"`),
            React.createElement('div', { style: { display: 'flex', gap: 16 } },
              React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 13, color: t.muted }), `${branch.contributors} weavers`
              )
            )
          ),
          // Expanded view
          expandedBranch?.id === branch.id && React.createElement('div', {
            style: { background: t.subtle, borderRadius: '0 0 18px 18px', padding: '16px 20px', marginTop: -6, borderLeft: `1px solid ${t.cta}`, borderRight: `1px solid ${t.cta}`, borderBottom: `1px solid ${t.cta}`, animation: 'slideUp 0.3s ease' }
          },
            React.createElement('div', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 13, fontWeight: 600, color: t.cta, marginBottom: 12 } }, 'Thread Path'),
            ...branch.fragments.map((frag, fi) =>
              React.createElement('div', { key: fi, style: { display: 'flex', gap: 12, marginBottom: fi < branch.fragments.length - 1 ? 10 : 0, alignItems: 'flex-start' } },
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 } },
                  React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: fi === branch.fragments.length - 1 ? t.cta : t.muted } }),
                  fi < branch.fragments.length - 1 && React.createElement('div', { style: { width: 1.5, height: 20, background: t.cardBorder, marginTop: 2 } })
                ),
                React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: fi === branch.fragments.length - 1 ? t.primary : t.muted, lineHeight: 1.5, margin: 0 } }, frag)
              )
            ),
            React.createElement('button', {
              style: { marginTop: 16, width: '100%', background: t.cta, color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
            },
              React.createElement(Icon, { name: 'Plus', size: 15, color: '#fff' }), 'Continue this thread'
            )
          )
        )
      )
    );
  }

  function ArchiveScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('h1', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 26, fontWeight: 700, color: t.primary, margin: '0 0 4px' } }, 'Curiosities'),
      React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.muted, margin: '0 0 24px' } }, 'AI-curated composite pieces from the collective'),

      // Intro card
      React.createElement('div', { style: { background: t.ctaLight, borderRadius: 18, padding: '20px', marginBottom: 24, display: 'flex', gap: 14, alignItems: 'center' } },
        React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(Icon, { name: 'Wand2', size: 20, color: '#fff' })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, color: t.primary } }, 'The AI Weaver'),
          React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.muted, lineHeight: 1.4, marginTop: 2 } }, 'Periodically stitches related branches into longer composite works.')
        )
      ),

      ...curiosities.map(cur =>
        React.createElement('div', {
          key: cur.id,
          onClick: () => setSelectedCuriosity(selectedCuriosity?.id === cur.id ? null : cur),
          style: {
            background: t.card, borderRadius: 20, padding: '22px 20px', marginBottom: 16,
            border: `1px solid ${selectedCuriosity?.id === cur.id ? t.cta : t.cardBorder}`,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: selectedCuriosity?.id === cur.id ? `0 6px 24px ${t.ctaMed}` : `0 2px 10px ${t.overlay}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            React.createElement('h3', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 17, fontWeight: 600, color: t.primary, margin: 0, flex: 1 } }, cur.title),
            React.createElement(Icon, { name: selectedCuriosity?.id === cur.id ? 'ChevronUp' : 'ChevronDown', size: 18, color: t.muted })
          ),
          React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' } },
            ...cur.tags.map(tag =>
              React.createElement('span', { key: tag, style: { fontFamily: '"Nunito", sans-serif', fontSize: 11, color: t.cta, background: t.ctaLight, borderRadius: 6, padding: '3px 10px', fontWeight: 600 } }, tag)
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: selectedCuriosity?.id === cur.id ? 16 : 0 } },
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'FileText', size: 13, color: t.muted }), `${cur.pieces} pieces`
            ),
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 13, color: t.muted }), `${cur.contributors} contributors`
            )
          ),
          selectedCuriosity?.id === cur.id && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
            React.createElement('div', { style: { width: '100%', height: 1, background: t.cardBorder, marginBottom: 16 } }),
            React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.secondary, lineHeight: 1.7, margin: '0 0 16px' } }, cur.preview),
            React.createElement('div', { style: { display: 'flex', gap: 10 } },
              React.createElement('button', { style: { flex: 1, background: t.cta, color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'BookOpen', size: 14, color: '#fff' }), 'Read Full'
              ),
              React.createElement('button', { style: { width: 48, height: 48, borderRadius: 12, border: `1.5px solid ${t.cardBorder}`, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Share2', size: 16 })
              ),
              React.createElement('button', { style: { width: 48, height: 48, borderRadius: 12, border: `1.5px solid ${t.cardBorder}`, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Bookmark', size: 16 })
              )
            )
          )
        )
      )
    );
  }

  function CirclesScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 26, fontWeight: 700, color: t.primary, margin: 0 } }, 'Weave Circles'),
          React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.muted, margin: '4px 0 0' } }, 'Private collaborative spaces')
        ),
        React.createElement('button', {
          onClick: () => setShowNewCircle(!showNewCircle),
          style: { width: 44, height: 44, borderRadius: 14, background: t.cta, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.92)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        }, React.createElement(Icon, { name: 'Plus', size: 20, color: '#fff' }))
      ),

      // New circle form
      showNewCircle && React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '22px 20px', marginBottom: 20, border: `1.5px solid ${t.cta}`, animation: 'slideUp 0.3s ease' } },
        React.createElement('h3', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 16, fontWeight: 600, color: t.primary, margin: '0 0 16px' } }, 'Create New Circle'),
        React.createElement('input', { placeholder: 'Circle name', style: { width: '100%', height: 44, borderRadius: 12, border: `1.5px solid ${t.cardBorder}`, background: t.inputBg, padding: '0 14px', fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.primary, outline: 'none', boxSizing: 'border-box', marginBottom: 10 } }),
        React.createElement('input', { placeholder: 'Theme or focus', style: { width: '100%', height: 44, borderRadius: 12, border: `1.5px solid ${t.cardBorder}`, background: t.inputBg, padding: '0 14px', fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.primary, outline: 'none', boxSizing: 'border-box', marginBottom: 14 } }),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setShowNewCircle(false),
            style: { flex: 1, background: t.subtle, color: t.secondary, border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }
          }, 'Cancel'),
          React.createElement('button', {
            onClick: () => setShowNewCircle(false),
            style: { flex: 1, background: t.cta, color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }
          }, 'Create')
        )
      ),

      // Circles list
      ...weaveCircles.map(circle =>
        React.createElement('div', {
          key: circle.id,
          onClick: () => setActiveCircle(activeCircle === circle.id ? null : circle.id),
          style: {
            background: t.card, borderRadius: 20, padding: '22px 20px', marginBottom: 14,
            border: `1px solid ${activeCircle === circle.id ? circle.color : t.cardBorder}`,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: activeCircle === circle.id ? `0 4px 20px ${circle.color}22` : `0 2px 8px ${t.overlay}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 16, background: `${circle.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Icon, { name: 'CircleDot', size: 22, color: circle.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 16, fontWeight: 600, color: t.primary } }, circle.name),
                circle.active && React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' } })
              ),
              React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 13, color: t.muted } }, circle.theme)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted } }, circle.lastActivity),
              React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 } },
                React.createElement(Icon, { name: 'Users', size: 12, color: t.muted }), circle.members
              )
            )
          ),
          activeCircle === circle.id && React.createElement('div', { style: { borderTop: `1px solid ${t.cardBorder}`, paddingTop: 14, marginTop: 4, animation: 'slideUp 0.3s ease' } },
            React.createElement('div', { style: { display: 'flex', gap: 10 } },
              React.createElement('button', { style: { flex: 1, background: circle.color, color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'Pen', size: 14, color: '#fff' }), 'Contribute'
              ),
              React.createElement('button', { style: { flex: 1, background: t.subtle, color: t.secondary, border: 'none', borderRadius: 12, padding: '12px', fontFamily: '"Fredoka", sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 } },
                React.createElement(Icon, { name: 'UserPlus', size: 14 }), 'Invite'
              )
            )
          )
        )
      ),

      // Discover section
      React.createElement('div', { style: { marginTop: 12 } },
        React.createElement('h2', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 18, fontWeight: 600, color: t.primary, margin: '0 0 14px' } }, 'Discover Circles'),
        React.createElement('div', { style: { background: t.subtle, borderRadius: 18, padding: '24px 20px', textAlign: 'center' } },
          React.createElement(Icon, { name: 'Compass', size: 32, color: t.muted }),
          React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.muted, margin: '10px 0 14px', lineHeight: 1.5 } }, 'Explore public circles or get matched with weavers who share your creative wavelength.'),
          React.createElement('button', { style: { background: t.primary, color: isDark ? '#18181B' : '#FAFAFA', border: 'none', borderRadius: 12, padding: '12px 24px', fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' } }, 'Explore Circles')
        )
      )
    );
  }

  function ProfileScreen() {
    return React.createElement('div', { style: { padding: '24px 20px 100px', animation: animateIn ? 'fadeIn 0.4s ease' : 'none' } },
      // Profile header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 28 } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg, ${t.cta}, #A855F7)`, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'User', size: 36, color: '#fff' })
        ),
        React.createElement('h1', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 22, fontWeight: 700, color: t.primary, margin: '0 0 4px' } }, 'Luna Everly'),
        React.createElement('p', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: t.muted, margin: 0 } }, 'Weaving since March 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 } },
          ...['Poet', 'Night Owl', 'Branch Starter'].map(badge =>
            React.createElement('span', { key: badge, style: { fontFamily: '"Nunito", sans-serif', fontSize: 11, color: t.cta, background: t.ctaLight, borderRadius: 8, padding: '4px 10px', fontWeight: 600 } }, badge)
          )
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 } },
        ...[
          { value: '42', label: 'Threads' },
          { value: '12', label: 'Day Streak' },
          { value: '856', label: 'Score' },
        ].map(s =>
          React.createElement('div', { key: s.label, style: { background: t.card, borderRadius: 16, padding: '16px 10px', textAlign: 'center', border: `1px solid ${t.cardBorder}` } },
            React.createElement('div', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 22, fontWeight: 700, color: t.primary } }, s.value),
            React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted } }, s.label)
          )
        )
      ),

      // Theme toggle
      React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: '18px 20px', marginBottom: 14, border: `1px solid ${t.cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 18 }),
          React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 15, color: t.primary } }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 50, height: 28, borderRadius: 14, border: 'none', background: isDark ? t.cta : t.cardBorder,
            cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
          }
        },
          React.createElement('div', { style: { width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: isDark ? 25 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' } })
        )
      ),

      // Menu items
      ...[
        { icon: 'Bell', label: 'Notifications', desc: 'Daily seeds & branch updates' },
        { icon: 'Palette', label: 'Writing Style', desc: 'Poetic, narrative, abstract' },
        { icon: 'Shield', label: 'Privacy', desc: 'Manage visibility & data' },
        { icon: 'HelpCircle', label: 'How It Works', desc: 'Guide to the Loom' },
      ].map(item =>
        React.createElement('div', {
          key: item.label,
          style: {
            background: t.card, borderRadius: 18, padding: '18px 20px', marginBottom: 10, border: `1px solid ${t.cardBorder}`,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'background 0.2s',
          },
          onMouseEnter: (e) => { e.currentTarget.style.background = t.subtle; },
          onMouseLeave: (e) => { e.currentTarget.style.background = t.card; },
        },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: t.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: item.icon, size: 18 })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 15, color: t.primary, fontWeight: 600 } }, item.label),
            React.createElement('div', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: t.muted } }, item.desc)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.muted })
        )
      ),

      // Sign out
      React.createElement('button', { style: { width: '100%', background: 'none', border: `1.5px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px', fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600, color: t.muted, cursor: 'pointer', marginTop: 10 } }, 'Sign Out')
    );
  }

  const screens = { home: HomeScreen, explore: ExploreScreen, archive: ArchiveScreen, circles: CirclesScreen, profile: ProfileScreen };
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'archive', icon: 'BookOpen', label: 'Archive' },
    { id: 'circles', icon: 'CircleDot', label: 'Circles' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Nunito", sans-serif' } },
    // Google Fonts
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    // Phone frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 40, overflow: 'hidden', position: 'relative',
      background: t.bg, boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column', transition: 'background 0.3s',
    } },
      // Content area
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(screens[activeScreen])
      ),
      // Bottom nav
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 82, background: t.card,
        borderTop: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
        paddingTop: 10, paddingBottom: 24,
      } },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, padding: '4px 12px', minWidth: 54, minHeight: 44,
              transition: 'transform 0.15s',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.9)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement(Icon, { name: item.icon, size: 22, color: activeScreen === item.id ? t.cta : t.muted, strokeWidth: activeScreen === item.id ? 2.5 : 1.8 }),
            React.createElement('span', { style: { fontFamily: '"Fredoka", sans-serif', fontSize: 11, fontWeight: activeScreen === item.id ? 700 : 500, color: activeScreen === item.id ? t.cta : t.muted, transition: 'color 0.2s' } }, item.label)
          )
        )
      )
    )
  );
}
