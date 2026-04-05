
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F8FAFC', surface: '#FFFFFF', surfaceAlt: '#F1F5F9', surfaceAlt2: '#E8EFF7',
    text: '#1E293B', textSub: '#334155', textSecondary: '#64748B', textMuted: '#94A3B8',
    cta: '#22C55E', ctaDark: '#16A34A', ctaBg: 'rgba(34,197,94,0.12)',
    border: '#E2E8F0', navBg: '#FFFFFF', navBorder: '#E2E8F0',
    accent: '#6366F1', accentBg: 'rgba(99,102,241,0.1)',
    warning: '#F59E0B', warningBg: 'rgba(245,158,11,0.1)',
    danger: '#EF4444', dangerBg: 'rgba(239,68,68,0.1)',
    purple: '#8B5CF6', purpleBg: 'rgba(139,92,246,0.1)',
    shadow: '0 2px 12px rgba(0,0,0,0.07)', shadowMd: '0 4px 20px rgba(0,0,0,0.10)', shadowLg: '0 8px 32px rgba(0,0,0,0.13)',
    codeBg: '#1E293B', codeText: '#22C55E',
  },
  dark: {
    bg: '#0F172A', surface: '#1E293B', surfaceAlt: '#253047', surfaceAlt2: '#2D3B52',
    text: '#F8FAFC', textSub: '#E2E8F0', textSecondary: '#94A3B8', textMuted: '#475569',
    cta: '#22C55E', ctaDark: '#16A34A', ctaBg: 'rgba(34,197,94,0.15)',
    border: '#334155', navBg: '#1A2540', navBorder: '#2D3B52',
    accent: '#818CF8', accentBg: 'rgba(129,140,248,0.15)',
    warning: '#FBBF24', warningBg: 'rgba(251,191,36,0.12)',
    danger: '#F87171', dangerBg: 'rgba(248,113,113,0.1)',
    purple: '#A78BFA', purpleBg: 'rgba(167,139,250,0.12)',
    shadow: '0 2px 12px rgba(0,0,0,0.35)', shadowMd: '0 4px 20px rgba(0,0,0,0.45)', shadowLg: '0 8px 32px rgba(0,0,0,0.55)',
    codeBg: '#0D1829', codeText: '#22C55E',
  }
};

const BOUNTIES = [
  { id: 1, title: 'Binary Search Tree Balancing', desc: 'Implement AVL rotations with O(log n) ops', difficulty: 'Hard', lang: 'TypeScript', reward: 650, squadsActive: 8, timeLeft: '14h 32m', tags: ['algorithms', 'trees'], solved: false },
  { id: 2, title: 'CSS Grid Magic — 3D Flip Card', desc: 'Build an interactive card flip with pure CSS transforms', difficulty: 'Easy', lang: 'CSS', reward: 280, squadsActive: 24, timeLeft: '6h 15m', tags: ['css', 'animation'], solved: true },
  { id: 3, title: 'Async Iterator Pipeline', desc: 'Chain async generators for real-time data transformation', difficulty: 'Expert', lang: 'JavaScript', reward: 1200, squadsActive: 3, timeLeft: '22h 50m', tags: ['async', 'generators'], solved: false },
  { id: 4, title: 'React State Reconciliation', desc: 'Optimize re-renders using useMemo and custom hooks', difficulty: 'Medium', lang: 'React', reward: 420, squadsActive: 15, timeLeft: '9h 08m', tags: ['react', 'performance'], solved: false },
  { id: 5, title: 'Rust Ownership Puzzle', desc: 'Solve complex lifetime annotations without clone()', difficulty: 'Expert', lang: 'Rust', reward: 1500, squadsActive: 2, timeLeft: '18h 22m', tags: ['rust', 'ownership'], solved: false },
];

const DROPS = [
  { id: 1, author: 'lina_codes', avatar: 'LC', bountyTitle: 'CSS Grid Magic', views: 2340, likes: 187, duration: '1:24', rating: 4.9, color: '#22C55E' },
  { id: 2, author: 'rustacean_v', avatar: 'RV', bountyTitle: 'Async Iterator Pipeline', views: 891, likes: 76, duration: '0:58', rating: 4.7, color: '#6366F1' },
  { id: 3, author: 'tsdev_max', avatar: 'TM', bountyTitle: 'BST Balancing', views: 1120, likes: 134, duration: '1:30', rating: 4.8, color: '#F59E0B' },
];

const SQUADS = [
  { id: 1, name: 'Null Terminators', members: [{ init: 'AK', col: '#22C55E' }, { init: 'JR', col: '#6366F1' }, { init: 'SL', col: '#F59E0B' }], bounty: 'Binary Search Tree Balancing', progress: 65, status: 'active', xp: 840 },
  { id: 2, name: 'Async Avengers', members: [{ init: 'MV', col: '#EF4444' }, { init: 'PL', col: '#8B5CF6' }], bounty: 'Async Iterator Pipeline', progress: 30, status: 'recruiting', xp: 210 },
  { id: 3, name: 'CSS Wizards', members: [{ init: 'TK', col: '#22C55E' }, { init: 'DN', col: '#F59E0B' }, { init: 'RL', col: '#6366F1' }, { init: 'YM', col: '#EF4444' }], bounty: 'CSS Grid Magic', progress: 92, status: 'finishing', xp: 1560 },
];

const ARTIFACTS = [
  { id: 1, name: 'Algorithm Ace', icon: 'Zap', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', earned: true, desc: 'Solved 10 algorithm challenges' },
  { id: 2, name: 'Squad Leader', icon: 'Users', color: '#6366F1', bg: 'rgba(99,102,241,0.15)', earned: true, desc: 'Led 5 squads to victory' },
  { id: 3, name: 'Drop Master', icon: 'Video', color: '#22C55E', bg: 'rgba(34,197,94,0.15)', earned: true, desc: '50 DevDrops with 4.5+ rating' },
  { id: 4, name: 'Rust Whisperer', icon: 'Shield', color: '#EF4444', bg: 'rgba(239,68,68,0.15)', earned: false, desc: 'Solve 3 Rust Expert bounties' },
  { id: 5, name: 'CSS Artisan', icon: 'Star', color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', earned: true, desc: 'Perfect score on CSS bounty' },
  { id: 6, name: 'Speed Demon', icon: 'Flame', color: '#F97316', bg: 'rgba(249,115,22,0.15)', earned: false, desc: 'First solve in under 30 min' },
];

const LEADERBOARD = [
  { rank: 1, name: 'cipher_ghost', xp: 24500, artifacts: 18, streak: 47, avatar: 'CG', color: '#F59E0B' },
  { rank: 2, name: 'lina_codes', xp: 21300, artifacts: 15, streak: 33, avatar: 'LC', color: '#22C55E' },
  { rank: 3, name: 'rustacean_v', xp: 19800, artifacts: 14, streak: 28, avatar: 'RV', color: '#6366F1' },
  { rank: 7, name: 'you (tsdev_max)', xp: 12450, artifacts: 9, streak: 12, avatar: 'TM', color: '#F59E0B', isUser: true },
];

const diffStyle = {
  Easy:   { bg: '#dcfce7', text: '#16a34a', darkBg: 'rgba(22,163,74,0.2)', darkText: '#4ade80' },
  Medium: { bg: '#fef9c3', text: '#ca8a04', darkBg: 'rgba(202,138,4,0.2)', darkText: '#facc15' },
  Hard:   { bg: '#fee2e2', text: '#dc2626', darkBg: 'rgba(220,38,38,0.2)', darkText: '#f87171' },
  Expert: { bg: '#ede9fe', text: '#7c3aed', darkBg: 'rgba(124,58,237,0.2)', darkText: '#c084fc' },
};

function useHover() {
  const [hovered, setHovered] = useState(false);
  return [hovered, { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }];
}

function Icon({ name, size = 18, color, style: extraStyle = {} }) {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...extraStyle } });
  return React.createElement(LucideIcon, { size, color, strokeWidth: 2, style: extraStyle });
}

function Avatar({ initials, color, size = 36 }) {
  return React.createElement('div', {
    style: {
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}cc, ${color})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.33, fontWeight: 700, color: '#fff',
      fontFamily: '"JetBrains Mono", monospace', flexShrink: 0,
      boxShadow: `0 2px 8px ${color}55`,
    }
  }, initials);
}

function ProgressBar({ value, color, t }) {
  return React.createElement('div', { style: { width: '100%', height: 6, background: t.surfaceAlt2, borderRadius: 3, overflow: 'hidden' } },
    React.createElement('div', {
      style: {
        width: `${value}%`, height: '100%', borderRadius: 3,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: 'width 0.6s ease',
      }
    })
  );
}

function HomeScreen({ t, isDark, setActiveScreen }) {
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [likedDrops, setLikedDrops] = useState({});
  const [hovered, hoverProps] = useHover();

  if (selectedBounty) {
    const b = selectedBounty;
    const ds = diffStyle[b.difficulty];
    return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, overflowY: 'auto' } },
      React.createElement('div', { style: { background: isDark ? t.surface : '#1E293B', padding: '16px 16px 20px', position: 'relative' } },
        React.createElement('button', {
          onClick: () => setSelectedBounty(null),
          style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontFamily: '"IBM Plex Sans", sans-serif', marginBottom: 12 }
        }, React.createElement(Icon, { name: 'ChevronLeft', size: 14, color: '#fff' }), 'Back'),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' } },
          React.createElement('span', { style: { background: isDark ? ds.darkBg : ds.bg, color: isDark ? ds.darkText : ds.text, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, fontFamily: '"JetBrains Mono", monospace' } }, b.difficulty),
          React.createElement('span', { style: { background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, fontFamily: '"JetBrains Mono", monospace' } }, b.lang),
        ),
        React.createElement('h2', { style: { color: '#fff', fontSize: 18, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 6px', lineHeight: 1.3 } }, b.title),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0 } }, b.desc),
        React.createElement('div', { style: { display: 'flex', gap: 20, marginTop: 16 } },
          [['Trophy', `${b.reward} XP`], ['Users', `${b.squadsActive} squads`], ['Clock', b.timeLeft]].map(([icon, val]) =>
            React.createElement('div', { key: icon, style: { display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(Icon, { name: icon, size: 13, color: '#22C55E' }),
              React.createElement('span', { style: { color: '#fff', fontSize: 12, fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 } }, val)
            )
          )
        )
      ),
      React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } },
        React.createElement('div', { style: { background: t.codeBg, borderRadius: 12, padding: 14, border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
            React.createElement(Icon, { name: 'Code', size: 14, color: t.codeText }),
            React.createElement('span', { style: { color: t.codeText, fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, 'Challenge Stub')
          ),
          React.createElement('pre', { style: { color: '#94A3B8', fontSize: 11, fontFamily: '"JetBrains Mono", monospace', margin: 0, lineHeight: 1.7, overflowX: 'auto' } },
`// TypeScript — implement AVLTree
class AVLNode<T> {
  value: T;
  left: AVLNode<T> | null = null;
  right: AVLNode<T> | null = null;
  height: number = 1;
  constructor(value: T) {
    this.value = value;
  }
}

class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  // TODO: implement insert(value: T)
  // TODO: implement delete(value: T)
  // TODO: implement rotateLeft / rotateRight
  // TODO: maintain balance factor
}`
          )
        ),
        React.createElement('div', { style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}` } },
          React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 10px' } }, 'Constraints'),
          ['Time complexity must be O(log n)', 'No external libraries allowed', 'Must pass 15 test cases', 'DevDrop submission required'].map((c, i) =>
            React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 } },
              React.createElement(Icon, { name: 'CheckCircle', size: 13, color: t.cta }),
              React.createElement('span', { style: { color: t.textSecondary, fontSize: 12, fontFamily: '"IBM Plex Sans", sans-serif' } }, c)
            )
          )
        ),
        React.createElement('button', {
          onClick: () => setActiveScreen('squads'),
          style: { width: '100%', background: `linear-gradient(135deg, ${t.cta}, ${t.ctaDark})`, border: 'none', borderRadius: 12, padding: '14px', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 4px 16px ${t.cta}44` }
        }, React.createElement(Icon, { name: 'Users', size: 16, color: '#fff' }), 'Form a Squad & Attack')
      )
    );
  }

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { background: isDark ? t.surface : '#1E293B', padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('div', null,
          React.createElement('h1', { style: { color: '#fff', fontSize: 20, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', margin: 0, letterSpacing: -0.5 } }, 'CodeBounty'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0 } }, 'Daily refresh in 06:24:18')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('div', { style: { background: 'rgba(34,197,94,0.2)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5 } },
            React.createElement(Icon, { name: 'Flame', size: 13, color: '#22C55E' }),
            React.createElement('span', { style: { color: '#22C55E', fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, '12')
          )
        )
      ),
      React.createElement('div', { style: { display: 'flex', borderBottom: `2px solid rgba(255,255,255,0.1)`, marginTop: 12 } },
        ['Bounties', 'DevDrops'].map(tab =>
          React.createElement('div', { key: tab, style: { padding: '8px 16px 10px', fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', color: tab === 'Bounties' ? '#22C55E' : 'rgba(255,255,255,0.4)', borderBottom: tab === 'Bounties' ? '2px solid #22C55E' : '2px solid transparent', marginBottom: -2, cursor: 'pointer' } }, tab)
        )
      )
    ),
    React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('div', { style: { background: isDark ? 'linear-gradient(135deg, #1E293B, #0F172A)' : 'linear-gradient(135deg, #1E293B, #334155)', borderRadius: 16, padding: 16, border: '1px solid rgba(34,197,94,0.3)', boxShadow: '0 4px 20px rgba(34,197,94,0.15)', position: 'relative', overflow: 'hidden', cursor: 'pointer' },
        onClick: () => setSelectedBounty(BOUNTIES[0])
      },
        React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(34,197,94,0.08)' } }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
          React.createElement('span', { style: { background: 'rgba(34,197,94,0.2)', color: '#22C55E', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, fontFamily: '"JetBrains Mono", monospace', border: '1px solid rgba(34,197,94,0.4)' } }, 'FEATURED TODAY'),
          React.createElement('div', { style: { background: `${diffStyle.Hard.darkBg}`, color: diffStyle.Hard.darkText, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, fontFamily: '"JetBrains Mono", monospace' } }, 'HARD')
        ),
        React.createElement('h3', { style: { color: '#fff', fontSize: 16, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 6px', lineHeight: 1.3 } }, BOUNTIES[0].title),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: '"IBM Plex Sans", sans-serif', margin: '0 0 14px', lineHeight: 1.5 } }, BOUNTIES[0].desc),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', gap: 14 } },
            [['Trophy', `${BOUNTIES[0].reward} XP`], ['Clock', BOUNTIES[0].timeLeft]].map(([icon, val]) =>
              React.createElement('div', { key: icon, style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: icon, size: 12, color: '#22C55E' }),
                React.createElement('span', { style: { color: '#fff', fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 } }, val)
              )
            )
          ),
          React.createElement('span', { style: { color: '#22C55E', fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', display: 'flex', alignItems: 'center', gap: 4 } }, 'Solve it ', React.createElement(Icon, { name: 'ArrowRight', size: 13, color: '#22C55E' }))
        )
      ),
      React.createElement('h2', { style: { color: t.text, fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '4px 0 0', letterSpacing: 0.5 } }, 'ALL BOUNTIES'),
      ...BOUNTIES.slice(1).map(b => {
        const ds = diffStyle[b.difficulty];
        return React.createElement('div', {
          key: b.id,
          onClick: () => setSelectedBounty(b),
          style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: t.shadow, display: 'flex', flexDirection: 'column', gap: 8 }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', { style: { flex: 1, marginRight: 8 } },
              React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 4px', lineHeight: 1.3 } }, b.title),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0, lineHeight: 1.5 } }, b.desc),
            ),
            b.solved && React.createElement('div', { style: { background: t.ctaBg, borderRadius: 8, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 } },
              React.createElement(Icon, { name: 'CheckCircle', size: 11, color: t.cta }),
              React.createElement('span', { style: { color: t.cta, fontSize: 10, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, 'SOLVED')
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              React.createElement('span', { style: { background: isDark ? ds.darkBg : ds.bg, color: isDark ? ds.darkText : ds.text, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 12, fontFamily: '"JetBrains Mono", monospace' } }, b.difficulty),
              React.createElement('span', { style: { background: t.accentBg, color: t.accent, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 12, fontFamily: '"JetBrains Mono", monospace' } }, b.lang),
            ),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Trophy', size: 11, color: t.warning }),
                React.createElement('span', { style: { color: t.text, fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, `${b.reward} XP`)
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                React.createElement(Icon, { name: 'Clock', size: 11, color: t.textMuted }),
                React.createElement('span', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif' } }, b.timeLeft)
              )
            )
          )
        );
      }),
      React.createElement('h2', { style: { color: t.text, fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '4px 0 0', letterSpacing: 0.5 } }, 'RECENT DEVDROPS'),
      React.createElement('div', { style: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' } },
        ...DROPS.map(d =>
          React.createElement('div', { key: d.id, style: { background: t.surface, borderRadius: 12, padding: 12, border: `1px solid ${t.border}`, flexShrink: 0, width: 150, boxShadow: t.shadow, cursor: 'pointer' } },
            React.createElement('div', { style: { background: `linear-gradient(135deg, ${d.color}33, ${d.color}11)`, borderRadius: 8, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: `1px solid ${d.color}33`, position: 'relative' } },
              React.createElement(Icon, { name: 'Play', size: 20, color: d.color }),
              React.createElement('span', { style: { position: 'absolute', bottom: 5, right: 5, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 4, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 } }, d.duration)
            ),
            React.createElement('p', { style: { color: t.text, fontSize: 11, fontWeight: 600, fontFamily: '"IBM Plex Sans", sans-serif', margin: '0 0 4px', lineHeight: 1.3 } }, d.bountyTitle),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', { style: { color: t.textMuted, fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif' } }, `@${d.author}`),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Icon, { name: 'Star', size: 10, color: t.warning }),
                React.createElement('span', { style: { color: t.text, fontSize: 10, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, d.rating)
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 8 } })
    )
  );
}

function SquadsScreen({ t, isDark, setActiveScreen }) {
  const [joinHover, setJoinHover] = useState(null);
  const [creating, setCreating] = useState(false);

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { background: isDark ? t.surface : '#1E293B', padding: '16px 16px 16px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('div', null,
          React.createElement('h1', { style: { color: '#fff', fontSize: 18, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', margin: 0 } }, 'Squads'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0 } }, '3 active squads today')
        ),
        React.createElement('button', {
          onClick: () => setCreating(!creating),
          style: { background: creating ? t.cta : 'rgba(34,197,94,0.2)', border: `1px solid ${t.cta}`, borderRadius: 10, padding: '8px 14px', color: creating ? '#fff' : t.cta, fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }
        }, React.createElement(Icon, { name: 'Plus', size: 14, color: creating ? '#fff' : t.cta }), creating ? 'Cancel' : 'Create')
      )
    ),
    React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } },
      creating && React.createElement('div', { style: { background: t.surface, borderRadius: 14, padding: 16, border: `1px solid ${t.cta}44`, boxShadow: `0 4px 20px ${t.cta}22`, animation: 'slideUp 0.25s ease' } },
        React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 12px' } }, 'New Squad'),
        React.createElement('input', { placeholder: 'Squad name...', style: { width: '100%', background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, padding: '10px 12px', color: t.text, fontSize: 13, fontFamily: '"IBM Plex Sans", sans-serif', outline: 'none', boxSizing: 'border-box', marginBottom: 10 } }),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 } },
          ['Binary Search Tree', 'Async Iterator Pipeline', 'React State', 'CSS Grid Magic'].map(b =>
            React.createElement('div', { key: b, style: { background: t.surfaceAlt, borderRadius: 8, padding: '8px 10px', fontSize: 11, color: t.textSecondary, fontFamily: '"IBM Plex Sans", sans-serif', cursor: 'pointer', border: `1px solid ${t.border}` } }, b)
          )
        ),
        React.createElement('button', { style: { width: '100%', background: `linear-gradient(135deg, ${t.cta}, ${t.ctaDark})`, border: 'none', borderRadius: 10, padding: 12, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer', boxShadow: `0 4px 12px ${t.cta}44` } }, 'Create Squad & Invite')
      ),
      React.createElement('div', { style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
          React.createElement(Icon, { name: 'Users', size: 13, color: t.accent }),
          React.createElement('span', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.5 } }, 'MY ACTIVE SQUAD')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: 0 } }, SQUADS[0].name),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: '2px 0 0' } }, SQUADS[0].bounty)
          ),
          React.createElement('div', { style: { display: 'flex', gap: -6 } },
            SQUADS[0].members.map((m, i) =>
              React.createElement('div', { key: i, style: { marginLeft: i > 0 ? -8 : 0, border: `2px solid ${t.surface}`, borderRadius: '50%', zIndex: 3 - i } },
                React.createElement(Avatar, { initials: m.init, color: m.col, size: 30 })
              )
            )
          )
        ),
        React.createElement('div', { style: { marginBottom: 8 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
            React.createElement('span', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif' } }, 'Squad Progress'),
            React.createElement('span', { style: { color: t.cta, fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, `${SQUADS[0].progress}%`)
          ),
          React.createElement(ProgressBar, { value: SQUADS[0].progress, color: t.cta, t })
        ),
        React.createElement('button', {
          onClick: () => setActiveScreen('workbench'),
          style: { width: '100%', background: t.ctaBg, border: `1px solid ${t.cta}44`, borderRadius: 8, padding: 10, color: t.cta, fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }
        }, React.createElement(Icon, { name: 'Layout', size: 13, color: t.cta }), 'Open Spatial Workbench')
      ),
      React.createElement('h2', { style: { color: t.text, fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '4px 0 0', letterSpacing: 0.5 } }, 'OPEN SQUADS'),
      ...SQUADS.slice(1).map((squad, i) =>
        React.createElement('div', { key: squad.id, style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            React.createElement('div', null,
              React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 2px' } }, squad.name),
              React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0 } }, squad.bounty)
            ),
            React.createElement('span', {
              style: {
                background: squad.status === 'recruiting' ? t.accentBg : squad.status === 'finishing' ? t.ctaBg : t.surfaceAlt,
                color: squad.status === 'recruiting' ? t.accent : squad.status === 'finishing' ? t.cta : t.textSecondary,
                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, fontFamily: '"JetBrains Mono", monospace'
              }
            }, squad.status.toUpperCase())
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('div', { style: { display: 'flex', gap: -6 } },
              squad.members.map((m, i) =>
                React.createElement('div', { key: i, style: { marginLeft: i > 0 ? -8 : 0, border: `2px solid ${t.surface}`, borderRadius: '50%' } },
                  React.createElement(Avatar, { initials: m.init, color: m.col, size: 28 })
                )
              ),
              squad.status === 'recruiting' && React.createElement('div', { style: { marginLeft: -8, width: 28, height: 28, borderRadius: '50%', background: t.surfaceAlt, border: `2px dashed ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement(Icon, { name: 'Plus', size: 12, color: t.accent })
              )
            ),
            squad.status === 'recruiting' ? React.createElement('button', {
              style: { background: `linear-gradient(135deg, ${t.accent}, #4F46E5)`, border: 'none', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer', boxShadow: `0 2px 8px ${t.accent}44` }
            }, 'Join Squad') : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement(Icon, { name: 'Trophy', size: 11, color: t.warning }),
              React.createElement('span', { style: { color: t.text, fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, `${squad.xp} XP earned`)
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 8 } })
    )
  );
}

function WorkbenchScreen({ t, isDark }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [zoom, setZoom] = useState(1);

  const cards = [
    { id: 1, type: 'devdrop', author: 'AK', color: '#22C55E', title: 'AVL Rotation Logic', x: 20, y: 20, w: 140, h: 100, duration: '1:12', views: 340 },
    { id: 2, type: 'code', author: 'JR', color: '#6366F1', title: 'rotateLeft()', x: 180, y: 10, w: 160, h: 120, lang: 'TS' },
    { id: 3, type: 'devdrop', author: 'SL', color: '#F59E0B', title: 'Balance Factor', x: 30, y: 160, w: 130, h: 90, duration: '0:47', views: 210 },
    { id: 4, type: 'code', author: 'AK', color: '#22C55E', title: 'getHeight()', x: 175, y: 155, w: 165, h: 100, lang: 'TS' },
    { id: 5, type: 'comment', author: 'JR', color: '#6366F1', title: 'Edge case: null root?', x: 60, y: 280, w: 200, h: 60 },
  ];

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg } },
    React.createElement('div', { style: { background: isDark ? t.surface : '#1E293B', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } },
      React.createElement('div', null,
        React.createElement('h1', { style: { color: '#fff', fontSize: 15, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', margin: 0 } }, 'Spatial Workbench'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif', margin: 0 } }, 'Null Terminators — BST Balancing')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [['ZoomIn', '+'], ['ZoomOut', '−']].map(([icon, label]) =>
          React.createElement('button', {
            key: icon, onClick: () => setZoom(z => icon === 'ZoomIn' ? Math.min(z + 0.1, 1.5) : Math.max(z - 0.1, 0.6)),
            style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, width: 28, height: 28, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }
          }, label)
        ),
        React.createElement('button', { style: { background: 'rgba(34,197,94,0.25)', border: '1px solid rgba(34,197,94,0.5)', borderRadius: 8, padding: '0 12px', height: 28, color: '#22C55E', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement(Icon, { name: 'Plus', size: 12, color: '#22C55E' }), 'Drop'
        )
      )
    ),
    React.createElement('div', { style: { flex: 1, overflow: 'hidden', position: 'relative', background: isDark ? '#0A1020' : '#EEF2F7' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`, backgroundSize: '24px 24px' } }),
      React.createElement('svg', { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' } },
        React.createElement('line', { x1: 160, y1: 70, x2: 180, y2: 70, stroke: t.cta, strokeWidth: 1.5, strokeDasharray: '4,3', opacity: 0.6 }),
        React.createElement('line', { x1: 95, y1: 120, x2: 95, y2: 160, stroke: t.warning, strokeWidth: 1.5, strokeDasharray: '4,3', opacity: 0.6 }),
        React.createElement('line', { x1: 257, y1: 130, x2: 257, y2: 155, stroke: t.accent, strokeWidth: 1.5, strokeDasharray: '4,3', opacity: 0.6 }),
        React.createElement('circle', { cx: 160, cy: 70, r: 3, fill: t.cta }),
        React.createElement('circle', { cx: 180, cy: 70, r: 3, fill: t.cta }),
        React.createElement('circle', { cx: 95, cy: 120, r: 3, fill: t.warning }),
        React.createElement('circle', { cx: 95, cy: 160, r: 3, fill: t.warning }),
      ),
      React.createElement('div', { style: { position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' } },
        cards.map(card =>
          React.createElement('div', {
            key: card.id,
            onClick: () => setSelectedCard(selectedCard?.id === card.id ? null : card),
            style: {
              position: 'absolute', left: card.x, top: card.y, width: card.w, minHeight: card.h,
              background: selectedCard?.id === card.id ? (isDark ? t.surface : '#fff') : (isDark ? t.surface : '#fff'),
              borderRadius: 10, border: selectedCard?.id === card.id ? `2px solid ${card.color}` : `1px solid ${isDark ? t.border : '#D1D5DB'}`,
              boxShadow: selectedCard?.id === card.id ? `0 6px 20px ${card.color}33` : t.shadow,
              padding: 10, cursor: 'pointer', transition: 'all 0.2s',
              transform: selectedCard?.id === card.id ? 'scale(1.02)' : 'none',
            }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
                React.createElement(Avatar, { initials: card.author, color: card.color, size: 20 }),
                React.createElement('span', { style: { color: isDark ? t.textSecondary : '#64748B', fontSize: 9, fontFamily: '"IBM Plex Sans", sans-serif' } }, card.author )
              ),
              card.type === 'devdrop' && React.createElement('div', { style: { background: `${card.color}22`, borderRadius: 4, padding: '1px 5px', display: 'flex', alignItems: 'center', gap: 3 } },
                React.createElement(Icon, { name: 'Video', size: 9, color: card.color }),
                React.createElement('span', { style: { color: card.color, fontSize: 9, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, 'DROP')
              ),
              card.type === 'code' && React.createElement('div', { style: { background: `${card.color}22`, borderRadius: 4, padding: '1px 5px' } },
                React.createElement('span', { style: { color: card.color, fontSize: 9, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, card.lang)
              ),
              card.type === 'comment' && React.createElement(Icon, { name: 'MessageSquare', size: 12, color: card.color })
            ),
            React.createElement('p', { style: { color: isDark ? t.text : '#1E293B', fontSize: 11, fontWeight: 600, fontFamily: card.type === 'code' ? '"JetBrains Mono", monospace' : '"IBM Plex Sans", sans-serif', margin: 0, lineHeight: 1.4 } }, card.title),
            card.type === 'devdrop' && React.createElement('div', { style: { marginTop: 6, background: `${card.color}15`, borderRadius: 6, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 } },
              React.createElement(Icon, { name: 'Play', size: 12, color: card.color }),
              React.createElement('span', { style: { color: card.color, fontSize: 10, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 } }, card.duration)
            ),
            card.type === 'code' && React.createElement('div', { style: { marginTop: 6, background: isDark ? '#0D1829' : '#F8FAFC', borderRadius: 6, padding: '5px 7px' } },
              React.createElement('code', { style: { color: card.color, fontSize: 9, fontFamily: '"JetBrains Mono", monospace', lineHeight: 1.6 } }, card.id === 2 ? 'node.right = node;\nreturn node.right;\n// O(log n)' : 'return node\n  ? node.height\n  : 0;')
            )
          )
        )
      ),
      selectedCard && React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, background: t.surface, borderTop: `1px solid ${t.border}`, padding: '12px 14px', borderRadius: '16px 16px 0 0', boxShadow: t.shadowLg } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
          React.createElement('h3', { style: { color: t.text, fontSize: 13, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace', margin: 0 } }, selectedCard.title),
          React.createElement('button', { onClick: () => setSelectedCard(null), style: { background: t.surfaceAlt, border: 'none', borderRadius: 6, padding: '4px 8px', color: t.textSecondary, cursor: 'pointer', fontSize: 12 } }, '✕')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          [['Heart', 'Like'], ['MessageSquare', 'Comment'], ['Link', 'Link'], ['Share2', 'Share']].map(([icon, label]) =>
            React.createElement('button', {
              key: icon,
              style: { flex: 1, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8, padding: '8px 4px', color: t.textSecondary, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }
            },
              React.createElement(Icon, { name: icon, size: 14, color: selectedCard.color }),
              React.createElement('span', { style: { fontSize: 9, fontFamily: '"IBM Plex Sans", sans-serif', color: t.textMuted } }, label)
            )
          )
        )
      )
    )
  );
}

function ProfileScreen({ t, isDark }) {
  const [activeTab, setActiveTab] = useState('artifacts');

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, overflowY: 'auto' } },
    React.createElement('div', { style: { background: isDark ? t.surface : '#1E293B', padding: '16px 16px 0' } },
      React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 } },
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement(Avatar, { initials: 'TM', color: '#F59E0B', size: 60 }),
          React.createElement('div', { style: { position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: '50%', background: t.cta, border: `2px solid ${isDark ? t.surface : '#1E293B'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Icon, { name: 'Zap', size: 10, color: '#fff' })
          )
        ),
        React.createElement('div', null,
          React.createElement('h2', { style: { color: '#fff', fontSize: 17, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 2px' } }, 'tsdev_max'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif', margin: '0 0 6px' } }, 'TypeScript Specialist · Rank #7'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            [['#typescript', t.accentBg, t.accent], ['#algorithms', t.warningBg, t.warning], ['#css', t.purpleBg, t.purple]].map(([tag, bg, col]) =>
              React.createElement('span', { key: tag, style: { background: bg, color: col, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 12, fontFamily: '"JetBrains Mono", monospace' } }, tag)
            )
          )
        )
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0, background: 'rgba(255,255,255,0.06)', borderRadius: '10px 10px 0 0', overflow: 'hidden' } },
        [['12,450', 'XP Total', 'Trophy', t.cta], ['34', 'Bounties', 'Target', t.accent], ['28', 'DevDrops', 'Video', t.warning], ['9', 'Artifacts', 'Award', t.purple]].map(([val, label, icon, color]) =>
          React.createElement('div', { key: label, style: { padding: '10px 8px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' } },
            React.createElement(Icon, { name: icon, size: 13, color, style: { marginBottom: 3, display: 'block', margin: '0 auto 3px' } }),
            React.createElement('div', { style: { color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace' } }, val),
            React.createElement('div', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: '"IBM Plex Sans", sans-serif' } }, label)
          )
        )
      ),
      React.createElement('div', { style: { display: 'flex', borderBottom: '2px solid rgba(255,255,255,0.1)', marginTop: 4 } },
        ['artifacts', 'leaderboard', 'streak'].map(tab =>
          React.createElement('div', {
            key: tab, onClick: () => setActiveTab(tab),
            style: { padding: '8px 12px 10px', fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', color: activeTab === tab ? '#22C55E' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === tab ? '2px solid #22C55E' : '2px solid transparent', marginBottom: -2, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.3 }
          }, tab)
        )
      )
    ),
    React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } },
      activeTab === 'artifacts' && React.createElement(React.Fragment, null,
        React.createElement('div', { style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
            React.createElement('span', { style: { color: t.textMuted, fontSize: 11, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.5 } }, '12-DAY STREAK'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
              React.createElement(Icon, { name: 'Flame', size: 14, color: '#F97316' }),
              React.createElement('span', { style: { color: '#F97316', fontSize: 16, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace' } }, '12')
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 4 } },
            Array.from({ length: 7 }, (_, i) =>
              React.createElement('div', { key: i, style: { flex: 1, height: 28, borderRadius: 5, background: i < 5 ? `linear-gradient(135deg, ${t.cta}, ${t.ctaDark})` : i === 5 ? t.ctaBg : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                i < 5 && React.createElement(Icon, { name: 'Check', size: 12, color: '#fff' })
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
            ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => React.createElement('div', { key: i, style: { flex: 1, textAlign: 'center', fontSize: 9, color: t.textMuted, fontFamily: '"IBM Plex Sans", sans-serif' } }, d))
          )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
          ARTIFACTS.map(a =>
            React.createElement('div', {
              key: a.id,
              style: {
                background: t.surface, borderRadius: 12, padding: '14px 10px', border: `1px solid ${a.earned ? `${a.color}33` : t.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center',
                opacity: a.earned ? 1 : 0.45, boxShadow: a.earned ? `0 2px 12px ${a.color}22` : 'none', cursor: 'pointer',
              }
            },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 12, background: a.earned ? a.bg : t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', border: a.earned ? `1px solid ${a.color}44` : `1px solid ${t.border}` } },
                React.createElement(Icon, { name: a.icon, size: 20, color: a.earned ? a.color : t.textMuted })
              ),
              React.createElement('span', { style: { color: t.text, fontSize: 10, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', lineHeight: 1.3 } }, a.name),
              !a.earned && React.createElement('span', { style: { color: t.textMuted, fontSize: 9, fontFamily: '"IBM Plex Sans", sans-serif', lineHeight: 1.3 } }, a.desc)
            )
          )
        )
      ),
      activeTab === 'leaderboard' && React.createElement('div', { style: { background: t.surface, borderRadius: 12, overflow: 'hidden', border: `1px solid ${t.border}`, boxShadow: t.shadow } },
        LEADERBOARD.map((user, i) =>
          React.createElement('div', {
            key: user.rank,
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: user.isUser ? (isDark ? 'rgba(34,197,94,0.08)' : 'rgba(34,197,94,0.06)') : 'transparent',
              borderBottom: i < LEADERBOARD.length - 1 ? `1px solid ${t.border}` : 'none',
              borderLeft: user.isUser ? `3px solid ${t.cta}` : '3px solid transparent',
            }
          },
            React.createElement('div', { style: { width: 24, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 800, color: user.rank <= 3 ? [t.warning, t.textSecondary, '#CD7F32'][user.rank - 1] : t.textMuted } }, `#${user.rank}`),
            React.createElement(Avatar, { initials: user.avatar, color: user.color, size: 36 }),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { color: user.isUser ? t.cta : t.text, fontSize: 13, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' } }, user.name),
              React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 2 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(Icon, { name: 'Award', size: 10, color: t.textMuted }),
                  React.createElement('span', { style: { color: t.textMuted, fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif' } }, `${user.artifacts} artifacts`)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
                  React.createElement(Icon, { name: 'Flame', size: 10, color: '#F97316' }),
                  React.createElement('span', { style: { color: t.textMuted, fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif' } }, `${user.streak}d streak`)
                )
              )
            ),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { color: t.text, fontSize: 13, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace' } }, user.xp.toLocaleString()),
              React.createElement('div', { style: { color: t.textMuted, fontSize: 9, fontFamily: '"IBM Plex Sans", sans-serif' } }, 'XP')
            )
          )
        )
      ),
      activeTab === 'streak' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        React.createElement('div', { style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow } },
          React.createElement('h3', { style: { color: t.text, fontSize: 12, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace', margin: '0 0 12px', letterSpacing: 0.5 } }, 'THIS MONTH'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 } },
            ['S','M','T','W','T','F','S'].map(d => React.createElement('div', { key: d, style: { textAlign: 'center', fontSize: 9, color: t.textMuted, fontFamily: '"IBM Plex Sans", sans-serif', marginBottom: 4 } }, d)),
            Array.from({ length: 35 }, (_, i) => {
              const val = Math.random();
              const active = i < 26 && Math.random() > 0.25;
              return React.createElement('div', { key: i, style: { aspectRatio: '1', borderRadius: 4, background: active ? (val > 0.7 ? t.cta : val > 0.4 ? `${t.cta}88` : `${t.cta}44`) : t.surfaceAlt } });
            })
          )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          [['Best Streak', '28 days', 'Flame', '#F97316'], ['Bounties Solved', '34 total', 'Target', t.accent], ['DevDrops Made', '28 total', 'Video', t.warning], ['Squads Led', '8 total', 'Users', t.cta]].map(([label, val, icon, color]) =>
            React.createElement('div', { key: label, style: { background: t.surface, borderRadius: 12, padding: 14, border: `1px solid ${t.border}`, boxShadow: t.shadow } },
              React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: `1px solid ${color}33` } },
                React.createElement(Icon, { name: icon, size: 16, color })
              ),
              React.createElement('div', { style: { color: t.text, fontSize: 16, fontWeight: 900, fontFamily: '"JetBrains Mono", monospace', marginBottom: 2 } }, val),
              React.createElement('div', { style: { color: t.textSecondary, fontSize: 11, fontFamily: '"IBM Plex Sans", sans-serif' } }, label)
            )
          )
        )
      ),
      React.createElement('div', { style: { height: 8 } })
    )
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const screens = { home: HomeScreen, squads: SquadsScreen, workbench: WorkbenchScreen, profile: ProfileScreen };
  const ActiveScreen = screens[activeScreen];

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Bounties' },
    { id: 'squads', icon: 'Users', label: 'Squads' },
    { id: 'workbench', icon: 'Layout', label: 'Workbench' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return React.createElement(React.Fragment, null,
    React.createElement('style', null, `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
    `),
    React.createElement('div', {
      style: { minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: '"IBM Plex Sans", sans-serif' }
    },
      React.createElement('div', { style: { width: 375, height: 812, borderRadius: 40, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 0 8px #d0d0d0, 0 0 0 10px #b0b0b0', display: 'flex', flexDirection: 'column', background: t.bg, position: 'relative', animation: 'fadeIn 0.4s ease' } },
        React.createElement('div', { style: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease' } },
          React.createElement(ActiveScreen, { t, isDark, setActiveScreen })
        ),
        React.createElement('div', { style: { background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', paddingBottom: 8, flexShrink: 0, boxShadow: `0 -4px 16px rgba(0,0,0,0.06)` } },
          navItems.map(item =>
            React.createElement('button', {
              key: item.id,
              onClick: () => setActiveScreen(item.id),
              style: { flex: 1, background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 4px 6px', cursor: 'pointer', gap: 3, minHeight: 56, position: 'relative' }
            },
              activeScreen === item.id && React.createElement('div', { style: { position: 'absolute', top: 6, width: 28, height: 3, borderRadius: 2, background: t.cta } }),
              React.createElement(Icon, { name: item.icon, size: 20, color: activeScreen === item.id ? t.cta : t.textMuted }),
              React.createElement('span', { style: { fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: activeScreen === item.id ? 700 : 500, color: activeScreen === item.id ? t.cta : t.textMuted } }, item.label)
            )
          ),
          React.createElement('button', {
            onClick: () => setIsDark(d => !d),
            style: { width: 44, background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 4px 6px', cursor: 'pointer', gap: 3, minHeight: 56 }
          },
            React.createElement(Icon, { name: isDark ? 'Sun' : 'Moon', size: 20, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif', color: t.textMuted } }, isDark ? 'Light' : 'Dark')
          )
        )
      )
    )
  );
}
