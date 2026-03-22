const { useState, useEffect, useRef } = React;

// ─── THEMES ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F6F3EE',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9E1',
    surfaceDeep: '#E4DED4',
    text: '#1B1916',
    textSec: '#6A6358',
    textMuted: '#9E9890',
    primary: '#5B5BD6',
    primaryBg: '#EEEEF9',
    primaryGlow: 'rgba(91,91,214,0.12)',
    border: '#E2DDD4',
    borderLight: '#EDECE5',
    card: '#FFFFFF',
    navBg: '#FFFFFF',
    navBorder: '#EDE9E1',
    progressTrack: '#E4DED4',
    hlConcept: '#F0EDFF',
    hlConceptBorder: '#818CF8',
    hlPerson: '#FDF2F8',
    hlPersonBorder: '#F472B6',
    hlEvent: '#FEF9EE',
    hlEventBorder: '#FBBF24',
    tagBookBg: '#EEF2FF', tagBookText: '#3730A3',
    tagPersonBg: '#FDF2F8', tagPersonText: '#9D174D',
    tagConceptBg: '#ECFDF5', tagConceptText: '#065F46',
    tagEventBg: '#FEF3C7', tagEventText: '#92400E',
    nodeBook: '#5B5BD6',
    nodePerson: '#DB2777',
    nodeConcept: '#0D9488',
    nodeEvent: '#D97706',
    success: '#10B981',
    warn: '#F59E0B',
  },
  dark: {
    bg: '#0E0D0C',
    surface: '#181512',
    surfaceAlt: '#201C19',
    surfaceDeep: '#272320',
    text: '#EDE9E2',
    textSec: '#9C9288',
    textMuted: '#635D57',
    primary: '#7878F2',
    primaryBg: '#1A1A2C',
    primaryGlow: 'rgba(120,120,242,0.18)',
    border: '#2C2825',
    borderLight: '#231F1D',
    card: '#181512',
    navBg: '#181512',
    navBorder: '#2C2825',
    progressTrack: '#2C2825',
    hlConcept: '#1A1A2C',
    hlConceptBorder: '#6366F1',
    hlPerson: '#27111D',
    hlPersonBorder: '#EC4899',
    hlEvent: '#25190A',
    hlEventBorder: '#F59E0B',
    tagBookBg: '#1A1A2C', tagBookText: '#A5B4FC',
    tagPersonBg: '#27111D', tagPersonText: '#F9A8D4',
    tagConceptBg: '#052E1A', tagConceptText: '#6EE7B7',
    tagEventBg: '#251A04', tagEventText: '#FCD34D',
    nodeBook: '#7878F2',
    nodePerson: '#F472B6',
    nodeConcept: '#2DD4BF',
    nodeEvent: '#FBBF24',
    success: '#34D399',
    warn: '#FBBF24',
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const passage = [
  { id: 0, t: 'normal', text: 'The premise of this book is that it is easier to recognize other people\'s mistakes than our own. The observation led to a program of research, along with related developments in ' },
  { id: 1, t: 'concept', text: 'behavioral economics', entity: {
    name: 'Behavioral Economics', type: 'concept',
    desc: 'A field merging psychology with classical economics to show how humans consistently deviate from rational choices. Pioneered by Kahneman and Richard Thaler, who won the 2017 Nobel Prize for this work.',
    refs: ['Nudge — Thaler & Sunstein', 'Misbehaving — Richard Thaler', 'Predictably Irrational — Ariely'],
    why: 'This single phrase signals the entire intellectual lineage of the book — everything Kahneman studies lives inside this field.',
  }},
  { id: 2, t: 'normal', text: ', which has provided the tools for understanding decision-making under uncertainty.' },
  { id: 3, t: 'break' },
  { id: 4, t: 'normal', text: 'Two distinct systems govern our thinking. ' },
  { id: 5, t: 'concept', text: 'System 1', entity: {
    name: 'System 1', type: 'concept',
    desc: 'Fast, automatic, unconscious thinking. Handles intuitions, emotions, and snap judgments effortlessly. Nearly impossible to turn off. The source of most cognitive biases.',
    refs: ['Blink — Malcolm Gladwell', 'Incognito — David Eagleman', 'The Righteous Mind — Haidt'],
    why: 'One of the two organizing frameworks of the entire book — Kahneman argues almost every mistake originates here.',
  }},
  { id: 6, t: 'normal', text: ' operates automatically with little effort, while ' },
  { id: 7, t: 'concept', text: 'System 2', entity: {
    name: 'System 2', type: 'concept',
    desc: 'Slow, deliberate, effortful reasoning. Handles complex logic, focused attention, and calculation. "Lazy" by nature — it endorses System 1\'s outputs rather than overriding them.',
    refs: ['The Intelligence Trap — David Robson', 'Super Thinking — Weinberg & McCann'],
    why: 'Understanding System 2\'s laziness explains why intelligence alone doesn\'t protect against cognitive errors.',
  }},
  { id: 8, t: 'normal', text: ' allocates attention to difficult tasks — and often simply endorses what System 1 suggests.' },
  { id: 9, t: 'break' },
  { id: 10, t: 'normal', text: 'This research was developed with my long-time collaborator ' },
  { id: 11, t: 'person', text: 'Amos Tversky', entity: {
    name: 'Amos Tversky', type: 'person',
    desc: 'Israeli cognitive psychologist (1937–1996). Kahneman\'s closest intellectual partner for 20 years. Co-created Prospect Theory, identified dozens of cognitive biases. Died before the Nobel was awarded.',
    refs: ['The Undoing Project — Michael Lewis', 'Prospect Theory (1979 paper)', 'Judgment Under Uncertainty (1974)'],
    why: 'Kahneman considers this book equally Tversky\'s — every major idea was developed in collaboration over two decades.',
  }},
  { id: 12, t: 'normal', text: ', whose work on judgment under uncertainty transformed economics, medicine, and public policy.' },
  { id: 13, t: 'break' },
  { id: 14, t: 'normal', text: 'A key insight that emerged from this collaboration was ' },
  { id: 15, t: 'concept', text: 'Prospect Theory', entity: {
    name: 'Prospect Theory', type: 'concept',
    desc: 'A model of decision-making under risk showing that people evaluate outcomes relative to a reference point, and feel losses more acutely than equivalent gains. Replaces expected utility theory in behavioral economics.',
    refs: ['Judgment Under Uncertainty (1974)', 'Misbehaving — Richard Thaler', 'Against the Gods — Peter Bernstein'],
    why: 'The paper that made Kahneman and Tversky famous — it\'s cited in almost every economics and psychology paper on decision-making.',
  }},
  { id: 16, t: 'normal', text: ', which replaced classical expected utility theory with a more accurate model of human choice.' },
];

const graphNodes = [
  { id: 'c', label: 'Thinking,\nFast & Slow', type: 'book', x: 187, y: 235, r: 46, current: true },
  { id: 'k', label: 'Daniel\nKahneman', type: 'person', x: 66, y: 130, r: 33 },
  { id: 'tv', label: 'Amos\nTversky', type: 'person', x: 308, y: 120, r: 32 },
  { id: 'sys', label: 'System 1\n& 2', type: 'concept', x: 48, y: 305, r: 31 },
  { id: 'be', label: 'Behavioral\nEcon', type: 'concept', x: 322, y: 300, r: 31 },
  { id: 'nu', label: 'Nudge', type: 'book', x: 140, y: 412, r: 26 },
  { id: 'mi', label: 'Misbehaving', type: 'book', x: 255, y: 415, r: 26 },
  { id: 'pt', label: 'Prospect\nTheory', type: 'concept', x: 345, y: 205, r: 26 },
  { id: 'ud', label: 'The Undoing\nProject', type: 'book', x: 52, y: 410, r: 25 },
];

const graphEdges = [
  { f: 'c', t: 'k' }, { f: 'c', t: 'tv' }, { f: 'c', t: 'sys' }, { f: 'c', t: 'be' },
  { f: 'c', t: 'nu' }, { f: 'c', t: 'mi' }, { f: 'tv', t: 'pt' }, { f: 'tv', t: 'ud' },
  { f: 'be', t: 'nu' }, { f: 'be', t: 'mi' }, { f: 'k', t: 'sys' }, { f: 'k', t: 'pt' },
];

const books = [
  { id: 1, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', progress: 68, color: '#5B5BD6', genre: 'Psychology', entities: 47, ch: 'Ch. 18 — The Fourfold Pattern', active: true },
  { id: 2, title: 'Structure of Scientific Revolutions', author: 'Thomas S. Kuhn', progress: 100, color: '#0D9488', genre: 'Philosophy', entities: 83, ch: 'Completed' },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', progress: 35, color: '#D97706', genre: 'History', entities: 31, ch: 'Ch. 7 — Memory Overload' },
  { id: 4, title: 'Misbehaving', author: 'Richard H. Thaler', progress: 15, color: '#DB2777', genre: 'Economics', entities: 12, ch: 'Ch. 3 — The Endowment Effect' },
  { id: 5, title: 'The Remains of the Day', author: 'Kazuo Ishiguro', progress: 100, color: '#7C3AED', genre: 'Fiction', entities: 61, ch: 'Completed' },
];

const insightCards = [
  { type: 'link', icon: 'Link2', title: 'Cross-book Connection', color: '#5B5BD6',
    text: '"Availability heuristic" in Ch.12 directly parallels Sapiens Ch.6 on how humans distort historical memory.',
    books: ['Thinking Fast & Slow', 'Sapiens'], score: 94 },
  { type: 'suggest', icon: 'Sparkles', title: 'Suggested Next Read', color: '#D97706',
    text: 'Your System 1 highlights map to 6 passages in Blink — Gladwell frames the same ideas through vivid stories.',
    books: ['Blink'], score: 88 },
  { type: 'revisit', icon: 'RotateCcw', title: 'Concept Revisited', color: '#0D9488',
    text: '"Anchoring effect" (highlighted 3 weeks ago) reappears in Misbehaving Ch.3 with real policy experiments.',
    books: ['Misbehaving'], score: 76 },
];

const packets = [
  { title: 'Cognitive Biases — Study Guide', items: 12, updated: '2 days ago', color: '#5B5BD6' },
  { title: 'Behavioral Economics Overview', items: 8, updated: '1 week ago', color: '#0D9488' },
];

// ─── ICON ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 18, color = 'currentColor', style: s = {} }) {
  const IC = window.lucide?.[name];
  if (!IC) return <span style={{ display: 'inline-block', width: size, height: size, ...s }} />;
  return <IC size={size} color={color} style={s} />;
}

// ─── TAG ──────────────────────────────────────────────────────────────────────
function Tag({ label, type, t }) {
  const bgKey = `tag${type.charAt(0).toUpperCase() + type.slice(1)}Bg`;
  const textKey = `tag${type.charAt(0).toUpperCase() + type.slice(1)}Text`;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      background: t[bgKey] || t.primaryBg, fontSize: 10, fontWeight: 700,
      color: t[textKey] || t.primary, textTransform: 'uppercase', letterSpacing: '0.06em',
    }}>{label}</span>
  );
}

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
function StatusBar({ t }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px 6px', height: 44, position: 'relative', flexShrink: 0,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: t.text, zIndex: 1 }}>9:41</span>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 34, background: '#000', borderRadius: '0 0 20px 20px', zIndex: 2,
      }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', zIndex: 1 }}>
        <Icon name="Wifi" size={13} color={t.text} />
        <Icon name="Signal" size={13} color={t.text} />
        <Icon name="Battery" size={13} color={t.text} />
      </div>
    </div>
  );
}

// ─── READING SCREEN ───────────────────────────────────────────────────────────
function ReadingScreen({ t }) {
  const [selected, setSelected] = useState(null);

  const getHlStyle = (type, isSelected) => {
    const bg = type === 'concept' ? t.hlConcept : type === 'person' ? t.hlPerson : t.hlEvent;
    const border = type === 'concept' ? t.hlConceptBorder : type === 'person' ? t.hlPersonBorder : t.hlEventBorder;
    return {
      background: isSelected ? border : bg,
      borderBottom: `2px solid ${border}`,
      borderRadius: '3px 3px 0 0',
      padding: '1px 3px',
      cursor: 'pointer',
      fontWeight: 600,
      color: isSelected ? '#fff' : t.text,
      transition: 'all 0.15s ease',
    };
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Book header */}
      <div style={{ padding: '10px 18px 12px', borderBottom: `1px solid ${t.border}`, background: t.surface, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 10, color: t.primary, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Currently Reading</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text, lineHeight: 1.2 }}>Thinking, Fast and Slow</div>
            <div style={{ fontSize: 11, color: t.textSec, marginTop: 2 }}>Daniel Kahneman · Ch. 18</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
            {['Bookmark', 'Search'].map(icon => (
              <button key={icon} style={{
                width: 30, height: 30, borderRadius: 8, border: `1px solid ${t.border}`,
                background: t.surfaceAlt, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon name={icon} size={13} color={t.textSec} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 10, height: 3, background: t.progressTrack, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: t.primary, borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 10, color: t.textMuted }}>68% complete · 161 pages left</span>
          <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>47 entities mapped</span>
        </div>
      </div>

      {/* Passage */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 20px 12px' }}>
        <div style={{ lineHeight: 1.9, fontSize: 15, color: t.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {passage.map(seg => {
            if (seg.t === 'break') return <div key={seg.id} style={{ height: 14 }} />;
            if (seg.t === 'normal') return <span key={seg.id}>{seg.text}</span>;
            const isSel = selected?.id === seg.id;
            return (
              <span key={seg.id} style={getHlStyle(seg.t, isSel)}
                onClick={() => setSelected(isSel ? null : seg)}>
                {seg.text}
              </span>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 14, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
          {[['concept', t.hlConceptBorder], ['person', t.hlPersonBorder]].map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
              <span style={{ fontSize: 11, color: t.textMuted, textTransform: 'capitalize' }}>{type}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="MapPin" size={11} color={t.primary} />
            <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>Tap any highlight</span>
          </div>
        </div>
      </div>

      {/* Context card */}
      {selected?.entity && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.surface, borderTop: `1px solid ${t.border}`,
          borderRadius: '20px 20px 0 0',
          padding: '16px 20px 20px',
          boxShadow: `0 -10px 40px ${t.primaryGlow}`,
          maxHeight: 340, overflow: 'auto', zIndex: 20,
        }}>
          <div style={{ width: 36, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <Tag label={selected.entity.type} type={selected.entity.type} t={t} />
              <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginTop: 5 }}>{selected.entity.name}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{
              width: 26, height: 26, borderRadius: 13, border: `1px solid ${t.border}`,
              background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="X" size={12} color={t.textSec} />
            </button>
          </div>
          <p style={{ fontSize: 13, color: t.textSec, lineHeight: 1.65, margin: '0 0 12px' }}>{selected.entity.desc}</p>
          <div style={{
            padding: '10px 13px', background: t.primaryBg, borderRadius: 10,
            borderLeft: `3px solid ${t.primary}`, marginBottom: 13,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: t.primary, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Why it matters here</div>
            <p style={{ fontSize: 12, color: t.text, lineHeight: 1.55, margin: 0 }}>{selected.entity.why}</p>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Related References</div>
          {selected.entity.refs.map((ref, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0',
              borderBottom: i < selected.entity.refs.length - 1 ? `1px solid ${t.borderLight}` : 'none',
            }}>
              <Icon name="BookOpen" size={12} color={t.primary} />
              <span style={{ fontSize: 12, color: t.text }}>{ref}</span>
              <Icon name="ChevronRight" size={12} color={t.textMuted} style={{ marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ATLAS SCREEN ─────────────────────────────────────────────────────────────
function AtlasScreen({ t }) {
  const [selNode, setSelNode] = useState(null);
  const [hov, setHov] = useState(null);

  const nodeColor = (type) => {
    if (type === 'book') return t.nodeBook;
    if (type === 'person') return t.nodePerson;
    if (type === 'concept') return t.nodeConcept;
    return t.nodeEvent;
  };

  const nodeDetails = {
    c: { name: 'Thinking, Fast and Slow', desc: 'Your current read. 47 entities mapped across 18 chapters. 3 cross-book connections found this week.' },
    k: { name: 'Daniel Kahneman', desc: 'Author. Nobel laureate 2002. Pioneer of behavioral economics and dual-process theory. 5 other books in your library reference his work.' },
    tv: { name: 'Amos Tversky', desc: 'Co-author of Prospect Theory. Appears in 3 books in your library. The Undoing Project tells the story of his collaboration with Kahneman.' },
    sys: { name: 'System 1 & 2', desc: 'The organizing framework of the book. Also appears in Blink (Gladwell), Incognito (Eagleman), and The Righteous Mind (Haidt).' },
    be: { name: 'Behavioral Economics', desc: 'The field encompassing this research. Referenced in Nudge, Misbehaving, and 2 of your completed books.' },
    nu: { name: 'Nudge', desc: 'By Thaler & Sunstein. Applies behavioral economics to policy. You have it queued in your library.' },
    mi: { name: 'Misbehaving', desc: 'By Richard Thaler. Currently 15% complete. Directly extends Kahneman\'s research into real-world economics.' },
    pt: { name: 'Prospect Theory', desc: 'The 1979 paper by Kahneman & Tversky. Foundational to behavioral economics. Cited in every book on this graph.' },
    ud: { name: 'The Undoing Project', desc: 'By Michael Lewis. Tells the story of Kahneman & Tversky\'s collaboration. Recommended based on your reading pattern.' },
  };

  const sel = selNode ? nodeDetails[selNode.id] : null;
  const W = 375, H = 460;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px 10px', borderBottom: `1px solid ${t.border}`, background: t.surface, flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Knowledge Atlas</div>
        <div style={{ fontSize: 11, color: t.textSec, marginTop: 2 }}>Thinking, Fast and Slow · 9 connected nodes</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {[['book', t.nodeBook], ['person', t.nodePerson], ['concept', t.nodeConcept]].map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, background: t.surfaceAlt }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
              <span style={{ fontSize: 10, color: t.textSec, textTransform: 'capitalize', fontWeight: 500 }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: t.bg }}>
        <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={t.primary} stopOpacity="0.2" />
              <stop offset="100%" stopColor={t.primary} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow under center node */}
          <circle cx={187} cy={235} r={80} fill="url(#centerGlow)" />

          {/* Edges */}
          {graphEdges.map((e, i) => {
            const fn = graphNodes.find(n => n.id === e.f);
            const tn = graphNodes.find(n => n.id === e.t);
            if (!fn || !tn) return null;
            const isActive = selNode && (selNode.id === e.f || selNode.id === e.t);
            return (
              <line key={i}
                x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
                stroke={isActive ? t.primary : t.border}
                strokeWidth={isActive ? 1.5 : 1}
                strokeOpacity={isActive ? 0.8 : 0.5}
                strokeDasharray={isActive ? 'none' : '4 3'}
              />
            );
          })}

          {/* Nodes */}
          {graphNodes.map(node => {
            const color = nodeColor(node.type);
            const isSel = selNode?.id === node.id;
            const isHov = hov === node.id;
            const scale = isSel ? 1.12 : isHov ? 1.05 : 1;
            const lines = node.label.split('\n');
            return (
              <g key={node.id}
                transform={`translate(${node.x},${node.y}) scale(${scale})`}
                style={{ cursor: 'pointer', transformOrigin: `${node.x}px ${node.y}px`, transition: 'transform 0.15s ease' }}
                onClick={() => setSelNode(isSel ? null : node)}
                onMouseEnter={() => setHov(node.id)}
                onMouseLeave={() => setHov(null)}>
                <circle r={node.r} fill={color} fillOpacity={isSel ? 1 : 0.85}
                  stroke={isSel ? '#fff' : color} strokeWidth={isSel ? 2.5 : 0}
                  style={{ filter: isSel ? `drop-shadow(0 0 8px ${color})` : 'none' }} />
                {node.current && <circle r={node.r + 4} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.4} strokeDasharray="3 3" />}
                {lines.map((line, li) => (
                  <text key={li} textAnchor="middle"
                    y={lines.length === 1 ? 4 : li === 0 ? -4 : 10}
                    fill="#fff" fontSize={node.r > 35 ? 9 : 8} fontWeight={700}
                    fontFamily="Plus Jakarta Sans, sans-serif">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>

        {/* Node detail panel */}
        {sel && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: t.surface, borderTop: `1px solid ${t.border}`,
            borderRadius: '16px 16px 0 0', padding: '14px 18px 18px',
            boxShadow: `0 -8px 32px ${t.primaryGlow}`, zIndex: 10,
          }}>
            <div style={{ width: 32, height: 3, background: t.border, borderRadius: 2, margin: '0 auto 12px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: nodeColor(selNode.type), flexShrink: 0 }} />
              <Tag label={selNode.type} type={selNode.type} t={t} />
              <button onClick={() => setSelNode(null)} style={{
                marginLeft: 'auto', width: 24, height: 24, borderRadius: 12,
                border: `1px solid ${t.border}`, background: t.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon name="X" size={11} color={t.textSec} />
              </button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 6 }}>{sel.name}</div>
            <p style={{ fontSize: 12, color: t.textSec, lineHeight: 1.6, margin: 0 }}>{sel.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LIBRARY SCREEN ───────────────────────────────────────────────────────────
function LibraryScreen({ t }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'reading', 'done'];

  const filtered = books.filter(b => {
    if (filter === 'reading') return b.progress > 0 && b.progress < 100;
    if (filter === 'done') return b.progress === 100;
    return true;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 18px 10px', background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>My Library</div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
            borderRadius: 20, background: t.primary, border: 'none', cursor: 'pointer',
          }}>
            <Icon name="Plus" size={12} color="#fff" />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Import</span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 12px', borderRadius: 20,
              background: filter === f ? t.primary : t.surfaceAlt,
              border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 700, textTransform: 'capitalize',
              color: filter === f ? '#fff' : t.textSec,
              transition: 'all 0.15s ease',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 0, background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        {[['5', 'Books'], ['234', 'Entities'], ['18', 'Connections']].map(([val, label], i) => (
          <div key={label} style={{
            flex: 1, padding: '10px 0', textAlign: 'center',
            borderRight: i < 2 ? `1px solid ${t.border}` : 'none',
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.primary }}>{val}</div>
            <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Book list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(book => (
          <div key={book.id} style={{
            background: t.card, borderRadius: 14, padding: '13px 14px',
            border: `1px solid ${book.active ? t.primary : t.border}`,
            boxShadow: book.active ? `0 0 0 1px ${t.primary}22` : 'none',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              {/* Spine */}
              <div style={{
                width: 36, height: 50, borderRadius: 6, background: book.color,
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 8, width: 3, height: '100%', background: 'rgba(0,0,0,0.15)' }} />
                <Icon name="BookOpen" size={14} color="rgba(255,255,255,0.8)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.3, paddingRight: 8, flex: 1 }}>{book.title}</div>
                  {book.progress === 100 && <Icon name="CheckCircle2" size={14} color={t.success} style={{ flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: 11, color: t.textSec, marginTop: 2 }}>{book.author}</div>
                <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{book.ch}</div>

                {book.progress > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ height: 3, background: t.progressTrack, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${book.progress}%`, height: '100%', background: book.color, borderRadius: 2 }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: t.textMuted }}>{book.progress}%</span>
                      <span style={{ fontSize: 10, color: book.color, fontWeight: 600 }}>{book.entities} entities</span>
                    </div>
                  </div>
                )}
                {book.progress === 0 && (
                  <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 10, background: t.surfaceAlt }}>
                    <Icon name="Clock" size={9} color={t.textMuted} />
                    <span style={{ fontSize: 10, color: t.textMuted }}>Queued</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INSIGHTS SCREEN ──────────────────────────────────────────────────────────
function InsightsScreen({ t }) {
  const [activeTab, setActiveTab] = useState('connections');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 18px 10px', background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 12 }}>Insights</div>
        <div style={{ display: 'flex', gap: 0, background: t.surfaceAlt, borderRadius: 10, padding: 3 }}>
          {['connections', 'packets'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '6px 0', borderRadius: 8,
              background: activeTab === tab ? t.surface : 'transparent',
              border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 700, textTransform: 'capitalize',
              color: activeTab === tab ? t.text : t.textMuted,
              boxShadow: activeTab === tab ? `0 1px 4px ${t.primaryGlow}` : 'none',
              transition: 'all 0.15s ease',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '14px 16px' }}>
        {activeTab === 'connections' && (
          <>
            {/* Reading streak */}
            <div style={{
              background: t.primary, borderRadius: 16, padding: '16px',
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="Zap" size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>12 day streak</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>234 entities discovered this month</div>
              </div>
            </div>

            {/* Insight cards */}
            {insightCards.map((card, i) => (
              <div key={i} style={{
                background: t.card, borderRadius: 14, padding: '14px',
                border: `1px solid ${t.border}`, marginBottom: 10, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: card.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={card.icon} size={14} color={card.color} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: card.color }}>{card.title}</div>
                  <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: t.textMuted }}>{card.score}% match</div>
                </div>
                <p style={{ fontSize: 12, color: t.textSec, lineHeight: 1.6, margin: '0 0 10px' }}>{card.text}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {card.books.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, background: t.primaryBg }}>
                      <Icon name="BookOpen" size={10} color={t.primary} />
                      <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Reading map preview */}
            <div style={{ background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', borderBottom: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Reading Map</div>
                <div style={{ fontSize: 11, color: t.textSec }}>Your personal knowledge graph · 5 books</div>
              </div>
              <div style={{ padding: '12px 14px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {books.filter(b => b.progress > 0).map(b => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: b.color + '20', border: `1px solid ${b.color}40` }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.color }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: b.color }}>{b.title.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'packets' && (
          <>
            <div style={{ fontSize: 12, color: t.textSec, marginBottom: 14, lineHeight: 1.5 }}>
              Study packets compile your highlights, context cards, and annotations into shareable briefings.
            </div>
            {packets.map((p, i) => (
              <div key={i} style={{
                background: t.card, borderRadius: 14, padding: '14px',
                border: `1px solid ${t.border}`, marginBottom: 10,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: p.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="FileText" size={16} color={p.color} />
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['Share2', 'Download'].map(ic => (
                      <button key={ic} style={{
                        width: 28, height: 28, borderRadius: 8, border: `1px solid ${t.border}`,
                        background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }}>
                        <Icon name={ic} size={12} color={t.textSec} />
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: t.textSec }}>{p.items} items · Updated {p.updated}</div>
              </div>
            ))}
            <button style={{
              width: '100%', padding: '13px', borderRadius: 14,
              border: `1.5px dashed ${t.primary}`, background: t.primaryBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
            }}>
              <Icon name="Plus" size={14} color={t.primary} />
              <span style={{ fontSize: 13, fontWeight: 700, color: t.primary }}>Create New Packet</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
function SettingsScreen({ t, isDark, setIsDark }) {
  const [fontSize, setFontSize] = useState(2);
  const [autoHighlight, setAutoHighlight] = useState(true);
  const [deepContext, setDeepContext] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: 44, height: 26, borderRadius: 13,
      background: value ? t.primary : t.surfaceDeep,
      cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: 10, background: '#fff',
        transition: 'left 0.2s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 18px 14px', background: t.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Settings</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Profile */}
        <div style={{ padding: '16px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, background: t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="User" size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>Alex Chen</div>
              <div style={{ fontSize: 12, color: t.textSec }}>alex@example.com</div>
              <div style={{ fontSize: 11, color: t.primary, fontWeight: 600, marginTop: 2 }}>Pro Reader · 234 entities discovered</div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div style={{ padding: '14px 16px', background: t.bg }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Appearance</div>

          {/* Theme toggle */}
          <div style={{ background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: isDark ? '#251A04' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={isDark ? 'Moon' : 'Sun'} size={16} color={isDark ? '#FBBF24' : '#D97706'} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
                  <div style={{ fontSize: 11, color: t.textSec }}>Currently {isDark ? 'dark' : 'light'} theme</div>
                </div>
              </div>
              <Toggle value={isDark} onChange={setIsDark} />
            </div>
          </div>

          {/* Font size */}
          <div style={{ background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, padding: '13px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 10 }}>Reading Font Size</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['S', 'M', 'L', 'XL'].map((sz, i) => (
                <button key={sz} onClick={() => setFontSize(i)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8,
                  background: fontSize === i ? t.primary : t.surfaceAlt,
                  border: `1px solid ${fontSize === i ? t.primary : t.border}`,
                  color: fontSize === i ? '#fff' : t.textSec,
                  fontSize: 11 + i, fontWeight: 700, cursor: 'pointer',
                }}>{sz}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Reading Preferences */}
        <div style={{ padding: '0 16px 14px', background: t.bg }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Reading Preferences</div>
          <div style={{ background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Auto-highlight entities', sub: 'Detect people, concepts & events automatically', val: autoHighlight, set: setAutoHighlight, icon: 'Wand2' },
              { label: 'Deep context mode', sub: 'Show extended explanations and references', val: deepContext, set: setDeepContext, icon: 'Layers' },
            ].map((item, i, arr) => (
              <div key={item.label} style={{
                padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: i < arr.length - 1 ? `1px solid ${t.borderLight}` : 'none',
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: t.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={item.icon} size={14} color={t.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: t.textSec }}>{item.sub}</div>
                </div>
                <Toggle value={item.val} onChange={item.set} />
              </div>
            ))}
          </div>
        </div>

        {/* Account actions */}
        <div style={{ padding: '0 16px 30px', background: t.bg }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Account</div>
          <div style={{ background: t.card, borderRadius: 14, border: `1px solid ${t.border}`, overflow: 'hidden' }}>
            {[
              { label: 'Export Reading Data', icon: 'Upload', color: t.text },
              { label: 'Sync Across Devices', icon: 'RefreshCw', color: t.text },
              { label: 'Sign Out', icon: 'LogOut', color: '#EF4444' },
            ].map((item, i, arr) => (
              <div key={item.label} style={{
                padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: i < arr.length - 1 ? `1px solid ${t.borderLight}` : 'none',
                cursor: 'pointer',
              }}>
                <Icon name={item.icon} size={16} color={item.color} />
                <span style={{ fontSize: 13, fontWeight: 600, color: item.color, flex: 1 }}>{item.label}</span>
                {i < 2 && <Icon name="ChevronRight" size={14} color={t.textMuted} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(false);
  const [tab, setTab] = useState('reading');
  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { display: none; }
    button { font-family: 'Plus Jakarta Sans', sans-serif; }`;
    document.head.appendChild(style);
  }, []);

  const navTabs = [
    { id: 'reading', icon: 'BookOpen', label: 'Reading' },
    { id: 'atlas', icon: 'Network', label: 'Atlas' },
    { id: 'library', icon: 'Library', label: 'Library' },
    { id: 'insights', icon: 'Sparkles', label: 'Insights' },
    { id: 'settings', icon: 'Settings2', label: 'Settings' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#DDDAD5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
        position: 'relative',
      }}>
        {/* Status bar */}
        <StatusBar t={t} />

        {/* Screen */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {tab === 'reading' && <ReadingScreen t={t} isDark={isDark} />}
          {tab === 'atlas' && <AtlasScreen t={t} isDark={isDark} />}
          {tab === 'library' && <LibraryScreen t={t} />}
          {tab === 'insights' && <InsightsScreen t={t} />}
          {tab === 'settings' && <SettingsScreen t={t} isDark={isDark} setIsDark={setIsDark} />}
        </div>

        {/* Bottom nav */}
        <div style={{
          height: 72, background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex', alignItems: 'center',
          paddingBottom: 8, flexShrink: 0,
        }}>
          {navTabs.map(navTab => {
            const active = tab === navTab.id;
            return (
              <button key={navTab.id} onClick={() => setTab(navTab.id)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                paddingTop: 10, paddingBottom: 2, background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <div style={{
                  width: 34, height: 24, borderRadius: 12,
                  background: active ? t.primaryBg : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}>
                  <Icon name={navTab.icon} size={18} color={active ? t.primary : t.textMuted} />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: active ? 700 : 500,
                  color: active ? t.primary : t.textMuted,
                  transition: 'color 0.15s ease',
                }}>{navTab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
