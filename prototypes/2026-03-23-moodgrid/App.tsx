const { useState, useEffect, useRef } = React;

// Load Google Fonts
const fontStyle = document.createElement('style');
fontStyle.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;
document.head.appendChild(fontStyle);

const themes = {
  light: {
    bg: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#F0EBFF',
    border: '#E5DEFF',
    text: '#1A0A3D',
    textSec: '#6B5A8E',
    textMuted: '#A094BB',
    primary: '#7C3AED',
    primaryLight: '#EDE9FE',
    primaryGrad: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    success: '#10B981',
    successLight: '#D1FAE5',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    card: '#FFFFFF',
    navBg: '#FFFFFF',
    statusBar: '#7C3AED',
    shadow: 'rgba(124,58,237,0.12)',
  },
  dark: {
    bg: '#0D0720',
    surface: '#1A0F33',
    surfaceAlt: '#231545',
    border: '#2D1B55',
    text: '#F0EBFF',
    textSec: '#B8A8D8',
    textMuted: '#6B5A8E',
    primary: '#A855F7',
    primaryLight: '#2D1B55',
    primaryGrad: 'linear-gradient(135deg, #7C3AED, #C084FC)',
    accent: '#FBBF24',
    accentLight: '#3D2B0A',
    success: '#34D399',
    successLight: '#042F20',
    error: '#F87171',
    errorLight: '#2D0A0A',
    card: '#1A0F33',
    navBg: '#1A0F33',
    statusBar: '#A855F7',
    shadow: 'rgba(0,0,0,0.4)',
  }
};

const font = "'Plus Jakarta Sans', sans-serif";

// ── Micro-interaction hook ──────────────────────────────────────────────────
function usePressable() {
  const [pressed, setPressed] = useState(false);
  return {
    pressed,
    handlers: {
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onMouseLeave: () => setPressed(false),
      onTouchStart: () => setPressed(true),
      onTouchEnd: () => setPressed(false),
    }
  };
}

// ── Status Bar ──────────────────────────────────────────────────────────────
function StatusBar({ t, isDark, onToggle }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return React.createElement('div', {
    style: {
      height: 44,
      background: t.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      fontFamily: font,
      position: 'relative',
      zIndex: 10,
    }
  },
    React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, time),
    React.createElement('div', { style: { width: 120, height: 32, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6 } }),
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' },
      onClick: onToggle
    },
      React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, {
        size: 14,
        color: t.primary,
        strokeWidth: 2.5
      }),
      React.createElement(window.lucide.Wifi, { size: 14, color: t.text, strokeWidth: 2 }),
      React.createElement('div', { style: { width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 2px' } },
        React.createElement('div', { style: { width: 14, height: 7, background: t.success, borderRadius: 2 } })
      )
    )
  );
}

// ── Pill Button ─────────────────────────────────────────────────────────────
function PillButton({ label, active, onClick, t, small }) {
  const { pressed, handlers } = usePressable();
  return React.createElement('div', {
    ...handlers,
    onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: small ? '5px 12px' : '8px 16px',
      borderRadius: 20,
      cursor: 'pointer',
      background: active ? t.primaryGrad : t.surfaceAlt,
      color: active ? '#fff' : t.textSec,
      fontSize: small ? 11 : 13,
      fontWeight: 600,
      fontFamily: font,
      border: `1.5px solid ${active ? 'transparent' : t.border}`,
      transition: 'all 0.2s',
      transform: pressed ? 'scale(0.95)' : 'scale(1)',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }
  }, label);
}

// ── Card ────────────────────────────────────────────────────────────────────
function Card({ children, t, style = {} }) {
  return React.createElement('div', {
    style: {
      background: t.card,
      borderRadius: 16,
      padding: 16,
      border: `1px solid ${t.border}`,
      boxShadow: `0 2px 12px ${t.shadow}`,
      ...style
    }
  }, children);
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME SCREEN — Emotional Brief Builder
// ══════════════════════════════════════════════════════════════════════════════
function HomeScreen({ t }) {
  const [selectedMoods, setSelectedMoods] = useState(['calm', 'premium']);
  const [audience, setAudience] = useState('small-biz');
  const [customInput, setCustomInput] = useState('');
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const moodChips = [
    { id: 'calm', label: 'Calm' },
    { id: 'premium', label: 'Premium' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'playful', label: 'Playful' },
    { id: 'warm', label: 'Warm' },
    { id: 'bold', label: 'Bold' },
    { id: 'serene', label: 'Serene' },
    { id: 'trustworthy', label: 'Trustworthy' },
    { id: 'energetic', label: 'Energetic' },
    { id: 'minimal', label: 'Minimal' },
  ];

  const audiences = [
    { id: 'small-biz', label: 'Small Business' },
    { id: 'creator', label: 'Creator' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'tech', label: 'Tech' },
  ];

  const briefResults = {
    'calm+premium': { summary: 'Calm & Premium', palette: ['#1E1B4B', '#7C3AED', '#C4B5FD', '#F5F3FF'], tone: 'Deep violet with soft lavender accents signals authority without aggression.' },
    'warm+playful': { summary: 'Warm & Playful', palette: ['#92400E', '#F59E0B', '#FCD34D', '#FEF9C3'], tone: 'Amber-gold warmth with playful contrast — approachable and joyful.' },
    'urgent+trustworthy': { summary: 'Urgent & Trustworthy', palette: ['#1E40AF', '#3B82F6', '#EF4444', '#FEE2E2'], tone: 'Bold blue authority with red urgency signals — credible and time-sensitive.' },
  };

  function toggleMood(id) {
    setSelectedMoods(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  function generate() {
    setLoading(true);
    setGenerated(null);
    setTimeout(() => {
      const key = selectedMoods.slice(0, 2).join('+');
      const result = briefResults[key] || {
        summary: selectedMoods.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' & '),
        palette: ['#7C3AED', '#A855F7', '#C4B5FD', '#EDE9FE'],
        tone: 'A custom emotional blend tailored to your selected moods and audience context.'
      };
      setGenerated(result);
      setLoading(false);
    }, 1200);
  }

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', padding: '0 0 80px' }
  },
    // Header
    React.createElement('div', {
      style: { padding: '20px 20px 0', background: t.bg }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        React.createElement('div', {
          style: {
            width: 32, height: 32, borderRadius: 10,
            background: t.primaryGrad,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement(window.lucide.Sparkles, { size: 16, color: '#fff', strokeWidth: 2.5 })
        ),
        React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, 'Brief Builder')
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSec, margin: 0 } },
        'Describe a feeling, not just a look.'
      )
    ),

    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 } },

      // Mood selector
      React.createElement(Card, { t },
        React.createElement('div', { style: { marginBottom: 10 } },
          React.createElement('p', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px' } }, 'Target Mood'),
          React.createElement('p', { style: { fontFamily: font, fontSize: 11, color: t.textSec, margin: 0 } }, 'Pick up to 3 feelings')
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          moodChips.map(chip =>
            React.createElement(PillButton, {
              key: chip.id,
              label: chip.label,
              active: selectedMoods.includes(chip.id),
              onClick: () => toggleMood(chip.id),
              t,
              small: true
            })
          )
        )
      ),

      // Audience
      React.createElement(Card, { t },
        React.createElement('p', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' } }, 'Audience'),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          audiences.map(a =>
            React.createElement(PillButton, {
              key: a.id,
              label: a.label,
              active: audience === a.id,
              onClick: () => setAudience(a.id),
              t,
              small: true
            })
          )
        )
      ),

      // Custom prompt
      React.createElement(Card, { t },
        React.createElement('p', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' } }, 'Describe Your Vision'),
        React.createElement('textarea', {
          value: customInput,
          onChange: e => setCustomInput(e.target.value),
          placeholder: 'e.g. "trustworthy but not boring, for a wellness startup launch"',
          style: {
            width: '100%',
            minHeight: 72,
            background: t.surfaceAlt,
            border: `1.5px solid ${t.border}`,
            borderRadius: 10,
            padding: '10px 12px',
            fontFamily: font,
            fontSize: 13,
            color: t.text,
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            lineHeight: 1.5,
          }
        })
      ),

      // Generate button
      React.createElement('div', {
        onClick: generate,
        style: {
          background: t.primaryGrad,
          borderRadius: 14,
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          boxShadow: `0 4px 16px ${t.shadow}`,
          transition: 'opacity 0.2s',
          opacity: loading ? 0.7 : 1,
        }
      },
        loading
          ? React.createElement(window.lucide.Loader2, { size: 18, color: '#fff', style: { animation: 'spin 1s linear infinite' } })
          : React.createElement(window.lucide.Wand2, { size: 18, color: '#fff', strokeWidth: 2.5 }),
        React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#fff' } },
          loading ? 'Generating Brief…' : 'Generate Brief'
        )
      ),

      // Result
      generated && React.createElement(Card, { t, style: { border: `2px solid ${t.primary}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('span', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.text } }, generated.summary),
          React.createElement('div', {
            style: {
              background: t.primaryLight,
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontFamily: font,
              fontWeight: 600,
              color: t.primary
            }
          }, '✓ Brief Ready')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 12 } },
          generated.palette.map((color, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1,
                height: 36,
                borderRadius: 8,
                background: color,
                boxShadow: `0 2px 6px rgba(0,0,0,0.15)`
              }
            })
          )
        ),
        React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textSec, margin: 0, lineHeight: 1.6 } }, generated.tone)
      )
    )
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PALETTE SCREEN — Palette Translator
// ══════════════════════════════════════════════════════════════════════════════
function PaletteScreen({ t }) {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(null);

  const palettes = [
    {
      name: 'Calm & Premium',
      emotion: 'Serene Authority',
      tag: 'Wellness · Luxury',
      colors: [
        { hex: '#1E1B4B', label: 'Deep Space', role: 'Primary' },
        { hex: '#7C3AED', label: 'Royal Violet', role: 'Accent' },
        { hex: '#C4B5FD', label: 'Soft Lavender', role: 'Highlight' },
        { hex: '#F5F3FF', label: 'Ghost White', role: 'Background' },
      ],
      contrast: 'AAA',
      mood: '😌',
    },
    {
      name: 'Warm & Homemade',
      emotion: 'Cozy Trust',
      tag: 'Food · Bakery · Local',
      colors: [
        { hex: '#92400E', label: 'Espresso', role: 'Primary' },
        { hex: '#F59E0B', label: 'Golden Hour', role: 'Accent' },
        { hex: '#FCD34D', label: 'Butter Yellow', role: 'Highlight' },
        { hex: '#FFFBEB', label: 'Cream', role: 'Background' },
      ],
      contrast: 'AA',
      mood: '🧁',
    },
    {
      name: 'Bold & Urgent',
      emotion: 'Action Energy',
      tag: 'Sales · Promo · Tech',
      colors: [
        { hex: '#111827', label: 'Midnight', role: 'Primary' },
        { hex: '#DC2626', label: 'Alert Red', role: 'Accent' },
        { hex: '#F9A8D4', label: 'Soft Pink', role: 'Highlight' },
        { hex: '#FFF1F2', label: 'Rose Mist', role: 'Background' },
      ],
      contrast: 'AA',
      mood: '⚡',
    },
    {
      name: 'Playful but Sharp',
      emotion: 'Fun Professionalism',
      tag: 'Kids · Education · App',
      colors: [
        { hex: '#0F172A', label: 'Navy Dark', role: 'Primary' },
        { hex: '#06B6D4', label: 'Cyan Pop', role: 'Accent' },
        { hex: '#A5F3FC', label: 'Sky Foam', role: 'Highlight' },
        { hex: '#F0FDFF', label: 'Ice White', role: 'Background' },
      ],
      contrast: 'AAA',
      mood: '🎨',
    },
  ];

  const pal = palettes[selected];

  function copyHex(hex) {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  }

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', padding: '0 0 80px' }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px', background: t.bg } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        React.createElement('div', {
          style: { width: 32, height: 32, borderRadius: 10, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement(window.lucide.Palette, { size: 16, color: '#fff', strokeWidth: 2.5 })
        ),
        React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, 'Palette Lab')
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSec, margin: 0 } }, 'Colors that communicate intent.')
    ),

    // Palette tabs
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' }
    },
      palettes.map((p, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setSelected(i),
          style: {
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            opacity: selected === i ? 1 : 0.55,
            transition: 'opacity 0.2s',
          }
        },
          React.createElement('div', {
            style: {
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${p.colors[0].hex}, ${p.colors[1].hex})`,
              border: selected === i ? `2.5px solid ${t.primary}` : `2.5px solid transparent`,
              boxShadow: selected === i ? `0 4px 12px ${t.shadow}` : 'none',
            }
          }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 10, color: t.textSec, fontWeight: 600, textAlign: 'center', maxWidth: 52, lineHeight: 1.2 } }, p.mood)
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

      // Main palette card
      React.createElement(Card, { t },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontFamily: font, fontSize: 16, fontWeight: 800, color: t.text, margin: '0 0 2px' } }, pal.name),
            React.createElement('span', { style: { fontFamily: font, fontSize: 11, color: t.textSec } }, pal.tag)
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
            React.createElement('span', { style: { fontFamily: font, fontSize: 22 } }, pal.mood),
            React.createElement('div', {
              style: {
                background: t.successLight,
                color: t.success,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: font,
                padding: '2px 7px',
                borderRadius: 6,
              }
            }, `WCAG ${pal.contrast}`)
          )
        ),
        // Color swatches
        React.createElement('div', { style: { display: 'flex', borderRadius: 12, overflow: 'hidden', height: 56, marginBottom: 14 } },
          pal.colors.map((c, i) =>
            React.createElement('div', {
              key: i,
              style: { flex: 1, background: c.hex }
            })
          )
        ),
        // Color rows
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          pal.colors.map((c, i) =>
            React.createElement('div', {
              key: i,
              style: { display: 'flex', alignItems: 'center', gap: 10 }
            },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 8, background: c.hex, flexShrink: 0 } }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.text } }, c.label),
                React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textSec } }, c.role)
              ),
              React.createElement('div', {
                onClick: () => copyHex(c.hex),
                style: {
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: copied === c.hex ? t.success : t.primary,
                  cursor: 'pointer',
                  background: copied === c.hex ? t.successLight : t.primaryLight,
                  padding: '4px 8px',
                  borderRadius: 6,
                  transition: 'all 0.2s',
                }
              }, copied === c.hex ? '✓ Copied' : c.hex)
            )
          )
        )
      ),

      // Emotion note
      React.createElement(Card, { t, style: { background: t.primaryLight, border: `1.5px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement(window.lucide.BrainCircuit, { size: 18, color: t.primary, strokeWidth: 2, style: { flexShrink: 0, marginTop: 2 } }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.primary, marginBottom: 2 } }, 'Emotional Logic'),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textSec, margin: 0, lineHeight: 1.6 } },
              `"${pal.emotion}" — This combination is calibrated to signal the right feeling before a single word is read. Use it consistently across all touchpoints.`
            )
          )
        )
      )
    )
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TYPE SCREEN — Typography Matchmaker
// ══════════════════════════════════════════════════════════════════════════════
function TypeScreen({ t }) {
  const [selectedPair, setSelectedPair] = useState(0);

  const pairs = [
    {
      heading: 'Playfair Display',
      body: 'DM Sans',
      mood: 'Premium & Editorial',
      useCase: 'Luxury brands, boutiques, editorial layouts',
      tag: '🏛️',
      headingStyle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 },
      sample: 'Crafted with intention, worn with confidence.',
    },
    {
      heading: 'Space Grotesk',
      body: 'Inter',
      mood: 'Modern & Technical',
      useCase: 'SaaS, fintech, productivity apps',
      tag: '⚙️',
      headingStyle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 },
      sample: 'Data-driven design for the next generation.',
    },
    {
      heading: 'Sora',
      body: 'Nunito',
      mood: 'Friendly & Approachable',
      useCase: 'Community apps, wellness, social platforms',
      tag: '☀️',
      headingStyle: { fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700 },
      sample: 'Building connections, one story at a time.',
    },
    {
      heading: 'Fraunces',
      body: 'Source Serif 4',
      mood: 'Warm & Artisanal',
      useCase: 'Food brands, cafés, independent makers',
      tag: '🌿',
      headingStyle: { fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700 },
      sample: 'Honest ingredients. Unhurried process.',
    },
  ];

  const pair = pairs[selectedPair];

  const scaleItems = [
    { name: 'Display', size: 28, weight: 800 },
    { name: 'H1', size: 22, weight: 700 },
    { name: 'H2', size: 18, weight: 600 },
    { name: 'Body', size: 14, weight: 400 },
    { name: 'Small', size: 12, weight: 400 },
    { name: 'Caption', size: 10, weight: 500 },
  ];

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', padding: '0 0 80px' }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(window.lucide.Type, { size: 16, color: '#fff', strokeWidth: 2.5 })
        ),
        React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, 'Type Studio')
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSec, margin: 0 } }, 'Find pairings that match the message.')
    ),

    // Pair selector
    React.createElement('div', { style: { padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' } },
      pairs.map((p, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setSelectedPair(i),
          style: {
            flexShrink: 0,
            padding: '8px 14px',
            borderRadius: 12,
            cursor: 'pointer',
            background: selectedPair === i ? t.primaryGrad : t.surface,
            border: `1.5px solid ${selectedPair === i ? 'transparent' : t.border}`,
            fontFamily: font,
            fontSize: 11,
            fontWeight: 600,
            color: selectedPair === i ? '#fff' : t.textSec,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            transition: 'all 0.2s',
          }
        },
          React.createElement('span', { style: { fontSize: 16 } }, p.tag),
          React.createElement('span', null, p.mood.split(' ')[0])
        )
      )
    ),

    React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

      // Preview card
      React.createElement(Card, { t },
        React.createElement('div', {
          style: {
            background: t.surfaceAlt,
            borderRadius: 10,
            padding: 16,
            marginBottom: 14,
            textAlign: 'center',
          }
        },
          React.createElement('p', {
            style: {
              ...pair.headingStyle,
              color: t.text,
              margin: '0 0 8px',
              lineHeight: 1.3,
            }
          }, pair.sample),
          React.createElement('p', {
            style: {
              fontFamily: `'${pair.body}', sans-serif`,
              fontSize: 13,
              color: t.textSec,
              margin: 0,
              lineHeight: 1.6,
            }
          }, 'Supporting copy that breathes. Clear, legible, and harmonious with the headline above.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 } }, 'Heading'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.text } }, pair.heading)
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: font, fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 } }, 'Body'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.text } }, pair.body)
          )
        )
      ),

      // Type scale
      React.createElement(Card, { t },
        React.createElement('div', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 } }, 'Type Scale'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          scaleItems.map(item =>
            React.createElement('div', {
              key: item.name,
              style: { display: 'flex', alignItems: 'center', gap: 10 }
            },
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 9, fontWeight: 600, color: t.textMuted, width: 40, textTransform: 'uppercase' }
              }, item.name),
              React.createElement('span', {
                style: {
                  fontFamily: pair.heading.includes('Playfair') || pair.heading.includes('Fraunces') ? `'${pair.heading}', serif` : `'${pair.heading}', sans-serif`,
                  fontSize: item.size,
                  fontWeight: item.weight,
                  color: t.text,
                  lineHeight: 1,
                }
              }, 'The quick fox'),
              React.createElement('span', {
                style: { fontFamily: font, fontSize: 9, color: t.textMuted, marginLeft: 'auto' }
              }, `${item.size}px`)
            )
          )
        )
      ),

      // Use case
      React.createElement(Card, { t, style: { background: t.accentLight, border: `1.5px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement(window.lucide.Target, { size: 18, color: t.accent, strokeWidth: 2, style: { flexShrink: 0, marginTop: 2 } }),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 2 } }, 'Best For'),
            React.createElement('p', { style: { fontFamily: font, fontSize: 12, color: t.textSec, margin: 0 } }, pair.useCase)
          )
        )
      )
    )
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CHECK SCREEN — Live Mood Check
// ══════════════════════════════════════════════════════════════════════════════
function CheckScreen({ t }) {
  const [score, setScore] = useState(null);
  const [checking, setChecking] = useState(false);
  const [targetMood, setTargetMood] = useState('calm-premium');

  const moods = [
    { id: 'calm-premium', label: 'Calm & Premium' },
    { id: 'warm-playful', label: 'Warm & Playful' },
    { id: 'bold-urgent', label: 'Bold & Urgent' },
  ];

  const mockResults = {
    'calm-premium': {
      overall: 87,
      flags: [
        { type: 'pass', label: 'Color Temperature', detail: 'Cool violet tones align with calm authority.' },
        { type: 'pass', label: 'Whitespace', detail: 'Generous spacing conveys premium positioning.' },
        { type: 'warn', label: 'Font Weight', detail: 'Heading is too light — increase to 700 for premium signal.' },
        { type: 'fail', label: 'CTA Color', detail: 'Red accent conflicts with calm palette — switch to deep violet.' },
      ]
    },
    'warm-playful': {
      overall: 72,
      flags: [
        { type: 'pass', label: 'Warmth Score', detail: 'Amber and honey tones read as inviting and homemade.' },
        { type: 'warn', label: 'Font Choice', detail: 'Current font reads too formal — try Nunito or Quicksand.' },
        { type: 'warn', label: 'Icon Style', detail: 'Sharp icons feel clinical — switch to rounded icon set.' },
        { type: 'fail', label: 'Background', detail: 'Pure white feels cold — use cream (#FFFBEB) as base.' },
      ]
    },
    'bold-urgent': {
      overall: 91,
      flags: [
        { type: 'pass', label: 'Contrast Ratio', detail: 'High contrast signals urgency effectively.' },
        { type: 'pass', label: 'Visual Hierarchy', detail: 'CTA stands out as intended for action-first layout.' },
        { type: 'pass', label: 'Typography Weight', detail: 'Heavy headline communicates urgency without aggression.' },
        { type: 'warn', label: 'Body Density', detail: 'Body text is too dense — add 4px line spacing for readability.' },
      ]
    },
  };

  function runCheck() {
    setChecking(true);
    setScore(null);
    setTimeout(() => {
      setScore(mockResults[targetMood]);
      setChecking(false);
    }, 1600);
  }

  const flagColors = {
    pass: { bg: t.successLight, text: t.success, icon: window.lucide.CheckCircle2 },
    warn: { bg: t.accentLight, text: t.accent, icon: window.lucide.AlertTriangle },
    fail: { bg: t.errorLight, text: t.error, icon: window.lucide.XCircle },
  };

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', padding: '0 0 80px' }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(window.lucide.ScanLine, { size: 16, color: '#fff', strokeWidth: 2.5 })
        ),
        React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, 'Mood Check')
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSec, margin: 0 } }, 'Score your design against your emotional goal.')
    ),

    React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

      // Mock design preview
      React.createElement(Card, { t },
        React.createElement('div', { style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 } }, 'Draft Design'),
        React.createElement('div', {
          style: {
            borderRadius: 10,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1E1B4B 0%, #7C3AED 60%, #C4B5FD 100%)',
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }
        },
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', { style: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 } }, 'Serenity Studio'),
            React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: 'rgba(255,255,255,0.8)' } }, 'Where calm meets craft'),
          ),
          React.createElement('div', {
            style: {
              position: 'absolute',
              bottom: 10,
              right: 10,
              background: '#DC2626',
              color: '#fff',
              fontFamily: font,
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6,
            }
          }, 'Book Now')
        )
      ),

      // Target mood selector
      React.createElement(Card, { t },
        React.createElement('div', { style: { fontFamily: font, fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 } }, 'Target Mood'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
          moods.map(m =>
            React.createElement('div', {
              key: m.id,
              onClick: () => { setTargetMood(m.id); setScore(null); },
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 10,
                cursor: 'pointer',
                background: targetMood === m.id ? t.primaryLight : 'transparent',
                border: `1.5px solid ${targetMood === m.id ? t.primary : 'transparent'}`,
                transition: 'all 0.2s',
              }
            },
              React.createElement('div', {
                style: {
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: `2px solid ${targetMood === m.id ? t.primary : t.border}`,
                  background: targetMood === m.id ? t.primary : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              },
                targetMood === m.id && React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#fff' } })
              ),
              React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: targetMood === m.id ? t.primary : t.text } }, m.label)
            )
          )
        )
      ),

      // Run check
      React.createElement('div', {
        onClick: runCheck,
        style: {
          background: t.primaryGrad,
          borderRadius: 14,
          padding: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          opacity: checking ? 0.7 : 1,
        }
      },
        checking
          ? React.createElement(window.lucide.Loader2, { size: 18, color: '#fff' })
          : React.createElement(window.lucide.Zap, { size: 18, color: '#fff', strokeWidth: 2.5 }),
        React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#fff' } },
          checking ? 'Analyzing…' : 'Run Mood Check'
        )
      ),

      // Score result
      score && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },

        // Score ring card
        React.createElement(Card, { t },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            React.createElement('div', {
              style: {
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: score.overall >= 85 ? t.successLight : score.overall >= 70 ? t.accentLight : t.errorLight,
                border: `3px solid ${score.overall >= 85 ? t.success : score.overall >= 70 ? t.accent : t.error}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement('span', {
                style: {
                  fontFamily: font,
                  fontSize: 18,
                  fontWeight: 800,
                  color: score.overall >= 85 ? t.success : score.overall >= 70 ? t.accent : t.error,
                }
              }, `${score.overall}`)
            ),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 } },
                score.overall >= 85 ? 'Strong Mood Match' : score.overall >= 70 ? 'Good — Needs Tuning' : 'Misaligned'
              ),
              React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textSec } },
                `${score.flags.filter(f => f.type === 'pass').length} passing · ${score.flags.filter(f => f.type === 'warn').length} warnings · ${score.flags.filter(f => f.type === 'fail').length} issues`
              )
            )
          )
        ),

        // Flags
        ...score.flags.map((flag, i) => {
          const fc = flagColors[flag.type];
          return React.createElement(Card, { key: i, t },
            React.createElement('div', { style: { display: 'flex', gap: 10 } },
              React.createElement('div', {
                style: {
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: fc.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }
              },
                React.createElement(fc.icon, { size: 16, color: fc.text, strokeWidth: 2 })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, flag.label),
                React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: t.textSec, lineHeight: 1.5 } }, flag.detail)
              )
            )
          );
        })
      )
    )
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VAULT SCREEN — Brand Memory Vault
// ══════════════════════════════════════════════════════════════════════════════
function VaultScreen({ t }) {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Bloom Bakery',
      type: 'Food & Beverage',
      lastUsed: '2 days ago',
      mood: 'Warm & Homemade',
      colors: ['#92400E', '#F59E0B', '#FCD34D', '#FFFBEB'],
      font: 'Fraunces / Source Serif 4',
      score: 89,
      icon: '🧁',
    },
    {
      id: 2,
      name: 'Serenity Wellness',
      type: 'Health & Wellness',
      lastUsed: '1 week ago',
      mood: 'Calm & Premium',
      colors: ['#1E1B4B', '#7C3AED', '#C4B5FD', '#F5F3FF'],
      font: 'Playfair Display / DM Sans',
      score: 94,
      icon: '🧘',
    },
    {
      id: 3,
      name: 'NovaStack SaaS',
      type: 'Tech & Software',
      lastUsed: '3 weeks ago',
      mood: 'Modern & Bold',
      colors: ['#0F172A', '#3B82F6', '#A5F3FC', '#F0FDFF'],
      font: 'Space Grotesk / Inter',
      score: 81,
      icon: '⚙️',
    },
  ];

  const proj = projects.find(p => p.id === activeProject);

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', padding: '0 0 80px' }
  },
    React.createElement('div', { style: { padding: '20px 20px 16px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: t.primaryGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(window.lucide.Vault, { size: 16, color: '#fff', strokeWidth: 2.5 })
          ),
          React.createElement('span', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, 'Brand Vault')
        ),
        React.createElement('div', {
          style: {
            background: t.primaryGrad,
            borderRadius: 20,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Plus, { size: 14, color: '#fff', strokeWidth: 2.5 }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: '#fff' } }, 'New')
        )
      ),
      React.createElement('p', { style: { fontFamily: font, fontSize: 13, color: t.textSec, margin: 0 } }, 'Saved mood profiles and brand memory.')
    ),

    !proj ? React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },

      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        [
          { label: 'Profiles', value: '3', icon: window.lucide.FolderHeart },
          { label: 'Avg Score', value: '88', icon: window.lucide.TrendingUp },
          { label: 'Palettes', value: '9', icon: window.lucide.Palette },
        ].map((stat, i) =>
          React.createElement(Card, { key: i, t, style: { flex: 1, textAlign: 'center', padding: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 6 } },
              React.createElement(stat.icon, { size: 18, color: t.primary, strokeWidth: 2 })
            ),
            React.createElement('div', { style: { fontFamily: font, fontSize: 20, fontWeight: 800, color: t.text } }, stat.value),
            React.createElement('div', { style: { fontFamily: font, fontSize: 10, color: t.textSec, fontWeight: 600 } }, stat.label)
          )
        )
      ),

      // Project list
      ...projects.map(p =>
        React.createElement('div', {
          key: p.id,
          onClick: () => setActiveProject(p.id),
          style: { cursor: 'pointer' }
        },
          React.createElement(Card, { t },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }
              }, p.icon),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 } }, p.name),
                React.createElement('div', { style: { fontFamily: font, fontSize: 11, color: t.textSec } }, `${p.type} · ${p.mood}`),
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
                React.createElement('div', {
                  style: {
                    background: p.score >= 90 ? t.successLight : t.primaryLight,
                    color: p.score >= 90 ? t.success : t.primary,
                    fontFamily: font,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 8,
                  }
                }, `${p.score}%`),
                React.createElement('div', { style: { fontFamily: font, fontSize: 10, color: t.textMuted } }, p.lastUsed)
              )
            ),
            // Color strip
            React.createElement('div', {
              style: { display: 'flex', height: 6, borderRadius: 4, overflow: 'hidden', marginTop: 12 }
            },
              p.colors.map((c, i) =>
                React.createElement('div', { key: i, style: { flex: 1, background: c } })
              )
            )
          )
        )
      )
    )

    // Detail view
    : React.createElement('div', { style: { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', {
          onClick: () => setActiveProject(null),
          style: { display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 4 }
        },
          React.createElement(window.lucide.ArrowLeft, { size: 16, color: t.primary, strokeWidth: 2.5 }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 13, fontWeight: 600, color: t.primary } }, 'Back to Vault')
        ),

        React.createElement(Card, { t, style: { overflow: 'hidden', padding: 0 } },
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, ${proj.colors[0]}, ${proj.colors[1]})`,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }
          },
            React.createElement('span', { style: { fontSize: 32 } }, proj.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: font, fontSize: 18, fontWeight: 800, color: '#fff' } }, proj.name),
              React.createElement('div', { style: { fontFamily: font, fontSize: 12, color: 'rgba(255,255,255,0.8)' } }, proj.type)
            )
          ),
          React.createElement('div', { style: { padding: 16 } },
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 14 } },
              proj.colors.map((c, i) =>
                React.createElement('div', {
                  key: i,
                  style: {
                    flex: 1,
                    height: 48,
                    borderRadius: 8,
                    background: c,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: 4,
                  }
                },
                  React.createElement('span', {
                    style: { fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.3)', borderRadius: 3, padding: '1px 3px' }
                  }, c)
                )
              )
            ),
            [
              { label: 'Mood Profile', value: proj.mood },
              { label: 'Typography', value: proj.font },
              { label: 'Mood Score', value: `${proj.score} / 100` },
              { label: 'Last Used', value: proj.lastUsed },
            ].map((row, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < 3 ? `1px solid ${t.border}` : 'none',
                }
              },
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, color: t.textSec } }, row.label),
                React.createElement('span', { style: { fontFamily: font, fontSize: 12, fontWeight: 700, color: t.text } }, row.value)
              )
            )
          )
        ),

        React.createElement('div', {
          style: {
            background: t.primaryGrad,
            borderRadius: 14,
            padding: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.PlayCircle, { size: 18, color: '#fff', strokeWidth: 2 }),
          React.createElement('span', { style: { fontFamily: font, fontSize: 15, fontWeight: 700, color: '#fff' } }, 'Apply to New Design')
        )
      )
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Brief', icon: window.lucide.Sparkles },
    { id: 'palette', label: 'Palette', icon: window.lucide.Palette },
    { id: 'type', label: 'Type', icon: window.lucide.Type },
    { id: 'check', label: 'Check', icon: window.lucide.ScanLine },
    { id: 'vault', label: 'Vault', icon: window.lucide.Vault },
  ];

  const screens = {
    home: HomeScreen,
    palette: PaletteScreen,
    type: TypeScreen,
    check: CheckScreen,
    vault: VaultScreen,
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#E8E4F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
    }
  },
    // Keyframe for spinner
    React.createElement('style', null, `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      ::-webkit-scrollbar { display: none; }
    `),

    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
      }
    },

      // Status bar
      React.createElement(StatusBar, { t, isDark, onToggle: () => setIsDark(!isDark) }),

      // Screen content
      React.createElement('div', {
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: t.bg,
        }
      },
        React.createElement(screens[activeTab], { t })
      ),

      // Bottom nav
      React.createElement('div', {
        style: {
          height: 80,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px 16px',
          boxShadow: `0 -4px 20px ${t.shadow}`,
          flexShrink: 0,
        }
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '8px 10px 4px',
              borderRadius: 14,
              background: activeTab === tab.id ? t.primaryLight : 'transparent',
              transition: 'all 0.2s',
              minWidth: 52,
            }
          },
            React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontFamily: font,
                fontSize: 9,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                letterSpacing: 0.2,
              }
            }, tab.label)
          )
        )
      )
    )
  );
}
