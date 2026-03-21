const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FF',
    card: '#FFFFFF',
    primary: '#6C47FF',
    primaryLight: '#EDE9FF',
    primaryDark: '#4B2FD4',
    secondary: '#10B981',
    accent2: '#F59E0B',
    text: '#1A1235',
    textSec: '#6B6480',
    textMuted: '#9F98B8',
    border: '#E4E0F5',
    impactHigh: '#EF4444',
    impactMed: '#F59E0B',
    impactLow: '#10B981',
    navBg: '#FFFFFF',
    tag: '#EDE9FF',
    tagText: '#6C47FF',
    inputBg: '#F0EDF9',
    shimmer: '#EDE9FF',
    cardShadow: '0 2px 12px rgba(108,71,255,0.08)',
    navShadow: '0 -1px 0 #E4E0F5',
  },
  dark: {
    bg: '#0D0B18',
    surface: '#1A1730',
    surfaceAlt: '#231E40',
    card: '#1A1730',
    primary: '#8B69FF',
    primaryLight: '#2A2050',
    primaryDark: '#6C47FF',
    secondary: '#34D399',
    accent2: '#FCD34D',
    text: '#EEE9FF',
    textSec: '#A89DC8',
    textMuted: '#6B5F8A',
    border: '#2A2450',
    impactHigh: '#F87171',
    impactMed: '#FCD34D',
    impactLow: '#34D399',
    navBg: '#1A1730',
    tag: '#2A2050',
    tagText: '#8B69FF',
    inputBg: '#231E40',
    shimmer: '#231E40',
    cardShadow: '0 2px 12px rgba(0,0,0,0.3)',
    navShadow: '0 -1px 0 #2A2450',
  }
};

const feedStories = [
  {
    id: 1,
    source: 'Wall Street Journal',
    category: 'Money',
    headline: 'Fed Signals No Rate Cuts Before Summer, Markets Adjust Expectations',
    twoLine: 'Borrowing costs stay high through Q2. Mortgage refinancing window stays closed for now.',
    impact: 92,
    impactLevel: 'high',
    contexts: ['Home Buying', 'Investing'],
    time: '2h ago',
    readTime: '4 min',
    saved: false,
    action: 'Check your mortgage pre-approval expiry date',
    expanded: false,
    keyFacts: [
      'Fed funds rate held at 5.25–5.50% for 6th consecutive meeting',
      'Core PCE still at 2.8%, above 2% target',
      'Rate cut probability for June dropped from 60% to 28%',
    ],
    excerpt: '"The committee does not expect it will be appropriate to reduce the target range until it has gained greater confidence that inflation is moving sustainably toward 2 percent." — Fed Chair Powell'
  },
  {
    id: 2,
    source: 'The Atlantic',
    category: 'Career',
    headline: 'Why Freelancers Are Winning the Hybrid Work Battle (And What It Costs)',
    twoLine: 'Independent workers earn 23% more per hour but absorb all benefit costs. Tax deadline planning matters more than ever.',
    impact: 78,
    impactLevel: 'med',
    contexts: ['Career', 'Money'],
    time: '4h ago',
    readTime: '6 min',
    saved: true,
    action: 'Set Q1 estimated tax reminder for April 15',
    expanded: false,
    keyFacts: [
      'Freelance workforce grew 14% YoY to 64M Americans',
      'Average hourly premium over W-2: $12.40',
      'Health insurance costs average $7,200/yr unsubsidized',
    ],
    excerpt: '"The 1099 economy has matured past its gig-work reputation. These are senior professionals choosing independence, not workers who couldn\'t find jobs." — Sarah Chen, Brookings'
  },
  {
    id: 3,
    source: 'NPR Education',
    category: 'Family',
    headline: 'New Federal School Lunch Rules Affect 29M Students Starting Fall 2026',
    twoLine: 'Sodium limits drop 30%, whole grain requirements expand. Check if your district qualifies for transition funding.',
    impact: 85,
    impactLevel: 'high',
    contexts: ['Family', 'School District'],
    time: '6h ago',
    readTime: '3 min',
    saved: false,
    action: 'Look up your school district compliance status',
    expanded: false,
    keyFacts: [
      'Rules apply to 99,000+ schools receiving federal meal funding',
      '$50M in transition grants available through USDA',
      'Low-sodium options required by August 2026',
    ],
    excerpt: '"Districts that start planning now will have the most flexibility in menu design. Those that wait may face limited vendor options." — USDA Deputy Secretary'
  },
  {
    id: 4,
    source: 'Bloomberg',
    category: 'Commuting',
    headline: 'Transit Strike Threat Looms Over 14 Major US Cities This Spring',
    twoLine: 'Negotiations stall in NYC, Chicago, LA. Backup commute planning window opens now.',
    impact: 70,
    impactLevel: 'med',
    contexts: ['Commuting'],
    time: '8h ago',
    readTime: '3 min',
    saved: false,
    action: 'Map an alternate route to work',
    expanded: false,
    keyFacts: [
      'Union contracts expire April 30 in 14 metro areas',
      'Last major transit strike in 2005 lasted 3 days',
      'Rideshare surge pricing expected to hit 3–5x',
    ],
    excerpt: '"We\'re closer to a strike than we\'ve been in 20 years. Management needs to understand that workers have options now." — TWU Local 100 President'
  },
];

const lensCategories = [
  { id: 'commuting', label: 'Commuting', icon: 'Train', count: 3, color: '#6C47FF', stories: ['Transit strike risk in your city', 'Gas price forecast Q2', 'Remote work policy rollbacks'] },
  { id: 'family', label: 'Family', icon: 'Heart', count: 7, color: '#EF4444', stories: ['School lunch nutrition rules', 'Child tax credit update', 'Summer camp cost surge', 'Daycare waitlist crisis'] },
  { id: 'career', label: 'Career', icon: 'Briefcase', count: 5, color: '#10B981', stories: ['Freelance tax deadline guide', 'AI job displacement report', 'LinkedIn algorithm changes'] },
  { id: 'money', label: 'Money', icon: 'DollarSign', count: 9, color: '#F59E0B', stories: ['Fed rate decision impact', 'Credit card APR hitting 23%', 'Grocery price index March', 'ETF flows this week'] },
  { id: 'home', label: 'Home', icon: 'Home', count: 4, color: '#8B5CF6', stories: ['Mortgage rate outlook', 'Zoning law changes', 'HOA rule disputes rising'] },
  { id: 'health', label: 'Health', icon: 'Activity', count: 6, color: '#06B6D4', stories: ['Insurance deductible changes', 'Spring allergy forecast', 'GLP-1 drug coverage update'] },
];

const boards = [
  { id: 1, name: 'Home Buying', icon: 'Home', count: 12, updated: '2h ago', color: '#8B5CF6', tags: ['Mortgage', 'Rates', 'Zoning'], preview: 'Fed holds rates — your pre-approval window narrows' },
  { id: 2, name: 'School District', icon: 'BookOpen', count: 8, updated: '5h ago', color: '#EF4444', tags: ['Policy', 'Funding', 'Curriculum'], preview: 'New lunch rules affect your district starting fall' },
  { id: 3, name: 'Market Watch', icon: 'TrendingUp', count: 15, updated: '1h ago', color: '#F59E0B', tags: ['Stocks', 'ETFs', 'Fed'], preview: 'Markets reprice rate cut odds for 2026' },
  { id: 4, name: 'Career Moves', icon: 'Briefcase', count: 6, updated: '1d ago', color: '#10B981', tags: ['Freelance', 'AI', 'Hiring'], preview: 'Freelancers +23% hourly vs W-2, but costs rising' },
];

const actions = [
  { id: 1, type: 'reminder', label: 'Check mortgage pre-approval expiry', source: 'Fed Rate Story', done: false, icon: 'Bell' },
  { id: 2, type: 'checklist', label: 'Set Q1 estimated tax reminder Apr 15', source: 'Freelance Article', done: true, icon: 'CheckSquare' },
  { id: 3, type: 'question', label: 'Does your district get USDA transition funding?', source: 'School Lunch Rules', done: false, icon: 'HelpCircle' },
  { id: 4, type: 'reminder', label: 'Map alternate commute route before April 30', source: 'Transit Strike Risk', done: false, icon: 'Map' },
];

function ImpactBar({ score, level, t }) {
  const color = level === 'high' ? t.impactHigh : level === 'med' ? t.impactMed : t.impactLow;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: t.border }}>
        <div style={{ width: `${score}%`, height: '100%', borderRadius: 2, background: color, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 28, fontFamily: 'Plus Jakarta Sans' }}>{score}</span>
    </div>
  );
}

function Tag({ label, t }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color: t.tagText, background: t.tag, padding: '2px 8px', borderRadius: 20, fontFamily: 'Plus Jakarta Sans', letterSpacing: 0.2 }}>
      {label}
    </span>
  );
}

function StoryCard({ story, t, onExpand, onSave }) {
  const [pressed, setPressed] = useState(false);
  const [localSaved, setLocalSaved] = useState(story.saved);
  const [expanded, setExpanded] = useState(false);
  const BookmarkIcon = window.lucide.Bookmark;
  const ChevronIcon = expanded ? window.lucide.ChevronUp : window.lucide.ChevronDown;
  const ZapIcon = window.lucide.Zap;

  return (
    <div
      style={{
        background: t.card,
        borderRadius: 16,
        padding: '14px 16px',
        boxShadow: t.cardShadow,
        border: `1px solid ${t.border}`,
        marginBottom: 12,
        transition: 'transform 0.15s ease',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: t.primary, letterSpacing: 0.5, fontFamily: 'Plus Jakarta Sans', textTransform: 'uppercase' }}>{story.source}</span>
          <span style={{ fontSize: 10, color: t.textMuted }}>•</span>
          <span style={{ fontSize: 10, color: t.textMuted }}>{story.time}</span>
        </div>
        <button
          onClick={() => setLocalSaved(!localSaved)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <BookmarkIcon size={16} color={localSaved ? t.primary : t.textMuted} fill={localSaved ? t.primary : 'none'} />
        </button>
      </div>

      <p style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.4, margin: '0 0 8px', fontFamily: 'Plus Jakarta Sans' }}>
        {story.headline}
      </p>
      <p style={{ fontSize: 13, color: t.textSec, lineHeight: 1.5, margin: '0 0 10px', fontFamily: 'Plus Jakarta Sans' }}>
        {story.twoLine}
      </p>

      <ImpactBar score={story.impact} level={story.impactLevel} t={t} />

      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {story.contexts.map(c => <Tag key={c} label={c} t={t} />)}
        <span style={{ fontSize: 10, color: t.textMuted, marginLeft: 'auto', alignSelf: 'center' }}>{story.readTime}</span>
      </div>

      {/* Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '8px 10px', background: t.primaryLight, borderRadius: 10 }}>
        <ZapIcon size={13} color={t.primary} />
        <span style={{ fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: 'Plus Jakarta Sans', flex: 1 }}>{story.action}</span>
      </div>

      {/* Expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', marginTop: 10, padding: 0 }}
      >
        <span style={{ fontSize: 12, color: t.primary, fontWeight: 600, fontFamily: 'Plus Jakarta Sans' }}>
          {expanded ? 'Less detail' : 'More depth'}
        </span>
        <ChevronIcon size={14} color={t.primary} />
      </button>

      {expanded && (
        <div style={{ marginTop: 10, borderTop: `1px solid ${t.border}`, paddingTop: 10 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontFamily: 'Plus Jakarta Sans' }}>Key Facts</p>
          {story.keyFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <span style={{ color: t.primary, fontWeight: 700, fontSize: 12 }}>•</span>
              <span style={{ fontSize: 12, color: t.textSec, lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans' }}>{f}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: '10px 12px', background: t.inputBg, borderRadius: 10, borderLeft: `3px solid ${t.primary}` }}>
            <p style={{ fontSize: 12, color: t.textSec, fontStyle: 'italic', lineHeight: 1.6, margin: 0, fontFamily: 'Plus Jakarta Sans' }}>{story.excerpt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FeedScreen({ t }) {
  const [activeActions, setActiveActions] = useState(actions);
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  });

  const toggleAction = (id) => {
    setActiveActions(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a));
  };

  const BellIcon = window.lucide.Bell;
  const ZapIcon = window.lucide.Zap;
  const CheckSquareIcon = window.lucide.CheckSquare;
  const SquareIcon = window.lucide.Square;
  const HelpCircleIcon = window.lucide.HelpCircle;
  const MapIcon = window.lucide.MapPin;

  const actionIcons = { Bell: BellIcon, CheckSquare: CheckSquareIcon, HelpCircle: HelpCircleIcon, Map: MapIcon };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
      {/* Header */}
      <div style={{ padding: '12px 0 16px' }}>
        <p style={{ margin: 0, fontSize: 13, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{greeting}, Sarah</p>
        <h2 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>Your Daily Pulse</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: t.textSec, fontFamily: 'Plus Jakarta Sans' }}>
          <span style={{ color: t.primary, fontWeight: 700 }}>4 stories</span> matched your life context today
        </p>
      </div>

      {/* Daily Actions */}
      <div style={{ background: t.card, borderRadius: 16, padding: '14px 16px', boxShadow: t.cardShadow, border: `1px solid ${t.border}`, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <ZapIcon size={16} color={t.primary} />
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>Today's Actions</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>
            {activeActions.filter(a => a.done).length}/{activeActions.length} done
          </span>
        </div>
        {activeActions.map(action => {
          const Icon = actionIcons[action.icon] || BellIcon;
          return (
            <div key={action.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <button onClick={() => toggleAction(action.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 1 }}>
                {action.done
                  ? <CheckSquareIcon size={16} color={t.primary} />
                  : <SquareIcon size={16} color={t.textMuted} />}
              </button>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: action.done ? t.textMuted : t.text, fontFamily: 'Plus Jakarta Sans', textDecoration: action.done ? 'line-through' : 'none' }}>
                  {action.label}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>From: {action.source}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stories */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: t.textSec, fontFamily: 'Plus Jakarta Sans', textTransform: 'uppercase', letterSpacing: 0.8 }}>Impact Stories</span>
        <div style={{ flex: 1, height: 1, background: t.border }} />
      </div>
      {feedStories.map(story => (
        <StoryCard key={story.id} story={story} t={t} />
      ))}
    </div>
  );
}

function LensScreen({ t }) {
  const [activeContext, setActiveContext] = useState(null);
  const [pressed, setPressed] = useState(null);

  const iconMap = {
    Train: window.lucide.Train,
    Heart: window.lucide.Heart,
    Briefcase: window.lucide.Briefcase,
    DollarSign: window.lucide.DollarSign,
    Home: window.lucide.Home,
    Activity: window.lucide.Activity,
  };

  const ArrowLeft = window.lucide.ArrowLeft;
  const ZapIcon = window.lucide.Zap;
  const ChevronRight = window.lucide.ChevronRight;

  if (activeContext) {
    const cat = lensCategories.find(c => c.id === activeContext);
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ padding: '12px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActiveContext(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <ArrowLeft size={20} color={t.text} />
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{cat.label}</h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{cat.count} stories matched</p>
          </div>
        </div>
        {cat.stories.map((s, i) => {
          const story = feedStories[i % feedStories.length];
          return (
            <div key={i} style={{ background: t.card, borderRadius: 14, padding: '14px 16px', marginBottom: 10, boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{story.source}</span>
                <span style={{ fontSize: 10, color: t.textMuted }}>• {story.time}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.4, fontFamily: 'Plus Jakarta Sans' }}>{s}</p>
              <p style={{ margin: '0 0 8px', fontSize: 12, color: t.textSec, lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans' }}>{story.twoLine}</p>
              <ImpactBar score={story.impact - i * 5} level={story.impactLevel} t={t} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '7px 10px', background: t.primaryLight, borderRadius: 8 }}>
                <ZapIcon size={12} color={t.primary} />
                <span style={{ fontSize: 11, fontWeight: 600, color: t.primary, fontFamily: 'Plus Jakarta Sans' }}>{story.action}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ padding: '12px 0 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>Context Lens</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: t.textSec, fontFamily: 'Plus Jakarta Sans' }}>Stories mapped to your life situations</p>
      </div>

      {/* Context banner */}
      <div style={{ background: `linear-gradient(135deg, ${t.primary} 0%, #A855F7 100%)`, borderRadius: 16, padding: '16px', marginBottom: 16 }}>
        <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'Plus Jakarta Sans' }}>ACTIVE CONTEXT</p>
        <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans' }}>You're in: Morning Commute</p>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Plus Jakarta Sans' }}>3 stories are most relevant right now</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {lensCategories.map(cat => {
          const Icon = iconMap[cat.icon] || window.lucide.Circle;
          const isPressed = pressed === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => setActiveContext(cat.id)}
              onMouseDown={() => setPressed(cat.id)}
              onMouseUp={() => setPressed(null)}
              onTouchStart={() => setPressed(cat.id)}
              onTouchEnd={() => setPressed(null)}
              style={{
                background: t.card,
                borderRadius: 16,
                padding: '16px',
                cursor: 'pointer',
                boxShadow: t.cardShadow,
                border: `1px solid ${t.border}`,
                transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.15s ease',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: cat.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={20} color={cat.color} />
              </div>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{cat.label}</p>
              <p style={{ margin: 0, fontSize: 12, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>
                <span style={{ color: cat.color, fontWeight: 700 }}>{cat.count}</span> stories
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BoardsScreen({ t }) {
  const [activeBoard, setActiveBoard] = useState(null);
  const [pressed, setPressed] = useState(null);

  const iconMap = {
    Home: window.lucide.Home,
    BookOpen: window.lucide.BookOpen,
    TrendingUp: window.lucide.TrendingUp,
    Briefcase: window.lucide.Briefcase,
  };

  const PlusIcon = window.lucide.Plus;
  const ArrowLeft = window.lucide.ArrowLeft;
  const BookmarkIcon = window.lucide.Bookmark;

  if (activeBoard !== null) {
    const board = boards[activeBoard];
    const Icon = iconMap[board.icon] || window.lucide.Folder;
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        <div style={{ padding: '12px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActiveBoard(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={20} color={t.text} />
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{board.name}</h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{board.count} saved stories</p>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: board.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={18} color={board.color} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {board.tags.map(tag => <Tag key={tag} label={tag} t={t} />)}
        </div>
        {feedStories.map((story, i) => (
          <div key={i} style={{ background: t.card, borderRadius: 14, padding: '14px 16px', marginBottom: 10, boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: board.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{story.source}</span>
              <span style={{ fontSize: 10, color: t.textMuted }}>• {story.time}</span>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.4, fontFamily: 'Plus Jakarta Sans' }}>{story.headline}</p>
            <p style={{ margin: 0, fontSize: 12, color: t.textSec, lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans' }}>{story.twoLine}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ padding: '12px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>My Boards</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: t.textSec, fontFamily: 'Plus Jakarta Sans' }}>Track stories by life situation</p>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 10, background: t.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlusIcon size={18} color="#FFFFFF" />
        </button>
      </div>

      {boards.map((board, i) => {
        const Icon = iconMap[board.icon] || window.lucide.Folder;
        const isPressed = pressed === board.id;
        return (
          <div
            key={board.id}
            onClick={() => setActiveBoard(i)}
            onMouseDown={() => setPressed(board.id)}
            onMouseUp={() => setPressed(null)}
            onTouchStart={() => setPressed(board.id)}
            onTouchEnd={() => setPressed(null)}
            style={{
              background: t.card,
              borderRadius: 16,
              padding: '16px',
              marginBottom: 12,
              cursor: 'pointer',
              boxShadow: t.cardShadow,
              border: `1px solid ${t.border}`,
              transform: isPressed ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: board.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={board.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{board.name}</p>
                  <span style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{board.updated}</span>
                </div>
                <p style={{ margin: '0 0 8px', fontSize: 12, color: t.textSec, lineHeight: 1.4, fontFamily: 'Plus Jakarta Sans' }}>{board.preview}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  {board.tags.map(tag => <Tag key={tag} label={tag} t={t} />)}
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <BookmarkIcon size={11} color={t.textMuted} />
                    {board.count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SettingsScreen({ t, theme, setTheme }) {
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const BellIcon = window.lucide.Bell;
  const UserIcon = window.lucide.User;
  const ShieldIcon = window.lucide.Shield;
  const HelpCircleIcon = window.lucide.HelpCircle;
  const ChevronRight = window.lucide.ChevronRight;
  const MapPinIcon = window.lucide.MapPin;
  const RefreshCwIcon = window.lucide.RefreshCw;

  const rows = [
    { icon: UserIcon, label: 'Profile & Contexts', sub: 'Sarah — 4 active contexts' },
    { icon: MapPinIcon, label: 'Location & Interests', sub: 'New York, NY' },
    { icon: BellIcon, label: 'Notifications', sub: 'Daily brief at 7:30 AM' },
    { icon: RefreshCwIcon, label: 'Content Sources', sub: '12 publications connected' },
    { icon: ShieldIcon, label: 'Privacy & Data', sub: 'On-device processing' },
    { icon: HelpCircleIcon, label: 'Help & Feedback', sub: 'Version 2.4.1' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
      <div style={{ padding: '12px 0 16px' }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>Settings</h2>
      </div>

      {/* Profile card */}
      <div style={{ background: `linear-gradient(135deg, ${t.primary} 0%, #A855F7 100%)`, borderRadius: 20, padding: '20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={26} color="#FFFFFF" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans' }}>Sarah Mitchell</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.75)', fontFamily: 'Plus Jakarta Sans' }}>sarah@email.com • Pro Plan</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          {[['Boards', '4'], ['Saved', '31'], ['Actions', '12']].map(([label, val]) => (
            <div key={label} style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans' }}>{val}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'Plus Jakarta Sans' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{ background: t.card, borderRadius: 16, padding: '16px', marginBottom: 12, boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'Plus Jakarta Sans' }}>Appearance</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {['light', 'dark'].map(mode => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 12,
                border: `2px solid ${theme === mode ? t.primary : t.border}`,
                background: theme === mode ? t.primaryLight : t.inputBg,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
              }}
            >
              {mode === 'light' ? <SunIcon size={20} color={theme === 'light' ? t.primary : t.textMuted} /> : <MoonIcon size={20} color={theme === 'dark' ? t.primary : t.textMuted} />}
              <span style={{ fontSize: 12, fontWeight: 600, color: theme === mode ? t.primary : t.textMuted, fontFamily: 'Plus Jakarta Sans', textTransform: 'capitalize' }}>{mode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings rows */}
      <div style={{ background: t.card, borderRadius: 16, overflow: 'hidden', boxShadow: t.cardShadow, border: `1px solid ${t.border}` }}>
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={t.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{row.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: t.textMuted, fontFamily: 'Plus Jakarta Sans' }}>{row.sub}</p>
              </div>
              <ChevronRight size={16} color={t.textMuted} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('feed');

  const t = themes[theme];

  const tabs = [
    { id: 'feed', label: 'Today', icon: 'Zap' },
    { id: 'lens', label: 'Lens', icon: 'Layers' },
    { id: 'boards', label: 'Boards', icon: 'Bookmark' },
    { id: 'settings', label: 'Profile', icon: 'User' },
  ];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;

  return (
    <div style={{ minHeight: '100vh', background: '#E8E4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.3s ease',
      }}>

        {/* Status bar */}
        <div style={{ height: 44, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', flexShrink: 0, paddingTop: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: 'Plus Jakarta Sans' }}>{timeStr}</span>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000000', borderRadius: 20 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <WifiIcon size={14} color={t.text} />
            <BatteryIcon size={16} color={t.text} />
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', transition: 'opacity 0.2s ease' }}>
          {activeTab === 'feed' && <FeedScreen t={t} />}
          {activeTab === 'lens' && <LensScreen t={t} />}
          {activeTab === 'boards' && <BoardsScreen t={t} />}
          {activeTab === 'settings' && <SettingsScreen t={t} theme={theme} setTheme={setTheme} />}
        </div>

        {/* Bottom nav */}
        <div style={{
          height: 80,
          background: t.navBg,
          boxShadow: t.navShadow,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 8,
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }}>
          {tabs.map(tab => {
            const Icon = window.lucide[tab.icon];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: -1,
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    background: t.primary,
                    transition: 'background 0.3s ease',
                  }} />
                )}
                <Icon size={22} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? t.primary : t.textMuted,
                  fontFamily: 'Plus Jakarta Sans',
                  transition: 'color 0.2s ease',
                }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
