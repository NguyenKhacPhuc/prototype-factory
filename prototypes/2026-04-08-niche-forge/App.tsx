const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [joinedForges, setJoinedForges] = useState([]);
  const [insightShards, setInsightShards] = useState(247);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const [activeForge, setActiveForge] = useState(null);
  const [showReward, setShowReward] = useState(false);

  const themes = {
    light: {
      bg: '#F0FDFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F0FDFA',
      card: '#FFFFFF',
      cardAlt: '#E6FAF7',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      primary: '#0D9488',
      secondary: '#14B8A6',
      cta: '#F97316',
      ctaHover: '#EA580C',
      border: '#E2E8F0',
      shadow: 'rgba(13, 148, 136, 0.08)',
      shadowStrong: 'rgba(13, 148, 136, 0.15)',
      navBg: 'rgba(255,255,255,0.92)',
      overlay: 'rgba(0,0,0,0.5)',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      gradient1: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
      gradient3: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #14B8A6 100%)',
    },
    dark: {
      bg: '#0C1A1A',
      surface: '#132626',
      surfaceAlt: '#0F2020',
      card: '#1A3333',
      cardAlt: '#143030',
      text: '#E2E8F0',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      primary: '#14B8A6',
      secondary: '#0D9488',
      cta: '#F97316',
      ctaHover: '#FB923C',
      border: '#254040',
      shadow: 'rgba(0,0,0,0.3)',
      shadowStrong: 'rgba(0,0,0,0.5)',
      navBg: 'rgba(19,38,38,0.95)',
      overlay: 'rgba(0,0,0,0.7)',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      gradient1: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
      gradient2: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
      gradient3: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 50%, #0F766E 100%)',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const icons = window.lucide || {};
  const {
    Home, Compass, Zap, Award, User, Search, Bell, Settings, ChevronRight,
    Users, Target, Lightbulb, TrendingUp, Star, Clock, ArrowRight, Plus,
    Check, X, Filter, Flame, Shield, Crown, Gem, Map, BookOpen,
    BarChart3, Globe, Rocket, Puzzle, Brain, Sparkles, Sun, Moon,
    MessageCircle, ThumbsUp, Share2, Bookmark, Play, Lock, Gift,
    ChevronDown, ChevronUp, Eye, Heart, RefreshCw
  } = icons;

  const createIcon = (IconComponent, size = 20, color = t.text, style = {}) => {
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 2 });
  };

  // Onboarding
  const onboardingSteps = [
    { title: 'Discover Together', desc: 'Join collaborative Forges to unearth market trends and hidden opportunities with fellow freelancers.', icon: Compass, color: t.primary },
    { title: 'Earn Insight Shards', desc: 'Contribute unique insights and complete challenges to earn rewards redeemable for exclusive blueprints.', icon: Gem, color: t.cta },
    { title: 'Forge Your Future', desc: 'Turn collective discoveries into actionable strategies that transform your freelance career.', icon: Rocket, color: t.secondary },
  ];

  const OnboardingScreen = () => {
    const step = onboardingSteps[onboardingStep];
    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', padding: 32,
        background: t.gradient3, position: 'relative', overflow: 'hidden'
      }
    },
      React.createElement('style', {}, `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(13,148,136,0.3); } 50% { box-shadow: 0 0 40px rgba(13,148,136,0.6); } }
      `),
      // Decorative shapes
      React.createElement('div', { style: {
        position: 'absolute', width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)', top: -50, right: -50,
      }}),
      React.createElement('div', { style: {
        position: 'absolute', width: 120, height: 120, borderRadius: 24,
        background: 'rgba(255,255,255,0.03)', bottom: 100, left: -30,
        transform: 'rotate(45deg)',
      }}),
      // Icon
      React.createElement('div', {
        style: {
          width: 100, height: 100, borderRadius: 30, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.15)', marginBottom: 40,
          animation: 'float 3s ease-in-out infinite',
          backdropFilter: 'blur(10px)',
        }
      }, createIcon(step.icon, 48, '#FFFFFF')),
      // Title
      React.createElement('h1', {
        style: {
          fontFamily: font, fontSize: 34, fontWeight: 800,
          color: '#FFFFFF', textAlign: 'center', marginBottom: 16,
          letterSpacing: -0.5, animation: 'fadeIn 0.6s ease-out',
        }
      }, step.title),
      // Description
      React.createElement('p', {
        style: {
          fontFamily: font, fontSize: 17, fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: 300,
          animation: 'slideUp 0.6s ease-out 0.1s both',
        }
      }, step.desc),
      // Dots
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 48 }
      }, onboardingSteps.map((_, i) =>
        React.createElement('div', {
          key: i,
          style: {
            width: i === onboardingStep ? 24 : 8, height: 8,
            borderRadius: 4, background: i === onboardingStep ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease',
          }
        })
      )),
      // Button
      React.createElement('button', {
        onClick: () => {
          if (onboardingStep < 2) setOnboardingStep(onboardingStep + 1);
          else setShowOnboarding(false);
        },
        style: {
          marginTop: 40, padding: '16px 48px', borderRadius: 16,
          border: 'none', background: '#FFFFFF', color: t.primary,
          fontFamily: font, fontSize: 17, fontWeight: 700,
          cursor: 'pointer', minHeight: 52, minWidth: 200,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s ease',
        },
        onMouseDown: (e) => e.currentTarget.style.transform = 'scale(0.96)',
        onMouseUp: (e) => e.currentTarget.style.transform = 'scale(1)',
      }, onboardingStep < 2 ? 'Continue' : 'Start Forging'),
      onboardingStep > 0 && React.createElement('button', {
        onClick: () => setShowOnboarding(false),
        style: {
          marginTop: 16, background: 'none', border: 'none',
          color: 'rgba(255,255,255,0.6)', fontFamily: font, fontSize: 15,
          cursor: 'pointer', padding: 8,
        }
      }, 'Skip')
    );
  };

  // Data
  const forges = [
    { id: 1, name: 'AI Micro-SaaS Hunters', members: 4, max: 5, trend: 'AI/ML', progress: 65, shards: 45, challenges: 8, completed: 5, hot: true, desc: 'Discovering underserved AI niches for solo developers' },
    { id: 2, name: 'Green Tech Explorers', members: 3, max: 4, trend: 'Sustainability', progress: 40, shards: 32, challenges: 6, completed: 2, hot: false, desc: 'Mapping eco-friendly service opportunities in emerging markets' },
    { id: 3, name: 'Remote Health Innovators', members: 5, max: 5, trend: 'HealthTech', progress: 88, shards: 67, challenges: 10, completed: 9, hot: true, desc: 'Telehealth and wellness niches for freelance developers' },
    { id: 4, name: 'Creator Economy Lab', members: 2, max: 4, trend: 'Creator Tools', progress: 20, shards: 15, challenges: 5, completed: 1, hot: false, desc: 'Building tools and services for the creator economy' },
    { id: 5, name: 'FinTech Frontier', members: 4, max: 5, trend: 'Finance', progress: 55, shards: 38, challenges: 7, completed: 4, hot: true, desc: 'Identifying gaps in personal finance and DeFi markets' },
  ];

  const microChallenges = [
    { id: 1, forgeId: 1, title: 'Identify 3 AI tools with <1000 users solving real problems', type: 'Research', time: '15 min', shards: 8, difficulty: 'Easy', responses: 12 },
    { id: 2, forgeId: 1, title: 'Map the pricing landscape for AI writing assistants', type: 'Analysis', time: '20 min', shards: 12, difficulty: 'Medium', responses: 7 },
    { id: 3, forgeId: 2, title: 'Find 5 sustainable packaging startups needing freelancers', type: 'Scout', time: '10 min', shards: 6, difficulty: 'Easy', responses: 9 },
    { id: 4, forgeId: 3, title: 'Compare telehealth UX patterns across 4 leading platforms', type: 'Analysis', time: '25 min', shards: 15, difficulty: 'Hard', responses: 4 },
    { id: 5, forgeId: 5, title: 'List underserved demographics in personal budgeting apps', type: 'Research', time: '15 min', shards: 10, difficulty: 'Medium', responses: 11 },
    { id: 6, forgeId: 4, title: 'Brainstorm 10 creator monetization pain points', type: 'Ideation', time: '10 min', shards: 8, difficulty: 'Easy', responses: 18 },
    { id: 7, forgeId: 1, title: 'Validate demand for AI-powered invoice generation', type: 'Validation', time: '20 min', shards: 14, difficulty: 'Medium', responses: 6 },
    { id: 8, forgeId: 3, title: 'Interview 2 therapists about their digital workflow gaps', type: 'Outreach', time: '30 min', shards: 20, difficulty: 'Hard', responses: 3 },
  ];

  const insights = [
    { id: 1, title: 'AI Translation for Niche Industries', votes: 34, category: 'Validated', author: 'Maya K.', forge: 'AI Micro-SaaS Hunters', desc: 'Legal and medical translation tools powered by fine-tuned LLMs are severely underserved. 73% of professionals surveyed use generic tools.' },
    { id: 2, title: 'Sustainable Packaging Consulting', votes: 28, category: 'Emerging', author: 'Jared T.', forge: 'Green Tech Explorers', desc: 'Small D2C brands struggle with eco-packaging compliance. Only 2 consulting firms serve this space nationally.' },
    { id: 3, title: 'Therapist Scheduling Platform Gap', votes: 41, category: 'Actionable', author: 'Priya M.', forge: 'Remote Health Innovators', desc: 'Solo therapists need HIPAA-compliant scheduling with intake forms. Current solutions are either too expensive or too basic.' },
    { id: 4, title: 'Creator Analytics Blind Spot', votes: 22, category: 'Emerging', author: 'Leo C.', forge: 'Creator Economy Lab', desc: 'Mid-tier creators (10K-100K followers) lack affordable cross-platform analytics. Most tools target enterprise or beginners.' },
  ];

  const leaderboard = [
    { name: 'Maya K.', shards: 892, avatar: '🔥', rank: 1, streak: 14 },
    { name: 'Jared T.', shards: 756, avatar: '⚡', rank: 2, streak: 11 },
    { name: 'Priya M.', shards: 701, avatar: '🎯', rank: 3, streak: 9 },
    { name: 'Leo C.', shards: 645, avatar: '💡', rank: 4, streak: 7 },
    { name: 'You', shards: insightShards, avatar: '🚀', rank: 5, streak: 5 },
  ];

  const difficultyColor = (d) => d === 'Easy' ? t.success : d === 'Medium' ? t.warning : t.danger;
  const categoryColor = (c) => c === 'Validated' ? t.success : c === 'Emerging' ? t.cta : t.primary;

  // Reward modal
  const RewardModal = () => React.createElement('div', {
    style: {
      position: 'absolute', inset: 0, background: t.overlay, display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 100,
      animation: 'fadeIn 0.3s ease-out',
    },
    onClick: () => setShowReward(false),
  },
    React.createElement('div', {
      onClick: (e) => e.stopPropagation(),
      style: {
        background: t.surface, borderRadius: 24, padding: 32, width: 280,
        textAlign: 'center', animation: 'slideUp 0.4s ease-out',
        boxShadow: `0 24px 48px ${t.shadowStrong}`,
      }
    },
      React.createElement('div', {
        style: {
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
          background: t.gradient2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 2s ease-in-out infinite',
        }
      }, createIcon(Gem, 36, '#FFFFFF')),
      React.createElement('h3', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 8 }
      }, '+8 Insight Shards!'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginBottom: 24 }
      }, 'Great contribution! Your insight has been added to the Forge.'),
      React.createElement('button', {
        onClick: () => setShowReward(false),
        style: {
          padding: '14px 32px', borderRadius: 14, border: 'none',
          background: t.gradient2, color: '#FFFFFF', fontFamily: font,
          fontSize: 17, fontWeight: 600, cursor: 'pointer', width: '100%',
        }
      }, 'Awesome!')
    )
  );

  // HOME SCREEN
  const HomeScreen = () => {
    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', {},
          React.createElement('h1', {
            style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 4 }
          }, 'Niche Forge'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary }
          }, 'Forge opportunities, together.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
              background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          }, createIcon(isDark ? Sun : Moon, 20, t.textSecondary)),
          React.createElement('button', {
            onClick: () => setActiveScreen('profile'),
            style: {
              width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
              background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          }, createIcon(Bell, 20, t.textSecondary))
        )
      ),

      // Shard counter
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 20, padding: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(13,148,136,0.3)',
        }
      },
        React.createElement('div', {},
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }
          }, 'Insight Shards'),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8 }
          },
            createIcon(Gem, 28, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5 }
            }, insightShards)
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }
        },
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 20,
            }
          },
            createIcon(Flame, 14, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: '#FFFFFF', fontWeight: 600 }
            }, '5-day streak')
          ),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' }
          }, 'Rank #5 this week')
        )
      ),

      // Active Forges
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
      },
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text }
        }, 'Active Forges'),
        React.createElement('button', {
          onClick: () => setActiveScreen('explore'),
          style: {
            background: 'none', border: 'none', color: t.primary, fontFamily: font,
            fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 4px',
          }
        }, 'See All', createIcon(ChevronRight, 16, t.primary))
      ),

      // Forge cards (horizontal scroll)
      React.createElement('div', {
        style: {
          display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 28, paddingBottom: 8,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }
      },
        forges.filter(f => f.hot).map(forge =>
          React.createElement('div', {
            key: forge.id,
            onClick: () => { setActiveForge(forge); setActiveScreen('forge-detail'); },
            style: {
              minWidth: 260, background: t.card, borderRadius: 20, padding: 20,
              cursor: 'pointer', border: `1px solid ${t.border}`,
              boxShadow: `0 4px 16px ${t.shadow}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              flexShrink: 0,
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.97)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }
            },
              React.createElement('div', {
                style: {
                  padding: '6px 10px', borderRadius: 8, background: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }
              },
                createIcon(Flame, 12, t.cta),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: t.cta, textTransform: 'uppercase', letterSpacing: 0.5 }
                }, 'Hot')
              ),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4 }
              },
                createIcon(Users, 14, t.textSecondary),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
                }, `${forge.members}/${forge.max}`)
              )
            ),
            React.createElement('h3', {
              style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 }
            }, forge.name),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 13, color: t.textMuted, marginBottom: 12 }
            }, forge.trend),
            // Progress bar
            React.createElement('div', {
              style: { background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(13,148,136,0.1)', borderRadius: 6, height: 6, overflow: 'hidden' }
            },
              React.createElement('div', {
                style: {
                  width: `${forge.progress}%`, height: '100%', borderRadius: 6,
                  background: t.gradient1, transition: 'width 0.5s ease',
                }
              })
            ),
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 }
            },
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
              }, `${forge.completed}/${forge.challenges} challenges`),
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 4 }
              },
                createIcon(Gem, 12, t.cta),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 600 }
                }, forge.shards)
              )
            )
          )
        )
      ),

      // Quick Challenges
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }
      },
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text }
        }, 'Quick Challenges'),
        React.createElement('button', {
          onClick: () => setActiveScreen('feed'),
          style: {
            background: 'none', border: 'none', color: t.primary, fontFamily: font,
            fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 4px',
          }
        }, 'Feed', createIcon(ChevronRight, 16, t.primary))
      ),

      microChallenges.slice(0, 3).map((ch, idx) =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => {
            setInsightShards(s => s + ch.shards);
            setShowReward(true);
          },
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            boxShadow: `0 2px 8px ${t.shadow}`,
            transition: 'transform 0.15s ease',
            animation: `slideUp 0.4s ease-out ${idx * 0.1}s both`,
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }
          },
            React.createElement('span', {
              style: {
                padding: '4px 10px', borderRadius: 6, fontFamily: font, fontSize: 11,
                fontWeight: 700, color: difficultyColor(ch.difficulty),
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                textTransform: 'uppercase', letterSpacing: 0.5,
              }
            }, ch.difficulty),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 6 }
            },
              createIcon(Clock, 12, t.textMuted),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, ch.time)
            )
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 10, lineHeight: 1.4 }
          }, ch.title),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('span', {
              style: {
                padding: '4px 10px', borderRadius: 6, fontFamily: font, fontSize: 11,
                fontWeight: 600, color: t.primary,
                background: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(13,148,136,0.08)',
              }
            }, ch.type),
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8 }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(MessageCircle, 12, t.textMuted),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.textMuted }
                }, ch.responses)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                createIcon(Gem, 14, t.cta),
                React.createElement('span', {
                  style: { fontFamily: font, fontSize: 13, color: t.cta, fontWeight: 700 }
                }, `+${ch.shards}`)
              )
            )
          )
        )
      )
    );
  };

  // EXPLORE SCREEN
  const ExploreScreen = () => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [filterType, setFilterType] = useState('All');
    const filters = ['All', 'Hot', 'New', 'AI/ML', 'HealthTech', 'Finance'];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 20 }
      }, 'Explore Forges'),

      // Search bar
      React.createElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
          background: t.card, borderRadius: 14, marginBottom: 16,
          border: `2px solid ${searchFocused ? t.primary : t.border}`,
          transition: 'border-color 0.2s ease',
        }
      },
        createIcon(Search, 20, t.textMuted),
        React.createElement('input', {
          placeholder: 'Search forges, trends, skills...',
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false),
          style: {
            flex: 1, border: 'none', background: 'none', fontFamily: font,
            fontSize: 17, color: t.text, outline: 'none',
          }
        })
      ),

      // Filter chips
      React.createElement('div', {
        style: { display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 4, scrollbarWidth: 'none' }
      },
        filters.map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilterType(f),
            style: {
              padding: '8px 16px', borderRadius: 20, border: 'none', whiteSpace: 'nowrap',
              background: filterType === f ? t.primary : t.card,
              color: filterType === f ? '#FFFFFF' : t.textSecondary,
              fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease', minHeight: 36,
            }
          }, f)
        )
      ),

      // Team Matchmaking Banner
      React.createElement('div', {
        style: {
          background: t.gradient2, borderRadius: 20, padding: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
        },
        onClick: () => {},
        onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
        onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
      },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: 16, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.2)',
          }
        }, createIcon(Sparkles, 28, '#FFFFFF')),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }
          }, 'Smart Matchmaking'),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.8)' }
          }, 'Get matched with complementary freelancers')
        ),
        createIcon(ArrowRight, 20, '#FFFFFF')
      ),

      // Forge list
      forges.map((forge, idx) =>
        React.createElement('div', {
          key: forge.id,
          onClick: () => { setActiveForge(forge); setActiveScreen('forge-detail'); },
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            boxShadow: `0 4px 16px ${t.shadow}`,
            transition: 'transform 0.15s ease',
            animation: `slideUp 0.4s ease-out ${idx * 0.08}s both`,
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
          },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                React.createElement('h3', {
                  style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text }
                }, forge.name),
                forge.hot && React.createElement('span', {
                  style: {
                    padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                    color: t.cta, background: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)',
                  }
                }, 'HOT')
              ),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary, lineHeight: 1.4 }
              }, forge.desc)
            ),
            React.createElement('div', {
              style: {
                width: 48, height: 48, borderRadius: 14, background: t.gradient1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12,
              }
            }, createIcon(Target, 24, '#FFFFFF'))
          ),
          // Stats row
          React.createElement('div', {
            style: { display: 'flex', gap: 16, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Users, 14, t.textMuted),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
              }, `${forge.members}/${forge.max}`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Zap, 14, t.primary),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
              }, `${forge.progress}%`)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Gem, 14, t.cta),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textSecondary }
              }, `${forge.shards} shards`)
            ),
            React.createElement('div', { style: { flex: 1 } }),
            forge.members < forge.max && React.createElement('span', {
              style: {
                padding: '4px 12px', borderRadius: 8, background: t.primary,
                color: '#FFFFFF', fontFamily: font, fontSize: 11, fontWeight: 700,
              }
            }, 'JOIN')
          )
        )
      )
    );
  };

  // FEED SCREEN (Micro-Challenge Feed)
  const FeedScreen = () => {
    const [liked, setLiked] = useState({});
    const [saved, setSaved] = useState({});

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
      },
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
        }, 'Challenge Feed'),
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
            background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, createIcon(Filter, 20, t.textSecondary))
      ),

      // Featured challenge
      React.createElement('div', {
        style: {
          background: t.gradient3, borderRadius: 24, padding: 24, marginBottom: 20,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', top: -40, right: -30,
          }
        }),
        React.createElement('div', {
          style: {
            padding: '4px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.2)',
            display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12,
          }
        },
          createIcon(Star, 12, '#FFFFFF'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.5 }
          }, 'Featured Challenge')
        ),
        React.createElement('h3', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }
        }, 'Map the AI Agent Landscape'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 16, lineHeight: 1.5 }
        }, 'Identify 10 emerging AI agent startups and classify their target markets, pricing models, and unique value props.'),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 16 }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            createIcon(Gem, 16, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#FFFFFF' }
            }, '+25 Shards')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            createIcon(Clock, 14, 'rgba(255,255,255,0.7)'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' }
            }, '30 min')
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            createIcon(Users, 14, 'rgba(255,255,255,0.7)'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' }
            }, '23 responses')
          )
        )
      ),

      // Challenge cards
      microChallenges.map((ch, idx) =>
        React.createElement('div', {
          key: ch.id,
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 12,
            border: `1px solid ${t.border}`, boxShadow: `0 2px 8px ${t.shadow}`,
            animation: `slideUp 0.4s ease-out ${idx * 0.06}s both`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 }
          },
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  fontFamily: font, color: difficultyColor(ch.difficulty),
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  textTransform: 'uppercase',
                }
              }, ch.difficulty),
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                  fontFamily: font, color: t.primary,
                  background: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(13,148,136,0.08)',
                }
              }, ch.type)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Clock, 12, t.textMuted),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, ch.time)
            )
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 12, lineHeight: 1.4 }
          }, ch.title),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Gem, 14, t.cta),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.cta }
              }, `+${ch.shards}`)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); setLiked(l => ({ ...l, [ch.id]: !l[ch.id] })); },
                style: {
                  width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
                  background: liked[ch.id] ? (isDark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.08)') : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }
              }, createIcon(Heart, 18, liked[ch.id] ? t.danger : t.textMuted)),
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); setSaved(s => ({ ...s, [ch.id]: !s[ch.id] })); },
                style: {
                  width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
                  background: saved[ch.id] ? (isDark ? 'rgba(20,184,166,0.15)' : 'rgba(13,148,136,0.08)') : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }
              }, createIcon(Bookmark, 18, saved[ch.id] ? t.primary : t.textMuted)),
              React.createElement('button', {
                onClick: (e) => {
                  e.stopPropagation();
                  setInsightShards(s => s + ch.shards);
                  setShowReward(true);
                },
                style: {
                  padding: '0 16px', height: 44, borderRadius: 12, border: 'none',
                  background: t.primary, color: '#FFFFFF', fontFamily: font,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  transition: 'all 0.2s ease',
                }
              }, createIcon(Play, 14, '#FFFFFF'), 'Start')
            )
          )
        )
      )
    );
  };

  // FOUNDRY SCREEN (Opportunity Foundry)
  const FoundryScreen = () => {
    const [activeTab, setActiveTab] = useState('all');
    const tabs = [
      { id: 'all', label: 'All Insights' },
      { id: 'validated', label: 'Validated' },
      { id: 'emerging', label: 'Emerging' },
      { id: 'actionable', label: 'Actionable' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, marginBottom: 8 }
      }, 'Opportunity Foundry'),
      React.createElement('p', {
        style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginBottom: 20 }
      }, 'Curated insights from completed Forges'),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 4, background: t.card, borderRadius: 14, padding: 4,
          marginBottom: 24, border: `1px solid ${t.border}`,
        }
      },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none',
              background: activeTab === tab.id ? t.primary : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : t.textSecondary,
              fontFamily: font, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease', whiteSpace: 'nowrap',
            }
          }, tab.label)
        )
      ),

      // Stats summary
      React.createElement('div', {
        style: { display: 'flex', gap: 12, marginBottom: 24 }
      },
        [
          { label: 'Total Insights', value: '127', icon: Lightbulb, color: t.primary },
          { label: 'This Week', value: '+12', icon: TrendingUp, color: t.success },
          { label: 'Top Rated', value: '41', icon: Star, color: t.cta },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.card, borderRadius: 16, padding: 16, textAlign: 'center',
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 8 }
            }, createIcon(stat.icon, 20, stat.color)),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 2 }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted, fontWeight: 600 }
            }, stat.label)
          )
        )
      ),

      // Insight cards
      insights.filter(i => activeTab === 'all' || i.category.toLowerCase() === activeTab).map((insight, idx) =>
        React.createElement('div', {
          key: insight.id,
          style: {
            background: t.card, borderRadius: 20, padding: 20, marginBottom: 12,
            border: `1px solid ${t.border}`, boxShadow: `0 4px 16px ${t.shadow}`,
            animation: `slideUp 0.4s ease-out ${idx * 0.08}s both`,
          }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
          },
            React.createElement('span', {
              style: {
                padding: '4px 10px', borderRadius: 8, fontFamily: font, fontSize: 11,
                fontWeight: 700, color: categoryColor(insight.category),
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                textTransform: 'uppercase', letterSpacing: 0.5,
              }
            }, insight.category),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(ThumbsUp, 14, t.primary),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.primary }
              }, insight.votes)
            )
          ),
          React.createElement('h3', {
            style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 8 }
          }, insight.title),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, color: t.textSecondary, lineHeight: 1.5, marginBottom: 12 }
          }, insight.desc),
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${t.border}` }
          },
            React.createElement('div', {},
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text }
              }, insight.author),
              React.createElement('p', {
                style: { fontFamily: font, fontSize: 11, color: t.textMuted }
              }, insight.forge)
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                style: {
                  width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
                  background: 'transparent', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                }
              }, createIcon(Share2, 16, t.textMuted)),
              React.createElement('button', {
                style: {
                  width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
                  background: 'transparent', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                }
              }, createIcon(Bookmark, 16, t.textMuted))
            )
          )
        )
      ),

      // Leaderboard section
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, marginTop: 12, marginBottom: 16 }
      }, 'Top Contributors'),

      leaderboard.map((user, idx) =>
        React.createElement('div', {
          key: idx,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: 14,
            background: user.name === 'You' ? (isDark ? 'rgba(20,184,166,0.1)' : 'rgba(13,148,136,0.06)') : t.card,
            borderRadius: 14, marginBottom: 8,
            border: `1px solid ${user.name === 'You' ? t.primary : t.border}`,
            animation: `slideUp 0.4s ease-out ${idx * 0.06}s both`,
          }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: 10, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: 800,
              fontSize: 15, fontFamily: font,
              background: idx === 0 ? t.gradient2 : idx === 1 ? t.gradient1 : idx === 2 ? 'linear-gradient(135deg, #A855F7, #7C3AED)' : t.surfaceAlt,
              color: idx < 3 ? '#FFFFFF' : t.textSecondary,
            }
          }, user.rank),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
            }, user.name),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Flame, 12, t.cta),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, color: t.textMuted }
              }, `${user.streak}-day streak`)
            )
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            createIcon(Gem, 16, t.cta),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text }
            }, user.shards)
          )
        )
      )
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => {
    const skills = ['UX Research', 'Market Analysis', 'Copywriting', 'Data Science', 'Growth Hacking'];
    const stats = [
      { label: 'Forges Completed', value: '12', icon: Target },
      { label: 'Challenges Done', value: '47', icon: Zap },
      { label: 'Insights Shared', value: '23', icon: Lightbulb },
      { label: 'Team Rating', value: '4.8', icon: Star },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5 }
        }, 'Profile'),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 44, height: 44, borderRadius: 12, border: `1px solid ${t.border}`,
            background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }
        }, createIcon(Settings, 20, t.textSecondary))
      ),

      // Profile card
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 24, padding: 24, marginBottom: 24,
          border: `1px solid ${t.border}`, textAlign: 'center',
          boxShadow: `0 8px 32px ${t.shadow}`,
        }
      },
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: 24, margin: '0 auto 16px',
            background: t.gradient1, display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: `0 4px 16px rgba(13,148,136,0.3)`,
          }
        }, createIcon(User, 36, '#FFFFFF')),
        React.createElement('h2', {
          style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 4 }
        }, 'Alex Morgan'),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginBottom: 12 }
        }, 'Freelance UX Researcher & Strategist'),
        React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)',
            padding: '8px 16px', borderRadius: 20,
          }
        },
          createIcon(Crown, 16, t.cta),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.cta }
          }, 'Forge Master  ·  Level 8')
        )
      ),

      // Shard balance
      React.createElement('div', {
        style: {
          background: t.gradient1, borderRadius: 20, padding: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }
      },
        React.createElement('div', {},
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 4 }
          }, 'SHARD BALANCE'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            createIcon(Gem, 24, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FFFFFF' }
            }, insightShards)
          )
        ),
        React.createElement('button', {
          style: {
            padding: '12px 20px', borderRadius: 12, border: 'none',
            background: 'rgba(255,255,255,0.2)', color: '#FFFFFF',
            fontFamily: font, fontSize: 15, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }
        },
          createIcon(Gift, 16, '#FFFFFF'),
          'Redeem'
        )
      ),

      // Stats grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }
      },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.card, borderRadius: 16, padding: 16, textAlign: 'center',
              border: `1px solid ${t.border}`,
              animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 8 }
            }, createIcon(stat.icon, 22, t.primary)),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 2 }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: font, fontSize: 11, color: t.textMuted, fontWeight: 600 }
            }, stat.label)
          )
        )
      ),

      // Skills
      React.createElement('h3', {
        style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 12 }
      }, 'Skills & Interests'),
      React.createElement('div', {
        style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }
      },
        skills.map((skill, i) =>
          React.createElement('span', {
            key: i,
            style: {
              padding: '8px 16px', borderRadius: 20, fontFamily: font,
              fontSize: 13, fontWeight: 600, color: t.primary,
              background: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(13,148,136,0.08)',
              border: `1px solid ${isDark ? 'rgba(20,184,166,0.3)' : 'rgba(13,148,136,0.2)'}`,
            }
          }, skill)
        )
      ),

      // Theme toggle
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
          border: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          createIcon(isDark ? Moon : Sun, 20, t.textSecondary),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text }
          }, isDark ? 'Dark Mode' : 'Light Mode')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: {
            width: 52, height: 30, borderRadius: 15, border: 'none',
            background: isDark ? t.primary : t.border, cursor: 'pointer',
            position: 'relative', transition: 'background 0.3s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 24, height: 24, borderRadius: '50%', background: '#FFFFFF',
              position: 'absolute', top: 3, left: isDark ? 25 : 3,
              transition: 'left 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }
          })
        )
      )
    );
  };

  // FORGE DETAIL SCREEN
  const ForgeDetailScreen = () => {
    const forge = activeForge || forges[0];
    const forgeChallenges = microChallenges.filter(c => c.forgeId === forge.id);

    return React.createElement('div', {
      style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' }
    },
      // Back button
      React.createElement('button', {
        onClick: () => setActiveScreen('explore'),
        style: {
          display: 'flex', alignItems: 'center', gap: 4, background: 'none',
          border: 'none', color: t.primary, fontFamily: font, fontSize: 15,
          fontWeight: 600, cursor: 'pointer', marginBottom: 16, padding: '8px 0',
        }
      }, createIcon(ChevronRight, 16, t.primary, { transform: 'rotate(180deg)' }), 'Back'),

      // Forge header
      React.createElement('div', {
        style: {
          background: t.gradient3, borderRadius: 24, padding: 24, marginBottom: 24,
          position: 'relative', overflow: 'hidden',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', top: -60, right: -40,
          }
        }),
        forge.hot && React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 12px', borderRadius: 8, background: 'rgba(249,115,22,0.3)',
            marginBottom: 12,
          }
        },
          createIcon(Flame, 14, '#FFFFFF'),
          React.createElement('span', {
            style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase' }
          }, 'Trending')
        ),
        React.createElement('h1', {
          style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5, marginBottom: 8 }
        }, forge.name),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 20 }
        }, forge.desc),

        // Progress
        React.createElement('div', {
          style: { marginBottom: 16 }
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }
          },
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.7)' }
            }, 'Progress'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 13, color: '#FFFFFF', fontWeight: 700 }
            }, `${forge.progress}%`)
          ),
          React.createElement('div', {
            style: { background: 'rgba(255,255,255,0.15)', borderRadius: 6, height: 8, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: { width: `${forge.progress}%`, height: '100%', borderRadius: 6, background: '#FFFFFF', transition: 'width 0.5s ease' }
            })
          )
        ),

        // Stats
        React.createElement('div', { style: { display: 'flex', gap: 20 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            createIcon(Users, 16, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#FFFFFF' }
            }, `${forge.members}/${forge.max} members`)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            createIcon(Gem, 16, '#FFFFFF'),
            React.createElement('span', {
              style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: '#FFFFFF' }
            }, `${forge.shards} shards`)
          )
        )
      ),

      // Join button
      forge.members < forge.max && React.createElement('button', {
        onClick: () => {
          setJoinedForges(j => [...j, forge.id]);
        },
        style: {
          width: '100%', padding: '16px', borderRadius: 16, border: 'none',
          background: joinedForges.includes(forge.id) ? t.surface : t.gradient2,
          color: joinedForges.includes(forge.id) ? t.success : '#FFFFFF',
          fontFamily: font, fontSize: 17, fontWeight: 700, cursor: 'pointer',
          marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: joinedForges.includes(forge.id) ? 'none' : '0 8px 24px rgba(249,115,22,0.3)',
          border: joinedForges.includes(forge.id) ? `2px solid ${t.success}` : 'none',
          transition: 'all 0.3s ease', minHeight: 52,
        }
      },
        joinedForges.includes(forge.id) ? createIcon(Check, 20, t.success) : createIcon(Plus, 20, '#FFFFFF'),
        joinedForges.includes(forge.id) ? 'Joined' : 'Join This Forge'
      ),

      // Challenges
      React.createElement('h2', {
        style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 16 }
      }, 'Challenges'),

      forgeChallenges.length > 0 ? forgeChallenges.map((ch, idx) =>
        React.createElement('div', {
          key: ch.id,
          onClick: () => {
            setInsightShards(s => s + ch.shards);
            setShowReward(true);
          },
          style: {
            background: t.card, borderRadius: 16, padding: 16, marginBottom: 12,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'transform 0.15s ease',
            animation: `slideUp 0.4s ease-out ${idx * 0.1}s both`,
          },
          onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.98)'; },
          onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
        },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }
          },
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  fontFamily: font, color: difficultyColor(ch.difficulty),
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  textTransform: 'uppercase',
                }
              }, ch.difficulty),
              React.createElement('span', {
                style: {
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                  fontFamily: font, color: t.primary,
                  background: isDark ? 'rgba(20,184,166,0.15)' : 'rgba(13,148,136,0.08)',
                }
              }, ch.type)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Gem, 14, t.cta),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.cta }
              }, `+${ch.shards}`)
            )
          ),
          React.createElement('p', {
            style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: 8 }
          }, ch.title),
          React.createElement('div', {
            style: { display: 'flex', gap: 12 }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(Clock, 12, t.textMuted),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, ch.time)
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              createIcon(MessageCircle, 12, t.textMuted),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textMuted } }, `${ch.responses} responses`)
            )
          )
        )
      ) : React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: 32, textAlign: 'center',
          border: `1px solid ${t.border}`,
        }
      },
        createIcon(BookOpen, 32, t.textMuted),
        React.createElement('p', {
          style: { fontFamily: font, fontSize: 15, color: t.textSecondary, marginTop: 12 }
        }, 'No challenges yet. Join the forge to get started!')
      )
    );
  };

  // Screen map
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    feed: FeedScreen,
    foundry: FoundryScreen,
    profile: ProfileScreen,
    'forge-detail': ForgeDetailScreen,
  };

  // Tab bar items
  const tabItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'feed', label: 'Feed', icon: Zap },
    { id: 'foundry', label: 'Foundry', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (showOnboarding) {
    return React.createElement('div', {
      style: {
        minHeight: '100vh', background: '#f0f0f0', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontFamily: font,
      }
    },
      React.createElement('div', {
        style: {
          width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)', position: 'relative',
          background: t.bg,
        }
      }, React.createElement(OnboardingScreen))
    );
  }

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: font,
    }
  },
    React.createElement('style', {}, `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(13,148,136,0.3); } 50% { box-shadow: 0 0 40px rgba(13,148,136,0.6); } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)', position: 'relative',
        background: t.bg, display: 'flex', flexDirection: 'column',
      }
    },
      // Content area
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' }
      }, React.createElement(screens[activeScreen] || HomeScreen)),

      // Reward modal
      showReward && React.createElement(RewardModal),

      // Bottom tab bar
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg, backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`, padding: '8px 8px 24px',
          display: 'flex', justifyContent: 'space-around',
        }
      },
        tabItems.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px 12px', minWidth: 52, minHeight: 44,
              transition: 'transform 0.15s ease',
            },
            onMouseDown: (e) => { e.currentTarget.style.transform = 'scale(0.9)'; },
            onMouseUp: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; },
          },
            createIcon(tab.icon, 24, activeScreen === tab.id ? t.primary : t.textMuted),
            React.createElement('span', {
              style: {
                fontFamily: font, fontSize: 10, fontWeight: 600,
                color: activeScreen === tab.id ? t.primary : t.textMuted,
                transition: 'color 0.2s ease',
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
