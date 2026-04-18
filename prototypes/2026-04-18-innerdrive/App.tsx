const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#C96C01',
  secondary: '#3E6F68',
  cta: '#FFC107',
  background: '#1C1C1C',
  surface: '#2A2A2A',
  surfaceLight: '#3A3A3A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted: '#6B6B6B',
  cardBg: '#252525',
  border: '#333333',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const icons = {
  Home: () => React.createElement(window.lucide.Home, { size: 22, strokeWidth: 1.8 }),
  Brain: () => React.createElement(window.lucide.Brain, { size: 22, strokeWidth: 1.8 }),
  BookOpen: () => React.createElement(window.lucide.BookOpen, { size: 22, strokeWidth: 1.8 }),
  Zap: () => React.createElement(window.lucide.Zap, { size: 22, strokeWidth: 1.8 }),
  BarChart3: () => React.createElement(window.lucide.BarChart3, { size: 22, strokeWidth: 1.8 }),
  ChevronRight: () => React.createElement(window.lucide.ChevronRight, { size: 18, strokeWidth: 2 }),
  Flame: () => React.createElement(window.lucide.Flame, { size: 20, strokeWidth: 1.8 }),
  Star: () => React.createElement(window.lucide.Star, { size: 16, strokeWidth: 2 }),
  Heart: () => React.createElement(window.lucide.Heart, { size: 18, strokeWidth: 1.8 }),
  Target: () => React.createElement(window.lucide.Target, { size: 20, strokeWidth: 1.8 }),
  TrendingUp: () => React.createElement(window.lucide.TrendingUp, { size: 20, strokeWidth: 1.8 }),
  Sparkles: () => React.createElement(window.lucide.Sparkles, { size: 18, strokeWidth: 1.8 }),
  Play: () => React.createElement(window.lucide.Play, { size: 16, strokeWidth: 2 }),
  CheckCircle: () => React.createElement(window.lucide.CheckCircle, { size: 18, strokeWidth: 1.8 }),
  Circle: () => React.createElement(window.lucide.Circle, { size: 18, strokeWidth: 1.8 }),
  Music: () => React.createElement(window.lucide.Music, { size: 18, strokeWidth: 1.8 }),
  Quote: () => React.createElement(window.lucide.Quote, { size: 18, strokeWidth: 1.8 }),
  Coffee: () => React.createElement(window.lucide.Coffee, { size: 18, strokeWidth: 1.8 }),
  Award: () => React.createElement(window.lucide.Award, { size: 24, strokeWidth: 1.8 }),
  Send: () => React.createElement(window.lucide.Send, { size: 18, strokeWidth: 1.8 }),
  ArrowLeft: () => React.createElement(window.lucide.ArrowLeft, { size: 22, strokeWidth: 1.8 }),
  Lock: () => React.createElement(window.lucide.Lock, { size: 14, strokeWidth: 2 }),
  Sun: () => React.createElement(window.lucide.Sun, { size: 20, strokeWidth: 1.8 }),
  Moon: () => React.createElement(window.lucide.Moon, { size: 20, strokeWidth: 1.8 }),
  Lightbulb: () => React.createElement(window.lucide.Lightbulb, { size: 20, strokeWidth: 1.8 }),
};

function HomeScreen({ setActiveScreen, streak, setStreak }) {
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [showReflectionInput, setShowReflectionInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const prompts = [
    "What's one strength you underestimate about yourself?",
    "When did you last feel truly in flow? What were you doing?",
    "What would you attempt if you knew you couldn't fail?",
    "What belief is holding you back from your next breakthrough?",
  ];

  const todayPrompt = prompts[new Date().getDay() % prompts.length];

  const handleSubmitReflection = () => {
    if (reflectionAnswer.trim()) {
      setSubmitted(true);
      setStreak(s => s + 1);
      setTimeout(() => {
        setShowReflectionInput(false);
        setSubmitted(false);
        setReflectionAnswer('');
      }, 2000);
    }
  };

  const quickActions = [
    { icon: icons.Music, label: 'Power Song', color: COLORS.primary },
    { icon: icons.Quote, label: 'Inspire Me', color: COLORS.secondary },
    { icon: icons.Coffee, label: 'Mindful Break', color: '#8B5CF6' },
  ];

  return React.createElement('div', {
    style: {
      padding: '0 20px 100px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    }
  },
    // Status bar area
    React.createElement('div', {
      style: {
        paddingTop: 55,
        paddingBottom: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
      React.createElement('div', null,
        React.createElement('div', {
          style: {
            fontSize: 13,
            fontFamily: FONT,
            color: COLORS.textSecondary,
            marginBottom: 2,
          }
        }, 'Good ' + (new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening')),
        React.createElement('div', {
          style: {
            fontSize: 28,
            fontFamily: FONT,
            fontWeight: '700',
            color: COLORS.text,
            letterSpacing: -0.5,
          }
        }, 'Welcome back ✦')
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.primary}10)`,
          padding: '6px 12px',
          borderRadius: 20,
          border: `1px solid ${COLORS.primary}40`,
        }
      },
        React.createElement('span', { style: { color: COLORS.primary } }, React.createElement(icons.Flame)),
        React.createElement('span', {
          style: {
            fontSize: 15,
            fontFamily: FONT,
            fontWeight: '600',
            color: COLORS.primary,
          }
        }, streak + ' day streak')
      )
    ),

    // Daily Reflection Card
    React.createElement('div', {
      style: {
        marginTop: 20,
        background: `linear-gradient(145deg, ${COLORS.primary}20, ${COLORS.secondary}15)`,
        borderRadius: 20,
        padding: 20,
        border: `1px solid ${COLORS.primary}30`,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
        }
      }),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
        }
      },
        React.createElement('span', { style: { color: COLORS.cta } }, React.createElement(icons.Sparkles)),
        React.createElement('span', {
          style: {
            fontSize: 13,
            fontFamily: FONT,
            fontWeight: '600',
            color: COLORS.cta,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }
        }, "Today's Reflection")
      ),
      React.createElement('div', {
        style: {
          fontSize: 17,
          fontFamily: FONT,
          color: COLORS.text,
          lineHeight: 1.5,
          fontWeight: '500',
          marginBottom: 16,
        }
      }, `"${todayPrompt}"`),
      !showReflectionInput
        ? React.createElement('button', {
            onClick: () => setShowReflectionInput(true),
            style: {
              background: COLORS.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '10px 20px',
              fontSize: 15,
              fontFamily: FONT,
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }
          }, 'Reflect Now ', React.createElement(icons.ChevronRight))
        : submitted
          ? React.createElement('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#4CAF50',
                fontSize: 15,
                fontFamily: FONT,
                fontWeight: '600',
              }
            }, React.createElement(icons.CheckCircle), ' Beautiful insight. Saved!')
          : React.createElement('div', {
              style: { display: 'flex', flexDirection: 'column', gap: 10 }
            },
              React.createElement('textarea', {
                value: reflectionAnswer,
                onChange: (e) => setReflectionAnswer(e.target.value),
                placeholder: 'Share your thoughts...',
                style: {
                  background: COLORS.background + 'AA',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: 12,
                  color: COLORS.text,
                  fontSize: 15,
                  fontFamily: FONT,
                  resize: 'none',
                  height: 80,
                  outline: 'none',
                }
              }),
              React.createElement('button', {
                onClick: handleSubmitReflection,
                style: {
                  background: COLORS.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '10px 20px',
                  fontSize: 15,
                  fontFamily: FONT,
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  opacity: reflectionAnswer.trim() ? 1 : 0.5,
                }
              }, React.createElement(icons.Send), ' Submit')
            )
    ),

    // Motivation Pulse
    React.createElement('div', {
      style: {
        marginTop: 20,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 17,
          fontFamily: FONT,
          fontWeight: '600',
          color: COLORS.text,
          marginBottom: 12,
        }
      }, 'Motivation Pulse'),
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 10,
        }
      }, quickActions.map((action, i) =>
        React.createElement('button', {
          key: i,
          onClick: () => {},
          style: {
            flex: 1,
            background: `${action.color}15`,
            border: `1px solid ${action.color}30`,
            borderRadius: 16,
            padding: '14px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            transition: 'transform 0.2s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.95)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('span', { style: { color: action.color } }, React.createElement(action.icon)),
          React.createElement('span', {
            style: {
              fontSize: 12,
              fontFamily: FONT,
              fontWeight: '500',
              color: COLORS.text,
            }
          }, action.label)
        )
      ))
    ),

    // Weekly Insight Preview
    React.createElement('div', {
      style: {
        marginTop: 20,
        background: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${COLORS.border}`,
        cursor: 'pointer',
      },
      onClick: () => setActiveScreen('insights'),
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }
      },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 8,
            }
          },
            React.createElement('span', { style: { color: COLORS.secondary } }, React.createElement(icons.Lightbulb)),
            React.createElement('span', {
              style: {
                fontSize: 13,
                fontFamily: FONT,
                fontWeight: '600',
                color: COLORS.secondary,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }
            }, 'Psych-Insight')
          ),
          React.createElement('div', {
            style: {
              fontSize: 15,
              fontFamily: FONT,
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: 4,
            }
          }, 'The Zeigarnik Effect'),
          React.createElement('div', {
            style: {
              fontSize: 13,
              fontFamily: FONT,
              color: COLORS.textSecondary,
              lineHeight: 1.4,
            }
          }, 'Unfinished tasks create mental tension that fuels motivation...')
        ),
        React.createElement('span', { style: { color: COLORS.textMuted, marginTop: 4 } }, React.createElement(icons.ChevronRight))
      )
    ),

    // Active Pathways
    React.createElement('div', { style: { marginTop: 20 } },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }
      },
        React.createElement('span', {
          style: {
            fontSize: 17,
            fontFamily: FONT,
            fontWeight: '600',
            color: COLORS.text,
          }
        }, 'Active Pathways'),
        React.createElement('button', {
          onClick: () => setActiveScreen('pathways'),
          style: {
            background: 'none',
            border: 'none',
            color: COLORS.primary,
            fontSize: 13,
            fontFamily: FONT,
            fontWeight: '600',
            cursor: 'pointer',
          }
        }, 'See All')
      ),
      React.createElement('div', {
        style: {
          background: COLORS.cardBg,
          borderRadius: 16,
          padding: 16,
          border: `1px solid ${COLORS.border}`,
        },
        onClick: () => setActiveScreen('pathways'),
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 42,
              height: 42,
              borderRadius: 12,
              background: `${COLORS.primary}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }, React.createElement('span', { style: { color: COLORS.primary } }, React.createElement(icons.Target))),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 15,
                fontFamily: FONT,
                fontWeight: '600',
                color: COLORS.text,
              }
            }, 'Public Speaking Mastery'),
            React.createElement('div', {
              style: {
                fontSize: 13,
                fontFamily: FONT,
                color: COLORS.textSecondary,
              }
            }, 'Module 3 of 8 • In Progress')
          )
        ),
        React.createElement('div', {
          style: {
            background: COLORS.surfaceLight,
            borderRadius: 8,
            height: 6,
            overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              width: '37.5%',
              height: '100%',
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.cta})`,
              borderRadius: 8,
              transition: 'width 1s ease',
            }
          })
        ),
        React.createElement('div', {
          style: {
            fontSize: 12,
            fontFamily: FONT,
            color: COLORS.textMuted,
            marginTop: 6,
            textAlign: 'right',
          }
        }, '37% complete')
      )
    )
  );
}

function PathwaysScreen({ setActiveScreen }) {
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const pathways = [
    {
      id: 1,
      title: 'Public Speaking Mastery',
      description: 'Build confidence and captivate any audience',
      color: COLORS.primary,
      progress: 37.5,
      currentModule: 3,
      totalModules: 8,
      icon: icons.Target,
      modules: [
        { name: 'Overcoming Stage Fright', completed: true },
        { name: 'Structuring Your Message', completed: true },
        { name: 'Voice & Body Language', completed: false, active: true },
        { name: 'Storytelling Techniques', completed: false },
        { name: 'Handling Q&A', completed: false },
        { name: 'Persuasion Frameworks', completed: false },
        { name: 'Virtual Presentations', completed: false },
        { name: 'Masterclass Project', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Habit Architecture',
      description: 'Design systems that make good habits inevitable',
      color: COLORS.secondary,
      progress: 62.5,
      currentModule: 5,
      totalModules: 8,
      icon: icons.TrendingUp,
      modules: [
        { name: 'The Habit Loop', completed: true },
        { name: 'Cue Engineering', completed: true },
        { name: 'Reward Systems', completed: true },
        { name: 'Environment Design', completed: true },
        { name: 'Habit Stacking', completed: false, active: true },
        { name: 'Breaking Bad Habits', completed: false },
        { name: 'Identity-Based Habits', completed: false },
        { name: 'Maintenance & Growth', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Critical Thinking',
      description: 'Sharpen your mind for better decisions',
      color: '#8B5CF6',
      progress: 12.5,
      currentModule: 1,
      totalModules: 8,
      icon: icons.Brain,
      modules: [
        { name: 'Cognitive Biases', completed: false, active: true },
        { name: 'Logical Reasoning', completed: false },
        { name: 'Evidence Evaluation', completed: false },
        { name: 'Argument Mapping', completed: false },
        { name: 'Decision Matrices', completed: false },
        { name: 'Systems Thinking', completed: false },
        { name: 'Creative Problem Solving', completed: false },
        { name: 'Applied Analysis', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Emotional Resilience',
      description: 'Build inner strength for life\'s challenges',
      color: COLORS.cta,
      progress: 0,
      currentModule: 0,
      totalModules: 6,
      icon: icons.Heart,
      locked: true,
      modules: [],
    },
  ];

  if (selectedPathway) {
    const pw = pathways.find(p => p.id === selectedPathway);
    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s ease',
      }
    },
      React.createElement('div', {
        style: {
          paddingTop: 55,
          paddingBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }
      },
        React.createElement('button', {
          onClick: () => setSelectedPathway(null),
          style: {
            background: 'none',
            border: 'none',
            color: COLORS.text,
            cursor: 'pointer',
            padding: 0,
          }
        }, React.createElement(icons.ArrowLeft)),
        React.createElement('span', {
          style: {
            fontSize: 22,
            fontFamily: FONT,
            fontWeight: '700',
            color: COLORS.text,
          }
        }, pw.title)
      ),
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          color: COLORS.textSecondary,
          marginBottom: 16,
        }
      }, pw.description),
      React.createElement('div', {
        style: {
          background: COLORS.surfaceLight,
          borderRadius: 8,
          height: 8,
          overflow: 'hidden',
          marginBottom: 8,
        }
      },
        React.createElement('div', {
          style: {
            width: `${pw.progress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${pw.color}, ${pw.color}CC)`,
            borderRadius: 8,
          }
        })
      ),
      React.createElement('div', {
        style: {
          fontSize: 13,
          fontFamily: FONT,
          color: COLORS.textMuted,
          marginBottom: 24,
        }
      }, `${Math.round(pw.progress)}% complete • ${pw.currentModule} of ${pw.totalModules} modules`),
      ...pw.modules.map((mod, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 0',
            borderBottom: i < pw.modules.length - 1 ? `1px solid ${COLORS.border}` : 'none',
          }
        },
          React.createElement('div', {
            style: {
              color: mod.completed ? '#4CAF50' : mod.active ? pw.color : COLORS.textMuted,
            }
          }, mod.completed
            ? React.createElement(icons.CheckCircle)
            : React.createElement(icons.Circle)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 15,
                fontFamily: FONT,
                fontWeight: mod.active ? '600' : '400',
                color: mod.completed ? COLORS.textSecondary : mod.active ? COLORS.text : COLORS.textMuted,
              }
            }, mod.name),
            mod.active && React.createElement('div', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                color: pw.color,
                marginTop: 2,
              }
            }, '● Current module')
          ),
          mod.active && React.createElement('button', {
            style: {
              background: pw.color,
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              color: '#fff',
              fontSize: 13,
              fontFamily: FONT,
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }
          }, React.createElement(icons.Play), ' Start')
        )
      )
    );
  }

  return React.createElement('div', {
    style: {
      padding: '0 20px 100px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    }
  },
    React.createElement('div', {
      style: {
        paddingTop: 55,
        paddingBottom: 8,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 34,
          fontFamily: FONT,
          fontWeight: '700',
          color: COLORS.text,
          letterSpacing: -0.5,
        }
      }, 'Skill Pathways'),
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          color: COLORS.textSecondary,
          marginTop: 4,
        }
      }, 'Adaptive learning at your pace')
    ),
    React.createElement('div', { style: { marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 } },
      ...pathways.map((pw, i) =>
        React.createElement('div', {
          key: pw.id,
          onClick: () => !pw.locked && setSelectedPathway(pw.id),
          style: {
            background: COLORS.cardBg,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${pw.locked ? COLORS.border : pw.color + '30'}`,
            cursor: pw.locked ? 'default' : 'pointer',
            opacity: pw.locked ? 0.6 : 1,
            transition: 'transform 0.2s',
          },
          onMouseDown: (e) => !pw.locked && (e.currentTarget.style.transform = 'scale(0.98)'),
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: pw.locked ? 0 : 12,
            }
          },
            React.createElement('div', {
              style: {
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `${pw.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            },
              React.createElement('span', { style: { color: pw.color } }, React.createElement(pw.icon))
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontSize: 15,
                  fontFamily: FONT,
                  fontWeight: '600',
                  color: COLORS.text,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }
              }, pw.title, pw.locked && React.createElement('span', { style: { color: COLORS.textMuted } }, React.createElement(icons.Lock))),
              React.createElement('div', {
                style: {
                  fontSize: 13,
                  fontFamily: FONT,
                  color: COLORS.textSecondary,
                }
              }, pw.locked ? 'Complete 2 pathways to unlock' : pw.description)
            ),
            React.createElement('span', { style: { color: COLORS.textMuted } }, React.createElement(icons.ChevronRight))
          ),
          !pw.locked && React.createElement('div', null,
            React.createElement('div', {
              style: {
                background: COLORS.surfaceLight,
                borderRadius: 6,
                height: 5,
                overflow: 'hidden',
                marginBottom: 6,
              }
            },
              React.createElement('div', {
                style: {
                  width: `${pw.progress}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${pw.color}, ${pw.color}CC)`,
                  borderRadius: 6,
                  transition: 'width 1s ease',
                }
              })
            ),
            React.createElement('div', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                color: COLORS.textMuted,
                textAlign: 'right',
              }
            }, `${Math.round(pw.progress)}% • Module ${pw.currentModule}/${pw.totalModules}`)
          )
        )
      )
    )
  );
}

function InsightsScreen() {
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const insights = [
    {
      id: 1,
      title: 'The Zeigarnik Effect',
      category: 'Cognitive Psychology',
      preview: 'Unfinished tasks create mental tension that fuels motivation to complete them.',
      full: 'Discovered by Bluma Zeigarnik in 1927, this effect shows that incomplete tasks occupy our minds more than completed ones. Use this to your advantage: start tasks you\'ve been procrastinating on, even for just 2 minutes. The mental tension created will naturally pull you back to finish.\n\n🔬 Action Step: Choose one task you\'ve been avoiding. Set a timer for 2 minutes and begin. Notice how your brain wants to continue.',
      source: 'Positive Psychology',
      color: COLORS.secondary,
    },
    {
      id: 2,
      title: 'Implementation Intentions',
      category: 'Behavioral Science',
      preview: '"If-then" planning increases goal achievement by up to 300%.',
      full: 'Research by Peter Gollwitzer shows that planning exactly when and where you\'ll act on a goal dramatically increases follow-through. Instead of "I\'ll exercise more," say "If it\'s 7am on Monday, then I\'ll go for a 20-minute run."\n\nThis works because it pre-loads a decision, reducing the cognitive effort needed in the moment.\n\n🔬 Action Step: Write 3 if-then plans for your current goals.',
      source: 'CBT Techniques',
      color: COLORS.primary,
    },
    {
      id: 3,
      title: 'Neuroplasticity Windows',
      category: 'Neuroscience',
      preview: 'Your brain is most adaptable during specific states and times.',
      full: 'Neuroscience research reveals that neuroplasticity—your brain\'s ability to rewire itself—is enhanced during states of heightened focus and after novel experiences. The 90-minute ultradian rhythm suggests working in focused 90-minute blocks followed by 20-minute breaks.\n\nSleep is crucial: new neural pathways formed during the day are consolidated during deep sleep.\n\n🔬 Action Step: Structure your day into 90-minute deep work blocks. Prioritize 7-9 hours of sleep for optimal brain rewiring.',
      source: 'Neuroscience',
      color: '#8B5CF6',
    },
    {
      id: 4,
      title: 'Self-Determination Theory',
      category: 'Motivation Science',
      preview: 'Three innate needs drive sustainable motivation: autonomy, competence, relatedness.',
      full: 'Developed by Deci and Ryan, SDT posits that intrinsic motivation thrives when three psychological needs are met:\n\n• Autonomy: Feeling in control of your choices\n• Competence: Experiencing growth and mastery\n• Relatedness: Connecting meaningfully with others\n\nWhen any of these needs is unmet, motivation drops. Assess which need is lacking in areas where you feel stuck.\n\n🔬 Action Step: Rate each need (1-10) for your current goals. Focus on improving the lowest-scored need.',
      source: 'Positive Psychology',
      color: COLORS.cta,
    },
  ];

  return React.createElement('div', {
    style: {
      padding: '0 20px 100px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    }
  },
    React.createElement('div', {
      style: {
        paddingTop: 55,
        paddingBottom: 8,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 34,
          fontFamily: FONT,
          fontWeight: '700',
          color: COLORS.text,
          letterSpacing: -0.5,
        }
      }, 'Psych-Insights'),
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          color: COLORS.textSecondary,
          marginTop: 4,
        }
      }, 'Science-backed strategies for growth')
    ),
    React.createElement('div', { style: { marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 } },
      ...insights.map(insight =>
        React.createElement('div', {
          key: insight.id,
          onClick: () => setExpandedInsight(expandedInsight === insight.id ? null : insight.id),
          style: {
            background: COLORS.cardBg,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${expandedInsight === insight.id ? insight.color + '50' : COLORS.border}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }
        },
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 8,
            }
          },
            React.createElement('div', {
              style: {
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: insight.color,
              }
            }),
            React.createElement('span', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                fontWeight: '600',
                color: insight.color,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }
            }, insight.category)
          ),
          React.createElement('div', {
            style: {
              fontSize: 17,
              fontFamily: FONT,
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: 6,
            }
          }, insight.title),
          React.createElement('div', {
            style: {
              fontSize: 14,
              fontFamily: FONT,
              color: COLORS.textSecondary,
              lineHeight: 1.5,
            }
          }, expandedInsight === insight.id ? insight.full : insight.preview),
          expandedInsight !== insight.id && React.createElement('div', {
            style: {
              fontSize: 13,
              fontFamily: FONT,
              color: insight.color,
              marginTop: 8,
              fontWeight: '500',
            }
          }, 'Tap to read more →'),
          expandedInsight === insight.id && React.createElement('div', {
            style: {
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${COLORS.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }
          },
            React.createElement('span', { style: { color: COLORS.textMuted } }, React.createElement(icons.BookOpen)),
            React.createElement('span', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                color: COLORS.textMuted,
              }
            }, `Source: ${insight.source}`)
          )
        )
      )
    )
  );
}

function GrowthScreen({ streak }) {
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const weekData = [40, 65, 50, 78, 60, 85, 72];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxVal = Math.max(...weekData);

  const stats = [
    { label: 'Reflections', value: '23', icon: icons.Brain, color: COLORS.primary },
    { label: 'Modules Done', value: '12', icon: icons.BookOpen, color: COLORS.secondary },
    { label: 'Insights Read', value: '8', icon: icons.Lightbulb, color: '#8B5CF6' },
    { label: 'Day Streak', value: String(streak), icon: icons.Flame, color: COLORS.cta },
  ];

  const milestones = [
    { title: 'First Reflection', achieved: true, date: 'Oct 1' },
    { title: '7-Day Streak', achieved: true, date: 'Oct 7' },
    { title: 'Module Master (5)', achieved: true, date: 'Oct 12' },
    { title: '30-Day Streak', achieved: false, date: '' },
    { title: 'Pathway Complete', achieved: false, date: '' },
  ];

  return React.createElement('div', {
    style: {
      padding: '0 20px 100px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    }
  },
    React.createElement('div', {
      style: {
        paddingTop: 55,
        paddingBottom: 8,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 34,
          fontFamily: FONT,
          fontWeight: '700',
          color: COLORS.text,
          letterSpacing: -0.5,
        }
      }, 'Growth'),
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          color: COLORS.textSecondary,
          marginTop: 4,
        }
      }, 'Your trajectory of transformation')
    ),

    // Stats Grid
    React.createElement('div', {
      style: {
        marginTop: 20,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }
    },
      ...stats.map((stat, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: COLORS.cardBg,
            borderRadius: 16,
            padding: 14,
            border: `1px solid ${COLORS.border}`,
          }
        },
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
            }
          },
            React.createElement('span', { style: { color: stat.color } }, React.createElement(stat.icon)),
            React.createElement('span', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                color: COLORS.textSecondary,
              }
            }, stat.label)
          ),
          React.createElement('div', {
            style: {
              fontSize: 28,
              fontFamily: FONT,
              fontWeight: '700',
              color: COLORS.text,
            }
          }, stat.value)
        )
      )
    ),

    // Activity Chart
    React.createElement('div', {
      style: {
        marginTop: 20,
        background: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${COLORS.border}`,
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
          style: {
            fontSize: 15,
            fontFamily: FONT,
            fontWeight: '600',
            color: COLORS.text,
          }
        }, 'Motivation Pulse'),
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 0,
            background: COLORS.surfaceLight,
            borderRadius: 8,
            padding: 2,
          }
        },
          ['week', 'month'].map(period =>
            React.createElement('button', {
              key: period,
              onClick: () => setSelectedPeriod(period),
              style: {
                background: selectedPeriod === period ? COLORS.primary : 'transparent',
                border: 'none',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 12,
                fontFamily: FONT,
                fontWeight: '500',
                color: selectedPeriod === period ? '#fff' : COLORS.textMuted,
                cursor: 'pointer',
              }
            }, period.charAt(0).toUpperCase() + period.slice(1))
          )
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: 120,
          gap: 6,
        }
      },
        ...weekData.map((val, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }
          },
            React.createElement('div', {
              style: {
                width: '100%',
                height: `${(val / maxVal) * 90}px`,
                borderRadius: 6,
                background: i === weekData.length - 1
                  ? `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.primary}60)`
                  : `linear-gradient(180deg, ${COLORS.secondary}80, ${COLORS.secondary}30)`,
                transition: 'height 0.8s ease',
                transitionDelay: `${i * 0.05}s`,
              }
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontFamily: FONT,
                color: COLORS.textMuted,
              }
            }, dayLabels[i])
          )
        )
      )
    ),

    // Milestones
    React.createElement('div', {
      style: { marginTop: 20 }
    },
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          fontWeight: '600',
          color: COLORS.text,
          marginBottom: 12,
        }
      }, 'Milestones'),
      ...milestones.map((m, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 0',
            borderBottom: i < milestones.length - 1 ? `1px solid ${COLORS.border}` : 'none',
          }
        },
          React.createElement('div', {
            style: {
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: m.achieved ? `${COLORS.cta}25` : `${COLORS.surfaceLight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }, m.achieved
            ? React.createElement('span', { style: { color: COLORS.cta } }, React.createElement(icons.Award))
            : React.createElement('span', { style: { color: COLORS.textMuted } }, React.createElement(icons.Circle))
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 15,
                fontFamily: FONT,
                fontWeight: '500',
                color: m.achieved ? COLORS.text : COLORS.textMuted,
              }
            }, m.title),
            m.date && React.createElement('div', {
              style: {
                fontSize: 12,
                fontFamily: FONT,
                color: COLORS.textMuted,
              }
            }, m.date)
          ),
          m.achieved && React.createElement('span', {
            style: {
              fontSize: 12,
              fontFamily: FONT,
              color: '#4CAF50',
              fontWeight: '500',
            }
          }, '✓ Earned')
        )
      )
    )
  );
}

function PulseScreen() {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const triggers = [
    {
      id: 'power-songs',
      title: 'Power Songs',
      description: 'Curated tracks to ignite your energy',
      icon: icons.Music,
      color: COLORS.primary,
      items: ['Lose Yourself — Eminem', 'Stronger — Kanye West', 'Eye of the Tiger — Survivor', 'Don\'t Stop Me Now — Queen'],
    },
    {
      id: 'quotes',
      title: 'Inspirational Quotes',
      description: 'Words that move mountains',
      icon: icons.Quote,
      color: COLORS.secondary,
      items: [
        '"The only way to do great work is to love what you do." — Steve Jobs',
        '"It always seems impossible until it\'s done." — Nelson Mandela',
        '"Your limitation is only your imagination."',
        '"The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt',
      ],
    },
    {
      id: 'mindful',
      title: 'Mindful Breaks',
      description: 'Reset and recharge in minutes',
      icon: icons.Coffee,
      color: '#8B5CF6',
      items: ['2-min breathing exercise', '5-min body scan', 'Gratitude journaling (3 min)', 'Walking meditation (5 min)'],
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = triggers.find(t => t.id === 'quotes').items;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return React.createElement('div', {
    style: {
      padding: '0 20px 100px',
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    }
  },
    React.createElement('div', {
      style: {
        paddingTop: 55,
        paddingBottom: 8,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 34,
          fontFamily: FONT,
          fontWeight: '700',
          color: COLORS.text,
          letterSpacing: -0.5,
        }
      }, 'Motivation Pulse'),
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          color: COLORS.textSecondary,
          marginTop: 4,
        }
      }, 'Intelligent triggers for your drive')
    ),

    // Rotating Quote
    React.createElement('div', {
      style: {
        marginTop: 20,
        background: `linear-gradient(145deg, ${COLORS.secondary}30, ${COLORS.primary}15)`,
        borderRadius: 20,
        padding: 20,
        border: `1px solid ${COLORS.secondary}30`,
        minHeight: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: -20,
          left: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.cta}15, transparent 70%)`,
        }
      }),
      React.createElement('div', {
        style: {
          textAlign: 'center',
        }
      },
        React.createElement('div', {
          style: {
            fontSize: 15,
            fontFamily: FONT,
            color: COLORS.text,
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: '400',
            transition: 'opacity 0.5s ease',
          }
        }, quotes[currentQuote]),
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            marginTop: 12,
          }
        },
          ...quotes.map((_, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: i === currentQuote ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === currentQuote ? COLORS.cta : COLORS.surfaceLight,
                transition: 'all 0.3s ease',
              }
            })
          )
        )
      )
    ),

    // Energy Level Selector
    React.createElement('div', {
      style: {
        marginTop: 20,
        background: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${COLORS.border}`,
      }
    },
      React.createElement('div', {
        style: {
          fontSize: 15,
          fontFamily: FONT,
          fontWeight: '600',
          color: COLORS.text,
          marginBottom: 12,
        }
      }, 'How\'s your energy right now?'),
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: 8,
        }
      },
        ['😴 Low', '😐 Medium', '⚡ High', '🔥 Peak'].map((level, i) =>
          React.createElement('button', {
            key: i,
            style: {
              flex: 1,
              background: COLORS.surfaceLight,
              border: 'none',
              borderRadius: 10,
              padding: '10px 4px',
              fontSize: 12,
              fontFamily: FONT,
              color: COLORS.text,
              cursor: 'pointer',
              transition: 'all 0.2s',
            },
            onMouseDown: (e) => {
              e.currentTarget.style.background = COLORS.primary + '40';
              e.currentTarget.style.transform = 'scale(0.95)';
            },
            onMouseUp: (e) => {
              e.currentTarget.style.background = COLORS.surfaceLight;
              e.currentTarget.style.transform = 'scale(1)';
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = COLORS.surfaceLight;
              e.currentTarget.style.transform = 'scale(1)';
            },
          }, level)
        )
      )
    ),

    // Trigger Categories
    React.createElement('div', { style: { marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 } },
      ...triggers.map(trigger =>
        React.createElement('div', {
          key: trigger.id,
          style: {
            background: COLORS.cardBg,
            borderRadius: 16,
            border: `1px solid ${activeTrigger === trigger.id ? trigger.color + '50' : COLORS.border}`,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }
        },
          React.createElement('div', {
            onClick: () => setActiveTrigger(activeTrigger === trigger.id ? null : trigger.id),
            style: {
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${trigger.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            }, React.createElement('span', { style: { color: trigger.color } }, React.createElement(trigger.icon))),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: {
                  fontSize: 15,
                  fontFamily: FONT,
                  fontWeight: '600',
                  color: COLORS.text,
                }
              }, trigger.title),
              React.createElement('div', {
                style: {
                  fontSize: 13,
                  fontFamily: FONT,
                  color: COLORS.textSecondary,
                }
              }, trigger.description)
            ),
            React.createElement('span', {
              style: {
                color: COLORS.textMuted,
                transform: activeTrigger === trigger.id ? 'rotate(90deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }
            }, React.createElement(icons.ChevronRight))
          ),
          activeTrigger === trigger.id && React.createElement('div', {
            style: {
              padding: '0 16px 16px',
              borderTop: `1px solid ${COLORS.border}`,
              paddingTop: 12,
            }
          },
            ...trigger.items.map((item, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: i < trigger.items.length - 1 ? `1px solid ${COLORS.border}50` : 'none',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: `${trigger.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                }, React.createElement('span', { style: { color: trigger.color } }, React.createElement(icons.Play))),
                React.createElement('span', {
                  style: {
                    fontSize: 14,
                    fontFamily: FONT,
                    color: COLORS.text,
                    flex: 1,
                  }
                }, item)
              )
            )
          )
        )
      )
    )
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [streak, setStreak] = useState(14);
  const [prevScreen, setPrevScreen] = useState('home');

  const handleScreenChange = (screen) => {
    setPrevScreen(activeScreen);
    setActiveScreen(screen);
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'pathways', label: 'Pathways', icon: icons.BookOpen },
    { id: 'pulse', label: 'Pulse', icon: icons.Zap },
    { id: 'insights', label: 'Insights', icon: icons.Brain },
    { id: 'growth', label: 'Growth', icon: icons.BarChart3 },
  ];

  const renderScreen = () => {
    const props = { setActiveScreen: handleScreenChange, streak, setStreak };
    switch (activeScreen) {
      case 'home': return React.createElement(HomeScreen, props);
      case 'pathways': return React.createElement(PathwaysScreen, props);
      case 'insights': return React.createElement(InsightsScreen, props);
      case 'growth': return React.createElement(GrowthScreen, props);
      case 'pulse': return React.createElement(PulseScreen, props);
      default: return React.createElement(HomeScreen, props);
    }
  };

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      padding: '20px 0',
    }
  },
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: COLORS.background,
        position: 'relative',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          height: 34,
          background: '#000',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: 100,
        }
      }),

      // Status bar time
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 10,
          left: 30,
          fontSize: 14,
          fontFamily: FONT,
          fontWeight: '600',
          color: COLORS.text,
          zIndex: 101,
        }
      }, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),

      // Status bar right icons
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 12,
          right: 30,
          display: 'flex',
          gap: 5,
          alignItems: 'center',
          zIndex: 101,
        }
      },
        React.createElement('div', { style: { width: 16, height: 10, border: `1px solid ${COLORS.text}`, borderRadius: 2, position: 'relative' } },
          React.createElement('div', { style: { width: '70%', height: '100%', background: COLORS.text, borderRadius: 1 } }),
          React.createElement('div', { style: { position: 'absolute', right: -3, top: 2, width: 2, height: 6, background: COLORS.text, borderRadius: 1 } })
        )
      ),

      // Scrollable content area
      React.createElement('div', {
        style: {
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }
      }, renderScreen()),

      // Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: `${COLORS.surface}F0`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${COLORS.border}60`,
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: 8,
          paddingBottom: 30,
          zIndex: 50,
        }
      },
        ...tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => handleScreenChange(tab.id),
            style: {
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '4px 12px',
              transition: 'all 0.2s ease',
              minWidth: 50,
            }
          },
            React.createElement('div', {
              style: {
                color: activeScreen === tab.id ? COLORS.primary : COLORS.textMuted,
                transition: 'color 0.2s ease',
                transform: activeScreen === tab.id ? 'scale(1.1)' : 'scale(1)',
              }
            }, React.createElement(tab.icon)),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontFamily: FONT,
                fontWeight: activeScreen === tab.id ? '600' : '400',
                color: activeScreen === tab.id ? COLORS.primary : COLORS.textMuted,
                transition: 'color 0.2s ease',
              }
            }, tab.label),
            activeScreen === tab.id && React.createElement('div', {
              style: {
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: COLORS.primary,
                marginTop: -1,
              }
            })
          )
        )
      ),

      // Home indicator bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          background: COLORS.textMuted,
          borderRadius: 3,
          zIndex: 51,
        }
      })
    )
  );
}