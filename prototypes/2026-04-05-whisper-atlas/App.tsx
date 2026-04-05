const { useState, useEffect, useRef } = React;

const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: 0.85; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(14,165,233,0.4); }
    50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(14,165,233,0); }
  }
  @keyframes mapDot {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.4); opacity: 0.5; }
  }
  @keyframes waveIn {
    from { clip-path: circle(0% at 50% 50%); }
    to { clip-path: circle(150% at 50% 50%); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .whisper-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(14,165,233,0.18) !important; }
  .nav-tab:hover { background: rgba(14,165,233,0.08); }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,115,22,0.35) !important; }
  .btn-primary:active { transform: scale(0.97); }
  .ritual-card:hover { transform: translateY(-3px) scale(1.01); }
  .map-dot { animation: mapDot 2s ease-in-out infinite; }
  .float-anim { animation: float 3s ease-in-out infinite; }
  .breathe-anim { animation: breathe 4s ease-in-out infinite; }
  .scroll-area::-webkit-scrollbar { display: none; }
  .scroll-area { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; }
`;
document.head.appendChild(styleTag);

const themes = {
  light: {
    bg: '#F0F9FF',
    surface: '#FFFFFF',
    surfaceAlt: '#E0F2FE',
    card: '#FFFFFF',
    cardBorder: 'rgba(14,165,233,0.12)',
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    cta: '#F97316',
    text: '#0F172A',
    textSec: '#475569',
    textMuted: '#94A3B8',
    navBg: '#FFFFFF',
    navBorder: 'rgba(14,165,233,0.1)',
    inputBg: '#F0F9FF',
    inputBorder: 'rgba(14,165,233,0.2)',
    mapBg: '#E0F2FE',
    tagBg: 'rgba(14,165,233,0.1)',
    tagText: '#0EA5E9',
  },
  dark: {
    bg: '#0B1929',
    surface: '#0F2137',
    surfaceAlt: '#142B42',
    card: '#0F2137',
    cardBorder: 'rgba(56,189,248,0.15)',
    primary: '#38BDF8',
    secondary: '#0EA5E9',
    cta: '#F97316',
    text: '#F0F9FF',
    textSec: '#94C6E7',
    textMuted: '#5B8BA8',
    navBg: '#0F2137',
    navBorder: 'rgba(56,189,248,0.1)',
    inputBg: '#142B42',
    inputBorder: 'rgba(56,189,248,0.2)',
    mapBg: '#0B1929',
    tagBg: 'rgba(56,189,248,0.15)',
    tagText: '#38BDF8',
  }
};

const whisperData = [
  { id: 1, user: 'Mira K.', avatar: 'MK', location: 'Kyoto, Japan', spot: 'Fushimi Inari Dawn Path', desc: 'At 5:40am the torii gates are yours alone. Stand still, breathe the cedar scent, let the orange light diffuse everything.', tags: ['Dawn', 'Silence', 'Nature'], time: '2h ago', likes: 47, lat: 58, lng: 142 },
  { id: 2, user: 'Jonas B.', avatar: 'JB', location: 'Amsterdam, NL', spot: 'Vondelpark East Bench', desc: 'Bench 17 by the old elm. Rain taps the leaves in 4/4 time. Locals walk dogs without phones. Real peace.', tags: ['Rain', 'Urban', 'Bench'], time: '4h ago', likes: 31, lat: 48, lng: 68 },
  { id: 3, user: 'Saoirse M.', avatar: 'SM', location: 'Galway, Ireland', spot: 'Salthill Prom at Dusk', desc: 'Last 200m of the promenade. Knock on the diving board for luck, then face the Atlantic. Nothing between you and Canada.', tags: ['Sea', 'Dusk', 'Ritual'], time: '6h ago', likes: 89, lat: 38, lng: 28 },
  { id: 4, user: 'Priya N.', avatar: 'PN', location: 'Bangalore, India', spot: 'Cubbon Park Hidden Path', desc: 'Past the brass band pavilion, a trail nobody takes. Hornbills at 7am. City noise drops 80% within 40 steps.', tags: ['Birds', 'Morning', 'Hidden'], time: '8h ago', likes: 56, lat: 72, lng: 188 },
  { id: 5, user: 'Leo T.', avatar: 'LT', location: 'Porto, Portugal', spot: 'Livraria Lello 9am', desc: 'First 10 minutes before the tourists. The staircase to yourself. Smell of old paper. Art nouveau light on your face.', tags: ['Books', 'Architecture', 'Early'], time: '12h ago', likes: 112, lat: 44, lng: 38 },
];

const ritualKits = [
  { id: 1, name: 'Forest Bathing Basics', emoji: null, icon: 'Leaf', prompts: 7, color: '#10B981', locked: false, progress: 0.6, desc: 'Sensory immersion in any green space — urban park or ancient forest.' },
  { id: 2, name: 'Urban Silence Hunt', emoji: null, icon: 'Volume1', prompts: 5, color: '#8B5CF6', locked: false, progress: 0.2, desc: 'Find pockets of quiet in the loudest cities on earth.' },
  { id: 3, name: 'Dawn Ritual Atlas', emoji: null, icon: 'Sunrise', prompts: 9, color: '#F59E0B', locked: true, progress: 0, desc: 'Capture the singular calm of first light in any location.' },
  { id: 4, name: 'Water & Breath', emoji: null, icon: 'Waves', prompts: 6, color: '#0EA5E9', locked: true, progress: 0, desc: 'Coastal and riverside mindfulness anchored to natural rhythms.' },
];

const challenges = [
  { id: 1, name: 'City Sound Map', goal: 'Log 5 unique sounds of peace in your city', joined: 1240, progress: 3, total: 5, active: true },
  { id: 2, name: 'The Golden Hour', goal: 'Capture 3 different sunrise spots this week', joined: 876, progress: 1, total: 3, active: true },
  { id: 3, name: 'Hidden Green', goal: 'Find 2 secret gardens tourists never visit', joined: 543, progress: 0, total: 2, active: false },
];

const journalEntries = [
  { date: 'Apr 4', kit: 'Forest Bathing Basics', prompt: 'Notice 5 distinct textures without looking', reflection: 'Rough bark, cold stone, a single smooth leaf — I stayed 40 minutes in what I thought was a 5-minute walk.', whispers: 2 },
  { date: 'Apr 2', kit: 'Urban Silence Hunt', prompt: 'Find the quietest corner within 5 blocks', reflection: 'Old cemetery just off Grafton Street. Noon on a Thursday. Six gravestones and zero noise.', whispers: 1 },
  { date: 'Mar 29', kit: 'Forest Bathing Basics', prompt: 'Breathe and count 10 natural sounds', reflection: 'Wind in eucalyptus sounds exactly like the sea. Did not know that before today.', whispers: 3 },
];

const mapDots = [
  { x: 58, y: 32, size: 8, intensity: 0.9, label: 'Kyoto' },
  { x: 48, y: 28, size: 6, intensity: 0.7, label: 'Amsterdam' },
  { x: 22, y: 30, size: 10, intensity: 1.0, label: 'Galway' },
  { x: 70, y: 48, size: 7, intensity: 0.8, label: 'Bangalore' },
  { x: 26, y: 34, size: 9, intensity: 0.85, label: 'Porto' },
  { x: 54, y: 22, size: 5, intensity: 0.6, label: 'Oslo' },
  { x: 80, y: 35, size: 6, intensity: 0.65, label: 'Seoul' },
  { x: 85, y: 52, size: 7, intensity: 0.75, label: 'Sydney' },
  { x: 15, y: 40, size: 5, intensity: 0.5, label: 'NYC' },
  { x: 36, y: 36, size: 8, intensity: 0.88, label: 'Cairo' },
  { x: 62, y: 40, size: 6, intensity: 0.7, label: 'Mumbai' },
  { x: 44, y: 26, size: 4, intensity: 0.55, label: 'Berlin' },
];

function Avatar({ initials, size = 32, color = '#0EA5E9', t }) {
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}, ${color}aa)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color: '#fff',
      fontFamily: 'Inter, sans-serif', flexShrink: 0,
      boxShadow: `0 2px 8px ${color}40`,
    }
  }, initials);
}

function Tag({ label, t }) {
  return React.createElement('span', {
    style: {
      background: t.tagBg, color: t.tagText,
      fontSize: 10, fontWeight: 600, padding: '3px 8px',
      borderRadius: 20, fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.02em',
    }
  }, label);
}

function ProgressBar({ value, color, t }) {
  return React.createElement('div', {
    style: { height: 4, background: t.inputBg, borderRadius: 4, overflow: 'hidden' }
  },
    React.createElement('div', {
      style: {
        height: '100%', width: `${value * 100}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 4, transition: 'width 0.6s ease',
      }
    })
  );
}

function HomeScreen({ t, setActiveScreen }) {
  const [likedIds, setLikedIds] = useState([]);
  const [entered, setEntered] = useState(false);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);

  const toggleLike = (id) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const MapIcon = window.lucide && window.lucide.Map ? window.lucide.Map : null;
  const HeartIcon = window.lucide && window.lucide.Heart ? window.lucide.Heart : null;
  const MapPinIcon = window.lucide && window.lucide.MapPin ? window.lucide.MapPin : null;
  const PlusIcon = window.lucide && window.lucide.Plus ? window.lucide.Plus : null;
  const WindIcon = window.lucide && window.lucide.Wind ? window.lucide.Wind : null;

  return React.createElement('div', {
    className: 'scroll-area',
    style: { height: '100%', overflowY: 'auto', background: t.bg }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '20px 20px 0',
        animation: entered ? 'fadeIn 0.5s ease forwards' : 'none',
      }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('p', {
            style: { fontSize: 12, color: t.textMuted, fontFamily: 'Inter, sans-serif', fontWeight: 500, marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }
          }, 'Sunday morning'),
          React.createElement('h1', {
            style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }
          }, 'Your Atlas'),
          React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginTop: 2 } }, '6 whispers logged this week')
        ),
        React.createElement(Avatar, { initials: 'YO', size: 40, color: '#0EA5E9', t })
      ),

      // Calm score card
      React.createElement('div', {
        className: 'breathe-anim',
        style: {
          background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`,
          borderRadius: 20, padding: '20px 24px', marginBottom: 20,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(14,165,233,0.3)',
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, right: 40, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          }
        }),
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 } }, 'Calm Resonance Score'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif', lineHeight: 1 } }, '87'),
            React.createElement('span', { style: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' } }, '/ 100')
          ),
          React.createElement('div', { style: { height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 4, marginBottom: 10 } },
            React.createElement('div', { style: { width: '87%', height: '100%', background: '#fff', borderRadius: 4 } })
          ),
          React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' } }, '↑ +12 from last week · Top 8% globally')
        )
      ),

      // Active challenge strip
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 16, padding: '14px 16px',
          border: `1px solid ${t.cardBorder}`, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', transition: 'transform 0.2s',
        },
        onClick: () => setActiveScreen('rituals'),
        className: 'whisper-card',
      },
        React.createElement('div', {
          style: {
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #F97316, #FB923C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          WindIcon && React.createElement(WindIcon, { size: 18, color: '#fff' })
        ),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 } }, 'Active Challenge'),
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, 'City Sound Map — 3 of 5'),
          React.createElement(ProgressBar, { value: 0.6, color: '#F97316', t })
        ),
        React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: t.textMuted, strokeWidth: 2 },
          React.createElement('polyline', { points: '9,18 15,12 9,6' })
        )
      ),
    ),

    // Feed section
    React.createElement('div', { style: { padding: '0 20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, 'Recent Whispers'),
        React.createElement('button', {
          onClick: () => setActiveScreen('atlas'),
          style: {
            fontSize: 12, color: t.primary, fontFamily: 'Inter, sans-serif',
            fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0',
          }
        },
          'View Atlas',
          React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: t.primary, strokeWidth: 2.5 },
            React.createElement('polyline', { points: '9,18 15,12 9,6' })
          )
        )
      ),

      whisperData.map((w, i) =>
        React.createElement('div', {
          key: w.id,
          className: 'whisper-card',
          style: {
            background: t.card, borderRadius: 16, padding: '16px',
            border: `1px solid ${t.cardBorder}`, marginBottom: 12,
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(14,165,233,0.06)',
            animation: `slideUp 0.4s ease ${i * 0.08}s both`,
            cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              React.createElement(Avatar, { initials: w.avatar, size: 34, color: ['#0EA5E9','#8B5CF6','#10B981','#F59E0B','#EF4444'][i % 5], t }),
              React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, w.user),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  MapPinIcon && React.createElement(MapPinIcon, { size: 10, color: t.textMuted }),
                  React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, w.location)
                )
              )
            ),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, w.time)
          ),
          React.createElement('p', {
            style: { fontSize: 13, fontWeight: 700, color: t.primary, fontFamily: 'Inter, sans-serif', marginBottom: 6 }
          }, w.spot),
          React.createElement('p', {
            style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', lineHeight: 1.6, marginBottom: 10 }
          }, w.desc),
          React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 } },
            w.tags.map(tag => React.createElement(Tag, { key: tag, label: tag, t }))
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('button', {
              onClick: (e) => { e.stopPropagation(); toggleLike(w.id); },
              style: {
                display: 'flex', alignItems: 'center', gap: 5,
                background: likedIds.includes(w.id) ? 'rgba(239,68,68,0.1)' : 'transparent',
                border: 'none', cursor: 'pointer', padding: '6px 10px',
                borderRadius: 20, transition: 'all 0.2s',
              }
            },
              HeartIcon && React.createElement(HeartIcon, {
                size: 15,
                color: likedIds.includes(w.id) ? '#EF4444' : t.textMuted,
                fill: likedIds.includes(w.id) ? '#EF4444' : 'none',
              }),
              React.createElement('span', { style: { fontSize: 12, color: likedIds.includes(w.id) ? '#EF4444' : t.textMuted, fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
                w.likes + (likedIds.includes(w.id) ? 1 : 0)
              )
            ),
            React.createElement('button', {
              style: {
                fontSize: 11, color: t.primary, fontFamily: 'Inter, sans-serif',
                fontWeight: 600, background: t.tagBg, border: 'none',
                cursor: 'pointer', padding: '6px 12px', borderRadius: 20,
                transition: 'all 0.2s',
              }
            }, 'View on Atlas')
          )
        )
      ),
      React.createElement('div', { style: { height: 100 } })
    )
  );
}

function AtlasScreen({ t, setActiveScreen }) {
  const [selectedDot, setSelectedDot] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [entered, setEntered] = useState(false);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);

  const ZoomIn = window.lucide && window.lucide.ZoomIn ? window.lucide.ZoomIn : null;
  const ZoomOut = window.lucide && window.lucide.ZoomOut ? window.lucide.ZoomOut : null;
  const LayersIcon = window.lucide && window.lucide.Layers ? window.lucide.Layers : null;
  const CompassIcon = window.lucide && window.lucide.Compass ? window.lucide.Compass : null;

  const dotColors = ['#0EA5E9','#10B981','#8B5CF6','#F59E0B','#EF4444','#38BDF8'];

  return React.createElement('div', {
    style: { height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, animation: entered ? 'fadeIn 0.4s ease' : 'none' }
  },
    // Header
    React.createElement('div', { style: { padding: '20px 20px 12px', flexShrink: 0 } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 2 } }, 'Wisdom Weaves'),
      React.createElement('p', { style: { fontSize: 12, color: t.textSec, fontFamily: 'Inter, sans-serif' } }, '4,283 whispers · 61 countries')
    ),

    // Filter pills
    React.createElement('div', {
      className: 'scroll-area',
      style: { display: 'flex', gap: 8, padding: '0 20px 12px', overflowX: 'auto', flexShrink: 0 }
    },
      ['All', 'Nature', 'Urban', 'Water', 'Dawn', 'Silence', 'Hidden'].map((filter, i) =>
        React.createElement('button', {
          key: filter,
          style: {
            padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: i === 0 ? t.primary : t.card,
            color: i === 0 ? '#fff' : t.textSec,
            fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif',
            flexShrink: 0, transition: 'all 0.2s',
            border: i !== 0 ? `1px solid ${t.cardBorder}` : 'none',
          }
        }, filter)
      )
    ),

    // Map container
    React.createElement('div', {
      style: {
        flex: 1, margin: '0 16px', borderRadius: 20, overflow: 'hidden',
        background: t.mapBg, position: 'relative',
        border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 4px 20px rgba(14,165,233,0.1)',
      }
    },
      // SVG world map lines (simplified)
      React.createElement('svg', {
        width: '100%', height: '100%', style: { position: 'absolute', inset: 0 }
      },
        // Grid lines
        ...Array.from({ length: 6 }, (_, i) =>
          React.createElement('line', {
            key: `h${i}`, x1: '0', y1: `${(i+1) * 14}%`, x2: '100%', y2: `${(i+1) * 14}%`,
            stroke: t.primary, strokeOpacity: 0.06, strokeWidth: 1,
          })
        ),
        ...Array.from({ length: 8 }, (_, i) =>
          React.createElement('line', {
            key: `v${i}`, x1: `${(i+1) * 11}%`, y1: '0', x2: `${(i+1) * 11}%`, y2: '100%',
            stroke: t.primary, strokeOpacity: 0.06, strokeWidth: 1,
          })
        ),
        // Wisdom weave connection lines
        React.createElement('line', { x1: '58%', y1: '32%', x2: '80%', y2: '35%', stroke: t.primary, strokeOpacity: 0.15, strokeWidth: 1, strokeDasharray: '3,3' }),
        React.createElement('line', { x1: '22%', y1: '30%', x2: '48%', y2: '28%', stroke: t.primary, strokeOpacity: 0.15, strokeWidth: 1, strokeDasharray: '3,3' }),
        React.createElement('line', { x1: '26%', y1: '34%', x2: '22%', y2: '30%', stroke: t.primary, strokeOpacity: 0.12, strokeWidth: 1, strokeDasharray: '3,3' }),
        React.createElement('line', { x1: '58%', y1: '32%', x2: '62%', y2: '40%', stroke: '#10B981', strokeOpacity: 0.15, strokeWidth: 1, strokeDasharray: '3,3' }),
        React.createElement('line', { x1: '70%', y1: '48%', x2: '62%', y2: '40%', stroke: '#10B981', strokeOpacity: 0.12, strokeWidth: 1, strokeDasharray: '3,3' }),
        React.createElement('line', { x1: '15%', y1: '40%', x2: '26%', y2: '34%', stroke: '#8B5CF6', strokeOpacity: 0.15, strokeWidth: 1, strokeDasharray: '3,3' }),
      ),

      // Map dots
      ...mapDots.map((dot, i) =>
        React.createElement('div', {
          key: i,
          className: 'map-dot',
          style: {
            position: 'absolute',
            left: `${dot.x}%`, top: `${dot.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.2}s`,
          },
          onClick: () => setSelectedDot(selectedDot === i ? null : i),
        },
          // Outer ring
          React.createElement('div', {
            style: {
              width: dot.size * 3, height: dot.size * 3,
              borderRadius: '50%',
              background: `${dotColors[i % dotColors.length]}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: dot.size, height: dot.size,
                borderRadius: '50%',
                background: dotColors[i % dotColors.length],
                boxShadow: `0 0 8px ${dotColors[i % dotColors.length]}88`,
                opacity: dot.intensity,
              }
            })
          ),
          selectedDot === i && React.createElement('div', {
            style: {
              position: 'absolute', bottom: '100%', left: '50%',
              transform: 'translateX(-50%) translateY(-4px)',
              background: t.card, border: `1px solid ${t.cardBorder}`,
              borderRadius: 10, padding: '8px 10px', width: 120,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              zIndex: 10, animation: 'fadeIn 0.2s ease',
            }
          },
            React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 2 } }, dot.label),
            React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${Math.round(dot.intensity * 12)} whispers`)
          )
        )
      ),

      // Controls
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 12, right: 12,
          display: 'flex', flexDirection: 'column', gap: 6,
        }
      },
        [
          { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 0.2, 2)) },
          { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 0.2, 0.6)) },
          { icon: CompassIcon, action: () => {} },
        ].map((btn, i) =>
          React.createElement('button', {
            key: i,
            onClick: btn.action,
            style: {
              width: 36, height: 36, borderRadius: 10,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }
          },
            btn.icon && React.createElement(btn.icon, { size: 16, color: t.textSec })
          )
        )
      ),

      // Weave count
      React.createElement('div', {
        style: {
          position: 'absolute', top: 12, left: 12,
          background: t.card, borderRadius: 10, padding: '6px 10px',
          border: `1px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', gap: 6,
        }
      },
        LayersIcon && React.createElement(LayersIcon, { size: 13, color: t.primary }),
        React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, '3 Weave Layers')
      )
    ),

    // Bottom spotlight
    React.createElement('div', {
      className: 'scroll-area',
      style: { padding: '12px 16px 0', overflowX: 'auto', display: 'flex', gap: 10, flexShrink: 0 }
    },
      whisperData.slice(0, 4).map((w, i) =>
        React.createElement('div', {
          key: w.id,
          className: 'whisper-card',
          style: {
            flexShrink: 0, width: 200,
            background: t.card, borderRadius: 14, padding: '12px',
            border: `1px solid ${t.cardBorder}`,
            transition: 'all 0.2s', cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 } },
            React.createElement(Avatar, { initials: w.avatar, size: 28, color: ['#0EA5E9','#8B5CF6','#10B981','#F59E0B'][i], t }),
            React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, w.spot)
          ),
          React.createElement('p', { style: { fontSize: 11, color: t.textSec, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 } }, w.desc.slice(0, 60) + '…')
        )
      )
    ),
    React.createElement('div', { style: { height: 80 } })
  );
}

function LogScreen({ t, setActiveScreen }) {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [spotName, setSpotName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);

  const moods = [
    { id: 'calm', label: 'Calm', color: '#0EA5E9' },
    { id: 'curious', label: 'Curious', color: '#8B5CF6' },
    { id: 'grateful', label: 'Grateful', color: '#10B981' },
    { id: 'open', label: 'Open', color: '#F59E0B' },
    { id: 'still', label: 'Still', color: '#38BDF8' },
  ];
  const tagOptions = ['Nature', 'Urban', 'Water', 'Dawn', 'Dusk', 'Silence', 'Sound', 'Hidden', 'Social', 'Ritual'];

  const toggleTag = (tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const MapPinIcon = window.lucide && window.lucide.MapPin ? window.lucide.MapPin : null;
  const MicIcon = window.lucide && window.lucide.Mic ? window.lucide.Mic : null;
  const CheckCircleIcon = window.lucide && window.lucide.CheckCircle ? window.lucide.CheckCircle : null;
  const SparklesIcon = window.lucide && window.lucide.Sparkles ? window.lucide.Sparkles : null;

  if (submitted) {
    return React.createElement('div', {
      style: {
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: t.bg, padding: 32,
        animation: 'fadeIn 0.5s ease',
      }
    },
      React.createElement('div', {
        className: 'breathe-anim',
        style: {
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24, boxShadow: '0 0 40px rgba(14,165,233,0.35)',
        }
      },
        CheckCircleIcon && React.createElement(CheckCircleIcon, { size: 36, color: '#fff' })
      ),
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', textAlign: 'center', marginBottom: 10 } }, 'Whisper Shared'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSec, fontFamily: 'Inter, sans-serif', textAlign: 'center', lineHeight: 1.7, marginBottom: 8 } }, 'Your discovery has been woven into the global Atlas. Others walking near this spot will find your calm.'),
      React.createElement('p', { style: { fontSize: 13, color: t.primary, fontFamily: 'Inter, sans-serif', fontWeight: 600, textAlign: 'center', marginBottom: 32 } }, '+15 Calm Resonance · Ritual Kit progress updated'),
      React.createElement('button', {
        className: 'btn-primary',
        onClick: () => setActiveScreen('atlas'),
        style: {
          background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
          color: '#fff', border: 'none', borderRadius: 16,
          padding: '14px 32px', fontSize: 15, fontWeight: 700,
          fontFamily: 'Inter, sans-serif', cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(14,165,233,0.35)',
          transition: 'all 0.2s',
        }
      }, 'View on Atlas'),
      React.createElement('button', {
        onClick: () => { setSubmitted(false); setStep(0); setMood(null); setSpotName(''); setNotes(''); setSelectedTags([]); },
        style: {
          marginTop: 12, background: 'none', border: 'none',
          color: t.textSec, fontSize: 14, fontFamily: 'Inter, sans-serif',
          cursor: 'pointer', padding: '10px 20px',
        }
      }, 'Log another whisper')
    );
  }

  const steps = ['Mood', 'Place', 'Notes', 'Tags'];

  return React.createElement('div', {
    className: 'scroll-area',
    style: { height: '100%', overflowY: 'auto', background: t.bg, animation: entered ? 'fadeIn 0.4s ease' : 'none' }
  },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 } },
        SparklesIcon && React.createElement(SparklesIcon, { size: 18, color: t.primary }),
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } }, 'Log a Whisper')
      ),
      React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 20 } }, 'What calm did you discover?'),

      // Step indicator
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 24 } },
        steps.map((s, i) =>
          React.createElement('div', {
            key: s,
            style: {
              flex: 1, height: 4, borderRadius: 4,
              background: i <= step ? t.primary : t.inputBg,
              transition: 'background 0.3s ease',
            }
          })
        )
      ),

      // Step 0: Mood
      step === 0 && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 6 } }, 'How are you feeling right now?'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 20 } }, 'Your mood shapes how we record this whisper.'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 } },
          moods.map(m =>
            React.createElement('button', {
              key: m.id,
              onClick: () => setMood(m.id),
              style: {
                padding: '12px 20px', borderRadius: 20,
                background: mood === m.id ? m.color : t.card,
                color: mood === m.id ? '#fff' : t.text,
                border: `2px solid ${mood === m.id ? m.color : t.cardBorder}`,
                fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                cursor: 'pointer', transition: 'all 0.2s',
                minHeight: 44,
              }
            }, m.label)
          )
        ),
        React.createElement('button', {
          className: 'btn-primary',
          onClick: () => mood && setStep(1),
          style: {
            width: '100%', padding: '16px', borderRadius: 16,
            background: mood ? 'linear-gradient(135deg, #F97316, #FB923C)' : t.inputBg,
            color: mood ? '#fff' : t.textMuted,
            border: 'none', fontSize: 15, fontWeight: 700,
            fontFamily: 'Inter, sans-serif', cursor: mood ? 'pointer' : 'default',
            transition: 'all 0.2s',
            boxShadow: mood ? '0 6px 20px rgba(249,115,22,0.3)' : 'none',
          }
        }, 'Continue')
      ),

      // Step 1: Place
      step === 1 && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 6 } }, 'Where did you find this calm?'),
        React.createElement('div', {
          style: {
            background: t.card, borderRadius: 16, padding: '14px',
            border: `1px solid ${t.cardBorder}`, marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 10,
          }
        },
          MapPinIcon && React.createElement(MapPinIcon, { size: 16, color: t.primary }),
          React.createElement('p', { style: { fontSize: 13, color: t.primary, fontFamily: 'Inter, sans-serif', fontWeight: 600 } }, 'Dublin, Ireland — Detected')
        ),
        React.createElement('input', {
          value: spotName,
          onChange: e => setSpotName(e.target.value),
          placeholder: 'Name this spot (e.g., "Garden behind the market")',
          style: {
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: `1.5px solid ${spotName ? t.primary : t.inputBorder}`,
            background: t.inputBg, color: t.text, fontSize: 14,
            fontFamily: 'Inter, sans-serif', outline: 'none',
            marginBottom: 20, transition: 'border 0.2s',
          }
        }),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setStep(0),
            style: {
              flex: 1, padding: '16px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              color: t.textSec, fontSize: 14, fontWeight: 600,
              fontFamily: 'Inter, sans-serif', cursor: 'pointer',
            }
          }, 'Back'),
          React.createElement('button', {
            className: 'btn-primary',
            onClick: () => spotName && setStep(2),
            style: {
              flex: 2, padding: '16px', borderRadius: 16,
              background: spotName ? 'linear-gradient(135deg, #F97316, #FB923C)' : t.inputBg,
              color: spotName ? '#fff' : t.textMuted,
              border: 'none', fontSize: 15, fontWeight: 700,
              fontFamily: 'Inter, sans-serif', cursor: spotName ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }
          }, 'Continue')
        )
      ),

      // Step 2: Notes
      step === 2 && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 6 } }, 'Describe what made it calm'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 14 } }, 'Sensory details help others find the same feeling.'),
        React.createElement('textarea', {
          value: notes,
          onChange: e => setNotes(e.target.value),
          placeholder: 'The smell of rain on warm stone. A single bench nobody else uses. The way light hits the water at exactly 6:15pm…',
          rows: 6,
          style: {
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: `1.5px solid ${notes ? t.primary : t.inputBorder}`,
            background: t.inputBg, color: t.text, fontSize: 13,
            fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none',
            lineHeight: 1.7, marginBottom: 8, transition: 'border 0.2s',
          }
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
          React.createElement('button', {
            style: {
              display: 'flex', alignItems: 'center', gap: 6,
              background: t.tagBg, border: 'none', borderRadius: 20,
              padding: '8px 14px', cursor: 'pointer',
              color: t.primary, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif',
            }
          },
            MicIcon && React.createElement(MicIcon, { size: 13, color: t.primary }),
            'Voice note'
          ),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${notes.length} / 280`)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setStep(1),
            style: {
              flex: 1, padding: '16px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              color: t.textSec, fontSize: 14, fontWeight: 600,
              fontFamily: 'Inter, sans-serif', cursor: 'pointer',
            }
          }, 'Back'),
          React.createElement('button', {
            className: 'btn-primary',
            onClick: () => notes && setStep(3),
            style: {
              flex: 2, padding: '16px', borderRadius: 16,
              background: notes ? 'linear-gradient(135deg, #F97316, #FB923C)' : t.inputBg,
              color: notes ? '#fff' : t.textMuted,
              border: 'none', fontSize: 15, fontWeight: 700,
              fontFamily: 'Inter, sans-serif', cursor: notes ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }
          }, 'Continue')
        )
      ),

      // Step 3: Tags
      step === 3 && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 6 } }, 'Tag this whisper'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 16 } }, 'Select up to 4 that feel right.'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 } },
          tagOptions.map(tag =>
            React.createElement('button', {
              key: tag,
              onClick: () => toggleTag(tag),
              style: {
                padding: '10px 16px', borderRadius: 20,
                background: selectedTags.includes(tag) ? t.primary : t.card,
                color: selectedTags.includes(tag) ? '#fff' : t.text,
                border: `1.5px solid ${selectedTags.includes(tag) ? t.primary : t.cardBorder}`,
                fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                cursor: 'pointer', transition: 'all 0.2s', minHeight: 44,
              }
            }, tag)
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          React.createElement('button', {
            onClick: () => setStep(2),
            style: {
              flex: 1, padding: '16px', borderRadius: 16,
              background: t.card, border: `1px solid ${t.cardBorder}`,
              color: t.textSec, fontSize: 14, fontWeight: 600,
              fontFamily: 'Inter, sans-serif', cursor: 'pointer',
            }
          }, 'Back'),
          React.createElement('button', {
            className: 'btn-primary',
            onClick: () => setSubmitted(true),
            style: {
              flex: 2, padding: '16px', borderRadius: 16,
              background: 'linear-gradient(135deg, #F97316, #FB923C)',
              color: '#fff', border: 'none', fontSize: 15, fontWeight: 700,
              fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
              transition: 'all 0.2s',
            }
          }, 'Share Whisper')
        )
      ),
    ),
    React.createElement('div', { style: { height: 100 } })
  );
}

function RitualsScreen({ t, setActiveScreen }) {
  const [tab, setTab] = useState('kits');
  const [entered, setEntered] = useState(false);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);

  const LockIcon = window.lucide && window.lucide.Lock ? window.lucide.Lock : null;
  const LeafIcon = window.lucide && window.lucide.Leaf ? window.lucide.Leaf : null;
  const Volume1Icon = window.lucide && window.lucide.Volume1 ? window.lucide.Volume1 : null;
  const WavesIcon = window.lucide && window.lucide.Waves ? window.lucide.Waves : null;
  const SunIcon = window.lucide && window.lucide.Sun ? window.lucide.Sun : null;
  const UsersIcon = window.lucide && window.lucide.Users ? window.lucide.Users : null;
  const CheckIcon = window.lucide && window.lucide.Check ? window.lucide.Check : null;
  const TrophyIcon = window.lucide && window.lucide.Trophy ? window.lucide.Trophy : null;

  const kitIcons = { Leaf: LeafIcon, Volume1: Volume1Icon, Sunrise: SunIcon, Waves: WavesIcon };

  return React.createElement('div', {
    className: 'scroll-area',
    style: { height: '100%', overflowY: 'auto', background: t.bg, animation: entered ? 'fadeIn 0.4s ease' : 'none' }
  },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 2 } }, 'Ritual Kits'),
      React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 20 } }, 'Guided mindfulness collections for your journey'),

      // Tab switcher
      React.createElement('div', {
        style: {
          display: 'flex', background: t.inputBg, borderRadius: 14,
          padding: 4, gap: 4, marginBottom: 24,
          border: `1px solid ${t.cardBorder}`,
        }
      },
        ['kits', 'challenges'].map(tabId =>
          React.createElement('button', {
            key: tabId,
            onClick: () => setTab(tabId),
            style: {
              flex: 1, padding: '10px', borderRadius: 10, border: 'none',
              background: tab === tabId ? t.primary : 'transparent',
              color: tab === tabId ? '#fff' : t.textSec,
              fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif',
              cursor: 'pointer', transition: 'all 0.2s',
            }
          }, tabId === 'kits' ? 'Ritual Kits' : 'Sojourn Challenges')
        )
      ),

      // Kits
      tab === 'kits' && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        ritualKits.map((kit, i) => {
          const KitIcon = kitIcons[kit.icon];
          return React.createElement('div', {
            key: kit.id,
            className: 'ritual-card',
            style: {
              background: t.card, borderRadius: 18, padding: '18px',
              border: `1px solid ${kit.locked ? t.cardBorder : kit.color + '33'}`,
              marginBottom: 14, transition: 'all 0.25s ease',
              opacity: kit.locked ? 0.7 : 1,
              boxShadow: !kit.locked ? `0 4px 16px ${kit.color}18` : 'none',
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
              React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
                React.createElement('div', {
                  style: {
                    width: 44, height: 44, borderRadius: 14,
                    background: kit.locked ? t.inputBg : `linear-gradient(135deg, ${kit.color}, ${kit.color}cc)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }
                },
                  kit.locked
                    ? LockIcon && React.createElement(LockIcon, { size: 18, color: t.textMuted })
                    : KitIcon && React.createElement(KitIcon, { size: 20, color: '#fff' })
                ),
                React.createElement('div', null,
                  React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif' } }, kit.name),
                  React.createElement('p', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${kit.prompts} prompts`)
                )
              ),
              kit.locked
                ? React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 700, color: t.textMuted,
                      fontFamily: 'Inter, sans-serif', background: t.inputBg,
                      padding: '4px 10px', borderRadius: 20, letterSpacing: '0.04em',
                    }
                  }, 'LOCKED')
                : React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 700, color: kit.color,
                      fontFamily: 'Inter, sans-serif', background: kit.color + '18',
                      padding: '4px 10px', borderRadius: 20, letterSpacing: '0.04em',
                    }
                  }, kit.progress > 0 ? 'IN PROGRESS' : 'START')
            ),
            React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', lineHeight: 1.6, marginBottom: 12 } }, kit.desc),
            !kit.locked && kit.progress > 0 && React.createElement('div', null,
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Progress'),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: kit.color, fontFamily: 'Inter, sans-serif' } }, `${Math.round(kit.progress * 100)}%`)
              ),
              React.createElement(ProgressBar, { value: kit.progress, color: kit.color, t })
            )
          );
        })
      ),

      // Challenges
      tab === 'challenges' && React.createElement('div', { style: { animation: 'slideUp 0.3s ease' } },
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, #F97316, #FB923C)`,
            borderRadius: 16, padding: '16px', marginBottom: 20,
            display: 'flex', gap: 12, alignItems: 'center',
          }
        },
          TrophyIcon && React.createElement(TrophyIcon, { size: 32, color: '#fff' }),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Inter, sans-serif' } }, '1,240 explorers active'),
            React.createElement('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif' } }, 'Sojourn Challenges this week')
          )
        ),

        challenges.map((ch, i) =>
          React.createElement('div', {
            key: ch.id,
            className: 'whisper-card',
            style: {
              background: t.card, borderRadius: 18, padding: '18px',
              border: `1px solid ${ch.active ? '#F9731633' : t.cardBorder}`,
              marginBottom: 14, transition: 'all 0.2s ease',
              boxShadow: ch.active ? '0 4px 16px rgba(249,115,22,0.1)' : 'none',
              animation: `slideUp 0.4s ease ${i * 0.1}s both`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
              React.createElement('p', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', flex: 1, marginRight: 8 } }, ch.name),
              React.createElement('span', {
                style: {
                  fontSize: 10, fontWeight: 700, fontFamily: 'Inter, sans-serif',
                  padding: '4px 10px', borderRadius: 20, letterSpacing: '0.04em',
                  background: ch.active ? 'rgba(249,115,22,0.12)' : t.inputBg,
                  color: ch.active ? '#F97316' : t.textMuted,
                }
              }, ch.active ? 'ACTIVE' : 'JOIN')
            ),
            React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', lineHeight: 1.6, marginBottom: 12 } }, ch.goal),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                UsersIcon && React.createElement(UsersIcon, { size: 12, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${ch.joined.toLocaleString()} joined`)
              ),
              ch.active && React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: '#F97316', fontFamily: 'Inter, sans-serif' } }, `${ch.progress}/${ch.total} done`)
            ),
            ch.active && React.createElement(ProgressBar, { value: ch.progress / ch.total, color: '#F97316', t })
          )
        )
      ),
    ),
    React.createElement('div', { style: { height: 100 } })
  );
}

function JournalScreen({ t, setActiveScreen }) {
  const [entered, setEntered] = useState(false);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { setTimeout(() => setEntered(true), 50); }, []);

  const BookOpenIcon = window.lucide && window.lucide.BookOpen ? window.lucide.BookOpen : null;
  const StarIcon = window.lucide && window.lucide.Star ? window.lucide.Star : null;
  const MapIcon = window.lucide && window.lucide.Map ? window.lucide.Map : null;
  const CalendarIcon = window.lucide && window.lucide.Calendar ? window.lucide.Calendar : null;

  const stats = [
    { label: 'Whispers', value: '14', icon: StarIcon, color: '#0EA5E9' },
    { label: 'Countries', value: '4', icon: MapIcon, color: '#10B981' },
    { label: 'Kits', value: '2', icon: BookOpenIcon, color: '#8B5CF6' },
    { label: 'Streak', value: '7d', icon: CalendarIcon, color: '#F97316' },
  ];

  return React.createElement('div', {
    className: 'scroll-area',
    style: { height: '100%', overflowY: 'auto', background: t.bg, animation: entered ? 'fadeIn 0.4s ease' : 'none' }
  },
    React.createElement('div', { style: { padding: '20px 20px 0' } },
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 2 } }, 'Journey Journal'),
      React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', marginBottom: 20 } }, 'Your private trail of calm discoveries'),

      // Stats grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }
      },
        stats.map((s, i) => {
          const Icon = s.icon;
          return React.createElement('div', {
            key: s.label,
            style: {
              background: t.card, borderRadius: 16, padding: '14px 8px',
              border: `1px solid ${t.cardBorder}`, textAlign: 'center',
              animation: `slideUp 0.4s ease ${i * 0.08}s both`,
              boxShadow: `0 2px 8px ${s.color}12`,
            }
          },
            React.createElement('div', {
              style: {
                width: 32, height: 32, borderRadius: 10,
                background: s.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px',
              }
            },
              Icon && React.createElement(Icon, { size: 15, color: s.color })
            ),
            React.createElement('p', { style: { fontSize: 18, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1 } }, s.value),
            React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 3 } }, s.label)
          );
        })
      ),

      // Contribution heatmap
      React.createElement('div', {
        style: {
          background: t.card, borderRadius: 18, padding: '18px',
          border: `1px solid ${t.cardBorder}`, marginBottom: 24,
          boxShadow: '0 2px 8px rgba(14,165,233,0.06)',
        }
      },
        React.createElement('p', { style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 14 } }, 'This Month'),
        React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
          Array.from({ length: 30 }, (_, i) => {
            const active = [1,4,5,8,11,12,13,16,18,19,22,25,27,28,29].includes(i);
            const intensity = active ? [0.4, 0.6, 0.8, 1.0][Math.floor(Math.random() * 4)] : 0;
            return React.createElement('div', {
              key: i,
              style: {
                width: 22, height: 22, borderRadius: 6,
                background: active ? `rgba(14,165,233,${intensity})` : t.inputBg,
                transition: 'all 0.2s',
              }
            });
          })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6, marginTop: 10 } },
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'Less'),
          ...[0.15, 0.4, 0.65, 0.9].map((op, i) =>
            React.createElement('div', { key: i, style: { width: 12, height: 12, borderRadius: 3, background: `rgba(14,165,233,${op})` } })
          ),
          React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, 'More')
        )
      ),

      // Journal entries
      React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: 'Inter, sans-serif', marginBottom: 14 } }, 'Reflections'),
      journalEntries.map((entry, i) =>
        React.createElement('div', {
          key: i,
          onClick: () => setExpanded(expanded === i ? null : i),
          style: {
            background: t.card, borderRadius: 16, padding: '16px',
            border: `1px solid ${t.cardBorder}`, marginBottom: 12,
            cursor: 'pointer', transition: 'all 0.2s ease',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
            boxShadow: expanded === i ? '0 6px 20px rgba(14,165,233,0.1)' : 'none',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1, marginRight: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 } },
                React.createElement('span', {
                  style: {
                    fontSize: 11, fontWeight: 700, color: t.primary,
                    fontFamily: 'Inter, sans-serif', background: t.tagBg,
                    padding: '3px 8px', borderRadius: 20,
                  }
                }, entry.kit),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, entry.date)
              ),
              React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 } }, entry.prompt)
            ),
            React.createElement('svg', {
              width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none',
              stroke: t.textMuted, strokeWidth: 2.5,
              style: { transform: expanded === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }
            },
              React.createElement('polyline', { points: '9,18 15,12 9,6' })
            )
          ),
          expanded === i && React.createElement('div', {
            style: {
              marginTop: 12, paddingTop: 12,
              borderTop: `1px solid ${t.cardBorder}`,
              animation: 'fadeIn 0.2s ease',
            }
          },
            React.createElement('p', { style: { fontSize: 13, color: t.textSec, fontFamily: 'Inter, sans-serif', lineHeight: 1.7, marginBottom: 10 } }, entry.reflection),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('div', {
                style: {
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#0EA5E9',
                }
              }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: 'Inter, sans-serif' } }, `${entry.whispers} whisper${entry.whispers > 1 ? 's' : ''} logged during this session`)
            )
          )
        )
      ),
    ),
    React.createElement('div', { style: { height: 100 } })
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const screens = {
    home: HomeScreen,
    atlas: AtlasScreen,
    log: LogScreen,
    rituals: RitualsScreen,
    journal: JournalScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', iconName: 'Home' },
    { id: 'atlas', label: 'Atlas', iconName: 'Globe' },
    { id: 'log', label: 'Log', iconName: 'Plus', accent: true },
    { id: 'rituals', label: 'Rituals', iconName: 'Sparkles' },
    { id: 'journal', label: 'Journal', iconName: 'BookOpen' },
  ];

  const ActiveComponent = screens[activeScreen];

  const MoonIcon = window.lucide && window.lucide.Moon ? window.lucide.Moon : null;
  const SunIcon = window.lucide && window.lucide.Sun ? window.lucide.Sun : null;

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '20px',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 8px #1a1a1a, inset 0 0 0 1px rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.3s ease',
      }
    },
      // Theme toggle
      React.createElement('button', {
        onClick: () => setIsDark(!isDark),
        style: {
          position: 'absolute', top: 16, right: 16, zIndex: 100,
          width: 36, height: 36, borderRadius: '50%',
          background: t.card, border: `1px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
        }
      },
        isDark
          ? SunIcon && React.createElement(SunIcon, { size: 15, color: '#F59E0B' })
          : MoonIcon && React.createElement(MoonIcon, { size: 15, color: t.textSec })
      ),

      // Screen area
      React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
        React.createElement(ActiveComponent, { t, setActiveScreen })
      ),

      // Bottom navigation
      React.createElement('div', {
        style: {
          height: 72,
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 8,
          paddingTop: 4,
          boxShadow: `0 -4px 20px rgba(0,0,0,${isDark ? '0.3' : '0.06'})`,
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }
      },
        navItems.map(item => {
          const Icon = window.lucide && window.lucide[item.iconName] ? window.lucide[item.iconName] : null;
          const isActive = activeScreen === item.id;

          if (item.accent) {
            return React.createElement('button', {
              key: item.id,
              className: 'nav-tab',
              onClick: () => setActiveScreen(item.id),
              style: {
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 0', minHeight: 44,
                gap: 3,
              }
            },
              React.createElement('div', {
                style: {
                  width: 40, height: 40, borderRadius: 14,
                  background: 'linear-gradient(135deg, #F97316, #FB923C)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s',
                }
              },
                Icon && React.createElement(Icon, { size: 20, color: '#fff' })
              ),
              React.createElement('span', {
                style: {
                  fontSize: 9, fontWeight: 700, color: isActive ? '#F97316' : t.textMuted,
                  fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase',
                }
              }, item.label)
            );
          }

          return React.createElement('button', {
            key: item.id,
            className: 'nav-tab',
            onClick: () => setActiveScreen(item.id),
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px 0', minHeight: 44, borderRadius: 12,
              transition: 'all 0.15s ease', gap: 4,
            }
          },
            Icon && React.createElement(Icon, {
              size: 22,
              color: isActive ? t.primary : t.textMuted,
              strokeWidth: isActive ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 9, fontWeight: isActive ? 700 : 500,
                color: isActive ? t.primary : t.textMuted,
                fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em',
                textTransform: 'uppercase', transition: 'color 0.2s',
              }
            }, item.label),
            isActive && React.createElement('div', {
              style: {
                position: 'absolute',
                width: 4, height: 4, borderRadius: '50%',
                background: t.primary,
                bottom: 6,
              }
            })
          );
        })
      )
    )
  );
}
