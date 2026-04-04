const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#FFF0F0',
    surface: '#FFFFFF',
    surfaceAlt: '#FFE8E8',
    primary: '#E91E63',
    primaryDark: '#C2185B',
    text: '#2C2C2C',
    textMuted: '#6B6B6B',
    textLight: '#9E9E9E',
    border: '#F0CCCC',
    codeBg: '#2C2C2C',
    codeText: '#F8F8F8',
    navBg: '#FFFFFF',
    navBorder: '#F0CCCC',
    tag: '#FFE0EA',
    tagText: '#C2185B',
    badge: '#E91E63',
    inputBg: '#FFFFFF',
    inputBorder: '#E0B0B8',
    overlay: 'rgba(255,240,240,0.9)',
    headerOverlay: 'rgba(44,44,44,0.55)',
  },
  dark: {
    bg: '#1A1A1A',
    surface: '#242424',
    surfaceAlt: '#2E2020',
    primary: '#E91E63',
    primaryDark: '#F06292',
    text: '#F5F5F5',
    textMuted: '#BDBDBD',
    textLight: '#757575',
    border: '#3D2828',
    codeBg: '#111111',
    codeText: '#F8F8F8',
    navBg: '#1E1E1E',
    navBorder: '#3D2828',
    tag: '#4A1A2E',
    tagText: '#F48FB1',
    badge: '#E91E63',
    inputBg: '#2C2C2C',
    inputBorder: '#4D3030',
    overlay: 'rgba(26,26,26,0.9)',
    headerOverlay: 'rgba(20,10,10,0.65)',
  }
};

const challenges = [
  {
    id: 1,
    author: 'Mira Chen',
    handle: '@mira_dev',
    avatar: 'MC',
    avatarColor: '#E91E63',
    title: 'Refactor this SQL query — it\'s killing our DB 🔥',
    code: `SELECT u.*, p.*, o.*\nFROM users u, products p, orders o\nWHERE u.id = o.user_id\nAND p.id = o.product_id\nAND u.country = 'US';`,
    lang: 'SQL',
    tags: ['performance', 'sql', 'refactor'],
    surges: 14,
    upvotes: 89,
    timeAgo: '2h ago',
    headerImg: 'sql',
  },
  {
    id: 2,
    author: 'Dev Patel',
    handle: '@devpatel',
    avatar: 'DP',
    avatarColor: '#FF5722',
    title: 'Can you solve this async race condition in < 5 lines?',
    code: `async function fetchAll(ids) {\n  const results = [];\n  for (const id of ids) {\n    results.push(await fetch('/api/' + id));\n  }\n  return results;\n}`,
    lang: 'JavaScript',
    tags: ['async', 'javascript', 'optimization'],
    surges: 31,
    upvotes: 142,
    timeAgo: '5h ago',
    headerImg: 'js',
  },
  {
    id: 3,
    author: 'Sofia Ruiz',
    handle: '@sofiacode',
    avatar: 'SR',
    avatarColor: '#9C27B0',
    title: 'Fix the CSS specificity hell in this navbar',
    code: `.nav .nav-item .link a:hover {\n  color: red !important;\n}`,
    lang: 'CSS',
    tags: ['css', 'specificity', 'debugging'],
    surges: 8,
    upvotes: 55,
    timeAgo: '1d ago',
    headerImg: 'css',
  },
  {
    id: 4,
    author: 'Kai Tanaka',
    handle: '@kai_builds',
    avatar: 'KT',
    avatarColor: '#00BCD4',
    title: 'This React re-render loop has stumped me for 3 days',
    code: `useEffect(() => {\n  setCount(count + 1);\n}, [count]);`,
    lang: 'React',
    tags: ['react', 'hooks', 'debugging'],
    surges: 22,
    upvotes: 201,
    timeAgo: '2d ago',
    headerImg: 'react',
  },
];

const remixChain = [
  {
    id: 1,
    author: 'Alex Wu',
    handle: '@alexwu',
    avatar: 'AW',
    avatarColor: '#4CAF50',
    type: 'Solution',
    timeAgo: '1h ago',
    upvotes: 47,
    code: `SELECT u.id, u.name, p.title, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nJOIN products p ON p.id = o.product_id\nWHERE u.country = 'US'\nLIMIT 100;`,
    note: 'Use explicit JOINs and select only needed columns. Implicit joins can prevent query optimizer from picking the best plan.',
  },
  {
    id: 2,
    author: 'Jamie Lee',
    handle: '@jlee_dev',
    avatar: 'JL',
    avatarColor: '#FF9800',
    type: 'Optimization',
    timeAgo: '45m ago',
    upvotes: 33,
    code: `-- Add a composite index:\nCREATE INDEX idx_orders_user_product\n  ON orders(user_id, product_id);`,
    note: 'Don\'t forget the index! The JOIN rewrite helps, but indexing on the FK columns is the real performance win.',
  },
];

const vaultCategories = [
  { id: 'all', label: 'All', count: 2841 },
  { id: 'sql', label: 'SQL', count: 312 },
  { id: 'javascript', label: 'JS', count: 891 },
  { id: 'react', label: 'React', count: 443 },
  { id: 'css', label: 'CSS', count: 198 },
  { id: 'python', label: 'Python', count: 567 },
  { id: 'rust', label: 'Rust', count: 145 },
];

const vaultItems = [
  { id: 1, title: 'The definitive async/await patterns in JS', lang: 'JavaScript', surges: 89, views: '12.3k', difficulty: 'Intermediate' },
  { id: 2, title: 'SQL N+1 problem: 7 community solutions', lang: 'SQL', surges: 44, views: '8.1k', difficulty: 'Advanced' },
  { id: 3, title: 'CSS Grid mastery — live debugging session', lang: 'CSS', surges: 27, views: '5.4k', difficulty: 'Beginner' },
  { id: 4, title: 'React memo() vs useMemo() vs useCallback()', lang: 'React', surges: 112, views: '19.7k', difficulty: 'Intermediate' },
  { id: 5, title: 'Python list comprehension Olympics', lang: 'Python', surges: 61, views: '7.2k', difficulty: 'Beginner' },
];

const artifacts = [
  { id: 1, name: 'Surge Master', desc: '50+ accepted surges', icon: '⚡', earned: true, color: '#E91E63' },
  { id: 2, name: 'Code Sculptor', desc: '10 challenges created', icon: '🎨', earned: true, color: '#FF5722' },
  { id: 3, name: 'Optimizer', desc: 'Best performance fix', icon: '🚀', earned: true, color: '#4CAF50' },
  { id: 4, name: 'Vault Curator', desc: '5 top-ranked solutions', icon: '🏛', earned: false, color: '#9E9E9E' },
  { id: 5, name: 'Polyglot', desc: 'Surges in 5+ languages', icon: '🌐', earned: false, color: '#9E9E9E' },
  { id: 6, name: 'Mentor', desc: '100 helpful comments', icon: '🧑‍🏫', earned: false, color: '#9E9E9E' },
];

const headerPatterns = {
  sql: { bg: '#1A237E', accent: '#5C6BC0', label: 'SQL' },
  js: { bg: '#F57F17', accent: '#FFD54F', label: 'JS' },
  css: { bg: '#1B5E20', accent: '#81C784', label: 'CSS' },
  react: { bg: '#006064', accent: '#4DD0E1', label: 'React' },
};

function ChallengeCard({ challenge, t, onOpen }) {
  const [pressed, setPressed] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const hp = headerPatterns[challenge.headerImg] || headerPatterns.js;

  return React.createElement('div', {
    style: {
      background: t.surface,
      borderRadius: 0,
      overflow: 'hidden',
      marginBottom: 2,
      borderBottom: `1px solid ${t.border}`,
      cursor: 'pointer',
      transform: pressed ? 'scale(0.99)' : 'scale(1)',
      transition: 'transform 0.1s ease',
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onClick: onOpen,
  },
    // Author row
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px 0' }
    },
      React.createElement('div', {
        style: {
          width: 36, height: 36, borderRadius: '50%',
          background: challenge.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 12, fontFamily: "'Archivo Black', sans-serif",
          flexShrink: 0,
        }
      }, challenge.avatar),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text } }, challenge.author),
        React.createElement('div', { style: { fontSize: 11, color: t.textLight, fontFamily: 'monospace' } }, `${challenge.handle} · ${challenge.timeAgo}`)
      ),
      React.createElement('div', {
        style: {
          background: t.tag, color: t.tagText,
          fontSize: 10, fontFamily: "'Archivo Black', sans-serif",
          padding: '3px 8px', borderRadius: 2,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }
      }, challenge.lang)
    ),
    // Title
    React.createElement('div', {
      style: { padding: '10px 16px 8px', fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: t.text, lineHeight: 1.3 }
    }, challenge.title),
    // Code snippet
    React.createElement('div', {
      style: { margin: '0 16px 10px', background: t.codeBg, borderRadius: 4, padding: '10px 12px', position: 'relative' }
    },
      React.createElement('pre', {
        style: { fontFamily: 'monospace', fontSize: 11, color: t.codeText, margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5 }
      }, challenge.code),
    ),
    // Tags
    React.createElement('div', {
      style: { display: 'flex', gap: 6, padding: '0 16px 10px', flexWrap: 'wrap' }
    },
      challenge.tags.map(tag =>
        React.createElement('span', {
          key: tag,
          style: { background: t.tag, color: t.tagText, fontSize: 10, padding: '2px 8px', borderRadius: 2, fontFamily: 'monospace' }
        }, `#${tag}`)
      )
    ),
    // Actions
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 0, borderTop: `1px solid ${t.border}` }
    },
      React.createElement('button', {
        style: {
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
          color: upvoted ? t.primary : t.textMuted, fontSize: 12,
          fontFamily: "'Archivo Black', sans-serif",
          transition: 'color 0.15s',
        },
        onClick: (e) => { e.stopPropagation(); setUpvoted(!upvoted); }
      },
        React.createElement(window.lucide.TrendingUp, { size: 14 }),
        React.createElement('span', null, upvoted ? challenge.upvotes + 1 : challenge.upvotes)
      ),
      React.createElement('div', { style: { width: 1, background: t.border, height: 30 } }),
      React.createElement('button', {
        style: {
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
          color: t.primary, fontSize: 12, fontFamily: "'Archivo Black', sans-serif",
        },
        onClick: onOpen,
      },
        React.createElement(window.lucide.Zap, { size: 14 }),
        React.createElement('span', null, `${challenge.surges} Surges`)
      ),
      React.createElement('div', { style: { width: 1, background: t.border, height: 30 } }),
      React.createElement('button', {
        style: {
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
          color: t.textMuted, fontSize: 12,
        },
      },
        React.createElement(window.lucide.Share2, { size: 14 })
      )
    )
  );
}

function HomeScreen({ t, setActiveScreen, setOpenChallenge }) {
  const [tab, setTab] = useState('trending');

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Full-bleed header
    React.createElement('div', {
      style: {
        position: 'relative', height: 200, overflow: 'hidden',
        background: `linear-gradient(135deg, #C2185B 0%, #E91E63 40%, #FF5722 100%)`,
        flexShrink: 0,
      }
    },
      // Pattern overlay
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 50%)',
          backgroundSize: '20px 20px',
        }
      }),
      React.createElement('div', {
        style: { position: 'absolute', inset: 0, padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } },
          React.createElement('div', null,
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 } }, 'Today\'s Feed'),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 26, color: '#fff', lineHeight: 1.1 } }, 'Syntax\nSurge ⚡'),
          ),
          React.createElement('div', {
            style: {
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 4, padding: '6px 12px',
              color: '#fff', fontSize: 11,
              fontFamily: "'Archivo Black', sans-serif",
              cursor: 'pointer',
            },
            onClick: () => setActiveScreen('create'),
          },
            '+ Post Challenge'
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 12 } },
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 2, padding: '3px 10px', color: '#fff', fontSize: 10, fontFamily: 'monospace' } }, '🔥 342 active today'),
          React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 2, padding: '3px 10px', color: '#fff', fontSize: 10, fontFamily: 'monospace' } }, '⚡ 89 new surges'),
        )
      )
    ),
    // Tab bar
    React.createElement('div', {
      style: { display: 'flex', background: t.navBg, borderBottom: `2px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 10 }
    },
      ['trending', 'fresh', 'following'].map(tabId =>
        React.createElement('button', {
          key: tabId,
          style: {
            flex: 1, padding: '11px 0', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: tab === tabId ? t.primary : t.textMuted,
            borderBottom: tab === tabId ? `2px solid ${t.primary}` : '2px solid transparent',
            marginBottom: -2,
            transition: 'color 0.15s',
          },
          onClick: () => setTab(tabId),
        }, React.createElement('span', null, tabId))
      )
    ),
    // Feed
    React.createElement('div', null,
      challenges.map(ch =>
        React.createElement(ChallengeCard, {
          key: ch.id,
          challenge: ch,
          t,
          onOpen: () => { setOpenChallenge(ch); setActiveScreen('detail'); }
        })
      )
    )
  );
}

function DetailScreen({ t, challenge, setActiveScreen }) {
  const [surgeText, setSurgeText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!challenge) return null;
  const hp = headerPatterns[challenge.headerImg] || headerPatterns.js;

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Full-bleed header
    React.createElement('div', {
      style: {
        position: 'relative', height: 160,
        background: `linear-gradient(160deg, ${hp.bg} 0%, ${hp.accent} 100%)`,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 30%)',
          backgroundSize: '10px 10px',
        }
      }),
      React.createElement('div', {
        style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px 16px' }
      },
        React.createElement('button', {
          style: { background: 'rgba(0,0,0,0.25)', border: 'none', borderRadius: 4, padding: '6px 12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Archivo Black', sans-serif", fontSize: 11, width: 'fit-content' },
          onClick: () => setActiveScreen('home'),
        },
          React.createElement(window.lucide.ArrowLeft, { size: 14 }),
          React.createElement('span', null, 'Back')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase' } }, `Challenge · ${challenge.lang}`),
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 17, color: '#fff', lineHeight: 1.25, marginTop: 4 } }, challenge.title)
        )
      )
    ),
    // Author info
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: `1px solid ${t.border}`, background: t.surface }
    },
      React.createElement('div', {
        style: { width: 40, height: 40, borderRadius: '50%', background: challenge.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontFamily: "'Archivo Black', sans-serif" }
      }, challenge.avatar),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text } }, challenge.author),
        React.createElement('div', { style: { fontSize: 11, color: t.textLight, fontFamily: 'monospace' } }, `${challenge.handle} · ${challenge.timeAgo}`)
      ),
      React.createElement('div', { style: { textAlign: 'right' } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: t.primary } }, challenge.upvotes),
        React.createElement('div', { style: { fontSize: 10, color: t.textLight } }, 'upvotes')
      )
    ),
    // Code
    React.createElement('div', { style: { margin: '14px 16px 0' } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 10, color: t.textLight, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 } }, 'Challenge Code'),
      React.createElement('div', { style: { background: t.codeBg, borderRadius: 6, padding: '12px 14px' } },
        React.createElement('pre', { style: { fontFamily: 'monospace', fontSize: 12, color: t.codeText, margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, challenge.code)
      )
    ),
    // Tags
    React.createElement('div', { style: { display: 'flex', gap: 6, padding: '12px 16px', flexWrap: 'wrap' } },
      challenge.tags.map(tag =>
        React.createElement('span', { key: tag, style: { background: t.tag, color: t.tagText, fontSize: 11, padding: '3px 10px', borderRadius: 2, fontFamily: 'monospace' } }, `#${tag}`)
      )
    ),
    // Remix chain header
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px', borderTop: `1px solid ${t.border}` }
    },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text } },
        React.createElement(window.lucide.Zap, { size: 14, style: { display: 'inline', marginRight: 6, color: t.primary } }),
        `Remix Chain (${challenge.surges})`
      ),
    ),
    // Remix items
    remixChain.map(remix =>
      React.createElement('div', {
        key: remix.id,
        style: { margin: '0 16px 12px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, overflow: 'hidden' }
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { width: 28, height: 28, borderRadius: '50%', background: remix.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontFamily: "'Archivo Black', sans-serif" } }, remix.avatar),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.text } }, remix.author),
            React.createElement('div', { style: { fontSize: 10, color: t.textLight, fontFamily: 'monospace' } }, remix.timeAgo)
          ),
          React.createElement('div', { style: { background: t.tag, color: t.tagText, fontSize: 9, padding: '2px 8px', borderRadius: 2, fontFamily: "'Archivo Black', sans-serif", textTransform: 'uppercase' } }, remix.type)
        ),
        React.createElement('div', { style: { background: t.codeBg, padding: '8px 12px' } },
          React.createElement('pre', { style: { fontFamily: 'monospace', fontSize: 11, color: t.codeText, margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5 } }, remix.code)
        ),
        React.createElement('div', { style: { padding: '8px 12px', fontSize: 12, color: t.textMuted, lineHeight: 1.5, fontStyle: 'italic' } }, `"${remix.note}"`),
        React.createElement('div', { style: { padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4, borderTop: `1px solid ${t.border}` } },
          React.createElement(window.lucide.TrendingUp, { size: 12, color: t.primary }),
          React.createElement('span', { style: { fontSize: 11, color: t.primary, fontFamily: "'Archivo Black', sans-serif" } }, remix.upvotes)
        )
      )
    ),
    // Post surge
    React.createElement('div', { style: { margin: '8px 16px 20px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 6, padding: 14 } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.text, marginBottom: 8 } }, 'Add Your Surge'),
      submitted
        ? React.createElement('div', { style: { textAlign: 'center', padding: '16px 0', color: t.primary, fontFamily: "'Archivo Black', sans-serif", fontSize: 14 } }, '⚡ Surge posted!')
        : React.createElement('div', null,
            React.createElement('textarea', {
              value: surgeText,
              onChange: e => setSurgeText(e.target.value),
              placeholder: 'Share your solution, optimization, or explanation…',
              style: {
                width: '100%', minHeight: 80, background: t.inputBg, border: `1px solid ${t.inputBorder}`,
                borderRadius: 4, padding: '8px 10px', fontFamily: 'monospace', fontSize: 12,
                color: t.text, resize: 'none', boxSizing: 'border-box', outline: 'none',
              }
            }),
            React.createElement('button', {
              style: {
                marginTop: 8, background: surgeText ? t.primary : t.border,
                border: 'none', borderRadius: 4, padding: '10px 20px',
                color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 12,
                cursor: surgeText ? 'pointer' : 'default', transition: 'background 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              },
              onClick: () => surgeText && setSubmitted(true),
            },
              React.createElement(window.lucide.Zap, { size: 13 }),
              React.createElement('span', null, 'Post Surge')
            )
          )
    )
  );
}

function ExploreScreen({ t }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', { style: { padding: '20px 16px 16px', background: t.surface, borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: t.text, marginBottom: 4 } }, 'Wisdom Vault 🏛'),
      React.createElement('div', { style: { fontSize: 12, color: t.textMuted } }, 'Community-curated challenges & solutions'),
      React.createElement('div', {
        style: { marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 4, padding: '8px 12px' }
      },
        React.createElement(window.lucide.Search, { size: 14, color: t.textLight }),
        React.createElement('input', {
          value: search,
          onChange: e => setSearch(e.target.value),
          placeholder: 'Search challenges…',
          style: { border: 'none', background: 'none', outline: 'none', flex: 1, fontSize: 13, color: t.text, fontFamily: 'monospace' }
        })
      )
    ),
    // Category pills
    React.createElement('div', {
      style: { display: 'flex', gap: 8, padding: '14px 16px', overflowX: 'auto', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }
    },
      vaultCategories.map(cat =>
        React.createElement('button', {
          key: cat.id,
          style: {
            flexShrink: 0, padding: '6px 14px', borderRadius: 2,
            border: selectedCat === cat.id ? `2px solid ${t.primary}` : `2px solid ${t.border}`,
            background: selectedCat === cat.id ? t.primary : t.surface,
            color: selectedCat === cat.id ? '#fff' : t.textMuted,
            fontFamily: "'Archivo Black', sans-serif", fontSize: 11,
            cursor: 'pointer', transition: 'all 0.15s',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          },
          onClick: () => setSelectedCat(cat.id),
        },
          React.createElement('span', null, `${cat.label} · ${cat.count}`)
        )
      )
    ),
    // Stats banner
    React.createElement('div', {
      style: { display: 'flex', background: t.primary, padding: '14px 16px', gap: 0 }
    },
      [['2,841', 'Challenges'], ['8,319', 'Surges'], ['41.2k', 'Devs']].map(([num, label], i) =>
        React.createElement('div', {
          key: label,
          style: { flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.25)' : 'none' }
        },
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#fff' } }, num),
          React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, label)
        )
      )
    ),
    // Vault list
    React.createElement('div', { style: { padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2 } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.textLight, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 } }, 'Top Challenges'),
      vaultItems.map((item, i) =>
        React.createElement('div', {
          key: item.id,
          style: {
            background: t.surface, borderRadius: 4, padding: '12px 14px',
            border: `1px solid ${t.border}`, marginBottom: 8, cursor: 'pointer',
            transition: 'border-color 0.15s',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12 } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: t.border, minWidth: 28 } }, `0${i + 1}`),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text, lineHeight: 1.3, marginBottom: 6 } }, item.title),
              React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
                React.createElement('span', { style: { background: t.tag, color: t.tagText, fontSize: 10, padding: '2px 8px', borderRadius: 2, fontFamily: 'monospace' } }, item.lang),
                React.createElement('span', { style: { fontSize: 10, color: t.textLight } }, `⚡ ${item.surges} surges`),
                React.createElement('span', { style: { fontSize: 10, color: t.textLight } }, `👁 ${item.views}`),
                React.createElement('span', {
                  style: {
                    fontSize: 9, padding: '2px 8px', borderRadius: 2,
                    background: item.difficulty === 'Beginner' ? '#E8F5E9' : item.difficulty === 'Intermediate' ? '#FFF3E0' : '#FCE4EC',
                    color: item.difficulty === 'Beginner' ? '#388E3C' : item.difficulty === 'Intermediate' ? '#E65100' : '#C62828',
                    fontFamily: "'Archivo Black', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em',
                  }
                }, item.difficulty)
              )
            )
          )
        )
      )
    )
  );
}

function CreateScreen({ t, setActiveScreen }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('JavaScript');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const langs = ['JavaScript', 'Python', 'SQL', 'CSS', 'React', 'TypeScript', 'Rust', 'Go'];

  const handleSubmit = () => {
    if (title && code) {
      setSubmitted(true);
      setTimeout(() => { setActiveScreen('home'); }, 2000);
    }
  };

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Header
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, #2C2C2C 0%, #E91E63 100%)`,
        padding: '24px 16px 20px', position: 'relative',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }
      }),
      React.createElement('div', { style: { position: 'relative' } },
        React.createElement('div', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' } }, 'New Challenge'),
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 24, color: '#fff', marginTop: 4, lineHeight: 1.1 } }, 'Post Your\nSurge ⚡'),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginTop: 14 } },
          [1, 2, 3].map(s =>
            React.createElement('div', {
              key: s,
              style: { height: 3, flex: 1, borderRadius: 2, background: step >= s ? '#fff' : 'rgba(255,255,255,0.25)', transition: 'background 0.3s' }
            })
          )
        )
      )
    ),
    submitted
      ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16 } },
          React.createElement('div', { style: { fontSize: 48 } }, '⚡'),
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: t.primary, textAlign: 'center' } }, 'Challenge Posted!'),
          React.createElement('div', { style: { color: t.textMuted, fontSize: 14, textAlign: 'center' } }, 'Your challenge is now live. Watch the surges roll in.')
        )
      : React.createElement('div', { style: { padding: 16 } },
          // Step 1
          step === 1 && React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 } }, 'Step 1 — Challenge Details'),
            React.createElement('div', { style: { marginBottom: 14 } },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.text, marginBottom: 6 } }, 'TITLE'),
              React.createElement('input', {
                value: title,
                onChange: e => setTitle(e.target.value),
                placeholder: 'Describe your challenge concisely…',
                style: { width: '100%', background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 4, padding: '10px 12px', fontFamily: 'monospace', fontSize: 13, color: t.text, outline: 'none', boxSizing: 'border-box' }
              })
            ),
            React.createElement('div', { style: { marginBottom: 14 } },
              React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 11, color: t.text, marginBottom: 6 } }, 'LANGUAGE'),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
                langs.map(l =>
                  React.createElement('button', {
                    key: l,
                    style: {
                      padding: '6px 14px', borderRadius: 2,
                      border: `2px solid ${lang === l ? t.primary : t.border}`,
                      background: lang === l ? t.primary : 'none',
                      color: lang === l ? '#fff' : t.textMuted,
                      fontFamily: "'Archivo Black', sans-serif", fontSize: 11, cursor: 'pointer',
                      transition: 'all 0.15s',
                    },
                    onClick: () => setLang(l),
                  }, React.createElement('span', null, l))
                )
              )
            ),
            React.createElement('button', {
              style: {
                width: '100%', padding: '13px 0', background: title ? t.primary : t.border,
                border: 'none', borderRadius: 4, color: '#fff', fontFamily: "'Archivo Black', sans-serif",
                fontSize: 14, cursor: title ? 'pointer' : 'default', transition: 'background 0.2s',
              },
              onClick: () => title && setStep(2),
            }, React.createElement('span', null, 'Continue →'))
          ),
          // Step 2
          step === 2 && React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 } }, 'Step 2 — Code Snippet'),
            React.createElement('textarea', {
              value: code,
              onChange: e => setCode(e.target.value),
              placeholder: `Paste your ${lang} snippet here…`,
              rows: 10,
              style: {
                width: '100%', background: t.codeBg, border: 'none', borderRadius: 6,
                padding: '12px 14px', fontFamily: 'monospace', fontSize: 12,
                color: t.codeText, resize: 'vertical', outline: 'none', boxSizing: 'border-box',
                lineHeight: 1.6,
              }
            }),
            React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 14 } },
              React.createElement('button', {
                style: { flex: 1, padding: '12px 0', background: 'none', border: `2px solid ${t.border}`, borderRadius: 4, color: t.textMuted, fontFamily: "'Archivo Black', sans-serif", fontSize: 13, cursor: 'pointer' },
                onClick: () => setStep(1),
              }, React.createElement('span', null, '← Back')),
              React.createElement('button', {
                style: { flex: 2, padding: '12px 0', background: code ? t.primary : t.border, border: 'none', borderRadius: 4, color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 13, cursor: code ? 'pointer' : 'default', transition: 'background 0.2s' },
                onClick: () => code && setStep(3),
              }, React.createElement('span', null, 'Preview →'))
            )
          ),
          // Step 3
          step === 3 && React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.textLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 } }, 'Step 3 — Preview & Post'),
            React.createElement('div', { style: { background: t.surface, border: `2px solid ${t.primary}`, borderRadius: 6, overflow: 'hidden', marginBottom: 16 } },
              React.createElement('div', { style: { padding: '12px 14px', borderBottom: `1px solid ${t.border}` } },
                React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: t.text } }, title),
                React.createElement('div', { style: { background: t.tag, color: t.tagText, display: 'inline-block', fontSize: 10, padding: '2px 8px', borderRadius: 2, marginTop: 6, fontFamily: "'Archivo Black', sans-serif", textTransform: 'uppercase' } }, lang)
              ),
              React.createElement('div', { style: { background: t.codeBg, padding: '10px 14px' } },
                React.createElement('pre', { style: { fontFamily: 'monospace', fontSize: 11, color: t.codeText, margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5, maxHeight: 120, overflow: 'hidden' } }, code)
              )
            ),
            React.createElement('div', { style: { display: 'flex', gap: 10 } },
              React.createElement('button', {
                style: { flex: 1, padding: '12px 0', background: 'none', border: `2px solid ${t.border}`, borderRadius: 4, color: t.textMuted, fontFamily: "'Archivo Black', sans-serif", fontSize: 13, cursor: 'pointer' },
                onClick: () => setStep(2),
              }, React.createElement('span', null, '← Edit')),
              React.createElement('button', {
                style: { flex: 2, padding: '12px 0', background: t.primary, border: 'none', borderRadius: 4, color: '#fff', fontFamily: "'Archivo Black', sans-serif", fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
                onClick: handleSubmit,
              },
                React.createElement(window.lucide.Zap, { size: 16 }),
                React.createElement('span', null, 'Post Challenge')
              )
            )
          )
        )
  );
}

function ProfileScreen({ t }) {
  const stats = [
    { label: 'Challenges', value: 12 },
    { label: 'Surges', value: 89 },
    { label: 'Reputation', value: '4.2k' },
  ];

  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', background: t.bg } },
    // Profile header
    React.createElement('div', {
      style: {
        background: `linear-gradient(160deg, #2C2C2C 0%, #4A0014 100%)`,
        padding: '32px 16px 24px', position: 'relative',
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(233,30,99,0.25) 0%, transparent 65%)',
        }
      }),
      React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 14 } },
        React.createElement('div', {
          style: {
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E91E63, #FF5722)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: '#fff',
            border: '3px solid rgba(255,255,255,0.2)',
          }
        }, 'MK'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#fff' } }, 'Mira Kwan'),
          React.createElement('div', { style: { fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 } }, '@mirakwan'),
          React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 } }, 'Full-stack · TypeScript · SQL nerd')
        )
      ),
      // Stats
      React.createElement('div', { style: { position: 'relative', display: 'flex', marginTop: 20, gap: 0 } },
        stats.map((stat, i) =>
          React.createElement('div', {
            key: stat.label,
            style: { flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }
          },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: '#fff' } }, stat.value),
            React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, stat.label)
          )
        )
      )
    ),
    // Reputation bar
    React.createElement('div', { style: { background: t.surface, padding: '14px 16px', borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
        React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.text } }, 'Surge Master — Level 3'),
        React.createElement('div', { style: { fontSize: 11, color: t.textMuted } }, '4,210 / 5,000 rep')
      ),
      React.createElement('div', { style: { height: 6, background: t.border, borderRadius: 3, overflow: 'hidden' } },
        React.createElement('div', { style: { height: '100%', width: '84%', background: t.primary, borderRadius: 3, transition: 'width 0.5s ease' } })
      )
    ),
    // Dev Artifacts
    React.createElement('div', { style: { padding: '16px 16px 8px' } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' } }, 'Dev Artifacts'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
        artifacts.map(art =>
          React.createElement('div', {
            key: art.id,
            style: {
              background: art.earned ? t.surface : t.surfaceAlt,
              border: `1px solid ${art.earned ? t.primary : t.border}`,
              borderRadius: 6, padding: '12px 8px', textAlign: 'center',
              opacity: art.earned ? 1 : 0.5,
            }
          },
            React.createElement('div', { style: { fontSize: 24, marginBottom: 6 } }, art.icon),
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 10, color: art.earned ? t.text : t.textLight, lineHeight: 1.2 } }, art.name),
            React.createElement('div', { style: { fontSize: 9, color: t.textLight, marginTop: 4, lineHeight: 1.3 } }, art.desc),
            art.earned && React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.primary, margin: '6px auto 0' } })
          )
        )
      )
    ),
    // Recent activity
    React.createElement('div', { style: { padding: '16px 16px 24px' } },
      React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.text, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' } }, 'Recent Surges'),
      [
        { title: 'Solved: SQL N+1 query optimization', type: 'Solution', time: '2h ago', votes: 34 },
        { title: 'Explained: React concurrent mode', type: 'Explanation', time: '1d ago', votes: 21 },
        { title: 'Posted challenge: CSS z-index wars', type: 'Challenge', time: '3d ago', votes: 67 },
      ].map((act, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${t.border}` }
        },
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.primary, flexShrink: 0, marginTop: 2 } }),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 12, color: t.text, lineHeight: 1.3 } }, act.title),
            React.createElement('div', { style: { fontSize: 10, color: t.textLight, marginTop: 3, fontFamily: 'monospace' } }, `${act.type} · ${act.time}`)
          ),
          React.createElement('div', { style: { fontFamily: "'Archivo Black', sans-serif", fontSize: 13, color: t.primary } }, `+${act.votes}`)
        )
      )
    )
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [openChallenge, setOpenChallenge] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const navItems = [
    { id: 'home', label: 'Feed', icon: window.lucide.Home },
    { id: 'explore', label: 'Vault', icon: window.lucide.BookOpen },
    { id: 'create', label: 'Post', icon: window.lucide.PlusCircle },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, { t, setActiveScreen, setOpenChallenge }),
    explore: () => React.createElement(ExploreScreen, { t }),
    create: () => React.createElement(CreateScreen, { t, setActiveScreen }),
    profile: () => React.createElement(ProfileScreen, { t }),
    detail: () => React.createElement(DetailScreen, { t, challenge: openChallenge, setActiveScreen }),
  };

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: 'sans-serif' }
  },
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
      * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 0; }
      textarea, input { font-family: monospace; }
    `),
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375, height: 812, borderRadius: 40,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        display: 'flex', flexDirection: 'column',
        background: t.bg,
        border: '8px solid #1a1a1a',
      }
    },
      // Theme toggle
      React.createElement('div', {
        style: { position: 'absolute', top: 14, right: 14, zIndex: 100 }
      },
        React.createElement('button', {
          style: {
            background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)',
            border: 'none', borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          },
          onClick: () => setIsDark(!isDark),
        },
          React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 14 })
        )
      ),
      // Screen content
      React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative' } },
        screens[activeScreen] ? screens[activeScreen]() : null
      ),
      // Top tabs (shown as bottom nav for ergonomics on phone)
      activeScreen !== 'detail' && React.createElement('div', {
        style: {
          display: 'flex', background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          flexShrink: 0, paddingBottom: 4,
        }
      },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            style: {
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '10px 0 6px', background: 'none', border: 'none',
              cursor: 'pointer',
              color: activeScreen === item.id ? t.primary : t.textLight,
              transition: 'color 0.15s',
            },
            onClick: () => setActiveScreen(item.id),
          },
            item.id === 'create'
              ? React.createElement('div', {
                  style: {
                    width: 42, height: 42, borderRadius: '50%', background: t.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: -16, boxShadow: `0 4px 14px ${t.primary}80`,
                  }
                },
                  React.createElement(item.icon, { size: 18, color: '#fff' })
                )
              : React.createElement(item.icon, { size: 20 }),
            item.id !== 'create' && React.createElement('span', {
              style: { fontSize: 10, fontFamily: "'Archivo Black', sans-serif", letterSpacing: '0.05em' }
            }, item.label)
          )
        )
      )
    )
  );
}
