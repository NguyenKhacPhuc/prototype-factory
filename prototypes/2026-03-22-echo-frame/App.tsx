const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: '#0A0A0F',
    surface: '#13131A',
    surfaceAlt: '#1C1C27',
    surfaceHover: '#22222F',
    card: '#181824',
    border: '#2A2A3D',
    borderLight: '#1E1E2E',
    text: '#F0F0FA',
    textSecondary: '#9090B0',
    textMuted: '#5A5A7A',
    primary: '#7C6AF5',
    primaryLight: '#9D8FF8',
    primaryDark: '#5A4FD4',
    primaryGlow: 'rgba(124,106,245,0.25)',
    accent: '#F06FAA',
    accentGlow: 'rgba(240,111,170,0.2)',
    teal: '#4ECDC4',
    amber: '#FFB347',
    green: '#56CFB2',
    red: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #7C6AF5 0%, #F06FAA 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(124,106,245,0.15) 0%, rgba(240,111,170,0.1) 100%)',
  },
  light: {
    bg: '#F2F0FC',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F5FF',
    surfaceHover: '#EEEBFF',
    card: '#FFFFFF',
    border: '#E2DEFF',
    borderLight: '#EDE8FF',
    text: '#1A1830',
    textSecondary: '#6B6899',
    textMuted: '#A09DBF',
    primary: '#6C5CE7',
    primaryLight: '#8B7CF5',
    primaryDark: '#5145C8',
    primaryGlow: 'rgba(108,92,231,0.2)',
    accent: '#E8488A',
    accentGlow: 'rgba(232,72,138,0.15)',
    teal: '#00B5A3',
    amber: '#F09030',
    green: '#00A388',
    red: '#E85454',
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #E8488A 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(108,92,231,0.12) 0%, rgba(232,72,138,0.08) 100%)',
  }
};

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`;

const storyThreads = [
  {
    id: 1,
    title: 'Mia\'s 7th Birthday',
    subtitle: '3 days ago · 48 photos · 6 videos',
    tag: 'Family',
    tagColor: '#F06FAA',
    cover: 'birthday',
    progress: 85,
    missing: false,
    people: ['Mia', 'Jake', 'Mom'],
    highlight: 'Cake moment + 14 hugs captured',
  },
  {
    id: 2,
    title: 'Kitchen Renovation',
    subtitle: 'Ongoing · 134 photos · 22 videos',
    tag: 'Home',
    tagColor: '#4ECDC4',
    cover: 'reno',
    progress: 60,
    missing: true,
    missingNote: 'Missing: final countertop install',
    people: ['You', 'Contractor'],
    highlight: 'Before/after comparison ready',
  },
  {
    id: 3,
    title: 'Barcelona Weekend',
    subtitle: '2 weeks ago · 211 photos · 18 videos',
    tag: 'Travel',
    tagColor: '#FFB347',
    cover: 'travel',
    progress: 100,
    missing: false,
    people: ['Sarah', 'Tom', 'You'],
    highlight: 'Reel ready to share',
  },
  {
    id: 4,
    title: 'Garden Progress',
    subtitle: 'Spring 2026 · 67 photos',
    tag: 'Lifestyle',
    tagColor: '#56CFB2',
    cover: 'garden',
    progress: 45,
    missing: true,
    missingNote: 'Missing: week 4 growth shots',
    people: ['You'],
    highlight: 'Time-lapse sequence detected',
  },
];

const recentMoments = [
  { id: 1, time: 'Today, 9:14 AM', label: 'Morning walk', emoji: '🌅', color: '#FFB347' },
  { id: 2, time: 'Yesterday, 6:30 PM', label: 'Dinner prep', emoji: '🍳', color: '#4ECDC4' },
  { id: 3, time: 'Mar 20, 2:15 PM', label: 'Park visit', emoji: '🌿', color: '#56CFB2' },
  { id: 4, time: 'Mar 19, 11:00 AM', label: 'Mia drawing', emoji: '🎨', color: '#F06FAA' },
];

const coverColors = {
  birthday: ['#F06FAA', '#FF8CC8'],
  reno: ['#4ECDC4', '#2BA8A0'],
  travel: ['#FFB347', '#FF8C00'],
  garden: ['#56CFB2', '#00A388'],
};

const coverEmojis = {
  birthday: '🎂',
  reno: '🔨',
  travel: '✈️',
  garden: '🌱',
};

function StoryCard({ story, theme, onPress }) {
  const [pressed, setPressed] = useState(false);
  const cols = coverColors[story.cover];
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onPress(story); }}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: theme.card,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s ease',
        cursor: 'pointer',
        marginBottom: 14,
      }}
    >
      <div style={{
        height: 110,
        background: `linear-gradient(135deg, ${cols[0]}55 0%, ${cols[1]}33 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{ fontSize: 42 }}>{coverEmojis[story.cover]}</span>
        {story.missing && (
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: theme.amber,
            borderRadius: 8,
            padding: '2px 8px',
            fontSize: 10,
            fontWeight: 700,
            color: '#fff',
          }}>MISSING CHAPTER</div>
        )}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: story.tagColor + '33',
          border: `1px solid ${story.tagColor}55`,
          borderRadius: 8,
          padding: '2px 8px',
          fontSize: 10,
          fontWeight: 600,
          color: story.tagColor,
        }}>{story.tag}</div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: theme.text, marginBottom: 2 }}>{story.title}</div>
        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{story.subtitle}</div>
        <div style={{
          fontSize: 11,
          color: story.tagColor,
          background: story.tagColor + '18',
          borderRadius: 7,
          padding: '4px 8px',
          display: 'inline-block',
          marginBottom: 10,
        }}>{story.highlight}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            flex: 1,
            height: 4,
            background: theme.border,
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${story.progress}%`,
              height: '100%',
              background: story.progress === 100 ? theme.teal : theme.primary,
              borderRadius: 4,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <span style={{ fontSize: 11, color: theme.textMuted, whiteSpace: 'nowrap' }}>{story.progress}% complete</span>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ theme, onStoryPress }) {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 2 }}>{greeting}, Steve</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Your Memories</div>
      </div>

      {/* Missing Chapter Alert */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          background: theme.amber + '15',
          border: `1px solid ${theme.amber}40`,
          borderRadius: 16,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.amber }}>2 missing chapters detected</div>
            <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>Capture now before the story gaps widen</div>
          </div>
          <div style={{
            background: theme.amber,
            borderRadius: 10,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
          }}>View</div>
        </div>
      </div>

      {/* Recent Moments */}
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSecondary, marginBottom: 10, letterSpacing: 0.5 }}>RECENT MOMENTS</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {recentMoments.map(m => (
            <div key={m.id} style={{
              background: m.color + '18',
              border: `1px solid ${m.color}30`,
              borderRadius: 14,
              padding: '10px 14px',
              minWidth: 100,
              flexShrink: 0,
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{m.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{m.label}</div>
              <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{m.time.split(',')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Threads */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.textSecondary, marginBottom: 12, letterSpacing: 0.5 }}>STORY THREADS</div>
        {storyThreads.map(s => (
          <StoryCard key={s.id} story={s} theme={theme} onPress={onStoryPress} />
        ))}
      </div>
    </div>
  );
}

const timelineEvents = [
  { time: 'Day 1 · 9:00 AM', label: 'First photo captured', type: 'photo', emoji: '📸' },
  { time: 'Day 1 · 12:30 PM', label: 'Location tagged: Sagrada Família', type: 'location', emoji: '📍' },
  { time: 'Day 1 · 7:45 PM', label: 'Golden hour burst · 23 photos', type: 'burst', emoji: '🌇' },
  { time: 'Day 2 · 10:15 AM', label: 'New face detected: Tom', type: 'person', emoji: '👤' },
  { time: 'Day 2 · 3:00 PM', label: 'Video highlight · 2m 18s', type: 'video', emoji: '🎥' },
  { time: 'Day 2 · 9:30 PM', label: 'Context prompt answered', type: 'context', emoji: '💬' },
];

function StoriesScreen({ theme, selectedStory, onBack }) {
  const [activeSegment, setActiveSegment] = useState('timeline');
  const story = selectedStory || storyThreads[2];

  const segments = ['timeline', 'reel', 'context'];

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 0' }}>
        {selectedStory && (
          <button
            onClick={onBack}
            style={{
              background: theme.surfaceAlt,
              border: `1px solid ${theme.border}`,
              borderRadius: 10,
              padding: '6px 12px',
              fontSize: 12,
              color: theme.textSecondary,
              cursor: 'pointer',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {React.createElement(window.lucide.ArrowLeft, { size: 14 })} Back
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>{story.title}</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>{story.subtitle}</div>
          </div>
          <div style={{
            background: story.tagColor + '22',
            borderRadius: 10,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 700,
            color: story.tagColor,
          }}>{story.tag}</div>
        </div>
      </div>

      {/* Segment Control */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          display: 'flex',
          background: theme.surfaceAlt,
          borderRadius: 14,
          padding: 3,
          gap: 2,
        }}>
          {segments.map(s => (
            <button
              key={s}
              onClick={() => setActiveSegment(s)}
              style={{
                flex: 1,
                background: activeSegment === s ? theme.primary : 'transparent',
                border: 'none',
                borderRadius: 11,
                padding: '8px 4px',
                fontSize: 12,
                fontWeight: 600,
                color: activeSegment === s ? '#fff' : theme.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {activeSegment === 'timeline' && (
        <div style={{ padding: '16px 20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 19,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, ${theme.primary}80, ${theme.accent}40)`,
              borderRadius: 2,
            }} />
            {timelineEvents.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  background: theme.surfaceAlt,
                  border: `2px solid ${theme.primary}60`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                  zIndex: 1,
                }}>{ev.emoji}</div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{ev.label}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSegment === 'reel' && (
        <div style={{ padding: '16px 20px' }}>
          <div style={{
            background: `linear-gradient(135deg, ${story.tagColor}20, ${theme.primary}15)`,
            border: `1px solid ${story.tagColor}30`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🎬</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>Reel Ready</div>
            <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 4 }}>47 best moments · 2m 34s</div>
            <div style={{
              marginTop: 14,
              background: story.tagColor,
              borderRadius: 12,
              padding: '10px 0',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer',
            }}>▶ Preview Reel</div>
          </div>
          {['Birthday highlights · 0:42', 'Cake moment · 0:18', 'Group hug · 0:24', 'Gift opening · 1:10'].map((clip, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: theme.surfaceAlt,
              borderRadius: 14,
              marginBottom: 8,
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{
                width: 44,
                height: 44,
                background: story.tagColor + '22',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>🎥</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{clip.split(' · ')[0]}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{clip.split(' · ')[1]}</div>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textMuted })}
            </div>
          ))}
        </div>
      )}

      {activeSegment === 'context' && (
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 14 }}>
            Echo Frame asks lightweight questions to help make your memories richer and more searchable.
          </div>
          {[
            { q: 'Who was at the party?', a: 'Mia, Jake, Mom, Grandma Rose, + 8 friends', done: true },
            { q: 'Where was this taken?', a: 'Our backyard · 42 Maple Lane', done: true },
            { q: 'What was the occasion?', a: 'Mia\'s 7th birthday', done: true },
            { q: 'Why does this moment matter?', a: null, done: false },
            { q: 'Any special memories to note?', a: null, done: false },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.done ? theme.surfaceAlt : theme.primary + '12',
              border: `1px solid ${item.done ? theme.border : theme.primary + '40'}`,
              borderRadius: 14,
              padding: '12px 14px',
              marginBottom: 10,
            }}>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Q {i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: item.a ? 6 : 10 }}>{item.q}</div>
              {item.a ? (
                <div style={{ fontSize: 13, color: theme.primary }}>{item.a}</div>
              ) : (
                <div style={{
                  background: theme.primary,
                  borderRadius: 10,
                  padding: '7px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}>+ Add context</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CaptureScreen({ theme }) {
  const [captureMode, setCaptureMode] = useState('photo');
  const [detecting, setDetecting] = useState(true);
  const [tagSuggestions] = useState(['Mia', 'Kitchen', 'Renovation', 'Home']);

  useEffect(() => {
    const t = setTimeout(() => setDetecting(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Capture</div>
        <div style={{ fontSize: 13, color: theme.textMuted }}>Smart moment detection active</div>
      </div>

      {/* Viewfinder Mock */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          height: 260,
          background: `linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)`,
          border: `1px solid ${theme.border}`,
        }}>
          {/* Simulated scene */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', opacity: 0.4 }}>
              <div style={{ fontSize: 48 }}>🏠</div>
              <div style={{ fontSize: 12, color: '#fff', marginTop: 8 }}>Kitchen Renovation Scene</div>
            </div>
          </div>

          {/* Detection overlay */}
          {detecting ? (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                border: `2px solid ${theme.primary}`,
                borderRadius: 12,
                padding: '8px 16px',
                background: 'rgba(0,0,0,0.6)',
                fontSize: 12,
                color: theme.primary,
                fontWeight: 600,
              }}>Analyzing scene...</div>
            </div>
          ) : (
            <>
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'rgba(0,0,0,0.7)',
                borderRadius: 10,
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.teal }} />
                <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>Story detected</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                background: 'rgba(0,0,0,0.7)',
                borderRadius: 12,
                padding: '8px 12px',
              }}>
                <div style={{ fontSize: 11, color: theme.teal, fontWeight: 600 }}>MATCHES: Kitchen Renovation</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>This photo will auto-join your ongoing story thread</div>
              </div>
            </>
          )}

          {/* Corner guides */}
          {[
            { top: 12, left: 12, borderTop: true, borderLeft: true },
            { top: 12, right: 12, borderTop: true, borderRight: true },
            { bottom: 12, left: 12, borderBottom: true, borderLeft: true },
            { bottom: 12, right: 12, borderBottom: true, borderRight: true },
          ].map((c, i) => {
            const style: any = {
              position: 'absolute',
              width: 20,
              height: 20,
            };
            if (c.top !== undefined) style.top = c.top;
            if (c.bottom !== undefined) style.bottom = c.bottom;
            if (c.left !== undefined) style.left = c.left;
            if (c.right !== undefined) style.right = c.right;
            if (c.borderTop) style.borderTop = `2px solid ${theme.primary}`;
            if (c.borderBottom) style.borderBottom = `2px solid ${theme.primary}`;
            if (c.borderLeft) style.borderLeft = `2px solid ${theme.primary}`;
            if (c.borderRight) style.borderRight = `2px solid ${theme.primary}`;
            return <div key={i} style={style} />;
          })}
        </div>
      </div>

      {/* Mode Toggle */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'flex',
          background: theme.surfaceAlt,
          borderRadius: 14,
          padding: 3,
          gap: 2,
        }}>
          {['photo', 'video', 'burst'].map(m => (
            <button
              key={m}
              onClick={() => setCaptureMode(m)}
              style={{
                flex: 1,
                background: captureMode === m ? theme.primary : 'transparent',
                border: 'none',
                borderRadius: 11,
                padding: '8px 4px',
                fontSize: 12,
                fontWeight: 600,
                color: captureMode === m ? '#fff' : theme.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >{m}</button>
          ))}
        </div>
      </div>

      {/* Smart Tags */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8, fontWeight: 600 }}>SMART TAGS DETECTED</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tagSuggestions.map((tag, i) => (
            <div key={i} style={{
              background: theme.primary + '20',
              border: `1px solid ${theme.primary}40`,
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              color: theme.primaryLight,
            }}># {tag}</div>
          ))}
        </div>
      </div>

      {/* Context Prompt */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: theme.surfaceAlt,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: '14px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.primary, marginBottom: 6 }}>QUICK CONTEXT</div>
          <div style={{ fontSize: 14, color: theme.text, marginBottom: 12 }}>What just changed in the renovation?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Countertops installed', 'Paint finished', 'Cabinets updated', 'Other'].map((opt, i) => (
              <div key={i} style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                padding: '6px 12px',
                fontSize: 12,
                color: theme.textSecondary,
                cursor: 'pointer',
              }}>{opt}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchiveScreen({ theme }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'family', 'travel', 'home', 'work'];

  const allItems = [
    { emoji: '🎂', title: "Mia's 7th Birthday", count: 54, date: 'Mar 19', color: '#F06FAA' },
    { emoji: '✈️', title: 'Barcelona Trip', count: 229, date: 'Mar 5', color: '#FFB347' },
    { emoji: '🔨', title: 'Kitchen Reno', count: 156, date: 'Ongoing', color: '#4ECDC4' },
    { emoji: '🌱', title: 'Garden Spring', count: 67, date: 'Ongoing', color: '#56CFB2' },
    { emoji: '🎄', title: 'Christmas 2025', count: 198, date: 'Dec 25', color: '#FF6B6B' },
    { emoji: '🏖️', title: 'Summer Vacation', count: 312, date: 'Aug 14', color: '#7C6AF5' },
    { emoji: '🎓', title: 'Graduation Day', count: 87, date: 'Jun 10', color: '#F06FAA' },
    { emoji: '🐶', title: 'Max First Week', count: 45, date: 'May 2', color: '#FFB347' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Archive</div>
        <div style={{ fontSize: 13, color: theme.textMuted }}>All your memory threads</div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: theme.surfaceAlt,
          border: `1px solid ${theme.border}`,
          borderRadius: 14,
          padding: '10px 14px',
        }}>
          {React.createElement(window.lucide.Search, { size: 16, color: theme.textMuted })}
          <span style={{ fontSize: 13, color: theme.textMuted }}>Search memories...</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? theme.primary : theme.surfaceAlt,
                border: `1px solid ${filter === f ? theme.primary : theme.border}`,
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                color: filter === f ? '#fff' : theme.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {allItems.map((item, i) => (
            <div key={i} style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: 18,
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              <div style={{
                height: 80,
                background: `linear-gradient(135deg, ${item.color}30, ${item.color}15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}>{item.emoji}</div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: theme.textMuted }}>{item.count} media · {item.date}</div>
                <div style={{ marginTop: 6, height: 3, background: theme.border, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: item.color + 'AA', borderRadius: 2 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ theme, isDark, onToggleTheme }) {
  const [notifs, setNotifs] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [smartPrompts, setSmartPrompts] = useState(true);
  const [backupOn, setBackupOn] = useState(false);

  function Toggle({ val, onToggle, col }) {
    return (
      <div
        onClick={onToggle}
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          background: val ? (col || theme.primary) : theme.border,
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.25s ease',
          flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 3,
          left: val ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.25s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </div>
    );
  }

  function SettingsRow({ label, sub, val, onToggle, col }) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderBottom: `1px solid ${theme.borderLight}`,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 1 }}>{sub}</div>}
        </div>
        <Toggle val={val} onToggle={onToggle} col={col} />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
      <div style={{ padding: '16px 20px 16px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>Settings</div>
      </div>

      {/* Profile Card */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: theme.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>Steve Johnson</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>steve@example.com</div>
            <div style={{ fontSize: 11, color: theme.primary, marginTop: 4 }}>1,247 photos · 134 videos</div>
          </div>
          {React.createElement(window.lucide.ChevronRight, { size: 18, color: theme.textMuted })}
        </div>
      </div>

      {/* Theme Toggle Section */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px 8px',
            fontSize: 11,
            fontWeight: 700,
            color: theme.textMuted,
            letterSpacing: 0.8,
            borderBottom: `1px solid ${theme.borderLight}`,
          }}>APPEARANCE</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{isDark ? '🌙' : '☀️'}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>Switch visual theme</div>
              </div>
            </div>
            <div
              onClick={onToggleTheme}
              style={{
                width: 44,
                height: 26,
                borderRadius: 13,
                background: isDark ? theme.primary : theme.border,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.25s ease',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 3,
                left: isDark ? 21 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.25s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Smart Features */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px 8px',
            fontSize: 11,
            fontWeight: 700,
            color: theme.textMuted,
            letterSpacing: 0.8,
            borderBottom: `1px solid ${theme.borderLight}`,
          }}>SMART FEATURES</div>
          <SettingsRow label="Story Auto-Detection" sub="Automatically group photos into threads" val={autoDetect} onToggle={() => setAutoDetect(v => !v)} />
          <SettingsRow label="Smart Prompts" sub="Ask context questions at capture time" val={smartPrompts} onToggle={() => setSmartPrompts(v => !v)} />
          <SettingsRow label="Missing Chapter Alerts" sub="Notify when story gaps are detected" val={notifs} onToggle={() => setNotifs(v => !v)} />
          <SettingsRow label="Cloud Backup" sub="Sync memories to Echo Cloud" val={backupOn} onToggle={() => setBackupOn(v => !v)} col={theme.teal} />
        </div>
      </div>

      {/* Storage */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          padding: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 10 }}>Storage Used</div>
          <div style={{ height: 6, background: theme.border, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: '68%', height: '100%', background: theme.gradient, borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: theme.textMuted }}>4.7 GB used</span>
            <span style={{ fontSize: 12, color: theme.textSecondary }}>7 GB total</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{
          textAlign: 'center',
          fontSize: 11,
          color: theme.textMuted,
          padding: '8px 0',
        }}>Echo Frame v1.0.0 · Made with ♥</div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  const theme = isDark ? themes.dark : themes.light;

  const handleStoryPress = (story) => {
    setSelectedStory(story);
    setActiveTab('stories');
  };

  const handleBack = () => {
    setSelectedStory(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{fontLink}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        transition: 'background 0.3s ease',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          background: '#000',
          borderRadius: 20,
          zIndex: 100,
        }} />

        {/* Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 28px 8px',
          paddingTop: 54,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 14, color: theme.textSecondary })}
            {React.createElement(window.lucide.Signal, { size: 14, color: theme.textSecondary })}
            {React.createElement(window.lucide.Battery, { size: 14, color: theme.textSecondary })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
          {activeTab === 'home' && <HomeScreen theme={theme} onStoryPress={handleStoryPress} />}
          {activeTab === 'capture' && <CaptureScreen theme={theme} />}
          {activeTab === 'stories' && <StoriesScreen theme={theme} selectedStory={selectedStory} onBack={handleBack} />}
          {activeTab === 'archive' && <ArchiveScreen theme={theme} />}
          {activeTab === 'settings' && <SettingsScreen theme={theme} isDark={isDark} onToggleTheme={() => setIsDark(v => !v)} />}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0 20px',
          borderTop: `1px solid ${theme.border}`,
          background: theme.surface,
          flexShrink: 0,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '2px 16px',
            }}
          >
            {React.createElement(window.lucide.Home, { size: 22, color: activeTab === 'home' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'home' ? theme.primary : theme.textMuted }}>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('capture')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '2px 16px',
            }}
          >
            {React.createElement(window.lucide.Camera, { size: 22, color: activeTab === 'capture' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'capture' ? theme.primary : theme.textMuted }}>Capture</span>
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '2px 16px',
            }}
          >
            {React.createElement(window.lucide.Film, { size: 22, color: activeTab === 'stories' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'stories' ? theme.primary : theme.textMuted }}>Stories</span>
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '2px 16px',
            }}
          >
            {React.createElement(window.lucide.Archive, { size: 22, color: activeTab === 'archive' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'archive' ? theme.primary : theme.textMuted }}>Archive</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '2px 16px',
            }}
          >
            {React.createElement(window.lucide.Settings, { size: 22, color: activeTab === 'settings' ? theme.primary : theme.textMuted })}
            <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === 'settings' ? theme.primary : theme.textMuted }}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
