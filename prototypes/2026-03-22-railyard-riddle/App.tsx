
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C18',
    surface: '#111827',
    surface2: '#1A2236',
    surface3: '#222D42',
    primary: '#FF6B00',
    primaryLight: '#FF8C33',
    primaryGlow: 'rgba(255,107,0,0.18)',
    secondary: '#00D4AA',
    secondaryGlow: 'rgba(0,212,170,0.15)',
    text: '#EEF2FF',
    textMuted: '#6B7A9F',
    textDim: '#3D4F72',
    border: '#1E2D45',
    borderLight: '#2A3A55',
    success: '#00D4AA',
    warning: '#FFB830',
    danger: '#FF4060',
    dangerGlow: 'rgba(255,64,96,0.18)',
    badge: '#FF6B00',
    navBg: '#0D1524',
    statusBar: '#080C18',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    surface2: '#EEF2FF',
    surface3: '#E4EBFF',
    primary: '#FF6B00',
    primaryLight: '#FF8C33',
    primaryGlow: 'rgba(255,107,0,0.12)',
    secondary: '#00B894',
    secondaryGlow: 'rgba(0,184,148,0.12)',
    text: '#111827',
    textMuted: '#5A6A8A',
    textDim: '#B0BDD4',
    border: '#DDE4F5',
    borderLight: '#C8D4EE',
    success: '#00B894',
    warning: '#F59E0B',
    danger: '#EF4444',
    dangerGlow: 'rgba(239,68,68,0.12)',
    badge: '#FF6B00',
    navBg: '#FFFFFF',
    statusBar: '#F0F4FF',
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; }
    ::-webkit-scrollbar { width: 0px; }
  `;

  const tabs = [
    { id: 'home', label: 'Today', icon: window.lucide.LayoutGrid },
    { id: 'puzzle', label: 'Play', icon: window.lucide.Puzzle },
    { id: 'insights', label: 'Insights', icon: window.lucide.BarChart2 },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    puzzle: PuzzleScreen,
    insights: InsightsScreen,
    profile: ProfileScreen,
  };

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: isDark
      ? '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)'
      : '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  };

  const navItemStyle = (tab) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    padding: '6px 16px',
    borderRadius: 14,
    transition: 'all 0.2s ease',
    background: activeTab === tab.id ? t.primaryGlow : 'transparent',
    transform: pressedTab === tab.id ? 'scale(0.9)' : 'scale(1)',
  });

  const labelStyle = (tab) => ({
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.3,
    color: activeTab === tab.id ? t.primary : t.textMuted,
  });

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: isDark ? '#030508' : '#CBD5E1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }
  },
    React.createElement('style', null, fontStyle),
    React.createElement('div', { style: phoneStyle },
      React.createElement(DynamicIsland, { t }),
      React.createElement(StatusBar, { t }),
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }
      },
        React.createElement(screens[activeTab], { t, isDark, setIsDark })
      ),
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 4px 20px',
          flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            style: navItemStyle(tab),
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', { style: labelStyle(tab) }, tab.label)
          )
        )
      )
    )
  );
}

function DynamicIsland({ t }) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 12,
      paddingBottom: 4,
      background: t.bg,
      flexShrink: 0,
    }
  },
    React.createElement('div', {
      style: {
        width: 120,
        height: 34,
        background: '#000',
        borderRadius: 20,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
      }
    })
  );
}

function StatusBar({ t }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      height: 24,
      flexShrink: 0,
    }
  },
    React.createElement('span', {
      style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: 0.5 }
    }, time || '09:41'),
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 5 }
    },
      React.createElement(window.lucide.Wifi, { size: 14, color: t.text, strokeWidth: 2 }),
      React.createElement(window.lucide.Signal, { size: 14, color: t.text, strokeWidth: 2 }),
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'rgba(255,255,255,0.12)', borderRadius: 4,
          padding: '1px 5px 1px 4px', border: `1px solid rgba(255,255,255,0.15)`
        }
      },
        React.createElement(window.lucide.Battery, { size: 13, color: t.text, strokeWidth: 2 }),
        React.createElement('span', { style: { fontSize: 10, fontWeight: 600, color: t.text } }, '87%')
      )
    )
  );
}

// ─────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark }) {
  const [expandedBlock, setExpandedBlock] = useState(null);

  const dayBlocks = [
    { id: 1, time: '08:00', end: '08:30', label: 'Morning Walk', type: 'personal', stress: 0, travel: 0, color: t.success },
    { id: 2, time: '09:00', end: '10:00', label: 'Team Standup', type: 'work', stress: 1, travel: 0, color: t.primary },
    { id: 3, time: '10:00', end: '11:30', label: 'Client Call – Nexus Co.', type: 'work', stress: 2, travel: 0, color: t.primary },
    { id: 4, time: '11:30', end: '12:00', label: 'Commute to Co-working', type: 'travel', stress: 1, travel: 30, color: '#8B5CF6' },
    { id: 5, time: '12:00', end: '13:00', label: 'Co-working Session', type: 'work', stress: 1, travel: 0, color: t.primary },
    { id: 6, time: '13:00', end: '13:15', label: 'Lunch??', type: 'personal', stress: 3, travel: 0, color: t.danger, conflict: true },
    { id: 7, time: '14:00', end: '15:00', label: 'Deep Work Block', type: 'work', stress: 1, travel: 0, color: t.primary },
    { id: 8, time: '15:30', end: '16:30', label: 'School Pickup + Groceries', type: 'errand', stress: 2, travel: 25, color: t.warning },
  ];

  const stressTotal = dayBlocks.reduce((s, b) => s + b.stress, 0);
  const conflictCount = dayBlocks.filter(b => b.conflict).length;

  const sectionTitle = {
    fontSize: 11,
    fontWeight: 700,
    color: t.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  };

  return React.createElement('div', {
    style: { padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 12, color: t.textMuted, fontWeight: 500, marginBottom: 2 }
        }, 'SUNDAY, MARCH 22'),
        React.createElement('div', {
          style: { fontSize: 24, fontWeight: 700, color: t.text, lineHeight: 1.1 }
        }, 'Today\'s\nDay Map')
      ),
      React.createElement('div', {
        style: {
          width: 40, height: 40, borderRadius: 20,
          background: t.primaryGlow, border: `1px solid ${t.primary}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        },
        onClick: () => setIsDark(!isDark),
      },
        React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, {
          size: 18, color: t.primary, strokeWidth: 2
        })
      )
    ),

    // Stats row
    React.createElement('div', {
      style: { display: 'flex', gap: 10 }
    },
      [
        { label: 'Blocks', value: dayBlocks.length, icon: window.lucide.Layers, color: t.primary },
        { label: 'Conflicts', value: conflictCount, icon: window.lucide.AlertTriangle, color: t.danger },
        { label: 'Stress', value: `${stressTotal}/24`, icon: window.lucide.Flame, color: t.warning },
        { label: 'Travel', value: '55m', icon: window.lucide.Navigation, color: '#8B5CF6' },
      ].map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            flex: 1, background: t.surface, borderRadius: 14,
            padding: '10px 8px', textAlign: 'center',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement(stat.icon, { size: 16, color: stat.color, strokeWidth: 2 }),
          React.createElement('div', {
            style: { fontSize: 15, fontWeight: 700, color: t.text, marginTop: 4 }
          }, stat.value),
          React.createElement('div', {
            style: { fontSize: 9, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }
          }, stat.label)
        )
      )
    ),

    // Puzzle CTA
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.primary}, #FF9500)`,
        borderRadius: 18, padding: '16px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: `0 8px 24px ${t.primaryGlow}`,
      }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }
        }, '1 conflict detected'),
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: 700, color: '#fff' }
        }, 'Solve Today\'s Puzzle')
      ),
      React.createElement('div', {
        style: {
          width: 40, height: 40, borderRadius: 20,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }
      },
        React.createElement(window.lucide.ArrowRight, { size: 20, color: '#fff', strokeWidth: 2.5 })
      )
    ),

    // Timeline
    React.createElement('div', null,
      React.createElement('div', { style: sectionTitle }, 'Day Timeline'),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 18, overflow: 'hidden',
          border: `1px solid ${t.border}`,
        }
      },
        dayBlocks.map((block, idx) =>
          React.createElement('div', {
            key: block.id,
            onClick: () => setExpandedBlock(expandedBlock === block.id ? null : block.id),
            style: {
              padding: '11px 14px',
              borderBottom: idx < dayBlocks.length - 1 ? `1px solid ${t.border}` : 'none',
              background: block.conflict ? t.dangerGlow : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 10 }
            },
              React.createElement('div', {
                style: {
                  width: 3, height: 34, borderRadius: 3,
                  background: block.color, flexShrink: 0
                }
              }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: {
                    fontSize: 13, fontWeight: 600, color: block.conflict ? t.danger : t.text,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }
                },
                  block.label,
                  block.conflict && React.createElement(window.lucide.AlertCircle, { size: 13, color: t.danger })
                ),
                React.createElement('div', {
                  style: { fontSize: 11, color: t.textMuted, marginTop: 2 }
                }, `${block.time} – ${block.end}${block.travel > 0 ? ` · ${block.travel}m travel` : ''}`)
              ),
              React.createElement('div', {
                style: { display: 'flex', gap: 2 }
              },
                Array.from({ length: 3 }).map((_, si) =>
                  React.createElement('div', {
                    key: si,
                    style: {
                      width: 6, height: 6, borderRadius: 3,
                      background: si < block.stress ? t.warning : t.surface3,
                    }
                  })
                )
              )
            ),
            expandedBlock === block.id && React.createElement('div', {
              style: {
                marginTop: 10, marginLeft: 13, paddingLeft: 10,
                borderLeft: `1px solid ${t.border}`,
                fontSize: 12, color: t.textMuted, lineHeight: 1.6,
              }
            },
              block.conflict
                ? 'Only 15 minutes for lunch after a 90-minute client call and commute. No buffer — high burnout risk.'
                : `Duration: ${block.end.replace(':00','').replace(':30','.5')} hrs · Type: ${block.type}`
            )
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────────
// PUZZLE SCREEN
// ─────────────────────────────────────────────
function PuzzleScreen({ t }) {
  const [blocks, setBlocks] = useState([
    { id: 1, label: 'Team Standup', duration: 60, type: 'work', slot: 0, locked: false, color: t.primary },
    { id: 2, label: 'Client Call', duration: 90, type: 'work', slot: 1, locked: false, color: t.primary },
    { id: 3, label: 'Commute', duration: 30, type: 'travel', slot: 2, locked: false, color: '#8B5CF6' },
    { id: 4, label: 'Lunch Break', duration: 60, type: 'personal', slot: 3, locked: false, color: t.success },
    { id: 5, label: 'Deep Work', duration: 90, type: 'work', slot: 4, locked: false, color: t.primary },
    { id: 6, label: 'School Pickup', duration: 30, type: 'errand', slot: 5, locked: true, color: t.warning },
  ]);

  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState(42);
  const [hintShown, setHintShown] = useState(false);
  const [swapMode, setSwapMode] = useState(false);

  const swapBlocks = (fromSlot, toSlot) => {
    const updated = blocks.map(b => {
      if (b.slot === fromSlot) return { ...b, slot: toSlot };
      if (b.slot === toSlot) return { ...b, slot: fromSlot };
      return b;
    });
    setBlocks(updated);
    const newScore = Math.min(score + 8, 100);
    setScore(newScore);
    if (newScore >= 80) setSolved(true);
    setSelected(null);
    setSwapMode(false);
  };

  const handleBlockPress = (block) => {
    if (block.locked) return;
    if (!swapMode) {
      setSelected(block.id);
      setSwapMode(true);
    } else {
      if (selected === block.id) {
        setSelected(null);
        setSwapMode(false);
      } else {
        const fromBlock = blocks.find(b => b.id === selected);
        if (fromBlock && !block.locked) {
          swapBlocks(fromBlock.slot, block.slot);
        }
      }
    }
  };

  const sortedBlocks = [...blocks].sort((a, b) => a.slot - b.slot);
  const stressIssues = blocks.filter(b => b.type === 'travel' && b.slot > 0 && blocks.find(bb => bb.slot === b.slot - 1)?.type === 'work').length;

  const scoreColor = score >= 80 ? t.success : score >= 50 ? t.warning : t.danger;

  return React.createElement('div', {
    style: { padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }
        }, 'PUZZLE · LEVEL 4'),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 700, color: t.text }
        }, 'Rearrange the Day')
      ),
      React.createElement('div', {
        style: {
          width: 52, height: 52, borderRadius: 26,
          background: `conic-gradient(${scoreColor} ${score * 3.6}deg, ${t.surface2} 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }
      },
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 21,
            background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }
        },
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: 700, color: scoreColor }
          }, `${score}`)
        )
      )
    ),

    // Goal card
    React.createElement('div', {
      style: {
        background: t.surface2, borderRadius: 14, padding: '12px 14px',
        border: `1px solid ${t.border}`, display: 'flex', gap: 10, alignItems: 'flex-start',
      }
    },
      React.createElement(window.lucide.Target, { size: 16, color: t.primary, strokeWidth: 2, style: { marginTop: 1, flexShrink: 0 } }),
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 2 }
        }, 'Goal: Protect lunch & minimize travel gaps'),
        React.createElement('div', {
          style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5 }
        }, 'Move travel blocks adjacent to work. Add a lunch buffer after the client call.')
      )
    ),

    // Puzzle board
    React.createElement('div', {
      style: {
        background: t.surface, borderRadius: 18, overflow: 'hidden',
        border: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', {
        style: {
          padding: '10px 14px', borderBottom: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('span', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase' }
        }, swapMode ? '— Tap to swap —' : 'Tap block to select'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 4 }
        },
          React.createElement(window.lucide.Zap, { size: 12, color: t.warning }),
          React.createElement('span', { style: { fontSize: 11, color: t.warning, fontWeight: 600 } }, `${stressIssues} issue${stressIssues !== 1 ? 's' : ''}`)
        )
      ),
      sortedBlocks.map((block, idx) => {
        const isSelected = selected === block.id;
        const isSwapTarget = swapMode && selected !== null && selected !== block.id && !block.locked;
        return React.createElement('div', {
          key: block.id,
          onClick: () => handleBlockPress(block),
          style: {
            padding: '12px 14px',
            borderBottom: idx < sortedBlocks.length - 1 ? `1px solid ${t.border}` : 'none',
            background: isSelected
              ? t.primaryGlow
              : isSwapTarget
              ? t.secondaryGlow
              : 'transparent',
            cursor: block.locked ? 'default' : 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex', alignItems: 'center', gap: 12,
            border: isSelected ? `1px solid ${t.primary}` : isSwapTarget ? `1px solid ${t.secondary}` : '1px solid transparent',
            borderRadius: isSelected || isSwapTarget ? 10 : 0,
            margin: isSelected || isSwapTarget ? '2px 4px' : 0,
          }
        },
          React.createElement('div', {
            style: {
              width: 28, height: 28, borderRadius: 10,
              background: `${block.color}22`, border: `1px solid ${block.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            block.type === 'work' ? React.createElement(window.lucide.Briefcase, { size: 13, color: block.color }) :
            block.type === 'travel' ? React.createElement(window.lucide.Car, { size: 13, color: block.color }) :
            block.type === 'errand' ? React.createElement(window.lucide.ShoppingCart, { size: 13, color: block.color }) :
            React.createElement(window.lucide.Coffee, { size: 13, color: block.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 13, fontWeight: 600, color: t.text }
            }, block.label),
            React.createElement('div', {
              style: { fontSize: 11, color: t.textMuted, marginTop: 1 }
            }, `${block.duration} min · ${block.type}`)
          ),
          block.locked
            ? React.createElement(window.lucide.Lock, { size: 14, color: t.textDim })
            : React.createElement('div', {
              style: {
                width: 20, height: 20, borderRadius: 10,
                border: `1.5px solid ${isSelected ? t.primary : t.borderLight}`,
                background: isSelected ? t.primary : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            },
              isSelected && React.createElement(window.lucide.Check, { size: 11, color: '#fff', strokeWidth: 3 })
            )
        );
      })
    ),

    // Hint
    React.createElement('div', {
      style: {
        background: hintShown ? t.surface2 : t.surface,
        borderRadius: 14, padding: '12px 14px',
        border: `1px solid ${hintShown ? t.primary : t.border}`,
        cursor: 'pointer', transition: 'all 0.2s',
      },
      onClick: () => setHintShown(!hintShown),
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8 }
      },
        React.createElement(window.lucide.Lightbulb, { size: 15, color: t.primary, strokeWidth: 2 }),
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: 600, color: t.primary }
        }, hintShown ? 'Hide Hint' : 'Need a hint?'),
      ),
      hintShown && React.createElement('div', {
        style: { fontSize: 12, color: t.textMuted, marginTop: 8, lineHeight: 1.6 }
      }, 'Move the Commute block right after Client Call. Then slot Lunch immediately after. This creates a natural travel-to-rest transition and protects your 60-min recovery window.')
    ),

    // Solved banner
    solved && React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.success}, #00A896)`,
        borderRadius: 16, padding: '16px 18px',
        display: 'flex', alignItems: 'center', gap: 12,
      }
    },
      React.createElement(window.lucide.Trophy, { size: 24, color: '#fff' }),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#fff' } }, 'Puzzle Solved!'),
        React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 } }, 'Score 80+ · Buffer time protected · Route optimized')
      )
    )
  );
}

// ─────────────────────────────────────────────
// INSIGHTS SCREEN
// ─────────────────────────────────────────────
function InsightsScreen({ t }) {
  const [activeWeek, setActiveWeek] = useState(0);

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const scoreData = [72, 58, 88, 45, 91, 76, 42];
  const maxScore = 100;

  const patterns = [
    {
      icon: window.lucide.Clock,
      color: t.danger,
      title: 'Late Afternoon Crunch',
      desc: 'You schedule 3+ tasks after 3pm on 5 of 7 days this week.',
      tag: 'Recurring',
    },
    {
      icon: window.lucide.Users,
      color: t.warning,
      title: 'Meeting Overload: Tuesdays',
      desc: 'Average 4.2 hours of meetings every Tuesday — leaving only 1.8h for deep work.',
      tag: 'Pattern',
    },
    {
      icon: window.lucide.Navigation,
      color: '#8B5CF6',
      title: 'Inefficient Errand Routes',
      desc: 'Grocery + pharmacy separated by 2 days could be combined to save ~40 min/week.',
      tag: 'Optimization',
    },
    {
      icon: window.lucide.Coffee,
      color: t.success,
      title: 'Consistent Morning Blocks',
      desc: 'You protect 8-9am for personal time 6/7 days. Keep it up!',
      tag: 'Strength',
    },
  ];

  const weeklyStats = [
    { label: 'Puzzles Solved', value: '12', delta: '+3', up: true },
    { label: 'Avg Score', value: '71', delta: '+9', up: true },
    { label: 'Conflicts Caught', value: '8', delta: '-2', up: true },
    { label: 'Travel Saved', value: '1h 20m', delta: '+25m', up: true },
  ];

  return React.createElement('div', {
    style: { padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }
  },
    // Header
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 11, color: t.textMuted, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }
        }, 'WEEKLY REFLECTION'),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: 700, color: t.text }
        }, 'Your Patterns')
      ),
      React.createElement('div', {
        style: {
          fontSize: 11, color: t.primary, fontWeight: 700,
          background: t.primaryGlow, border: `1px solid ${t.primary}`,
          borderRadius: 20, padding: '4px 12px',
        }
      }, 'Mar 16–22')
    ),

    // Weekly bar chart
    React.createElement('div', {
      style: {
        background: t.surface, borderRadius: 18, padding: '16px 14px',
        border: `1px solid ${t.border}`,
      }
    },
      React.createElement('div', {
        style: { fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 14, letterSpacing: 0.5 }
      }, 'Daily Puzzle Score'),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }
      },
        weekDays.map((day, i) => {
          const pct = scoreData[i] / maxScore;
          const isToday = i === 6;
          return React.createElement('div', {
            key: i,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }
          },
            React.createElement('span', {
              style: { fontSize: 9, color: scoreData[i] >= 80 ? t.success : scoreData[i] >= 60 ? t.warning : t.danger, fontWeight: 700 }
            }, scoreData[i]),
            React.createElement('div', {
              style: {
                width: '100%', height: 56 * pct,
                borderRadius: 6,
                background: isToday
                  ? `linear-gradient(180deg, ${t.primary}, #FF9500)`
                  : scoreData[i] >= 80 ? t.success : scoreData[i] >= 60 ? t.warning : t.danger,
                opacity: isToday ? 1 : 0.6,
                minHeight: 4,
                transition: 'all 0.3s',
              }
            }),
            React.createElement('span', {
              style: { fontSize: 10, color: isToday ? t.primary : t.textMuted, fontWeight: isToday ? 700 : 500 }
            }, day)
          );
        })
      )
    ),

    // Stats row
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
    },
      weeklyStats.map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface, borderRadius: 14, padding: '12px 14px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('div', {
            style: { fontSize: 11, color: t.textMuted, marginBottom: 4, fontWeight: 500 }
          }, stat.label),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'baseline', gap: 6 }
          },
            React.createElement('span', {
              style: { fontSize: 20, fontWeight: 700, color: t.text }
            }, stat.value),
            React.createElement('span', {
              style: { fontSize: 11, color: t.success, fontWeight: 700 }
            }, stat.delta)
          )
        )
      )
    ),

    // Patterns
    React.createElement('div', null,
      React.createElement('div', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }
      }, 'Detected Patterns'),
      React.createElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: 10 }
      },
        patterns.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface, borderRadius: 14, padding: '13px 14px',
              border: `1px solid ${t.border}`,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 12,
                background: `${p.color}18`, border: `1px solid ${p.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            },
              React.createElement(p.icon, { size: 15, color: p.color, strokeWidth: 2 })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }
              },
                React.createElement('span', {
                  style: { fontSize: 13, fontWeight: 700, color: t.text }
                }, p.title),
                React.createElement('span', {
                  style: {
                    fontSize: 9, color: p.color, fontWeight: 700, letterSpacing: 0.5,
                    background: `${p.color}18`, borderRadius: 8, padding: '2px 7px',
                    textTransform: 'uppercase',
                  }
                }, p.tag)
              ),
              React.createElement('div', {
                style: { fontSize: 11, color: t.textMuted, lineHeight: 1.5 }
              }, p.desc)
            )
          )
        )
      )
    )
  );
}

// ─────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────
function ProfileScreen({ t, isDark, setIsDark }) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [calendarSync, setCalendarSync] = useState(true);
  const [pressedSetting, setPressedSetting] = useState(null);

  const achievements = [
    { icon: '🧩', label: 'Puzzle Pro', sub: '50 levels solved' },
    { icon: '🛤️', label: 'Route Master', sub: 'Saved 5+ hours' },
    { icon: '🔥', label: '7-Day Streak', sub: 'Daily solver' },
  ];

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: window.lucide.Sun,
          label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
          action: () => setIsDark(!isDark),
          toggle: null,
          color: t.warning,
        },
        {
          icon: window.lucide.Bell,
          label: 'Puzzle Reminders',
          action: () => setNotificationsOn(!notificationsOn),
          toggle: notificationsOn,
          color: t.primary,
        },
        {
          icon: window.lucide.Calendar,
          label: 'Calendar Sync',
          action: () => setCalendarSync(!calendarSync),
          toggle: calendarSync,
          color: t.secondary,
        },
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: window.lucide.Shield,
          label: 'Privacy Settings',
          action: () => {},
          toggle: null,
          color: '#8B5CF6',
          arrow: true,
        },
        {
          icon: window.lucide.HelpCircle,
          label: 'Help & Feedback',
          action: () => {},
          toggle: null,
          color: t.textMuted,
          arrow: true,
        },
        {
          icon: window.lucide.LogOut,
          label: 'Sign Out',
          action: () => {},
          toggle: null,
          color: t.danger,
          arrow: true,
        },
      ]
    }
  ];

  return React.createElement('div', {
    style: { padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }
  },
    // Profile header
    React.createElement('div', {
      style: {
        background: t.surface, borderRadius: 20, padding: '20px 18px',
        border: `1px solid ${t.border}`,
        display: 'flex', alignItems: 'center', gap: 14,
      }
    },
      React.createElement('div', {
        style: {
          width: 60, height: 60, borderRadius: 30,
          background: `linear-gradient(135deg, ${t.primary}, #FF9500)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 700, color: '#fff',
          boxShadow: `0 4px 16px ${t.primaryGlow}`,
        }
      }, 'A'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontSize: 18, fontWeight: 700, color: t.text }
        }, 'Alex Torres'),
        React.createElement('div', {
          style: { fontSize: 12, color: t.textMuted, marginTop: 2 }
        }, 'Freelancer · Parent · Puzzle Solver'),
        React.createElement('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 4, marginTop: 6,
          }
        },
          React.createElement(window.lucide.Flame, { size: 13, color: t.primary }),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 700 } }, '7-day streak'),
        )
      )
    ),

    // Stats row
    React.createElement('div', {
      style: { display: 'flex', gap: 10 }
    },
      [
        { label: 'Solved', value: '62' },
        { label: 'Avg Score', value: '74' },
        { label: 'Hours Saved', value: '5.4' },
      ].map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            flex: 1, background: t.surface, borderRadius: 14, padding: '12px 8px',
            border: `1px solid ${t.border}`, textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: { fontSize: 20, fontWeight: 700, color: t.primary }
          }, s.value),
          React.createElement('div', {
            style: { fontSize: 10, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }
          }, s.label)
        )
      )
    ),

    // Achievements
    React.createElement('div', null,
      React.createElement('div', {
        style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }
      }, 'Achievements'),
      React.createElement('div', {
        style: { display: 'flex', gap: 10 }
      },
        achievements.map((a, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.surface, borderRadius: 14,
              padding: '12px 8px', border: `1px solid ${t.border}`,
              textAlign: 'center',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 4 } }, a.icon),
            React.createElement('div', {
              style: { fontSize: 11, fontWeight: 700, color: t.text, marginBottom: 2 }
            }, a.label),
            React.createElement('div', {
              style: { fontSize: 9, color: t.textMuted }
            }, a.sub)
          )
        )
      )
    ),

    // Settings
    ...settingsGroups.map((group, gi) =>
      React.createElement('div', { key: gi },
        React.createElement('div', {
          style: { fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }
        }, group.title),
        React.createElement('div', {
          style: { background: t.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` }
        },
          group.items.map((item, ii) =>
            React.createElement('div', {
              key: ii,
              onClick: item.action,
              onMouseDown: () => setPressedSetting(`${gi}-${ii}`),
              onMouseUp: () => setPressedSetting(null),
              style: {
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
                borderBottom: ii < group.items.length - 1 ? `1px solid ${t.border}` : 'none',
                cursor: 'pointer',
                background: pressedSetting === `${gi}-${ii}` ? t.surface2 : 'transparent',
                transition: 'background 0.15s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 30, height: 30, borderRadius: 10,
                  background: `${item.color}18`, border: `1px solid ${item.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                React.createElement(item.icon, { size: 14, color: item.color, strokeWidth: 2 })
              ),
              React.createElement('span', {
                style: { flex: 1, fontSize: 13, fontWeight: 500, color: item.color === t.danger ? t.danger : t.text }
              }, item.label),
              item.toggle !== null
                ? React.createElement('div', {
                  style: {
                    width: 38, height: 22, borderRadius: 11,
                    background: item.toggle ? t.primary : t.surface3,
                    position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 18, height: 18, borderRadius: 9, background: '#fff',
                      position: 'absolute', top: 2, transition: 'left 0.2s',
                      left: item.toggle ? 18 : 2,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }
                  })
                )
                : item.arrow
                ? React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
                : null
            )
          )
        )
      )
    )
  );
}
