
function App() {
  const { useState, useEffect, useRef } = React;

  // ── Theme ──────────────────────────────────────────────────────────────────
  const themes = {
    light: {
      bg: '#F4F2FF',
      surface: '#FFFFFF',
      surfaceAlt: '#F0EEFF',
      card: '#FFFFFF',
      cardBorder: '#E8E3FF',
      primary: '#6D28D9',
      primaryLight: '#EDE9FE',
      primaryGrad: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
      accent: '#A78BFA',
      accentSoft: '#DDD6FE',
      text: '#1C1033',
      textSub: '#6B5FA6',
      textMuted: '#9D93C4',
      border: '#E8E3FF',
      statusBar: '#6D28D9',
      navBg: '#FFFFFF',
      navBorder: '#E8E3FF',
      inputBg: '#F0EEFF',
      tag: '#EDE9FE',
      tagText: '#6D28D9',
      danger: '#EF4444',
      success: '#10B981',
      highlight: '#FDE68A',
    },
    dark: {
      bg: '#0D0A1A',
      surface: '#1A1530',
      surfaceAlt: '#221D3A',
      card: '#1A1530',
      cardBorder: '#2D2650',
      primary: '#A78BFA',
      primaryLight: '#2D2650',
      primaryGrad: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
      accent: '#C4B5FD',
      accentSoft: '#3D3560',
      text: '#F0EBFF',
      textSub: '#B8ADEA',
      textMuted: '#6B5FA6',
      border: '#2D2650',
      statusBar: '#A78BFA',
      navBg: '#1A1530',
      navBorder: '#2D2650',
      inputBg: '#221D3A',
      tag: '#2D2650',
      tagText: '#C4B5FD',
      danger: '#F87171',
      success: '#34D399',
      highlight: '#92400E',
    },
  };

  const [isDark, setIsDark] = useState(false);
  const t = isDark ? themes.dark : themes.light;

  const [activeTab, setActiveTab] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [exportDone, setExportDone] = useState(false);
  const [pinnedMoments, setPinnedMoments] = useState([0, 3, 7]);
  const [activeCollection, setActiveCollection] = useState(null);

  // inject font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const press = (id, cb) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); cb && cb(); }, 180);
  };

  // ── Data ───────────────────────────────────────────────────────────────────
  const videos = [
    {
      id: 0,
      title: "Emma's First Steps",
      duration: '2:34',
      date: 'Today',
      moments: 6,
      thumb: null,
      color: '#F3E8FF',
      accent: '#9333EA',
      moments_list: [0,1,2],
    },
    {
      id: 1,
      title: 'React Tutorial Deep Dive',
      duration: '1:12:04',
      date: 'Yesterday',
      moments: 14,
      thumb: null,
      color: '#DBEAFE',
      accent: '#3B82F6',
      moments_list: [3,4,5],
    },
    {
      id: 2,
      title: 'Team Standup – Q1 Review',
      duration: '48:21',
      date: 'Mar 20',
      moments: 9,
      thumb: null,
      color: '#D1FAE5',
      accent: '#10B981',
      moments_list: [6,7,8],
    },
    {
      id: 3,
      title: 'Kitchen Reno Walkthrough',
      duration: '18:05',
      date: 'Mar 18',
      moments: 5,
      thumb: null,
      color: '#FEF3C7',
      accent: '#F59E0B',
      moments_list: [9,10],
    },
  ];

  const allMoments = [
    { id: 0, videoId: 0, label: 'First step taken', time: '0:34', type: 'motion', caption: 'Emma lets go of the couch and takes her first solo step', tags: ['milestone','family'], pinned: true },
    { id: 1, videoId: 0, label: 'Laughs & claps', time: '1:02', type: 'audio', caption: 'Joyful reaction from everyone in the room', tags: ['family'], pinned: false },
    { id: 2, videoId: 0, label: 'Falls and gets up', time: '1:47', type: 'motion', caption: 'Tumbles softly, then immediately tries again', tags: ['milestone'], pinned: false },
    { id: 3, videoId: 1, label: 'useEffect explained', time: '8:12', type: 'scene', caption: 'Clear whiteboard diagram of the useEffect lifecycle', tags: ['study','react'], pinned: true },
    { id: 4, videoId: 1, label: 'useMemo vs useCallback', time: '22:45', type: 'audio', caption: '"The key difference is what they memoize..."', tags: ['study','react'], pinned: false },
    { id: 5, videoId: 1, label: 'Live coding demo', time: '41:18', type: 'scene', caption: 'Instructor builds a custom hook from scratch', tags: ['study'], pinned: false },
    { id: 6, videoId: 2, label: 'Revenue chart shown', time: '4:05', type: 'scene', caption: 'Q1 sales graph presented on shared screen', tags: ['work'], pinned: false },
    { id: 7, videoId: 2, label: 'Action items listed', time: '31:20', type: 'audio', caption: '"Three priorities before end of quarter..."', tags: ['work','todo'], pinned: true },
    { id: 8, videoId: 2, label: 'Budget decision', time: '44:58', type: 'audio', caption: 'Team agrees to reallocate $12k to design', tags: ['work'], pinned: false },
    { id: 9, videoId: 3, label: 'Backsplash reveal', time: '3:30', type: 'scene', caption: 'New subway tiles installed behind the range', tags: ['home'], pinned: false },
    { id: 10, videoId: 3, label: 'Contractor quote', time: '14:12', type: 'audio', caption: '"Final number came in at eighteen hundred..."', tags: ['home','budget'], pinned: false },
  ];

  const collections = [
    { id: 'family', label: 'Family Milestones', icon: '👨‍👩‍👧', count: 4, momentIds: [0,1,2,7], color: '#F3E8FF', accent: '#9333EA' },
    { id: 'study', label: 'Study Notes', icon: '📚', count: 3, momentIds: [3,4,5], color: '#DBEAFE', accent: '#3B82F6' },
    { id: 'work', label: 'Work Recaps', icon: '💼', count: 3, momentIds: [6,7,8], color: '#D1FAE5', accent: '#10B981' },
    { id: 'home', label: 'Home Projects', icon: '🏡', count: 2, momentIds: [9,10], color: '#FEF3C7', accent: '#F59E0B' },
  ];

  const typeIcon = (type) => {
    if (type === 'motion') return window.lucide.Zap;
    if (type === 'audio') return window.lucide.Mic;
    return window.lucide.Camera;
  };

  const typeColor = (type) => {
    if (type === 'motion') return '#F59E0B';
    if (type === 'audio') return '#3B82F6';
    return '#10B981';
  };

  // ── Filtered search ────────────────────────────────────────────────────────
  const searchResults = searchQuery.length > 1
    ? allMoments.filter(m =>
        m.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some(tg => tg.toLowerCase().includes(searchQuery.toLowerCase())) ||
        videos.find(v => v.id === m.videoId)?.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const suggestions = [
    'when my dog jumped',
    'the password part',
    'whiteboard diagram',
    'first steps',
    'action items',
  ];

  // ── Icons (Lucide) ─────────────────────────────────────────────────────────
  const LI = ({ icon, size = 20, color, style: s = {} }) => {
    if (!window.lucide) return null;
    const Icon = typeof icon === 'string' ? window.lucide[icon] : icon;
    if (!Icon) return null;
    return React.createElement(Icon, { size, color: color || t.textSub, strokeWidth: 2, style: s });
  };

  // ── Shared Components ──────────────────────────────────────────────────────
  const StatusBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px 0', height: 28 }}>
      <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 700, color: isDark ? t.text : '#FFF', letterSpacing: 0.2 }}>9:41</span>
      <div style={{ width: 126, height: 34, background: '#000', borderRadius: 20, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <LI icon="Wifi" size={13} color={isDark ? t.text : '#FFF'} />
        <LI icon="Battery" size={15} color={isDark ? t.text : '#FFF'} />
      </div>
    </div>
  );

  const MomentCard = ({ moment, onTap, compact }) => {
    const video = videos.find(v => v.id === moment.videoId);
    const Icon = typeIcon(moment.type);
    const color = typeColor(moment.type);
    const isPinned = pinnedMoments.includes(moment.id);
    return (
      <div
        onClick={() => onTap && onTap(moment)}
        style={{
          background: t.card,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 16,
          padding: compact ? '12px 14px' : '14px 16px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          cursor: 'pointer',
          transition: 'all 0.15s',
          marginBottom: 10,
        }}
      >
        {/* Thumb */}
        <div style={{
          width: compact ? 52 : 62,
          height: compact ? 52 : 62,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${video?.color || '#F3E8FF'} 0%, ${video?.accent || '#9333EA'}33 100%)`,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <LI icon="Play" size={18} color={video?.accent || '#9333EA'} />
          <div style={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            background: color,
            borderRadius: 6,
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {React.createElement(Icon, { size: 9, color: '#FFF', strokeWidth: 2.5 })}
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 700, color: t.text, display: 'block', marginBottom: 2 }}>
              {moment.label}
            </span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
              {isPinned && <LI icon="Pin" size={12} color={t.primary} />}
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{moment.time}</span>
            </div>
          </div>
          {!compact && (
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textSub, margin: '0 0 8px', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {moment.caption}
            </p>
          )}
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {moment.tags.slice(0, compact ? 1 : 2).map(tag => (
              <span key={tag} style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 10,
                fontWeight: 600,
                color: t.tagText,
                background: t.tag,
                padding: '2px 7px',
                borderRadius: 20,
              }}>#{tag}</span>
            ))}
            {!compact && (
              <span style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 10,
                fontWeight: 600,
                color: t.textMuted,
                background: t.surfaceAlt,
                padding: '2px 7px',
                borderRadius: 20,
              }}>{video?.title?.split(' ').slice(0,2).join(' ')}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Screens ────────────────────────────────────────────────────────────────

  // HOME
  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px 16px', background: t.primaryGrad }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 500 }}>Good afternoon</p>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 22, fontWeight: 800, color: '#FFF', margin: 0 }}>PauseLens</h1>
          </div>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
            onClick={() => setActiveTab('settings')}
          >
            <LI icon="Settings" size={18} color="#FFF" />
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Videos', value: '4' },
            { label: 'Moments', value: '34' },
            { label: 'Pinned', value: '3' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '8px 10px',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 800, color: '#FFF', margin: 0 }}>{s.value}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned moments */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Pinned Moments</h2>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setActiveTab('collections')}>See all</span>
        </div>
        {allMoments.filter(m => pinnedMoments.includes(m.id)).map(m => (
          <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} />
        ))}
      </div>

      {/* Recent videos */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>Recent Videos</h2>
          <LI icon="ChevronRight" size={16} color={t.textMuted} />
        </div>
        {videos.map(v => (
          <div
            key={v.id}
            onClick={() => { setSelectedVideo(v); }}
            style={{
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 16,
              padding: '14px 16px',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: 10,
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${v.color} 0%, ${v.accent}44 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <LI icon="Film" size={22} color={v.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{v.duration}</span>
                <span style={{ width: 3, height: 3, background: t.textMuted, borderRadius: '50%' }} />
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{v.date}</span>
              </div>
            </div>
            <div style={{
              background: t.primaryLight,
              borderRadius: 20,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <LI icon="Layers" size={12} color={t.primary} />
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.primary, fontWeight: 700 }}>{v.moments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // VIDEO DETAIL
  const VideoDetail = ({ video }) => {
    const moments = allMoments.filter(m => video.moments_list.includes(m.id));
    return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{
          height: 220,
          background: `linear-gradient(160deg, ${video.color} 0%, ${video.accent}55 100%)`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <div
              onClick={() => setSelectedVideo(null)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LI icon="ChevronLeft" size={20} color={video.accent} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LI icon="Play" size={28} color={video.accent} />
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: video.accent, fontWeight: 600 }}>0:00</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: video.accent, fontWeight: 600 }}>{video.duration}</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.4)', borderRadius: 4 }}>
              <div style={{ width: '35%', height: '100%', background: video.accent, borderRadius: 4 }} />
            </div>
            {/* Moment markers */}
            <div style={{ position: 'relative', height: 12 }}>
              {[20, 45, 75].map((pct, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: 3,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: video.accent,
                  border: '2px solid white',
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 16px 20px' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 800, color: t.text, margin: '0 0 4px' }}>{video.title}</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{video.duration}</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted }}>·</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{video.moments} moments detected</span>
          </div>

          {/* Type breakdown */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[
              { type: 'scene', label: 'Scene', icon: 'Camera', count: 2 },
              { type: 'audio', label: 'Audio', icon: 'Mic', count: 2 },
              { type: 'motion', label: 'Motion', icon: 'Zap', count: 2 },
            ].map(tp => (
              <div key={tp.type} style={{
                flex: 1,
                background: t.surfaceAlt,
                borderRadius: 12,
                padding: '10px 8px',
                textAlign: 'center',
              }}>
                <LI icon={tp.icon} size={16} color={typeColor(tp.type)} />
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 800, color: t.text, margin: '4px 0 1px' }}>{tp.count}</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10, color: t.textMuted, margin: 0 }}>{tp.label}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 12px' }}>Detected Moments</h3>
          {moments.map(m => (
            <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} />
          ))}
        </div>
      </div>
    );
  };

  // SEARCH
  const SearchScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '14px 20px 16px', background: t.primaryGrad }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 19, fontWeight: 800, color: '#FFF', margin: '0 0 12px' }}>Find a Moment</h2>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          gap: 8,
        }}>
          <LI icon="Search" size={17} color="#9D93C4" />
          <input
            placeholder='Try "when my dog jumped"…'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 14,
              color: '#1C1033',
              background: 'transparent',
              fontWeight: 500,
            }}
          />
          {searchQuery && (
            <div onClick={() => setSearchQuery('')} style={{ cursor: 'pointer' }}>
              <LI icon="X" size={15} color="#9D93C4" />
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {searchQuery.length > 1 ? (
          <>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 600, margin: '0 0 12px' }}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            {searchResults.length > 0 ? (
              searchResults.map(m => <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} />)
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <LI icon="SearchX" size={40} color={t.textMuted} />
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: t.textMuted, marginTop: 12 }}>No moments found</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Suggestions */}
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px' }}>Try asking</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {suggestions.map(s => (
                <div
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  style={{
                    background: t.card,
                    border: `1px solid ${t.cardBorder}`,
                    borderRadius: 12,
                    padding: '11px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                  }}
                >
                  <LI icon="Sparkles" size={15} color={t.primary} />
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, color: t.text, fontWeight: 500, fontStyle: 'italic' }}>"{s}"</span>
                </div>
              ))}
            </div>

            {/* Recent */}
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px' }}>Recent Moments</p>
            {allMoments.slice(0, 4).map(m => <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} compact />)}
          </>
        )}
      </div>
    </div>
  );

  // COLLECTIONS
  const CollectionsScreen = () => {
    if (activeCollection) {
      const col = collections.find(c => c.id === activeCollection);
      const moments = allMoments.filter(m => col.momentIds.includes(m.id));
      return (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${col.color} 0%, ${col.accent}33 100%)`,
            padding: '14px 20px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div onClick={() => setActiveCollection(null)} style={{ cursor: 'pointer' }}>
                <LI icon="ChevronLeft" size={22} color={col.accent} />
              </div>
              <span style={{ fontSize: 24 }}>{col.icon}</span>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 800, color: t.text, margin: 0 }}>{col.label}</h2>
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textSub, fontWeight: 500 }}>{col.count} moments</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            {moments.map(m => <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} />)}
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
        <div style={{ padding: '14px 20px 16px', background: t.primaryGrad }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 19, fontWeight: 800, color: '#FFF', margin: '0 0 2px' }}>Collections</h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Pinned moments, organized</p>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {collections.map(col => (
              <div
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                style={{
                  background: `linear-gradient(135deg, ${col.color} 0%, ${col.accent}22 100%)`,
                  border: `1px solid ${col.accent}33`,
                  borderRadius: 18,
                  padding: '16px 14px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{col.icon}</span>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 3px' }}>{col.label}</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textSub, margin: 0 }}>{col.count} moments</p>
              </div>
            ))}
          </div>

          {/* All pinned */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 800, color: t.text, margin: 0 }}>All Pinned</h3>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{pinnedMoments.length} items</span>
          </div>
          {allMoments.filter(m => pinnedMoments.includes(m.id)).map(m => (
            <MomentCard key={m.id} moment={m} onTap={setSelectedMoment} />
          ))}
        </div>
      </div>
    );
  };

  // SETTINGS
  const SettingsScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '14px 20px 20px', background: t.primaryGrad }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 19, fontWeight: 800, color: '#FFF', margin: 0 }}>Settings</h2>
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        {/* Profile */}
        <div style={{
          background: t.card,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 20,
          padding: '16px',
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: t.primaryGrad,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <LI icon="User" size={24} color="#FFF" />
          </div>
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Steve Johnson</p>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textMuted, margin: 0 }}>4 videos · 34 moments</p>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{
          background: t.card,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{ padding: '10px 16px' }}>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: 0 }}>Appearance</p>
          </div>
          <div style={{ height: 1, background: t.border }} />
          <div
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '14px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LI icon={isDark ? 'Moon' : 'Sun'} size={18} color={t.primary} />
              </div>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 600, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            {/* Toggle */}
            <div style={{
              width: 44,
              height: 26,
              borderRadius: 13,
              background: isDark ? t.primary : t.border,
              position: 'relative',
              transition: 'background 0.3s',
            }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#FFF',
                position: 'absolute',
                top: 3,
                left: isDark ? 21 : 3,
                transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </div>

        {/* Settings groups */}
        {[
          {
            title: 'Detection',
            items: [
              { icon: 'Zap', label: 'Motion Detection', sub: 'Enabled', color: '#F59E0B' },
              { icon: 'Mic', label: 'Audio Cues', sub: 'Enabled', color: '#3B82F6' },
              { icon: 'Camera', label: 'Scene Detection', sub: 'Enabled', color: '#10B981' },
            ],
          },
          {
            title: 'Export',
            items: [
              { icon: 'Subtitles', label: 'Auto Subtitles', sub: 'On export', color: '#6D28D9' },
              { icon: 'Crop', label: 'Smart Framing', sub: 'Auto', color: '#EC4899' },
              { icon: 'Share2', label: 'Default Share', sub: 'Messages', color: '#14B8A6' },
            ],
          },
        ].map(group => (
          <div key={group.title} style={{
            background: t.card,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 16,
          }}>
            <div style={{ padding: '10px 16px' }}>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, margin: 0 }}>{group.title}</p>
            </div>
            {group.items.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <div style={{ height: 1, background: t.border, marginLeft: 62 }} />}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LI icon={item.icon} size={16} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>{item.label}</p>
                    <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, margin: 0 }}>{item.sub}</p>
                  </div>
                  <LI icon="ChevronRight" size={16} color={t.textMuted} />
                </div>
              </div>
            ))}
          </div>
        ))}

        <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted, textAlign: 'center', marginTop: 8 }}>PauseLens v1.0.0 · Made with ♥</p>
      </div>
    </div>
  );

  // MOMENT DETAIL MODAL
  const MomentModal = ({ moment }) => {
    const video = videos.find(v => v.id === moment.videoId);
    const isPinned = pinnedMoments.includes(moment.id);
    const togglePin = () => {
      setPinnedMoments(p => p.includes(moment.id) ? p.filter(x => x !== moment.id) : [...p, moment.id]);
    };
    const handleExport = () => {
      press('export', () => {
        setExportDone(true);
        setTimeout(() => setExportDone(false), 2000);
      });
    };
    const Icon = typeIcon(moment.type);
    const color = typeColor(moment.type);

    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 100,
        borderRadius: 44,
      }}
        onClick={() => setSelectedMoment(null)}
      >
        <div
          style={{
            background: t.surface,
            borderRadius: '28px 28px 44px 44px',
            padding: '0 0 24px',
            maxHeight: '82%',
            overflowY: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }} />
          </div>

          {/* Preview area */}
          <div style={{
            margin: '0 16px 16px',
            height: 180,
            borderRadius: 20,
            background: `linear-gradient(150deg, ${video?.color || '#F3E8FF'} 0%, ${video?.accent || '#9333EA'}44 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LI icon="Play" size={24} color={video?.accent || '#9333EA'} />
            </div>
            {/* Time badge */}
            <div style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'rgba(0,0,0,0.5)',
              borderRadius: 8,
              padding: '4px 8px',
            }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: '#FFF', fontWeight: 700 }}>{moment.time}</span>
            </div>
            {/* Type badge */}
            <div style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: color,
              borderRadius: 8,
              padding: '4px 9px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              {React.createElement(Icon, { size: 11, color: '#FFF', strokeWidth: 2.5 })}
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: '#FFF', fontWeight: 700, textTransform: 'capitalize' }}>{moment.type}</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '0 20px' }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 19, fontWeight: 800, color: t.text, margin: '0 0 6px' }}>{moment.label}</h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: t.textSub, margin: '0 0 12px', lineHeight: 1.5 }}>{moment.caption}</p>

            {/* Source video */}
            <div style={{
              background: t.surfaceAlt,
              borderRadius: 12,
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}>
              <LI icon="Film" size={16} color={video?.accent || t.primary} />
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: t.textSub, fontWeight: 600 }}>{video?.title}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: t.textMuted }}>{video?.date}</span>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {moment.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 12,
                  fontWeight: 600,
                  color: t.tagText,
                  background: t.tag,
                  padding: '5px 12px',
                  borderRadius: 20,
                }}>#{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={togglePin}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 14,
                  border: `1.5px solid ${isPinned ? t.primary : t.border}`,
                  background: isPinned ? t.primaryLight : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 13,
                  fontWeight: 700,
                  color: isPinned ? t.primary : t.textSub,
                }}
              >
                <LI icon={isPinned ? 'PinOff' : 'Pin'} size={16} color={isPinned ? t.primary : t.textSub} />
                {isPinned ? 'Unpin' : 'Pin'}
              </button>
              <button
                onClick={handleExport}
                style={{
                  flex: 2,
                  padding: '12px',
                  borderRadius: 14,
                  border: 'none',
                  background: exportDone ? '#10B981' : t.primaryGrad,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#FFF',
                  transform: pressedBtn === 'export' ? 'scale(0.97)' : 'scale(1)',
                  transition: 'all 0.15s',
                }}
              >
                <LI icon={exportDone ? 'Check' : 'Share2'} size={16} color="#FFF" />
                {exportDone ? 'Exported!' : 'Export Clip'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Bottom Nav ─────────────────────────────────────────────────────────────
  const NAV_TABS = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'search', icon: 'Search', label: 'Search' },
    { id: 'collections', icon: 'Bookmark', label: 'Library' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  const renderScreen = () => {
    if (selectedVideo) return <VideoDetail video={selectedVideo} />;
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'search') return <SearchScreen />;
    if (activeTab === 'collections') return <CollectionsScreen />;
    if (activeTab === 'settings') return <SettingsScreen />;
    return <HomeScreen />;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#DCDCDC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      {/* Phone */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.3), 0 0 0 12px #222',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Status bar (gradient for home) */}
        <div style={{
          background: t.primaryGrad,
          paddingTop: 4,
          flexShrink: 0,
        }}>
          <StatusBar />
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}

          {/* Moment modal */}
          {selectedMoment && <MomentModal moment={selectedMoment} />}
        </div>

        {/* Bottom Nav */}
        {!selectedMoment && (
          <div style={{
            background: t.navBg,
            borderTop: `1px solid ${t.navBorder}`,
            display: 'flex',
            padding: '8px 0 16px',
            flexShrink: 0,
          }}>
            {NAV_TABS.map(tab => {
              const active = !selectedVideo && activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => { setSelectedVideo(null); setActiveCollection(null); setActiveTab(tab.id); }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    cursor: 'pointer',
                    padding: '4px 0',
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: active ? t.primaryLight : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}>
                    <LI icon={tab.icon} size={20} color={active ? t.primary : t.textMuted} />
                  </div>
                  <span style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 10,
                    fontWeight: active ? 700 : 500,
                    color: active ? t.primary : t.textMuted,
                  }}>{tab.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
