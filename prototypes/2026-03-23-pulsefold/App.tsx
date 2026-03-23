const { useState, useEffect, useRef } = React;

// Inject Google Font
(() => {
  const s = document.createElement('style');
  s.textContent = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');";
  document.head.appendChild(s);
})();

const THEMES = {
  light: {
    bg: '#F5F1EB',
    surface: '#FFFFFF',
    surface2: '#EDE8E0',
    text: '#1A1610',
    textSub: '#786E62',
    textMuted: '#B0A898',
    accent: '#E8455A',
    accentDark: '#C23245',
    accentSoft: '#FDF0F2',
    border: '#E0D9CF',
    navBg: '#FFFFFF',
    shadowColor: 'rgba(26,22,16,0.08)',
    green: '#2DB87A',
    greenSoft: '#E8F7F1',
    orange: '#F5892A',
    orangeSoft: '#FEF3E8',
    blue: '#3D8EF0',
    blueSoft: '#EBF3FE',
    purple: '#9B6BF2',
    purpleSoft: '#F2EDFE',
  },
  dark: {
    bg: '#100E0C',
    surface: '#1C1915',
    surface2: '#26221D',
    text: '#F0EBE3',
    textSub: '#9C948A',
    textMuted: '#6A625A',
    accent: '#FF6070',
    accentDark: '#E84A5A',
    accentSoft: '#2A1215',
    border: '#302B25',
    navBg: '#161210',
    shadowColor: 'rgba(0,0,0,0.3)',
    green: '#35CC8A',
    greenSoft: '#0F2A1E',
    orange: '#F59A3A',
    orangeSoft: '#2A1E0A',
    blue: '#5AA0F5',
    blueSoft: '#0E1E35',
    purple: '#B48AF5',
    purpleSoft: '#1E1535',
  }
};

const ARTICLES = [
  {
    id: 1,
    source: 'City Reporter',
    category: 'Local',
    title: 'City Council Votes on School Zone Speed Limits — What It Means for Pickup Routes',
    summary: 'New 20mph zones near 34 schools take effect March 31. Routes on Oak Ave and Maple St will see enforcement cameras starting Monday.',
    readTime: '4 min',
    localImpact: 'Affects your school pickup route on Maple St.',
    impactType: 'commute',
    mode: 'summary',
    time: '1h ago',
    saved: false,
  },
  {
    id: 2,
    source: 'Financial Times',
    category: 'Business',
    title: 'Fed Signals Two More Rate Cuts Before Summer as Inflation Cools',
    summary: "Chair Powell indicated the Fed remains on track for 50 basis points of cuts by June, contingent on continued progress in PCE data from Q1.",
    readTime: '6 min',
    localImpact: 'Mortgage rates may drop 0.3% by June — relevant if you\'re house-hunting.',
    impactType: 'budget',
    mode: 'standard',
    time: '2h ago',
    saved: true,
  },
  {
    id: 3,
    source: 'Wired',
    category: 'Technology',
    title: "The New AI Chip Race Is Making Nvidia's Lead Look Fragile",
    summary: 'AMD and Intel are both launching next-gen AI accelerators in Q2, while custom silicon from Google and Amazon continues to mature rapidly.',
    readTime: '8 min',
    localImpact: null,
    impactType: null,
    mode: 'standard',
    time: '3h ago',
    saved: false,
  },
  {
    id: 4,
    source: 'Bloomberg',
    category: 'Local',
    title: 'Downtown Transit Hub Construction Delayed Again — New Completion: Late 2026',
    summary: 'Supply chain issues and permitting setbacks push the $240M project back by eight months. Bus routes 12 and 7 remain on detour.',
    readTime: '3 min',
    localImpact: 'Bus Route 12 detour continues through end of year.',
    impactType: 'commute',
    mode: 'summary',
    time: '4h ago',
    saved: false,
  },
  {
    id: 5,
    source: 'The Economist',
    category: 'World',
    title: "Europe's Energy Independence Project Is Working — At a Cost",
    summary: 'Two years after pivoting away from Russian gas, European nations have diversified supply but industrial competitiveness has suffered significant blows.',
    readTime: '10 min',
    localImpact: null,
    impactType: null,
    mode: 'deep-dive',
    time: '5h ago',
    saved: false,
  },
];

const AUDIO_CHAPTERS = [
  { id: 1, title: 'Morning Brief', duration: '2:30', state: 'done' },
  { id: 2, title: 'Local Headlines', duration: '1:45', state: 'done' },
  { id: 3, title: 'Business Update', duration: '3:10', state: 'active' },
  { id: 4, title: 'Tech Roundup', duration: '2:20', state: 'pending' },
  { id: 5, title: 'World News', duration: '2:55', state: 'pending' },
];

const SAVED_ARTICLES = [
  { id: 2, source: 'Financial Times', title: 'Fed Signals Two More Rate Cuts Before Summer' },
  { id: 6, source: 'New York Times', title: 'The Hidden Cost of Remote Work on Junior Employees' },
  { id: 7, source: 'The Guardian', title: 'Reforestation Projects: What the Data Actually Shows' },
];

const WAVEFORM = [12, 20, 28, 16, 32, 24, 18, 30, 22, 14, 26, 32, 20, 16, 28, 24, 32, 18, 14, 22, 28, 16, 20, 32, 24, 18, 30, 14];

// ─── StatusBar ───────────────────────────────────────────────────────────────

function StatusBar({ theme }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    fmt();
    const id = setInterval(fmt, 10000);
    return () => clearInterval(id);
  }, []);
  return React.createElement('div', {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 4px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: '700', color: theme.text }
  },
    React.createElement('span', null, time),
    React.createElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 14, color: theme.text }),
      React.createElement(window.lucide.Battery, { size: 16, color: theme.text })
    )
  );
}

// ─── DynamicIsland ────────────────────────────────────────────────────────────

function DynamicIsland() {
  return React.createElement('div', {
    style: { width: '120px', height: '34px', background: '#000', borderRadius: '20px', margin: '0 auto 6px' }
  });
}

// ─── ContextBanner ────────────────────────────────────────────────────────────

function ContextBanner({ theme }) {
  const [active, setActive] = useState(0);
  const contexts = [
    { label: 'Morning Commute', icon: '🚌', color: theme.orange, bg: theme.orangeSoft, desc: 'Local traffic · Transit news · 8 min read' },
    { label: 'Work Hours', icon: '💼', color: theme.blue, bg: theme.blueSoft, desc: 'Business focus · Compact briefings' },
    { label: 'Evening Wind-Down', icon: '🌙', color: theme.purple, bg: theme.purpleSoft, desc: 'Long reads · Analysis · World news' },
  ];
  const ctx = contexts[active];
  return React.createElement('div', {
    style: { margin: '4px 16px 14px', background: ctx.bg, borderRadius: '16px', padding: '14px 16px', border: `1px solid ${ctx.color}22` }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        React.createElement('span', { style: { fontSize: '18px' } }, ctx.icon),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '700', color: theme.text } }, ctx.label),
        React.createElement('span', {
          style: { background: ctx.color, color: '#fff', fontSize: '9px', fontWeight: '800', padding: '2px 7px', borderRadius: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.8px' }
        }, 'ACTIVE')
      ),
      React.createElement('div', { style: { display: 'flex', gap: '5px', alignItems: 'center' } },
        contexts.map((_, i) => React.createElement('div', {
          key: i,
          onClick: () => setActive(i),
          style: { width: i === active ? 18 : 6, height: 6, borderRadius: 3, background: i === active ? ctx.color : theme.border, cursor: 'pointer', transition: 'all 0.25s' }
        }))
      )
    ),
    React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: 0 } }, ctx.desc)
  );
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────

function ArticleCard({ article, theme }) {
  const [mode, setMode] = useState(article.mode);
  const [saved, setSaved] = useState(article.saved);
  const [pressed, setPressed] = useState(false);

  const modes = ['summary', 'standard', 'deep-dive'];
  const modeLabels = { summary: '90s', standard: '5min', 'deep-dive': 'Full' };

  const catColors = { Local: theme.orange, Business: theme.blue, Technology: theme.green, World: theme.purple, Politics: theme.accent };
  const impactMeta = {
    commute: { bg: theme.orangeSoft, color: theme.orange, icon: '🚌' },
    budget: { bg: theme.greenSoft, color: theme.green, icon: '💰' },
  };
  const impact = article.impactType ? impactMeta[article.impactType] : null;

  return React.createElement('div', {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    style: {
      background: theme.surface,
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '10px',
      border: `1px solid ${theme.border}`,
      transform: pressed ? 'scale(0.985)' : 'scale(1)',
      transition: 'transform 0.15s',
      cursor: 'pointer',
    }
  },
    // Top row
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        React.createElement('span', {
          style: { background: catColors[article.category] || theme.accent, color: '#fff', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.3px' }
        }, article.category),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, fontWeight: '600' } }, article.source)
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: theme.textMuted } }, article.time),
        React.createElement('div', {
          onClick: (e) => { e.stopPropagation(); setSaved(!saved); },
          style: { cursor: 'pointer' }
        },
          React.createElement(saved ? window.lucide.BookmarkCheck : window.lucide.Bookmark, {
            size: 16, color: saved ? theme.accent : theme.textMuted, fill: saved ? theme.accent : 'none'
          })
        )
      )
    ),
    // Title
    React.createElement('h3', {
      style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 8px', lineHeight: '1.45' }
    }, article.title),
    // Summary
    React.createElement('p', {
      style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: theme.textSub, margin: '0 0 10px', lineHeight: '1.6' }
    }, mode === 'summary' ? article.summary.split('.')[0] + '.' : article.summary),
    // Local Impact
    impact && article.localImpact && React.createElement('div', {
      style: { background: impact.bg, borderRadius: '10px', padding: '8px 12px', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }
    },
      React.createElement('span', { style: { fontSize: '13px', marginTop: '1px' } }, impact.icon),
      React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: impact.color, fontWeight: '600', lineHeight: '1.5' } }, article.localImpact)
    ),
    // Footer
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('div', { style: { display: 'flex', background: theme.surface2, borderRadius: '20px', padding: '2px', gap: '2px' } },
        modes.map(m => React.createElement('button', {
          key: m,
          onClick: (e) => { e.stopPropagation(); setMode(m); },
          style: {
            background: mode === m ? theme.accent : 'transparent',
            color: mode === m ? '#fff' : theme.textSub,
            border: 'none',
            borderRadius: '20px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }
        }, modeLabels[m]))
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
        React.createElement(window.lucide.Clock, { size: 12, color: theme.textMuted }),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textMuted } }, article.readTime)
      )
    )
  );
}

// ─── TodayScreen ──────────────────────────────────────────────────────────────

function TodayScreen({ theme, isDark, setIsDark }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: theme.bg } },
    React.createElement('div', { style: { padding: '8px 20px 10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } },
      React.createElement('div', null,
        React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: '0 0 2px', fontWeight: '500' } }, today),
        React.createElement('h1', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '26px', fontWeight: '800', color: theme.text, margin: 0, letterSpacing: '-0.5px' } }, 'Your Edition')
      ),
      React.createElement('div', {
        onClick: () => setIsDark(!isDark),
        style: { background: theme.surface2, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${theme.border}` }
      },
        React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, { size: 17, color: theme.textSub })
      )
    ),
    React.createElement(ContextBanner, { theme }),
    React.createElement('div', { style: { padding: '0 16px 20px' } },
      ARTICLES.map(a => React.createElement(ArticleCard, { key: a.id, article: a, theme }))
    )
  );
}

// ─── AudioScreen ──────────────────────────────────────────────────────────────

function AudioScreen({ theme }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => Math.min(100, p + 0.5)), 500);
    return () => clearInterval(id);
  }, [playing]);

  const done = Math.floor(WAVEFORM.length * progress / 100);

  const upcomingEditions = [
    { title: 'Evening Debrief', topics: 'Politics · World · Culture', duration: '9 min', icon: '🌆' },
    { title: 'Weekend Long Read', topics: 'Science · Tech · Ideas', duration: '22 min', icon: '📚' },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: theme.bg } },
    React.createElement('div', { style: { padding: '8px 20px 16px' } },
      React.createElement('h1', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '26px', fontWeight: '800', color: theme.text, margin: 0, letterSpacing: '-0.5px' } }, 'Audio Editions')
    ),

    // Now Playing
    React.createElement('div', {
      style: { margin: '0 16px 20px', background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentDark} 100%)`, borderRadius: '22px', padding: '20px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 130, height: 130, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -40, left: -20, width: 100, height: 100, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' } }),
      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.65)', margin: '0 0 4px', letterSpacing: '1.2px' } }, 'NOW PLAYING'),
      React.createElement('h2', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '20px', fontWeight: '800', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.3px' } }, 'Morning Briefing'),
      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '0 0 18px' } }, 'Business Update  ·  Chapter 3 of 5'),

      // Waveform
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '2px', height: '44px', marginBottom: '14px' } },
        WAVEFORM.map((h, i) => React.createElement('div', {
          key: i,
          style: { flex: 1, height: `${h}px`, background: i < done ? '#fff' : 'rgba(255,255,255,0.28)', borderRadius: '2px', transition: 'background 0.3s' }
        }))
      ),

      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)' } }, '1:05'),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)' } }, '3:10')
      ),
      React.createElement('div', { style: { height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '18px', cursor: 'pointer' } },
        React.createElement('div', { style: { width: `${progress}%`, height: '100%', background: '#fff', borderRadius: '2px', transition: 'width 0.5s' } })
      ),

      // Controls
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' } },
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.18)', borderRadius: '50%', padding: '10px', cursor: 'pointer' } },
          React.createElement(window.lucide.SkipBack, { size: 18, color: '#fff' })
        ),
        React.createElement('div', {
          onClick: () => setPlaying(!playing),
          style: { background: '#fff', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }
        },
          React.createElement(playing ? window.lucide.Pause : window.lucide.Play, { size: 22, color: theme.accent })
        ),
        React.createElement('div', { style: { background: 'rgba(255,255,255,0.18)', borderRadius: '50%', padding: '10px', cursor: 'pointer' } },
          React.createElement(window.lucide.SkipForward, { size: 18, color: '#fff' })
        )
      )
    ),

    // Chapters
    React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '800', color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 10px' } }, 'Chapters'),
      AUDIO_CHAPTERS.map(ch => React.createElement('div', {
        key: ch.id,
        style: {
          display: 'flex', alignItems: 'center',
          padding: '11px 14px',
          background: ch.state === 'active' ? theme.accentSoft : theme.surface,
          borderRadius: '12px', marginBottom: '7px',
          border: `1px solid ${ch.state === 'active' ? theme.accent + '35' : theme.border}`,
          cursor: 'pointer',
        }
      },
        React.createElement('div', {
          style: { width: 32, height: 32, borderRadius: '50%', background: ch.state === 'done' ? theme.accent : ch.state === 'active' ? theme.accent : theme.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0 }
        },
          ch.state === 'done'
            ? React.createElement(window.lucide.Check, { size: 13, color: '#fff' })
            : ch.state === 'active'
              ? React.createElement(window.lucide.Volume2, { size: 13, color: '#fff' })
              : React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', fontWeight: '700', color: theme.textSub } }, ch.id)
        ),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: ch.state === 'active' ? '700' : '500', color: ch.state === 'active' ? theme.accent : theme.text, flex: 1 } }, ch.title),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textMuted } }, ch.duration)
      )),

      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '800', color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '16px 0 10px' } }, 'Up Next'),
      upcomingEditions.map((ed, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', alignItems: 'center', background: theme.surface, borderRadius: '12px', padding: '12px 14px', marginBottom: '8px', border: `1px solid ${theme.border}`, cursor: 'pointer' }
      },
        React.createElement('span', { style: { fontSize: '24px', marginRight: '12px' } }, ed.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '700', color: theme.text, margin: '0 0 2px' } }, ed.title),
          React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: 0 } }, ed.topics)
        ),
        React.createElement('span', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textMuted, marginLeft: '8px' } }, ed.duration)
      ))
    )
  );
}

// ─── IssuesScreen ─────────────────────────────────────────────────────────────

function IssuesScreen({ theme }) {
  const [view, setView] = useState('saved');
  const recent = [
    { name: 'Work Trip · Chicago', date: 'Mar 18', count: 6, bg: theme.blueSoft, accent: theme.blue, icon: '✈️' },
    { name: 'Weekend Deep Dive', date: 'Mar 16', count: 4, bg: theme.greenSoft, accent: theme.green, icon: '📗' },
    { name: 'Sunday Reading', date: 'Mar 10', count: 8, bg: theme.purpleSoft, accent: theme.purple, icon: '☕' },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: theme.bg } },
    React.createElement('div', { style: { padding: '8px 20px 14px' } },
      React.createElement('h1', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 14px', letterSpacing: '-0.5px' } }, 'Your Issues'),
      React.createElement('div', { style: { display: 'flex', background: theme.surface2, borderRadius: '12px', padding: '3px' } },
        ['saved', 'builder'].map(v => React.createElement('button', {
          key: v,
          onClick: () => setView(v),
          style: {
            flex: 1, border: 'none', borderRadius: '10px', padding: '8px',
            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: '700',
            background: view === v ? theme.surface : 'transparent',
            color: view === v ? theme.text : theme.textSub,
            cursor: 'pointer',
            boxShadow: view === v ? `0 1px 4px ${theme.shadowColor}` : 'none',
            transition: 'all 0.2s',
          }
        }, v === 'saved' ? 'Saved Issues' : 'Issue Builder'))
      )
    ),

    view === 'saved'
      ? React.createElement('div', { style: { padding: '0 16px 20px' } },
          // Magazine cover
          React.createElement('div', {
            style: { background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, borderRadius: '20px', padding: '22px', marginBottom: '16px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }
          },
            React.createElement('div', { style: { position: 'absolute', bottom: -30, right: -30, width: 140, height: 140, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' } }),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' } },
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px', letterSpacing: '1.2px' } }, 'PULSEFOLD'),
                React.createElement('h2', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.4px' } }, 'Weekly Issue')
              ),
              React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 12px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '700', color: '#fff' } }, 'Mar 17–23')
            ),
            React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0 } }, `${SAVED_ARTICLES.length} stories saved  ·  ~18 min read`)
          ),
          // Saved articles
          SAVED_ARTICLES.map(a => React.createElement('div', {
            key: a.id,
            style: { display: 'flex', alignItems: 'center', background: theme.surface, borderRadius: '13px', padding: '14px', marginBottom: '8px', border: `1px solid ${theme.border}`, cursor: 'pointer' }
          },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: theme.textSub, margin: '0 0 4px', fontWeight: '700', letterSpacing: '0.2px' } }, a.source),
              React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0, lineHeight: '1.45' } }, a.title)
            ),
            React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })
          ))
        )
      : React.createElement('div', { style: { padding: '0 16px 20px' } },
          // Builder CTA
          React.createElement('div', {
            style: { background: theme.surface, borderRadius: '16px', padding: '24px 20px', border: `2px dashed ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }
          },
            React.createElement('div', { style: { background: theme.accentSoft, borderRadius: '50%', padding: '14px', marginBottom: '12px' } },
              React.createElement(window.lucide.Plus, { size: 26, color: theme.accent })
            ),
            React.createElement('h3', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 6px' } }, 'Build a New Issue'),
            React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: theme.textSub, margin: 0, textAlign: 'center', lineHeight: '1.5' } }, 'Combine saved articles into a personalized magazine to read or share offline')
          ),
          React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '800', color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 10px' } }, 'Recent Editions'),
          recent.map((issue, i) => React.createElement('div', {
            key: i,
            style: { display: 'flex', alignItems: 'center', background: issue.bg, borderRadius: '14px', padding: '14px 16px', marginBottom: '9px', cursor: 'pointer' }
          },
            React.createElement('span', { style: { fontSize: '22px', marginRight: '12px' } }, issue.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '700', color: theme.text, margin: '0 0 2px' } }, issue.name),
              React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: 0 } }, `${issue.date}  ·  ${issue.count} stories`)
            ),
            React.createElement(window.lucide.ChevronRight, { size: 17, color: issue.accent })
          ))
        )
  );
}

// ─── SettingsScreen ───────────────────────────────────────────────────────────

function SettingsScreen({ theme, isDark, setIsDark }) {
  const [notifs, setNotifs] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [offline, setOffline] = useState(false);
  const [locationCtx, setLocationCtx] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);

  const Toggle = ({ value, onChange }) => React.createElement('div', {
    onClick: () => onChange(!value),
    style: { width: 44, height: 26, background: value ? theme.accent : theme.border, borderRadius: 13, padding: 3, cursor: 'pointer', transition: 'background 0.22s', display: 'flex', alignItems: 'center' }
  },
    React.createElement('div', {
      style: { width: 20, height: 20, background: '#fff', borderRadius: '50%', transform: value ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.22s', boxShadow: '0 1px 4px rgba(0,0,0,0.22)' }
    })
  );

  const Row = ({ label, sub, children }) => React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: `1px solid ${theme.border}` }
  },
    React.createElement('div', null,
      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 } }, label),
      sub && React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: '2px 0 0' } }, sub)
    ),
    children
  );

  const Section = ({ title, children }) => React.createElement('div', { style: { padding: '0 16px', marginBottom: '20px' } },
    React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '800', color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 6px 4px' } }, title),
    React.createElement('div', { style: { background: theme.surface, borderRadius: '16px', border: `1px solid ${theme.border}`, overflow: 'hidden' } }, children)
  );

  const ctxList = [
    { label: 'Morning Commute', time: '7:30 – 9:00 AM', icon: '🚌', color: theme.orange },
    { label: 'Work Hours', time: '9:00 AM – 6:00 PM', icon: '💼', color: theme.blue },
    { label: 'Evening Wind-Down', time: '8:00 – 11:00 PM', icon: '🌙', color: theme.purple },
  ];

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', background: theme.bg } },
    // Profile header
    React.createElement('div', { style: { padding: '8px 20px 20px', display: 'flex', alignItems: 'center', gap: '14px' } },
      React.createElement('div', {
        style: { width: 58, height: 58, borderRadius: '50%', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
      },
        React.createElement(window.lucide.User, { size: 28, color: '#fff' })
      ),
      React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '20px', fontWeight: '800', color: theme.text, margin: '0 0 3px', letterSpacing: '-0.3px' } }, 'Alex Morgan'),
        React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: theme.textSub, margin: 0 } }, 'Premium  ·  Joined Jan 2024')
      )
    ),

    React.createElement(Section, { title: 'Appearance' },
      React.createElement(Row, { label: 'Dark Mode', sub: isDark ? 'Currently enabled' : 'Currently disabled' },
        React.createElement(Toggle, { value: isDark, onChange: setIsDark })
      )
    ),

    React.createElement(Section, { title: 'Context Windows' },
      React.createElement(Row, { label: 'Auto-Detect Routine', sub: 'Learns your schedule over time' },
        React.createElement(Toggle, { value: autoDetect, onChange: setAutoDetect })
      ),
      React.createElement(Row, { label: 'Location Awareness', sub: 'Uses GPS for local news relevance' },
        React.createElement(Toggle, { value: locationCtx, onChange: setLocationCtx })
      )
    ),

    React.createElement(Section, { title: 'Audio' },
      React.createElement(Row, { label: 'Auto-Play on Commute', sub: 'Starts briefing when transit begins' },
        React.createElement(Toggle, { value: autoPlay, onChange: setAutoPlay })
      ),
      React.createElement(Row, { label: 'Offline Sync', sub: 'Download editions for offline play' },
        React.createElement(Toggle, { value: offline, onChange: setOffline })
      )
    ),

    React.createElement(Section, { title: 'Notifications' },
      React.createElement(Row, { label: 'Breaking News Alerts', sub: 'High-impact stories only' },
        React.createElement(Toggle, { value: notifs, onChange: setNotifs })
      )
    ),

    // Context list
    React.createElement('div', { style: { padding: '0 16px', marginBottom: '32px' } },
      React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: '800', color: theme.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px 4px' } }, 'Active Contexts'),
      ctxList.map((ctx, i) => React.createElement('div', {
        key: i,
        style: { display: 'flex', alignItems: 'center', background: theme.surface, borderRadius: '12px', padding: '12px 14px', marginBottom: '8px', border: `1px solid ${theme.border}`, cursor: 'pointer' }
      },
        React.createElement('span', { style: { fontSize: '20px', marginRight: '12px' } }, ctx.icon),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 } }, ctx.label),
          React.createElement('p', { style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: theme.textSub, margin: '2px 0 0' } }, ctx.time)
        ),
        React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: ctx.color, marginRight: '8px' } }),
        React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })
      ))
    )
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? THEMES.dark : THEMES.light;

  const tabs = [
    { id: 'today', label: 'Today', icon: window.lucide.Newspaper },
    { id: 'audio', label: 'Audio', icon: window.lucide.Headphones },
    { id: 'issues', label: 'Issues', icon: window.lucide.BookOpen },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    today: TodayScreen,
    audio: AudioScreen,
    issues: IssuesScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#E4DED5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }
  },
    React.createElement('div', {
      style: {
        width: '375px',
        height: '812px',
        background: theme.bg,
        borderRadius: '52px',
        boxShadow: `0 40px 100px rgba(0,0,0,0.28), 0 0 0 10px #1A1410, 0 0 0 11px #2A2420`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s',
      }
    },
      // Status + Dynamic Island
      React.createElement('div', { style: { background: theme.bg, flexShrink: 0, transition: 'background 0.3s' } },
        React.createElement(StatusBar, { theme }),
        React.createElement(DynamicIsland)
      ),

      // Active Screen
      React.createElement(ActiveScreen, { theme, isDark, setIsDark }),

      // Bottom Nav
      React.createElement('div', {
        style: { background: theme.navBg, borderTop: `1px solid ${theme.border}`, display: 'flex', padding: '8px 0 22px', flexShrink: 0, transition: 'background 0.3s' }
      },
        tabs.map(tab => React.createElement('div', {
          key: tab.id,
          onClick: () => setActiveTab(tab.id),
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px 0', position: 'relative' }
        },
          activeTab === tab.id && React.createElement('div', {
            style: { position: 'absolute', top: -8, width: '32px', height: '2px', background: theme.accent, borderRadius: '0 0 2px 2px' }
          }),
          React.createElement(tab.icon, {
            size: 22,
            color: activeTab === tab.id ? theme.accent : theme.textMuted,
            strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
          }),
          React.createElement('span', {
            style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', fontWeight: activeTab === tab.id ? '800' : '500', color: activeTab === tab.id ? theme.accent : theme.textMuted, transition: 'color 0.2s' }
          }, tab.label)
        ))
      )
    )
  );
}
