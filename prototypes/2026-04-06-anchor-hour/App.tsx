const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activePod, setActivePod] = useState(null);
  const [inSession, setInSession] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(900);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [streakCount] = useState(12);
  const [selectedPodIndex, setSelectedPodIndex] = useState(0);
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [participantCount, setParticipantCount] = useState(47);
  const [collectiveEnergy, setCollectiveEnergy] = useState(72);
  const [showSessionComplete, setShowSessionComplete] = useState(false);

  const themes = {
    light: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      cta: '#22C55E',
      bg: '#FAF5FF',
      card: '#FFFFFF',
      cardBorder: 'rgba(124, 58, 237, 0.08)',
      text: '#1A0A2E',
      textSecondary: '#6B5B7B',
      textTertiary: '#9B8DAD',
      surface: '#F3E8FF',
      surfaceAlt: '#EDE9FE',
      overlay: 'rgba(26, 10, 46, 0.5)',
      tabBg: '#FFFFFF',
      tabBorder: 'rgba(124, 58, 237, 0.1)',
      streakBg: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
      sessionBg: 'linear-gradient(180deg, #1A0A2E 0%, #2D1B4E 50%, #3B1F6E 100%)',
    },
    dark: {
      primary: '#A78BFA',
      secondary: '#7C3AED',
      cta: '#22C55E',
      bg: '#0F0720',
      card: '#1A0A2E',
      cardBorder: 'rgba(167, 139, 250, 0.15)',
      text: '#F3E8FF',
      textSecondary: '#C4B5D4',
      textTertiary: '#8B7A9E',
      surface: '#1E1035',
      surfaceAlt: '#2D1B4E',
      overlay: 'rgba(0, 0, 0, 0.7)',
      tabBg: '#1A0A2E',
      tabBorder: 'rgba(167, 139, 250, 0.15)',
      streakBg: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
      sessionBg: 'linear-gradient(180deg, #0A0318 0%, #0F0720 50%, #1A0A2E 100%)',
    }
  };

  const t = darkMode ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const pods = [
    { id: 'parent', name: "Parent's Pause", icon: 'Heart', members: 2340, momentum: 89, ritual: 'Guided Meditation', time: '9:00 PM', color: '#EC4899', desc: 'A calm space for parents to reset.' },
    { id: 'creator', name: "Creator's Calm", icon: 'Palette', members: 1856, momentum: 76, ritual: 'Silent Co-Journaling', time: '8:00 AM', color: '#F59E0B', desc: 'Start your creative day with intention.' },
    { id: 'student', name: 'Student Stillness', icon: 'BookOpen', members: 3120, momentum: 92, ritual: 'Gentle Stretching', time: '3:00 PM', color: '#3B82F6', desc: 'A study break for mind and body.' },
    { id: 'freelancer', name: 'Freelancer Focus', icon: 'Laptop', members: 1543, momentum: 68, ritual: 'Breathwork', time: '7:00 AM', color: '#10B981', desc: 'Build structure in the unstructured.' },
    { id: 'healer', name: "Healer's Hour", icon: 'Stethoscope', members: 987, momentum: 81, ritual: 'Body Scan', time: '6:30 PM', color: '#EF4444', desc: 'Care for the caregivers.' },
  ];

  const wisdomItems = [
    { title: 'The 2-Minute Rule', body: 'If a self-care task takes less than two minutes, do it now. Small acts compound into lasting change.', source: 'Atomic Habits', tag: 'Habit Design' },
    { title: 'Presence Over Perfection', body: 'Showing up imperfectly every day beats a perfect session once a week. Consistency is the real ritual.', source: 'Mindful Living', tag: 'Mindset' },
    { title: 'The Co-Regulation Effect', body: 'Being in shared presence — even silently — activates your vagus nerve and reduces cortisol by up to 23%.', source: 'Neuroscience Today', tag: 'Science' },
    { title: 'Micro-Transitions Matter', body: 'A 60-second breathing pause between tasks reduces cognitive residue and improves focus on the next activity.', source: 'Deep Work', tag: 'Focus' },
  ];

  const reflectionPrompts = [
    'What was one small win today?',
    'What are you grateful for right now?',
    'What would you like to release before tomorrow?',
    'How did showing up today serve your future self?',
  ];

  // Simulate live participants
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(p => p + Math.floor(Math.random() * 3) - 1);
      setCollectiveEnergy(e => Math.min(100, Math.max(50, e + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Session timer
  useEffect(() => {
    if (!inSession || sessionTimer <= 0) return;
    const interval = setInterval(() => {
      setSessionTimer(t => {
        if (t <= 1) {
          setInSession(false);
          setShowSessionComplete(true);
          return 900;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [inSession, sessionTimer]);

  // Breath animation
  useEffect(() => {
    if (!inSession) return;
    const cycle = setInterval(() => {
      setBreathPhase(p => p === 'inhale' ? 'hold' : p === 'hold' ? 'exhale' : 'inhale');
    }, 4000);
    return () => clearInterval(cycle);
  }, [inSession]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const Icon = ({ name, size = 24, color, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  // ========== SCREENS ==========

  const HomeScreen = () => {
    const currentPod = pods[selectedPodIndex];
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, lineHeight: 1.1 } }, 'Good Evening'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '4px 0 0', fontWeight: 400 } }, 'Your daily anchor awaits')
        ),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }
        }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),

      // Streak Card
      React.createElement('div', { style: {
        background: t.streakBg, borderRadius: 20, padding: '24px 20px', marginBottom: 16, position: 'relative', overflow: 'hidden'
      } },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' } }),
        React.createElement('div', { style: { position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' } },
          React.createElement(Icon, { name: 'Flame', size: 22, color: '#FCD34D' }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)' } }, 'Ritual Streak')
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 48, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1 } }, streakCount),
          React.createElement('span', { style: { fontFamily: font, fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.7)' } }, 'days'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 4, marginTop: 12, position: 'relative' } },
          ...[...Array(7)].map((_, i) => React.createElement('div', { key: i, style: {
            width: 36, height: 6, borderRadius: 3, background: i < 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s'
          } }))
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8, marginBottom: 0 } }, '5 of 7 this week — keep going!')
      ),

      // Next Session Card
      React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: '20px', marginBottom: 16, border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 2px 12px rgba(124,58,237,0.06)', cursor: 'pointer', transition: 'all 0.2s'
      }, onClick: () => { setActivePod(currentPod); setActiveScreen('session'); } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', { style: { width: 44, height: 44, borderRadius: 14, background: `${currentPod.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { name: currentPod.icon, size: 22, color: currentPod.color })
            ),
            React.createElement('div', null,
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Next Session'),
              React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '2px 0 0' } }, currentPod.name)
            )
          ),
          React.createElement('div', { style: { background: `${t.cta}15`, padding: '6px 12px', borderRadius: 20 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta } }, currentPod.time)
          )
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'Users', size: 14, color: t.textTertiary }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, `${participantCount} online`)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement(Icon, { name: 'Timer', size: 14, color: t.textTertiary }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, '15 min · ' + currentPod.ritual)
          )
        ),
        React.createElement('button', { style: {
          width: '100%', marginTop: 16, padding: '14px', background: t.cta, border: 'none', borderRadius: 14,
          fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer', transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }, onClick: (e) => { e.stopPropagation(); setActivePod(currentPod); setInSession(true); setSessionTimer(900); setActiveScreen('session'); } },
          React.createElement(Icon, { name: 'Play', size: 18, color: '#FFFFFF' }),
          React.createElement('span', null, 'Join Live Session')
        )
      ),

      // Pod Momentum
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, margin: '0 0 12px' } }, 'Pod Momentum'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          ...pods.slice(0, 4).map((pod, i) => React.createElement('div', { key: i, style: {
            minWidth: 140, background: t.card, borderRadius: 16, padding: '16px 14px', border: `1px solid ${t.cardBorder}`,
            boxShadow: '0 1px 6px rgba(124,58,237,0.04)', cursor: 'pointer', transition: 'all 0.2s'
          }, onClick: () => { setSelectedPodIndex(i); setActiveScreen('pods'); } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${pod.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
              React.createElement(Icon, { name: pod.icon, size: 18, color: pod.color })
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text, margin: '0 0 8px', lineHeight: 1.3 } }, pod.name),
            React.createElement('div', { style: { height: 4, borderRadius: 2, background: t.surface, overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${pod.momentum}%`, height: '100%', borderRadius: 2, background: pod.color, transition: 'width 1s ease' } })
            ),
            React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textTertiary, margin: '6px 0 0' } }, `${pod.momentum}% momentum`)
          ))
        )
      ),

      // Wisdom Well Preview
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: -0.3, margin: 0 } }, 'Wisdom Well'),
          React.createElement('button', { onClick: () => setActiveScreen('wisdom'), style: { background: 'none', border: 'none', fontFamily: font, fontSize: 15, fontWeight: 600, color: t.primary, cursor: 'pointer', padding: '4px 0' } },
            React.createElement('span', null, 'See All')
          )
        ),
        React.createElement('div', { style: {
          background: t.card, borderRadius: 20, padding: '20px', border: `1px solid ${t.cardBorder}`,
          boxShadow: '0 2px 12px rgba(124,58,237,0.06)'
        } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement('div', { style: { padding: '4px 10px', borderRadius: 8, background: `${t.primary}15` } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.5 } }, wisdomItems[wisdomIndex].tag)
            )
          ),
          React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 6px' } }, wisdomItems[wisdomIndex].title),
          React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 10px', lineHeight: 1.5 } }, wisdomItems[wisdomIndex].body),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: 0, fontStyle: 'italic' } }, `— ${wisdomItems[wisdomIndex].source}`)
        )
      )
    );
  };

  const PodsScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Identity Pods'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px', lineHeight: 1.5 } }, 'Find your people. Choose a pod that resonates with your life stage and start your ritual journey.'),

      // Search bar
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: t.surface, borderRadius: 14, marginBottom: 20
      } },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textTertiary }),
        React.createElement('span', { style: { fontFamily: font, fontSize: 15, color: t.textTertiary } }, 'Search pods...')
      ),

      // Pod Cards
      ...pods.map((pod, i) => React.createElement('div', { key: i, style: {
        background: t.card, borderRadius: 20, padding: '20px', marginBottom: 12, border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 2px 12px rgba(124,58,237,0.06)', cursor: 'pointer', transition: 'all 0.2s',
        transform: selectedPodIndex === i ? 'scale(1)' : 'scale(1)'
      }, onClick: () => setSelectedPodIndex(i) },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', { style: { display: 'flex', gap: 14, flex: 1 } },
            React.createElement('div', { style: {
              width: 52, height: 52, borderRadius: 16, background: `${pod.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            } },
              React.createElement(Icon, { name: pod.icon, size: 26, color: pod.color })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, pod.name),
              React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary, margin: '0 0 10px', lineHeight: 1.4 } }, pod.desc),
              React.createElement('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: 'Users', size: 13, color: t.textTertiary }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary } }, `${pod.members.toLocaleString()} members`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(Icon, { name: 'Clock', size: 13, color: t.textTertiary }),
                  React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary } }, pod.time)
                )
              )
            )
          ),
          selectedPodIndex === i
            ? React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Icon, { name: 'Check', size: 16, color: '#FFFFFF' })
              )
            : React.createElement('div', { style: { width: 28, height: 28, borderRadius: 14, border: `2px solid ${t.cardBorder}`, flexShrink: 0 } })
        ),
        // Momentum bar
        React.createElement('div', { style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement('div', { style: { flex: 1, height: 6, borderRadius: 3, background: t.surface, overflow: 'hidden' } },
            React.createElement('div', { style: { width: `${pod.momentum}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${pod.color}, ${pod.color}AA)`, transition: 'width 1s ease' } })
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: pod.color, minWidth: 36, textAlign: 'right' } }, `${pod.momentum}%`)
        ),
        // Ritual info
        React.createElement('div', { style: { marginTop: 12, padding: '10px 14px', background: t.surface, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement(Icon, { name: 'Sparkles', size: 14, color: t.primary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textSecondary } }, `Today's ritual: ${pod.ritual}`)
        )
      ))
    );
  };

  const SessionScreen = () => {
    const pod = activePod || pods[selectedPodIndex];
    const timerProgress = inSession ? ((900 - sessionTimer) / 900) * 100 : 0;

    // Particle dots for collective presence
    const dots = [...Array(Math.min(participantCount, 30))].map((_, i) => {
      const angle = (i / 30) * Math.PI * 2 + (Date.now() / 5000);
      const radius = 100 + Math.sin(i * 0.7) * 30;
      return { x: Math.cos(angle + i * 0.2) * radius, y: Math.sin(angle + i * 0.2) * radius, size: 4 + Math.random() * 4 };
    });

    if (showSessionComplete) {
      return React.createElement('div', { style: {
        background: themes.light.sessionBg, minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '40px 24px', animation: 'fadeIn 0.6s ease', textAlign: 'center'
      } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 40, background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'pulse 2s ease infinite' } },
          React.createElement(Icon, { name: 'Check', size: 40, color: '#22C55E' })
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px', letterSpacing: -0.5 } }, 'Session Complete'),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, color: 'rgba(255,255,255,0.7)', margin: '0 0 32px' } }, `You anchored with ${participantCount} others`),
        React.createElement('div', { style: { display: 'flex', gap: 20, marginBottom: 40 } },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#FCD34D', margin: 0 } }, streakCount + 1),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' } }, 'Day Streak')
          ),
          React.createElement('div', { style: { width: 1, background: 'rgba(255,255,255,0.1)' } }),
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 28, fontWeight: 800, color: '#A78BFA', margin: 0 } }, `${collectiveEnergy}%`),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' } }, 'Pod Energy')
          )
        ),
        // Reflection prompt
        React.createElement('div', { style: { width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '20px', marginBottom: 20 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: '#A78BFA', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Reflect'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: '#FFFFFF', margin: '0 0 14px' } }, reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]),
          React.createElement('textarea', {
            value: reflectionText, onChange: (e) => setReflectionText(e.target.value),
            placeholder: 'Share your reflection (optional)...',
            style: {
              width: '100%', minHeight: 80, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: 14, fontFamily: font, fontSize: 15, color: '#FFFFFF', resize: 'none', outline: 'none', boxSizing: 'border-box'
            }
          })
        ),
        React.createElement('button', {
          onClick: () => { setShowSessionComplete(false); setReflectionText(''); setActiveScreen('home'); },
          style: {
            width: '100%', padding: '16px', background: '#22C55E', border: 'none', borderRadius: 14,
            fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer'
          }
        }, React.createElement('span', null, 'Done'))
      );
    }

    return React.createElement('div', { style: {
      background: themes.light.sessionBg, minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '20px 16px 100px', position: 'relative', overflow: 'hidden'
    } },
      // Back button
      React.createElement('div', { style: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => { setInSession(false); setActiveScreen('home'); },
          style: { width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 22, color: '#FFFFFF' })),
        React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.7)' } }, pod.name),
        React.createElement('div', { style: { width: 44 } })
      ),

      // Timer circle
      React.createElement('div', { style: { position: 'relative', width: 220, height: 220, marginBottom: 30, marginTop: 20 } },
        React.createElement('svg', { width: 220, height: 220, style: { position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' } },
          React.createElement('circle', { cx: 110, cy: 110, r: 100, fill: 'none', stroke: 'rgba(255,255,255,0.06)', strokeWidth: 6 }),
          React.createElement('circle', {
            cx: 110, cy: 110, r: 100, fill: 'none', stroke: '#A78BFA', strokeWidth: 6,
            strokeDasharray: `${2 * Math.PI * 100}`, strokeDashoffset: `${2 * Math.PI * 100 * (1 - timerProgress / 100)}`,
            strokeLinecap: 'round', style: { transition: 'stroke-dashoffset 1s linear' }
          })
        ),
        React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 48, fontWeight: 200, color: '#FFFFFF', letterSpacing: 2 } }, formatTime(sessionTimer)),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 } }, inSession ? breathPhase : 'ready')
        )
      ),

      // Collective presence visualization
      React.createElement('div', { style: { position: 'relative', width: 260, height: 140, marginBottom: 24 } },
        React.createElement('div', { style: {
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: `${collectiveEnergy * 1.8}px`, height: `${collectiveEnergy * 1.2}px`,
          borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)',
          animation: 'pulse 4s ease infinite', transition: 'all 2s ease'
        } }),
        ...dots.map((dot, i) => React.createElement('div', { key: i, style: {
          position: 'absolute', left: `calc(50% + ${dot.x}px)`, top: `calc(50% + ${dot.y * 0.5}px)`,
          width: dot.size, height: dot.size, borderRadius: '50%',
          background: `rgba(167, 139, 250, ${0.3 + Math.random() * 0.5})`,
          animation: `pulse ${2 + Math.random() * 3}s ease infinite ${Math.random() * 2}s`
        } }))
      ),

      // Live info
      React.createElement('div', { style: { display: 'flex', gap: 24, marginBottom: 30 } },
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' } },
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#22C55E', animation: 'pulse 2s ease infinite' } }),
            React.createElement('span', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#FFFFFF' } }, participantCount)
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)' } }, 'anchoring now')
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: '#A78BFA' } }, `${collectiveEnergy}%`),
          React.createElement('br', null),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.5)' } }, 'focus cloud')
        )
      ),

      // Start/Stop button
      !inSession
        ? React.createElement('button', {
            onClick: () => { setInSession(true); setSessionTimer(900); },
            style: {
              padding: '16px 48px', background: '#22C55E', border: 'none', borderRadius: 50,
              fontFamily: font, fontSize: 17, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(34,197,94,0.3)', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 10
            }
          },
            React.createElement(Icon, { name: 'Play', size: 20, color: '#FFFFFF' }),
            React.createElement('span', null, 'Begin Ritual')
          )
        : React.createElement('button', {
            onClick: () => { setInSession(false); setShowSessionComplete(true); },
            style: {
              padding: '16px 48px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50,
              fontFamily: font, fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.2s'
            }
          },
            React.createElement(Icon, { name: 'Square', size: 16, color: 'rgba(255,255,255,0.7)' }),
            React.createElement('span', { style: { marginLeft: 8 } }, 'End Session')
          ),

      // Ritual type label
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 16 } }, `${pod.ritual} · ${pod.name}`)
    );
  };

  const WisdomScreen = () => {
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Wisdom Well'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }))
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 20px', lineHeight: 1.5 } }, 'Daily micro-insights curated for your pod. Fresh wisdom to nourish your practice.'),

      // Featured insight
      React.createElement('div', { style: {
        background: `linear-gradient(135deg, ${t.primary}15, ${t.secondary}15)`, borderRadius: 20, padding: '24px 20px', marginBottom: 16,
        border: `1px solid ${t.cardBorder}`
      } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
          React.createElement(Icon, { name: 'Sparkles', size: 16, color: t.primary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.5 } }, "Today's Featured")
        ),
        React.createElement('h3', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 8px', letterSpacing: -0.3 } }, wisdomItems[0].title),
        React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 12px', lineHeight: 1.6 } }, wisdomItems[0].body),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, fontStyle: 'italic' } }, `— ${wisdomItems[0].source}`),
          React.createElement('button', { style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'Bookmark', size: 18, color: t.primary })
          )
        )
      ),

      // Wisdom list
      ...wisdomItems.slice(1).map((item, i) => React.createElement('div', { key: i, style: {
        background: t.card, borderRadius: 16, padding: '18px', marginBottom: 12, border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 1px 6px rgba(124,58,237,0.04)', cursor: 'pointer', transition: 'all 0.2s'
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: `${t.primary}10`, marginBottom: 8 } },
              React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: t.primary } }, item.tag)
            ),
            React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, item.title),
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, color: t.textSecondary, margin: '0 0 8px', lineHeight: 1.5 } }, item.body),
            React.createElement('span', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, fontStyle: 'italic' } }, `— ${item.source}`)
          ),
          React.createElement('button', { style: { width: 44, height: 44, borderRadius: 22, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: 'Bookmark', size: 18, color: t.textTertiary })
          )
        )
      )),

      // Daily quote
      React.createElement('div', { style: {
        background: t.surfaceAlt, borderRadius: 20, padding: '24px 20px', marginTop: 4, textAlign: 'center'
      } },
        React.createElement(Icon, { name: 'Quote', size: 24, color: t.secondary, style: { marginBottom: 12 } }),
        React.createElement('p', { style: { fontFamily: font, fontSize: 17, fontWeight: 600, color: t.text, margin: '0 0 8px', lineHeight: 1.5, fontStyle: 'italic' } },
          '"The present moment is the only moment available to us, and it is the door to all moments."'
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: 0 } }, '— Thich Nhat Hanh')
      )
    );
  };

  const ProfileScreen = () => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const completedDays = [true, true, true, false, true, true, false];
    const stats = [
      { label: 'Total Sessions', value: '87', icon: 'Zap' },
      { label: 'Hours Anchored', value: '21.8', icon: 'Clock' },
      { label: 'Pods Joined', value: '3', icon: 'Users' },
      { label: 'Reflections', value: '42', icon: 'PenLine' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('h1', { style: { fontFamily: font, fontSize: 34, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0 } }, 'Profile'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          style: { width: 44, height: 44, borderRadius: 22, background: t.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, React.createElement(Icon, { name: 'Settings', size: 20, color: t.primary }))
      ),

      // Avatar & streak
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 28 } },
        React.createElement('div', { style: {
          width: 88, height: 88, borderRadius: 44, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
          boxShadow: `0 4px 20px ${t.primary}40`
        } },
          React.createElement(Icon, { name: 'Anchor', size: 36, color: '#FFFFFF' })
        ),
        React.createElement('h2', { style: { fontFamily: font, fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px' } }, 'Mindful Explorer'),
        React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: `${t.cta}15` } },
          React.createElement(Icon, { name: 'Flame', size: 14, color: t.cta }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.cta } }, `${streakCount}-day streak`)
        )
      ),

      // This week
      React.createElement('div', { style: {
        background: t.card, borderRadius: 20, padding: '20px', marginBottom: 16, border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 2px 12px rgba(124,58,237,0.06)'
      } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 16px' } }, 'This Week'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          ...weekDays.map((day, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('div', { style: {
              width: 38, height: 38, borderRadius: 12, marginBottom: 6,
              background: completedDays[i] ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
            } },
              completedDays[i]
                ? React.createElement(Icon, { name: 'Check', size: 18, color: '#FFFFFF' })
                : null
            ),
            React.createElement('span', { style: { fontFamily: font, fontSize: 11, fontWeight: 600, color: completedDays[i] ? t.primary : t.textTertiary } }, day)
          ))
        )
      ),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 } },
        ...stats.map((stat, i) => React.createElement('div', { key: i, style: {
          background: t.card, borderRadius: 16, padding: '18px 16px', border: `1px solid ${t.cardBorder}`,
          boxShadow: '0 1px 6px rgba(124,58,237,0.04)'
        } },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
            React.createElement(Icon, { name: stat.icon, size: 18, color: t.primary })
          ),
          React.createElement('p', { style: { fontFamily: font, fontSize: 24, fontWeight: 800, color: t.text, margin: '0 0 2px', letterSpacing: -0.5 } }, stat.value),
          React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: 0 } }, stat.label)
        ))
      ),

      // My Pods
      React.createElement('div', { style: { background: t.card, borderRadius: 20, padding: '20px', border: `1px solid ${t.cardBorder}`, marginBottom: 16 } },
        React.createElement('h3', { style: { fontFamily: font, fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 14px' } }, 'My Pods'),
        ...[pods[0], pods[1], pods[2]].map((pod, i) => React.createElement('div', { key: i, style: {
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
          borderBottom: i < 2 ? `1px solid ${t.cardBorder}` : 'none'
        } },
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `${pod.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: pod.icon, size: 20, color: pod.color })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text, margin: 0 } }, pod.name),
            React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textTertiary, margin: '2px 0 0' } }, `${pod.members.toLocaleString()} members`)
          ),
          React.createElement(Icon, { name: 'ChevronRight', size: 18, color: t.textTertiary })
        ))
      ),

      // Theme toggle
      React.createElement('div', { style: {
        background: t.card, borderRadius: 16, padding: '16px 20px', border: `1px solid ${t.cardBorder}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
      }, onClick: () => setDarkMode(!darkMode) },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(Icon, { name: darkMode ? 'Sun' : 'Moon', size: 20, color: t.primary }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 600, color: t.text } }, darkMode ? 'Light Mode' : 'Dark Mode')
        ),
        React.createElement('div', { style: {
          width: 48, height: 28, borderRadius: 14, background: darkMode ? t.cta : t.surface, padding: 2,
          display: 'flex', alignItems: darkMode ? 'center' : 'center', justifyContent: darkMode ? 'flex-end' : 'flex-start',
          transition: 'all 0.3s', cursor: 'pointer'
        } },
          React.createElement('div', { style: { width: 24, height: 24, borderRadius: 12, background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'all 0.3s' } })
        )
      )
    );
  };

  const screens = { home: HomeScreen, pods: PodsScreen, session: SessionScreen, wisdom: WisdomScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'pods', label: 'Pods', icon: 'Users' },
    { id: 'session', label: 'Session', icon: 'Play' },
    { id: 'wisdom', label: 'Wisdom', icon: 'Lightbulb' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const showBottomNav = activeScreen !== 'session' || (!inSession && !showSessionComplete);

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: font } },
    // CSS animations
    React.createElement('style', null, `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      button:active { transform: scale(0.97); }
      textarea::placeholder { color: rgba(255,255,255,0.3); }
    `),

    // Phone frame
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 44, background: t.bg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease'
    } },
      // Screen content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(screens[activeScreen] || HomeScreen)
      ),

      // Bottom navigation
      showBottomNav && React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.tabBg, borderTop: `1px solid ${t.tabBorder}`,
        padding: '8px 0 28px', display: 'flex', justifyContent: 'space-around',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 10
      } },
        ...navItems.map(item => React.createElement('button', {
          key: item.id,
          onClick: () => setActiveScreen(item.id),
          style: {
            background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, padding: '6px 12px', minWidth: 56, minHeight: 44,
            transition: 'all 0.2s'
          }
        },
          item.id === 'session'
            ? React.createElement('div', { style: {
                width: 44, height: 44, borderRadius: 22, background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 12px ${t.cta}40`, marginTop: -16
              } },
                React.createElement(Icon, { name: item.icon, size: 20, color: '#FFFFFF' })
              )
            : React.createElement(Icon, { name: item.icon, size: 22, color: activeScreen === item.id ? t.primary : t.textTertiary }),
          React.createElement('span', { style: {
            fontFamily: font, fontSize: 11, fontWeight: activeScreen === item.id ? 600 : 400,
            color: activeScreen === item.id ? t.primary : t.textTertiary,
            marginTop: item.id === 'session' ? -2 : 0
          } }, item.label)
        ))
      )
    )
  );
}
