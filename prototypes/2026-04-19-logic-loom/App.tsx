const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const themes = {
    dark: {
      primary: '#1E293B',
      secondary: '#334155',
      cta: '#22C55E',
      background: '#0F172A',
      surface: '#1E293B',
      surfaceLight: '#334155',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#334155',
      cardBg: '#1E293B',
      codeBg: '#0F172A',
      overlay: 'rgba(15, 23, 42, 0.8)',
    },
    light: {
      primary: '#1E293B',
      secondary: '#334155',
      cta: '#22C55E',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceLight: '#F1F5F9',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      cardBg: '#FFFFFF',
      codeBg: '#F1F5F9',
      overlay: 'rgba(248, 250, 252, 0.8)',
    },
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

  const styleTag = document.getElementById('app-animations');
  if (!styleTag) {
    const s = document.createElement('style');
    s.id = 'app-animations';
    s.textContent = `
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
      @keyframes weave {
        0% { stroke-dashoffset: 100; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.3); }
        50% { box-shadow: 0 0 20px rgba(34,197,94,0.6); }
      }
    `;
    document.head.appendChild(s);
  }

  const Icon = ({ name, size = 20, color = t.text, style = {} }) => {
    const IconComponent = window.lucide && window.lucide[name];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, style, strokeWidth: 1.8 });
  };

  // ─── HOME SCREEN ───
  function HomeScreen() {
    const [expandedChallenge, setExpandedChallenge] = useState(null);

    const dailyChallenge = {
      title: 'Optimize Array Intersection',
      difficulty: 'Medium',
      language: 'TypeScript',
      participants: 247,
      timeLeft: '6h 42m',
      description: 'Given two sorted arrays, find their intersection in O(n) time without using built-in Set operations.',
      contributions: 18,
      code: `function intersect(a: number[], b: number[]) {\n  // Current: O(n²) - optimize me!\n  return a.filter(x => b.includes(x));\n}`,
    };

    const weeklyChallenge = {
      title: 'Refactor Legacy Auth Middleware',
      difficulty: 'Hard',
      language: 'JavaScript',
      participants: 589,
      timeLeft: '3d 14h',
      contributions: 64,
    };

    const recentContributions = [
      { user: 'alex_dev', avatar: 'A', type: 'code', desc: 'Two-pointer approach for O(n)', points: 42, time: '12m ago', color: '#3B82F6' },
      { user: 'sara_codes', avatar: 'S', type: 'video', desc: 'Logic Bite: Hash map solution', points: 38, time: '25m ago', color: '#A855F7' },
      { user: 'dev_mike', avatar: 'M', type: 'code', desc: 'Binary search variant', points: 31, time: '1h ago', color: '#F59E0B' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' } },
      // Header
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.cta, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4, fontFamily: font } }, 'LOGIC LOOM'),
          React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: 0, fontFamily: font } }, 'Today\'s Weave'),
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('button', {
            onClick: () => setIsDark(!isDark),
            style: { width: 40, height: 40, borderRadius: 12, background: t.surfaceLight, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }
          }, React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 18, color: t.textSecondary })),
          React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(34,197,94,0.3)' } },
            React.createElement(Icon, { name: 'Bell', size: 18, color: '#fff' })
          ),
        )
      ),

      // Stats bar
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20 } },
        ...[
          { icon: 'Zap', label: 'Flow Points', value: '1,284' },
          { icon: 'Flame', label: 'Streak', value: '12 days' },
          { icon: 'Award', label: 'Badges', value: '8' },
        ].map((stat, i) =>
          React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 14, padding: '12px 10px', border: `1px solid ${t.border}`, textAlign: 'center' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 } },
              React.createElement(Icon, { name: stat.icon, size: 14, color: t.cta }),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, stat.label),
            ),
            React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: t.text, fontFamily: font } }, stat.value),
          )
        )
      ),

      // Daily Challenge Card
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.surface} 0%, ${isDark ? '#1a2744' : '#EFF6FF'} 100%)`,
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          border: `1px solid ${isDark ? '#2d4a7a' : '#BFDBFE'}`,
          boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          animation: 'slideUp 0.5s ease-out',
        },
        onClick: () => setExpandedChallenge(expandedChallenge === 'daily' ? null : 'daily'),
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#fff', background: t.cta, borderRadius: 6, padding: '3px 8px', fontFamily: font } }, 'DAILY'),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#F59E0B', background: 'rgba(245,158,11,0.15)', borderRadius: 6, padding: '3px 8px', fontFamily: font } }, dailyChallenge.difficulty),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, dailyChallenge.timeLeft),
          ),
        ),
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: '0 0 8px', fontFamily: font, letterSpacing: -0.3 } }, dailyChallenge.title),
        React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.5, fontFamily: font } }, dailyChallenge.description),

        // Code preview
        expandedChallenge === 'daily' && React.createElement('div', { style: { background: t.codeBg, borderRadius: 12, padding: 14, marginBottom: 14, border: `1px solid ${t.border}`, fontFamily: 'monospace', fontSize: 12, color: t.cta, lineHeight: 1.7, whiteSpace: 'pre', overflowX: 'auto', animation: 'fadeIn 0.3s ease-out' } }, dailyChallenge.code),

        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${dailyChallenge.participants} weaving`),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'GitBranch', size: 14, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${dailyChallenge.contributions} solutions`),
            ),
          ),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: '#3B82F6', fontFamily: font } }, dailyChallenge.language),
        ),
      ),

      // Weekly Challenge
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.surface} 0%, ${isDark ? '#2a1f3d' : '#FAF5FF'} 100%)`,
          borderRadius: 20,
          padding: 18,
          marginBottom: 24,
          border: `1px solid ${isDark ? '#4a3570' : '#E9D5FF'}`,
          boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        },
        onClick: () => setActiveScreen('canvas'),
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#fff', background: '#A855F7', borderRadius: 6, padding: '3px 8px', fontFamily: font } }, 'WEEKLY'),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#EF4444', background: 'rgba(239,68,68,0.15)', borderRadius: 6, padding: '3px 8px', fontFamily: font } }, weeklyChallenge.difficulty),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Clock', size: 14, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: font } }, weeklyChallenge.timeLeft),
          ),
        ),
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 10px', fontFamily: font } }, weeklyChallenge.title),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Users', size: 14, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, `${weeklyChallenge.participants} weaving`),
          ),
          React.createElement('div', { style: { flex: 1, height: 4, background: t.surfaceLight, borderRadius: 2 } },
            React.createElement('div', { style: { width: '42%', height: '100%', background: 'linear-gradient(90deg, #A855F7, #7C3AED)', borderRadius: 2 } }),
          ),
          React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, '42%'),
        ),
      ),

      // Recent Contributions
      React.createElement('div', { style: { marginBottom: 8 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
          React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: 0, fontFamily: font } }, 'Live Contributions'),
          React.createElement('button', {
            onClick: () => setActiveScreen('canvas'),
            style: { fontSize: 13, color: t.cta, background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontFamily: font }
          }, 'View Canvas'),
        ),
        ...recentContributions.map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: t.surface, borderRadius: 14, marginBottom: 8,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              transition: 'all 0.2s',
              animation: `slideUp ${0.4 + i * 0.1}s ease-out`,
            }
          },
            React.createElement('div', { style: { width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: font, flexShrink: 0 } }, c.avatar),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
                React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, c.user),
                React.createElement(Icon, { name: c.type === 'video' ? 'Video' : 'Code', size: 12, color: t.textMuted }),
              ),
              React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: 0, fontFamily: font, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, c.desc),
            ),
            React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 700, color: t.cta, fontFamily: font } }, `+${c.points}`),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font } }, c.time),
            ),
          )
        ),
      ),
    );
  }

  // ─── CANVAS SCREEN ───
  function CanvasScreen() {
    const [activeTab, setActiveTab] = useState('code');
    const [selectedNode, setSelectedNode] = useState(null);

    const nodes = [
      { id: 1, user: 'alex_dev', avatar: 'A', color: '#3B82F6', approach: 'Two Pointer', votes: 42, x: 20, y: 20, code: 'let i = 0, j = 0;\nconst result = [];\nwhile (i < a.length && j < b.length) {\n  if (a[i] === b[j]) {\n    result.push(a[i]);\n    i++; j++;\n  } else if (a[i] < b[j]) i++;\n  else j++;\n}\nreturn result;' },
      { id: 2, user: 'sara_codes', avatar: 'S', color: '#A855F7', approach: 'Hash Map', votes: 38, x: 55, y: 15, code: 'const map = new Map();\nfor (const x of a) map.set(x, (map.get(x)||0)+1);\nreturn b.filter(x => {\n  if (map.get(x) > 0) {\n    map.set(x, map.get(x)-1);\n    return true;\n  }\n});' },
      { id: 3, user: 'dev_mike', avatar: 'M', color: '#F59E0B', approach: 'Binary Search', votes: 31, x: 38, y: 55, code: 'function bSearch(arr, t) {\n  let lo=0, hi=arr.length-1;\n  while(lo<=hi) {\n    const mid=(lo+hi)>>1;\n    if(arr[mid]===t) return mid;\n    arr[mid]<t ? lo=mid+1 : hi=mid-1;\n  }\n  return -1;\n}' },
      { id: 4, user: 'code_lin', avatar: 'L', color: '#EF4444', approach: 'Merge Variant', votes: 27, x: 72, y: 50, code: 'const merged = [];\nlet i = 0, j = 0;\nwhile (i < a.length && j < b.length) {\n  if (a[i] < b[j]) i++;\n  else if (a[i] > b[j]) j++;\n  else { merged.push(a[i]); i++; j++; }\n}' },
    ];

    const threads = [
      { user: 'alex_dev', avatar: 'A', color: '#3B82F6', line: 3, text: 'The two-pointer approach handles duplicates naturally since both pointers advance together.', replies: 5, time: '15m ago' },
      { user: 'nina_js', avatar: 'N', color: '#EC4899', line: 1, text: 'Consider edge case: what if arrays have different lengths? We should add length checks.', replies: 3, time: '28m ago' },
      { user: 'dev_mike', avatar: 'M', color: '#F59E0B', line: 5, text: 'Binary search gives O(n log n) which isn\'t optimal here but works well for unsorted input.', replies: 8, time: '42m ago' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 } },
        React.createElement('button', {
          onClick: () => setActiveScreen('home'),
          style: { width: 36, height: 36, borderRadius: 10, background: t.surfaceLight, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        }, React.createElement(Icon, { name: 'ArrowLeft', size: 18, color: t.text })),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: t.text, margin: 0, fontFamily: font, letterSpacing: -0.3 } }, 'Solution Canvas'),
          React.createElement('p', { style: { fontSize: 13, color: t.textMuted, margin: 0, fontFamily: font } }, 'Optimize Array Intersection'),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)', padding: '6px 10px', borderRadius: 8, animation: 'glow 2s infinite' } },
          React.createElement(Icon, { name: 'Radio', size: 14, color: t.cta }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.cta, fontFamily: font } }, 'LIVE'),
        ),
      ),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 16, background: t.surfaceLight, borderRadius: 12, padding: 4 } },
        ...['code', 'threads', 'video'].map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setActiveTab(tab),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: activeTab === tab ? t.cta : 'transparent',
              color: activeTab === tab ? '#fff' : t.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font,
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }
          },
            React.createElement(Icon, { name: tab === 'code' ? 'Code' : tab === 'threads' ? 'MessageSquare' : 'Video', size: 14, color: activeTab === tab ? '#fff' : t.textMuted }),
            React.createElement('span', null, tab.charAt(0).toUpperCase() + tab.slice(1)),
          )
        ),
      ),

      activeTab === 'code' && React.createElement('div', null,
        // Visual canvas
        React.createElement('div', {
          style: {
            background: t.codeBg, borderRadius: 16, padding: 16, marginBottom: 16,
            border: `1px solid ${t.border}`, position: 'relative', height: 200,
            overflow: 'hidden',
          }
        },
          // Connection lines (SVG)
          React.createElement('svg', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 } },
            React.createElement('line', { x1: '15%', y1: '35%', x2: '45%', y2: '65%', stroke: t.textMuted, strokeWidth: 1, opacity: 0.3, strokeDasharray: '4,4' }),
            React.createElement('line', { x1: '60%', y1: '30%', x2: '45%', y2: '65%', stroke: t.textMuted, strokeWidth: 1, opacity: 0.3, strokeDasharray: '4,4' }),
            React.createElement('line', { x1: '45%', y1: '65%', x2: '78%', y2: '60%', stroke: t.textMuted, strokeWidth: 1, opacity: 0.3, strokeDasharray: '4,4' }),
            React.createElement('line', { x1: '15%', y1: '35%', x2: '60%', y2: '30%', stroke: t.cta, strokeWidth: 1.5, opacity: 0.5, strokeDasharray: '4,4' }),
          ),
          // Nodes
          ...nodes.map((node, i) =>
            React.createElement('div', {
              key: node.id,
              onClick: () => setSelectedNode(selectedNode === node.id ? null : node.id),
              style: {
                position: 'absolute',
                left: `${node.x}%`, top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer', zIndex: 1,
                animation: `fadeIn ${0.3 + i * 0.15}s ease-out`,
              }
            },
              React.createElement('div', {
                style: {
                  width: selectedNode === node.id ? 56 : 44,
                  height: selectedNode === node.id ? 56 : 44,
                  borderRadius: selectedNode === node.id ? 16 : 13,
                  background: `linear-gradient(135deg, ${node.color}, ${node.color}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: font,
                  boxShadow: `0 4px 12px ${node.color}44`,
                  border: selectedNode === node.id ? '2px solid #fff' : `2px solid ${node.color}66`,
                  transition: 'all 0.25s',
                }
              }, node.avatar),
              React.createElement('div', { style: { textAlign: 'center', marginTop: 4 } },
                React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.text, fontFamily: font, whiteSpace: 'nowrap' } }, node.approach),
                React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontFamily: font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 } },
                  React.createElement(Icon, { name: 'ThumbsUp', size: 9, color: t.textMuted }),
                  node.votes,
                ),
              ),
            )
          ),
        ),

        // Selected node detail
        selectedNode && React.createElement('div', { style: { background: t.surface, borderRadius: 14, padding: 14, marginBottom: 16, border: `1px solid ${t.border}`, animation: 'fadeIn 0.3s ease-out' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement('div', { style: { width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${nodes[selectedNode-1].color}, ${nodes[selectedNode-1].color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: font } }, nodes[selectedNode-1].avatar),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, nodes[selectedNode-1].user),
            React.createElement('span', { style: { fontSize: 12, color: t.cta, fontWeight: 600, fontFamily: font, marginLeft: 'auto' } }, nodes[selectedNode-1].approach),
          ),
          React.createElement('div', { style: { background: t.codeBg, borderRadius: 10, padding: 12, fontFamily: 'monospace', fontSize: 11, color: t.cta, lineHeight: 1.7, whiteSpace: 'pre', overflowX: 'auto', border: `1px solid ${t.border}` } }, nodes[selectedNode-1].code),
        ),

        // Action buttons
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', {
            style: { flex: 1, padding: '14px 0', borderRadius: 14, background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, border: 'none', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: font, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(34,197,94,0.3)', transition: 'all 0.2s' }
          },
            React.createElement(Icon, { name: 'Plus', size: 18, color: '#fff' }),
            React.createElement('span', null, 'Add Solution'),
          ),
          React.createElement('button', {
            style: { width: 50, height: 50, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
          }, React.createElement(Icon, { name: 'Video', size: 20, color: t.textSecondary })),
        ),
      ),

      activeTab === 'threads' && React.createElement('div', null,
        ...threads.map((thread, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface, borderRadius: 14, padding: 14, marginBottom: 10,
              border: `1px solid ${t.border}`, animation: `slideUp ${0.3 + i * 0.1}s ease-out`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${thread.color}, ${thread.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: font } }, thread.avatar),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font } }, thread.user),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginLeft: 8 } }, thread.time),
              ),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: '#3B82F6', background: 'rgba(59,130,246,0.15)', padding: '2px 8px', borderRadius: 6, fontFamily: font } }, `Line ${thread.line}`),
            ),
            React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, margin: '0 0 8px', lineHeight: 1.5, fontFamily: font } }, thread.text),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' } },
                React.createElement(Icon, { name: 'MessageCircle', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${thread.replies} replies`),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' } },
                React.createElement(Icon, { name: 'ThumbsUp', size: 14, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, 'Helpful'),
              ),
            ),
          )
        ),
      ),

      activeTab === 'video' && React.createElement('div', null,
        ...[
          { user: 'sara_codes', avatar: 'S', color: '#A855F7', title: 'Hash Map Approach Explained', duration: '0:47', views: 234 },
          { user: 'code_lin', avatar: 'L', color: '#EF4444', title: 'Why Merge Variant Handles Dupes', duration: '0:32', views: 178 },
          { user: 'js_ninja', avatar: 'J', color: '#06B6D4', title: 'Benchmark: All Four Approaches', duration: '0:58', views: 412 },
        ].map((vid, i) =>
          React.createElement('div', {
            key: i,
            style: {
              background: t.surface, borderRadius: 14, padding: 14, marginBottom: 10,
              border: `1px solid ${t.border}`, display: 'flex', gap: 12,
              animation: `slideUp ${0.3 + i * 0.1}s ease-out`, cursor: 'pointer',
            }
          },
            React.createElement('div', { style: { width: 80, height: 56, borderRadius: 10, background: `linear-gradient(135deg, ${vid.color}33, ${vid.color}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${vid.color}33` } },
              React.createElement(Icon, { name: 'Play', size: 22, color: vid.color }),
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 4 } }, vid.title),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, vid.user),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, vid.duration),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${vid.views} views`),
              ),
            ),
          )
        ),
      ),
    );
  }

  // ─── CHALLENGES SCREEN ───
  function ChallengesScreen() {
    const [filter, setFilter] = useState('all');

    const challenges = [
      { title: 'Debounce with Cancel', difficulty: 'Easy', lang: 'TypeScript', participants: 156, contributions: 22, progress: 78, color: '#22C55E', tag: 'daily' },
      { title: 'LRU Cache Implementation', difficulty: 'Hard', lang: 'Python', participants: 432, contributions: 57, progress: 45, color: '#EF4444', tag: 'weekly' },
      { title: 'Promise.allSettled Polyfill', difficulty: 'Medium', lang: 'JavaScript', participants: 289, contributions: 34, progress: 62, color: '#F59E0B', tag: 'daily' },
      { title: 'Rate Limiter Middleware', difficulty: 'Hard', lang: 'Go', participants: 198, contributions: 41, progress: 33, color: '#EF4444', tag: 'weekly' },
      { title: 'Flatten Nested Object', difficulty: 'Easy', lang: 'JavaScript', participants: 521, contributions: 68, progress: 91, color: '#22C55E', tag: 'completed' },
      { title: 'Event Emitter Pattern', difficulty: 'Medium', lang: 'TypeScript', participants: 314, contributions: 45, progress: 55, color: '#F59E0B', tag: 'daily' },
    ];

    const filtered = filter === 'all' ? challenges : challenges.filter(c => c.tag === filter);

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 4px', fontFamily: font } }, 'Challenges'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 20px', fontFamily: font } }, 'Find your next code weave'),

      // Filters
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
        ...['all', 'daily', 'weekly', 'completed'].map(f =>
          React.createElement('button', {
            key: f,
            onClick: () => setFilter(f),
            style: {
              padding: '8px 16px', borderRadius: 10, border: 'none',
              background: filter === f ? t.cta : t.surfaceLight,
              color: filter === f ? '#fff' : t.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font,
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }
          }, f.charAt(0).toUpperCase() + f.slice(1))
        ),
      ),

      // Search
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, background: t.surface, borderRadius: 14, padding: '12px 14px', marginBottom: 18, border: `1px solid ${t.border}` } },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
        React.createElement('span', { style: { fontSize: 15, color: t.textMuted, fontFamily: font } }, 'Search challenges...'),
      ),

      // Challenge list
      ...filtered.map((ch, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.surface, borderRadius: 16, padding: 16, marginBottom: 10,
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.2s', animation: `slideUp ${0.3 + i * 0.08}s ease-out`,
          },
          onClick: () => setActiveScreen('canvas'),
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: ch.color, background: `${ch.color}20`, borderRadius: 6, padding: '3px 8px', fontFamily: font } }, ch.difficulty),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#3B82F6', background: 'rgba(59,130,246,0.15)', borderRadius: 6, padding: '3px 8px', fontFamily: font } }, ch.lang),
            ),
            ch.tag === 'completed' && React.createElement(Icon, { name: 'CheckCircle', size: 18, color: t.cta }),
          ),
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 10px', fontFamily: font } }, ch.title),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Users', size: 13, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font } }, ch.participants),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'GitBranch', size: 13, color: t.textMuted }),
              React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font } }, `${ch.contributions} solutions`),
            ),
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('div', { style: { flex: 1, height: 4, background: t.surfaceLight, borderRadius: 2 } },
              React.createElement('div', { style: { width: `${ch.progress}%`, height: '100%', background: `linear-gradient(90deg, ${t.cta}, #16A34A)`, borderRadius: 2, transition: 'width 0.3s' } }),
            ),
            React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.textMuted, fontFamily: font, minWidth: 32, textAlign: 'right' } }, `${ch.progress}%`),
          ),
        )
      ),
    );
  }

  // ─── PROFILE SCREEN ───
  function ProfileScreen() {
    const badges = [
      { name: 'Code Weaver', desc: 'Complete 10 daily challenges', icon: 'Sparkles', earned: true, color: '#F59E0B' },
      { name: 'Elegant Coder', desc: 'Earn 50+ elegance votes', icon: 'Gem', earned: true, color: '#A855F7' },
      { name: 'Thread Starter', desc: 'Start 20 insight threads', icon: 'MessageSquare', earned: true, color: '#3B82F6' },
      { name: 'Logic Master', desc: '30-day streak', icon: 'Crown', earned: false, color: '#64748B' },
      { name: 'Speed Weaver', desc: 'First solution 3 times', icon: 'Zap', earned: true, color: '#22C55E' },
      { name: 'Mentor', desc: 'Help 50 developers', icon: 'Heart', earned: false, color: '#64748B' },
    ];

    const activity = [
      { day: 'Mon', value: 3 }, { day: 'Tue', value: 5 }, { day: 'Wed', value: 2 },
      { day: 'Thu', value: 7 }, { day: 'Fri', value: 4 }, { day: 'Sat', value: 1 }, { day: 'Sun', value: 6 },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' } },
      // Profile header
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 24 } },
        React.createElement('div', { style: { width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg, ${t.cta}, #16A34A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: font, boxShadow: '0 4px 20px rgba(34,197,94,0.3)' } }, 'S'),
        React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: t.text, margin: '0 0 4px', fontFamily: font } }, 'Steve_Dev'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSecondary, margin: '0 0 16px', fontFamily: font } }, 'Full-stack weaver since 2024'),

        // Stats
        React.createElement('div', { style: { display: 'flex', gap: 0 } },
          ...[
            { label: 'Flow Points', value: '1,284' },
            { label: 'Solutions', value: '47' },
            { label: 'Impact', value: '92%' },
          ].map((s, i) =>
            React.createElement('div', { key: i, style: { flex: 1, borderRight: i < 2 ? `1px solid ${t.border}` : 'none' } },
              React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: font } }, s.value),
              React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, s.label),
            )
          ),
        ),
      ),

      // Weekly Activity
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${t.border}` } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 14px', fontFamily: font } }, 'This Week'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 } },
          ...activity.map((a, i) =>
            React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center' } },
              React.createElement('div', {
                style: {
                  height: `${(a.value / 7) * 60}px`,
                  background: a.value > 4 ? `linear-gradient(180deg, ${t.cta}, #16A34A)` : t.surfaceLight,
                  borderRadius: 6, marginBottom: 6,
                  transition: 'height 0.3s',
                }
              }),
              React.createElement('span', { style: { fontSize: 10, color: t.textMuted, fontFamily: font } }, a.day),
            )
          ),
        ),
      ),

      // Loom Badges
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 14px', fontFamily: font } }, 'Loom Badges'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
          ...badges.map((badge, i) =>
            React.createElement('div', {
              key: i,
              style: {
                background: badge.earned ? t.surface : t.surfaceLight,
                borderRadius: 14, padding: '14px 10px', textAlign: 'center',
                border: `1px solid ${badge.earned ? badge.color + '44' : t.border}`,
                opacity: badge.earned ? 1 : 0.5,
                transition: 'all 0.2s', cursor: 'pointer',
                animation: `fadeIn ${0.2 + i * 0.1}s ease-out`,
              }
            },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: badge.earned ? `${badge.color}22` : t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' } },
                React.createElement(Icon, { name: badge.icon, size: 18, color: badge.color }),
              ),
              React.createElement('div', { style: { fontSize: 11, fontWeight: 600, color: t.text, fontFamily: font, marginBottom: 2 } }, badge.name),
              React.createElement('div', { style: { fontSize: 9, color: t.textMuted, fontFamily: font } }, badge.desc),
            )
          ),
        ),
      ),

      // Coding Style
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` } },
        React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 12px', fontFamily: font } }, 'Your Coding Style'),
        ...[
          { label: 'Elegance', value: 87, color: '#A855F7' },
          { label: 'Clarity', value: 92, color: '#3B82F6' },
          { label: 'Performance', value: 78, color: '#F59E0B' },
          { label: 'Innovation', value: 65, color: '#EF4444' },
        ].map((skill, i) =>
          React.createElement('div', { key: i, style: { marginBottom: 10 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('span', { style: { fontSize: 13, color: t.textSecondary, fontFamily: font } }, skill.label),
              React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: skill.color, fontFamily: font } }, `${skill.value}%`),
            ),
            React.createElement('div', { style: { height: 6, background: t.surfaceLight, borderRadius: 3 } },
              React.createElement('div', { style: { width: `${skill.value}%`, height: '100%', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, borderRadius: 3, transition: 'width 0.5s' } }),
            ),
          )
        ),
      ),
    );
  }

  // ─── LEADERBOARD / COMMUNITY SCREEN ───
  function CommunityScreen() {
    const [tab, setTab] = useState('top');

    const topContributors = [
      { rank: 1, user: 'code_wizard', avatar: 'C', points: 4821, streak: 45, color: '#F59E0B', badge: 'Crown' },
      { rank: 2, user: 'algo_queen', avatar: 'A', points: 4156, streak: 38, color: '#94A3B8', badge: 'Award' },
      { rank: 3, user: 'rust_ninja', avatar: 'R', points: 3892, streak: 31, color: '#CD7F32', badge: 'Medal' },
      { rank: 4, user: 'py_master', avatar: 'P', points: 3654, streak: 28, color: '#3B82F6' },
      { rank: 5, user: 'Steve_Dev', avatar: 'S', points: 1284, streak: 12, color: '#22C55E', isYou: true },
    ];

    const trending = [
      { title: 'Optimize Array Intersection', hot: true, contributions: 247, growth: '+34%' },
      { title: 'Debounce with Cancel', hot: false, contributions: 156, growth: '+21%' },
      { title: 'LRU Cache Implementation', hot: true, contributions: 432, growth: '+18%' },
    ];

    return React.createElement('div', { style: { padding: '20px 16px 100px', animation: 'fadeIn 0.4s ease-out' } },
      React.createElement('h1', { style: { fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -0.5, margin: '0 0 4px', fontFamily: font } }, 'Community'),
      React.createElement('p', { style: { fontSize: 15, color: t.textSecondary, margin: '0 0 20px', fontFamily: font } }, 'See who\'s weaving the best solutions'),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 20, background: t.surfaceLight, borderRadius: 12, padding: 4 } },
        ...['top', 'trending', 'following'].map(tb =>
          React.createElement('button', {
            key: tb,
            onClick: () => setTab(tb),
            style: {
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
              background: tab === tb ? t.cta : 'transparent',
              color: tab === tb ? '#fff' : t.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font,
              transition: 'all 0.2s',
            }
          }, tb.charAt(0).toUpperCase() + tb.slice(1))
        ),
      ),

      tab === 'top' && React.createElement('div', null,
        // Top 3 podium
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 24, height: 170 } },
          ...[1, 0, 2].map(idx => {
            const c = topContributors[idx];
            const heights = [140, 110, 95];
            const h = heights[idx];
            return React.createElement('div', { key: idx, style: { textAlign: 'center', flex: 1, animation: `slideUp ${0.3 + idx * 0.15}s ease-out` } },
              React.createElement('div', { style: { width: idx === 0 ? 56 : 44, height: idx === 0 ? 56 : 44, borderRadius: idx === 0 ? 18 : 14, background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: idx === 0 ? 20 : 16, fontWeight: 700, color: '#fff', fontFamily: font, boxShadow: idx === 0 ? `0 4px 20px ${c.color}44` : 'none', border: idx === 0 ? '3px solid #fff' : 'none' } }, c.avatar),
              React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.text, fontFamily: font } }, c.user),
              React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: font, marginBottom: 6 } }, `${c.points.toLocaleString()} pts`),
              React.createElement('div', { style: { height: h - 80, background: `linear-gradient(180deg, ${c.color}44, ${c.color}11)`, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                c.badge && React.createElement(Icon, { name: c.badge, size: 20, color: c.color }),
              ),
            );
          }),
        ),

        // Rest of list
        ...topContributors.slice(3).map((c, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: c.isYou ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.05)') : t.surface,
              borderRadius: 14, marginBottom: 8,
              border: c.isYou ? `1px solid ${t.cta}44` : `1px solid ${t.border}`,
              animation: `fadeIn ${0.5 + i * 0.1}s ease-out`,
            }
          },
            React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.textMuted, fontFamily: font, width: 24, textAlign: 'center' } }, `#${c.rank}`),
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: font } }, c.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: font } }, c.user),
                c.isYou && React.createElement('span', { style: { fontSize: 10, fontWeight: 600, color: t.cta, background: `${t.cta}22`, padding: '1px 6px', borderRadius: 4, fontFamily: font } }, 'YOU'),
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Flame', size: 12, color: '#F59E0B' }),
                React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontFamily: font } }, `${c.streak} day streak`),
              ),
            ),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: font } }, c.points.toLocaleString()),
          )
        ),
      ),

      tab === 'trending' && React.createElement('div', null,
        ...trending.map((item, i) =>
          React.createElement('div', {
            key: i, onClick: () => setActiveScreen('canvas'),
            style: {
              background: t.surface, borderRadius: 14, padding: 16, marginBottom: 10,
              border: `1px solid ${t.border}`, cursor: 'pointer',
              animation: `slideUp ${0.3 + i * 0.1}s ease-out`,
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
              React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: t.text, margin: 0, fontFamily: font } }, item.title),
              item.hot && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239,68,68,0.15)', padding: '3px 8px', borderRadius: 6 } },
                React.createElement(Icon, { name: 'TrendingUp', size: 12, color: '#EF4444' }),
                React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: '#EF4444', fontFamily: font } }, 'HOT'),
              ),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Users', size: 13, color: t.textMuted }),
                React.createElement('span', { style: { fontSize: 12, color: t.textSecondary, fontFamily: font } }, `${item.contributions} contributions`),
              ),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: t.cta, fontFamily: font } }, item.growth),
            ),
          )
        ),
      ),

      tab === 'following' && React.createElement('div', { style: { textAlign: 'center', padding: '40px 20px' } },
        React.createElement('div', { style: { width: 64, height: 64, borderRadius: 20, background: t.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' } },
          React.createElement(Icon, { name: 'UserPlus', size: 28, color: t.textMuted }),
        ),
        React.createElement('h3', { style: { fontSize: 17, fontWeight: 700, color: t.text, margin: '0 0 8px', fontFamily: font } }, 'Follow Weavers'),
        React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: font, lineHeight: 1.5 } }, 'Follow developers to see their solutions and learn from their coding style.'),
      ),
    );
  }

  // ─── NAVIGATION ───
  const screens = { home: HomeScreen, canvas: CanvasScreen, challenges: ChallengesScreen, community: CommunityScreen, profile: ProfileScreen };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'challenges', icon: 'Layers', label: 'Challenges' },
    { id: 'canvas', icon: 'LayoutGrid', label: 'Canvas' },
    { id: 'community', icon: 'Users', label: 'Community' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement('div', { style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: '20px 0' } },
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40, overflow: 'hidden',
        background: t.background, position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
      }
    },
      // Content
      React.createElement('div', { style: { height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' } },
        React.createElement(screens[activeScreen] || HomeScreen),
      ),

      // Bottom Nav
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 28px',
          display: 'flex', justifyContent: 'space-around',
        }
      },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 12px', minWidth: 50, minHeight: 44,
              transition: 'all 0.2s',
            }
          },
            React.createElement(Icon, {
              name: item.icon, size: 22,
              color: activeScreen === item.id ? t.cta : t.textMuted,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === item.id ? 600 : 400,
                color: activeScreen === item.id ? t.cta : t.textMuted,
                fontFamily: font,
              }
            }, item.label),
          )
        ),
      ),
    ),
  );
}
