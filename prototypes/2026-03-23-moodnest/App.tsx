
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0D0F14',
    surface: '#161B24',
    surfaceAlt: '#1E2535',
    card: '#1A2030',
    cardBorder: '#252D3D',
    text: '#F0F4FF',
    textSub: '#8B93A8',
    textMuted: '#545E76',
    primary: '#7C6AF5',
    primaryLight: '#9B8FF8',
    primaryDark: '#5A49D6',
    primaryGlow: 'rgba(124,106,245,0.25)',
    accent: '#F5A623',
    accentGlow: 'rgba(245,166,35,0.2)',
    green: '#4ECDC4',
    greenGlow: 'rgba(78,205,196,0.2)',
    red: '#FF6B8A',
    navBg: '#111520',
    navBorder: '#1E2535',
    statusBar: '#0D0F14',
    inputBg: '#1A2030',
    toggle: '#7C6AF5',
  },
  light: {
    bg: '#F0F0F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F5F5FF',
    card: '#FFFFFF',
    cardBorder: '#E8E8F0',
    text: '#12131A',
    textSub: '#5A5E72',
    textMuted: '#9899A8',
    primary: '#6B59E8',
    primaryLight: '#8B79F5',
    primaryDark: '#4A39C8',
    primaryGlow: 'rgba(107,89,232,0.15)',
    accent: '#E8920A',
    accentGlow: 'rgba(232,146,10,0.15)',
    green: '#2DB8AF',
    greenGlow: 'rgba(45,184,175,0.15)',
    red: '#E8546A',
    navBg: '#FFFFFF',
    navBorder: '#E8E8F0',
    statusBar: '#F0F0F5',
    inputBg: '#F5F5FF',
    toggle: '#6B59E8',
  }
};

const moodData = [
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#4ECDC4' },
  { id: 'focused', emoji: '🎯', label: 'Focused', color: '#7C6AF5' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#F5A623' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#8B93A8' },
  { id: 'energized', emoji: '⚡', label: 'Energized', color: '#FFD166' },
  { id: 'social', emoji: '🥳', label: 'Social', color: '#FF6B8A' },
  { id: 'stressed', emoji: '😤', label: 'Stressed', color: '#E05C5C' },
  { id: 'creative', emoji: '✨', label: 'Creative', color: '#A855F7' },
];

const goalData = [
  { id: 'work', label: 'Deep Work', icon: '💻' },
  { id: 'rest', label: 'Rest & Recharge', icon: '🛋️' },
  { id: 'social', label: 'Host / Socialize', icon: '👥' },
  { id: 'sleep', label: 'Wind Down', icon: '🌙' },
  { id: 'move', label: 'Move & Exercise', icon: '🏃' },
  { id: 'create', label: 'Be Creative', icon: '🎨' },
];

const recipeData = [
  {
    id: 'calm-after-work',
    title: 'Calm After Work',
    mood: 'Decompressing',
    duration: '4 min',
    steps: 4,
    color: '#4ECDC4',
    icon: '🌿',
    tags: ['Evening', 'Stress Relief'],
    steps_detail: [
      { icon: '💡', action: 'Lighting', detail: 'Dim to 30%, warm 2700K tone' },
      { icon: '🎵', action: 'Sound', detail: 'Play "Forest Rain" ambient loop' },
      { icon: '🪑', action: 'Seating', detail: 'Move to your reset corner chair' },
      { icon: '💧', action: 'Hydration', detail: 'Place water bottle at eye level' },
    ]
  },
  {
    id: 'focus-sprint',
    title: 'Focus Sprint',
    mood: 'Productivity',
    duration: '3 min',
    steps: 3,
    color: '#7C6AF5',
    icon: '🎯',
    tags: ['Daytime', 'Work'],
    steps_detail: [
      { icon: '💡', action: 'Lighting', detail: 'Bright white, 5000K, no shadows' },
      { icon: '🎵', action: 'Sound', detail: 'Low-freq brown noise, 40dB' },
      { icon: '📋', action: 'Surface', detail: 'Clear desk, one notebook visible' },
    ]
  },
  {
    id: 'guest-ready',
    title: 'Guest Ready',
    mood: 'Social',
    duration: '5 min',
    steps: 5,
    color: '#FF6B8A',
    icon: '✨',
    tags: ['Evening', 'Social'],
    steps_detail: [
      { icon: '💡', action: 'Lighting', detail: 'Warm accent lamps, avoid overheads' },
      { icon: '🪴', action: 'Entryway', detail: 'Clear shoes, add a candle' },
      { icon: '🎵', action: 'Sound', detail: 'Lo-fi jazz, moderate volume' },
      { icon: '🛋️', action: 'Seating', detail: 'Face chairs inward, remove clutter' },
      { icon: '🌸', action: 'Scent', detail: 'Light citrus candle or diffuser' },
    ]
  },
  {
    id: 'morning-starter',
    title: 'Morning Starter',
    mood: 'Low Energy',
    duration: '2 min',
    steps: 3,
    color: '#F5A623',
    icon: '🌅',
    tags: ['Morning', 'Gentle'],
    steps_detail: [
      { icon: '💡', action: 'Lighting', detail: 'Natural light, open one blind' },
      { icon: '📐', action: 'Starter Zone', detail: 'Clear 1sqm space beside bed' },
      { icon: '🎵', action: 'Sound', detail: 'Soft piano, 50% volume' },
    ]
  },
];

const insightsData = [
  { id: 1, change: 'Warm light at 30%', outcome: 'Calmer in 8 min', sessions: 14, score: 92, color: '#4ECDC4' },
  { id: 2, change: 'Brown noise on', outcome: 'Focus +34%', sessions: 21, score: 88, color: '#7C6AF5' },
  { id: 3, change: 'Clear desk surface', outcome: 'Less anxious', sessions: 9, score: 79, color: '#F5A623' },
  { id: 4, change: 'Reset corner habit', outcome: 'Work-off in 5min', sessions: 17, score: 95, color: '#FF6B8A' },
];

const weekData = [
  { day: 'M', value: 72 },
  { day: 'T', value: 85 },
  { day: 'W', value: 61 },
  { day: 'T', value: 90 },
  { day: 'F', value: 78 },
  { day: 'S', value: 95 },
  { day: 'S', value: 88 },
];

function StatusBar({ t }) {
  return React.createElement('div', {
    style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 20px 4px', fontSize: 12, fontWeight: 600, color: t.textSub,
    }
  },
    React.createElement('span', null, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
      React.createElement('span', null, '▲'),
      React.createElement('span', null, '▼'),
      React.createElement('span', null, '100%'),
    )
  );
}

function PillBadge({ label, color, t }) {
  return React.createElement('span', {
    style: {
      fontSize: 10, fontWeight: 600, padding: '3px 8px',
      borderRadius: 20, background: color + '22', color: color,
      letterSpacing: 0.3,
    }
  }, label);
}

function HomeScreen({ t, onStartCheckin }) {
  const [pressed, setPressed] = useState(null);

  return React.createElement('div', {
    style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' }
  },
    // Greeting
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 13, marginBottom: 4 } }, 'Monday, March 23'),
      React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700, lineHeight: 1.2 } }, 'How\'s your space\nfeeling today?'),
    ),

    // Check-in CTA
    React.createElement('div', {
      onClick: onStartCheckin,
      onMouseDown: () => setPressed('checkin'),
      onMouseUp: () => setPressed(null),
      style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
        borderRadius: 18, padding: '18px 20px', marginBottom: 20,
        cursor: 'pointer', transform: pressed === 'checkin' ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.15s', boxShadow: `0 8px 32px ${t.primaryGlow}`,
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 4 } }, 'QUICK CHECK-IN'),
          React.createElement('p', { style: { color: '#fff', fontSize: 17, fontWeight: 700 } }, 'Set up your space'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 } }, 'Takes under 2 minutes'),
        ),
        React.createElement('div', { style: { fontSize: 40 } }, '🪄'),
      )
    ),

    // Active recipe if any
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 } }, 'ACTIVE RECIPE'),
      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: 44, height: 44, borderRadius: 12,
            background: '#4ECDC422', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 22,
          }
        }, '🌿'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontWeight: 600, fontSize: 14 } }, 'Calm After Work'),
          React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 4 } },
            React.createElement('div', {
              style: { height: 4, flex: 3, borderRadius: 4, background: '#4ECDC4' }
            }),
            React.createElement('div', {
              style: { height: 4, flex: 1, borderRadius: 4, background: t.cardBorder }
            }),
          ),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 4 } }, '3 of 4 steps complete'),
        ),
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 10,
            background: '#4ECDC422', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#4ECDC4', fontWeight: 700, fontSize: 16,
          }
        }, '▶'),
      )
    ),

    // Today's mood graph
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
        React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1 } }, 'THIS WEEK'),
        React.createElement('p', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'View All'),
      ),
      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 16, padding: '14px 16px',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 } },
          weekData.map((d, i) =>
            React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
              React.createElement('div', {
                style: {
                  width: '100%', height: d.value * 0.55,
                  borderRadius: 6,
                  background: i === 5 ? `linear-gradient(to top, ${t.primary}, ${t.primaryLight})` : t.surfaceAlt,
                  transition: 'all 0.3s',
                }
              }),
              React.createElement('p', { style: { color: i === 5 ? t.primary : t.textMuted, fontSize: 10, fontWeight: 600 } }, d.day),
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '10px 0 0', borderTop: `1px solid ${t.cardBorder}` } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, 'Avg. Wellbeing'),
            React.createElement('p', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, '81%'),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, 'Best Day'),
            React.createElement('p', { style: { color: '#4ECDC4', fontSize: 16, fontWeight: 700 } }, 'Saturday'),
          ),
        )
      )
    ),

    // Quick recipes
    React.createElement('div', null,
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 } }, 'QUICK RECIPES'),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        recipeData.slice(0, 3).map(r =>
          React.createElement('div', {
            key: r.id,
            style: {
              flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`,
              borderRadius: 14, padding: '12px 10px', cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 8 } }, r.icon),
            React.createElement('p', { style: { color: t.text, fontSize: 12, fontWeight: 600, lineHeight: 1.3 } }, r.title),
            React.createElement('p', { style: { color: r.color, fontSize: 10, marginTop: 4 } }, r.duration),
          )
        )
      )
    )
  );
}

function CheckInScreen({ t, onComplete }) {
  const [step, setStep] = useState(0); // 0=mood, 1=goal, 2=result
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const recipe = recipeData[1]; // Focus sprint as result

  if (step === 2) {
    return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: t.primaryGlow, borderRadius: 20, padding: '6px 12px', marginBottom: 12,
          }
        },
          React.createElement('span', { style: { fontSize: 14 } }, '✨'),
          React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'Recipe Ready'),
        ),
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, marginBottom: 6 } }, 'Focus Sprint'),
        React.createElement('p', { style: { color: t.textSub, fontSize: 14 } }, 'Based on your mood and goal, here\'s your personalized space setup:'),
      ),

      // Steps
      React.createElement('div', { style: { marginBottom: 20 } },
        recipe.steps_detail.map((s, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => {
              setActiveStep(i);
              setCompletedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
            },
            style: {
              background: completedSteps.includes(i) ? t.primaryGlow : t.card,
              border: `1px solid ${completedSteps.includes(i) ? t.primary : t.cardBorder}`,
              borderRadius: 14, padding: '14px 16px', marginBottom: 10,
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 14,
            }
          },
            React.createElement('div', { style: { fontSize: 24, width: 36, textAlign: 'center' } }, s.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { color: completedSteps.includes(i) ? t.primary : t.text, fontSize: 14, fontWeight: 600 } }, s.action),
              React.createElement('p', { style: { color: t.textSub, fontSize: 12, marginTop: 2 } }, s.detail),
            ),
            React.createElement('div', {
              style: {
                width: 24, height: 24, borderRadius: 8,
                background: completedSteps.includes(i) ? t.primary : t.cardBorder,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 13, fontWeight: 700,
              }
            }, completedSteps.includes(i) ? '✓' : ''),
          )
        )
      ),

      React.createElement('div', {
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 14, padding: '14px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', null,
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, 'PROGRESS'),
          React.createElement('p', { style: { color: t.text, fontSize: 18, fontWeight: 700 } }, `${completedSteps.length} / ${recipe.steps_detail.length} done`),
        ),
        React.createElement('div', {
          style: {
            width: 48, height: 48, borderRadius: 14,
            background: `conic-gradient(${t.primary} ${completedSteps.length / recipe.steps_detail.length * 360}deg, ${t.cardBorder} 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('div', {
            style: { width: 34, height: 34, borderRadius: 10, background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement('span', { style: { color: t.text, fontSize: 12, fontWeight: 700 } }, `${Math.round(completedSteps.length / recipe.steps_detail.length * 100)}%`)
          )
        )
      ),

      completedSteps.length === recipe.steps_detail.length &&
        React.createElement('div', {
          onClick: onComplete,
          style: {
            background: `linear-gradient(135deg, ${t.green}, #2DB8AF)`,
            borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer',
          }
        },
          React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 15 } }, '🎉 Space Set Up! Mark Complete'),
        )
    );
  }

  if (step === 1) {
    return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14 } },
          [0, 1, 2].map(i => React.createElement('div', {
            key: i, style: { height: 3, flex: 1, borderRadius: 2, background: i <= 1 ? t.primary : t.cardBorder }
          }))
        ),
        React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700 } }, 'What\'s your main goal?'),
        React.createElement('p', { style: { color: t.textSub, fontSize: 14, marginTop: 4 } }, 'I\'ll customize your setup for this.'),
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        goalData.map(g =>
          React.createElement('div', {
            key: g.id,
            onClick: () => setSelectedGoal(g.id),
            style: {
              background: selectedGoal === g.id ? t.primaryGlow : t.card,
              border: `1px solid ${selectedGoal === g.id ? t.primary : t.cardBorder}`,
              borderRadius: 16, padding: '16px 14px', cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 10,
            }
          },
            React.createElement('span', { style: { fontSize: 20 } }, g.icon),
            React.createElement('span', { style: { color: selectedGoal === g.id ? t.primaryLight : t.text, fontSize: 13, fontWeight: 600 } }, g.label),
          )
        )
      ),
      selectedGoal && React.createElement('div', {
        onClick: () => setStep(2),
        style: {
          background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
          borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer', marginTop: 20,
        }
      },
        React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 15 } }, 'Build My Recipe →'),
      )
    );
  }

  return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14 } },
        [0, 1, 2].map(i => React.createElement('div', {
          key: i, style: { height: 3, flex: 1, borderRadius: 2, background: i === 0 ? t.primary : t.cardBorder }
        }))
      ),
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700 } }, 'How are you feeling?'),
      React.createElement('p', { style: { color: t.textSub, fontSize: 14, marginTop: 4 } }, 'Be honest — this shapes your environment.'),
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      moodData.map(m =>
        React.createElement('div', {
          key: m.id,
          onClick: () => setSelectedMood(m.id),
          style: {
            background: selectedMood === m.id ? m.color + '22' : t.card,
            border: `1px solid ${selectedMood === m.id ? m.color : t.cardBorder}`,
            borderRadius: 16, padding: '14px', cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 10,
          }
        },
          React.createElement('span', { style: { fontSize: 22 } }, m.emoji),
          React.createElement('span', { style: { color: selectedMood === m.id ? m.color : t.text, fontSize: 13, fontWeight: 600 } }, m.label),
        )
      )
    ),
    selectedMood && React.createElement('div', {
      onClick: () => setStep(1),
      style: {
        background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
        borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer', marginTop: 20,
      }
    },
      React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 15 } }, 'Next: Set Your Goal →'),
    )
  );
}

function RecipesScreen({ t }) {
  const [activeRecipe, setActiveRecipe] = useState(null);

  if (activeRecipe) {
    const r = recipeData.find(x => x.id === activeRecipe);
    return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
      React.createElement('div', {
        onClick: () => setActiveRecipe(null),
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer' }
      },
        React.createElement('span', { style: { color: t.primary, fontSize: 18 } }, '←'),
        React.createElement('span', { style: { color: t.primary, fontSize: 14, fontWeight: 600 } }, 'All Recipes'),
      ),
      React.createElement('div', {
        style: {
          background: r.color + '15', border: `1px solid ${r.color + '40'}`,
          borderRadius: 20, padding: '20px', marginBottom: 20,
        }
      },
        React.createElement('div', { style: { fontSize: 40, marginBottom: 12 } }, r.icon),
        React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700 } }, r.title),
        React.createElement('p', { style: { color: t.textSub, fontSize: 14, marginTop: 4 } }, r.mood),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 12 } },
          r.tags.map(tag => React.createElement(PillBadge, { key: tag, label: tag, color: r.color, t }))
        ),
        React.createElement('div', { style: { display: 'flex', gap: 20, marginTop: 14 } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, 'DURATION'),
            React.createElement('p', { style: { color: r.color, fontSize: 16, fontWeight: 700 } }, r.duration),
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, 'STEPS'),
            React.createElement('p', { style: { color: r.color, fontSize: 16, fontWeight: 700 } }, r.steps),
          ),
        )
      ),
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 } }, 'ADJUSTMENTS'),
      r.steps_detail.map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, border: `1px solid ${t.cardBorder}`,
            borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 14,
          }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, background: r.color + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }
          }, s.icon),
          React.createElement('div', null,
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, s.action),
            React.createElement('p', { style: { color: t.textSub, fontSize: 12, marginTop: 2 } }, s.detail),
          )
        )
      ),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${r.color}, ${r.color}BB)`,
          borderRadius: 14, padding: '16px', textAlign: 'center', cursor: 'pointer', marginTop: 8,
        }
      },
        React.createElement('p', { style: { color: '#fff', fontWeight: 700, fontSize: 15 } }, 'Start This Recipe'),
      )
    );
  }

  return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700 } }, 'Space Recipes'),
      React.createElement('p', { style: { color: t.textSub, fontSize: 14, marginTop: 4 } }, 'Curated room setups for every moment'),
    ),
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 16, padding: '12px 16px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 10, color: t.textMuted,
      }
    },
      React.createElement('span', { style: { fontSize: 16 } }, '🔍'),
      React.createElement('span', { style: { fontSize: 14 } }, 'Search recipes...'),
    ),
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
      ['All', 'Morning', 'Work', 'Evening', 'Social'].map(cat =>
        React.createElement('div', {
          key: cat,
          style: {
            background: cat === 'All' ? t.primary : t.card,
            border: `1px solid ${cat === 'All' ? t.primary : t.cardBorder}`,
            borderRadius: 20, padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
            color: cat === 'All' ? '#fff' : t.textSub, fontSize: 13, fontWeight: 600,
          }
        }, cat)
      )
    ),
    recipeData.map(r =>
      React.createElement('div', {
        key: r.id,
        onClick: () => setActiveRecipe(r.id),
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, padding: '16px', marginBottom: 14, cursor: 'pointer',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 14 } },
          React.createElement('div', {
            style: {
              width: 52, height: 52, borderRadius: 16, background: r.color + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              flexShrink: 0,
            }
          }, r.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, r.title),
            React.createElement('p', { style: { color: t.textSub, fontSize: 12, marginTop: 2 } }, r.mood),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
              r.tags.map(tag => React.createElement(PillBadge, { key: tag, label: tag, color: r.color, t }))
            ),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('p', { style: { color: r.color, fontSize: 13, fontWeight: 700 } }, r.duration),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11, marginTop: 2 } }, `${r.steps} steps`),
          )
        )
      )
    )
  );
}

function InsightsScreen({ t }) {
  return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700 } }, 'Your Insights'),
      React.createElement('p', { style: { color: t.textSub, fontSize: 14, marginTop: 4 } }, 'What actually works for your space'),
    ),

    // Summary card
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}22, ${t.surfaceAlt})`,
        border: `1px solid ${t.primary}44`,
        borderRadius: 18, padding: '18px', marginBottom: 20,
      }
    },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 } }, 'YOUR PLAYBOOK SUMMARY'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
        [
          { label: 'Recipes Used', value: '61', color: t.primary },
          { label: 'Insights Found', value: '14', color: t.green },
          { label: 'Streak Days', value: '18', color: t.accent },
        ].map(s =>
          React.createElement('div', { key: s.label, style: { textAlign: 'center' } },
            React.createElement('p', { style: { color: s.color, fontSize: 24, fontWeight: 800 } }, s.value),
            React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, s.label),
          )
        )
      )
    ),

    React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 } }, 'TOP PATTERNS'),
    insightsData.map(ins =>
      React.createElement('div', {
        key: ins.id,
        style: {
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 16, padding: '16px', marginBottom: 12,
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600 } }, ins.change),
          React.createElement('div', {
            style: {
              background: ins.color + '22', borderRadius: 8, padding: '4px 10px',
              color: ins.color, fontSize: 12, fontWeight: 700,
            }
          }, `${ins.score}%`),
        ),
        React.createElement('p', { style: { color: t.textSub, fontSize: 13, marginBottom: 10 } }, `→ ${ins.outcome}`),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', {
            style: { flex: 1, height: 6, borderRadius: 4, background: t.cardBorder, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                width: `${ins.score}%`, height: '100%', borderRadius: 4,
                background: `linear-gradient(90deg, ${ins.color}, ${ins.color}AA)`,
              }
            })
          ),
          React.createElement('p', { style: { color: t.textMuted, fontSize: 11 } }, `${ins.sessions} sessions`),
        )
      )
    ),

    // Mood pattern ring chart placeholder
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 18, padding: '18px', marginTop: 4,
      }
    },
      React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14 } }, 'MOOD DISTRIBUTION'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 14 } },
        React.createElement('div', {
          style: {
            width: 100, height: 100, borderRadius: '50%',
            background: `conic-gradient(#7C6AF5 30%, #4ECDC4 30% 58%, #F5A623 58% 75%, #FF6B8A 75%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('div', {
            style: { width: 60, height: 60, borderRadius: '50%', background: t.card }
          })
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' } },
        [
          { label: 'Focused 30%', color: '#7C6AF5' },
          { label: 'Calm 28%', color: '#4ECDC4' },
          { label: 'Anxious 17%', color: '#F5A623' },
          { label: 'Social 25%', color: '#FF6B8A' },
        ].map(d =>
          React.createElement('div', { key: d.label, style: { display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 2, background: d.color } }),
            React.createElement('p', { style: { color: t.textSub, fontSize: 11 } }, d.label),
          )
        )
      )
    )
  );
}

function SettingsScreen({ t, isDark, onToggle }) {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(true);

  const ToggleSwitch = ({ value, onChange, color }) =>
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
        background: value ? (color || t.primary) : t.cardBorder,
        transition: 'background 0.3s', position: 'relative',
      }
    },
      React.createElement('div', {
        style: {
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 3, left: value ? 21 : 3,
          transition: 'left 0.3s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }
      })
    );

  return React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px 20px 20px' } },
    React.createElement('div', { style: { marginBottom: 20 } },
      React.createElement('h2', { style: { color: t.text, fontSize: 22, fontWeight: 700 } }, 'Settings'),
    ),

    // Profile
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 18, padding: '16px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 14,
      }
    },
      React.createElement('div', {
        style: {
          width: 52, height: 52, borderRadius: 16,
          background: `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }
      }, '🏠'),
      React.createElement('div', null,
        React.createElement('p', { style: { color: t.text, fontSize: 16, fontWeight: 700 } }, 'Alex\'s Nest'),
        React.createElement('p', { style: { color: t.textSub, fontSize: 12 } }, '1-bed apartment · 3 rooms set up'),
      )
    ),

    // Appearance
    React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 } }, 'APPEARANCE'),
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 16, padding: '4px 0', marginBottom: 20,
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('span', { style: { fontSize: 18 } }, isDark ? '🌙' : '☀️'),
          React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 500 } }, isDark ? 'Dark Mode' : 'Light Mode'),
        ),
        React.createElement(ToggleSwitch, { value: isDark, onChange: onToggle, color: t.primary }),
      )
    ),

    // Notifications
    React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 } }, 'NOTIFICATIONS'),
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 16, padding: '4px 0', marginBottom: 20,
      }
    },
      [
        { icon: '⏰', label: 'Morning check-in reminder', value: toggle1, setter: setToggle1 },
        { icon: '🌆', label: 'Evening wind-down prompt', value: toggle2, setter: setToggle2 },
        { icon: '🤝', label: 'Household sync alerts', value: toggle3, setter: setToggle3 },
      ].map((item, i, arr) =>
        React.createElement('div', {
          key: item.label,
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.cardBorder}` : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('span', { style: { fontSize: 18 } }, item.icon),
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 500 } }, item.label),
          ),
          React.createElement(ToggleSwitch, { value: item.value, onChange: item.setter }),
        )
      )
    ),

    // Household
    React.createElement('p', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 } }, 'HOUSEHOLD'),
    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 16, padding: '4px 0', marginBottom: 20,
      }
    },
      [
        { icon: '👤', label: 'Alex (You)' },
        { icon: '👤', label: 'Jordan · Housemate' },
      ].map((m, i) =>
        React.createElement('div', {
          key: m.label,
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: i === 0 ? `1px solid ${t.cardBorder}` : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: 10,
                background: i === 0 ? t.primaryGlow : t.greenGlow,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }
            }, m.icon),
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 500 } }, m.label),
          ),
          React.createElement('p', { style: { color: t.primary, fontSize: 13, fontWeight: 600 } }, 'Online'),
        )
      )
    ),

    React.createElement('div', {
      style: {
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement('span', { style: { fontSize: 18 } }, '➕'),
        React.createElement('p', { style: { color: t.primary, fontSize: 14, fontWeight: 600 } }, 'Invite Housemate'),
      ),
    )
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  // Load Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
    document.body.style.background = '#e8e8e8';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.padding = '20px 0';
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'checkin', label: 'Check In', icon: window.lucide.Sparkles },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.BookOpen },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, { t, onStartCheckin: () => setActiveTab('checkin') }),
    checkin: () => React.createElement(CheckInScreen, { t, onComplete: () => setActiveTab('home') }),
    recipes: () => React.createElement(RecipesScreen, { t }),
    insights: () => React.createElement(InsightsScreen, { t }),
    settings: () => React.createElement(SettingsScreen, { t, isDark, onToggle: () => setIsDark(!isDark) }),
  };

  return React.createElement('div', {
    style: {
      width: 375, height: 812, background: t.bg,
      borderRadius: 44, overflow: 'hidden',
      boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 0 10px #1a1a1a, 0 0 0 11px #2a2a2a',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
    }
  },
    // Dynamic Island
    React.createElement('div', {
      style: {
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }
    },
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' } }),
      React.createElement('div', { style: { width: 18, height: 18, borderRadius: '50%', background: '#111', border: '1px solid #222' } }),
    ),

    // Status bar
    React.createElement(StatusBar, { t }),

    // Main content area
    React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 8 } },
      React.createElement(screens[activeTab])
    ),

    // Bottom nav
    React.createElement('div', {
      style: {
        background: t.navBg, borderTop: `1px solid ${t.navBorder}`,
        padding: '10px 0 20px', display: 'flex', alignItems: 'center',
      }
    },
      tabs.map(tab =>
        React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: {
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', padding: '6px 0',
          }
        },
          tab.id === 'checkin'
            ? React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 16, marginTop: -20,
                  background: activeTab === 'checkin' ? `linear-gradient(135deg, ${t.primary}, ${t.primaryDark})` : t.surfaceAlt,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: activeTab === 'checkin' ? `0 8px 20px ${t.primaryGlow}` : 'none',
                }
              },
                React.createElement(tab.icon, { size: 20, color: activeTab === 'checkin' ? '#fff' : t.textMuted, strokeWidth: 2 })
              )
            : React.createElement(tab.icon, {
                size: 22,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
              }),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: 600,
              color: activeTab === tab.id ? t.primary : t.textMuted,
            }
          }, tab.label)
        )
      )
    )
  );
}
