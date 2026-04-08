const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [babyAge, setBabyAge] = useState('4 months');
  const [capturedToday, setCapturedToday] = useState(2);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const themes = {
    dark: {
      primary: '#0F0F23',
      secondary: '#1E1B4B',
      cta: '#E11D48',
      bg: '#000000',
      surface: '#0F0F23',
      surfaceLight: '#1a1a3e',
      text: '#FFFFFF',
      textSecondary: '#A0A0C0',
      textMuted: '#6B6B8D',
      card: '#141432',
      cardBorder: 'rgba(255,255,255,0.06)',
      overlay: 'rgba(0,0,0,0.7)',
      gradient1: 'linear-gradient(135deg, #E11D48 0%, #9333EA 100%)',
      gradient2: 'linear-gradient(135deg, #1E1B4B 0%, #0F0F23 100%)',
      gradient3: 'linear-gradient(180deg, rgba(225,29,72,0.15) 0%, transparent 100%)',
    },
    light: {
      primary: '#F8F7FF',
      secondary: '#EDE9FE',
      cta: '#E11D48',
      bg: '#FFFFFF',
      surface: '#F8F7FF',
      surfaceLight: '#EDE9FE',
      text: '#0F0F23',
      textSecondary: '#4A4A6A',
      textMuted: '#8888A8',
      card: '#FFFFFF',
      cardBorder: 'rgba(15,15,35,0.08)',
      overlay: 'rgba(255,255,255,0.85)',
      gradient1: 'linear-gradient(135deg, #E11D48 0%, #9333EA 100%)',
      gradient2: 'linear-gradient(135deg, #EDE9FE 0%, #F8F7FF 100%)',
      gradient3: 'linear-gradient(180deg, rgba(225,29,72,0.08) 0%, transparent 100%)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const createIcon = (IconComponent, props = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, {
      size: props.size || 22,
      color: props.color || t.text,
      strokeWidth: props.strokeWidth || 1.8,
      ...props,
    });
  };

  // Style tag for animations
  const styleTag = React.createElement('style', null, `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.08); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes bloomGrow {
      0% { transform: scale(0.3) rotate(-30deg); opacity: 0; }
      60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0% { box-shadow: 0 0 0 0 rgba(225,29,72,0.3); }
      100% { box-shadow: 0 0 0 20px rgba(225,29,72,0); }
    }
  `);

  // Mood options
  const moods = [
    { id: 'calm', label: 'Calm', color: '#6366F1' },
    { id: 'joyful', label: 'Joyful', color: '#F59E0B' },
    { id: 'tired', label: 'Tired', color: '#8B5CF6' },
    { id: 'grateful', label: 'Grateful', color: '#10B981' },
    { id: 'overwhelmed', label: 'Overwhelmed', color: '#EC4899' },
    { id: 'proud', label: 'Proud', color: '#E11D48' },
  ];

  // ============ HOME SCREEN ============
  function HomeScreen() {
    const reels = [
      { id: 1, title: 'First Giggles', duration: '0:32', mood: 'joyful', thumb: '#E11D48', age: '3 months' },
      { id: 2, title: 'Sleepy Mornings', duration: '0:45', mood: 'calm', thumb: '#6366F1', age: '4 months' },
      { id: 3, title: 'Discovery Day', duration: '0:28', mood: 'proud', thumb: '#10B981', age: '4 months' },
    ];

    const prompts = [
      { text: 'Capture a tiny yawn today', icon: icons.Moon },
      { text: 'Notice those curious eyes', icon: icons.Eye },
    ];

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              fontFamily: font, fontSize: 13, fontWeight: 600,
              color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1.2,
              marginBottom: 2,
            }
          }, babyAge.toUpperCase()),
          React.createElement('h1', {
            style: {
              fontFamily: font, fontSize: 34, fontWeight: 800,
              color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1,
            }
          }, 'Moment Bloom'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.surfaceLight, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }
          }, createIcon(isDark ? icons.Sun : icons.Moon, { size: 18, color: t.textSecondary })),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: {
              width: 40, height: 40, borderRadius: 20, border: 'none',
              background: t.gradient1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
            }
          }, createIcon(icons.User, { size: 18, color: '#fff' })),
        ),
      ),

      // Mood check-in banner
      React.createElement('div', {
        onClick: () => setShowMoodPicker(!showMoodPicker),
        style: {
          margin: '0 20px 16px', padding: '14px 18px',
          background: t.gradient3,
          borderRadius: 16, border: `1px solid ${t.cardBorder}`,
          cursor: 'pointer', transition: 'transform 0.15s',
          display: 'flex', alignItems: 'center', gap: 12,
        }
      },
        React.createElement('div', {
          style: {
            width: 42, height: 42, borderRadius: 21,
            background: selectedMood ? moods.find(m => m.id === selectedMood)?.color : t.cta,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'pulse 3s ease-in-out infinite',
          }
        }, createIcon(icons.Heart, { size: 20, color: '#fff' })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
          }, selectedMood ? `Feeling ${selectedMood} today` : 'How are you feeling?'),
          React.createElement('div', {
            style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginTop: 2 }
          }, 'Tap to set your mood for today\'s blooms'),
        ),
        createIcon(icons.ChevronRight, { size: 18, color: t.textMuted }),
      ),

      // Mood picker
      showMoodPicker && React.createElement('div', {
        style: {
          margin: '0 20px 16px', padding: 16,
          background: t.card, borderRadius: 16,
          border: `1px solid ${t.cardBorder}`,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
          animation: 'slideUp 0.3s ease-out',
        }
      },
        ...moods.map(mood =>
          React.createElement('button', {
            key: mood.id,
            onClick: (e) => { e.stopPropagation(); setSelectedMood(mood.id); setShowMoodPicker(false); },
            style: {
              padding: '12px 8px', borderRadius: 12, border: 'none',
              background: selectedMood === mood.id ? mood.color : t.surfaceLight,
              color: selectedMood === mood.id ? '#fff' : t.text,
              fontFamily: font, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }
          }, mood.label)
        )
      ),

      // Quiet Capture Prompt
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 18,
          background: isDark
            ? 'linear-gradient(135deg, #1E1B4B 0%, #2D1B69 100%)'
            : 'linear-gradient(135deg, #EDE9FE 0%, #FCE7F3 100%)',
          borderRadius: 20, position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 80, height: 80,
            borderRadius: 40, background: 'rgba(225,29,72,0.15)',
            animation: 'gentleFloat 4s ease-in-out infinite',
          }
        }),
        React.createElement('div', {
          style: {
            fontFamily: font, fontSize: 13, fontWeight: 600,
            color: t.cta, textTransform: 'uppercase', letterSpacing: 1,
            marginBottom: 8,
          }
        }, 'Quiet Capture'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 4, lineHeight: 1.4 }
        }, prompts[0].text),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginBottom: 14 }
        }, `${capturedToday} of 3 captured today`),
        React.createElement('button', {
          onClick: () => setActiveScreen('capture'),
          style: {
            padding: '10px 20px', borderRadius: 24, border: 'none',
            background: t.cta, color: '#fff',
            fontFamily: font, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            transition: 'transform 0.15s',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
          onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
        },
          createIcon(icons.Camera, { size: 16, color: '#fff' }),
          React.createElement('span', null, 'Capture Now'),
        ),
      ),

      // Recent Bloom Reels
      React.createElement('div', {
        style: { padding: '0 20px', marginBottom: 12 }
      },
        React.createElement('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 14,
          }
        },
          React.createElement('h2', {
            style: {
              fontFamily: font, fontSize: 22, fontWeight: 700,
              color: t.text, letterSpacing: -0.3, margin: 0,
            }
          }, 'Your Bloom Reels'),
          React.createElement('button', {
            onClick: () => setActiveScreen('timeline'),
            style: {
              background: 'none', border: 'none', color: t.cta,
              fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              padding: '4px 0',
            }
          }, 'See All'),
        ),
      ),

      // Reels horizontal scroll
      React.createElement('div', {
        style: {
          display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 8px',
          scrollbarWidth: 'none',
        }
      },
        ...reels.map((reel, i) =>
          React.createElement('div', {
            key: reel.id,
            onClick: () => setActiveReel(reel.id === activeReel ? null : reel.id),
            style: {
              minWidth: 160, height: 220, borderRadius: 20,
              background: `linear-gradient(180deg, ${reel.thumb}33 0%, ${reel.thumb}88 100%)`,
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
              border: activeReel === reel.id ? `2px solid ${reel.thumb}` : `1px solid ${t.cardBorder}`,
              transition: 'transform 0.2s, border 0.2s',
              animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`,
              flexShrink: 0,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            // Play button overlay
            React.createElement('div', {
              style: {
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 44, height: 44, borderRadius: 22,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, createIcon(icons.Play, { size: 20, color: '#fff' })),
            // Reel info
            React.createElement('div', {
              style: {
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '40px 14px 14px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              }
            },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }
              }, reel.title),
              React.createElement('div', {
                style: {
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.7)',
                }
              },
                createIcon(icons.Clock, { size: 12, color: 'rgba(255,255,255,0.7)' }),
                reel.duration,
                React.createElement('span', { style: { margin: '0 2px' } }, '\u00B7'),
                reel.age,
              ),
            ),
          )
        ),

        // Create new reel card
        React.createElement('div', {
          onClick: () => setActiveScreen('create'),
          style: {
            minWidth: 160, height: 220, borderRadius: 20,
            background: t.card, border: `2px dashed ${t.cardBorder}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', flexShrink: 0,
            transition: 'border-color 0.2s',
          }
        },
          React.createElement('div', {
            style: {
              width: 48, height: 48, borderRadius: 24,
              background: t.surfaceLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(icons.Plus, { size: 22, color: t.cta })),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.textSecondary }
          }, 'New Bloom'),
        ),
      ),

      // Growth milestone card
      React.createElement('div', {
        style: {
          margin: '20px 20px 0', padding: 18,
          background: t.card, borderRadius: 20,
          border: `1px solid ${t.cardBorder}`,
        }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #10B981, #6366F1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, createIcon(icons.TrendingUp, { size: 18, color: '#fff' })),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
            }, 'Growth Milestone'),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted }
            }, 'Week 17 \u2022 Rolling over!'),
          ),
        ),
        // Progress bar
        React.createElement('div', {
          style: {
            height: 6, borderRadius: 3, background: t.surfaceLight, overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              height: '100%', width: '68%', borderRadius: 3,
              background: t.gradient1,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite linear',
            }
          }),
        ),
        React.createElement('div', {
          style: {
            fontFamily: font, fontSize: 12, color: t.textMuted, marginTop: 8,
            display: 'flex', justifyContent: 'space-between',
          }
        },
          React.createElement('span', null, '12 moments captured this week'),
          React.createElement('span', null, '68%'),
        ),
      ),
    );
  }

  // ============ CAPTURE SCREEN ============
  function CaptureScreen() {
    const [selectedTag, setSelectedTag] = useState(null);
    const tags = [
      { id: 'sleepy', label: 'Sleepy', icon: icons.Moon, color: '#8B5CF6' },
      { id: 'giggles', label: 'Giggles', icon: icons.Smile, color: '#F59E0B' },
      { id: 'discovery', label: 'Discovery', icon: icons.Sparkles, color: '#10B981' },
      { id: 'feeding', label: 'Feeding', icon: icons.Coffee, color: '#EC4899' },
      { id: 'cuddles', label: 'Cuddles', icon: icons.Heart, color: '#E11D48' },
      { id: 'playtime', label: 'Playtime', icon: icons.Star, color: '#6366F1' },
    ];

    const capturePrompts = [
      { text: 'Capture a tiny yawn today', detail: 'Those sleepy moments are fleeting and precious', urgency: 'Today' },
      { text: 'Notice those curious eyes exploring', detail: 'Watch for moments of wonder and discovery', urgency: 'This week' },
      { text: 'A quiet moment together', detail: 'Calm, bonding moments tell beautiful stories', urgency: 'Anytime' },
    ];

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      // Header
      React.createElement('div', {
        style: { padding: '16px 20px 20px' }
      },
        React.createElement('h1', {
          style: {
            fontFamily: font, fontSize: 34, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, margin: 0,
          }
        }, 'Capture'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
        }, 'Tag your moments with emotions'),
      ),

      // Camera area placeholder
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', height: 260, borderRadius: 24,
          background: isDark
            ? 'linear-gradient(180deg, #1a1a3e 0%, #0F0F23 100%)'
            : 'linear-gradient(180deg, #EDE9FE 0%, #F8F7FF 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 16,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(225,29,72,0.08) 0%, transparent 70%)',
          }
        }),
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: 36,
            background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(225,29,72,0.4)',
            cursor: 'pointer', transition: 'transform 0.15s',
            animation: 'ripple 2s ease-out infinite',
          },
          onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.92)',
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; setCapturedToday(prev => prev + 1); },
        }, createIcon(icons.Camera, { size: 28, color: '#fff' })),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.textSecondary, zIndex: 1 }
        }, 'Tap to capture a moment'),
        React.createElement('div', {
          style: {
            display: 'flex', gap: 20, marginTop: 4,
          }
        },
          React.createElement('button', {
            style: {
              background: 'none', border: 'none', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
            }
          },
            createIcon(icons.Image, { size: 20, color: t.textMuted }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted }
            }, 'Photo'),
          ),
          React.createElement('button', {
            style: {
              background: 'none', border: 'none', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
            }
          },
            createIcon(icons.Video, { size: 20, color: t.textMuted }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted }
            }, 'Video'),
          ),
          React.createElement('button', {
            style: {
              background: 'none', border: 'none', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
            }
          },
            createIcon(icons.Upload, { size: 20, color: t.textMuted }),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted }
            }, 'Import'),
          ),
        ),
      ),

      // Sentiment tags
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Sentiment Stitcher'),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }
        },
          ...tags.map((tag, i) =>
            React.createElement('button', {
              key: tag.id,
              onClick: () => setSelectedTag(selectedTag === tag.id ? null : tag.id),
              style: {
                padding: '14px 10px', borderRadius: 16, border: 'none',
                background: selectedTag === tag.id
                  ? `linear-gradient(135deg, ${tag.color}22, ${tag.color}44)`
                  : t.card,
                border: selectedTag === tag.id
                  ? `2px solid ${tag.color}`
                  : `1px solid ${t.cardBorder}`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8, cursor: 'pointer',
                transition: 'all 0.2s',
                animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`,
              }
            },
              createIcon(tag.icon, { size: 20, color: selectedTag === tag.id ? tag.color : t.textSecondary }),
              React.createElement('span', {
                style: {
                  fontFamily: font, fontSize: 13, fontWeight: 600,
                  color: selectedTag === tag.id ? tag.color : t.textSecondary,
                }
              }, tag.label),
            )
          )
        ),
      ),

      // Capture prompts
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Quiet Prompts'),
        ...capturePrompts.map((prompt, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', transition: 'transform 0.15s',
              animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 44, height: 44, borderRadius: 14,
                background: t.surfaceLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            }, createIcon(icons.Sparkles, { size: 20, color: t.cta })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 }
              }, prompt.text),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, prompt.detail),
            ),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: 600,
                color: t.cta, background: `${t.cta}15`,
                padding: '4px 8px', borderRadius: 8,
              }
            }, prompt.urgency),
          )
        ),
      ),
    );
  }

  // ============ TIMELINE SCREEN ============
  function TimelineScreen() {
    const milestones = [
      { month: 'Month 4', title: 'Rolling Over!', moments: 34, bloom: 3, color: '#E11D48', date: 'This week' },
      { month: 'Month 3', title: 'First Giggles', moments: 48, bloom: 5, color: '#6366F1', date: '3 weeks ago' },
      { month: 'Month 2', title: 'Social Smiles', moments: 29, bloom: 2, color: '#10B981', date: '6 weeks ago' },
      { month: 'Month 1', title: 'First Month Home', moments: 56, bloom: 4, color: '#F59E0B', date: '10 weeks ago' },
    ];

    const stats = [
      { label: 'Moments', value: '167', icon: icons.Image },
      { label: 'Bloom Reels', value: '14', icon: icons.Film },
      { label: 'Days Active', value: '112', icon: icons.Calendar },
    ];

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', {
          style: {
            fontFamily: font, fontSize: 34, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, margin: 0,
          }
        }, 'Growth Journey'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
        }, 'Lily\'s beautiful progress'),
      ),

      // Stats row
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, padding: '0 20px', marginBottom: 20,
        }
      },
        ...stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, padding: '14px 12px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              textAlign: 'center', animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 12,
                background: t.surfaceLight, margin: '0 auto 8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, createIcon(stat.icon, { size: 16, color: t.cta })),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text }
            }, stat.value),
            React.createElement('div', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted, marginTop: 2 }
            }, stat.label),
          )
        )
      ),

      // Glow-Up Visualizer label
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 14 } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: 0,
          }
        }, 'Growth Glow-Up'),
      ),

      // Timeline
      React.createElement('div', { style: { padding: '0 20px' } },
        ...milestones.map((ms, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', gap: 16, marginBottom: 4,
              animation: `slideUp 0.4s ease-out ${i * 0.12}s both`,
            }
          },
            // Timeline line
            React.createElement('div', {
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: 24, flexShrink: 0,
              }
            },
              React.createElement('div', {
                style: {
                  width: 14, height: 14, borderRadius: 7,
                  background: ms.color, boxShadow: `0 0 12px ${ms.color}44`,
                  animation: i === 0 ? 'pulse 2s ease-in-out infinite' : 'none',
                }
              }),
              i < milestones.length - 1 && React.createElement('div', {
                style: {
                  width: 2, flex: 1,
                  background: `linear-gradient(${ms.color}44, ${t.cardBorder})`,
                }
              }),
            ),
            // Content
            React.createElement('div', {
              style: {
                flex: 1, padding: 16, borderRadius: 16,
                background: t.card, border: `1px solid ${t.cardBorder}`,
                marginBottom: 12, cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              },
              onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
              onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
            },
              React.createElement('div', {
                style: {
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 8,
                }
              },
                React.createElement('span', {
                  style: {
                    fontFamily: font, fontSize: 12, fontWeight: 700,
                    color: ms.color, textTransform: 'uppercase', letterSpacing: 0.8,
                  }
                }, ms.month),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 12, color: t.textMuted }
                }, ms.date),
              ),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 8 }
              }, ms.title),
              React.createElement('div', {
                style: { display: 'flex', gap: 16 }
              },
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 6 }
                },
                  createIcon(icons.Image, { size: 14, color: t.textMuted }),
                  React.createElement('span', {
                    style: { fontFamily: font, fontSize: 13, color: t.textMuted }
                  }, `${ms.moments} moments`),
                ),
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 6 }
                },
                  createIcon(icons.Film, { size: 14, color: t.textMuted }),
                  React.createElement('span', {
                    style: { fontFamily: font, fontSize: 13, color: t.textMuted }
                  }, `${ms.bloom} reels`),
                ),
              ),
              // Mini progress
              React.createElement('div', {
                style: {
                  height: 4, borderRadius: 2, background: t.surfaceLight,
                  marginTop: 12, overflow: 'hidden',
                }
              },
                React.createElement('div', {
                  style: {
                    height: '100%', width: `${Math.min(100, ms.moments * 2)}%`,
                    borderRadius: 2, background: ms.color,
                    transition: 'width 0.6s ease-out',
                  }
                }),
              ),
            ),
          )
        )
      ),
    );
  }

  // ============ CREATE SCREEN ============
  function CreateScreen() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const templates = [
      { id: 'gentle', name: 'Gentle Morning', desc: 'Soft, warm tones with lullaby music', mood: 'calm', color: '#6366F1', duration: '30s' },
      { id: 'playful', name: 'Playful Discovery', desc: 'Bright, bouncy transitions with giggly soundtrack', mood: 'joyful', color: '#F59E0B', duration: '45s' },
      { id: 'milestone', name: 'Milestone Magic', desc: 'Grand, celebratory with uplifting crescendo', mood: 'proud', color: '#E11D48', duration: '60s' },
      { id: 'lullaby', name: 'Lullaby Drift', desc: 'Dreamy, slow-motion with ambient sounds', mood: 'sleepy', color: '#8B5CF6', duration: '30s' },
      { id: 'growth', name: 'Growth Story', desc: 'Time-lapse style with narrative overlay', mood: 'grateful', color: '#10B981', duration: '90s' },
    ];

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', {
          style: {
            fontFamily: font, fontSize: 34, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, margin: 0,
          }
        }, 'Create Bloom'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
        }, 'Choose a template that matches your mood'),
      ),

      // Current mood indicator
      selectedMood && React.createElement('div', {
        style: {
          margin: '0 20px 16px', padding: '12px 16px',
          background: t.surfaceLight, borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }
      },
        React.createElement('div', {
          style: {
            width: 8, height: 8, borderRadius: 4,
            background: moods.find(m => m.id === selectedMood)?.color || t.cta,
          }
        }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
        }, `Templates adapted for your ${selectedMood} mood`),
      ),

      // Adaptive Bloom Templates
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Adaptive Bloom Templates'),

        ...templates.map((tmpl, i) =>
          React.createElement('div', {
            key: tmpl.id,
            onClick: () => setSelectedTemplate(selectedTemplate === tmpl.id ? null : tmpl.id),
            style: {
              padding: 16, borderRadius: 20, marginBottom: 12,
              background: selectedTemplate === tmpl.id
                ? `linear-gradient(135deg, ${tmpl.color}15, ${tmpl.color}08)`
                : t.card,
              border: selectedTemplate === tmpl.id
                ? `2px solid ${tmpl.color}`
                : `1px solid ${t.cardBorder}`,
              cursor: 'pointer', transition: 'all 0.2s',
              animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 14 }
            },
              React.createElement('div', {
                style: {
                  width: 52, height: 52, borderRadius: 16,
                  background: `linear-gradient(135deg, ${tmpl.color}33, ${tmpl.color}66)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }
              }, createIcon(icons.Film, { size: 22, color: tmpl.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', {
                  style: {
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 4,
                  }
                },
                  React.createElement('span', {
                    style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text }
                  }, tmpl.name),
                  React.createElement('span', {
                    style: {
                      fontFamily: font, fontSize: 11, fontWeight: 600,
                      color: tmpl.color, background: `${tmpl.color}15`,
                      padding: '3px 8px', borderRadius: 8,
                    }
                  }, tmpl.duration),
                ),
                React.createElement('div', {
                  style: { fontFamily: font, fontSize: 13, color: t.textMuted, lineHeight: 1.4 }
                }, tmpl.desc),
              ),
            ),

            // Expanded content
            selectedTemplate === tmpl.id && React.createElement('div', {
              style: {
                marginTop: 14, paddingTop: 14,
                borderTop: `1px solid ${t.cardBorder}`,
                animation: 'fadeIn 0.3s ease-out',
              }
            },
              React.createElement('div', {
                style: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }
              },
                ['Auto-select best 8 clips', 'AI music match', 'Smooth transitions'].map((feat, fi) =>
                  React.createElement('span', {
                    key: fi,
                    style: {
                      fontFamily: font, fontSize: 12, color: tmpl.color,
                      background: `${tmpl.color}10`, padding: '5px 10px',
                      borderRadius: 8, fontWeight: 500,
                    }
                  }, feat)
                )
              ),
              React.createElement('button', {
                style: {
                  width: '100%', padding: '14px', borderRadius: 14,
                  border: 'none', background: tmpl.color, color: '#fff',
                  fontFamily: font, fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                  transition: 'transform 0.15s',
                },
                onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.97)',
                onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
              },
                createIcon(icons.Wand2, { size: 18, color: '#fff' }),
                React.createElement('span', null, 'Generate Bloom Reel'),
              ),
            ),
          )
        ),
      ),
    );
  }

  // ============ SHARING SCREEN ============
  function SharingScreen() {
    const circles = [
      { name: 'Grandparents', members: 4, icon: icons.Heart, color: '#E11D48', shared: 12 },
      { name: 'Partner', members: 1, icon: icons.Users, color: '#6366F1', shared: 28 },
      { name: 'Close Friends', members: 6, icon: icons.UserPlus, color: '#10B981', shared: 5 },
    ];

    const recentShares = [
      { title: 'First Giggles Reel', to: 'Grandparents', time: '2 hours ago', status: 'viewed' },
      { title: 'Week 16 Growth', to: 'Partner', time: 'Yesterday', status: 'loved' },
      { title: 'Sleepy Morning', to: 'Close Friends', time: '3 days ago', status: 'sent' },
    ];

    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      React.createElement('div', { style: { padding: '16px 20px 12px' } },
        React.createElement('h1', {
          style: {
            fontFamily: font, fontSize: 34, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, margin: 0,
          }
        }, 'Sanctuary'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textMuted, margin: '4px 0 0' }
        }, 'Share with your private circle'),
      ),

      // Privacy notice
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: '12px 16px',
          background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)',
          borderRadius: 12, border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', alignItems: 'center', gap: 10,
        }
      },
        createIcon(icons.Shield, { size: 18, color: '#6366F1' }),
        React.createElement('span', {
          style: { fontFamily: font, fontSize: 13, color: t.textSecondary, flex: 1 }
        }, 'End-to-end encrypted. Only your circle can see shared moments.'),
      ),

      // Circles
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Your Circles'),
        ...circles.map((circle, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', transition: 'transform 0.15s',
              animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.98)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 16,
                background: `linear-gradient(135deg, ${circle.color}33, ${circle.color}66)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            }, createIcon(circle.icon, { size: 22, color: circle.color })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text }
              }, circle.name),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, `${circle.members} members \u00B7 ${circle.shared} shared`),
            ),
            createIcon(icons.ChevronRight, { size: 18, color: t.textMuted }),
          )
        ),
        // Add circle button
        React.createElement('button', {
          style: {
            width: '100%', padding: 14, borderRadius: 16,
            border: `2px dashed ${t.cardBorder}`, background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', fontFamily: font, fontSize: 15,
            fontWeight: 600, color: t.textMuted,
          }
        },
          createIcon(icons.Plus, { size: 18, color: t.textMuted }),
          React.createElement('span', null, 'Create New Circle'),
        ),
      ),

      // Recent shares
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Recent Shares'),
        ...recentShares.map((share, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 14, borderRadius: 14,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
              animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: t.surfaceLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            }, createIcon(icons.Send, { size: 16, color: t.textSecondary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
              }, share.title),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 12, color: t.textMuted }
              }, `To ${share.to} \u00B7 ${share.time}`),
            ),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 11, fontWeight: 600,
                color: share.status === 'loved' ? '#E11D48' : share.status === 'viewed' ? '#10B981' : t.textMuted,
                textTransform: 'capitalize',
              }
            }, share.status),
          )
        ),
      ),
    );
  }

  // ============ PROFILE SCREEN ============
  function ProfileScreen() {
    return React.createElement('div', {
      style: { animation: 'fadeIn 0.4s ease-out', paddingBottom: 20 }
    },
      React.createElement('div', { style: { padding: '16px 20px 20px' } },
        React.createElement('h1', {
          style: {
            fontFamily: font, fontSize: 34, fontWeight: 800,
            color: t.text, letterSpacing: -0.5, margin: 0,
          }
        }, 'Profile'),
      ),

      // Baby profile card
      React.createElement('div', {
        style: {
          margin: '0 20px 20px', padding: 24, borderRadius: 24,
          background: t.gradient1, position: 'relative', overflow: 'hidden',
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
            width: 64, height: 64, borderRadius: 32,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14, border: '2px solid rgba(255,255,255,0.3)',
          }
        }, createIcon(icons.Baby, { size: 28, color: '#fff' }) || createIcon(icons.User, { size: 28, color: '#fff' })),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }
        }, 'Lily Rose'),
        React.createElement('div', {
          style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)' }
        }, `${babyAge} old \u00B7 Born Dec 8, 2025`),
      ),

      // Settings list
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h2', {
          style: {
            fontFamily: font, fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: -0.3, margin: '0 0 14px',
          }
        }, 'Settings'),
        ...[
          { label: 'Baby Profile', sub: 'Update milestones & age', icon: icons.Baby || icons.User },
          { label: 'Notification Preferences', sub: 'Quiet capture reminders', icon: icons.Bell },
          { label: 'Theme', sub: isDark ? 'Dark mode' : 'Light mode', icon: isDark ? icons.Moon : icons.Sun, action: () => setIsDark(!isDark) },
          { label: 'Storage & Export', sub: '2.4 GB used', icon: icons.HardDrive },
          { label: 'Privacy & Security', sub: 'Encryption, sharing settings', icon: icons.Lock },
          { label: 'About Moment Bloom', sub: 'Version 1.0.0', icon: icons.Info },
        ].map((item, i) =>
          React.createElement('div', {
            key: i,
            onClick: item.action || undefined,
            style: {
              padding: '14px 0', display: 'flex', alignItems: 'center', gap: 14,
              borderBottom: `1px solid ${t.cardBorder}`,
              cursor: item.action ? 'pointer' : 'default',
              animation: `fadeIn 0.3s ease-out ${i * 0.06}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: t.surfaceLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            }, createIcon(item.icon, { size: 18, color: t.textSecondary })),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 17, fontWeight: 500, color: t.text }
              }, item.label),
              React.createElement('div', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, item.sub),
            ),
            createIcon(icons.ChevronRight, { size: 16, color: t.textMuted }),
          )
        ),
      ),
    );
  }

  // Screen mapping
  const screens = {
    home: HomeScreen,
    capture: CaptureScreen,
    timeline: TimelineScreen,
    create: CreateScreen,
    sharing: SharingScreen,
    profile: ProfileScreen,
  };

  // Tab bar items
  const tabs = [
    { id: 'home', label: 'Home', icon: icons.Home },
    { id: 'capture', label: 'Capture', icon: icons.Camera },
    { id: 'create', label: 'Create', icon: icons.Wand2 },
    { id: 'timeline', label: 'Growth', icon: icons.TrendingUp },
    { id: 'sharing', label: 'Share', icon: icons.Send },
  ];

  const ActiveScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      padding: '20px 0',
    }
  },
    styleTag,
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: t.bg,
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }
    },
      // Scrollable content
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 8,
          paddingBottom: 80,
          scrollbarWidth: 'none',
        }
      },
        React.createElement(ActiveScreen),
      ),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: isDark
            ? 'rgba(15,15,35,0.92)'
            : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.cardBorder}`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0 28px',
        }
      },
        ...tabs.map(tab => {
          const isActive = activeScreen === tab.id;
          return React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px 12px',
              minWidth: 48, minHeight: 44,
              transition: 'transform 0.15s',
            },
            onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.9)',
            onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
          },
            tab.id === 'create'
              ? React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 22,
                    background: t.gradient1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: -16,
                    boxShadow: '0 4px 16px rgba(225,29,72,0.3)',
                  }
                }, createIcon(tab.icon, { size: 20, color: '#fff' }))
              : createIcon(tab.icon, {
                  size: 22,
                  color: isActive ? t.cta : t.textMuted,
                  strokeWidth: isActive ? 2.2 : 1.6,
                }),
            React.createElement('span', {
              style: {
                fontFamily: font,
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? t.cta : t.textMuted,
                marginTop: tab.id === 'create' ? -2 : 0,
              }
            }, tab.label),
          );
        }),
      ),
    ),
  );
}
