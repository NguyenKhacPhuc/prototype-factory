const { useState, useEffect, useRef } = React;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [activeMode, setActiveMode] = useState('commute');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleLayer, setArticleLayer] = useState('summary');
  const [pressedItem, setPressedItem] = useState(null);
  const [compareIdx, setCompareIdx] = useState(0);
  const [activeCollection, setActiveCollection] = useState(null);
  const [savedIds, setSavedIds] = useState([2, 6, 9]);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setCurrentTime(`${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const themes = {
    light: {
      bg: '#F7F4EF',
      surface: '#FFFFFF',
      surface2: '#F0EDE8',
      card: '#FFFFFF',
      cardBorder: '#EDE8E0',
      text: '#1A1510',
      textSec: '#6B6058',
      textMuted: '#A89F95',
      primary: '#C54A12',
      primaryDark: '#A33C0E',
      primaryGlow: 'rgba(197,74,18,0.12)',
      primaryLight: '#FEF0E8',
      border: '#E8E2D8',
      accent: '#1A5FA3',
      accentLight: '#EBF3FC',
      green: '#15803D',
      greenLight: '#F0FDF4',
      purple: '#7C3AED',
      purpleLight: '#F5F3FF',
      nav: '#FFFFFF',
      navBorder: '#EDE8E0',
      modeActive: '#1A1510',
      modeInactive: '#A89F95',
      tag: '#F0EDE8',
      tagText: '#5A5048',
      island: '#1A1510',
      divider: '#EDE8E0',
      inputBg: '#F0EDE8',
      skeleton: '#EDE8E0',
    },
    dark: {
      bg: '#0D0B09',
      surface: '#161310',
      surface2: '#1E1A16',
      card: '#1C1814',
      cardBorder: '#252018',
      text: '#F0EBE3',
      textSec: '#9A9088',
      textMuted: '#6B6058',
      primary: '#E8632C',
      primaryDark: '#D4551E',
      primaryGlow: 'rgba(232,99,44,0.18)',
      primaryLight: '#2A1A0D',
      border: '#2A2420',
      accent: '#5BA3E8',
      accentLight: '#152030',
      green: '#34D399',
      greenLight: '#0C2018',
      purple: '#A78BFA',
      purpleLight: '#1A1535',
      nav: '#100E0C',
      navBorder: '#252018',
      modeActive: '#F0EBE3',
      modeInactive: '#6B6058',
      tag: '#252018',
      tagText: '#B0A898',
      island: '#000000',
      divider: '#252018',
      inputBg: '#1E1A16',
      skeleton: '#252018',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
    body { background: #e8e4df; }
  `;

  const modes = [
    { id: 'commute', label: 'Commute', icon: 'Train', time: '4–8 min' },
    { id: 'lunch', label: 'Lunch', icon: 'Coffee', time: '8–15 min' },
    { id: 'bedtime', label: 'Bedtime', icon: 'Moon', time: '10–20 min' },
    { id: 'deepdive', label: 'Deep Dive', icon: 'BookOpen', time: '20+ min' },
  ];

  const articleData = {
    commute: [
      { id: 1, tag: 'Transit', tagColor: '#1A5FA3', title: 'BART Delays Hit Morning Commuters as East Bay Signal Failures Continue', readTime: '4 min', source: 'SF Chronicle', time: '8 min ago', featured: true },
      { id: 2, tag: 'Housing', tagColor: '#15803D', title: 'Bay Area Median Home Price Drops for Third Consecutive Month', readTime: '6 min', source: 'Mercury News', time: '23 min ago', featured: false },
      { id: 3, tag: 'Politics', tagColor: '#7C3AED', title: 'Senate Passes Infrastructure Package With Surprise Bipartisan Support', readTime: '7 min', source: 'Washington Post', time: '1 hr ago', featured: false },
    ],
    lunch: [
      { id: 4, tag: 'Tech', tagColor: '#7C3AED', title: 'OpenAI Releases Model That Passes Medical Licensing Exam With 94% Score', readTime: '8 min', source: 'The Verge', time: '2 hr ago', featured: true },
      { id: 5, tag: 'Economy', tagColor: '#C54A12', title: 'Fed Signals Rate Hold as Inflation Data Comes In Below Forecast', readTime: '5 min', source: 'Bloomberg', time: '3 hr ago', featured: false },
      { id: 6, tag: 'Climate', tagColor: '#15803D', title: 'California Megadrought Officially Ends After Record Snowpack Season', readTime: '6 min', source: 'LA Times', time: '4 hr ago', featured: false },
    ],
    bedtime: [
      { id: 7, tag: 'Health', tagColor: '#DC2626', title: 'New Study Links Ultra-Processed Foods to 32% Higher Dementia Risk', readTime: '9 min', source: 'The Atlantic', time: '5 hr ago', featured: true },
      { id: 8, tag: 'Science', tagColor: '#1A5FA3', title: 'James Webb Telescope Captures Earliest Known Galaxy, Rewrites Formation Models', readTime: '12 min', source: 'Nature', time: '6 hr ago', featured: false },
    ],
    deepdive: [
      { id: 9, tag: 'Investigation', tagColor: '#C54A12', title: 'Inside the Shadow Economy of Short-Term Rentals Reshaping American Cities', readTime: '22 min', source: 'ProPublica', time: '1 day ago', featured: true },
      { id: 10, tag: 'Analysis', tagColor: '#1A5FA3', title: "The Real Cost of America's Aging Power Grid: A State-by-State Breakdown", readTime: '18 min', source: 'Wired', time: '2 days ago', featured: false },
    ],
  };

  const articleDetail = {
    id: 1,
    tag: 'Transit',
    tagColor: '#1A5FA3',
    title: 'BART Delays Hit Morning Commuters as East Bay Signal Failures Continue',
    source: 'SF Chronicle',
    author: 'Megan Torres',
    time: '8 min ago',
    readTime: '4 min',
    layers: {
      summary: {
        label: 'Summary',
        time: '1 min',
        content: 'BART is experiencing system-wide delays of 15–25 minutes due to ongoing signal equipment failures in the East Bay corridor. The issue began Monday and engineers have not yet identified a resolution timeline. Commuters on the Richmond–Fremont and Dublin–Pleasanton lines are most affected.',
      },
      explainer: {
        label: 'Explainer',
        time: '3 min',
        content: "BART's signaling system relies on 1970s-era hardware that was partially upgraded in 2018 but still contains legacy components. When a signal unit fails, the system defaults to manual operation — slowing trains to a crawl through affected zones. This isn't the first time: similar failures in 2022 cost commuters an estimated $4.2M in lost productivity. The agency's 10-year capital plan allocates $890M to replace the legacy signal infrastructure, but funding gaps have delayed implementation.",
      },
      analysis: {
        label: 'Full Analysis',
        time: '8 min',
        content: "Monday's BART signal failures represent more than an inconvenience — they expose the chronic underinvestment in public transit that has defined Bay Area infrastructure policy for decades. The East Bay corridor handles 42,000 daily riders and serves as a critical connection between Alameda County's working-class communities and San Francisco's job centers.\n\nThe timing is significant. Governor Newsom's office is currently reviewing a $12B transit reform package that would restructure funding across Caltrain, Muni, and BART under a regional authority. Critics argue consolidated governance — long resisted by BART's board — is the only path to system-wide modernization.\n\nFiscally, the signal failures compound BART's existential crisis. Ridership remains 18% below pre-pandemic levels, and the agency faces a $300M structural deficit by 2026. Without federal intervention or a regional ballot measure, deferred maintenance will continue to accelerate — a feedback loop of declining service quality driving further ridership loss.",
      },
    },
    localImpact: [
      { icon: 'Clock', label: 'Your Commute', value: '+22 min delay on Richmond line today', color: '#DC2626' },
      { icon: 'DollarSign', label: 'Your Wallet', value: 'Parking rates near 24th St up 15% on delay days', color: '#C54A12' },
      { icon: 'MapPin', label: 'Your District', value: 'Oakland District 2 transit needs up for vote Mar 28', color: '#1A5FA3' },
      { icon: 'Briefcase', label: 'Your Industry', value: 'Tech employers extending WFH allowances this week', color: '#15803D' },
    ],
  };

  const compareData = {
    title: 'Senate Infrastructure Package Passes 67–33',
    sources: [
      {
        name: 'Washington Post',
        lean: 'Center-Left',
        leanColor: '#1A5FA3',
        headline: 'Historic $180B Deal Marks Rare Bipartisan Win for Transportation',
        summary: 'The bill represents the largest federal investment in public transit in a generation, with $42B flowing to urban rail systems. Key Democrats called it a generational achievement for working families.',
        tone: 'Positive',
        toneColor: '#15803D',
        emphases: ['Transit funding', 'Urban investment', 'Democratic priorities'],
        wordCount: 1240,
      },
      {
        name: 'Wall Street Journal',
        lean: 'Center-Right',
        leanColor: '#DC2626',
        headline: 'Infrastructure Bill Passes But Fiscal Hawks Warn of $180B Debt Burden',
        summary: 'While the bill secured bipartisan support, economists warn of long-term fiscal implications. The package adds to federal obligations without new revenue offsets, raising questions about bond market impact.',
        tone: 'Skeptical',
        toneColor: '#C54A12',
        emphases: ['Fiscal concerns', 'Deficit impact', 'Bond markets'],
        wordCount: 1180,
      },
      {
        name: 'The Guardian',
        lean: 'Left',
        leanColor: '#7C3AED',
        headline: 'Infrastructure Bill Falls Short on Climate Despite Transit Wins',
        summary: 'Climate advocates say the package, while improving transit access, missed a critical opportunity to mandate emissions reductions and fund a just energy transition for front-line communities.',
        tone: 'Critical',
        toneColor: '#7C3AED',
        emphases: ['Climate gaps', 'Environmental justice', 'Missed mandate'],
        wordCount: 1090,
      },
    ],
  };

  const collections = [
    { id: 'transit', name: 'Transit & City', color: '#1A5FA3', count: 7, updated: '2 hr ago', articles: ['BART Delays Hit Morning Commuters', 'City Council Votes on BRT Expansion', 'Cyclist Infrastructure Plan Released', 'Muni Fare Hike Approved for Fall'] },
    { id: 'housing', name: 'Housing Market', color: '#15803D', count: 12, updated: '1 day ago', articles: ['Bay Area Median Home Price Drops', 'New Zoning Laws Target Single-Family Exclusion', 'Tenant Protections Expanded in Oakland', 'Mortgage Rates Hit 3-Year Low'] },
    { id: 'tech', name: 'Tech & AI', color: '#7C3AED', count: 9, updated: '3 hr ago', articles: ['OpenAI Medical Exam Results', 'EU AI Act Takes Effect Next Month', 'Google DeepMind Biology Model Announced'] },
    { id: 'health', name: 'Health & Wellness', color: '#DC2626', count: 5, updated: '4 hr ago', articles: ['Ultra-Processed Foods Study', 'New CDC Sleep Guidelines', 'Flu Season Peak Approaches'] },
  ];

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const press = (id) => { setPressedItem(id); setTimeout(() => setPressedItem(null), 150); };

  // --- Sub-components ---

  const StatusBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 0', height: 44 }}>
      <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 15, color: t.text }}>{currentTime}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 15, color: t.text, strokeWidth: 2 })}
        {React.createElement(window.lucide.Signal, { size: 15, color: t.text, strokeWidth: 2 })}
        {React.createElement(window.lucide.Battery, { size: 18, color: t.text, strokeWidth: 2 })}
      </div>
    </div>
  );

  const DynamicIsland = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <div style={{ width: 120, height: 34, background: t.island, borderRadius: 20 }} />
    </div>
  );

  const NavBar = () => {
    const tabs = [
      { id: 'home', icon: 'Newspaper', label: 'Feed' },
      { id: 'compare', icon: 'Columns2', label: 'Compare' },
      { id: 'saved', icon: 'Bookmark', label: 'Saved' },
      { id: 'settings', icon: 'Settings', label: 'Settings' },
    ];
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: t.nav, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'flex-start', paddingTop: 10, zIndex: 100 }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id && !selectedArticle;
          const IconEl = window.lucide[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => { setSelectedArticle(null); setActiveTab(tab.id); press(tab.id); }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', transform: pressedItem === tab.id ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.1s' }}
            >
              <div style={{ width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: active ? t.primaryLight : 'transparent', transition: 'background 0.2s' }}>
                {React.createElement(IconEl, { size: 20, color: active ? t.primary : t.textMuted, strokeWidth: active ? 2.5 : 1.8 })}
              </div>
              <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: active ? 600 : 400, color: active ? t.primary : t.textMuted, transition: 'color 0.2s' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // --- Screens ---

  const HomeScreen = () => {
    const currentArticles = articleData[activeMode] || [];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 500, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Sunday, March 22</div>
            <div style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>PaperPulse</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => {}} style={{ width: 38, height: 38, borderRadius: 12, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.Search, { size: 18, color: t.textSec, strokeWidth: 2 })}
            </button>
            <button style={{ width: 38, height: 38, borderRadius: 12, background: t.primaryLight, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {React.createElement(window.lucide.Bell, { size: 18, color: t.primary, strokeWidth: 2 })}
              <div style={{ width: 8, height: 8, background: t.primary, borderRadius: '50%', position: 'absolute', top: 8, right: 8, border: `2px solid ${t.primaryLight}` }} />
            </button>
          </div>
        </div>

        {/* Moment Mode Selector */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {modes.map(mode => {
              const active = activeMode === mode.id;
              const IconEl = window.lucide[mode.icon];
              return (
                <button
                  key={mode.id}
                  onClick={() => { setActiveMode(mode.id); press('mode_' + mode.id); }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 14px',
                    borderRadius: 14, border: `1.5px solid ${active ? t.primary : t.border}`,
                    background: active ? t.primary : t.surface, cursor: 'pointer', flexShrink: 0,
                    transform: pressedItem === 'mode_' + mode.id ? 'scale(0.95)' : 'scale(1)', transition: 'all 0.15s',
                    minWidth: 90,
                  }}
                >
                  {React.createElement(IconEl, { size: 16, color: active ? '#FFFFFF' : t.textSec, strokeWidth: 2 })}
                  <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: active ? '#FFFFFF' : t.text, marginTop: 6 }}>{mode.label}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 10, color: active ? 'rgba(255,255,255,0.7)' : t.textMuted, marginTop: 1 }}>{mode.time}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: t.text }}>
            {modes.find(m => m.id === activeMode)?.label} Briefing
          </div>
          <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted }}>{currentArticles.length} stories</div>
        </div>

        {/* Featured Article */}
        {currentArticles[0] && (
          <div style={{ padding: '0 20px 14px' }}>
            <div
              onClick={() => { setSelectedArticle(currentArticles[0]); setArticleLayer('summary'); press('feat'); }}
              style={{ borderRadius: 18, overflow: 'hidden', background: t.card, border: `1.5px solid ${t.cardBorder}`, cursor: 'pointer', transform: pressedItem === 'feat' ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.15s' }}
            >
              <div style={{ background: `linear-gradient(135deg, ${currentArticles[0].tagColor}18, ${currentArticles[0].tagColor}05)`, padding: '20px 20px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ padding: '3px 10px', borderRadius: 20, background: currentArticles[0].tagColor, fontFamily: 'Sora', fontSize: 10, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{currentArticles[0].tag}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>{currentArticles[0].time}</div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>
                    {React.createElement(window.lucide.Clock, { size: 12, color: t.textMuted, strokeWidth: 2 })}
                    {currentArticles[0].readTime}
                  </div>
                </div>
                <div style={{ fontFamily: 'Sora', fontSize: 17, fontWeight: 700, color: t.text, lineHeight: 1.4, letterSpacing: '-0.01em', marginBottom: 12 }}>{currentArticles[0].title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textSec, fontWeight: 500 }}>{currentArticles[0].source}</div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleSave(currentArticles[0].id); }}
                    style={{ width: 32, height: 32, borderRadius: 10, background: savedIds.includes(currentArticles[0].id) ? t.primaryLight : t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {React.createElement(window.lucide.Bookmark, { size: 15, color: savedIds.includes(currentArticles[0].id) ? t.primary : t.textMuted, strokeWidth: 2, fill: savedIds.includes(currentArticles[0].id) ? t.primary : 'none' })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article List */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {currentArticles.slice(1).map((article, i) => (
            <div
              key={article.id}
              onClick={() => { setSelectedArticle(article); setArticleLayer('summary'); press('art_' + article.id); }}
              style={{ background: t.card, borderRadius: 16, padding: '14px 16px', border: `1.5px solid ${t.cardBorder}`, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12, transform: pressedItem === 'art_' + article.id ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ padding: '2px 8px', borderRadius: 20, background: article.tagColor + '18', fontFamily: 'Sora', fontSize: 10, fontWeight: 700, color: article.tagColor, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{article.tag}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 10, color: t.textMuted }}>{article.time}</div>
                </div>
                <div style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 600, color: t.text, lineHeight: 1.45, letterSpacing: '-0.01em' }}>{article.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textSec, fontWeight: 500 }}>{article.source}</div>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>
                    {React.createElement(window.lucide.Clock, { size: 11, color: t.textMuted, strokeWidth: 2 })}
                    {article.readTime}
                  </div>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); toggleSave(article.id); }}
                style={{ width: 30, height: 30, borderRadius: 9, background: savedIds.includes(article.id) ? t.primaryLight : t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                {React.createElement(window.lucide.Bookmark, { size: 14, color: savedIds.includes(article.id) ? t.primary : t.textMuted, strokeWidth: 2, fill: savedIds.includes(article.id) ? t.primary : 'none' })}
              </button>
            </div>
          ))}
        </div>

        {/* Local Impact Banner */}
        <div style={{ margin: '16px 20px 0', padding: '14px 16px', borderRadius: 16, background: t.accentLight, border: `1.5px solid ${t.accent}22` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {React.createElement(window.lucide.MapPin, { size: 14, color: t.accent, strokeWidth: 2 })}
            <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: t.accent }}>Local Impact — San Francisco</div>
          </div>
          <div style={{ fontFamily: 'Sora', fontSize: 13, color: t.text, lineHeight: 1.5 }}>2 stories in today's briefing affect your commute and district budget.</div>
          <button onClick={() => setSelectedArticle(articleDetail)} style={{ marginTop: 8, fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: t.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>See impact cards →</button>
        </div>
      </div>
    );
  };

  const ArticleScreen = () => {
    if (!selectedArticle) return null;
    const detail = articleDetail;
    const layer = detail.layers[articleLayer];
    return (
      <div style={{ position: 'absolute', inset: 0, background: t.bg, zIndex: 50, display: 'flex', flexDirection: 'column', borderRadius: 48 }}>
        {/* Top bar */}
        <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSelectedArticle(null)} style={{ width: 36, height: 36, borderRadius: 12, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.text, strokeWidth: 2 })}
          </button>
          <div style={{ flex: 1, fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: t.textSec, textAlign: 'center' }}>Article</div>
          <button onClick={() => toggleSave(detail.id)} style={{ width: 36, height: 36, borderRadius: 12, background: savedIds.includes(detail.id) ? t.primaryLight : t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.createElement(window.lucide.Bookmark, { size: 18, color: savedIds.includes(detail.id) ? t.primary : t.textSec, strokeWidth: 2, fill: savedIds.includes(detail.id) ? t.primary : 'none' })}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
          {/* Article header */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ padding: '3px 10px', borderRadius: 20, background: detail.tagColor, fontFamily: 'Sora', fontSize: 10, fontWeight: 700, color: '#FFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{detail.tag}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>{detail.time}</div>
            </div>
            <div style={{ fontFamily: 'Sora', fontSize: 20, fontWeight: 800, color: t.text, lineHeight: 1.35, letterSpacing: '-0.02em', marginBottom: 12 }}>{detail.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: t.textSec }}>{detail.source}</div>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: t.textMuted }} />
              <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted }}>{detail.author}</div>
            </div>
          </div>

          {/* Story Layer Tabs */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Story Layers</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(detail.layers).map(([key, val]) => {
                const active = articleLayer === key;
                return (
                  <button
                    key={key}
                    onClick={() => setArticleLayer(key)}
                    style={{ flex: 1, padding: '10px 8px', borderRadius: 12, background: active ? t.primary : t.surface, border: `1.5px solid ${active ? t.primary : t.border}`, cursor: 'pointer' }}
                  >
                    <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: active ? '#FFF' : t.text }}>{val.label}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 10, color: active ? 'rgba(255,255,255,0.7)' : t.textMuted, marginTop: 2 }}>{val.time}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article content */}
          <div style={{ margin: '16px 20px 0', padding: '16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
            <div style={{ fontFamily: 'Sora', fontSize: 14, color: t.text, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{layer.content}</div>
          </div>

          {/* Local Impact Cards */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {React.createElement(window.lucide.MapPin, { size: 14, color: t.primary, strokeWidth: 2 })}
              <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 700, color: t.text }}>Local Impact Cards</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {detail.localImpact.map((impact, i) => {
                const IconEl = window.lucide[impact.icon];
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: impact.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.createElement(IconEl, { size: 18, color: impact.color, strokeWidth: 2 })}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, color: impact.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{impact.label}</div>
                      <div style={{ fontFamily: 'Sora', fontSize: 13, color: t.text, marginTop: 1, lineHeight: 1.4 }}>{impact.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cross-source hint */}
          <div style={{ margin: '16px 20px 0', padding: '14px 16px', borderRadius: 16, background: t.purpleLight, border: `1.5px solid ${t.purple}22` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: t.purple, marginBottom: 2 }}>3 Sources Cover This Story</div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textSec }}>WaPo, WSJ, Guardian — different angles</div>
              </div>
              <button
                onClick={() => { setSelectedArticle(null); setActiveTab('compare'); }}
                style={{ padding: '8px 14px', borderRadius: 10, background: t.purple, border: 'none', cursor: 'pointer', fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: '#FFF' }}
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompareScreen = () => {
    const src = compareData.sources[compareIdx];
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Cross-Source Compare</div>
          <div style={{ fontFamily: 'Sora', fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Compare Coverage</div>
        </div>

        {/* Story headline */}
        <div style={{ margin: '0 20px 16px', padding: '14px 16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
          <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted, marginBottom: 6 }}>Comparing coverage of:</div>
          <div style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{compareData.title}</div>
        </div>

        {/* Source tabs */}
        <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
          {compareData.sources.map((s, i) => (
            <button
              key={i}
              onClick={() => setCompareIdx(i)}
              style={{ flex: 1, padding: '8px 6px', borderRadius: 12, background: compareIdx === i ? s.leanColor : t.surface, border: `1.5px solid ${compareIdx === i ? s.leanColor : t.border}`, cursor: 'pointer' }}
            >
              <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: compareIdx === i ? '#FFF' : t.text, lineHeight: 1.3 }}>{s.name}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 9, color: compareIdx === i ? 'rgba(255,255,255,0.7)' : t.textMuted, marginTop: 2 }}>{s.lean}</div>
            </button>
          ))}
        </div>

        {/* Source detail */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: src.leanColor }} />
              <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: src.leanColor }}>{src.lean}</div>
              <div style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 20, background: src.toneColor + '18', fontFamily: 'Sora', fontSize: 10, fontWeight: 600, color: src.toneColor }}>{src.tone}</div>
            </div>
            <div style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 10 }}>{src.headline}</div>
            <div style={{ fontFamily: 'Sora', fontSize: 13, color: t.textSec, lineHeight: 1.6 }}>{src.summary}</div>
          </div>

          {/* Emphases */}
          <div style={{ padding: '14px 16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>This Source Emphasizes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {src.emphases.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: src.leanColor, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'Sora', fontSize: 13, color: t.text }}>{e}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Word count bar */}
          <div style={{ padding: '14px 16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Coverage Depth</div>
            {compareData.sources.map((s, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: compareIdx === i ? t.text : t.textSec }}>{s.name}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>{s.wordCount.toLocaleString()} words</div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: t.surface2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(s.wordCount / 1400) * 100}%`, borderRadius: 3, background: compareIdx === i ? s.leanColor : t.border, transition: 'width 0.4s' }} />
                </div>
              </div>
            ))}
          </div>

          {/* All-source overview */}
          <div style={{ padding: '14px 16px', borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}`, marginBottom: 4 }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Across All Sources</div>
            {compareData.sources.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < compareData.sources.length - 1 ? `1px solid ${t.divider}` : 'none' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.leanColor, flexShrink: 0 }} />
                <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: t.text, width: 90 }}>{s.name}</div>
                <div style={{ padding: '2px 8px', borderRadius: 20, background: s.toneColor + '15', fontFamily: 'Sora', fontSize: 10, color: s.toneColor, fontWeight: 600 }}>{s.tone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SavedScreen = () => {
    if (activeCollection) {
      const col = collections.find(c => c.id === activeCollection);
      return (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
          <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setActiveCollection(null)} style={{ width: 36, height: 36, borderRadius: 12, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 20, color: t.text, strokeWidth: 2 })}
            </button>
            <div>
              <div style={{ fontFamily: 'Sora', fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: '-0.01em' }}>{col.name}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>{col.count} articles saved</div>
            </div>
          </div>
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {col.articles.map((a, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 16, background: t.card, border: `1.5px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: col.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.FileText, { size: 18, color: col.color, strokeWidth: 1.8 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4 }}>{a}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted, marginTop: 3 }}>Saved · {col.name}</div>
                </div>
                {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted, strokeWidth: 2 })}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Your Library</div>
          <div style={{ fontFamily: 'Sora', fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>Saved Collections</div>
        </div>

        {/* Stats row */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
          {[{ label: 'Saved', val: savedIds.length + 30 }, { label: 'Collections', val: collections.length }, { label: 'This Week', val: 8 }].map((stat, i) => (
            <div key={i} style={{ flex: 1, padding: '12px', borderRadius: 14, background: t.surface, border: `1.5px solid ${t.cardBorder}`, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Sora', fontSize: 20, fontWeight: 800, color: t.primary }}>{stat.val}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 10, color: t.textMuted, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Collections grid */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {collections.map(col => (
            <div
              key={col.id}
              onClick={() => { setActiveCollection(col.id); press('col_' + col.id); }}
              style={{ padding: '16px', borderRadius: 18, background: t.card, border: `1.5px solid ${t.cardBorder}`, cursor: 'pointer', transform: pressedItem === 'col_' + col.id ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: col.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {React.createElement(window.lucide.Layers, { size: 22, color: col.color, strokeWidth: 1.8 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 15, fontWeight: 700, color: t.text }}>{col.name}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted, marginTop: 2 }}>Updated {col.updated}</div>
                </div>
                <div style={{ padding: '4px 10px', borderRadius: 20, background: col.color + '15', fontFamily: 'Sora', fontSize: 12, fontWeight: 700, color: col.color }}>{col.count}</div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {col.articles.slice(0, 2).map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: col.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textSec, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a}</div>
                  </div>
                ))}
                {col.articles.length > 2 && (
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted, marginLeft: 10 }}>+{col.articles.length - 2} more</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add collection button */}
        <div style={{ margin: '16px 20px 0' }}>
          <button style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'none', border: `2px dashed ${t.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {React.createElement(window.lucide.Plus, { size: 16, color: t.textMuted, strokeWidth: 2 })}
            <span style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: t.textMuted }}>New Collection</span>
          </button>
        </div>
      </div>
    );
  };

  const SettingsScreen = () => {
    const settingsGroups = [
      {
        title: 'Personalization',
        items: [
          { icon: 'MapPin', label: 'Location', value: 'San Francisco, CA' },
          { icon: 'Briefcase', label: 'Industry', value: 'Technology' },
          { icon: 'Clock', label: 'Default Mode', value: 'Commute' },
        ],
      },
      {
        title: 'Sources',
        items: [
          { icon: 'Newspaper', label: 'Followed Publications', value: '8 sources' },
          { icon: 'Tag', label: 'Topic Interests', value: '12 topics' },
          { icon: 'BarChart2', label: 'Bias Preferences', value: 'Show all' },
        ],
      },
      {
        title: 'Notifications',
        items: [
          { icon: 'Bell', label: 'Breaking News', value: 'On' },
          { icon: 'Zap', label: 'Local Impact Alerts', value: 'On' },
          { icon: 'Calendar', label: 'Daily Digest', value: '7:30 AM' },
        ],
      },
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {/* Profile header */}
        <div style={{ padding: '16px 20px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 18, background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 800, color: '#FFF' }}>S</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Sora', fontSize: 17, fontWeight: 700, color: t.text }}>Steve</div>
            <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted, marginTop: 2 }}>Premium · 3 months</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ padding: '6px 14px', borderRadius: 20, background: t.primaryLight, fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: t.primary }}>Pro</div>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{ margin: '0 20px 20px', padding: '16px', borderRadius: 18, background: t.surface, border: `1.5px solid ${t.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: isDark ? '#2A2420' : '#FFF8E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 20, color: isDark ? '#A78BFA' : '#F59E0B', strokeWidth: 2 })}
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontSize: 14, fontWeight: 600, color: t.text }}>Appearance</div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted }}>{isDark ? 'Dark mode' : 'Light mode'}</div>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? t.primary : t.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s' }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FFF', position: 'absolute', top: 3, left: isDark ? 25 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
            </button>
          </div>
        </div>

        {/* Settings groups */}
        {settingsGroups.map((group, gi) => (
          <div key={gi} style={{ padding: '0 20px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{group.title}</div>
            <div style={{ borderRadius: 16, background: t.surface, border: `1.5px solid ${t.cardBorder}`, overflow: 'hidden' }}>
              {group.items.map((item, i) => {
                const IconEl = window.lucide[item.icon];
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < group.items.length - 1 ? `1px solid ${t.divider}` : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: t.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {React.createElement(IconEl, { size: 16, color: t.textSec, strokeWidth: 2 })}
                    </div>
                    <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: t.text, flex: 1 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Sora', fontSize: 12, color: t.textMuted }}>{item.value}</div>
                    {React.createElement(window.lucide.ChevronRight, { size: 15, color: t.textMuted, strokeWidth: 2 })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* About */}
        <div style={{ padding: '0 20px 4px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 800, color: t.primary, marginBottom: 2 }}>PaperPulse</div>
          <div style={{ fontFamily: 'Sora', fontSize: 11, color: t.textMuted }}>v1.0.0 · News tuned to your real-world moment.</div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'compare': return <CompareScreen />;
      case 'saved': return <SavedScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#E5E0D8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Sora, sans-serif' }}>
      <style>{fontStyle}</style>
      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 12px #2A2520, 0 0 0 14px #3A3530', transition: 'background 0.3s' }}>

        {/* Status bar */}
        <StatusBar />
        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
          {selectedArticle && <ArticleScreen />}
        </div>

        {/* Nav bar */}
        <NavBar />
      </div>
    </div>
  );
}
