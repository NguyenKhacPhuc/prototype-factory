const { useState, useEffect, useRef } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const themes = {
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5F9',
      primary: '#2563EB',
      secondary: '#3B82F6',
      cta: '#F97316',
      text: '#1E293B',
      textMuted: '#64748B',
      border: '#E2E8F0',
      card: '#FFFFFF',
      canvasBg: '#EEF2FF',
      canvasDot: 'rgba(37,99,235,0.10)',
    },
    dark: {
      bg: '#0F172A',
      surface: '#1E293B',
      surfaceAlt: '#334155',
      primary: '#3B82F6',
      secondary: '#60A5FA',
      cta: '#F97316',
      text: '#F1F5F9',
      textMuted: '#94A3B8',
      border: '#334155',
      card: '#1E293B',
      canvasBg: '#172554',
      canvasDot: 'rgba(96,165,250,0.08)',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'ideaflow-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,400&display=swap');

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.08); opacity: 0.8; }
      }
      @keyframes shimmer {
        0%   { background-position: -300% 0; }
        100% { background-position:  300% 0; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px);  }
        50%       { transform: translateY(-5px); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }

      .ideaflow-scroll::-webkit-scrollbar { display: none; }
      .ideaflow-scroll { -ms-overflow-style: none; scrollbar-width: none; }

      .flow-node {
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        cursor: pointer;
      }
      .flow-node:hover {
        transform: scale(1.06) !important;
        box-shadow: 0 12px 28px rgba(37,99,235,0.22) !important;
      }
      .snippet-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
      .snippet-card:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.11) !important; }
      .flow-card   { transition: transform 0.22s ease, box-shadow 0.22s ease; }
      .flow-card:hover   { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,0.14) !important; }
      .pill-btn { transition: all 0.18s ease; }
      .pill-btn:hover { filter: brightness(0.92); }
      .icon-btn { transition: all 0.16s ease; }
      .icon-btn:hover { transform: scale(1.08); }
      .icon-btn:active { transform: scale(0.93); }
      .nav-tab { transition: all 0.18s ease; }
      .nav-tab:hover { background: rgba(37,99,235,0.06) !important; }
      .cta-btn { transition: all 0.18s ease; }
      .cta-btn:hover { filter: brightness(1.06); box-shadow: 0 6px 20px rgba(249,115,22,0.38) !important; }
      .cta-btn:active { transform: scale(0.97); }
      .primary-btn { transition: all 0.18s ease; }
      .primary-btn:hover { filter: brightness(1.06); }
      .primary-btn:active { transform: scale(0.97); }
      input:focus { outline: none !important; }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById('ideaflow-styles'); if (el) el.remove(); };
  }, []);

  // ─────────────────────────── HOME SCREEN ────────────────────────────────
  function HomeScreen() {
    const [pressedFlow, setPressedFlow] = useState(null);

    const Home2   = window.lucide.Home;
    const Zap     = window.lucide.Zap;
    const TrendingUp = window.lucide.TrendingUp;
    const Sparkles   = window.lucide.Sparkles;
    const Plus       = window.lucide.Plus;
    const Sun        = window.lucide.Sun;
    const Moon       = window.lucide.Moon;
    const Video      = window.lucide.Video;
    const FileText   = window.lucide.FileText;
    const Mic        = window.lucide.Mic;
    const ChevronRight = window.lucide.ChevronRight;
    const Bell       = window.lucide.Bell;

    const recentFlows = [
      { id: 1, title: 'Quantum Physics Basics', snippets: 12, progress: 75, color: '#EFF6FF', accent: '#2563EB' },
      { id: 2, title: 'Renaissance Art History', snippets: 8,  progress: 45, color: '#FFF7ED', accent: '#F97316' },
      { id: 3, title: 'Machine Learning 101',   snippets: 15, progress: 90, color: '#F0FDF4', accent: '#16A34A' },
    ];

    const suggestions = [
      { id: 1, type: 'video', title: 'How Neurons Fire & Rewire', duration: '3:42', subject: 'Neuroscience',  color: '#EFF6FF', accent: '#2563EB' },
      { id: 2, type: 'text',  title: 'Fibonacci Patterns in Nature', duration: '5 min',  subject: 'Mathematics',   color: '#FDF4FF', accent: '#9333EA' },
      { id: 3, type: 'audio', title: "Feynman's Path Integral Lecture", duration: '8:15', subject: 'Physics',       color: '#FFF7ED', accent: '#F97316' },
    ];

    const typeIcons = { video: Video, text: FileText, audio: Mic };
    const typeColors = { video: '#2563EB', text: '#9333EA', audio: '#F97316' };

    return React.createElement('div', {
      className: 'ideaflow-scroll',
      style: { fontFamily: "'Comic Neue', cursive", background: t.bg, minHeight: '812px', overflowY: 'auto', paddingBottom: '88px', animation: 'fadeIn 0.3s ease' },
    },
      // ── Header gradient
      React.createElement('div', {
        style: { background: `linear-gradient(140deg, ${t.primary} 0%, ${t.secondary} 100%)`, padding: '20px 20px 32px', borderRadius: '0 0 32px 32px', boxShadow: '0 8px 24px rgba(37,99,235,0.22)' },
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' } },
          React.createElement('div', null,
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.72)', fontSize: '13px', margin: 0, fontFamily: "'Comic Neue', cursive" } }, 'Good morning,'),
            React.createElement('h2', { style: { color: '#fff', fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '24px', margin: '2px 0 0' } }, 'Alex Remix'),
          ),
          React.createElement('div', { style: { display: 'flex', gap: '10px' } },
            React.createElement('button', { className: 'icon-btn', onClick: () => {}, style: { width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Bell, { size: 18, color: '#fff' })
            ),
            React.createElement('button', { className: 'icon-btn', onClick: () => setIsDark(!isDark), style: { width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(isDark ? Sun : Moon, { size: 18, color: '#fff' })
            ),
          )
        ),
        // Stats row
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          [
            { label: 'Flows',   value: '23',  icon: Zap },
            { label: 'Snippets',value: '187', icon: TrendingUp },
            { label: 'Streak',  value: '14d', icon: Sparkles },
          ].map(stat =>
            React.createElement('div', {
              key: stat.label,
              style: { flex: 1, background: 'rgba(255,255,255,0.16)', borderRadius: '16px', padding: '12px 10px', textAlign: 'center', backdropFilter: 'blur(8px)' },
            },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '2px' } },
                React.createElement(stat.icon, { size: 14, color: 'rgba(255,255,255,0.85)' }),
                React.createElement('p', { style: { color: '#fff', fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '18px', margin: 0 } }, stat.value)
              ),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: '11px', margin: 0 } }, stat.label)
            )
          )
        )
      ),

      // ── Recent Flows
      React.createElement('div', { style: { padding: '22px 20px 4px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
          React.createElement('h3', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '18px', color: t.text, margin: 0 } }, 'Recent Flows'),
          React.createElement('button', { onClick: () => setActiveScreen('canvas'), style: { background: 'none', border: 'none', color: t.primary, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontFamily: "'Comic Neue', cursive" } },
            'See all', React.createElement(ChevronRight, { size: 14 })
          )
        ),
        recentFlows.map((flow, i) =>
          React.createElement('div', {
            key: flow.id, className: 'snippet-card',
            onClick: () => setActiveScreen('canvas'),
            style: { background: isDark ? t.surface : flow.color, borderRadius: '18px', padding: '15px 16px', marginBottom: '10px', cursor: 'pointer', border: `1.5px solid ${isDark ? t.border : 'transparent'}`, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', animation: `slideUp ${0.18 + i * 0.1}s ease` },
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('h4', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '15px', color: t.text, margin: '0 0 3px' } }, flow.title),
                React.createElement('p', { style: { color: t.textMuted, fontSize: '12px', margin: 0 } }, `${flow.snippets} snippets connected`)
              ),
              React.createElement('div', { style: { width: '34px', height: '34px', borderRadius: '50%', background: flow.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement(Zap, { size: 15, color: '#fff' })
              )
            ),
            React.createElement('div', { style: { background: isDark ? t.surfaceAlt : `${flow.accent}20`, borderRadius: '99px', height: '6px', overflow: 'hidden' } },
              React.createElement('div', { style: { width: `${flow.progress}%`, height: '100%', background: `linear-gradient(90deg, ${flow.accent}, ${flow.accent}bb)`, borderRadius: '99px' } })
            ),
            React.createElement('p', { style: { color: t.textMuted, fontSize: '11px', margin: '5px 0 0', textAlign: 'right' } }, `${flow.progress}% mastered`)
          )
        )
      ),

      // ── Create CTA
      React.createElement('div', { style: { padding: '4px 20px 20px' } },
        React.createElement('button', {
          className: 'cta-btn', onClick: () => setActiveScreen('canvas'),
          style: { width: '100%', padding: '15px', background: `linear-gradient(135deg, ${t.cta}, #FB923C)`, border: 'none', borderRadius: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', boxShadow: '0 4px 18px rgba(249,115,22,0.32)' },
        },
          React.createElement(Plus, { size: 18, color: '#fff' }),
          React.createElement('span', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '15px', color: '#fff' } }, 'Create New Flow')
        )
      ),

      // ── AI Picks
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' } },
          React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '8px', background: `${t.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Sparkles, { size: 15, color: t.primary })
          ),
          React.createElement('h3', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '18px', color: t.text, margin: 0 } }, 'AI Picks for You'),
        ),
        suggestions.map((snip, i) => {
          const IconComp = typeIcons[snip.type];
          return React.createElement('div', {
            key: snip.id, className: 'snippet-card',
            style: { background: isDark ? t.surface : snip.color, borderRadius: '16px', padding: '13px 15px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '13px', border: `1.5px solid ${isDark ? t.border : 'transparent'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', animation: `slideUp ${0.3 + i * 0.1}s ease`, cursor: 'pointer' },
          },
            React.createElement('div', { style: { width: '44px', height: '44px', borderRadius: '13px', background: `${snip.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(IconComp, { size: 20, color: snip.accent })
            ),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('p', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '14px', color: t.text, margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, snip.title),
              React.createElement('p', { style: { color: t.textMuted, fontSize: '11px', margin: 0 } }, `${snip.subject} · ${snip.duration}`)
            ),
            React.createElement('button', { className: 'icon-btn', style: { width: '32px', height: '32px', borderRadius: '50%', background: snip.accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Plus, { size: 14, color: '#fff' })
            )
          );
        })
      )
    );
  }

  // ─────────────────────────── CANVAS SCREEN ───────────────────────────────
  function CanvasScreen() {
    const [selected, setSelected] = useState(null);
    const [showTypes, setShowTypes] = useState(false);

    const Video    = window.lucide.Video;
    const FileText = window.lucide.FileText;
    const Mic      = window.lucide.Mic;
    const Image2   = window.lucide.Image;
    const Plus     = window.lucide.Plus;
    const LinkIcon = window.lucide.Link;
    const Download = window.lucide.Download;
    const ZoomIn   = window.lucide.ZoomIn;
    const Share2   = window.lucide.Share2;
    const Sun      = window.lucide.Sun;
    const Moon     = window.lucide.Moon;
    const Trash2   = window.lucide.Trash2;
    const Sparkles = window.lucide.Sparkles;

    const nodeTypeConfig = {
      video: { icon: Video,    color: '#2563EB', bg: '#EFF6FF', darkBg: '#1e3a5f', label: 'Video' },
      text:  { icon: FileText, color: '#F97316', bg: '#FFF7ED', darkBg: '#431407', label: 'Text'  },
      audio: { icon: Mic,      color: '#16A34A', bg: '#F0FDF4', darkBg: '#052e16', label: 'Audio' },
      image: { icon: Image2,   color: '#9333EA', bg: '#FDF4FF', darkBg: '#2e1065', label: 'Image' },
    };

    const nodes = [
      { id: 1, type: 'video', title: 'Quantum Entanglement Explained',  x: 22,  y: 58  },
      { id: 2, type: 'text',  title: 'Wave-Particle Duality Notes',     x: 190, y: 38  },
      { id: 3, type: 'audio', title: "Feynman Lecture Clip",            x: 90,  y: 188 },
      { id: 4, type: 'image', title: 'Double-Slit Experiment Diagram',  x: 220, y: 170 },
      { id: 5, type: 'text',  title: 'Copenhagen Interpretation',       x: 18,  y: 280 },
    ];

    const connections = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
    ];

    const selectedNode = nodes.find(n => n.id === selected);
    const selectedConfig = selectedNode ? nodeTypeConfig[selectedNode.type] : null;

    return React.createElement('div', {
      style: { fontFamily: "'Comic Neue', cursive", background: t.bg, minHeight: '812px', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.28s ease' },
    },
      // ── Toolbar
      React.createElement('div', {
        style: { background: t.surface, padding: '13px 16px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
      },
        React.createElement('div', null,
          React.createElement('h3', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '16px', color: t.text, margin: 0 } }, 'Quantum Physics Flow'),
          React.createElement('p', { style: { color: t.textMuted, fontSize: '11px', margin: '1px 0 0' } }, '5 nodes · 5 connections · Auto-saved')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '7px', alignItems: 'center' } },
          [LinkIcon, ZoomIn, Share2, isDark ? Sun : Moon].map((Icon, i) =>
            React.createElement('button', {
              key: i, className: 'icon-btn',
              onClick: i === 3 ? () => setIsDark(!isDark) : undefined,
              style: { width: '36px', height: '36px', borderRadius: '10px', background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            },
              React.createElement(Icon, { size: 15, color: t.textMuted })
            )
          )
        )
      ),

      // ── Canvas area
      React.createElement('div', {
        style: { flex: 1, background: t.canvasBg, position: 'relative', overflow: 'hidden', backgroundImage: `radial-gradient(${t.canvasDot} 1.5px, transparent 1.5px)`, backgroundSize: '22px 22px', minHeight: '400px' },
      },
        // SVG edges
        React.createElement('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 } },
          connections.map((conn, i) => {
            const f = nodes[conn.from], tt = nodes[conn.to];
            const x1 = f.x + 58, y1 = f.y + 36;
            const x2 = tt.x + 58, y2 = tt.y + 36;
            const mx = (x1 + x2) / 2;
            return React.createElement('path', {
              key: i,
              d: `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`,
              stroke: t.primary, strokeWidth: '1.5', strokeDasharray: '5,4',
              fill: 'none', strokeOpacity: '0.45',
            });
          })
        ),

        // Nodes
        nodes.map((node, i) => {
          const cfg = nodeTypeConfig[node.type];
          const IconComp = cfg.icon;
          const isSelected = selected === node.id;
          return React.createElement('div', {
            key: node.id, className: 'flow-node',
            onClick: () => setSelected(isSelected ? null : node.id),
            style: {
              position: 'absolute', left: `${node.x}px`, top: `${node.y}px`, width: '118px',
              background: isDark ? cfg.darkBg : cfg.bg,
              borderRadius: '18px', padding: '12px 11px', zIndex: isSelected ? 10 : 1,
              border: isSelected ? `2px solid ${cfg.color}` : `1.5px solid ${isDark ? t.border : cfg.color + '28'}`,
              boxShadow: isSelected ? `0 8px 28px ${cfg.color}40` : '0 4px 14px rgba(0,0,0,0.09)',
              animation: `float ${2.8 + i * 0.6}s ease-in-out infinite`,
            },
          },
            React.createElement('div', { style: { width: '36px', height: '36px', borderRadius: '11px', background: `${cfg.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' } },
              React.createElement(IconComp, { size: 18, color: cfg.color })
            ),
            React.createElement('p', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '11px', color: t.text, margin: '0 0 4px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, node.title),
            React.createElement('span', { style: { fontSize: '9px', color: cfg.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px' } }, cfg.label)
          );
        }),

        // Selected node action bar
        selectedConfig && React.createElement('div', {
          style: { position: 'absolute', bottom: '16px', left: '16px', right: '64px', background: isDark ? t.surface : '#fff', borderRadius: '16px', padding: '12px 14px', boxShadow: '0 8px 28px rgba(0,0,0,0.14)', border: `1px solid ${t.border}`, animation: 'slideUp 0.18s ease', display: 'flex', alignItems: 'center', gap: '10px' },
        },
          React.createElement('div', { style: { width: '32px', height: '32px', borderRadius: '10px', background: `${selectedConfig.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(selectedConfig.icon, { size: 16, color: selectedConfig.color })
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('p', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '12px', color: t.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, selectedNode.title),
            React.createElement('p', { style: { color: t.textMuted, fontSize: '10px', margin: 0 } }, 'Tap to edit · Drag to connect')
          ),
          React.createElement('button', { className: 'icon-btn', style: { width: '30px', height: '30px', borderRadius: '8px', background: '#FEE2E2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Trash2, { size: 14, color: '#EF4444' })
          )
        ),

        // FAB
        React.createElement('button', {
          className: 'icon-btn', onClick: () => setShowTypes(!showTypes),
          style: { position: 'absolute', bottom: '16px', right: '16px', width: '50px', height: '50px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(37,99,235,0.4)', zIndex: 20 },
        },
          React.createElement(Plus, { size: 22, color: '#fff', style: { transform: showTypes ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' } })
        ),

        // Add type palette (popup)
        showTypes && React.createElement('div', {
          style: { position: 'absolute', bottom: '74px', right: '12px', background: isDark ? t.surface : '#fff', borderRadius: '18px', padding: '12px', boxShadow: '0 12px 36px rgba(0,0,0,0.18)', border: `1px solid ${t.border}`, animation: 'slideUp 0.16s ease', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '8px' },
        },
          Object.entries(nodeTypeConfig).map(([type, cfg]) => {
            const IconComp = cfg.icon;
            return React.createElement('button', {
              key: type, className: 'snippet-card',
              style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', background: isDark ? cfg.darkBg : cfg.bg, border: 'none', borderRadius: '12px', cursor: 'pointer', minWidth: '140px' },
            },
              React.createElement(IconComp, { size: 16, color: cfg.color }),
              React.createElement('span', { style: { fontFamily: "'Comic Neue', cursive", fontSize: '13px', color: t.text, fontWeight: 700 } }, `Add ${cfg.label}`)
            );
          })
        )
      ),

      // ── Bottom type palette
      React.createElement('div', {
        style: { background: t.surface, borderTop: `1px solid ${t.border}`, padding: '10px 14px 88px', display: 'flex', gap: '9px', overflowX: 'auto' },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '7px', marginRight: '4px', flexShrink: 0 } },
          React.createElement(Sparkles, { size: 14, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: '11px', color: t.textMuted, fontFamily: "'Comic Neue', cursive", whiteSpace: 'nowrap' } }, 'Add snippet:')
        ),
        Object.entries(nodeTypeConfig).map(([type, cfg]) => {
          const IconComp = cfg.icon;
          return React.createElement('button', {
            key: type, className: 'snippet-card',
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', minWidth: '60px', padding: '9px 6px', background: isDark ? cfg.darkBg : cfg.bg, border: `1px solid ${isDark ? t.border : cfg.color + '28'}`, borderRadius: '13px', cursor: 'pointer' },
          },
            React.createElement(IconComp, { size: 18, color: cfg.color }),
            React.createElement('span', { style: { fontSize: '10px', color: cfg.color, fontFamily: "'Comic Neue', cursive", fontWeight: 700 } }, cfg.label)
          );
        })
      )
    );
  }

  // ─────────────────────────── DISCOVER SCREEN ─────────────────────────────
  function DiscoverScreen() {
    const [activeFilter, setActiveFilter] = useState('trending');
    const [liked, setLiked]       = useState({});
    const [saved, setSaved]       = useState({});
    const [searchText, setSearchText] = useState('');

    const Search      = window.lucide.Search;
    const Heart       = window.lucide.Heart;
    const MessageCircle = window.lucide.MessageCircle;
    const Bookmark    = window.lucide.Bookmark;
    const TrendingUp  = window.lucide.TrendingUp;
    const Users       = window.lucide.Users;
    const Star        = window.lucide.Star;
    const Sun         = window.lucide.Sun;
    const Moon        = window.lucide.Moon;
    const Share2      = window.lucide.Share2;

    const filters = ['trending', 'new', 'following', 'science', 'arts', 'tech'];

    const flows = [
      { id: 1, user: 'Maria C.', avatar: 'MC', title: 'The Big Bang in 10 Snippets',        desc: 'A curated journey from cosmic inflation to the first stars, using NASA clips and expert audio narrations.',      likes: 284, comments: 47, subject: 'Cosmology',    color: '#EFF6FF', accent: '#2563EB', snippets: 10, tags: ['science', 'space', 'beginner'] },
      { id: 2, user: 'Jordan L.', avatar: 'JL', title: 'Renaissance Masters Remix',          desc: "Connecting da Vinci's notebooks to modern design principles through visual diagrams and museum audio tours.",   likes: 156, comments: 23, subject: 'Art History',  color: '#FFF7ED', accent: '#F97316', snippets: 8,  tags: ['art', 'history', 'design']  },
      { id: 3, user: 'Sam K.',    avatar: 'SK', title: 'DNA Replication Visualized',          desc: 'Step-by-step molecular biology breakdown using animations, expert commentary, and textbook excerpts.',          likes: 412, comments: 68, subject: 'Biology',      color: '#F0FDF4', accent: '#16A34A', snippets: 14, tags: ['biology', 'science', 'advanced'] },
      { id: 4, user: 'Priya M.',  avatar: 'PM', title: 'Philosophy of Language — A Remix',   desc: 'Wittgenstein meets modern linguistics: text snippets, lecture clips, and interactive concept maps weaved together.', likes: 98, comments: 14, subject: 'Philosophy', color: '#FDF4FF', accent: '#9333EA', snippets: 9, tags: ['philosophy', 'language'] },
    ];

    return React.createElement('div', {
      className: 'ideaflow-scroll',
      style: { fontFamily: "'Comic Neue', cursive", background: t.bg, minHeight: '812px', overflowY: 'auto', paddingBottom: '88px', animation: 'fadeIn 0.28s ease' },
    },
      // ── Header
      React.createElement('div', { style: { background: t.surface, padding: '16px 20px 14px', borderBottom: `1px solid ${t.border}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
          React.createElement('h2', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '24px', color: t.text, margin: 0 } }, 'Flow Gallery'),
          React.createElement('button', { className: 'icon-btn', onClick: () => setIsDark(!isDark), style: { width: '36px', height: '36px', borderRadius: '50%', background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(isDark ? Sun : Moon, { size: 16, color: t.textMuted })
          )
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', background: t.surfaceAlt, borderRadius: '14px', padding: '10px 14px', border: `1.5px solid ${t.border}` } },
          React.createElement(Search, { size: 16, color: t.textMuted }),
          React.createElement('input', {
            value: searchText, onChange: e => setSearchText(e.target.value),
            placeholder: 'Search flows, topics, creators…',
            style: { flex: 1, background: 'none', border: 'none', outline: 'none', color: t.text, fontSize: '14px', fontFamily: "'Comic Neue', cursive" },
          })
        )
      ),

      // ── Filters
      React.createElement('div', { style: { display: 'flex', gap: '8px', padding: '12px 20px', overflowX: 'auto' }, className: 'ideaflow-scroll' },
        filters.map(f =>
          React.createElement('button', {
            key: f, onClick: () => setActiveFilter(f), className: 'pill-btn',
            style: { padding: '7px 15px', borderRadius: '99px', border: 'none', cursor: 'pointer', background: activeFilter === f ? t.primary : (isDark ? t.surface : '#fff'), color: activeFilter === f ? '#fff' : t.textMuted, fontFamily: "'Comic Neue', cursive", fontSize: '13px', fontWeight: activeFilter === f ? 700 : 400, whiteSpace: 'nowrap', boxShadow: activeFilter === f ? '0 4px 14px rgba(37,99,235,0.28)' : '0 1px 4px rgba(0,0,0,0.07)', textTransform: 'capitalize' },
          }, f)
        )
      ),

      // ── Community banner
      React.createElement('div', {
        style: { margin: '0 20px 18px', background: isDark ? `${t.primary}18` : `linear-gradient(135deg, ${t.primary}12, ${t.secondary}12)`, borderRadius: '18px', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: '13px', border: `1px solid ${t.primary}22` },
      },
        React.createElement('div', { style: { width: '40px', height: '40px', borderRadius: '12px', background: `${t.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'pulse 2.5s ease infinite' } },
          React.createElement(TrendingUp, { size: 20, color: t.primary })
        ),
        React.createElement('div', null,
          React.createElement('p', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '14px', color: t.text, margin: 0 } }, '2,847 Flows shared this week'),
          React.createElement('p', { style: { color: t.textMuted, fontSize: '12px', margin: 0 } }, 'Join the community of knowledge remixers')
        )
      ),

      // ── Flow cards
      React.createElement('div', { style: { padding: '0 20px' } },
        flows.map((flow, i) =>
          React.createElement('div', {
            key: flow.id, className: 'flow-card',
            style: { background: isDark ? t.surface : flow.color, borderRadius: '22px', padding: '18px', marginBottom: '14px', border: `1.5px solid ${isDark ? t.border : 'transparent'}`, boxShadow: '0 4px 18px rgba(0,0,0,0.07)', animation: `slideUp ${0.12 + i * 0.08}s ease` },
          },
            // User row
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' } },
              React.createElement('div', { style: { width: '38px', height: '38px', borderRadius: '50%', background: `linear-gradient(135deg, ${flow.accent}, ${flow.accent}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement('span', { style: { color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: "'Baloo 2', cursive" } }, flow.avatar)
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('p', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '13px', color: t.text, margin: 0 } }, flow.user),
                React.createElement('p', { style: { color: t.textMuted, fontSize: '11px', margin: 0 } }, `${flow.subject} · ${flow.snippets} snippets`)
              ),
              React.createElement('button', { className: 'icon-btn', onClick: () => setSaved(p => ({...p, [flow.id]: !p[flow.id]})), style: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px' } },
                React.createElement(Bookmark, { size: 18, color: saved[flow.id] ? flow.accent : t.textMuted, fill: saved[flow.id] ? flow.accent : 'none' })
              )
            ),
            React.createElement('h4', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '16px', color: t.text, margin: '0 0 6px' } }, flow.title),
            React.createElement('p', { style: { color: t.textMuted, fontSize: '13px', margin: '0 0 12px', lineHeight: 1.55 } }, flow.desc),
            // Tags
            React.createElement('div', { style: { display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' } },
              flow.tags.map(tag =>
                React.createElement('span', { key: tag, style: { padding: '3px 10px', borderRadius: '99px', background: `${flow.accent}18`, color: flow.accent, fontSize: '11px', fontWeight: 700, textTransform: 'capitalize' } }, '#' + tag)
              )
            ),
            // Actions
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '12px', borderTop: `1px solid ${isDark ? t.border : flow.accent + '22'}` } },
              React.createElement('button', { className: 'icon-btn', onClick: () => setLiked(p => ({...p, [flow.id]: !p[flow.id]})), style: { display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' } },
                React.createElement(Heart, { size: 16, color: liked[flow.id] ? '#EF4444' : t.textMuted, fill: liked[flow.id] ? '#EF4444' : 'none' }),
                React.createElement('span', { style: { color: t.textMuted, fontSize: '13px' } }, liked[flow.id] ? flow.likes + 1 : flow.likes)
              ),
              React.createElement('button', { className: 'icon-btn', style: { display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' } },
                React.createElement(MessageCircle, { size: 16, color: t.textMuted }),
                React.createElement('span', { style: { color: t.textMuted, fontSize: '13px' } }, flow.comments)
              ),
              React.createElement('div', { style: { flex: 1 } }),
              React.createElement('button', { className: 'primary-btn', onClick: () => setActiveScreen('canvas'), style: { padding: '7px 14px', background: flow.accent, border: 'none', borderRadius: '11px', cursor: 'pointer', color: '#fff', fontFamily: "'Baloo 2', cursive", fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', boxShadow: `0 3px 10px ${flow.accent}40` } },
                React.createElement(Share2, { size: 12, color: '#fff' }),
                'Remix this'
              )
            )
          )
        )
      )
    );
  }

  // ─────────────────────────── CHAT SCREEN ─────────────────────────────────
  function ChatScreen() {
    const [messages, setMessages] = useState([
      { role: 'ai',   text: "Hi! I'm your AI Co-Pilot. I can help you find content, structure your flows, and surface hidden connections between ideas. What are you curious about today?" },
      { role: 'user', text: 'Help me understand quantum entanglement for my physics flow.' },
      { role: 'ai',   text: "Great choice! Quantum entanglement is when two particles become correlated so measuring one instantly affects the other — regardless of distance. I found 3 short video clips from MIT OpenCourseWare, 2 text excerpts, and a Sean Carroll podcast clip that explain this beautifully. Want me to add them to your Quantum Physics Flow?" },
    ]);
    const [input, setInput]         = useState('');
    const [isTyping, setIsTyping]   = useState(false);
    const messagesEndRef            = useRef(null);

    const Send    = window.lucide.Send;
    const Bot     = window.lucide.Bot;
    const Sparkles = window.lucide.Sparkles;
    const Mic     = window.lucide.Mic;
    const Plus    = window.lucide.Plus;
    const Sun     = window.lucide.Sun;
    const Moon    = window.lucide.Moon;

    const suggestions = ['Find clips about black holes', 'Connect relativity to quantum mechanics', 'Quiz me on wave functions', 'Suggest beginner resources'];

    const aiReplies = [
      "I've found 5 relevant snippets on that topic! Including a 4-minute MinutePhysics video, a diagram from MIT, and an audio clip from Lex Fridman's podcast. Add to your flow?",
      "Interesting connection! Relativity and quantum mechanics diverge at Planck scales — I have a brilliant Feynman lecture clip that bridges both. Want me to link it into your current canvas?",
      "Pulling up a quick quiz now: What is the observer effect? What does superposition mean? I'll track your answers and suggest remedial snippets where needed.",
      "For beginners, I recommend starting with PBS Space Time on YouTube. I've curated 6 starter clips that build up gradually — no math required!",
    ];

    const handleSend = () => {
      if (!input.trim()) return;
      const userMsg = input.trim();
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
        setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      }, 1600);
    };

    useEffect(() => {
      if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return React.createElement('div', {
      style: { fontFamily: "'Comic Neue', cursive", background: t.bg, minHeight: '812px', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.28s ease' },
    },
      // ── Chat header
      React.createElement('div', {
        style: { background: `linear-gradient(140deg, ${t.primary} 0%, ${t.secondary} 100%)`, padding: '16px 20px 22px' },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            React.createElement('div', { style: { width: '46px', height: '46px', borderRadius: '16px', background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2.5s ease infinite' } },
              React.createElement(Sparkles, { size: 22, color: '#fff' })
            ),
            React.createElement('div', null,
              React.createElement('h3', { style: { fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: '19px', color: '#fff', margin: 0 } }, 'AI Co-Pilot'),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.72)', fontSize: '12px', margin: '1px 0 0' } }, 'Adaptive learning AI · Online')
            )
          ),
          React.createElement('button', { className: 'icon-btn', onClick: () => setIsDark(!isDark), style: { width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(isDark ? Sun : Moon, { size: 16, color: '#fff' })
          )
        )
      ),

      // ── Messages
      React.createElement('div', {
        className: 'ideaflow-scroll',
        style: { flex: 1, overflowY: 'auto', padding: '16px 16px 4px', display: 'flex', flexDirection: 'column', gap: '12px' },
      },
        messages.map((msg, i) =>
          React.createElement('div', {
            key: i,
            style: { display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end', animation: 'fadeIn 0.22s ease' },
          },
            msg.role === 'ai' && React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement(Bot, { size: 14, color: '#fff' })
            ),
            React.createElement('div', {
              style: { maxWidth: '78%', background: msg.role === 'user' ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : (isDark ? t.surface : '#fff'), color: msg.role === 'user' ? '#fff' : t.text, borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '11px 14px', fontSize: '14px', lineHeight: 1.55, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: msg.role === 'ai' ? `1px solid ${t.border}` : 'none' },
            }, msg.text),
            msg.role === 'user' && React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.cta}, #FB923C)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
              React.createElement('span', { style: { color: '#fff', fontSize: '11px', fontWeight: 700, fontFamily: "'Baloo 2', cursive" } }, 'A')
            )
          )
        ),

        // Typing dots
        isTyping && React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '8px', animation: 'fadeIn 0.2s ease' } },
          React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Bot, { size: 14, color: '#fff' })
          ),
          React.createElement('div', { style: { background: isDark ? t.surface : '#fff', borderRadius: '18px 18px 18px 4px', padding: '13px 16px', border: `1px solid ${t.border}`, display: 'flex', gap: '5px', alignItems: 'center' } },
            [0, 1, 2].map(j =>
              React.createElement('div', { key: j, style: { width: '7px', height: '7px', borderRadius: '50%', background: t.primary, animation: 'blink 1s ease infinite', animationDelay: `${j * 0.25}s` } })
            )
          )
        ),
        React.createElement('div', { ref: messagesEndRef })
      ),

      // ── Suggestions chips
      React.createElement('div', { className: 'ideaflow-scroll', style: { padding: '8px 16px 6px', display: 'flex', gap: '8px', overflowX: 'auto' } },
        suggestions.map(s =>
          React.createElement('button', {
            key: s, className: 'pill-btn', onClick: () => setInput(s),
            style: { padding: '7px 13px', borderRadius: '99px', background: isDark ? t.surface : '#fff', border: `1.5px solid ${t.border}`, color: t.primary, fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: "'Comic Neue', cursive", fontWeight: 700 },
          }, s)
        )
      ),

      // ── Input bar
      React.createElement('div', { style: { padding: '8px 14px 88px', background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', gap: '9px', alignItems: 'center' } },
        React.createElement('button', { className: 'icon-btn', style: { width: '44px', height: '44px', borderRadius: '14px', background: t.surfaceAlt, border: `1px solid ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(Mic, { size: 18, color: t.textMuted })
        ),
        React.createElement('div', { style: { flex: 1, background: t.surfaceAlt, borderRadius: '14px', border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', padding: '10px 13px', gap: '8px' } },
          React.createElement('input', {
            value: input, onChange: e => setInput(e.target.value),
            onKeyDown: e => e.key === 'Enter' && !e.shiftKey && handleSend(),
            placeholder: 'Ask your AI Co-Pilot…',
            style: { flex: 1, background: 'none', border: 'none', outline: 'none', color: t.text, fontSize: '14px', fontFamily: "'Comic Neue', cursive" },
          }),
          React.createElement('button', { className: 'icon-btn', onClick: handleSend, style: { width: '32px', height: '32px', borderRadius: '10px', background: input.trim() ? t.primary : t.border, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' } },
            React.createElement(Send, { size: 14, color: '#fff' })
          )
        )
      )
    );
  }

  // ─────────────────────────── BOTTOM NAV ─────────────────────────────────
  function BottomNav() {
    const Home2      = window.lucide.Home;
    const Layers     = window.lucide.Layers;
    const Compass    = window.lucide.Compass;
    const MessageSquare = window.lucide.MessageSquare;

    const tabs = [
      { id: 'home',     icon: Home2,         label: 'Home'    },
      { id: 'canvas',   icon: Layers,        label: 'Canvas'  },
      { id: 'discover', icon: Compass,       label: 'Discover'},
      { id: 'chat',     icon: MessageSquare, label: 'AI Chat' },
    ];

    return React.createElement('div', {
      style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', height: '72px', alignItems: 'stretch', zIndex: 100, borderRadius: '0 0 36px 36px', overflow: 'hidden', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' },
    },
      tabs.map(tab => {
        const IconComp = tab.icon;
        const isActive = activeScreen === tab.id;
        return React.createElement('button', {
          key: tab.id, onClick: () => setActiveScreen(tab.id), className: 'nav-tab',
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderRadius: 0 },
        },
          React.createElement('div', {
            style: { width: '42px', height: '26px', borderRadius: '13px', background: isActive ? `${t.primary}18` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' },
          },
            React.createElement(IconComp, { size: 20, color: isActive ? t.primary : t.textMuted })
          ),
          React.createElement('span', { style: { fontSize: '10px', fontFamily: "'Comic Neue', cursive", fontWeight: isActive ? 700 : 400, color: isActive ? t.primary : t.textMuted } },
            React.createElement('span', null, tab.label)
          )
        );
      })
    );
  }

  // ─────────────────────────── ROOT ────────────────────────────────────────
  const screens = { home: HomeScreen, canvas: CanvasScreen, discover: DiscoverScreen, chat: ChatScreen };
  const CurrentScreen = screens[activeScreen];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Comic Neue', cursive", padding: '20px' },
  },
    React.createElement('div', {
      style: { width: '375px', height: '812px', background: t.bg, borderRadius: '40px', overflow: 'hidden', position: 'relative', boxShadow: '0 28px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.07)', flexShrink: 0 },
    },
      React.createElement('div', { style: { height: '100%', overflowY: 'auto', position: 'relative' }, className: 'ideaflow-scroll' },
        React.createElement(CurrentScreen)
      ),
      React.createElement(BottomNav)
    )
  );
}
