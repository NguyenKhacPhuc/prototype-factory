const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  dark: {
    bg: '#0B1120',
    surface: '#131B2E',
    surfaceAlt: '#1A2540',
    card: '#182035',
    cardHover: '#1E2A48',
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    cta: '#F97316',
    ctaHover: '#FB923C',
    text: '#F0F9FF',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#1E3A5F',
    overlay: 'rgba(11,17,32,0.85)',
    tabBg: '#0F1729',
    inputBg: '#1A2540',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    gradient1: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    gradient2: 'linear-gradient(135deg, #F97316, #FBBF24)',
    gradient3: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
  },
  light: {
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    surfaceAlt: '#E0F2FE',
    card: '#FFFFFF',
    cardHover: '#F0F9FF',
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    cta: '#F97316',
    ctaHover: '#EA580C',
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#94A3B8',
    border: '#BAE6FD',
    overlay: 'rgba(240,249,255,0.9)',
    tabBg: '#FFFFFF',
    inputBg: '#E0F2FE',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    gradient1: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    gradient2: 'linear-gradient(135deg, #F97316, #FBBF24)',
    gradient3: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
  }
};

const fontStack = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, date: 'Apr 5', title: 'Morning light in Kyoto', mood: 'peaceful', text: 'The way sunlight filtered through bamboo created dancing patterns on the stone path. I stood still for five minutes just watching.' },
    { id: 2, date: 'Apr 4', title: 'Rain on temple bells', mood: 'contemplative', text: 'Each raindrop on the bronze bell created a different tone. The whole garden became an orchestra.' },
    { id: 3, date: 'Apr 3', title: 'Street vendor warmth', mood: 'joyful', text: 'The aroma of fresh taiyaki wrapped around me like a warm blanket. The vendor smiled without words.' },
  ]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [showMeditation, setShowMeditation] = useState(false);
  const [meditationPlaying, setMeditationPlaying] = useState(false);
  const [spiritUnlocked, setSpiritUnlocked] = useState(false);
  const [weaveFilter, setWeaveFilter] = useState('all');

  const t = isDark ? themes.dark : themes.light;

  const switchScreen = (screen) => {
    setAnimKey(k => k + 1);
    setActiveScreen(screen);
  };

  const icons = window.lucide || {};
  const Icon = ({ name, size = 24, color, style = {} }) => {
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  // Sensory prompts
  const prompts = [
    { icon: 'Ear', text: 'Find a sound that makes you feel peaceful today', location: 'Arashiyama District', type: 'audio' },
    { icon: 'Eye', text: 'Notice a pattern of light you\'ve never seen before', location: 'Fushimi Inari', type: 'photo' },
    { icon: 'Wind', text: 'Feel the air change as you move between spaces', location: 'Philosopher\'s Path', type: 'text' },
    { icon: 'Flower2', text: 'Discover a scent that tells a story about this place', location: 'Nishiki Market', type: 'audio' },
  ];

  // Weaveboard entries
  const weaveEntries = [
    { id: 1, user: 'Mika', avatar: '🌸', type: 'photo', text: 'The moss on these stones has been growing for centuries. Each patch is a tiny universe.', time: '2h ago', likes: 12, location: 'Ryoan-ji Temple' },
    { id: 2, user: 'Tomás', avatar: '🌊', type: 'audio', text: 'Recorded the bamboo creaking in the wind — it sounds like a conversation between old friends.', time: '4h ago', likes: 8, location: 'Arashiyama Grove' },
    { id: 3, user: 'Lena', avatar: '🌿', type: 'text', text: 'The torii gates create a rhythm as you walk through them. Fast, slow, fast — like breathing.', time: '6h ago', likes: 15, location: 'Fushimi Inari' },
    { id: 4, user: 'You', avatar: '✨', type: 'photo', text: 'Morning light in Kyoto transforms everything into gold for exactly seven minutes.', time: '8h ago', likes: 21, location: 'Kinkaku-ji' },
  ];

  // Echo Spirits
  const spirits = [
    { name: 'Kodama', desc: 'Forest spirit of ancient trees', progress: 85, unlocked: true, color: '#34D399', region: 'Arashiyama' },
    { name: 'Kitsune', desc: 'Fox spirit of wisdom and guidance', progress: 60, unlocked: false, color: '#F97316', region: 'Fushimi Inari' },
    { name: 'Tanuki', desc: 'Playful spirit of transformation', progress: 35, unlocked: false, color: '#A78BFA', region: 'Nishiki Market' },
    { name: 'Ryujin', desc: 'Dragon spirit of flowing water', progress: 15, unlocked: false, color: '#38BDF8', region: 'Kamo River' },
  ];

  // Soundscapes
  const soundscapes = [
    { name: 'Bamboo Whispers', duration: '15 min', unlocked: true, icon: 'Trees', plays: 234 },
    { name: 'Temple Rain', duration: '20 min', unlocked: true, icon: 'CloudRain', plays: 189 },
    { name: 'Garden Stream', duration: '12 min', unlocked: false, icon: 'Waves', plays: 156 },
    { name: 'Night Market Hum', duration: '18 min', unlocked: false, icon: 'Moon', plays: 98 },
  ];

  const meditations = [
    { name: 'Mindful Arrival', duration: '10 min', desc: 'Ground yourself in a new place', icon: 'Compass' },
    { name: 'Sensory Walk', duration: '15 min', desc: 'A guided walk of awareness', icon: 'Footprints' },
    { name: 'Gratitude Reflection', duration: '8 min', desc: 'Appreciate the journey so far', icon: 'Heart' },
  ];

  // Styles
  const styleTag = React.createElement('style', null, `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.3); opacity: 0.15; }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes progressFill {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes gentleBob {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-4px) rotate(1deg); }
      75% { transform: translateY(2px) rotate(-1deg); }
    }
    .screen-enter { animation: fadeInUp 0.4s ease-out forwards; }
    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:active { transform: scale(0.97); }
    .tab-active { transition: all 0.2s ease; }
    .shimmer-bg {
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
    .float-anim { animation: float 4s ease-in-out infinite; }
    .breathe-anim { animation: breathe 4s ease-in-out infinite; }
    .bob-anim { animation: gentleBob 3s ease-in-out infinite; }
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `);

  // ==================== HOME SCREEN ====================
  function HomeScreen() {
    const [promptExpanded, setPromptExpanded] = useState(false);
    const currentPrompt = prompts[activePromptIndex];

    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '0 0 20px 0', minHeight: '100%' }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 13, color: t.textTertiary, fontFamily: fontStack, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }
          }, 'Good morning'),
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.5 }
          }, 'Journeyweave')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 20,
              background: t.gradient1, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#fff' }))
        )
      ),

      // Streak & Stats Bar
      React.createElement('div', {
        style: {
          margin: '4px 20px 16px', padding: '14px 18px', borderRadius: 16,
          background: t.surfaceAlt, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          border: `1px solid ${t.border}`
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'Flame', size: 20, color: t.cta }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, '7-day streak')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.primary, fontFamily: fontStack } }, '23'),
            React.createElement('div', { style: { fontSize: 11, color: t.textTertiary, fontFamily: fontStack } }, 'prompts')
          ),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.success, fontFamily: fontStack } }, '1'),
            React.createElement('div', { style: { fontSize: 11, color: t.textTertiary, fontFamily: fontStack } }, 'spirit')
          )
        )
      ),

      // Daily Sensory Prompt Card
      React.createElement('div', {
        className: 'card-hover',
        onClick: () => setPromptExpanded(!promptExpanded),
        style: {
          margin: '0 20px 20px', borderRadius: 24, overflow: 'hidden',
          background: `linear-gradient(145deg, ${t.primary}22, ${t.secondary}15)`,
          border: `1.5px solid ${t.primary}40`,
          cursor: 'pointer', position: 'relative'
        }
      },
        // Decorative circles
        React.createElement('div', {
          className: 'breathe-anim',
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: 50, background: t.primary, opacity: 0.08
          }
        }),
        React.createElement('div', {
          className: 'breathe-anim',
          style: {
            position: 'absolute', bottom: -15, left: -15, width: 70, height: 70,
            borderRadius: 35, background: t.secondary, opacity: 0.06,
            animationDelay: '2s'
          }
        }),
        React.createElement('div', { style: { padding: '20px 20px 8px', position: 'relative' } },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: currentPrompt.icon, size: 18, color: '#fff' })),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.primary, fontFamily: fontStack, textTransform: 'uppercase', letterSpacing: 1 } }, "Today's Prompt"),
              React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, currentPrompt.location)
            )
          ),
          React.createElement('div', {
            style: { fontSize: 20, fontWeight: 600, color: t.text, fontFamily: fontStack, lineHeight: 1.4, marginBottom: 14 }
          }, currentPrompt.text)
        ),
        promptExpanded && React.createElement('div', {
          className: 'screen-enter',
          style: { padding: '0 20px 16px', position: 'relative' }
        },
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            ['photo', 'text', 'audio'].map(type =>
              React.createElement('button', {
                key: type,
                style: {
                  flex: 1, padding: '12px 8px', borderRadius: 14, border: `1.5px solid ${t.primary}50`,
                  background: currentPrompt.type === type ? t.primary : 'transparent',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                }
              },
                React.createElement(Icon, {
                  name: type === 'photo' ? 'Camera' : type === 'text' ? 'PenLine' : 'Mic',
                  size: 18,
                  color: currentPrompt.type === type ? '#fff' : t.primary
                }),
                React.createElement('span', {
                  style: { fontSize: 11, fontWeight: 500, color: currentPrompt.type === type ? '#fff' : t.primary, fontFamily: fontStack, textTransform: 'capitalize' }
                }, type)
              )
            )
          )
        ),
        !promptExpanded && React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement(Icon, { name: 'ChevronDown', size: 14, color: t.textTertiary }),
          React.createElement('span', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, 'Tap to respond')
        ),
        // Prompt dots
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'center', gap: 6, paddingBottom: 14 }
        },
          prompts.map((_, i) =>
            React.createElement('div', {
              key: i,
              onClick: (e) => { e.stopPropagation(); setActivePromptIndex(i); },
              style: {
                width: i === activePromptIndex ? 20 : 6, height: 6, borderRadius: 3,
                background: i === activePromptIndex ? t.primary : t.textTertiary + '40',
                transition: 'all 0.3s ease', cursor: 'pointer'
              }
            })
          )
        )
      ),

      // Echo Spirit Progress
      React.createElement('div', { style: { margin: '0 20px 20px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack } }, 'Echo Spirits'),
          React.createElement('button', {
            onClick: () => switchScreen('spirits'),
            style: { background: 'none', border: 'none', fontSize: 13, color: t.primary, fontFamily: fontStack, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          }, 'See all')
        ),
        React.createElement('div', {
          className: 'card-hover',
          onClick: () => switchScreen('spirits'),
          style: {
            padding: 18, borderRadius: 20, background: t.card,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 16
          }
        },
          React.createElement('div', {
            className: 'float-anim',
            style: {
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(135deg, ${spirits[0].color}30, ${spirits[0].color}10)`,
              border: `2px solid ${spirits[0].color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }
          }, React.createElement(Icon, { name: 'Sparkles', size: 24, color: spirits[0].color })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, 'Kodama — Forest Spirit'),
            React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack, marginBottom: 8 } }, '85% — Almost unlocked!'),
            React.createElement('div', {
              style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  width: '85%', height: '100%', borderRadius: 3,
                  background: t.gradient1, transition: 'width 1s ease'
                }
              })
            )
          )
        )
      ),

      // Recent Weaveboard Activity
      React.createElement('div', { style: { margin: '0 20px 20px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack } }, 'Weaveboard'),
          React.createElement('button', {
            onClick: () => switchScreen('weave'),
            style: { background: 'none', border: 'none', fontSize: 13, color: t.primary, fontFamily: fontStack, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          }, 'View all')
        ),
        weaveEntries.slice(0, 2).map((entry, i) =>
          React.createElement('div', {
            key: entry.id, className: 'card-hover',
            style: {
              padding: 16, borderRadius: 16, background: t.card,
              border: `1px solid ${t.border}`, marginBottom: 10, cursor: 'pointer',
              animationDelay: `${i * 0.1}s`
            },
            onClick: () => switchScreen('weave')
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 10, background: t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                }
              }, entry.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: fontStack } }, entry.user),
                React.createElement('span', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack, marginLeft: 8 } }, entry.time)
              ),
              React.createElement(Icon, { name: entry.type === 'photo' ? 'Image' : entry.type === 'audio' ? 'Headphones' : 'FileText', size: 14, color: t.textTertiary })
            ),
            React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.5 } }, entry.text)
          )
        )
      ),

      // Quick Soundscape
      React.createElement('div', { style: { margin: '0 20px 16px' } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack } }, 'Quick Calm'),
          React.createElement('button', {
            onClick: () => switchScreen('sounds'),
            style: { background: 'none', border: 'none', fontSize: 13, color: t.primary, fontFamily: fontStack, fontWeight: 600, cursor: 'pointer', padding: '4px 0' }
          }, 'More')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          soundscapes.filter(s => s.unlocked).map((s, i) =>
            React.createElement('div', {
              key: i, className: 'card-hover',
              onClick: () => switchScreen('sounds'),
              style: {
                minWidth: 140, padding: 16, borderRadius: 18,
                background: `linear-gradient(145deg, ${t.primary}15, ${t.secondary}08)`,
                border: `1px solid ${t.primary}30`, cursor: 'pointer', flexShrink: 0
              }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 12, background: t.primary + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10
                }
              }, React.createElement(Icon, { name: s.icon, size: 20, color: t.primary })),
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 2 } }, s.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, s.duration)
            )
          )
        )
      )
    );
  }

  // ==================== WEAVEBOARD SCREEN ====================
  function WeaveScreen() {
    const filters = ['all', 'photos', 'audio', 'text'];

    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '0 0 20px 0', minHeight: '100%' }
    },
      React.createElement('div', { style: { padding: '16px 20px 14px' } },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 4 } }, 'Weaveboard'),
        React.createElement('div', { style: { fontSize: 14, color: t.textTertiary, fontFamily: fontStack } }, 'Kyoto Journey — 4 travelers')
      ),

      // Filters
      React.createElement('div', {
        style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setWeaveFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${weaveFilter === f ? t.primary : t.border}`,
              background: weaveFilter === f ? t.primary + '18' : 'transparent',
              color: weaveFilter === f ? t.primary : t.textSecondary,
              fontSize: 13, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
              textTransform: 'capitalize', whiteSpace: 'nowrap'
            }
          }, f)
        )
      ),

      // Add contribution button
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('button', {
          style: {
            width: '100%', padding: '14px 20px', borderRadius: 16, border: `2px dashed ${t.primary}50`,
            background: t.primary + '08', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }
        },
          React.createElement(Icon, { name: 'Plus', size: 18, color: t.primary }),
          React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.primary, fontFamily: fontStack } }, 'Add to the weave')
        )
      ),

      // Entries
      weaveEntries.map((entry, i) =>
        React.createElement('div', {
          key: entry.id, className: 'card-hover',
          style: {
            margin: '0 20px 14px', padding: 18, borderRadius: 20,
            background: t.card, border: `1px solid ${t.border}`,
            animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 13, background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
              }
            }, entry.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, entry.user),
              React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'MapPin', size: 11, color: t.textTertiary }),
                entry.location, ' · ', entry.time
              )
            ),
            React.createElement('div', {
              style: {
                padding: '4px 10px', borderRadius: 10, background: t.primary + '15',
                fontSize: 11, fontWeight: 600, color: t.primary, fontFamily: fontStack, textTransform: 'capitalize'
              }
            }, entry.type)
          ),
          // Content area
          entry.type === 'photo' && React.createElement('div', {
            style: {
              height: 160, borderRadius: 14, marginBottom: 12,
              background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}15, ${t.cta}10)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement(Icon, { name: 'Image', size: 32, color: t.primary + '60' })
          ),
          entry.type === 'audio' && React.createElement('div', {
            style: {
              padding: '12px 16px', borderRadius: 14, marginBottom: 12,
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', gap: 12
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 18, background: t.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            }, React.createElement(Icon, { name: 'Play', size: 16, color: '#fff' })),
            React.createElement('div', { style: { flex: 1 } },
              // Waveform visualization
              React.createElement('div', { style: { display: 'flex', gap: 2, alignItems: 'center', height: 24 } },
                [3,7,5,9,4,8,6,10,3,7,5,8,4,9,6,7,3,5,8,4,7,6,9,5].map((h, idx) =>
                  React.createElement('div', {
                    key: idx,
                    style: {
                      width: 3, height: h * 2, borderRadius: 2,
                      background: idx < 10 ? t.primary : t.textTertiary + '40',
                      transition: 'height 0.2s ease'
                    }
                  })
                )
              )
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.textTertiary, fontFamily: fontStack } }, '0:24')
          ),
          React.createElement('div', { style: { fontSize: 15, color: t.text, fontFamily: fontStack, lineHeight: 1.55, marginBottom: 12 } }, entry.text),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            React.createElement('button', {
              style: {
                background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5,
                cursor: 'pointer', padding: '4px 0'
              }
            },
              React.createElement(Icon, { name: 'Heart', size: 16, color: t.textTertiary }),
              React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: fontStack } }, entry.likes)
            ),
            React.createElement('button', {
              style: {
                background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5,
                cursor: 'pointer', padding: '4px 0'
              }
            },
              React.createElement(Icon, { name: 'MessageCircle', size: 16, color: t.textTertiary }),
              React.createElement('span', { style: { fontSize: 13, color: t.textTertiary, fontFamily: fontStack } }, 'Reply')
            ),
            React.createElement('button', {
              style: {
                background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 5,
                cursor: 'pointer', padding: '4px 0', marginLeft: 'auto'
              }
            },
              React.createElement(Icon, { name: 'Bookmark', size: 16, color: t.textTertiary })
            )
          )
        )
      )
    );
  }

  // ==================== SPIRITS & SOUNDS SCREEN ====================
  function SpiritsScreen() {
    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '0 0 20px 0', minHeight: '100%' }
    },
      React.createElement('div', { style: { padding: '16px 20px 18px' } },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 4 } }, 'Echo Spirits'),
        React.createElement('div', { style: { fontSize: 14, color: t.textTertiary, fontFamily: fontStack } }, 'Gentle AR companions inspired by local folklore')
      ),

      // Spirits grid
      spirits.map((spirit, i) =>
        React.createElement('div', {
          key: i, className: 'card-hover',
          style: {
            margin: '0 20px 14px', padding: 20, borderRadius: 22,
            background: t.card, border: `1px solid ${spirit.unlocked ? spirit.color + '40' : t.border}`,
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`,
            position: 'relative', overflow: 'hidden', cursor: 'pointer'
          },
          onClick: () => {
            if (spirit.name === 'Kodama' && !spiritUnlocked) {
              setSpiritUnlocked(true);
            }
          }
        },
          // Glow effect for unlocked
          spirit.unlocked && React.createElement('div', {
            className: 'breathe-anim',
            style: {
              position: 'absolute', top: -30, right: -30, width: 120, height: 120,
              borderRadius: 60, background: spirit.color, opacity: 0.06
            }
          }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, position: 'relative' } },
            React.createElement('div', {
              className: spirit.unlocked ? 'bob-anim' : '',
              style: {
                width: 64, height: 64, borderRadius: 20,
                background: `linear-gradient(135deg, ${spirit.color}25, ${spirit.color}08)`,
                border: `2px solid ${spirit.color}${spirit.unlocked ? '60' : '25'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                opacity: spirit.unlocked ? 1 : 0.5
              }
            },
              React.createElement(Icon, {
                name: spirit.unlocked ? 'Sparkles' : 'Lock',
                size: 26, color: spirit.color
              })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 } },
                React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: fontStack } }, spirit.name),
                spirit.unlocked && React.createElement('div', {
                  style: {
                    padding: '2px 8px', borderRadius: 8, background: spirit.color + '20',
                    fontSize: 10, fontWeight: 700, color: spirit.color, fontFamily: fontStack, textTransform: 'uppercase', letterSpacing: 0.5
                  }
                }, 'Unlocked')
              ),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, marginBottom: 3 } }, spirit.desc),
              React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack, display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'MapPin', size: 11, color: t.textTertiary }),
                spirit.region
              ),
              React.createElement('div', { style: { marginTop: 10 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                  React.createElement('span', { style: { fontSize: 11, color: t.textTertiary, fontFamily: fontStack } }, 'Progress'),
                  React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: spirit.color, fontFamily: fontStack } }, `${spirit.progress}%`)
                ),
                React.createElement('div', { style: { height: 6, borderRadius: 3, background: t.surfaceAlt, overflow: 'hidden' } },
                  React.createElement('div', {
                    style: {
                      width: `${spirit.progress}%`, height: '100%', borderRadius: 3,
                      background: `linear-gradient(90deg, ${spirit.color}, ${spirit.color}99)`,
                      transition: 'width 1.2s ease'
                    }
                  })
                )
              )
            )
          )
        )
      ),

      // Spirit unlocked modal
      spiritUnlocked && React.createElement('div', {
        onClick: () => setSpiritUnlocked(false),
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, animation: 'fadeIn 0.3s ease'
        }
      },
        React.createElement('div', {
          onClick: e => e.stopPropagation(),
          style: {
            width: 280, padding: 32, borderRadius: 28, background: t.card,
            border: `2px solid ${spirits[0].color}50`, textAlign: 'center',
            animation: 'slideUp 0.4s ease-out', boxShadow: `0 24px 48px ${t.bg}80`
          }
        },
          React.createElement('div', {
            className: 'float-anim',
            style: {
              width: 80, height: 80, borderRadius: 24, margin: '0 auto 16px',
              background: `linear-gradient(135deg, ${spirits[0].color}30, ${spirits[0].color}10)`,
              border: `3px solid ${spirits[0].color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'Sparkles', size: 36, color: spirits[0].color })),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, marginBottom: 8 } }, 'Kodama Awakens!'),
          React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.5, marginBottom: 20 } },
            'Your mindful observations have summoned the ancient forest spirit. Kodama will now guide you through Arashiyama.'
          ),
          React.createElement('button', {
            onClick: () => setSpiritUnlocked(false),
            style: {
              padding: '14px 32px', borderRadius: 16, border: 'none',
              background: t.gradient1, color: '#fff', fontSize: 15, fontWeight: 600,
              fontFamily: fontStack, cursor: 'pointer', width: '100%'
            }
          }, 'Continue Journey')
        )
      )
    );
  }

  // ==================== SOUNDS & MEDITATION SCREEN ====================
  function SoundsScreen() {
    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '0 0 20px 0', minHeight: '100%' }
    },
      React.createElement('div', { style: { padding: '16px 20px 14px' } },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 4 } }, 'Serenity'),
        React.createElement('div', { style: { fontSize: 14, color: t.textTertiary, fontFamily: fontStack } }, 'Soundscapes & guided meditations')
      ),

      // Tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 4, margin: '0 20px 18px', padding: 4, borderRadius: 14, background: t.surfaceAlt }
      },
        ['soundscapes', 'meditations'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setSelectedTab(tab === 'soundscapes' ? 'all' : 'meditations'),
            style: {
              flex: 1, padding: '10px 16px', borderRadius: 11, border: 'none',
              background: (tab === 'soundscapes' && selectedTab !== 'meditations') || (tab === 'meditations' && selectedTab === 'meditations') ? t.primary : 'transparent',
              color: (tab === 'soundscapes' && selectedTab !== 'meditations') || (tab === 'meditations' && selectedTab === 'meditations') ? '#fff' : t.textSecondary,
              fontSize: 14, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
              textTransform: 'capitalize', transition: 'all 0.2s ease'
            }
          }, tab)
        )
      ),

      selectedTab !== 'meditations' ? React.createElement('div', null,
        // Now playing
        React.createElement('div', {
          style: {
            margin: '0 20px 18px', padding: 20, borderRadius: 22,
            background: `linear-gradient(145deg, ${t.primary}18, ${t.secondary}10)`,
            border: `1.5px solid ${t.primary}35`, position: 'relative', overflow: 'hidden'
          }
        },
          React.createElement('div', {
            className: 'breathe-anim',
            style: {
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 200, height: 200, borderRadius: 100, background: t.primary, opacity: 0.04
            }
          }),
          React.createElement('div', { style: { textAlign: 'center', position: 'relative' } },
            React.createElement('div', {
              style: { fontSize: 11, fontWeight: 600, color: t.primary, fontFamily: fontStack, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }
            }, meditationPlaying ? 'Now Playing' : 'Featured'),
            React.createElement('div', {
              className: 'bob-anim',
              style: {
                width: 72, height: 72, borderRadius: 36, margin: '0 auto 14px',
                background: t.primary + '20', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: 'Trees', size: 32, color: t.primary })),
            React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, 'Bamboo Whispers'),
            React.createElement('div', { style: { fontSize: 13, color: t.textTertiary, fontFamily: fontStack, marginBottom: 16 } }, '15 min · 234 plays'),
            React.createElement('button', {
              onClick: () => setMeditationPlaying(!meditationPlaying),
              style: {
                width: 56, height: 56, borderRadius: 28, border: 'none',
                background: t.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', boxShadow: `0 8px 24px ${t.primary}40`
              }
            }, React.createElement(Icon, { name: meditationPlaying ? 'Pause' : 'Play', size: 24, color: '#fff' }))
          )
        ),

        // Soundscapes list
        React.createElement('div', { style: { padding: '0 20px' } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: fontStack, marginBottom: 12 } }, 'All Soundscapes'),
          soundscapes.map((s, i) =>
            React.createElement('div', {
              key: i, className: 'card-hover',
              style: {
                padding: 16, borderRadius: 16, background: t.card,
                border: `1px solid ${t.border}`, marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 14,
                opacity: s.unlocked ? 1 : 0.6, cursor: 'pointer',
                animation: `fadeInUp 0.3s ease-out ${i * 0.08}s both`
              }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: s.unlocked ? t.primary + '18' : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }
              }, React.createElement(Icon, { name: s.unlocked ? s.icon : 'Lock', size: 22, color: s.unlocked ? t.primary : t.textTertiary })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, s.name),
                React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, `${s.duration} · ${s.plays} plays`)
              ),
              s.unlocked && React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 18, background: t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              }, React.createElement(Icon, { name: 'Play', size: 14, color: '#fff' }))
            )
          )
        )
      ) :
      // Meditations
      React.createElement('div', { style: { padding: '0 20px' } },
        meditations.map((m, i) =>
          React.createElement('div', {
            key: i, className: 'card-hover',
            onClick: () => setShowMeditation(!showMeditation),
            style: {
              padding: 20, borderRadius: 20, marginBottom: 14,
              background: t.card, border: `1px solid ${t.border}`,
              cursor: 'pointer', animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 16,
                  background: `linear-gradient(135deg, ${t.cta}20, ${t.cta}08)`,
                  border: `1.5px solid ${t.cta}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }
              }, React.createElement(Icon, { name: m.icon, size: 24, color: t.cta })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 2 } }, m.name),
                React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, marginBottom: 2 } }, m.desc),
                React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, m.duration)
              ),
              React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
            )
          )
        ),

        // Meditation detail overlay
        showMeditation && React.createElement('div', {
          style: {
            marginTop: 10, padding: 24, borderRadius: 24,
            background: `linear-gradient(145deg, ${t.cta}12, ${t.primary}08)`,
            border: `1.5px solid ${t.cta}30`, animation: 'fadeInUp 0.3s ease-out',
            textAlign: 'center'
          }
        },
          React.createElement('div', {
            className: 'breathe-anim',
            style: {
              width: 80, height: 80, borderRadius: 40, margin: '0 auto 16px',
              background: t.cta + '15', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          }, React.createElement(Icon, { name: 'Compass', size: 36, color: t.cta })),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: fontStack, marginBottom: 6 } }, 'Mindful Arrival'),
          React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.5, marginBottom: 20 } },
            'Close your eyes. Feel the ground beneath you. Notice three sounds, two scents, one texture. You are here.'
          ),
          React.createElement('button', {
            onClick: () => setMeditationPlaying(!meditationPlaying),
            style: {
              padding: '14px 40px', borderRadius: 16, border: 'none',
              background: t.gradient2, color: '#fff', fontSize: 16, fontWeight: 700,
              fontFamily: fontStack, cursor: 'pointer', boxShadow: `0 8px 24px ${t.cta}30`
            }
          }, meditationPlaying ? 'Pause' : 'Begin Session')
        )
      )
    );
  }

  // ==================== JOURNAL SCREEN ====================
  function JournalScreen() {
    const [newEntry, setNewEntry] = useState('');
    const moods = [
      { name: 'peaceful', icon: 'CloudSun', color: '#38BDF8' },
      { name: 'joyful', icon: 'Smile', color: '#FBBF24' },
      { name: 'contemplative', icon: 'Brain', color: '#A78BFA' },
      { name: 'inspired', icon: 'Lightbulb', color: '#F97316' },
      { name: 'grateful', icon: 'Heart', color: '#F87171' },
    ];
    const [selectedMood, setSelectedMood] = useState('peaceful');

    return React.createElement('div', {
      className: 'screen-enter',
      style: { padding: '0 0 20px 0', minHeight: '100%' }
    },
      React.createElement('div', { style: { padding: '16px 20px 14px' } },
        React.createElement('div', { style: { fontSize: 28, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 4 } }, 'Reflection Journal'),
        React.createElement('div', { style: { fontSize: 14, color: t.textTertiary, fontFamily: fontStack } }, 'Your personal sensory diary')
      ),

      // New entry card
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 20, borderRadius: 22,
          background: t.card, border: `1.5px solid ${t.primary}30`
        }
      },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: fontStack, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'New Reflection'),
        React.createElement('textarea', {
          value: newEntry,
          onChange: (e) => setNewEntry(e.target.value),
          placeholder: 'What did you notice today? What did it make you feel?',
          style: {
            width: '100%', minHeight: 80, padding: 14, borderRadius: 14,
            background: t.inputBg, border: `1px solid ${t.border}`, color: t.text,
            fontSize: 15, fontFamily: fontStack, lineHeight: 1.5, resize: 'none',
            outline: 'none'
          }
        }),
        React.createElement('div', { style: { marginTop: 12, marginBottom: 14 } },
          React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack, marginBottom: 8 } }, 'How are you feeling?'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            moods.map(mood =>
              React.createElement('button', {
                key: mood.name,
                onClick: () => setSelectedMood(mood.name),
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: selectedMood === mood.name ? mood.color + '25' : t.surfaceAlt,
                  border: `2px solid ${selectedMood === mood.name ? mood.color : 'transparent'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }
              }, React.createElement(Icon, { name: mood.icon, size: 20, color: selectedMood === mood.name ? mood.color : t.textTertiary }))
            )
          )
        ),
        React.createElement('button', {
          onClick: () => {
            if (newEntry.trim()) {
              setJournalEntries([{ id: Date.now(), date: 'Today', title: newEntry.slice(0, 30) + '...', mood: selectedMood, text: newEntry }, ...journalEntries]);
              setNewEntry('');
            }
          },
          style: {
            width: '100%', padding: '14px 20px', borderRadius: 14, border: 'none',
            background: newEntry.trim() ? t.gradient1 : t.surfaceAlt,
            color: newEntry.trim() ? '#fff' : t.textTertiary,
            fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer',
            transition: 'all 0.2s ease'
          }
        }, 'Save Reflection')
      ),

      // Journal entries
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: fontStack, marginBottom: 14 } }, 'Past Reflections'),
        journalEntries.map((entry, i) => {
          const moodObj = moods.find(m => m.name === entry.mood) || moods[0];
          return React.createElement('div', {
            key: entry.id, className: 'card-hover',
            style: {
              padding: 18, borderRadius: 18, background: t.card,
              border: `1px solid ${t.border}`, marginBottom: 12,
              animation: `fadeInUp 0.3s ease-out ${i * 0.08}s both`, cursor: 'pointer'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', {
                  style: {
                    width: 36, height: 36, borderRadius: 12,
                    background: moodObj.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }
                }, React.createElement(Icon, { name: moodObj.icon, size: 18, color: moodObj.color })),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, entry.title),
                  React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: fontStack } }, entry.date)
                )
              ),
              React.createElement('div', {
                style: {
                  padding: '3px 10px', borderRadius: 8, background: moodObj.color + '15',
                  fontSize: 11, fontWeight: 600, color: moodObj.color, fontFamily: fontStack, textTransform: 'capitalize'
                }
              }, entry.mood)
            ),
            React.createElement('div', { style: { fontSize: 14, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.55 } }, entry.text)
          );
        })
      )
    );
  }

  // ==================== NAVIGATION ====================
  const screens = {
    home: HomeScreen,
    weave: WeaveScreen,
    spirits: SpiritsScreen,
    sounds: SoundsScreen,
    journal: JournalScreen,
  };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'weave', icon: 'Users', label: 'Weave' },
    { id: 'spirits', icon: 'Sparkles', label: 'Spirits' },
    { id: 'sounds', icon: 'Headphones', label: 'Sounds' },
    { id: 'journal', icon: 'BookOpen', label: 'Journal' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', fontFamily: fontStack
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        background: t.bg, overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', border: `1px solid ${isDark ? '#1E3A5F' : '#BAE6FD'}`
      }
    },
      // Scrollable content
      React.createElement('div', {
        key: animKey,
        style: {
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingBottom: 80, WebkitOverflowScrolling: 'touch'
        }
      },
        React.createElement(screens[activeScreen])
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.tabBg, borderTop: `1px solid ${t.border}`,
          padding: '8px 8px 24px', display: 'flex', justifyContent: 'space-around',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          zIndex: 50
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => switchScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 10px', borderRadius: 12, minWidth: 52,
              transition: 'all 0.2s ease',
              transform: activeScreen === item.id ? 'scale(1.05)' : 'scale(1)'
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10,
                background: activeScreen === item.id ? t.primary + '18' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
              }
            },
              React.createElement(Icon, {
                name: item.icon, size: 20,
                color: activeScreen === item.id ? t.primary : t.textTertiary
              })
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === item.id ? 700 : 500,
                color: activeScreen === item.id ? t.primary : t.textTertiary,
                fontFamily: fontStack, transition: 'all 0.2s ease'
              }
            }, item.label)
          )
        )
      )
    )
  );
}
