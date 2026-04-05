const { useState, useEffect, useRef } = React;

// ==================== THEMES ====================
const themes = {
  dark: {
    bg: '#09090B', surface: '#18181B', surface2: '#27272A', surface3: '#3F3F46',
    border: '#3F3F46', text: '#FAFAFA', textSec: '#A1A1AA', textMuted: '#71717A',
    cta: '#EC4899', ctaBg: 'rgba(236,72,153,0.15)', ctaHover: '#DB2777',
    purple: '#8B5CF6', cyan: '#06B6D4', amber: '#F59E0B', green: '#10B981',
  },
  light: {
    bg: '#FAFAFA', surface: '#FFFFFF', surface2: '#F4F4F5', surface3: '#E4E4E7',
    border: '#E4E4E7', text: '#18181B', textSec: '#52525B', textMuted: '#71717A',
    cta: '#EC4899', ctaBg: 'rgba(236,72,153,0.1)', ctaHover: '#DB2777',
    purple: '#7C3AED', cyan: '#0891B2', amber: '#D97706', green: '#059669',
  }
};

// ==================== SCENE DATA ====================
const SCENES = [
  {
    id: 1, title: 'Neon Coral Depths', creator: 'voxelmancer', avatar: 'VC',
    forges: 47, likes: 312, views: '2.4k', branches: 8,
    tags: ['underwater', 'neon', 'organic'],
    gradient: 'linear-gradient(135deg, #1a0533 0%, #4c1d95 40%, #7c3aed 70%, #ec4899 100%)',
    accent: '#EC4899', stickerText: 'TRENDING', stickerRot: -2, stickerBg: '#EC4899',
    desc: 'A bioluminescent coral ecosystem where AI-generated sea creatures drift through quantum light fields.',
    members: 234, time: '2m ago',
  },
  {
    id: 2, title: 'Crystalline Void Station', creator: 'echoblade', avatar: 'EB',
    forges: 31, likes: 245, views: '1.8k', branches: 5,
    tags: ['space', 'sci-fi', 'crystal'],
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 40%, #0ea5e9 80%, #67e8f9 100%)',
    accent: '#0EA5E9', stickerText: 'HOT FORK', stickerRot: 2, stickerBg: '#0284C7',
    desc: 'An abandoned space station overtaken by crystalline growth, frozen mid-transmission.',
    members: 167, time: '14m ago',
  },
  {
    id: 3, title: 'Autumn Ruins Protocol', creator: 'synthwave_k', avatar: 'SK',
    forges: 28, likes: 189, views: '1.2k', branches: 4,
    tags: ['ruins', 'autumn', 'mystery'],
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #7c2d12 40%, #ea580c 70%, #fbbf24 100%)',
    accent: '#F59E0B', stickerText: 'GROWING', stickerRot: -1, stickerBg: '#B45309',
    desc: 'Ancient ruins reclaimed by autumn foliage, each branch revealing a different fallen civilization.',
    members: 142, time: '1h ago',
  },
  {
    id: 4, title: 'Quantum Forest Meridian', creator: 'luminary_x', avatar: 'LX',
    forges: 19, likes: 134, views: '987', branches: 3,
    tags: ['forest', 'quantum', 'ethereal'],
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #16a34a 70%, #86efac 100%)',
    accent: '#10B981', stickerText: 'NEW SEED', stickerRot: 1, stickerBg: '#059669',
    desc: 'A forest where trees exist in quantum superposition, flickering between realities.',
    members: 98, time: '3h ago',
  },
  {
    id: 5, title: 'Indigo Mind Palace', creator: 'dreamweaver9', avatar: 'D9',
    forges: 55, likes: 421, views: '3.1k', branches: 12,
    tags: ['surreal', 'mind', 'indigo'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4f46e5 70%, #a5b4fc 100%)',
    accent: '#8B5CF6', stickerText: 'VIRAL', stickerRot: -2, stickerBg: '#7C3AED',
    desc: 'A labyrinthine mental architecture where memories manifest as floating geometric temples.',
    members: 389, time: '5h ago',
  },
  {
    id: 6, title: 'Chrome Desert Drift', creator: 'nullwave', avatar: 'NW',
    forges: 22, likes: 156, views: '1.1k', branches: 6,
    tags: ['desert', 'chrome', 'retro'],
    gradient: 'linear-gradient(135deg, #1c1917 0%, #44403c 40%, #78716c 70%, #d6d3d1 100%)',
    accent: '#A8A29E', stickerText: 'COLLAB', stickerRot: 2, stickerBg: '#57534E',
    desc: 'Chrome-plated dunes stretching into a pixelated horizon, a tribute to retro-futures.',
    members: 121, time: '8h ago',
  },
];

// ==================== SHARED HELPERS ====================
function Icon({ name, size = 20, color, strokeWidth = 2 }) {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
  return React.createElement(LucideIcon, { size, color, strokeWidth });
}

function Sticker({ text, rotate = 0, bg = '#EC4899', small = false }) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      padding: small ? '2px 6px' : '3px 9px',
      background: bg, color: '#fff',
      fontSize: small ? '9px' : '10px',
      fontWeight: 800, fontFamily: 'Fredoka, sans-serif',
      borderRadius: '5px', transform: `rotate(${rotate}deg)`,
      boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
      letterSpacing: '0.6px', whiteSpace: 'nowrap',
    }
  }, text);
}

function Avatar({ initials, size = 32, colors }) {
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: '50%',
      background: colors || 'linear-gradient(135deg, #EC4899, #8B5CF6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700,
      fontFamily: 'Fredoka, sans-serif', color: '#fff', flexShrink: 0,
    }
  }, initials);
}

function SceneThumb({ scene, height = 130, borderRadius = '12px 12px 0 0' }) {
  return React.createElement('div', {
    style: {
      height, background: scene.gradient, borderRadius,
      position: 'relative', overflow: 'hidden',
    }
  },
    React.createElement('div', {
      style: {
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 60%)',
      }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', bottom: 8, left: 8,
        display: 'flex', gap: 4, alignItems: 'center',
      }
    },
      React.createElement(Sticker, { text: scene.stickerText, rotate: scene.stickerRot, bg: scene.stickerBg }),
    ),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 8, right: 8,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
        borderRadius: '20px', padding: '3px 8px',
        fontSize: '10px', color: '#fff', fontFamily: 'Nunito, sans-serif',
        fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4,
      }
    },
      React.createElement(Icon, { name: 'GitBranch', size: 10, color: '#fff' }),
      `${scene.branches} branches`
    ),
  );
}

// ==================== HOME SCREEN ====================
function HomeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('hot');
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) => setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const tabData = { hot: SCENES.slice(0, 4), new: SCENES.slice(2), following: SCENES.slice(1, 4) };
  const displayScenes = tabData[activeTab] || SCENES;
  const featured = SCENES[4]; // Indigo Mind Palace

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 16px 0', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
        background: t.bg, paddingBottom: 12,
        borderBottom: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: {
            fontFamily: 'Fredoka, sans-serif', fontSize: '22px',
            fontWeight: 700, color: t.text, lineHeight: 1,
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          React.createElement('span', { style: { color: t.cta } }, 'Echo'),
          'Forge',
          React.createElement('span', {
            style: {
              fontSize: '10px', fontWeight: 800, background: t.cta,
              color: '#fff', padding: '2px 6px', borderRadius: '4px',
              marginLeft: 4, transform: 'rotate(-1deg)', display: 'inline-block',
              boxShadow: '1px 1px 0 rgba(0,0,0,0.3)',
            }
          }, 'CLUB')
        ),
        React.createElement('div', {
          style: { fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }
        }, '1,247 creators online rn')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: '20px', padding: '7px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 44, minHeight: 44,
          }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.textSec })),
        React.createElement('button', {
          style: {
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: '20px', padding: '7px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 44, minHeight: 44, position: 'relative',
          }
        },
          React.createElement(Icon, { name: 'Bell', size: 16, color: t.textSec }),
          React.createElement('div', {
            style: {
              position: 'absolute', top: 8, right: 8, width: 7, height: 7,
              background: t.cta, borderRadius: '50%',
            }
          })
        )
      )
    ),

    // Featured Hero Card
    React.createElement('div', { style: { padding: '14px 16px 0' } },
      React.createElement('div', {
        style: {
          fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px',
          color: t.cta, fontFamily: 'Fredoka, sans-serif', marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(Icon, { name: 'Flame', size: 12, color: t.cta }),
        'TODAY\'S TOP FORGE'
      ),
      React.createElement('div', {
        className: 'card-hover',
        onClick: () => setActiveScreen('trails'),
        style: {
          background: t.surface, borderRadius: '16px', overflow: 'hidden',
          border: `1px solid ${t.border}`, cursor: 'pointer',
          transition: 'all 0.2s ease', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
        }
      },
        React.createElement('div', {
          style: {
            height: 160, background: featured.gradient, position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 25% 35%, rgba(255,255,255,0.15) 0%, transparent 55%)',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
            }
          }),
          React.createElement('div', {
            style: { position: 'absolute', bottom: 12, left: 12 }
          },
            React.createElement('div', {
              style: {
                fontFamily: 'Fredoka, sans-serif', fontSize: '20px',
                fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }
            }, featured.title),
            React.createElement('div', {
              style: { fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Nunito, sans-serif' }
            }, `by @${featured.creator}`)
          ),
          React.createElement('div', {
            style: { position: 'absolute', top: 10, left: 10 }
          }, React.createElement(Sticker, { text: featured.stickerText, rotate: featured.stickerRot, bg: featured.stickerBg })),
          React.createElement('div', {
            style: { position: 'absolute', top: 10, right: 10 }
          }, React.createElement(Sticker, { text: `${featured.branches} BRANCHES`, rotate: 1, bg: 'rgba(0,0,0,0.5)' }))
        ),
        React.createElement('div', {
          style: { padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: t.textSec }
            }, React.createElement(Icon, { name: 'Heart', size: 13, color: t.cta }), featured.likes),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: t.textSec }
            }, React.createElement(Icon, { name: 'Eye', size: 13, color: t.textMuted }), featured.views),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', color: t.textSec }
            }, React.createElement(Icon, { name: 'Zap', size: 13, color: t.amber }), `${featured.forges} forges`)
          ),
          React.createElement('button', {
            style: {
              background: t.ctaBg, border: `1px solid ${t.cta}`,
              color: t.cta, borderRadius: '20px', padding: '5px 12px',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Fredoka, sans-serif', minHeight: 30,
            }
          }, 'FORGE IT →')
        )
      )
    ),

    // Activity flash
    React.createElement('div', {
      style: { padding: '10px 16px' }
    },
      React.createElement('div', {
        style: {
          background: t.ctaBg, border: `1px solid ${t.cta}`,
          borderRadius: '10px', padding: '8px 12px',
          fontSize: '11px', color: t.text, fontFamily: 'Nunito, sans-serif',
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        React.createElement(Icon, { name: 'Zap', size: 12, color: t.cta }),
        React.createElement('span', null,
          React.createElement('strong', { style: { color: t.cta } }, 'synthwave_k'),
          ' just forged a new branch on ',
          React.createElement('strong', null, 'Crystalline Void Station'),
          ' · 2m ago'
        )
      )
    ),

    // Tabs
    React.createElement('div', {
      style: { padding: '0 16px', display: 'flex', gap: 4 }
    },
      ['hot', 'new', 'following'].map(tab =>
        React.createElement('button', {
          key: tab, onClick: () => setActiveTab(tab),
          style: {
            flex: 1, padding: '8px 4px', borderRadius: '8px',
            background: activeTab === tab ? t.cta : t.surface2,
            color: activeTab === tab ? '#fff' : t.textSec,
            border: 'none', cursor: 'pointer',
            fontSize: '11px', fontWeight: 700,
            fontFamily: 'Fredoka, sans-serif', letterSpacing: '0.5px',
            transition: 'all 0.15s ease', minHeight: 36,
          }
        }, tab.toUpperCase())
      )
    ),

    // Scene List
    React.createElement('div', { style: { padding: '10px 16px 90px' } },
      displayScenes.map(scene =>
        React.createElement('div', {
          key: scene.id, className: 'card-hover',
          style: {
            background: t.surface, borderRadius: '14px', overflow: 'hidden',
            border: `1px solid ${t.border}`, marginBottom: 10,
            cursor: 'pointer', transition: 'all 0.2s ease',
            animation: 'fadeIn 0.3s ease forwards',
          },
          onClick: () => setActiveScreen('trails'),
        },
          React.createElement(SceneThumb, { scene, height: 100, borderRadius: '12px 12px 0 0' }),
          React.createElement('div', { style: { padding: '10px 12px' } },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }
            },
              React.createElement('div', {
                style: { fontFamily: 'Fredoka, sans-serif', fontSize: '15px', fontWeight: 700, color: t.text }
              }, scene.title),
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); toggleLike(scene.id); },
                style: {
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: likedIds.includes(scene.id) ? t.cta : t.textMuted,
                  display: 'flex', alignItems: 'center', gap: 3,
                  fontSize: '12px', minWidth: 44, minHeight: 44,
                  justifyContent: 'center',
                }
              },
                React.createElement(Icon, {
                  name: 'Heart', size: 15,
                  color: likedIds.includes(scene.id) ? t.cta : t.textMuted
                }),
                scene.likes + (likedIds.includes(scene.id) ? 1 : 0)
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              React.createElement(Avatar, { initials: scene.avatar, size: 20, colors: scene.gradient }),
              React.createElement('span', {
                style: { fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }
              }, `@${scene.creator} · ${scene.time}`),
              React.createElement('span', { style: { flex: 1 } }),
              React.createElement('span', {
                style: { fontSize: '10px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 }
              }, React.createElement(Icon, { name: 'Zap', size: 10, color: t.amber }), `${scene.forges} forges`)
            )
          )
        )
      )
    )
  );
}

// ==================== EXPLORE SCREEN ====================
function ExploreScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'space', 'nature', 'surreal', 'ruins', 'abstract'];
  const catMap = {
    all: SCENES,
    space: SCENES.filter(s => s.tags.includes('space') || s.tags.includes('crystal') || s.id === 5),
    nature: SCENES.filter(s => s.tags.includes('forest') || s.tags.includes('organic') || s.tags.includes('autumn')),
    surreal: SCENES.filter(s => s.tags.includes('surreal') || s.tags.includes('mind') || s.tags.includes('quantum')),
    ruins: SCENES.filter(s => s.tags.includes('ruins') || s.tags.includes('mystery')),
    abstract: SCENES.filter(s => s.tags.includes('neon') || s.tags.includes('retro') || s.tags.includes('chrome')),
  };
  const displayScenes = (catMap[activeCategory] || SCENES).filter(s =>
    !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.creator.toLowerCase().includes(search.toLowerCase())
  );

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '16px 16px 12px', borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', {
        style: {
          fontFamily: 'Fredoka, sans-serif', fontSize: '22px',
          fontWeight: 700, color: t.text, marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }
      },
        React.createElement(Icon, { name: 'Compass', size: 20, color: t.cta }),
        'Explore'
      ),
      // Search
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 8,
          background: t.surface2, borderRadius: '12px',
          padding: '10px 14px', border: `1px solid ${t.border}`,
        }
      },
        React.createElement(Icon, { name: 'Search', size: 15, color: t.textMuted }),
        React.createElement('input', {
          value: search, onChange: e => setSearch(e.target.value),
          placeholder: 'Search scenes, creators...',
          style: {
            background: 'none', border: 'none', outline: 'none',
            flex: 1, fontSize: '13px', color: t.text,
            fontFamily: 'Nunito, sans-serif',
          }
        })
      )
    ),

    // Weekly Challenge Banner
    React.createElement('div', { style: { padding: '12px 16px' } },
      React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          borderRadius: '16px', padding: '14px',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20,
            width: 80, height: 80,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
          }
        }),
        React.createElement('div', {
          style: {
            fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.7)', fontFamily: 'Fredoka, sans-serif',
            marginBottom: 4,
          }
        }, '⚡ WEEKLY CHALLENGE — ENDS IN 2D 14H'),
        React.createElement('div', {
          style: {
            fontFamily: 'Fredoka, sans-serif', fontSize: '18px',
            fontWeight: 700, color: '#fff', marginBottom: 6,
          }
        }, '"LIMINAL SPACES"'),
        React.createElement('div', {
          style: { fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontFamily: 'Nunito, sans-serif', marginBottom: 10 }
        }, 'Create scenes capturing eerie in-between spaces. Best 3 forks win creator credits!'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            React.createElement(Sticker, { text: '312 ENTRIES', rotate: -1, bg: 'rgba(0,0,0,0.3)' }),
            React.createElement(Sticker, { text: '🏆 TOP PRIZE', rotate: 1, bg: 'rgba(0,0,0,0.3)' }),
          ),
          React.createElement('button', {
            style: {
              background: '#fff', color: '#7C3AED', borderRadius: '20px',
              padding: '6px 14px', border: 'none', cursor: 'pointer',
              fontSize: '11px', fontWeight: 800,
              fontFamily: 'Fredoka, sans-serif', minHeight: 32,
            }
          }, 'JOIN →')
        )
      )
    ),

    // Categories
    React.createElement('div', {
      style: { padding: '0 16px 8px', display: 'flex', gap: 6, overflowX: 'auto' }
    },
      categories.map(cat =>
        React.createElement('button', {
          key: cat, onClick: () => setActiveCategory(cat),
          style: {
            padding: '6px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
            background: activeCategory === cat ? t.cta : t.surface2,
            color: activeCategory === cat ? '#fff' : t.textSec,
            border: `1px solid ${activeCategory === cat ? t.cta : t.border}`,
            cursor: 'pointer', fontSize: '11px', fontWeight: 700,
            fontFamily: 'Fredoka, sans-serif', transition: 'all 0.15s ease',
            minHeight: 32,
          }
        }, cat === 'all' ? 'ALL' : cat.toUpperCase())
      )
    ),

    // Scene Grid
    React.createElement('div', {
      style: {
        padding: '4px 16px 90px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }
    },
      displayScenes.length === 0
        ? React.createElement('div', {
            style: { gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }
          }, 'No scenes found')
        : displayScenes.map(scene =>
            React.createElement('div', {
              key: scene.id, className: 'card-hover',
              onClick: () => setActiveScreen('trails'),
              style: {
                background: t.surface, borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${t.border}`, cursor: 'pointer',
                transition: 'all 0.2s ease', animation: 'fadeIn 0.3s ease forwards',
              }
            },
              React.createElement('div', {
                style: { height: 90, background: scene.gradient, position: 'relative', overflow: 'hidden' }
              },
                React.createElement('div', {
                  style: {
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 60%)'
                  }
                }),
                React.createElement('div', {
                  style: { position: 'absolute', bottom: 6, left: 6 }
                }, React.createElement(Sticker, { text: scene.stickerText, rotate: scene.stickerRot, bg: scene.stickerBg, small: true }))
              ),
              React.createElement('div', { style: { padding: '8px' } },
                React.createElement('div', {
                  style: { fontFamily: 'Fredoka, sans-serif', fontSize: '12px', fontWeight: 700, color: t.text, marginBottom: 3 }
                }, scene.title),
                React.createElement('div', {
                  style: { fontSize: '10px', color: t.textMuted, fontFamily: 'Nunito, sans-serif', marginBottom: 6 }
                }, `@${scene.creator}`),
                React.createElement('div', {
                  style: { display: 'flex', gap: 8, alignItems: 'center' }
                },
                  React.createElement('span', { style: { fontSize: '10px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: 2 } },
                    React.createElement(Icon, { name: 'Heart', size: 10, color: t.cta }), scene.likes
                  ),
                  React.createElement('span', { style: { fontSize: '10px', color: t.textMuted, display: 'flex', alignItems: 'center', gap: 2 } },
                    React.createElement(Icon, { name: 'Zap', size: 10, color: t.amber }), scene.forges
                  )
                )
              )
            )
          )
    )
  );
}

// ==================== FORGE SCREEN ====================
function ForgeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [mode, setMode] = useState('seed');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('neon');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const styles = [
    { id: 'neon', label: 'NEON', color: '#EC4899' },
    { id: 'organic', label: 'ORGANIC', color: '#10B981' },
    { id: 'crystal', label: 'CRYSTAL', color: '#0EA5E9' },
    { id: 'ruins', label: 'RUINS', color: '#F59E0B' },
    { id: 'void', label: 'VOID', color: '#8B5CF6' },
    { id: 'retro', label: 'RETRO', color: '#78716C' },
  ];

  const musePrompts = [
    '"A cathedral built from crystallized sound waves"',
    '"An ocean floor where memories drift like plankton"',
    '"A city suspended between two moons at dusk"',
    '"Ruins of a digital civilization, overgrown with data vines"',
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2200);
  };

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '16px 16px 12px', borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', {
        style: {
          fontFamily: 'Fredoka, sans-serif', fontSize: '22px',
          fontWeight: 700, color: t.text, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }
      },
        React.createElement(Icon, { name: 'Wand2', size: 20, color: t.cta }),
        'Create & Forge'
      ),
      // Mode toggle
      React.createElement('div', {
        style: {
          display: 'flex', background: t.surface2, borderRadius: '12px',
          padding: '3px', border: `1px solid ${t.border}`,
        }
      },
        ['seed', 'forge'].map(m =>
          React.createElement('button', {
            key: m, onClick: () => { setMode(m); setGenerated(false); },
            style: {
              flex: 1, padding: '9px', borderRadius: '10px',
              background: mode === m ? t.cta : 'transparent',
              color: mode === m ? '#fff' : t.textSec,
              border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: 800,
              fontFamily: 'Fredoka, sans-serif', transition: 'all 0.2s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              minHeight: 40,
            }
          },
            React.createElement(Icon, { name: m === 'seed' ? 'Sparkles' : 'Zap', size: 14, color: mode === m ? '#fff' : t.textSec }),
            m === 'seed' ? 'SEED NEW SCENE' : 'FORGE ON EXISTING'
          )
        )
      )
    ),

    React.createElement('div', { style: { padding: '14px 16px' } },

      // Prompt label
      React.createElement('div', {
        style: {
          fontSize: '11px', fontWeight: 800, letterSpacing: '1px',
          color: t.textMuted, fontFamily: 'Fredoka, sans-serif', marginBottom: 8,
        }
      }, mode === 'seed' ? 'DESCRIBE YOUR SCENE' : 'DESCRIBE YOUR ADDITION'),

      // Prompt textarea
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '14px',
          border: `2px solid ${prompt ? t.cta : t.border}`,
          overflow: 'hidden', transition: 'border-color 0.2s ease',
          marginBottom: 14,
        }
      },
        React.createElement('textarea', {
          value: prompt, onChange: e => { setPrompt(e.target.value); setGenerated(false); },
          placeholder: mode === 'seed'
            ? 'A neon-lit underwater city where jellyfish carry lanterns...'
            : 'Add a crashed spaceship half-buried in the coral...',
          style: {
            width: '100%', padding: '14px', background: 'transparent',
            border: 'none', outline: 'none', resize: 'none',
            fontSize: '13px', color: t.text, lineHeight: 1.5,
            fontFamily: 'Nunito, sans-serif', minHeight: 90,
          }
        }),
        React.createElement('div', {
          style: {
            padding: '6px 12px 10px', display: 'flex', justifyContent: 'flex-end',
            fontSize: '10px', color: t.textMuted, fontFamily: 'Nunito, sans-serif',
          }
        }, `${prompt.length}/280`)
      ),

      // Style selector
      React.createElement('div', {
        style: { marginBottom: 14 }
      },
        React.createElement('div', {
          style: {
            fontSize: '11px', fontWeight: 800, letterSpacing: '1px',
            color: t.textMuted, fontFamily: 'Fredoka, sans-serif', marginBottom: 8,
          }
        }, 'SCENE STYLE'),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, flexWrap: 'wrap' }
        },
          styles.map(s =>
            React.createElement('button', {
              key: s.id, onClick: () => setSelectedStyle(s.id),
              style: {
                padding: '6px 12px', borderRadius: '20px',
                background: selectedStyle === s.id ? s.color : t.surface2,
                color: selectedStyle === s.id ? '#fff' : t.textSec,
                border: `1px solid ${selectedStyle === s.id ? s.color : t.border}`,
                cursor: 'pointer', fontSize: '10px', fontWeight: 800,
                fontFamily: 'Fredoka, sans-serif', transition: 'all 0.15s ease',
                minHeight: 32,
              }
            }, s.label)
          )
        )
      ),

      // AI Muse
      React.createElement('div', {
        style: {
          background: t.ctaBg, border: `1px solid ${t.cta}`,
          borderRadius: '14px', padding: '12px', marginBottom: 16,
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
            fontFamily: 'Fredoka, sans-serif', fontSize: '12px',
            fontWeight: 700, color: t.cta,
          }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.cta }),
          'AI MUSE SUGGESTS'
        ),
        React.createElement('div', {
          style: {
            fontSize: '12px', color: t.text, fontFamily: 'Nunito, sans-serif',
            lineHeight: 1.5, marginBottom: 8, fontStyle: 'italic',
          }
        }, musePrompts[Math.floor(Math.random() * musePrompts.length)]),
        React.createElement('button', {
          onClick: () => setPrompt(musePrompts[1].replace(/"/g, '')),
          style: {
            background: 'none', border: `1px solid ${t.cta}`, color: t.cta,
            borderRadius: '20px', padding: '4px 12px', cursor: 'pointer',
            fontSize: '10px', fontWeight: 700, fontFamily: 'Fredoka, sans-serif',
            minHeight: 28,
          }
        }, 'USE THIS PROMPT')
      ),

      // Generate button
      generated
        ? React.createElement('div', {
            style: {
              background: 'linear-gradient(135deg, #052e16, #14532d)',
              border: '2px solid #10B981', borderRadius: '14px',
              padding: '16px', textAlign: 'center', animation: 'slideUp 0.4s ease',
            }
          },
            React.createElement('div', {
              style: { fontSize: '28px', marginBottom: 6 }
            }, '✦'),
            React.createElement('div', {
              style: { fontFamily: 'Fredoka, sans-serif', fontSize: '16px', fontWeight: 700, color: '#86EFAC', marginBottom: 4 }
            }, 'SCENE SEEDED!'),
            React.createElement('div', {
              style: { fontSize: '11px', color: '#6EE7B7', fontFamily: 'Nunito, sans-serif', marginBottom: 10 }
            }, 'Your scene is live. The forge is open.'),
            React.createElement('button', {
              onClick: () => setActiveScreen('trails'),
              style: {
                background: '#10B981', color: '#fff', border: 'none',
                borderRadius: '10px', padding: '10px 24px',
                fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                fontFamily: 'Fredoka, sans-serif', minHeight: 44,
              }
            }, 'VIEW CONTINUUM TRAIL →')
          )
        : React.createElement('button', {
            onClick: handleGenerate,
            disabled: !prompt.trim() || generating,
            className: 'btn-press',
            style: {
              width: '100%', padding: '14px',
              background: prompt.trim() ? 'linear-gradient(135deg, #EC4899, #8B5CF6)' : t.surface3,
              color: prompt.trim() ? '#fff' : t.textMuted,
              border: 'none', borderRadius: '14px', cursor: prompt.trim() ? 'pointer' : 'not-allowed',
              fontSize: '15px', fontWeight: 800, fontFamily: 'Fredoka, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              minHeight: 52, transition: 'all 0.2s ease',
              boxShadow: prompt.trim() ? '0 6px 24px rgba(236,72,153,0.4)' : 'none',
              animation: generating ? 'pulse 1s infinite' : 'none',
            }
          },
            generating
              ? [
                  React.createElement('div', {
                    key: 'spin',
                    style: {
                      width: 16, height: 16, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      animation: 'spin 0.8s linear infinite',
                    }
                  }),
                  React.createElement('span', { key: 'text' }, 'GENERATING SCENE...')
                ]
              : [
                  React.createElement(Icon, { key: 'icon', name: mode === 'seed' ? 'Sparkles' : 'Zap', size: 18, color: '#fff' }),
                  React.createElement('span', { key: 'text' }, mode === 'seed' ? 'SEED THIS SCENE' : 'FORGE NEW BRANCH')
                ]
          )
    )
  );
}

// ==================== TRAILS SCREEN ====================
function TrailsScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [selectedNode, setSelectedNode] = useState(2);
  const scene = SCENES[4]; // Indigo Mind Palace

  const nodes = [
    { id: 0, x: 152, y: 30, label: 'Origin Seed', creator: 'dreamweaver9', time: '3d ago', color: '#EC4899', main: true },
    { id: 1, x: 80, y: 100, label: 'Floating Temples', creator: 'voxelmancer', time: '2d ago', color: '#8B5CF6', main: false },
    { id: 2, x: 220, y: 100, label: 'Memory Crystals', creator: 'echoblade', time: '2d ago', color: '#0EA5E9', main: true },
    { id: 3, x: 50, y: 170, label: 'Dark Corridors', creator: 'synthwave_k', time: '1d ago', color: '#F59E0B', main: false },
    { id: 4, x: 130, y: 170, label: 'Light Bridges', creator: 'luminary_x', time: '1d ago', color: '#10B981', main: true },
    { id: 5, x: 250, y: 170, label: 'Void Fractures', creator: 'nullwave', time: '18h ago', color: '#8B5CF6', main: false },
    { id: 6, x: 80, y: 240, label: 'Obsidian Gate', creator: 'dreamweaver9', time: '8h ago', color: '#EC4899', main: false },
    { id: 7, x: 200, y: 240, label: 'Prism Core', creator: 'echoblade', time: '2h ago', color: '#0EA5E9', main: true },
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [4, 6], [5, 7],
  ];

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: { padding: '16px 16px 12px', borderBottom: `1px solid ${t.border}` }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }
      },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: {
            background: 'none', border: 'none', cursor: 'pointer',
            color: t.textSec, display: 'flex', alignItems: 'center', minWidth: 44, minHeight: 44, padding: 0,
          }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: t.textSec })),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: 'Fredoka, sans-serif', fontSize: '18px', fontWeight: 700, color: t.text }
          }, scene.title),
          React.createElement('div', {
            style: { fontSize: '11px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' }
          }, `${nodes.length} nodes · ${scene.branches} active branches`)
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6 } },
        React.createElement(Sticker, { text: `${scene.forges} FORGES`, rotate: -1, bg: t.cta }),
        React.createElement(Sticker, { text: `${scene.likes} LIKES`, rotate: 1, bg: scene.stickerBg }),
        React.createElement(Sticker, { text: `${scene.members} MEMBERS`, rotate: -1, bg: '#3F3F46' }),
      )
    ),

    // SVG Trail Visualization
    React.createElement('div', {
      style: {
        margin: '12px 16px', background: t.surface,
        borderRadius: '16px', border: `1px solid ${t.border}`,
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          padding: '8px 12px 4px',
          fontFamily: 'Fredoka, sans-serif', fontSize: '11px',
          fontWeight: 700, color: t.textMuted, letterSpacing: '1px',
        }
      }, 'CONTINUUM TRAIL'),
      React.createElement('svg', {
        width: '100%', viewBox: '0 0 305 280',
        style: { display: 'block' }
      },
        // Edges
        edges.map(([from, to], i) => {
          const a = nodes[from], b = nodes[to];
          return React.createElement('line', {
            key: `edge-${i}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y,
            stroke: t.border, strokeWidth: 1.5, strokeDasharray: '4 3',
          });
        }),
        // Nodes
        nodes.map(node =>
          React.createElement('g', {
            key: node.id,
            style: { cursor: 'pointer' },
            onClick: () => setSelectedNode(node.id),
          },
            React.createElement('circle', {
              cx: node.x, cy: node.y, r: selectedNode === node.id ? 14 : 10,
              fill: node.color, opacity: selectedNode === node.id ? 1 : 0.7,
              style: { transition: 'all 0.2s ease', filter: selectedNode === node.id ? `drop-shadow(0 0 6px ${node.color})` : 'none' }
            }),
            selectedNode === node.id && React.createElement('circle', {
              cx: node.x, cy: node.y, r: 20,
              fill: 'none', stroke: node.color,
              strokeWidth: 1.5, strokeDasharray: '4 3',
              opacity: 0.5,
            }),
            React.createElement('text', {
              x: node.x, y: node.y + 24,
              textAnchor: 'middle', fontSize: 8,
              fill: t.textMuted, fontFamily: 'Nunito, sans-serif',
            }, node.label.split(' ').slice(0, 2).join(' '))
          )
        )
      )
    ),

    // Selected Node Detail
    selectedNodeData && React.createElement('div', {
      style: { margin: '0 16px 12px', animation: 'fadeIn 0.25s ease' }
    },
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '14px',
          border: `2px solid ${selectedNodeData.color}`,
          padding: '12px', boxShadow: `0 4px 16px ${selectedNodeData.color}22`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
        },
          React.createElement('div', {
            style: { width: 10, height: 10, borderRadius: '50%', background: selectedNodeData.color, flexShrink: 0 }
          }),
          React.createElement('div', {
            style: { fontFamily: 'Fredoka, sans-serif', fontSize: '15px', fontWeight: 700, color: t.text }
          }, selectedNodeData.label),
          React.createElement('span', {
            style: { fontSize: '10px', color: t.textMuted, marginLeft: 'auto', fontFamily: 'Nunito, sans-serif' }
          }, selectedNodeData.time)
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }
        },
          React.createElement(Avatar, { initials: selectedNodeData.creator.substring(0, 2).toUpperCase(), size: 24, colors: `linear-gradient(135deg, ${selectedNodeData.color}, #1a1a2e)` }),
          React.createElement('span', { style: { fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif' } },
            `forged by @${selectedNodeData.creator}`
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          React.createElement('button', {
            style: {
              flex: 1, background: t.ctaBg, border: `1px solid ${t.cta}`,
              color: t.cta, borderRadius: '10px', padding: '9px',
              cursor: 'pointer', fontSize: '11px', fontWeight: 800,
              fontFamily: 'Fredoka, sans-serif', minHeight: 44,
            },
            onClick: () => setActiveScreen('forge'),
          }, '⚡ FORGE FROM HERE'),
          React.createElement('button', {
            style: {
              background: t.surface2, border: `1px solid ${t.border}`,
              color: t.textSec, borderRadius: '10px', padding: '9px',
              cursor: 'pointer', fontSize: '11px', fontWeight: 700,
              fontFamily: 'Nunito, sans-serif', minHeight: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }
          }, React.createElement(Icon, { name: 'Share2', size: 14, color: t.textSec }), 'Share')
        )
      )
    ),

    // Contributors
    React.createElement('div', { style: { margin: '0 16px 90px' } },
      React.createElement('div', {
        style: {
          fontSize: '11px', fontWeight: 800, letterSpacing: '1px',
          color: t.textMuted, fontFamily: 'Fredoka, sans-serif', marginBottom: 8,
        }
      }, 'TOP CONTRIBUTORS'),
      [
        { name: 'dreamweaver9', avatar: 'D9', forges: 8, color: '#EC4899' },
        { name: 'echoblade', avatar: 'EB', forges: 5, color: '#0EA5E9' },
        { name: 'voxelmancer', avatar: 'VC', forges: 4, color: '#8B5CF6' },
      ].map((c, i) =>
        React.createElement('div', {
          key: c.name,
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', background: t.surface,
            borderRadius: '12px', marginBottom: 6,
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('span', {
            style: {
              fontFamily: 'Fredoka, sans-serif', fontSize: '14px',
              fontWeight: 700, color: t.textMuted, width: 20,
            }
          }, `${i + 1}.`),
          React.createElement(Avatar, { initials: c.avatar, size: 32, colors: `linear-gradient(135deg, ${c.color}, #1a1a2e)` }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: '13px', fontWeight: 700, color: t.text, fontFamily: 'Fredoka, sans-serif' } }, c.name),
            React.createElement('div', { style: { fontSize: '10px', color: t.textMuted, fontFamily: 'Nunito, sans-serif' } }, `${c.forges} forges`)
          ),
          React.createElement(Sticker, { text: i === 0 ? '👑 TOP' : `#${i + 1}`, rotate: 0, bg: i === 0 ? t.cta : t.surface3, small: true })
        )
      )
    )
  );
}

// ==================== PROFILE SCREEN ====================
function ProfileScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('created');

  const tabs = ['created', 'forged', 'liked'];
  const tabScenes = {
    created: SCENES.slice(0, 3),
    forged: SCENES.slice(2, 5),
    liked: SCENES.slice(1, 4),
  };

  const achievements = [
    { label: 'FIRST SEED', icon: 'Sparkles', color: '#EC4899' },
    { label: 'VIRAL FORGE', icon: 'Flame', color: '#F59E0B' },
    { label: '100 LIKES', icon: 'Heart', color: '#EF4444' },
    { label: 'COLLAB PRO', icon: 'Users', color: '#8B5CF6' },
  ];

  return React.createElement('div', {
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Profile Header
    React.createElement('div', {
      style: {
        background: isDark
          ? 'linear-gradient(180deg, #1e1b4b 0%, #09090B 100%)'
          : 'linear-gradient(180deg, #ede9fe 0%, #FAFAFA 100%)',
        padding: '20px 16px 16px',
        position: 'relative',
      }
    },
      React.createElement('div', {
        style: { position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }
      },
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: '20px', padding: '7px', cursor: 'pointer',
            display: 'flex', minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.textSec })),
        React.createElement('button', {
          style: {
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: '20px', padding: '7px', cursor: 'pointer',
            display: 'flex', minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
          }
        }, React.createElement(Icon, { name: 'Settings', size: 16, color: t.textSec }))
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 14 } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: '20px',
            background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #0EA5E9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, fontFamily: 'Fredoka, sans-serif', color: '#fff',
            boxShadow: '0 6px 20px rgba(236,72,153,0.4)',
            border: `3px solid ${t.bg}`,
          }
        }, 'D9'),
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: 'Fredoka, sans-serif', fontSize: '20px', fontWeight: 700, color: t.text }
          }, 'dreamweaver9'),
          React.createElement('div', {
            style: { fontSize: '12px', color: t.textSec, fontFamily: 'Nunito, sans-serif' }
          }, 'Master Forger · Level 47'),
          React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 4 } },
            React.createElement(Sticker, { text: 'PRO', rotate: -1, bg: '#EC4899', small: true }),
            React.createElement(Sticker, { text: 'CURATOR', rotate: 1, bg: '#8B5CF6', small: true }),
          )
        )
      ),
      // Stats row
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 8,
        }
      },
        [
          { label: 'Seeds', value: '23' },
          { label: 'Forges', value: '147' },
          { label: 'Likes', value: '2.4k' },
          { label: 'Followers', value: '892' },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              background: t.surface, borderRadius: '10px',
              padding: '8px 4px', textAlign: 'center',
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement('div', {
              style: { fontFamily: 'Fredoka, sans-serif', fontSize: '16px', fontWeight: 700, color: t.cta }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: '9px', color: t.textMuted, fontFamily: 'Nunito, sans-serif', fontWeight: 700 }
            }, stat.label.toUpperCase())
          )
        )
      )
    ),

    // Achievements
    React.createElement('div', { style: { padding: '12px 16px' } },
      React.createElement('div', {
        style: {
          fontSize: '11px', fontWeight: 800, letterSpacing: '1px',
          color: t.textMuted, fontFamily: 'Fredoka, sans-serif', marginBottom: 8,
        }
      }, 'ACHIEVEMENTS'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        achievements.map(a =>
          React.createElement('div', {
            key: a.label,
            style: {
              flex: 1, background: t.surface, borderRadius: '12px',
              border: `1px solid ${t.border}`, padding: '10px 4px',
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: '50%',
                background: `${a.color}22`, border: `2px solid ${a.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement(Icon, { name: a.icon, size: 14, color: a.color })),
            React.createElement('div', {
              style: { fontSize: '8px', fontWeight: 800, color: t.textSec, fontFamily: 'Fredoka, sans-serif', letterSpacing: '0.3px' }
            }, a.label)
          )
        )
      )
    ),

    // Tabs + Scene Grid
    React.createElement('div', { style: { padding: '0 16px 90px' } },
      React.createElement('div', {
        style: { display: 'flex', gap: 4, marginBottom: 10 }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '8px', borderRadius: '8px',
              background: activeTab === tab ? t.cta : t.surface2,
              color: activeTab === tab ? '#fff' : t.textSec,
              border: 'none', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700,
              fontFamily: 'Fredoka, sans-serif', transition: 'all 0.15s ease',
              minHeight: 36,
            }
          }, tab.toUpperCase())
        )
      ),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }
      },
        (tabScenes[activeTab] || []).map(scene =>
          React.createElement('div', {
            key: scene.id, className: 'card-hover',
            onClick: () => setActiveScreen('trails'),
            style: {
              borderRadius: '10px', overflow: 'hidden',
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'all 0.2s ease', aspectRatio: '1',
              background: scene.gradient, position: 'relative',
              animation: 'fadeIn 0.3s ease',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)',
              }
            }),
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: '6px 6px 4px',
              }
            },
              React.createElement('div', {
                style: { fontFamily: 'Fredoka, sans-serif', fontSize: '9px', fontWeight: 700, color: '#fff' }
              }, scene.title)
            )
          )
        )
      )
    )
  );
}

// ==================== BOTTOM NAV ====================
function BottomNav({ activeScreen, setActiveScreen, t }) {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'explore', icon: 'Compass', label: 'Explore' },
    { id: 'forge', icon: 'Plus', label: 'Forge' },
    { id: 'trails', icon: 'GitBranch', label: 'Trails' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', {
    style: {
      height: 65, background: t.surface,
      borderTop: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center',
      paddingBottom: 4,
      boxShadow: '0 -4px 16px rgba(0,0,0,0.12)',
    }
  },
    tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        className: 'tab-btn',
        onClick: () => setActiveScreen(tab.id),
        style: {
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 3, background: 'none', border: 'none', cursor: 'pointer',
          color: activeScreen === tab.id ? t.cta : t.textMuted,
          minHeight: 44, padding: '6px 0',
          transition: 'all 0.15s ease',
          position: 'relative',
        }
      },
        tab.id === 'forge'
          ? React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: '14px',
                background: activeScreen === 'forge'
                  ? 'linear-gradient(135deg, #EC4899, #8B5CF6)'
                  : t.surface2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: activeScreen === 'forge' ? '0 4px 16px rgba(236,72,153,0.4)' : 'none',
                border: `1px solid ${activeScreen === 'forge' ? t.cta : t.border}`,
                transition: 'all 0.2s ease',
              }
            }, React.createElement(Icon, { name: 'Plus', size: 20, color: '#fff' }))
          : [
              React.createElement(Icon, {
                key: 'icon', name: tab.icon, size: 20,
                color: activeScreen === tab.id ? t.cta : t.textMuted
              }),
              React.createElement('span', {
                key: 'label',
                style: {
                  fontSize: '9px', fontWeight: 700,
                  fontFamily: 'Fredoka, sans-serif', letterSpacing: '0.3px',
                }
              }, tab.label)
            ],
        activeScreen === tab.id && tab.id !== 'forge' && React.createElement('div', {
          style: {
            position: 'absolute', bottom: 2, width: 4, height: 4,
            borderRadius: '50%', background: t.cta,
          }
        })
      )
    )
  );
}

// ==================== APP ====================
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    forge: ForgeScreen,
    trails: TrailsScreen,
    profile: ProfileScreen,
  };

  const ScreenComponent = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: 'Nunito, sans-serif',
    }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.02); opacity: 0.85; }
      }
      @keyframes shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0; }

      .tab-btn { transition: opacity 0.15s ease; }
      .tab-btn:hover { opacity: 0.75; }

      .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .card-hover:hover { transform: translateY(-2px); }

      .btn-press:active { transform: scale(0.97) !important; }

      textarea::placeholder, input::placeholder { color: #71717A; }
    `),

    // Phone Frame
    React.createElement('div', {
      style: {
        width: '375px', height: '812px',
        background: t.bg, borderRadius: '44px',
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)',
        display: 'flex', flexDirection: 'column',
      }
    },
      React.createElement('div', {
        style: { flex: 1, overflow: 'hidden', position: 'relative' }
      },
        React.createElement(ScreenComponent, {
          t, isDark, setIsDark, setActiveScreen
        })
      ),
      React.createElement(BottomNav, { activeScreen, setActiveScreen, t })
    )
  );
}
