const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const themes = {
    dark: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#0F0F23',
      surface: '#1A1A3E',
      surfaceLight: '#252552',
      text: '#F1F0FF',
      textSecondary: '#A5A3C9',
      border: '#2D2B5E',
      cardBg: 'linear-gradient(135deg, #1A1A3E 0%, #1E1B4B 100%)',
    },
    light: {
      primary: '#1E1B4B',
      secondary: '#4338CA',
      cta: '#22C55E',
      bg: '#F5F3FF',
      surface: '#FFFFFF',
      surfaceLight: '#EDE9FE',
      text: '#1E1B4B',
      textSecondary: '#6B7280',
      border: '#DDD6FE',
      cardBg: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const styleTag = React.createElement('style', null, `
    @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Poppins:wght@300;400;500;600;700&display=swap');

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
      50% { transform: scale(1.15); opacity: 1; }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes waveform {
      0%, 100% { height: 8px; }
      50% { height: 24px; }
    }

    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    *::-webkit-scrollbar { width: 0; height: 0; }
  `);

  // Icons helper
  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const iconFn = window.lucide && window.lucide[name];
    if (!iconFn) return null;
    const svgString = iconFn.toString ? null : null;
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && window.lucide) {
        const iconData = window.lucide[name];
        if (iconData) {
          const [tag, attrs, children] = iconData;
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          Object.entries(attrs).forEach(([k, v]) => svg.setAttribute(k, v));
          svg.setAttribute('width', size);
          svg.setAttribute('height', size);
          svg.setAttribute('stroke', color);
          svg.setAttribute('fill', 'none');
          children.forEach(([childTag, childAttrs]) => {
            const el = document.createElementNS('http://www.w3.org/2000/svg', childTag);
            Object.entries(childAttrs).forEach(([k, v]) => el.setAttribute(k, v));
            svg.appendChild(el);
          });
          ref.current.innerHTML = '';
          ref.current.appendChild(svg);
        }
      }
    }, [name, size, color]);
    return React.createElement('span', { ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style } });
  };

  // Lucide icon via createElement approach
  const LucideIcon = ({ name, size = 20, color = t.text, style = {} }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.innerHTML = '';
        const icons = window.lucide;
        if (icons && icons.createElement) {
          const el = icons.createElement(icons.icons[name] || icons.icons['circle']);
          el.setAttribute('width', size);
          el.setAttribute('height', size);
          el.setAttribute('stroke', color);
          ref.current.appendChild(el);
        }
      }
    }, [name, size, color]);
    return React.createElement('span', { ref, style: { display: 'inline-flex', alignItems: 'center', ...style } });
  };

  // Simple SVG icons since lucide CDN uses different API
  const SvgIcon = ({ name, size = 20, color = t.text, style = {} }) => {
    const icons = {
      home: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }), React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })),
      compass: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 10 }), React.createElement('polygon', { points: '16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88' })),
      map: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polygon', { points: '1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' }), React.createElement('line', { x1: 8, y1: 2, x2: 8, y2: 18 }), React.createElement('line', { x1: 16, y1: 6, x2: 16, y2: 22 })),
      'book-open': React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }), React.createElement('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })),
      user: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: 12, cy: 7, r: 4 })),
      mic: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' }), React.createElement('path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }), React.createElement('line', { x1: 12, y1: 19, x2: 12, y2: 23 }), React.createElement('line', { x1: 8, y1: 23, x2: 16, y2: 23 })),
      headphones: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M3 18v-6a9 9 0 0 1 18 0v6' }), React.createElement('path', { d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' })),
      play: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polygon', { points: '5 3 19 12 5 21 5 3' })),
      pause: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('rect', { x: 6, y: 4, width: 4, height: 16 }), React.createElement('rect', { x: 14, y: 4, width: 4, height: 16 })),
      award: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 8, r: 7 }), React.createElement('polyline', { points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' })),
      'map-pin': React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }), React.createElement('circle', { cx: 12, cy: 10, r: 3 })),
      sun: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 5 }), React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }), React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }), React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }), React.createElement('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }), React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }), React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }), React.createElement('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }), React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })),
      moon: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })),
      'chevron-right': React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polyline', { points: '9 18 15 12 9 6' })),
      star: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: color, stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })),
      volume2: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }), React.createElement('path', { d: 'M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07' })),
      globe: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 10 }), React.createElement('line', { x1: 2, y1: 12, x2: 22, y2: 12 }), React.createElement('path', { d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' })),
      lock: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }), React.createElement('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })),
      'bar-chart-2': React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('line', { x1: 18, y1: 20, x2: 18, y2: 10 }), React.createElement('line', { x1: 12, y1: 20, x2: 12, y2: 4 }), React.createElement('line', { x1: 6, y1: 20, x2: 6, y2: 14 })),
      leaf: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z' }), React.createElement('path', { d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' })),
      building: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('rect', { x: 4, y: 2, width: 16, height: 20, rx: 2, ry: 2 }), React.createElement('path', { d: 'M9 22v-4h6v4' }), React.createElement('line', { x1: 8, y1: 6, x2: 8, y2: 6 }), React.createElement('line', { x1: 16, y1: 6, x2: 16, y2: 6 }), React.createElement('line', { x1: 8, y1: 10, x2: 8, y2: 10 }), React.createElement('line', { x1: 16, y1: 10, x2: 16, y2: 10 }), React.createElement('line', { x1: 8, y1: 14, x2: 8, y2: 14 }), React.createElement('line', { x1: 16, y1: 14, x2: 16, y2: 14 })),
      waves: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' }), React.createElement('path', { d: 'M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' }), React.createElement('path', { d: 'M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' })),
      clock: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 10 }), React.createElement('polyline', { points: '12 6 12 12 16 14' })),
      plus: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }), React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })),
      heart: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })),
      settings: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 3 }), React.createElement('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })),
      bell: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }), React.createElement('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })),
      zap: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })),
      target: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 10 }), React.createElement('circle', { cx: 12, cy: 12, r: 6 }), React.createElement('circle', { cx: 12, cy: 12, r: 2 })),
      users: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: 9, cy: 7, r: 4 }), React.createElement('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }), React.createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })),
      edit3: React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M12 20h9' }), React.createElement('path', { d: 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' })),
    };
    return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style } }, icons[name] || icons['home']);
  };

  // Waveform visualization component
  const Waveform = ({ color = t.cta, barCount = 12, height = 32, animated = true }) => {
    return React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 2, height }
    }, Array.from({ length: barCount }).map((_, i) =>
      React.createElement('div', {
        key: i,
        style: {
          width: 3,
          height: 8 + Math.random() * (height - 8),
          backgroundColor: color,
          borderRadius: 2,
          animation: animated ? `waveform ${0.4 + Math.random() * 0.6}s ease-in-out infinite` : 'none',
          animationDelay: `${i * 0.05}s`,
          opacity: 0.5 + Math.random() * 0.5,
        }
      })
    ));
  };

  // ========== HOME SCREEN ==========
  const HomeScreen = () => {
    const [activeExpedition, setActiveExpedition] = useState(null);
    const [recording, setRecording] = useState(false);

    const expeditions = [
      { id: 1, name: 'Urban Rhythms', desc: 'Discover the pulse of city life', icon: 'building', progress: 65, color: '#7C3AED', sounds: 8, total: 12, season: 'Spring 2026' },
      { id: 2, name: 'Forest Murmurs', desc: 'Listen to nature\'s whispers', icon: 'leaf', progress: 30, color: '#22C55E', sounds: 3, total: 10, season: 'Spring 2026' },
      { id: 3, name: 'Waterfront Echoes', desc: 'Capture coastal soundscapes', icon: 'waves', progress: 10, color: '#06B6D4', sounds: 1, total: 10, season: 'Spring 2026' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 90, animation: 'fadeIn 0.4s ease-out' }
    },
      // Header
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text, marginBottom: 2 }
          }, 'Soundweave'),
          React.createElement('p', {
            style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.textSecondary, fontWeight: 300 }
          }, 'Good evening, Explorer')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 40, height: 40, borderRadius: 12, border: 'none',
              background: t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }
          }, React.createElement(SvgIcon, { name: isDark ? 'sun' : 'moon', size: 18, color: t.textSecondary })),
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 12, border: 'none',
              background: t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative'
            }
          },
            React.createElement(SvgIcon, { name: 'bell', size: 18, color: t.textSecondary }),
            React.createElement('div', {
              style: {
                position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%',
                background: '#EF4444', border: `2px solid ${t.bg}`
              }
            })
          )
        )
      ),

      // Active Recording Banner
      React.createElement('div', {
        onClick: () => setRecording(!recording),
        style: {
          background: recording
            ? 'linear-gradient(135deg, #7C3AED 0%, #4338CA 50%, #22C55E 100%)'
            : 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)',
          borderRadius: 20, padding: '20px 20px', marginBottom: 20, cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
          boxShadow: recording ? '0 8px 32px rgba(67, 56, 202, 0.5)' : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }
      },
        // Background geometric shapes
        React.createElement('div', {
          style: {
            position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
          }
        }),
        React.createElement('div', {
          style: {
            position: 'absolute', bottom: -30, left: 40, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
          }
        }),
        React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
          React.createElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }
          },
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6, fontWeight: 600 }
              }, recording ? 'Recording...' : 'Tap to Record'),
              React.createElement('h2', {
                style: { fontFamily: 'Righteous, cursive', fontSize: 20, color: '#fff' }
              }, recording ? 'Capturing Sound' : 'Start a Sound Capture')
            ),
            React.createElement('div', {
              style: {
                width: 52, height: 52, borderRadius: '50%',
                background: recording ? '#EF4444' : 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: recording ? '0 0 20px rgba(239,68,68,0.5)' : 'none',
                animation: recording ? 'pulse 1.5s ease-in-out infinite' : 'none',
              }
            }, React.createElement(SvgIcon, { name: 'mic', size: 24, color: '#fff' }))
          ),
          React.createElement(Waveform, { color: 'rgba(255,255,255,0.6)', barCount: 20, height: 28, animated: recording })
        )
      ),

      // Stats Row
      React.createElement('div', {
        style: { display: 'flex', gap: 10, marginBottom: 24 }
      },
        [
          { label: 'Sounds', value: '47', icon: 'volume2' },
          { label: 'Streak', value: '12d', icon: 'zap' },
          { label: 'Rank', value: '#142', icon: 'award' },
        ].map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              flex: 1, background: t.surface, borderRadius: 16, padding: '14px 12px',
              border: `1px solid ${t.border}`, textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'center', marginBottom: 6 }
            }, React.createElement(SvgIcon, { name: stat.icon, size: 16, color: t.cta })),
            React.createElement('p', {
              style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text }
            }, stat.value),
            React.createElement('p', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary, fontWeight: 500 }
            }, stat.label)
          )
        )
      ),

      // Sonic Expeditions
      React.createElement('div', { style: { marginBottom: 20 } },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }
        },
          React.createElement('h3', {
            style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text }
          }, 'Sonic Expeditions'),
          React.createElement('button', {
            onClick: () => setActiveScreen('explore'),
            style: {
              background: 'none', border: 'none', color: t.secondary, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
            }
          },
            React.createElement('span', null, 'View All'),
            React.createElement(SvgIcon, { name: 'chevron-right', size: 14, color: t.secondary })
          )
        ),
        expeditions.map((exp, i) =>
          React.createElement('div', {
            key: exp.id,
            onClick: () => setActiveExpedition(activeExpedition === exp.id ? null : exp.id),
            style: {
              background: t.surface, borderRadius: 16, padding: 16, marginBottom: 10,
              border: `1px solid ${activeExpedition === exp.id ? exp.color : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: activeExpedition === exp.id ? `0 4px 20px ${exp.color}33` : '0 2px 8px rgba(0,0,0,0.08)',
              animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 14 }
            },
              React.createElement('div', {
                style: {
                  width: 48, height: 48, borderRadius: 14, background: `${exp.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }
              }, React.createElement(SvgIcon, { name: exp.icon, size: 22, color: exp.color })),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
                  React.createElement('h4', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: t.text }
                  }, exp.name),
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, `${exp.sounds}/${exp.total}`)
                ),
                React.createElement('p', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary, marginBottom: 8 }
                }, exp.desc),
                React.createElement('div', {
                  style: { height: 4, borderRadius: 2, background: t.surfaceLight, overflow: 'hidden' }
                },
                  React.createElement('div', {
                    style: {
                      height: '100%', width: `${exp.progress}%`, borderRadius: 2,
                      background: `linear-gradient(90deg, ${exp.color}, ${t.cta})`,
                      transition: 'width 0.5s ease',
                    }
                  })
                )
              )
            )
          )
        )
      ),

      // Recent Sounds
      React.createElement('div', null,
        React.createElement('h3', {
          style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: t.text, marginBottom: 14 }
        }, 'Recent Captures'),
        React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 } },
          [
            { name: 'Rain on Tin Roof', time: '2m ago', duration: '0:34', color: '#06B6D4' },
            { name: 'Morning Birdsong', time: '1h ago', duration: '1:12', color: '#22C55E' },
            { name: 'Subway Arrival', time: '3h ago', duration: '0:45', color: '#7C3AED' },
          ].map((sound, i) =>
            React.createElement('div', {
              key: i,
              style: {
                minWidth: 140, background: t.surface, borderRadius: 16, padding: 14,
                border: `1px solid ${t.border}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }
            },
              React.createElement('div', {
                style: {
                  width: 36, height: 36, borderRadius: 10, background: `${sound.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                }
              }, React.createElement(SvgIcon, { name: 'play', size: 16, color: sound.color })),
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 4 }
              }, sound.name),
              React.createElement('div', {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
              },
                React.createElement('span', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary }
                }, sound.duration),
                React.createElement('span', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary }
                }, sound.time)
              )
            )
          )
        )
      )
    );
  };

  // ========== EXPLORE SCREEN ==========
  const ExploreScreen = () => {
    const [activeTab, setActiveTab] = useState('expeditions');
    const [playingId, setPlayingId] = useState(null);

    const allExpeditions = [
      { id: 1, name: 'Urban Rhythms', desc: 'Map the soundscape of city living. From coffee shops to crosswalks, capture the sonic fingerprint of urban life.', icon: 'building', color: '#7C3AED', participants: 2847, sounds: 14200, status: 'active', difficulty: 'Beginner' },
      { id: 2, name: 'Forest Murmurs', desc: 'Step into the green and record the hidden conversations of the woodland. Birdsong, wind, and rustling canopy.', icon: 'leaf', color: '#22C55E', participants: 1923, sounds: 9800, status: 'active', difficulty: 'Intermediate' },
      { id: 3, name: 'Waterfront Echoes', desc: 'From babbling brooks to crashing waves, document water\'s infinite acoustic variety.', icon: 'waves', color: '#06B6D4', participants: 1456, sounds: 7300, status: 'active', difficulty: 'Beginner' },
      { id: 4, name: 'Night Symphony', desc: 'When the world goes quiet, a hidden orchestra emerges. Record the sounds that only night reveals.', icon: 'moon', color: '#8B5CF6', participants: 892, sounds: 4200, status: 'upcoming', difficulty: 'Advanced' },
    ];

    const trendingSounds = [
      { id: 1, name: 'Dawn Chorus, Black Forest', user: 'NatureLover42', likes: 342, duration: '2:18', location: 'Germany' },
      { id: 2, name: 'Tokyo Station Rush Hour', user: 'UrbanExplorer', likes: 287, duration: '1:45', location: 'Japan' },
      { id: 3, name: 'Thunderstorm Over Lake', user: 'StormChaser', likes: 256, duration: '3:02', location: 'Canada' },
      { id: 4, name: 'Mediterranean Market', user: 'WanderSound', likes: 198, duration: '1:30', location: 'Morocco' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 90, animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text, marginBottom: 6 }
      }, 'Explore'),
      React.createElement('p', {
        style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.textSecondary, marginBottom: 20, fontWeight: 300 }
      }, 'Discover sonic expeditions and trending sounds'),

      // Tabs
      React.createElement('div', {
        style: {
          display: 'flex', gap: 0, marginBottom: 20, background: t.surfaceLight,
          borderRadius: 14, padding: 4,
        }
      },
        ['expeditions', 'trending'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
              background: activeTab === tab ? t.secondary : 'transparent',
              color: activeTab === tab ? '#fff' : t.textSecondary,
              transition: 'all 0.2s ease',
            }
          }, tab.charAt(0).toUpperCase() + tab.slice(1))
        )
      ),

      // Content
      activeTab === 'expeditions' ? React.createElement('div', null,
        allExpeditions.map((exp, i) =>
          React.createElement('div', {
            key: exp.id,
            style: {
              background: t.surface, borderRadius: 20, padding: 18, marginBottom: 14,
              border: `1px solid ${t.border}`, overflow: 'hidden', position: 'relative',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
            }
          },
            // Decorative corner
            React.createElement('div', {
              style: {
                position: 'absolute', top: -15, right: -15, width: 60, height: 60,
                borderRadius: '50%', background: `${exp.color}15`,
              }
            }),
            React.createElement('div', { style: { position: 'relative' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                  React.createElement('div', {
                    style: {
                      width: 44, height: 44, borderRadius: 12, background: `${exp.color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }
                  }, React.createElement(SvgIcon, { name: exp.icon, size: 20, color: exp.color })),
                  React.createElement('div', null,
                    React.createElement('h3', {
                      style: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: t.text }
                    }, exp.name),
                    React.createElement('span', {
                      style: {
                        fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                        color: exp.status === 'active' ? t.cta : '#F59E0B',
                        textTransform: 'uppercase', letterSpacing: 1,
                      }
                    }, exp.status)
                  )
                ),
                React.createElement('span', {
                  style: {
                    fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 500,
                    color: t.textSecondary, background: t.surfaceLight, padding: '4px 10px', borderRadius: 8,
                  }
                }, exp.difficulty)
              ),
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 14 }
              }, exp.desc),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', gap: 16 } },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                    React.createElement(SvgIcon, { name: 'users', size: 13, color: t.textSecondary }),
                    React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary } },
                      exp.participants.toLocaleString())
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                    React.createElement(SvgIcon, { name: 'volume2', size: 13, color: t.textSecondary }),
                    React.createElement('span', { style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary } },
                      exp.sounds.toLocaleString())
                  )
                ),
                React.createElement('button', {
                  style: {
                    padding: '8px 18px', borderRadius: 10, border: 'none',
                    background: exp.status === 'active' ? t.cta : t.surfaceLight,
                    color: exp.status === 'active' ? '#fff' : t.textSecondary,
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    boxShadow: exp.status === 'active' ? '0 2px 10px rgba(34,197,94,0.3)' : 'none',
                  }
                }, exp.status === 'active' ? 'Join' : 'Notify Me')
              )
            )
          )
        )
      ) : React.createElement('div', null,
        trendingSounds.map((sound, i) =>
          React.createElement('div', {
            key: sound.id,
            onClick: () => setPlayingId(playingId === sound.id ? null : sound.id),
            style: {
              background: t.surface, borderRadius: 16, padding: 14, marginBottom: 10,
              border: `1px solid ${playingId === sound.id ? t.cta : t.border}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: playingId === sound.id ? `0 4px 16px rgba(34,197,94,0.2)` : '0 2px 8px rgba(0,0,0,0.06)',
              animation: `slideUp 0.4s ease-out ${i * 0.08}s both`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: 12,
                  background: playingId === sound.id ? `${t.cta}22` : t.surfaceLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.2s ease',
                }
              }, playingId === sound.id
                ? React.createElement(Waveform, { color: t.cta, barCount: 5, height: 20 })
                : React.createElement(SvgIcon, { name: 'play', size: 18, color: t.textSecondary })
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('h4', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }
                }, sound.name),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, sound.user),
                  React.createElement('span', { style: { color: t.border } }, '\u00B7'),
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, sound.location),
                )
              ),
              React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
                  React.createElement(SvgIcon, { name: 'heart', size: 12, color: '#EF4444' }),
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, sound.likes)
                ),
                React.createElement('span', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary }
                }, sound.duration)
              )
            )
          )
        )
      )
    );
  };

  // ========== ATLAS SCREEN ==========
  const AtlasScreen = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const regions = [
      { id: 1, name: 'North America', sounds: 24800, contributors: 3400, top: 'City Rain, NYC', lat: 30, left: 15 },
      { id: 2, name: 'Europe', sounds: 31200, contributors: 4100, top: 'Cathedral Bells, Prague', lat: 25, left: 55 },
      { id: 3, name: 'Asia', sounds: 18900, contributors: 2800, top: 'Temple Chimes, Kyoto', lat: 30, left: 72 },
      { id: 4, name: 'South America', sounds: 12400, contributors: 1900, top: 'Amazon Canopy, Brazil', lat: 60, left: 25 },
      { id: 5, name: 'Africa', sounds: 8700, contributors: 1200, top: 'Savanna Dusk, Kenya', lat: 48, left: 55 },
      { id: 6, name: 'Oceania', sounds: 6300, contributors: 890, top: 'Reef Waves, Fiji', lat: 65, left: 82 },
    ];

    const recentContributions = [
      { user: 'EchoSeeker', sound: 'Monsoon on Tin Roof', location: 'Mumbai, India', time: '5 min ago' },
      { user: 'SonicNomad', sound: 'Tram Bells', location: 'Lisbon, Portugal', time: '12 min ago' },
      { user: 'WildListener', sound: 'Cicada Chorus', location: 'Kyoto, Japan', time: '18 min ago' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 90, animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('h1', {
        style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text, marginBottom: 6 }
      }, 'Sound Atlas'),
      React.createElement('p', {
        style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.textSecondary, marginBottom: 20, fontWeight: 300 }
      }, 'A living map of the world\'s soundscapes'),

      // Stats banner
      React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)',
          borderRadius: 18, padding: '16px 18px', marginBottom: 18,
          display: 'flex', justifyContent: 'space-around',
          boxShadow: '0 4px 20px rgba(67,56,202,0.3)',
        }
      },
        [
          { label: 'Total Sounds', value: '102K' },
          { label: 'Contributors', value: '14.3K' },
          { label: 'Countries', value: '89' },
        ].map((s, i) =>
          React.createElement('div', { key: i, style: { textAlign: 'center' } },
            React.createElement('p', {
              style: { fontFamily: 'Righteous, cursive', fontSize: 20, color: '#fff' }
            }, s.value),
            React.createElement('p', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }
            }, s.label)
          )
        )
      ),

      // Map visualization
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 20, padding: 16, marginBottom: 18,
          border: `1px solid ${t.border}`, position: 'relative', height: 220, overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }
      },
        React.createElement('p', {
          style: {
            fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary,
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
          }
        }, 'Global Soundscape Map'),
        // Grid lines (simplified map background)
        Array.from({ length: 5 }).map((_, i) =>
          React.createElement('div', {
            key: `h${i}`,
            style: {
              position: 'absolute', left: 16, right: 16, top: 40 + i * 40,
              height: 1, background: `${t.border}55`,
            }
          })
        ),
        Array.from({ length: 7 }).map((_, i) =>
          React.createElement('div', {
            key: `v${i}`,
            style: {
              position: 'absolute', top: 35, bottom: 16, left: 16 + i * 52,
              width: 1, background: `${t.border}55`,
            }
          })
        ),
        // Region dots
        regions.map(region =>
          React.createElement('div', {
            key: region.id,
            onClick: () => setSelectedRegion(selectedRegion === region.id ? null : region.id),
            style: {
              position: 'absolute', top: `${region.lat}%`, left: `${region.left}%`,
              cursor: 'pointer', zIndex: 2,
            }
          },
            React.createElement('div', {
              style: {
                width: selectedRegion === region.id ? 18 : 14,
                height: selectedRegion === region.id ? 18 : 14,
                borderRadius: '50%', background: t.cta,
                boxShadow: `0 0 ${selectedRegion === region.id ? 16 : 8}px ${t.cta}88`,
                transition: 'all 0.2s ease',
                animation: selectedRegion === region.id ? 'pulse 1.5s ease-in-out infinite' : 'none',
              }
            }),
            // Ripple effect
            React.createElement('div', {
              style: {
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 14, height: 14, borderRadius: '50%', border: `1.5px solid ${t.cta}`,
                animation: 'ripple 2s ease-out infinite',
                animationDelay: `${region.id * 0.3}s`,
                opacity: 0.5,
              }
            })
          )
        ),
        // Selected region info
        selectedRegion && React.createElement('div', {
          style: {
            position: 'absolute', bottom: 12, left: 12, right: 12,
            background: isDark ? 'rgba(15,15,35,0.95)' : 'rgba(255,255,255,0.95)',
            borderRadius: 12, padding: '10px 14px',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${t.border}`,
            animation: 'fadeIn 0.2s ease-out',
          }
        },
          (() => {
            const r = regions.find(r => r.id === selectedRegion);
            return React.createElement('div', null,
              React.createElement('h4', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4 }
              }, r.name),
              React.createElement('div', { style: { display: 'flex', gap: 12 } },
                React.createElement('span', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                }, `${r.sounds.toLocaleString()} sounds`),
                React.createElement('span', {
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.cta }
                }, `Top: ${r.top}`)
              )
            );
          })()
        )
      ),

      // Live Feed
      React.createElement('h3', {
        style: { fontFamily: 'Righteous, cursive', fontSize: 16, color: t.text, marginBottom: 12 }
      }, 'Live Contributions'),
      recentContributions.map((item, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: t.surface, borderRadius: 14, marginBottom: 8,
            border: `1px solid ${t.border}`,
            animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 36, borderRadius: 10, background: `${t.cta}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          }, React.createElement(SvgIcon, { name: 'map-pin', size: 16, color: t.cta })),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: t.text }
            }, item.sound),
            React.createElement('p', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
            }, `${item.user} \u00B7 ${item.location}`)
          ),
          React.createElement('span', {
            style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary, flexShrink: 0 }
          }, item.time)
        )
      )
    );
  };

  // ========== JOURNAL SCREEN ==========
  const JournalScreen = () => {
    const [activeView, setActiveView] = useState('entries');

    const entries = [
      {
        id: 1, date: 'Apr 5, 2026', title: 'Morning Walk Discovery',
        text: 'Found a remarkable blend of birdsong and distant church bells near the old bridge. The acoustics of the stone arch amplified everything beautifully.',
        sounds: 3, mood: 'Peaceful', tags: ['birdsong', 'church bells', 'stone arch'],
        color: '#22C55E',
      },
      {
        id: 2, date: 'Apr 3, 2026', title: 'Rainy Afternoon',
        text: 'Captured the rhythm of rain hitting different surfaces on the balcony. Each material created its own percussion instrument.',
        sounds: 2, mood: 'Contemplative', tags: ['rain', 'percussion', 'balcony'],
        color: '#06B6D4',
      },
      {
        id: 3, date: 'Apr 1, 2026', title: 'Night Market Ambience',
        text: 'The overlapping conversations, sizzling food, and distant street music created an incredible tapestry of urban night sounds.',
        sounds: 4, mood: 'Energized', tags: ['market', 'food', 'music'],
        color: '#7C3AED',
      },
    ];

    const badges = [
      { name: 'First Capture', desc: 'Record your first sound', earned: true, icon: 'mic', color: '#22C55E' },
      { name: 'Streak Master', desc: '7-day recording streak', earned: true, icon: 'zap', color: '#F59E0B' },
      { name: 'Urban Explorer', desc: 'Capture 10 city sounds', earned: true, icon: 'building', color: '#7C3AED' },
      { name: 'Night Owl', desc: 'Record between midnight-4am', earned: false, icon: 'moon', color: '#8B5CF6' },
      { name: 'Globe Trotter', desc: 'Record in 5 countries', earned: false, icon: 'globe', color: '#06B6D4' },
      { name: 'Sound Scholar', desc: 'Complete 20 micro-lessons', earned: false, icon: 'award', color: '#EF4444' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 90, animation: 'fadeIn 0.4s ease-out' }
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: { fontFamily: 'Righteous, cursive', fontSize: 26, color: t.text, marginBottom: 2 }
          }, 'Journal'),
          React.createElement('p', {
            style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, color: t.textSecondary, fontWeight: 300 }
          }, 'Your personal sound diary')
        ),
        React.createElement('button', {
          style: {
            width: 44, height: 44, borderRadius: 14, border: 'none',
            background: t.cta, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
          }
        }, React.createElement(SvgIcon, { name: 'plus', size: 20, color: '#fff' }))
      ),

      // View Toggle
      React.createElement('div', {
        style: {
          display: 'flex', gap: 0, marginBottom: 20, background: t.surfaceLight,
          borderRadius: 14, padding: 4,
        }
      },
        ['entries', 'badges'].map(view =>
          React.createElement('button', {
            key: view,
            onClick: () => setActiveView(view),
            style: {
              flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
              background: activeView === view ? t.secondary : 'transparent',
              color: activeView === view ? '#fff' : t.textSecondary,
              transition: 'all 0.2s ease',
            }
          }, view === 'entries' ? 'Entries' : 'Sound Lore Badges')
        )
      ),

      activeView === 'entries' ? React.createElement('div', null,
        entries.map((entry, i) =>
          React.createElement('div', {
            key: entry.id,
            style: {
              background: t.surface, borderRadius: 20, padding: 18, marginBottom: 14,
              border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
            }
          },
            // Color accent bar
            React.createElement('div', {
              style: {
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                background: entry.color, borderRadius: '4px 0 0 4px',
              }
            }),
            React.createElement('div', { style: { paddingLeft: 8 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('div', null,
                  React.createElement('h3', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 2 }
                  }, entry.title),
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, entry.date)
                ),
                React.createElement('span', {
                  style: {
                    fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                    color: entry.color, background: `${entry.color}22`, padding: '4px 10px', borderRadius: 8,
                  }
                }, entry.mood)
              ),
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textSecondary, lineHeight: 1.6, marginBottom: 12 }
              }, entry.text),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
                  entry.tags.map((tag, j) =>
                    React.createElement('span', {
                      key: j,
                      style: {
                        fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 500,
                        color: t.textSecondary, background: t.surfaceLight, padding: '3px 8px', borderRadius: 6,
                      }
                    }, `#${tag}`)
                  )
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  React.createElement(SvgIcon, { name: 'volume2', size: 12, color: t.textSecondary }),
                  React.createElement('span', {
                    style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: t.textSecondary }
                  }, `${entry.sounds} sounds`)
                )
              )
            )
          )
        )
      ) : React.createElement('div', null,
        // Explorer rank
        React.createElement('div', {
          style: {
            background: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 60%, #22C55E 100%)',
            borderRadius: 20, padding: 20, marginBottom: 18, textAlign: 'center',
            boxShadow: '0 6px 24px rgba(67,56,202,0.3)',
            position: 'relative', overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }
          }),
          React.createElement(SvgIcon, { name: 'award', size: 36, color: '#F59E0B', style: { marginBottom: 8 } }),
          React.createElement('h3', {
            style: { fontFamily: 'Righteous, cursive', fontSize: 18, color: '#fff', marginBottom: 4 }
          }, 'Sound Wanderer'),
          React.createElement('p', {
            style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }
          }, 'Rank 3 of 7 \u00B7 1,240 XP to next rank'),
          React.createElement('div', {
            style: { height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', marginTop: 12, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%', width: '62%', borderRadius: 3,
                background: 'linear-gradient(90deg, #F59E0B, #22C55E)',
                backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite',
              }
            })
          )
        ),
        // Badges grid
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
        },
          badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: t.surface, borderRadius: 16, padding: 16,
                border: `1px solid ${badge.earned ? badge.color + '44' : t.border}`,
                textAlign: 'center', opacity: badge.earned ? 1 : 0.5,
                boxShadow: badge.earned ? `0 2px 12px ${badge.color}22` : 'none',
                animation: `fadeIn 0.4s ease-out ${i * 0.08}s both`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 44, height: 44, borderRadius: '50%', margin: '0 auto 8px',
                  background: badge.earned ? `${badge.color}22` : t.surfaceLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }, React.createElement(SvgIcon, {
                name: badge.earned ? badge.icon : 'lock',
                size: 20,
                color: badge.earned ? badge.color : t.textSecondary
              })),
              React.createElement('h4', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 2 }
              }, badge.name),
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary }
              }, badge.desc)
            )
          )
        )
      )
    );
  };

  // ========== PROFILE SCREEN ==========
  const ProfileScreen = () => {
    const stats = [
      { label: 'Total Captures', value: '47', icon: 'mic' },
      { label: 'Expeditions', value: '3', icon: 'compass' },
      { label: 'Countries', value: '2', icon: 'globe' },
      { label: 'Streak Days', value: '12', icon: 'zap' },
    ];

    const learningProgress = [
      { name: 'Bioacoustics 101', progress: 85, lessons: '17/20', color: '#22C55E' },
      { name: 'Urban Sound Design', progress: 45, lessons: '9/20', color: '#7C3AED' },
      { name: 'Cultural Soundscapes', progress: 20, lessons: '4/20', color: '#F59E0B' },
    ];

    return React.createElement('div', {
      style: { padding: '20px 16px', paddingBottom: 90, animation: 'fadeIn 0.4s ease-out' }
    },
      // Profile Header
      React.createElement('div', {
        style: {
          textAlign: 'center', marginBottom: 24, position: 'relative',
        }
      },
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }
        },
          React.createElement('button', {
            style: {
              width: 40, height: 40, borderRadius: 12, border: 'none',
              background: t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }
          }, React.createElement(SvgIcon, { name: 'settings', size: 18, color: t.textSecondary }))
        ),
        React.createElement('div', {
          style: {
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #4338CA 0%, #22C55E 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(67,56,202,0.4)',
            position: 'relative',
          }
        },
          React.createElement('span', {
            style: { fontFamily: 'Righteous, cursive', fontSize: 28, color: '#fff' }
          }, 'S'),
          // Level badge
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%',
              background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `3px solid ${t.bg}`, boxShadow: '0 2px 8px rgba(245,158,11,0.4)',
            }
          },
            React.createElement('span', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#fff' }
            }, '3')
          )
        ),
        React.createElement('h2', {
          style: { fontFamily: 'Righteous, cursive', fontSize: 22, color: t.text, marginBottom: 2 }
        }, 'SoundSeeker'),
        React.createElement('p', {
          style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textSecondary, fontWeight: 300 }
        }, 'Sound Wanderer \u00B7 Joined Mar 2026'),
      ),

      // Stats Grid
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }
      },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface, borderRadius: 16, padding: 16,
              border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              animation: `slideUp 0.3s ease-out ${i * 0.06}s both`,
            }
          },
            React.createElement('div', {
              style: {
                width: 40, height: 40, borderRadius: 12, background: `${t.cta}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }
            }, React.createElement(SvgIcon, { name: stat.icon, size: 18, color: t.cta })),
            React.createElement('div', null,
              React.createElement('p', {
                style: { fontFamily: 'Righteous, cursive', fontSize: 20, color: t.text }
              }, stat.value),
              React.createElement('p', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 10, color: t.textSecondary, fontWeight: 500 }
              }, stat.label)
            )
          )
        )
      ),

      // Learning Progress
      React.createElement('h3', {
        style: { fontFamily: 'Righteous, cursive', fontSize: 16, color: t.text, marginBottom: 4 }
      }, 'Audio Fingerprint Learning'),
      React.createElement('p', {
        style: { fontFamily: 'Poppins, sans-serif', fontSize: 12, color: t.textSecondary, marginBottom: 14, fontWeight: 300 }
      }, 'Your micro-lesson progress'),
      learningProgress.map((course, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('h4', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: t.text }
            }, course.name),
            React.createElement('span', {
              style: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: course.color, fontWeight: 600 }
            }, course.lessons)
          ),
          React.createElement('div', {
            style: { height: 6, borderRadius: 3, background: t.surfaceLight, overflow: 'hidden' }
          },
            React.createElement('div', {
              style: {
                height: '100%', width: `${course.progress}%`, borderRadius: 3,
                background: `linear-gradient(90deg, ${course.color}, ${course.color}aa)`,
                transition: 'width 0.6s ease',
              }
            })
          )
        )
      ),

      // Activity section
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 18, padding: 16, marginTop: 14,
          border: `1px solid ${t.border}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }
      },
        React.createElement('h3', {
          style: { fontFamily: 'Righteous, cursive', fontSize: 14, color: t.text, marginBottom: 12 }
        }, 'Weekly Activity'),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 60 }
        },
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const heights = [30, 45, 20, 55, 40, 60, 15];
            return React.createElement('div', {
              key: i, style: { textAlign: 'center', flex: 1 }
            },
              React.createElement('div', {
                style: {
                  height: heights[i], width: 20, borderRadius: 6, margin: '0 auto 6px',
                  background: i === 5 ? `linear-gradient(180deg, ${t.cta}, ${t.secondary})` : `${t.secondary}44`,
                  transition: 'all 0.3s ease',
                }
              }),
              React.createElement('span', {
                style: { fontFamily: 'Poppins, sans-serif', fontSize: 9, color: t.textSecondary }
              }, day)
            );
          })
        )
      )
    );
  };

  // ========== BOTTOM NAV ==========
  const BottomNav = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'explore', label: 'Explore', icon: 'compass' },
      { id: 'atlas', label: 'Atlas', icon: 'map' },
      { id: 'journal', label: 'Journal', icon: 'book-open' },
      { id: 'profile', label: 'Profile', icon: 'user' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: isDark ? 'rgba(15,15,35,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 0 20px',
        zIndex: 100,
      }
    },
      tabs.map(tab =>
        React.createElement('button', {
          key: tab.id,
          onClick: () => setActiveScreen(tab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 12,
            minWidth: 48, minHeight: 48,
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('div', {
            style: {
              width: 32, height: 32, borderRadius: 10,
              background: activeScreen === tab.id ? `${t.cta}22` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }
          },
            React.createElement(SvgIcon, {
              name: tab.icon, size: 20,
              color: activeScreen === tab.id ? t.cta : t.textSecondary
            })
          ),
          React.createElement('span', {
            style: {
              fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: activeScreen === tab.id ? 600 : 400,
              color: activeScreen === tab.id ? t.cta : t.textSecondary,
              transition: 'all 0.2s ease',
            }
          }, tab.label)
        )
      )
    );
  };

  // ========== SCREEN ROUTING ==========
  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    atlas: AtlasScreen,
    journal: JournalScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }
  },
    styleTag,
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.bg, position: 'relative',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
      }
    },
      React.createElement('div', {
        style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }
      },
        React.createElement(CurrentScreen),
        React.createElement(BottomNav)
      )
    )
  );
}
