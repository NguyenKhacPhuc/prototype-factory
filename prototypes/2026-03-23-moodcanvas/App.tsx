const { useState, useEffect } = React;

const themes = {
  light: {
    bg: '#F6F4FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EEE9FF',
    surface2: '#FAF8FF',
    text: '#1C1730',
    textSec: '#7B6FA0',
    textMuted: '#B0A8CC',
    primary: '#7C3AED',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    primaryLight: '#EDE9FE',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    success: '#10B981',
    border: '#E8E2FF',
    navBg: '#FFFFFF',
    shadow: '0 4px 24px rgba(124,58,237,0.12)',
    cardShadow: '0 2px 12px rgba(124,58,237,0.07)',
    inputBg: '#F3F0FF',
  },
  dark: {
    bg: '#0E0B1A',
    surface: '#1A1630',
    surfaceAlt: '#231E3D',
    surface2: '#150F28',
    text: '#F0EEFF',
    textSec: '#9B93C0',
    textMuted: '#5C5580',
    primary: '#A78BFA',
    primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    primaryLight: '#2D2050',
    accent: '#FCD34D',
    accentLight: '#3D2D00',
    success: '#34D399',
    border: '#2A2248',
    navBg: '#110D22',
    shadow: '0 4px 24px rgba(0,0,0,0.4)',
    cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
    inputBg: '#1E1838',
  }
};

const recentCaptures = [
  {
    id: 1,
    emotion: 'overwhelmed but hopeful',
    palette: ['#7C3AED', '#A855F7', '#C084FC', '#E9D5FF', '#FDF4FF'],
    fonts: ['Bricolage Grotesque', 'DM Sans'],
    toneWords: ['expansive', 'searching', 'tender'],
    date: 'Today, 9:41 AM',
    intensity: 85,
    color: '#7C3AED',
  },
  {
    id: 2,
    emotion: 'calm but energetic',
    palette: ['#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD', '#F0F9FF'],
    fonts: ['Space Grotesk', 'Plus Jakarta Sans'],
    toneWords: ['focused', 'crisp', 'alive'],
    date: 'Yesterday',
    intensity: 70,
    color: '#0EA5E9',
  },
  {
    id: 3,
    emotion: 'melancholic inspiration',
    palette: ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#EEF2FF'],
    fonts: ['Sora', 'Outfit'],
    toneWords: ['nostalgic', 'wistful', 'luminous'],
    date: 'Mar 21',
    intensity: 60,
    color: '#6366F1',
  },
];

const quickEmotions = [
  'overwhelmed', 'inspired', 'anxious', 'focused',
  'melancholic', 'energetic', 'uncertain', 'joyful',
];

const timelineData = [
  { date: 'Mar 23', emotion: 'overwhelmed but hopeful', color: '#7C3AED', intensity: 85 },
  { date: 'Mar 22', emotion: 'calm but energetic', color: '#0EA5E9', intensity: 70 },
  { date: 'Mar 21', emotion: 'melancholic inspiration', color: '#6366F1', intensity: 60 },
  { date: 'Mar 20', emotion: 'creative block', color: '#F59E0B', intensity: 45 },
  { date: 'Mar 19', emotion: 'deeply focused', color: '#10B981', intensity: 90 },
  { date: 'Mar 18', emotion: 'nostalgic warmth', color: '#F97316', intensity: 75 },
  { date: 'Mar 17', emotion: 'quietly confident', color: '#8B5CF6', intensity: 80 },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [moodInput, setMoodInput] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCapture, setSelectedCapture] = useState(recentCaptures[0]);
  const [canvasSection, setCanvasSection] = useState('palette');
  const [exportFormat, setExportFormat] = useState('board');

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Sora:wght@400;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      input, textarea, button { font-family: 'Plus Jakarta Sans', sans-serif; }
      textarea { resize: none; }
      button { cursor: pointer; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleGenerate = () => {
    if (!moodInput && !selectedEmotion) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedCapture(recentCaptures[0]);
      setActiveTab('canvas');
      setCanvasSection('palette');
    }, 1800);
  };

  const tabs = [
    { id: 'home', label: 'Capture', icon: window.lucide.Edit3 },
    { id: 'canvas', label: 'Canvas', icon: window.lucide.Layers },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.Activity },
    { id: 'export', label: 'Export', icon: window.lucide.Share2 },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  // ─── STATUS BAR ────────────────────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement('div', {
      style: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 26px 0',
        height: '50px',
        flexShrink: 0,
      }
    },
      React.createElement('span', { style: { fontSize: '15px', fontWeight: '700', color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" } }, '9:41'),
      React.createElement('div', {
        style: {
          position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
          width: '118px', height: '32px', background: '#000', borderRadius: '18px', zIndex: 10,
        }
      }),
      React.createElement('div', { style: { display: 'flex', gap: '5px', alignItems: 'center' } },
        React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
        React.createElement(window.lucide.Battery, { size: 14, color: t.text }),
      )
    );

  // ─── HOME SCREEN ───────────────────────────────────────────────────────────
  const HomeScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 20px 12px' } },
      // Header
      React.createElement('div', { style: { paddingBottom: '14px' } },
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec, fontWeight: '500' } }, 'Good morning, Alex'),
        React.createElement('h1', {
          style: {
            fontSize: '24px', fontWeight: '800', color: t.text,
            fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: '1.1',
          }
        }, 'How are you feeling?'),
      ),

      // Input card
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '20px', padding: '16px',
          boxShadow: t.cardShadow, marginBottom: '14px', border: `1px solid ${t.border}`,
        }
      },
        React.createElement('p', {
          style: { fontSize: '11px', fontWeight: '700', color: t.primary, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.9px' }
        }, 'Describe your feeling'),
        React.createElement('textarea', {
          value: moodInput,
          onChange: e => setMoodInput(e.target.value),
          placeholder: "I feel like I'm juggling too many ideas but there's an exciting energy underneath the chaos...",
          style: {
            width: '100%', minHeight: '76px', background: t.inputBg,
            border: `1.5px solid ${moodInput ? t.primary : t.border}`,
            borderRadius: '12px', padding: '11px 12px', fontSize: '13px',
            color: t.text, lineHeight: '1.55', outline: 'none',
            transition: 'border-color 0.15s',
          }
        }),
        // Chips
        React.createElement('p', { style: { fontSize: '11px', color: t.textMuted, margin: '12px 0 8px', fontWeight: '500' } }, 'Or pick a quick feeling'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } },
          ...quickEmotions.map(em =>
            React.createElement('button', {
              key: em,
              onClick: () => { setSelectedEmotion(em === selectedEmotion ? null : em); setMoodInput(em === selectedEmotion ? '' : em); },
              style: {
                padding: '6px 12px', borderRadius: '20px', border: 'none',
                background: selectedEmotion === em ? t.primary : t.surfaceAlt,
                color: selectedEmotion === em ? '#fff' : t.textSec,
                fontSize: '12px', fontWeight: '600', transition: 'all 0.15s',
              }
            }, em)
          )
        ),
        // Generate CTA
        React.createElement('button', {
          onClick: handleGenerate,
          style: {
            width: '100%', marginTop: '14px', padding: '14px', borderRadius: '14px',
            border: 'none', background: isGenerating ? t.textMuted : t.primaryGrad,
            color: '#fff', fontSize: '15px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'opacity 0.2s', opacity: (!moodInput && !selectedEmotion) ? 0.5 : 1,
          }
        },
          isGenerating
            ? React.createElement(React.Fragment, null,
                React.createElement(window.lucide.Loader, { size: 16, color: '#fff' }),
                'Generating canvas…'
              )
            : React.createElement(React.Fragment, null,
                React.createElement(window.lucide.Zap, { size: 16, color: '#fff' }),
                'Generate Canvas'
              )
        ),
      ),

      // Recent captures
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
        React.createElement('h2', { style: { fontSize: '16px', fontWeight: '700', color: t.text } }, 'Recent Captures'),
        React.createElement('span', { style: { fontSize: '13px', color: t.primary, fontWeight: '600', cursor: 'pointer' } }, 'See all'),
      ),
      ...recentCaptures.map(cap =>
        React.createElement('div', {
          key: cap.id,
          onClick: () => { setSelectedCapture(cap); setActiveTab('canvas'); setCanvasSection('palette'); },
          style: {
            background: t.surface, borderRadius: '16px', padding: '13px',
            marginBottom: '10px', border: `1px solid ${t.border}`,
            boxShadow: t.cardShadow, cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, cap.emotion),
            React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, cap.date),
          ),
          React.createElement('div', { style: { display: 'flex', gap: '4px', marginBottom: '8px', borderRadius: '8px', overflow: 'hidden' } },
            ...cap.palette.map((col, i) =>
              React.createElement('div', { key: i, style: { height: '26px', flex: 1, background: col } })
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '6px' } },
            ...cap.toneWords.map(w =>
              React.createElement('span', {
                key: w,
                style: {
                  fontSize: '11px', color: t.textSec, background: t.surfaceAlt,
                  padding: '3px 8px', borderRadius: '10px', fontWeight: '500',
                }
              }, w)
            )
          ),
        )
      ),
    );

  // ─── CANVAS SCREEN ─────────────────────────────────────────────────────────
  const CanvasScreen = () => {
    const cap = selectedCapture || recentCaptures[0];
    const sections = ['palette', 'typography', 'brief', 'prompts'];

    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      // Sub-header
      React.createElement('div', {
        style: {
          padding: '8px 20px 0', background: t.surface,
          borderBottom: `1px solid ${t.border}`, flexShrink: 0,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
          React.createElement('div', {},
            React.createElement('h1', {
              style: { fontSize: '19px', fontWeight: '800', color: t.text, fontFamily: "'Bricolage Grotesque', sans-serif" }
            }, 'Mood Canvas'),
            React.createElement('p', { style: { fontSize: '12px', color: t.textSec, marginTop: '2px' } }, `"${cap.emotion}"`),
          ),
          React.createElement('button', {
            onClick: () => setActiveTab('export'),
            style: {
              padding: '7px 13px', borderRadius: '10px', border: 'none',
              background: t.primaryLight, color: t.primary, fontSize: '12px', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '5px',
            }
          },
            React.createElement(window.lucide.Share2, { size: 13, color: t.primary }), 'Export'
          ),
        ),
        React.createElement('div', { style: { display: 'flex', gap: '2px', overflowX: 'auto' } },
          ...sections.map(s =>
            React.createElement('button', {
              key: s,
              onClick: () => setCanvasSection(s),
              style: {
                padding: '8px 14px', border: 'none', background: 'transparent',
                color: canvasSection === s ? t.primary : t.textSec,
                fontSize: '12px', fontWeight: canvasSection === s ? '700' : '500',
                borderBottom: canvasSection === s ? `2.5px solid ${t.primary}` : '2.5px solid transparent',
                textTransform: 'capitalize', whiteSpace: 'nowrap', transition: 'all 0.15s',
              }
            }, s)
          )
        ),
      ),

      // Section content
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },

        canvasSection === 'palette' && React.createElement('div', {},
          React.createElement('div', { style: { borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', boxShadow: t.shadow } },
            React.createElement('div', { style: { display: 'flex', height: '72px' } },
              ...cap.palette.map((col, i) =>
                React.createElement('div', { key: i, style: { flex: 1, background: col } })
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' } },
            ...cap.palette.map((col, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: t.surface, borderRadius: '12px', padding: '10px 14px',
                  border: `1px solid ${t.border}`,
                }
              },
                React.createElement('div', { style: { width: '32px', height: '32px', borderRadius: '8px', background: col, flexShrink: 0 } }),
                React.createElement('div', {},
                  React.createElement('p', { style: { margin: 0, fontSize: '13px', fontWeight: '600', color: t.text } }, col.toUpperCase()),
                  React.createElement('p', { style: { margin: '1px 0 0', fontSize: '11px', color: t.textSec } },
                    ['Primary', 'Secondary', 'Accent', 'Light', 'Background'][i]
                  ),
                ),
                React.createElement(window.lucide.Copy, { size: 14, color: t.textMuted, style: { marginLeft: 'auto' } }),
              )
            )
          ),
          React.createElement('h3', { style: { fontSize: '14px', fontWeight: '700', color: t.text, marginBottom: '10px' } }, 'Tone Words'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } },
            ...[...cap.toneWords, 'luminous', 'restless', 'layered'].map(w =>
              React.createElement('span', {
                key: w,
                style: {
                  padding: '8px 16px', borderRadius: '20px',
                  background: t.primaryLight, color: t.primary, fontSize: '13px', fontWeight: '600',
                }
              }, w)
            )
          ),
        ),

        canvasSection === 'typography' && React.createElement('div', {},
          ...cap.fonts.map((font, i) =>
            React.createElement('div', {
              key: font,
              style: {
                background: t.surface, borderRadius: '16px', padding: '16px',
                marginBottom: '12px', border: `1px solid ${t.border}`,
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' } },
                React.createElement('span', { style: { fontSize: '11px', color: t.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' } },
                  i === 0 ? 'Display / Heading' : 'Body / Copy'
                ),
                React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, font),
              ),
              React.createElement('p', {
                style: {
                  fontFamily: `'${font}', sans-serif`,
                  fontSize: i === 0 ? '22px' : '14px',
                  fontWeight: i === 0 ? '800' : '400',
                  color: t.text, lineHeight: '1.35', margin: 0,
                }
              }, i === 0 ? 'The Art of Feeling' : 'Every emotion holds the seeds of a visual language waiting to be discovered and expressed through color, form, and texture.'),
              React.createElement('div', { style: { display: 'flex', gap: '6px', marginTop: '10px' } },
                ...['Regular', 'Medium', 'SemiBold', 'Bold'].map(w =>
                  React.createElement('span', {
                    key: w,
                    style: { fontSize: '10px', color: t.textSec, background: t.surfaceAlt, padding: '3px 7px', borderRadius: '6px' }
                  }, w)
                )
              ),
            )
          ),
          React.createElement('div', {
            style: { background: t.surfaceAlt, borderRadius: '16px', padding: '16px', border: `1px solid ${t.border}` }
          },
            React.createElement('p', { style: { fontSize: '11px', color: t.primary, fontWeight: '700', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'In Use'),
            React.createElement('h2', {
              style: { fontFamily: `'${cap.fonts[0]}', sans-serif`, fontSize: '17px', fontWeight: '700', color: t.text, marginBottom: '6px' }
            }, cap.emotion),
            React.createElement('p', {
              style: { fontFamily: `'${cap.fonts[1]}', sans-serif`, fontSize: '13px', color: t.textSec, lineHeight: '1.55', margin: 0 }
            }, 'A visual direction that captures the tension between overwhelming sensation and the quiet hope that makes it bearable.'),
          ),
        ),

        canvasSection === 'brief' && React.createElement('div', {},
          React.createElement('div', {
            style: { background: t.surface, borderRadius: '16px', padding: '16px', border: `1px solid ${t.border}` }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
              React.createElement('h3', { style: { fontSize: '15px', fontWeight: '800', color: t.text, fontFamily: "'Bricolage Grotesque', sans-serif" } }, 'Creative Brief'),
              React.createElement('span', { style: { fontSize: '11px', color: t.textSec, background: t.surfaceAlt, padding: '3px 8px', borderRadius: '8px' } }, '1-page'),
            ),
            ...[
              { label: 'Emotional Tone', value: cap.emotion },
              { label: 'Visual Direction', value: 'Layered depth with warm luminosity. Avoid flat or overly minimal aesthetics.' },
              { label: 'Mood Keywords', value: cap.toneWords.join(', ') },
              { label: 'Audience Feeling', value: 'Seen, understood, and gently energized.' },
              { label: 'Avoid', value: 'Cold blues, rigid grids, stark whitespace.' },
              { label: 'Suggested Use', value: 'Brand identity, editorial layout, event mood board' },
            ].map((item, idx, arr) =>
              React.createElement('div', {
                key: item.label,
                style: {
                  paddingBottom: '12px',
                  marginBottom: idx < arr.length - 1 ? '12px' : 0,
                  borderBottom: idx < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                }
              },
                React.createElement('p', { style: { fontSize: '11px', color: t.primary, fontWeight: '700', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.7px' } }, item.label),
                React.createElement('p', { style: { fontSize: '13px', color: t.text, margin: 0, lineHeight: '1.45' } }, item.value),
              )
            ),
          ),
        ),

        canvasSection === 'prompts' && React.createElement('div', {},
          React.createElement('p', { style: { fontSize: '13px', color: t.textSec, marginBottom: '14px', lineHeight: '1.5' } },
            'Use these as search terms or AI generation prompts:'
          ),
          ...[
            {
              label: 'Image Search',
              icon: window.lucide.Search,
              prompts: ['golden hour through gauze curtains', 'layered silk textures warm light', 'studio pottery soft shadows', 'fog in forest morning light'],
            },
            {
              label: 'AI Generation',
              icon: window.lucide.Zap,
              prompts: ['soft volumetric light, warm violet, cinematic mood', 'editorial fashion, moody palette, tender expression', 'abstract color study, flowing forms, hopeful tension'],
            },
            {
              label: 'Pinterest Keywords',
              icon: window.lucide.Bookmark,
              prompts: ['"emotional editorial"', '"warm maximalism"', '"tender chaos aesthetic"', '"hopeful melancholy palette"'],
            },
          ].map(section =>
            React.createElement('div', {
              key: section.label,
              style: { background: t.surface, borderRadius: '16px', padding: '14px', marginBottom: '12px', border: `1px solid ${t.border}` }
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' } },
                React.createElement(section.icon, { size: 14, color: t.primary }),
                React.createElement('p', { style: { fontSize: '13px', fontWeight: '700', color: t.text, margin: 0 } }, section.label),
              ),
              ...section.prompts.map((p, i, arr) =>
                React.createElement('div', {
                  key: p,
                  style: {
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 0',
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                  }
                },
                  React.createElement('p', { style: { flex: 1, margin: 0, fontSize: '12px', color: t.textSec, lineHeight: '1.4' } }, p),
                  React.createElement(window.lucide.Copy, { size: 13, color: t.textMuted }),
                )
              ),
            )
          ),
        ),
      ),
    );
  };

  // ─── TIMELINE SCREEN ───────────────────────────────────────────────────────
  const TimelineScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 20px 12px' } },
      React.createElement('div', { style: { paddingBottom: '14px' } },
        React.createElement('h1', { style: { fontSize: '22px', fontWeight: '800', color: t.text, fontFamily: "'Bricolage Grotesque', sans-serif" } }, 'Feeling Timeline'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec, marginTop: '2px' } }, 'Your emotional patterns over time'),
      ),

      // Insight card
      React.createElement('div', {
        style: { background: t.primaryGrad, borderRadius: '20px', padding: '16px', marginBottom: '14px' }
      },
        React.createElement('p', { style: { fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.65)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.8px' } }, 'Weekly Insight'),
        React.createElement('p', { style: { fontSize: '15px', fontWeight: '700', color: '#fff', margin: '0 0 6px', lineHeight: '1.3' } }, 'You feel most creative after introspective moods'),
        React.createElement('p', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.75)', margin: 0 } }, 'Your best canvases follow melancholic or searching emotions — lean into those states.'),
      ),

      // Pattern chips
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' } },
        ...[
          { label: 'Purple tones', count: '5× this week', color: '#7C3AED' },
          { label: 'Soft typography', count: 'recurring', color: '#10B981' },
          { label: 'Low contrast', count: '3 briefs', color: '#F59E0B' },
        ].map(b =>
          React.createElement('div', {
            key: b.label,
            style: {
              background: t.surface, borderRadius: '12px', padding: '10px 12px',
              border: `1px solid ${t.border}`, borderLeft: `3px solid ${b.color}`, flexShrink: 0,
            }
          },
            React.createElement('p', { style: { margin: 0, fontSize: '12px', fontWeight: '600', color: t.text } }, b.label),
            React.createElement('p', { style: { margin: '2px 0 0', fontSize: '11px', color: t.textSec } }, b.count),
          )
        )
      ),

      React.createElement('h2', { style: { fontSize: '15px', fontWeight: '700', color: t.text, marginBottom: '12px' } }, 'Captures'),
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('div', {
          style: { position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: t.border }
        }),
        ...timelineData.map((entry, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '10px' }
          },
            React.createElement('div', {
              style: {
                width: '16px', height: '16px', borderRadius: '50%', background: entry.color,
                flexShrink: 0, marginTop: '12px', zIndex: 1,
                border: `2px solid ${t.bg}`, boxShadow: `0 0 0 2px ${entry.color}55`,
              }
            }),
            React.createElement('div', {
              onClick: () => { setSelectedCapture(recentCaptures[i % recentCaptures.length]); setActiveTab('canvas'); },
              style: {
                flex: 1, background: t.surface, borderRadius: '14px', padding: '11px 14px',
                border: `1px solid ${t.border}`, cursor: 'pointer',
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
                React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: t.text } }, entry.emotion),
                React.createElement('span', { style: { fontSize: '11px', color: t.textMuted } }, entry.date),
              ),
              React.createElement('div', { style: { height: '4px', background: t.border, borderRadius: '2px', marginBottom: '6px' } },
                React.createElement('div', { style: { height: '4px', width: `${entry.intensity}%`, background: entry.color, borderRadius: '2px' } }),
              ),
              React.createElement('span', { style: { fontSize: '11px', color: t.textSec } }, `Intensity ${entry.intensity}%`),
            ),
          )
        ),
      ),
    );

  // ─── EXPORT SCREEN ─────────────────────────────────────────────────────────
  const ExportScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 20px 12px' } },
      React.createElement('div', { style: { paddingBottom: '14px' } },
        React.createElement('h1', { style: { fontSize: '22px', fontWeight: '800', color: t.text, fontFamily: "'Bricolage Grotesque', sans-serif" } }, 'Export & Share'),
        React.createElement('p', { style: { fontSize: '13px', color: t.textSec, marginTop: '2px' } }, '3 boards ready to export'),
      ),

      // Format tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: '4px', marginBottom: '16px',
          background: t.surface, padding: '4px', borderRadius: '14px', border: `1px solid ${t.border}`,
        }
      },
        ...['board', 'brief', 'palette'].map(f =>
          React.createElement('button', {
            key: f, onClick: () => setExportFormat(f),
            style: {
              flex: 1, padding: '8px', borderRadius: '10px', border: 'none',
              background: exportFormat === f ? t.primary : 'transparent',
              color: exportFormat === f ? '#fff' : t.textSec,
              fontSize: '12px', fontWeight: '600', textTransform: 'capitalize', transition: 'all 0.2s',
            }
          }, f)
        )
      ),

      ...recentCaptures.map(cap =>
        React.createElement('div', {
          key: cap.id,
          style: {
            background: t.surface, borderRadius: '18px', overflow: 'hidden',
            marginBottom: '14px', border: `1px solid ${t.border}`, boxShadow: t.cardShadow,
          }
        },
          // Preview strip
          React.createElement('div', { style: { height: '72px', display: 'flex', position: 'relative' } },
            ...cap.palette.slice(0, 5).map((col, i) =>
              React.createElement('div', { key: i, style: { flex: 1, background: col } })
            ),
            React.createElement('div', {
              style: {
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }
            },
              React.createElement('span', {
                style: { color: '#fff', fontSize: '12px', fontWeight: '700', textShadow: '0 1px 6px rgba(0,0,0,0.5)', padding: '4px 10px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px' }
              }, cap.emotion)
            ),
          ),
          React.createElement('div', { style: { padding: '12px 14px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
              React.createElement('p', { style: { fontSize: '13px', fontWeight: '600', color: t.text, margin: 0 } }, cap.date),
              React.createElement('div', { style: { display: 'flex', gap: '4px' } },
                ...cap.toneWords.slice(0, 2).map(w =>
                  React.createElement('span', {
                    key: w,
                    style: { fontSize: '10px', background: t.primaryLight, color: t.primary, padding: '2px 7px', borderRadius: '8px', fontWeight: '600' }
                  }, w)
                )
              ),
            ),
            React.createElement('div', { style: { display: 'flex', gap: '8px' } },
              ...[
                { icon: window.lucide.Download, label: 'PNG' },
                { icon: window.lucide.FileText, label: 'PDF' },
                { icon: window.lucide.Link2, label: 'Link' },
                { icon: window.lucide.LayoutGrid, label: 'Figma' },
              ].map(action =>
                React.createElement('button', {
                  key: action.label,
                  style: {
                    flex: 1, padding: '8px 4px', borderRadius: '10px',
                    border: `1px solid ${t.border}`, background: t.surfaceAlt,
                    color: t.textSec, fontSize: '11px', fontWeight: '600',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                  }
                },
                  React.createElement(action.icon, { size: 14, color: t.primary }),
                  action.label,
                )
              )
            ),
          ),
        )
      ),
    );

  // ─── SETTINGS SCREEN ───────────────────────────────────────────────────────
  const SettingsScreen = () =>
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '4px 20px 12px' } },
      React.createElement('div', { style: { paddingBottom: '14px' } },
        React.createElement('h1', { style: { fontSize: '22px', fontWeight: '800', color: t.text, fontFamily: "'Bricolage Grotesque', sans-serif" } }, 'Settings'),
      ),

      // Profile
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: '20px', padding: '16px',
          border: `1px solid ${t.border}`, marginBottom: '14px',
          display: 'flex', alignItems: 'center', gap: '14px',
        }
      },
        React.createElement('div', {
          style: {
            width: '50px', height: '50px', borderRadius: '25px', background: t.primaryGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          React.createElement('span', { style: { fontSize: '20px', fontWeight: '800', color: '#fff' } }, 'A'),
        ),
        React.createElement('div', {},
          React.createElement('p', { style: { fontSize: '16px', fontWeight: '700', color: t.text } }, 'Alex Morgan'),
          React.createElement('p', { style: { fontSize: '12px', color: t.textSec, marginTop: '1px' } }, 'alex@studio.co · Pro Plan'),
        ),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted, style: { marginLeft: 'auto' } }),
      ),

      // Theme toggle
      React.createElement('div', {
        style: { background: t.surface, borderRadius: '20px', padding: '4px', border: `1px solid ${t.border}`, marginBottom: '14px' }
      },
        React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: t.textMuted, padding: '10px 14px 4px', textTransform: 'uppercase', letterSpacing: '0.7px' } }, 'Appearance'),
        React.createElement('div', {
          onClick: () => setIsDark(!isDark),
          style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', cursor: 'pointer', borderRadius: '12px' }
        },
          React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.primary }),
          React.createElement('span', { style: { flex: 1, fontSize: '14px', fontWeight: '500', color: t.text } },
            isDark ? 'Dark Mode' : 'Light Mode'
          ),
          React.createElement('div', {
            style: {
              width: '44px', height: '24px', borderRadius: '12px',
              background: isDark ? t.primary : t.border, position: 'relative', transition: 'background 0.25s',
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: '3px', left: isDark ? '23px' : '3px',
                width: '18px', height: '18px', borderRadius: '9px',
                background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }
            }),
          ),
        ),
      ),

      // Settings groups
      ...[
        {
          label: 'Preferences',
          items: [
            { icon: window.lucide.Cpu, label: 'AI Learning', desc: 'Learn from my emotional patterns', toggle: true, on: true },
            { icon: window.lucide.Bell, label: 'Mood Reminders', desc: 'Daily capture prompts at 9am', toggle: true, on: false },
            { icon: window.lucide.Layers, label: 'Default Style', desc: 'Warm & Expressive', toggle: false },
          ]
        },
        {
          label: 'Data & Export',
          items: [
            { icon: window.lucide.Database, label: 'Export All Data', desc: 'Download your mood library', toggle: false },
            { icon: window.lucide.LayoutGrid, label: 'Figma Integration', desc: 'Connected', toggle: false },
            { icon: window.lucide.RefreshCw, label: 'Sync Status', desc: 'Last synced just now', toggle: false },
          ]
        },
      ].map(section =>
        React.createElement('div', {
          key: section.label,
          style: { background: t.surface, borderRadius: '20px', padding: '4px', border: `1px solid ${t.border}`, marginBottom: '14px' }
        },
          React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: t.textMuted, padding: '10px 14px 4px', textTransform: 'uppercase', letterSpacing: '0.7px' } }, section.label),
          ...section.items.map(item =>
            React.createElement('div', {
              key: item.label,
              style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', cursor: 'pointer', borderRadius: '12px' }
            },
              React.createElement('div', {
                style: {
                  width: '34px', height: '34px', borderRadius: '10px', background: t.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              },
                React.createElement(item.icon, { size: 16, color: t.primary }),
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontSize: '14px', fontWeight: '500', color: t.text } }, item.label),
                React.createElement('p', { style: { fontSize: '11px', color: t.textSec, marginTop: '1px' } }, item.desc),
              ),
              item.toggle
                ? React.createElement('div', {
                    style: {
                      width: '40px', height: '22px', borderRadius: '11px',
                      background: item.on ? t.primary : t.border, position: 'relative', flexShrink: 0,
                    }
                  },
                    React.createElement('div', {
                      style: {
                        position: 'absolute', top: '3px', left: item.on ? '21px' : '3px',
                        width: '16px', height: '16px', borderRadius: '8px', background: '#fff', transition: 'left 0.2s',
                      }
                    }),
                  )
                : React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted }),
            )
          ),
        )
      ),
    );

  // ─── ROOT RENDER ───────────────────────────────────────────────────────────
  const screens = {
    home: HomeScreen,
    canvas: CanvasScreen,
    timeline: TimelineScreen,
    export: ExportScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screens[activeTab];

  return React.createElement('div', {
    style: {
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#e4e0f0', fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    React.createElement('div', {
      style: {
        width: '375px', height: '812px', background: t.bg,
        borderRadius: '44px', overflow: 'hidden', position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 10px #1a1228, 0 0 0 12px #2e1f4a',
        display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease',
      }
    },
      React.createElement(StatusBar),
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
        React.createElement(CurrentScreen),
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg, borderTop: `1px solid ${t.border}`,
          padding: '8px 0 20px', display: 'flex', justifyContent: 'space-around',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.05)', flexShrink: 0,
        }
      },
        ...tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              padding: '6px 12px', borderRadius: '12px', cursor: 'pointer',
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
              transition: 'background 0.15s',
            }
          },
            React.createElement(tab.icon, {
              size: 21,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: '10px', fontWeight: activeTab === tab.id ? '700' : '500',
                color: activeTab === tab.id ? t.primary : t.textMuted,
              }
            }, tab.label),
          )
        ),
      ),
    ),
  );
}
