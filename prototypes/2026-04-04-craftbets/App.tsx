const { useState, useEffect, useRef } = React;

// ─── DATA ───────────────────────────────────────────────────────────────────

const challengeData = [
  {
    id: 1, title: 'Short Animation Sprint', desc: 'Create a 30-sec looping animation',
    creator: 'NeonBrush_Kai', category: 'Animation', daysLeft: 6, totalDays: 10,
    wager: 5, participants: 24, progress: 60, hot: true, emoji: '🎬', color: '#FF2D1A',
  },
  {
    id: 2, title: 'Handmade Chess Set', desc: 'Carve & paint a full chess set by hand',
    creator: 'WoodcraftMira', category: 'Woodcraft', daysLeft: 18, totalDays: 30,
    wager: 10, participants: 12, progress: 40, hot: false, emoji: '♟️', color: '#00FFD4',
  },
  {
    id: 3, title: 'Illustrated Zine', desc: 'Design & print a 12-page art zine',
    creator: 'InkDrop_Sol', category: 'Illustration', daysLeft: 3, totalDays: 14,
    wager: 3, participants: 31, progress: 78, hot: true, emoji: '📓', color: '#FFE44D',
  },
  {
    id: 4, title: 'Beat Drop Challenge', desc: 'Produce an original 2-min track',
    creator: 'BassLine_Jo', category: 'Music', daysLeft: 9, totalDays: 14,
    wager: 8, participants: 19, progress: 35, hot: false, emoji: '🎵', color: '#FF8C00',
  },
  {
    id: 5, title: 'Ceramic Mug Series', desc: 'Throw & glaze 5 unique mugs',
    creator: 'ClayHands_Rue', category: 'Ceramics', daysLeft: 22, totalDays: 28,
    wager: 15, participants: 8, progress: 21, hot: false, emoji: '🏺', color: '#B04AFF',
  },
];

const myBets = [
  {
    id: 1, title: 'Short Animation Sprint', wager: 5, daysLeft: 6,
    totalDays: 10, progress: 60, verified: true, updates: 4, emoji: '🎬', status: 'on-track',
  },
  {
    id: 2, title: 'Illustrated Zine', wager: 3, daysLeft: 3,
    totalDays: 14, progress: 78, verified: false, updates: 8, emoji: '📓', status: 'critical',
  },
];

const badgesData = [
  { id: 1, name: 'First Blood', emoji: '⚡', earned: true },
  { id: 2, name: 'On Fire', emoji: '🔥', earned: true },
  { id: 3, name: 'Verified', emoji: '✅', earned: true },
  { id: 4, name: 'High Roller', emoji: '💎', earned: false },
  { id: 5, name: 'Speed Demon', emoji: '💨', earned: false },
  { id: 6, name: 'Community Pillar', emoji: '🏛️', earned: false },
];

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────

function HomeScreen({ t, setActiveTab }) {
  const [pressedBtn, setPressedBtn] = useState(null);
  const featured = challengeData[0];

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, color: t.secondary, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>
            Welcome back
          </div>
          <div style={{ fontSize: 24, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1.1 }}>
            Craft<span style={{ color: t.primary }}>Maker</span>_Rex
          </div>
        </div>
        <div style={{
          background: t.primary, border: `3px solid ${t.border}`,
          boxShadow: `3px 3px 0 ${t.border}`, padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          <div>
            <div style={{ fontSize: 9, color: '#fff', fontFamily: 'Archivo Black', letterSpacing: 2 }}>STREAK</div>
            <div style={{ fontSize: 20, color: '#fff', fontFamily: 'Archivo Black', lineHeight: 1 }}>7</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {[
          { label: 'Active', value: '2', color: t.secondary },
          { label: 'Won', value: '$23', color: '#FFE44D' },
          { label: 'Rank', value: '#47', color: t.primary },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, background: t.cardBg, border: `3px solid ${t.border}`,
            boxShadow: `3px 3px 0 ${t.border}`, padding: '10px 6px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, color: stat.color, fontFamily: 'Archivo Black' }}>{stat.value}</div>
            <div style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 1, textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 12, height: 12, background: t.primary, flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>
          Featured Challenge
        </span>
      </div>

      {/* Featured Challenge */}
      <div style={{
        background: t.primary, border: `3px solid ${t.border}`,
        boxShadow: `6px 6px 0 ${t.border}`, padding: 16,
        position: 'relative', overflow: 'hidden', marginBottom: 20,
      }}>
        <div style={{ position: 'absolute', top: -24, right: -24, width: 80, height: 80, background: 'rgba(0,0,0,0.18)', transform: 'rotate(45deg)' }} />
        <div style={{ position: 'absolute', bottom: -16, left: -16, width: 60, height: 60, background: 'rgba(0,0,0,0.1)', transform: 'rotate(15deg)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: 40 }}>{featured.emoji}</div>
          <div style={{ background: '#0A0A0A', padding: '4px 10px', fontFamily: 'Archivo Black', fontSize: 11, color: '#FFE44D', border: '2px solid #FFE44D' }}>
            HOT 🔥
          </div>
        </div>

        <div style={{ fontSize: 22, color: '#fff', fontFamily: 'Archivo Black', marginTop: 8, lineHeight: 1.1 }}>{featured.title}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Archivo', marginTop: 4 }}>{featured.desc}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo' }}>by </span>
            <span style={{ fontSize: 11, color: '#FFE44D', fontFamily: 'Archivo Black' }}>@{featured.creator}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#fff', fontFamily: 'Archivo Black' }}>👥 {featured.participants}</span>
            <div
              onClick={() => handlePress('feat')}
              style={{
                background: '#FFE44D', padding: '7px 14px', border: '2px solid #0A0A0A',
                boxShadow: pressedBtn === 'feat' ? 'none' : '2px 2px 0 #0A0A0A',
                transform: pressedBtn === 'feat' ? 'translate(2px,2px)' : 'none',
                color: '#0A0A0A', fontFamily: 'Archivo Black', fontSize: 12, cursor: 'pointer',
                transition: 'all 0.1s',
              }}>
              BET ${featured.wager}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, background: 'rgba(0,0,0,0.35)', height: 8, border: '2px solid rgba(0,0,0,0.5)' }}>
          <div style={{ width: `${featured.progress}%`, height: '100%', background: '#FFE44D' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo' }}>{featured.progress}% done</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo' }}>{featured.daysLeft} days left</span>
        </div>
      </div>

      {/* Active Now */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, background: t.secondary, flexShrink: 0 }} />
          <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Active Now</span>
        </div>
        <span onClick={() => setActiveTab('discover')} style={{ fontSize: 10, color: t.primary, fontFamily: 'Archivo Black', cursor: 'pointer', letterSpacing: 1 }}>
          SEE ALL →
        </span>
      </div>

      {/* Compact challenge rows — alternating offsets */}
      {challengeData.slice(1, 4).map((c, i) => (
        <div key={c.id} style={{
          background: t.cardBg, border: `3px solid ${t.border}`,
          boxShadow: i % 2 === 0 ? `4px 4px 0 ${t.border}` : `-4px 4px 0 ${t.border}`,
          padding: '10px 12px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 10,
          marginLeft: i % 2 === 1 ? 8 : 0,
          marginRight: i % 2 === 0 ? 8 : 0,
        }}>
          <div style={{
            width: 44, height: 44, background: c.color, border: `2px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>{c.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
            <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo', marginTop: 2 }}>👥 {c.participants} · {c.daysLeft}d left</div>
            <div style={{ height: 5, background: t.surfaceDim, marginTop: 5, border: `1px solid ${t.border}` }}>
              <div style={{ width: `${c.progress}%`, height: '100%', background: c.color }} />
            </div>
          </div>
          <div style={{
            background: t.primary, border: `2px solid ${t.border}`, boxShadow: `2px 2px 0 ${t.border}`,
            padding: '6px 10px', fontFamily: 'Archivo Black', fontSize: 12, color: '#fff',
            cursor: 'pointer', flexShrink: 0,
          }}>${c.wager}</div>
        </div>
      ))}

      {/* Community nudge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 8 }}>
        <div style={{ width: 12, height: 12, background: '#FFE44D', flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Community</span>
      </div>
      <div style={{
        background: t.cardBg, border: `3px solid ${t.secondary}`,
        boxShadow: `4px 4px 0 ${t.secondary}`, padding: 14, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: t.secondary, fontFamily: 'Archivo Black', marginBottom: 4 }}>
          @NeonBrush_Kai posted an update 🎬
        </div>
        <div style={{ fontSize: 12, color: t.textMuted, fontFamily: 'Archivo', lineHeight: 1.5 }}>
          "Day 4 done! Keyframes locked. Motion blur tests tomorrow — this one's going to be 🔥"
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
          <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo' }}>❤️ 12 likes</span>
          <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo' }}>✅ 5 verifications</span>
        </div>
      </div>
    </div>
  );
}

// ─── DISCOVER SCREEN ─────────────────────────────────────────────────────────

function DiscoverScreen({ t }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Animation', 'Woodcraft', 'Illustration', 'Music', 'Ceramics'];

  const filtered = challengeData.filter(c =>
    activeCategory === 'All' || c.category === activeCategory
  );

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Brutalist header block */}
      <div style={{
        background: t.cardBg, border: `3px solid ${t.border}`,
        boxShadow: `5px 5px 0 ${t.primary}`, padding: '14px 16px', marginBottom: 18,
      }}>
        <div style={{ fontSize: 10, color: t.secondary, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
          Marketplace
        </div>
        <div style={{ fontSize: 28, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1 }}>
          FIND YOUR<br /><span style={{ color: t.primary }}>CHALLENGE</span>
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        background: t.inputBg, border: `3px solid ${t.border}`,
        boxShadow: `3px 3px 0 ${t.border}`, display: 'flex',
        alignItems: 'center', padding: '10px 14px', gap: 10, marginBottom: 14,
      }}>
        {React.createElement(window.lucide.Search, { size: 15, color: t.textMuted })}
        <span style={{ fontSize: 13, color: t.textMuted, fontFamily: 'Archivo' }}>Search challenges...</span>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 2 }}>
        {categories.map(cat => (
          <div key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '6px 14px', flexShrink: 0,
            background: activeCategory === cat ? t.primary : t.cardBg,
            border: `3px solid ${t.border}`,
            boxShadow: activeCategory === cat ? `3px 3px 0 ${t.border}` : 'none',
            fontFamily: 'Archivo Black', fontSize: 10, letterSpacing: 1,
            color: activeCategory === cat ? '#fff' : t.textMuted,
            cursor: 'pointer', textTransform: 'uppercase',
          }}>{cat}</div>
        ))}
      </div>

      {/* First card — full width, prominent */}
      {filtered.length > 0 && (
        <div style={{
          background: t.cardBg, border: `3px solid ${t.border}`,
          boxShadow: `6px 6px 0 ${filtered[0].color}`, padding: 16, marginBottom: 12,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: filtered[0].color, border: `2px solid ${t.border}`,
            padding: '2px 8px', fontFamily: 'Archivo Black', fontSize: 9, color: '#fff', letterSpacing: 1,
          }}>{filtered[0].category.toUpperCase()}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 60, height: 60, background: filtered[0].color, border: `2px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, flexShrink: 0,
            }}>{filtered[0].emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1.1 }}>{filtered[0].title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Archivo', marginTop: 4 }}>{filtered[0].desc}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo' }}>@{filtered[0].creator}</div>
              <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo' }}>👥 {filtered[0].participants} · {filtered[0].totalDays}d challenge</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 26, color: t.primary, fontFamily: 'Archivo Black', lineHeight: 1 }}>${filtered[0].wager}</div>
              <div style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Archivo' }}>to wager</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <div style={{
              flex: 1, background: t.primary, border: `2px solid ${t.border}`,
              boxShadow: `2px 2px 0 ${t.border}`, padding: '10px',
              textAlign: 'center', fontFamily: 'Archivo Black', fontSize: 12,
              color: '#fff', cursor: 'pointer',
            }}>BET ${filtered[0].wager} NOW</div>
            <div style={{
              background: t.cardBg, border: `2px solid ${t.border}`,
              padding: '10px 14px', fontFamily: 'Archivo Black',
              fontSize: 14, color: t.text, cursor: 'pointer',
            }}>👁</div>
          </div>
        </div>
      )}

      {/* Remaining — 2-col with staggered offset (brutalist asymmetry) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {filtered.slice(1).map((c, i) => (
          <div key={c.id} style={{
            background: t.cardBg, border: `3px solid ${t.border}`,
            boxShadow: i % 2 === 0 ? `4px 4px 0 ${c.color}` : `4px 4px 0 ${t.border}`,
            padding: 12, marginTop: i % 2 === 1 ? 14 : 0,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
            <div style={{
              display: 'inline-block', background: c.color, border: `1px solid ${t.border}`,
              padding: '1px 6px', fontFamily: 'Archivo Black', fontSize: 8,
              color: '#fff', letterSpacing: 1, marginBottom: 6,
            }}>{c.category.toUpperCase()}</div>
            <div style={{ fontSize: 13, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1.2, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo', marginBottom: 10 }}>
              {c.daysLeft}d left · {c.participants} in
            </div>
            <div style={{ height: 4, background: t.surfaceDim, marginBottom: 10, border: `1px solid ${t.border}` }}>
              <div style={{ width: `${c.progress}%`, height: '100%', background: c.color }} />
            </div>
            <div style={{
              background: c.color, border: `2px solid ${t.border}`, padding: '7px',
              textAlign: 'center', fontFamily: 'Archivo Black', fontSize: 12,
              color: '#fff', cursor: 'pointer',
            }}>${c.wager} BET</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BETS SCREEN ─────────────────────────────────────────────────────────────

function BetsScreen({ t }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Header block */}
      <div style={{
        background: t.primary, border: `3px solid ${t.border}`,
        boxShadow: `5px 5px 0 ${t.border}`, padding: '14px 16px', marginBottom: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>YOUR STAKES</div>
          <div style={{ fontSize: 34, color: '#fff', fontFamily: 'Archivo Black', lineHeight: 1 }}>$8</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Archivo' }}>on the line</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo Black', letterSpacing: 2 }}>POTENTIAL WIN</div>
          <div style={{ fontSize: 22, color: '#FFE44D', fontFamily: 'Archivo Black' }}>$16</div>
        </div>
      </div>

      {/* Active bets label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 12, height: 12, background: t.primary, flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Active Bets</span>
      </div>

      {/* Bet cards */}
      {myBets.map((bet, i) => {
        const isCritical = bet.status === 'critical';
        const accentColor = isCritical ? t.primary : t.secondary;
        return (
          <div key={bet.id} style={{
            background: t.cardBg, border: `3px solid ${accentColor}`,
            boxShadow: `4px 4px 0 ${accentColor}`, padding: 14,
            marginBottom: 16, marginLeft: i % 2 === 1 ? 8 : 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{
                  width: 42, height: 42, background: accentColor, border: `2px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                }}>{bet.emoji}</div>
                <div>
                  <div style={{ fontSize: 14, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1.1 }}>{bet.title}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo', marginTop: 2 }}>{bet.updates} updates posted</div>
                </div>
              </div>
              <div style={{
                background: accentColor, border: `2px solid ${t.border}`,
                padding: '3px 8px', fontFamily: 'Archivo Black', fontSize: 9,
                color: isCritical ? '#fff' : '#0A0A0A', letterSpacing: 1,
              }}>{isCritical ? '⚠ URGENT' : '✓ ON TRACK'}</div>
            </div>

            {/* Stats trio */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {[
                { label: 'DAYS LEFT', value: bet.daysLeft },
                { label: 'WAGER', value: `$${bet.wager}` },
                { label: 'PROGRESS', value: `${bet.progress}%` },
              ].map((s, si) => (
                <div key={si} style={{
                  flex: 1, background: t.surfaceDim, border: `2px solid ${t.border}`,
                  padding: '8px 4px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 18, color: accentColor, fontFamily: 'Archivo Black', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 8, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ height: 10, background: t.surfaceDim, border: `2px solid ${t.border}`, marginBottom: 10 }}>
              <div style={{ width: `${bet.progress}%`, height: '100%', background: accentColor, transition: 'width 0.3s' }} />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                flex: 1, background: '#0A0A0A', border: `2px solid ${t.border}`,
                padding: '9px', textAlign: 'center', fontFamily: 'Archivo Black',
                fontSize: 11, color: '#fff', cursor: 'pointer',
              }}>📹 POST UPDATE</div>
              <div style={{
                background: t.cardBg, border: `2px solid ${t.border}`,
                padding: '9px 12px', fontFamily: 'Archivo Black',
                fontSize: 10, color: t.text, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{bet.verified ? '✅ VERIFIED' : '⏳ PENDING'}</div>
            </div>
          </div>
        );
      })}

      {/* Recent Win */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 12, height: 12, background: '#FFE44D', flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Recent Win</span>
      </div>
      <div style={{
        background: '#FFE44D', border: `3px solid ${t.border}`,
        boxShadow: `4px 4px 0 ${t.border}`, padding: 14,
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20,
      }}>
        <div style={{ fontSize: 36 }}>🏆</div>
        <div>
          <div style={{ fontSize: 16, color: '#0A0A0A', fontFamily: 'Archivo Black' }}>Ceramic Mug Series</div>
          <div style={{ fontSize: 12, color: '#333', fontFamily: 'Archivo', marginTop: 2 }}>Won $15 · Finished 3 days early</div>
          <div style={{ fontSize: 10, color: '#555', fontFamily: 'Archivo', marginTop: 4 }}>⚡ Speed Demon badge earned!</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 12, height: 12, background: t.secondary, flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Community Rank</span>
      </div>
      {[
        { rank: 1, name: 'WoodcraftMira', score: 340, icon: '👑' },
        { rank: 2, name: 'InkDrop_Sol', score: 287, icon: '🥈' },
        { rank: 47, name: 'CraftMaker_Rex', score: 93, icon: '⚡', isMe: true },
      ].map(user => (
        <div key={user.rank} style={{
          background: user.isMe ? t.primary : t.cardBg,
          border: `3px solid ${t.border}`,
          boxShadow: user.isMe ? `4px 4px 0 ${t.border}` : 'none',
          padding: '10px 14px', display: 'flex', alignItems: 'center',
          gap: 10, marginBottom: 6,
        }}>
          <div style={{ fontSize: 15, fontFamily: 'Archivo Black', color: user.isMe ? '#fff' : t.textMuted, width: 30 }}>#{user.rank}</div>
          <div style={{ flex: 1, fontSize: 13, color: user.isMe ? '#fff' : t.text, fontFamily: 'Archivo Black' }}>
            {user.icon} {user.name}
          </div>
          <div style={{ fontSize: 13, color: user.isMe ? '#FFE44D' : t.textMuted, fontFamily: 'Archivo Black' }}>{user.score}pts</div>
        </div>
      ))}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────

function ProfileScreen({ t, isDark, setIsDark }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Profile block — brutalist asymmetric */}
      <div style={{
        background: t.primary, border: `3px solid ${t.border}`,
        boxShadow: `6px 6px 0 ${t.border}`, padding: 16,
        marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 72, height: 72, background: 'rgba(0,0,0,0.2)', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 66, height: 66, background: '#FFE44D', border: `3px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontFamily: 'Archivo Black', color: '#0A0A0A', flexShrink: 0,
          }}>R</div>
          <div>
            <div style={{ fontSize: 19, color: '#fff', fontFamily: 'Archivo Black', lineHeight: 1.1 }}>CraftMaker_Rex</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'Archivo', marginTop: 2 }}>Level 3 — Rising Creator</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 7 }}>
              {['🔥', '⚡', '✅'].map((b, i) => (
                <div key={i} style={{ fontSize: 14, background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.3)', padding: '2px 7px' }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo Black', letterSpacing: 2 }}>TO LEVEL 4</span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: 'Archivo Black' }}>93 / 150 pts</span>
          </div>
          <div style={{ height: 10, background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
            <div style={{ width: '62%', height: '100%', background: '#FFE44D' }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Challenges', value: '12', sub: 'completed', accent: t.primary },
          { label: 'Win Rate', value: '75%', sub: 'success', accent: t.secondary },
          { label: 'Earned', value: '$47', sub: 'total', accent: '#FFE44D' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: t.cardBg, border: `3px solid ${t.border}`,
            boxShadow: `0 4px 0 ${s.accent}`, padding: '12px 6px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, color: s.accent, fontFamily: 'Archivo Black' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: t.text, fontFamily: 'Archivo Black', lineHeight: 1, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 9, color: t.textMuted, fontFamily: 'Archivo', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 12, height: 12, background: '#FFE44D', flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>Achievement Badges</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
        {badgesData.map((badge, i) => {
          const shadowColors = [t.primary, t.secondary, '#FFE44D'];
          return (
            <div key={badge.id} style={{
              background: badge.earned ? t.cardBg : t.surfaceDim,
              border: `3px solid ${badge.earned ? t.border : t.textMuted}`,
              boxShadow: badge.earned ? `3px 3px 0 ${shadowColors[i % 3]}` : 'none',
              padding: '12px 8px', textAlign: 'center',
              opacity: badge.earned ? 1 : 0.45,
            }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{badge.emoji}</div>
              <div style={{ fontSize: 10, color: badge.earned ? t.text : t.textMuted, fontFamily: 'Archivo Black', lineHeight: 1.2 }}>{badge.name}</div>
            </div>
          );
        })}
      </div>

      {/* My Cohort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 12, height: 12, background: t.secondary, flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: 'Archivo Black', letterSpacing: 3, textTransform: 'uppercase' }}>My Cohort</span>
      </div>
      <div style={{
        background: t.cardBg, border: `3px solid ${t.secondary}`,
        boxShadow: `4px 4px 0 ${t.secondary}`, padding: 14, marginBottom: 16,
      }}>
        <div style={{ fontSize: 14, color: t.text, fontFamily: 'Archivo Black', marginBottom: 10 }}>Animation Hustlers 🎬</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {[['NK', t.primary], ['ID', t.secondary], ['BJ', '#FFE44D'], ['RX', '#FF8C00']].map(([init, color], i) => (
            <div key={i} style={{
              width: 32, height: 32, background: color, border: `2px solid ${t.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontFamily: 'Archivo Black', color: '#fff',
            }}>{init}</div>
          ))}
          <div style={{
            width: 32, height: 32, background: t.surfaceDim, border: `2px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: t.textMuted,
          }}>+</div>
        </div>
        <div style={{ fontSize: 11, color: t.textMuted, fontFamily: 'Archivo' }}>4 members · 2 challenges active</div>
      </div>

      {/* Theme Toggle */}
      <div style={{
        background: t.cardBg, border: `3px solid ${t.border}`,
        boxShadow: `3px 3px 0 ${t.border}`, padding: '12px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 13, color: t.text, fontFamily: 'Archivo Black' }}>
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </div>
        <div onClick={() => setIsDark(!isDark)} style={{
          width: 54, height: 28, background: isDark ? t.primary : '#CCC',
          border: `3px solid ${t.border}`, position: 'relative', cursor: 'pointer',
        }}>
          <div style={{
            position: 'absolute', top: 2, left: isDark ? 26 : 2,
            width: 18, height: 18, background: '#fff',
            border: `2px solid ${t.border}`, transition: 'left 0.15s',
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function App() {
  const themes = {
    dark: {
      bg: '#1C1C1C',
      cardBg: '#252525',
      surfaceDim: '#181818',
      inputBg: '#2E2E2E',
      text: '#F5F0EB',
      textMuted: '#7A7A7A',
      primary: '#FF2D1A',
      secondary: '#00FFD4',
      border: '#0A0A0A',
      navBg: '#0A0A0A',
    },
    light: {
      bg: '#F0EBE3',
      cardBg: '#FFFFFF',
      surfaceDim: '#E3DDD5',
      inputBg: '#E0DAD1',
      text: '#0A0A0A',
      textMuted: '#666666',
      primary: '#FF2D1A',
      secondary: '#008F7A',
      border: '#0A0A0A',
      navBg: '#0A0A0A',
    },
  };

  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? themes.dark : themes.light;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'discover', label: 'Discover', icon: window.lucide.Compass },
    { id: 'bets', label: 'My Bets', icon: window.lucide.Zap },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    discover: DiscoverScreen,
    bets: BetsScreen,
    profile: ProfileScreen,
  };
  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo Black', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: t.bg,
        borderRadius: 44, overflow: 'hidden', position: 'relative',
        border: '2px solid #333',
        boxShadow: '0 0 0 8px #1a1a1a, 0 40px 80px rgba(0,0,0,0.5)',
        transition: 'background 0.25s',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%',
          transform: 'translateX(-50%)', width: 120, height: 34,
          background: '#000', borderRadius: 20, zIndex: 100,
        }} />

        {/* Status bar */}
        <div style={{
          height: 50, display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', padding: '0 24px 8px',
          color: t.text, fontSize: 13, position: 'relative', zIndex: 10,
        }}>
          <span style={{ fontFamily: 'Archivo Black', fontSize: 13 }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {React.createElement(window.lucide.Wifi, { size: 13, color: t.text })}
            {React.createElement(window.lucide.Signal, { size: 13, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 13, color: t.text })}
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ height: 'calc(812px - 50px - 68px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <CurrentScreen t={t} isDark={isDark} setIsDark={setIsDark} setActiveTab={setActiveTab} />
        </div>

        {/* Bottom nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 68,
          background: t.navBg, display: 'flex',
          borderTop: `3px solid ${t.primary}`,
        }}>
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 3, cursor: 'pointer',
                borderTop: activeTab === tab.id ? `3px solid ${t.primary}` : '3px solid transparent',
                marginTop: -3,
                background: activeTab === tab.id ? 'rgba(255,45,26,0.1)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              {React.createElement(tab.icon, { size: 20, color: activeTab === tab.id ? t.primary : '#555' })}
              <span style={{
                fontSize: 9, fontFamily: 'Archivo Black',
                color: activeTab === tab.id ? t.primary : '#555',
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
