const { useState, useEffect, useRef, useCallback } = React;

// ─── Theme System ───
const themes = {
  dark: {
    bg: '#1A1114',
    surface: '#2A1E22',
    surfaceAlt: '#3A2A30',
    card: '#2A1E22',
    cardAlt: '#33242A',
    text: '#FEF2F2',
    textSecondary: '#D4A0A0',
    textMuted: '#9A7070',
    primary: '#DC2626',
    secondary: '#F87171',
    cta: '#CA8A04',
    ctaText: '#1A1114',
    border: '#4A3A40',
    tabBg: '#2A1E22',
    tabInactive: '#7A5A60',
    streak: '#CA8A04',
    badgeBg: 'rgba(220,38,38,0.2)',
    overlay: 'rgba(26,17,20,0.85)',
    inputBg: '#33242A',
  },
  light: {
    bg: '#FEF2F2',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF5F5',
    card: '#FFFFFF',
    cardAlt: '#FFF0F0',
    text: '#1A1114',
    textSecondary: '#6B4040',
    textMuted: '#9A7070',
    primary: '#DC2626',
    secondary: '#F87171',
    cta: '#CA8A04',
    ctaText: '#FFFFFF',
    border: '#F5D0D0',
    tabBg: '#FFFFFF',
    tabInactive: '#B08080',
    streak: '#CA8A04',
    badgeBg: 'rgba(220,38,38,0.1)',
    overlay: 'rgba(254,242,242,0.9)',
    inputBg: '#FFF5F5',
  },
};

const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

// ─── Style Tag for Animations ───
function StyleTag() {
  return React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
    @keyframes streakGlow {
      0%, 100% { box-shadow: 0 0 8px rgba(202,138,4,0.3); }
      50% { box-shadow: 0 0 20px rgba(202,138,4,0.6); }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
  `);
}

// ─── Icon Helper ───
function Icon({ name, size = 20, color = '#FEF2F2', strokeWidth = 2, style = {} }) {
  const IconComponent = window.lucide && window.lucide[name];
  if (!IconComponent) return null;
  return React.createElement(IconComponent, { size, color, strokeWidth, style });
}

// ─── Shared Components ───
function StreakBadge({ count, t }) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: `linear-gradient(135deg, ${t.streak}, #E5A80A)`,
      borderRadius: 20, padding: '6px 14px',
      animation: 'streakGlow 2s ease-in-out infinite',
    }
  },
    React.createElement(Icon, { name: 'Flame', size: 16, color: '#1A1114' }),
    React.createElement('span', {
      style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: '#1A1114', letterSpacing: -0.3 }
    }, count + ' Week Streak')
  );
}

function SectionHeader({ title, subtitle, t, action }) {
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
  },
    React.createElement('div', null,
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, margin: 0 }
      }, title),
      subtitle && React.createElement('p', {
        style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
      }, subtitle)
    ),
    action
  );
}

function PressableCard({ children, style, onClick }) {
  const [pressed, setPressed] = useState(false);
  return React.createElement('div', {
    style: {
      ...style,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      transition: 'all 200ms cubic-bezier(0.25,0.46,0.45,0.94)',
      cursor: 'pointer',
    },
    onClick,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
  }, children);
}

// ─── HOME SCREEN ───
function HomeScreen({ t, setScreen }) {
  const weekIngredient = {
    name: 'Ramps (Wild Leeks)',
    origin: 'Appalachian Foothills',
    season: 'Early Spring',
    desc: 'These pungent wild alliums emerge for just a few weeks each spring. Their garlicky-onion flavor is prized by foragers and chefs alike.',
    daysLeft: 4,
    participants: 1247,
  };

  const puzzleTheme = 'Zero-waste: use every part of the ingredient, including leaves and bulbs.';

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 20px' }
    },
      React.createElement('div', null,
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: 0 }
        }, 'Good morning, chef'),
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '2px 0 0' }
        }, 'Root & Plate')
      ),
      React.createElement(StreakBadge, { count: 12, t })
    ),

    // Weekly Challenge Card
    React.createElement(PressableCard, {
      onClick: () => setScreen('challenge'),
      style: {
        background: `linear-gradient(145deg, ${t.primary}, #991B1B)`,
        borderRadius: 20, padding: 0, overflow: 'hidden', marginBottom: 20,
        boxShadow: '0 8px 32px rgba(220,38,38,0.3)',
      }
    },
      React.createElement('div', {
        style: {
          height: 160, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20,
          backgroundImage: 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><circle cx="320" cy="40" r="80" fill="rgba(255,255,255,0.06)"/><circle cx="60" cy="160" r="100" fill="rgba(255,255,255,0.04)"/><rect x="150" y="20" width="60" height="60" rx="12" fill="rgba(255,255,255,0.05)" transform="rotate(15 180 50)"/></svg>') + '")',
          backgroundSize: 'cover',
        }
      },
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '4px 10px',
            alignSelf: 'flex-start', marginBottom: 8, backdropFilter: 'blur(8px)',
          }
        },
          React.createElement(Icon, { name: 'Calendar', size: 14, color: '#FEF2F2' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#FEF2F2' }
          }, 'This Week\'s Challenge')
        ),
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 26, fontWeight: 800, color: '#FEF2F2', margin: 0, letterSpacing: -0.5 }
        }, weekIngredient.name)
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: 'rgba(254,242,242,0.85)', margin: '0 0 14px', lineHeight: 1.5 }
        }, weekIngredient.desc),
        React.createElement('div', {
          style: { display: 'flex', gap: 16, alignItems: 'center' }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(Icon, { name: 'Clock', size: 15, color: '#F87171' }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: '#F87171', fontWeight: 600 }
            }, weekIngredient.daysLeft + ' days left')
          ),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6 }
          },
            React.createElement(Icon, { name: 'Users', size: 15, color: 'rgba(254,242,242,0.7)' }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: 'rgba(254,242,242,0.7)' }
            }, weekIngredient.participants.toLocaleString() + ' participating')
          )
        )
      )
    ),

    // Palate Puzzle
    React.createElement(PressableCard, {
      style: {
        background: t.card, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 16, marginBottom: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${t.cta}, #E5A80A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'Puzzle', size: 18, color: '#1A1114' })),
        React.createElement('div', null,
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
          }, 'Palate Puzzle'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
          }, 'This week\'s creative twist')
        )
      ),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: 0, lineHeight: 1.5 }
      }, puzzleTheme)
    ),

    // Quick Actions
    SectionHeader({ title: 'Quick Actions', t }),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }
    },
      ...[
        { icon: 'Camera', label: 'Share a Plate', color: t.primary, screen: 'create' },
        { icon: 'Map', label: 'Find Local', color: '#059669', screen: 'explore' },
        { icon: 'BookOpen', label: 'Past Challenges', color: '#7C3AED', screen: 'challenge' },
        { icon: 'Trophy', label: 'Leaderboard', color: t.cta, screen: 'profile' },
      ].map((a, i) =>
        React.createElement(PressableCard, {
          key: i,
          onClick: () => setScreen(a.screen),
          style: {
            background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
            padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: a.icon, size: 20, color: a.color })),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
          }, a.label)
        )
      )
    ),

    // Trending Plate Tales
    SectionHeader({
      title: 'Trending Plates', subtitle: 'From the community this week', t,
      action: React.createElement('span', {
        style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary, cursor: 'pointer' },
        onClick: () => setScreen('community'),
      }, 'See all')
    }),
    ...[
      { user: 'Maya Chen', dish: 'Ramp Pesto Flatbread', likes: 342, avatar: 'M', time: '2h ago' },
      { user: 'James Okoro', dish: 'Pickled Ramp Kimchi Tacos', likes: 289, avatar: 'J', time: '5h ago' },
    ].map((tale, i) =>
      React.createElement(PressableCard, {
        key: i,
        onClick: () => setScreen('community'),
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 14,
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement('span', {
          style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: '#FEF2F2' }
        }, tale.avatar)),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
          }, tale.dish),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
          }, tale.user + ' · ' + tale.time)
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 4 }
        },
          React.createElement(Icon, { name: 'Heart', size: 16, color: t.secondary }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary }
          }, tale.likes)
        )
      )
    )
  );
}

// ─── COMMUNITY SCREEN ───
function CommunityScreen({ t, setScreen }) {
  const [activeTab, setActiveTab] = useState('trending');
  const [likedPosts, setLikedPosts] = useState({});

  const posts = [
    { id: 1, user: 'Maya Chen', avatar: 'M', dish: 'Ramp Pesto Flatbread', story: 'Found these gorgeous ramps at the Saturday farmer\'s market. The pesto came together beautifully with some toasted walnuts and aged parmesan. Charred the flatbread on my cast iron for that smoky finish.', likes: 342, comments: 28, time: '2h ago', color: '#DC2626' },
    { id: 2, user: 'James Okoro', avatar: 'J', dish: 'Pickled Ramp Kimchi Tacos', story: 'Fusion experiment! Quick-pickled the ramp bulbs Korean-style, then folded them into corn tortillas with braised short rib. The ramp greens became a spicy chimichurri.', likes: 289, comments: 45, time: '5h ago', color: '#7C3AED' },
    { id: 3, user: 'Sofia Rivera', avatar: 'S', dish: 'Ramp Butter Gnocchi', story: 'Made compound butter with ramp leaves and lemon zest, then tossed it with pillowy homemade potato gnocchi. Simple, elegant, and the ramp flavor really shines through.', likes: 215, comments: 19, time: '8h ago', color: '#059669' },
    { id: 4, user: 'Eli Nakamura', avatar: 'E', dish: 'Charred Ramp & Ricotta Toast', story: 'Sometimes the best dishes are the simplest. Charred whole ramps over an open flame, layered on sourdough with fresh ricotta, honey, and cracked pepper. Zero-waste achieved!', likes: 178, comments: 12, time: '12h ago', color: '#CA8A04' },
  ];

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    React.createElement('div', { style: { padding: '16px 0 12px' } },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 }
      }, 'Community'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
      }, 'Discover what your community is cooking')
    ),

    // Tabs
    React.createElement('div', {
      style: {
        display: 'flex', gap: 8, marginBottom: 20,
        background: t.surfaceAlt, borderRadius: 12, padding: 4,
      }
    },
      ...['trending', 'following', 'nearby'].map(tab =>
        React.createElement('button', {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, cursor: 'pointer',
            fontFamily: font, fontSize: 15, fontWeight: 600,
            background: activeTab === tab ? t.primary : 'transparent',
            color: activeTab === tab ? '#FEF2F2' : t.textMuted,
            transition: 'all 200ms ease',
          }
        }, tab.charAt(0).toUpperCase() + tab.slice(1))
      )
    ),

    // Posts
    ...posts.map((post, i) =>
      React.createElement('div', {
        key: post.id,
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 18,
          marginBottom: 14, overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
        }
      },
        // Post header
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 0' }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${post.color}, ${post.color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement('span', {
            style: { fontFamily: font, fontSize: 16, fontWeight: 700, color: '#FEF2F2' }
          }, post.avatar)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
            }, post.user),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
            }, post.time)
          ),
          React.createElement(Icon, { name: 'MoreHorizontal', size: 20, color: t.textMuted })
        ),
        // Image placeholder
        React.createElement('div', {
          style: {
            height: 200, margin: '12px 16px', borderRadius: 14,
            background: `linear-gradient(135deg, ${post.color}30, ${post.color}10)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(Icon, { name: 'ChefHat', size: 36, color: post.color + '80' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: post.color, opacity: 0.7 }
          }, post.dish)
        ),
        // Story
        React.createElement('div', { style: { padding: '0 16px' } },
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px' }
          }, post.dish),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5 }
          }, post.story)
        ),
        // Actions
        React.createElement('div', {
          style: {
            display: 'flex', gap: 0, padding: '0 8px 12px',
            borderTop: `1px solid ${t.border}`, marginTop: 4, paddingTop: 10,
          }
        },
          ...[
            { icon: likedPosts[post.id] ? 'HeartHandshake' : 'Heart', label: likedPosts[post.id] ? (post.likes + 1) : post.likes, color: likedPosts[post.id] ? t.primary : t.textMuted, action: () => toggleLike(post.id) },
            { icon: 'MessageCircle', label: post.comments, color: t.textMuted },
            { icon: 'Share2', label: 'Share', color: t.textMuted },
            { icon: 'Bookmark', label: '', color: t.textMuted },
          ].map((act, j) =>
            React.createElement('button', {
              key: j,
              onClick: act.action,
              style: {
                flex: j < 3 ? 1 : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer',
                borderRadius: 10, transition: 'all 150ms ease',
              }
            },
              React.createElement(Icon, { name: act.icon, size: 20, color: act.color }),
              act.label !== '' && React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: act.color }
              }, act.label)
            )
          )
        )
      )
    )
  );
}

// ─── EXPLORE SCREEN ───
function ExploreScreen({ t }) {
  const [searchFocused, setSearchFocused] = useState(false);

  const producers = [
    { name: 'Green Valley Farm', type: 'Organic Vegetables', distance: '2.3 mi', rating: 4.8, icon: 'Leaf', color: '#059669' },
    { name: 'Millstone Bakery', type: 'Artisan Breads & Grains', distance: '0.8 mi', rating: 4.9, icon: 'Wheat', color: '#CA8A04' },
    { name: 'River Bend Dairy', type: 'Raw Milk & Cheese', distance: '5.1 mi', rating: 4.7, icon: 'Milk', color: '#2563EB' },
    { name: 'Smokewood Ranch', type: 'Pasture-Raised Meats', distance: '7.4 mi', rating: 4.6, icon: 'Beef', color: '#DC2626' },
  ];

  const markets = [
    { name: 'Downtown Saturday Market', day: 'Saturdays 8AM-1PM', vendors: 45, featured: true },
    { name: 'Riverside Artisan Fair', day: 'Sundays 10AM-3PM', vendors: 28, featured: false },
    { name: 'Midtown Evening Market', day: 'Wednesdays 4PM-8PM', vendors: 32, featured: false },
  ];

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    React.createElement('div', { style: { padding: '16px 0 12px' } },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 }
      }, 'Explore'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
      }, 'Find local producers & markets')
    ),

    // Search
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 10,
        background: t.inputBg, borderRadius: 14, padding: '12px 14px',
        marginBottom: 20,
        border: `2px solid ${searchFocused ? t.primary : 'transparent'}`,
        transition: 'border-color 200ms ease',
      }
    },
      React.createElement(Icon, { name: 'Search', size: 20, color: t.textMuted }),
      React.createElement('input', {
        placeholder: 'Search producers, markets, ingredients...',
        onFocus: () => setSearchFocused(true),
        onBlur: () => setSearchFocused(false),
        style: {
          flex: 1, border: 'none', background: 'none', outline: 'none',
          fontFamily: font, fontSize: 15, color: t.text,
        }
      })
    ),

    // Map placeholder
    React.createElement('div', {
      style: {
        height: 180, borderRadius: 18, marginBottom: 20, overflow: 'hidden',
        background: `linear-gradient(135deg, ${t.surfaceAlt}, ${t.card})`,
        border: `1px solid ${t.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
        position: 'relative',
      }
    },
      // Grid pattern
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }
      }),
      // Pins
      ...[
        { left: '25%', top: '30%' },
        { left: '55%', top: '45%' },
        { left: '40%', top: '60%' },
        { left: '70%', top: '25%' },
      ].map((pos, i) =>
        React.createElement('div', {
          key: i,
          style: {
            position: 'absolute', left: pos.left, top: pos.top,
            width: 28, height: 28, borderRadius: 14,
            background: i === 0 ? t.primary : t.cta,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px ${i === 0 ? 'rgba(220,38,38,0.4)' : 'rgba(202,138,4,0.4)'}`,
            animation: i === 0 ? 'pulse 2s ease-in-out infinite' : 'none',
          }
        }, React.createElement(Icon, { name: 'MapPin', size: 14, color: '#FEF2F2' }))
      ),
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 12, right: 12,
          background: t.primary, borderRadius: 10, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(Icon, { name: 'Navigation', size: 14, color: '#FEF2F2' }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#FEF2F2' }
        }, 'Open Map')
      )
    ),

    // Featured Markets
    SectionHeader({ title: 'Nearby Markets', subtitle: 'Fresh finds await', t }),
    React.createElement('div', {
      style: { display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }
    },
      ...markets.map((market, i) =>
        React.createElement(PressableCard, {
          key: i,
          style: {
            minWidth: 220, background: i === 0 ? `linear-gradient(145deg, ${t.primary}, #991B1B)` : t.card,
            border: i === 0 ? 'none' : `1px solid ${t.border}`,
            borderRadius: 16, padding: 16,
            boxShadow: i === 0 ? '0 4px 20px rgba(220,38,38,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }
          },
            React.createElement(Icon, { name: 'Store', size: 16, color: i === 0 ? '#FEF2F2' : t.primary }),
            market.featured && React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: 700, color: '#CA8A04',
                background: 'rgba(202,138,4,0.2)', borderRadius: 6, padding: '2px 8px', textTransform: 'uppercase',
              }
            }, 'Featured')
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: i === 0 ? '#FEF2F2' : t.text, margin: '0 0 4px' }
          }, market.name),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: i === 0 ? 'rgba(254,242,242,0.7)' : t.textMuted, margin: '0 0 8px' }
          }, market.day),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: i === 0 ? 'rgba(254,242,242,0.6)' : t.textMuted }
          }, market.vendors + ' vendors')
        )
      )
    ),

    // Local Producers
    SectionHeader({ title: 'Local Producers', subtitle: 'Support your regional food heroes', t }),
    ...producers.map((prod, i) =>
      React.createElement(PressableCard, {
        key: i,
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          animation: `slideUp 0.3s ease-out ${i * 0.06}s both`,
        }
      },
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 14,
            background: prod.color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement(Icon, { name: prod.icon, size: 22, color: prod.color })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
          }, prod.name),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
          }, prod.type)
        ),
        React.createElement('div', { style: { textAlign: 'right' } },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }
          },
            React.createElement(Icon, { name: 'Star', size: 14, color: '#CA8A04' }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text }
            }, prod.rating)
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
          }, prod.distance)
        )
      )
    )
  );
}

// ─── CHALLENGE DETAIL SCREEN ───
function ChallengeScreen({ t, setScreen }) {
  const pastChallenges = [
    { name: 'Fiddlehead Ferns', participants: 982, week: 'Mar 24–30', winner: 'Lina Park' },
    { name: 'Sunchokes', participants: 1103, week: 'Mar 17–23', winner: 'Devin Torres' },
    { name: 'Pawpaw Fruit', participants: 756, week: 'Mar 10–16', winner: 'Aaliyah Brown' },
    { name: 'Black Garlic', participants: 1340, week: 'Mar 3–9', winner: 'Marcus Wei' },
  ];

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    React.createElement('div', { style: { padding: '16px 0 16px' } },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 }
      }, 'Challenges'),
    ),

    // Current challenge hero
    React.createElement('div', {
      style: {
        background: `linear-gradient(145deg, ${t.primary}, #7F1D1D)`,
        borderRadius: 20, padding: 24, marginBottom: 20,
        boxShadow: '0 8px 32px rgba(220,38,38,0.3)',
        position: 'relative', overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120, borderRadius: 60,
          background: 'rgba(255,255,255,0.06)',
        }
      }),
      React.createElement('div', {
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(202,138,4,0.3)', borderRadius: 8, padding: '4px 10px', marginBottom: 12,
        }
      },
        React.createElement(Icon, { name: 'Zap', size: 14, color: '#CA8A04' }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: '#CA8A04', textTransform: 'uppercase', letterSpacing: 0.5 }
        }, 'Active Now')
      ),
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 26, fontWeight: 800, color: '#FEF2F2', margin: '0 0 8px', letterSpacing: -0.5 }
      }, 'Ramps (Wild Leeks)'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: 'rgba(254,242,242,0.8)', margin: '0 0 20px', lineHeight: 1.5 }
      }, 'Forage or find these wild alliums at your local market. Create a dish that celebrates their unique garlicky-onion flavor.'),
      React.createElement('div', {
        style: { display: 'flex', gap: 12 }
      },
        React.createElement('button', {
          onClick: () => setScreen('create'),
          style: {
            flex: 1, padding: '14px 0', border: 'none', borderRadius: 12,
            background: '#FEF2F2', cursor: 'pointer',
            fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 18, color: t.primary }),
          React.createElement('span', null, 'Submit Entry')
        ),
        React.createElement('button', {
          style: {
            width: 48, height: 48, border: '2px solid rgba(254,242,242,0.3)', borderRadius: 12,
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(Icon, { name: 'Share2', size: 20, color: '#FEF2F2' })
        )
      )
    ),

    // Requirements
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.border}`, borderRadius: 16,
        padding: 16, marginBottom: 20,
      }
    },
      React.createElement('h3', {
        style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 12px' }
      }, 'Challenge Requirements'),
      ...[
        { icon: 'ChefHat', text: 'Feature ramps as a primary ingredient' },
        { icon: 'Camera', text: 'Share at least one photo of your dish' },
        { icon: 'FileText', text: 'Write your Plate Tale (50+ words)' },
        { icon: 'Puzzle', text: 'Bonus: zero-waste preparation' },
      ].map((req, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
            borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: 8,
              background: i === 3 ? t.cta + '20' : t.primary + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: req.icon, size: 16, color: i === 3 ? t.cta : t.primary })),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary }
          }, req.text)
        )
      )
    ),

    // Past challenges
    SectionHeader({ title: 'Past Challenges', subtitle: 'Previous weekly ingredients', t }),
    ...pastChallenges.map((ch, i) =>
      React.createElement(PressableCard, {
        key: i,
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
          animation: `slideUp 0.3s ease-out ${i * 0.06}s both`,
        }
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}20)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement(Icon, { name: 'Leaf', size: 20, color: t.primary })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
          }, ch.name),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
          }, ch.week + ' · ' + ch.participants + ' entries')
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 4 }
        },
          React.createElement(Icon, { name: 'Trophy', size: 14, color: '#CA8A04' }),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta }
          }, ch.winner)
        )
      )
    )
  );
}

// ─── CREATE SCREEN ───
function CreateScreen({ t, setScreen }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 16px' }
    },
      React.createElement('button', {
        onClick: () => setScreen('home'),
        style: {
          background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: t.primary }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.primary }
        }, 'Back')
      ),
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: 0 }
      }, 'New Plate Tale'),
      React.createElement('div', { style: { width: 60 } })
    ),

    // Progress
    React.createElement('div', {
      style: { display: 'flex', gap: 6, marginBottom: 24 }
    },
      ...[0, 1, 2].map(s =>
        React.createElement('div', {
          key: s,
          style: {
            flex: 1, height: 4, borderRadius: 2,
            background: s <= step ? t.primary : t.surfaceAlt,
            transition: 'background 300ms ease',
          }
        })
      )
    ),

    // Step content
    step === 0 && React.createElement('div', null,
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, margin: '0 0 8px' }
      }, 'Add Your Photos'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 20px' }
      }, 'Show off your creation with beautiful photos'),
      React.createElement(PressableCard, {
        onClick: () => {},
        style: {
          height: 240, borderRadius: 18,
          border: `2px dashed ${t.border}`,
          background: t.surfaceAlt,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 16,
        }
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20,
            background: t.primary + '15',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'Camera', size: 28, color: t.primary })),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: 0 }
        }, 'Tap to add photos'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: 0 }
        }, 'Up to 8 photos · JPG, PNG')
      ),
      React.createElement('div', {
        style: { display: 'flex', gap: 10 }
      },
        ...[0, 1, 2, 3].map(i =>
          React.createElement('div', {
            key: i,
            style: {
              width: 72, height: 72, borderRadius: 12,
              border: `1px dashed ${t.border}`, background: t.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, React.createElement(Icon, { name: 'Plus', size: 20, color: t.textMuted }))
        )
      )
    ),

    step === 1 && React.createElement('div', null,
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, margin: '0 0 8px' }
      }, 'Tell Your Story'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 20px' }
      }, 'What inspired this dish? Share your culinary journey.'),
      React.createElement('input', {
        value: title,
        onChange: (e) => setTitle(e.target.value),
        placeholder: 'Give your dish a name...',
        style: {
          width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${t.border}`,
          background: t.inputBg, fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text,
          marginBottom: 12, outline: 'none', boxSizing: 'border-box',
        }
      }),
      React.createElement('textarea', {
        value: story,
        onChange: (e) => setStory(e.target.value),
        placeholder: 'Share your Plate Tale... How did you discover or prepare the ingredient? What techniques did you use? Any surprises along the way?',
        style: {
          width: '100%', height: 200, padding: '14px 16px', borderRadius: 14, border: `1px solid ${t.border}`,
          background: t.inputBg, fontFamily: font, fontSize: 15, color: t.text,
          resize: 'none', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
        }
      }),
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }
      },
        ...['This Week\'s Ramps', 'Zero-Waste', 'Forager Find', 'Family Recipe'].map((tag, i) =>
          React.createElement('button', {
            key: i,
            style: {
              padding: '8px 14px', borderRadius: 20,
              background: i === 0 ? t.primary + '20' : t.surfaceAlt,
              border: i === 0 ? `1px solid ${t.primary}` : `1px solid ${t.border}`,
              fontFamily: font, fontSize: 13, fontWeight: 600,
              color: i === 0 ? t.primary : t.textSecondary,
              cursor: 'pointer',
            }
          }, tag)
        )
      )
    ),

    step === 2 && React.createElement('div', {
      style: { textAlign: 'center', paddingTop: 40 }
    },
      React.createElement('div', {
        style: {
          width: 80, height: 80, borderRadius: 40, margin: '0 auto 20px',
          background: `linear-gradient(135deg, #059669, #10B981)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'bounceIn 0.6s ease-out',
        }
      }, React.createElement(Icon, { name: 'Check', size: 36, color: '#FEF2F2' })),
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.5, margin: '0 0 8px' }
      }, 'Ready to Share!'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 24px', lineHeight: 1.5, padding: '0 20px' }
      }, 'Your Plate Tale looks amazing. Share it with the community and keep your Root Streak going!'),
      React.createElement(StreakBadge, { count: 13, t }),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 13, color: t.cta, margin: '12px 0 0', fontWeight: 600 }
      }, 'Streak extended! New personal best!')
    ),

    // Navigation
    React.createElement('div', {
      style: { display: 'flex', gap: 10, marginTop: 32 }
    },
      step > 0 && React.createElement('button', {
        onClick: () => setStep(s => s - 1),
        style: {
          flex: 1, padding: '16px 0', borderRadius: 14,
          border: `2px solid ${t.border}`, background: 'transparent',
          fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, cursor: 'pointer',
        }
      }, 'Back'),
      React.createElement('button', {
        onClick: () => step < 2 ? setStep(s => s + 1) : setScreen('community'),
        style: {
          flex: 1, padding: '16px 0', borderRadius: 14, border: 'none',
          background: step === 2 ? `linear-gradient(135deg, ${t.primary}, #991B1B)` : t.primary,
          fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FEF2F2', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(220,38,38,0.3)',
        }
      }, step === 2 ? 'Share Plate Tale' : 'Continue')
    )
  );
}

// ─── PROFILE SCREEN ───
function ProfileScreen({ t, isDark, toggleTheme }) {
  const stats = [
    { label: 'Streak', value: '12', icon: 'Flame', color: '#CA8A04' },
    { label: 'Plates', value: '47', icon: 'ChefHat', color: '#DC2626' },
    { label: 'Likes', value: '2.1k', icon: 'Heart', color: '#F87171' },
    { label: 'Rank', value: '#18', icon: 'Trophy', color: '#7C3AED' },
  ];

  const achievements = [
    { name: 'First Plate', desc: 'Shared your first creation', icon: 'Award', earned: true },
    { name: 'Fire Streak', desc: '10 weeks in a row', icon: 'Flame', earned: true },
    { name: 'Local Hero', desc: 'Featured by 5 producers', icon: 'MapPin', earned: true },
    { name: 'Master Chef', desc: '50 plates shared', icon: 'Crown', earned: false },
    { name: 'Trendsetter', desc: 'Top plate 3 times', icon: 'TrendingUp', earned: false },
  ];

  return React.createElement('div', {
    style: { padding: '0 16px 24px', animation: 'fadeIn 0.4s ease-out' }
  },
    // Profile header
    React.createElement('div', {
      style: { textAlign: 'center', padding: '20px 0 24px' }
    },
      React.createElement('div', {
        style: {
          width: 88, height: 88, borderRadius: 28, margin: '0 auto 14px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(220,38,38,0.3)',
        }
      }, React.createElement('span', {
        style: { fontFamily: font, fontSize: 36, fontWeight: 700, color: '#FEF2F2' }
      }, 'A')),
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px' }
      }, 'Alex Thompson'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '0 0 12px' }
      }, 'Home cook · Portland, OR'),
      React.createElement(StreakBadge, { count: 12, t })
    ),

    // Stats grid
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }
    },
      ...stats.map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
            padding: '14px 8px', textAlign: 'center',
            animation: `slideUp 0.3s ease-out ${i * 0.05}s both`,
          }
        },
          React.createElement(Icon, { name: stat.icon, size: 20, color: stat.color, style: { margin: '0 auto 6px', display: 'block' } }),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }
          }, stat.value),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 11, color: t.textMuted, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }
          }, stat.label)
        )
      )
    ),

    // Theme toggle
    React.createElement(PressableCard, {
      onClick: toggleTheme,
      style: {
        background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
        padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12,
      }
    },
      React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 20, color: t.primary }),
      React.createElement('span', {
        style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, flex: 1 }
      }, isDark ? 'Dark Mode' : 'Light Mode'),
      React.createElement('div', {
        style: {
          width: 48, height: 28, borderRadius: 14, padding: 2,
          background: isDark ? t.primary : t.surfaceAlt,
          transition: 'background 200ms ease',
        }
      },
        React.createElement('div', {
          style: {
            width: 24, height: 24, borderRadius: 12,
            background: '#FEF2F2',
            transform: isDark ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 200ms ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }
        })
      )
    ),

    // Achievements
    SectionHeader({ title: 'Achievements', subtitle: '3 of 5 earned', t }),
    ...achievements.map((ach, i) =>
      React.createElement('div', {
        key: i,
        style: {
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
          padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
          opacity: ach.earned ? 1 : 0.5,
          animation: `slideUp 0.3s ease-out ${i * 0.06}s both`,
        }
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12,
            background: ach.earned ? `linear-gradient(135deg, ${t.cta}, #E5A80A)` : t.surfaceAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        }, React.createElement(Icon, { name: ach.icon, size: 20, color: ach.earned ? '#1A1114' : t.textMuted })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 }
          }, ach.name),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, margin: '2px 0 0' }
          }, ach.desc)
        ),
        ach.earned && React.createElement(Icon, { name: 'CheckCircle', size: 20, color: '#059669' })
      )
    ),

    // Settings links
    React.createElement('div', { style: { marginTop: 14 } },
      ...['Edit Profile', 'Notification Settings', 'Privacy', 'Help & Support'].map((item, i) =>
        React.createElement(PressableCard, {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
            padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center',
          }
        },
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 500, color: t.text, flex: 1 }
          }, item),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textMuted })
        )
      )
    )
  );
}

// ─── MAIN APP ───
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const toggleTheme = () => setIsDark(d => !d);
  const setScreen = (s) => setActiveScreen(s);

  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'community', icon: 'Users', label: 'Community' },
    { id: 'create', icon: 'PlusCircle', label: 'Create' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, { t, setScreen }),
    community: () => React.createElement(CommunityScreen, { t, setScreen }),
    explore: () => React.createElement(ExploreScreen, { t }),
    challenge: () => React.createElement(ChallengeScreen, { t, setScreen }),
    create: () => React.createElement(CreateScreen, { t, setScreen }),
    profile: () => React.createElement(ProfileScreen, { t, isDark, toggleTheme }),
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', fontFamily: font,
    }
  },
    React.createElement(StyleTag),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44,
        background: t.bg, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 300ms ease',
      }
    },
      // Content area
      React.createElement('div', {
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 8, paddingBottom: 80,
          WebkitOverflowScrolling: 'touch',
        }
      },
        React.createElement(screens[activeScreen] || screens.home)
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center',
          padding: '8px 4px 24px',
          backdropFilter: 'blur(20px)',
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              minHeight: 44, minWidth: 44,
            }
          },
            tab.id === 'create'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 14,
                    background: `linear-gradient(135deg, ${t.primary}, #991B1B)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
                    transform: activeScreen === tab.id ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 200ms ease',
                  }
                }, React.createElement(Icon, { name: tab.icon, size: 22, color: '#FEF2F2' }))
              : React.createElement(React.Fragment, null,
                  React.createElement(Icon, {
                    name: tab.icon, size: 22,
                    color: activeScreen === tab.id ? t.primary : t.tabInactive,
                  }),
                  React.createElement('span', {
                    style: {
                      fontFamily: font, fontSize: 11, fontWeight: 600,
                      color: activeScreen === tab.id ? t.primary : t.tabInactive,
                      transition: 'color 200ms ease',
                    }
                  }, tab.label)
                )
          )
        )
      )
    )
  );
}
