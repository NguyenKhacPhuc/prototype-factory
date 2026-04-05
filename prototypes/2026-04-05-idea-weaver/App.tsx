const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      primary: '#18181B',
      secondary: '#3F3F46',
      cta: '#EC4899',
      bg: '#FAFAFA',
      card: '#FFFFFF',
      cardBorder: '#E4E4E7',
      textPrimary: '#18181B',
      textSecondary: '#71717A',
      textMuted: '#A1A1AA',
      navBg: '#FFFFFF',
      navBorder: '#E4E4E7',
      inputBg: '#F4F4F5',
      tagBg: '#F9F5FF',
      tagText: '#EC4899',
      seedBg: '#FFF1F2',
      threadBg: '#F0FDF4',
      tapestryBg: '#EFF6FF',
      shimmer: 'rgba(236,72,153,0.08)',
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#D4D4D8',
      cta: '#EC4899',
      bg: '#09090B',
      card: '#18181B',
      cardBorder: '#27272A',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
      navBg: '#18181B',
      navBorder: '#27272A',
      inputBg: '#27272A',
      tagBg: '#27272A',
      tagText: '#F472B6',
      seedBg: '#1C1017',
      threadBg: '#0C1A13',
      tapestryBg: '#0C1425',
      shimmer: 'rgba(236,72,153,0.15)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const icons = window.lucide || {};
  const {
    Home, Compass, PlusCircle, Layers, User, Sparkles, Send, Heart, MessageCircle,
    Palette, Zap, Clock, TrendingUp, ChevronRight, Sun, Moon, Star, Feather,
    Music, PenTool, BookOpen, RefreshCw, ArrowRight, Eye, Users, Award, Flame
  } = icons;

  // -- Animations & Fonts --
  const styleTag = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes weave {
      0% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(2deg) scale(1.02); }
      50% { transform: rotate(0deg) scale(1); }
      75% { transform: rotate(-2deg) scale(1.02); }
      100% { transform: rotate(0deg) scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `);

  // -- Shared styles --
  const heading = (size, weight = 700) => ({
    fontFamily: '"Fredoka", sans-serif',
    fontSize: size,
    fontWeight: weight,
    color: t.textPrimary,
    margin: 0,
    lineHeight: 1.2,
  });

  const body = (size = 14, weight = 400) => ({
    fontFamily: '"Nunito", sans-serif',
    fontSize: size,
    fontWeight: weight,
    color: t.textSecondary,
    margin: 0,
    lineHeight: 1.5,
  });

  const card = (extra = {}) => ({
    background: t.card,
    borderRadius: 16,
    border: `1px solid ${t.cardBorder}`,
    padding: 16,
    transition: 'all 200ms ease',
    ...extra,
  });

  const tag = (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    borderRadius: 20,
    background: bg || t.tagBg,
    color: color || t.tagText,
    fontFamily: '"Nunito", sans-serif',
    fontSize: 12,
    fontWeight: 600,
  });

  // ==================== HOME SCREEN ====================
  function HomeScreen() {
    const [likedSeeds, setLikedSeeds] = useState({});

    const dailyLoom = {
      title: 'The Sound of Growing',
      description: 'What does growth sound like when nobody is watching?',
      seeds: 42,
      weaves: 187,
      timeLeft: '14h 23m',
    };

    const trendingSeeds = [
      { id: 1, word: 'Velvet Thunder', author: 'luna_moth', likes: 34 },
      { id: 2, word: 'Forgotten Sunrise', author: 'pixel_rain', likes: 28 },
      { id: 3, word: 'Quiet Electricity', author: 'dream_weaver', likes: 21 },
    ];

    const recentThreads = [
      { id: 1, prompt: 'Write a six-word memoir for a cloud', seed: 'Velvet Thunder', responses: 12, icon: Feather },
      { id: 2, prompt: 'Sketch a door that leads to a feeling', seed: 'Forgotten Sunrise', responses: 8, icon: PenTool },
      { id: 3, prompt: 'Compose a rhythm using only vowel sounds', seed: 'Quiet Electricity', responses: 15, icon: Music },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('h1', { style: heading(28) }, 'Idea Weaver'),
          React.createElement('p', { style: { ...body(13), marginTop: 2 } }, 'Your creative loom awaits')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.cardBorder}`,
            background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 200ms ease',
          }
        },
          React.createElement(isDark ? Sun : Moon, { size: 20, color: t.textPrimary })
        )
      ),

      // Daily Loom Challenge
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, #EC4899, #8B5CF6)`,
          borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden',
          animation: 'slideUp 0.5s ease',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 3s ease infinite',
          }
        }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
          React.createElement(Flame, { size: 16, color: '#FFF' }),
          React.createElement('span', {
            style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: 1, textTransform: 'uppercase' }
          }, 'Daily Loom Challenge')
        ),
        React.createElement('h2', {
          style: { fontFamily: '"Fredoka", sans-serif', fontSize: 22, fontWeight: 700, color: '#FFF', margin: '0 0 6px' }
        }, dailyLoom.title),
        React.createElement('p', {
          style: { fontFamily: '"Nunito", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.85)', margin: '0 0 14px', lineHeight: 1.4 }
        }, dailyLoom.description),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', gap: 14 } },
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Sparkles, { size: 14 }), `${dailyLoom.seeds} seeds`
            ),
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Layers, { size: 14 }), `${dailyLoom.weaves} weaves`
            ),
            React.createElement('span', { style: { fontFamily: '"Nunito", sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Clock, { size: 14 }), dailyLoom.timeLeft
            )
          ),
          React.createElement('button', {
            onClick: () => setActiveScreen('create'),
            style: {
              padding: '8px 16px', borderRadius: 12, border: 'none',
              background: '#FFF', color: '#EC4899', fontFamily: '"Fredoka", sans-serif',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }
          },
            React.createElement('span', null, 'Join'),
            React.createElement(ArrowRight, { size: 14 })
          )
        )
      ),

      // Trending Seeds
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('h3', { style: heading(18, 600) }, 'Trending Seeds'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', color: t.cta, fontFamily: '"Nunito", sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }
          },
            React.createElement('span', null, 'See all'),
            React.createElement(ChevronRight, { size: 14 })
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...trendingSeeds.map((seed, i) =>
            React.createElement('div', {
              key: seed.id,
              style: {
                ...card({ minWidth: 140, padding: 14, cursor: 'pointer', animation: `slideUp ${0.4 + i * 0.1}s ease` }),
                background: t.seedBg,
              }
            },
              React.createElement('p', { style: { ...heading(15, 600), marginBottom: 6 } }, seed.word),
              React.createElement('p', { style: { ...body(12), marginBottom: 10 } }, `by ${seed.author}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement('button', {
                  onClick: (e) => { e.stopPropagation(); setLikedSeeds(prev => ({ ...prev, [seed.id]: !prev[seed.id] })); },
                  style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }
                },
                  React.createElement(Heart, {
                    size: 16,
                    color: likedSeeds[seed.id] ? '#EC4899' : t.textMuted,
                    fill: likedSeeds[seed.id] ? '#EC4899' : 'none',
                    style: { transition: 'all 200ms ease' },
                  })
                ),
                React.createElement('span', { style: { ...body(12), color: t.textMuted } },
                  seed.likes + (likedSeeds[seed.id] ? 1 : 0)
                )
              )
            )
          )
        )
      ),

      // Active Threads
      React.createElement('div', null,
        React.createElement('h3', { style: { ...heading(18, 600), marginBottom: 12 } }, 'Active Threads'),
        ...recentThreads.map((thread, i) =>
          React.createElement('div', {
            key: thread.id,
            onClick: () => setActiveScreen('explore'),
            style: {
              ...card({ marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, animation: `fadeIn ${0.4 + i * 0.1}s ease` }),
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, background: t.threadBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(thread.icon, { size: 20, color: t.cta })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { ...body(14, 600), color: t.textPrimary, marginBottom: 2 } }, thread.prompt),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: tag() }, thread.seed),
                React.createElement('span', { style: { ...body(12), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(MessageCircle, { size: 12 }), `${thread.responses}`
                )
              )
            ),
            React.createElement(ChevronRight, { size: 18, color: t.textMuted })
          )
        )
      )
    );
  }

  // ==================== EXPLORE SCREEN ====================
  function ExploreScreen() {
    const [activeTab, setActiveTab] = useState('threads');
    const [selectedThread, setSelectedThread] = useState(null);

    const tabs = ['threads', 'seeds', 'tapestries'];

    const threads = [
      { id: 1, prompt: 'Write a lullaby for an anxious satellite', seed: 'Cosmic Hum', icon: Music, responses: 23, category: 'Writing' },
      { id: 2, prompt: 'Draw the shadow of a word you can\'t pronounce', seed: 'Tongue-Tied', icon: PenTool, responses: 17, category: 'Visual' },
      { id: 3, prompt: 'Describe the taste of a color you\'ve never seen', seed: 'Synesthesia', icon: Palette, responses: 31, category: 'Writing' },
      { id: 4, prompt: 'Build a playlist for a rainy day on Mars', seed: 'Red Dust', icon: Music, responses: 14, category: 'Audio' },
      { id: 5, prompt: 'Sketch a map of your last dream', seed: 'Dreamscape', icon: PenTool, responses: 20, category: 'Visual' },
    ];

    const seeds = [
      { id: 1, word: 'Velvet Thunder', author: 'luna_moth', likes: 34, threads: 5 },
      { id: 2, word: 'Glass Memory', author: 'echo_spark', likes: 28, threads: 3 },
      { id: 3, word: 'Whisper Engine', author: 'pixel_rain', likes: 45, threads: 7 },
      { id: 4, word: 'Liquid Clock', author: 'time_fold', likes: 19, threads: 2 },
      { id: 5, word: 'Neon Moss', author: 'dream_weaver', likes: 52, threads: 6 },
      { id: 6, word: 'Hollow Sun', author: 'soft_static', likes: 37, threads: 4 },
    ];

    const tapestries = [
      { id: 1, title: 'The Unfinished Symphony of Small Things', contributors: 14, weaves: 47, colors: ['#EC4899', '#8B5CF6', '#3B82F6'] },
      { id: 2, title: 'Echoes of Unspoken Weather', contributors: 9, weaves: 32, colors: ['#10B981', '#F59E0B', '#EC4899'] },
      { id: 3, title: 'A Garden of Mechanical Dreams', contributors: 21, weaves: 63, colors: ['#6366F1', '#EC4899', '#14B8A6'] },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', { style: { ...heading(28), marginBottom: 4 } }, 'Explore'),
      React.createElement('p', { style: { ...body(14), marginBottom: 16 } }, 'Discover creative threads and tapestries'),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, background: t.inputBg, borderRadius: 12, padding: 4 }
      },
        ...tabs.map(tb =>
          React.createElement('button', {
            key: tb,
            onClick: () => setActiveTab(tb),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: activeTab === tb ? t.card : 'transparent',
              color: activeTab === tb ? t.textPrimary : t.textMuted,
              fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 200ms ease',
              boxShadow: activeTab === tb ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              textTransform: 'capitalize',
            }
          }, tb)
        )
      ),

      // Threads Tab
      activeTab === 'threads' && React.createElement('div', null,
        ...threads.map((thread, i) =>
          React.createElement('div', {
            key: thread.id,
            style: {
              ...card({ marginBottom: 10, cursor: 'pointer', animation: `slideUp ${0.3 + i * 0.08}s ease` }),
            },
            onClick: () => setSelectedThread(selectedThread === thread.id ? null : thread.id),
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12, background: t.threadBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                React.createElement(thread.icon, { size: 20, color: '#10B981' })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { ...body(15, 600), color: t.textPrimary, marginBottom: 6 } }, thread.prompt),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' } },
                  React.createElement('span', { style: tag() }, thread.seed),
                  React.createElement('span', { style: tag(t.threadBg, '#10B981') }, thread.category),
                  React.createElement('span', { style: { ...body(12), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(Users, { size: 12 }), `${thread.responses} weaves`
                  )
                )
              )
            ),
            selectedThread === thread.id && React.createElement('div', {
              style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.cardBorder}`, animation: 'fadeIn 0.3s ease' }
            },
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); setActiveScreen('create'); },
                style: {
                  width: '100%', padding: '12px', borderRadius: 12, border: 'none',
                  background: '#EC4899', color: '#FFF', fontFamily: '"Fredoka", sans-serif',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                }
              },
                React.createElement(Sparkles, { size: 16 }),
                React.createElement('span', null, 'Create a Weave')
              )
            )
          )
        )
      ),

      // Seeds Tab
      activeTab === 'seeds' && React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
      },
        ...seeds.map((seed, i) =>
          React.createElement('div', {
            key: seed.id,
            style: {
              ...card({ padding: 14, cursor: 'pointer', animation: `fadeIn ${0.3 + i * 0.08}s ease` }),
              background: t.seedBg,
            }
          },
            React.createElement('p', { style: { ...heading(15, 600), marginBottom: 4 } }, seed.word),
            React.createElement('p', { style: { ...body(12), marginBottom: 8 } }, `by ${seed.author}`),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', { style: { ...body(11), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Heart, { size: 12 }), seed.likes
              ),
              React.createElement('span', { style: { ...body(11), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Zap, { size: 12 }), `${seed.threads} threads`
              )
            )
          )
        )
      ),

      // Tapestries Tab
      activeTab === 'tapestries' && React.createElement('div', null,
        ...tapestries.map((tapestry, i) =>
          React.createElement('div', {
            key: tapestry.id,
            style: {
              ...card({ marginBottom: 12, cursor: 'pointer', overflow: 'hidden', padding: 0, animation: `slideUp ${0.3 + i * 0.1}s ease` }),
            },
            onClick: () => setActiveScreen('tapestry'),
          },
            // Tapestry visual
            React.createElement('div', {
              style: {
                height: 80, position: 'relative', overflow: 'hidden',
                background: `linear-gradient(135deg, ${tapestry.colors[0]}20, ${tapestry.colors[1]}20, ${tapestry.colors[2]}20)`,
              }
            },
              ...tapestry.colors.map((color, ci) =>
                React.createElement('div', {
                  key: ci,
                  style: {
                    position: 'absolute',
                    width: 60 + ci * 20, height: 60 + ci * 20,
                    borderRadius: '50%',
                    background: `${color}30`,
                    border: `2px solid ${color}50`,
                    left: 40 + ci * 80, top: -10 + (ci % 2) * 20,
                    animation: `float ${3 + ci * 0.5}s ease infinite`,
                  }
                })
              )
            ),
            React.createElement('div', { style: { padding: 16 } },
              React.createElement('p', { style: { ...heading(16, 600), marginBottom: 8 } }, tapestry.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { style: { ...body(12), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Users, { size: 13 }), `${tapestry.contributors} creators`
                ),
                React.createElement('span', { style: { ...body(12), color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Layers, { size: 13 }), `${tapestry.weaves} weaves`
                ),
                React.createElement('div', { style: { display: 'flex', marginLeft: 'auto' } },
                  ...tapestry.colors.map((color, ci) =>
                    React.createElement('div', {
                      key: ci,
                      style: {
                        width: 16, height: 16, borderRadius: '50%', background: color,
                        border: `2px solid ${t.card}`, marginLeft: ci > 0 ? -4 : 0,
                      }
                    })
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ==================== CREATE SCREEN ====================
  function CreateScreen() {
    const [mode, setMode] = useState('seed');
    const [seedText, setSeedText] = useState('');
    const [weaveText, setWeaveText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [generatedThreads, setGeneratedThreads] = useState(null);

    const sampleThreads = [
      { prompt: 'Write a haiku about a forgotten color', type: 'Writing', icon: Feather },
      { prompt: 'Sketch a machine that hums regret', type: 'Visual', icon: PenTool },
      { prompt: 'Compose a 4-beat rhythm from kitchen sounds', type: 'Audio', icon: Music },
      { prompt: 'Describe this seed as if it were weather', type: 'Writing', icon: BookOpen },
    ];

    const handleSubmitSeed = () => {
      if (!seedText.trim()) return;
      setSubmitted(true);
      setTimeout(() => setGeneratedThreads(sampleThreads), 800);
    };

    return React.createElement('div', {
      style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', { style: { ...heading(28), marginBottom: 4 } }, 'Create'),
      React.createElement('p', { style: { ...body(14), marginBottom: 20 } }, 'Plant a seed or weave a thread'),

      // Mode Toggle
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginBottom: 20, background: t.inputBg, borderRadius: 12, padding: 4 }
      },
        ['seed', 'weave'].map(m =>
          React.createElement('button', {
            key: m,
            onClick: () => { setMode(m); setSubmitted(false); setGeneratedThreads(null); setSeedText(''); },
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: mode === m ? t.card : 'transparent',
              color: mode === m ? t.textPrimary : t.textMuted,
              fontFamily: '"Fredoka", sans-serif', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 200ms ease',
              boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              textTransform: 'capitalize', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(m === 'seed' ? Sparkles : Layers, { size: 16 }),
            m === 'seed' ? 'Plant Seed' : 'Create Weave'
          )
        )
      ),

      // Seed Mode
      mode === 'seed' && !generatedThreads && React.createElement('div', { style: { animation: 'slideUp 0.4s ease' } },
        React.createElement('div', {
          style: {
            ...card({ padding: 20, marginBottom: 16 }),
            background: t.seedBg,
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, #EC4899, #8B5CF6)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
              animation: submitted ? 'pulse 1s ease infinite' : 'none',
            }
          },
            React.createElement(Sparkles, { size: 28, color: '#FFF' })
          ),
          React.createElement('h3', { style: { ...heading(18, 600), marginBottom: 6 } }, 'Plant a Creative Seed'),
          React.createElement('p', { style: { ...body(13), maxWidth: 260, margin: '0 auto' } },
            'Share a word, phrase, or abstract idea. The AI will grow it into creative threads for the community.'
          )
        ),

        React.createElement('div', { style: { position: 'relative', marginBottom: 12 } },
          React.createElement('textarea', {
            value: seedText,
            onChange: (e) => setSeedText(e.target.value),
            placeholder: 'e.g. "Velvet Thunder" or "the sound of growing"',
            maxLength: 100,
            style: {
              width: '100%', minHeight: 100, padding: 16, borderRadius: 16,
              border: `2px solid ${seedText ? '#EC4899' : t.cardBorder}`,
              background: t.card, color: t.textPrimary, fontFamily: '"Nunito", sans-serif',
              fontSize: 16, resize: 'none', outline: 'none', transition: 'border 200ms ease',
              boxSizing: 'border-box',
            }
          }),
          React.createElement('span', {
            style: { position: 'absolute', bottom: 10, right: 14, ...body(11), color: t.textMuted }
          }, `${seedText.length}/100`)
        ),

        React.createElement('button', {
          onClick: handleSubmitSeed,
          disabled: !seedText.trim(),
          style: {
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: seedText.trim() ? '#EC4899' : t.inputBg,
            color: seedText.trim() ? '#FFF' : t.textMuted,
            fontFamily: '"Fredoka", sans-serif', fontSize: 16, fontWeight: 600,
            cursor: seedText.trim() ? 'pointer' : 'default', transition: 'all 200ms ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }
        },
          React.createElement(Send, { size: 18 }),
          React.createElement('span', null, 'Plant Seed')
        ),

        // Inspiration
        React.createElement('div', { style: { marginTop: 20 } },
          React.createElement('p', { style: { ...body(12, 600), color: t.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Need inspiration?'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            ['Liquid Starlight', 'Forgotten Echo', 'Warm Static', 'Paper Moon', 'Silent Thunder'].map(s =>
              React.createElement('button', {
                key: s,
                onClick: () => setSeedText(s),
                style: {
                  ...tag(t.tagBg, t.tagText),
                  border: 'none', cursor: 'pointer', padding: '8px 14px', fontSize: 13,
                  transition: 'all 200ms ease',
                }
              }, s)
            )
          )
        )
      ),

      // Generated Threads
      mode === 'seed' && submitted && !generatedThreads && React.createElement('div', {
        style: { textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.3s ease' }
      },
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: '50%', margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${t.shimmer}, #EC489920)`,
            backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement(RefreshCw, { size: 22, color: '#EC4899', style: { animation: 'weave 1s linear infinite' } })
        ),
        React.createElement('p', { style: { ...body(14, 600), color: t.textPrimary } }, 'Growing your seed...'),
        React.createElement('p', { style: body(13) }, 'The AI is weaving creative threads')
      ),

      mode === 'seed' && generatedThreads && React.createElement('div', { style: { animation: 'slideUp 0.4s ease' } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }
        },
          React.createElement('div', {
            style: { width: 8, height: 8, borderRadius: '50%', background: '#10B981' }
          }),
          React.createElement('p', { style: { ...body(14, 600), color: t.textPrimary } },
            `Threads grown from "${seedText}"`
          )
        ),
        ...generatedThreads.map((thread, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setMode('weave'),
            style: {
              ...card({ marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, animation: `slideUp ${0.3 + i * 0.1}s ease` }),
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 12, background: t.threadBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(thread.icon, { size: 20, color: '#10B981' })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { ...body(14, 600), color: t.textPrimary, marginBottom: 2 } }, thread.prompt),
              React.createElement('span', { style: tag(t.threadBg, '#10B981') }, thread.type)
            ),
            React.createElement(ArrowRight, { size: 16, color: t.textMuted })
          )
        )
      ),

      // Weave Mode
      mode === 'weave' && React.createElement('div', { style: { animation: 'slideUp 0.4s ease' } },
        React.createElement('div', {
          style: { ...card({ padding: 14, marginBottom: 16, background: t.threadBg }) }
        },
          React.createElement('p', { style: { ...body(12, 600), color: '#10B981', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Responding to thread'),
          React.createElement('p', { style: { ...body(15, 600), color: t.textPrimary } }, 'Write a haiku about a forgotten color')
        ),

        React.createElement('textarea', {
          value: weaveText,
          onChange: (e) => setWeaveText(e.target.value),
          placeholder: 'Write your weave here... A short text, poem, description, or story fragment.',
          style: {
            width: '100%', minHeight: 160, padding: 16, borderRadius: 16,
            border: `2px solid ${weaveText ? '#EC4899' : t.cardBorder}`,
            background: t.card, color: t.textPrimary, fontFamily: '"Nunito", sans-serif',
            fontSize: 15, resize: 'none', outline: 'none', transition: 'border 200ms ease',
            lineHeight: 1.6, boxSizing: 'border-box',
          }
        }),

        React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 12 } },
          React.createElement('button', {
            style: {
              flex: 1, padding: '14px', borderRadius: 14, border: `2px solid ${t.cardBorder}`,
              background: t.card, color: t.textPrimary, fontFamily: '"Fredoka", sans-serif',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(PenTool, { size: 16 }),
            React.createElement('span', null, 'Sketch')
          ),
          React.createElement('button', {
            disabled: !weaveText.trim(),
            style: {
              flex: 2, padding: '14px', borderRadius: 14, border: 'none',
              background: weaveText.trim() ? '#EC4899' : t.inputBg,
              color: weaveText.trim() ? '#FFF' : t.textMuted,
              fontFamily: '"Fredoka", sans-serif', fontSize: 15, fontWeight: 600,
              cursor: weaveText.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(Send, { size: 16 }),
            React.createElement('span', null, 'Submit Weave')
          )
        )
      )
    );
  }

  // ==================== TAPESTRY SCREEN ====================
  function TapestryScreen() {
    const [selectedWeave, setSelectedWeave] = useState(null);

    const tapestry = {
      title: 'The Unfinished Symphony of Small Things',
      description: 'A living artwork woven from 47 creative fragments by 14 contributors, exploring themes of forgotten objects, quiet moments, and invisible connections.',
      contributors: 14,
      weaves: 47,
      evolving: true,
    };

    const weaves = [
      { id: 1, author: 'luna_moth', text: 'Cerulean whispers / fading behind the sunset / no name left to hold', type: 'Haiku', thread: 'Write a haiku about a forgotten color', color: '#EC4899' },
      { id: 2, author: 'pixel_rain', text: 'The old clock on the mantle stopped at 3:47. Not broken\u2014just tired of counting moments nobody noticed.', type: 'Micro-story', thread: 'Tell the story of an object that decided to stop', color: '#8B5CF6' },
      { id: 3, author: 'dream_weaver', text: 'A soft mechanical purr, like a cat made of origami, folding and unfolding.', type: 'Sound description', thread: 'Describe a sound that doesn\'t exist yet', color: '#3B82F6' },
      { id: 4, author: 'echo_spark', text: 'Between the cracks in the sidewalk, tiny civilizations bloom and fade with each rainstorm.', type: 'Fragment', thread: 'Write about something invisible', color: '#10B981' },
      { id: 5, author: 'soft_static', text: 'She collected silences the way others collected stamps\u2014carefully, reverently, organized by weight.', type: 'Micro-story', thread: 'Describe a collection nobody else would want', color: '#F59E0B' },
    ];

    const connections = [
      { from: 'luna_moth', to: 'echo_spark', reason: 'Shared theme: invisible things' },
      { from: 'pixel_rain', to: 'soft_static', reason: 'Both explore quiet observation' },
      { from: 'dream_weaver', to: 'luna_moth', reason: 'Sensory abstraction' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' }
    },
      React.createElement('h1', { style: { ...heading(24), marginBottom: 4 } }, tapestry.title),
      React.createElement('p', { style: { ...body(13), marginBottom: 16 } }, tapestry.description),

      // Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 20 }
      },
        [
          { label: 'Contributors', value: tapestry.contributors, icon: Users, color: '#EC4899' },
          { label: 'Weaves', value: tapestry.weaves, icon: Layers, color: '#8B5CF6' },
          { label: 'Status', value: 'Evolving', icon: RefreshCw, color: '#10B981' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, ...card({ padding: 12, textAlign: 'center' }),
              animation: `fadeIn ${0.3 + i * 0.1}s ease`,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
                background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(stat.icon, { size: 18, color: stat.color })
            ),
            React.createElement('p', { style: { ...heading(16, 700), marginBottom: 2 } }, stat.value),
            React.createElement('p', { style: body(11) }, stat.label)
          )
        )
      ),

      // Tapestry Visualization
      React.createElement('div', {
        style: {
          ...card({ padding: 0, overflow: 'hidden', marginBottom: 20, height: 100, position: 'relative' }),
          background: `linear-gradient(135deg, #EC489910, #8B5CF610, #3B82F610, #10B98110)`,
        }
      },
        ...weaves.map((w, i) =>
          React.createElement('div', {
            key: i,
            style: {
              position: 'absolute',
              width: 30 + Math.random() * 40, height: 30 + Math.random() * 40,
              borderRadius: '50%', background: `${w.color}25`, border: `2px solid ${w.color}40`,
              left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 20}%`,
              animation: `float ${2.5 + i * 0.3}s ease infinite`,
              cursor: 'pointer',
            },
            onClick: () => setSelectedWeave(w.id),
          })
        ),
        // Connection lines (decorative)
        React.createElement('div', {
          style: {
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${t.cardBorder}30 10px, ${t.cardBorder}30 11px)`,
            opacity: 0.3,
          }
        })
      ),

      // AI Connections
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('h3', { style: { ...heading(16, 600), marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(Zap, { size: 16, color: '#EC4899' }),
          'AI-Discovered Connections'
        ),
        ...connections.map((conn, i) =>
          React.createElement('div', {
            key: i,
            style: {
              ...card({ padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, animation: `fadeIn ${0.4 + i * 0.1}s ease` }),
              background: t.tapestryBg,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flex: 1 } },
              React.createElement('span', { style: { ...body(12, 700), color: t.cta } }, conn.from),
              React.createElement(ArrowRight, { size: 12, color: t.textMuted }),
              React.createElement('span', { style: { ...body(12, 700), color: '#8B5CF6' } }, conn.to)
            ),
            React.createElement('span', { style: body(11) }, conn.reason)
          )
        )
      ),

      // Weaves list
      React.createElement('h3', { style: { ...heading(16, 600), marginBottom: 10 } }, 'Woven Fragments'),
      ...weaves.map((weave, i) =>
        React.createElement('div', {
          key: weave.id,
          onClick: () => setSelectedWeave(selectedWeave === weave.id ? null : weave.id),
          style: {
            ...card({ marginBottom: 10, cursor: 'pointer', animation: `slideUp ${0.3 + i * 0.08}s ease` }),
            borderLeft: `3px solid ${weave.color}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('div', {
                style: { width: 28, height: 28, borderRadius: '50%', background: `${weave.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
              },
                React.createElement(User, { size: 14, color: weave.color })
              ),
              React.createElement('span', { style: { ...body(13, 600), color: t.textPrimary } }, weave.author)
            ),
            React.createElement('span', { style: tag(`${weave.color}15`, weave.color) }, weave.type)
          ),
          React.createElement('p', {
            style: { ...body(14), color: t.textPrimary, fontStyle: 'italic', lineHeight: 1.6 }
          }, `"${weave.text}"`),
          selectedWeave === weave.id && React.createElement('div', {
            style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.cardBorder}`, animation: 'fadeIn 0.3s ease' }
          },
            React.createElement('p', { style: { ...body(11), color: t.textMuted, marginBottom: 8 } },
              `Thread: ${weave.thread}`
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: {
                  padding: '8px 14px', borderRadius: 10, border: 'none',
                  background: `${weave.color}15`, color: weave.color,
                  fontFamily: '"Nunito", sans-serif', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                React.createElement(Heart, { size: 14 }),
                React.createElement('span', null, 'Appreciate')
              ),
              React.createElement('button', {
                style: {
                  padding: '8px 14px', borderRadius: 10, border: 'none',
                  background: t.inputBg, color: t.textSecondary,
                  fontFamily: '"Nunito", sans-serif', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                React.createElement(Sparkles, { size: 14 }),
                React.createElement('span', null, 'Weave from this')
              )
            )
          )
        )
      )
    );
  }

  // ==================== PROFILE SCREEN ====================
  function ProfileScreen() {
    const stats = [
      { label: 'Seeds Planted', value: 23, icon: Sparkles, color: '#EC4899' },
      { label: 'Weaves Created', value: 47, icon: Layers, color: '#8B5CF6' },
      { label: 'Tapestries In', value: 8, icon: Eye, color: '#3B82F6' },
      { label: 'Streak', value: '12 days', icon: Flame, color: '#F59E0B' },
    ];

    const achievements = [
      { title: 'First Seed', description: 'Planted your first creative seed', icon: Sparkles, color: '#EC4899', unlocked: true },
      { title: 'Weave Master', description: 'Created 25+ weaves', icon: Award, color: '#8B5CF6', unlocked: true },
      { title: 'Tapestry Contributor', description: 'Part of 5 tapestries', icon: Layers, color: '#3B82F6', unlocked: true },
      { title: 'Daily Devotee', description: '30-day loom streak', icon: Flame, color: '#F59E0B', unlocked: false },
    ];

    const recentWeaves = [
      { text: 'Cerulean whispers / fading behind the sunset / no name left to hold', thread: 'Write a haiku about a forgotten color', likes: 12 },
      { text: 'The old radio plays songs from stations that no longer exist.', thread: 'Describe something that remembers', likes: 8 },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 16px', animation: 'fadeIn 0.4s ease' }
    },
      // Profile Header
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }
      },
        React.createElement('div', {
          style: {
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
          }
        },
          React.createElement(User, { size: 28, color: '#FFF' })
        ),
        React.createElement('div', null,
          React.createElement('h2', { style: heading(22) }, 'luna_moth'),
          React.createElement('p', { style: body(13) }, 'Planting words in digital soil since 2026'),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 4 } },
            React.createElement('span', { style: tag() }, 'Writer'),
            React.createElement('span', { style: tag(t.threadBg, '#10B981') }, 'Dreamer')
          )
        )
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              ...card({ padding: 14, animation: `slideUp ${0.3 + i * 0.08}s ease` }),
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 8, background: `${stat.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              },
                React.createElement(stat.icon, { size: 16, color: stat.color })
              ),
              React.createElement('span', { style: body(12) }, stat.label)
            ),
            React.createElement('p', { style: heading(22, 700) }, stat.value)
          )
        )
      ),

      // Achievements
      React.createElement('h3', { style: { ...heading(18, 600), marginBottom: 12 } }, 'Achievements'),
      React.createElement('div', {
        style: { display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }
      },
        ...achievements.map((ach, i) =>
          React.createElement('div', {
            key: i,
            style: {
              ...card({
                minWidth: 120, padding: 14, textAlign: 'center',
                animation: `fadeIn ${0.3 + i * 0.1}s ease`,
                opacity: ach.unlocked ? 1 : 0.5,
              }),
            }
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14, margin: '0 auto 8px',
                background: ach.unlocked ? `${ach.color}15` : t.inputBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement(ach.icon, { size: 20, color: ach.unlocked ? ach.color : t.textMuted })
            ),
            React.createElement('p', { style: { ...body(13, 600), color: t.textPrimary, marginBottom: 2 } }, ach.title),
            React.createElement('p', { style: body(11) }, ach.description)
          )
        )
      ),

      // Recent Weaves
      React.createElement('h3', { style: { ...heading(18, 600), marginBottom: 12 } }, 'Your Recent Weaves'),
      ...recentWeaves.map((weave, i) =>
        React.createElement('div', {
          key: i,
          style: {
            ...card({ marginBottom: 10, animation: `slideUp ${0.4 + i * 0.1}s ease` }),
            borderLeft: '3px solid #EC4899',
          }
        },
          React.createElement('p', {
            style: { ...body(14), color: t.textPrimary, fontStyle: 'italic', marginBottom: 8, lineHeight: 1.6 }
          }, `"${weave.text}"`),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: body(11) }, weave.thread),
            React.createElement('span', { style: { ...body(12), color: t.cta, display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Heart, { size: 14, fill: '#EC4899' }), weave.likes
            )
          )
        )
      ),

      // Theme toggle in profile
      React.createElement('div', {
        style: { ...card({ marginTop: 10 }), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(isDark ? Moon : Sun, { size: 18, color: t.textPrimary }),
          React.createElement('span', { style: { ...body(14, 600), color: t.textPrimary } }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52, height: 28, borderRadius: 14, border: 'none',
            background: isDark ? '#EC4899' : t.inputBg, cursor: 'pointer',
            position: 'relative', transition: 'all 200ms ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 22, height: 22, borderRadius: '50%', background: '#FFF',
              position: 'absolute', top: 3,
              left: isDark ? 27 : 3, transition: 'left 200ms ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }
          })
        )
      )
    );
  }

  // ==================== NAV & LAYOUT ====================
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    create: CreateScreen,
    tapestry: TapestryScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'create', label: 'Create', icon: PlusCircle },
    { id: 'tapestry', label: 'Tapestry', icon: Layers },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: '"Nunito", sans-serif',
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 40,
        overflow: 'hidden',
        background: t.bg,
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: 80,
        }
      },
        React.createElement(ActiveScreen)
      ),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0 24px',
          zIndex: 10,
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 12px', borderRadius: 12, transition: 'all 200ms ease',
              minWidth: 48, minHeight: 44,
            }
          },
            item.id === 'create'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 14,
                    background: activeScreen === 'create' ? '#EC4899' : `linear-gradient(135deg, #EC4899, #8B5CF6)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
                    transform: activeScreen === 'create' ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 200ms ease',
                  }
                },
                  React.createElement(item.icon, { size: 22, color: '#FFF' }),
                )
              : React.createElement(item.icon, {
                  size: 22,
                  color: activeScreen === item.id ? '#EC4899' : t.textMuted,
                  strokeWidth: activeScreen === item.id ? 2.5 : 2,
                }),
            item.id !== 'create' && React.createElement('span', {
              style: {
                fontFamily: '"Nunito", sans-serif',
                fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? '#EC4899' : t.textMuted,
                transition: 'all 200ms ease',
              }
            }, item.label)
          )
        )
      )
    )
  );
}
