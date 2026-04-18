const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#2E5C4E',
  secondary: '#E1C38B',
  cta: '#FF6B35',
  background: '#F7F7F0',
  backgroundDark: '#1A1A1A',
  cardDark: '#2A2A2A',
  textDark: '#E8E8E8',
  textSecondaryDark: '#999',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textCaption: '#999999',
  border: '#E8E5DB',
  borderDark: '#3A3A3A',
  success: '#4CAF50',
  card: '#FFFFFF',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [bloomPoints, setBloomPoints] = useState(1247);
  const [streak, setStreak] = useState(12);
  const [todayLogged, setTodayLogged] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cookingStep, setCookingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([
    { name: 'Salmon fillet (2 pieces)', checked: false, category: 'Protein' },
    { name: 'Fresh dill', checked: false, category: 'Herbs' },
    { name: 'Lemon (2)', checked: true, category: 'Produce' },
    { name: 'Capers', checked: false, category: 'Pantry' },
    { name: 'Arborio rice', checked: false, category: 'Grains' },
    { name: 'Parmesan cheese', checked: true, category: 'Dairy' },
    { name: 'White wine', checked: false, category: 'Pantry' },
    { name: 'Mushrooms (mixed)', checked: false, category: 'Produce' },
    { name: 'Shallots (3)', checked: false, category: 'Produce' },
    { name: 'Vegetable broth', checked: true, category: 'Pantry' },
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [animatingPoints, setAnimatingPoints] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [challengeJoined, setChallengeJoined] = useState(false);

  const theme = {
    bg: isDark ? COLORS.backgroundDark : COLORS.background,
    card: isDark ? COLORS.cardDark : COLORS.card,
    text: isDark ? COLORS.textDark : COLORS.text,
    textSecondary: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
    border: isDark ? COLORS.borderDark : COLORS.border,
  };

  useEffect(() => {
    let interval;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const logMeal = () => {
    if (!todayLogged) {
      setTodayLogged(true);
      setStreak(prev => prev + 1);
      setBloomPoints(prev => prev + 50);
      setAnimatingPoints(true);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setAnimatingPoints(false);
      }, 2000);
    }
  };

  const icons = {
    home: window.lucide?.Home,
    flame: window.lucide?.Flame,
    book: window.lucide?.BookOpen,
    shopping: window.lucide?.ShoppingCart,
    user: window.lucide?.User,
    star: window.lucide?.Star,
    clock: window.lucide?.Clock,
    check: window.lucide?.Check,
    checkCircle: window.lucide?.CheckCircle,
    circle: window.lucide?.Circle,
    chevronRight: window.lucide?.ChevronRight,
    chevronLeft: window.lucide?.ChevronLeft,
    plus: window.lucide?.Plus,
    trophy: window.lucide?.Trophy,
    leaf: window.lucide?.Leaf,
    sun: window.lucide?.Sun,
    moon: window.lucide?.Moon,
    play: window.lucide?.Play,
    pause: window.lucide?.Pause,
    timer: window.lucide?.Timer,
    lock: window.lucide?.Lock,
    unlock: window.lucide?.Unlock,
    sparkles: window.lucide?.Sparkles,
    heart: window.lucide?.Heart,
    users: window.lucide?.Users,
    award: window.lucide?.Award,
    target: window.lucide?.Target,
    zap: window.lucide?.Zap,
    utensils: window.lucide?.Utensils,
    flower: window.lucide?.Flower2,
    globe: window.lucide?.Globe,
    sprout: window.lucide?.Sprout,
    x: window.lucide?.X,
  };

  const Icon = ({ name, size = 20, color = theme.text, style = {} }) => {
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  const recipes = [
    { id: 1, name: 'Herb-Crusted Salmon', time: '25 min', difficulty: 'Medium', points: 30, garden: 'Seaside Kitchen', image: '🐟', unlocked: true, category: 'Seafood' },
    { id: 2, name: 'Mushroom Risotto', time: '40 min', difficulty: 'Hard', points: 50, garden: 'Italian Garden', image: '🍄', unlocked: true, category: 'Italian' },
    { id: 3, name: 'Thai Green Curry', time: '35 min', difficulty: 'Medium', points: 35, garden: 'Global Gourmet', image: '🍛', unlocked: true, category: 'Asian' },
    { id: 4, name: 'Sourdough Bread', time: '4 hrs', difficulty: 'Expert', points: 80, garden: 'Artisan Bakery', image: '🍞', unlocked: false, category: 'Baking' },
    { id: 5, name: 'Miso Ramen', time: '1 hr', difficulty: 'Hard', points: 60, garden: 'Global Gourmet', image: '🍜', unlocked: true, category: 'Asian' },
    { id: 6, name: 'Garden Caprese', time: '10 min', difficulty: 'Easy', points: 15, garden: 'Beginner Bistro', image: '🥗', unlocked: true, category: 'Salad' },
  ];

  const gardens = [
    { name: 'Beginner Bistro', icon: '🌱', recipes: 8, unlocked: 8, tier: 'Seedling', color: '#7BC47F' },
    { name: 'Italian Garden', icon: '🇮🇹', recipes: 12, unlocked: 7, tier: 'Sprout', color: '#E88B6A' },
    { name: 'Global Gourmet', icon: '🌍', recipes: 15, unlocked: 5, tier: 'Bloom', color: '#6BA3E8' },
    { name: 'Seaside Kitchen', icon: '🌊', recipes: 10, unlocked: 4, tier: 'Bloom', color: '#5BBCBF' },
    { name: 'Artisan Bakery', icon: '🥖', recipes: 8, unlocked: 1, tier: 'Harvest', color: '#D4A96A' },
    { name: 'Seasonal Harvest', icon: '🍂', recipes: 10, unlocked: 0, tier: 'Locked', color: '#999' },
  ];

  const cookingSteps = [
    { title: 'Prepare the Salmon', description: 'Pat salmon fillets dry with paper towels. Season generously with salt and pepper on both sides.', timer: 0 },
    { title: 'Make Herb Crust', description: 'Combine fresh dill, parsley, lemon zest, breadcrumbs, and olive oil in a bowl. Mix until well combined.', timer: 0 },
    { title: 'Apply the Crust', description: 'Press the herb mixture firmly onto the top of each salmon fillet, creating an even layer.', timer: 0 },
    { title: 'Sear the Salmon', description: 'Heat olive oil in an oven-safe skillet over medium-high. Sear salmon skin-side down for 3 minutes.', timer: 180 },
    { title: 'Bake Until Done', description: 'Transfer skillet to preheated 400°F oven. Bake for 10-12 minutes until crust is golden and salmon flakes easily.', timer: 660 },
    { title: 'Rest & Serve', description: 'Let salmon rest for 2 minutes. Serve with lemon wedges, capers, and your choice of side.', timer: 120 },
  ];

  const challenges = [
    { name: 'Meatless Monday Master', desc: 'Cook 3 vegetarian dishes this week', participants: 1243, bonus: 100, progress: 1, total: 3, emoji: '🥬' },
    { name: 'Spice Trail Explorer', desc: 'Use 5 different spices in one dish', participants: 876, bonus: 75, progress: 0, total: 1, emoji: '🌶️' },
    { name: 'Breakfast Revolution', desc: 'Make a unique breakfast every day for 5 days', participants: 2105, bonus: 150, progress: 3, total: 5, emoji: '🥞' },
  ];

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekLogged = [true, true, true, true, true, todayLogged, false];

  // ============ HOME SCREEN ============
  const HomeScreen = () => {
    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        overflowY: 'auto',
        height: '100%',
      }
    },
      // Header
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 60,
          paddingBottom: 8,
        }
      },
        React.createElement('div', {},
          React.createElement('div', {
            style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT }
          }, 'Good evening,'),
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: '700', color: theme.text, fontFamily: FONT }
          }, 'Chef Alex 👨‍🍳'),
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: theme.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }
          }, React.createElement(Icon, { name: isDark ? 'sun' : 'moon', size: 18, color: COLORS.secondary })),
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 4,
              background: `linear-gradient(135deg, ${COLORS.secondary}22, ${COLORS.secondary}44)`,
              padding: '6px 12px', borderRadius: 20,
            }
          },
            React.createElement(Icon, { name: 'flower', size: 16, color: COLORS.secondary }),
            React.createElement('span', {
              style: {
                fontSize: 15, fontWeight: '700', color: COLORS.primary, fontFamily: FONT,
                transition: 'all 0.3s ease',
                transform: animatingPoints ? 'scale(1.3)' : 'scale(1)',
              }
            }, bloomPoints),
          ),
        ),
      ),

      // Streak Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}DD)`,
          borderRadius: 24,
          padding: 24,
          marginTop: 20,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20,
            width: 120, height: 120,
            borderRadius: 60,
            background: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, left: -10,
            width: 80, height: 80,
            borderRadius: 40,
            background: 'rgba(255,255,255,0.05)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }
        },
          React.createElement('div', {},
            React.createElement('div', {
              style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: FONT, letterSpacing: 1, textTransform: 'uppercase' }
            }, 'Culinary Streak'),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }
            },
              React.createElement('span', {
                style: { fontSize: 48, fontWeight: '800', color: COLORS.white, fontFamily: FONT }
              }, streak),
              React.createElement('span', {
                style: { fontSize: 17, color: 'rgba(255,255,255,0.8)', fontFamily: FONT }
              }, 'days'),
            ),
            React.createElement('div', {
              style: { fontSize: 13, color: COLORS.secondary, fontFamily: FONT, marginTop: 2 }
            }, '🔥 Personal best: 18 days'),
          ),
          React.createElement(Icon, { name: 'flame', size: 48, color: COLORS.cta }),
        ),

        // Week tracker
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 20, position: 'relative' }
        },
          weekDays.map((day, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }
            },
              React.createElement('span', {
                style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: FONT }
              }, day),
              React.createElement('div', {
                style: {
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: weekLogged[i] ? COLORS.secondary : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  transform: weekLogged[i] ? 'scale(1)' : 'scale(0.9)',
                }
              },
                weekLogged[i]
                  ? React.createElement(Icon, { name: 'check', size: 16, color: COLORS.primary })
                  : React.createElement('div', {
                    style: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' }
                  }),
              ),
            )
          ),
        ),

        // Log meal button
        React.createElement('button', {
          onClick: logMeal,
          style: {
            width: '100%',
            padding: '14px 0',
            marginTop: 20,
            borderRadius: 16,
            border: 'none',
            backgroundColor: todayLogged ? 'rgba(255,255,255,0.15)' : COLORS.cta,
            color: COLORS.white,
            fontSize: 17,
            fontWeight: '600',
            fontFamily: FONT,
            cursor: todayLogged ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.3s ease',
          }
        },
          todayLogged
            ? React.createElement(React.Fragment, null,
              React.createElement(Icon, { name: 'checkCircle', size: 20, color: COLORS.secondary }),
              "Today's Meal Logged! +50 BP"
            )
            : React.createElement(React.Fragment, null,
              React.createElement(Icon, { name: 'plus', size: 20, color: COLORS.white }),
              "Log Today's Meal"
            ),
        ),
      ),

      // Quick Stats
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginTop: 20 }
      },
        [
          { label: 'Recipes Made', value: '47', icon: 'utensils', color: COLORS.cta },
          { label: 'Gardens', value: '4/6', icon: 'leaf', color: COLORS.success },
          { label: 'Tier', value: 'Bloom', icon: 'flower', color: COLORS.secondary },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              backgroundColor: theme.card,
              borderRadius: 16,
              padding: '16px 12px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                backgroundColor: stat.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px',
              }
            }, React.createElement(Icon, { name: stat.icon, size: 18, color: stat.color })),
            React.createElement('div', {
              style: { fontSize: 20, fontWeight: '700', color: theme.text, fontFamily: FONT }
            }, stat.value),
            React.createElement('div', {
              style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 }
            }, stat.label),
          )
        ),
      ),

      // Weekly Challenge
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT }
          }, 'Weekly Challenge'),
          React.createElement('span', {
            onClick: () => { setActiveScreen('community'); setActiveTab('community'); },
            style: { fontSize: 15, color: COLORS.cta, fontFamily: FONT, cursor: 'pointer' }
          }, 'See all'),
        ),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${COLORS.cta}10, ${COLORS.secondary}20)`,
            borderRadius: 20,
            padding: 20,
            border: `1px solid ${COLORS.cta}20`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 12 }
          },
            React.createElement('div', { style: { fontSize: 40 } }, '🥬'),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontWeight: '600', color: theme.text, fontFamily: FONT }
              }, 'Meatless Monday Master'),
              React.createElement('div', {
                style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 }
              }, 'Cook 3 vegetarian dishes this week'),
              React.createElement('div', {
                style: {
                  height: 6, backgroundColor: theme.border, borderRadius: 3, marginTop: 10,
                  overflow: 'hidden',
                }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', width: '33%', backgroundColor: COLORS.cta,
                    borderRadius: 3, transition: 'width 0.5s ease',
                  }
                }),
              ),
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 }
              },
                React.createElement('span', { style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT } }, '1 of 3 completed'),
                React.createElement('span', { style: { fontSize: 11, color: COLORS.cta, fontWeight: '600', fontFamily: FONT } }, '+100 BP'),
              ),
            ),
          ),
        ),
      ),

      // Recommended Recipes
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT }
          }, 'Recommended'),
          React.createElement('span', {
            onClick: () => { setActiveScreen('gardens'); setActiveTab('gardens'); },
            style: { fontSize: 15, color: COLORS.cta, fontFamily: FONT, cursor: 'pointer' }
          }, 'View all'),
        ),
        React.createElement('div', {
          style: { display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginRight: -20 }
        },
          recipes.filter(r => r.unlocked).slice(0, 4).map(recipe =>
            React.createElement('div', {
              key: recipe.id,
              onClick: () => {
                setSelectedRecipe(recipe);
                setCookingStep(0);
                setCompletedSteps([]);
                setActiveScreen('cooking');
              },
              style: {
                minWidth: 160,
                backgroundColor: theme.card,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease',
              }
            },
              React.createElement('div', {
                style: {
                  height: 100,
                  background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}30)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 48,
                }
              }, recipe.image),
              React.createElement('div', { style: { padding: '12px 14px 16px' } },
                React.createElement('div', {
                  style: { fontSize: 15, fontWeight: '600', color: theme.text, fontFamily: FONT }
                }, recipe.name),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }
                },
                  React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: 3 }
                  },
                    React.createElement(Icon, { name: 'clock', size: 12, color: theme.textSecondary }),
                    React.createElement('span', {
                      style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT }
                    }, recipe.time),
                  ),
                  React.createElement('div', {
                    style: {
                      fontSize: 11, color: COLORS.cta, fontWeight: '600',
                      backgroundColor: COLORS.cta + '15',
                      padding: '2px 6px', borderRadius: 6, fontFamily: FONT,
                    }
                  }, `+${recipe.points} BP`),
                ),
              ),
            )
          ),
        ),
      ),
    );
  };

  // ============ GARDENS SCREEN ============
  const GardensScreen = () => {
    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 8 }
      },
        React.createElement('div', {
          style: { fontSize: 34, fontWeight: '800', color: theme.text, fontFamily: FONT }
        }, 'Recipe Gardens'),
        React.createElement('div', {
          style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT, marginTop: 4 }
        }, 'Unlock new gardens as your streak grows'),
      ),

      // Bloom Tier Progress
      React.createElement('div', {
        style: {
          backgroundColor: theme.card,
          borderRadius: 20,
          padding: 20,
          marginTop: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
          React.createElement('div', {},
            React.createElement('div', {
              style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, textTransform: 'uppercase', letterSpacing: 0.5 }
            }, 'Current Tier'),
            React.createElement('div', {
              style: { fontSize: 22, fontWeight: '700', color: COLORS.primary, fontFamily: FONT, marginTop: 2 }
            }, '🌸 Bloom'),
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', {
              style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT }
            }, 'Next: Harvest'),
            React.createElement('div', {
              style: { fontSize: 15, fontWeight: '600', color: COLORS.cta, fontFamily: FONT, marginTop: 2 }
            }, '350 BP to go'),
          ),
        ),
        React.createElement('div', {
          style: {
            height: 8, backgroundColor: theme.border, borderRadius: 4, marginTop: 16,
            overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: '72%',
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
              borderRadius: 4,
              transition: 'width 1s ease',
            }
          }),
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 }
        },
          ['🌱 Seedling', '🌿 Sprout', '🌸 Bloom', '🌾 Harvest', '🌳 Master'].map((tier, i) =>
            React.createElement('span', {
              key: i,
              style: {
                fontSize: 10, fontFamily: FONT,
                color: i <= 2 ? COLORS.primary : theme.textSecondary,
                fontWeight: i === 2 ? '700' : '400',
              }
            }, tier)
          ),
        ),
      ),

      // Gardens Grid
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        gardens.map((garden, i) =>
          React.createElement('div', {
            key: i,
            style: {
              backgroundColor: theme.card,
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: garden.tier === 'Locked' ? 0.5 : 1,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              cursor: garden.tier !== 'Locked' ? 'pointer' : 'default',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: {
                width: 56, height: 56, borderRadius: 16,
                backgroundColor: garden.color + '15',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
              }
            }, garden.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontSize: 17, fontWeight: '600', color: theme.text, fontFamily: FONT }
              }, garden.name),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }
              },
                React.createElement('span', {
                  style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT }
                }, `${garden.unlocked}/${garden.recipes} recipes`),
                React.createElement('div', {
                  style: {
                    fontSize: 11, padding: '2px 8px', borderRadius: 8,
                    backgroundColor: garden.color + '20', color: garden.color,
                    fontWeight: '600', fontFamily: FONT,
                  }
                }, garden.tier),
              ),
              React.createElement('div', {
                style: {
                  height: 4, backgroundColor: theme.border, borderRadius: 2, marginTop: 8,
                  overflow: 'hidden',
                }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', width: `${(garden.unlocked / garden.recipes) * 100}%`,
                    backgroundColor: garden.color, borderRadius: 2,
                  }
                }),
              ),
            ),
            garden.tier === 'Locked'
              ? React.createElement(Icon, { name: 'lock', size: 20, color: theme.textSecondary })
              : React.createElement(Icon, { name: 'chevronRight', size: 20, color: theme.textSecondary }),
          )
        ),
      ),
    );
  };

  // ============ COOKING SCREEN ============
  const CookingScreen = () => {
    const recipe = selectedRecipe || recipes[0];
    const step = cookingSteps[cookingStep];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      // Header
      React.createElement('div', {
        style: {
          paddingTop: 56,
          display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 8,
        }
      },
        React.createElement('div', {
          onClick: () => { setActiveScreen('home'); setActiveTab('home'); },
          style: {
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: theme.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }
        }, React.createElement(Icon, { name: 'chevronLeft', size: 20 })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontSize: 17, fontWeight: '600', color: theme.text, fontFamily: FONT }
          }, 'Guided Cooking'),
        ),
        React.createElement('div', {
          style: {
            fontSize: 13, color: COLORS.cta, fontWeight: '600',
            backgroundColor: COLORS.cta + '15',
            padding: '4px 10px', borderRadius: 12, fontFamily: FONT,
          }
        }, `+${recipe.points} BP`),
      ),

      // Recipe Header Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}25)`,
          borderRadius: 24,
          padding: 24,
          marginTop: 12,
          textAlign: 'center',
        }
      },
        React.createElement('div', { style: { fontSize: 64 } }, recipe.image),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginTop: 8 }
        }, recipe.name),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'clock', size: 14, color: theme.textSecondary }),
            React.createElement('span', { style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT } }, recipe.time),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'target', size: 14, color: theme.textSecondary }),
            React.createElement('span', { style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT } }, recipe.difficulty),
          ),
        ),
      ),

      // Step Progress
      React.createElement('div', {
        style: { display: 'flex', gap: 4, marginTop: 20 }
      },
        cookingSteps.map((_, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, height: 4, borderRadius: 2,
              backgroundColor: completedSteps.includes(i) ? COLORS.success :
                i === cookingStep ? COLORS.cta : theme.border,
              transition: 'background-color 0.3s ease',
            }
          })
        ),
      ),
      React.createElement('div', {
        style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginTop: 8, textAlign: 'center' }
      }, `Step ${cookingStep + 1} of ${cookingSteps.length}`),

      // Current Step
      React.createElement('div', {
        style: {
          backgroundColor: theme.card,
          borderRadius: 20,
          padding: 24,
          marginTop: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: `2px solid ${completedSteps.includes(cookingStep) ? COLORS.success : COLORS.cta}30`,
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: completedSteps.includes(cookingStep) ? COLORS.success : COLORS.cta,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: COLORS.white, fontSize: 15, fontWeight: '700', fontFamily: FONT,
            }
          }, completedSteps.includes(cookingStep)
            ? React.createElement(Icon, { name: 'check', size: 18, color: COLORS.white })
            : (cookingStep + 1)),
          React.createElement('div', {
            style: { fontSize: 20, fontWeight: '700', color: theme.text, fontFamily: FONT }
          }, step.title),
        ),
        React.createElement('div', {
          style: { fontSize: 17, color: theme.textSecondary, fontFamily: FONT, lineHeight: 1.6 }
        }, step.description),

        // Timer (if applicable)
        step.timer > 0 && React.createElement('div', {
          style: {
            marginTop: 20,
            backgroundColor: theme.bg,
            borderRadius: 16,
            padding: 16,
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: { fontSize: 36, fontWeight: '800', color: COLORS.cta, fontFamily: FONT }
          }, timerRunning ? formatTime(timerSeconds) : formatTime(step.timer)),
          React.createElement('button', {
            onClick: () => {
              if (timerRunning) {
                setTimerRunning(false);
              } else {
                setTimerSeconds(step.timer);
                setTimerRunning(true);
              }
            },
            style: {
              marginTop: 10,
              padding: '8px 24px',
              borderRadius: 12,
              border: 'none',
              backgroundColor: COLORS.cta,
              color: COLORS.white,
              fontSize: 15,
              fontWeight: '600',
              fontFamily: FONT,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }
          },
            React.createElement(Icon, { name: timerRunning ? 'pause' : 'play', size: 16, color: COLORS.white }),
            timerRunning ? 'Pause' : 'Start Timer',
          ),
        ),

        // Complete Step Button
        React.createElement('button', {
          onClick: () => {
            if (!completedSteps.includes(cookingStep)) {
              setCompletedSteps([...completedSteps, cookingStep]);
            }
          },
          style: {
            width: '100%',
            padding: '14px 0',
            marginTop: 20,
            borderRadius: 14,
            border: completedSteps.includes(cookingStep) ? `2px solid ${COLORS.success}` : 'none',
            backgroundColor: completedSteps.includes(cookingStep) ? COLORS.success + '10' : COLORS.primary,
            color: completedSteps.includes(cookingStep) ? COLORS.success : COLORS.white,
            fontSize: 17,
            fontWeight: '600',
            fontFamily: FONT,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }
        },
          completedSteps.includes(cookingStep)
            ? React.createElement(React.Fragment, null,
              React.createElement(Icon, { name: 'checkCircle', size: 20, color: COLORS.success }),
              'Step Completed'
            )
            : React.createElement(React.Fragment, null,
              React.createElement(Icon, { name: 'check', size: 20, color: COLORS.white }),
              'Mark as Complete'
            ),
        ),
      ),

      // Navigation Buttons
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginTop: 16 }
      },
        React.createElement('button', {
          onClick: () => cookingStep > 0 && setCookingStep(cookingStep - 1),
          disabled: cookingStep === 0,
          style: {
            flex: 1, padding: '14px 0', borderRadius: 14,
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.card,
            color: cookingStep === 0 ? theme.textSecondary : theme.text,
            fontSize: 15, fontWeight: '600', fontFamily: FONT,
            cursor: cookingStep === 0 ? 'default' : 'pointer',
            opacity: cookingStep === 0 ? 0.5 : 1,
          }
        }, '← Previous'),
        React.createElement('button', {
          onClick: () => {
            if (cookingStep < cookingSteps.length - 1) {
              setCookingStep(cookingStep + 1);
            } else if (completedSteps.length === cookingSteps.length) {
              setBloomPoints(prev => prev + recipe.points);
              setActiveScreen('home');
              setActiveTab('home');
            }
          },
          style: {
            flex: 1, padding: '14px 0', borderRadius: 14,
            border: 'none',
            backgroundColor: cookingStep === cookingSteps.length - 1 ? COLORS.success : COLORS.cta,
            color: COLORS.white,
            fontSize: 15, fontWeight: '600', fontFamily: FONT,
            cursor: 'pointer',
          }
        }, cookingStep === cookingSteps.length - 1 ? 'Finish! 🎉' : 'Next →'),
      ),
    );
  };

  // ============ SHOPPING SCREEN ============
  const ShoppingScreen = () => {
    const toggleItem = (index) => {
      setShoppingItems(prev => prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      ));
    };

    const categories = [...new Set(shoppingItems.map(i => i.category))];
    const checkedCount = shoppingItems.filter(i => i.checked).length;

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 8 }
      },
        React.createElement('div', {
          style: { fontSize: 34, fontWeight: '800', color: theme.text, fontFamily: FONT }
        }, 'Shopping List'),
        React.createElement('div', {
          style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT, marginTop: 4 }
        }, `${checkedCount}/${shoppingItems.length} items checked`),
      ),

      // Progress
      React.createElement('div', {
        style: {
          height: 6, backgroundColor: theme.border, borderRadius: 3, marginTop: 12,
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            height: '100%',
            width: `${(checkedCount / shoppingItems.length) * 100}%`,
            backgroundColor: COLORS.success,
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }
        }),
      ),

      // Smart Pantry Badge
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 8,
          backgroundColor: COLORS.success + '10',
          borderRadius: 12, padding: '10px 14px',
          marginTop: 16,
        }
      },
        React.createElement(Icon, { name: 'sparkles', size: 16, color: COLORS.success }),
        React.createElement('span', {
          style: { fontSize: 13, color: COLORS.success, fontFamily: FONT, fontWeight: '500' }
        }, '3 items already in your pantry - removed from list'),
      ),

      // Recipe Sources
      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto',
        }
      },
        ['All Items', '🐟 Herb Salmon', '🍄 Risotto'].map((label, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: '8px 16px', borderRadius: 20,
              backgroundColor: i === 0 ? COLORS.primary : theme.card,
              color: i === 0 ? COLORS.white : theme.text,
              fontSize: 13, fontWeight: '600', fontFamily: FONT,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              border: i === 0 ? 'none' : `1px solid ${theme.border}`,
            }
          }, label)
        ),
      ),

      // Items by Category
      categories.map(cat =>
        React.createElement('div', { key: cat, style: { marginTop: 24 } },
          React.createElement('div', {
            style: {
              fontSize: 13, fontWeight: '600', color: theme.textSecondary,
              fontFamily: FONT, textTransform: 'uppercase', letterSpacing: 0.5,
              marginBottom: 8,
            }
          }, cat),
          shoppingItems
            .map((item, originalIndex) => ({ ...item, originalIndex }))
            .filter(item => item.category === cat)
            .map(item =>
              React.createElement('div', {
                key: item.originalIndex,
                onClick: () => toggleItem(item.originalIndex),
                style: {
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  backgroundColor: theme.card,
                  borderRadius: 14,
                  marginBottom: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  border: `1px solid ${theme.border}`,
                }
              },
                React.createElement('div', {
                  style: {
                    width: 24, height: 24, borderRadius: 12,
                    border: item.checked ? 'none' : `2px solid ${theme.border}`,
                    backgroundColor: item.checked ? COLORS.success : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }
                },
                  item.checked && React.createElement(Icon, { name: 'check', size: 14, color: COLORS.white }),
                ),
                React.createElement('span', {
                  style: {
                    fontSize: 17, fontFamily: FONT,
                    color: item.checked ? theme.textSecondary : theme.text,
                    textDecoration: item.checked ? 'line-through' : 'none',
                    transition: 'all 0.2s ease',
                  }
                }, item.name),
              )
            ),
        )
      ),
    );
  };

  // ============ COMMUNITY SCREEN ============
  const CommunityScreen = () => {
    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 8 }
      },
        React.createElement('div', {
          style: { fontSize: 34, fontWeight: '800', color: theme.text, fontFamily: FONT }
        }, 'Community'),
        React.createElement('div', {
          style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT, marginTop: 4 }
        }, 'Cook-offs, challenges & inspiration'),
      ),

      // Active Challenges
      React.createElement('div', {
        style: { marginTop: 20 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginBottom: 12 }
        }, '🏆 Active Challenges'),
        challenges.map((challenge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              backgroundColor: theme.card,
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'flex-start', gap: 14 }
            },
              React.createElement('div', {
                style: {
                  width: 50, height: 50, borderRadius: 14,
                  backgroundColor: COLORS.cta + '12',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0,
                }
              }, challenge.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { fontSize: 17, fontWeight: '600', color: theme.text, fontFamily: FONT }
                }, challenge.name),
                React.createElement('div', {
                  style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 }
                }, challenge.desc),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }
                },
                  React.createElement(Icon, { name: 'users', size: 12, color: theme.textSecondary }),
                  React.createElement('span', {
                    style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT }
                  }, `${challenge.participants.toLocaleString()} participants`),
                  React.createElement('span', {
                    style: {
                      fontSize: 11, color: COLORS.cta, fontWeight: '700',
                      backgroundColor: COLORS.cta + '15',
                      padding: '2px 6px', borderRadius: 6, fontFamily: FONT,
                    }
                  }, `+${challenge.bonus} BP`),
                ),
                // Progress bar
                React.createElement('div', {
                  style: {
                    height: 6, backgroundColor: theme.border, borderRadius: 3, marginTop: 10,
                    overflow: 'hidden',
                  }
                },
                  React.createElement('div', {
                    style: {
                      height: '100%',
                      width: `${(challenge.progress / challenge.total) * 100}%`,
                      backgroundColor: challenge.progress === challenge.total ? COLORS.success : COLORS.cta,
                      borderRadius: 3,
                    }
                  }),
                ),
                React.createElement('div', {
                  style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT, marginTop: 4 }
                }, `${challenge.progress} of ${challenge.total} completed`),
              ),
            ),
            i === 0 && React.createElement('button', {
              onClick: () => setChallengeJoined(!challengeJoined),
              style: {
                width: '100%',
                padding: '12px 0',
                marginTop: 14,
                borderRadius: 12,
                border: challengeJoined ? `2px solid ${COLORS.success}` : 'none',
                backgroundColor: challengeJoined ? COLORS.success + '10' : COLORS.cta,
                color: challengeJoined ? COLORS.success : COLORS.white,
                fontSize: 15, fontWeight: '600', fontFamily: FONT,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }
            },
              challengeJoined
                ? React.createElement(React.Fragment, null,
                  React.createElement(Icon, { name: 'checkCircle', size: 18, color: COLORS.success }),
                  'Joined!'
                )
                : React.createElement(React.Fragment, null,
                  React.createElement(Icon, { name: 'zap', size: 18, color: COLORS.white }),
                  'Join Challenge'
                ),
            ),
          )
        ),
      ),

      // Leaderboard
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginBottom: 12 }
        }, '🥇 Weekly Leaderboard'),
        [
          { name: 'Chef Maria', points: 2450, avatar: '👩‍🍳', rank: 1 },
          { name: 'You (Alex)', points: 1247, avatar: '👨‍🍳', rank: 2, isYou: true },
          { name: 'CookingKim', points: 1180, avatar: '🧑‍🍳', rank: 3 },
          { name: 'TasteExplorer', points: 990, avatar: '👩‍🍳', rank: 4 },
        ].map((user, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              backgroundColor: user.isYou ? COLORS.primary + '08' : theme.card,
              borderRadius: 14,
              marginBottom: 6,
              border: user.isYou ? `2px solid ${COLORS.primary}30` : `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: {
                fontSize: 17, fontWeight: '800', color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : theme.textSecondary,
                fontFamily: FONT, width: 24, textAlign: 'center',
              }
            }, `#${user.rank}`),
            React.createElement('div', { style: { fontSize: 32 } }, user.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontSize: 15, fontWeight: '600', fontFamily: FONT,
                  color: user.isYou ? COLORS.primary : theme.text,
                }
              }, user.name),
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(Icon, { name: 'flower', size: 14, color: COLORS.secondary }),
              React.createElement('span', {
                style: { fontSize: 15, fontWeight: '700', color: theme.text, fontFamily: FONT }
              }, user.points.toLocaleString()),
            ),
          )
        ),
      ),

      // Community Dish Feed
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginBottom: 12 }
        }, '📸 Community Dishes'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
        },
          [
            { emoji: '🍝', name: 'Pasta Primavera', user: 'Maria', likes: 42 },
            { emoji: '🍣', name: 'Sushi Platter', user: 'Kim', likes: 38 },
            { emoji: '🥘', name: 'Tagine', user: 'Omar', likes: 27 },
            { emoji: '🧁', name: 'Red Velvet Cupcakes', user: 'Sarah', likes: 56 },
          ].map((dish, i) =>
            React.createElement('div', {
              key: i,
              style: {
                backgroundColor: theme.card,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }
            },
              React.createElement('div', {
                style: {
                  height: 100,
                  background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}25)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 48,
                }
              }, dish.emoji),
              React.createElement('div', { style: { padding: '10px 12px' } },
                React.createElement('div', {
                  style: { fontSize: 13, fontWeight: '600', color: theme.text, fontFamily: FONT }
                }, dish.name),
                React.createElement('div', {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }
                },
                  React.createElement('span', {
                    style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT }
                  }, `by ${dish.user}`),
                  React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', gap: 3 }
                  },
                    React.createElement(Icon, { name: 'heart', size: 12, color: '#FF6B6B' }),
                    React.createElement('span', {
                      style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT }
                    }, dish.likes),
                  ),
                ),
              ),
            )
          ),
        ),
      ),
    );
  };

  // ============ PROFILE SCREEN ============
  const ProfileScreen = () => {
    const preferences = [
      { name: 'Mediterranean', active: true },
      { name: 'Asian Fusion', active: true },
      { name: 'Vegetarian', active: false },
      { name: 'Baking', active: true },
      { name: 'Quick Meals', active: false },
      { name: 'Low Carb', active: false },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', {
        style: { paddingTop: 60, paddingBottom: 8 }
      },
        React.createElement('div', {
          style: { fontSize: 34, fontWeight: '800', color: theme.text, fontFamily: FONT }
        }, 'Profile'),
      ),

      // Profile Card
      React.createElement('div', {
        style: {
          backgroundColor: theme.card,
          borderRadius: 24,
          padding: 24,
          marginTop: 12,
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 40,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto', fontSize: 40,
          }
        }, '👨‍🍳'),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginTop: 12 }
        }, 'Chef Alex'),
        React.createElement('div', {
          style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 }
        }, 'Member since March 2024'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 4,
            backgroundColor: COLORS.secondary + '20',
            padding: '4px 12px', borderRadius: 12, marginTop: 8,
          }
        },
          React.createElement('span', { style: { fontSize: 14 } }, '🌸'),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: '600', color: COLORS.primary, fontFamily: FONT }
          }, 'Bloom Tier'),
        ),

        // Stats Row
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-around', marginTop: 24, paddingTop: 20, borderTop: `1px solid ${theme.border}` }
        },
          [
            { label: 'Bloom Points', value: bloomPoints.toLocaleString() },
            { label: 'Streak', value: `${streak} days` },
            { label: 'Recipes', value: '47' },
          ].map((s, i) =>
            React.createElement('div', { key: i },
              React.createElement('div', {
                style: { fontSize: 20, fontWeight: '700', color: COLORS.primary, fontFamily: FONT }
              }, s.value),
              React.createElement('div', {
                style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 }
              }, s.label),
            )
          ),
        ),
      ),

      // Taste Profile
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        },
          React.createElement(Icon, { name: 'sparkles', size: 20, color: COLORS.cta }),
          React.createElement('span', {
            style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT }
          }, 'Taste Profile'),
        ),
        React.createElement('div', {
          style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginBottom: 12 }
        }, 'AI-curated based on your cooking history'),
        React.createElement('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: 8 }
        },
          preferences.map((pref, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '8px 16px',
                borderRadius: 20,
                backgroundColor: pref.active ? COLORS.primary + '15' : theme.card,
                border: `1px solid ${pref.active ? COLORS.primary + '40' : theme.border}`,
                color: pref.active ? COLORS.primary : theme.textSecondary,
                fontSize: 14, fontWeight: pref.active ? '600' : '400',
                fontFamily: FONT,
                cursor: 'pointer',
              }
            }, pref.name)
          ),
        ),
      ),

      // Achievements
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginBottom: 12 }
        }, '🏅 Achievements'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }
        },
          [
            { emoji: '🔥', name: '7-Day Streak', earned: true },
            { emoji: '🌍', name: 'World Explorer', earned: true },
            { emoji: '⭐', name: 'First Recipe', earned: true },
            { emoji: '🎯', name: '10 Recipes', earned: true },
            { emoji: '👨‍🍳', name: 'Master Chef', earned: false },
            { emoji: '🏆', name: 'Challenge Win', earned: false },
          ].map((ach, i) =>
            React.createElement('div', {
              key: i,
              style: {
                backgroundColor: theme.card,
                borderRadius: 16,
                padding: 16,
                textAlign: 'center',
                opacity: ach.earned ? 1 : 0.4,
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                border: `1px solid ${theme.border}`,
              }
            },
              React.createElement('div', { style: { fontSize: 32 } }, ach.emoji),
              React.createElement('div', {
                style: { fontSize: 11, color: theme.text, fontFamily: FONT, marginTop: 6, fontWeight: '500' }
              }, ach.name),
            )
          ),
        ),
      ),

      // Settings
      React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '700', color: theme.text, fontFamily: FONT, marginBottom: 12 }
        }, 'Settings'),
        [
          { label: 'Dark Mode', icon: isDark ? 'moon' : 'sun', toggle: true },
          { label: 'Voice Guidance', icon: 'utensils', toggle: true },
          { label: 'Notifications', icon: 'zap', toggle: true },
        ].map((setting, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              backgroundColor: theme.card,
              borderRadius: 14,
              marginBottom: 6,
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement(Icon, { name: setting.icon, size: 18, color: COLORS.primary }),
            React.createElement('span', {
              style: { flex: 1, fontSize: 17, color: theme.text, fontFamily: FONT }
            }, setting.label),
            setting.toggle && React.createElement('div', {
              onClick: setting.label === 'Dark Mode' ? () => setIsDark(!isDark) : undefined,
              style: {
                width: 48, height: 28, borderRadius: 14,
                backgroundColor: (setting.label === 'Dark Mode' ? isDark : i === 1) ? COLORS.primary : theme.border,
                padding: 2, cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'flex', alignItems: 'center',
              }
            },
              React.createElement('div', {
                style: {
                  width: 24, height: 24, borderRadius: 12,
                  backgroundColor: COLORS.white,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  transform: (setting.label === 'Dark Mode' ? isDark : i === 1) ? 'translateX(20px)' : 'translateX(0)',
                }
              }),
            ),
          )
        ),
      ),
    );
  };

  const screens = {
    home: HomeScreen,
    gardens: GardensScreen,
    cooking: CookingScreen,
    shopping: ShoppingScreen,
    community: CommunityScreen,
    profile: ProfileScreen,
  };

  const tabItems = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'gardens', label: 'Gardens', icon: 'leaf' },
    { key: 'shopping', label: 'Shop', icon: 'shopping' },
    { key: 'community', label: 'Community', icon: 'users' },
    { key: 'profile', label: 'Profile', icon: 'user' },
  ];

  // Celebration overlay
  const CelebrationOverlay = () => {
    if (!showCelebration) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
      }
    },
      React.createElement('div', {
        style: {
          backgroundColor: COLORS.primary + 'E8',
          borderRadius: 24,
          padding: '32px 48px',
          textAlign: 'center',
          animation: 'none',
          transform: 'scale(1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }
      },
        React.createElement('div', { style: { fontSize: 56 } }, '🎉'),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '800', color: COLORS.white, fontFamily: FONT, marginTop: 8 }
        }, 'Streak Extended!'),
        React.createElement('div', {
          style: { fontSize: 15, color: COLORS.secondary, fontFamily: FONT, marginTop: 4 }
        }, `${streak + 1} days • +50 Bloom Points`),
      ),
    );
  };

  return React.createElement('div', {
    style: {
      width: '100vw',
      height: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        backgroundColor: theme.bg,
        position: 'relative',
        boxShadow: '0 20px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      }
    },
      // Status Bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 48,
          zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: 8,
        }
      },
        React.createElement('div', {
          style: {
            width: 120, height: 5, borderRadius: 3,
            backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          }
        }),
      ),

      // Screen Content
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }
      },
        React.createElement(screens[activeScreen] || HomeScreen),
      ),

      // Celebration
      React.createElement(CelebrationOverlay),

      // Tab Bar
      activeScreen !== 'cooking' && React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 88,
          backgroundColor: theme.card,
          borderTop: `0.5px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 8,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
        }
      },
        tabItems.map(tab =>
          React.createElement('div', {
            key: tab.key,
            onClick: () => { setActiveScreen(tab.key); setActiveTab(tab.key); },
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }
          },
            React.createElement('div', {
              style: {
                padding: 4,
                transform: activeTab === tab.key ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }
            },
              React.createElement(Icon, {
                name: tab.icon,
                size: 22,
                color: activeTab === tab.key ? COLORS.cta : theme.textSecondary,
              }),
            ),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? COLORS.cta : theme.textSecondary,
                fontFamily: FONT,
              }
            }, tab.label),
          )
        ),
      ),

      // Home Indicator
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
          zIndex: 51,
        }
      }),
    ),
  );
}