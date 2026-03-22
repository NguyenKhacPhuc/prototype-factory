const { useState, useEffect, useRef, createContext, useContext } = React;

const AppContext = createContext(null);

const themes = {
  dark: {
    bg: '#070C12',
    surface: '#0D1A26',
    surface2: '#132234',
    surface3: '#1A2E42',
    border: '#1E3248',
    borderLight: '#243D58',
    text: '#E2EEF8',
    textSec: '#6B9AB8',
    textMuted: '#3A5F7A',
    primary: '#0FD9B8',
    primaryDim: 'rgba(15,217,184,0.1)',
    primarySolid: 'rgba(15,217,184,0.18)',
    accent: '#FF6B4A',
    blue: '#4D94FF',
    purple: '#A87EFF',
    yellow: '#FFB830',
    navBg: '#050A0F',
    inputBg: '#0D1A26',
  },
  light: {
    bg: '#ECF2F8',
    surface: '#FFFFFF',
    surface2: '#F2F7FB',
    surface3: '#E5EEF5',
    border: '#CDDCE8',
    borderLight: '#B8CEDF',
    text: '#0A1C2C',
    textSec: '#3D6880',
    textMuted: '#8AAEC4',
    primary: '#0ABBA0',
    primaryDim: 'rgba(10,187,160,0.08)',
    primarySolid: 'rgba(10,187,160,0.16)',
    accent: '#FF6B4A',
    blue: '#2B74E8',
    purple: '#7B5CE5',
    yellow: '#E8A020',
    navBg: '#FFFFFF',
    inputBg: '#F2F7FB',
  },
};

const VIDEOS = [
  {
    id: 1, title: "Maya's 7th Birthday", duration: '1:24:38', date: 'Mar 18',
    tags: 12, folder: 'Family', thumb: '#FF6B4A',
    markers: [
      { pos: 0.08, type: 'scene' }, { pos: 0.22, type: 'voice' }, { pos: 0.38, type: 'auto' },
      { pos: 0.52, type: 'face' }, { pos: 0.65, type: 'voice' }, { pos: 0.79, type: 'auto' }, { pos: 0.91, type: 'scene' },
    ],
  },
  {
    id: 2, title: 'Q1 Product Demo Recording', duration: '0:47:12', date: 'Mar 15',
    tags: 8, folder: 'Work', thumb: '#4D94FF',
    markers: [
      { pos: 0.14, type: 'auto' }, { pos: 0.34, type: 'voice' }, { pos: 0.52, type: 'scene' },
      { pos: 0.68, type: 'auto' }, { pos: 0.85, type: 'voice' },
    ],
  },
  {
    id: 3, title: 'Tokyo Travel — Day 3', duration: '2:10:05', date: 'Mar 10',
    tags: 21, folder: 'Travel', thumb: '#A87EFF',
    markers: [
      { pos: 0.07, type: 'scene' }, { pos: 0.19, type: 'auto' }, { pos: 0.31, type: 'voice' },
      { pos: 0.44, type: 'face' }, { pos: 0.57, type: 'auto' }, { pos: 0.68, type: 'scene' }, { pos: 0.81, type: 'voice' },
    ],
  },
  {
    id: 4, title: 'CS301 Lecture — Algorithms', duration: '0:52:44', date: 'Mar 8',
    tags: 6, folder: 'Classes', thumb: '#0FD9B8',
    markers: [
      { pos: 0.14, type: 'auto' }, { pos: 0.38, type: 'voice' }, { pos: 0.56, type: 'auto' }, { pos: 0.77, type: 'scene' },
    ],
  },
];

const SEARCH_SUGGESTIONS = [
  'where the cake nearly fell',
  'the slide about revenue growth',
  'when Maya opened the big present',
  'product demo failure moment',
  'sunset at the temple',
];

const SEARCH_RESULTS = [
  { id: 1, video: "Maya's 7th Birthday", time: '0:38:14', snippet: 'Candles being lit on birthday cake — scene detected', type: 'auto', score: 0.97, thumb: '#FF6B4A' },
  { id: 2, video: "Maya's 7th Birthday", time: '0:40:52', snippet: 'Maya leans toward cake, blowing motion detected', type: 'face', score: 0.94, thumb: '#FF6B4A' },
  { id: 3, video: 'Family Dinner Dec', time: '0:14:33', snippet: 'Birthday song audio detected in background', type: 'auto', score: 0.78, thumb: '#FFB830' },
];

const HIGHLIGHTS = [
  { id: 1, title: "Maya's Big Moments", source: "Maya's 7th Birthday", clips: 5, dur: '3:42', color: '#FF6B4A', ago: '2h ago', auto: true },
  { id: 2, title: 'Demo Day Key Moments', source: 'Q1 Product Demo', clips: 4, dur: '2:15', color: '#4D94FF', ago: 'Yesterday', auto: true },
  { id: 3, title: 'Tokyo Best Bites & Views', source: 'Tokyo Travel — Day 3', clips: 8, dur: '5:30', color: '#A87EFF', ago: 'Mar 11', auto: false },
  { id: 4, title: 'Algorithm Concepts', source: 'CS301 Lecture', clips: 3, dur: '1:48', color: '#0FD9B8', ago: 'Mar 9', auto: false },
];

const FOLDERS = [
  { name: 'Family', count: 24, size: '12.4 GB', color: '#FF6B4A', emoji: '🏠' },
  { name: 'Work', count: 18, size: '8.2 GB', color: '#4D94FF', emoji: '💼' },
  { name: 'Travel', count: 31, size: '22.1 GB', color: '#A87EFF', emoji: '✈️' },
  { name: 'Classes', count: 12, size: '6.8 GB', color: '#0FD9B8', emoji: '📚' },
  { name: 'Events', count: 9, size: '4.3 GB', color: '#FFB830', emoji: '🎉' },
];

const LIVE_DETECTIONS = [
  { label: 'Scene change detected', type: 'auto', time: '00:08' },
  { label: 'Text: "Happy Birthday" on screen', type: 'auto', time: '00:23' },
  { label: 'Face recognized — 3 people', type: 'face', time: '00:41' },
  { label: 'Voice note anchored at timestamp', type: 'voice', time: '01:05' },
];

const MC = { auto: '#0FD9B8', voice: '#FF6B4A', scene: '#4D94FF', face: '#A87EFF' };
const getMarkerColor = (type) => MC[type] || MC.auto;

// ======= SCREENS (defined outside App to prevent remounting) =======

function HomeScreen() {
  const { t, isDark, expandedVideo, setExpandedVideo, setActiveTab } = useContext(AppContext);

  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: t.primary, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FrameTrace</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text, marginTop: 1, lineHeight: 1.2 }}>Memories</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Bell, { size: 15, color: t.textSec })}
          </div>
          <div onClick={() => setActiveTab('capture')} style={{ width: 36, height: 36, borderRadius: 18, background: t.primaryDim, border: `1px solid ${t.primary}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Plus, { size: 15, color: t.primary })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 14px', overflowX: 'auto' }}>
        {[
          { label: 'Videos', value: '94', icon: window.lucide.Video, color: '#0FD9B8' },
          { label: 'Tagged', value: '847', icon: window.lucide.Tag, color: '#FF6B4A' },
          { label: 'Reels', value: '12', icon: window.lucide.Film, color: '#A87EFF' },
          { label: 'Storage', value: '53GB', icon: window.lucide.HardDrive, color: '#4D94FF' },
        ].map((s) => (
          <div key={s.label} style={{ flex: '0 0 auto', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {React.createElement(s.icon, { size: 13, color: s.color })}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-tag banner */}
      <div style={{ margin: '0 20px 14px', background: `linear-gradient(135deg, ${t.primary}15, ${t.blue}10)`, border: `1px solid ${t.primary}30`, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {React.createElement(window.lucide.Sparkles, { size: 14, color: t.primary })}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>3 new moments tagged overnight</div>
          <div style={{ fontSize: 11, color: t.textMuted }}>Auto-detection ran on Maya's Birthday video</div>
        </div>
        {React.createElement(window.lucide.ChevronRight, { size: 14, color: t.primary })}
      </div>

      {/* Recent Videos header */}
      <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Recent Videos</div>
        <div style={{ fontSize: 12, color: t.primary, fontWeight: 600, cursor: 'pointer' }}>View all</div>
      </div>

      {/* Video Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            onClick={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
            style={{ background: t.surface, border: `1.5px solid ${expandedVideo === video.id ? t.primary + '50' : t.border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <div style={{ display: 'flex', gap: 12, padding: '12px 14px' }}>
              {/* Thumb */}
              <div style={{ width: 60, height: 46, borderRadius: 10, background: `linear-gradient(135deg, ${video.thumb}28, ${video.thumb}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${video.thumb}35` }}>
                {React.createElement(window.lucide.Play, { size: 16, color: video.thumb, fill: video.thumb })}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{video.title}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, color: t.textMuted }}>{video.date}</span>
                  <span style={{ fontSize: 10, color: t.textMuted }}>·</span>
                  <span style={{ fontSize: 10, color: t.textMuted }}>{video.duration}</span>
                  <span style={{ fontSize: 10, color: t.textMuted }}>·</span>
                  <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>{video.tags} tags</span>
                </div>
                <div style={{ display: 'inline-block', marginTop: 5, fontSize: 10, fontWeight: 700, color: video.thumb, background: `${video.thumb}18`, borderRadius: 6, padding: '2px 7px', letterSpacing: '0.04em' }}>{video.folder}</div>
              </div>
              <div style={{ color: t.textMuted, transition: 'transform 0.2s', transform: expandedVideo === video.id ? 'rotate(180deg)' : 'none', alignSelf: 'center' }}>
                {React.createElement(window.lucide.ChevronDown, { size: 15 })}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ padding: '0 14px 12px' }}>
              <div style={{ height: 4, background: t.surface3, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '35%', background: `linear-gradient(90deg, ${video.thumb}70, ${video.thumb}20)`, borderRadius: 2 }} />
                {video.markers.map((m, i) => (
                  <div key={i} style={{ position: 'absolute', width: 8, height: 8, borderRadius: 4, background: getMarkerColor(m.type), border: `2px solid ${isDark ? '#070C12' : '#ECF2F8'}`, top: '50%', transform: 'translateY(-50%)', left: `calc(${m.pos * 100}% - 4px)` }} />
                ))}
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', gap: 10, marginTop: 7 }}>
                {Object.entries(MC).map(([type, color]) => {
                  const count = video.markers.filter((m) => m.type === type).length;
                  if (!count) return null;
                  const labels = { auto: 'Auto', voice: 'Voice', scene: 'Scene', face: 'Faces' };
                  return (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: color }} />
                      <span style={{ fontSize: 10, color: t.textMuted }}>{labels[type]} {count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expanded actions */}
            {expandedVideo === video.id && (
              <div style={{ borderTop: `1px solid ${t.border}`, padding: '10px 12px', display: 'flex', gap: 8 }}>
                {[
                  { icon: window.lucide.Search, label: 'Search' },
                  { icon: window.lucide.Film, label: 'Make Reel' },
                  { icon: window.lucide.Share2, label: 'Share' },
                  { icon: window.lucide.Edit3, label: 'Edit Tags' },
                ].map((a) => (
                  <div key={a.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 4px', background: t.surface2, borderRadius: 10, cursor: 'pointer' }}>
                    {React.createElement(a.icon, { size: 13, color: t.primary })}
                    <span style={{ fontSize: 10, color: t.textSec, fontWeight: 500 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchScreen() {
  const { t, searchQuery, setSearchQuery, showResults, setShowResults, filterType, setFilterType } = useContext(AppContext);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Search</div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2, marginBottom: 14 }}>Find any moment with natural language</div>
      </div>

      {/* Search input */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: t.surface, border: `1.5px solid ${showResults ? t.primary : t.border}`, borderRadius: 14, padding: '10px 14px', transition: 'border-color 0.2s' }}>
          {React.createElement(window.lucide.Search, { size: 15, color: showResults ? t.primary : t.textMuted })}
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => e.key === 'Enter' && setShowResults(true)}
            placeholder='e.g. "where the cake nearly fell"'
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: t.text, fontFamily: "'Space Grotesk', sans-serif" }}
          />
          {searchQuery ? (
            <div onClick={() => { setSearchQuery(''); setShowResults(false); }} style={{ cursor: 'pointer' }}>
              {React.createElement(window.lucide.X, { size: 13, color: t.textMuted })}
            </div>
          ) : (
            <div style={{ width: 28, height: 28, borderRadius: 8, background: t.primaryDim, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {React.createElement(window.lucide.Mic, { size: 13, color: t.primary })}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 7, padding: '0 20px 14px', overflowX: 'auto' }}>
        {['all', 'auto', 'voice', 'face', 'scene'].map((f) => (
          <div key={f} onClick={() => setFilterType(f)} style={{ flex: '0 0 auto', padding: '6px 14px', borderRadius: 20, background: filterType === f ? t.primary : t.surface, border: `1px solid ${filterType === f ? t.primary : t.border}`, color: filterType === f ? (f === 'all' ? '#fff' : '#fff') : t.textSec, fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' }}>
            {f === 'all' ? 'All Types' : f}
          </div>
        ))}
      </div>

      {!showResults ? (
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Try searching for</div>
          {SEARCH_SUGGESTIONS.map((s, i) => (
            <div key={i} onClick={() => { setSearchQuery(s); setShowResults(true); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, marginBottom: 8, cursor: 'pointer' }}>
              {React.createElement(window.lucide.Sparkles, { size: 13, color: t.primary })}
              <span style={{ flex: 1, fontSize: 13, color: t.text }}>"{s}"</span>
              {React.createElement(window.lucide.ArrowUpRight, { size: 13, color: t.textMuted })}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{SEARCH_RESULTS.length} Results for "{searchQuery || 'birthday cake'}"</div>
          {SEARCH_RESULTS.map((r) => (
            <div key={r.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, marginBottom: 10, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 11, padding: '12px' }}>
                <div style={{ width: 72, height: 52, borderRadius: 8, background: `linear-gradient(135deg, ${r.thumb}28, ${r.thumb}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                  {React.createElement(window.lucide.Play, { size: 15, color: r.thumb, fill: r.thumb })}
                  <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', borderRadius: 4, padding: '1px 5px', fontSize: 9, color: '#fff', fontWeight: 700 }}>{r.time}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: t.text, fontWeight: 500, marginBottom: 3, lineHeight: 1.4 }}>{r.snippet}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{r.video}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <div style={{ padding: '2px 8px', borderRadius: 6, background: `${getMarkerColor(r.type)}18`, fontSize: 10, fontWeight: 700, color: getMarkerColor(r.type), textTransform: 'capitalize' }}>{r.type}</div>
                    <div style={{ padding: '2px 8px', borderRadius: 6, background: t.surface3, fontSize: 10, color: t.textSec, fontWeight: 500 }}>{Math.round(r.score * 100)}% match</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ background: t.primaryDim, border: `1px solid ${t.primary}28`, borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            {React.createElement(window.lucide.Sparkles, { size: 13, color: t.primary, style: { marginTop: 1, flexShrink: 0 } })}
            <div style={{ fontSize: 12, color: t.textSec, lineHeight: 1.55 }}>FrameTrace matched visual scenes and audio cues across all tagged videos. Showing highest confidence results.</div>
          </div>
        </div>
      )}
    </div>
  );
}

function CaptureScreen() {
  const { t, isDark, recording, setRecording, recTime, fmtTime, liveTagIndex } = useContext(AppContext);
  const [pressedTag, setPressedTag] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Viewfinder */}
      <div style={{ flex: 1, background: 'linear-gradient(180deg, #060E1A 0%, #030810 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '33.3% 33.3%' }} />

        {/* Top controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[window.lucide.Zap, window.lucide.SunMedium].map((Icon, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {React.createElement(Icon, { size: 14, color: 'rgba(255,255,255,0.7)' })}
              </div>
            ))}
          </div>
          {recording ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(220,40,40,0.2)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '5px 13px', border: '1px solid rgba(220,40,40,0.45)' }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: '#FF3A3A' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>REC {fmtTime(recTime)}</span>
            </div>
          ) : (
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>READY</div>
          )}
          <div style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Settings2, { size: 14, color: 'rgba(255,255,255,0.7)' })}
          </div>
        </div>

        {/* Live detection banner */}
        {recording && (
          <div style={{ position: 'absolute', top: 58, left: 12, right: 12, zIndex: 3, transition: 'all 0.3s' }}>
            <div style={{ background: 'rgba(5,10,18,0.75)', backdropFilter: 'blur(12px)', border: `1px solid ${t.primary}45`, borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {React.createElement(window.lucide.Eye, { size: 11, color: t.primary })}
              <span style={{ fontSize: 11, color: t.primary, fontWeight: 700 }}>AUTO TAG: </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', flex: 1 }}>{LIVE_DETECTIONS[liveTagIndex % LIVE_DETECTIONS.length].label}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{LIVE_DETECTIONS[liveTagIndex % LIVE_DETECTIONS.length].time}</span>
            </div>
          </div>
        )}

        {/* Focus brackets */}
        {!recording && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 66, height: 66, position: 'relative' }}>
              {[{ top: -2, left: -2, borderRight: 'none', borderBottom: 'none' }, { top: -2, right: -2, borderLeft: 'none', borderBottom: 'none' }, { bottom: -2, left: -2, borderRight: 'none', borderTop: 'none' }, { bottom: -2, right: -2, borderLeft: 'none', borderTop: 'none' }].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 14, height: 14, border: `2px solid ${t.primary}`, borderRadius: 2, ...s }} />
              ))}
            </div>
          </div>
        )}

        {/* Live tag strip */}
        {recording && (
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, zIndex: 2 }}>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, position: 'relative' }}>
              {LIVE_DETECTIONS.slice(0, (liveTagIndex % LIVE_DETECTIONS.length) + 1).map((tag, i, arr) => (
                <div key={i} style={{ position: 'absolute', width: 9, height: 9, borderRadius: 5, background: getMarkerColor(tag.type), border: '2px solid rgba(3,8,16,0.9)', top: '50%', transform: 'translateY(-50%)', left: `${(i / (arr.length + 1)) * 85 + 5}%` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div style={{ background: '#040810', padding: '14px 24px 6px' }}>
        {/* Quick tag buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 14 }}>
          {[
            { icon: window.lucide.Mic, label: 'Voice Note', color: '#FF6B4A' },
            { icon: window.lucide.Tag, label: 'Quick Tag', color: '#4D94FF' },
            { icon: window.lucide.Bookmark, label: 'Bookmark', color: '#A87EFF' },
            { icon: window.lucide.Flag, label: 'Flag', color: '#FFB830' },
          ].map((btn) => (
            <div
              key={btn.label}
              onMouseDown={() => setPressedTag(btn.label)}
              onMouseUp={() => setPressedTag(null)}
              onMouseLeave={() => setPressedTag(null)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', transform: pressedTag === btn.label ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${btn.color}20`, border: `1px solid ${btn.color}45`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(btn.icon, { size: 16, color: btn.color })}
              </div>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{btn.label}</span>
            </div>
          ))}
        </div>

        {/* Record row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
          <div style={{ width: 42, height: 42, borderRadius: 21, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.Image, { size: 18, color: 'rgba(255,255,255,0.5)' })}
          </div>

          <div onClick={() => setRecording(!recording)} style={{ width: 70, height: 70, borderRadius: 35, background: recording ? '#CC2C2C' : t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: recording ? '0 0 28px rgba(220,44,44,0.55)' : `0 0 28px ${t.primary}55`, transition: 'all 0.25s' }}>
            <div style={{ width: recording ? 24 : 30, height: recording ? 24 : 30, borderRadius: recording ? 5 : 15, background: '#fff', transition: 'all 0.25s' }} />
          </div>

          <div style={{ width: 42, height: 42, borderRadius: 21, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {React.createElement(window.lucide.RotateCcw, { size: 18, color: 'rgba(255,255,255,0.5)' })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReelsScreen() {
  const { t } = useContext(AppContext);
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let iv;
    if (playingId) {
      iv = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.8)), 80);
    } else {
      setProgress(0);
    }
    return () => clearInterval(iv);
  }, [playingId]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Highlight Reels</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>Auto-generated from your best moments</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: t.primaryDim, border: `1px solid ${t.primary}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {React.createElement(window.lucide.Sparkles, { size: 15, color: t.primary })}
        </div>
      </div>

      {/* Featured */}
      <div style={{ margin: '0 20px 16px', background: `linear-gradient(145deg, ${HIGHLIGHTS[0].color}15, ${HIGHLIGHTS[0].color}05)`, border: `1px solid ${HIGHLIGHTS[0].color}35`, borderRadius: 18, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setPlayingId(playingId === 1 ? null : 1)}>
        <div style={{ height: 145, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: `linear-gradient(160deg, ${HIGHLIGHTS[0].color}12, #00000040)` }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: playingId === 1 ? `${t.accent}CC` : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${playingId === 1 ? t.accent : 'rgba(255,255,255,0.2)'}`, transition: 'all 0.2s' }}>
            {playingId === 1
              ? React.createElement(window.lucide.Pause, { size: 22, color: '#fff' })
              : React.createElement(window.lucide.Play, { size: 22, color: '#fff', fill: '#fff' })}
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>FEATURED</div>
          <div style={{ position: 'absolute', top: 10, left: 10, background: `${HIGHLIGHTS[0].color}35`, backdropFilter: 'blur(6px)', borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: HIGHLIGHTS[0].color, border: `1px solid ${HIGHLIGHTS[0].color}50` }}>AUTO</div>
          {playingId === 1 && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: t.accent, borderRadius: 2, transition: 'width 0.08s linear' }} />
            </div>
          )}
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{HIGHLIGHTS[0].title}</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>From: {HIGHLIGHTS[0].source}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: t.textSec }}>{HIGHLIGHTS[0].clips} clips</span>
            <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
            <span style={{ fontSize: 11, color: t.textSec }}>{HIGHLIGHTS[0].dur}</span>
            <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>{HIGHLIGHTS[0].ago}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 10px', fontSize: 13, fontWeight: 600, color: t.text }}>All Reels</div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {HIGHLIGHTS.slice(1).map((h) => (
          <div key={h.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, display: 'flex', gap: 12, padding: '11px 13px', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${h.color}22, ${h.color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${h.color}28` }}>
              {React.createElement(window.lucide.Play, { size: 17, color: h.color, fill: h.color })}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{h.source}</div>
              <div style={{ display: 'flex', gap: 7, marginTop: 5, alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: t.textSec }}>{h.clips} clips · {h.dur}</span>
                {h.auto && <span style={{ fontSize: 9, fontWeight: 700, color: t.primary, background: t.primaryDim, padding: '2px 7px', borderRadius: 5, letterSpacing: '0.04em' }}>AUTO</span>}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {React.createElement(window.lucide.Share2, { size: 13, color: t.textMuted, style: { cursor: 'pointer' } })}
              {React.createElement(window.lucide.MoreHorizontal, { size: 13, color: t.textMuted, style: { cursor: 'pointer' } })}
            </div>
          </div>
        ))}
      </div>

      {/* Generate CTA */}
      <div style={{ margin: '14px 20px 0', background: `linear-gradient(135deg, ${t.primary}12, ${t.blue}08)`, border: `1px solid ${t.primary}28`, borderRadius: 14, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        {React.createElement(window.lucide.Wand2, { size: 17, color: t.primary })}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Generate New Reel</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Pick any video or folder</div>
        </div>
        {React.createElement(window.lucide.ArrowRight, { size: 15, color: t.primary })}
      </div>
    </div>
  );
}

function LibraryScreen() {
  const { t, isDark, setIsDark } = useContext(AppContext);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
      <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Library</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>94 videos · 53.8 GB used</div>
        </div>
        {/* Theme Toggle */}
        <div onClick={() => setIsDark(!isDark)} style={{ width: 52, height: 28, borderRadius: 14, background: t.surface3, border: `1px solid ${t.border}`, position: 'relative', cursor: 'pointer', padding: '0 3px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: isDark ? t.primary : '#FFB830', position: 'absolute', left: isDark ? 27 : 3, transition: 'left 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            {isDark
              ? React.createElement(window.lucide.Moon, { size: 11, color: '#070C12' })
              : React.createElement(window.lucide.Sun, { size: 11, color: '#fff' })}
          </div>
        </div>
      </div>

      {/* Storage */}
      <div style={{ margin: '0 20px 14px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Storage</span>
          <span style={{ fontSize: 12, color: t.textMuted }}>53.8 / 128 GB</span>
        </div>
        <div style={{ height: 6, background: t.surface3, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '42%', background: `linear-gradient(90deg, ${t.primary}, ${t.blue})`, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {[{ label: 'Videos', pct: '62%', color: t.primary }, { label: 'Reels', pct: '18%', color: t.accent }, { label: 'Other', pct: '20%', color: t.textMuted }].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: item.color }} />
              <span style={{ fontSize: 10, color: t.textMuted }}>{item.label} {item.pct}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 10px', fontSize: 13, fontWeight: 600, color: t.text }}>Folders</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px' }}>
        {FOLDERS.map((folder) => (
          <div key={folder.name} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', cursor: 'pointer' }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: `${folder.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>{folder.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{folder.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{folder.count} videos · {folder.size}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: folder.color }} />
              {React.createElement(window.lucide.ChevronRight, { size: 13, color: t.textMuted })}
            </div>
          </div>
        ))}
        <div style={{ border: `1.5px dashed ${t.border}`, borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          {React.createElement(window.lucide.FolderPlus, { size: 15, color: t.textMuted })}
          <span style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>New Folder</span>
        </div>
      </div>

      <div style={{ padding: '14px 20px 8px', fontSize: 13, fontWeight: 600, color: t.text }}>Settings</div>
      <div style={{ background: t.surface, borderRadius: 14, margin: '0 20px', border: `1px solid ${t.border}`, overflow: 'hidden' }}>
        {[
          { icon: window.lucide.Cloud, label: 'iCloud Sync', value: 'On' },
          { icon: window.lucide.Shield, label: 'Privacy Mode', value: 'Off' },
          { icon: window.lucide.Cpu, label: 'AI Processing', value: 'On-device' },
          { icon: window.lucide.Bell, label: 'Notifications', value: 'Enabled' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
            {React.createElement(item.icon, { size: 14, color: t.textSec })}
            <span style={{ flex: 1, fontSize: 13, color: t.text }}>{item.label}</span>
            <span style={{ fontSize: 12, color: t.textMuted }}>{item.value}</span>
            {React.createElement(window.lucide.ChevronRight, { size: 13, color: t.textMuted })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ======= MAIN APP =======

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [liveTagIndex, setLiveTagIndex] = useState(0);

  const t = themes[isDark ? 'dark' : 'light'];
  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    let iv;
    if (recording) iv = setInterval(() => setRecTime((r) => r + 1), 1000);
    else setRecTime(0);
    return () => clearInterval(iv);
  }, [recording]);

  useEffect(() => {
    let iv;
    if (recording) iv = setInterval(() => setLiveTagIndex((i) => i + 1), 2800);
    return () => clearInterval(iv);
  }, [recording]);

  const ctx = {
    t, isDark, setIsDark, recording, setRecording, recTime, fmtTime,
    searchQuery, setSearchQuery, showResults, setShowResults,
    expandedVideo, setExpandedVideo, filterType, setFilterType,
    liveTagIndex, activeTab, setActiveTab,
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'search', label: 'Search', icon: window.lucide.Search },
    { id: 'capture', label: 'Capture', icon: window.lucide.Video },
    { id: 'reels', label: 'Reels', icon: window.lucide.Film },
    { id: 'library', label: 'Library', icon: window.lucide.FolderOpen },
  ];

  const screens = {
    home: HomeScreen,
    search: SearchScreen,
    capture: CaptureScreen,
    reels: ReelsScreen,
    library: LibraryScreen,
  };

  return (
    <AppContext.Provider value={ctx}>
      <div style={{ minHeight: '100vh', background: '#d8dfe8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
        <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 50, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12)', transition: 'background 0.3s' }}>

          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 6px', flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>9:41</span>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {React.createElement(window.lucide.Wifi, { size: 13, color: t.textSec })}
              {React.createElement(window.lucide.Signal, { size: 13, color: t.textSec })}
              <div style={{ width: 24, height: 12, borderRadius: 3, border: `1.5px solid ${t.textSec}`, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '78%', height: '100%', background: t.textSec, borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 126, height: 34, background: '#000', borderRadius: 20, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {recording && (
              <>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FF3A3A', boxShadow: '0 0 8px #FF3A3A' }} />
                <span style={{ fontSize: 12, color: '#fff', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{fmtTime(recTime)}</span>
              </>
            )}
          </div>

          {/* Active Screen */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            {React.createElement(screens[activeTab])}
          </div>

          {/* Bottom Nav */}
          <div style={{ background: t.navBg, borderTop: `1px solid ${t.border}`, paddingBottom: 10, flexShrink: 0, transition: 'background 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 8 }}>
              {tabs.map((tab) =>
                React.createElement(
                  'div',
                  {
                    key: tab.id,
                    onClick: () => setActiveTab(tab.id),
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                      padding: '4px 10px',
                      cursor: 'pointer',
                      flex: 1,
                    },
                  },
                  tab.id === 'capture'
                    ? React.createElement(
                        'div',
                        {
                          style: {
                            width: 46,
                            height: 46,
                            borderRadius: 23,
                            background: activeTab === 'capture' ? t.primary : `linear-gradient(135deg, ${t.primary}30, ${t.blue}30)`,
                            border: `2px solid ${activeTab === 'capture' ? t.primary : t.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: -12,
                            boxShadow: activeTab === 'capture' ? `0 4px 18px ${t.primary}55` : 'none',
                            transition: 'all 0.2s',
                          },
                        },
                        React.createElement(tab.icon, { size: 19, color: activeTab === 'capture' ? '#fff' : t.primary })
                      )
                    : React.createElement(tab.icon, { size: 22, color: activeTab === tab.id ? t.primary : t.textMuted }),
                  React.createElement(
                    'span',
                    {
                      style: {
                        fontSize: 10,
                        fontWeight: activeTab === tab.id ? 700 : 400,
                        color: activeTab === tab.id ? t.primary : t.textMuted,
                        fontFamily: "'Space Grotesk', sans-serif",
                        marginTop: tab.id === 'capture' ? 4 : 0,
                      },
                    },
                    tab.label
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
