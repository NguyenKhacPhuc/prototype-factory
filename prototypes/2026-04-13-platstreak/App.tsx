const { useState, useEffect, useRef, useCallback } = React;

const THEME = {
  light: {
    primary: '#A85B1B',
    secondary: '#508272',
    cta: '#D24330',
    background: '#FFF8E1',
    surface: '#FFFDF5',
    cardBg: 'rgba(255, 252, 240, 0.95)',
    text: '#2C1810',
    textSecondary: '#6B5744',
    textTertiary: '#9B8B7A',
    border: 'rgba(168, 91, 27, 0.12)',
    streakGlow: 'rgba(168, 91, 27, 0.3)',
    overlay: 'rgba(44, 24, 16, 0.5)',
    tabBg: 'rgba(255, 248, 225, 0.95)',
  },
  dark: {
    primary: '#D4883E',
    secondary: '#6BAA96',
    cta: '#E8614F',
    background: '#1A1209',
    surface: '#2C1F14',
    cardBg: 'rgba(44, 31, 20, 0.95)',
    text: '#FFF8E1',
    textSecondary: '#C4A882',
    textTertiary: '#8B7560',
    border: 'rgba(212, 136, 62, 0.15)',
    streakGlow: 'rgba(212, 136, 62, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    tabBg: 'rgba(26, 18, 9, 0.95)',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const RECIPES = [
  { id: 1, name: 'Classic French Omelette', cuisine: 'French', tier: 1, time: '15 min', difficulty: 'Easy', image: '🥚', unlockStreak: 0, ingredients: ['3 eggs', 'Butter', 'Salt', 'Fresh herbs'], description: 'Master the art of a perfectly soft, creamy French omelette.' },
  { id: 2, name: 'Thai Basil Stir-Fry', cuisine: 'Thai', tier: 1, time: '20 min', difficulty: 'Easy', image: '🌿', unlockStreak: 0, ingredients: ['Thai basil', 'Chicken', 'Fish sauce', 'Chili'], description: 'A fragrant, spicy stir-fry with holy basil and fresh chilies.' },
  { id: 3, name: 'Sourdough Bread', cuisine: 'Artisan', tier: 2, time: '24 hrs', difficulty: 'Medium', image: '🍞', unlockStreak: 3, ingredients: ['Flour', 'Water', 'Salt', 'Starter'], description: 'Craft a beautiful sourdough loaf with a crispy crust.' },
  { id: 4, name: 'Ramen from Scratch', cuisine: 'Japanese', tier: 2, time: '4 hrs', difficulty: 'Medium', image: '🍜', unlockStreak: 5, ingredients: ['Pork bones', 'Noodles', 'Soy sauce', 'Eggs'], description: 'Rich tonkotsu broth with handmade noodles and perfect eggs.' },
  { id: 5, name: 'Beef Wellington', cuisine: 'British', tier: 3, time: '3 hrs', difficulty: 'Hard', image: '🥩', unlockStreak: 7, ingredients: ['Beef tenderloin', 'Puff pastry', 'Mushroom duxelles', 'Prosciutto'], description: 'The ultimate showstopper: tender beef wrapped in golden pastry.' },
  { id: 6, name: 'Mole Poblano', cuisine: 'Mexican', tier: 3, time: '5 hrs', difficulty: 'Hard', image: '🫕', unlockStreak: 10, ingredients: ['Dried chilies', 'Chocolate', 'Spices', 'Chicken'], description: 'A complex, rich sauce with over 20 ingredients and deep flavors.' },
  { id: 7, name: 'Croissants', cuisine: 'French', tier: 4, time: '12 hrs', difficulty: 'Expert', image: '🥐', unlockStreak: 14, ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar'], description: 'Flaky, buttery layers of laminated dough perfection.' },
  { id: 8, name: 'Sushi Omakase', cuisine: 'Japanese', tier: 4, time: '2 hrs', difficulty: 'Expert', image: '🍣', unlockStreak: 21, ingredients: ['Sushi rice', 'Fresh fish', 'Nori', 'Wasabi'], description: 'A curated selection of nigiri showcasing seasonal fish.' },
  { id: 9, name: 'Pasta Carbonara', cuisine: 'Italian', tier: 1, time: '25 min', difficulty: 'Easy', image: '🍝', unlockStreak: 0, ingredients: ['Guanciale', 'Eggs', 'Pecorino', 'Pasta'], description: 'Silky, creamy pasta with crispy guanciale and sharp cheese.' },
  { id: 10, name: 'Moroccan Tagine', cuisine: 'Moroccan', tier: 2, time: '2 hrs', difficulty: 'Medium', image: '🫕', unlockStreak: 4, ingredients: ['Lamb', 'Preserved lemons', 'Olives', 'Spices'], description: 'Slow-cooked lamb with aromatic spices and preserved lemons.' },
];

const ACHIEVEMENTS = [
  { id: 1, name: 'First Flame', desc: 'Cook your first dish', icon: '🔥', earned: true },
  { id: 2, name: 'Three-Day Chef', desc: 'Maintain a 3-day streak', icon: '⭐', earned: true },
  { id: 3, name: 'Week Warrior', desc: 'Maintain a 7-day streak', icon: '🏆', earned: true },
  { id: 4, name: 'Globe Trotter', desc: 'Cook from 5 different cuisines', icon: '🌍', earned: false },
  { id: 5, name: 'Iron Chef', desc: 'Maintain a 30-day streak', icon: '👨‍🍳', earned: false },
  { id: 6, name: 'Recipe Master', desc: 'Unlock all tier 3 recipes', icon: '📖', earned: false },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(8);
  const [longestStreak, setLongestStreak] = useState(12);
  const [todayLogged, setTodayLogged] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [animatingStreak, setAnimatingStreak] = useState(false);
  const [personalNotes, setPersonalNotes] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([1, 4, 9]);
  const [cookedHistory, setCookedHistory] = useState([1, 2, 9, 3, 2, 1, 4, 9]);
  const [screenTransition, setScreenTransition] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([
    { name: 'Eggs (6)', checked: false, category: 'Dairy' },
    { name: 'Fresh Herbs', checked: true, category: 'Produce' },
    { name: 'Butter (unsalted)', checked: false, category: 'Dairy' },
    { name: 'Thai Basil', checked: false, category: 'Produce' },
    { name: 'Chicken Breast', checked: false, category: 'Protein' },
    { name: 'Fish Sauce', checked: true, category: 'Pantry' },
    { name: 'Guanciale', checked: false, category: 'Protein' },
    { name: 'Pecorino Romano', checked: false, category: 'Dairy' },
  ]);

  const theme = isDark ? THEME.dark : THEME.light;

  const switchScreen = (screen) => {
    setScreenTransition(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setScreenTransition(false);
    }, 150);
  };

  const logDish = () => {
    if (!todayLogged) {
      setAnimatingStreak(true);
      setTodayLogged(true);
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > longestStreak) setLongestStreak(newStreak);
        return newStreak;
      });
      setTimeout(() => setAnimatingStreak(false), 1000);
      setShowLogModal(false);
    }
  };

  const toggleShoppingItem = (index) => {
    setShoppingItems(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const toggleFavorite = (id) => {
    setFavoriteRecipes(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const getUnlockedRecipes = () => RECIPES.filter(r => r.unlockStreak <= currentStreak);
  const getLockedRecipes = () => RECIPES.filter(r => r.unlockStreak > currentStreak);
  const getNextUnlock = () => {
    const locked = getLockedRecipes().sort((a, b) => a.unlockStreak - b.unlockStreak);
    return locked.length > 0 ? locked[0] : null;
  };

  const getTierColor = (tier) => {
    const colors = { 1: '#508272', 2: '#A85B1B', 3: '#D24330', 4: '#8B5CF6' };
    return colors[tier] || theme.primary;
  };

  const paperTexture = {
    backgroundImage: isDark
      ? 'none'
      : 'radial-gradient(ellipse at 20% 50%, rgba(168,91,27,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(80,130,114,0.03) 0%, transparent 50%)',
  };

  // Icons
  const Icon = ({ name, size = 24, color = theme.text, strokeWidth = 2 }) => {
    const icons = {
      flame: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' })
        )
      ),
      home: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
          React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
        )
      ),
      book: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
          React.createElement('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
        )
      ),
      chart: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('line', { x1: 18, y1: 20, x2: 18, y2: 10 }),
          React.createElement('line', { x1: 12, y1: 20, x2: 12, y2: 4 }),
          React.createElement('line', { x1: 6, y1: 20, x2: 6, y2: 14 })
        )
      ),
      cart: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('circle', { cx: 9, cy: 21, r: 1 }),
          React.createElement('circle', { cx: 20, cy: 21, r: 1 }),
          React.createElement('path', { d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' })
        )
      ),
      heart: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })
        )
      ),
      heartFilled: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: color, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })
        )
      ),
      lock: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }),
          React.createElement('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
        )
      ),
      check: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('polyline', { points: '20 6 9 17 4 12' })
        )
      ),
      plus: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }),
          React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
        )
      ),
      star: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: color, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
        )
      ),
      moon: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
        )
      ),
      sun: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
          React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }),
          React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }),
          React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
          React.createElement('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
          React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }),
          React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }),
          React.createElement('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
          React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })
        )
      ),
      back: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('polyline', { points: '15 18 9 12 15 6' })
        )
      ),
      clock: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
          React.createElement('polyline', { points: '12 6 12 12 16 14' })
        )
      ),
      trophy: (
        React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
          React.createElement('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }),
          React.createElement('path', { d: 'M4 22h16' }),
          React.createElement('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22' }),
          React.createElement('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22' }),
          React.createElement('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' })
        )
      ),
    };
    return icons[name] || null;
  };

  // Home Screen
  const HomeScreen = () => {
    const nextUnlock = getNextUnlock();
    const streakProgress = nextUnlock ? ((currentStreak / nextUnlock.unlockStreak) * 100) : 100;
    const daysUntilUnlock = nextUnlock ? nextUnlock.unlockStreak - currentStreak : 0;

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        ...paperTexture,
        minHeight: '100%',
      }
    },
      // Header
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 60,
          paddingBottom: 16,
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 700,
              color: theme.text,
              letterSpacing: -0.5,
            }
          }, 'PlatStreak'),
          React.createElement('div', {
            style: {
              fontFamily: FONT,
              fontSize: 13,
              color: theme.textTertiary,
              marginTop: 2,
            }
          }, 'Master the Kitchen, One Streak at a Time')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 40,
            height: 40,
            borderRadius: 20,
            background: theme.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: `1px solid ${theme.border}`,
          }
        }, Icon({ name: isDark ? 'sun' : 'moon', size: 20, color: theme.primary }))
      ),

      // Streak Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${theme.primary}, ${isDark ? '#B8742A' : '#C47A2E'})`,
          borderRadius: 24,
          padding: '28px 24px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 32px ${theme.streakGlow}`,
          transition: 'transform 0.3s ease',
          transform: animatingStreak ? 'scale(1.02)' : 'scale(1)',
        }
      },
        // Decorative circles
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: 60,
            background: 'rgba(255,255,255,0.08)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: 40,
            background: 'rgba(255,255,255,0.05)',
          }
        }),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                fontWeight: 600,
              }
            }, 'Current Streak'),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 56,
                fontWeight: 800,
                color: '#FFF',
                lineHeight: 1,
                marginTop: 4,
                transition: 'all 0.5s ease',
                textShadow: animatingStreak ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
              }
            },
              currentStreak,
              React.createElement('span', {
                style: { fontSize: 22, fontWeight: 600, marginLeft: 4 }
              }, 'days')
            ),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 4,
              }
            }, `Best: ${longestStreak} days`)
          ),
          React.createElement('div', {
            style: {
              width: 80,
              height: 80,
              borderRadius: 40,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
              animation: animatingStreak ? 'pulse 0.5s ease' : 'none',
            }
          }, '🔥')
        ),
        // Progress to next unlock
        nextUnlock && React.createElement('div', {
          style: {
            marginTop: 20,
            position: 'relative',
            zIndex: 1,
          }
        },
          React.createElement('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: FONT,
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: 8,
            }
          },
            React.createElement('span', null, `Next unlock: ${nextUnlock.name}`),
            React.createElement('span', null, `${daysUntilUnlock} days`)
          ),
          React.createElement('div', {
            style: {
              height: 6,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.2)',
              overflow: 'hidden',
            }
          },
            React.createElement('div', {
              style: {
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.8)',
                width: `${Math.min(streakProgress, 100)}%`,
                transition: 'width 0.8s ease',
              }
            })
          )
        )
      ),

      // Log Today's Dish Button
      !todayLogged ? React.createElement('div', {
        onClick: () => setShowLogModal(true),
        style: {
          background: theme.cta,
          borderRadius: 16,
          padding: '18px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          boxShadow: `0 4px 16px rgba(210, 67, 48, 0.3)`,
          transition: 'transform 0.15s ease',
        }
      },
        Icon({ name: 'plus', size: 22, color: '#FFF' }),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 17,
            fontWeight: 600,
            color: '#FFF',
          }
        }, 'Log Today\'s Dish')
      ) : React.createElement('div', {
        style: {
          background: `${theme.secondary}20`,
          borderRadius: 16,
          padding: '18px 24px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          border: `2px solid ${theme.secondary}`,
        }
      },
        Icon({ name: 'check', size: 22, color: theme.secondary }),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 17,
            fontWeight: 600,
            color: theme.secondary,
          }
        }, 'Today\'s dish logged! 🎉')
      ),

      // Quick Stats
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          marginBottom: 24,
        }
      },
        ...[
          { label: 'Recipes Cooked', value: cookedHistory.length, icon: '📖' },
          { label: 'Unlocked', value: getUnlockedRecipes().length, icon: '🔓' },
          { label: 'Achievements', value: ACHIEVEMENTS.filter(a => a.earned).length, icon: '🏅' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: '16px 12px',
              textAlign: 'center',
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, stat.icon),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 700,
                color: theme.text,
              }
            }, stat.value),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 11,
                color: theme.textTertiary,
                marginTop: 2,
              }
            }, stat.label)
          )
        )
      ),

      // Suggested Recipes
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 16,
        }
      }, 'Suggested for You'),
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 14,
          overflowX: 'auto',
          paddingBottom: 8,
          marginLeft: -20,
          marginRight: -20,
          paddingLeft: 20,
          paddingRight: 20,
        }
      },
        ...getUnlockedRecipes().slice(0, 4).map(recipe =>
          React.createElement('div', {
            key: recipe.id,
            onClick: () => { setSelectedRecipe(recipe); switchScreen('recipeDetail'); },
            style: {
              minWidth: 160,
              background: theme.cardBg,
              borderRadius: 20,
              padding: 16,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }
          },
            React.createElement('div', {
              style: {
                fontSize: 42,
                marginBottom: 10,
                textAlign: 'center',
              }
            }, recipe.image),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 600,
                color: theme.text,
                marginBottom: 4,
                lineHeight: 1.3,
              }
            }, recipe.name),
            React.createElement('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: FONT,
                fontSize: 13,
                color: theme.textTertiary,
              }
            },
              Icon({ name: 'clock', size: 12, color: theme.textTertiary }),
              recipe.time
            )
          )
        )
      ),

      // Upcoming Unlocks
      getLockedRecipes().length > 0 && React.createElement('div', {
        style: { marginTop: 24 }
      },
        React.createElement('div', {
          style: {
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 700,
            color: theme.text,
            marginBottom: 16,
          }
        }, 'Coming Soon'),
        ...getLockedRecipes().slice(0, 3).map(recipe =>
          React.createElement('div', {
            key: recipe.id,
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: '14px 16px',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: `1px solid ${theme.border}`,
              opacity: 0.7,
            }
          },
            React.createElement('div', {
              style: {
                width: 48,
                height: 48,
                borderRadius: 14,
                background: `${theme.primary}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                position: 'relative',
              }
            },
              recipe.image,
              React.createElement('div', {
                style: {
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                }
              }, Icon({ name: 'lock', size: 14, color: theme.textTertiary }))
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontFamily: FONT,
                  fontSize: 15,
                  fontWeight: 600,
                  color: theme.text,
                }
              }, recipe.name),
              React.createElement('div', {
                style: {
                  fontFamily: FONT,
                  fontSize: 13,
                  color: theme.textTertiary,
                }
              }, `Unlock at ${recipe.unlockStreak}-day streak`)
            ),
            React.createElement('div', {
              style: {
                background: `${getTierColor(recipe.tier)}20`,
                color: getTierColor(recipe.tier),
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 8,
              }
            }, `Tier ${recipe.tier}`)
          )
        )
      )
    );
  };

  // Recipes Screen
  const RecipesScreen = () => {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'unlocked', 'favorites', 'locked'];

    const filteredRecipes = (() => {
      switch (filter) {
        case 'unlocked': return getUnlockedRecipes();
        case 'locked': return getLockedRecipes();
        case 'favorites': return RECIPES.filter(r => favoriteRecipes.includes(r.id));
        default: return RECIPES;
      }
    })();

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        ...paperTexture,
        minHeight: '100%',
      }
    },
      React.createElement('div', {
        style: {
          paddingTop: 60,
          paddingBottom: 16,
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 700,
          color: theme.text,
        }
      }, 'Recipe Library'),

      // Filter Tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          overflowX: 'auto',
        }
      },
        ...filters.map(f =>
          React.createElement('div', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '8px 18px',
              borderRadius: 20,
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 600,
              color: filter === f ? '#FFF' : theme.textSecondary,
              background: filter === f ? theme.primary : `${theme.primary}10`,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }
          }, f.charAt(0).toUpperCase() + f.slice(1))
        )
      ),

      // Recipe Cards
      ...filteredRecipes.map(recipe => {
        const isLocked = recipe.unlockStreak > currentStreak;
        return React.createElement('div', {
          key: recipe.id,
          onClick: () => {
            if (!isLocked) {
              setSelectedRecipe(recipe);
              switchScreen('recipeDetail');
            }
          },
          style: {
            background: theme.cardBg,
            borderRadius: 20,
            padding: 18,
            marginBottom: 14,
            display: 'flex',
            gap: 16,
            border: `1px solid ${theme.border}`,
            cursor: isLocked ? 'default' : 'pointer',
            opacity: isLocked ? 0.6 : 1,
            transition: 'transform 0.15s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${getTierColor(recipe.tier)}15, ${getTierColor(recipe.tier)}08)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              flexShrink: 0,
              position: 'relative',
            }
          },
            recipe.image,
            isLocked && React.createElement('div', {
              style: {
                position: 'absolute',
                inset: 0,
                borderRadius: 18,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            }, Icon({ name: 'lock', size: 24, color: '#FFF' }))
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }
            },
              React.createElement('div', {
                style: {
                  fontFamily: FONT,
                  fontSize: 17,
                  fontWeight: 600,
                  color: theme.text,
                  lineHeight: 1.3,
                }
              }, recipe.name),
              !isLocked && React.createElement('div', {
                onClick: (e) => { e.stopPropagation(); toggleFavorite(recipe.id); },
                style: { cursor: 'pointer', flexShrink: 0, marginLeft: 8 }
              }, Icon({
                name: favoriteRecipes.includes(recipe.id) ? 'heartFilled' : 'heart',
                size: 20,
                color: favoriteRecipes.includes(recipe.id) ? theme.cta : theme.textTertiary,
              }))
            ),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 13,
                color: theme.textTertiary,
                marginTop: 4,
              }
            }, recipe.cuisine),
            React.createElement('div', {
              style: {
                display: 'flex',
                gap: 8,
                marginTop: 8,
                flexWrap: 'wrap',
              }
            },
              React.createElement('span', {
                style: {
                  background: `${getTierColor(recipe.tier)}15`,
                  color: getTierColor(recipe.tier),
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 6,
                }
              }, `Tier ${recipe.tier}`),
              React.createElement('span', {
                style: {
                  background: `${theme.textTertiary}15`,
                  color: theme.textSecondary,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '3px 8px',
                  borderRadius: 6,
                }
              }, recipe.time),
              React.createElement('span', {
                style: {
                  background: `${theme.textTertiary}15`,
                  color: theme.textSecondary,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '3px 8px',
                  borderRadius: 6,
                }
              }, recipe.difficulty),
              isLocked && React.createElement('span', {
                style: {
                  background: `${theme.cta}15`,
                  color: theme.cta,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 6,
                }
              }, `🔒 ${recipe.unlockStreak}-day streak`)
            )
          )
        );
      })
    );
  };

  // Recipe Detail Screen
  const RecipeDetailScreen = () => {
    const recipe = selectedRecipe;
    const [note, setNote] = useState(personalNotes[recipe?.id] || '');
    const [showNoteInput, setShowNoteInput] = useState(false);

    if (!recipe) return null;

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        ...paperTexture,
        minHeight: '100%',
      }
    },
      // Back button
      React.createElement('div', {
        style: {
          paddingTop: 56,
          paddingBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }
      },
        React.createElement('div', {
          onClick: () => switchScreen('recipes'),
          style: {
            width: 36,
            height: 36,
            borderRadius: 12,
            background: theme.cardBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: `1px solid ${theme.border}`,
          }
        }, Icon({ name: 'back', size: 20, color: theme.primary })),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 17,
            color: theme.primary,
            fontWeight: 600,
          }
        }, 'Back')
      ),

      // Hero
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${getTierColor(recipe.tier)}20, ${getTierColor(recipe.tier)}08)`,
          borderRadius: 28,
          padding: '40px 24px',
          textAlign: 'center',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 8,
          }
        },
          React.createElement('div', {
            onClick: () => toggleFavorite(recipe.id),
            style: {
              width: 40,
              height: 40,
              borderRadius: 20,
              background: theme.cardBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: `1px solid ${theme.border}`,
            }
          }, Icon({
            name: favoriteRecipes.includes(recipe.id) ? 'heartFilled' : 'heart',
            size: 20,
            color: favoriteRecipes.includes(recipe.id) ? theme.cta : theme.textTertiary,
          }))
        ),
        React.createElement('div', { style: { fontSize: 72, marginBottom: 12 } }, recipe.image),
        React.createElement('div', {
          style: {
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 700,
            color: theme.text,
            marginBottom: 8,
          }
        }, recipe.name),
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }
        },
          ...[
            { icon: '🌍', text: recipe.cuisine },
            { icon: '⏱️', text: recipe.time },
            { icon: '📊', text: recipe.difficulty },
          ].map((tag, i) =>
            React.createElement('span', {
              key: i,
              style: {
                background: theme.cardBg,
                padding: '6px 14px',
                borderRadius: 12,
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 500,
                color: theme.textSecondary,
                border: `1px solid ${theme.border}`,
              }
            }, `${tag.icon} ${tag.text}`)
          )
        )
      ),

      // Description
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 17,
          color: theme.textSecondary,
          lineHeight: 1.6,
          marginBottom: 24,
        }
      }, recipe.description),

      // Ingredients
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 14,
        }
      }, 'Ingredients'),
      React.createElement('div', {
        style: {
          background: theme.cardBg,
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          border: `1px solid ${theme.border}`,
        }
      },
        ...recipe.ingredients.map((ing, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 0',
              borderBottom: i < recipe.ingredients.length - 1 ? `1px solid ${theme.border}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                borderRadius: 4,
                background: theme.primary,
                flexShrink: 0,
              }
            }),
            React.createElement('span', {
              style: {
                fontFamily: FONT,
                fontSize: 15,
                color: theme.text,
              }
            }, ing)
          )
        )
      ),

      // Chef's Notes
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 14,
        }
      }, "Chef's Notes"),
      React.createElement('div', {
        style: {
          background: theme.cardBg,
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          border: `1px solid ${theme.border}`,
        }
      },
        personalNotes[recipe.id] ? React.createElement('div', {
          style: {
            fontFamily: FONT,
            fontSize: 15,
            color: theme.text,
            lineHeight: 1.5,
            fontStyle: 'italic',
          }
        }, `"${personalNotes[recipe.id]}"`) : null,
        showNoteInput ? React.createElement('div', null,
          React.createElement('textarea', {
            value: note,
            onChange: (e) => setNote(e.target.value),
            placeholder: 'Add your personal notes, modifications...',
            style: {
              width: '100%',
              minHeight: 80,
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: 12,
              fontFamily: FONT,
              fontSize: 15,
              color: theme.text,
              background: theme.background,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }
          }),
          React.createElement('div', {
            onClick: () => {
              setPersonalNotes(prev => ({ ...prev, [recipe.id]: note }));
              setShowNoteInput(false);
            },
            style: {
              marginTop: 10,
              padding: '10px 20px',
              borderRadius: 12,
              background: theme.secondary,
              color: '#FFF',
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 600,
              textAlign: 'center',
              cursor: 'pointer',
            }
          }, 'Save Note')
        ) : React.createElement('div', {
          onClick: () => setShowNoteInput(true),
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            marginTop: personalNotes[recipe.id] ? 12 : 0,
          }
        },
          Icon({ name: 'plus', size: 18, color: theme.secondary }),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: 15,
              color: theme.secondary,
              fontWeight: 500,
            }
          }, personalNotes[recipe.id] ? 'Edit Note' : 'Add a personal note')
        )
      ),

      // Log This Dish
      React.createElement('div', {
        onClick: () => {
          if (!todayLogged) {
            logDish();
            setCookedHistory(prev => [...prev, recipe.id]);
          }
        },
        style: {
          background: todayLogged ? `${theme.secondary}20` : theme.cta,
          borderRadius: 16,
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: todayLogged ? 'default' : 'pointer',
          border: todayLogged ? `2px solid ${theme.secondary}` : 'none',
          boxShadow: todayLogged ? 'none' : `0 4px 16px rgba(210, 67, 48, 0.3)`,
        }
      },
        Icon({ name: todayLogged ? 'check' : 'flame', size: 22, color: todayLogged ? theme.secondary : '#FFF' }),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 17,
            fontWeight: 600,
            color: todayLogged ? theme.secondary : '#FFF',
          }
        }, todayLogged ? 'Already Logged Today!' : 'I Cooked This Today!')
      )
    );
  };

  // Dashboard Screen
  const DashboardScreen = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekActivity = [true, true, true, false, true, true, true, todayLogged]; // pretend data

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        ...paperTexture,
        minHeight: '100%',
      }
    },
      React.createElement('div', {
        style: {
          paddingTop: 60,
          paddingBottom: 16,
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 700,
          color: theme.text,
        }
      }, 'Dashboard'),

      // Streak Overview
      React.createElement('div', {
        style: {
          background: theme.cardBg,
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          border: `1px solid ${theme.border}`,
        }
      },
        React.createElement('div', {
          style: {
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 600,
            color: theme.textSecondary,
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: 13,
          }
        }, 'This Week'),
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
          }
        },
          ...weekDays.map((day, i) =>
            React.createElement('div', {
              key: i,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }
            },
              React.createElement('div', {
                style: {
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: weekActivity[i]
                    ? `linear-gradient(135deg, ${theme.primary}, ${isDark ? '#B8742A' : '#C47A2E'})`
                    : `${theme.textTertiary}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  boxShadow: weekActivity[i] ? `0 2px 8px ${theme.streakGlow}` : 'none',
                }
              }, weekActivity[i] ? '🔥' : ''),
              React.createElement('span', {
                style: {
                  fontFamily: FONT,
                  fontSize: 11,
                  color: theme.textTertiary,
                  fontWeight: 500,
                }
              }, day)
            )
          )
        )
      ),

      // Stats Grid
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 24,
        }
      },
        ...[
          { label: 'Current Streak', value: `${currentStreak} days`, color: theme.primary, bg: `${theme.primary}15` },
          { label: 'Longest Streak', value: `${longestStreak} days`, color: theme.secondary, bg: `${theme.secondary}15` },
          { label: 'Total Dishes', value: cookedHistory.length, color: theme.cta, bg: `${theme.cta}15` },
          { label: 'Cuisines Explored', value: '4', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: theme.cardBg,
              borderRadius: 16,
              padding: 18,
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 12,
                background: stat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }
            }, Icon({ name: i === 0 ? 'flame' : i === 1 ? 'trophy' : i === 2 ? 'book' : 'star', size: 20, color: stat.color })),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 700,
                color: theme.text,
              }
            }, stat.value),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 13,
                color: theme.textTertiary,
                marginTop: 2,
              }
            }, stat.label)
          )
        )
      ),

      // Achievements
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 14,
        }
      }, 'Achievements'),
      ...ACHIEVEMENTS.map(achievement =>
        React.createElement('div', {
          key: achievement.id,
          style: {
            background: theme.cardBg,
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            border: `1px solid ${achievement.earned ? `${theme.primary}30` : theme.border}`,
            opacity: achievement.earned ? 1 : 0.5,
          }
        },
          React.createElement('div', {
            style: {
              width: 48,
              height: 48,
              borderRadius: 14,
              background: achievement.earned
                ? `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}10)`
                : `${theme.textTertiary}10`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }
          }, achievement.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 600,
                color: theme.text,
              }
            }, achievement.name),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 13,
                color: theme.textTertiary,
              }
            }, achievement.desc)
          ),
          achievement.earned && React.createElement('div', {
            style: {
              background: `${theme.secondary}20`,
              borderRadius: 8,
              padding: '4px 8px',
            }
          }, Icon({ name: 'check', size: 16, color: theme.secondary }))
        )
      ),

      // Cooking History (bar chart)
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          color: theme.text,
          marginBottom: 14,
          marginTop: 24,
        }
      }, 'Monthly Activity'),
      React.createElement('div', {
        style: {
          background: theme.cardBg,