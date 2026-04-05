const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [lifeSpark, setLifeSpark] = useState(2847);
  const [showFragment, setShowFragment] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState(null);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [waterCount, setWaterCount] = useState(5);
  const [animTick, setAnimTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAnimTick(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const themes = {
    light: {
      bg: '#F9FAFB',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F4F6',
      card: '#FFFFFF',
      cardBorder: '#E5E7EB',
      text: '#111827',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaLight: 'rgba(34,197,94,0.12)',
      primaryLight: 'rgba(249,115,22,0.12)',
      secondaryLight: 'rgba(251,146,60,0.1)',
      accent: '#1F2937',
      navBg: '#FFFFFF',
      navBorder: '#E5E7EB',
      sparkGlow: 'rgba(249,115,22,0.3)',
      overlay: 'rgba(0,0,0,0.5)',
    },
    dark: {
      bg: '#1F2937',
      surface: '#283548',
      surfaceAlt: '#1F2937',
      card: '#283548',
      cardBorder: '#374151',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textMuted: '#9CA3AF',
      primary: '#F97316',
      secondary: '#FB923C',
      cta: '#22C55E',
      ctaLight: 'rgba(34,197,94,0.2)',
      primaryLight: 'rgba(249,115,22,0.2)',
      secondaryLight: 'rgba(251,146,60,0.15)',
      accent: '#F9FAFB',
      navBg: '#283548',
      navBorder: '#374151',
      sparkGlow: 'rgba(249,115,22,0.5)',
      overlay: 'rgba(0,0,0,0.7)',
    }
  };

  const c = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(249,115,22,0.3); }
      50% { box-shadow: 0 0 20px rgba(249,115,22,0.6); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.2); opacity: 0; }
    }
  `);

  const Icon = ({ name, size = 20, color = c.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // Data
  const healthMetrics = [
    { label: 'Steps', value: '8,432', target: '10,000', pct: 84, icon: 'Footprints', color: '#F97316' },
    { label: 'Active Min', value: '42', target: '60 min', pct: 70, icon: 'Timer', color: '#22C55E' },
    { label: 'Sleep', value: '7.2h', target: '8h', pct: 90, icon: 'Moon', color: '#8B5CF6' },
    { label: 'Hydration', value: `${waterCount}/8`, target: '8 glasses', pct: Math.round((waterCount / 8) * 100), icon: 'Droplets', color: '#3B82F6' },
  ];

  const biomeFragments = [
    { id: 1, name: 'Giant Panda Blossom', rarity: 'Legendary', habitat: 'Bamboo Forests of Sichuan', discovered: true, color: '#22C55E', story: 'The Giant Panda, a symbol of conservation success, thrives in the misty bamboo forests of central China. This fragment captures the gentle resilience of a species brought back from the brink.', icon: 'Flower2' },
    { id: 2, name: 'Coral Reef Spore', rarity: 'Epic', habitat: 'Great Barrier Reef', discovered: true, color: '#F97316', story: 'Coral reefs support 25% of all marine life despite covering less than 1% of the ocean floor. This living fragment pulses with the rhythm of the sea.', icon: 'Shell' },
    { id: 3, name: 'Aurora Borealis Seed', rarity: 'Legendary', habitat: 'Arctic Circle', discovered: true, color: '#8B5CF6', story: 'Born from solar winds colliding with Earth\'s magnetosphere, the Northern Lights remind us of the invisible forces protecting our planet.', icon: 'Sparkles' },
    { id: 4, name: 'Redwood Root Tendril', rarity: 'Rare', habitat: 'Pacific Northwest', discovered: true, color: '#B45309', story: 'Coast Redwoods are the tallest trees on Earth, reaching over 380 feet. Their root systems interlock with neighboring trees for mutual support.', icon: 'TreePine' },
    { id: 5, name: 'Monarch Wing Scale', rarity: 'Epic', habitat: 'Michoacán Highlands', discovered: false, color: '#FB923C', story: 'Monarch butterflies migrate up to 3,000 miles each year, navigating by the sun and Earth\'s magnetic field.', icon: 'Bug' },
    { id: 6, name: 'Deep Ocean Ember', rarity: 'Legendary', habitat: 'Mariana Trench', discovered: false, color: '#06B6D4', story: 'In the deepest trenches, hydrothermal vents create oases of life fueled not by sunlight, but by Earth\'s own heat.', icon: 'Flame' },
  ];

  const quests = [
    { id: 1, title: 'Water Cycle Wellness', desc: 'Drink 8 glasses of water today to complete the hydration cycle', spark: 120, progress: Math.round((waterCount / 8) * 100), icon: 'Droplets', color: '#3B82F6', theme: 'Oceanic' },
    { id: 2, title: 'Forest Walk Revival', desc: 'Walk 10,000 steps to restore the Ancient Forest biome', spark: 200, progress: 84, icon: 'TreePine', color: '#22C55E', theme: 'Woodland' },
    { id: 3, title: 'Lunar Rest Cycle', desc: 'Get 8 hours of sleep to unlock the Moonlit Meadow', spark: 150, progress: 90, icon: 'Moon', color: '#8B5CF6', theme: 'Celestial' },
    { id: 4, title: 'Sunrise Energy Burst', desc: 'Complete a 30-minute workout before 9 AM', spark: 250, progress: 0, icon: 'Sun', color: '#F97316', theme: 'Solar' },
  ];

  const ecoMilestones = [
    { name: '7-Day Streak', desc: 'Maintain health habits for a full week', achieved: true, donation: '$2 to Ocean Cleanup', icon: 'Flame' },
    { name: 'First Legendary', desc: 'Discover your first Legendary fragment', achieved: true, donation: '$5 to WWF', icon: 'Trophy' },
    { name: 'Full Hydration Week', desc: '8 glasses daily for 7 days straight', achieved: false, donation: '$3 to Water.org', icon: 'Droplets' },
    { name: 'Sleep Champion', desc: '8+ hours for 14 consecutive nights', achieved: false, donation: '$5 to Rainforest Alliance', icon: 'Moon' },
  ];

  const weeklyData = [
    { day: 'Mon', spark: 380 },
    { day: 'Tue', spark: 420 },
    { day: 'Wed', spark: 350 },
    { day: 'Thu', spark: 510 },
    { day: 'Fri', spark: 460 },
    { day: 'Sat', spark: 290 },
    { day: 'Sun', spark: 437 },
  ];
  const maxSpark = Math.max(...weeklyData.map(d => d.spark));

  // Bioverse rendering
  const BioverseSphere = () => {
    const health = 78; // overall health score
    const treeCount = 6;
    const particles = Array.from({ length: 12 }, (_, i) => i);

    return React.createElement('div', {
      style: {
        position: 'relative',
        width: 220,
        height: 220,
        margin: '0 auto',
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${c.cta}30, #1F293720, ${c.primary}15)`,
        boxShadow: `0 0 40px ${c.sparkGlow}, inset 0 0 30px rgba(34,197,94,0.15)`,
        animation: 'glow 3s ease-in-out infinite',
        overflow: 'hidden',
      }
    },
      // Ground
      React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: `linear-gradient(to top, #22C55E30, transparent)`,
        borderRadius: '0 0 110px 110px',
      }}),
      // Trees
      ...Array.from({ length: treeCount }, (_, i) => {
        const x = 25 + (i * 28) % 170;
        const h = 25 + Math.random() * 30;
        const delay = i * 0.3;
        return React.createElement('div', { key: `tree-${i}`, style: {
          position: 'absolute',
          bottom: 30 + (i % 2) * 12,
          left: x,
          width: 4,
          height: h,
          background: '#8B6914',
          borderRadius: 2,
          animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }},
          React.createElement('div', { style: {
            position: 'absolute', top: -12, left: -10, width: 24, height: 20,
            background: i % 3 === 0 ? '#22C55E' : i % 3 === 1 ? '#16A34A' : '#15803D',
            borderRadius: '50% 50% 50% 50%',
          }})
        );
      }),
      // Floating particles
      ...particles.map((_, i) => React.createElement('div', { key: `p-${i}`, style: {
        position: 'absolute',
        top: 20 + Math.sin(i * 1.2) * 60 + 40,
        left: 20 + Math.cos(i * 0.9) * 60 + 50,
        width: 4 + (i % 3) * 2,
        height: 4 + (i % 3) * 2,
        borderRadius: '50%',
        background: i % 3 === 0 ? c.primary : i % 3 === 1 ? c.cta : '#8B5CF6',
        opacity: 0.5 + (animTick + i) % 3 * 0.15,
        animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
        animationDelay: `${i * 0.15}s`,
      }})),
      // Center spark
      React.createElement('div', { style: {
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      }},
        React.createElement(Icon, { name: 'Zap', size: 28, color: c.primary }),
        React.createElement('span', { style: {
          fontFamily: font, fontSize: 13, fontWeight: 700, color: c.primary,
          textShadow: `0 0 10px ${c.sparkGlow}`,
        }}, `${health}%`)
      )
    );
  };

  // Fragment detail modal
  const FragmentModal = ({ fragment, onClose }) => {
    if (!fragment) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: c.overlay, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn 0.3s ease',
      },
      onClick: onClose,
    },
      React.createElement('div', {
        style: {
          background: c.card, borderRadius: 24, padding: 28, width: '100%', maxWidth: 320,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease',
          border: `2px solid ${fragment.color}30`,
        },
        onClick: e => e.stopPropagation(),
      },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 16 }},
          React.createElement('div', { style: {
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${fragment.color}30, ${fragment.color}10)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px solid ${fragment.color}50`,
            animation: 'pulse 2s ease-in-out infinite',
          }},
            React.createElement(Icon, { name: fragment.icon, size: 32, color: fragment.color })
          ),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: -0.5, margin: 0 }}, fragment.name),
          React.createElement('span', { style: {
            fontFamily: font, fontSize: 13, fontWeight: 600, color: fragment.color,
            background: `${fragment.color}18`, padding: '3px 10px', borderRadius: 12,
            display: 'inline-block', marginTop: 6,
          }}, fragment.rarity)
        ),
        React.createElement('div', { style: { background: c.surfaceAlt, borderRadius: 16, padding: 14, marginBottom: 14 }},
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }},
            React.createElement(Icon, { name: 'MapPin', size: 14, color: c.textMuted }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, fragment.habitat)
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, lineHeight: 1.5, margin: 0 }}, fragment.story)
        ),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${c.cta}, #16A34A)`,
            borderRadius: 14, padding: '13px 0', textAlign: 'center', cursor: 'pointer',
            transition: 'transform 0.15s',
            transform: pressed === 'close-modal' ? 'scale(0.97)' : 'scale(1)',
          },
          onClick: onClose,
          onMouseDown: () => setPressed('close-modal'),
          onMouseUp: () => setPressed(null),
          onMouseLeave: () => setPressed(null),
        },
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#fff' }}, 'Back to Collection')
        )
      )
    );
  };

  // --- SCREENS ---

  const HomeScreen = () => {
    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', padding: '0 0 100px 0' }},
      // Header
      React.createElement('div', { style: {
        padding: '16px 20px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }},
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: c.text, letterSpacing: -0.5, margin: 0 }}, 'Good Morning'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, margin: '2px 0 0' }}, 'Your Bioverse is thriving')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 }},
          React.createElement('div', {
            style: { width: 44, height: 44, borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: c.surfaceAlt, transition: 'transform 0.15s', transform: pressed === 'theme' ? 'scale(0.92)' : 'scale(1)' },
            onClick: () => setIsDark(!isDark),
            onMouseDown: () => setPressed('theme'),
            onMouseUp: () => setPressed(null),
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: c.textSecondary })
          ),
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: 22,
            background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }},
            React.createElement(Icon, { name: 'User', size: 20, color: '#fff' })
          )
        )
      ),

      // Life Spark Card
      React.createElement('div', { style: {
        margin: '16px 20px', padding: 20, borderRadius: 20,
        background: `linear-gradient(135deg, #1F2937, #374151)`,
        boxShadow: `0 8px 24px rgba(31,41,55,0.4)`,
        position: 'relative', overflow: 'hidden',
      }},
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `${c.primary}15` }}),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: `${c.cta}10` }}),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }},
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }},
              React.createElement(Icon, { name: 'Zap', size: 16, color: c.primary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#9CA3AF' }}, 'LIFE SPARK')
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#F9FAFB', letterSpacing: -0.5 }}, lifeSpark.toLocaleString()),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: '#22C55E', fontWeight: 600 }}, '+437 today')
          ),
          React.createElement('div', { style: { textAlign: 'right' }},
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: '#9CA3AF', marginBottom: 4 }}, 'Bioverse Health'),
            React.createElement('div', { style: {
              fontFamily: font, fontSize: 22, fontWeight: 700, color: c.cta,
            }}, '78%'),
            React.createElement('div', { style: { width: 80, height: 6, borderRadius: 3, background: '#374151', marginTop: 6 }},
              React.createElement('div', { style: { width: '78%', height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${c.cta}, #16A34A)` }})
            )
          )
        )
      ),

      // Bioverse Sphere
      React.createElement('div', { style: { margin: '8px 20px 16px', textAlign: 'center' }},
        React.createElement(BioverseSphere),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: c.textMuted, marginTop: 10 }}, 'Tap Explore to discover new Biome Fragments')
      ),

      // Quick Metrics Grid
      React.createElement('div', { style: { padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }},
        ...healthMetrics.map((m, i) => React.createElement('div', {
          key: m.label,
          style: {
            background: c.card, borderRadius: 16, padding: 16,
            border: `1px solid ${c.cardBorder}`,
            animation: 'fadeIn 0.4s ease',
            animationDelay: `${i * 0.1}s`,
            animationFillMode: 'both',
            cursor: m.label === 'Hydration' ? 'pointer' : 'default',
            transition: 'transform 0.15s, box-shadow 0.15s',
            transform: pressed === `metric-${i}` ? 'scale(0.97)' : 'scale(1)',
            boxShadow: pressed === `metric-${i}` ? `0 2px 8px ${m.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
          },
          onClick: () => {
            if (m.label === 'Hydration' && waterCount < 8) {
              setWaterCount(w => w + 1);
              setLifeSpark(s => s + 15);
            }
          },
          onMouseDown: () => setPressed(`metric-${i}`),
          onMouseUp: () => setPressed(null),
          onMouseLeave: () => setPressed(null),
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }},
            React.createElement('div', { style: {
              width: 36, height: 36, borderRadius: 10,
              background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }},
              React.createElement(Icon, { name: m.icon, size: 18, color: m.color })
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: m.color }}, `${m.pct}%`)
          ),
          React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: -0.5 }}, m.value),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, m.label),
          React.createElement('div', { style: { width: '100%', height: 4, borderRadius: 2, background: c.surfaceAlt, marginTop: 8 }},
            React.createElement('div', { style: { width: `${m.pct}%`, height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${m.color}, ${m.color}CC)`, transition: 'width 0.5s ease' }})
          ),
          m.label === 'Hydration' && React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: c.cta, marginTop: 4, fontWeight: 600 }}, 'Tap to log water')
        ))
      ),

      // Weekly Spark Chart
      React.createElement('div', { style: { margin: '20px 20px 0', background: c.card, borderRadius: 20, padding: 20, border: `1px solid ${c.cardBorder}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }},
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: c.text }}, 'Weekly Spark'),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: c.cta }}, '2,847 total')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }},
          ...weeklyData.map((d, i) => React.createElement('div', { key: d.day, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }},
            React.createElement('div', { style: {
              width: '100%', height: Math.max(12, (d.spark / maxSpark) * 80),
              borderRadius: 8,
              background: i === 6 ? `linear-gradient(to top, ${c.primary}, ${c.secondary})` : `${c.primary}30`,
              transition: 'height 0.5s ease',
            }}),
            React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: i === 6 ? c.primary : c.textMuted, fontWeight: i === 6 ? 700 : 400 }}, d.day)
          ))
        )
      )
    );
  };

  const ExploreScreen = () => {
    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', padding: '0 0 100px 0' }},
      React.createElement('div', { style: { padding: '16px 20px 0' }},
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: c.text, letterSpacing: -0.5, margin: 0 }}, 'Biome Collection'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, margin: '4px 0 0' }}, `${biomeFragments.filter(f => f.discovered).length} of ${biomeFragments.length} fragments discovered`)
      ),

      // Collection Stats
      React.createElement('div', { style: { margin: '16px 20px', display: 'flex', gap: 10 }},
        ...[
          { label: 'Legendary', count: 2, color: '#8B5CF6' },
          { label: 'Epic', count: 1, color: '#F97316' },
          { label: 'Rare', count: 1, color: '#3B82F6' },
        ].map(stat => React.createElement('div', { key: stat.label, style: {
          flex: 1, background: c.card, borderRadius: 14, padding: '12px 10px',
          border: `1px solid ${c.cardBorder}`, textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        }},
          React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: stat.color, letterSpacing: -0.5 }}, stat.count),
          React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: c.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}, stat.label)
        ))
      ),

      // Fragment Cards
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }},
        ...biomeFragments.map((frag, i) => React.createElement('div', {
          key: frag.id,
          style: {
            background: c.card, borderRadius: 18, padding: 16,
            border: `1px solid ${frag.discovered ? frag.color + '30' : c.cardBorder}`,
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: frag.discovered ? 'pointer' : 'default',
            transition: 'transform 0.15s, box-shadow 0.2s',
            transform: pressed === `frag-${i}` ? 'scale(0.98)' : 'scale(1)',
            boxShadow: frag.discovered ? `0 4px 12px ${frag.color}10` : '0 2px 6px rgba(0,0,0,0.04)',
            opacity: frag.discovered ? 1 : 0.55,
            animation: 'fadeIn 0.4s ease',
            animationDelay: `${i * 0.08}s`,
            animationFillMode: 'both',
          },
          onClick: () => { if (frag.discovered) { setSelectedFragment(frag); setShowFragment(true); }},
          onMouseDown: () => frag.discovered && setPressed(`frag-${i}`),
          onMouseUp: () => setPressed(null),
          onMouseLeave: () => setPressed(null),
        },
          React.createElement('div', { style: {
            width: 52, height: 52, borderRadius: 16,
            background: frag.discovered ? `linear-gradient(135deg, ${frag.color}25, ${frag.color}10)` : c.surfaceAlt,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1.5px solid ${frag.discovered ? frag.color + '40' : c.cardBorder}`,
          }},
            frag.discovered
              ? React.createElement(Icon, { name: frag.icon, size: 24, color: frag.color })
              : React.createElement(Icon, { name: 'HelpCircle', size: 24, color: c.textMuted })
          ),
          React.createElement('div', { style: { flex: 1 }},
            React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: c.text }}, frag.discovered ? frag.name : '???'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }},
              React.createElement('span', { style: {
                fontFamily: font, fontSize: 11, fontWeight: 600, color: frag.color,
                background: `${frag.color}15`, padding: '2px 8px', borderRadius: 8,
              }}, frag.rarity),
              frag.discovered && React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: c.textMuted }}, frag.habitat)
            )
          ),
          React.createElement(Icon, { name: frag.discovered ? 'ChevronRight' : 'Lock', size: 18, color: c.textMuted })
        ))
      )
    );
  };

  const QuestsScreen = () => {
    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', padding: '0 0 100px 0' }},
      React.createElement('div', { style: { padding: '16px 20px 0' }},
        React.createElement('h1', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: c.text, letterSpacing: -0.5, margin: 0 }}, 'Conservation Quests'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, margin: '4px 0 0' }}, 'Complete quests to grow your Bioverse')
      ),

      // Guardian Coach Banner
      React.createElement('div', { style: {
        margin: '16px 20px', borderRadius: 20, padding: 20,
        background: `linear-gradient(135deg, #22C55E15, #16A34A10)`,
        border: `1.5px solid #22C55E30`,
      }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }},
          React.createElement('div', { style: {
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, #22C55E, #16A34A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }},
            React.createElement(Icon, { name: 'Bot', size: 22, color: '#fff' })
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: c.text }}, 'Guardian Coach'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: c.cta, fontWeight: 600 }}, 'Nature Guide')
          )
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, lineHeight: 1.5, margin: 0 }},
          '"Your forest is growing beautifully! Focus on hydration today — your Water Cycle quest is almost complete. Every glass brings new life to your coral reef biome."'
        )
      ),

      // Active Quests
      React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }},
        ...quests.map((quest, i) => React.createElement('div', {
          key: quest.id,
          style: {
            background: c.card, borderRadius: 18, padding: 18,
            border: `1px solid ${c.cardBorder}`,
            boxShadow: `0 4px 12px ${quest.color}08`,
            cursor: 'pointer',
            transition: 'transform 0.15s',
            transform: pressed === `quest-${i}` ? 'scale(0.98)' : 'scale(1)',
            animation: 'slideUp 0.4s ease',
            animationDelay: `${i * 0.1}s`,
            animationFillMode: 'both',
          },
          onClick: () => setSelectedQuest(selectedQuest === i ? null : i),
          onMouseDown: () => setPressed(`quest-${i}`),
          onMouseUp: () => setPressed(null),
          onMouseLeave: () => setPressed(null),
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 }},
            React.createElement('div', { style: {
              width: 48, height: 48, borderRadius: 14,
              background: `linear-gradient(135deg, ${quest.color}20, ${quest.color}08)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1.5px solid ${quest.color}30`,
            }},
              React.createElement(Icon, { name: quest.icon, size: 22, color: quest.color })
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }},
                React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: c.text }}, quest.title),
                React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: quest.color, background: `${quest.color}15`, padding: '2px 8px', borderRadius: 8 }}, quest.theme)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }},
                React.createElement(Icon, { name: 'Zap', size: 12, color: c.primary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: c.primary, fontWeight: 600 }}, `+${quest.spark} Spark`)
              )
            )
          ),
          // Progress
          React.createElement('div', { style: { marginTop: 12 }},
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }},
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, 'Progress'),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: quest.color }}, `${quest.progress}%`)
            ),
            React.createElement('div', { style: { width: '100%', height: 6, borderRadius: 3, background: c.surfaceAlt }},
              React.createElement('div', { style: { width: `${quest.progress}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${quest.color}, ${quest.color}CC)`, transition: 'width 0.5s ease' }})
            )
          ),
          // Expanded description
          selectedQuest === i && React.createElement('div', { style: { marginTop: 12, padding: 12, background: c.surfaceAlt, borderRadius: 12, animation: 'fadeIn 0.3s ease' }},
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, lineHeight: 1.5, margin: 0 }}, quest.desc)
          )
        ))
      ),

      // Eco-Milestones Section
      React.createElement('div', { style: { padding: '24px 20px 0' }},
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: -0.5, margin: '0 0 14px' }}, 'Eco-Milestones'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 }},
          ...ecoMilestones.map((ms, i) => React.createElement('div', {
            key: ms.name,
            style: {
              background: c.card, borderRadius: 16, padding: 14,
              border: `1px solid ${ms.achieved ? c.cta + '30' : c.cardBorder}`,
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: ms.achieved ? 1 : 0.6,
            }
          },
            React.createElement('div', { style: {
              width: 40, height: 40, borderRadius: 12,
              background: ms.achieved ? `${c.cta}15` : c.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }},
              React.createElement(Icon, { name: ms.icon, size: 20, color: ms.achieved ? c.cta : c.textMuted })
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: c.text }}, ms.name),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, ms.desc)
            ),
            ms.achieved && React.createElement('div', { style: {
              fontFamily: font, fontSize: 11, fontWeight: 600, color: c.cta,
              background: `${c.cta}12`, padding: '4px 8px', borderRadius: 8,
            }}, ms.donation)
          ))
        )
      )
    );
  };

  const ProfileScreen = () => {
    const stats = [
      { label: 'Total Spark', value: '42,380', icon: 'Zap', color: c.primary },
      { label: 'Fragments', value: '4/6', icon: 'Gem', color: '#8B5CF6' },
      { label: 'Day Streak', value: '12', icon: 'Flame', color: '#EF4444' },
      { label: 'Donated', value: '$7', icon: 'Heart', color: c.cta },
    ];

    const settings = [
      { label: 'Health App Sync', icon: 'Activity', connected: true },
      { label: 'Notifications', icon: 'Bell', connected: true },
      { label: 'Guardian Coaching', icon: 'Bot', connected: true },
      { label: 'Privacy Settings', icon: 'Shield', connected: false },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease', padding: '0 0 100px 0' }},
      // Profile Header
      React.createElement('div', { style: {
        padding: '24px 20px',
        background: `linear-gradient(135deg, ${c.primary}12, ${c.cta}08)`,
        textAlign: 'center',
      }},
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
          background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px ${c.primary}40`,
          border: `3px solid ${c.card}`,
        }},
          React.createElement(Icon, { name: 'User', size: 36, color: '#fff' })
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: -0.5, margin: 0 }}, 'Alex Rivera'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, margin: '4px 0 0' }}, 'Bioverse Guardian since March 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }},
          React.createElement('span', { style: {
            fontFamily: font, fontSize: 12, fontWeight: 600, color: c.primary,
            background: `${c.primary}15`, padding: '3px 10px', borderRadius: 10,
          }}, 'Level 12'),
          React.createElement('span', { style: {
            fontFamily: font, fontSize: 12, fontWeight: 600, color: c.cta,
            background: `${c.cta}15`, padding: '3px 10px', borderRadius: 10,
          }}, 'Eco Steward')
        )
      ),

      // Stats Grid
      React.createElement('div', { style: { padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }},
        ...stats.map(s => React.createElement('div', { key: s.label, style: {
          background: c.card, borderRadius: 16, padding: 16,
          border: `1px solid ${c.cardBorder}`,
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        }},
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }},
            React.createElement(Icon, { name: s.icon, size: 18, color: s.color })
          ),
          React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: -0.5 }}, s.value),
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, s.label)
        ))
      ),

      // Theme Toggle
      React.createElement('div', { style: { margin: '8px 20px', background: c.card, borderRadius: 16, padding: 16, border: `1px solid ${c.cardBorder}` }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }},
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 }},
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: c.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }},
              React.createElement(Icon, { name: isDark ? 'Moon' : 'Sun', size: 20, color: c.textSecondary })
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: c.text }}, 'Dark Mode'),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: c.textMuted }}, isDark ? 'On' : 'Off')
            )
          ),
          React.createElement('div', {
            style: {
              width: 50, height: 28, borderRadius: 14, cursor: 'pointer',
              background: isDark ? c.cta : c.surfaceAlt,
              position: 'relative', transition: 'background 0.2s',
              border: `1px solid ${isDark ? c.cta : c.cardBorder}`,
            },
            onClick: () => setIsDark(!isDark),
          },
            React.createElement('div', { style: {
              width: 22, height: 22, borderRadius: '50%', background: '#fff',
              position: 'absolute', top: 2, left: isDark ? 25 : 2,
              transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }})
          )
        )
      ),

      // Settings List
      React.createElement('div', { style: { margin: '8px 20px', background: c.card, borderRadius: 16, border: `1px solid ${c.cardBorder}`, overflow: 'hidden' }},
        ...settings.map((s, i) => React.createElement('div', {
          key: s.label,
          style: {
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: i < settings.length - 1 ? `1px solid ${c.cardBorder}` : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }
        },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: c.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }},
            React.createElement(Icon, { name: s.icon, size: 18, color: c.textSecondary })
          ),
          React.createElement('span', { style: { flex: 1, fontFamily: font, fontSize: 15, color: c.text }}, s.label),
          s.connected
            ? React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 600, color: c.cta }}, 'Connected')
            : React.createElement(Icon, { name: 'ChevronRight', size: 18, color: c.textMuted })
        ))
      ),

      // Impact Section
      React.createElement('div', { style: { margin: '16px 20px', background: `linear-gradient(135deg, ${c.cta}10, ${c.primary}08)`, borderRadius: 18, padding: 20, border: `1px solid ${c.cta}20` }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }},
          React.createElement(Icon, { name: 'Globe', size: 18, color: c.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: c.text }}, 'Your Impact')
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: c.textSecondary, lineHeight: 1.5, margin: 0 }},
          'Through your health journey, you\'ve contributed $7 to conservation efforts. Your Bioverse has grown to support 4 unique biome fragments, protecting real-world endangered habitats.'
        )
      )
    );
  };

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    quests: QuestsScreen,
    profile: ProfileScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'quests', label: 'Quests', icon: 'Target' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0', fontFamily: font }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: c.bg, position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
      }
    },
      // Scrollable content area
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }},
        React.createElement(ActiveScreen)
      ),

      // Fragment Modal
      showFragment && React.createElement(FragmentModal, {
        fragment: selectedFragment,
        onClose: () => { setShowFragment(false); setSelectedFragment(null); }
      }),

      // Bottom Navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: c.navBg,
          borderTop: `1px solid ${c.navBorder}`,
          display: 'flex', justifyContent: 'space-around',
          padding: '8px 0 28px',
          zIndex: 50,
        }
      },
        ...navItems.map(item => React.createElement('div', {
          key: item.id,
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', padding: '6px 16px', minWidth: 60, minHeight: 44,
            justifyContent: 'center',
            transition: 'transform 0.15s',
            transform: pressed === `nav-${item.id}` ? 'scale(0.9)' : 'scale(1)',
          },
          onClick: () => setActiveScreen(item.id),
          onMouseDown: () => setPressed(`nav-${item.id}`),
          onMouseUp: () => setPressed(null),
          onMouseLeave: () => setPressed(null),
        },
          React.createElement(Icon, {
            name: item.icon,
            size: 22,
            color: activeScreen === item.id ? c.primary : c.textMuted,
          }),
          React.createElement('span', {
            style: {
              fontFamily: font, fontSize: 11, fontWeight: activeScreen === item.id ? 600 : 400,
              color: activeScreen === item.id ? c.primary : c.textMuted,
            }
          }, item.label)
        ))
      )
    )
  );
}
