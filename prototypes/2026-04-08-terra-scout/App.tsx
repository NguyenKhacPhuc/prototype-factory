const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      primary: '#059669',
      secondary: '#10B981',
      cta: '#0891B2',
      bg: '#ECFDF5',
      card: '#FFFFFF',
      cardAlt: '#F0FDF4',
      text: '#064E3B',
      textSecondary: '#047857',
      textMuted: '#6B7280',
      border: '#D1FAE5',
      tabBg: '#FFFFFF',
      tabInactive: '#9CA3AF',
      overlay: 'rgba(6, 78, 59, 0.08)',
      shadow: 'rgba(5, 150, 105, 0.12)',
      badgeBg: '#D1FAE5',
      progressBg: '#E5E7EB',
      inputBg: '#F9FAFB',
    },
    dark: {
      primary: '#10B981',
      secondary: '#34D399',
      cta: '#22D3EE',
      bg: '#022C22',
      card: '#064E3B',
      cardAlt: '#065F46',
      text: '#ECFDF5',
      textSecondary: '#A7F3D0',
      textMuted: '#6EE7B7',
      border: '#065F46',
      tabBg: '#064E3B',
      tabInactive: '#6EE7B7',
      overlay: 'rgba(16, 185, 129, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      badgeBg: '#065F46',
      progressBg: '#065F46',
      inputBg: '#064E3B',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', { dangerouslySetInnerHTML: { __html: `
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
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.4); opacity: 0; }
    }
  `}});

  // ─── Home Screen ───
  function HomeScreen() {
    const [greeting] = useState(() => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 17) return 'Good afternoon';
      return 'Good evening';
    });

    const stats = [
      { label: 'BioPoints', value: '2,480', icon: 'Leaf' },
      { label: 'POIs Found', value: '37', icon: 'MapPin' },
      { label: 'Verified', value: '24', icon: 'CheckCircle' },
      { label: 'Rank', value: '#12', icon: 'Trophy' },
    ];

    const recentPOIs = [
      { name: 'Green Roots Market', type: 'Zero-Waste Shop', pts: 45, verified: true, distance: '0.3 mi' },
      { name: 'Oak St Community Garden', type: 'Community Garden', pts: 35, verified: true, distance: '0.7 mi' },
      { name: 'AquaFill Station - Central', type: 'Water Refill', pts: 25, verified: false, distance: '1.2 mi' },
    ];

    const activeHunts = [
      { name: 'Fountain Finder', desc: 'Find 5 public water fountains', progress: 3, total: 5, reward: 200, deadline: '2d left' },
      { name: 'Compost Quest', desc: 'Locate 3 composting bins nearby', progress: 1, total: 3, reward: 150, deadline: '5d left' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.4s ease-out' } },
      // Header
      React.createElement('div', { style: {
        padding: '20px 20px 16px',
        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
        borderRadius: '0 0 24px 24px',
      }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }},
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}, greeting + ', Scout!'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 28, color: '#fff', fontWeight: 800, letterSpacing: -0.5 }}, 'Terra Scout'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' }},
            React.createElement('button', {
              onClick: () => setIsDark(!isDark),
              style: { width: 40, height: 40, borderRadius: 20, border: 'none', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
            }, React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 20, color: '#fff' })),
            React.createElement('div', { style: {
              width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}, React.createElement(window.lucide.User, { size: 22, color: '#fff' })),
          ),
        ),
        // Stats row
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }},
          ...stats.map((s, i) =>
            React.createElement('div', { key: i, style: {
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 14,
              padding: '10px 4px',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
            }},
              React.createElement(window.lucide[s.icon], { size: 18, color: '#fff', style: { marginBottom: 4 } }),
              React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: '#fff' }}, s.value),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}, s.label),
            )
          )
        ),
      ),

      // Active Eco-Hunts
      React.createElement('div', { style: { padding: '20px 20px 0' }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }},
          React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}, 'Active Eco-Hunts'),
          React.createElement('button', {
            onClick: () => setActiveScreen('hunts'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, color: t.cta, fontWeight: 600, cursor: 'pointer', padding: '4px 0' },
          }, React.createElement('span', null, 'See All')),
        ),
        ...activeHunts.map((hunt, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 10,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer',
            animation: `slideUp 0.5s ease-out ${0.1 + i * 0.1}s both`,
          }, onClick: () => setActiveScreen('hunts'),
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${t.shadow}`; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 12px ${t.shadow}`; },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }},
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text }}, hunt.name),
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 2 }}, hunt.desc),
              ),
              React.createElement('span', { style: {
                fontFamily: font, fontSize: 12, fontWeight: 600, color: '#D97706',
                background: '#FEF3C7', padding: '3px 8px', borderRadius: 8,
              }}, hunt.deadline),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 }},
              React.createElement('div', { style: { flex: 1, height: 8, borderRadius: 4, background: t.progressBg, overflow: 'hidden' }},
                React.createElement('div', { style: {
                  width: `${(hunt.progress / hunt.total) * 100}%`, height: '100%',
                  borderRadius: 4, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
                  transition: 'width 0.6s ease',
                }}),
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary }}, `${hunt.progress}/${hunt.total}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 }},
                React.createElement(window.lucide.Leaf, { size: 14, color: t.primary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary }}, `+${hunt.reward}`),
              ),
            ),
          )
        ),
      ),

      // Recent Discoveries
      React.createElement('div', { style: { padding: '16px 20px 100px' }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }},
          React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}, 'Nearby Discoveries'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, color: t.cta, fontWeight: 600, cursor: 'pointer', padding: '4px 0' },
          }, React.createElement('span', null, 'Explore')),
        ),
        ...recentPOIs.map((poi, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 16, padding: 14, marginBottom: 10,
            boxShadow: `0 2px 8px ${t.shadow}`, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'transform 0.15s', cursor: 'pointer',
            animation: `slideUp 0.5s ease-out ${0.2 + i * 0.08}s both`,
          },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.01)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', { style: {
              width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${t.primary}20, ${t.secondary}30)`,
              flexShrink: 0,
            }},
              React.createElement(window.lucide[poi.type === 'Zero-Waste Shop' ? 'Store' : poi.type === 'Community Garden' ? 'Flower2' : 'Droplets'], { size: 22, color: t.primary }),
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 }},
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }}, poi.name),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }},
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, poi.type),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted }}, '\u00B7'),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, poi.distance),
              ),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }},
                React.createElement(window.lucide.Leaf, { size: 13, color: t.primary }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.primary }}, `+${poi.pts}`),
              ),
              poi.verified
                ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, justifyContent: 'flex-end' }},
                    React.createElement(window.lucide.BadgeCheck, { size: 13, color: t.secondary }),
                    React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.secondary, fontWeight: 500 }}, 'Verified'),
                  )
                : React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: '#D97706', fontWeight: 500 }}, 'Needs verify'),
            ),
          )
        ),
      ),
    );
  }

  // ─── Explore Screen (Map) ───
  function ExploreScreen() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
      { id: 'all', label: 'All', icon: 'Globe' },
      { id: 'shops', label: 'Shops', icon: 'Store' },
      { id: 'gardens', label: 'Gardens', icon: 'Flower2' },
      { id: 'water', label: 'Water', icon: 'Droplets' },
      { id: 'compost', label: 'Compost', icon: 'Recycle' },
      { id: 'energy', label: 'Energy', icon: 'Zap' },
    ];

    const mapPins = [
      { name: 'Green Roots Market', x: 45, y: 30, type: 'shops', verified: true },
      { name: 'EcoFill Station', x: 70, y: 45, type: 'water', verified: true },
      { name: 'Oak St Garden', x: 25, y: 55, type: 'gardens', verified: true },
      { name: 'City Compost Hub', x: 60, y: 65, type: 'compost', verified: false },
      { name: 'Solar Cafe', x: 35, y: 40, type: 'energy', verified: true },
      { name: 'Refill Corner', x: 55, y: 20, type: 'shops', verified: false },
      { name: 'Rain Garden Park', x: 80, y: 35, type: 'gardens', verified: true },
    ];

    const filtered = selectedCategory === 'all' ? mapPins : mapPins.filter(p => p.type === selectedCategory);
    const [selectedPin, setSelectedPin] = useState(null);

    return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease-out' } },
      // Search bar
      React.createElement('div', { style: { padding: '16px 20px 12px' }},
        React.createElement('div', { style: {
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.inputBg, borderRadius: 14, padding: '10px 14px',
          border: `1px solid ${t.border}`,
        }},
          React.createElement(window.lucide.Search, { size: 20, color: t.textMuted }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, color: t.textMuted }}, 'Search eco-friendly spots...'),
          React.createElement('div', { style: { marginLeft: 'auto' }},
            React.createElement(window.lucide.SlidersHorizontal, { size: 20, color: t.textSecondary }),
          ),
        ),
      ),

      // Category pills
      React.createElement('div', { style: { padding: '0 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }},
        ...categories.map(cat =>
          React.createElement('button', {
            key: cat.id,
            onClick: () => { setSelectedCategory(cat.id); setSelectedPin(null); },
            style: {
              display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px',
              borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: font, fontSize: 13, fontWeight: 600,
              background: selectedCategory === cat.id ? t.primary : t.card,
              color: selectedCategory === cat.id ? '#fff' : t.textSecondary,
              boxShadow: `0 1px 4px ${t.shadow}`,
              transition: 'all 0.2s ease',
            },
          },
            React.createElement(window.lucide[cat.icon], { size: 14 }),
            React.createElement('span', null, cat.label),
          )
        ),
      ),

      // Map area
      React.createElement('div', { style: {
        margin: '0 20px', height: 320, borderRadius: 20, position: 'relative', overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(145deg, #0A3D2E 0%, #064E3B 30%, #022C22 70%, #0A3D2E 100%)'
          : 'linear-gradient(145deg, #D1FAE5 0%, #A7F3D0 30%, #6EE7B7 50%, #BBF7D0 70%, #ECFDF5 100%)',
        boxShadow: `0 4px 20px ${t.shadow}`,
        border: `1px solid ${t.border}`,
      }},
        // Grid lines
        ...[20, 40, 60, 80].map(p =>
          React.createElement('div', { key: 'h' + p, style: {
            position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 1,
            background: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(5,150,105,0.08)',
          }}),
        ),
        ...[20, 40, 60, 80].map(p =>
          React.createElement('div', { key: 'v' + p, style: {
            position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1,
            background: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(5,150,105,0.08)',
          }}),
        ),
        // "Streets"
        React.createElement('div', { style: { position: 'absolute', top: '48%', left: 0, right: 0, height: 3, background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(5,150,105,0.12)', borderRadius: 2 }}),
        React.createElement('div', { style: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(5,150,105,0.12)', borderRadius: 2 }}),

        // Pins
        ...filtered.map((pin, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setSelectedPin(selectedPin === i ? null : i),
            style: {
              position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`,
              transform: 'translate(-50%, -50%)', border: 'none', cursor: 'pointer', background: 'none',
              padding: 0, zIndex: selectedPin === i ? 10 : 1,
              animation: `slideUp 0.4s ease-out ${i * 0.06}s both`,
            },
          },
            React.createElement('div', { style: {
              width: selectedPin === i ? 40 : 32, height: selectedPin === i ? 40 : 32,
              borderRadius: selectedPin === i ? 14 : 10,
              background: pin.verified ? t.primary : '#D97706',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: selectedPin === i ? `0 4px 16px ${t.shadow}` : `0 2px 8px ${t.shadow}`,
              transition: 'all 0.2s ease',
              border: '2px solid #fff',
            }},
              React.createElement(window.lucide.MapPin, { size: selectedPin === i ? 20 : 16, color: '#fff' }),
            ),
          ),
        ),

        // Pin popup
        selectedPin !== null && React.createElement('div', { style: {
          position: 'absolute',
          left: `${filtered[selectedPin].x}%`,
          top: `${filtered[selectedPin].y - 18}%`,
          transform: 'translateX(-50%)',
          background: t.card, borderRadius: 12, padding: '8px 12px',
          boxShadow: `0 4px 16px ${t.shadow}`, border: `1px solid ${t.border}`,
          whiteSpace: 'nowrap', animation: 'fadeIn 0.2s ease-out',
          zIndex: 20,
        }},
          React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text }}, filtered[selectedPin].name),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }},
            filtered[selectedPin].verified
              ? React.createElement(window.lucide.BadgeCheck, { size: 12, color: t.secondary })
              : React.createElement(window.lucide.AlertCircle, { size: 12, color: '#D97706' }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.textMuted }},
              filtered[selectedPin].verified ? 'Verified' : 'Needs verification'),
          ),
        ),

        // User location
        React.createElement('div', { style: {
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }},
          React.createElement('div', { style: {
            width: 16, height: 16, borderRadius: 8, background: t.cta,
            border: '3px solid #fff', boxShadow: `0 0 0 4px ${t.cta}33`,
          }}),
        ),
      ),

      // Quick stats
      React.createElement('div', { style: { padding: '16px 20px', display: 'flex', gap: 10 }},
        [
          { label: 'Nearby POIs', value: '14', icon: 'MapPin' },
          { label: 'Unverified', value: '5', icon: 'AlertCircle' },
          { label: 'Your Finds', value: '8', icon: 'Star' },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: {
            flex: 1, background: t.card, borderRadius: 14, padding: '12px 8px',
            textAlign: 'center', boxShadow: `0 2px 8px ${t.shadow}`,
            border: `1px solid ${t.border}`,
          }},
            React.createElement(window.lucide[s.icon], { size: 18, color: t.primary, style: { marginBottom: 4 } }),
            React.createElement('div', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text }}, s.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted }}, s.label),
          ),
        ),
      ),

      // Add POI button
      React.createElement('div', { style: { padding: '0 20px 100px', textAlign: 'center' }},
        React.createElement('button', {
          style: {
            width: '100%', padding: '16px', borderRadius: 16, border: 'none',
            background: `linear-gradient(135deg, ${t.cta}, ${t.primary})`,
            color: '#fff', fontFamily: font, fontSize: 17, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 4px 16px ${t.cta}40`,
            transition: 'transform 0.15s, box-shadow 0.15s',
          },
          onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; },
        },
          React.createElement(window.lucide.Plus, { size: 20 }),
          React.createElement('span', null, 'Submit New POI'),
        ),
      ),
    );
  }

  // ─── Eco-Hunts Screen ───
  function HuntsScreen() {
    const [activeTab, setActiveTab] = useState('active');

    const hunts = {
      active: [
        { name: 'Fountain Finder', desc: 'Find 5 public water fountains in your district', progress: 3, total: 5, reward: 200, badge: 'Hydro Scout', deadline: '2d', icon: 'Droplets', color: '#0891B2' },
        { name: 'Compost Quest', desc: 'Locate 3 composting bins nearby', progress: 1, total: 3, reward: 150, badge: 'Compost Champion', deadline: '5d', icon: 'Recycle', color: '#059669' },
        { name: 'Solar Spotter', desc: 'Find 4 businesses with solar panels', progress: 0, total: 4, reward: 250, badge: 'Solar Scout', deadline: '7d', icon: 'Sun', color: '#D97706' },
      ],
      completed: [
        { name: 'Garden Explorer', desc: 'Visit 3 community gardens', progress: 3, total: 3, reward: 175, badge: 'Green Thumb', icon: 'Flower2', color: '#059669' },
        { name: 'Refill Ranger', desc: 'Find 5 water refill stations', progress: 5, total: 5, reward: 200, badge: 'Refill Ranger', icon: 'Droplets', color: '#0891B2' },
      ],
    };

    return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease-out' } },
      React.createElement('div', { style: { padding: '20px 20px 0' }},
        React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}, 'Eco-Hunts'),
        React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, marginTop: 4 }}, 'Complete themed challenges for bonus rewards'),
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', margin: '16px 20px 0', background: t.overlay, borderRadius: 12, padding: 3 }},
        ['active', 'completed'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              background: activeTab === tab ? t.card : 'transparent',
              color: activeTab === tab ? t.text : t.textMuted,
              boxShadow: activeTab === tab ? `0 1px 4px ${t.shadow}` : 'none',
              transition: 'all 0.2s ease',
            },
          }, React.createElement('span', null, tab.charAt(0).toUpperCase() + tab.slice(1))),
        ),
      ),

      // Hunt cards
      React.createElement('div', { style: { padding: '16px 20px 100px' }},
        ...hunts[activeTab].map((hunt, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 20, padding: 0, marginBottom: 14,
            boxShadow: `0 2px 16px ${t.shadow}`, border: `1px solid ${t.border}`,
            overflow: 'hidden', animation: `slideUp 0.5s ease-out ${i * 0.08}s both`,
            transition: 'transform 0.2s', cursor: 'pointer',
          },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-2px)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; },
          },
            // Top accent
            React.createElement('div', { style: {
              height: 4, background: `linear-gradient(90deg, ${hunt.color}, ${t.secondary})`,
            }}),
            React.createElement('div', { style: { padding: 16 }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 }},
                React.createElement('div', { style: {
                  width: 50, height: 50, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${hunt.color}18`,
                }},
                  React.createElement(window.lucide[hunt.icon], { size: 24, color: hunt.color }),
                ),
                React.createElement('div', { style: { flex: 1 }},
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }},
                    React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text }}, hunt.name),
                    hunt.deadline && React.createElement('span', { style: {
                      fontFamily: font, fontSize: 12, fontWeight: 600, color: '#D97706',
                      background: '#FEF3C7', padding: '3px 8px', borderRadius: 8,
                    }}, hunt.deadline),
                  ),
                  React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 3 }}, hunt.desc),
                ),
              ),

              // Progress
              React.createElement('div', { style: { marginTop: 14 }},
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }},
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, `${hunt.progress} of ${hunt.total} complete`),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: hunt.color }}, `${Math.round((hunt.progress / hunt.total) * 100)}%`),
                ),
                React.createElement('div', { style: { height: 8, borderRadius: 4, background: t.progressBg, overflow: 'hidden' }},
                  React.createElement('div', { style: {
                    width: `${(hunt.progress / hunt.total) * 100}%`, height: '100%',
                    borderRadius: 4, background: `linear-gradient(90deg, ${hunt.color}, ${t.secondary})`,
                    transition: 'width 0.6s ease',
                  }}),
                ),
              ),

              // Rewards
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }},
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 }},
                  React.createElement(window.lucide.Award, { size: 16, color: t.primary }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 500, color: t.textSecondary }}, hunt.badge),
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 }},
                  React.createElement(window.lucide.Leaf, { size: 14, color: t.primary }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary }}, `+${hunt.reward}`),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // ─── Leaderboard Screen ───
  function LeaderboardScreen() {
    const [scope, setScope] = useState('city');

    const leaders = [
      { name: 'EcoExplorer42', pts: 5280, pois: 89, badge: 'Zero-Waste Wizard', avatar: 'E' },
      { name: 'GreenPathfinder', pts: 4910, pois: 76, badge: 'Compost Champion', avatar: 'G' },
      { name: 'TerraNova', pts: 4650, pois: 71, badge: 'Solar Scout', avatar: 'T' },
      { name: 'BioPioneer', pts: 3820, pois: 58, badge: 'Garden Guru', avatar: 'B' },
      { name: 'LeafHunter', pts: 3490, pois: 52, badge: 'Hydro Scout', avatar: 'L' },
      { name: 'WildGreen', pts: 3200, pois: 47, badge: 'Nature Navigator', avatar: 'W' },
      { name: 'EarthWalker', pts: 2950, pois: 43, badge: 'Trail Blazer', avatar: 'E' },
      { name: 'YourAccount', pts: 2480, pois: 37, badge: 'Rising Scout', avatar: 'Y', isYou: true },
    ];

    const topThree = leaders.slice(0, 3);
    const rest = leaders.slice(3);
    const podiumColors = ['#F59E0B', '#9CA3AF', '#CD7F32'];
    const podiumSizes = [72, 60, 56];
    const podiumOrder = [1, 0, 2];

    return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease-out' } },
      React.createElement('div', { style: { padding: '20px 20px 0' }},
        React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}, 'Leaderboard'),
      ),

      // Scope tabs
      React.createElement('div', { style: { display: 'flex', margin: '12px 20px 0', background: t.overlay, borderRadius: 12, padding: 3 }},
        ['friends', 'hood', 'city', 'global'].map(s =>
          React.createElement('button', {
            key: s, onClick: () => setScope(s),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: scope === s ? t.card : 'transparent',
              color: scope === s ? t.text : t.textMuted,
              boxShadow: scope === s ? `0 1px 4px ${t.shadow}` : 'none',
              transition: 'all 0.2s', textTransform: 'capitalize',
            },
          }, React.createElement('span', null, s === 'hood' ? 'Neighborhood' : s)),
        ),
      ),

      // Podium
      React.createElement('div', { style: {
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12,
        padding: '24px 20px 16px',
      }},
        ...podiumOrder.map(idx => {
          const l = topThree[idx];
          const rank = idx + 1;
          return React.createElement('div', { key: idx, style: {
            textAlign: 'center', animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`,
          }},
            React.createElement('div', { style: { position: 'relative', display: 'inline-block' }},
              React.createElement('div', { style: {
                width: podiumSizes[idx], height: podiumSizes[idx], borderRadius: podiumSizes[idx] / 2,
                background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `3px solid ${podiumColors[idx]}`,
                boxShadow: `0 4px 16px ${t.shadow}`,
                margin: '0 auto',
              }},
                React.createElement('span', { style: { fontFamily: font, fontSize: podiumSizes[idx] * 0.35, fontWeight: 700, color: '#fff' }}, l.avatar),
              ),
              React.createElement('div', { style: {
                position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                width: 24, height: 24, borderRadius: 12, background: podiumColors[idx],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: font, fontSize: 12, fontWeight: 700, color: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}, rank),
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, marginTop: 10 }}, l.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: 2 }},
              React.createElement(window.lucide.Leaf, { size: 12, color: t.primary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.primary }}, l.pts.toLocaleString()),
            ),
          );
        }),
      ),

      // Rest of rankings
      React.createElement('div', { style: { padding: '0 20px 100px' }},
        ...rest.map((l, i) => {
          const rank = i + 4;
          return React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 12,
            background: l.isYou ? `${t.primary}12` : t.card, borderRadius: 14, padding: '12px 14px',
            marginBottom: 8, boxShadow: `0 1px 6px ${t.shadow}`,
            border: l.isYou ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
            animation: `slideUp 0.4s ease-out ${0.3 + i * 0.06}s both`,
          }},
            React.createElement('span', { style: {
              fontFamily: font, fontSize: 15, fontWeight: 700, color: t.textMuted,
              width: 28, textAlign: 'center',
            }}, `#${rank}`),
            React.createElement('div', { style: {
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${t.primary}${l.isYou ? '' : '80'}, ${t.secondary}${l.isYou ? '' : '80'})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }},
              React.createElement('span', { style: { fontFamily: font, fontSize: 16, fontWeight: 700, color: '#fff' }}, l.avatar),
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 }},
                React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }}, l.isYou ? 'You' : l.name),
                l.isYou && React.createElement('span', { style: {
                  fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary,
                  background: t.badgeBg, padding: '2px 6px', borderRadius: 6,
                }}, 'You'),
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textMuted, marginTop: 1 }}, `${l.pois} POIs \u00B7 ${l.badge}`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 }},
              React.createElement(window.lucide.Leaf, { size: 14, color: t.primary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary }}, l.pts.toLocaleString()),
            ),
          );
        }),
      ),
    );
  }

  // ─── Community Feed Screen ───
  function FeedScreen() {
    const feedItems = [
      {
        type: 'milestone',
        title: 'City Milestone Reached!',
        desc: 'Downtown district has mapped 500+ sustainable POIs. Your community is making a real impact!',
        time: '2h ago',
        icon: 'Flag',
        color: '#059669',
        stats: { scouts: 234, pois: 512, verifications: 1847 },
      },
      {
        type: 'event',
        title: 'Community Garden Clean-Up',
        desc: 'Join fellow Scouts at Oak Street Garden this Saturday. Earn 100 bonus BioPoints for participating!',
        time: '5h ago',
        icon: 'Calendar',
        color: '#0891B2',
        date: 'Sat, Apr 12 \u00B7 10:00 AM',
        attendees: 28,
      },
      {
        type: 'discovery',
        title: 'New POI: EcoBrew Coffee',
        desc: 'GreenPathfinder discovered a new zero-waste coffee shop on Elm Street. Uses fully compostable packaging!',
        time: '8h ago',
        icon: 'MapPin',
        color: '#D97706',
        user: 'GreenPathfinder',
      },
      {
        type: 'challenge',
        title: 'Weekly Challenge Results',
        desc: 'The "Bike Lane Mapper" challenge ended. 47 Scouts mapped 89 new bike lanes across the city!',
        time: '1d ago',
        icon: 'Trophy',
        color: '#7C3AED',
        participants: 47,
      },
      {
        type: 'impact',
        title: 'Your Impact This Month',
        desc: 'You helped verify 12 POIs and completed 2 Eco-Hunts. Your efforts saved an estimated 3.2kg of waste from landfills.',
        time: '2d ago',
        icon: 'TrendingUp',
        color: '#059669',
        personal: true,
      },
    ];

    const [liked, setLiked] = useState({});

    return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease-out' } },
      React.createElement('div', { style: { padding: '20px 20px 0' }},
        React.createElement('div', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }}, 'Community'),
        React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, marginTop: 4 }}, 'See what your fellow Scouts are up to'),
      ),

      // Impact banner
      React.createElement('div', { style: {
        margin: '16px 20px 0', padding: 18, borderRadius: 18,
        background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`,
        boxShadow: `0 4px 20px ${t.primary}30`,
        animation: 'slideUp 0.5s ease-out',
      }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }},
          React.createElement(window.lucide.Globe, { size: 20, color: '#fff' }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#fff' }}, 'Collective Impact'),
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }},
          [
            { value: '12.4K', label: 'POIs Mapped' },
            { value: '3.2K', label: 'Active Scouts' },
            { value: '890kg', label: 'Waste Diverted' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' }},
              React.createElement('div', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: '#fff' }}, s.value),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}, s.label),
            ),
          ),
        ),
      ),

      // Feed
      React.createElement('div', { style: { padding: '16px 20px 100px' }},
        ...feedItems.map((item, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 18, padding: 16, marginBottom: 12,
            boxShadow: `0 2px 12px ${t.shadow}`, border: `1px solid ${t.border}`,
            animation: `slideUp 0.5s ease-out ${i * 0.08}s both`,
            transition: 'transform 0.15s',
          },
            onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-1px)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }},
              React.createElement('div', { style: {
                width: 42, height: 42, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${item.color}15`, flexShrink: 0,
              }},
                React.createElement(window.lucide[item.icon], { size: 20, color: item.color }),
              ),
              React.createElement('div', { style: { flex: 1 }},
                React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text }}, item.title),
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 1 }}, item.time),
              ),
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, lineHeight: 1.45, marginBottom: 12 }}, item.desc),

            // Event date
            item.date && React.createElement('div', { style: {
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
              background: t.overlay, borderRadius: 10, marginBottom: 12,
            }},
              React.createElement(window.lucide.Clock, { size: 16, color: t.cta }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text }}, item.date),
              item.attendees && React.createElement('span', { style: { marginLeft: 'auto', fontFamily: font, fontSize: 12, color: t.textMuted }}, `${item.attendees} going`),
            ),

            // Actions
            React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' }},
              React.createElement('button', {
                onClick: () => setLiked(prev => ({ ...prev, [i]: !prev[i] })),
                style: {
                  display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                  border: 'none', cursor: 'pointer', padding: '6px 0',
                },
              },
                React.createElement(window.lucide.Heart, {
                  size: 18,
                  color: liked[i] ? '#EF4444' : t.textMuted,
                  fill: liked[i] ? '#EF4444' : 'none',
                  style: { transition: 'all 0.2s' },
                }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: liked[i] ? '#EF4444' : t.textMuted }}, liked[i] ? 'Liked' : 'Like'),
              ),
              React.createElement('button', { style: {
                display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                border: 'none', cursor: 'pointer', padding: '6px 0',
              }},
                React.createElement(window.lucide.MessageCircle, { size: 18, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, 'Comment'),
              ),
              React.createElement('button', { style: {
                display: 'flex', alignItems: 'center', gap: 5, background: 'none',
                border: 'none', cursor: 'pointer', padding: '6px 0',
              }},
                React.createElement(window.lucide.Share2, { size: 18, color: t.textMuted }),
                React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, 'Share'),
              ),
            ),
          ),
        ),
      ),
    );
  }

  // ─── Profile Screen ───
  function ProfileScreen() {
    const badges = [
      { name: 'Compost Champion', icon: 'Recycle', color: '#059669', earned: true },
      { name: 'Hydro Scout', icon: 'Droplets', color: '#0891B2', earned: true },
      { name: 'Garden Guru', icon: 'Flower2', color: '#10B981', earned: true },
      { name: 'Zero-Waste Wizard', icon: 'Sparkles', color: '#7C3AED', earned: false },
      { name: 'Solar Scout', icon: 'Sun', color: '#D97706', earned: false },
      { name: 'Trail Blazer', icon: 'Compass', color: '#EF4444', earned: false },
    ];

    const activities = [
      { action: 'Verified POI', detail: 'Green Roots Market', pts: '+20', time: '1h ago' },
      { action: 'Completed Hunt', detail: 'Refill Ranger', pts: '+200', time: '3h ago' },
      { action: 'Submitted POI', detail: 'EcoBrew Coffee', pts: '+45', time: '1d ago' },
      { action: 'Verified POI', detail: 'Oak St Community Garden', pts: '+20', time: '2d ago' },
    ];

    return React.createElement('div', { style: { animation: 'fadeIn 0.3s ease-out' } },
      // Profile header
      React.createElement('div', { style: {
        padding: '24px 20px 20px', textAlign: 'center',
        background: `linear-gradient(180deg, ${t.primary}15, transparent)`,
      }},
        React.createElement('div', { style: {
          width: 80, height: 80, borderRadius: 40, margin: '0 auto 12px',
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 20px ${t.primary}40`,
          animation: 'float 3s ease-in-out infinite',
        }},
          React.createElement('span', { style: { fontFamily: font, fontSize: 32, fontWeight: 700, color: '#fff' }}, 'S'),
        ),
        React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text }}, 'Scout_Steve'),
        React.createElement('div', { style: { fontFamily: font, fontSize: 15, color: t.textMuted, marginTop: 2 }}, 'Rising Scout \u00B7 Joined Mar 2026'),

        // Settings / theme
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 }},
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
              borderRadius: 10, border: `1px solid ${t.border}`, background: t.card,
              fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, cursor: 'pointer',
            },
          },
            React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 16 }),
            React.createElement('span', null, isDark ? 'Light Mode' : 'Dark Mode'),
          ),
          React.createElement('button', { style: {
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            borderRadius: 10, border: `1px solid ${t.border}`, background: t.card,
            fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, cursor: 'pointer',
          }},
            React.createElement(window.lucide.Settings, { size: 16 }),
            React.createElement('span', null, 'Settings'),
          ),
        ),
      ),

      // Stats cards
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '0 20px' }},
        [
          { label: 'BioPoints', value: '2,480', icon: 'Leaf', sub: 'Top 15% in city' },
          { label: 'POIs Found', value: '37', icon: 'MapPin', sub: '24 verified' },
          { label: 'Hunts Done', value: '8', icon: 'Target', sub: '2 active' },
          { label: 'Streak', value: '12 days', icon: 'Flame', sub: 'Personal best!' },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: {
            background: t.card, borderRadius: 16, padding: 14,
            boxShadow: `0 2px 10px ${t.shadow}`, border: `1px solid ${t.border}`,
            animation: `slideUp 0.4s ease-out ${i * 0.06}s both`,
          }},
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }},
              React.createElement(window.lucide[s.icon], { size: 16, color: t.primary }),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, s.label),
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}, s.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.secondary, marginTop: 2 }}, s.sub),
          ),
        ),
      ),

      // Badges
      React.createElement('div', { style: { padding: '20px 20px 0' }},
        React.createElement('div', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }}, 'Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }},
          ...badges.map((b, i) =>
            React.createElement('div', { key: i, style: {
              background: t.card, borderRadius: 14, padding: '14px 8px', textAlign: 'center',
              boxShadow: `0 1px 6px ${t.shadow}`, border: `1px solid ${t.border}`,
              opacity: b.earned ? 1 : 0.4,
              animation: `fadeIn 0.4s ease-out ${i * 0.05}s both`,
            }},
              React.createElement('div', { style: {
                width: 40, height: 40, borderRadius: 20, margin: '0 auto 6px',
                background: b.earned ? `${b.color}18` : t.progressBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }},
                React.createElement(window.lucide[b.icon], { size: 20, color: b.earned ? b.color : t.textMuted }),
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.text }}, b.name),
            ),
          ),
        ),
      ),

      // Activity
      React.createElement('div', { style: { padding: '20px 20px 100px' }},
        React.createElement('div', { style: { fontFamily: font, fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }}, 'Recent Activity'),
        ...activities.map((a, i) =>
          React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
            borderBottom: i < activities.length - 1 ? `1px solid ${t.border}` : 'none',
            animation: `fadeIn 0.4s ease-out ${0.2 + i * 0.06}s both`,
          }},
            React.createElement('div', { style: {
              width: 36, height: 36, borderRadius: 10, background: t.overlay,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }},
              React.createElement(window.lucide[a.action.includes('Verified') ? 'CheckCircle' : a.action.includes('Completed') ? 'Trophy' : 'MapPin'], { size: 18, color: t.primary }),
            ),
            React.createElement('div', { style: { flex: 1 }},
              React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }}, a.action),
              React.createElement('div', { style: { fontFamily: font, fontSize: 13, color: t.textMuted }}, a.detail),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 }},
              React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.primary }}, a.pts),
              React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textMuted }}, a.time),
            ),
          ),
        ),
      ),
    );
  }

  // ─── Navigation ───
  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Map' },
    { id: 'hunts', label: 'Hunts', icon: 'Target' },
    { id: 'leaderboard', label: 'Ranks', icon: 'Trophy' },
    { id: 'feed', label: 'Feed', icon: 'Users' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    hunts: HuntsScreen,
    leaderboard: LeaderboardScreen,
    feed: FeedScreen,
    profile: ProfileScreen,
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      fontFamily: font,
    },
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        background: t.bg,
        boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      },
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        },
      },
        React.createElement(screens[activeScreen]),
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: t.tabBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          paddingBottom: 20,
          paddingTop: 8,
          boxShadow: `0 -2px 12px ${t.shadow}`,
        },
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'transform 0.15s',
              minHeight: 44,
              justifyContent: 'center',
            },
          },
            React.createElement(window.lucide[tab.icon], {
              size: 22,
              color: activeScreen === tab.id ? t.primary : t.tabInactive,
              strokeWidth: activeScreen === tab.id ? 2.5 : 2,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font,
                fontSize: 10,
                fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.primary : t.tabInactive,
              },
            }, tab.label),
          ),
        ),
      ),
    ),
  );
}
