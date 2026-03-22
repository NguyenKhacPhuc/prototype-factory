function App() {
  const { useState, useEffect, useRef } = React;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const themes = {
    dark: {
      bg: '#07070F', surface: '#0E0E1A', card: '#161624', cardAlt: '#1A1A2C',
      border: '#252540', borderLight: '#1E1E36', text: '#EEEEFF', textSec: '#7878A0',
      textMuted: '#3E3E62', primary: '#F0A000', primaryGlow: 'rgba(240,160,0,0.18)',
      primaryDim: 'rgba(240,160,0,0.08)', accent: '#7C3AED', accentGlow: 'rgba(124,58,237,0.18)',
      success: '#22C55E', red: '#EF4444', tag: '#181830', tagText: '#5A5A8A',
      navBg: '#0E0E1A', inputBg: '#161624', shadow: 'rgba(0,0,0,0.6)',
    },
    light: {
      bg: '#EDE6D8', surface: '#FAF6EE', card: '#FFFFFF', cardAlt: '#FFF9F0',
      border: '#DDD4BE', borderLight: '#E8E0CC', text: '#140E04', textSec: '#6A5538',
      textMuted: '#A8906A', primary: '#B86800', primaryGlow: 'rgba(184,104,0,0.14)',
      primaryDim: 'rgba(184,104,0,0.07)', accent: '#6D28D9', accentGlow: 'rgba(109,40,217,0.14)',
      success: '#16A34A', red: '#DC2626', tag: '#F0E6D0', tagText: '#7A6040',
      navBg: '#FFFFFF', inputBg: '#F5EDE0', shadow: 'rgba(0,0,0,0.15)',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultKey, setResultKey] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [studyIdx, setStudyIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [studyAnswer, setStudyAnswer] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;
  const ff = "'Plus Jakarta Sans', sans-serif";

  const books = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear', color: '#E76F51', highlights: 47, notes: 12, year: 2018 },
    { id: 2, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', color: '#2A9D8F', highlights: 62, notes: 23, year: 2011 },
    { id: 3, title: 'The Psychology of Money', author: 'Morgan Housel', color: '#E9C46A', highlights: 31, notes: 8, year: 2020 },
    { id: 4, title: 'Deep Work', author: 'Cal Newport', color: '#4A7C9B', highlights: 28, notes: 15, year: 2016 },
    { id: 5, title: "Man's Search for Meaning", author: 'Viktor Frankl', color: '#9B72CF', highlights: 39, notes: 18, year: 1946 },
    { id: 6, title: 'The Power of Habit', author: 'Charles Duhigg', color: '#5BAA6A', highlights: 24, notes: 6, year: 2012 },
  ];

  const searchData = {
    decision: [
      { book: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', bookColor: '#2A9D8F', chapter: 'Ch. 3 · The Lazy Controller', page: 41, quote: 'Decision fatigue depletes the mental energy required for self-control. By the end of long sessions, judges were more likely to grant parole early in the day than after hours of deliberation.', tags: ['psychology', 'bias', 'willpower'], relevance: 98 },
      { book: 'Atomic Habits', author: 'James Clear', bookColor: '#E76F51', chapter: 'Ch. 6 · Motivation is Overrated', page: 93, quote: 'You do not rise to the level of your goals. You fall to the level of your systems. Decision fatigue explains why routines and environment design matter so much.', tags: ['habits', 'systems', 'routines'], relevance: 91 },
    ],
    compound: [
      { book: 'The Psychology of Money', author: 'Morgan Housel', bookColor: '#E9C46A', chapter: 'Ch. 4 · Compounding', page: 51, quote: "The counterintuitive nature of compounding leads even smart people to overlook its power. Warren Buffett's fortune is essentially the result of time and compound interest — not genius alone.", tags: ['finance', 'time', 'patience'], relevance: 97 },
      { book: 'Atomic Habits', author: 'James Clear', bookColor: '#E76F51', chapter: 'Ch. 1 · Tiny Changes', page: 17, quote: 'Habits are the compound interest of self-improvement. Just as money multiplies through compound interest, the effects of your habits multiply as you repeat them year after year.', tags: ['habits', 'growth', 'time'], relevance: 95 },
    ],
    purpose: [
      { book: "Man's Search for Meaning", author: 'Viktor Frankl', bookColor: '#9B72CF', chapter: 'Part I · Life in the Camps', page: 84, quote: 'Those who have a "why" to live can bear with almost any "how." Suffering ceases to be suffering at the moment it finds a meaning, such as the meaning of a sacrifice.', tags: ['purpose', 'resilience', 'meaning'], relevance: 99 },
      { book: 'Deep Work', author: 'Cal Newport', bookColor: '#4A7C9B', chapter: 'Ch. 5 · The Grand Gesture', page: 117, quote: 'A deep life is a good life. The ability to perform deep work is becoming increasingly rare and increasingly valuable — and therefore those who cultivate it will thrive.', tags: ['focus', 'meaning', 'value'], relevance: 78 },
    ],
  };

  const bookHighlights = {
    1: [
      { quote: 'You do not rise to the level of your goals. You fall to the level of your systems.', chapter: 'Ch. 1', page: 27, note: 'Key insight for daily routines' },
      { quote: 'Every action you take is a vote for the type of person you wish to become.', chapter: 'Ch. 2', page: 38, note: null },
      { quote: 'Habits are the compound interest of self-improvement.', chapter: 'Ch. 1', page: 15, note: 'Connected to Psychology of Money ch.4' },
      { quote: 'The most practical way to change who you are is to change what you do.', chapter: 'Ch. 3', page: 44, note: 'Identity-based habits framework' },
    ],
    2: [
      { quote: 'A reliable way to make people believe in falsehoods is frequent repetition.', chapter: 'Ch. 5', page: 62, note: null },
      { quote: 'The confidence people have in their beliefs is not a measure of the quality of evidence.', chapter: 'Ch. 19', page: 209, note: 'Useful for critical thinking' },
      { quote: 'Nothing in life is as important as you think it is while you are thinking about it.', chapter: 'Ch. 26', page: 402, note: null },
    ],
    3: [
      { quote: 'Doing well with money has little to do with how smart you are and a lot to do with how you behave.', chapter: 'Intro', page: 3, note: null },
      { quote: "The ability to do what you want, when you want, with who you want, for as long as you want, is priceless.", chapter: 'Ch. 7', page: 77, note: 'Freedom as the goal of wealth' },
    ],
  };

  const studyCards = [
    { id: 1, quote: 'You do not rise to the level of your goals. You fall to the level of your systems.', book: 'Atomic Habits', author: 'James Clear', chapter: 'Ch. 1', page: 27, color: '#E76F51', tags: ['systems', 'habits'] },
    { id: 2, quote: 'The counterintuitive nature of compounding leads even smart people to overlook its power.', book: 'The Psychology of Money', author: 'Morgan Housel', chapter: 'Ch. 4', page: 51, color: '#E9C46A', tags: ['finance', 'compounding'] },
    { id: 3, quote: 'Those who have a "why" to live can bear with almost any "how."', book: "Man's Search for Meaning", author: 'Viktor Frankl', chapter: 'Part I', page: 84, color: '#9B72CF', tags: ['purpose', 'resilience'] },
    { id: 4, quote: 'Deep work is the ability to focus without distraction on a cognitively demanding task.', book: 'Deep Work', author: 'Cal Newport', chapter: 'Introduction', page: 3, color: '#4A7C9B', tags: ['focus', 'productivity'] },
    { id: 5, quote: 'Every action you take is a vote for the type of person you wish to become.', book: 'Atomic Habits', author: 'James Clear', chapter: 'Ch. 2', page: 38, color: '#E76F51', tags: ['identity', 'habits'] },
  ];

  const graphNodes = [
    { id: 'habits', x: 100, y: 130, r: 38, label: 'Habits', color: '#E76F51', books: ['Atomic Habits', 'The Power of Habit'] },
    { id: 'decisions', x: 265, y: 100, r: 32, label: 'Decisions', color: '#2A9D8F', books: ['Thinking, Fast and Slow'] },
    { id: 'compound', x: 192, y: 225, r: 35, label: 'Compounding', color: '#E9C46A', books: ['Psychology of Money', 'Atomic Habits'] },
    { id: 'focus', x: 72, y: 305, r: 28, label: 'Focus', color: '#4A7C9B', books: ['Deep Work'] },
    { id: 'purpose', x: 295, y: 268, r: 30, label: 'Purpose', color: '#9B72CF', books: ["Man's Search for Meaning"] },
    { id: 'identity', x: 148, y: 388, r: 26, label: 'Identity', color: '#5BAA6A', books: ['Atomic Habits', 'The Power of Habit'] },
    { id: 'bias', x: 290, y: 182, r: 26, label: 'Cognitive Bias', color: '#F4A261', books: ['Thinking, Fast and Slow'] },
    { id: 'resilience', x: 242, y: 370, r: 24, label: 'Resilience', color: '#EF6B6B', books: ["Man's Search for Meaning"] },
  ];

  const graphEdges = [
    ['habits', 'compound'], ['habits', 'identity'], ['habits', 'focus'],
    ['decisions', 'bias'], ['compound', 'purpose'], ['purpose', 'resilience'],
    ['identity', 'resilience'], ['focus', 'identity'], ['bias', 'compound'], ['decisions', 'compound'],
  ];

  const recentSearches = ['decision fatigue', 'compound interest', 'identity change', 'flow state'];
  const suggestions = [
    { emoji: '🧠', text: 'What book explained decision fatigue?' },
    { emoji: '💰', text: 'Compound interest as a life metaphor' },
    { emoji: '🎯', text: 'How authors describe identity change' },
    { emoji: '💡', text: 'Purpose and resilience under pressure' },
  ];

  const handleSearch = (q) => {
    setSearchQuery(q);
    const lower = q.toLowerCase();
    if (lower.includes('decision') || lower.includes('fatigue') || lower.includes('judge')) setResultKey('decision');
    else if (lower.includes('compound') || lower.includes('interest') || lower.includes('habit')) setResultKey('compound');
    else setResultKey('purpose');
  };

  const findNode = (id) => graphNodes.find(n => n.id === id);

  // ────────────────────────────────────────────────────────────────
  // STATUS BAR
  // ────────────────────────────────────────────────────────────────
  const StatusBar = () => {
    const Wifi = window.lucide.Wifi;
    const Battery = window.lucide.Battery;
    return (
      <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px', background: t.surface, position: 'relative', zIndex: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: ff }}>9:41</span>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 126, height: 36, background: '#000', borderRadius: 22 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Wifi size={14} color={t.text} />
          <Battery size={14} color={t.text} />
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // SEARCH SCREEN
  // ────────────────────────────────────────────────────────────────
  const SearchScreen = () => {
    const [localQ, setLocalQ] = useState(searchQuery);
    const [focused, setFocused] = useState(false);
    const SearchIcon = window.lucide.Search;
    const Star = window.lucide.Star;
    const Clock = window.lucide.Clock;
    const X = window.lucide.X;
    const BookOpen = window.lucide.BookOpen;
    const results = resultKey ? searchData[resultKey] : null;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '18px 20px 10px' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, fontFamily: ff, lineHeight: 1.2 }}>Search Ideas</div>
          <div style={{ fontSize: 13, color: t.textSec, fontFamily: ff, marginTop: 3 }}>Ask anything about your reading</div>
        </div>

        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.inputBg, borderRadius: 14, padding: '11px 14px', border: `1.5px solid ${focused ? t.primary : t.border}`, boxShadow: focused ? `0 0 0 3px ${t.primaryGlow}` : 'none', transition: 'all 0.2s' }}>
            <SearchIcon size={17} color={focused ? t.primary : t.textSec} />
            <input value={localQ} onChange={e => setLocalQ(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter' && localQ.trim()) handleSearch(localQ.trim()); }}
              placeholder="What book explained decision fatigue?"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13.5, color: t.text, fontFamily: ff }} />
            {localQ && <div onClick={() => { setLocalQ(''); setResultKey(null); setSearchQuery(''); }} style={{ cursor: 'pointer' }}><X size={15} color={t.textSec} /></div>}
          </div>
        </div>

        {!results ? (
          <>
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10 }}>Recent</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {recentSearches.map((s, i) => (
                  <div key={i} onClick={() => { setLocalQ(s); handleSearch(s); }} style={{ display: 'flex', alignItems: 'center', gap: 5, background: t.tag, borderRadius: 20, padding: '5px 11px', cursor: 'pointer' }}>
                    <Clock size={11} color={t.tagText} />
                    <span style={{ fontSize: 12, color: t.tagText, fontFamily: ff }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '0 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Star size={12} color={t.primary} fill={t.primary} />
                <span style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em' }}>Try asking</span>
              </div>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => { setLocalQ(s.text); handleSearch(s.text); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.card, borderRadius: 13, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', border: `1px solid ${t.border}` }}>
                  <span style={{ fontSize: 19 }}>{s.emoji}</span>
                  <span style={{ fontSize: 13, color: t.text, fontFamily: ff, fontWeight: 500 }}>{s.text}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{results.length} matches</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={11} color={t.primary} fill={t.primary} />
                <span style={{ fontSize: 11, color: t.primary, fontFamily: ff, fontWeight: 600 }}>Semantic search</span>
              </div>
            </div>
            {results.map((r, i) => (
              <div key={i} style={{ background: t.card, borderRadius: 14, padding: '14px', marginBottom: 12, border: `1px solid ${t.border}`, borderLeft: `3px solid ${r.bookColor}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: ff }}>{r.book}</div>
                    <div style={{ fontSize: 11, color: t.textSec, fontFamily: ff }}>{r.author}</div>
                  </div>
                  <div style={{ background: `${r.bookColor}22`, borderRadius: 20, padding: '3px 8px', fontSize: 11, color: r.bookColor, fontFamily: ff, fontWeight: 700 }}>{r.relevance}%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: t.textSec, fontFamily: ff, marginBottom: 8 }}>
                  <BookOpen size={11} color={t.textSec} />
                  {r.chapter} · p.{r.page}
                </div>
                <div style={{ fontSize: 13, color: t.text, fontFamily: ff, lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2px solid ${t.border}`, paddingLeft: 10, marginBottom: 10 }}>"{r.quote}"</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {r.tags.map((tag, j) => (
                    <span key={j} style={{ background: t.tag, borderRadius: 12, padding: '3px 8px', fontSize: 11, color: t.tagText, fontFamily: ff }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // LIBRARY SCREEN
  // ────────────────────────────────────────────────────────────────
  const LibraryScreen = () => {
    const BookOpen = window.lucide.BookOpen;
    const Bookmark = window.lucide.Bookmark;
    const Edit = window.lucide.Edit;
    const ChevronRight = window.lucide.ChevronRight;
    const ArrowLeft = window.lucide.ArrowLeft;

    if (selectedBook) {
      const book = books.find(b => b.id === selectedBook);
      const highlights = bookHighlights[selectedBook] || bookHighlights[1];
      return (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
          <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setSelectedBook(null)}>
            <ArrowLeft size={18} color={t.textSec} />
            <span style={{ fontSize: 13, color: t.textSec, fontFamily: ff }}>Library</span>
          </div>
          <div style={{ margin: '0 20px 20px', borderRadius: 18, padding: '20px', background: `linear-gradient(135deg, ${book.color}28 0%, ${book.color}10 100%)`, border: `1px solid ${book.color}40` }}>
            <div style={{ width: 52, height: 66, borderRadius: 8, background: book.color, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${book.color}55` }}>
              <BookOpen size={22} color="white" />
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: t.text, fontFamily: ff, lineHeight: 1.25 }}>{book.title}</div>
            <div style={{ fontSize: 13, color: t.textSec, fontFamily: ff, marginTop: 3 }}>{book.author} · {book.year}</div>
            <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
              {[{ Icon: Bookmark, val: book.highlights, label: 'Highlights', c: book.color }, { Icon: Edit, val: book.notes, label: 'Notes', c: t.accent }].map(({ Icon, val, label, c }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} color={c} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.text, fontFamily: ff }}>{val}</span>
                  <span style={{ fontSize: 12, color: t.textSec, fontFamily: ff }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 12 }}>Highlights</div>
            {highlights.map((h, i) => (
              <div key={i} style={{ background: t.card, borderRadius: 12, padding: '13px 14px', marginBottom: 10, border: `1px solid ${t.border}`, borderLeft: `3px solid ${book.color}` }}>
                <div style={{ fontSize: 13, color: t.text, fontFamily: ff, lineHeight: 1.65, fontStyle: 'italic', marginBottom: 6 }}>"{h.quote}"</div>
                <div style={{ fontSize: 11, color: t.textSec, fontFamily: ff }}>{h.chapter} · p.{h.page}</div>
                {h.note && (
                  <div style={{ marginTop: 8, padding: '6px 10px', background: t.cardAlt, borderRadius: 8, fontSize: 12, color: t.textSec, fontFamily: ff }}>
                    Note: {h.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '18px 20px 10px' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, fontFamily: ff }}>Library</div>
          <div style={{ fontSize: 13, color: t.textSec, fontFamily: ff, marginTop: 3 }}>231 highlights across 6 books</div>
        </div>
        <div style={{ padding: '8px 20px' }}>
          {books.map(book => (
            <div key={book.id} onClick={() => setSelectedBook(book.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, background: t.card, borderRadius: 14, padding: '14px', marginBottom: 10, border: `1px solid ${t.border}`, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 56, borderRadius: 8, background: book.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${book.color}44` }}>
                <BookOpen size={20} color="white" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: ff, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.title}</div>
                <div style={{ fontSize: 12, color: t.textSec, fontFamily: ff, marginTop: 2 }}>{book.author}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: t.tagText, fontFamily: ff, background: t.tag, borderRadius: 10, padding: '2px 7px' }}>{book.highlights} highlights</span>
                  <span style={{ fontSize: 11, color: t.tagText, fontFamily: ff, background: t.tag, borderRadius: 10, padding: '2px 7px' }}>{book.notes} notes</span>
                </div>
              </div>
              <ChevronRight size={16} color={t.textMuted} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // GRAPH SCREEN
  // ────────────────────────────────────────────────────────────────
  const GraphScreen = () => {
    const Info = window.lucide.Info;
    const X = window.lucide.X;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '18px 20px 10px' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, fontFamily: ff }}>Idea Graph</div>
          <div style={{ fontSize: 13, color: t.textSec, fontFamily: ff, marginTop: 3 }}>How concepts connect across books</div>
        </div>

        <div style={{ margin: '8px 16px 12px', background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, overflow: 'hidden', position: 'relative' }}>
          <svg width="343" height="450" viewBox="0 0 343 450" style={{ display: 'block' }}>
            <defs>
              <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill={isDark ? '#1C1C38' : '#D8CDB8'} />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <rect width="343" height="450" fill="url(#dotgrid)" />

            {graphEdges.map(([aId, bId], i) => {
              const a = findNode(aId), b = findNode(bId);
              if (!a || !b) return null;
              const dim = selectedNode && selectedNode !== aId && selectedNode !== bId;
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={isDark ? '#28284A' : '#C0B49A'} strokeWidth="1.5" opacity={dim ? 0.2 : 0.8} />;
            })}

            {graphNodes.map(node => {
              const isSelected = selectedNode === node.id;
              const isConnected = selectedNode && graphEdges.some(([a, b]) => (a === selectedNode && b === node.id) || (b === selectedNode && a === node.id));
              const opacity = !selectedNode || isSelected || isConnected ? 1 : 0.3;
              const words = node.label.split(' ');
              return (
                <g key={node.id} onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)} style={{ cursor: 'pointer' }}>
                  {isSelected && <circle cx={node.x} cy={node.y} r={node.r + 10} fill={`${node.color}18`} stroke={node.color} strokeWidth="1.5" strokeDasharray="5,3" />}
                  <circle cx={node.x} cy={node.y} r={node.r} fill={`${node.color}${isSelected ? 'CC' : '2A'}`} stroke={node.color} strokeWidth={isSelected ? 2.5 : 1.5} opacity={opacity} filter={isSelected ? 'url(#glow)' : ''} />
                  {words.map((word, wi) => (
                    <text key={wi} x={node.x} y={node.y + (words.length === 1 ? 0 : wi === 0 ? -6 : 8)} textAnchor="middle" dominantBaseline="middle"
                      fontSize={isSelected ? 11 : 10} fontWeight={700} fill={isSelected ? node.color : (isDark ? '#CCCCEE' : '#2A2020')}
                      fontFamily="Plus Jakarta Sans, sans-serif" opacity={opacity}>{word}</text>
                  ))}
                  {node.books.length > 1 && (
                    <>
                      <circle cx={node.x + node.r - 5} cy={node.y - node.r + 5} r={9} fill={t.primary} opacity={opacity} />
                      <text x={node.x + node.r - 5} y={node.y - node.r + 5} textAnchor="middle" dominantBaseline="middle" fontSize={9} fontWeight={800} fill="#000" fontFamily="Plus Jakarta Sans, sans-serif" opacity={opacity}>{node.books.length}</text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {selectedNode ? (
          <div style={{ margin: '0 16px 12px', background: t.card, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}` }}>
            {(() => {
              const node = findNode(selectedNode);
              const connIds = graphEdges.filter(([a, b]) => a === selectedNode || b === selectedNode).map(([a, b]) => a === selectedNode ? b : a);
              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: node.color }} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: ff }}>{node.label}</span>
                    </div>
                    <div onClick={() => setSelectedNode(null)} style={{ cursor: 'pointer', padding: 4 }}><X size={14} color={t.textSec} /></div>
                  </div>
                  <div style={{ fontSize: 12, color: t.textSec, fontFamily: ff, marginBottom: 6 }}>Books: {node.books.join(' · ')}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontFamily: ff }}>Connected to: {connIds.map(id => findNode(id)?.label).filter(Boolean).join(' · ')}</div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div style={{ margin: '0 16px', background: t.card, borderRadius: 13, padding: '11px 14px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={14} color={t.textSec} />
            <span style={{ fontSize: 12, color: t.textSec, fontFamily: ff }}>Tap any concept node to explore its connections</span>
          </div>
        )}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // STUDY SCREEN
  // ────────────────────────────────────────────────────────────────
  const StudyScreen = () => {
    const Check = window.lucide.Check;
    const X = window.lucide.X;
    const ChevronLeft = window.lucide.ChevronLeft;
    const ChevronRight = window.lucide.ChevronRight;
    const card = studyCards[studyIdx];

    const nextCard = (remembered) => {
      setStudyAnswer(remembered ? 'yes' : 'no');
      setTimeout(() => {
        setStudyAnswer(null);
        setCardFlipped(false);
        setStudyIdx((studyIdx + 1) % studyCards.length);
      }, 550);
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '18px 20px 10px' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, fontFamily: ff }}>Study</div>
          <div style={{ fontSize: 13, color: t.textSec, fontFamily: ff, marginTop: 3 }}>Adaptive review from your highlights</div>
        </div>

        <div style={{ padding: '8px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: 12, color: t.textSec, fontFamily: ff }}>{studyIdx + 1} of {studyCards.length}</span>
            <span style={{ fontSize: 12, color: t.primary, fontFamily: ff, fontWeight: 700 }}>{Math.round(((studyIdx + 1) / studyCards.length) * 100)}%</span>
          </div>
          <div style={{ height: 4, background: t.border, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, width: `${((studyIdx + 1) / studyCards.length) * 100}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ padding: '0 20px 14px' }}>
          <div onClick={() => !studyAnswer && setCardFlipped(!cardFlipped)} style={{
            background: cardFlipped ? `linear-gradient(135deg, ${card.color}1A, ${card.color}0D)` : t.card,
            border: `1.5px solid ${cardFlipped ? card.color + '60' : t.border}`,
            borderRadius: 20, padding: '22px 20px', minHeight: 208, cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: studyAnswer === 'yes' ? `0 0 24px ${t.success}44` : studyAnswer === 'no' ? `0 0 24px ${t.red}44` : `0 4px 24px ${t.shadow}`,
          }}>
            {!cardFlipped ? (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Do you remember which book said...</div>
                <div style={{ fontSize: 16, color: t.text, fontFamily: ff, lineHeight: 1.72, fontStyle: 'italic', fontWeight: 500 }}>"{card.quote}"</div>
                <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: t.textMuted, fontFamily: ff }}>Tap to reveal source</div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 42, height: 54, borderRadius: 7, background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${card.color}55`, flexShrink: 0 }}>
                    <span style={{ fontSize: 20 }}>📚</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: t.text, fontFamily: ff }}>{card.book}</div>
                    <div style={{ fontSize: 12, color: t.textSec, fontFamily: ff }}>{card.author}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: t.textSec, fontFamily: ff, marginBottom: 10 }}>{card.chapter} · Page {card.page}</div>
                <div style={{ fontSize: 13, color: t.text, fontFamily: ff, lineHeight: 1.65, fontStyle: 'italic', borderLeft: `2.5px solid ${card.color}`, paddingLeft: 10 }}>"{card.quote}"</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {card.tags.map((tag, i) => (
                    <span key={i} style={{ background: t.tag, borderRadius: 10, padding: '3px 8px', fontSize: 11, color: t.tagText, fontFamily: ff }}>{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {cardFlipped && !studyAnswer ? (
          <div style={{ padding: '0 20px', display: 'flex', gap: 12 }}>
            <div onClick={() => nextCard(false)} style={{ flex: 1, background: `${t.red}18`, border: `1.5px solid ${t.red}44`, borderRadius: 14, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
              <X size={18} color={t.red} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.red, fontFamily: ff }}>Forgot</span>
            </div>
            <div onClick={() => nextCard(true)} style={{ flex: 1, background: `${t.success}18`, border: `1.5px solid ${t.success}44`, borderRadius: 14, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
              <Check size={18} color={t.success} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.success, fontFamily: ff }}>Remembered</span>
            </div>
          </div>
        ) : !cardFlipped ? (
          <div style={{ padding: '0 20px', display: 'flex', gap: 12 }}>
            <div onClick={() => { setStudyIdx((studyIdx - 1 + studyCards.length) % studyCards.length); setCardFlipped(false); }} style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
              <ChevronLeft size={17} color={t.textSec} />
              <span style={{ fontSize: 14, color: t.textSec, fontFamily: ff }}>Prev</span>
            </div>
            <div onClick={() => { setStudyIdx((studyIdx + 1) % studyCards.length); setCardFlipped(false); }} style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: t.textSec, fontFamily: ff }}>Next</span>
              <ChevronRight size={17} color={t.textSec} />
            </div>
          </div>
        ) : null}

        <div style={{ margin: '14px 20px 0', background: t.card, borderRadius: 14, padding: '14px', border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10 }}>Session Stats</div>
          <div style={{ display: 'flex', gap: 0 }}>
            {[{ val: '12', label: 'Reviewed', color: t.primary }, { val: '9', label: 'Remembered', color: t.success }, { val: '3', label: 'Forgot', color: t.red }].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: ff }}>{s.val}</div>
                <div style={{ fontSize: 11, color: t.textSec, fontFamily: ff, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // SETTINGS SCREEN
  // ────────────────────────────────────────────────────────────────
  const SettingsScreen = () => {
    const Sun = window.lucide.Sun;
    const Moon = window.lucide.Moon;
    const Bell = window.lucide.Bell;
    const Cloud = window.lucide.Cloud;
    const Shield = window.lucide.Shield;
    const HelpCircle = window.lucide.HelpCircle;
    const ChevronRight = window.lucide.ChevronRight;
    const Zap = window.lucide.Zap;

    const groups = [
      {
        title: 'Appearance',
        items: [{
          label: 'Dark Mode', desc: isDark ? 'Currently dark' : 'Currently light', Icon: isDark ? Moon : Sun, iconColor: t.primary,
          right: (
            <div onClick={() => setIsDark(!isDark)} style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? t.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: isDark ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: 'white', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDark ? <Moon size={11} color="#666" /> : <Sun size={11} color="#F59E0B" />}
              </div>
            </div>
          )
        }]
      },
      {
        title: 'Smart Features',
        items: [
          { label: 'Smart Recall Prompts', desc: 'Surface quotes based on calendar & location', Icon: Zap, iconColor: '#8B5CF6', toggle: true },
          { label: 'Reading Reminders', desc: 'Daily study session reminders', Icon: Bell, iconColor: '#3AADA0', toggle: false },
        ]
      },
      {
        title: 'Sync & Privacy',
        items: [
          { label: 'iCloud Sync', desc: 'Sync highlights across devices', Icon: Cloud, iconColor: '#60A5FA', arrow: true },
          { label: 'Privacy Settings', desc: 'Data and analytics preferences', Icon: Shield, iconColor: '#34D399', arrow: true },
          { label: 'Help & Support', desc: 'FAQs and contact support', Icon: HelpCircle, iconColor: '#F59E0B', arrow: true },
        ]
      }
    ];

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        <div style={{ padding: '18px 20px 10px' }}>
          <div style={{ fontSize: 23, fontWeight: 800, color: t.text, fontFamily: ff }}>Settings</div>
        </div>

        <div style={{ margin: '8px 20px 20px', background: `linear-gradient(135deg, ${t.primary}20, ${t.accent}14)`, borderRadius: 18, padding: '16px', border: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'white', fontFamily: ff, flexShrink: 0 }}>A</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: ff }}>Alex Reader</div>
              <div style={{ fontSize: 12, color: t.textSec, fontFamily: ff, marginTop: 2 }}>6 books · 231 highlights · 82 notes</div>
            </div>
          </div>
        </div>

        {groups.map((group, gi) => (
          <div key={gi} style={{ padding: '0 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10 }}>{group.title}</div>
            <div style={{ background: t.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${t.border}` }}>
              {group.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: ii < group.items.length - 1 ? `1px solid ${t.borderLight}` : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${item.iconColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.Icon size={17} color={item.iconColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text, fontFamily: ff }}>{item.label}</div>
                    {item.desc && <div style={{ fontSize: 11, color: t.textSec, fontFamily: ff, marginTop: 1 }}>{item.desc}</div>}
                  </div>
                  {item.right && item.right}
                  {item.toggle !== undefined && !item.right && (
                    <div style={{ width: 50, height: 28, borderRadius: 14, background: item.toggle ? t.primary : t.border, position: 'relative', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: 3, left: item.toggle ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                    </div>
                  )}
                  {item.arrow && <ChevronRight size={16} color={t.textMuted} />}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ padding: '0 20px' }}>
          <div style={{ textAlign: 'center', fontSize: 12, color: t.textMuted, fontFamily: ff }}>MarginMap v1.0.0 · Find the book behind any idea.</div>
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────
  // BOTTOM NAV
  // ────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'search', label: 'Search', Icon: window.lucide.Search },
    { id: 'library', label: 'Library', Icon: window.lucide.BookOpen },
    { id: 'graph', label: 'Graph', Icon: window.lucide.Share2 },
    { id: 'study', label: 'Study', Icon: window.lucide.Layers },
    { id: 'settings', label: 'Settings', Icon: window.lucide.Settings },
  ];

  // ────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: ff }}>
      <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 52, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: `0 50px 120px rgba(0,0,0,0.45), 0 0 0 10px ${isDark ? '#1A1A2E' : '#D0C8B8'}, 0 0 0 12px ${isDark ? '#2A2A40' : '#B8B0A0'}` }}>

        <StatusBar />

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'search' && <SearchScreen />}
          {activeTab === 'library' && <LibraryScreen />}
          {activeTab === 'graph' && <GraphScreen />}
          {activeTab === 'study' && <StudyScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </div>

        <div style={{ height: 82, background: t.navBg, borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', paddingBottom: 14, flexShrink: 0 }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <div key={id}
                onClick={() => { setActiveTab(id); if (id === 'library') setSelectedBook(null); }}
                onMouseDown={() => setPressedTab(id)} onMouseUp={() => setPressedTab(null)}
                onTouchStart={() => setPressedTab(id)} onTouchEnd={() => setPressedTab(null)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer', paddingTop: 8, transform: pressedTab === id ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.12s' }}>
                {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.primary, marginBottom: -1 }} />}
                <Icon size={22} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 1.8} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? t.primary : t.textMuted, fontFamily: ff }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
