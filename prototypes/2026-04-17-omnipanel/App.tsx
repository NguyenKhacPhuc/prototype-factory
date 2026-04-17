const { useState, useEffect, useRef, useCallback } = React;

const THEMES = {
  dark: {
    bg: '#120E1A',
    bgSecondary: '#1A1525',
    bgTertiary: '#231D30',
    bgCard: '#1E1830',
    primary: '#6A1A70',
    secondary: '#0AD6DA',
    cta: '#FC6E22',
    text: '#FFFFFF',
    textSecondary: '#A89BB5',
    textTertiary: '#6B5F7A',
    border: '#2A2340',
    glow: 'rgba(10, 214, 218, 0.15)',
    glowPrimary: 'rgba(106, 26, 112, 0.3)',
    glowCta: 'rgba(252, 110, 34, 0.2)',
  },
  light: {
    bg: '#F5F0FA',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#EDE5F5',
    bgCard: '#FFFFFF',
    primary: '#8B3A92',
    secondary: '#089DA0',
    cta: '#E85A15',
    text: '#1A1525',
    textSecondary: '#6B5F7A',
    textTertiary: '#A89BB5',
    border: '#DDD5E8',
    glow: 'rgba(10, 214, 218, 0.08)',
    glowPrimary: 'rgba(106, 26, 112, 0.1)',
    glowCta: 'rgba(252, 110, 34, 0.1)',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const COMICS_DATA = [
  { id: 1, title: 'Stellar Drift', author: 'Nova Studios', genre: 'Sci-Fi', type: 'light', chapters: 48, progress: 72, rating: 4.8, cover: '🚀', color: '#2D1B69', readers: '12.4K' },
  { id: 2, title: 'Shadow Veil', author: 'Dark Ink Press', genre: 'Horror', type: 'dark', chapters: 36, progress: 45, rating: 4.6, cover: '🌑', color: '#1A0A2E', readers: '8.7K' },
  { id: 3, title: 'Bloom Garden', author: 'Pastel Works', genre: 'Romance', type: 'light', chapters: 62, progress: 90, rating: 4.9, cover: '🌸', color: '#4A1942', readers: '23.1K' },
  { id: 4, title: 'Crimson Edge', author: 'Blade Comics', genre: 'Action', type: 'dark', chapters: 55, progress: 30, rating: 4.5, cover: '⚔️', color: '#3D0C0C', readers: '15.8K' },
  { id: 5, title: 'Neon Spirits', author: 'Cyber Manga', genre: 'Cyberpunk', type: 'dark', chapters: 41, progress: 60, rating: 4.7, cover: '🌆', color: '#0A2A3D', readers: '19.2K' },
  { id: 6, title: 'Whimsy Tales', author: 'Joy Comics', genre: 'Comedy', type: 'light', chapters: 80, progress: 15, rating: 4.4, cover: '✨', color: '#2E1A4A', readers: '31.5K' },
  { id: 7, title: 'Abyss Walker', author: 'Void Press', genre: 'Fantasy', type: 'dark', chapters: 29, progress: 0, rating: 4.3, cover: '🔮', color: '#160D30', readers: '6.3K' },
  { id: 8, title: 'Sun Chasers', author: 'Horizon Art', genre: 'Adventure', type: 'light', chapters: 44, progress: 55, rating: 4.8, cover: '☀️', color: '#3D2A0A', readers: '17.9K' },
];

const ACHIEVEMENTS = [
  { id: 1, name: 'First Chapter', desc: 'Read your first chapter', icon: '📖', progress: 100, xp: 50 },
  { id: 2, name: 'Night Owl', desc: 'Read for 2 hours after midnight', icon: '🦉', progress: 100, xp: 100 },
  { id: 3, name: 'Genre Explorer', desc: 'Read 5 different genres', icon: '🗺️', progress: 80, xp: 150 },
  { id: 4, name: 'Speed Reader', desc: 'Read 50 pages in one session', icon: '⚡', progress: 60, xp: 200 },
  { id: 5, name: 'Series Devotee', desc: 'Complete an entire series', icon: '🏆', progress: 45, xp: 500 },
  { id: 6, name: '7-Day Streak', desc: 'Read every day for a week', icon: '🔥', progress: 71, xp: 300 },
];

const QUESTS = [
  { id: 1, name: 'Daily Read', desc: 'Read 10 pages today', progress: 7, total: 10, reward: '25 XP', active: true },
  { id: 2, name: 'New Discovery', desc: 'Start a new series', progress: 0, total: 1, reward: '50 XP', active: true },
  { id: 3, name: 'Weekend Warrior', desc: 'Read 3 chapters this weekend', progress: 2, total: 3, reward: '75 XP', active: true },
  { id: 4, name: 'Dark Side', desc: 'Read 5 Dark genre chapters', progress: 3, total: 5, reward: '100 XP', active: false },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [contentFilter, setContentFilter] = useState('all');
  const [selectedComic, setSelectedComic] = useState(null);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(3);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const [screenTransition, setScreenTransition] = useState(1);
  const [favComics, setFavComics] = useState([1, 3, 5]);
  const [downloadedComics, setDownloadedComics] = useState([1, 3]);
  const [readingComic, setReadingComic] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef(null);

  const theme = isDark ? THEMES.dark : THEMES.light;

  const switchScreen = useCallback((screen) => {
    setScreenTransition(0);
    setTimeout(() => {
      setActiveScreen(screen);
      setScreenTransition(1);
    }, 150);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setScreenTransition(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleFav = (id) => {
    setFavComics(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleDownload = (id) => {
    setDownloadedComics(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const Icon = ({ name, size = 20, color = theme.text, style = {} }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return null;
    return React.createElement(LucideIcon, { size, color, style, strokeWidth: 1.5 });
  };

  const GlowOrb = ({ top, left, color, size = 200 }) => (
    React.createElement('div', {
      style: {
        position: 'absolute', top, left, width: size, height: size,
        borderRadius: '50%', background: color, filter: 'blur(80px)',
        opacity: 0.4, pointerEvents: 'none', zIndex: 0,
      }
    })
  );

  const ProgressBar = ({ progress, color = theme.secondary, height = 4, bg = theme.bgTertiary }) => (
    React.createElement('div', {
      style: { width: '100%', height, borderRadius: height / 2, background: bg, overflow: 'hidden' }
    },
      React.createElement('div', {
        style: {
          width: `${progress}%`, height: '100%', borderRadius: height / 2,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: 'width 0.8s ease',
          boxShadow: `0 0 8px ${color}44`,
        }
      })
    )
  );

  const ComicCard = ({ comic, compact = false }) => {
    const [pressed, setPressed] = useState(false);
    return React.createElement('div', {
      style: {
        width: compact ? 130 : 155,
        flexShrink: 0,
        cursor: 'pointer',
        transform: pressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.2s ease',
      },
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onMouseLeave: () => setPressed(false),
      onClick: () => { setSelectedComic(comic); switchScreen('detail'); },
    },
      React.createElement('div', {
        style: {
          width: '100%', height: compact ? 170 : 200, borderRadius: 16,
          background: `linear-gradient(135deg, ${comic.color}, ${theme.bgTertiary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: compact ? 48 : 56, position: 'relative', overflow: 'hidden',
          border: `1px solid ${theme.border}`,
          boxShadow: `0 4px 20px ${comic.color}44`,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(circle at 30% 20%, ${theme.secondary}15, transparent 60%)`,
          }
        }),
        comic.cover,
        comic.progress > 0 && React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
            background: theme.bgTertiary,
          }
        },
          React.createElement('div', {
            style: {
              width: `${comic.progress}%`, height: '100%',
              background: theme.cta,
              boxShadow: `0 0 6px ${theme.cta}`,
            }
          })
        ),
        comic.type === 'dark' && React.createElement('div', {
          style: {
            position: 'absolute', top: 8, right: 8, background: '#1A0A2E99',
            borderRadius: 6, padding: '2px 6px', fontSize: 10,
            color: theme.secondary, fontFamily: FONT, fontWeight: 600,
            border: `1px solid ${theme.secondary}44`,
          }
        }, 'DARK')
      ),
      React.createElement('div', { style: { padding: '8px 2px' } },
        React.createElement('div', {
          style: {
            fontFamily: FONT, fontSize: 13, fontWeight: 600,
            color: theme.text, marginBottom: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }
        }, comic.title),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary }
        }, comic.author)
      )
    );
  };

  const HomeScreen = () => {
    const filtered = contentFilter === 'all' ? COMICS_DATA :
      COMICS_DATA.filter(c => c.type === contentFilter);
    const trending = [...COMICS_DATA].sort((a, b) => parseFloat(b.readers) - parseFloat(a.readers));
    const continueReading = COMICS_DATA.filter(c => c.progress > 0 && c.progress < 100);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }
    },
      React.createElement(GlowOrb, { top: -80, left: -60, color: theme.glowPrimary, size: 250 }),
      React.createElement(GlowOrb, { top: 200, left: 200, color: theme.glow, size: 180 }),

      // Header
      React.createElement('div', {
        style: {
          padding: '54px 20px 16px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', position: 'relative', zIndex: 1,
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginBottom: 4 }
          }, 'Welcome back'),
          React.createElement('div', {
            style: {
              fontFamily: FONT, fontSize: 28, fontWeight: 700, color: theme.text,
              letterSpacing: -0.5,
            }
          }, 'OmniPanel')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 12, background: theme.bgTertiary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${theme.border}`,
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18 })),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, background: theme.bgTertiary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: `1px solid ${theme.border}`,
              position: 'relative',
            }
          },
            React.createElement(Icon, { name: 'Bell', size: 18 }),
            React.createElement('div', {
              style: {
                position: 'absolute', top: -2, right: -2, width: 8, height: 8,
                borderRadius: 4, background: theme.cta, boxShadow: `0 0 6px ${theme.cta}`,
              }
            })
          )
        )
      ),

      // Content filter
      React.createElement('div', {
        style: {
          padding: '0 20px', display: 'flex', gap: 10, marginBottom: 20,
          position: 'relative', zIndex: 1,
        }
      },
        ['all', 'light', 'dark'].map(filter =>
          React.createElement('div', {
            key: filter,
            onClick: () => setContentFilter(filter),
            style: {
              padding: '8px 18px', borderRadius: 20, fontFamily: FONT,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: contentFilter === filter
                ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                : theme.bgTertiary,
              color: contentFilter === filter ? '#fff' : theme.textSecondary,
              border: `1px solid ${contentFilter === filter ? 'transparent' : theme.border}`,
              transition: 'all 0.3s ease',
              textTransform: 'capitalize',
            }
          }, filter === 'all' ? '🌌 All' : filter === 'light' ? '☀️ Light' : '🌙 Dark')
        )
      ),

      // AI Recommendation Banner
      React.createElement('div', {
        style: {
          margin: '0 20px 24px', padding: 16, borderRadius: 16,
          background: `linear-gradient(135deg, ${theme.primary}44, ${theme.bgTertiary})`,
          border: `1px solid ${theme.primary}55`,
          display: 'flex', alignItems: 'center', gap: 12,
          position: 'relative', overflow: 'hidden', zIndex: 1,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%', background: theme.secondary + '11', filter: 'blur(20px)',
          }
        }),
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg, ${theme.cta}, ${theme.primary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${theme.cta}44`,
          }
        }, React.createElement(Icon, { name: 'Sparkles', size: 22, color: '#fff' })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 2 }
          }, 'Navigator AI Suggests'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 12, color: theme.textSecondary }
          }, 'Based on your love for Sci-Fi: Try "Neon Spirits"')
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textSecondary })
      ),

      // Continue Reading
      continueReading.length > 0 && React.createElement('div', {
        style: { marginBottom: 28, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: {
            padding: '0 20px', marginBottom: 14, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center'
          }
        },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 20, fontWeight: 700, color: theme.text }
          }, 'Continue Reading'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.secondary, cursor: 'pointer' }
          }, 'See All')
        ),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px',
            scrollbarWidth: 'none',
          }
        }, continueReading.map(comic =>
          React.createElement(ComicCard, { key: comic.id, comic })
        ))
      ),

      // Trending
      React.createElement('div', {
        style: { marginBottom: 28, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: {
            padding: '0 20px', marginBottom: 14, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center'
          }
        },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 20, fontWeight: 700, color: theme.text }
          }, '🔥 Trending Now'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.secondary, cursor: 'pointer' }
          }, 'See All')
        ),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px',
            scrollbarWidth: 'none',
          }
        }, trending.slice(0, 5).map(comic =>
          React.createElement(ComicCard, { key: comic.id, comic })
        ))
      ),

      // Browse Categories
      React.createElement('div', {
        style: { marginBottom: 28, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: { padding: '0 20px', marginBottom: 14 }
        },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 20, fontWeight: 700, color: theme.text }
          }, 'Browse by Genre')
        ),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px',
            scrollbarWidth: 'none',
          }
        },
          ['Sci-Fi 🚀', 'Horror 👻', 'Romance 💕', 'Action ⚔️', 'Fantasy 🔮', 'Comedy 😂'].map((g, i) =>
            React.createElement('div', {
              key: g,
              style: {
                padding: '12px 20px', borderRadius: 14, flexShrink: 0,
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                fontFamily: FONT, fontSize: 13, fontWeight: 600, color: theme.text,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }
            }, g)
          )
        )
      ),

      // Full Catalog
      React.createElement('div', {
        style: { padding: '0 20px', position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: {
            fontFamily: FONT, fontSize: 20, fontWeight: 700, color: theme.text,
            marginBottom: 14,
          }
        }, contentFilter === 'all' ? 'Full Catalog' : contentFilter === 'light' ? 'Light Stories' : 'Dark Narratives'),
        filtered.map(comic =>
          React.createElement('div', {
            key: comic.id,
            onClick: () => { setSelectedComic(comic); switchScreen('detail'); },
            style: {
              display: 'flex', gap: 14, padding: 14, marginBottom: 12,
              borderRadius: 16, background: theme.bgCard, cursor: 'pointer',
              border: `1px solid ${theme.border}`,
              transition: 'transform 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                width: 65, height: 85, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${comic.color}, ${theme.bgTertiary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32,
              }
            }, comic.cover),
            React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement('div', {
                style: {
                  fontFamily: FONT, fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 3,
                }
              }, comic.title),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 12, color: theme.textSecondary, marginBottom: 6 }
              }, `${comic.author} · ${comic.genre} · ${comic.chapters} ch`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement(ProgressBar, { progress: comic.progress })
                ),
                React.createElement('div', {
                  style: { fontFamily: FONT, fontSize: 11, color: theme.secondary, fontWeight: 600 }
                }, `${comic.progress}%`)
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }
            },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 12, color: theme.cta, fontWeight: 600 }
              }, `⭐ ${comic.rating}`),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 10, color: theme.textTertiary }
              }, comic.readers)
            )
          )
        )
      )
    );
  };

  const DetailScreen = () => {
    if (!selectedComic) return null;
    const comic = selectedComic;
    const isFav = favComics.includes(comic.id);
    const isDownloaded = downloadedComics.includes(comic.id);

    const panels = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      content: ['Panel: A mysterious figure appears...', 'Panel: The hero awakens to a new dawn...', 'Panel: An epic battle unfolds across dimensions...', 'Panel: A quiet moment of reflection...', 'Panel: The villain reveals their plan...', 'Panel: An unexpected alliance forms...', 'Panel: A chase through neon-lit streets...', 'Panel: The climactic confrontation begins...'][i],
    }));

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      // Hero
      React.createElement('div', {
        style: {
          height: 280, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(180deg, ${comic.color}, ${theme.bg})`,
        }
      },
        React.createElement(GlowOrb, { top: 20, left: 100, color: theme.secondary + '22', size: 200 }),
        React.createElement('div', {
          style: {
            position: 'absolute', top: 48, left: 16, zIndex: 2, cursor: 'pointer',
            width: 36, height: 36, borderRadius: 10, background: theme.bg + '88',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          },
          onClick: () => switchScreen('home'),
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: '#fff' })),
        React.createElement('div', {
          style: {
            position: 'absolute', top: 48, right: 16, zIndex: 2, display: 'flex', gap: 8,
          }
        },
          React.createElement('div', {
            onClick: () => toggleFav(comic.id),
            style: {
              width: 36, height: 36, borderRadius: 10, background: theme.bg + '88',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)',
            }
          }, React.createElement(Icon, { name: isFav ? 'Heart' : 'Heart', size: 18, color: isFav ? theme.cta : '#fff' })),
          React.createElement('div', {
            onClick: () => toggleDownload(comic.id),
            style: {
              width: 36, height: 36, borderRadius: 10, background: theme.bg + '88',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)',
            }
          }, React.createElement(Icon, { name: isDownloaded ? 'CheckCircle' : 'Download', size: 18, color: isDownloaded ? theme.secondary : '#fff' }))
        ),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', alignItems: 'flex-end', padding: '20px',
            background: `linear-gradient(transparent, ${theme.bg})`,
          }
        },
          React.createElement('div', {
            style: {
              width: 90, height: 120, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg, ${comic.color}, ${theme.bgTertiary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48, marginRight: 16, border: `2px solid ${theme.border}`,
              boxShadow: `0 8px 24px ${comic.color}66`,
            }
          }, comic.cover),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }
            }, comic.title),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, color: '#ffffff99', marginBottom: 6 }
            }, `by ${comic.author}`),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('div', {
                style: {
                  padding: '3px 10px', borderRadius: 8, fontSize: 11, fontFamily: FONT,
                  background: theme.primary + '55', color: theme.secondary, fontWeight: 600,
                  border: `1px solid ${theme.secondary}33`,
                }
              }, comic.genre),
              React.createElement('div', {
                style: {
                  padding: '3px 10px', borderRadius: 8, fontSize: 11, fontFamily: FONT,
                  background: comic.type === 'dark' ? '#1A0A2E99' : '#2E1A4A99',
                  color: comic.type === 'dark' ? theme.secondary : theme.cta, fontWeight: 600,
                  textTransform: 'capitalize',
                }
              }, comic.type)
            )
          )
        )
      ),

      // Stats row
      React.createElement('div', {
        style: {
          display: 'flex', padding: '16px 20px', gap: 12, position: 'relative', zIndex: 1,
        }
      },
        [
          { label: 'Rating', value: `⭐ ${comic.rating}` },
          { label: 'Chapters', value: comic.chapters },
          { label: 'Readers', value: comic.readers },
          { label: 'Progress', value: `${comic.progress}%` },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 12,
              background: theme.bgCard, border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: 700, color: theme.text }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 10, color: theme.textSecondary, marginTop: 2 }
            }, stat.label)
          )
        )
      ),

      // Progress
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('div', {
          style: {
            fontFamily: FONT, fontSize: 13, color: theme.textSecondary, marginBottom: 8,
          }
        }, `Chapter ${Math.round(comic.chapters * comic.progress / 100)} of ${comic.chapters}`),
        React.createElement(ProgressBar, { progress: comic.progress, height: 6 })
      ),

      // Action buttons
      React.createElement('div', {
        style: { display: 'flex', gap: 12, padding: '0 20px 20px' }
      },
        React.createElement('div', {
          onClick: () => { setReadingComic(comic); setCurrentPage(0); switchScreen('reader'); },
          style: {
            flex: 1, padding: '14px 0', borderRadius: 14, textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.cta}, ${theme.primary})`,
            fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#fff',
            cursor: 'pointer', boxShadow: `0 4px 16px ${theme.cta}44`,
          }
        }, comic.progress > 0 ? '▶ Continue Reading' : '▶ Start Reading'),
        React.createElement('div', {
          onClick: () => toggleDownload(comic.id),
          style: {
            width: 50, height: 50, borderRadius: 14, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: theme.bgTertiary, border: `1px solid ${theme.border}`,
            cursor: 'pointer',
          }
        }, React.createElement(Icon, { name: isDownloaded ? 'CheckCircle' : 'Download', size: 20, color: isDownloaded ? theme.secondary : theme.text }))
      ),

      // Chapters list
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 14 }
        }, 'Chapters'),
        panels.map((panel, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', padding: '14px 16px',
              marginBottom: 8, borderRadius: 14, background: theme.bgCard,
              border: `1px solid ${theme.border}`, gap: 14, cursor: 'pointer',
            },
            onClick: () => { setReadingComic(comic); setCurrentPage(i); switchScreen('reader'); },
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: i < Math.round(comic.chapters * comic.progress / 100 / 6)
                  ? theme.secondary + '22'
                  : theme.bgTertiary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT, fontSize: 13, fontWeight: 700,
                color: i < Math.round(comic.chapters * comic.progress / 100 / 6)
                  ? theme.secondary : theme.textSecondary,
              }
            }, i + 1),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: theme.text }
              }, `Chapter ${i + 1}`),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 11, color: theme.textTertiary }
              }, panel.content)
            ),
            i < Math.round(comic.chapters * comic.progress / 100 / 6)
              ? React.createElement(Icon, { name: 'CheckCircle', size: 18, color: theme.secondary })
              : React.createElement(Icon, { name: 'ChevronRight', size: 18, color: theme.textTertiary })
          )
        )
      )
    );
  };

  const ReaderScreen = () => {
    const comic = readingComic || selectedComic || COMICS_DATA[0];
    const [scrollPos, setScrollPos] = useState(0);
    const readerRef = useRef(null);

    useEffect(() => {
      let interval;
      if (isAutoScrolling && readerRef.current) {
        interval = setInterval(() => {
          if (readerRef.current) {
            readerRef.current.scrollTop += autoScrollSpeed * 0.5;
          }
        }, 50);
      }
      return () => clearInterval(interval);
    }, [isAutoScrolling, autoScrollSpeed]);

    const panelContents = [
      { bg: '#1A0A2E', text: 'The cosmos stretches infinitely before us...', emoji: '🌌' },
      { bg: '#0A1A2E', text: 'A lone figure stands at the edge of reality...', emoji: '🧑‍🚀' },
      { bg: '#2E0A1A', text: 'Power surges through the ancient artifact...', emoji: '⚡' },
      { bg: '#0A2E1A', text: 'The forest whispers secrets of old...', emoji: '🌲' },
      { bg: '#2E1A0A', text: 'Dawn breaks over the ruined cityscape...', emoji: '🏙️' },
      { bg: '#1A2E0A', text: 'Two worlds collide in spectacular fashion...', emoji: '💥' },
      { bg: '#0A0A2E', text: 'The deep ocean holds unimaginable wonders...', emoji: '🌊' },
      { bg: '#2E2E0A', text: 'A new chapter begins in the eternal saga...', emoji: '📖' },
    ];

    return React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }
    },
      // Reader header
      React.createElement('div', {
        style: {
          padding: '48px 16px 12px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', background: '#000000CC', zIndex: 10,
          backdropFilter: 'blur(10px)',
        }
      },
        React.createElement('div', {
          onClick: () => switchScreen('detail'),
          style: {
            width: 36, height: 36, borderRadius: 10, background: '#ffffff15',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 20, color: '#fff' })),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#fff' }
          }, comic.title),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 11, color: '#ffffff77' }
          }, `Chapter ${currentPage + 1}`)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', {
            onClick: () => setIsAutoScrolling(!isAutoScrolling),
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: isAutoScrolling ? theme.secondary + '33' : '#ffffff15',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: isAutoScrolling ? `1px solid ${theme.secondary}` : 'none',
            }
          }, React.createElement(Icon, { name: 'PlayCircle', size: 18, color: isAutoScrolling ? theme.secondary : '#fff' }))
        )
      ),

      // Auto-scroll speed control
      isAutoScrolling && React.createElement('div', {
        style: {
          padding: '8px 20px', background: theme.secondary + '15',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: `1px solid ${theme.secondary}33`,
        }
      },
        React.createElement(Icon, { name: 'Gauge', size: 14, color: theme.secondary }),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.secondary, fontWeight: 600 }
        }, 'Auto-Scroll'),
        React.createElement('input', {
          type: 'range', min: 1, max: 10, value: autoScrollSpeed,
          onChange: (e) => setAutoScrollSpeed(Number(e.target.value)),
          style: { flex: 1, accentColor: theme.secondary },
        }),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: theme.secondary, fontWeight: 600, width: 20 }
        }, autoScrollSpeed)
      ),

      // Panel content
      React.createElement('div', {
        ref: readerRef,
        style: { flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }
      },
        panelContents.map((panel, i) =>
          React.createElement('div', {
            key: i,
            style: {
              minHeight: 400, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: 30,
              background: `linear-gradient(180deg, ${panel.bg}, ${panel.bg}DD)`,
              borderBottom: `1px solid #ffffff0A`,
              position: 'relative',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: `radial-gradient(circle at ${30 + i * 10}% ${40 + i * 5}%, ${theme.secondary}08, transparent 60%)`,
              }
            }),
            React.createElement('div', { style: { fontSize: 72, marginBottom: 24, zIndex: 1 } }, panel.emoji),
            React.createElement('div', {
              style: {
                fontFamily: FONT, fontSize: 17, color: '#ffffffCC', textAlign: 'center',
                lineHeight: 1.6, maxWidth: 280, zIndex: 1,
              }
            }, panel.text),
            React.createElement('div', {
              style: {
                marginTop: 20, fontFamily: FONT, fontSize: 11, color: '#ffffff44', zIndex: 1,
              }
            }, `Panel ${i + 1} of ${panelContents.length}`)
          )
        )
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          padding: '12px 20px 28px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', background: '#000000DD', backdropFilter: 'blur(10px)',
        }
      },
        React.createElement('div', {
          onClick: () => setCurrentPage(Math.max(0, currentPage - 1)),
          style: {
            padding: '8px 20px', borderRadius: 10, background: '#ffffff15',
            fontFamily: FONT, fontSize: 13, color: '#fff', cursor: 'pointer',
          }
        }, '← Prev'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 12, color: '#ffffff77' }
        }, `${currentPage + 1} / 8`),
        React.createElement('div', {
          onClick: () => setCurrentPage(Math.min(7, currentPage + 1)),
          style: {
            padding: '8px 20px', borderRadius: 10,
            background: `linear-gradient(135deg, ${theme.cta}, ${theme.primary})`,
            fontFamily: FONT, fontSize: 13, color: '#fff', cursor: 'pointer',
            fontWeight: 600,
          }
        }, 'Next →')
      )
    );
  };

  const VaultScreen = () => {
    const downloaded = COMICS_DATA.filter(c => downloadedComics.includes(c.id));
    const favorites = COMICS_DATA.filter(c => favComics.includes(c.id));
    const [tab, setTab] = useState('downloaded');

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      React.createElement(GlowOrb, { top: -60, left: 150, color: theme.glowCta, size: 200 }),

      React.createElement('div', {
        style: { padding: '54px 20px 20px' }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 4 }
        }, 'Saga Vault'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
        }, 'Your offline library & favorites')
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', padding: '0 20px', gap: 0, marginBottom: 20 }
      },
        ['downloaded', 'favorites'].map(t =>
          React.createElement('div', {
            key: t,
            onClick: () => setTab(t),
            style: {
              flex: 1, padding: '12px 0', textAlign: 'center',
              fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              color: tab === t ? theme.secondary : theme.textSecondary,
              borderBottom: `2px solid ${tab === t ? theme.secondary : theme.border}`,
              transition: 'all 0.3s ease',
              textTransform: 'capitalize',
            }
          }, t === 'downloaded' ? `📥 Downloaded (${downloaded.length})` : `❤️ Favorites (${favorites.length})`)
        )
      ),

      // Storage info
      tab === 'downloaded' && React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 16, borderRadius: 14,
          background: theme.bgCard, border: `1px solid ${theme.border}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
        },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
          }, 'Storage Used'),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.text, fontWeight: 600 }
          }, '284 MB / 2 GB')
        ),
        React.createElement(ProgressBar, { progress: 14, color: theme.cta, height: 6 })
      ),

      // List
      React.createElement('div', { style: { padding: '0 20px' } },
        (tab === 'downloaded' ? downloaded : favorites).length === 0
          ? React.createElement('div', {
              style: {
                textAlign: 'center', padding: '60px 20px',
              }
            },
              React.createElement('div', { style: { fontSize: 48, marginBottom: 16 } },
                tab === 'downloaded' ? '📥' : '❤️'),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 17, fontWeight: 600, color: theme.text, marginBottom: 8 }
              }, tab === 'downloaded' ? 'No Downloads Yet' : 'No Favorites Yet'),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
              }, 'Start exploring comics to build your collection!')
            )
          : (tab === 'downloaded' ? downloaded : favorites).map(comic =>
            React.createElement('div', {
              key: comic.id,
              onClick: () => { setSelectedComic(comic); switchScreen('detail'); },
              style: {
                display: 'flex', gap: 14, padding: 14, marginBottom: 12,
                borderRadius: 16, background: theme.bgCard, cursor: 'pointer',
                border: `1px solid ${theme.border}`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 60, height: 80, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(135deg, ${comic.color}, ${theme.bgTertiary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28,
                }
              }, comic.cover),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { fontFamily: FONT, fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 3 }
                }, comic.title),
                React.createElement('div', {
                  style: { fontFamily: FONT, fontSize: 12, color: theme.textSecondary, marginBottom: 8 }
                }, `${comic.chapters} chapters · ${comic.genre}`),
                React.createElement(ProgressBar, { progress: comic.progress })
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center' }
              },
                tab === 'downloaded'
                  ? React.createElement('div', {
                      onClick: (e) => { e.stopPropagation(); toggleDownload(comic.id); },
                      style: {
                        width: 32, height: 32, borderRadius: 8,
                        background: theme.bgTertiary, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }
                    }, React.createElement(Icon, { name: 'Trash2', size: 16, color: theme.cta }))
                  : React.createElement('div', {
                      onClick: (e) => { e.stopPropagation(); toggleFav(comic.id); },
                      style: {
                        width: 32, height: 32, borderRadius: 8,
                        background: theme.bgTertiary, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }
                    }, React.createElement(Icon, { name: 'Heart', size: 16, color: theme.cta }))
              )
            )
          )
      )
    );
  };

  const StatsScreen = () => {
    const weekData = [65, 42, 88, 55, 70, 95, 30];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...weekData);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 80 }
    },
      React.createElement(GlowOrb, { top: -40, left: -30, color: theme.glow, size: 200 }),
      React.createElement(GlowOrb, { top: 400, left: 250, color: theme.glowPrimary, size: 180 }),

      React.createElement('div', {
        style: { padding: '54px 20px 12px' }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 4 }
        }, 'Reader Metrics'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: theme.textSecondary }
        }, 'Your reading journey insights')
      ),

      // Stats overview
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          padding: '12px 20px 20px',
        }
      },
        [
          { label: 'Pages Read', value: '2,847', icon: '📄', color: theme.secondary },
          { label: 'Hours Spent', value: '68.5h', icon: '⏱️', color: theme.cta },
          { label: 'Series Started', value: '12', icon: '📚', color: theme.primary },
          { label: 'Streak Days', value: '7 🔥', icon: '📅', color: '#FFD700' },
        ].map(stat =>
          React.createElement('div', {
            key: stat.label,
            style: {
              padding: 16, borderRadius: 16, background: theme.bgCard,
              border: `1px solid ${theme.border}`, position: 'relative', overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: -10, right: -10, width: 50, height: 50,
                borderRadius: '50%', background: stat.color + '15',
              }
            }),
            React.createElement('div', { style: { fontSize: 24, marginBottom: 8 } }, stat.icon),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 4 }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 12, color: theme.textSecondary }
            }, stat.label)
          )
        )
      ),

      // Weekly chart
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 20, borderRadius: 16,
          background: theme.bgCard, border: `1px solid ${theme.border}`,
        }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16 }
        }, 'This Week'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, marginBottom: 8 }
        },
          weekData.map((val, i) =>
            React.createElement('div', {
              key: i,
              style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }
            },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 10, color: theme.textSecondary }
              }, val),
              React.createElement('div', {
                style: {
                  width: '100%', height: (val / maxVal) * 90,
                  borderRadius: 6,
                  background: i === 6
                    ? `linear-gradient(180deg, ${theme.secondary}, ${theme.secondary}55)`
                    : `linear-gradient(180deg, ${theme.primary}88, ${theme.primary}33)`,
                  transition: 'height 0.5s ease',
                  boxShadow: i === 6 ? `0 0 8px ${theme.secondary}44` : 'none',
                }
              })
            )
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 8 }
        },
          days.map((day, i) =>
            React.createElement('div', {
              key: day,
              style: {
                flex: 1, textAlign: 'center', fontFamily: FONT, fontSize: 10,
                color: i === 6 ? theme.secondary : theme.textTertiary, fontWeight: 600,
              }
            }, day)
          )
        )
      ),

      // Genre breakdown
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 20, borderRadius: 16,
          background: theme.bgCard, border: `1px solid ${theme.border}`,
        }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 16 }
        }, 'Genre Preferences'),
        [
          { genre: 'Sci-Fi', pct: 35, color: theme.secondary },
          { genre: 'Romance', pct: 25, color: '#FF69B4' },
          { genre: 'Action', pct: 20, color: theme.cta },
          { genre: 'Horror', pct: 12, color: theme.primary },
          { genre: 'Comedy', pct: 8, color: '#FFD700' },
        ].map(g =>
          React.createElement('div', {
            key: g.genre,
            style: { marginBottom: 14 }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
            },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 13, color: theme.text, fontWeight: 500 }
              }, g.genre),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 13, color: g.color, fontWeight: 600 }
              }, `${g.pct}%`)
            ),
            React.createElement(ProgressBar, { progress: g.pct, color: g.color, height: 6 })
          )
        )
      ),

      // Achievements section
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', {
          style: {
            fontFamily: FONT, fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }
        },
          React.createElement('span', null, '🏆 Achievements'),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 13, color: theme.secondary, fontWeight: 600, cursor: 'pointer' }
          }, 'View All')
        ),
        ACHIEVEMENTS.slice(0, 4).map(ach =>
          React.createElement('div', {
            key: ach.id,
            style: {
              display: 'flex', gap: 14, padding: 14, marginBottom: 10,
              borderRadius: 14, background: theme.bgCard, border: `1px solid ${theme.border}`,
              alignItems: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: ach.progress === 100 ? theme.secondary + '22' : theme.bgTertiary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
                boxShadow: ach.progress === 100 ? `0 0 12px ${theme.secondary}33` : 'none',
              }
            }, ach.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 2 }
              }, ach.name),
              React.createElement('div', {
                style: { fontFamily: FONT, fontSize: 11, color: theme.textSecondary, marginBottom: 6 }
              }, ach.desc),
              React.createElement(ProgressBar, {
                progress: ach.progress,
                color: ach.progress === 100 ? theme.secondary : theme.primary,
                height: 4,
              })
            ),
            React.createElement('div', {
              style: {
                fontFamily: FONT, fontSize: 11, fontWeight: 700,
                color: ach.progress === 100 ? theme.secondary : theme.textTertiary,
                padding: '4px 8px', borderRadius: 8,
                background: ach.progress === 100 ? theme.secondary + '15' : 'transparent',
              }
            }, ach.progress === 100 ? '✓' : `${ach.progress}%`)
          )
        )
      ),

      // Daily Quests