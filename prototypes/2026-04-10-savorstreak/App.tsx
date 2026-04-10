const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#2979FF',
  secondary: '#FF5252',
  cta: '#EC4899',
  bg: '#FAFAFA',
  darkBg: '#1A1A2E',
  darkCard: '#252540',
  darkText: '#E8E8E8',
  darkSecondary: '#A0A0B0',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState(7);
  const [cookedToday, setCookedToday] = useState(false);
  const [unlockedRecipes, setUnlockedRecipes] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [pantryItems, setPantryItems] = useState([
    { name: 'Olive Oil', have: true },
    { name: 'Garlic', have: true },
    { name: 'Pasta', have: true },
    { name: 'Tomatoes', have: false },
    { name: 'Basil', have: true },
    { name: 'Parmesan', have: false },
    { name: 'Chicken Breast', have: true },
    { name: 'Lemon', have: false },
    { name: 'Rice', have: true },
    { name: 'Soy Sauce', have: true },
  ]);
  const [activeBadges, setActiveBadges] = useState(['flame', 'star', 'chef']);
  const [communityTab, setCommunityTab] = useState('feed');

  const theme = {
    bg: darkMode ? COLORS.darkBg : COLORS.bg,
    card: darkMode ? COLORS.darkCard : '#FFFFFF',
    text: darkMode ? COLORS.darkText : '#1A1A1A',
    secondary: darkMode ? COLORS.darkSecondary : '#8E8E93',
    border: darkMode ? '#3A3A50' : '#E5E5EA',
  };

  const recipes = [
    { name: 'Pasta Aglio e Olio', emoji: '🍝', difficulty: 'Easy', time: '20 min', category: 'Italian' },
    { name: 'Chicken Teriyaki', emoji: '🍗', difficulty: 'Medium', time: '35 min', category: 'Japanese' },
    { name: 'Caesar Salad', emoji: '🥗', difficulty: 'Easy', time: '15 min', category: 'American' },
    { name: 'Pad Thai', emoji: '🍜', difficulty: 'Medium', time: '30 min', category: 'Thai' },
    { name: 'Mushroom Risotto', emoji: '🍄', difficulty: 'Hard', time: '45 min', category: 'Italian' },
    { name: 'Fish Tacos', emoji: '🌮', difficulty: 'Medium', time: '25 min', category: 'Mexican' },
    { name: 'French Onion Soup', emoji: '🍲', difficulty: 'Medium', time: '60 min', category: 'French' },
    { name: 'Sushi Rolls', emoji: '🍣', difficulty: 'Hard', time: '50 min', category: 'Japanese' },
    { name: 'Beef Bourguignon', emoji: '🥩', difficulty: 'Hard', time: '90 min', category: 'French' },
    { name: 'Crème Brûlée', emoji: '🍮', difficulty: 'Hard', time: '60 min', category: 'French' },
    { name: 'Butter Chicken', emoji: '🍛', difficulty: 'Medium', time: '40 min', category: 'Indian' },
    { name: 'Pho Bo', emoji: '🥘', difficulty: 'Hard', time: '120 min', category: 'Vietnamese' },
  ];

  const challenges = [
    { name: 'Mediterranean Week', emoji: '🫒', progress: 3, total: 7, reward: '+2 Streak Days', color: '#4CAF50' },
    { name: 'One-Pot Wonders', emoji: '🍳', progress: 1, total: 5, reward: 'Exclusive Recipe', color: '#FF9800' },
    { name: 'Bake & Create', emoji: '🧁', progress: 0, total: 4, reward: 'Baker Badge', color: COLORS.cta },
  ];

  const communityPosts = [
    { user: 'Chef Maria', avatar: '👩‍🍳', streak: 42, dish: 'Homemade Ramen', emoji: '🍜', likes: 234, time: '2h ago' },
    { user: 'Alex K.', avatar: '👨‍🍳', streak: 28, dish: 'Sourdough Bread', emoji: '🍞', likes: 189, time: '4h ago' },
    { user: 'Foodie Sam', avatar: '🧑‍🍳', streak: 15, dish: 'Thai Green Curry', emoji: '🍛', likes: 156, time: '6h ago' },
    { user: 'Nina C.', avatar: '👩‍🍳', streak: 63, dish: 'Tiramisu', emoji: '🍰', likes: 312, time: '8h ago' },
  ];

  const handleCookToday = () => {
    if (!cookedToday) {
      setCookedToday(true);
      setStreak(s => s + 1);
      const nextUnlock = unlockedRecipes.length;
      if (nextUnlock < recipes.length) {
        setUnlockedRecipes(prev => [...prev, nextUnlock]);
      }
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const Icon = ({ name, size = 24, color = theme.text, strokeWidth = 2 }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
    return React.createElement(LucideIcon, { size, color, strokeWidth });
  };

  const BottomNav = () => {
    const tabs = [
      { id: 'home', icon: 'Flame', label: 'Dashboard' },
      { id: 'discover', icon: 'Grid3x3', label: 'Discover' },
      { id: 'pantry', icon: 'ShoppingBasket', label: 'Pantry' },
      { id: 'challenges', icon: 'Trophy', label: 'Challenges' },
      { id: 'community', icon: 'Users', label: 'Community' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        background: theme.card,
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 8,
        paddingBottom: 20,
        zIndex: 100,
      }
    }, tabs.map(tab =>
      React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          transform: activeScreen === tab.id ? 'scale(1.1)' : 'scale(1)',
        }
      },
        React.createElement(Icon, {
          name: tab.icon,
          size: 22,
          color: activeScreen === tab.id ? COLORS.primary : theme.secondary,
        }),
        React.createElement('span', {
          style: {
            fontSize: 10,
            fontFamily: FONT,
            fontWeight: activeScreen === tab.id ? '600' : '400',
            color: activeScreen === tab.id ? COLORS.primary : theme.secondary,
          }
        }, tab.label)
      )
    ));
  };

  const StatusBar = () => React.createElement('div', {
    style: {
      height: 44,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      fontSize: 15,
      fontWeight: '600',
      fontFamily: FONT,
      color: theme.text,
    }
  },
    React.createElement('span', null, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(Icon, { name: 'Signal', size: 16, color: theme.text }),
      React.createElement(Icon, { name: 'Wifi', size: 16, color: theme.text }),
      React.createElement(Icon, { name: 'Battery', size: 16, color: theme.text })
    )
  );

  const HomeScreen = () => {
    const progressPercent = (streak % 7) / 7 * 100;
    const nextMilestone = Math.ceil(streak / 7) * 7;

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 100 }
    },
      React.createElement(StatusBar),
      // Header
      React.createElement('div', {
        style: { padding: '0 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontSize: 34, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: 0 }
          }, 'SavorStreak'),
          React.createElement('p', {
            style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
          }, 'Keep cooking, keep discovering')
        ),
        React.createElement('div', {
          onClick: () => setDarkMode(!darkMode),
          style: {
            width: 44, height: 44, borderRadius: 22,
            background: darkMode ? '#3A3A50' : '#F2F2F7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: theme.text }))
      ),

      // Streak Card
      React.createElement('div', {
        style: {
          margin: '0 20px 20px',
          background: `linear-gradient(135deg, ${COLORS.primary}, #1565C0)`,
          borderRadius: 20,
          padding: 24,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: 60, background: 'rgba(255,255,255,0.1)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -20, left: -20, width: 80, height: 80,
            borderRadius: 40, background: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 15, fontFamily: FONT, color: 'rgba(255,255,255,0.8)', margin: 0 }
            }, 'Current Streak'),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }
            },
              React.createElement('span', {
                style: { fontSize: 56, fontWeight: '800', fontFamily: FONT, color: '#FFF', lineHeight: 1 }
              }, streak),
              React.createElement('span', {
                style: { fontSize: 22, fontWeight: '600', fontFamily: FONT, color: 'rgba(255,255,255,0.8)' }
              }, 'days')
            )
          ),
          React.createElement('div', {
            style: { fontSize: 48, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }
          }, '🔥')
        ),
        // Progress bar
        React.createElement('div', null,
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 }
          },
            React.createElement('span', {
              style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.7)' }
            }, `Next milestone: Day ${nextMilestone}`),
            React.createElement('span', {
              style: { fontSize: 13, fontFamily: FONT, color: 'rgba(255,255,255,0.9)', fontWeight: '600' }
            }, `${Math.round(progressPercent)}%`)
          ),
          React.createElement('div', {
            style: { height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg, #FFD54F, #FFF176)',
                width: `${progressPercent}%`,
                transition: 'width 0.8s ease',
              }
            })
          )
        )
      ),

      // Cook Today Button
      React.createElement('div', { style: { margin: '0 20px 24px' } },
        React.createElement('button', {
          onClick: handleCookToday,
          style: {
            width: '100%',
            height: 56,
            borderRadius: 16,
            border: 'none',
            background: cookedToday
              ? 'linear-gradient(135deg, #4CAF50, #388E3C)'
              : `linear-gradient(135deg, ${COLORS.cta}, #D81B60)`,
            color: '#FFF',
            fontSize: 17,
            fontWeight: '700',
            fontFamily: FONT,
            cursor: cookedToday ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.3s ease',
            transform: cookedToday ? 'scale(1)' : 'scale(1)',
            boxShadow: cookedToday ? '0 4px 12px rgba(76,175,80,0.3)' : `0 4px 16px rgba(236,72,153,0.4)`,
          }
        },
          React.createElement(Icon, { name: cookedToday ? 'Check' : 'ChefHat', size: 20, color: '#FFF' }),
          cookedToday ? 'Cooked Today! 🎉' : 'I Cooked Today!'
        )
      ),

      // Weekly Overview
      React.createElement('div', { style: { margin: '0 20px 24px' } },
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 16px' }
        }, 'This Week'),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between' }
        },
          ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const isActive = i < (streak % 7);
            const isToday = i === (streak % 7) - (cookedToday ? 1 : 0);
            return React.createElement('div', {
              key: i,
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 12,
                  background: isActive ? COLORS.primary : (darkMode ? '#3A3A50' : '#F2F2F7'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isToday ? `0 2px 8px ${COLORS.primary}40` : 'none',
                }
              },
                isActive
                  ? React.createElement(Icon, { name: 'Check', size: 18, color: '#FFF' })
                  : React.createElement('span', {
                    style: { fontSize: 13, color: theme.secondary, fontFamily: FONT }
                  }, '')
              ),
              React.createElement('span', {
                style: {
                  fontSize: 13, fontFamily: FONT, fontWeight: isToday ? '700' : '500',
                  color: isToday ? COLORS.primary : theme.secondary,
                }
              }, day)
            );
          })
        )
      ),

      // Suggested Recipe
      React.createElement('div', { style: { margin: '0 20px 24px' } },
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 16px' }
        }, 'Suggested for You'),
        React.createElement('div', {
          onClick: () => { setSelectedRecipe(recipes[streak % recipes.length]); setActiveScreen('discover'); },
          style: {
            background: theme.card,
            borderRadius: 20,
            padding: 20,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.cta}20)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
            }
          }, recipes[streak % recipes.length].emoji),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontSize: 17, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: 0 }
            }, recipes[streak % recipes.length].name),
            React.createElement('p', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
            }, `${recipes[streak % recipes.length].time} • ${recipes[streak % recipes.length].difficulty}`)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 20, color: theme.secondary })
        )
      ),

      // Motivational nudge
      React.createElement('div', {
        style: {
          margin: '0 20px 24px',
          background: `linear-gradient(135deg, ${COLORS.secondary}15, ${COLORS.secondary}05)`,
          borderRadius: 16,
          padding: 16,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          border: `1px solid ${COLORS.secondary}20`,
        }
      },
        React.createElement('span', { style: { fontSize: 28 } }, '💪'),
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontSize: 15, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: 0 }
          }, 'Keep it up!'),
          React.createElement('p', {
            style: { fontSize: 13, fontFamily: FONT, color: theme.secondary, margin: '2px 0 0' }
          }, `Only ${nextMilestone - streak} more days to unlock a new recipe!`)
        )
      )
    );
  };

  const DiscoverScreen = () => {
    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 100 }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: 0 }
        }, 'Discovery Grid'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
        }, `${unlockedRecipes.length}/${recipes.length} recipes unlocked`)
      ),

      // Grid
      React.createElement('div', {
        style: {
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }
      },
        recipes.map((recipe, i) => {
          const isUnlocked = unlockedRecipes.includes(i);
          return React.createElement('div', {
            key: i,
            onClick: () => isUnlocked && setSelectedRecipe(recipe),
            style: {
              aspectRatio: '1',
              borderRadius: 16,
              background: isUnlocked
                ? theme.card
                : (darkMode ? '#2A2A40' : '#E8E8ED'),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: isUnlocked ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: isUnlocked ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }
          },
            isUnlocked
              ? React.createElement(React.Fragment, null,
                React.createElement('span', { style: { fontSize: 32 } }, recipe.emoji),
                React.createElement('span', {
                  style: {
                    fontSize: 11, fontWeight: '600', fontFamily: FONT, color: theme.text,
                    textAlign: 'center', padding: '0 4px', lineHeight: 1.2,
                  }
                }, recipe.name)
              )
              : React.createElement(React.Fragment, null,
                React.createElement('div', {
                  style: {
                    fontSize: 32, filter: 'blur(8px) grayscale(1)', opacity: 0.4,
                  }
                }, recipe.emoji),
                React.createElement(Icon, { name: 'Lock', size: 16, color: theme.secondary }),
                React.createElement('span', {
                  style: { fontSize: 10, fontFamily: FONT, color: theme.secondary }
                }, `Day ${i + 1}`)
              )
          );
        })
      ),

      // Recipe Detail Modal
      selectedRecipe && React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: theme.bg,
          zIndex: 200,
          overflowY: 'auto',
        }
      },
        React.createElement('div', {
          style: {
            height: 200,
            background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.cta}30)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            position: 'relative',
          }
        },
          selectedRecipe.emoji,
          React.createElement('div', {
            onClick: () => setSelectedRecipe(null),
            style: {
              position: 'absolute', top: 50, left: 16,
              width: 36, height: 36, borderRadius: 18,
              background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          }, React.createElement(Icon, { name: 'ArrowLeft', size: 20, color: '#FFF' }))
        ),
        React.createElement('div', { style: { padding: 20 } },
          React.createElement('h1', {
            style: { fontSize: 28, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 8px' }
          }, selectedRecipe.name),
          React.createElement('div', {
            style: { display: 'flex', gap: 12, marginBottom: 20 }
          },
            [
              { icon: 'Clock', text: selectedRecipe.time },
              { icon: 'BarChart3', text: selectedRecipe.difficulty },
              { icon: 'Globe', text: selectedRecipe.category },
            ].map((item, idx) =>
              React.createElement('div', {
                key: idx,
                style: {
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: darkMode ? '#3A3A50' : '#F2F2F7',
                  padding: '6px 10px', borderRadius: 8,
                }
              },
                React.createElement(Icon, { name: item.icon, size: 14, color: COLORS.primary }),
                React.createElement('span', {
                  style: { fontSize: 13, fontFamily: FONT, color: theme.text, fontWeight: '500' }
                }, item.text)
              )
            )
          ),
          React.createElement('h3', {
            style: { fontSize: 20, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 12px' }
          }, "Chef's Eye Guide"),
          ['Prepare all ingredients', 'Heat pan to medium-high', 'Cook protein until golden', 'Add sauce and simmer', 'Plate and garnish'].map((step, idx) =>
            React.createElement('div', {
              key: idx,
              style: {
                display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12,
                padding: 12, background: theme.card, borderRadius: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }
            },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                  background: COLORS.primary, color: '#FFF', fontSize: 13, fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT,
                }
              }, idx + 1),
              React.createElement('span', {
                style: { fontSize: 15, fontFamily: FONT, color: theme.text, lineHeight: 1.4 }
              }, step)
            )
          ),
          React.createElement('button', {
            style: {
              width: '100%', height: 52, borderRadius: 14, border: 'none',
              background: `linear-gradient(135deg, ${COLORS.primary}, #1565C0)`,
              color: '#FFF', fontSize: 17, fontWeight: '600', fontFamily: FONT,
              cursor: 'pointer', marginTop: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }
          },
            React.createElement(Icon, { name: 'Play', size: 18, color: '#FFF' }),
            'Start Cooking'
          )
        )
      )
    );
  };

  const PantryScreen = () => {
    const [shoppingMode, setShoppingMode] = useState(false);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 100 }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: 0 }
        }, 'Smart Pantry'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
        }, 'Manage ingredients & shopping list')
      ),

      // Toggle
      React.createElement('div', {
        style: {
          margin: '0 20px 20px',
          background: darkMode ? '#3A3A50' : '#F2F2F7',
          borderRadius: 12,
          padding: 3,
          display: 'flex',
        }
      },
        ['Pantry', 'Shopping List'].map((label, idx) =>
          React.createElement('div', {
            key: label,
            onClick: () => setShoppingMode(idx === 1),
            style: {
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              background: (shoppingMode === (idx === 1)) ? theme.card : 'transparent',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '600',
              fontFamily: FONT,
              color: (shoppingMode === (idx === 1)) ? theme.text : theme.secondary,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: (shoppingMode === (idx === 1)) ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }
          }, label)
        )
      ),

      // Items
      React.createElement('div', { style: { padding: '0 20px' } },
        pantryItems
          .filter(item => shoppingMode ? !item.have : item.have)
          .map((item, i) =>
            React.createElement('div', {
              key: item.name,
              onClick: () => {
                setPantryItems(prev =>
                  prev.map(p => p.name === item.name ? { ...p, have: !p.have } : p)
                );
              },
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                background: theme.card,
                borderRadius: 14,
                marginBottom: 8,
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }
            },
              React.createElement('div', {
                style: {
                  width: 28, height: 28, borderRadius: 8,
                  border: `2px solid ${item.have ? '#4CAF50' : COLORS.secondary}`,
                  background: item.have ? '#4CAF50' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }
              },
                item.have && React.createElement(Icon, { name: 'Check', size: 16, color: '#FFF' })
              ),
              React.createElement('span', {
                style: {
                  fontSize: 17, fontFamily: FONT, color: theme.text, fontWeight: '500',
                  textDecoration: (shoppingMode && item.have) ? 'line-through' : 'none',
                }
              }, item.name),
              React.createElement('div', { style: { marginLeft: 'auto' } },
                React.createElement(Icon, { name: 'GripVertical', size: 16, color: theme.secondary })
              )
            )
          )
      ),

      // Smart suggestion
      React.createElement('div', {
        style: {
          margin: '20px',
          background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.primary}05)`,
          borderRadius: 16,
          padding: 16,
          border: `1px solid ${COLORS.primary}20`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
        },
          React.createElement(Icon, { name: 'Sparkles', size: 18, color: COLORS.primary }),
          React.createElement('span', {
            style: { fontSize: 15, fontWeight: '600', fontFamily: FONT, color: COLORS.primary }
          }, 'Smart Suggestion')
        ),
        React.createElement('p', {
          style: { fontSize: 13, fontFamily: FONT, color: theme.secondary, margin: 0, lineHeight: 1.5 }
        }, 'Based on your pantry, you can make Pasta Aglio e Olio! Only missing tomatoes for a full marinara.')
      )
    );
  };

  const ChallengesScreen = () => {
    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 100 }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: 0 }
        }, 'Challenges'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
        }, 'Earn badges & bonus streaks')
      ),

      // Badges
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('h2', {
          style: { fontSize: 20, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 12px' }
        }, 'Your Badges'),
        React.createElement('div', {
          style: { display: 'flex', gap: 12 }
        },
          [
            { emoji: '🔥', label: 'Fire Starter', color: '#FF5722' },
            { emoji: '⭐', label: 'Rising Star', color: '#FFC107' },
            { emoji: '👨‍🍳', label: 'Home Chef', color: COLORS.primary },
            { emoji: '🔒', label: 'Week Master', color: '#9E9E9E', locked: true },
            { emoji: '🔒', label: 'Global Chef', color: '#9E9E9E', locked: true },
          ].map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                opacity: badge.locked ? 0.4 : 1,
              }
            },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 16,
                  background: badge.locked
                    ? (darkMode ? '#3A3A50' : '#E8E8ED')
                    : `${badge.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  border: badge.locked ? 'none' : `2px solid ${badge.color}40`,
                }
              }, badge.emoji),
              React.createElement('span', {
                style: { fontSize: 10, fontFamily: FONT, color: theme.secondary, textAlign: 'center', maxWidth: 56 }
              }, badge.label)
            )
          )
        )
      ),

      // Active Challenges
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', {
          style: { fontSize: 20, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 12px' }
        }, 'Active Challenges'),
        challenges.map((challenge, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: `${challenge.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }
              }, challenge.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', {
                  style: { fontSize: 17, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: 0 }
                }, challenge.name),
                React.createElement('p', {
                  style: { fontSize: 13, fontFamily: FONT, color: theme.secondary, margin: '2px 0 0' }
                }, `Reward: ${challenge.reward}`)
              )
            ),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 12 }
            },
              React.createElement('div', {
                style: {
                  flex: 1, height: 8, borderRadius: 4,
                  background: darkMode ? '#3A3A50' : '#F2F2F7',
                  overflow: 'hidden',
                }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', borderRadius: 4,
                    background: challenge.color,
                    width: `${(challenge.progress / challenge.total) * 100}%`,
                    transition: 'width 0.5s ease',
                  }
                })
              ),
              React.createElement('span', {
                style: { fontSize: 13, fontWeight: '600', fontFamily: FONT, color: challenge.color }
              }, `${challenge.progress}/${challenge.total}`)
            )
          )
        )
      ),

      // Milestones
      React.createElement('div', { style: { padding: '20px' } },
        React.createElement('h2', {
          style: { fontSize: 20, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 12px' }
        }, 'Milestones'),
        [
          { days: 7, label: 'First Week', achieved: streak >= 7, reward: '3 Recipes' },
          { days: 14, label: 'Two Weeks', achieved: streak >= 14, reward: '5 Recipes' },
          { days: 30, label: 'One Month', achieved: streak >= 30, reward: 'Master Badge' },
          { days: 100, label: 'Century', achieved: streak >= 100, reward: 'All Recipes' },
        ].map((milestone, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14,
              background: theme.card,
              borderRadius: 12,
              marginBottom: 8,
              opacity: milestone.achieved ? 1 : 0.5,
              boxShadow: milestone.achieved ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 18,
                background: milestone.achieved ? '#4CAF50' : (darkMode ? '#3A3A50' : '#E8E8ED'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              milestone.achieved
                ? React.createElement(Icon, { name: 'Check', size: 18, color: '#FFF' })
                : React.createElement(Icon, { name: 'Lock', size: 14, color: theme.secondary })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 15, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: 0 }
              }, `Day ${milestone.days}: ${milestone.label}`),
              React.createElement('p', {
                style: { fontSize: 13, fontFamily: FONT, color: theme.secondary, margin: '2px 0 0' }
              }, `Unlocks: ${milestone.reward}`)
            )
          )
        )
      )
    );
  };

  const CommunityScreen = () => {
    const [likedPosts, setLikedPosts] = useState([]);

    return React.createElement('div', {
      style: { flex: 1, overflowY: 'auto', paddingBottom: 100 }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('h1', {
          style: { fontSize: 34, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: 0 }
        }, 'Community'),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: '4px 0 0' }
        }, 'Share & get inspired')
      ),

      // Tabs
      React.createElement('div', {
        style: {
          margin: '0 20px 16px',
          display: 'flex',
          gap: 8,
        }
      },
        ['Feed', 'Top Streaks', 'My Posts'].map(tab => {
          const tabKey = tab.toLowerCase().replace(' ', '_');
          const isActive = communityTab === tabKey;
          return React.createElement('div', {
            key: tab,
            onClick: () => setCommunityTab(tabKey),
            style: {
              padding: '8px 16px',
              borderRadius: 20,
              background: isActive ? COLORS.primary : (darkMode ? '#3A3A50' : '#F2F2F7'),
              color: isActive ? '#FFF' : theme.secondary,
              fontSize: 13,
              fontWeight: '600',
              fontFamily: FONT,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }
          }, tab);
        })
      ),

      // Feed
      React.createElement('div', { style: { padding: '0 20px' } },
        communityPosts.map((post, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.card,
              borderRadius: 20,
              padding: 16,
              marginBottom: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }
          },
            // Header
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 20,
                  background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.cta}20)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }
              }, post.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', {
                  style: { fontSize: 15, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: 0 }
                }, post.user),
                React.createElement('p', {
                  style: { fontSize: 12, fontFamily: FONT, color: theme.secondary, margin: '2px 0 0' }
                }, `🔥 ${post.streak} day streak • ${post.time}`)
              ),
              React.createElement(Icon, { name: 'MoreHorizontal', size: 18, color: theme.secondary })
            ),
            // Content
            React.createElement('div', {
              style: {
                height: 160,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${['#FFE0B2', '#C8E6C9', '#BBDEFB', '#F8BBD0'][i]}80, ${['#FFCC80', '#A5D6A7', '#90CAF9', '#F48FB1'][i]}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
                marginBottom: 12,
              }
            }, post.emoji),
            React.createElement('p', {
              style: { fontSize: 17, fontWeight: '600', fontFamily: FONT, color: theme.text, margin: '0 0 4px' }
            }, post.dish),
            // Actions
            React.createElement('div', {
              style: { display: 'flex', gap: 16, marginTop: 8 }
            },
              React.createElement('div', {
                onClick: () => setLikedPosts(prev =>
                  prev.includes(i) ? prev.filter(p => p !== i) : [...prev, i]
                ),
                style: {
                  display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                }
              },
                React.createElement(Icon, {
                  name: 'Heart',
                  size: 18,
                  color: likedPosts.includes(i) ? COLORS.secondary : theme.secondary,
                  strokeWidth: likedPosts.includes(i) ? 3 : 2,
                }),
                React.createElement('span', {
                  style: {
                    fontSize: 13, fontFamily: FONT,
                    color: likedPosts.includes(i) ? COLORS.secondary : theme.secondary,
                    fontWeight: likedPosts.includes(i) ? '600' : '400',
                  }
                }, post.likes + (likedPosts.includes(i) ? 1 : 0))
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }
              },
                React.createElement(Icon, { name: 'MessageCircle', size: 18, color: theme.secondary }),
                React.createElement('span', {
                  style: { fontSize: 13, fontFamily: FONT, color: theme.secondary }
                }, 'Comment')
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginLeft: 'auto' }
              },
                React.createElement(Icon, { name: 'Share2', size: 18, color: theme.secondary })
              )
            )
          )
        )
      )
    );
  };

  // Celebration overlay
  const CelebrationOverlay = () => {
    if (!showCelebration) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        animation: 'fadeIn 0.3s ease',
      }
    },
      React.createElement('div', {
        style: {
          background: theme.card,
          borderRadius: 24,
          padding: 32,
          textAlign: 'center',
          maxWidth: 280,
          transform: 'scale(1)',
          animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      },
        React.createElement('div', { style: { fontSize: 64, marginBottom: 16 } }, '🎉'),
        React.createElement('h2', {
          style: { fontSize: 22, fontWeight: '700', fontFamily: FONT, color: theme.text, margin: '0 0 8px' }
        }, 'Streak Extended!'),
        React.createElement('p', {
          style: { fontSize: 40, fontWeight: '800', fontFamily: FONT, color: COLORS.primary, margin: '0 0 8px' }
        }, `${streak} Days 🔥`),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.secondary, margin: 0 }
        }, unlockedRecipes.length < recipes.length
          ? 'New recipe unlocked! Check the Discovery Grid.'
          : 'Amazing dedication! Keep it going!')
      )
    );
  };

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    pantry: PantryScreen,
    challenges: ChallengesScreen,
    community: CommunityScreen,
  };

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      padding: 20,
    }
  },
    React.createElement('style', null, `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 150,
          height: 28,
          borderRadius: '0 0 20px 20px',
          background: darkMode ? '#000' : '#000',
          zIndex: 300,
        }
      }),
      // Home indicator
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 3,
          background: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          zIndex: 300,
        }
      }),
      React.createElement(screens[activeScreen] || HomeScreen),
      React.createElement(CelebrationOverlay),
      React.createElement(BottomNav)
    )
  );
}