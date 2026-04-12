const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#B52C32',
  secondary: '#F4C741',
  cta: '#88FF2C',
  bg: '#121212',
  bgLight: '#FFFFFF',
  surface: '#1E1E1E',
  surfaceLight: '#F5F5F5',
  text: '#FFFFFF',
  textLight: '#000000',
  textSecondary: '#A0A0A0',
  textSecondaryLight: '#666666',
  cardBg: '#1A1A2E',
  cardBgLight: '#FFFFFF',
  gold: '#F4C741',
  crimson: '#B52C32',
  green: '#88FF2C',
};

const fontFamily = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [coins, setCoins] = useState(2450);
  const [streak, setStreak] = useState(7);
  const [shieldActive, setShieldActive] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [rewardType, setRewardType] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [liveAnswers, setLiveAnswers] = useState({});
  const [animatingTab, setAnimatingTab] = useState(null);
  const [pulseGlow, setPulseGlow] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const theme = isDark ? 'dark' : 'light';
  const bg = isDark ? COLORS.bg : COLORS.bgLight;
  const surface = isDark ? COLORS.surface : COLORS.surfaceLight;
  const cardBg = isDark ? COLORS.cardBg : COLORS.cardBgLight;
  const text = isDark ? COLORS.text : COLORS.textLight;
  const textSecondary = isDark ? COLORS.textSecondary : COLORS.textSecondaryLight;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const triggerReward = () => {
    const types = ['coins', 'badge', 'rare', 'mega'];
    const weights = [0.5, 0.3, 0.15, 0.05];
    const rand = Math.random();
    let cumulative = 0;
    let selected = 'coins';
    for (let i = 0; i < types.length; i++) {
      cumulative += weights[i];
      if (rand <= cumulative) {
        selected = types[i];
        break;
      }
    }
    setRewardType(selected);
    setShowReward(true);
    if (selected === 'coins') setCoins(prev => prev + 50);
    else if (selected === 'badge') setCoins(prev => prev + 100);
    else if (selected === 'rare') setCoins(prev => prev + 250);
    else if (selected === 'mega') setCoins(prev => prev + 1000);
    setTimeout(() => setShowReward(false), 3000);
  };

  const matches = [
    { id: 1, home: 'Real Madrid', away: 'Barcelona', time: '21:00', date: 'SAT, DEC 14', homelogo: '⚪', awaylogo: '🔵🔴', live: false, odds: { home: 2.1, draw: 3.4, away: 2.8 } },
    { id: 2, home: 'Atlético Madrid', away: 'Sevilla', time: 'LIVE 67\'', date: 'TODAY', homelogo: '🔴⚪', awaylogo: '🔴', live: true, score: '2-1', odds: { home: 1.5, draw: 3.8, away: 5.2 } },
    { id: 3, home: 'Villarreal', away: 'Real Sociedad', time: '18:30', date: 'SUN, DEC 15', homelogo: '🟡', awaylogo: '🔵⚪', live: false, odds: { home: 2.4, draw: 3.1, away: 2.9 } },
    { id: 4, home: 'Athletic Bilbao', away: 'Valencia', time: '16:00', date: 'SUN, DEC 15', homelogo: '🔴⚪', awaylogo: '🦇', live: false, odds: { home: 1.9, draw: 3.3, away: 3.7 } },
    { id: 5, home: 'Girona', away: 'Betis', time: '20:00', date: 'MON, DEC 16', homelogo: '🔴⚪', awaylogo: '💚', live: false, odds: { home: 2.2, draw: 3.2, away: 3.1 } },
  ];

  const liveQuestions = [
    { id: 'q1', question: 'Next foul within 2 minutes?', options: ['Yes', 'No'], timer: 45 },
    { id: 'q2', question: 'Which team gets next corner?', options: ['Atlético', 'Sevilla'], timer: 60 },
    { id: 'q3', question: 'Goal before 75th minute?', options: ['Yes', 'No'], timer: 90 },
    { id: 'q4', question: 'Griezmann to receive a card this half?', options: ['Yes', 'No'], timer: 120 },
  ];

  const leaderboard = [
    { rank: 1, name: 'LaLigaKing99', points: 12450, avatar: '👑', streak: 15 },
    { rank: 2, name: 'FútbolGuru', points: 11200, avatar: '⚽', streak: 12 },
    { rank: 3, name: 'Madridista_X', points: 10890, avatar: '🏆', streak: 10 },
    { rank: 4, name: 'You', points: 9750, avatar: '🎯', streak: 7, isUser: true },
    { rank: 5, name: 'CuléForever', points: 9200, avatar: '🔥', streak: 9 },
    { rank: 6, name: 'TikiTaka22', points: 8900, avatar: '💎', streak: 6 },
    { rank: 7, name: 'GoalMachine', points: 8500, avatar: '🎪', streak: 5 },
    { rank: 8, name: 'DefensaMaestra', points: 8100, avatar: '🛡️', streak: 8 },
  ];

  const badges = [
    { name: 'El Clásico Oracle', icon: '🏟️', rarity: 'Legendary', earned: true },
    { name: 'Streak Master', icon: '🔥', rarity: 'Epic', earned: true },
    { name: 'First Blood', icon: '⚔️', rarity: 'Common', earned: true },
    { name: 'Card Shark', icon: '🃏', rarity: 'Rare', earned: false },
    { name: 'Corner King', icon: '📐', rarity: 'Uncommon', earned: false },
    { name: 'Perfect Week', icon: '💯', rarity: 'Legendary', earned: false },
  ];

  const Icon = ({ name, size = 24, color = text, style = {} }) => {
    const LucideIcon = window.lucide && window.lucide[name];
    if (LucideIcon) {
      return React.createElement(LucideIcon, { size, color, style, strokeWidth: 2 });
    }
    return React.createElement('span', { style: { fontSize: size, color, ...style } }, '●');
  };

  const GlowBox = ({ children, color = COLORS.primary, intensity = 0.3, style = {}, ...props }) => {
    return React.createElement('div', {
      style: {
        boxShadow: `0 0 ${pulseGlow ? 20 : 12}px rgba(${color === COLORS.primary ? '181,44,50' : color === COLORS.secondary ? '244,199,65' : '136,255,44'}, ${intensity})`,
        transition: 'box-shadow 2s ease-in-out',
        ...style
      },
      ...props
    }, children);
  };

  // Toast Notification
  const Toast = () => {
    if (!toastMessage) return null;
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        background: 'linear-gradient(135deg, #1A1A2E, #2A2A3E)',
        border: `1px solid ${COLORS.secondary}`,
        borderRadius: 12,
        padding: '12px 16px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        animation: 'slideDown 0.3s ease',
        boxShadow: `0 4px 20px rgba(244,199,65,0.3)`
      }
    },
      React.createElement('span', { style: { fontSize: 20 } }, '✨'),
      React.createElement('span', { style: { color: COLORS.text, fontSize: 15, fontFamily } }, toastMessage)
    );
  };

  // Reward Modal
  const RewardModal = () => {
    if (!showReward) return null;
    const rewards = {
      coins: { title: '+50 Coins!', icon: '🪙', color: COLORS.secondary, subtitle: 'Nice prediction!' },
      badge: { title: 'Badge Earned!', icon: '🎖️', color: COLORS.primary, subtitle: 'Uncommon reward!' },
      rare: { title: 'RARE DROP!', icon: '💎', color: '#9B59B6', subtitle: '+250 Coins & Rare Badge!' },
      mega: { title: '🎉 MEGA JACKPOT! 🎉', icon: '👑', color: COLORS.cta, subtitle: '+1000 Coins!' },
    };
    const reward = rewards[rewardType] || rewards.coins;

    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(10px)'
      }
    },
      React.createElement('div', {
        style: {
          background: `linear-gradient(145deg, ${COLORS.surface}, ${COLORS.cardBg})`,
          borderRadius: 24,
          padding: 32,
          textAlign: 'center',
          border: `2px solid ${reward.color}`,
          boxShadow: `0 0 40px rgba(${reward.color === COLORS.secondary ? '244,199,65' : reward.color === COLORS.cta ? '136,255,44' : '155,89,182'}, 0.5)`,
          animation: 'scaleIn 0.5s ease',
          maxWidth: 280
        }
      },
        React.createElement('div', {
          style: { fontSize: 64, marginBottom: 16, animation: 'bounce 0.6s ease infinite alternate' }
        }, reward.icon),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '800', color: reward.color, fontFamily, marginBottom: 8 }
        }, reward.title),
        React.createElement('div', {
          style: { fontSize: 15, color: COLORS.textSecondary, fontFamily, marginBottom: 20 }
        }, reward.subtitle),
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.crimson})`,
            borderRadius: 12,
            padding: '10px 24px',
            color: COLORS.text,
            fontWeight: '700',
            fontSize: 15,
            fontFamily,
            cursor: 'pointer'
          },
          onClick: () => setShowReward(false)
        }, 'Collect!')
      )
    );
  };

  // Header Component
  const Header = ({ title, showBack = false }) => {
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 20px 16px',
        background: isDark
          ? 'linear-gradient(180deg, rgba(181,44,50,0.15) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(181,44,50,0.08) 0%, transparent 100%)',
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        showBack && React.createElement('div', {
          onClick: () => setActiveScreen('home'),
          style: { cursor: 'pointer', padding: 4 }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 24, color: text })),
        React.createElement('div', {},
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: '800', fontFamily, color: text, letterSpacing: -0.5 }
          }, title),
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { cursor: 'pointer', padding: 4 }
        }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: COLORS.secondary })),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: isDark ? 'rgba(244,199,65,0.15)' : 'rgba(244,199,65,0.1)',
            borderRadius: 20,
            padding: '6px 12px',
            border: `1px solid rgba(244,199,65,0.3)`
          }
        },
          React.createElement('span', { style: { fontSize: 16 } }, '🪙'),
          React.createElement('span', {
            style: { color: COLORS.secondary, fontWeight: '700', fontSize: 15, fontFamily }
          }, coins.toLocaleString())
        )
      )
    );
  };

  // Streak Banner
  const StreakBanner = () => {
    return React.createElement(GlowBox, {
      color: COLORS.secondary,
      intensity: 0.4,
      style: {
        margin: '0 20px 16px',
        borderRadius: 16,
        padding: 16,
        background: isDark
          ? 'linear-gradient(135deg, rgba(244,199,65,0.12), rgba(181,44,50,0.12))'
          : 'linear-gradient(135deg, rgba(244,199,65,0.08), rgba(181,44,50,0.08))',
        border: `1px solid rgba(244,199,65,0.25)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', {
          style: { fontSize: 32, filter: 'drop-shadow(0 0 8px rgba(244,199,65,0.5))' }
        }, '🔥'),
        React.createElement('div', {},
          React.createElement('div', {
            style: { fontSize: 17, fontWeight: '700', color: text, fontFamily }
          }, `${streak}-Match Streak!`),
          React.createElement('div', {
            style: { fontSize: 13, color: textSecondary, fontFamily }
          }, 'Keep it going for bonus rewards')
        )
      ),
      React.createElement('div', {
        onClick: () => {
          if (!shieldActive && coins >= 200) {
            setShieldActive(true);
            setCoins(prev => prev - 200);
            showToast('Shield activated! Your streak is protected');
          } else if (shieldActive) {
            showToast('Shield already active!');
          } else {
            showToast('Not enough coins! Need 200');
          }
        },
        style: {
          background: shieldActive
            ? 'linear-gradient(135deg, rgba(136,255,44,0.3), rgba(136,255,44,0.1))'
            : 'linear-gradient(135deg, rgba(181,44,50,0.8), rgba(181,44,50,0.6))',
          borderRadius: 12,
          padding: '8px 14px',
          cursor: 'pointer',
          border: shieldActive ? `1px solid ${COLORS.cta}` : `1px solid rgba(255,255,255,0.1)`,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }
      },
        React.createElement('span', { style: { fontSize: 16 } }, '🛡️'),
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: '600', color: shieldActive ? COLORS.cta : COLORS.text, fontFamily }
        }, shieldActive ? 'Active' : '200')
      )
    );
  };

  // Match Card
  const MatchCard = ({ match }) => {
    const isLive = match.live;
    return React.createElement(GlowBox, {
      color: isLive ? COLORS.cta : COLORS.primary,
      intensity: isLive ? 0.4 : 0.15,
      style: {
        margin: '0 20px 12px',
        borderRadius: 16,
        padding: 16,
        background: isDark
          ? `linear-gradient(145deg, ${COLORS.cardBg}, ${COLORS.surface})`
          : `linear-gradient(145deg, #FFFFFF, #F8F8F8)`,
        border: isLive
          ? `1px solid rgba(136,255,44,0.4)`
          : `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      },
      onClick: () => {
        setSelectedMatch(match);
        setActiveScreen(isLive ? 'live' : 'predict');
      }
    },
      // Live indicator
      isLive && React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10
        }
      },
        React.createElement('div', {
          style: {
            width: 8, height: 8,
            borderRadius: 4,
            background: COLORS.cta,
            boxShadow: `0 0 8px ${COLORS.cta}`,
            animation: 'pulse 1s ease infinite'
          }
        }),
        React.createElement('span', {
          style: { fontSize: 13, fontWeight: '700', color: COLORS.cta, fontFamily, letterSpacing: 0.5 }
        }, 'LIVE')
      ),

      // Date/time
      !isLive && React.createElement('div', {
        style: { fontSize: 13, color: textSecondary, fontFamily, marginBottom: 10, fontWeight: '600' }
      }, `${match.date} • ${match.time}`),

      // Teams
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        // Home team
        React.createElement('div', {
          style: { flex: 1, textAlign: 'center' }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, match.homelogo),
          React.createElement('div', {
            style: { fontSize: 14, fontWeight: '700', color: text, fontFamily }
          }, match.home)
        ),

        // Score / VS
        React.createElement('div', {
          style: { padding: '0 16px', textAlign: 'center' }
        },
          isLive
            ? React.createElement('div', {
              style: {
                fontSize: 28, fontWeight: '900', color: COLORS.text, fontFamily,
                textShadow: `0 0 12px rgba(136,255,44,0.4)`
              }
            }, match.score)
            : React.createElement('div', {
              style: {
                fontSize: 17, fontWeight: '800', color: COLORS.secondary, fontFamily,
                background: `rgba(244,199,65,0.1)`,
                borderRadius: 8,
                padding: '4px 12px'
              }
            }, 'VS'),
          isLive && React.createElement('div', {
            style: { fontSize: 12, color: COLORS.cta, fontFamily, fontWeight: '600', marginTop: 4 }
          }, match.time)
        ),

        // Away team
        React.createElement('div', {
          style: { flex: 1, textAlign: 'center' }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 6 } }, match.awaylogo),
          React.createElement('div', {
            style: { fontSize: 14, fontWeight: '700', color: text, fontFamily }
          }, match.away)
        )
      ),

      // Action button
      React.createElement('div', {
        style: {
          marginTop: 14,
          background: isLive
            ? `linear-gradient(135deg, ${COLORS.cta}, #66CC22)`
            : `linear-gradient(135deg, ${COLORS.primary}, #D44050)`,
          borderRadius: 10,
          padding: '10px 0',
          textAlign: 'center',
          boxShadow: isLive
            ? `0 4px 16px rgba(136,255,44,0.3)`
            : `0 4px 16px rgba(181,44,50,0.3)`
        }
      },
        React.createElement('span', {
          style: {
            fontSize: 14,
            fontWeight: '700',
            color: isLive ? '#000' : '#FFF',
            fontFamily,
            letterSpacing: 0.5
          }
        }, isLive ? '⚡ JOIN LIVE CHALLENGES' : '🎯 PREDICT NOW')
      )
    );
  };

  // HOME SCREEN
  const HomeScreen = () => {
    return React.createElement('div', {
      style: { height: '100%', overflow: 'auto', background: bg, paddingBottom: 80 }
    },
      React.createElement(Header, { title: 'LigaLoot' }),
      React.createElement(StreakBanner),

      // Section title
      React.createElement('div', {
        style: {
          padding: '12px 20px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      },
        React.createElement('span', {
          style: { fontSize: 20, fontWeight: '700', color: text, fontFamily }
        }, 'Upcoming Matches'),
        React.createElement('span', {
          style: { fontSize: 13, color: COLORS.secondary, fontFamily, fontWeight: '600', cursor: 'pointer' }
        }, 'See All')
      ),

      // AI Insights Banner
      React.createElement(GlowBox, {
        color: '#9B59B6',
        intensity: 0.2,
        style: {
          margin: '8px 20px 16px',
          borderRadius: 14,
          padding: 14,
          background: isDark
            ? 'linear-gradient(135deg, rgba(155,89,182,0.15), rgba(181,44,50,0.1))'
            : 'linear-gradient(135deg, rgba(155,89,182,0.08), rgba(181,44,50,0.05))',
          border: '1px solid rgba(155,89,182,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer'
        },
        onClick: () => setActiveScreen('insights')
      },
        React.createElement('div', {
          style: { fontSize: 28, filter: 'drop-shadow(0 0 6px rgba(155,89,182,0.5))' }
        }, '🤖'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', {
            style: { fontSize: 15, fontWeight: '700', color: text, fontFamily }
          }, 'AI Insights Available'),
          React.createElement('div', {
            style: { fontSize: 13, color: textSecondary, fontFamily }
          }, 'El Clásico analysis ready • 89% confidence')
        ),
        React.createElement(Icon, { name: 'ChevronRight', size: 18, color: '#9B59B6' })
      ),

      // Match list
      ...matches.map(match =>
        React.createElement(MatchCard, { key: match.id, match })
      )
    );
  };

  // PREDICT SCREEN
  const PredictScreen = () => {
    const match = selectedMatch || matches[0];
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [selectedScorer, setSelectedScorer] = useState(null);
    const [selectedCards, setSelectedCards] = useState(null);
    const [possession, setPossession] = useState(50);

    const scorers = ['Vinícius Jr.', 'Bellingham', 'Lamine Yamal', 'Lewandowski', 'Rodrygo', 'Other'];
    const cardOptions = ['0-2', '3-4', '5-6', '7+'];

    const handleSubmit = () => {
      if (selectedWinner && selectedScorer) {
        setStreak(prev => prev + 1);
        setCoins(prev => prev + 100);
        triggerReward();
        showToast('Predictions submitted! +100 coins');
        setTimeout(() => setActiveScreen('home'), 3500);
      } else {
        showToast('Select at least winner and first scorer!');
      }
    };

    return React.createElement('div', {
      style: { height: '100%', overflow: 'auto', background: bg, paddingBottom: 80 }
    },
      React.createElement(Header, { title: 'Match Fate', showBack: true }),

      // Match header
      React.createElement('div', {
        style: {
          margin: '0 20px 20px',
          borderRadius: 16,
          padding: 20,
          background: isDark
            ? 'linear-gradient(145deg, rgba(181,44,50,0.2), rgba(244,199,65,0.05))'
            : 'linear-gradient(145deg, rgba(181,44,50,0.08), rgba(244,199,65,0.03))',
          border: `1px solid rgba(181,44,50,0.2)`,
          textAlign: 'center'
        }
      },
        React.createElement('div', {
          style: { fontSize: 13, color: textSecondary, fontFamily, marginBottom: 10, fontWeight: '600' }
        }, `${match.date} • ${match.time}`),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }
        },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: 36 } }, match.homelogo),
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: text, fontFamily, marginTop: 4 } }, match.home)
          ),
          React.createElement('div', {
            style: { fontSize: 17, fontWeight: '800', color: COLORS.secondary, fontFamily }
          }, 'VS'),
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: 36 } }, match.awaylogo),
            React.createElement('div', { style: { fontSize: 14, fontWeight: '700', color: text, fontFamily, marginTop: 4 } }, match.away)
          )
        )
      ),

      // Winner prediction
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: '700', color: text, fontFamily, marginBottom: 10 }
        }, '🏆 Match Winner'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          [match.home, 'Draw', match.away].map((option, i) =>
            React.createElement('div', {
              key: option,
              onClick: () => setSelectedWinner(option),
              style: {
                flex: 1,
                padding: '12px 8px',
                borderRadius: 12,
                textAlign: 'center',
                cursor: 'pointer',
                background: selectedWinner === option
                  ? `linear-gradient(135deg, ${COLORS.primary}, #D44050)`
                  : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: selectedWinner === option
                  ? `1px solid ${COLORS.primary}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.2s ease',
                transform: selectedWinner === option ? 'scale(1.02)' : 'scale(1)'
              }
            },
              React.createElement('div', {
                style: { fontSize: 13, fontWeight: '700', color: selectedWinner === option ? '#FFF' : text, fontFamily }
              }, option),
              React.createElement('div', {
                style: { fontSize: 11, color: selectedWinner === option ? 'rgba(255,255,255,0.7)' : textSecondary, fontFamily, marginTop: 2 }
              }, [match.odds.home, match.odds.draw, match.odds.away][i] + 'x')
            )
          )
        )
      ),

      // First Goal Scorer
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: '700', color: text, fontFamily, marginBottom: 10 }
        }, '⚽ First Goal Scorer'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          scorers.map(player =>
            React.createElement('div', {
              key: player,
              onClick: () => setSelectedScorer(player),
              style: {
                padding: '10px 14px',
                borderRadius: 10,
                cursor: 'pointer',
                background: selectedScorer === player
                  ? `linear-gradient(135deg, ${COLORS.secondary}, #E5B830)`
                  : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: selectedScorer === player
                  ? `1px solid ${COLORS.secondary}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.2s ease'
              }
            },
              React.createElement('span', {
                style: {
                  fontSize: 13, fontWeight: '600',
                  color: selectedScorer === player ? '#000' : text,
                  fontFamily
                }
              }, player)
            )
          )
        )
      ),

      // Cards prediction
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 20 } },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: '700', color: text, fontFamily, marginBottom: 10 }
        }, '🟨 Total Cards'),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          cardOptions.map(option =>
            React.createElement('div', {
              key: option,
              onClick: () => setSelectedCards(option),
              style: {
                flex: 1,
                padding: '12px 8px',
                borderRadius: 12,
                textAlign: 'center',
                cursor: 'pointer',
                background: selectedCards === option
                  ? `linear-gradient(135deg, ${COLORS.cta}, #66CC22)`
                  : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: selectedCards === option
                  ? `1px solid ${COLORS.cta}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.2s ease'
              }
            },
              React.createElement('span', {
                style: { fontSize: 14, fontWeight: '700', color: selectedCards === option ? '#000' : text, fontFamily }
              }, option)
            )
          )
        )
      ),

      // Possession slider
      React.createElement('div', { style: { padding: '0 20px', marginBottom: 24 } },
        React.createElement('div', {
          style: { fontSize: 17, fontWeight: '700', color: text, fontFamily, marginBottom: 10 }
        }, `📊 ${match.home} Possession: ${possession}%`),
        React.createElement('input', {
          type: 'range',
          min: 20,
          max: 80,
          value: possession,
          onChange: (e) => setPossession(parseInt(e.target.value)),
          style: {
            width: '100%',
            accentColor: COLORS.primary,
            height: 6
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 }
        },
          React.createElement('span', { style: { fontSize: 12, color: textSecondary, fontFamily } }, `${match.home} ${possession}%`),
          React.createElement('span', { style: { fontSize: 12, color: textSecondary, fontFamily } }, `${match.away} ${100 - possession}%`)
        )
      ),

      // Points preview
      React.createElement('div', {
        style: {
          margin: '0 20px 16px',
          borderRadius: 12,
          padding: 14,
          background: isDark ? 'rgba(244,199,65,0.08)' : 'rgba(244,199,65,0.06)',
          border: '1px solid rgba(244,199,65,0.15)',
          display: 'flex',
          justifyContent: 'space-around'
        }
      },
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: COLORS.secondary, fontFamily } }, '100'),
          React.createElement('div', { style: { fontSize: 11, color: textSecondary, fontFamily } }, 'Base Points')
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: COLORS.cta, fontFamily } }, 'x1.7'),
          React.createElement('div', { style: { fontSize: 11, color: textSecondary, fontFamily } }, 'Streak Bonus')
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 20, fontWeight: '800', color: COLORS.primary, fontFamily } }, '170'),
          React.createElement('div', { style: { fontSize: 11, color: textSecondary, fontFamily } }, 'Potential')
        )
      ),

      // Submit
      React.createElement('div', {
        onClick: handleSubmit,
        style: {
          margin: '0 20px 20px',
          background: `linear-gradient(135deg, ${COLORS.primary}, #D44050)`,
          borderRadius: 14,
          padding: '16px 0',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: `0 6px 24px rgba(181,44,50,0.4)`,
          transition: 'transform 0.15s ease'
        }
      },
        React.createElement('span', {
          style: { fontSize: 17, fontWeight: '800', color: '#FFF', fontFamily, letterSpacing: 0.5 }
        }, '🎯 LOCK IN PREDICTIONS')
      )
    );
  };

  // LIVE SCREEN
  const LiveScreen = () => {
    const match = selectedMatch || matches.find(m => m.live) || matches[1];
    const [currentQ, setCurrentQ] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [answered, setAnswered] = useState({});

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(timer);
    }, [currentQ]);

    const handleAnswer = (qId, answer) => {
      if (answered[qId]) return;
      setAnswered(prev => ({ ...prev, [qId]: answer }));
      setCoins(prev => prev + 25);
      triggerReward();
      setTimeout(() => {
        if (currentQ < liveQuestions.length - 1) {
          setCurrentQ(prev => prev + 1);
          setTimeLeft(liveQuestions[currentQ + 1].timer);
        }
      }, 2000);
    };

    const q = liveQuestions[currentQ];

    return React.createElement('div', {
      style: { height: '100%', overflow: 'auto', background: bg, paddingBottom: 80 }
    },
      React.createElement(Header, { title: 'Live Arena', showBack: true }),

      // Live match header
      React.createElement('div', {
        style: {
          margin: '0 20px 20px',
          borderRadius: 20,
          padding: 24,
          background: isDark
            ? 'linear-gradient(145deg, rgba(136,255,44,0.08), rgba(181,44,50,0.15))'
            : 'linear-gradient(145deg, rgba(136,255,44,0.05), rgba(181,44,50,0.05))',
          border: `1px solid rgba(136,255,44,0.3)`,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }
      },
        // Animated background effect
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: -50, right: -50,
            width: 100, height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(136,255,44,0.15), transparent)`,
            animation: 'pulse 3s ease infinite'
          }
        }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }
        },
          React.createElement('div', {
            style: {
              width: 8, height: 8, borderRadius: 4, background: COLORS.cta,
              boxShadow: `0 0 8px ${COLORS.cta}`, animation: 'pulse 1s ease infinite'
            }
          }),
          React.createElement('span', {
            style: { fontSize: 13, fontWeight: '700', color: COLORS.cta, fontFamily }
          }, 'LIVE')
        ),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }
        },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: 36 } }, match.homelogo),
            React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: text, fontFamily, marginTop: 4 } }, match.home)
          ),
          React.createElement('div', {},
            React.createElement('div', {
              style: {
                fontSize: 36, fontWeight: '900', color: COLORS.text, fontFamily,
                textShadow: '0 0 16px rgba(136,255,44,0.5)'
              }
            }, match.score || '2-1'),
            React.createElement('div', {
              style: { fontSize: 12, color: COLORS.cta, fontFamily, fontWeight: '600', marginTop: 4 }
            }, match.time)
          ),
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: 36 } }, match.awaylogo),
            React.createElement('div', { style: { fontSize: 13, fontWeight: '700', color: text, fontFamily, marginTop: 4 } }, match.away)
          )
        )
      ),

      // Micro-challenge
      React.createElement('div', {
        style: { padding: '0 20px', marginBottom: 16 }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }
        },
          React.createElement('span', {
            style: { fontSize: 17, fontWeight: '700', color: text, fontFamily }
          }, '⚡ Micro-Challenge'),
          React.createElement('span', {
            style: { fontSize: 13, color: COLORS.secondary, fontFamily, fontWeight: '600' }
          }, `${currentQ + 1}/${liveQuestions.length}`)
        )
      ),

      React.createElement(GlowBox, {
        color: timeLeft < 10 ? COLORS.primary : COLORS.cta,
        intensity: 0.3,
        style: {
          margin: '0 20px 16px',
          borderRadius: 20,
          padding: 24,
          background: isDark
            ? `linear-gradient(145deg, ${COLORS.cardBg}, ${COLORS.surface})`
            : `linear-gradient(145deg, #FFFFFF, #F5F5F5)`,
          border: `1px solid ${timeLeft < 10 ? 'rgba(181,44,50,0.4)' : 'rgba(136,255,44,0.2)'}`,
        }
      },
        // Timer bar
        React.createElement('div', {
          style: {
            height: 4,
            borderRadius: 2,
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            marginBottom: 20,
            overflow: 'hidden'
          }
        },
          React.createElement('div', {
            style: {
              height: '100%',
              borderRadius: 2,
              width: `${(timeLeft / q.timer) * 100}%`,
              background: timeLeft < 10
                ? `linear-gradient(90deg, ${COLORS.primary}, #FF6B6B)`
                : `linear-gradient(90deg, ${COLORS.cta}, #66CC22)`,
              transition: 'width 1s linear',
              boxShadow: timeLeft < 10
                ? `0 0 8px rgba(181,44,50,0.5)`
                : `0 0 8px rgba(136,255,44,0.3)`
            }
          })
        ),

        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
        },
          React.createElement('span', {
            style: { fontSize: 12, color: textSecondary, fontFamily }
          }, `${timeLeft}s remaining`),
          React.createElement('span', {
            style: { fontSize: 12, color: COLORS.secondary, fontFamily, fontWeight: '600' }
          }, '+25-100 coins')
        ),

        React.createElement('div', {
          style: { fontSize: 19, fontWeight: '700', color: text, fontFamily, marginBottom: 20, textAlign: 'center', lineHeight: 1.4 }
        }, q.question),

        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          q.options.map((option) =>
            React.createElement('div', {
              key: option,
              onClick: () => handleAnswer(q.id, option),
              style: {
                flex: 1,
                padding: '16px 12px',
                borderRadius: 14,
                textAlign: 'center',
                cursor: answered[q.id] ? 'default' : 'pointer',
                background: answered[q.id] === option
                  ? `linear-gradient(135deg, ${COLORS.cta}, #66CC22)`
                  : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: answered[q.id] === option
                  ? `2px solid ${COLORS.cta}`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.2s ease',
                transform: answered[q.id] === option ? 'scale(1.03)' : 'scale(1)',
                opacity: (answered[q.id] && answered[q.id] !== option) ? 0.5 : 1
              }
            },
              React.createElement('div', {
                style: {
                  fontSize: 17, fontWeight: '700',
                  color: answered[q.id] === option ? '#000' : text,
                  fontFamily
                }
              }, option)
            )
          )
        ),

        answered[q.id] && React.createElement('div', {
          style: {
            marginTop: 16,
            textAlign: 'center',
            fontSize: 15,
            color: COLORS.cta,
            fontWeight: '700',
            fontFamily
          }
        }, '✅ Answer locked in! +25 coins')
      ),

      // Recent activity
      React.createElement('div', {
        style: { padding: '16px 20px' }
      },
        React.createElement('div', {
          style: { fontSize: 15, fontWeight: '700', color: text, fontFamily, marginBottom: 10 }
        }, '📊 Live Stats'),
        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8
          }
        },
          [
            { label: 'Players Active', value: '12.4K', icon: '👥' },
            { label: 'Predictions Made', value: '89.2K', icon: '🎯' },
            { label: 'Avg Accuracy', value: '62%', icon: '📈' },
            { label: 'Rewards Given', value: '5.1K', icon: '🎁' },
          ].map(stat =>
            React.createElement('div', {
              key: stat.label,
              style: {
                padding: 12,
                borderRadius: 12,
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
                React.createElement('span', { style: { fontSize: 14 } }, stat.icon),
                React.createElement('span', { style: { fontSize: 11, color: textSecondary, fontFamily } }, stat.label)
              ),
              React.createElement('div', {
                style: { fontSize: 18, fontWeight: '800', color: text, fontFamily }
              }, stat.value)
            )
          )
        )
      )
    );
  };

  // LEADERBOARD SCREEN
  const LeaderboardScreen = () => {
    const [tab, setTab] = useState('global');

    return React.createElement('div', {
      style: { height: '100%', overflow: 'auto', background: bg, paddingBottom: 80 }
    },
      React.createElement(Header, { title: 'Leaderboard' }),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex',
          margin: '0 20px 20px',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          borderRadius: 12,
          padding: 3
        }
      },
        ['global', 'friends', 'weekly'].map(t =>
          React.createElement('div', {
            key: t,
            onClick: () => setTab(t),
            style: {
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              textAlign: 'center',
              cursor: 'pointer',
              background: tab === t
                ? `linear-gradient(135deg, ${COLORS.primary}, #D44050)`
                : 'transparent',
              transition: 'all 0.2s ease'
            }
          },
            React.createElement('span', {
              style: {
                fontSize: 13, fontWeight: '600',
                color: tab === t ? '#FFF' : textSecondary,
                fontFamily, textTransform: 'capitalize'
              }
            }, t)
          )
        )
      ),

      // Top 3 podium
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 12,
          padding: '0 20px 24px',
        }
      },
        // 2nd place
        React.createElement('div', {
          style: { textAlign: 'center', flex: 1 }
        },
          React.createElement('div', { style: { fontSize: 32, marginBottom: 4 } }, leaderboard[1].avatar),
          React.createElement('div', {
            style: {
              background: isDark ? 'rgba(192,192,192,0.15)' : 'rgba(192,192,192,0.1)',
              borderRadius: '12px 12px 0 0',
              padding: '16px 8px 12px',
              border: '1px solid rgba(192,192,192,0.2)',
              borderBottom: 'none'
            }
          },
            React.createElement('div', {
              style: { fontSize: 20, fontWeight: '800', color: '#C0C0C0', fontFamily }
            }, '2'),
            React.createElement('div', {
              style: { fontSize: 11, color: text, fontFamily, fontWeight: '600', marginTop: 4 }
            }, leaderboard[1].name),
            React.createElement('div', {
              style: { fontSize: 11, color: textSecondary, fontFamily }
            }, leaderboard[1].points.toLocaleString())
          )
        ),
        // 1st place
        React.createElement('div', {
          style: { textAlign: 'center', flex: 1 }
        },
          React.createElement('div', { style: { fontSize: 40, marginBottom: 4, filter: 'drop-shadow(0 0 8px rgba(244,199,65,0.5))' } }, leaderboard[0].avatar),
          React.createElement(GlowBox, {
            color: COLORS.secondary,
            intensity: 0.4,
            style: {
              background: isDark
                ? 'linear-gradient(180deg, rgba(244,199,65,0.2), rgba(244,199,65,0.05))'
                : 'linear-gradient(180deg, rgba(244,199,65,0.15), rgba(244,199,65,0.03))',
              borderRadius: '12px 12px 0 0',
              padding: '20px 8px 16px',
              border: `1px solid rgba(244,199,65,0.3)`,
              borderBottom: 'none'
            }
          },
            React.createElement('div', {
              style: { fontSize: 24, fontWeight: '900', color: COLORS.secondary, fontFamily }
            }, '1'),
            React.createElement('div', {
              style: { fontSize: 12, color: text, fontFamily, fontWeight: '700', marginTop: 4 }
            }, leaderboard[0].name),
            React.createElement('div', {
              style: { fontSize: 12, color: COLORS.secondary, fontFamily, fontWeight: '600' }
            }, leaderboard[0].points.toLocaleString())
          )
        ),
        // 3rd place
        React.createElement('div', {
          style: { textAlign: 'center', flex: 1 }
        },
          React.createElement('div', { style: { fontSize: 28, marginBottom: 4 } }, leaderboard[2].avatar),
          React.createElement('div', {
            style: {
              background: isDark ? 'rgba(205,127,50,0.12)' : 'rgba(205,127,50,0.08)',
              borderRadius: '12px 12px 0 0',
              padding: '12px 8px 10px',
              border: '1px solid rgba(205,127,50,0.2)',
              borderBottom: 'none'
            }
          },
            React.createElement('div', {
              style: { fontSize: 18, fontWeight: '800', color: '#CD7F32', fontFamily }
            }, '3'),
            React.createElement('div', {
              style: { fontSize: 11, color: text, fontFamily, fontWeight: '600', marginTop: 4 }
            }, leaderboard[2].name),
            React.createElement('div', {
              style: { fontSize: 11, color: textSecondary, fontFamily }
            }, leaderboard[2].points.toLocaleString())
          )
        )
      ),

      // Full list
      ...leaderboard.slice(3).map((entry) =>
        React.createElement('div', {
          key: entry.rank,
          style: {
            margin: '0 20px 8px',
            borderRadius: 14,
            padding: '14px 16px',
            background: entry.isUser
              ? isDark
                ? 'linear-gradient(135deg, rgba(181,44,50,0.2), rgba(244,199,65,0.1))'
                : 'linear-gradient(135deg, rgba(181,44,50,0.08), rgba(244,199,65,0.05))'
              : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            border: entry.isUser
              ? `1px solid ${COLORS.primary}`
              : `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 14
          }
        },
          React.createElement('div', {
            style: {
              width: 28, textAlign: 'center',
              fontSize: 15, fontWeight: '700',
              color: entry.isUser ? COLORS.secondary : textSecondary,
              fontFamily
            }
          }, `#${entry.rank}`),
          React.createElement('div', { style: { fontSize: 24 } }, entry.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: {
                fontSize: 15, fontWeight: entry.isUser ? '800' : '600',
                color: entry.isUser ? COLORS.secondary : text,
                fontFamily
              }
            }, entry.name),
            React.createElement('div', {
              style: { fontSize: 12, color: textSecondary, fontFamily, display: 'flex', alignItems: 'center', gap: 4 }
            },
              React.createElement('span', null, `🔥 ${entry.streak}`),
              React.createElement('span', null, ' • '),
              React.createElement('span', null, `${entry.points.toLocaleString()} pts`)
            )
          ),
          entry.isUser && React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${COLORS.primary}, #D44050)`,
              borderRadius: 8,
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: '700',
              color: '#FFF',
              fontFamily
            }
          }, 'YOU')
        )
      ),

      // Create league button
      React.createElement('div', {
        style: {
          margin: '20px 20px',
          background: `linear-gradient(135deg, ${COLORS.secondary}, #E5B830)`,
          borderRadius: 14,
          padding: '14px 0',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: `0 4px 20px rgba(244,199,65,0.3)`,
        },
        onClick: () => showToast('Create a Friendship League feature coming soon!')
      },
        React.createElement('span', {
          style: { fontSize: 15, fontWeight: '800', color: '#000', fontFamily }
        }, '👥 CREATE FRIENDSHIP LEAGUE')
      )
    );
  };

  // INSIGHTS SCREEN
  const InsightsScreen = () => {
    return React.createElement('div', {
      style: { height: '100%', overflow: 'auto', background: bg, paddingBottom: 80 }
    },
      React.createElement(Header, { title: 'AI Insights', showBack: true }),

      // AI header
      React.createElement('div', {
        style: {
          margin: '0 20px 20px',
          borderRadius: 20,
          padding: 24,
          background: isDark
            ? 'linear-gradient(145deg, rgba(155,89,182,0.15), rgba(181,44,50,0.1))'
            : 'linear-gradient(145deg, rgba(155,89,182,0.08), rgba(181,44,50,0.05))',
          border: '1px solid rgba(155,89,182,0.2)',
          textAlign: 'center'
        }
      },
        React.createElement('div', {
          style: { fontSize: 48, marginBottom: 12, filter: 'drop-shadow(0 0 12px rgba(155,89,182,0.4))' }
        }, '🤖'),
        React.createElement('div', {
          style: { fontSize: 22, fontWeight: '800', color: text, fontFamily, marginBottom: 4 }
        }, 'LigaLoot AI'),
        React.createElement('div', {
          style: { fontSize: 13, color: textSecondary, fontFamily }
        }, 'Powered by advanced match analytics')
      ),

      // El Clasico Analysis
      React.createElement(GlowBox, {
        color: COLORS.secondary,
        intensity