// Fridge Forge - Turn leftovers into dinner, not waste.
// Single-file React prototype with Babel standalone

function App() {
  const { useState, useEffect, useRef } = React;

  // Theme system
  const themes = {
    light: {
      bg: '#F5F2EC',
      surface: '#FFFFFF',
      surfaceAlt: '#F0EDE6',
      card: '#FFFFFF',
      cardBorder: '#E8E3DA',
      primary: '#E8622A',
      primaryLight: '#FDF0EB',
      primaryDark: '#C4491A',
      secondary: '#4CAF6E',
      secondaryLight: '#EBF7EF',
      accent: '#F5A623',
      accentLight: '#FEF6E6',
      text: '#1C1A17',
      textSecondary: '#6B6560',
      textMuted: '#A09890',
      border: '#E8E3DA',
      urgent: '#E84242',
      urgentLight: '#FEF0F0',
      warning: '#F5A623',
      warningLight: '#FEF6E6',
      safe: '#4CAF6E',
      safeLight: '#EBF7EF',
      navBg: '#FFFFFF',
      statusBar: '#1C1A17',
      shadow: 'rgba(0,0,0,0.08)',
    },
    dark: {
      bg: '#0F0E0C',
      surface: '#1C1A17',
      surfaceAlt: '#242220',
      card: '#252320',
      cardBorder: '#3A3732',
      primary: '#F07040',
      primaryLight: '#2A1F18',
      primaryDark: '#E85520',
      secondary: '#5BC97E',
      secondaryLight: '#142419',
      accent: '#F5B843',
      accentLight: '#2A2010',
      text: '#F0EDE6',
      textSecondary: '#A09480',
      textMuted: '#6B6560',
      border: '#3A3732',
      urgent: '#FF5555',
      urgentLight: '#2A1515',
      warning: '#F5B843',
      warningLight: '#2A2010',
      safe: '#5BC97E',
      safeLight: '#142419',
      navBg: '#1C1A17',
      statusBar: '#F0EDE6',
      shadow: 'rgba(0,0,0,0.3)',
    }
  };

  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [pressedItem, setPressedItem] = useState(null);
  const t = isDark ? themes.dark : themes.light;

  // Load Google Font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
  }, []);

  // ---- HOME SCREEN ----
  const HomeScreen = () => {
    const [scanPressed, setScanPressed] = useState(false);
    const urgentItems = [
      { name: 'Roasted Chicken', daysLeft: 1, emoji: '🍗', amount: '~200g' },
      { name: 'Fresh Herbs', daysLeft: 1, emoji: '🌿', amount: 'small bunch' },
      { name: 'Greek Yogurt', daysLeft: 2, emoji: '🥛', amount: '1/2 cup' },
      { name: 'Baby Spinach', daysLeft: 2, emoji: '🥬', amount: '1 bag' },
    ];
    const suggestedMeals = [
      { name: 'Cilantro-Lime Chicken Bowl', time: '15 min', effort: 'Easy', match: 97, urgency: 'Use today', color: t.urgent, bgColor: t.urgentLight, emoji: '🍲' },
      { name: 'Herb Yogurt Chicken Wrap', time: '10 min', effort: 'Easy', match: 91, urgency: 'Use today', color: t.urgent, bgColor: t.urgentLight, emoji: '🌯' },
      { name: 'Spinach & Chicken Quesadilla', time: '20 min', effort: 'Medium', match: 84, urgency: 'Use by tomorrow', color: t.warning, bgColor: t.warningLight, emoji: '🫓' },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
      // Header
      React.createElement('div', {
        style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.5px' } }, 'Fridge Forge'),
            React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginTop: 2 } }, 'Sunday, March 22')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
            React.createElement('div', {
              style: { background: t.urgentLight, border: `1px solid ${t.urgent}`, borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement(window.lucide.AlertTriangle, { size: 13, color: t.urgent }),
              React.createElement('span', { style: { fontSize: 12, color: t.urgent, fontWeight: 700 } }, '4 expiring')
            ),
            React.createElement('div', {
              style: { width: 36, height: 36, borderRadius: 18, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
              onClick: () => setActiveTab('settings')
            },
              React.createElement(window.lucide.User, { size: 18, color: t.primary })
            )
          )
        )
      ),

      // Scan CTA
      React.createElement('div', { style: { padding: '16px 20px 0' } },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`,
            borderRadius: 18,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transform: scanPressed ? 'scale(0.98)' : 'scale(1)',
            transition: 'transform 0.1s',
            boxShadow: `0 4px 16px ${t.primary}40`,
          },
          onMouseDown: () => setScanPressed(true),
          onMouseUp: () => setScanPressed(false),
          onMouseLeave: () => setScanPressed(false),
          onClick: () => setActiveTab('scan'),
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#fff' } }, 'Scan Your Fridge'),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 3 } }, 'Camera or receipt import')
          ),
          React.createElement('div', {
            style: { width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement(window.lucide.Camera, { size: 24, color: '#fff' })
          )
        )
      ),

      // Urgent items
      React.createElement('div', { style: { padding: '16px 20px 8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Use First'),
          React.createElement('div', {
            style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' },
            onClick: () => setActiveTab('fridge')
          }, 'View all →')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          urgentItems.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 90, background: t.card, border: `1px solid ${i < 2 ? t.urgent + '40' : t.warning + '40'}`,
                borderRadius: 14, padding: '10px 10px', textAlign: 'center', flexShrink: 0
              }
            },
              React.createElement('div', { style: { fontSize: 24, marginBottom: 4 } }, item.emoji),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, item.name),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, item.amount),
              React.createElement('div', {
                style: {
                  fontSize: 10, fontWeight: 700, color: i < 2 ? t.urgent : t.warning,
                  background: i < 2 ? t.urgentLight : t.warningLight,
                  borderRadius: 8, padding: '2px 6px', marginTop: 6, display: 'inline-block'
                }
              }, i < 2 ? 'Today' : 'Tomorrow')
            )
          )
        )
      ),

      // Suggested meals
      React.createElement('div', { style: { padding: '8px 20px 16px' } },
        React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 10 } }, 'Tonight\'s Rescue Plan'),
        suggestedMeals.map((meal, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 16,
              padding: '14px 14px', marginBottom: 10, cursor: 'pointer',
              boxShadow: `0 2px 8px ${t.shadow}`
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
              React.createElement('div', { style: { fontSize: 32, lineHeight: 1 } }, meal.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, meal.name),
                  React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: t.secondary } }, meal.match + '%')
                ),
                React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' } },
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 8, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 } },
                    React.createElement(window.lucide.Clock, { size: 10 }), ' ', meal.time
                  ),
                  React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 8, padding: '2px 7px' } }, meal.effort),
                  React.createElement('div', {
                    style: { fontSize: 11, fontWeight: 600, color: meal.color, background: meal.bgColor, borderRadius: 8, padding: '2px 7px' }
                  }, meal.urgency)
                )
              )
            ),
            React.createElement('div', {
              style: {
                marginTop: 10, background: t.primary, borderRadius: 10, padding: '8px 0',
                textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#fff'
              }
            }, 'Start Cooking →')
          )
        )
      ),

      // Add-on suggestion
      React.createElement('div', { style: { margin: '0 20px 20px', background: t.accentLight, border: `1px solid ${t.accent}30`, borderRadius: 16, padding: '14px' } },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement('div', { style: { fontSize: 22 } }, '🛒'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Tiny Add-on Unlocks a Better Meal'),
            React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, marginTop: 3, lineHeight: 1.5 } }, 'Add 1 lemon + fresh cilantro (~$1.50) to turn the chicken bowl into a restaurant-quality dish'),
            React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.accent, marginTop: 6 } }, '→ Add to shopping list')
          )
        )
      )
    );
  };

  // ---- FRIDGE SCREEN ----
  const FridgeScreen = () => {
    const [filter, setFilter] = useState('all');
    const categories = [
      { id: 'all', label: 'All' },
      { id: 'urgent', label: 'Urgent' },
      { id: 'protein', label: 'Protein' },
      { id: 'produce', label: 'Produce' },
      { id: 'dairy', label: 'Dairy' },
    ];
    const items = [
      { name: 'Roasted Chicken', category: 'protein', daysLeft: 1, amount: '~200g', emoji: '🍗', status: 'urgent' },
      { name: 'Fresh Cilantro', category: 'produce', daysLeft: 1, amount: 'small bunch', emoji: '🌿', status: 'urgent' },
      { name: 'Greek Yogurt', category: 'dairy', daysLeft: 2, amount: '1/2 cup', emoji: '🥛', status: 'warning' },
      { name: 'Baby Spinach', category: 'produce', daysLeft: 2, amount: '1 bag (60g)', emoji: '🥬', status: 'warning' },
      { name: 'Cheddar Cheese', category: 'dairy', daysLeft: 5, amount: '~80g', emoji: '🧀', status: 'safe' },
      { name: 'Cooked Rice', category: 'protein', daysLeft: 3, amount: '2 cups', emoji: '🍚', status: 'warning' },
      { name: 'Cherry Tomatoes', category: 'produce', daysLeft: 4, amount: 'half pint', emoji: '🍅', status: 'safe' },
      { name: 'Large Eggs', category: 'protein', daysLeft: 14, amount: '5 eggs', emoji: '🥚', status: 'safe' },
      { name: 'Butter', category: 'dairy', daysLeft: 21, amount: '1/2 stick', emoji: '🧈', status: 'safe' },
      { name: 'Lemon', category: 'produce', daysLeft: 7, amount: '1 whole', emoji: '🍋', status: 'safe' },
    ];

    const filtered = filter === 'all' ? items
      : filter === 'urgent' ? items.filter(i => i.status === 'urgent' || i.status === 'warning')
      : items.filter(i => i.category === filter);

    const statusColor = (s) => s === 'urgent' ? t.urgent : s === 'warning' ? t.warning : t.safe;
    const statusBg = (s) => s === 'urgent' ? t.urgentLight : s === 'warning' ? t.warningLight : t.safeLight;

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 10 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'My Fridge'),
          React.createElement('div', {
            style: { background: t.primary, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 },
            onClick: () => setActiveTab('scan')
          },
            React.createElement(window.lucide.Plus, { size: 13 }), 'Add Items'
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 } },
          categories.map(cat =>
            React.createElement('div', {
              key: cat.id,
              onClick: () => setFilter(cat.id),
              style: {
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                background: filter === cat.id ? t.primary : t.surfaceAlt,
                color: filter === cat.id ? '#fff' : t.textSecondary,
                transition: 'all 0.15s'
              }
            }, cat.label)
          )
        )
      ),

      React.createElement('div', { style: { padding: '12px 20px 20px' } },
        React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginBottom: 10, fontWeight: 600 } }, `${filtered.length} items`),
        filtered.map((item, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px',
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: `0 1px 4px ${t.shadow}`
            }
          },
            React.createElement('div', { style: { fontSize: 26 } }, item.emoji),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.name),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 1 } }, item.amount)
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', {
                style: {
                  fontSize: 11, fontWeight: 700, color: statusColor(item.status),
                  background: statusBg(item.status), borderRadius: 8, padding: '3px 8px'
                }
              }, item.daysLeft === 1 ? 'Today' : item.daysLeft === 2 ? '2 days' : `${item.daysLeft} days`),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 3 } }, 'expires')
            )
          )
        )
      )
    );
  };

  // ---- SCAN SCREEN ----
  const ScanScreen = () => {
    const [mode, setMode] = useState('camera');
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(false);

    const handleScan = () => {
      setScanning(true);
      setTimeout(() => { setScanning(false); setScanned(true); }, 2000);
    };

    const detectedItems = [
      { name: 'Leftover Pasta', emoji: '🍝', confidence: 96, expiry: '2 days' },
      { name: 'Mozzarella Block', emoji: '🧀', confidence: 91, expiry: '5 days' },
      { name: 'Tomato Sauce Jar', emoji: '🫙', confidence: 88, expiry: '8 days' },
      { name: 'Bell Pepper', emoji: '🫑', confidence: 85, expiry: '4 days' },
    ];

    return React.createElement('div', {
      style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 12 } }, 'Scan Ingredients'),
        React.createElement('div', { style: { display: 'flex', gap: 0, background: t.surfaceAlt, borderRadius: 12, padding: 3 } },
          ['camera', 'receipt', 'manual'].map(m =>
            React.createElement('div', {
              key: m,
              onClick: () => setMode(m),
              style: {
                flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: mode === m ? t.surface : 'transparent',
                color: mode === m ? t.primary : t.textSecondary,
                transition: 'all 0.15s',
                boxShadow: mode === m ? `0 1px 4px ${t.shadow}` : 'none'
              }
            }, m.charAt(0).toUpperCase() + m.slice(1))
          )
        )
      ),

      React.createElement('div', { style: { padding: '16px 20px' } },
        mode === 'camera' && !scanned && React.createElement('div', null,
          React.createElement('div', {
            style: {
              background: t.card, border: `2px dashed ${scanning ? t.primary : t.border}`, borderRadius: 20,
              height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden'
            },
            onClick: !scanning ? handleScan : undefined
          },
            scanning
              ? React.createElement('div', { style: { textAlign: 'center' } },
                  React.createElement('div', {
                    style: {
                      width: 48, height: 48, borderRadius: 24, border: `3px solid ${t.primary}`, borderTopColor: 'transparent',
                      animation: 'spin 0.8s linear infinite', margin: '0 auto 12px'
                    }
                  }),
                  React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.primary } }, 'Analyzing...'),
                  React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4 } }, 'Identifying ingredients')
                )
              : React.createElement('div', { style: { textAlign: 'center' } },
                  React.createElement('div', { style: { width: 64, height: 64, borderRadius: 32, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' } },
                    React.createElement(window.lucide.Camera, { size: 28, color: t.primary })
                  ),
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Take a Photo'),
                  React.createElement('div', { style: { fontSize: 12, color: t.textMuted, marginTop: 4 } }, 'Point at fridge contents')
                )
          ),
          React.createElement('div', {
            style: {
              marginTop: 14, background: t.primary, borderRadius: 14, padding: '14px 0', textAlign: 'center',
              fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer',
              opacity: scanning ? 0.6 : 1
            },
            onClick: !scanning ? handleScan : undefined
          }, scanning ? 'Scanning...' : 'Open Camera')
        ),

        mode === 'camera' && scanned && React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, '4 items detected'),
            React.createElement('div', {
              style: { fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' },
              onClick: () => setScanned(false)
            }, 'Scan again')
          ),
          detectedItems.map((item, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }
            },
              React.createElement('div', { style: { fontSize: 26 } }, item.emoji),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.name),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, marginTop: 1 } }, `Expires in ${item.expiry}`)
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.secondary } }, item.confidence + '%'),
                React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, 'confidence')
              )
            )
          ),
          React.createElement('div', {
            style: { marginTop: 8, background: t.primary, borderRadius: 14, padding: '14px 0', textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' }
          }, 'Add to Fridge Inventory')
        ),

        mode === 'receipt' && React.createElement('div', { style: { textAlign: 'center', padding: '40px 20px' } },
          React.createElement('div', { style: { width: 64, height: 64, borderRadius: 32, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' } },
            React.createElement(window.lucide.FileText, { size: 28, color: t.primary })
          ),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Import Grocery Receipt'),
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, lineHeight: 1.6, marginBottom: 20 } }, 'Take a photo of your receipt or upload a file. We\'ll automatically detect groceries and estimate expiry dates.'),
          React.createElement('div', { style: { background: t.primary, borderRadius: 14, padding: '14px 0', textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' } }, 'Upload Receipt Photo'),
          React.createElement('div', { style: { marginTop: 10, background: t.surfaceAlt, borderRadius: 14, padding: '14px 0', textAlign: 'center', fontSize: 14, fontWeight: 600, color: t.textSecondary, cursor: 'pointer' } }, 'Choose from Files')
        ),

        mode === 'manual' && React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, marginBottom: 14 } }, 'Type ingredient name and quantity'),
          React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 } },
            React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
            React.createElement('div', { style: { fontSize: 14, color: t.textMuted } }, 'Search ingredient...')
          ),
          ['Avocado', 'Sweet Potato', 'Chickpeas', 'Feta Cheese', 'Quinoa', 'Tahini'].map((s, i) =>
            React.createElement('div', {
              key: i,
              style: { background: t.surfaceAlt, borderRadius: 10, padding: '10px 14px', marginBottom: 6, fontSize: 13, fontWeight: 500, color: t.textSecondary, cursor: 'pointer' }
            }, `+ Add ${s}`)
          )
        )
      )
    );
  };

  // ---- RECIPES SCREEN ----
  const RecipesScreen = () => {
    const [selected, setSelected] = useState(null);
    const recipes = [
      {
        name: 'Cilantro-Lime Chicken Bowl',
        emoji: '🍲',
        time: '15 min', effort: 'Easy', servings: 2,
        urgency: 'Use today', urgencyColor: t.urgent, urgencyBg: t.urgentLight,
        match: 97, calories: 420,
        ingredients: ['200g roasted chicken', '2 cups cooked rice', 'Greek yogurt (3 tbsp)', 'Fresh cilantro', '1 lime (add-on)', 'Salt & pepper'],
        steps: ['Slice or shred the roasted chicken.', 'Warm the rice in a pan with a splash of water.', 'Mix yogurt with lime juice, salt, and chopped cilantro.', 'Plate rice, top with chicken, drizzle sauce over.', 'Garnish with extra cilantro and lime wedges.'],
        addOns: [{ name: '1 Lime', price: '$0.40' }, { name: 'Cilantro bunch', price: '$1.00' }],
        tags: ['High Protein', 'Quick', 'No-Waste'],
        leftoverUse: 'Use remaining chicken for tomorrow\'s wrap.'
      },
      {
        name: 'Herb Yogurt Chicken Wrap',
        emoji: '🌯',
        time: '10 min', effort: 'Easy', servings: 1,
        urgency: 'Use today', urgencyColor: t.urgent, urgencyBg: t.urgentLight,
        match: 91, calories: 380,
        ingredients: ['150g roasted chicken', 'Greek yogurt (2 tbsp)', 'Fresh herbs', 'Baby spinach', 'Flour tortilla (add-on)'],
        steps: ['Warm tortilla in dry pan for 30 seconds each side.', 'Mix yogurt with herbs and a pinch of salt.', 'Layer spinach, chicken, and herb yogurt onto tortilla.', 'Roll tightly and slice diagonally.'],
        addOns: [{ name: '2 Flour Tortillas', price: '$0.60' }],
        tags: ['Quick', 'Portable', 'No-Waste'],
        leftoverUse: 'Extra herb yogurt works as a dip for veggies.'
      },
      {
        name: 'Spinach & Egg Scramble',
        emoji: '🍳',
        time: '12 min', effort: 'Easy', servings: 1,
        urgency: 'Use by tomorrow', urgencyColor: t.warning, urgencyBg: t.warningLight,
        match: 88, calories: 290,
        ingredients: ['3 large eggs', 'Baby spinach (2 handfuls)', 'Cheddar cheese (30g)', 'Butter (1 tsp)', 'Salt & pepper'],
        steps: ['Melt butter in non-stick pan over medium heat.', 'Wilt spinach for 1–2 min until soft.', 'Beat eggs with salt and pour in.', 'Scramble gently, add cheese just before done.', 'Serve immediately.'],
        addOns: [],
        tags: ['Vegetarian', 'High Protein', 'Zero Add-ons'],
        leftoverUse: 'Scale up and wrap in tortilla for a breakfast burrito.'
      },
    ];

    if (selected !== null) {
      const r = recipes[selected];
      return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" } },
        React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { cursor: 'pointer', color: t.primary }, onClick: () => setSelected(null) },
            React.createElement(window.lucide.ArrowLeft, { size: 22 })
          ),
          React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: t.text } }, r.name)
        ),
        React.createElement('div', { style: { padding: '16px 20px' } },
          React.createElement('div', { style: { fontSize: 48, textAlign: 'center', marginBottom: 12 } }, r.emoji),
          React.createElement('div', { style: { display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 } },
            r.tags.map((tag, i) =>
              React.createElement('div', { key: i, style: { fontSize: 11, fontWeight: 600, background: t.primaryLight, color: t.primary, borderRadius: 8, padding: '3px 9px' } }, tag)
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 18 } },
            [
              { label: 'Time', value: r.time, icon: window.lucide.Clock },
              { label: 'Effort', value: r.effort, icon: window.lucide.Zap },
              { label: 'Calories', value: r.calories, icon: window.lucide.Flame },
              { label: 'Serves', value: r.servings, icon: window.lucide.Users },
            ].map((stat, i) =>
              React.createElement('div', { key: i, style: { flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '8px 6px', textAlign: 'center' } },
                React.createElement(stat.icon, { size: 14, color: t.primary, style: { margin: '0 auto 4px' } }),
                React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, stat.value),
                React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, stat.label)
              )
            )
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Ingredients'),
          r.ingredients.map((ing, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: `1px solid ${t.border}` } },
              React.createElement('div', { style: { width: 6, height: 6, borderRadius: 3, background: t.primary, flexShrink: 0 } }),
              React.createElement('div', { style: { fontSize: 13, color: t.text } }, ing)
            )
          ),
          r.addOns.length > 0 && React.createElement('div', { style: { margin: '12px 0', background: t.accentLight, borderRadius: 12, padding: '10px 12px' } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 6 } }, 'Tiny Add-ons'),
            r.addOns.map((a, i) =>
              React.createElement('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.text, padding: '3px 0' } },
                React.createElement('span', null, a.name),
                React.createElement('span', { style: { fontWeight: 700, color: t.accent } }, a.price)
              )
            )
          ),
          React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, margin: '14px 0 8px' } }, 'Steps'),
          r.steps.map((step, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 10, marginBottom: 10 } },
              React.createElement('div', { style: { width: 22, height: 22, borderRadius: 11, background: t.primary, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, i + 1),
              React.createElement('div', { style: { fontSize: 13, color: t.text, lineHeight: 1.5, paddingTop: 3 } }, step)
            )
          ),
          React.createElement('div', { style: { background: t.secondaryLight, border: `1px solid ${t.secondary}30`, borderRadius: 12, padding: '10px 12px', marginTop: 8 } },
            React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: t.secondary, marginBottom: 3 } }, 'Leftover Tip'),
            React.createElement('div', { style: { fontSize: 12, color: t.text } }, r.leftoverUse)
          ),
          React.createElement('div', { style: { marginTop: 16, background: t.primary, borderRadius: 14, padding: '14px 0', textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' } }, 'Start Cooking')
        )
      );
    }

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 2 } }, 'Rescue Recipes'),
        React.createElement('div', { style: { fontSize: 12, color: t.textSecondary } }, 'Ranked by urgency and flavor match')
      ),
      React.createElement('div', { style: { padding: '12px 20px 20px' } },
        recipes.map((r, i) =>
          React.createElement('div', {
            key: i,
            style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, marginBottom: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: `0 2px 8px ${t.shadow}` },
            onClick: () => setSelected(i)
          },
            React.createElement('div', { style: { padding: '14px 14px 10px' } },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
                React.createElement('div', { style: { fontSize: 36, lineHeight: 1 } }, r.emoji),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, r.name),
                  React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' } },
                    React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 8, padding: '2px 7px' } }, r.time),
                    React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, background: t.surfaceAlt, borderRadius: 8, padding: '2px 7px' } }, r.effort),
                    React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: r.urgencyColor, background: r.urgencyBg, borderRadius: 8, padding: '2px 7px' } }, r.urgency)
                  )
                ),
                React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
                  React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.secondary } }, r.match + '%'),
                  React.createElement('div', { style: { fontSize: 10, color: t.textMuted } }, 'match')
                )
              )
            ),
            React.createElement('div', { style: { background: t.primary, padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.85)' } },
                r.addOns.length > 0 ? `+ ${r.addOns.length} tiny add-on${r.addOns.length > 1 ? 's' : ''}` : 'Zero extra shopping needed'
              ),
              React.createElement('div', { style: { fontSize: 12, fontWeight: 700, color: '#fff' } }, 'View Recipe →')
            )
          )
        )
      )
    );
  };

  // ---- SETTINGS SCREEN ----
  const SettingsScreen = () => {
    const [skillLevel, setSkillLevel] = useState('intermediate');
    const [timeLimit, setTimeLimit] = useState('30');
    const [notifications, setNotifications] = useState(true);
    const [mealReminders, setMealReminders] = useState(true);

    const Toggle = ({ value, onToggle }) =>
      React.createElement('div', {
        onClick: onToggle,
        style: {
          width: 44, height: 24, borderRadius: 12,
          background: value ? t.primary : t.border,
          position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
        }
      },
        React.createElement('div', {
          style: {
            width: 20, height: 20, borderRadius: 10, background: '#fff',
            position: 'absolute', top: 2, left: value ? 22 : 2,
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }
        })
      );

    return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" } },
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Settings')
      ),

      React.createElement('div', { style: { padding: '16px 20px 20px' } },

        // Profile card
        React.createElement('div', {
          style: { background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, borderRadius: 18, padding: '16px', marginBottom: 18, boxShadow: `0 4px 14px ${t.primary}40` }
        },
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } }, '👨‍🍳'),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Alex Chen'),
              React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)' } }, 'Intermediate Cook · 2-person household'),
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 } }, '🌱 Saved 14 meals from waste this month')
            )
          )
        ),

        // Appearance
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Appearance'),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, marginBottom: 18, overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary }),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, 'Dark Mode'),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, isDark ? 'Night kitchen vibes' : 'Bright & fresh')
              )
            ),
            React.createElement(Toggle, { value: isDark, onToggle: () => setIsDark(!isDark) })
          )
        ),

        // Cooking preferences
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Cooking Preferences'),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, marginBottom: 18, overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '14px 16px', borderBottom: `1px solid ${t.border}` } },
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 } }, 'Skill Level'),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              ['beginner', 'intermediate', 'advanced'].map(s =>
                React.createElement('div', {
                  key: s, onClick: () => setSkillLevel(s),
                  style: {
                    flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: skillLevel === s ? t.primary : t.surfaceAlt,
                    color: skillLevel === s ? '#fff' : t.textSecondary,
                    transition: 'all 0.15s'
                  }
                }, s.charAt(0).toUpperCase() + s.slice(1))
              )
            )
          ),
          React.createElement('div', { style: { padding: '14px 16px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text } }, 'Max Cook Time'),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.primary } }, timeLimit + ' min')
            ),
            React.createElement('div', { style: { position: 'relative', height: 20, display: 'flex', alignItems: 'center' } },
              React.createElement('div', { style: { width: '100%', height: 4, background: t.surfaceAlt, borderRadius: 2, position: 'relative' } },
                React.createElement('div', { style: { width: `${(parseInt(timeLimit) / 60) * 100}%`, height: '100%', background: t.primary, borderRadius: 2 } })
              ),
              ['15', '30', '45', '60'].map(val =>
                React.createElement('div', {
                  key: val, onClick: () => setTimeLimit(val),
                  style: {
                    position: 'absolute',
                    left: `${((parseInt(val) / 60) * 100)}%`,
                    width: 16, height: 16, borderRadius: 8,
                    background: timeLimit === val ? t.primary : t.border,
                    border: `2px solid ${t.primary}`,
                    cursor: 'pointer', transform: 'translateX(-50%)',
                    transition: 'background 0.15s'
                  }
                })
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 } },
              ['15m', '30m', '45m', '60m'].map(l =>
                React.createElement('div', { key: l, style: { fontSize: 10, color: t.textMuted } }, l)
              )
            )
          )
        ),

        // Notifications
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Notifications'),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, marginBottom: 18, overflow: 'hidden' } },
          [
            { label: 'Expiry Alerts', sublabel: 'Warn when items expire soon', val: notifications, set: () => setNotifications(!notifications) },
            { label: 'Meal Reminders', sublabel: 'Dinner suggestions at 5 PM', val: mealReminders, set: () => setMealReminders(!mealReminders) },
          ].map((row, i, arr) =>
            React.createElement('div', { key: i, style: { padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, row.label),
                React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, row.sublabel)
              ),
              React.createElement(Toggle, { value: row.val, onToggle: row.set })
            )
          )
        ),

        // Stats
        React.createElement('div', { style: { background: t.secondaryLight, border: `1px solid ${t.secondary}30`, borderRadius: 16, padding: '14px 16px' } },
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.secondary, marginBottom: 10 } }, 'Your Impact'),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            [
              { label: 'Meals saved', value: '47', emoji: '🍽' },
              { label: 'Waste avoided', value: '3.2kg', emoji: '♻️' },
              { label: 'Money saved', value: '$84', emoji: '💰' },
            ].map((s, i) =>
              React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', background: t.card, borderRadius: 12, padding: '10px 6px' } },
                React.createElement('div', { style: { fontSize: 18 } }, s.emoji),
                React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: t.text, marginTop: 4 } }, s.value),
                React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 1 } }, s.label)
              )
            )
          )
        )
      )
    );
  };

  // ---- SCREENS MAP ----
  const screens = {
    home: HomeScreen,
    fridge: FridgeScreen,
    scan: ScanScreen,
    recipes: RecipesScreen,
    settings: SettingsScreen,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'fridge', label: 'Fridge', icon: window.lucide.Package },
    { id: 'scan', label: 'Scan', icon: window.lucide.Camera },
    { id: 'recipes', label: 'Recipes', icon: window.lucide.ChefHat },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // Spin keyframe injection
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(s);
  }, []);

  const CurrentScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#E8E0D5', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 50,
        background: t.bg,
        boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative'
      }
    },

      // Status bar
      React.createElement('div', {
        style: {
          height: 50, background: t.surface, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', padding: '0 24px 8px', flexShrink: 0,
          borderBottom: `1px solid ${t.border}`
        }
      },
        React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, '9:41'),
        // Dynamic island
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 28, background: '#000', borderRadius: 20
          }
        }),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Wifi, { size: 13, color: t.statusBar }),
          React.createElement(window.lucide.Signal, { size: 13, color: t.statusBar }),
          React.createElement(window.lucide.Battery, { size: 15, color: t.statusBar })
        )
      ),

      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        React.createElement(CurrentScreen)
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          height: 72, background: t.navBg, borderTop: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'stretch', flexShrink: 0,
          boxShadow: `0 -4px 16px ${t.shadow}`
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, cursor: 'pointer',
              paddingBottom: 4,
              opacity: activeTab === tab.id ? 1 : 0.5,
              transition: 'opacity 0.15s'
            }
          },
            tab.id === 'scan'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 22,
                    background: activeTab === tab.id ? t.primary : t.primaryLight,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: activeTab === tab.id ? `0 4px 12px ${t.primary}60` : 'none',
                    transition: 'all 0.2s', marginTop: -18
                  }
                },
                  React.createElement(tab.icon, { size: 20, color: activeTab === tab.id ? '#fff' : t.primary })
                )
              : React.createElement(tab.icon, {
                  size: 22,
                  color: activeTab === tab.id ? t.primary : t.textMuted
                }),
            tab.id !== 'scan' && React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: 600,
                color: activeTab === tab.id ? t.primary : t.textMuted
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
