const { useState, useEffect, useRef } = React;

// ─── Icon Helper ───────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color, strokeWidth = 1.5 }) => {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block' } });
  return React.createElement(LucideIcon, { size, color, strokeWidth });
};

// ─── Themes ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: '#1A1810',
    surface: '#23201A',
    surface2: '#2C2820',
    surface3: '#363028',
    text: '#EDE8DA',
    textMuted: '#A09078',
    textDim: '#685C4E',
    gold: '#C9A94B',
    goldLight: '#E0C060',
    goldDim: '#7A6428',
    moss: '#7A8F68',
    mossLight: '#96AB80',
    mossDeep: '#3A5030',
    terracotta: '#C47858',
    terracottaLight: '#DE9070',
    terracottaDeep: '#7A4030',
    warmGrey: '#8C8075',
    border: '#3A3025',
    borderMed: '#4A4030',
    borderLight: '#5A5040',
  },
  light: {
    bg: '#F4EFE2',
    surface: '#EDE7D5',
    surface2: '#E4DCC8',
    surface3: '#D8CEBA',
    text: '#28201A',
    textMuted: '#6A5848',
    textDim: '#9A8870',
    gold: '#A87800',
    goldLight: '#C49020',
    goldDim: '#D4B060',
    moss: '#4A6038',
    mossLight: '#5E7848',
    mossDeep: '#304020',
    terracotta: '#A85840',
    terracottaLight: '#C47058',
    terracottaDeep: '#784030',
    warmGrey: '#706460',
    border: '#C8C0A8',
    borderMed: '#B8B0A0',
    borderLight: '#A8A090',
  }
};

// ─── Static Data ──────────────────────────────────────────────────────────────
const TODAY_DATA = {
  date: 'April 4, 2026',
  day: 'Saturday',
  season: 'Spring',
  astronomicalNote: 'Waxing Gibbous · 14 days post-Equinox',
  prompt: {
    title: 'The Language of Cherry Blossoms',
    subtitle: 'Hanami & mono no aware',
    fullContent: `In Japan, cherry blossoms (sakura) have bloomed for centuries as a meditation on impermanence — a concept the Japanese call mono no aware, "the pathos of things." The blossoms last only one to two weeks, making their fleeting beauty all the more precious.\n\nAncient samurai saw in sakura a metaphor for the warrior's life: brilliant, brief, and graceful in passing. Families still gather beneath the trees each spring in hanami ("flower viewing") picnics, a tradition dating back over 1,000 years to the Heian period.\n\nThe blossoms also mark the start of Japan's fiscal and academic year — new beginnings wrapped in ephemeral beauty.`,
    challenge: 'Find something in your immediate surroundings that embodies beautiful impermanence. Capture it — in words, image, or sketch. What makes its fleeting nature beautiful rather than sad?',
    emblem: 'Sakura Sage',
    xp: 120,
  }
};

const SAGAS = [
  { id: 1, title: 'The Art of Spring Renewal', season: 'Spring', progress: 5, total: 10, emoji: '🌱', color: '#7A8F68', active: true, desc: 'Rebirth rituals and renewal ceremonies across cultures', chapters: ['Persian Nowruz', 'Japanese Hanami', 'Celtic Beltane', 'Roman Floralia', 'Holi: Festival of Colors', 'Ostara Traditions', 'Maypole Mysteries', 'Cherry Blossom Festivals', 'Spring Equinox Rites', 'Renewal in Modern Life'] },
  { id: 2, title: 'Harvest Festival Histories', season: 'Autumn', progress: 7, total: 12, emoji: '🍂', color: '#C47858', active: false, desc: 'Ancient grain offerings to modern thanksgiving' },
  { id: 3, title: 'Lunar Lore & Night Myths', season: 'Year-Round', progress: 3, total: 8, emoji: '🌙', color: '#8C8075', active: false, desc: 'Moon worship and star stories across civilizations' },
];

const PAST_PROMPTS = [
  { id: 1, date: 'Apr 1', title: "April Fools' Ancient Origins", emoji: '🃏', completed: true },
  { id: 2, date: 'Mar 28', title: "The Philosopher's Garden", emoji: '🌿', completed: true },
  { id: 3, date: 'Mar 21', title: 'Nowruz: Persian New Year', emoji: '🔥', completed: true },
  { id: 4, date: 'Mar 20', title: 'Spring Equinox Traditions', emoji: '⚖️', completed: true },
  { id: 5, date: 'Mar 15', title: 'The Ides of March', emoji: '⚔️', completed: false },
];

const EMBLEMS = [
  { id: 1, name: 'Solstice Keeper', date: 'Dec 21', emoji: '❄️', unlocked: true },
  { id: 2, name: 'Candlemas Scholar', date: 'Feb 2', emoji: '🕯️', unlocked: true },
  { id: 3, name: 'Equinox Witness', date: 'Mar 20', emoji: '🌿', unlocked: true },
  { id: 4, name: 'Blossom Philosopher', date: 'Mar 28', emoji: '🌸', unlocked: true },
  { id: 5, name: 'Rain Poet', date: 'Apr 1', emoji: '🌧️', unlocked: true },
  { id: 6, name: 'Sakura Sage', date: 'Today', emoji: '🌺', unlocked: false, current: true },
  { id: 7, name: 'May Day Guardian', date: 'May 1', emoji: '🌼', unlocked: false },
  { id: 8, name: 'Midsummer Dreamer', date: 'Jun 21', emoji: '☀️', unlocked: false },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const NavHeader = ({ t, isDark, setIsDark, setActiveScreen, label, accent, icon }) => (
  <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
    <button
      onClick={() => setActiveScreen('home')}
      style={{ width: 34, height: 34, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: isDark ? `0 2px 6px rgba(0,0,0,0.4)` : `0 2px 4px rgba(0,0,0,0.1)` }}
    >
      <Icon name="ArrowLeft" size={16} color={t.textMuted} />
    </button>
    <div>
      <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: accent }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}><span>{icon}</span></div>
    </div>
    <button
      onClick={() => setIsDark(!isDark)}
      style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
    >
      <Icon name={isDark ? 'Sun' : 'Moon'} size={15} color={t.gold} />
    </button>
  </div>
);

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [expanded, setExpanded] = useState(false);
  const [pressed, setPressed] = useState(null);

  const navSpokes = [
    { id: 'explore', label: 'Explore', sub: 'Sagas & Archives', icon: 'Compass', accent: t.moss },
    { id: 'create', label: 'Create', sub: "Today's Challenge", icon: 'Feather', accent: t.terracotta },
    { id: 'chronicle', label: 'Chronicle', sub: 'Your Tapestry', icon: 'BookOpen', accent: t.gold },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      {/* ── Header ── */}
      <div style={{ padding: '22px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3.5, color: t.gold, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
            ✦ ChronoCraft
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>{TODAY_DATA.day},</div>
          <div style={{ fontSize: 14, color: t.textMuted, fontStyle: 'italic' }}>{TODAY_DATA.date}</div>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{ width: 38, height: 38, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: 6, boxShadow: isDark ? `0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)` : `0 3px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)` }}
        >
          <Icon name={isDark ? 'Sun' : 'Moon'} size={17} color={t.gold} />
        </button>
      </div>

      {/* ── Season Pill ── */}
      <div style={{ padding: '10px 24px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 20, background: t.surface2, border: `1px solid ${t.border}`, fontSize: 11, color: t.textMuted, letterSpacing: 1.2, textTransform: 'uppercase' }}>
          🌿 {TODAY_DATA.season} · {TODAY_DATA.astronomicalNote}
        </div>
      </div>

      {/* ── Today's Chrono-Prompt Card ── */}
      <div style={{ padding: '14px 18px 0' }}>
        <div style={{ background: t.surface, borderRadius: 18, border: `1px solid ${t.borderMed}`, overflow: 'hidden', boxShadow: isDark ? `0 6px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)` : `0 5px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)` }}>
          {/* Gold accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${t.goldDim}, ${t.gold}, ${t.goldLight}, ${t.gold}, ${t.goldDim})` }} />

          <div style={{ padding: '14px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.gold, fontWeight: 700 }}>Today's Chrono-Prompt</div>
            <span style={{ fontSize: 22 }}>🌸</span>
          </div>

          <div style={{ padding: '8px 16px 0' }}>
            <div style={{ fontSize: 21, fontWeight: 700, color: t.text, lineHeight: 1.2, marginBottom: 4 }}>{TODAY_DATA.prompt.title}</div>
            <div style={{ fontSize: 13, color: t.gold, fontStyle: 'italic', marginBottom: 10 }}>{TODAY_DATA.prompt.subtitle}</div>
            <div style={{ fontSize: 13.5, color: t.textMuted, lineHeight: 1.65, maxHeight: expanded ? 300 : 56, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
              {TODAY_DATA.prompt.fullContent}
            </div>
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.gold, fontSize: 12, padding: '6px 0', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Bitter', serif" }}>
              <span>{expanded ? 'Show less' : 'Read more'}</span>
              <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={13} color={t.gold} />
            </button>
          </div>

          {/* Challenge block */}
          <div style={{ margin: '0 16px 14px', padding: '10px 12px', background: t.surface3, borderRadius: 10, borderLeft: `3px solid ${t.terracotta}` }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: t.terracotta, marginBottom: 4 }}>Your Challenge</div>
            <div style={{ fontSize: 12.5, color: t.textMuted, lineHeight: 1.55 }}>{TODAY_DATA.prompt.challenge}</div>
          </div>

          {/* CTA Button */}
          <div style={{ padding: '0 16px 16px' }}>
            <button
              onClick={() => setActiveScreen('create')}
              onMouseDown={() => setPressed('cta')}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
              style={{ width: '100%', padding: '13px', background: `linear-gradient(150deg, ${t.terracottaLight}, ${t.terracotta}, ${t.terracottaDeep})`, border: 'none', borderRadius: 11, color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Bitter', serif", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: pressed === 'cta' ? `inset 0 3px 8px rgba(0,0,0,0.45)` : `0 5px 14px rgba(196,120,88,0.45), inset 0 1px 0 rgba(255,255,255,0.18)`, transform: pressed === 'cta' ? 'translateY(1px)' : 'none', transition: 'all 0.1s' }}
            >
              <Icon name="Feather" size={16} color="#fff" />
              <span>Begin Creating</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.85, fontWeight: 600 }}>+{TODAY_DATA.prompt.xp} XP</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Hub Navigation Spokes ── */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>Navigate</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {navSpokes.map(spoke => (
            <button
              key={spoke.id}
              onClick={() => setActiveScreen(spoke.id)}
              onMouseDown={() => setPressed(spoke.id)}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
              style={{ padding: '14px 6px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, cursor: 'pointer', textAlign: 'center', boxShadow: pressed === spoke.id ? `inset 0 3px 8px rgba(0,0,0,0.35)` : isDark ? `0 4px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)` : `0 3px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)`, transform: pressed === spoke.id ? 'translateY(1px)' : 'none', transition: 'all 0.1s', fontFamily: "'Bitter', serif" }}
            >
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${spoke.accent}22`, border: `1px solid ${spoke.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <Icon name={spoke.icon} size={18} color={spoke.accent} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 }}><span>{spoke.label}</span></div>
              <div style={{ fontSize: 10, color: t.textDim, lineHeight: 1.3 }}>{spoke.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Active Seasonal Saga ── */}
      <div style={{ padding: '14px 18px 22px' }}>
        <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>Active Saga</div>
        <div
          onClick={() => setActiveScreen('explore')}
          style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px', cursor: 'pointer', boxShadow: isDark ? `0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)` : `0 3px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 32 }}>🌱</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 }}>The Art of Spring Renewal</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>5 of 10 chapters complete</div>
            </div>
            <Icon name="ChevronRight" size={18} color={t.textDim} />
          </div>
          <div style={{ marginTop: 10, height: 5, background: t.surface3, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: `linear-gradient(90deg, ${t.mossDeep}, ${t.moss}, ${t.mossLight})`, borderRadius: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Explore Screen ───────────────────────────────────────────────────────────
function ExploreScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [expandedSaga, setExpandedSaga] = useState(null);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <NavHeader t={t} isDark={isDark} setIsDark={setIsDark} setActiveScreen={setActiveScreen} label="Explore" accent={t.moss} icon="Seasonal Sagas" />

      <div style={{ padding: '16px 18px' }}>
        {/* ── ASYMMETRIC LAYOUT: Featured large saga ── */}
        <div
          style={{ background: `linear-gradient(145deg, ${t.surface2}, ${t.surface})`, borderRadius: 20, border: `1px solid ${t.borderMed}`, overflow: 'hidden', marginBottom: 12, boxShadow: isDark ? `0 8px 30px rgba(0,0,0,0.55)` : `0 5px 18px rgba(0,0,0,0.14)`, cursor: 'pointer' }}
          onClick={() => setExpandedSaga(expandedSaga === 1 ? null : 1)}
        >
          <div style={{ height: 3, background: `linear-gradient(90deg, ${t.mossDeep}, ${t.moss}, ${t.mossLight})` }} />
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.moss, marginBottom: 5, fontWeight: 700 }}>Active Saga · Spring</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>The Art of<br />Spring Renewal</div>
              </div>
              <span style={{ fontSize: 44 }}>🌱</span>
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 14, lineHeight: 1.55 }}>
              Rebirth rituals and renewal ceremonies across cultures — from Persian Nowruz to Japanese Hanami and beyond.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 12, color: t.textMuted }}>5 of 10 chapters</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.moss }}>50%</div>
            </div>
            <div style={{ height: 6, background: t.surface3, borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ width: '50%', height: '100%', background: `linear-gradient(90deg, ${t.mossDeep}, ${t.moss})`, borderRadius: 4, boxShadow: `0 0 8px ${t.moss}80` }} />
            </div>

            {/* Chapter list */}
            {expandedSaga === 1 && SAGAS[0].chapters.map((ch, i) => (
              <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < SAGAS[0].chapters.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 5 ? `${t.moss}40` : t.surface3, border: `1px solid ${i < 5 ? t.moss : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i < 5 && <Icon name="Check" size={11} color={t.mossLight} strokeWidth={2.5} />}
                  {i === 5 && <Icon name="Circle" size={8} color={t.gold} strokeWidth={2} />}
                </div>
                <span style={{ fontSize: 13, color: i < 5 ? t.text : i === 5 ? t.gold : t.textDim, fontWeight: i === 5 ? 700 : 400 }}>{ch}</span>
                {i === 5 && <span style={{ marginLeft: 'auto', fontSize: 9, color: t.gold, fontWeight: 700, letterSpacing: 0.8 }}>CURRENT</span>}
                {i > 5 && <Icon name="Lock" size={12} color={t.textDim} strokeWidth={1.5} />}
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: expandedSaga === 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: t.moss }}>
                <span>{expandedSaga === 1 ? 'Collapse' : 'View chapters'}</span>
                <Icon name={expandedSaga === 1 ? 'ChevronUp' : 'ChevronDown'} size={14} color={t.moss} />
              </div>
            </div>
          </div>
        </div>

        {/* ── ASYMMETRIC staggered smaller sagas (1.6fr / 1fr) ── */}
        <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>More Sagas</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, cursor: 'pointer', boxShadow: isDark ? `0 4px 12px rgba(0,0,0,0.4)` : `0 3px 8px rgba(0,0,0,0.1)` }}>
            <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🍂</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 }}>Harvest Festival Histories</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8, lineHeight: 1.4 }}>Ancient grain offerings to modern thanksgiving</div>
            <div style={{ height: 4, background: t.surface3, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '58%', height: '100%', background: t.terracotta, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>7 / 12 chapters</div>
          </div>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, cursor: 'pointer', boxShadow: isDark ? `0 4px 12px rgba(0,0,0,0.4)` : `0 3px 8px rgba(0,0,0,0.1)` }}>
            <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🌙</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 3 }}>Lunar Lore</div>
            <div style={{ height: 4, background: t.surface3, borderRadius: 3, overflow: 'hidden', marginTop: 8 }}>
              <div style={{ width: '37%', height: '100%', background: t.warmGrey, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>3 / 8</div>
          </div>
        </div>

        {/* ── Recent Archive ── */}
        <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>Recent Archive</div>
        {PAST_PROMPTS.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: i % 2 === 0 ? t.surface : 'transparent', borderRadius: 10, marginBottom: 4, border: `1px solid ${i % 2 === 0 ? t.border : 'transparent'}` }}>
            <span style={{ fontSize: 22 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{p.title}</div>
              <div style={{ fontSize: 11, color: t.textDim }}>{p.date}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: p.completed ? `${t.moss}30` : t.surface3, border: `1px solid ${p.completed ? t.moss : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.completed ? <Icon name="Check" size={11} color={t.mossLight} strokeWidth={2.5} /> : <Icon name="Minus" size={11} color={t.textDim} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Create Screen ────────────────────────────────────────────────────────────
function CreateScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('');
  const [aiOpen, setAiOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pressed, setPressed] = useState(null);

  const modes = [
    { id: 'text', label: 'Write', icon: 'PenLine' },
    { id: 'photo', label: 'Photo', icon: 'Camera' },
    { id: 'sketch', label: 'Sketch', icon: 'Pencil' },
    { id: 'audio', label: 'Speak', icon: 'Mic' },
  ];

  // ── Success screen ──
  if (submitted) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', background: t.bg }}>
        <div style={{ fontSize: 72, marginBottom: 18, textAlign: 'center' }}>🌺</div>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: t.gold, marginBottom: 8, textAlign: 'center', fontWeight: 700 }}>Era Emblem Unlocked!</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: t.text, textAlign: 'center', marginBottom: 6 }}>Sakura Sage</div>
        <div style={{ fontSize: 13, color: t.textMuted, textAlign: 'center', lineHeight: 1.65, marginBottom: 24 }}>
          Your response has been woven into your Chronicle Tapestry. You've earned <strong style={{ color: t.gold }}>+120 XP</strong>.
        </div>
        {text && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${t.gold}`, borderRadius: '0 12px 12px 0', padding: '14px 16px', width: '100%', marginBottom: 16, boxShadow: isDark ? `0 4px 14px rgba(0,0,0,0.4)` : `0 4px 10px rgba(0,0,0,0.1)` }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: t.gold, textTransform: 'uppercase', marginBottom: 6 }}>Your Woven Response</div>
            <div style={{ fontSize: 14, color: t.text, lineHeight: 1.65, fontStyle: 'italic' }}>"{text}"</div>
          </div>
        )}
        <button
          onClick={() => setActiveScreen('chronicle')}
          style={{ width: '100%', padding: '13px', borderRadius: 11, background: `linear-gradient(145deg, ${t.goldLight}, ${t.gold}, ${t.goldDim})`, border: 'none', color: isDark ? '#1A1810' : '#28201A', fontSize: 14, fontWeight: 700, fontFamily: "'Bitter', serif", cursor: 'pointer', boxShadow: `0 5px 16px rgba(201,169,75,0.45)`, marginBottom: 10 }}
        >
          View Chronicle Tapestry
        </button>
        <button
          onClick={() => setActiveScreen('home')}
          style={{ width: '100%', padding: '11px', borderRadius: 11, background: 'transparent', border: `1px solid ${t.border}`, color: t.textMuted, fontSize: 13, fontFamily: "'Bitter', serif", cursor: 'pointer' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const canSubmit = mode !== 'text' || text.length > 15;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <NavHeader t={t} isDark={isDark} setIsDark={setIsDark} setActiveScreen={setActiveScreen} label="Create" accent={t.terracotta} icon="Weave Your Response" />

      <div style={{ padding: '16px 18px' }}>
        {/* ── Prompt reminder ── */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${t.gold}`, borderRadius: '0 12px 12px 0', padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: t.gold, marginBottom: 5 }}>🌸 Today's Prompt</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 5 }}>{TODAY_DATA.prompt.title}</div>
          <div style={{ fontSize: 12.5, color: t.textMuted, lineHeight: 1.55 }}>{TODAY_DATA.prompt.challenge}</div>
        </div>

        {/* ── Mode selector — TACTILE RAISED BUTTONS ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>Choose Your Medium</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {modes.map(m => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{ padding: '11px 4px', borderRadius: 11, border: active ? `1px solid ${t.terracotta}` : `1px solid ${t.border}`, background: active ? `linear-gradient(160deg, ${t.terracottaDeep}, ${t.surface3})` : t.surface, cursor: 'pointer', textAlign: 'center', boxShadow: active ? `inset 0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px ${t.terracotta}30` : isDark ? `0 4px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)` : `0 3px 7px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.85)`, transform: active ? 'translateY(1px)' : 'none', transition: 'all 0.15s', fontFamily: "'Bitter', serif" }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                    <Icon name={m.icon} size={18} color={active ? t.terracottaLight : t.textMuted} />
                  </div>
                  <div style={{ fontSize: 11, color: active ? t.terracottaLight : t.textMuted, fontWeight: active ? 700 : 400 }}>{m.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Input area ── */}
        {mode === 'text' ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 8 }}>Your Response</div>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: isDark ? `inset 0 3px 10px rgba(0,0,0,0.35)` : `inset 0 2px 8px rgba(0,0,0,0.08)` }}>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Begin weaving your response… What impermanent beauty surrounds you right now?"
                style={{ width: '100%', minHeight: 130, padding: '14px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', color: t.text, fontSize: 14, fontFamily: "'Bitter', serif", lineHeight: 1.7 }}
              />
              <div style={{ padding: '8px 14px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: t.textDim }}>{text.length} / 500</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Icon name="Bold" size={13} color={t.textDim} />
                  <Icon name="Italic" size={13} color={t.textDim} />
                  <Icon name="AlignLeft" size={13} color={t.textDim} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ height: 150, background: t.surface, border: `2px dashed ${t.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
            <Icon name={modes.find(m => m.id === mode).icon} size={34} color={t.textDim} strokeWidth={1.2} />
            <div style={{ fontSize: 13, color: t.textDim, textAlign: 'center' }}>
              {mode === 'photo' ? 'Tap to capture or upload a photo' : mode === 'sketch' ? 'Tap to open the sketch canvas' : 'Tap to begin recording'}
            </div>
          </div>
        )}

        {/* ── AI Interpretive Guide — collapsible ── */}
        <div style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, marginBottom: 16, overflow: 'hidden' }}>
          <button
            onClick={() => setAiOpen(!aiOpen)}
            style={{ width: '100%', padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontFamily: "'Bitter', serif" }}
          >
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${t.moss}30`, border: `1px solid ${t.moss}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="Sparkles" size={14} color={t.mossLight} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>AI Interpretive Guide</div>
              <div style={{ fontSize: 11, color: t.textMuted }}>Optional creative nudges — no automation</div>
            </div>
            <Icon name={aiOpen ? 'ChevronUp' : 'ChevronDown'} size={16} color={t.textDim} />
          </button>
          {aiOpen && (
            <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65, paddingTop: 12 }}>
                <div style={{ color: t.mossLight, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>💡 Creative Nudges:</div>
                <div style={{ marginBottom: 8 }}>• Think of something you ate recently — how would you feel knowing it was the last time?</div>
                <div style={{ marginBottom: 8 }}>• Look out a window. Name three things that will look different in two weeks.</div>
                <div>• Try opening with: <em style={{ color: t.text }}>"There is something I noticed fading today…"</em></div>
              </div>
            </div>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          onClick={() => canSubmit && setSubmitted(true)}
          onMouseDown={() => canSubmit && setPressed('submit')}
          onMouseUp={() => setPressed(null)}
          onMouseLeave={() => setPressed(null)}
          style={{ width: '100%', padding: '14px', background: canSubmit ? `linear-gradient(150deg, ${t.terracottaLight}, ${t.terracotta}, ${t.terracottaDeep})` : t.surface3, border: 'none', borderRadius: 12, color: canSubmit ? '#fff' : t.textDim, fontSize: 15, fontWeight: 700, fontFamily: "'Bitter', serif", cursor: canSubmit ? 'pointer' : 'not-allowed', boxShadow: canSubmit ? pressed === 'submit' ? `inset 0 3px 10px rgba(0,0,0,0.45)` : `0 6px 18px rgba(196,120,88,0.5), inset 0 1px 0 rgba(255,255,255,0.18)` : 'none', transform: pressed === 'submit' ? 'translateY(1px)' : 'none', transition: 'all 0.1s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
        >
          <Icon name="Scroll" size={18} color={canSubmit ? '#fff' : t.textDim} />
          <span>Weave into Tapestry</span>
        </button>
        {!canSubmit && mode === 'text' && (
          <div style={{ fontSize: 11, color: t.textDim, textAlign: 'center', marginTop: 6 }}>Write at least a few words to continue</div>
        )}
      </div>
    </div>
  );
}

// ─── Chronicle Screen ─────────────────────────────────────────────────────────
function ChronicleScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('tapestry');

  const tabs = [
    { id: 'tapestry', label: 'Tapestry' },
    { id: 'emblems', label: 'Era Emblems' },
    { id: 'journey', label: 'Journey' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: t.bg }}>
      <NavHeader t={t} isDark={isDark} setIsDark={setIsDark} setActiveScreen={setActiveScreen} label="My Chronicle" accent={t.gold} icon="Personal Tapestry" />

      {/* ── Stats bar ── */}
      <div style={{ padding: '14px 20px', background: t.surface, borderBottom: `1px solid ${t.border}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { label: 'Prompts', value: '23', icon: 'BookOpen', color: t.moss },
          { label: 'Emblems', value: '5', icon: 'Award', color: t.gold },
          { label: 'Day Streak', value: '7', icon: 'Flame', color: t.terracotta },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
              <Icon name={stat.icon} size={14} color={stat.color} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: t.textDim, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', padding: '0 20px', borderBottom: `1px solid ${t.border}` }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 14px', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? `2px solid ${t.gold}` : '2px solid transparent', color: activeTab === tab.id ? t.gold : t.textMuted, fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 400, fontFamily: "'Bitter', serif", cursor: 'pointer', marginBottom: -1, transition: 'all 0.2s' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 18px 24px' }}>
        {/* ── TAPESTRY TAB — ASYMMETRIC mosaic grid ── */}
        {activeTab === 'tapestry' && (
          <div>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
              Each piece you've woven into your chronicle — personal artifacts of seasonal wisdom.
            </div>
            {/* Asymmetric mosaic: tall left + 2 stacked right */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 10, marginBottom: 10 }}>
              {/* Large featured */}
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderTop: `3px solid ${t.gold}`, borderRadius: 16, padding: 16, gridRow: 'span 2', boxShadow: isDark ? `0 5px 18px rgba(0,0,0,0.45)` : `0 4px 12px rgba(0,0,0,0.1)` }}>
                <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>❄️</span>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: t.gold, marginBottom: 4 }}>Dec 21</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 8 }}>Winter Solstice Meditation</div>
                <div style={{ fontSize: 12.5, color: t.textMuted, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 10 }}>
                  "The longest night is not the darkest — it is the threshold where darkness begins its retreat, and light reclaims its ground."
                </div>
                <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: `${t.moss}25`, color: t.mossLight, border: `1px solid ${t.moss}40` }}>Text</span>
              </div>
              {/* Small top-right */}
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderTop: `3px solid ${t.terracotta}`, borderRadius: 14, padding: 12, boxShadow: isDark ? `0 3px 10px rgba(0,0,0,0.35)` : `0 2px 8px rgba(0,0,0,0.1)` }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 6 }}>🕯️</span>
                <div style={{ fontSize: 10, color: t.textDim, marginBottom: 3 }}>Feb 2</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Candlemas Poem</div>
              </div>
              {/* Small bottom-right */}
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderTop: `3px solid ${t.moss}`, borderRadius: 14, padding: 12, boxShadow: isDark ? `0 3px 10px rgba(0,0,0,0.35)` : `0 2px 8px rgba(0,0,0,0.1)` }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 6 }}>🌿</span>
                <div style={{ fontSize: 10, color: t.textDim, marginBottom: 3 }}>Mar 20</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Equinox Sketch</div>
              </div>
            </div>
            {/* Full-width entries */}
            {[
              { emoji: '🌸', date: 'Mar 28', title: 'Blossom Haiku', type: 'Poem', preview: '"Petals to the wind — each one a year uncounted, falling without fear."' },
              { emoji: '🌧️', date: 'Apr 1', title: 'April Rain Reflection', type: 'Text', preview: '"There is something honest about rain that does not pretend to last forever…"' },
            ].map(item => (
              <div key={item.title} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', marginBottom: 10, display: 'flex', gap: 12, boxShadow: isDark ? `0 3px 10px rgba(0,0,0,0.3)` : `0 2px 8px rgba(0,0,0,0.08)` }}>
                <span style={{ fontSize: 30 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{item.title}</div>
                    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: `${t.warmGrey}22`, color: t.warmGrey, border: `1px solid ${t.warmGrey}35` }}>{item.type}</span>
                  </div>
                  <div style={{ fontSize: 11, color: t.textDim, marginBottom: 5 }}>{item.date}</div>
                  <div style={{ fontSize: 12.5, color: t.textMuted, fontStyle: 'italic', lineHeight: 1.5 }}>{item.preview}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── EMBLEMS TAB ── */}
        {activeTab === 'emblems' && (
          <div>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
              Era Emblems mark your journey through seasonal wisdom. Complete challenges to unlock them.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {EMBLEMS.map(emblem => (
                <div key={emblem.id} style={{ background: t.surface, border: emblem.current ? `2px solid ${t.gold}` : `1px solid ${t.border}`, borderRadius: 14, padding: '16px 12px', textAlign: 'center', opacity: emblem.unlocked || emblem.current ? 1 : 0.42, boxShadow: emblem.current ? `0 0 0 2px ${t.goldDim}60, 0 5px 16px ${t.gold}35` : emblem.unlocked ? isDark ? `0 4px 12px rgba(0,0,0,0.4)` : `0 3px 8px rgba(0,0,0,0.1)` : 'none', position: 'relative' }}>
                  {emblem.current && (
                    <div style={{ position: 'absolute', top: -9, right: -2, background: t.gold, color: isDark ? '#1A1810' : '#28201A', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, letterSpacing: 0.8 }}>NEXT</div>
                  )}
                  <span style={{ fontSize: 34, display: 'block', marginBottom: 8, opacity: emblem.unlocked ? 1 : 0.35 }}>{emblem.emoji}</span>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: t.text, lineHeight: 1.25, marginBottom: 4 }}>{emblem.name}</div>
                  <div style={{ fontSize: 10, color: t.textDim, marginBottom: 8 }}>{emblem.date}</div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {emblem.unlocked
                      ? <Icon name="CheckCircle" size={15} color={t.moss} />
                      : emblem.current
                        ? <Icon name="Circle" size={15} color={t.gold} />
                        : <Icon name="Lock" size={14} color={t.textDim} strokeWidth={1.5} />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── JOURNEY TAB ── */}
        {activeTab === 'journey' && (
          <div>
            {/* XP card */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderTop: `3px solid ${t.gold}`, borderRadius: 14, padding: 18, marginBottom: 16, boxShadow: isDark ? `0 5px 18px rgba(0,0,0,0.45)` : `0 4px 12px rgba(0,0,0,0.1)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: t.textDim, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 }}>Total XP</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: t.gold, lineHeight: 1 }}>2,840</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: t.textDim, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 }}>Level</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>Archivist</div>
                </div>
              </div>
              <div style={{ height: 7, background: t.surface3, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ width: '68%', height: '100%', background: `linear-gradient(90deg, ${t.goldDim}, ${t.gold}, ${t.goldLight})`, borderRadius: 4, boxShadow: `0 0 10px ${t.gold}60` }} />
              </div>
              <div style={{ fontSize: 11.5, color: t.textDim }}>2,840 / 4,200 XP · Next: <span style={{ color: t.text, fontWeight: 600 }}>Sage</span></div>
            </div>

            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10 }}>Seasonal Journey</div>
            {[
              { label: 'Winter 2025', count: 8, emoji: '❄️', color: t.warmGrey, current: false, upcoming: false },
              { label: 'Spring 2026', count: 15, emoji: '🌱', color: t.moss, current: true, upcoming: false },
              { label: 'Summer 2026', count: 0, emoji: '☀️', color: t.gold, current: false, upcoming: true },
            ].map(season => (
              <div key={season.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: season.current ? `${t.moss}14` : t.surface, border: season.current ? `1px solid ${t.moss}45` : `1px solid ${t.border}`, borderRadius: 12, marginBottom: 8, opacity: season.upcoming ? 0.48 : 1 }}>
                <span style={{ fontSize: 26 }}>{season.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text }}>
                    {season.label}
                    {season.current && <span style={{ fontSize: 9, color: t.moss, marginLeft: 8, letterSpacing: 1, fontWeight: 700 }}>ACTIVE</span>}
                  </div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>
                    {season.upcoming ? 'Upcoming season' : `${season.count} challenges completed`}
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: season.color }}>{season.upcoming ? '—' : season.count}</div>
              </div>
            ))}

            {/* Creation type breakdown */}
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: t.textDim, marginBottom: 10, marginTop: 6 }}>Creative Output</div>
            {[
              { label: 'Written Pieces', count: 12, icon: 'PenLine', color: t.terracotta },
              { label: 'Photos Taken', count: 6, icon: 'Camera', color: t.moss },
              { label: 'Sketches Made', count: 3, icon: 'Pencil', color: t.gold },
              { label: 'Audio Reflections', count: 2, icon: 'Mic', color: t.warmGrey },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: `1px solid ${t.border}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${item.color}20`, border: `1px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={item.icon} size={14} color={item.color} />
                </div>
                <div style={{ flex: 1, fontSize: 13, color: t.text }}>{item.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');

  const t = isDark ? THEMES.dark : THEMES.light;

  const screens = {
    home: HomeScreen,
    explore: ExploreScreen,
    create: CreateScreen,
    chronicle: ChronicleScreen,
  };

  const ScreenComponent = screens[activeScreen];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bitter', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(140,128,117,0.4); border-radius: 2px; }
        button { font-family: 'Bitter', Georgia, serif; }
        textarea { font-family: 'Bitter', Georgia, serif; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 36px 90px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(80,70,55,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)',
      }}>
        <ScreenComponent
          t={t}
          isDark={isDark}
          setIsDark={setIsDark}
          setActiveScreen={setActiveScreen}
          activeScreen={activeScreen}
        />
      </div>
    </div>
  );
}
