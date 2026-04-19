const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  dark: {
    primary: '#0F0F23',
    secondary: '#1E1B4B',
    cta: '#E11D48',
    background: '#000000',
    surface: '#0F0F23',
    surfaceLight: '#1E1B4B',
    text: '#FFFFFF',
    textSecondary: '#A0A0C0',
    textMuted: '#6B6B8D',
    cardBg: 'rgba(30, 27, 75, 0.6)',
    cardBorder: 'rgba(255,255,255,0.08)',
    tabBar: 'rgba(15, 15, 35, 0.95)',
    overlay: 'rgba(0,0,0,0.5)',
  },
  light: {
    primary: '#F8F7FF',
    secondary: '#EDE9FE',
    cta: '#E11D48',
    background: '#FFFFFF',
    surface: '#F8F7FF',
    surfaceLight: '#EDE9FE',
    text: '#0F0F23',
    textSecondary: '#4A4A6A',
    textMuted: '#8B8BA8',
    cardBg: 'rgba(237, 233, 254, 0.6)',
    cardBorder: 'rgba(15, 15, 35, 0.08)',
    tabBar: 'rgba(248, 247, 255, 0.95)',
    overlay: 'rgba(255,255,255,0.5)',
  },
};

const fontStack = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

const palettes = [
  { name: 'Muted Forest', colors: ['#2D5016', '#4A7C28', '#8FBC6B', '#D4E8C2'], icon: 'TreePine' },
  { name: 'Soft Hues', colors: ['#C9B1FF', '#FFB1D0', '#B1D4FF', '#FFE0B1'], icon: 'Palette' },
  { name: 'Retro Glow', colors: ['#FF6B35', '#F7C59F', '#EFEFD0', '#004E89'], icon: 'Sunset' },
  { name: 'Ocean Drift', colors: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'], icon: 'Waves' },
  { name: 'Warm Ember', colors: ['#6B2737', '#C45B5B', '#E8A87C', '#F7D09C'], icon: 'Flame' },
  { name: 'Twilight', colors: ['#2B0548', '#6B2FA0', '#9B72CF', '#D4B8E8'], icon: 'Moon' },
];

const soundscapes = [
  { name: 'Rainfall Lullaby', duration: '15 min', icon: 'CloudRain' },
  { name: 'Gentle Waves', duration: '20 min', icon: 'Waves' },
  { name: 'Forest Morning', duration: '12 min', icon: 'TreePine' },
  { name: 'Singing Bowls', duration: '10 min', icon: 'Music' },
  { name: 'Night Crickets', duration: '18 min', icon: 'Bug' },
  { name: 'Wind Chimes', duration: '8 min', icon: 'Wind' },
];

const moods = [
  { label: 'Stressed', icon: 'Zap', color: '#E11D48' },
  { label: 'Tired', icon: 'Battery', color: '#7C3AED' },
  { label: 'Anxious', icon: 'Activity', color: '#F59E0B' },
  { label: 'Restless', icon: 'Wind', color: '#06B6D4' },
  { label: 'Sad', icon: 'CloudRain', color: '#6366F1' },
  { label: 'Neutral', icon: 'Minus', color: '#8B5CF6' },
];

const sampleFlows = [
  { title: 'Morning Serenity', photos: 6, duration: '3:20', palette: 'Soft Hues', rating: 4.8, mood: 'Calm' },
  { title: 'Golden Hour Walk', photos: 8, duration: '4:15', palette: 'Warm Ember', mood: 'Peaceful', rating: 4.5 },
  { title: 'Rainy Day Comfort', photos: 5, duration: '2:45', palette: 'Ocean Drift', mood: 'Cozy', rating: 4.9 },
  { title: 'Forest Memories', photos: 7, duration: '3:50', palette: 'Muted Forest', mood: 'Grounded', rating: 4.7 },
];

const presets = [
  { name: 'Deep Calm', author: 'Sarah K.', uses: 1240, palette: 'Twilight', soundscape: 'Singing Bowls', pacing: 'Slow' },
  { name: 'Sunrise Energy', author: 'Marcus T.', uses: 890, palette: 'Warm Ember', soundscape: 'Forest Morning', pacing: 'Medium' },
  { name: 'Ocean Reset', author: 'Luna M.', uses: 2100, palette: 'Ocean Drift', soundscape: 'Gentle Waves', pacing: 'Slow' },
  { name: 'Evening Unwind', author: 'Alex J.', uses: 650, palette: 'Soft Hues', soundscape: 'Night Crickets', pacing: 'Slow' },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const [selectedMood, setSelectedMood] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [flowPlaying, setFlowPlaying] = useState(false);
  const [flowProgress, setFlowProgress] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [flowRating, setFlowRating] = useState(0);
  const [journalEntries, setJournalEntries] = useState([
    { date: 'Today', mood: 'Stressed', flow: 'Morning Serenity', rating: 5, note: 'Exactly what I needed after a long meeting.' },
    { date: 'Yesterday', mood: 'Tired', flow: 'Rainy Day Comfort', rating: 4, note: 'The rain sounds were perfect.' },
    { date: 'Apr 17', mood: 'Anxious', flow: 'Forest Memories', rating: 5, note: 'Felt like I was back in the woods.' },
  ]);
  const t = themes[themeMode];
  const animRef = useRef(null);

  useEffect(() => {
    if (flowPlaying) {
      const interval = setInterval(() => {
        setFlowProgress(p => {
          if (p >= 100) { setFlowPlaying(false); return 0; }
          return p + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [flowPlaying]);

  const LucideIcon = ({ name, size = 24, color, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color: color || t.text, style, strokeWidth: 1.8 });
  };

  const styleTag = React.createElement('style', {
    dangerouslySetInnerHTML: { __html: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes flowGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes ripple {
        0% { transform: scale(0.8); opacity: 0.6; }
        100% { transform: scale(2.5); opacity: 0; }
      }
    ` }
  });

  // ========== HOME SCREEN ==========
  const HomeScreen = () => {
    const [pressedMood, setPressedMood] = useState(null);
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, fontWeight: 500, marginBottom: 4 } }, 'Good evening'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5 } }, 'ChronoFlow'),
        ),
        React.createElement('button', {
          onClick: () => setThemeMode(m => m === 'dark' ? 'light' : 'dark'),
          style: { width: 44, height: 44, borderRadius: 22, background: t.cardBg, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' },
        }, React.createElement(LucideIcon, { name: themeMode === 'dark' ? 'Sun' : 'Moon', size: 20 })),
      ),

      // Mood Selector
      React.createElement('div', { style: { marginBottom: 28 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 4 } }, 'How are you feeling?'),
        React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, marginBottom: 16 } }, 'Select your current mood to generate a Flow'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
          moods.map(mood =>
            React.createElement('button', {
              key: mood.label,
              onClick: () => { setSelectedMood(mood.label); setPressedMood(mood.label); setTimeout(() => setPressedMood(null), 200); },
              style: {
                padding: '16px 8px', borderRadius: 16,
                background: selectedMood === mood.label
                  ? `linear-gradient(135deg, ${mood.color}22, ${mood.color}44)`
                  : t.cardBg,
                border: selectedMood === mood.label ? `2px solid ${mood.color}` : `1px solid ${t.cardBorder}`,
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease',
                transform: pressedMood === mood.label ? 'scale(0.93)' : 'scale(1)',
              },
            },
              React.createElement(LucideIcon, { name: mood.icon, size: 22, color: selectedMood === mood.label ? mood.color : t.textSecondary }),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: selectedMood === mood.label ? mood.color : t.textSecondary, fontFamily: fontStack } }, mood.label),
            )
          )
        ),
      ),

      // Generate Button
      selectedMood && React.createElement('button', {
        onClick: () => {
          setIsGenerating(true);
          setTimeout(() => { setIsGenerating(false); setFlowPlaying(true); setActiveScreen('flow'); }, 2000);
        },
        style: {
          width: '100%', padding: '18px 24px', borderRadius: 16,
          background: isGenerating ? t.surfaceLight : `linear-gradient(135deg, ${t.cta}, #9333EA)`,
          border: 'none', color: '#FFFFFF', fontSize: 17, fontWeight: 700, fontFamily: fontStack,
          cursor: 'pointer', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: isGenerating ? 'none' : `0 8px 32px ${t.cta}40`,
          transition: 'all 0.3s ease',
        },
      },
        isGenerating
          ? React.createElement(React.Fragment, null,
              React.createElement('div', { style: { width: 20, height: 20, borderRadius: 10, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'pulse 0.8s linear infinite' } }),
              'Generating your Flow...'
            )
          : React.createElement(React.Fragment, null,
              React.createElement(LucideIcon, { name: 'Sparkles', size: 20, color: '#FFFFFF' }),
              React.createElement('span', null, 'Generate My Flow'),
            )
      ),

      // Recent Flows
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3 } }, 'Recent Flows'),
          React.createElement('button', {
            onClick: () => setActiveScreen('journal'),
            style: { background: 'none', border: 'none', color: t.cta, fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer' },
          }, 'See All'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          sampleFlows.slice(0, 2).map((flow, i) =>
            React.createElement('button', {
              key: i,
              onClick: () => { setFlowPlaying(true); setActiveScreen('flow'); },
              style: {
                padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
                display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.2s',
                animation: `slideUp 0.4s ease ${i * 0.1}s both`, textAlign: 'left', width: '100%',
              },
            },
              React.createElement('div', { style: {
                width: 56, height: 56, borderRadius: 14,
                background: `linear-gradient(135deg, ${palettes[i].colors[0]}, ${palettes[i].colors[2]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              } }, React.createElement(LucideIcon, { name: 'Play', size: 22, color: '#FFFFFF' })),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, flow.title),
                React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, `${flow.photos} photos · ${flow.duration} · ${flow.palette}`),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(LucideIcon, { name: 'Star', size: 14, color: '#F59E0B' }),
                React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, fontWeight: 600 } }, flow.rating),
              ),
            )
          )
        ),
      ),

      // Calm Cues
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 6 } }, 'Your Calm Cues'),
        React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, marginBottom: 14 } }, 'Elements that bring you peace'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          [{ label: 'Sunsets', icon: 'Sunset', count: 14 }, { label: 'Water', icon: 'Waves', count: 9 }, { label: 'Greenery', icon: 'TreePine', count: 11 }, { label: 'Pets', icon: 'Heart', count: 7 }].map((cue, i) =>
            React.createElement('div', {
              key: i,
              style: {
                padding: '14px 18px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 80,
                animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
              },
            },
              React.createElement(LucideIcon, { name: cue.icon, size: 20, color: t.cta }),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: fontStack } }, cue.label),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, `${cue.count} photos`),
            )
          )
        ),
      ),
    );
  };

  // ========== FLOW PLAYER SCREEN ==========
  const FlowScreen = () => {
    const flow = sampleFlows[0];
    const currentPalette = palettes[1];
    const [liked, setLiked] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const photoIndex = Math.floor(flowProgress / (100 / 6));

    return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: themeMode === 'dark' ? '#000' : '#0F0F23' } },
      // Visual area
      React.createElement('div', { style: {
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${currentPalette.colors[0]}, ${currentPalette.colors[1]}, ${currentPalette.colors[2]}, ${currentPalette.colors[3]})`,
        backgroundSize: '400% 400%', animation: 'flowGradient 8s ease infinite',
      } },
        // Floating orbs
        ...[0, 1, 2].map(i =>
          React.createElement('div', {
            key: `orb-${i}`,
            style: {
              position: 'absolute', borderRadius: '50%',
              width: [120, 80, 100][i], height: [120, 80, 100][i],
              background: `radial-gradient(circle, ${currentPalette.colors[i]}88, transparent)`,
              top: [`20%`, `50%`, `70%`][i], left: [`10%`, `60%`, `30%`][i],
              animation: `breathe ${[4, 5, 6][i]}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            },
          })
        ),
        // Center content
        React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 } },
          React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.7)', fontFamily: fontStack, fontWeight: 500, marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' } }, selectedMood || 'Calm'),
          React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: '#FFFFFF', fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 4 } }, flow.title),
          React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.6)', fontFamily: fontStack } }, `Photo ${photoIndex + 1} of ${flow.photos}`),
        ),
        // Top controls
        React.createElement('div', { style: { position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 3 } },
          React.createElement('button', {
            onClick: () => { setFlowPlaying(false); setFlowProgress(0); setActiveScreen('home'); },
            style: { width: 44, height: 44, borderRadius: 22, background: 'rgba(0,0,0,0.3)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' },
          }, React.createElement(LucideIcon, { name: 'X', size: 20, color: '#FFFFFF' })),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('button', {
              onClick: () => setLiked(!liked),
              style: { width: 44, height: 44, borderRadius: 22, background: liked ? 'rgba(225,29,72,0.4)' : 'rgba(0,0,0,0.3)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.2s' },
            }, React.createElement(LucideIcon, { name: 'Heart', size: 20, color: liked ? '#E11D48' : '#FFFFFF' })),
          ),
        ),
      ),

      // Controls area
      React.createElement('div', { style: { padding: '20px 16px 100px', background: themeMode === 'dark' ? '#000' : '#0F0F23' } },
        // Progress bar
        React.createElement('div', { style: { height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', marginBottom: 16, overflow: 'hidden' } },
          React.createElement('div', { style: { height: '100%', width: `${flowProgress}%`, borderRadius: 2, background: `linear-gradient(90deg, ${t.cta}, #9333EA)`, transition: 'width 0.1s linear' } }),
        ),
        // Play controls
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 20 } },
          React.createElement('button', {
            onClick: () => setFlowProgress(p => Math.max(0, p - 15)),
            style: { width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
          }, React.createElement(LucideIcon, { name: 'SkipBack', size: 22, color: '#FFFFFF' })),
          React.createElement('button', {
            onClick: () => setFlowPlaying(!flowPlaying),
            style: { width: 64, height: 64, borderRadius: 32, background: `linear-gradient(135deg, ${t.cta}, #9333EA)`, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 8px 32px ${t.cta}40` },
          }, React.createElement(LucideIcon, { name: flowPlaying ? 'Pause' : 'Play', size: 28, color: '#FFFFFF' })),
          React.createElement('button', {
            onClick: () => setFlowProgress(p => Math.min(100, p + 15)),
            style: { width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
          }, React.createElement(LucideIcon, { name: 'SkipForward', size: 22, color: '#FFFFFF' })),
        ),
        // Feedback prompt
        !showFeedback
          ? React.createElement('button', {
              onClick: () => setShowFeedback(true),
              style: { width: '100%', padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
            },
              React.createElement(LucideIcon, { name: 'MessageCircle', size: 18, color: '#FFFFFF' }),
              'Rate this Flow',
            )
          : React.createElement('div', { style: { padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', animation: 'fadeIn 0.3s ease' } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: '#FFFFFF', fontFamily: fontStack, marginBottom: 12 } }, 'How was this Flow?'),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 } },
                [1, 2, 3, 4, 5].map(s =>
                  React.createElement('button', {
                    key: s, onClick: () => setFlowRating(s),
                    style: { width: 44, height: 44, borderRadius: 22, background: s <= flowRating ? t.cta + '40' : 'rgba(255,255,255,0.08)', border: s <= flowRating ? `2px solid ${t.cta}` : '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
                  }, React.createElement(LucideIcon, { name: 'Star', size: 18, color: s <= flowRating ? '#F59E0B' : 'rgba(255,255,255,0.4)' }))
                )
              ),
              flowRating > 0 && React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: fontStack, textAlign: 'center' } }, 'Saved to your Flow Journal'),
            ),
      ),
    );
  };

  // ========== EXPLORE SCREEN ==========
  const ExploreScreen = () => {
    const [activeTab, setActiveTab] = useState('palettes');
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Explore'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, marginBottom: 20 } }, 'Discover palettes, sounds & presets'),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 24, background: t.cardBg, borderRadius: 12, padding: 4, border: `1px solid ${t.cardBorder}` } },
        ['palettes', 'sounds', 'presets'].map(tab =>
          React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: activeTab === tab ? t.cta : 'transparent',
              color: activeTab === tab ? '#FFFFFF' : t.textSecondary,
              fontSize: 15, fontWeight: 600, fontFamily: fontStack, cursor: 'pointer', transition: 'all 0.2s',
              textTransform: 'capitalize',
            },
          }, tab)
        )
      ),

      // Palettes
      activeTab === 'palettes' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        palettes.map((p, i) =>
          React.createElement('button', {
            key: i,
            onClick: () => setSelectedPalette(selectedPalette === i ? null : i),
            style: {
              padding: 16, borderRadius: 16, background: t.cardBg, border: selectedPalette === i ? `2px solid ${t.cta}` : `1px solid ${t.cardBorder}`,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', animation: `slideUp 0.4s ease ${i * 0.06}s both`, width: '100%',
            },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement(LucideIcon, { name: p.icon, size: 18, color: p.colors[0] }),
                React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack } }, p.name),
              ),
              selectedPalette === i && React.createElement(LucideIcon, { name: 'Check', size: 18, color: t.cta }),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              p.colors.map((c, ci) =>
                React.createElement('div', { key: ci, style: { flex: 1, height: 32, borderRadius: 8, background: c } })
              )
            ),
          )
        )
      ),

      // Sounds
      activeTab === 'sounds' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        soundscapes.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              display: 'flex', alignItems: 'center', gap: 14, animation: `slideUp 0.4s ease ${i * 0.06}s both`,
            },
          },
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.cta}30, #9333EA30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(LucideIcon, { name: s.icon, size: 22, color: t.cta }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 2 } }, s.name),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, s.duration),
            ),
            React.createElement('button', {
              style: { width: 44, height: 44, borderRadius: 22, background: t.cardBg, border: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
            }, React.createElement(LucideIcon, { name: 'Play', size: 18 })),
          )
        )
      ),

      // Presets
      activeTab === 'presets' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, 'Community Peace Presets'),
        presets.map((p, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              animation: `slideUp 0.4s ease ${i * 0.06}s both`,
            },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack } }, p.name),
                React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, `by ${p.author}`),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(LucideIcon, { name: 'Users', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, p.uses.toLocaleString()),
              ),
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
              [p.palette, p.soundscape, p.pacing].map((tag, ti) =>
                React.createElement('span', { key: ti, style: { padding: '4px 10px', borderRadius: 8, background: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,15,35,0.06)', fontSize: 13, color: t.textSecondary, fontFamily: fontStack } }, tag)
              )
            ),
          )
        )
      ),
    );
  };

  // ========== JOURNAL SCREEN ==========
  const JournalScreen = () => {
    const stats = { totalFlows: 47, streak: 12, avgRating: 4.6, topMood: 'Stressed' };
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Flow Journal'),
      React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, marginBottom: 24 } }, 'Track your calm journey'),

      // Stats grid
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 28 } },
        [
          { label: 'Total Flows', value: stats.totalFlows, icon: 'Play', color: t.cta },
          { label: 'Day Streak', value: stats.streak, icon: 'Flame', color: '#F59E0B' },
          { label: 'Avg Rating', value: stats.avgRating, icon: 'Star', color: '#8B5CF6' },
          { label: 'Top Mood', value: stats.topMood, icon: 'Zap', color: '#06B6D4' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
            },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(LucideIcon, { name: stat.icon, size: 16, color: stat.color }),
              ),
              React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, stat.label),
            ),
            React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5 } }, stat.value),
          )
        ),
      ),

      // Weekly mood chart (simplified visual)
      React.createElement('div', { style: { padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`, marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 14 } }, 'This Week'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 80, gap: 6, marginBottom: 8 } },
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const heights = [45, 65, 35, 80, 55, 70, 50];
            return React.createElement('div', { key: day, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
              React.createElement('div', { style: {
                width: '100%', height: heights[i], borderRadius: 8,
                background: i === 3 ? `linear-gradient(180deg, ${t.cta}, #9333EA)` : `${t.cta}30`,
                transition: 'all 0.3s', animation: `slideUp 0.4s ease ${i * 0.05}s both`,
              } }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, day),
            );
          })
        ),
      ),

      // Journal entries
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 14 } }, 'Recent Entries'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        journalEntries.map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: {
              padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}`,
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: t.textMuted, fontFamily: fontStack } }, entry.date),
                React.createElement('span', { style: { padding: '2px 8px', borderRadius: 6, background: `${t.cta}20`, color: t.cta, fontSize: 11, fontWeight: 600, fontFamily: fontStack } }, entry.mood),
              ),
              React.createElement('div', { style: { display: 'flex', gap: 2 } },
                Array.from({ length: 5 }).map((_, si) =>
                  React.createElement(LucideIcon, { key: si, name: 'Star', size: 12, color: si < entry.rating ? '#F59E0B' : t.textMuted })
                )
              ),
            ),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, entry.flow),
            React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, lineHeight: 1.4 } }, entry.note),
          )
        ),
      ),
    );
  };

  // ========== PROFILE SCREEN ==========
  const ProfileScreen = () => {
    const [notifs, setNotifs] = useState(true);
    const [dailyReminder, setDailyReminder] = useState(true);
    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease' } },
      React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 24 } }, 'Profile'),

      // User card
      React.createElement('div', { style: { padding: 20, borderRadius: 20, background: `linear-gradient(135deg, ${t.cta}15, #9333EA15)`, border: `1px solid ${t.cardBorder}`, marginBottom: 24, textAlign: 'center' } },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: 36, background: `linear-gradient(135deg, ${t.cta}, #9333EA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' } },
          React.createElement(LucideIcon, { name: 'User', size: 32, color: '#FFFFFF' }),
        ),
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, 'Alex Rivera'),
        React.createElement('div', { style: { fontSize: 15, color: t.textMuted, fontFamily: fontStack, marginBottom: 14 } }, 'Flowing since March 2026'),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 24 } },
          [{ label: 'Flows', value: 47 }, { label: 'Presets', value: 3 }, { label: 'Streak', value: 12 }].map((s, i) =>
            React.createElement('div', { key: i, style: { textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: fontStack } }, s.value),
              React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, s.label),
            )
          ),
        ),
      ),

      // Calm Profile
      React.createElement('div', { style: { marginBottom: 24 } },
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 14 } }, 'Your Calm Profile'),
        React.createElement('div', { style: { padding: 16, borderRadius: 16, background: t.cardBg, border: `1px solid ${t.cardBorder}` } },
          [
            { label: 'Preferred Pacing', value: 'Slow & Gentle', icon: 'Clock' },
            { label: 'Top Palette', value: 'Ocean Drift', icon: 'Palette' },
            { label: 'Favorite Sound', value: 'Gentle Waves', icon: 'Music' },
            { label: 'Best Time', value: 'Evening, 9-10 PM', icon: 'Moon' },
          ].map((item, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 3 ? `1px solid ${t.cardBorder}` : 'none' },
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement(LucideIcon, { name: item.icon, size: 18, color: t.cta }),
                React.createElement('span', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack } }, item.label),
              ),
              React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, item.value),
            )
          ),
        ),
      ),

      // Settings
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 14 } }, 'Settings'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
          // Theme toggle
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}`, marginBottom: 8 },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement(LucideIcon, { name: themeMode === 'dark' ? 'Moon' : 'Sun', size: 18, color: t.textSecondary }),
              React.createElement('span', { style: { fontSize: 17, color: t.text, fontFamily: fontStack } }, 'Dark Mode'),
            ),
            React.createElement('button', {
              onClick: () => setThemeMode(m => m === 'dark' ? 'light' : 'dark'),
              style: { width: 52, height: 32, borderRadius: 16, background: themeMode === 'dark' ? t.cta : t.textMuted + '40', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' },
            },
              React.createElement('div', { style: { width: 26, height: 26, borderRadius: 13, background: '#FFFFFF', position: 'absolute', top: 3, left: themeMode === 'dark' ? 23 : 3, transition: 'left 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' } }),
            ),
          ),
          // Notifications toggle
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}`, marginBottom: 8 },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement(LucideIcon, { name: 'Bell', size: 18, color: t.textSecondary }),
              React.createElement('span', { style: { fontSize: 17, color: t.text, fontFamily: fontStack } }, 'Notifications'),
            ),
            React.createElement('button', {
              onClick: () => setNotifs(!notifs),
              style: { width: 52, height: 32, borderRadius: 16, background: notifs ? t.cta : t.textMuted + '40', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' },
            },
              React.createElement('div', { style: { width: 26, height: 26, borderRadius: 13, background: '#FFFFFF', position: 'absolute', top: 3, left: notifs ? 23 : 3, transition: 'left 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' } }),
            ),
          ),
          // Daily reminder toggle
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}` },
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement(LucideIcon, { name: 'Clock', size: 18, color: t.textSecondary }),
              React.createElement('span', { style: { fontSize: 17, color: t.text, fontFamily: fontStack } }, 'Daily Reminder'),
            ),
            React.createElement('button', {
              onClick: () => setDailyReminder(!dailyReminder),
              style: { width: 52, height: 32, borderRadius: 16, background: dailyReminder ? t.cta : t.textMuted + '40', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' },
            },
              React.createElement('div', { style: { width: 26, height: 26, borderRadius: 13, background: '#FFFFFF', position: 'absolute', top: 3, left: dailyReminder ? 23 : 3, transition: 'left 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' } }),
            ),
          ),
        ),
      ),
    );
  };

  // ========== NAVIGATION ==========
  const screens = { home: HomeScreen, flow: FlowScreen, explore: ExploreScreen, journal: JournalScreen, profile: ProfileScreen };
  const ActiveScreenComponent = screens[activeScreen] || HomeScreen;

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'explore', label: 'Explore', icon: 'Compass' },
    { id: 'journal', label: 'Journal', icon: 'BookOpen' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontStack, padding: '20px 0' } },
    styleTag,
    React.createElement('div', { style: {
      width: 375, height: 812, borderRadius: 44, overflow: 'hidden', position: 'relative',
      background: activeScreen === 'flow' ? (themeMode === 'dark' ? '#000' : '#0F0F23') : t.background,
      boxShadow: '0 24px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      transition: 'background 0.3s ease',
    } },
      // Scrollable content
      React.createElement('div', { style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' } },
        React.createElement(ActiveScreenComponent),
      ),

      // Bottom tab bar (hidden during flow playback)
      activeScreen !== 'flow' && React.createElement('div', { style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.tabBar, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.cardBorder}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 0 28px',
      } },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab.id,
            onClick: () => setActiveScreen(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px',
              minWidth: 44, minHeight: 44,
              transition: 'all 0.2s',
            },
          },
            React.createElement(LucideIcon, { name: tab.icon, size: 22, color: activeScreen === tab.id ? t.cta : t.textMuted }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: activeScreen === tab.id ? 700 : 500, color: activeScreen === tab.id ? t.cta : t.textMuted, fontFamily: fontStack } }, tab.label),
          )
        ),
      ),
    ),
  );
}
