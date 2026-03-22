
const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#080C16',
    surface: '#0F1626',
    card: '#161F35',
    cardAlt: '#1A2540',
    border: '#1E2D4A',
    accent: '#00D4AA',
    accentDim: '#00D4AA22',
    accentSoft: '#00D4AA44',
    accentGrad: 'linear-gradient(135deg, #00D4AA, #0099FF)',
    text: '#EDF2FF',
    textSub: '#7A8DB0',
    textMuted: '#3D5070',
    badge: '#FF6B6B',
    badgeYellow: '#FFB347',
    badgeBlue: '#4DABF7',
    navBg: '#0A1020',
    statusBar: '#080C16',
    overlay: 'rgba(8,12,22,0.92)',
  },
  light: {
    bg: '#F0F4FF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardAlt: '#F8FAFF',
    border: '#E2E8F8',
    accent: '#00A87A',
    accentDim: '#00A87A18',
    accentSoft: '#00A87A33',
    accentGrad: 'linear-gradient(135deg, #00A87A, #0070CC)',
    text: '#111827',
    textSub: '#4B5A75',
    textMuted: '#9BAABF',
    badge: '#EF4444',
    badgeYellow: '#F59E0B',
    badgeBlue: '#3B82F6',
    navBg: '#FFFFFF',
    statusBar: '#F0F4FF',
    overlay: 'rgba(240,244,255,0.95)',
  }
};

const articles = [
  {
    id: 1, category: 'Local', tag: 'COMMUTE',
    title: 'Metro Line 4 Signal Failures Expected Through Thursday',
    summary: 'MTA engineers are replacing aging relay systems on the downtown corridor. Expect 8–12 min delays during peak hours.',
    why: 'Your usual commute uses Line 4 — budget 15 extra minutes Tuesday to Thursday morning.',
    time: '6 min ago', readTime: '2 min', outlet: 'City Transit News',
    urgency: 'high', saved: false,
    fullSummary: 'The Metropolitan Transit Authority confirmed overnight that signal relay failures on the downtown Line 4 corridor will persist through Thursday evening. Engineers are replacing 1970s-era relay boxes at the Canal St and Broadway-Lafayette junctions. During AM peak (7–9 AM) and PM peak (5–7 PM), riders should expect 8 to 12 minute delays. Express service is suspended. The MTA recommends taking Line 6 to Grand Central and transferring.',
  },
  {
    id: 2, category: 'Economy', tag: 'MONEY',
    title: 'Fed Signals Two More Rate Cuts Before July',
    summary: 'Chair Powell hinted at accelerated easing if inflation stays below 2.8%, which could lower mortgage rates by fall.',
    why: 'If you\'re refinancing or house-hunting, this changes the calculus for locking in rates.',
    time: '34 min ago', readTime: '4 min', outlet: 'Financial Times',
    urgency: 'medium', saved: true,
    fullSummary: 'Federal Reserve Chair Jerome Powell suggested in prepared remarks that the FOMC is open to two additional 25-basis-point cuts before the July meeting if core PCE inflation remains in the 2.6–2.8% band. Markets immediately priced in a 74% probability of a June cut, up from 51%. Analysts at Goldman Sachs revised their 30-year mortgage rate forecast to 5.9% by Q3. This would represent the first sub-6% rate environment since late 2022.',
  },
  {
    id: 3, category: 'Weather', tag: 'TRAVEL',
    title: 'Nor\'easter to Hit Northeast Coast Wednesday Night',
    summary: 'A significant storm system will bring 4–8 inches of snow to Boston, Providence, and Hartford, with coastal flooding.',
    why: 'Any travel plans Wednesday evening through Thursday morning should be rescheduled or confirmed with your carrier.',
    time: '1 hr ago', readTime: '3 min', outlet: 'National Weather Service',
    urgency: 'high', saved: false,
    fullSummary: 'A rapidly deepening nor\'easter is forecast to make landfall along the New England coast late Wednesday. Boston is expected to receive 5–8 inches, with up to 10 inches in interior Massachusetts. Logan Airport has already pre-canceled 140 flights for Wednesday evening departures. Rhode Island is under a winter storm watch. The storm will exit by Thursday noon, but residual delays are expected through Friday morning at major northeastern airports.',
  },
  {
    id: 4, category: 'Tech', tag: 'WORK',
    title: 'OpenAI Launches Enterprise API Tier with 10x Context Window',
    summary: 'The new Opus tier offers 1M-token context, sub-100ms latency, and SOC 2 compliance for corporate deployments.',
    why: 'If your team uses AI tools for legal docs or large codebases, this tier change matters for your Q2 budget.',
    time: '2 hr ago', readTime: '5 min', outlet: 'The Verge',
    urgency: 'low', saved: false,
    fullSummary: 'OpenAI announced a new Enterprise API pricing tier called Opus, targeting Fortune 500 deployment scenarios. The tier offers a 1 million token context window, guaranteed SLA of 99.9% uptime, and SOC 2 Type II compliance certification. Pricing is $0.012 per 1K input tokens and $0.048 per 1K output tokens — roughly 40% below current enterprise custom agreements. The announcement comes one week after Anthropic\'s similar Claude Enterprise tier expansion.',
  },
  {
    id: 5, category: 'Health', tag: 'FAMILY',
    title: 'New Study Links Ultra-Processed Foods to Child Sleep Disruption',
    summary: 'Children who ate UPF 5+ times per week showed 23% higher rates of difficulty sleeping, per Johns Hopkins research.',
    why: 'If your kids\' sleep has been inconsistent, this gives a concrete dietary angle to explore with their pediatrician.',
    time: '3 hr ago', readTime: '3 min', outlet: 'JAMA Pediatrics',
    urgency: 'low', saved: false,
    fullSummary: 'A longitudinal cohort study of 8,400 children ages 4–12 published in JAMA Pediatrics found that consumption of ultra-processed foods (defined by the NOVA classification) more than 5 times per week was associated with a 23% increased odds of sleep onset difficulty and a 17% increase in nighttime waking frequency. The association was strongest in children ages 6–9. Researchers controlled for total caloric intake, screen time, and physical activity. The proposed mechanism involves disruption of the gut-brain axis via microbiome changes.',
  },
  {
    id: 6, category: 'Politics', tag: 'LOCAL',
    title: 'City Council Votes Tuesday on Congestion Pricing Rollback',
    summary: 'A divided council will vote on suspending the downtown toll zone that currently charges $9 per vehicle entry.',
    why: 'This affects your parking costs and commute routes if you drive into downtown. Vote outcome expected by 6 PM.',
    time: '4 hr ago', readTime: '4 min', outlet: 'NY1 Politics',
    urgency: 'high', saved: true,
    fullSummary: 'The New York City Council is scheduled to vote Tuesday afternoon on a resolution to suspend the Central Business District Tolling Program — the congestion pricing scheme that charges most passenger vehicles $9 to enter Manhattan below 60th Street. The vote follows a petition signed by 31,000 outer-borough residents and businesses citing economic hardship. The MTA has warned that suspension would eliminate $1.2 billion in projected transit funding. The vote is expected to be 26–25, with two council members still undecided.',
  },
];

const contextPacks = [
  {
    id: 'morning', icon: '☀️', label: 'Morning Pack', time: 'Now',
    color: '#FF9500', desc: '5 stories for your commute',
    articleIds: [1, 2, 6],
  },
  {
    id: 'travel', icon: '✈️', label: 'Travel Pack', time: 'Wed',
    color: '#0099FF', desc: 'Storm alerts + airport updates',
    articleIds: [3, 1],
  },
  {
    id: 'work', icon: '💼', label: 'Work Pack', time: 'Today',
    color: '#8B5CF6', desc: 'Tech & economy briefing',
    articleIds: [4, 2],
  },
  {
    id: 'family', icon: '🏠', label: 'Family Pack', time: 'Evening',
    color: '#34D399', desc: 'Health & local decisions',
    articleIds: [5, 6],
  },
];

const dashboardItems = [
  { id: 1, type: 'alert', icon: '⚠️', color: '#FF6B6B', label: 'Storm Alert', desc: 'Nor\'easter Wednesday night — rebook if traveling', urgent: true },
  { id: 2, type: 'transit', icon: '🚇', color: '#FFB347', label: 'Transit Delay', desc: 'Line 4 delays Tue–Thu, budget +15 min', urgent: true },
  { id: 3, type: 'vote', icon: '🗳️', color: '#4DABF7', label: 'Council Vote Today', desc: 'Congestion pricing decision by 6 PM', urgent: false },
  { id: 4, type: 'rate', icon: '📉', color: '#34D399', label: 'Rate Opportunity', desc: 'Fed signals cuts — revisit mortgage rates', urgent: false },
  { id: 5, type: 'health', icon: '🥗', color: '#A78BFA', label: 'Health Insight', desc: 'UPF study: check kids\' weekly diet', urgent: false },
];

const categories = ['All', 'Local', 'Economy', 'Tech', 'Health', 'Weather', 'Politics', 'Science', 'Culture'];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [savedIds, setSavedIds] = useState([2, 6]);
  const [openArticle, setOpenArticle] = useState(null);
  const [readMode, setReadMode] = useState('summary'); // quick, summary, full
  const [activePack, setActivePack] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [pressedTab, setPressedTab] = useState(null);
  const [notification, setNotification] = useState(null);

  const t = themes[theme];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
  }, []);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      showNotif(prev.includes(id) ? 'Removed from saved' : 'Saved to library');
      return next;
    });
  };

  const filteredArticles = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);
  const savedArticles = articles.filter(a => savedIds.includes(a.id));

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'pulse', label: 'Pulse', icon: window.lucide.Zap },
    { id: 'saved', label: 'Saved', icon: window.lucide.Bookmark },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const urgencyColors = { high: '#FF6B6B', medium: '#FFB347', low: t.accent };

  // Article detail modal
  const ArticleModal = () => {
    if (!openArticle) return null;
    const art = openArticle;
    const isSaved = savedIds.includes(art.id);
    const modes = ['quick', 'summary', 'full'];
    const modeLabels = { quick: '30s Quick', summary: '2 min', full: 'Full Story' };
    const content = {
      quick: art.summary,
      summary: art.fullSummary,
      full: art.fullSummary + '\n\nAdditional reporting contributed by wire services. This story has been updated to reflect the latest developments. For real-time updates, follow @' + art.outlet.replace(/\s/g,'') + ' on social media.',
    };
    return React.createElement('div', {
      style: { position: 'absolute', inset: 0, zIndex: 50, background: t.overlay, display: 'flex', flexDirection: 'column', borderRadius: 40, overflow: 'hidden' }
    },
      React.createElement('div', {
        style: { flex: 1, overflowY: 'auto', padding: '60px 20px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
          React.createElement('div', {
            onClick: () => setOpenArticle(null),
            style: { width: 36, height: 36, borderRadius: 18, background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${t.border}` }
          }, React.createElement(window.lucide.X, { size: 18, color: t.textSub })),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', {
              onClick: () => toggleSave(art.id),
              style: { width: 36, height: 36, borderRadius: 18, background: isSaved ? t.accentSoft : t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px solid ${isSaved ? t.accent : t.border}` }
            }, React.createElement(window.lucide.Bookmark, { size: 18, color: isSaved ? t.accent : t.textSub, fill: isSaved ? t.accent : 'none' }))
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' } },
          React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.accent, background: t.accentDim, padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5 } }, art.tag),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: urgencyColors[art.urgency], background: urgencyColors[art.urgency] + '22', padding: '3px 10px', borderRadius: 20 } }, art.urgency.toUpperCase() + ' PRIORITY'),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted, padding: '3px 0' } }, art.outlet + ' · ' + art.time)
        ),
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text, lineHeight: 1.3, marginBottom: 16 } }, art.title),
        React.createElement('div', { style: { background: t.accentDim, border: `1px solid ${t.accentSoft}`, borderRadius: 12, padding: '12px 14px', marginBottom: 20 } },
          React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'flex-start' } },
            React.createElement(window.lucide.Lightbulb, { size: 16, color: t.accent, style: { flexShrink: 0, marginTop: 2 } }),
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: t.accent, marginBottom: 4, letterSpacing: 0.5 } }, 'WHY THIS MATTERS NOW'),
              React.createElement('p', { style: { fontSize: 13, color: t.text, lineHeight: 1.5 } }, art.why)
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 20, background: t.card, borderRadius: 12, padding: 4 } },
          modes.map(m => React.createElement('div', {
            key: m,
            onClick: () => setReadMode(m),
            style: { flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 9, background: readMode === m ? t.accentGrad : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }
          }, React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: readMode === m ? '#fff' : t.textSub } }, modeLabels[m])))
        ),
        React.createElement('p', { style: { fontSize: 14, color: t.text, lineHeight: 1.7, whiteSpace: 'pre-line' } }, content[readMode]),
        React.createElement('div', { style: { marginTop: 24, borderTop: `1px solid ${t.border}`, paddingTop: 16 } },
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted, marginBottom: 12 } }, 'MORE FROM THIS PACK'),
          React.createElement('div', { style: { fontSize: 13, color: t.accent, fontWeight: 600, cursor: 'pointer' } }, 'See related coverage →')
        )
      )
    );
  };

  const HomeScreen = () => {
    const [pressedPack, setPressedPack] = useState(null);
    const [pressedArt, setPressedArt] = useState(null);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      // Header
      React.createElement('div', { style: { padding: '16px 20px 12px', background: t.surface } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, fontWeight: 500, marginBottom: 2 } }, 'Good morning, Alex'),
            React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, background: t.accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } }, 'StoryPulse')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
            React.createElement('div', { style: { position: 'relative' } },
              React.createElement(window.lucide.Bell, { size: 20, color: t.textSub }),
              React.createElement('div', { style: { position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: 4, background: t.badge } })
            ),
            React.createElement('div', { style: { width: 32, height: 32, borderRadius: 16, background: t.accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 800, color: '#fff' } }, 'A')
            )
          )
        )
      ),
      // Context Packs
      React.createElement('div', { style: { padding: '16px 0 8px' } },
        React.createElement('div', { style: { padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: 0.3 } }, 'TODAY\'S CONTEXT PACKS'),
          React.createElement('span', { style: { fontSize: 12, color: t.accent, fontWeight: 600 } }, 'See all')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4 } },
          contextPacks.map(pack => React.createElement('div', {
            key: pack.id,
            onClick: () => setActivePack(activePack === pack.id ? null : pack.id),
            onMouseDown: () => setPressedPack(pack.id),
            onMouseUp: () => setPressedPack(null),
            style: {
              flexShrink: 0, width: 140, background: activePack === pack.id ? pack.color + '33' : t.card,
              border: `1.5px solid ${activePack === pack.id ? pack.color : t.border}`,
              borderRadius: 16, padding: '14px 14px', cursor: 'pointer',
              transform: pressedPack === pack.id ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.15s',
            }
          },
            React.createElement('div', { style: { fontSize: 22, marginBottom: 8 } }, pack.icon),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 } }, pack.label),
            React.createElement('div', { style: { fontSize: 11, color: t.textSub, marginBottom: 6 } }, pack.desc),
            React.createElement('div', { style: { fontSize: 10, fontWeight: 700, color: pack.color, background: pack.color + '22', padding: '2px 8px', borderRadius: 10, display: 'inline-block' } }, pack.time)
          ))
        )
      ),
      // Active pack articles or top stories
      React.createElement('div', { style: { padding: '8px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: 0.3 } },
            activePack ? contextPacks.find(p => p.id === activePack)?.label.toUpperCase() : 'TOP STORIES'
          ),
          activePack && React.createElement('span', { onClick: () => setActivePack(null), style: { fontSize: 12, color: t.textSub, cursor: 'pointer' } }, 'Clear ×')
        ),
        (activePack
          ? articles.filter(a => contextPacks.find(p => p.id === activePack)?.articleIds.includes(a.id))
          : articles.slice(0, 5)
        ).map(art => React.createElement('div', {
          key: art.id,
          onClick: () => { setReadMode('summary'); setOpenArticle(art); },
          onMouseDown: () => setPressedArt(art.id),
          onMouseUp: () => setPressedArt(null),
          style: {
            background: pressedArt === art.id ? t.cardAlt : t.card,
            border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 10, cursor: 'pointer',
            transform: pressedArt === art.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s',
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            React.createElement('div', { style: { display: 'flex', gap: 6 } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.accent, background: t.accentDim, padding: '2px 8px', borderRadius: 10 } }, art.tag),
              art.urgency === 'high' && React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: '#FF6B6B', background: '#FF6B6B22', padding: '2px 8px', borderRadius: 10 } }, '● URGENT')
            ),
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.readTime),
              React.createElement('div', {
                onClick: (e) => { e.stopPropagation(); toggleSave(art.id); },
                style: { cursor: 'pointer' }
              }, React.createElement(window.lucide.Bookmark, { size: 16, color: savedIds.includes(art.id) ? t.accent : t.textMuted, fill: savedIds.includes(art.id) ? t.accent : 'none' }))
            )
          ),
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 6 } }, art.title),
          React.createElement('p', { style: { fontSize: 13, color: t.textSub, lineHeight: 1.5, marginBottom: 10 } }, art.summary),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, background: t.accentDim, borderRadius: 8, padding: '6px 10px' } },
            React.createElement(window.lucide.Lightbulb, { size: 12, color: t.accent }),
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 500, flex: 1, lineHeight: 1.4 } }, art.why)
          ),
          React.createElement('div', { style: { marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.outlet + ' · ' + art.time),
            React.createElement('span', { style: { fontSize: 11, color: t.accent, fontWeight: 600 } }, 'Read →')
          )
        ))
      )
    );
  };

  const DiscoverScreen = () => {
    const [pressedArt, setPressedArt] = useState(null);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 0', background: t.surface } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 14 } }, 'Discover'),
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14 } },
          categories.map(cat => React.createElement('div', {
            key: cat,
            onClick: () => setActiveCategory(cat),
            style: {
              flexShrink: 0, padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              background: activeCategory === cat ? t.accentGrad : t.card,
              border: `1px solid ${activeCategory === cat ? 'transparent' : t.border}`,
              fontSize: 12, fontWeight: 600,
              color: activeCategory === cat ? '#fff' : t.textSub,
              transition: 'all 0.15s',
            }
          }, cat))
        )
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '10px 14px', marginBottom: 16 } },
          React.createElement(window.lucide.Search, { size: 16, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 14, color: t.textMuted } }, 'Search stories, topics...')
        ),
        filteredArticles.map(art => React.createElement('div', {
          key: art.id,
          onClick: () => { setReadMode('summary'); setOpenArticle(art); },
          onMouseDown: () => setPressedArt(art.id),
          onMouseUp: () => setPressedArt(null),
          style: {
            display: 'flex', gap: 12, background: pressedArt === art.id ? t.cardAlt : t.card,
            border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10, cursor: 'pointer',
            transform: pressedArt === art.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s',
          }
        },
          React.createElement('div', { style: { width: 56, height: 56, borderRadius: 12, background: t.accentGrad, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 } },
            { Local: '📍', Economy: '💹', Weather: '🌩️', Tech: '💻', Health: '🧬', Politics: '🏛️', Science: '🔬', Culture: '🎨' }[art.category] || '📰'
          ),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
              React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.accent } }, art.category.toUpperCase()),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.time)
            ),
            React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 4 } }, art.title),
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.outlet),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, '·'),
              React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.readTime + ' read'),
              React.createElement(window.lucide.Bookmark, {
                size: 14, color: savedIds.includes(art.id) ? t.accent : t.textMuted,
                fill: savedIds.includes(art.id) ? t.accent : 'none',
                style: { marginLeft: 'auto', cursor: 'pointer' },
                onClick: (e) => { e.stopPropagation(); toggleSave(art.id); }
              })
            )
          )
        ))
      )
    );
  };

  const PulseScreen = () => {
    const [pressedItem, setPressedItem] = useState(null);
    const today = 'Monday, Mar 23';
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Decision Pulse'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub } }, today + ' · 3 urgent items')
      ),
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { background: t.accentGrad, borderRadius: 18, padding: '16px 20px', marginTop: 16, marginBottom: 20 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: 0.5 } }, 'TODAY\'S BRIEF'),
              React.createElement('p', { style: { fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3, maxWidth: 200 } }, '5 items need your attention today')
            ),
            React.createElement('div', { style: { width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(window.lucide.Zap, { size: 24, color: '#fff', fill: '#fff' })
            )
          ),
          React.createElement('div', { style: { marginTop: 12, display: 'flex', gap: 8 } },
            ['2 High', '1 Medium', '2 Low'].map((tag, i) => React.createElement('span', { key: i, style: { fontSize: 11, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 12 } }, tag))
          )
        ),
        dashboardItems.map(item => React.createElement('div', {
          key: item.id,
          onMouseDown: () => setPressedItem(item.id),
          onMouseUp: () => setPressedItem(null),
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            background: pressedItem === item.id ? t.cardAlt : t.card,
            border: `1px solid ${item.urgent ? item.color + '44' : t.border}`,
            borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer',
            transform: pressedItem === item.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s',
          }
        },
          React.createElement('div', { style: { width: 44, height: 44, borderRadius: 22, background: item.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 } }, item.icon),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, item.label),
              item.urgent && React.createElement('span', { style: { fontSize: 9, fontWeight: 700, color: item.color, background: item.color + '22', padding: '2px 8px', borderRadius: 8 } }, 'ACTION NEEDED')
            ),
            React.createElement('p', { style: { fontSize: 12, color: t.textSub, marginTop: 3, lineHeight: 1.4 } }, item.desc)
          ),
          React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })
        )),
        React.createElement('div', { style: { marginTop: 8, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px' } },
          React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 12, letterSpacing: 0.3 } }, 'COVERAGE MERGE REPORT'),
          React.createElement('p', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.6, marginBottom: 10 } }, 'StoryPulse merged 14 overlapping headlines from 7 outlets into 6 briefings today — saving you ~28 minutes of redundant reading.'),
          React.createElement('div', { style: { display: 'flex', gap: 10 } },
            [{ v: '14', l: 'Merged' }, { v: '7', l: 'Outlets' }, { v: '28m', l: 'Saved' }].map((s, i) => React.createElement('div', { key: i, style: { flex: 1, background: t.cardAlt, borderRadius: 10, padding: '10px', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.accent } }, s.v),
              React.createElement('div', { style: { fontSize: 10, color: t.textMuted, marginTop: 2 } }, s.l)
            ))
          )
        )
      )
    );
  };

  const SavedScreen = () => {
    const [pressedArt, setPressedArt] = useState(null);
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 4 } }, 'Saved Stories'),
        React.createElement('p', { style: { fontSize: 13, color: t.textSub } }, savedArticles.length + ' items saved')
      ),
      React.createElement('div', { style: { padding: '16px 20px' } },
        savedArticles.length === 0
          ? React.createElement('div', { style: { textAlign: 'center', paddingTop: 60 } },
              React.createElement(window.lucide.Bookmark, { size: 40, color: t.textMuted, style: { margin: '0 auto 12px' } }),
              React.createElement('p', { style: { color: t.textSub, fontSize: 14 } }, 'No saved stories yet'),
              React.createElement('p', { style: { color: t.textMuted, fontSize: 12, marginTop: 6 } }, 'Tap the bookmark icon on any story')
            )
          : savedArticles.map(art => React.createElement('div', {
              key: art.id,
              onClick: () => { setReadMode('summary'); setOpenArticle(art); },
              onMouseDown: () => setPressedArt(art.id),
              onMouseUp: () => setPressedArt(null),
              style: {
                background: pressedArt === art.id ? t.cardAlt : t.card,
                border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 10, cursor: 'pointer',
                transform: pressedArt === art.id ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s',
              }
            },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
                React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: t.accent, background: t.accentDim, padding: '2px 8px', borderRadius: 10 } }, art.tag),
                React.createElement('div', { onClick: (e) => { e.stopPropagation(); toggleSave(art.id); }, style: { cursor: 'pointer' } },
                  React.createElement(window.lucide.Bookmark, { size: 16, color: t.accent, fill: t.accent })
                )
              ),
              React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 6 } }, art.title),
              React.createElement('p', { style: { fontSize: 12, color: t.textSub, lineHeight: 1.5, marginBottom: 8 } }, art.summary),
              React.createElement('div', { style: { display: 'flex', gap: 8 } },
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.outlet),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, '·'),
                React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, art.readTime + ' read')
              )
            ))
      )
    );
  };

  const SettingsScreen = () => {
    const [notifOn, setNotifOn] = useState(true);
    const [mergeOn, setMergeOn] = useState(true);
    const [aiOn, setAiOn] = useState(true);
    const Toggle = ({ val, onChange }) => React.createElement('div', {
      onClick: () => onChange(!val),
      style: { width: 44, height: 26, borderRadius: 13, background: val ? t.accentGrad : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }
    }, React.createElement('div', { style: { position: 'absolute', top: 3, left: val ? 21 : 3, width: 20, height: 20, borderRadius: 10, background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' } }));
    const Row = ({ icon, label, sub, right }) => React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid ${t.border}` } },
      React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: t.accentDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, icon),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { fontSize: 14, fontWeight: 600, color: t.text } }, label),
        sub && React.createElement('p', { style: { fontSize: 11, color: t.textMuted, marginTop: 2 } }, sub)
      ),
      right
    );
    return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 80 } },
      React.createElement('div', { style: { padding: '16px 20px 14px', background: t.surface } },
        React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text } }, 'Settings')
      ),
      React.createElement('div', { style: { padding: '12px 20px' } },
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '4px 16px', marginBottom: 16 } },
          React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, padding: '12px 0 8px', letterSpacing: 0.5 } }, 'APPEARANCE'),
          Row({
            icon: React.createElement(theme === 'dark' ? window.lucide.Moon : window.lucide.Sun, { size: 18, color: t.accent }),
            label: 'Theme',
            sub: theme === 'dark' ? 'Dark mode active' : 'Light mode active',
            right: React.createElement('div', { style: { display: 'flex', background: t.cardAlt, borderRadius: 20, padding: 4, gap: 4 } },
              ['dark', 'light'].map(m => React.createElement('div', { key: m, onClick: () => setTheme(m), style: { padding: '5px 12px', borderRadius: 16, background: theme === m ? t.accentGrad : 'transparent', cursor: 'pointer' } },
                React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: theme === m ? '#fff' : t.textSub } }, m === 'dark' ? '🌙' : '☀️')
              ))
            )
          }),
          Row({
            icon: React.createElement(window.lucide.Type, { size: 18, color: t.accent }),
            label: 'Default Read Mode',
            sub: 'Summary',
            right: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })
          })
        ),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '4px 16px', marginBottom: 16 } },
          React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, padding: '12px 0 8px', letterSpacing: 0.5 } }, 'PERSONALIZATION'),
          Row({ icon: React.createElement(window.lucide.Bell, { size: 18, color: t.accent }), label: 'Smart Notifications', sub: 'Alert on urgent local stories', right: React.createElement(Toggle, { val: notifOn, onChange: setNotifOn }) }),
          Row({ icon: React.createElement(window.lucide.Copy, { size: 18, color: t.accent }), label: 'Story Merge', sub: 'Combine duplicate coverage', right: React.createElement(Toggle, { val: mergeOn, onChange: setMergeOn }) }),
          Row({ icon: React.createElement(window.lucide.Sparkles, { size: 18, color: t.accent }), label: 'AI Relevance Layer', sub: '"Why this matters" explainers', right: React.createElement(Toggle, { val: aiOn, onChange: setAiOn }) })
        ),
        React.createElement('div', { style: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '4px 16px', marginBottom: 16 } },
          React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: t.textMuted, padding: '12px 0 8px', letterSpacing: 0.5 } }, 'ACCOUNT'),
          Row({ icon: React.createElement(window.lucide.User, { size: 18, color: t.accent }), label: 'Profile', sub: 'Alex • alex@email.com', right: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }) }),
          Row({ icon: React.createElement(window.lucide.MapPin, { size: 18, color: t.accent }), label: 'Location', sub: 'New York, NY', right: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }) }),
          Row({ icon: React.createElement(window.lucide.Newspaper, { size: 18, color: t.accent }), label: 'Source Preferences', sub: '12 outlets enabled', right: React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted }) })
        ),
        React.createElement('div', { style: { textAlign: 'center', padding: '8px 0 20px' } },
          React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, 'StoryPulse v2.4.1 · News shaped to your real day.')
        )
      )
    );
  };

  const screens = { home: HomeScreen, discover: DiscoverScreen, pulse: PulseScreen, saved: SavedScreen, settings: SettingsScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement('div', {
    style: { minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }
  },
    React.createElement('div', {
      style: { width: 375, height: 812, background: t.surface, borderRadius: 50, overflow: 'hidden', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 2px #222', display: 'flex', flexDirection: 'column' }
    },
      // Dynamic Island
      React.createElement('div', { style: { position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 17, zIndex: 100 } }),
      // Status Bar
      React.createElement('div', { style: { background: t.statusBar, paddingTop: 14, paddingBottom: 6, paddingLeft: 28, paddingRight: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, flexShrink: 0 } },
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text } }, '9:41'),
        React.createElement('div', { style: { display: 'flex', gap: 5, alignItems: 'center' } },
          React.createElement(window.lucide.Signal, { size: 15, color: t.text }),
          React.createElement(window.lucide.Wifi, { size: 15, color: t.text }),
          React.createElement(window.lucide.Battery, { size: 18, color: t.text })
        )
      ),
      // Main Content
      React.createElement('div', { style: { flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' } },
        React.createElement(ActiveScreen),
        openArticle && React.createElement(ArticleModal),
        // Notification Toast
        notification && React.createElement('div', {
          style: { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: t.accentGrad, color: '#fff', fontSize: 12, fontWeight: 600, padding: '8px 20px', borderRadius: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 200 }
        }, notification)
      ),
      // Bottom Nav
      React.createElement('div', {
        style: { background: t.navBg, borderTop: `1px solid ${t.border}`, paddingTop: 10, paddingBottom: 20, paddingLeft: 8, paddingRight: 8, display: 'flex', justifyContent: 'space-around', flexShrink: 0, zIndex: 20 }
      },
        tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            onMouseDown: () => setPressedTab(tab.id),
            onMouseUp: () => setPressedTab(null),
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 14, cursor: 'pointer',
              background: isActive ? t.accentDim : 'transparent',
              transform: pressedTab === tab.id ? 'scale(0.9)' : 'scale(1)', transition: 'all 0.15s',
            }
          },
            React.createElement(tab.icon, { size: 22, color: isActive ? t.accent : t.textMuted, strokeWidth: isActive ? 2.5 : 1.8 }),
            React.createElement('span', { style: { fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.accent : t.textMuted } }, tab.label)
          );
        })
      )
    )
  );
}
