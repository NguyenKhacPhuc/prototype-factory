const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const themes = {
    dark: {
      primary: '#1E293B',
      secondary: '#334155',
      cta: '#22C55E',
      bg: '#0F172A',
      cardBg: '#1E293B',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#334155',
      codeBg: '#0D1117',
      accent: '#22C55E',
      accentGlow: 'rgba(34, 197, 94, 0.15)',
      surfaceHover: '#253047',
    },
    light: {
      primary: '#F8FAFC',
      secondary: '#E2E8F0',
      cta: '#16A34A',
      bg: '#FFFFFF',
      cardBg: '#F8FAFC',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      codeBg: '#F1F5F9',
      accent: '#16A34A',
      accentGlow: 'rgba(22, 163, 74, 0.1)',
      surfaceHover: '#F1F5F9',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = React.createElement('style', null, `
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
    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.3); }
      50% { box-shadow: 0 0 20px rgba(34,197,94,0.6); }
    }
  `);

  // Icons helper
  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (!IconComp) return null;
    return React.createElement(IconComp, { size, color, style, strokeWidth: 1.8 });
  };

  // ============ HOME SCREEN ============
  function HomeScreen() {
    const [expandedChallenge, setExpandedChallenge] = useState(null);

    const challenges = [
      { id: 1, title: 'FizzBuzz in 1 Line', lang: 'JavaScript', difficulty: 'Easy', participants: 1247, timeLeft: '4h 23m', bytes: 47, icon: 'Zap', color: '#22C55E' },
      { id: 2, title: 'Matrix Rotate In-Place', lang: 'Python', difficulty: 'Hard', participants: 389, timeLeft: '11h 05m', bytes: 92, icon: 'RotateCw', color: '#F59E0B' },
      { id: 3, title: 'Palindrome Checker', lang: 'Rust', difficulty: 'Medium', participants: 756, timeLeft: '7h 41m', bytes: 68, icon: 'Repeat', color: '#8B5CF6' },
      { id: 4, title: 'Flatten Nested Array', lang: 'TypeScript', difficulty: 'Medium', participants: 621, timeLeft: '2h 15m', bytes: 55, icon: 'Layers', color: '#EC4899' },
    ];

    const bounties = [
      { title: 'Regex Master', reward: '+500 XP', desc: 'Validate emails under 40 chars', timeLeft: '1h 12m' },
      { title: 'One-Liner King', reward: '+300 XP', desc: 'Sort objects by nested key', timeLeft: '3h 45m' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Syntax Sprint'),
          React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '4px 0 0', fontFamily: font } }, 'Daily challenges await')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: t.secondary, border: 'none', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('div', {
            style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.cta}, #15803D)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          }, React.createElement(Icon, { name: 'User', size: 18, color: '#fff' }))
        )
      ),

      // Stats bar
      React.createElement('div', {
        style: {
          display: 'flex', gap: 10, marginBottom: 24, animation: 'slideUp 0.5s ease'
        }
      },
        [
          { label: 'Streak', value: '12', icon: 'Flame', color: '#F59E0B' },
          { label: 'Score', value: '4,280', icon: 'Trophy', color: t.cta },
          { label: 'Rank', value: '#47', icon: 'TrendingUp', color: '#8B5CF6' },
        ].map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.cardBg, borderRadius: 16, padding: '14px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s', cursor: 'pointer',
            },
            onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
            onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              React.createElement(Icon, { name: s.icon, size: 16, color: s.color })
            ),
            React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font, animation: 'countUp 0.6s ease' } }, s.value),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 2 } }, s.label)
          )
        )
      ),

      // Drive-By Bounties
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: 0, fontFamily: font, letterSpacing: -0.3 } }, 'Drive-By Bounties'),
          React.createElement(Icon, { name: 'Clock', size: 16, color: '#F59E0B' })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto' } },
          bounties.map((b, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 200, background: `linear-gradient(135deg, ${isDark ? '#1a2636' : '#FFF7ED'}, ${isDark ? '#1E293B' : '#FFFBEB'})`,
                borderRadius: 16, padding: 16,
                border: `1px solid ${isDark ? '#F59E0B33' : '#F59E0B44'}`,
                cursor: 'pointer', transition: 'all 0.2s',
                animation: `slideUp ${0.4 + i * 0.15}s ease`,
              },
              onMouseEnter: e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = '#F59E0B'; },
              onMouseLeave: e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = isDark ? '#F59E0B33' : '#F59E0B44'; },
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
                React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#F59E0B', fontFamily: font, background: '#F59E0B22', padding: '2px 8px', borderRadius: 8 } }, b.reward),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, b.timeLeft)
              ),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, b.title),
              React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, b.desc)
            )
          )
        )
      ),

      // Today's Challenges
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 14px', fontFamily: font, letterSpacing: -0.3 } }, "Today's Challenges"),
      challenges.map((c, i) =>
        React.createElement('div', {
          key: c.id,
          style: {
            background: t.cardBg, borderRadius: 20, padding: 18, marginBottom: 12,
            border: `1px solid ${expandedChallenge === c.id ? t.cta + '66' : t.border}`,
            boxShadow: expandedChallenge === c.id
              ? `0 4px 20px ${t.accentGlow}`
              : isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer', transition: 'all 0.25s ease',
            animation: `slideUp ${0.3 + i * 0.1}s ease`,
          },
          onClick: () => setExpandedChallenge(expandedChallenge === c.id ? null : c.id),
          onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)',
          onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', flex: 1 } },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14,
                  background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${c.color}33`,
                }
              }, React.createElement(Icon, { name: c.icon, size: 22, color: c.color })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, c.title),
                React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' } },
                  React.createElement('span', {
                    style: {
                      fontSize: 12, fontWeight: 600, color: c.difficulty === 'Easy' ? '#22C55E' : c.difficulty === 'Hard' ? '#EF4444' : '#F59E0B',
                      background: (c.difficulty === 'Easy' ? '#22C55E' : c.difficulty === 'Hard' ? '#EF4444' : '#F59E0B') + '18',
                      padding: '3px 8px', borderRadius: 8, fontFamily: font,
                    }
                  }, c.difficulty),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, padding: '3px 0' } }, c.lang),
                  React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, padding: '3px 0' } }, `${c.bytes} bytes`)
                )
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 13, color: '#F59E0B', fontWeight: 600, fontFamily: font } }, c.timeLeft),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font, marginTop: 4 } },
                React.createElement(Icon, { name: 'Users', size: 12, color: t.textMuted, style: { verticalAlign: 'middle', marginRight: 4 } }),
                c.participants
              )
            )
          ),
          expandedChallenge === c.id && React.createElement('div', {
            style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, animation: 'fadeIn 0.3s ease' }
          },
            React.createElement('div', {
              style: {
                background: t.codeBg, borderRadius: 12, padding: 14, fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: 13, color: t.cta, lineHeight: 1.6, marginBottom: 12, border: `1px solid ${t.border}`,
              }
            },
              c.id === 1 ? '// Write FizzBuzz for 1-100 in a single expression\n// Target: under 47 bytes' :
              c.id === 2 ? '# Rotate an NxN matrix 90° clockwise in-place\n# No extra space allowed' :
              c.id === 3 ? '// Check if a string is a palindrome\n// Handle unicode, ignore whitespace' :
              '// Flatten a deeply nested array\n// No Array.flat() allowed'
            ),
            React.createElement('button', {
              style: {
                width: '100%', padding: '14px', background: `linear-gradient(135deg, ${t.cta}, #15803D)`,
                border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700,
                fontFamily: font, cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: `0 4px 15px ${t.cta}44`,
              },
              onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-1px)',
              onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
            }, 'Start Challenge')
          )
        )
      )
    );
  }

  // ============ FEED SCREEN ============
  function FeedScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState({});

    const solutions = [
      {
        author: 'devNinja42', avatar: 'D', lang: 'JavaScript', challenge: 'FizzBuzz 1-Liner',
        code: `[...Array(100)].map((_,i)=>++i%3?i%5?i:'Buzz':i%5?'Fizz':'FizzBuzz')`,
        bytes: 69, votes: 342, comments: 28, time: '2m ago',
        metrics: { chars: 69, runtime: '0.3ms', memory: '2.1KB' }
      },
      {
        author: 'rustacean_', avatar: 'R', lang: 'Rust', challenge: 'Palindrome Check',
        code: `fn is_palindrome(s:&str)->bool{\n  let v:Vec<_>=s.chars().filter(|c|!c.is_whitespace()).collect();\n  v.iter().eq(v.iter().rev())\n}`,
        bytes: 103, votes: 218, comments: 15, time: '17m ago',
        metrics: { chars: 103, runtime: '0.01ms', memory: '1.2KB' }
      },
      {
        author: 'pyWizard', avatar: 'P', lang: 'Python', challenge: 'Matrix Rotate',
        code: `def rotate(m):\n  m[:]=list(zip(*m[::-1]))`,
        bytes: 42, votes: 567, comments: 43, time: '1h ago',
        metrics: { chars: 42, runtime: '0.1ms', memory: '0.8KB' }
      },
    ];

    const sol = solutions[currentIndex];

    return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { padding: '20px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: 0, fontFamily: font, letterSpacing: -0.3 } }, 'Solution Feed'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { background: t.secondary, border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 16, color: t.textSecondary })),
          React.createElement('button', {
            style: { background: t.secondary, border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'Filter', size: 16, color: t.textSecondary }))
        )
      ),

      // Navigation dots
      React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 6, padding: '4px 0 12px' } },
        solutions.map((_, i) =>
          React.createElement('div', {
            key: i,
            style: {
              width: i === currentIndex ? 24 : 8, height: 8, borderRadius: 4,
              background: i === currentIndex ? t.cta : t.secondary,
              transition: 'all 0.3s ease', cursor: 'pointer',
            },
            onClick: () => setCurrentIndex(i),
          })
        )
      ),

      // Solution Card
      React.createElement('div', { style: { flex: 1, padding: '0 16px', overflow: 'auto' } },
        React.createElement('div', {
          style: {
            background: t.cardBg, borderRadius: 24, padding: 20, marginBottom: 12,
            border: `1px solid ${t.border}`,
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.08)',
            animation: 'slideUp 0.4s ease',
          }
        },
          // Author row
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: `linear-gradient(135deg, ${t.cta}, #15803D)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: font,
                }
              }, sol.avatar),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: font } }, sol.author),
                React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, sol.time)
              )
            ),
            React.createElement('span', {
              style: {
                fontSize: 13, fontWeight: 600, color: t.cta, background: t.cta + '18',
                padding: '4px 12px', borderRadius: 10, fontFamily: font,
              }
            }, sol.lang)
          ),

          // Challenge name
          React.createElement('div', {
            style: {
              fontSize: 13, fontWeight: 600, color: t.textSecondary, fontFamily: font,
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
            }
          },
            React.createElement(Icon, { name: 'Target', size: 14, color: t.textSecondary }),
            sol.challenge
          ),

          // Code block
          React.createElement('div', {
            style: {
              background: t.codeBg, borderRadius: 16, padding: 18,
              fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 13,
              color: t.cta, lineHeight: 1.7, marginBottom: 16,
              border: `1px solid ${t.border}`, whiteSpace: 'pre-wrap', overflowX: 'auto',
              position: 'relative',
            }
          },
            React.createElement('div', {
              style: { position: 'absolute', top: 10, right: 10, fontSize: 11, color: t.textMuted, fontFamily: font }
            }, `${sol.bytes} bytes`),
            sol.code
          ),

          // Metrics row
          React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' } },
            [
              { label: 'Chars', value: sol.metrics.chars, icon: 'Hash' },
              { label: 'Runtime', value: sol.metrics.runtime, icon: 'Gauge' },
              { label: 'Memory', value: sol.metrics.memory, icon: 'HardDrive' },
            ].map((m, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  flex: 1, background: t.bg, borderRadius: 12, padding: '10px 12px',
                  border: `1px solid ${t.border}`, textAlign: 'center',
                }
              },
                React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, m.value),
                React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, m.label)
              )
            )
          ),

          // Action row
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', paddingTop: 12, borderTop: `1px solid ${t.border}` } },
            [
              { icon: 'ArrowBigUp', label: sol.votes, active: liked[currentIndex], action: () => setLiked({ ...liked, [currentIndex]: !liked[currentIndex] }) },
              { icon: 'MessageSquare', label: sol.comments },
              { icon: 'GitFork', label: 'Fork' },
              { icon: 'Share2', label: 'Share' },
            ].map((a, i) =>
              React.createElement('button', {
                key: i,
                onClick: a.action,
                style: {
                  background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 12px',
                  borderRadius: 12, transition: 'all 0.2s', minWidth: 52, minHeight: 52,
                  justifyContent: 'center',
                },
                onMouseEnter: e => e.currentTarget.style.background = t.surfaceHover,
                onMouseLeave: e => e.currentTarget.style.background = 'none',
              },
                React.createElement(Icon, { name: a.icon, size: 22, color: a.active ? t.cta : t.textSecondary }),
                React.createElement('span', { style: { fontSize: 12, color: a.active ? t.cta : t.textMuted, fontFamily: font, fontWeight: a.active ? 600 : 400 } }, a.label)
              )
            )
          )
        ),

        // Swipe buttons
        React.createElement('div', { style: { display: 'flex', gap: 10, padding: '4px 0 16px' } },
          React.createElement('button', {
            onClick: () => setCurrentIndex(Math.max(0, currentIndex - 1)),
            disabled: currentIndex === 0,
            style: {
              flex: 1, padding: 14, background: t.secondary, border: 'none', borderRadius: 14,
              color: currentIndex === 0 ? t.textMuted : t.text, fontSize: 15, fontWeight: 600,
              fontFamily: font, cursor: currentIndex === 0 ? 'default' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }
          }, React.createElement(Icon, { name: 'ChevronLeft', size: 18, color: currentIndex === 0 ? t.textMuted : t.text }), 'Prev'),
          React.createElement('button', {
            onClick: () => setCurrentIndex(Math.min(solutions.length - 1, currentIndex + 1)),
            disabled: currentIndex === solutions.length - 1,
            style: {
              flex: 1, padding: 14, background: `linear-gradient(135deg, ${t.cta}, #15803D)`, border: 'none', borderRadius: 14,
              color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: font,
              cursor: currentIndex === solutions.length - 1 ? 'default' : 'pointer',
              opacity: currentIndex === solutions.length - 1 ? 0.5 : 1, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: `0 4px 15px ${t.cta}44`,
            }
          }, 'Next', React.createElement(Icon, { name: 'ChevronRight', size: 18, color: '#fff' }))
        )
      )
    );
  }

  // ============ LEADERBOARD SCREEN ============
  function LeaderboardScreen() {
    const [period, setPeriod] = useState('weekly');

    const leaders = [
      { rank: 1, name: 'algorithmQueen', score: 12480, streak: 34, badge: 'Crown', solutions: 89, avatar: 'A' },
      { rank: 2, name: 'codeGolfer_pro', score: 11230, streak: 28, badge: 'Medal', solutions: 76, avatar: 'C' },
      { rank: 3, name: 'rustNinja99', score: 10870, streak: 21, badge: 'Award', solutions: 71, avatar: 'R' },
      { rank: 4, name: 'pyMinimalist', score: 9540, streak: 19, badge: null, solutions: 65, avatar: 'P' },
      { rank: 5, name: 'tsWizard', score: 8920, streak: 15, badge: null, solutions: 58, avatar: 'T' },
      { rank: 6, name: 'funcPureMaster', score: 8110, streak: 12, badge: null, solutions: 52, avatar: 'F' },
      { rank: 7, name: 'byteSlayer', score: 7650, streak: 10, badge: null, solutions: 47, avatar: 'B' },
    ];

    const podiumColors = ['#F59E0B', '#94A3B8', '#CD7F32'];
    const podiumIcons = ['Crown', 'Medal', 'Award'];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Leaderboard'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { background: t.secondary, border: 'none', borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary }))
      ),

      // Period tabs
      React.createElement('div', {
        style: {
          display: 'flex', background: t.secondary, borderRadius: 14, padding: 4, marginBottom: 24, gap: 4,
        }
      },
        ['daily', 'weekly', 'all-time'].map(p =>
          React.createElement('button', {
            key: p,
            onClick: () => setPeriod(p),
            style: {
              flex: 1, padding: '10px 0', border: 'none', borderRadius: 11,
              background: period === p ? t.cta : 'transparent',
              color: period === p ? '#fff' : t.textSecondary,
              fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              transition: 'all 0.25s ease', textTransform: 'capitalize',
            }
          }, p)
        )
      ),

      // Top 3 podium
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, marginBottom: 28, padding: '0 8px' }
      },
        [1, 0, 2].map(idx => {
          const l = leaders[idx];
          const isFirst = idx === 0;
          return React.createElement('div', {
            key: idx,
            style: {
              flex: 1, textAlign: 'center', animation: `slideUp ${0.3 + idx * 0.15}s ease`,
            }
          },
            React.createElement('div', {
              style: {
                width: isFirst ? 72 : 56, height: isFirst ? 72 : 56, borderRadius: isFirst ? 22 : 18,
                background: `linear-gradient(135deg, ${podiumColors[idx]}, ${podiumColors[idx]}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px', fontSize: isFirst ? 24 : 18, fontWeight: 800, color: '#fff', fontFamily: font,
                boxShadow: `0 4px 20px ${podiumColors[idx]}44`,
                animation: isFirst ? 'glowPulse 2s ease-in-out infinite' : 'none',
              }
            }, l.avatar),
            React.createElement(Icon, { name: podiumIcons[idx], size: 18, color: podiumColors[idx] }),
            React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font, marginTop: 4 } }, l.name),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 800, color: podiumColors[idx], fontFamily: font, marginTop: 2 } }, l.score.toLocaleString()),
            React.createElement('div', {
              style: {
                height: isFirst ? 80 : idx === 1 ? 60 : 44,
                background: `linear-gradient(to top, ${podiumColors[idx]}22, ${podiumColors[idx]}08)`,
                borderRadius: '12px 12px 0 0', marginTop: 8,
                border: `1px solid ${podiumColors[idx]}33`, borderBottom: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: podiumColors[idx], fontFamily: font } }, `#${l.rank}`))
          );
        })
      ),

      // Rest of leaderboard
      leaders.slice(3).map((l, i) =>
        React.createElement('div', {
          key: l.rank,
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: t.cardBg, borderRadius: 16, marginBottom: 8,
            border: `1px solid ${t.border}`, transition: 'all 0.2s',
            animation: `slideUp ${0.5 + i * 0.1}s ease`, cursor: 'pointer',
          },
          onMouseEnter: e => { e.currentTarget.style.background = t.surfaceHover; e.currentTarget.style.transform = 'translateX(4px)'; },
          onMouseLeave: e => { e.currentTarget.style.background = t.cardBg; e.currentTarget.style.transform = 'translateX(0)'; },
        },
          React.createElement('span', { style: { fontSize: 17, fontWeight: 700, color: t.textMuted, fontFamily: font, width: 28, textAlign: 'center' } }, `#${l.rank}`),
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 12, background: t.secondary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: t.cta, fontFamily: font,
            }
          }, l.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, l.name),
            React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, display: 'flex', gap: 12, marginTop: 2 } },
              React.createElement('span', null, `${l.solutions} solutions`),
              React.createElement('span', null,
                React.createElement(Icon, { name: 'Flame', size: 12, color: '#F59E0B', style: { verticalAlign: 'middle', marginRight: 2 } }),
                `${l.streak}d`
              )
            )
          ),
          React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.cta, fontFamily: font } }, l.score.toLocaleString())
        )
      )
    );
  }

  // ============ PROFILE SCREEN ============
  function ProfileScreen() {
    const [activeTab, setActiveTab] = useState('solutions');

    const stats = [
      { label: 'Solutions', value: '142', icon: 'Code2' },
      { label: 'Forks', value: '38', icon: 'GitFork' },
      { label: 'Upvotes', value: '1.2K', icon: 'ArrowBigUp' },
      { label: 'Streak', value: '12d', icon: 'Flame' },
    ];

    const recentSolutions = [
      { challenge: 'FizzBuzz 1-Liner', lang: 'JS', bytes: 47, votes: 89, rank: '#3' },
      { challenge: 'Sort Without .sort()', lang: 'TS', bytes: 82, votes: 56, rank: '#7' },
      { challenge: 'Deep Clone Object', lang: 'JS', bytes: 61, votes: 134, rank: '#1' },
    ];

    const badges = [
      { name: 'First Blood', desc: 'Solved first challenge', icon: 'Sword', color: '#EF4444' },
      { name: '100 Club', desc: '100+ solutions submitted', icon: 'Award', color: '#F59E0B' },
      { name: 'Byte Slayer', desc: 'Under 50 bytes solution', icon: 'Zap', color: '#8B5CF6' },
      { name: 'Team Player', desc: '10 co-op completions', icon: 'Users', color: '#06B6D4' },
      { name: 'Streak Master', desc: '30-day streak', icon: 'Flame', color: '#F97316', locked: true },
      { name: 'Polyglot', desc: '5+ languages used', icon: 'Globe', color: '#22C55E' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'center' } },
          React.createElement('div', {
            style: {
              width: 64, height: 64, borderRadius: 20,
              background: `linear-gradient(135deg, ${t.cta}, #15803D)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: font,
              boxShadow: `0 4px 20px ${t.cta}44`,
            }
          }, 'S'),
          React.createElement('div', null,
            React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: 0, fontFamily: font } }, 'stevedev'),
            React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '2px 0 0', fontFamily: font } }, 'Syntax Score: 4,280'),
            React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 6 } },
              ['JS', 'TS', 'PY', 'RS'].map(l =>
                React.createElement('span', {
                  key: l,
                  style: {
                    fontSize: 11, fontWeight: 600, color: t.cta, background: t.cta + '18',
                    padding: '2px 8px', borderRadius: 6, fontFamily: font,
                  }
                }, l)
              )
            )
          )
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            background: t.secondary, border: 'none', borderRadius: 12,
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary }))
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 } },
        stats.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.cardBg, borderRadius: 16, padding: '16px 14px',
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 14,
              animation: `slideUp ${0.3 + i * 0.1}s ease`,
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
            }
          },
            React.createElement('div', {
              style: { width: 44, height: 44, borderRadius: 14, background: t.cta + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }
            }, React.createElement(Icon, { name: s.icon, size: 20, color: t.cta })),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: font } }, s.value),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, s.label)
            )
          )
        )
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 16, background: t.secondary, borderRadius: 14, padding: 4 } },
        ['solutions', 'badges'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', border: 'none', borderRadius: 11,
              background: activeTab === tab ? t.cta : 'transparent',
              color: activeTab === tab ? '#fff' : t.textSecondary,
              fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer',
              transition: 'all 0.25s', textTransform: 'capitalize',
            }
          }, tab)
        )
      ),

      // Tab content
      activeTab === 'solutions' ?
        recentSolutions.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.cardBg, borderRadius: 16, padding: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', transition: 'all 0.2s', cursor: 'pointer',
              animation: `slideUp ${0.3 + i * 0.1}s ease`,
            },
            onMouseEnter: e => e.currentTarget.style.transform = 'translateX(4px)',
            onMouseLeave: e => e.currentTarget.style.transform = 'translateX(0)',
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, s.challenge),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: font, marginTop: 4, display: 'flex', gap: 12 } },
                React.createElement('span', null, s.lang),
                React.createElement('span', null, `${s.bytes} bytes`),
                React.createElement('span', null,
                  React.createElement(Icon, { name: 'ArrowBigUp', size: 12, color: t.textMuted, style: { verticalAlign: 'middle', marginRight: 2 } }),
                  s.votes
                )
              )
            ),
            React.createElement('span', {
              style: {
                fontSize: 15, fontWeight: 700,
                color: s.rank === '#1' ? '#F59E0B' : t.cta, fontFamily: font,
                background: (s.rank === '#1' ? '#F59E0B' : t.cta) + '18',
                padding: '4px 12px', borderRadius: 10,
              }
            }, s.rank)
          )
        )
      :
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          badges.map((b, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.cardBg, borderRadius: 18, padding: 16, textAlign: 'center',
                border: `1px solid ${b.locked ? t.border : b.color + '44'}`,
                opacity: b.locked ? 0.5 : 1, transition: 'all 0.2s',
                animation: `fadeIn ${0.3 + i * 0.08}s ease`, cursor: 'pointer',
              },
              onMouseEnter: e => !b.locked && (e.currentTarget.style.transform = 'translateY(-4px)'),
              onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)',
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 14,
                  background: b.locked ? t.secondary : b.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px',
                }
              }, React.createElement(Icon, { name: b.locked ? 'Lock' : b.icon, size: 20, color: b.locked ? t.textMuted : b.color })),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, b.name),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginTop: 2 } }, b.desc)
            )
          )
        )
    );
  }

  // ============ MAIN LAYOUT ============
  const screens = { home: HomeScreen, feed: FeedScreen, leaderboard: LeaderboardScreen, profile: ProfileScreen };
  const ActiveScreenComponent = screens[activeScreen];

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'feed', label: 'Feed', icon: 'Play' },
    { id: 'leaderboard', label: 'Ranks', icon: 'Trophy' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', fontFamily: font,
    }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        background: t.bg, position: 'relative', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      }
    },
      // Content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8, paddingBottom: 80 }
      },
        React.createElement(ActiveScreenComponent)
      ),

      // Bottom Tab Bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? t.primary + 'F0' : '#FFFFFFEE',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 28px', zIndex: 100,
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '6px 16px', borderRadius: 12, transition: 'all 0.2s',
              minWidth: 52, minHeight: 44,
            },
          },
            React.createElement(Icon, {
              name: tab.icon, size: 22,
              color: activeScreen === tab.id ? t.cta : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontSize: 11, fontWeight: activeScreen === tab.id ? 600 : 400,
                color: activeScreen === tab.id ? t.cta : t.textMuted, fontFamily: font,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
