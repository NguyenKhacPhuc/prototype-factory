const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#5E4D7E',
  primaryLight: '#8B7AAF',
  primaryDark: '#3D3158',
  secondary: '#A6C1A4',
  secondaryLight: '#C8DBC7',
  secondaryDark: '#7A9E78',
  cta: '#D8A657',
  ctaLight: '#E8C88A',
  ctaDark: '#B8883A',
  background: '#FBF9F5',
  backgroundDark: '#1A1520',
  cardDark: '#2A2235',
  textDark: '#2D2A33',
  textMedium: '#6B6575',
  textLight: '#9B95A3',
  textOnDark: '#F5F0FA',
  textSecondaryDark: '#A89DB8',
  white: '#FFFFFF',
  overlay: 'rgba(94, 77, 126, 0.08)',
  borderLight: 'rgba(94, 77, 126, 0.1)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pulseData, setPulseData] = useState({
    autonomy: 65,
    competence: 72,
    relatedness: 48,
  });
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);
  const [previousScreen, setPreviousScreen] = useState(null);
  const [journeyProgress, setJourneyProgress] = useState({ day: 3, total: 14 });
  const [selectedPathway, setSelectedPathway] = useState(null);

  const theme = {
    bg: isDark ? COLORS.backgroundDark : COLORS.background,
    card: isDark ? COLORS.cardDark : COLORS.white,
    text: isDark ? COLORS.textOnDark : COLORS.textDark,
    textSecondary: isDark ? COLORS.textSecondaryDark : COLORS.textMedium,
    textTertiary: isDark ? 'rgba(255,255,255,0.4)' : COLORS.textLight,
    border: isDark ? COLORS.borderDark : COLORS.borderLight,
    overlay: isDark ? 'rgba(0,0,0,0.3)' : COLORS.overlay,
  };

  const navigateTo = (screen) => {
    setAnimateIn(false);
    setPreviousScreen(activeScreen);
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimateIn(true);
    }, 150);
  };

  const Icon = ({ name, size = 24, color = theme.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) {
      return React.createElement('span', {
        style: { width: size, height: size, display: 'inline-block', ...style }
      });
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
        const iconData = IconComponent;
        if (typeof iconData === 'function') {
          try {
            const result = iconData({ size, color });
          } catch(e) {}
        }
        svgRef.current.appendChild(svg);
      }
    }, [name, size, color]);

    return React.createElement('div', {
      ref: svgRef,
      style: { width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }
    });
  };

  const LucideIcon = ({ name, size = 24, color = theme.text, strokeWidth = 2, style = {} }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && window.lucide) {
        ref.current.innerHTML = '';
        const iconNode = window.lucide.createElement(window.lucide.icons[name]);
        if (iconNode) {
          iconNode.setAttribute('width', size);
          iconNode.setAttribute('height', size);
          iconNode.setAttribute('stroke', color);
          iconNode.setAttribute('stroke-width', strokeWidth);
          ref.current.appendChild(iconNode);
        }
      }
    }, [name, size, color, strokeWidth]);
    return React.createElement('div', {
      ref,
      style: { width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }
    });
  };

  const CircularProgress = ({ value, size = 80, strokeWidth = 6, color = COLORS.primary, label, sublabel }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    useEffect(() => {
      const timer = setTimeout(() => setAnimatedOffset(offset), 100);
      return () => clearTimeout(timer);
    }, [offset]);

    return React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }
    },
      React.createElement('svg', { width: size, height: size, style: { transform: 'rotate(-90deg)' } },
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(94, 77, 126, 0.08)',
          strokeWidth
        }),
        React.createElement('circle', {
          cx: size / 2, cy: size / 2, r: radius,
          fill: 'none', stroke: color, strokeWidth,
          strokeDasharray: circumference, strokeDashoffset: animatedOffset,
          strokeLinecap: 'round',
          style: { transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }
        })
      ),
      label && React.createElement('span', {
        style: { fontSize: 13, fontFamily: FONT, color: theme.text, fontWeight: 600 }
      }, label),
      sublabel && React.createElement('span', {
        style: { fontSize: 11, fontFamily: FONT, color: theme.textSecondary }
      }, sublabel)
    );
  };

  const ProgressBar = ({ value, color = COLORS.primary, height = 6 }) => {
    const [animatedWidth, setAnimatedWidth] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setAnimatedWidth(value), 100);
      return () => clearTimeout(timer);
    }, [value]);

    return React.createElement('div', {
      style: {
        width: '100%', height, borderRadius: height / 2,
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(94, 77, 126, 0.08)',
        overflow: 'hidden'
      }
    },
      React.createElement('div', {
        style: {
          width: `${animatedWidth}%`, height: '100%', borderRadius: height / 2,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      })
    );
  };

  // HOME SCREEN
  const HomeScreen = () => {
    const greeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    const needsData = [
      { name: 'Autonomy', value: pulseData.autonomy, color: COLORS.primary, icon: 'Compass', desc: 'Choice & freedom' },
      { name: 'Competence', value: pulseData.competence, color: COLORS.cta, icon: 'Target', desc: 'Growth & mastery' },
      { name: 'Relatedness', value: pulseData.relatedness, color: COLORS.secondary, icon: 'Heart', desc: 'Connection & belonging' },
    ];

    const quickActions = [
      { label: 'Daily Pulse', icon: 'Activity', screen: 'pulse', color: COLORS.primary },
      { label: 'Motivation Map', icon: 'Map', screen: 'motivation', color: COLORS.cta },
      { label: 'Growth Path', icon: 'Sprout', screen: 'growth', color: COLORS.secondaryDark },
      { label: 'Connections', icon: 'Users', screen: 'connection', color: COLORS.primaryLight },
    ];

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px', overflowY: 'auto', height: '100%',
        opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
      // Header gradient
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          background: isDark
            ? 'linear-gradient(180deg, rgba(94, 77, 126, 0.15) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(94, 77, 126, 0.06) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0
        }
      }),

      // Top bar
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 56, paddingBottom: 8, position: 'relative', zIndex: 1
        }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, margin: 0 }
          }, greeting()),
          React.createElement('h1', {
            style: { fontSize: 28, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: '2px 0 0' }
          }, 'Your Inner Compass')
        ),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 40, height: 40, borderRadius: 20,
            background: isDark ? 'rgba(255,255,255,0.08)' : COLORS.overlay,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease'
          }
        },
          React.createElement(LucideIcon, {
            name: isDark ? 'sun' : 'moon', size: 20, color: theme.text
          })
        )
      ),

      // Overall wellbeing card
      React.createElement('div', {
        style: {
          marginTop: 20, padding: 24, borderRadius: 20,
          background: isDark
            ? 'linear-gradient(135deg, rgba(94, 77, 126, 0.25), rgba(166, 193, 164, 0.1))'
            : 'linear-gradient(135deg, rgba(94, 77, 126, 0.08), rgba(166, 193, 164, 0.08))',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1, overflow: 'hidden'
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
            borderRadius: 60, background: isDark ? 'rgba(216, 166, 87, 0.08)' : 'rgba(216, 166, 87, 0.06)'
          }
        }),
        React.createElement('p', {
          style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: 0, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }
        }, 'SDT Wellness Score'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }
        },
          React.createElement('div', {
            style: { fontSize: 48, fontFamily: FONT, fontWeight: 700, color: theme.text, lineHeight: 1 }
          }, Math.round((pulseData.autonomy + pulseData.competence + pulseData.relatedness) / 3)),
          React.createElement('div', {
            style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }
          },
            needsData.map(need =>
              React.createElement('div', { key: need.name, style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', {
                  style: { fontSize: 11, fontFamily: FONT, color: theme.textSecondary, width: 70, flexShrink: 0 }
                }, need.name),
                React.createElement(ProgressBar, { value: need.value, color: need.color, height: 5 }),
                React.createElement('span', {
                  style: { fontSize: 11, fontFamily: FONT, color: need.color, fontWeight: 600, width: 28, textAlign: 'right' }
                }, need.value)
              )
            )
          )
        ),
        React.createElement('p', {
          style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '16px 0 0', lineHeight: 1.5 }
        }, '💡 Your relatedness could use attention. Consider reaching out to someone meaningful today.')
      ),

      // Quick Actions
      React.createElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          marginTop: 24, position: 'relative', zIndex: 1
        }
      },
        quickActions.map(action =>
          React.createElement('div', {
            key: action.label,
            onClick: () => navigateTo(action.screen),
            style: {
              padding: 16, borderRadius: 16,
              background: theme.card,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex', flexDirection: 'column', gap: 10
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: `${action.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(LucideIcon, { name: action.icon.toLowerCase(), size: 20, color: action.color })
            ),
            React.createElement('span', {
              style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text }
            }, action.label)
          )
        )
      ),

      // Today's Insight
      React.createElement('div', {
        style: {
          marginTop: 24, padding: 20, borderRadius: 16,
          background: theme.card, border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        },
          React.createElement(LucideIcon, { name: 'sparkles', size: 18, color: COLORS.cta }),
          React.createElement('span', {
            style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text }
          }, "Today's Reflection")
        ),
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.textSecondary, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }
        }, '"The deepest principle in human nature is the craving to be appreciated." — William James'),
        React.createElement('div', {
          style: {
            marginTop: 16, padding: '10px 16px', borderRadius: 10,
            background: `${COLORS.primary}10`, display: 'inline-flex',
            alignItems: 'center', gap: 6, cursor: 'pointer'
          }
        },
          React.createElement('span', {
            style: { fontSize: 13, fontFamily: FONT, color: COLORS.primary, fontWeight: 600 }
          }, 'Journal about this'),
          React.createElement(LucideIcon, { name: 'arrow-right', size: 14, color: COLORS.primary })
        )
      ),

      // Active Journey
      React.createElement('div', {
        style: {
          marginTop: 24, padding: 20, borderRadius: 16,
          background: isDark
            ? 'linear-gradient(135deg, rgba(166, 193, 164, 0.12), rgba(94, 77, 126, 0.08))'
            : 'linear-gradient(135deg, rgba(166, 193, 164, 0.15), rgba(94, 77, 126, 0.05))',
          border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1, cursor: 'pointer'
        },
        onClick: () => navigateTo('growth')
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { fontSize: 11, fontFamily: FONT, color: COLORS.secondaryDark, margin: 0, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }
            }, 'Active Journey'),
            React.createElement('p', {
              style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text, margin: '6px 0 0' }
            }, 'Deepening Autonomy')
          ),
          React.createElement('div', {
            style: {
              padding: '4px 10px', borderRadius: 8,
              background: `${COLORS.secondaryDark}20`,
              fontSize: 13, fontFamily: FONT, color: COLORS.secondaryDark, fontWeight: 600
            }
          }, `Day ${journeyProgress.day}/${journeyProgress.total}`)
        ),
        React.createElement('div', { style: { marginTop: 12 } },
          React.createElement(ProgressBar, {
            value: (journeyProgress.day / journeyProgress.total) * 100,
            color: COLORS.secondaryDark, height: 4
          })
        )
      )
    );
  };

  // PULSE CHECK SCREEN
  const PulseScreen = () => {
    const [activeSlider, setActiveSlider] = useState(null);
    const [tempValues, setTempValues] = useState({ ...pulseData });
    const [selectedLifeDomain, setSelectedLifeDomain] = useState('work');
    const [showResults, setShowResults] = useState(false);

    const domains = [
      { key: 'work', label: 'Work', icon: 'briefcase' },
      { key: 'relationships', label: 'Relationships', icon: 'heart' },
      { key: 'health', label: 'Health', icon: 'activity' },
      { key: 'personal', label: 'Personal', icon: 'star' },
    ];

    const questions = {
      work: [
        { need: 'autonomy', question: 'I feel I have choices in how I do my work', value: tempValues.autonomy },
        { need: 'competence', question: 'I feel effective and capable at work', value: tempValues.competence },
        { need: 'relatedness', question: 'I feel connected to my colleagues', value: tempValues.relatedness },
      ],
      relationships: [
        { need: 'autonomy', question: 'I feel free to be myself in relationships', value: Math.min(100, tempValues.autonomy + 10) },
        { need: 'competence', question: 'I feel I contribute meaningfully to others', value: Math.min(100, tempValues.competence + 5) },
        { need: 'relatedness', question: 'I feel genuinely understood by loved ones', value: Math.max(0, tempValues.relatedness - 5) },
      ],
      health: [
        { need: 'autonomy', question: 'I choose my health routines freely', value: Math.max(0, tempValues.autonomy - 8) },
        { need: 'competence', question: "I feel confident managing my wellbeing", value: tempValues.competence },
        { need: 'relatedness', question: 'I have support for my health goals', value: Math.min(100, tempValues.relatedness + 15) },
      ],
      personal: [
        { need: 'autonomy', question: 'I pursue activities that truly interest me', value: Math.min(100, tempValues.autonomy + 15) },
        { need: 'competence', question: 'I feel I am growing as a person', value: Math.min(100, tempValues.competence + 8) },
        { need: 'relatedness', question: 'I feel part of a community', value: tempValues.relatedness },
      ],
    };

    const needColors = { autonomy: COLORS.primary, competence: COLORS.cta, relatedness: COLORS.secondary };

    const SliderComponent = ({ question, value, need, onChange }) => {
      const sliderRef = useRef(null);
      const [localValue, setLocalValue] = useState(value);

      const handleTouch = (e) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const newVal = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
        setLocalValue(newVal);
        if (onChange) onChange(newVal);
      };

      return React.createElement('div', {
        style: { marginBottom: 24 }
      },
        React.createElement('p', {
          style: { fontSize: 15, fontFamily: FONT, color: theme.text, margin: '0 0 12px', lineHeight: 1.5 }
        }, question),
        React.createElement('div', {
          ref: sliderRef,
          onMouseDown: handleTouch,
          onMouseMove: (e) => e.buttons === 1 && handleTouch(e),
          onTouchStart: handleTouch,
          onTouchMove: handleTouch,
          style: {
            position: 'relative', height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center'
          }
        },
          React.createElement('div', {
            style: {
              width: '100%', height: 6, borderRadius: 3,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(94, 77, 126, 0.08)'
            }
          },
            React.createElement('div', {
              style: {
                width: `${localValue}%`, height: '100%', borderRadius: 3,
                background: `linear-gradient(90deg, ${needColors[need]}, ${needColors[need]}aa)`,
                transition: 'width 0.1s ease'
              }
            })
          ),
          React.createElement('div', {
            style: {
              position: 'absolute', left: `calc(${localValue}% - 12px)`,
              width: 24, height: 24, borderRadius: 12,
              background: needColors[need],
              boxShadow: `0 2px 8px ${needColors[need]}40`,
              transition: 'left 0.1s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            React.createElement('span', {
              style: { fontSize: 9, fontFamily: FONT, color: '#fff', fontWeight: 700 }
            }, localValue)
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 }
        },
          React.createElement('span', {
            style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary }
          }, 'Not at all'),
          React.createElement('span', {
            style: { fontSize: 11, fontFamily: FONT, color: theme.textTertiary }
          }, 'Completely')
        )
      );
    };

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px', overflowY: 'auto', height: '100%',
        opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 160,
          background: isDark
            ? 'linear-gradient(180deg, rgba(94, 77, 126, 0.2) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(94, 77, 126, 0.08) 0%, transparent 100%)',
          pointerEvents: 'none'
        }
      }),

      // Header
      React.createElement('div', {
        style: { paddingTop: 56, paddingBottom: 8, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => navigateTo('home'),
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: theme.overlay, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          },
            React.createElement(LucideIcon, { name: 'arrow-left', size: 18, color: theme.text })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: 0 }
            }, 'SDT Pulse Check'),
            React.createElement('p', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '2px 0 0' }
            }, 'How are your core needs today?')
          )
        )
      ),

      // Domain tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 8, marginTop: 20, overflowX: 'auto',
          paddingBottom: 4, position: 'relative', zIndex: 1
        }
      },
        domains.map(domain =>
          React.createElement('div', {
            key: domain.key,
            onClick: () => setSelectedLifeDomain(domain.key),
            style: {
              padding: '8px 16px', borderRadius: 20,
              background: selectedLifeDomain === domain.key
                ? `${COLORS.primary}18`
                : 'transparent',
              border: `1px solid ${selectedLifeDomain === domain.key ? COLORS.primary + '40' : theme.border}`,
              display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0
            }
          },
            React.createElement(LucideIcon, {
              name: domain.icon, size: 14,
              color: selectedLifeDomain === domain.key ? COLORS.primary : theme.textSecondary
            }),
            React.createElement('span', {
              style: {
                fontSize: 13, fontFamily: FONT, fontWeight: 600,
                color: selectedLifeDomain === domain.key ? COLORS.primary : theme.textSecondary
              }
            }, domain.label)
          )
        )
      ),

      // Questions
      React.createElement('div', {
        style: {
          marginTop: 24, padding: 20, borderRadius: 16,
          background: theme.card, border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1
        }
      },
        questions[selectedLifeDomain].map((q, i) =>
          React.createElement(SliderComponent, {
            key: `${selectedLifeDomain}-${i}`,
            question: q.question,
            value: q.value,
            need: q.need,
            onChange: (val) => {
              setTempValues(prev => ({ ...prev, [q.need]: val }));
            }
          })
        )
      ),

      // Submit button
      React.createElement('div', {
        onClick: () => {
          setPulseData(tempValues);
          setShowResults(true);
        },
        style: {
          marginTop: 20, padding: '16px', borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          textAlign: 'center', cursor: 'pointer',
          position: 'relative', zIndex: 1,
          boxShadow: `0 4px 16px ${COLORS.primary}30`
        }
      },
        React.createElement('span', {
          style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: '#fff' }
        }, 'Save Pulse Check')
      ),

      showResults && React.createElement('div', {
        style: {
          marginTop: 20, padding: 20, borderRadius: 16,
          background: isDark
            ? 'linear-gradient(135deg, rgba(166, 193, 164, 0.12), rgba(94, 77, 126, 0.08))'
            : 'linear-gradient(135deg, rgba(166, 193, 164, 0.12), rgba(94, 77, 126, 0.05))',
          border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        },
          React.createElement(LucideIcon, { name: 'check-circle', size: 18, color: COLORS.secondaryDark }),
          React.createElement('span', {
            style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text }
          }, 'Pulse Saved!')
        ),
        React.createElement('p', {
          style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: 0, lineHeight: 1.5 }
        }, 'Your relatedness score is below average. Consider scheduling a meaningful conversation with someone you care about today.')
      )
    );
  };

  // MOTIVATION MAP SCREEN
  const MotivationScreen = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
      { name: 'Exercise', intrinsic: 75, extrinsic: 25, icon: 'dumbbell', color: COLORS.secondary },
      { name: 'Work Projects', intrinsic: 45, extrinsic: 55, icon: 'briefcase', color: COLORS.cta },
      { name: 'Learning', intrinsic: 88, extrinsic: 12, icon: 'book-open', color: COLORS.primary },
      { name: 'Social Media', intrinsic: 20, extrinsic: 80, icon: 'smartphone', color: '#E8788A' },
      { name: 'Volunteering', intrinsic: 92, extrinsic: 8, icon: 'heart-handshake', color: COLORS.secondaryDark },
      { name: 'Hobbies', intrinsic: 85, extrinsic: 15, icon: 'palette', color: COLORS.primaryLight },
    ];

    const microActions = [
      { title: 'Reframe your work tasks', desc: 'Find one element of your current project that genuinely interests you', need: 'autonomy', icon: 'lightbulb' },
      { title: 'Set a mastery goal', desc: 'Choose one skill to practice for 15 min today, with no external reward', need: 'competence', icon: 'target' },
      { title: 'Meaningful check-in', desc: 'Send a genuine message to someone asking how they really are', need: 'relatedness', icon: 'message-circle' },
    ];

    const MotivationBar = ({ activity }) => {
      const isSelected = selectedActivity === activity.name;
      return React.createElement('div', {
        onClick: () => setSelectedActivity(isSelected ? null : activity.name),
        style: {
          padding: 16, borderRadius: 14,
          background: isSelected ? `${activity.color}12` : theme.card,
          border: `1px solid ${isSelected ? activity.color + '30' : theme.border}`,
          cursor: 'pointer', transition: 'all 0.3s ease',
          marginBottom: 10
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }
        },
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 10 }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: `${activity.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(LucideIcon, { name: activity.icon, size: 18, color: activity.color })
            ),
            React.createElement('span', {
              style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text }
            }, activity.name)
          ),
          React.createElement('div', {
            style: {
              padding: '3px 10px', borderRadius: 8,
              background: activity.intrinsic >= 60 ? `${COLORS.secondary}20` : `${COLORS.cta}20`,
              fontSize: 11, fontFamily: FONT, fontWeight: 600,
              color: activity.intrinsic >= 60 ? COLORS.secondaryDark : COLORS.ctaDark
            }
          }, activity.intrinsic >= 60 ? 'Intrinsic ✨' : 'Mostly Extrinsic')
        ),
        // Stacked bar
        React.createElement('div', {
          style: {
            display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
          }
        },
          React.createElement('div', {
            style: {
              width: `${activity.intrinsic}%`, height: '100%',
              background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
              borderRadius: '4px 0 0 4px',
              transition: 'width 0.8s ease'
            }
          }),
          React.createElement('div', {
            style: {
              width: `${activity.extrinsic}%`, height: '100%',
              background: `linear-gradient(90deg, ${COLORS.cta}80, ${COLORS.ctaLight})`,
              borderRadius: '0 4px 4px 0',
              transition: 'width 0.8s ease'
            }
          })
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 6 }
        },
          React.createElement('span', {
            style: { fontSize: 11, fontFamily: FONT, color: COLORS.secondaryDark }
          }, `${activity.intrinsic}% Intrinsic`),
          React.createElement('span', {
            style: { fontSize: 11, fontFamily: FONT, color: COLORS.ctaDark }
          }, `${activity.extrinsic}% Extrinsic`)
        ),

        isSelected && React.createElement('div', {
          style: {
            marginTop: 12, padding: 12, borderRadius: 10,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(94, 77, 126, 0.04)',
            fontSize: 13, fontFamily: FONT, color: theme.textSecondary, lineHeight: 1.5
          }
        },
          activity.intrinsic >= 60
            ? `Great! ${activity.name} is primarily driven by your genuine interest. Keep nurturing this authentic motivation.`
            : `${activity.name} seems driven more by external pressures. Try finding aspects that genuinely interest you to shift towards intrinsic motivation.`
        )
      );
    };

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px', overflowY: 'auto', height: '100%',
        opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 160,
          background: isDark
            ? 'linear-gradient(180deg, rgba(216, 166, 87, 0.12) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(216, 166, 87, 0.08) 0%, transparent 100%)',
          pointerEvents: 'none'
        }
      }),

      React.createElement('div', {
        style: { paddingTop: 56, paddingBottom: 8, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => navigateTo('home'),
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: theme.overlay, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          },
            React.createElement(LucideIcon, { name: 'arrow-left', size: 18, color: theme.text })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: 0 }
            }, 'Motivation Map'),
            React.createElement('p', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '2px 0 0' }
            }, 'Understand what truly drives you')
          )
        )
      ),

      // Legend
      React.createElement('div', {
        style: {
          display: 'flex', gap: 16, marginTop: 20, padding: 12, borderRadius: 12,
          background: theme.card, border: `1px solid ${theme.border}`,
          position: 'relative', zIndex: 1
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', {
            style: { width: 12, height: 12, borderRadius: 3, background: COLORS.secondary }
          }),
          React.createElement('span', {
            style: { fontSize: 12, fontFamily: FONT, color: theme.textSecondary }
          }, 'Intrinsic')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('div', {
            style: { width: 12, height: 12, borderRadius: 3, background: COLORS.cta }
          }),
          React.createElement('span', {
            style: { fontSize: 12, fontFamily: FONT, color: theme.textSecondary }
          }, 'Extrinsic')
        )
      ),

      // Activities
      React.createElement('div', {
        style: { marginTop: 16, position: 'relative', zIndex: 1 }
      },
        activities.map(a => React.createElement(MotivationBar, { key: a.name, activity: a }))
      ),

      // Action Aligner
      React.createElement('div', {
        style: { marginTop: 24, position: 'relative', zIndex: 1 }
      },
        React.createElement('h2', {
          style: { fontSize: 17, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: '0 0 12px' }
        }, '🎯 Action Aligner'),
        React.createElement('p', {
          style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '0 0 16px', lineHeight: 1.5 }
        }, 'Micro-actions to boost your unmet needs:'),

        microActions.map((action, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 14,
              background: theme.card, border: `1px solid ${theme.border}`,
              marginBottom: 10, display: 'flex', gap: 12,
              cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: action.need === 'autonomy' ? `${COLORS.primary}15`
                  : action.need === 'competence' ? `${COLORS.cta}15`
                  : `${COLORS.secondary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            },
              React.createElement(LucideIcon, {
                name: action.icon, size: 18,
                color: action.need === 'autonomy' ? COLORS.primary
                  : action.need === 'competence' ? COLORS.cta
                  : COLORS.secondaryDark
              })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', {
                style: { fontSize: 15, fontFamily: FONT, fontWeight: 600, color: theme.text, margin: 0 }
              }, action.title),
              React.createElement('p', {
                style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '4px 0 0', lineHeight: 1.4 }
              }, action.desc),
              React.createElement('span', {
                style: {
                  display: 'inline-block', marginTop: 6,
                  padding: '2px 8px', borderRadius: 6, fontSize: 11, fontFamily: FONT,
                  background: action.need === 'autonomy' ? `${COLORS.primary}15`
                    : action.need === 'competence' ? `${COLORS.cta}15`
                    : `${COLORS.secondary}15`,
                  color: action.need === 'autonomy' ? COLORS.primary
                    : action.need === 'competence' ? COLORS.ctaDark
                    : COLORS.secondaryDark,
                  fontWeight: 600, textTransform: 'capitalize'
                }
              }, action.need)
            )
          )
        )
      )
    );
  };

  // GROWTH PATHWAYS SCREEN
  const GrowthScreen = () => {
    const pathways = [
      {
        title: 'Deepening Autonomy',
        desc: 'Discover your true values and learn to make choices that align with who you really are.',
        duration: '14 days',
        need: 'autonomy',
        color: COLORS.primary,
        icon: 'compass',
        active: true,
        progress: 21,
        modules: [
          { title: 'Understanding Your Values', type: 'lesson', completed: true },
          { title: 'Choice Mapping Exercise', type: 'exercise', completed: true },
          { title: 'Reflection: When I Feel Free', type: 'journal', completed: true },
          { title: 'The Autonomy Spectrum', type: 'lesson', completed: false, current: true },
          { title: 'Setting Authentic Boundaries', type: 'exercise', completed: false },
        ]
      },
      {
        title: 'Mastering Competence',
        desc: 'Build confidence through optimal challenges and celebrate your growth journey.',
        duration: '21 days',
        need: 'competence',
        color: COLORS.cta,
        icon: 'target',
        active: false,
        progress: 0,
        modules: []
      },
      {
        title: 'Nurturing Relatedness',
        desc: 'Strengthen your connections and learn the art of authentic, supportive relationships.',
        duration: '14 days',
        need: 'relatedness',
        color: COLORS.secondary,
        icon: 'users',
        active: false,
        progress: 0,
        modules: []
      },
      {
        title: 'Integration Journey',
        desc: 'Weave all three needs together for a holistic approach to intrinsic living.',
        duration: '28 days',
        need: 'all',
        color: COLORS.primaryDark,
        icon: 'infinity',
        active: false,
        locked: true,
        progress: 0,
        modules: []
      },
    ];

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px', overflowY: 'auto', height: '100%',
        opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 160,
          background: isDark
            ? 'linear-gradient(180deg, rgba(166, 193, 164, 0.12) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(166, 193, 164, 0.1) 0%, transparent 100%)',
          pointerEvents: 'none'
        }
      }),

      React.createElement('div', {
        style: { paddingTop: 56, paddingBottom: 8, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => navigateTo('home'),
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: theme.overlay, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          },
            React.createElement(LucideIcon, { name: 'arrow-left', size: 18, color: theme.text })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: 0 }
            }, 'Growth Pathways'),
            React.createElement('p', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '2px 0 0' }
            }, 'Guided journeys for deeper growth')
          )
        )
      ),

      // Pathways
      React.createElement('div', {
        style: { marginTop: 20, position: 'relative', zIndex: 1 }
      },
        pathways.map((pathway, idx) =>
          React.createElement('div', {
            key: idx,
            onClick: () => setSelectedPathway(selectedPathway === idx ? null : idx),
            style: {
              padding: 20, borderRadius: 16, marginBottom: 12,
              background: pathway.active
                ? isDark
                  ? `linear-gradient(135deg, ${pathway.color}20, ${pathway.color}08)`
                  : `linear-gradient(135deg, ${pathway.color}12, ${pathway.color}04)`
                : theme.card,
              border: `1px solid ${pathway.active ? pathway.color + '25' : theme.border}`,
              cursor: 'pointer', transition: 'all 0.3s ease',
              opacity: pathway.locked ? 0.5 : 1
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'flex-start', gap: 14 }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `${pathway.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }
              },
                pathway.locked
                  ? React.createElement(LucideIcon, { name: 'lock', size: 22, color: pathway.color })
                  : React.createElement(LucideIcon, { name: pathway.icon, size: 22, color: pathway.color })
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }
                },
                  React.createElement('span', {
                    style: { fontSize: 17, fontFamily: FONT, fontWeight: 600, color: theme.text }
                  }, pathway.title),
                  pathway.active && React.createElement('span', {
                    style: {
                      padding: '2px 8px', borderRadius: 6, fontSize: 10,
                      background: `${COLORS.secondary}25`, color: COLORS.secondaryDark,
                      fontFamily: FONT, fontWeight: 700, letterSpacing: 0.5
                    }
                  }, 'ACTIVE')
                ),
                React.createElement('p', {
                  style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '4px 0 0', lineHeight: 1.4 }
                }, pathway.desc),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }
                },
                  React.createElement(LucideIcon, { name: 'clock', size: 12, color: theme.textTertiary }),
                  React.createElement('span', {
                    style: { fontSize: 12, fontFamily: FONT, color: theme.textTertiary }
                  }, pathway.duration)
                ),
                pathway.active && React.createElement('div', {
                  style: { marginTop: 10 }
                },
                  React.createElement(ProgressBar, { value: pathway.progress, color: pathway.color })
                )
              )
            ),

            // Expanded modules
            selectedPathway === idx && pathway.active && React.createElement('div', {
              style: { marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.border}` }
            },
              React.createElement('p', {
                style: { fontSize: 13, fontFamily: FONT, fontWeight: 600, color: theme.textSecondary, margin: '0 0 12px' }
              }, 'Current Modules'),
              pathway.modules.map((mod, mi) =>
                React.createElement('div', {
                  key: mi,
                  style: {
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 0',
                    borderBottom: mi < pathway.modules.length - 1 ? `1px solid ${theme.border}` : 'none'
                  }
                },
                  React.createElement('div', {
                    style: {
                      width: 24, height: 24, borderRadius: 12,
                      background: mod.completed ? `${COLORS.secondary}30` : mod.current ? `${pathway.color}20` : theme.overlay,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: mod.current ? `2px solid ${pathway.color}` : 'none'
                    }
                  },
                    mod.completed && React.createElement(LucideIcon, { name: 'check', size: 12, color: COLORS.secondaryDark }),
                    mod.current && React.createElement('div', {
                      style: { width: 6, height: 6, borderRadius: 3, background: pathway.color }
                    })
                  ),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('span', {
                      style: {
                        fontSize: 14, fontFamily: FONT, color: theme.text,
                        fontWeight: mod.current ? 600 : 400,
                        textDecoration: mod.completed ? 'line-through' : 'none',
                        opacity: mod.completed ? 0.6 : 1
                      }
                    }, mod.title)
                  ),
                  React.createElement('span', {
                    style: {
                      fontSize: 10, fontFamily: FONT, color: theme.textTertiary,
                      padding: '2px 6px', borderRadius: 4,
                      background: theme.overlay, textTransform: 'capitalize'
                    }
                  }, mod.type)
                )
              ),
              React.createElement('div', {
                style: {
                  marginTop: 14, padding: '12px 16px', borderRadius: 10,
                  background: `${pathway.color}15`,
                  textAlign: 'center', cursor: 'pointer'
                }
              },
                React.createElement('span', {
                  style: { fontSize: 14, fontFamily: FONT, fontWeight: 600, color: pathway.color }
                }, 'Continue Journey →')
              )
            )
          )
        )
      )
    );
  };

  // CONNECTION CANVAS SCREEN
  const ConnectionScreen = () => {
    const [activePrompt, setActivePrompt] = useState(0);

    const connections = [
      { name: 'Sarah', role: 'Partner', quality: 85, energy: 'gives', lastContact: 'Today', avatar: '💜' },
      { name: 'Marcus', role: 'Best Friend', quality: 78, energy: 'mutual', lastContact: '2 days ago', avatar: '🧡' },
      { name: 'Mom', role: 'Family', quality: 70, energy: 'gives', lastContact: '5 days ago', avatar: '💛' },
      { name: 'Team at Work', role: 'Colleagues', quality: 55, energy: 'drains', lastContact: 'Daily', avatar: '💙' },
      { name: 'Alex', role: 'Old Friend', quality: 40, energy: 'neutral', lastContact: '3 weeks ago', avatar: '💚' },
    ];

    const prompts = [
      {
        title: 'Deepening Appreciation',
        prompt: 'Think of someone who has recently supported you. Write them a specific message about what their support meant to you.',
        icon: 'heart',
        color: COLORS.primary
      },
      {
        title: 'Vulnerability Practice',
        prompt: 'Share something you\'ve been holding back with a trusted person. Start with "I\'ve been thinking about..."',
        icon: 'shield',
        color: COLORS.cta
      },
      {
        title: 'Active Listening',
        prompt: 'In your next conversation, focus entirely on understanding the other person. Ask follow-up questions without redirecting to yourself.',
        icon: 'ear',
        color: COLORS.secondary
      },
    ];

    const energyColors = {
      gives: COLORS.secondary,
      mutual: COLORS.cta,
      drains: '#E8788A',
      neutral: theme.textTertiary
    };

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px', overflowY: 'auto', height: '100%',
        opacity: animateIn ? 1 : 0, transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: 160,
          background: isDark
            ? 'linear-gradient(180deg, rgba(94, 77, 126, 0.15) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(94, 77, 126, 0.06) 0%, transparent 100%)',
          pointerEvents: 'none'
        }
      }),

      React.createElement('div', {
        style: { paddingTop: 56, paddingBottom: 8, position: 'relative', zIndex: 1 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12 }
        },
          React.createElement('div', {
            onClick: () => navigateTo('home'),
            style: {
              width: 36, height: 36, borderRadius: 18,
              background: theme.overlay, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          },
            React.createElement(LucideIcon, { name: 'arrow-left', size: 18, color: theme.text })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              style: { fontSize: 22, fontFamily: FONT, fontWeight: 700, color: theme.text, margin: 0 }
            }, 'Connection Canvas'),
            React.createElement('p', {
              style: { fontSize: 13, fontFamily: FONT, color: theme.textSecondary, margin: '2px 0 0' }
            }, 'Nurture your meaningful bonds')
          )
        )
      ),

      // Relatedness Score
      React.createElement('div', {
        style: {
          marginTop: 20, padding: 20, borderRadius: 16,
          background: isDark
            ? 'linear-gradient(135deg, rgba(166, 193,