const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F5EAD0',
    cardBg: '#FFFFFF',
    navBg: '#0F1C4D',
    text: '#0F1C4D',
    textSub: '#7A6B58',
    primary: '#E8323C',
    navy: '#0F1C4D',
    accent: '#FFD166',
    border: '#0F1C4D',
    inputBg: '#EDE4C5',
    subtleBg: '#EDE4C5',
    green: '#27AE60',
    divider: '#D4C9B0',
  },
  dark: {
    bg: '#0A0F2E',
    cardBg: '#141B3F',
    navBg: '#060A1E',
    text: '#F5EAD0',
    textSub: '#A09882',
    primary: '#E8323C',
    navy: '#F5EAD0',
    accent: '#FFD166',
    border: '#2E3F7A',
    inputBg: '#1A2245',
    subtleBg: '#1A2245',
    green: '#2ECC71',
    divider: '#1E2A55',
  }
};

function StatusBar({ theme }) {
  return (
    <div style={{
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: theme.bg,
      flexShrink: 0,
      position: 'relative',
    }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700', fontSize: 14, color: theme.text }}>9:41</span>
      <div style={{
        width: 120, height: 30,
        background: '#000',
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 7,
        zIndex: 10,
      }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {React.createElement(window.lucide.Wifi, { size: 14, color: theme.text })}
        {React.createElement(window.lucide.Battery, { size: 16, color: theme.text })}
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab, tabs, theme }) {
  return (
    <div style={{
      background: theme.navBg,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0 20px',
      flexShrink: 0,
      borderTop: '3px solid ' + theme.primary,
    }}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '4px 10px',
            cursor: 'pointer',
            opacity: activeTab === tab.id ? 1 : 0.4,
            transition: 'opacity 0.15s',
          }}
        >
          {React.createElement(tab.icon, {
            size: 22,
            color: activeTab === tab.id ? theme.accent : '#F5EAD0',
            strokeWidth: activeTab === tab.id ? 2.5 : 1.5,
          })}
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 10,
            letterSpacing: 1,
            color: activeTab === tab.id ? theme.accent : '#F5EAD0',
          }}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}

function AngledCard({ children, theme, style = {}, accentColor, cornerSize = 18 }) {
  const border = accentColor || theme.border;
  return (
    <div style={{
      background: theme.cardBg,
      border: '2.5px solid ' + border,
      clipPath: `polygon(0 0, calc(100% - ${cornerSize}px) 0, 100% ${cornerSize}px, 100% 100%, 0 100%)`,
      boxShadow: `5px 5px 0px ${border}`,
      position: 'relative',
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: cornerSize, height: cornerSize,
        background: border,
        clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
        zIndex: 1,
      }} />
      {children}
    </div>
  );
}

function CreditChip({ amount, theme }) {
  return (
    <span style={{
      background: theme.accent,
      color: theme.navBg,
      fontFamily: 'Bebas Neue, sans-serif',
      fontSize: 13,
      letterSpacing: 1,
      padding: '3px 10px',
      border: '2px solid ' + theme.navBg,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
    }}>
      ⬡ {amount}
    </span>
  );
}

// ═══════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════
function HomeScreen({ theme, isDark, setIsDark }) {
  const [pressedEntry, setPressedEntry] = useState(null);

  const hotEntries = [
    { user: 'ZenCrafter', title: 'Bottle Lamp Sculpture', votes: 234, stakes: 180, avatar: '🎨', challenge: 'UPCYCLED WONDERS' },
    { user: 'MakerMoxie', title: 'Denim Tote Masterpiece', votes: 198, stakes: 220, avatar: '✂️', challenge: 'UPCYCLED WONDERS' },
    { user: 'ArtByNova', title: 'Circuit Board Mosaic', votes: 156, stakes: 95, avatar: '💡', challenge: 'COLOR THEORY CLASH' },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* App Header */}
      <div style={{
        padding: '12px 20px 16px',
        background: theme.navy,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 3, color: theme.accent, lineHeight: 1 }}>CRAFT</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 3, color: '#FFFFFF', lineHeight: 1 }}>STAKE</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <CreditChip amount="1,240" theme={{ accent: theme.accent, navBg: '#0F1C4D' }} />
          <div style={{ position: 'relative' }}>
            {React.createElement(window.lucide.Bell, { size: 22, color: '#FFFFFF', strokeWidth: 1.5 })}
            <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: theme.primary, borderRadius: '50%', border: '1.5px solid ' + theme.navBg }} />
          </div>
        </div>
      </div>

      {/* Featured Challenge — overlapping card with angled corners */}
      <div style={{ padding: '0 20px', marginTop: 20, position: 'relative', zIndex: 2 }}>
        <div style={{
          background: theme.primary,
          border: '3px solid ' + theme.navy,
          clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)',
          boxShadow: '7px 7px 0px ' + theme.navy,
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Corner marker */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 28, height: 28, background: theme.navy, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          {/* BG circles */}
          <div style={{ position: 'absolute', right: -25, top: -25, width: 130, height: 130, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', right: 30, bottom: -35, width: 90, height: 90, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            <span style={{ background: theme.accent, color: theme.navy, fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1.5, padding: '3px 10px' }}>🔥 FEATURED</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {React.createElement(window.lucide.Clock, { size: 13, color: '#FFFFFF' })}
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, color: '#FFFFFF', letterSpacing: 1 }}>2d 14h left</span>
            </div>
          </div>

          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 34, color: '#FFFFFF', letterSpacing: 2, lineHeight: 1, marginBottom: 4, position: 'relative', zIndex: 1 }}>UPCYCLED WONDERS</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 18, position: 'relative', zIndex: 1 }}>Transform trash into treasure — make it wearable, usable, or stunning</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 22 }}>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: theme.accent, letterSpacing: 1 }}>⬡ 500</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Prize Pool</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: '#FFFFFF', letterSpacing: 1 }}>147</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Entries</div>
              </div>
            </div>
            <button style={{
              background: '#FFFFFF',
              color: theme.primary,
              border: '2.5px solid ' + theme.navy,
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 15,
              letterSpacing: 1.5,
              padding: '9px 18px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px ' + theme.navy,
            }}>ENTER →</button>
          </div>
        </div>
      </div>

      {/* Hot Entries section */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: theme.text }}>HOT ENTRIES</span>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, letterSpacing: 1, color: theme.primary, cursor: 'pointer' }}>SEE ALL →</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {hotEntries.map((entry, i) => (
            <div
              key={i}
              onMouseDown={() => setPressedEntry(i)}
              onMouseUp={() => setPressedEntry(null)}
              onMouseLeave={() => setPressedEntry(null)}
              style={{
                background: theme.cardBg,
                border: '2px solid ' + theme.border,
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
                boxShadow: pressedEntry === i ? '2px 2px 0px ' + theme.border : '4px 4px 0px ' + theme.border,
                transform: pressedEntry === i ? 'translate(2px, 2px)' : 'translate(0,0)',
                transition: 'all 0.1s',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: theme.border, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
              <div style={{
                width: 46, height: 46,
                background: theme.subtleBg,
                border: '2px solid ' + theme.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>{entry.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 1, color: theme.text, marginBottom: 2 }}>{entry.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: theme.textSub }}>by {entry.user}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, color: theme.primary, letterSpacing: 1 }}>▲ {entry.votes}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, color: theme.accent, letterSpacing: 1 }}>⬡ {entry.stakes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats — overlapping cards with angled corners */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: theme.text, marginBottom: 14 }}>YOUR STATS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'WINS', value: '12', icon: '🏆', dark: true },
            { label: 'STREAK', value: '7 DAYS', icon: '🔥', dark: false },
            { label: 'WIN RATE', value: '68%', icon: '📈', dark: false },
            { label: 'TOTAL EARNED', value: '⬡ 4,820', icon: '💎', dark: true },
          ].map((stat, i) => (
            <div key={i} style={{
              background: stat.dark ? theme.navy : theme.primary,
              padding: '16px 14px',
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
              position: 'relative',
              boxShadow: '4px 4px 0px ' + (stat.dark ? theme.primary : theme.navy),
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, background: stat.dark ? theme.primary : theme.navy, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
              <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: theme.accent, letterSpacing: 1, lineHeight: 1, marginBottom: 3 }}>{stat.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Challenge Countdown */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{
          background: theme.subtleBg,
          border: '2.5px solid ' + theme.border,
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '4px 4px 0px ' + theme.border,
        }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 2, color: theme.textSub, marginBottom: 4 }}>NEXT CHALLENGE DROPS IN</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 2, color: theme.text }}>3D 08H 22M</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {React.createElement(window.lucide.Bell, { size: 22, color: theme.primary })}
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, color: theme.primary, letterSpacing: 1 }}>ALERT ME</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// CHALLENGES SCREEN
// ═══════════════════════════════════════
function ChallengesScreen({ theme }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [pressedCard, setPressedCard] = useState(null);

  const filters = ['ALL', 'CRAFT', 'DIGITAL', 'DRAWING', 'DIY'];

  const challenges = [
    { id: 1, title: 'COLOR THEORY CLASH', category: 'DIGITAL', timeLeft: '5d', entries: 89, prize: '300', status: 'OPEN', difficulty: 'MEDIUM', desc: 'Push hues to their limit — create a piece built entirely on color theory principles.' },
    { id: 2, title: 'UPCYCLED WONDERS', category: 'CRAFT', timeLeft: '2d 14h', entries: 147, prize: '500', status: 'HOT', difficulty: 'EASY', desc: 'Transform discarded materials into art, fashion, or functional objects.' },
    { id: 3, title: 'PORTRAIT MASTERS', category: 'DRAWING', timeLeft: '6d', entries: 62, prize: '250', status: 'OPEN', difficulty: 'HARD', desc: 'Capture the soul in a face — traditional or digital portrait challenge.' },
    { id: 4, title: 'TINY HOMES CHALLENGE', category: 'DIY', timeLeft: '3d', entries: 204, prize: '750', status: 'HOT', difficulty: 'HARD', desc: 'Design and build a functional miniature living space under 12 inches.' },
    { id: 5, title: 'BOTANICAL INK SERIES', category: 'DRAWING', timeLeft: '8d', entries: 38, prize: '200', status: 'NEW', difficulty: 'EASY', desc: 'Draw intricate plant specimens using only ink — no pencil underdrawings.' },
    { id: 6, title: 'PIXEL PERFECTION', category: 'DIGITAL', timeLeft: '4d', entries: 115, prize: '400', status: 'OPEN', difficulty: 'MEDIUM', desc: 'Create a pixel art scene at 64x64 — every pixel intentional.' },
  ];

  const filtered = activeFilter === 'ALL' ? challenges : challenges.filter(c => c.category === activeFilter);
  const diffColor = (d) => d === 'EASY' ? theme.green : d === 'MEDIUM' ? '#FF9500' : theme.primary;
  const statusCol = (s) => s === 'HOT' ? theme.primary : s === 'NEW' ? theme.green : theme.textSub;

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 20px', background: theme.navy }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 3, color: '#FFFFFF', lineHeight: 1, marginBottom: 14 }}>BATTLE ARENA</div>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: theme.bg === '#F5EAD0' ? '#EDE4C5' : '#1A2245',
          border: '2px solid ' + (theme.bg === '#F5EAD0' ? theme.navy : theme.border),
          padding: '9px 14px', gap: 10,
        }}>
          {React.createElement(window.lucide.Search, { size: 16, color: theme.bg === '#F5EAD0' ? theme.navy : theme.textSub })}
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: theme.bg === '#F5EAD0' ? theme.textSub : theme.textSub }}>Search challenges...</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, overflowX: 'auto', background: theme.bg, borderBottom: '2.5px solid ' + theme.border }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            background: activeFilter === f ? theme.primary : theme.cardBg,
            color: activeFilter === f ? '#FFFFFF' : theme.text,
            border: '2px solid ' + (activeFilter === f ? theme.primary : theme.border),
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 13, letterSpacing: 1.5,
            padding: '5px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: activeFilter === f ? '3px 3px 0px ' + theme.navy : 'none',
          }}>{f}</button>
        ))}
      </div>

      {/* Challenge list */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((ch, i) => (
          <div
            key={ch.id}
            onMouseDown={() => setPressedCard(ch.id)}
            onMouseUp={() => setPressedCard(null)}
            onMouseLeave={() => setPressedCard(null)}
            style={{
              background: theme.cardBg,
              border: '2.5px solid ' + theme.border,
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
              boxShadow: pressedCard === ch.id ? '2px 2px 0px ' + theme.border : '5px 5px 0px ' + theme.border,
              transform: pressedCard === ch.id ? 'translate(3px,3px)' : 'none',
              transition: 'all 0.1s',
              padding: '16px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, background: theme.border, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{
                background: theme.inputBg, color: theme.text,
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1,
                padding: '2px 8px', border: '1.5px solid ' + theme.border,
              }}>{ch.category}</span>
              <span style={{
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1,
                color: statusCol(ch.status), border: '1.5px solid ' + statusCol(ch.status),
                padding: '2px 8px',
              }}>{ch.status === 'HOT' ? '🔥 HOT' : ch.status === 'NEW' ? '✨ NEW' : 'OPEN'}</span>
            </div>

            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: theme.text, lineHeight: 1.1, marginBottom: 6 }}>{ch.title}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: theme.textSub, marginBottom: 12, lineHeight: 1.4 }}>{ch.desc}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.Clock, { size: 12, color: theme.textSub })}
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: theme.textSub }}>{ch.timeLeft}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {React.createElement(window.lucide.Users, { size: 12, color: theme.textSub })}
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: theme.textSub }}>{ch.entries}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, color: diffColor(ch.difficulty), letterSpacing: 1 }}>{ch.difficulty}</span>
                <span style={{ background: theme.accent, color: theme.navBg, fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, letterSpacing: 1, padding: '3px 10px', border: '1.5px solid ' + theme.border }}>⬡ {ch.prize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// STAKES SCREEN
// ═══════════════════════════════════════
function StakesScreen({ theme }) {
  const [activeView, setActiveView] = useState('mine');
  const [stakeAnim, setStakeAnim] = useState(null);

  const myStakes = [
    { challenge: 'UPCYCLED WONDERS', entry: 'Bottle Lamp Sculpture', staked: 150, multiplier: 1.8, payout: 270, status: 'WINNING', timeLeft: '2d 14h', own: false },
    { challenge: 'COLOR THEORY CLASH', entry: 'Neon Gradient Series', staked: 80, multiplier: 0.6, payout: 48, status: 'TRAILING', timeLeft: '5d', own: false },
    { challenge: 'PIXEL PERFECTION', entry: 'Isometric City Scene', staked: 200, multiplier: 2.1, payout: 420, status: 'LEADING', timeLeft: '4d', own: true },
  ];

  const trending = [
    { user: 'ZenCrafter', title: 'Bottle Lamp Sculpture', challenge: 'UPCYCLED WONDERS', votes: 234, odds: '2.1x', avatar: '🎨', hot: true },
    { user: 'PixelMage', title: 'Cyberpunk Cityscape', challenge: 'PIXEL PERFECTION', votes: 198, odds: '1.7x', avatar: '🖥️', hot: false },
    { user: 'KnotMaster', title: 'Macramé Wall Tapestry', challenge: 'DIY TEXTURES', votes: 167, odds: '3.2x', avatar: '🪡', hot: true },
    { user: 'ColorRiot', title: 'Monochromatic Series', challenge: 'COLOR THEORY CLASH', votes: 142, odds: '1.4x', avatar: '🎭', hot: false },
  ];

  const statusColor = (s) => s === 'WINNING' || s === 'LEADING' ? theme.green : theme.primary;

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Balance Header */}
      <div style={{ background: theme.navy, padding: '16px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, bottom: -30, width: 150, height: 150, background: 'rgba(232,50,60,0.12)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', left: -20, top: -20, width: 100, height: 100, background: 'rgba(255,209,102,0.06)', borderRadius: '50%' }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, letterSpacing: 2.5, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>CREDIT BALANCE</div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 56, letterSpacing: 2, color: theme.accent, lineHeight: 1, marginBottom: 4 }}>⬡ 1,240</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 18 }}>+180 this week · 6 active stakes · est. return ⬡ 738</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            background: theme.primary, color: '#FFFFFF',
            border: '2px solid rgba(255,255,255,0.3)',
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, letterSpacing: 1.5,
            padding: '9px 0', cursor: 'pointer', flex: 1,
          }}>+ ADD CREDITS</button>
          <button style={{
            background: 'transparent', color: '#FFFFFF',
            border: '2px solid rgba(255,255,255,0.25)',
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, letterSpacing: 1.5,
            padding: '9px 0', cursor: 'pointer', flex: 1,
          }}>HISTORY</button>
        </div>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', background: theme.bg, borderBottom: '2.5px solid ' + theme.border }}>
        {[['mine', 'MY STAKES'], ['trending', 'TRENDING']].map(([v, label]) => (
          <button key={v} onClick={() => setActiveView(v)} style={{
            flex: 1, background: 'transparent', color: activeView === v ? theme.primary : theme.textSub,
            border: 'none', borderBottom: activeView === v ? '3px solid ' + theme.primary : '3px solid transparent',
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 2,
            padding: '12px', cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {activeView === 'mine' ? myStakes.map((s, i) => (
          <div key={i} style={{
            background: theme.cardBg, border: '2.5px solid ' + theme.border,
            clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
            boxShadow: '5px 5px 0px ' + theme.border,
            padding: '16px', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, background: theme.border, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
            {s.own && <div style={{ background: theme.accent, color: theme.navBg, fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, letterSpacing: 1, padding: '2px 8px', marginBottom: 8, display: 'inline-block' }}>★ YOUR ENTRY</div>}
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, color: theme.textSub, letterSpacing: 1.5, marginBottom: 4 }}>{s.challenge}</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 19, color: theme.text, letterSpacing: 1, marginBottom: 12 }}>{s.entry}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: 18 }}>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: theme.accent, letterSpacing: 1 }}>⬡ {s.staked}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub, textTransform: 'uppercase', letterSpacing: 0.5 }}>Staked</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: statusColor(s.status), letterSpacing: 1 }}>{s.multiplier}x</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub, textTransform: 'uppercase', letterSpacing: 0.5 }}>Multiplier</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: statusColor(s.status), letterSpacing: 1 }}>⬡ {s.payout}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub, textTransform: 'uppercase', letterSpacing: 0.5 }}>Est. Return</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, color: statusColor(s.status), border: '1.5px solid ' + statusColor(s.status), padding: '3px 10px', letterSpacing: 1, marginBottom: 4 }}>{s.status}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub }}>{s.timeLeft}</div>
              </div>
            </div>
          </div>
        )) : trending.map((t, i) => (
          <div key={i} style={{
            background: theme.cardBg, border: '2.5px solid ' + theme.border,
            clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
            boxShadow: '5px 5px 0px ' + theme.border,
            padding: '16px', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, background: theme.border, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, background: theme.subtleBg, border: '2px solid ' + theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{t.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, color: theme.text, letterSpacing: 1 }}>{t.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: theme.textSub }}>by {t.user} · {t.challenge}</div>
              </div>
              {t.hot && <div style={{ background: theme.primary, color: '#FFFFFF', fontFamily: 'Bebas Neue, sans-serif', fontSize: 10, padding: '2px 8px', letterSpacing: 1, flexShrink: 0 }}>🔥 HOT</div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {React.createElement(window.lucide.TrendingUp, { size: 14, color: theme.green })}
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, color: theme.green, letterSpacing: 1 }}>{t.votes} VOTES</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: theme.accent, letterSpacing: 1 }}>ODDS {t.odds}</span>
                <button
                  onMouseDown={() => setStakeAnim(i)}
                  onMouseUp={() => setStakeAnim(null)}
                  style={{
                    background: theme.primary, color: '#FFFFFF',
                    border: '2px solid ' + theme.navy,
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, letterSpacing: 1,
                    padding: '6px 16px', cursor: 'pointer',
                    boxShadow: stakeAnim === i ? '1px 1px 0px ' + theme.navy : '3px 3px 0px ' + theme.navy,
                    transform: stakeAnim === i ? 'translate(2px,2px)' : 'none',
                    transition: 'all 0.1s',
                  }}
                >STAKE ⬡</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// LEADERBOARD SCREEN
// ═══════════════════════════════════════
function LeaderboardScreen({ theme }) {
  const [period, setPeriod] = useState('WEEK');

  const creators = [
    { rank: 1, name: 'ZenCrafter', score: 4820, wins: 12, avatar: '🎨', streak: 14 },
    { rank: 2, name: 'PixelMage', score: 4215, wins: 9, avatar: '🖥️', streak: 7 },
    { rank: 3, name: 'KnotMaster', score: 3890, wins: 8, avatar: '🪡', streak: 5 },
    { rank: 4, name: 'ArtByNova', score: 3420, wins: 7, avatar: '💡', streak: 3 },
    { rank: 5, name: 'MakerMoxie', score: 3120, wins: 6, avatar: '✂️', streak: 6 },
    { rank: 6, name: 'ColorRiot', score: 2875, wins: 5, avatar: '🎭', streak: 2 },
    { rank: 7, name: 'CraftVibe', score: 2640, wins: 4, avatar: '🧵', streak: 4 },
    { rank: 8, name: 'Inkdrop', score: 2310, wins: 4, avatar: '🖊️', streak: 1 },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ background: theme.navy, padding: '16px 20px 20px' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 3, color: '#FFFFFF', lineHeight: 1, marginBottom: 16 }}>HALL OF FAME</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['WEEK', 'MONTH', 'ALL TIME'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              background: period === p ? theme.accent : 'rgba(255,255,255,0.1)',
              color: period === p ? '#0F1C4D' : '#FFFFFF',
              border: '2px solid ' + (period === p ? theme.accent : 'rgba(255,255,255,0.25)'),
              fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, letterSpacing: 1.5,
              padding: '5px 14px', cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Podium — overlapping block design */}
      <div style={{ background: theme.subtleBg, borderBottom: '2.5px solid ' + theme.border, padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 10 }}>
          {/* 2nd Place */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>{creators[1].avatar}</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, color: theme.text, letterSpacing: 1, marginBottom: 8 }}>{creators[1].name}</div>
            <div style={{
              background: theme.cardBg, border: '2.5px solid ' + theme.border,
              height: 64, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '4px 4px 0px ' + theme.border,
            }}>
              <div style={{ fontSize: 22 }}>🥈</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, color: theme.text }}>⬡ {creators[1].score.toLocaleString()}</div>
            </div>
          </div>

          {/* 1st Place */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 38, marginBottom: 6 }}>{creators[0].avatar}</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, color: theme.text, letterSpacing: 1, marginBottom: 8 }}>{creators[0].name}</div>
            <div style={{
              background: theme.primary, border: '3px solid ' + theme.navy,
              height: 84, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '6px 6px 0px ' + theme.navy,
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, background: theme.navy, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
              <div style={{ fontSize: 28 }}>👑</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: '#FFFFFF' }}>⬡ {creators[0].score.toLocaleString()}</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{creators[2].avatar}</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, color: theme.text, letterSpacing: 1, marginBottom: 8 }}>{creators[2].name}</div>
            <div style={{
              background: theme.cardBg, border: '2.5px solid ' + theme.border,
              height: 50, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '4px 4px 0px ' + theme.border,
            }}>
              <div style={{ fontSize: 18 }}>🥉</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 13, color: theme.text }}>⬡ {creators[2].score.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranks 4–8 */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {creators.slice(3).map(c => (
          <div key={c.rank} style={{
            background: theme.cardBg, border: '2px solid ' + theme.border,
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: theme.textSub, width: 30, textAlign: 'center' }}>#{c.rank}</div>
            <div style={{ fontSize: 22 }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: theme.text, letterSpacing: 1 }}>{c.name}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {React.createElement(window.lucide.Flame, { size: 11, color: c.streak > 4 ? theme.primary : theme.textSub })}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub }}>{c.streak} day streak</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: theme.accent, letterSpacing: 1 }}>⬡ {c.score.toLocaleString()}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: theme.textSub }}>{c.wins} wins</div>
            </div>
          </div>
        ))}

        {/* Your position */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
          <div style={{ flex: 1, height: 2, background: theme.primary }} />
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, color: theme.primary, letterSpacing: 1 }}>YOUR POSITION</span>
          <div style={{ flex: 1, height: 2, background: theme.primary }} />
        </div>

        <div style={{
          background: theme.primary, border: '2.5px solid ' + theme.navy,
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
          boxShadow: '5px 5px 0px ' + theme.navy,
          padding: '14px', display: 'flex', alignItems: 'center', gap: 12,
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, background: theme.navy, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: '#FFFFFF', width: 30, textAlign: 'center' }}>#23</div>
          <div style={{ fontSize: 22 }}>🖌️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: '#FFFFFF', letterSpacing: 1 }}>YOU</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>7 day streak 🔥</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: theme.accent, letterSpacing: 1 }}>⬡ 1,240</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>3 wins</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// PROFILE SCREEN
// ═══════════════════════════════════════
function ProfileScreen({ theme, isDark, setIsDark }) {
  const achievements = [
    { icon: '🏆', title: 'First Win', earned: true },
    { icon: '🔥', title: 'Hot Streak', earned: true },
    { icon: '💎', title: 'Top Staker', earned: true },
    { icon: '⭐', title: 'Rising Star', earned: false },
    { icon: '👑', title: 'Champion', earned: false },
    { icon: '🌟', title: 'Legendary', earned: false },
  ];

  const settingsItems = [
    { label: 'Dark Mode', icon: window.lucide.Moon, action: 'toggle' },
    { label: 'Notifications', icon: window.lucide.Bell, action: 'arrow' },
    { label: 'Privacy & Security', icon: window.lucide.Shield, action: 'arrow' },
    { label: 'Payment Methods', icon: window.lucide.Zap, action: 'arrow' },
    { label: 'Peer Review Settings', icon: window.lucide.Star, action: 'arrow' },
    { label: 'Help & Support', icon: window.lucide.Users, action: 'arrow' },
  ];

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Profile Hero */}
      <div style={{ background: theme.navy, padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 170, height: 170, background: 'rgba(232,50,60,0.12)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', left: -20, bottom: -20, width: 100, height: 100, background: 'rgba(255,209,102,0.07)', borderRadius: '50%' }} />

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 72, height: 72,
            background: theme.primary,
            border: '3px solid ' + theme.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, flexShrink: 0,
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: theme.accent, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
            🖌️
          </div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 2, color: '#FFFFFF', lineHeight: 1, marginBottom: 4 }}>CRAFTMASTER</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>@craftmaster_pro · since Jan 2024</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: theme.primary, color: '#FFFFFF', fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1, padding: '3px 10px' }}>LEVEL 7</span>
              <span style={{ background: theme.accent, color: '#0F1C4D', fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1, padding: '3px 10px' }}>⬡ 1,240</span>
              <span style={{ background: 'transparent', color: theme.green, fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: 1, padding: '3px 10px', border: '1.5px solid ' + theme.green }}>🔥 7 DAY STREAK</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 14, position: 'relative', zIndex: 1 }}>
          {[
            { label: 'ENTRIES', value: '47' },
            { label: 'WINS', value: '12' },
            { label: 'WIN RATE', value: '68%' },
            { label: 'FOLLOWERS', value: '284' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', padding: '6px 0' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: theme.accent, letterSpacing: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: theme.text, marginBottom: 14 }}>ACHIEVEMENTS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {achievements.map((a, i) => (
            <div key={i} style={{
              background: a.earned ? theme.cardBg : theme.subtleBg,
              border: '2px solid ' + (a.earned ? theme.border : theme.divider),
              padding: '14px 8px', textAlign: 'center',
              opacity: a.earned ? 1 : 0.45,
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
              position: 'relative',
            }}>
              {a.earned && <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, background: theme.border, clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />}
              <div style={{ fontSize: 26, marginBottom: 5 }}>{a.icon}</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, color: theme.text, letterSpacing: 0.5 }}>{a.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 2, color: theme.text, marginBottom: 14 }}>SETTINGS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {settingsItems.map((item, i) => (
            <div key={i} style={{
              background: theme.cardBg, border: '2px solid ' + theme.border,
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer',
            }}>
              {React.createElement(item.icon, { size: 18, color: theme.primary })}
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 15, letterSpacing: 1, color: theme.text, flex: 1 }}>{item.label}</span>
              {item.action === 'toggle' ? (
                <div
                  onClick={() => setIsDark(!isDark)}
                  style={{
                    width: 46, height: 26,
                    background: isDark ? theme.primary : theme.inputBg,
                    border: '2px solid ' + theme.border,
                    borderRadius: 13, position: 'relative',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: 18, height: 18,
                    background: isDark ? '#FFFFFF' : theme.navy,
                    borderRadius: '50%', top: 2,
                    left: isDark ? 24 : 2,
                    transition: 'left 0.2s',
                  }} />
                </div>
              ) : React.createElement(window.lucide.ChevronRight, { size: 16, color: theme.textSub })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? themes.dark : themes.light;

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    body { margin: 0; }
  `;

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'challenges', label: 'Battles', icon: window.lucide.Swords },
    { id: 'stakes', label: 'Stakes', icon: window.lucide.Zap },
    { id: 'leaderboard', label: 'Ranks', icon: window.lucide.TrendingUp },
    { id: 'profile', label: 'Profile', icon: window.lucide.User },
  ];

  const screens = {
    home: HomeScreen,
    challenges: ChallengesScreen,
    stakes: StakesScreen,
    leaderboard: LeaderboardScreen,
    profile: ProfileScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <style>{fontStyle}</style>
      <div style={{
        width: 375,
        height: 812,
        background: theme.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.38)',
        display: 'flex',
        flexDirection: 'column',
        border: '3px solid #0F1C4D',
      }}>
        <StatusBar theme={theme} />
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ActiveScreen theme={theme} isDark={isDark} setIsDark={setIsDark} />
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} theme={theme} />
      </div>
    </div>
  );
}
