const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#C22047',
  secondary: '#3A7240',
  cta: '#FFBF00',
  background: '#1A1A1A',
  surface: '#242424',
  surfaceLight: '#2E2E2E',
  text: '#F5F5F5',
  textSecondary: '#A0A0A0',
  textMuted: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#E53935',
  white: '#FFFFFF',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const SPIRIT_STATES = {
  radiant: { name: 'Radiant', color: '#FFD700', glow: '0 0 40px rgba(255,215,0,0.6)', emoji: '✨' },
  strong: { name: 'Strong', color: '#4CAF50', glow: '0 0 30px rgba(76,175,80,0.5)', emoji: '💪' },
  steady: { name: 'Steady', color: '#2196F3', glow: '0 0 20px rgba(33,150,243,0.4)', emoji: '🌿' },
  weakening: { name: 'Weakening', color: '#FF9800', glow: '0 0 15px rgba(255,152,0,0.3)', emoji: '😟' },
  fading: { name: 'Fading', color: '#E53935', glow: '0 0 10px rgba(229,57,53,0.3)', emoji: '💔' },
};

function getSpiritState(vitality) {
  if (vitality >= 80) return SPIRIT_STATES.radiant;
  if (vitality >= 60) return SPIRIT_STATES.strong;
  if (vitality >= 40) return SPIRIT_STATES.steady;
  if (vitality >= 20) return SPIRIT_STATES.weakening;
  return SPIRIT_STATES.fading;
}

function Icon({ name, size = 24, color = COLORS.text, style = {} }) {
  const IconComponent = window.lucide && window.lucide[name];
  if (!IconComponent) {
    return React.createElement('span', { style: { fontSize: size, color, ...style } }, '●');
  }
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = '';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', color);
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      const iconInstance = IconComponent;
      if (iconInstance && iconInstance[2]) {
        iconInstance[2].forEach(function(child) {
          const el = document.createElementNS('http://www.w3.org/2000/svg', child[0]);
          Object.keys(child[1] || {}).forEach(function(attr) {
            el.setAttribute(attr, child[1][attr]);
          });
          svg.appendChild(el);
        });
      }
      svgRef.current.appendChild(svg);
    }
  }, [name, size, color]);
  return React.createElement('span', { ref: svgRef, style: { display: 'inline-flex', ...style } });
}

function LucideIcon({ name, size = 24, color = COLORS.text, strokeWidth = 2 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const iconData = window.lucide.icons && window.lucide.icons[name];
      if (iconData) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', String(size));
        svg.setAttribute('height', String(size));
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', String(strokeWidth));
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.innerHTML = iconData[1] || '';
        ref.current.appendChild(svg);
      }
    }
  }, [name, size, color, strokeWidth]);
  return React.createElement('span', { ref: ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } });
}

function SimpleIcon({ type, size = 24, color = COLORS.text }) {
  const icons = {
    home: '🏠',
    list: '📋',
    star: '⭐',
    settings: '⚙️',
    check: '✓',
    plus: '+',
    shield: '🛡️',
    flame: '🔥',
    heart: '❤️',
    trophy: '🏆',
    gem: '💎',
    crown: '👑',
    lightning: '⚡',
    moon: '🌙',
    sun: '☀️',
    droplet: '💧',
    book: '📖',
    dumbbell: '🏋️',
    brain: '🧠',
    leaf: '🍃',
    sparkles: '✨',
    arrow_left: '←',
    x: '✕',
    bell: '🔔',
    chevron_right: '›',
    lock: '🔒',
    unlock: '🔓',
  };
  return React.createElement('span', {
    style: { fontSize: size * 0.8, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }
  }, icons[type] || '●');
}

function VigorSpirit({ vitality, size = 160, animate = true }) {
  const [pulse, setPulse] = useState(false);
  const state = getSpiritState(vitality);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, [animate]);

  const orbSize = size;
  const innerSize = size * 0.7;
  const coreSize = size * 0.35;

  const opacity = 0.3 + (vitality / 100) * 0.7;
  const scale = pulse ? 1.05 : 1.0;

  return React.createElement('div', {
    style: {
      width: orbSize,
      height: orbSize,
      borderRadius: '50%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(circle, ${state.color}33 0%, transparent 70%)`,
      boxShadow: state.glow,
      transition: 'all 1s ease',
      transform: `scale(${scale})`,
    }
  },
    React.createElement('div', {
      style: {
        width: innerSize,
        height: innerSize,
        borderRadius: '50%',
        position: 'absolute',
        background: `radial-gradient(circle at 35% 35%, ${state.color}66, ${state.color}22)`,
        border: `2px solid ${state.color}44`,
        opacity: opacity,
        transition: 'all 1s ease',
      }
    }),
    React.createElement('div', {
      style: {
        width: coreSize,
        height: coreSize,
        borderRadius: '50%',
        position: 'absolute',
        background: `radial-gradient(circle at 40% 40%, ${state.color}, ${state.color}88)`,
        boxShadow: `0 0 ${20 + vitality * 0.3}px ${state.color}88`,
        opacity: opacity,
        transition: 'all 1s ease',
      }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute',
        fontSize: size * 0.25,
        zIndex: 2,
      }
    }, state.emoji),
    React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: -8,
        fontSize: 13,
        fontFamily: FONT,
        color: state.color,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }
    }, state.name)
  );
}

function VitalityBar({ vitality, height = 8, showLabel = false }) {
  const state = getSpiritState(vitality);
  return React.createElement('div', {
    style: { width: '100%' }
  },
    showLabel && React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 4,
        fontFamily: FONT,
        fontSize: 13,
        color: COLORS.textSecondary,
      }
    },
      React.createElement('span', null, 'Vitality'),
      React.createElement('span', { style: { color: state.color, fontWeight: '600' } }, vitality + '%')
    ),
    React.createElement('div', {
      style: {
        width: '100%',
        height: height,
        borderRadius: height / 2,
        background: COLORS.surfaceLight,
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          width: vitality + '%',
          height: '100%',
          borderRadius: height / 2,
          background: `linear-gradient(90deg, ${state.color}88, ${state.color})`,
          boxShadow: `0 0 8px ${state.color}44`,
          transition: 'all 0.8s ease',
        }
      })
    )
  );
}

function HabitCard({ habit, onToggle, onPress }) {
  const [pressing, setPressing] = useState(false);

  const iconMap = {
    'Morning Meditation': '🧠',
    'Exercise': '🏋️',
    'Read 30 mins': '📖',
    'Drink Water': '💧',
    'Sleep by 10pm': '🌙',
    'Healthy Eating': '🍃',
    'Journaling': '📝',
    'Cold Shower': '❄️',
  };

  return React.createElement('div', {
    style: {
      background: habit.completed ? `linear-gradient(135deg, ${COLORS.secondary}22, ${COLORS.surface})` : COLORS.surface,
      borderRadius: 16,
      padding: '14px 16px',
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: habit.completed ? `1px solid ${COLORS.secondary}44` : '1px solid transparent',
      transition: 'all 0.3s ease',
      transform: pressing ? 'scale(0.98)' : 'scale(1)',
      cursor: 'pointer',
    },
    onMouseDown: () => setPressing(true),
    onMouseUp: () => setPressing(false),
    onMouseLeave: () => setPressing(false),
    onClick: onPress,
  },
    React.createElement('div', {
      onClick: (e) => { e.stopPropagation(); onToggle(); },
      style: {
        width: 32,
        height: 32,
        borderRadius: 10,
        border: habit.completed ? 'none' : `2px solid ${COLORS.textMuted}`,
        background: habit.completed ? `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondary}CC)` : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }
    },
      habit.completed && React.createElement('span', { style: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' } }, '✓')
    ),
    React.createElement('div', {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: habit.completed ? `${habit.color}33` : `${habit.color}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 18,
      }
    }, iconMap[habit.name] || '⭐'),
    React.createElement('div', {
      style: { flex: 1 }
    },
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: '600',
          color: habit.completed ? COLORS.textSecondary : COLORS.text,
          textDecoration: habit.completed ? 'line-through' : 'none',
          transition: 'all 0.3s ease',
        }
      }, habit.name),
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 12,
          color: COLORS.textMuted,
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }
      },
        React.createElement('span', null, '🔥'),
        React.createElement('span', null, habit.streak + ' day streak'),
        React.createElement('span', { style: { margin: '0 4px' } }, '·'),
        React.createElement('span', null, '+' + habit.vitalityBoost + ' vitality')
      )
    ),
    React.createElement('div', {
      style: {
        fontFamily: FONT,
        fontSize: 11,
        color: habit.color,
        fontWeight: '600',
        padding: '3px 8px',
        borderRadius: 8,
        background: `${habit.color}18`,
      }
    }, habit.time)
  );
}

function TabBar({ activeScreen, setActiveScreen }) {
  const tabs = [
    { id: 'home', label: 'Spirit', icon: '✨' },
    { id: 'habits', label: 'Habits', icon: '📋' },
    { id: 'rewards', label: 'Rewards', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '⚙️' },
  ];

  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 24px 0',
      background: `linear-gradient(180deg, ${COLORS.surface}00, ${COLORS.surface})`,
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${COLORS.surfaceLight}`,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }
  },
    tabs.map(tab =>
      React.createElement('div', {
        key: tab.id,
        onClick: () => setActiveScreen(tab.id),
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          padding: '4px 16px',
          borderRadius: 12,
          transition: 'all 0.3s ease',
        }
      },
        React.createElement('span', {
          style: {
            fontSize: 22,
            filter: activeScreen === tab.id ? 'none' : 'grayscale(0.8) opacity(0.5)',
            transition: 'all 0.3s ease',
          }
        }, tab.icon),
        React.createElement('span', {
          style: {
            fontFamily: FONT,
            fontSize: 10,
            fontWeight: activeScreen === tab.id ? '600' : '400',
            color: activeScreen === tab.id ? COLORS.cta : COLORS.textMuted,
            transition: 'all 0.3s ease',
          }
        }, tab.label)
      )
    )
  );
}

function HomeScreen({ habits, vitality, shields, spiritName, streakDays, setActiveScreen }) {
  const [showMessage, setShowMessage] = useState(false);
  const state = getSpiritState(vitality);
  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const messages = {
    radiant: "I'm burning bright today! Keep it up! ✨",
    strong: "Feeling powerful! Let's keep this momentum! 💪",
    steady: "I'm doing okay. A few more habits will ignite me! 🌿",
    weakening: "I feel a crack forming... don't let me fade! 😟",
    fading: "I'm barely holding on... please help me recover! 💔",
  };

  return React.createElement('div', {
    style: {
      padding: '0 20px',
      paddingTop: 50,
      paddingBottom: 100,
      height: '100%',
      overflowY: 'auto',
      background: `linear-gradient(180deg, ${COLORS.background} 0%, ${state.color}08 50%, ${COLORS.background} 100%)`,
    }
  },
    // Header
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: COLORS.textSecondary, marginBottom: 2 }
        }, 'Good Morning'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 22, fontWeight: '700', color: COLORS.text }
        }, 'Vigor Guardian')
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }
      },
        React.createElement('div', {
          style: {
            padding: '6px 10px',
            borderRadius: 12,
            background: COLORS.surface,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: FONT,
            fontSize: 13,
            color: COLORS.cta,
            fontWeight: '600',
          }
        }, '🛡️ ', shields),
        React.createElement('div', {
          style: {
            padding: '6px 10px',
            borderRadius: 12,
            background: COLORS.surface,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: FONT,
            fontSize: 13,
            color: COLORS.primary,
            fontWeight: '600',
          }
        }, '🔥 ', streakDays)
      )
    ),

    // Spirit Area
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
      }
    },
      React.createElement(VigorSpirit, { vitality: vitality, size: 160 }),
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 20,
          fontWeight: '700',
          color: COLORS.text,
          marginTop: 16,
          letterSpacing: 0.5,
        }
      }, spiritName),
      React.createElement('div', {
        style: { width: '60%', marginTop: 12 }
      },
        React.createElement(VitalityBar, { vitality: vitality, height: 10, showLabel: true })
      ),
      // Spirit Message
      showMessage && React.createElement('div', {
        style: {
          marginTop: 16,
          padding: '12px 20px',
          borderRadius: 16,
          background: `${state.color}15`,
          border: `1px solid ${state.color}33`,
          maxWidth: 280,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: 13,
          color: state.color,
          fontStyle: 'italic',
          lineHeight: 1.5,
          opacity: showMessage ? 1 : 0,
          transition: 'opacity 0.5s ease',
          position: 'relative',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 12,
            background: `${state.color}15`,
            border: `1px solid ${state.color}33`,
            borderRight: 'none',
            borderBottom: 'none',
            transform: 'translateX(-50%) rotate(45deg)',
          }
        }),
        `"${messages[Object.keys(SPIRIT_STATES).find(k => SPIRIT_STATES[k] === state)] || messages.steady}"`
      )
    ),

    // Today's Progress
    React.createElement('div', {
      style: {
        background: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }
      },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: COLORS.text }
        }, "Today's Progress"),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.cta }
        }, completedToday + '/' + totalHabits)
      ),
      React.createElement('div', {
        style: {
          width: '100%',
          height: 6,
          borderRadius: 3,
          background: COLORS.surfaceLight,
          overflow: 'hidden',
          marginBottom: 14,
        }
      },
        React.createElement('div', {
          style: {
            width: (completedToday / totalHabits * 100) + '%',
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${COLORS.cta}, ${COLORS.cta}CC)`,
            transition: 'width 0.5s ease',
          }
        })
      ),
      habits.slice(0, 3).map((habit, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 0',
            borderBottom: i < 2 ? `1px solid ${COLORS.surfaceLight}` : 'none',
          }
        },
          React.createElement('div', {
            style: {
              width: 8,
              height: 8,
              borderRadius: 4,
              background: habit.completed ? COLORS.secondary : COLORS.textMuted,
            }
          }),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: 14,
              color: habit.completed ? COLORS.textSecondary : COLORS.text,
              textDecoration: habit.completed ? 'line-through' : 'none',
              flex: 1,
            }
          }, habit.name),
          React.createElement('span', {
            style: {
              fontFamily: FONT,
              fontSize: 12,
              color: habit.completed ? COLORS.secondary : COLORS.textMuted,
            }
          }, habit.completed ? '✓ Done' : habit.time)
        )
      ),
      React.createElement('div', {
        onClick: () => setActiveScreen('habits'),
        style: {
          textAlign: 'center',
          marginTop: 12,
          fontFamily: FONT,
          fontSize: 14,
          color: COLORS.cta,
          fontWeight: '600',
          cursor: 'pointer',
        }
      }, 'View All Habits →')
    ),

    // Quick Stats
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginTop: 16,
      }
    },
      [
        { label: 'Best Streak', value: '14 days', icon: '🔥', color: COLORS.primary },
        { label: 'Total Check-ins', value: '127', icon: '✅', color: COLORS.secondary },
        { label: 'Artifacts Earned', value: '5', icon: '💎', color: COLORS.cta },
        { label: 'Spirit Level', value: 'Lv. 7', icon: '⚡', color: '#9C27B0' },
      ].map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: COLORS.surface,
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }
        },
          React.createElement('span', { style: { fontSize: 24 } }, stat.icon),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 18, fontWeight: '700', color: stat.color }
          }, stat.value),
          React.createElement('span', {
            style: { fontFamily: FONT, fontSize: 12, color: COLORS.textMuted }
          }, stat.label)
        )
      )
    )
  );
}

function HabitsScreen({ habits, setHabits, vitality, setVitality, shields, setShields }) {
  const [showAdd, setShowAdd] = useState(false);
  const [animatingId, setAnimatingId] = useState(null);

  const toggleHabit = (id) => {
    setAnimatingId(id);
    setTimeout(() => setAnimatingId(null), 500);

    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nowCompleted = !h.completed;
        if (nowCompleted) {
          setVitality(v => Math.min(100, v + h.vitalityBoost));
        } else {
          setVitality(v => Math.max(0, v - h.vitalityBoost));
        }
        return {
          ...h,
          completed: nowCompleted,
          streak: nowCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }
      return h;
    }));
  };

  const completedCount = habits.filter(h => h.completed).length;

  return React.createElement('div', {
    style: {
      padding: '0 20px',
      paddingTop: 50,
      paddingBottom: 100,
      height: '100%',
      overflowY: 'auto',
    }
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }
    },
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 34, fontWeight: '700', color: COLORS.text }
      }, 'Habits'),
      React.createElement('div', {
        onClick: () => setShowAdd(!showAdd),
        style: {
          width: 36,
          height: 36,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.cta}CC)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 20,
          fontWeight: '600',
          color: COLORS.background,
        }
      }, '+')
    ),

    // Summary bar
    React.createElement('div', {
      style: {
        background: COLORS.surface,
        borderRadius: 16,
        padding: '14px 16px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }
    },
      React.createElement('div', {
        style: {
          width: 44,
          height: 44,
          borderRadius: 14,
          background: `${COLORS.secondary}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }
      }, '📊'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.text }
        }, completedCount + ' of ' + habits.length + ' completed today'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 12, color: COLORS.textMuted, marginTop: 2 }
        }, completedCount === habits.length ? 'Perfect day! Your Spirit is thriving! 🌟' : (habits.length - completedCount) + ' habits remaining')
      ),
      React.createElement('div', {
        style: {
          fontFamily: FONT,
          fontSize: 20,
          fontWeight: '700',
          color: COLORS.cta,
        }
      }, Math.round(completedCount / habits.length * 100) + '%')
    ),

    // Shield info
    shields > 0 && React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${COLORS.cta}15, ${COLORS.cta}08)`,
        borderRadius: 14,
        padding: '10px 14px',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: `1px solid ${COLORS.cta}22`,
      }
    },
      React.createElement('span', { style: { fontSize: 20 } }, '🛡️'),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, fontWeight: '600', color: COLORS.cta }
        }, shields + ' Spirit Shield' + (shields > 1 ? 's' : '') + ' Available'),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 11, color: COLORS.textMuted }
        }, 'Protect your Spirit from a missed habit')
      )
    ),

    // Category label
    React.createElement('div', {
      style: {
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10,
        marginTop: 4,
      }
    }, 'Daily Rituals'),

    // Habit list
    habits.map(habit =>
      React.createElement('div', {
        key: habit.id,
        style: {
          transform: animatingId === habit.id ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }
      },
        React.createElement(HabitCard, {
          habit: habit,
          onToggle: () => toggleHabit(habit.id),
          onPress: () => {},
        })
      )
    ),

    // Add habit modal
    showAdd && React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
        background: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
        zIndex: 10,
        border: `1px solid ${COLORS.surfaceLight}`,
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }
      },
        React.createElement('span', {
          style: { fontFamily: FONT, fontSize: 17, fontWeight: '600', color: COLORS.text }
        }, 'Quick Add Habit'),
        React.createElement('span', {
          onClick: () => setShowAdd(false),
          style: { fontSize: 18, color: COLORS.textMuted, cursor: 'pointer', padding: 4 }
        }, '✕')
      ),
      ['Cold Shower ❄️', 'Gratitude Journal 🙏', 'No Sugar 🚫', 'Walk 10k Steps 🚶'].map((name, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setShowAdd(false),
          style: {
            padding: '12px 16px',
            borderRadius: 12,
            background: COLORS.surfaceLight,
            marginBottom: 8,
            fontFamily: FONT,
            fontSize: 15,
            color: COLORS.text,
            cursor: 'pointer',
          }
        }, name)
      )
    )
  );
}

function RewardsScreen({ vitality, streakDays }) {
  const [selectedTab, setSelectedTab] = useState('milestones');

  const milestones = [
    { name: 'First Spark', desc: 'Complete your first habit', streak: 1, unlocked: true, icon: '🌱', reward: 'Seedling Form' },
    { name: 'Ember Rising', desc: '3-day streak achieved', streak: 3, unlocked: true, icon: '🔥', reward: 'Ember Aura' },
    { name: 'Steady Flame', desc: '7-day streak achieved', streak: 7, unlocked: true, icon: '🕯️', reward: 'Flame Crown' },
    { name: 'Blazing Spirit', desc: '14-day streak achieved', streak: 14, unlocked: streakDays >= 14, icon: '⚡', reward: 'Lightning Form' },
    { name: 'Phoenix Rising', desc: '30-day streak achieved', streak: 30, unlocked: false, icon: '🔮', reward: 'Phoenix Wings' },
    { name: 'Eternal Vigor', desc: '100-day streak achieved', streak: 100, unlocked: false, icon: '👑', reward: 'Eternal Crown' },
  ];

  const artifacts = [
    { name: 'Vigor Crystal', desc: '+5 bonus vitality per check-in', rarity: 'Common', icon: '💎', owned: true, color: '#4CAF50' },
    { name: 'Ember Stone', desc: 'Spirit glows warmer', rarity: 'Uncommon', icon: '🔴', owned: true, color: '#FF5722' },
    { name: 'Moonlight Shard', desc: 'Night habit bonus x2', rarity: 'Rare', icon: '🌙', owned: true, color: '#9C27B0' },
    { name: 'Solar Essence', desc: 'Morning habit bonus x2', rarity: 'Rare', icon: '☀️', owned: false, color: '#FFC107' },
    { name: 'Void Fragment', desc: 'Shield recharge rate +1', rarity: 'Epic', icon: '🌀', owned: false, color: '#3F51B5' },
    { name: 'Eternity Seed', desc: 'Spirit never fully fades', rarity: 'Legendary', icon: '🌟', owned: false, color: '#FFD700' },
  ];

  return React.createElement('div', {
    style: {
      padding: '0 20px',
      paddingTop: 50,
      paddingBottom: 100,
      height: '100%',
      overflowY: 'auto',
    }
  },
    React.createElement('div', {
      style: { fontFamily: FONT, fontSize: 34, fontWeight: '700', color: COLORS.text, marginBottom: 6 }
    }, 'Rewards'),
    React.createElement('div', {
      style: { fontFamily: FONT, fontSize: 15, color: COLORS.textSecondary, marginBottom: 20 }
    }, 'Unlock new forms and artifacts for your Spirit'),

    // Tab switcher
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: 0,
        marginBottom: 20,
        background: COLORS.surface,
        borderRadius: 14,
        padding: 4,
      }
    },
      ['milestones', 'artifacts'].map(tab =>
        React.createElement('div', {
          key: tab,
          onClick: () => setSelectedTab(tab),
          style: {
            flex: 1,
            padding: '10px 0',
            textAlign: 'center',
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: '600',
            color: selectedTab === tab ? COLORS.background : COLORS.textMuted,
            background: selectedTab === tab ? COLORS.cta : 'transparent',
            borderRadius: 11,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'capitalize',
          }
        }, tab)
      )
    ),

    // Content
    selectedTab === 'milestones' ? (
      milestones.map((m, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: m.unlocked ? `linear-gradient(135deg, ${COLORS.cta}12, ${COLORS.surface})` : COLORS.surface,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            border: m.unlocked ? `1px solid ${COLORS.cta}33` : `1px solid ${COLORS.surfaceLight}`,
            opacity: m.unlocked ? 1 : 0.6,
          }
        },
          React.createElement('div', {
            style: {
              width: 48,
              height: 48,
              borderRadius: 16,
              background: m.unlocked ? `${COLORS.cta}22` : COLORS.surfaceLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              filter: m.unlocked ? 'none' : 'grayscale(1)',
            }
          }, m.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.text }
            }, m.name),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 12, color: COLORS.textMuted, marginTop: 2 }
            }, m.desc),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 11,
                color: COLORS.cta,
                marginTop: 4,
                fontWeight: '600',
              }
            }, '🎁 ' + m.reward)
          ),
          React.createElement('div', {
            style: {
              fontFamily: FONT,
              fontSize: 11,
              color: m.unlocked ? COLORS.secondary : COLORS.textMuted,
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: 8,
              background: m.unlocked ? `${COLORS.secondary}22` : COLORS.surfaceLight,
            }
          }, m.unlocked ? '✓ Unlocked' : '🔒 ' + m.streak + 'd')
        )
      )
    ) : (
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }
      },
        artifacts.map((a, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: COLORS.surface,
              borderRadius: 18,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              border: a.owned ? `1px solid ${a.color}44` : `1px solid ${COLORS.surfaceLight}`,
              opacity: a.owned ? 1 : 0.5,
              position: 'relative',
              overflow: 'hidden',
            }
          },
            a.owned && React.createElement('div', {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
              }
            }),
            React.createElement('div', {
              style: {
                fontSize: 36,
                filter: a.owned ? 'none' : 'grayscale(1)',
                marginTop: 4,
              }
            }, a.icon),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 13, fontWeight: '600', color: COLORS.text, textAlign: 'center' }
            }, a.name),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 10,
                color: a.color,
                fontWeight: '600',
                padding: '2px 8px',
                borderRadius: 6,
                background: `${a.color}18`,
              }
            }, a.rarity),
            React.createElement('div', {
              style: { fontFamily: FONT, fontSize: 10, color: COLORS.textMuted, textAlign: 'center', lineHeight: 1.3 }
            }, a.desc)
          )
        )
      )
    )
  );
}

function ProfileScreen({ vitality, streakDays, habits, isDark, setIsDark }) {
  const totalCheckins = habits.reduce((sum, h) => sum + h.streak, 0);
  const [spiritName, setSpiritName] = useState('Ignis');

  const stats = [
    { label: 'Current Vitality', value: vitality + '%', color: getSpiritState(vitality).color },
    { label: 'Current Streak', value: streakDays + ' days', color: COLORS.primary },
    { label: 'Total Check-ins', value: String(totalCheckins), color: COLORS.secondary },
    { label: 'Active Habits', value: String(habits.length), color: COLORS.cta },
    { label: 'Best Streak', value: '14 days', color: '#9C27B0' },
    { label: 'Spirit Level', value: 'Level 7', color: '#FF5722' },
  ];

  const settingsGroups = [
    {
      title: 'Spirit',
      items: [
        { name: 'Spirit Name', value: spiritName, icon: '✨' },
        { name: 'Spirit Skin', value: 'Ember Form', icon: '🎨' },
        { name: 'Sound Effects', value: 'On', icon: '🔊' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { name: 'Habit Reminders', value: 'On', icon: '🔔' },
        { name: 'Spirit Messages', value: 'On', icon: '💬' },
        { name: 'Milestone Alerts', value: 'On', icon: '🏆' },
      ]
    },
    {
      title: 'Appearance',
      items: [
        { name: 'Dark Mode', value: isDark ? 'On' : 'Off', icon: '🌙', toggle: true },
      ]
    },
  ];

  return React.createElement('div', {
    style: {
      padding: '0 20px',
      paddingTop: 50,
      paddingBottom: 100,
      height: '100%',
      overflowY: 'auto',
    }
  },
    React.createElement('div', {
      style: { fontFamily: FONT, fontSize: 34, fontWeight: '700', color: COLORS.text, marginBottom: 24 }
    }, 'Profile'),

    // Spirit preview
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
      }
    },
      React.createElement(VigorSpirit, { vitality: vitality, size: 80, animate: false }),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: COLORS.text }
        }, spiritName),
        React.createElement('div', {
          style: { fontFamily: FONT, fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }
        }, 'Level 7 · Ember Form'),
        React.createElement('div', { style: { marginTop: 8, width: '100%' } },
          React.createElement(VitalityBar, { vitality: vitality, height: 6 })
        )
      )
    ),

    // Stats grid
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 24,
      }
    },
      stats.map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: COLORS.surface,
            borderRadius: 14,
            padding: '12px 10px',
            textAlign: 'center',
          }
        },
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: stat.color }
          }, stat.value),
          React.createElement('div', {
            style: { fontFamily: FONT, fontSize: 10, color: COLORS.textMuted, marginTop: 2 }
          }, stat.label)
        )
      )
    ),

    // Week activity
    React.createElement('div', {
      style: {
        background: COLORS.surface,
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
      }
    },
      React.createElement('div', {
        style: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 12 }
      }, 'This Week'),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between' }
      },
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
          const completed = i < 5 ? [true, true, true, false, true][i] : false;
          const isToday = i === 3;
          return React.createElement('div', {
            key: day,
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }
          },
            React.createElement('div', {
              style: {
                width: 32,
                height: 32,
                borderRadius: 10,
                background: completed ? `${COLORS.secondary}` : isToday ? `${COLORS.cta}33` : COLORS.surfaceLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: completed ? COLORS.white : isToday ? COLORS.cta : COLORS.textMuted,
                fontWeight: '600',
                border: isToday ? `2px solid ${COLORS.cta}` : 'none',
              }
            }, completed ? '✓' : i < 4 ? '✕' : ''),
            React.createElement('div', {
              style: {
                fontFamily: FONT,
                fontSize: 10,
                color: isToday ? COLORS.cta : COLORS.textMuted,
                fontWeight: isToday ? '600' : '400',
              }
            }, day)
          );
        })
      )
    ),

    // Settings
    settingsGroups.map((group, gi) =>
      React.createElement('div', { key: gi, style: { marginBottom: 16 } },
        React.createElement('div', {
          style: {
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: '600',
            color: COLORS.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            marginBottom: 8,
          }
        }, group.title),
        React.createElement('div', {
          style: {
            background: COLORS.surface,
            borderRadius: 16,
            overflow: 'hidden',
          }
        },
          group.items.map((item, i) =>
            React.createElement('div', {
              key: i,
              onClick: item.toggle ? () => setIsDark(!isDark) : undefined,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderBottom: i < group.items.length - 1 ? `1px solid ${COLORS.surfaceLight}` : 'none',
                cursor: item.toggle ? 'pointer' : 'default',
              }
            },
              React.createElement('span', { style: { fontSize: 18 } }, item.icon),
              React.createElement('span', {
                style: { fontFamily: FONT, fontSize: 15, color: COLORS.text, flex: 1 }
              }, item.name),
              item.toggle ?
                React.createElement('div', {
                  style: {
                    width: 44,
                    height: 26,
                    borderRadius: 13,
                    background: isDark ? COLORS.secondary : COLORS.textMuted,
                    padding: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: isDark ? 'center' : 'center',
                    justifyContent: isDark ? 'flex-end' : 'flex-start',
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      background: COLORS.white,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }
                  })
                ) :
                React.createElement('span', {
                  style: { fontFamily: FONT, fontSize: 14, color: COLORS.textMuted }
                }, item.value, ' ›')
            )
          )
        )
      )
    )
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [vitality, setVitality] = useState(68);
  const [shields, setShields] = useState(2);
  const [streakDays, setStreakDays] = useState(7);
  const [spiritName] = useState('Ignis');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Meditation', time: '6:00 AM', streak: 12, completed: true, vitalityBoost: 8, color: '#9C27B0' },
    { id: 2, name: 'Exercise', time: '7:00 AM', streak: 7, completed: true, vitalityBoost: 12, color: '#E53935' },
    { id: 3, name: 'Read 30 mins', time: '8:00 PM', streak: 5, completed: false, vitalityBoost: 6, color: '#2196F3' },
    { id: 4, name: 'Drink Water', time: 'All Day', streak: 14, completed: true, vitalityBoost: 4, color: '#00BCD4' },
    { id: 5, name: 'Sleep by 10pm', time: '10:00 PM', streak: 3, completed: false, vitalityBoost: 10, color: '#3F51B5' },
    { id: 6, name: 'Healthy Eating', time: 'All Day', streak: 8, completed: false, vitalityBoost: 8, color: '#4CAF50' },
  ]);

  const [screenTransition, setScreenTransition] = useState(false);
  const [prevScreen, setPrevScreen] = useState('home');

  const switchScreen = (screen) => {
    if (screen === activeScreen) return;
    setScreenTransition(true);
    setPrevScreen(activeScreen);
    setTimeout(() => {
      setActiveScreen(screen);
      setTimeout(() => setScreenTransition(false), 50);
    }, 150);
  };

  const screenProps = {
    habits, setHabits, vitality, setVitality, shields, setShields,
    streakDays, spiritName, isDark, setIsDark, setActiveScreen: switchScreen,
  };

  const screens = {
    home: () => React.createElement(HomeScreen, screenProps),
    habits: () => React.createElement(HabitsScreen, screenProps),
    rewards: () => React.createElement(RewardsScreen, screenProps),
    profile: () => React.createElement(ProfileScreen, screenProps),
  };

  return React.createElement('div', {
    style: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0',
      fontFamily: FONT,
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: COLORS.background,
        boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3)',
        border: '8px solid #333',
      }
    },
      // Status bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 30px',
          background: `linear-gradient(180deg, ${COLORS.background}, ${COLORS.background}CC)`,
        }
      },
        React.createElement('span', {
          style: { fontFamily: FONT, fontSize: 14, fontWeight: '600', color: COLORS.text }
        }, '9:41'),
        React.createElement('div', {
          style: {
            width: 120,
            height: 28,
            borderRadius: 14,
            background: '#000',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 8,
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', gap: 6, alignItems: 'center' }
        },
          React.createElement('span', { style: { fontSize: 12, color: COLORS.text } }, '📶'),
          React.createElement('span', { style: { fontSize: 12, color: COLORS.text } }, '🔋')
        )
      ),

      // Screen content
      React.createElement('div', {
        style: {
          width: '100%',
          height: '100%',
          position: 'relative',
          opacity: screenTransition ? 0 : 1,
          transform: screenTransition ? 'translateY(8px)' : 'translateY(0)',
          transition: 'all 0.15s ease',
        }
      },
        screens[activeScreen] ? screens[activeScreen]() : screens.home()
      ),

      // Tab bar
      React.createElement(TabBar, {
        activeScreen: activeScreen,
        setActiveScreen: switchScreen,
      })
    )
  );
}