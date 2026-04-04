// SparkBound — Commit to creation, together.
// Interactive Mobile Prototype — Single File, No Imports

const { useState, useEffect, useRef } = React;

// ─── Theme System ─────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F5EFE6',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE7DC',
    text: '#1C1C1C',
    textMuted: '#666666',
    orange: '#FF5500',
    teal: '#5B9B94',
    yellow: '#FFD93D',
    border: '#1C1C1C',
    navBg: '#1C1C1C',
    navText: '#F5EFE6',
    shadow: '3px 3px 0px #1C1C1C',
    shadowLg: '5px 5px 0px #1C1C1C',
    shadowOrange: '3px 3px 0px #FF5500',
    inputBg: '#FFFFFF',
    inputBorder: '#1C1C1C',
    profileHeaderBg: '#1C1C1C',
  },
  dark: {
    bg: '#161616',
    surface: '#222222',
    surfaceAlt: '#2A2A2A',
    text: '#F5EFE6',
    textMuted: '#888888',
    orange: '#FF6820',
    teal: '#6EBDB6',
    yellow: '#FFD93D',
    border: '#3A3A3A',
    navBg: '#0A0A0A',
    navText: '#F5EFE6',
    shadow: '3px 3px 0px #FF6820',
    shadowLg: '5px 5px 0px #FF6820',
    shadowOrange: '3px 3px 0px #FF6820',
    inputBg: '#2A2A2A',
    inputBorder: '#3A3A3A',
    profileHeaderBg: '#0A0A0A',
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SPARK_PACKS = [
  {
    id: 1,
    title: '30-Day Ink & Chaos',
    creator: 'MayaKreates',
    avatar: 'MK',
    category: 'Visual Art',
    difficulty: 'Intermediate',
    prompts: 30,
    completions: 847,
    sparks: 4200,
    accent: '#FF5500',
    tags: ['illustration', 'daily practice', 'ink'],
    description: 'Transform your daily scribbles into a powerful visual diary.',
    rating: 4.8,
    emoji: '✏️',
  },
  {
    id: 2,
    title: 'Fragmented Narratives',
    creator: 'WordSmith_J',
    avatar: 'WJ',
    category: 'Writing',
    difficulty: 'Advanced',
    prompts: 14,
    completions: 312,
    sparks: 1800,
    accent: '#5B9B94',
    tags: ['fiction', 'experimental', 'flash'],
    description: 'Non-linear storytelling that breaks conventional structure.',
    rating: 4.9,
    emoji: '📖',
  },
  {
    id: 3,
    title: 'Sound Architecture',
    creator: 'BeatFoundry',
    avatar: 'BF',
    category: 'Music',
    difficulty: 'Beginner',
    prompts: 21,
    completions: 523,
    sparks: 2100,
    accent: '#FFD93D',
    tags: ['ambient', 'soundscape', 'field recording'],
    description: 'Build sonic worlds from everyday sounds around you.',
    rating: 4.7,
    emoji: '🎵',
  },
  {
    id: 4,
    title: 'Identity in Motion',
    creator: 'DesignReflex',
    avatar: 'DR',
    category: 'Design',
    difficulty: 'Intermediate',
    prompts: 12,
    completions: 189,
    sparks: 950,
    accent: '#FF5500',
    tags: ['branding', 'motion', 'identity'],
    description: 'Craft animated brand identities that feel emotionally resonant.',
    rating: 4.6,
    emoji: '🎨',
  },
  {
    id: 5,
    title: 'Light Chasing',
    creator: 'LensLyra',
    avatar: 'LL',
    category: 'Photography',
    difficulty: 'Beginner',
    prompts: 7,
    completions: 1203,
    sparks: 6100,
    accent: '#5B9B94',
    tags: ['portrait', 'natural light', 'street'],
    description: 'Capture the hidden poetry in everyday light conditions.',
    rating: 4.9,
    emoji: '📸',
  },
];

const CIRCLE_MEMBERS = [
  { name: 'Aria Chen', avatar: 'AC', progress: 18, total: 30, streak: 12, color: '#5B9B94' },
  { name: 'Dev Ramos', avatar: 'DR', progress: 22, total: 30, streak: 18, color: '#FF5500' },
  { name: 'Yuki M.', avatar: 'YM', progress: 9, total: 30, streak: 4, color: '#FFD93D' },
  { name: 'Zoe K.', avatar: 'ZK', progress: 30, total: 30, streak: 30, color: '#5B9B94', completed: true },
];

// ─── Shared UI Components ─────────────────────────────────────────────────────
function AvatarChip({ initials, color = '#FF5500', size = 36 }) {
  return React.createElement('div', {
    style: {
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.33, fontWeight: '800', color: '#FFFFFF',
      fontFamily: "'Red Hat Display', sans-serif",
      flexShrink: 0, border: '2px solid #1C1C1C',
    }
  }, initials);
}

function SparkBadge({ count, t }) {
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: '4px',
      background: t.yellow, border: '1.5px solid #1C1C1C',
      borderRadius: '20px', padding: '3px 8px',
      boxShadow: '1px 1px 0px #1C1C1C',
    }
  },
    React.createElement('span', { style: { fontSize: '12px' } }, '⚡'),
    React.createElement('span', {
      style: {
        fontSize: '11px', fontWeight: '700', color: '#1C1C1C',
        fontFamily: "'Red Hat Display', sans-serif",
      }
    }, typeof count === 'number' ? count.toLocaleString() : count)
  );
}

function CategoryPill({ label, active, onClick, t }) {
  return React.createElement('button', {
    onClick,
    style: {
      padding: '6px 14px', borderRadius: '20px',
      border: `2px solid ${active ? t.orange : t.border}`,
      background: active ? t.orange : 'transparent',
      color: active ? '#FFFFFF' : t.text,
      fontSize: '12px', fontWeight: '700',
      fontFamily: "'Red Hat Display', sans-serif",
      cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'all 0.15s', letterSpacing: '0.3px',
    }
  }, label);
}

function SectionLabel({ text, t }) {
  return React.createElement('p', {
    style: {
      fontSize: '10px', fontWeight: '700', color: t.textMuted,
      letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px',
    }
  }, text);
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [pressed, setPressed] = useState(null);

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%', paddingBottom: '20px' } },

    // ── Header
    React.createElement('div', {
      style: { padding: '24px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontSize: '11px', fontWeight: '700', color: t.orange, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }
        }, 'GOOD MORNING'),
        React.createElement('h1', {
          style: { fontSize: '26px', fontWeight: '900', color: t.text, margin: '2px 0 0', lineHeight: 1.1, fontFamily: "'Red Hat Display', sans-serif" }
        }, 'Alex Rivera')
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        React.createElement(SparkBadge, { count: 2840, t }),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: '36px', height: '36px', borderRadius: '50%',
            border: `2px solid ${t.border}`, background: t.surface,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: t.shadow, fontSize: '16px',
          }
        }, isDark ? '☀️' : '🌙')
      )
    ),

    // ── Active SparkPack — Angled Overlapping Cards
    React.createElement('div', { style: { margin: '24px 20px 0', position: 'relative' } },
      React.createElement(SectionLabel, { text: 'YOUR ACTIVE SPARKPACK', t }),

      React.createElement('div', { style: { position: 'relative', height: '190px' } },
        // Back card (rotated)
        React.createElement('div', {
          style: {
            position: 'absolute', top: '10px', left: '0', right: '0', height: '172px',
            background: t.teal, borderRadius: '18px',
            border: '2px solid #1C1C1C', transform: 'rotate(2.8deg)',
            boxShadow: t.shadowLg,
          }
        }),
        // Front card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '10px', left: '0', right: '0', height: '172px',
            background: t.orange, borderRadius: '18px',
            border: '2px solid #1C1C1C', transform: 'rotate(-1deg)',
            boxShadow: '6px 6px 0px #1C1C1C', padding: '18px', cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('span', {
                style: { fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.75)', letterSpacing: '2px' }
              }, 'DAY 18 / 30'),
              React.createElement('h3', {
                style: { fontSize: '21px', fontWeight: '900', color: '#FFF', margin: '4px 0 2px', fontFamily: "'Red Hat Display', sans-serif", lineHeight: 1.1 }
              }, '30-Day Ink & Chaos'),
              React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 } }, 'by MayaKreates')
            ),
            React.createElement('div', {
              style: {
                background: 'rgba(255,255,255,0.18)', borderRadius: '12px',
                padding: '8px 10px', border: '1.5px solid rgba(255,255,255,0.4)', textAlign: 'center',
              }
            },
              React.createElement('div', { style: { fontSize: '22px' } }, '✏️'),
              React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: '#FFF', marginTop: '2px' } }, 'VISUAL')
            )
          ),
          React.createElement('div', { style: { marginTop: '18px' } },
            React.createElement('div', {
              style: { height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px', overflow: 'hidden' }
            },
              React.createElement('div', { style: { width: '60%', height: '100%', background: '#FFFFFF', borderRadius: '3px' } })
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '6px' } },
              React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' } }, '18 prompts done'),
              React.createElement('span', { style: { fontSize: '11px', color: '#FFF', fontWeight: '800' } }, '60%')
            )
          )
        )
      )
    ),

    // ── Today's Prompt
    React.createElement('div', {
      style: {
        margin: '16px 20px 0', background: t.surface,
        borderRadius: '14px', border: `2px solid ${t.border}`,
        padding: '16px', boxShadow: t.shadow,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
        React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: t.orange, letterSpacing: '2px' } }, "TODAY'S PROMPT"),
        React.createElement('span', {
          style: {
            fontSize: '10px', fontWeight: '700', color: t.text,
            background: t.yellow, padding: '2px 8px', borderRadius: '6px',
            border: '1.5px solid #1C1C1C',
          }
        }, '#19')
      ),
      React.createElement('p', {
        style: { fontSize: '14px', fontWeight: '700', color: t.text, margin: '0 0 14px', lineHeight: 1.5, fontFamily: "'Red Hat Display', sans-serif" }
      }, '"Draw a creature that only exists in the space between sleeping and waking."'),
      React.createElement('button', {
        onMouseDown: () => setPressed('prompt'),
        onMouseUp: () => setPressed(null),
        style: {
          width: '100%', padding: '11px',
          background: t.text, color: isDark ? '#161616' : '#FFFFFF',
          border: 'none', borderRadius: '10px',
          fontSize: '13px', fontWeight: '800',
          cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif",
          letterSpacing: '0.5px',
          transform: pressed === 'prompt' ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.1s',
        }
      }, 'START CREATING →')
    ),

    // ── Circle Activity
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('h2', {
          style: { fontSize: '16px', fontWeight: '900', color: t.text, margin: 0, fontFamily: "'Red Hat Display', sans-serif" }
        }, 'Circle Activity'),
        React.createElement('button', {
          onClick: () => setActiveScreen('circles'),
          style: { fontSize: '12px', fontWeight: '700', color: t.orange, background: 'none', border: 'none', cursor: 'pointer' }
        }, React.createElement('span', null, 'See all →'))
      ),
      ...[
        { user: 'ZK', name: 'Zoe K.', action: 'completed prompt #30! 🎉', time: '2m ago', color: '#5B9B94' },
        { user: 'DR', name: 'Dev R.', action: 'shared a sketch for prompt #22', time: '1h ago', color: '#FF5500' },
        { user: 'AC', name: 'Aria C.', action: 'left you encouragement ❤️', time: '3h ago', color: '#FFD93D' },
      ].map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${t.surfaceAlt}` : 'none',
          }
        },
          React.createElement(AvatarChip, { initials: item.user, color: item.color, size: 32 }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: t.text } }, item.name + ' '),
            React.createElement('span', { style: { fontSize: '13px', color: t.textMuted } }, item.action)
          ),
          React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, whiteSpace: 'nowrap' } }, item.time)
        )
      )
    ),

    // ── Trending Now
    React.createElement('div', { style: { padding: '20px 0 0' } },
      React.createElement('div', {
        style: { padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }
      },
        React.createElement('h2', {
          style: { fontSize: '16px', fontWeight: '900', color: t.text, margin: 0, fontFamily: "'Red Hat Display', sans-serif" }
        }, 'Trending Now'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: { fontSize: '12px', fontWeight: '700', color: t.orange, background: 'none', border: 'none', cursor: 'pointer' }
        }, React.createElement('span', null, 'Explore →'))
      ),
      React.createElement('div', { style: { display: 'flex', gap: '12px', paddingLeft: '20px', paddingRight: '20px', overflowX: 'auto' } },
        ...SPARK_PACKS.slice(0, 4).map((pack) =>
          React.createElement('div', {
            key: pack.id,
            onClick: () => setActiveScreen('explore'),
            style: {
              minWidth: '155px', background: pack.accent,
              borderRadius: '14px', border: '2px solid #1C1C1C',
              padding: '14px', boxShadow: '3px 3px 0px #1C1C1C',
              flexShrink: 0, cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '5px' } }, pack.category),
            React.createElement('p', {
              style: { fontSize: '14px', fontWeight: '800', color: '#FFF', margin: '0 0 6px', lineHeight: 1.2, fontFamily: "'Red Hat Display', sans-serif" }
            }, pack.title),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '5px' } },
              React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' } }, `${pack.prompts} prompts`),
              React.createElement('span', { style: { width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', flexShrink: 0 } }),
              React.createElement('span', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' } }, `⚡ ${(pack.sparks / 1000).toFixed(1)}k`)
            )
          )
        )
      )
    )
  );
}

// ─── Explore Screen ───────────────────────────────────────────────────────────
function ExploreScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);
  const categories = ['All', 'Visual Art', 'Writing', 'Music', 'Design', 'Photography'];
  const filtered = activeCategory === 'All' ? SPARK_PACKS : SPARK_PACKS.filter(p => p.category === activeCategory);

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%' } },

    // Header
    React.createElement('div', { style: { padding: '24px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
        React.createElement('h1', { style: { fontSize: '26px', fontWeight: '900', color: t.text, margin: 0, fontFamily: "'Red Hat Display', sans-serif" } }, 'Explore'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: '36px', height: '36px', borderRadius: '50%', border: `2px solid ${t.border}`, background: t.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadow, fontSize: '16px' }
        }, isDark ? '☀️' : '🌙')
      ),
      // Search bar
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px',
          background: t.inputBg, border: `2px solid ${searchFocused ? t.orange : t.inputBorder}`,
          borderRadius: '12px', padding: '10px 14px',
          boxShadow: searchFocused ? t.shadowOrange : t.shadow,
          transition: 'all 0.2s', marginBottom: '14px',
        }
      },
        React.createElement('span', { style: { fontSize: '15px' } }, '🔍'),
        React.createElement('input', {
          type: 'text', placeholder: 'Search SparkPacks, creators...',
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false),
          style: { border: 'none', background: 'transparent', fontSize: '14px', fontWeight: '500', color: t.text, fontFamily: "'Red Hat Display', sans-serif", outline: 'none', flex: 1 }
        })
      ),
      // Category pills
      React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' } },
        ...categories.map(cat =>
          React.createElement(CategoryPill, { key: cat, label: cat, active: activeCategory === cat, onClick: () => setActiveCategory(cat), t })
        )
      )
    ),

    // ── Staff Picks — Stacked Angled Cards
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement(SectionLabel, { text: 'STAFF PICKS', t }),
      React.createElement('div', { style: { position: 'relative', height: '200px', marginBottom: '20px' } },
        // Third (back) card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '14px', left: '4px', right: '4px', height: '178px',
            background: t.yellow, borderRadius: '18px', border: '2px solid #1C1C1C',
            transform: 'rotate(3.2deg)', boxShadow: '4px 4px 0px #1C1C1C',
          }
        }),
        // Second card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '7px', left: '2px', right: '2px', height: '178px',
            background: t.teal, borderRadius: '18px', border: '2px solid #1C1C1C',
            transform: 'rotate(-1.8deg)', boxShadow: '4px 4px 0px #1C1C1C',
          }
        }),
        // Front card
        React.createElement('div', {
          style: {
            position: 'absolute', top: '0', left: '0', right: '0', height: '178px',
            background: t.orange, borderRadius: '18px', border: '2px solid #1C1C1C',
            boxShadow: '6px 6px 0px #1C1C1C', padding: '18px', cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.75)', letterSpacing: '2px' } }, 'VISUAL ART • 30 PROMPTS'),
              React.createElement('h3', { style: { fontSize: '22px', fontWeight: '900', color: '#FFF', margin: '5px 0 3px', fontFamily: "'Red Hat Display', sans-serif" } }, '30-Day Ink & Chaos'),
              React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 } }, 'by MayaKreates')
            ),
            React.createElement('div', {
              style: { background: 'rgba(255,255,255,0.18)', padding: '8px 12px', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.4)', textAlign: 'center' }
            },
              React.createElement('div', { style: { fontSize: '18px' } }, '⭐'),
              React.createElement('div', { style: { fontSize: '12px', fontWeight: '800', color: '#FFF' } }, '4.8')
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '18px', alignItems: 'center' } },
            ...[{ icon: '✏️', label: '847 done' }, { icon: '⚡', label: '4.2k Sparks' }].map((s, i) =>
              React.createElement('div', {
                key: i,
                style: { display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: '8px' }
              },
                React.createElement('span', { style: { fontSize: '12px' } }, s.icon),
                React.createElement('span', { style: { fontSize: '11px', fontWeight: '600', color: '#FFF' } }, s.label)
              )
            ),
            React.createElement('button', {
              style: {
                marginLeft: 'auto', background: '#FFFFFF', border: 'none', borderRadius: '8px',
                padding: '5px 14px', fontSize: '11px', fontWeight: '900', color: t.orange,
                cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif",
              }
            }, 'COMMIT →')
          )
        )
      )
    ),

    // ── Pack List
    React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement(SectionLabel, { text: `${filtered.length} SPARKPACKS`, t }),
      ...filtered.map((pack) =>
        React.createElement('div', {
          key: pack.id,
          style: {
            display: 'flex', gap: '12px', background: t.surface,
            borderRadius: '14px', border: `2px solid ${t.border}`,
            padding: '14px', marginBottom: '10px', boxShadow: t.shadow, cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { width: '4px', borderRadius: '2px', background: pack.accent, flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('div', null,
                React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: pack.accent, letterSpacing: '1.5px', textTransform: 'uppercase' } }, pack.category),
                React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, margin: '2px 0 3px', fontFamily: "'Red Hat Display', sans-serif" } }, pack.title),
                React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, margin: '0 0 8px' } }, `by ${pack.creator}`)
              ),
              React.createElement(SparkBadge, { count: pack.sparks, t })
            ),
            React.createElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: '11px', background: t.surfaceAlt, padding: '2px 8px', borderRadius: '6px', fontWeight: '600', color: t.textMuted } }, pack.difficulty),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${pack.prompts} prompts`),
              React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${pack.completions} completions`)
            )
          )
        )
      )
    )
  );
}

// ─── Circles Screen ───────────────────────────────────────────────────────────
function CirclesScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeTab, setActiveTab] = useState('active');
  const pct = (done, total) => Math.round((done / total) * 100);

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%' } },

    // Header
    React.createElement('div', { style: { padding: '24px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('h1', { style: { fontSize: '26px', fontWeight: '900', color: t.text, margin: 0, fontFamily: "'Red Hat Display', sans-serif" } }, 'Circles'),
      React.createElement('button', {
        style: {
          background: t.orange, border: `2px solid #1C1C1C`, borderRadius: '10px',
          padding: '7px 14px', fontSize: '12px', fontWeight: '800', color: '#FFF',
          cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow,
        }
      }, '+ New Circle')
    ),

    // Tab switcher
    React.createElement('div', {
      style: { display: 'flex', margin: '0 20px 16px', background: t.surfaceAlt, borderRadius: '12px', padding: '4px', border: `2px solid ${t.border}` }
    },
      ...['active', 'invites', 'past'].map(tab =>
        React.createElement('button', {
          key: tab, onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '8px', borderRadius: '8px',
            background: activeTab === tab ? t.orange : 'transparent', border: 'none',
            fontSize: '12px', fontWeight: '700',
            color: activeTab === tab ? '#FFF' : t.textMuted,
            cursor: 'pointer', textTransform: 'capitalize',
            fontFamily: "'Red Hat Display', sans-serif", transition: 'all 0.15s',
          }
        }, tab)
      )
    ),

    // ── Active Circle Card
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('div', {
        style: { background: t.surface, borderRadius: '20px', border: `2px solid ${t.border}`, padding: '18px', boxShadow: t.shadowLg }
      },
        // Circle header
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' } },
          React.createElement('div', {
            style: { width: '46px', height: '46px', borderRadius: '12px', background: t.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: '2px solid #1C1C1C' }
          }, '🔥'),
          React.createElement('div', null,
            React.createElement('h3', { style: { fontSize: '17px', fontWeight: '900', color: t.text, margin: '0 0 2px', fontFamily: "'Red Hat Display', sans-serif" } }, 'Ink Rebels'),
            React.createElement('p', { style: { fontSize: '12px', color: t.textMuted, margin: 0 } }, '30-Day Ink & Chaos • 4 members')
          ),
          React.createElement('div', {
            style: { marginLeft: 'auto', fontSize: '10px', fontWeight: '700', color: t.teal, letterSpacing: '1px', background: isDark ? 'rgba(110,189,182,0.12)' : 'rgba(91,155,148,0.1)', padding: '4px 8px', borderRadius: '8px', border: `1.5px solid ${t.teal}` }
          }, 'ACTIVE')
        ),

        // Members progress
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' } },
          ...CIRCLE_MEMBERS.map((member, i) =>
            React.createElement('div', { key: i },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' } },
                React.createElement(AvatarChip, { initials: member.avatar, color: member.completed ? t.teal : member.color, size: 28 }),
                React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: t.text, flex: 1 } }, member.name),
                member.completed
                  ? React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: t.teal, letterSpacing: '1px' } }, '✓ COMPLETE')
                  : React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, `${member.progress}/${member.total}`)
              ),
              React.createElement('div', {
                style: { height: '5px', background: t.surfaceAlt, borderRadius: '3px', overflow: 'hidden', marginLeft: '36px' }
              },
                React.createElement('div', {
                  style: { width: `${pct(member.progress, member.total)}%`, height: '100%', background: member.completed ? t.teal : t.orange, borderRadius: '3px', transition: 'width 0.5s ease' }
                })
              )
            )
          )
        ),

        // Stats row
        React.createElement('div', {
          style: { padding: '10px 12px', background: isDark ? 'rgba(255,255,255,0.05)' : t.surfaceAlt, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }
        },
          ...[
            { label: 'Your Streak', value: '18 days 🔥' },
            { label: 'Circle Best', value: '30 days' },
            { label: 'Sparks Shared', value: '⚡ 420' },
          ].map((stat, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '13px', fontWeight: '900', color: t.text } }, stat.value),
              React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, fontWeight: '600', marginTop: '2px' } }, stat.label)
            )
          )
        )
      )
    ),

    // ── Share Progress
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('h2', { style: { fontSize: '15px', fontWeight: '900', color: t.text, margin: '0 0 10px', fontFamily: "'Red Hat Display', sans-serif" } }, 'Share Your Progress'),
      React.createElement('div', {
        style: { background: t.surface, border: `2px solid ${t.border}`, borderRadius: '14px', padding: '14px', boxShadow: t.shadow }
      },
        React.createElement('textarea', {
          placeholder: 'What did you create today? Share with your circle…',
          rows: 3,
          style: { width: '100%', border: 'none', background: 'transparent', fontSize: '14px', color: t.text, fontFamily: "'Red Hat Display', sans-serif", resize: 'none', outline: 'none' }
        }),
        React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '10px' } },
          React.createElement('button', {
            style: { padding: '8px 14px', background: 'transparent', border: `2px solid ${t.border}`, borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: t.textMuted, cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif" }
          }, '📎 Attach'),
          React.createElement('button', {
            style: { marginLeft: 'auto', padding: '8px 20px', background: t.orange, border: '2px solid #1C1C1C', borderRadius: '8px', fontSize: '12px', fontWeight: '800', color: '#FFF', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow }
          }, 'Share Update')
        )
      )
    ),

    // ── Discover Circles
    React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement('h2', { style: { fontSize: '15px', fontWeight: '900', color: t.text, margin: '0 0 10px', fontFamily: "'Red Hat Display', sans-serif" } }, 'Discover Circles'),
      ...[
        { name: 'Morning Pages Club', pack: 'Fragmented Narratives', members: 8, emoji: '📝', color: '#5B9B94' },
        { name: 'Sound Collective', pack: 'Sound Architecture', members: 5, emoji: '🎵', color: '#FFD93D' },
        { name: 'Visual Diaries', pack: 'Light Chasing', members: 11, emoji: '📷', color: '#FF5500' },
      ].map((circle, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: '12px', background: t.surface, border: `2px solid ${t.border}`, borderRadius: '12px', padding: '12px', marginBottom: '8px', boxShadow: t.shadow }
        },
          React.createElement('div', {
            style: { width: '42px', height: '42px', borderRadius: '10px', background: circle.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid #1C1C1C', flexShrink: 0 }
          }, circle.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: '14px', fontWeight: '800', color: t.text } }, circle.name),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, `${circle.pack} • ${circle.members} members`)
          ),
          React.createElement('button', {
            style: { padding: '6px 14px', background: 'transparent', border: `2px solid ${t.orange}`, borderRadius: '8px', fontSize: '11px', fontWeight: '800', color: t.orange, cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif" }
          }, 'Join')
        )
      )
    )
  );
}

// ─── Studio Screen ────────────────────────────────────────────────────────────
function StudioScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [step, setStep] = useState(1);
  const [packTitle, setPackTitle] = useState('');
  const [selectedCat, setSelectedCat] = useState('Visual Art');
  const cats = ['Visual Art', 'Writing', 'Music', 'Design', 'Photography'];
  const myPacks = [
    { title: 'Urban Geometry', completions: 234, sparks: 1170, emoji: '🏙️', color: t.orange },
    { title: 'Color Theory Diaries', completions: 89, sparks: 445, emoji: '🎨', color: t.teal },
  ];

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%' } },

    // Header
    React.createElement('div', { style: { padding: '24px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: '26px', fontWeight: '900', color: t.text, margin: '0 0 2px', fontFamily: "'Red Hat Display', sans-serif" } }, 'Creator Studio'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textMuted, margin: 0 } }, 'Build & publish SparkPacks')
      ),
      React.createElement(SparkBadge, { count: '1.6k', t })
    ),

    // Stats row
    React.createElement('div', { style: { margin: '0 20px 16px', display: 'flex', gap: '8px' } },
      ...[
        { label: 'Published', value: '2', color: t.teal },
        { label: 'Completions', value: '323', color: t.orange },
        { label: 'Sparks Earned', value: '1.6k', color: '#FFD93D' },
      ].map((s, i) =>
        React.createElement('div', {
          key: i,
          style: { flex: 1, background: t.surface, border: `2px solid ${t.border}`, borderRadius: '12px', padding: '10px 8px', textAlign: 'center', boxShadow: t.shadow }
        },
          React.createElement('div', { style: { fontSize: '18px', fontWeight: '900', color: s.color } }, s.value),
          React.createElement('div', { style: { fontSize: '10px', fontWeight: '600', color: t.textMuted, marginTop: '2px' } }, s.label)
        )
      )
    ),

    // ── New SparkPack Builder
    React.createElement('div', { style: { padding: '0 20px 16px' } },
      React.createElement('h2', { style: { fontSize: '15px', fontWeight: '900', color: t.text, margin: '0 0 10px', fontFamily: "'Red Hat Display', sans-serif" } }, 'New SparkPack'),
      // Step progress
      React.createElement('div', { style: { display: 'flex', gap: '6px', marginBottom: '14px' } },
        ...[1, 2, 3, 4].map(s =>
          React.createElement('div', {
            key: s, onClick: () => setStep(s),
            style: { flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? t.orange : t.surfaceAlt, cursor: 'pointer', transition: 'background 0.2s' }
          })
        )
      ),

      React.createElement('div', {
        style: { background: t.surface, border: `2px solid ${t.border}`, borderRadius: '16px', padding: '18px', boxShadow: t.shadowLg }
      },

        // Step 1 — Foundation
        step === 1 && React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.orange, letterSpacing: '2px', margin: '0 0 4px' } }, 'STEP 1 — FOUNDATION'),
          React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, margin: '0 0 14px' } }, "What's your SparkPack about?"),
          React.createElement('input', {
            type: 'text', placeholder: '"28 Days of Urban Watercolors"',
            value: packTitle, onChange: e => setPackTitle(e.target.value),
            style: { width: '100%', padding: '10px 12px', background: t.inputBg, border: `2px solid ${t.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: t.text, fontFamily: "'Red Hat Display', sans-serif", outline: 'none', marginBottom: '12px' }
          }),
          React.createElement('p', { style: { fontSize: '12px', fontWeight: '600', color: t.textMuted, margin: '0 0 8px' } }, 'Category'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' } },
            ...cats.map(cat =>
              React.createElement('button', {
                key: cat, onClick: () => setSelectedCat(cat),
                style: { padding: '5px 12px', borderRadius: '8px', border: `2px solid ${selectedCat === cat ? t.orange : t.border}`, background: selectedCat === cat ? t.orange : 'transparent', color: selectedCat === cat ? '#FFF' : t.text, fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif" }
              }, cat)
            )
          ),
          React.createElement('button', {
            onClick: () => setStep(2),
            style: { width: '100%', padding: '11px', background: t.orange, border: '2px solid #1C1C1C', borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: '#FFF', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow }
          }, 'CONTINUE →')
        ),

        // Step 2 — Prompts
        step === 2 && React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.orange, letterSpacing: '2px', margin: '0 0 4px' } }, 'STEP 2 — PROMPTS'),
          React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, margin: '0 0 14px' } }, 'Write your first 3 prompts'),
          ...[1, 2, 3].map(n =>
            React.createElement('div', { key: n, style: { display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' } },
              React.createElement('div', {
                style: { width: '22px', height: '22px', borderRadius: '50%', background: t.orange, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0, marginTop: '10px', border: '1.5px solid #1C1C1C' }
              }, n),
              React.createElement('textarea', {
                placeholder: `Prompt #${n}: Give creators a specific challenge…`,
                rows: 2,
                style: { flex: 1, padding: '8px 10px', background: t.inputBg, border: `2px solid ${t.inputBorder}`, borderRadius: '10px', fontSize: '13px', color: t.text, fontFamily: "'Red Hat Display', sans-serif", resize: 'none', outline: 'none' }
              })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('button', { onClick: () => setStep(1), style: { flex: 1, padding: '10px', background: 'transparent', border: `2px solid ${t.border}`, borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: t.text, cursor: 'pointer' } }, '← BACK'),
            React.createElement('button', { onClick: () => setStep(3), style: { flex: 2, padding: '10px', background: t.orange, border: '2px solid #1C1C1C', borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: '#FFF', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow } }, 'CONTINUE →')
          )
        ),

        // Step 3 — Moodboard
        step === 3 && React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.orange, letterSpacing: '2px', margin: '0 0 4px' } }, 'STEP 3 — MOODBOARD'),
          React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, margin: '0 0 14px' } }, 'Add inspiration resources'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' } },
            ...[{ type: 'Images', icon: '🖼️' }, { type: 'Audio Clips', icon: '🎵' }, { type: 'Text Fragments', icon: '📄' }, { type: 'Video References', icon: '🎬' }].map((item, i) =>
              React.createElement('div', {
                key: i,
                style: { border: `2px dashed ${t.border}`, borderRadius: '10px', padding: '14px', textAlign: 'center', cursor: 'pointer', background: t.surfaceAlt }
              },
                React.createElement('div', { style: { fontSize: '22px', marginBottom: '4px' } }, item.icon),
                React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: t.textMuted } }, '+ ' + item.type)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('button', { onClick: () => setStep(2), style: { flex: 1, padding: '10px', background: 'transparent', border: `2px solid ${t.border}`, borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: t.text, cursor: 'pointer' } }, '← BACK'),
            React.createElement('button', { onClick: () => setStep(4), style: { flex: 2, padding: '10px', background: t.orange, border: '2px solid #1C1C1C', borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: '#FFF', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow } }, 'CONTINUE →')
          )
        ),

        // Step 4 — Publish
        step === 4 && React.createElement('div', null,
          React.createElement('p', { style: { fontSize: '10px', fontWeight: '700', color: t.orange, letterSpacing: '2px', margin: '0 0 4px' } }, 'STEP 4 — PUBLISH'),
          React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, margin: '0 0 14px' } }, 'Set pricing & release'),
          ...[
            { label: 'Free to all', desc: 'Earn Sparks when creators complete', sel: true },
            { label: 'Pay what you want', desc: 'Set a minimum, let creators decide', sel: false },
            { label: 'Fixed Spark price', desc: 'Set a Spark amount to unlock', sel: false },
          ].map((opt, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', border: `2px solid ${opt.sel ? t.orange : t.border}`, background: opt.sel ? (isDark ? 'rgba(255,104,32,0.1)' : 'rgba(255,85,0,0.06)') : 'transparent', marginBottom: '8px', cursor: 'pointer' }
            },
              React.createElement('div', {
                style: { width: '16px', height: '16px', borderRadius: '50%', border: `2.5px solid ${opt.sel ? t.orange : t.border}`, background: opt.sel ? t.orange : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
              },
                opt.sel && React.createElement('div', { style: { width: '6px', height: '6px', borderRadius: '50%', background: '#FFF' } })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: t.text } }, opt.label),
                React.createElement('div', { style: { fontSize: '11px', color: t.textMuted } }, opt.desc)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '4px' } },
            React.createElement('button', { onClick: () => setStep(3), style: { flex: 1, padding: '10px', background: 'transparent', border: `2px solid ${t.border}`, borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: t.text, cursor: 'pointer' } }, '← BACK'),
            React.createElement('button', {
              style: { flex: 2, padding: '10px', background: t.teal, border: '2px solid #1C1C1C', borderRadius: '10px', fontSize: '13px', fontWeight: '800', color: '#FFF', cursor: 'pointer', fontFamily: "'Red Hat Display', sans-serif", boxShadow: t.shadow }
            }, '🚀 PUBLISH PACK')
          )
        )
      )
    ),

    // My Published Packs
    React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement('h2', { style: { fontSize: '15px', fontWeight: '900', color: t.text, margin: '0 0 10px', fontFamily: "'Red Hat Display', sans-serif" } }, 'My Published Packs'),
      ...myPacks.map((pack, i) =>
        React.createElement('div', {
          key: i,
          style: { background: t.surface, border: `2px solid ${t.border}`, borderRadius: '12px', padding: '14px', marginBottom: '8px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: '12px' }
        },
          React.createElement('div', {
            style: { width: '42px', height: '42px', borderRadius: '10px', background: pack.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '2px solid #1C1C1C', flexShrink: 0 }
          }, pack.emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: '14px', fontWeight: '800', color: t.text } }, pack.title),
            React.createElement('div', { style: { fontSize: '11px', color: t.textMuted, marginTop: '2px' } }, `${pack.completions} completions • ⚡ ${pack.sparks} earned`)
          ),
          React.createElement('span', {
            style: { fontSize: '10px', fontWeight: '700', color: t.teal, padding: '3px 7px', border: `1.5px solid ${t.teal}`, borderRadius: '6px' }
          }, 'LIVE')
        )
      )
    )
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ t, setActiveScreen, isDark, setIsDark }) {
  const [activeTab, setActiveTab] = useState('gallery');
  const works = [
    { title: 'Hypnagogic Beast', pack: '30-Day Ink & Chaos', prompt: '#18', color: '#FF5500', emoji: '🦋', likes: 48, sparks: 45 },
    { title: 'The Slow Dissolve', pack: 'Fragmented Narratives', prompt: '#7', color: '#5B9B94', emoji: '🌊', likes: 31, sparks: 30 },
    { title: 'Rainfall Logic', pack: 'Sound Architecture', prompt: '#4', color: '#FFD93D', emoji: '🎵', likes: 22, sparks: 20 },
    { title: 'Threshold Geometry', pack: '30-Day Ink & Chaos', prompt: '#12', color: '#FF5500', emoji: '🔺', likes: 57, sparks: 55 },
  ];
  const badges = [
    { icon: '🔥', name: '30-Day Streak', earned: true },
    { icon: '⭐', name: 'Top Creator', earned: true },
    { icon: '🌊', name: 'Flow State', earned: true },
    { icon: '🏆', name: 'Grand Finisher', earned: false },
    { icon: '✨', name: 'Spark Maker', earned: false },
    { icon: '🌍', name: 'Global Reach', earned: false },
  ];
  const activities = [
    { icon: '✏️', text: 'Completed prompt #18 in 30-Day Ink & Chaos', time: '2h ago', color: t.orange },
    { icon: '⚡', text: 'Earned 45 Sparks from "Urban Geometry" pack', time: 'Yesterday', color: '#FFD93D' },
    { icon: '💬', text: 'Received 3 feedback comments on "Threshold Geometry"', time: '2 days ago', color: t.teal },
    { icon: '👥', text: 'Joined circle "Ink Rebels"', time: '3 days ago', color: t.orange },
    { icon: '🎯', text: 'Committed to "Sound Architecture" SparkPack', time: '1 week ago', color: t.teal },
  ];

  return React.createElement('div', { style: { background: t.bg, minHeight: '100%' } },

    // ── Profile Hero
    React.createElement('div', {
      style: { background: t.profileHeaderBg, padding: '24px 20px 20px', position: 'relative', overflow: 'hidden' }
    },
      // Decorative geometric shapes
      React.createElement('div', { style: { position: 'absolute', top: '-24px', right: '-24px', width: '120px', height: '120px', borderRadius: '24px', background: t.orange, transform: 'rotate(22deg)', opacity: 0.25 } }),
      React.createElement('div', { style: { position: 'absolute', bottom: '-28px', right: '72px', width: '80px', height: '80px', borderRadius: '50%', background: t.teal, opacity: 0.25 } }),
      React.createElement('div', { style: { position: 'absolute', top: '30px', right: '30px', width: '40px', height: '40px', borderRadius: '10px', background: t.yellow, transform: 'rotate(12deg)', opacity: 0.3 } }),

      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 } },
        React.createElement('div', {
          style: { width: '64px', height: '64px', borderRadius: '16px', background: t.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '900', color: '#FFF', fontFamily: "'Red Hat Display', sans-serif", border: '3px solid #FFFFFF', flexShrink: 0 }
        }, 'AR'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 2px', fontFamily: "'Red Hat Display', sans-serif" } }, 'Alex Rivera'),
          React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' } }, '@alexrivera_draws • Visual Artist'),
          React.createElement('div', { style: { display: 'flex', gap: '16px' } },
            ...[{ label: 'Sparks', value: '2.8k' }, { label: 'Completed', value: '47' }, { label: 'Followers', value: '312' }].map((s, i) =>
              React.createElement('div', { key: i },
                React.createElement('div', { style: { fontSize: '16px', fontWeight: '900', color: '#FFFFFF' } }, s.value),
                React.createElement('div', { style: { fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' } }, s.label)
              )
            )
          )
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }
        }, isDark ? '☀️' : '🌙')
      )
    ),

    // Tab bar
    React.createElement('div', {
      style: { display: 'flex', margin: '16px 20px', background: t.surfaceAlt, borderRadius: '12px', padding: '4px', border: `2px solid ${t.border}` }
    },
      ...['gallery', 'badges', 'activity'].map(tab =>
        React.createElement('button', {
          key: tab, onClick: () => setActiveTab(tab),
          style: { flex: 1, padding: '8px', borderRadius: '8px', background: activeTab === tab ? t.text : 'transparent', border: 'none', fontSize: '12px', fontWeight: '700', color: activeTab === tab ? (isDark ? '#161616' : '#FFFFFF') : t.textMuted, cursor: 'pointer', textTransform: 'capitalize', fontFamily: "'Red Hat Display', sans-serif", transition: 'all 0.15s' }
        }, tab)
      )
    ),

    // ── Gallery Tab
    activeTab === 'gallery' && React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement(SectionLabel, { text: '47 COMPLETED WORKS', t }),
      ...works.map((work, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', gap: '12px', background: t.surface, borderRadius: '12px', border: `2px solid ${t.border}`, padding: '12px', marginBottom: '8px', boxShadow: t.shadow, cursor: 'pointer' }
        },
          React.createElement('div', {
            style: { width: '56px', height: '56px', borderRadius: '10px', background: work.color, border: '2px solid #1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }
          },
            React.createElement('div', { style: { position: 'absolute', bottom: '-10px', right: '-10px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)' } }),
            React.createElement('span', { style: { fontSize: '22px', position: 'relative', zIndex: 1 } }, work.emoji)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('h4', { style: { fontSize: '14px', fontWeight: '800', color: t.text, margin: '0 0 3px', fontFamily: "'Red Hat Display', sans-serif" } }, work.title),
            React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, margin: 0 } }, `${work.pack} • Prompt ${work.prompt}`)
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: '12px', color: t.textMuted } }, `❤️ ${work.likes}`),
            React.createElement('span', { style: { fontSize: '11px', fontWeight: '700', color: work.color } }, `⚡ +${work.sparks}`)
          )
        )
      )
    ),

    // ── Badges Tab
    activeTab === 'badges' && React.createElement('div', { style: { padding: '0 20px 20px' } },
      React.createElement(SectionLabel, { text: '3 OF 6 EARNED', t }),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' } },
        ...badges.map((badge, i) =>
          React.createElement('div', {
            key: i,
            style: { background: badge.earned ? t.surface : t.surfaceAlt, border: `2px solid ${badge.earned ? t.border : 'transparent'}`, borderRadius: '14px', padding: '16px 8px', textAlign: 'center', boxShadow: badge.earned ? t.shadow : 'none', opacity: badge.earned ? 1 : 0.45 }
          },
            React.createElement('div', { style: { fontSize: '28px', marginBottom: '6px' } }, badge.icon),
            React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: badge.earned ? t.text : t.textMuted, lineHeight: 1.3 } }, badge.name)
          )
        )
      )
    ),

    // ── Activity Tab
    activeTab === 'activity' && React.createElement('div', { style: { padding: '0 20px 20px' } },
      ...activities.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', gap: '10px', padding: '12px 0', borderBottom: i < activities.length - 1 ? `1px solid ${t.surfaceAlt}` : 'none' }
        },
          React.createElement('div', {
            style: { width: '32px', height: '32px', borderRadius: '8px', background: `${item.color}22`, border: `1.5px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }
          }, item.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontSize: '13px', color: t.text, margin: '0 0 3px', lineHeight: 1.4 } }, item.text),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, item.time)
          )
        )
      )
    )
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  // Inject Google Font + global reset
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;800;900&display=swap');
      * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      button { cursor: pointer; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    circles: CirclesScreen,
    studio: StudioScreen,
    profile: ProfileScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'circles', label: 'Circles', icon: 'Users' },
    { id: 'studio', label: 'Studio', icon: 'Sparkles' },
    { id: 'profile', label: 'Me', icon: 'User' },
  ];

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Red Hat Display', sans-serif",
      padding: '24px 20px',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: t.bg,
        borderRadius: '44px',
        overflow: 'hidden',
        position: 'relative',
        border: '2.5px solid #1C1C1C',
        boxShadow: '10px 10px 0px #1C1C1C',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      // Scrollable content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: '72px' }
      },
        React.createElement(ActiveScreen, { t, setActiveScreen, isDark, setIsDark })
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '72px',
          background: t.navBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          borderTop: `2.5px solid ${isDark ? '#333' : '#1C1C1C'}`,
          zIndex: 100,
        }
      },
        ...tabs.map(tab => {
          const isActive = activeScreen === tab.id;
          const LucideIcon = window.lucide[tab.icon];
          return React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            onMouseLeave: () => setPressedTab(null),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: isActive ? t.orange : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 14px',
              borderRadius: '14px',
              transform: pressedTab === tab.id ? 'scale(0.90)' : 'scale(1)',
              transition: 'all 0.13s ease',
              minWidth: '58px',
            }
          },
            LucideIcon && React.createElement(LucideIcon, {
              size: 20,
              color: isActive ? '#FFFFFF' : (isDark ? '#888888' : '#555555'),
              strokeWidth: isActive ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: '10px',
                fontWeight: '700',
                color: isActive ? '#FFFFFF' : (isDark ? '#888888' : '#555555'),
                fontFamily: "'Red Hat Display', sans-serif",
                letterSpacing: '0.2px',
              }
            }, tab.label)
          );
        })
      )
    )
  );
}
