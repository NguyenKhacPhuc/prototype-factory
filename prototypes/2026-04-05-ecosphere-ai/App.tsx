const { useState, useEffect, useRef } = React;

// ─── THEME ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#F8FAFC',
    cardBg: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    navBg: '#FFFFFF',
    inputBg: '#F1F5F9',
    primary: '#2563EB',
    secondary: '#3B82F6',
    cta: '#F97316',
    success: '#10B981',
    subtle: '#EFF6FF',
  },
  dark: {
    bg: '#0F172A',
    cardBg: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    navBg: '#1E293B',
    inputBg: '#334155',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    cta: '#F97316',
    success: '#10B981',
    subtle: '#1E3A5F',
  },
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ t, isDark, setIsDark, setActiveScreen }) {
  const [chatInput, setChatInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [challengeDone, setChallengeDown] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Good morning! I'm Vera, your AI eco-coach. You're on a 7-day streak — amazing work! Ready for today's challenge?" },
    { role: 'user', text: "Yes! What's on for today?" },
    { role: 'ai', text: "Today: Carry a reusable bag for all shopping. Complete it to earn 3 Eco-Tokens + unlock the rare 'Mangrove Sprout' collectible!" },
  ]);

  const aiReplies = [
    "Great question! Switching to LED bulbs saves up to 75% energy. Want me to add a lighting audit to your challenges?",
    "You're making real impact! This week your actions saved ~2.3 kg of CO₂ — equivalent to planting 3 trees.",
    "Love your enthusiasm! Try composting food scraps today to earn 5 bonus Eco-Tokens for your EcoSphere.",
    "Did you know? Reducing shower time by 2 minutes saves ~20L of water daily. It adds up to 7,300L per year!",
  ];

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: aiReplies[Math.floor(Math.random() * aiReplies.length)] }]);
      setTyping(false);
    }, 1400);
  };

  const SunMoonIcon = isDark ? window.lucide.Sun : window.lucide.Moon;

  return React.createElement('div', { style: { animation: 'fadeIn 0.35s ease', fontFamily: 'Inter, sans-serif' } },
    // ── Header gradient ──
    React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%)',
        padding: '20px 20px 28px',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('div', { style: { position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' } }),
      React.createElement('div', { style: { position: 'absolute', bottom: -20, left: 80, width: 90, height: 90, borderRadius: 20, background: 'rgba(255,255,255,0.05)', transform: 'rotate(20deg)' } }),
      // Top row
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 600, margin: 0, letterSpacing: 1, textTransform: 'uppercase' } }, 'Sunday, April 5'),
          React.createElement('h1', { style: { color: '#FFFFFF', fontSize: 22, fontWeight: 800, margin: '3px 0 0', fontFamily: 'Inter, sans-serif' } }, 'Hello, Alex! 👋')
        ),
        React.createElement('button', {
          onClick: () => setIsDark(!isDark),
          style: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
        },
          SunMoonIcon && React.createElement(SunMoonIcon, { size: 18, color: '#FFFFFF' })
        )
      ),
      // Stats row
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [
          { icon: 'Flame', value: '7', label: 'Day Streak', iconColor: '#F97316' },
          { icon: 'Star', value: '142', label: 'Eco-Tokens', iconColor: '#FCD34D' },
          { icon: 'Leaf', value: '28kg', label: 'CO₂ Saved', iconColor: '#34D399' },
        ].map((s, i) => {
          const Icon = window.lucide[s.icon];
          return React.createElement('div', {
            key: i,
            style: { flex: 1, background: 'rgba(255,255,255,0.13)', borderRadius: 14, padding: '10px 8px', display: 'flex', alignItems: 'center', gap: 6 }
          },
            Icon && React.createElement(Icon, { size: 18, color: s.iconColor }),
            React.createElement('div', null,
              React.createElement('div', { style: { color: '#FFF', fontSize: 16, fontWeight: 800, lineHeight: 1 } }, s.value),
              React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 9, fontWeight: 500, marginTop: 2 } }, s.label)
            )
          );
        })
      )
    ),

    // ── Today's Challenge ──
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('div', {
        style: {
          background: t.cardBg, borderRadius: 20, padding: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: `1px solid ${t.border}`,
          animation: 'slideUp 0.4s ease',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
            window.lucide.Target && React.createElement(window.lucide.Target, { size: 15, color: t.primary }),
            React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: 0.5 } }, "Today's Challenge")
          ),
          React.createElement('div', { style: { background: '#FFFBEB', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: '#D97706' } }, '+3 Tokens')
        ),
        React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 6px', fontFamily: 'Inter, sans-serif' } }, 'Reusable Bag Challenge'),
        React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 } }, 'Use a reusable bag for all shopping trips today. Avoid single-use plastic.'),
        React.createElement('div', { style: { background: t.border, borderRadius: 999, height: 6, marginBottom: 8 } },
          React.createElement('div', { style: { width: challengeDone ? '100%' : '60%', background: `linear-gradient(90deg, ${t.primary}, ${t.cta})`, borderRadius: 999, height: '100%', transition: 'width 0.6s ease' } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, challengeDone ? '100% complete ✓' : '60% complete'),
          React.createElement('button', {
            onClick: () => setChallengeDown(true),
            style: {
              background: challengeDone ? t.success : t.primary,
              color: '#FFF', border: 'none', borderRadius: 10, padding: '9px 16px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', minHeight: 44,
              transition: 'all 200ms ease',
            }
          },
            React.createElement('span', null, challengeDone ? '✓ Completed!' : 'Mark Complete')
          )
        )
      )
    ),

    // ── Vera Chat ──
    React.createElement('div', { style: { padding: 16 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 } },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.cta})`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          window.lucide.Bot && React.createElement(window.lucide.Bot, { size: 16, color: '#FFF' })
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, 'Vera — AI Eco-Coach'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: t.success, animation: 'pulse 2s infinite' } }),
            React.createElement('span', { style: { fontSize: 10, color: t.textSecondary } }, 'Online now')
          )
        )
      ),
      React.createElement('div', {
        style: {
          background: t.cardBg, borderRadius: 16, border: `1px solid ${t.border}`,
          maxHeight: 200, overflowY: 'auto', padding: 12, marginBottom: 10,
          display: 'flex', flexDirection: 'column', gap: 8,
        }
      },
        messages.map((msg, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.3s ease' }
        },
          React.createElement('div', {
            style: {
              maxWidth: '82%',
              background: msg.role === 'user' ? t.primary : t.inputBg,
              color: msg.role === 'user' ? '#FFF' : t.text,
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '9px 12px', fontSize: 12, lineHeight: 1.5,
            }
          }, msg.text)
        )),
        typing && React.createElement('div', { style: { display: 'flex', gap: 4, padding: '6px 8px', alignItems: 'center' } },
          [0,1,2].map(i => React.createElement('div', {
            key: i,
            style: { width: 6, height: 6, borderRadius: '50%', background: t.textSecondary, animation: `pulse 1s ease ${i * 0.22}s infinite` }
          }))
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('input', {
          value: chatInput,
          onChange: e => setChatInput(e.target.value),
          onKeyDown: e => e.key === 'Enter' && sendMessage(),
          placeholder: 'Ask Vera anything eco…',
          style: {
            flex: 1, background: t.inputBg, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: '10px 14px', color: t.text,
            fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif', minHeight: 44,
          }
        }),
        React.createElement('button', {
          onClick: sendMessage,
          style: { background: t.primary, border: 'none', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }
        },
          window.lucide.Send && React.createElement(window.lucide.Send, { size: 17, color: '#FFF' })
        )
      )
    )
  );
}

// ─── GARDEN SCREEN ───────────────────────────────────────────────────────────
function GardenScreen({ t }) {
  const [selected, setSelected] = useState(null);

  const plants = [
    { id: 1, name: 'Mangrove Sprout', rarity: 'Rare', color: '#10B981', size: 68, cx: 28, cy: 48, tokens: 12, lore: 'Roots that hold coastlines. Earned from Reusable Bag Week.' },
    { id: 2, name: 'Solar Bloom', rarity: 'Epic', color: '#F59E0B', size: 56, cx: 72, cy: 52, tokens: 18, lore: 'Photosynthesis-powered petals. Earned from Solar Pledge.' },
    { id: 3, name: 'Crystal Fern', rarity: 'Common', color: '#3B82F6', size: 44, cx: 50, cy: 72, tokens: 5, lore: 'Purifies air with every frond. Earned from daily challenge.' },
    { id: 4, name: 'Wind Wisp', rarity: 'Rare', color: '#8B5CF6', size: 58, cx: 18, cy: 66, tokens: 10, lore: 'Dances in clean-energy breezes. Earned from Green Commute.' },
    { id: 5, name: 'Coral Queen', rarity: 'Legendary', color: '#EF4444', size: 78, cx: 80, cy: 30, tokens: 30, lore: 'Symbol of ocean restoration. Earned from Zero-Waste Month.' },
  ];

  const rarityColors = { Common: '#64748B', Rare: '#2563EB', Epic: '#8B5CF6', Legendary: '#F59E0B' };

  return React.createElement('div', { style: { animation: 'fadeIn 0.35s ease', fontFamily: 'Inter, sans-serif' } },
    // Header
    React.createElement('div', {
      style: { background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', padding: '20px 20px 20px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
      React.createElement('h2', { style: { color: '#FFF', fontSize: 22, fontWeight: 800, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' } }, 'EcoSphere Garden'),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, margin: '0 0 14px' } }, '5 collectibles thriving • Garden Level 7'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [
          { label: 'Collectibles', val: '28' },
          { label: 'Level', val: 'Lv. 7' },
          { label: 'Rarest', val: 'Legendary' },
        ].map((s, i) => React.createElement('div', {
          key: i,
          style: { flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 10px', textAlign: 'center' }
        },
          React.createElement('div', { style: { color: '#FFF', fontSize: 14, fontWeight: 800 } }, s.val),
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 9, fontWeight: 500 } }, s.label)
        ))
      )
    ),
    // Garden canvas
    React.createElement('div', {
      style: {
        margin: 16, borderRadius: 20, height: 230,
        background: 'linear-gradient(180deg, #DBEAFE 0%, #BBF7D0 55%, #6EE7B7 100%)',
        position: 'relative', overflow: 'hidden',
        border: '2px solid #A7F3D0',
        boxShadow: '0 8px 30px rgba(16,185,129,0.18)',
      }
    },
      // Clouds
      React.createElement('div', { style: { position: 'absolute', top: 18, left: 24, width: 56, height: 18, borderRadius: 9, background: 'rgba(255,255,255,0.7)' } }),
      React.createElement('div', { style: { position: 'absolute', top: 28, left: 16, width: 90, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.5)' } }),
      React.createElement('div', { style: { position: 'absolute', top: 14, right: 40, width: 44, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.6)' } }),
      // Ground
      React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 55, background: 'linear-gradient(180deg, #6EE7B7 0%, #34D399 100%)', borderRadius: '0 0 18px 18px' } }),
      // Plants
      plants.map(p => {
        const isSelected = selected?.id === p.id;
        return React.createElement('button', {
          key: p.id,
          onClick: () => setSelected(isSelected ? null : p),
          style: {
            position: 'absolute',
            left: `${p.cx}%`,
            bottom: `${p.cy - 20}px`,
            transform: 'translateX(-50%)',
            width: p.size, height: p.size, borderRadius: '50%',
            background: `radial-gradient(circle at 36% 34%, ${p.color}CC, ${p.color}55)`,
            border: isSelected ? `3px solid ${p.color}` : '3px solid rgba(255,255,255,0.55)',
            cursor: 'pointer',
            animation: 'float 3.2s ease-in-out infinite',
            animationDelay: `${p.id * 0.55}s`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 28px ${p.color}44`,
          }
        },
          window.lucide.Leaf && React.createElement(window.lucide.Leaf, { size: p.size * 0.38, color: '#FFF' })
        );
      })
    ),
    // Selected plant info
    selected && React.createElement('div', {
      style: {
        margin: '0 16px 12px',
        background: t.cardBg, borderRadius: 16, padding: 14,
        border: `1px solid ${t.border}`,
        animation: 'slideUp 0.25s ease',
        boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' } }, selected.name),
          React.createElement('div', {
            style: { display: 'inline-block', background: rarityColors[selected.rarity] + '18', color: rarityColors[selected.rarity], borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, marginBottom: 6 }
          }, selected.rarity),
          React.createElement('p', { style: { color: t.textSecondary, fontSize: 11, margin: 0, lineHeight: 1.5 } }, selected.lore)
        ),
        React.createElement('div', { style: { textAlign: 'right', marginLeft: 12 } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 800, color: t.primary } }, selected.tokens),
          React.createElement('div', { style: { fontSize: 10, color: t.textSecondary } }, 'Eco-Tokens')
        )
      )
    ),
    // CTA
    !selected && React.createElement('div', { style: { padding: '0 16px 16px' } },
      React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, textAlign: 'center', margin: '0 0 12px' } }, 'Tap a collectible to learn more about it'),
      React.createElement('button', {
        onClick: () => {},
        style: {
          width: '100%', background: t.primary, color: '#FFF', border: 'none',
          borderRadius: 14, padding: '13px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', minHeight: 44, fontFamily: 'Inter, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }
      },
        window.lucide.Plus && React.createElement(window.lucide.Plus, { size: 16, color: '#FFF' }),
        React.createElement('span', null, 'Earn More Collectibles')
      )
    )
  );
}

// ─── CHALLENGES SCREEN ────────────────────────────────────────────────────────
function ChallengesScreen({ t }) {
  const [tab, setTab] = useState('active');

  const data = {
    active: [
      { title: 'Zero-Waste Week', desc: 'Produce zero single-use plastic waste for 7 days running.', reward: 25, progress: 71, daysLeft: 5, category: 'Waste', color: '#8B5CF6', urgent: false },
      { title: 'Water Saver Month', desc: 'Reduce your household water usage by 20% this month.', reward: 50, progress: 45, daysLeft: 18, category: 'Water', color: '#3B82F6', urgent: false },
      { title: 'Green Commute Sprint', desc: 'Walk or cycle to your destination 5 days in a row.', reward: 15, progress: 80, daysLeft: 1, category: 'Transport', color: '#10B981', urgent: true },
    ],
    upcoming: [
      { title: 'Solar Pledge', desc: 'Switch one home device to a renewable energy source.', reward: 40, startsIn: 3, category: 'Energy', color: '#F59E0B' },
      { title: 'Forest Guardian', desc: 'Plant a real tree and share your story with the community.', reward: 60, startsIn: 7, category: 'Nature', color: '#059669' },
      { title: 'Ocean Cleanup', desc: 'Participate in a local beach or river cleanup event.', reward: 35, startsIn: 14, category: 'Ocean', color: '#0EA5E9' },
    ],
  };

  const list = data[tab] || [];

  return React.createElement('div', { style: { animation: 'fadeIn 0.35s ease', fontFamily: 'Inter, sans-serif' } },
    // Header
    React.createElement('div', {
      style: { background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)', padding: '20px 20px 22px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: -24, right: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' } }),
      React.createElement('h2', { style: { color: '#FFF', fontSize: 22, fontWeight: 800, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' } }, 'Green Gauntlet'),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, margin: '0 0 16px' } }, 'Epic sustainability quests & challenges'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        [{ id: 'active', label: 'Active Quests' }, { id: 'upcoming', label: 'Upcoming' }].map(tb =>
          React.createElement('button', {
            key: tb.id,
            onClick: () => setTab(tb.id),
            style: {
              padding: '9px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: tab === tb.id ? '#FFF' : 'rgba(255,255,255,0.15)',
              color: tab === tb.id ? '#7C3AED' : '#FFF',
              fontWeight: 700, fontSize: 13, minHeight: 44, fontFamily: 'Inter, sans-serif',
              transition: 'all 180ms ease',
            }
          },
            React.createElement('span', null, tb.label)
          )
        )
      )
    ),
    // List
    React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } },
      list.map((c, i) => React.createElement('div', {
        key: i,
        style: {
          background: t.cardBg, borderRadius: 18,
          border: `1px solid ${c.urgent ? '#FCA5A5' : t.border}`,
          padding: 16,
          animation: `slideUp 0.3s ease ${i * 0.08}s both`,
          boxShadow: c.urgent ? '0 4px 20px rgba(239,68,68,0.1)' : '0 2px 10px rgba(0,0,0,0.04)',
        }
      },
        // Category + urgent badges
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' } },
          React.createElement('div', { style: { background: c.color + '1A', color: c.color, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700 } }, c.category),
          c.urgent && React.createElement('div', { style: { background: '#FEE2E2', color: '#EF4444', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700 } }, 'Ending Soon')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
          React.createElement('div', { style: { flex: 1, marginRight: 10 } },
            React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 4px', fontFamily: 'Inter, sans-serif' } }, c.title),
            React.createElement('p', { style: { color: t.textSecondary, fontSize: 12, margin: 0, lineHeight: 1.5 } }, c.desc)
          ),
          React.createElement('div', { style: { background: '#FFFBEB', borderRadius: 10, padding: '8px 10px', textAlign: 'center', flexShrink: 0 } },
            React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: '#D97706' } }, `+${c.reward}`),
            React.createElement('div', { style: { fontSize: 9, color: '#D97706', fontWeight: 600 } }, 'TOKENS')
          )
        ),
        // Progress bar for active
        c.progress !== undefined && React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, `${c.progress}% complete`),
            React.createElement('span', { style: { fontSize: 11, color: c.urgent ? '#EF4444' : t.textSecondary, fontWeight: c.urgent ? 700 : 400 } }, `${c.daysLeft}d left`)
          ),
          React.createElement('div', { style: { background: t.border, borderRadius: 999, height: 6 } },
            React.createElement('div', { style: { width: `${c.progress}%`, background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: 999, height: '100%', transition: 'width 0.6s ease' } })
          )
        ),
        // Starts in for upcoming
        c.startsIn !== undefined && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 } },
          window.lucide.Clock && React.createElement(window.lucide.Clock, { size: 12, color: t.textSecondary }),
          React.createElement('span', { style: { fontSize: 11, color: t.textSecondary } }, `Starts in ${c.startsIn} days`)
        )
      ))
    )
  );
}

// ─── TOKENS SCREEN ────────────────────────────────────────────────────────────
function TokensScreen({ t }) {
  const [filter, setFilter] = useState('All');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const tokens = [
    { name: 'Mangrove Sprout', rarity: 'Rare', cat: 'Flora', earned: 'Apr 3', color: '#10B981', icon: 'Leaf' },
    { name: 'Solar Firefly', rarity: 'Epic', cat: 'Fauna', earned: 'Apr 1', color: '#F59E0B', icon: 'Zap' },
    { name: 'Wind Turbine', rarity: 'Common', cat: 'Structure', earned: 'Mar 30', color: '#3B82F6', icon: 'Wind' },
    { name: 'Arctic Fox', rarity: 'Legendary', cat: 'Fauna', earned: 'Mar 28', color: '#EC4899', icon: 'Star' },
    { name: 'Bamboo Grove', rarity: 'Rare', cat: 'Flora', earned: 'Mar 25', color: '#059669', icon: 'Trees' },
    { name: 'Rain Collector', rarity: 'Common', cat: 'Structure', earned: 'Mar 22', color: '#0EA5E9', icon: 'Droplets' },
    { name: 'Biolum Jellyfish', rarity: 'Epic', cat: 'Fauna', earned: 'Mar 20', color: '#8B5CF6', icon: 'Sparkles' },
    { name: 'Moss Lantern', rarity: 'Common', cat: 'Flora', earned: 'Mar 18', color: '#84CC16', icon: 'Sun' },
  ];

  const rarityColors = { Common: '#64748B', Rare: '#2563EB', Epic: '#8B5CF6', Legendary: '#F59E0B' };
  const rarityBg = { Common: '#F1F5F9', Rare: '#EFF6FF', Epic: '#F5F3FF', Legendary: '#FFFBEB' };
  const rarityBgDark = { Common: '#1E293B', Rare: '#1E3A5F', Epic: '#2E1065', Legendary: '#451A03' };

  const filters = ['All', 'Flora', 'Fauna', 'Structure'];
  const visible = filter === 'All' ? tokens : tokens.filter(tk => tk.cat === filter);

  return React.createElement('div', { style: { animation: 'fadeIn 0.35s ease', fontFamily: 'Inter, sans-serif' } },
    // Header
    React.createElement('div', {
      style: { background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '20px 20px 20px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: -24, right: -24, width: 140, height: 140, borderRadius: '50%', background: 'rgba(251,191,36,0.08)' } }),
      React.createElement('h2', { style: { color: '#FFF', fontSize: 22, fontWeight: 800, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' } }, 'Eco-Token Collection'),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: '0 0 16px' } }, '28 of 64 collectibles earned'),
      React.createElement('div', { style: { display: 'flex', gap: 7 } },
        filters.map(f => React.createElement('button', {
          key: f,
          onClick: () => setFilter(f),
          style: {
            padding: '6px 14px', borderRadius: 999,
            border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.22)',
            background: filter === f ? '#F97316' : 'transparent',
            color: '#FFF', fontWeight: 600, fontSize: 12, cursor: 'pointer',
            minHeight: 36, fontFamily: 'Inter, sans-serif',
            transition: 'all 180ms ease',
          }
        },
          React.createElement('span', null, f)
        ))
      )
    ),
    // Grid
    React.createElement('div', {
      style: { padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
    },
      visible.map((tk, i) => {
        const Icon = window.lucide[tk.icon] || window.lucide.Star;
        const isHovered = hoveredIdx === i;
        return React.createElement('div', {
          key: i,
          onMouseEnter: () => setHoveredIdx(i),
          onMouseLeave: () => setHoveredIdx(null),
          style: {
            background: t.cardBg, borderRadius: 16,
            border: `1px solid ${isHovered ? tk.color + '44' : t.border}`,
            padding: 14, cursor: 'pointer',
            animation: `growIn 0.3s ease ${i * 0.05}s both`,
            transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'scale(1)',
            transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
            boxShadow: isHovered ? `0 10px 28px ${tk.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
          }
        },
          React.createElement('div', {
            style: {
              width: 50, height: 50, borderRadius: 14,
              background: `linear-gradient(135deg, ${tk.color}22, ${tk.color}44)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10, border: `1px solid ${tk.color}33`,
            }
          },
            Icon && React.createElement(Icon, { size: 22, color: tk.color })
          ),
          React.createElement('h4', { style: { color: t.text, fontSize: 12, fontWeight: 700, margin: '0 0 5px', fontFamily: 'Inter, sans-serif', lineHeight: 1.25 } }, tk.name),
          React.createElement('div', {
            style: {
              display: 'inline-block',
              background: t.bg === '#0F172A' ? rarityBgDark[tk.rarity] : rarityBg[tk.rarity],
              color: rarityColors[tk.rarity],
              borderRadius: 5, padding: '2px 6px', fontSize: 9, fontWeight: 700, marginBottom: 4,
            }
          }, tk.rarity),
          React.createElement('div', { style: { fontSize: 10, color: t.textSecondary } }, `Earned ${tk.earned}`)
        );
      })
    )
  );
}

// ─── IMPACT SCREEN ────────────────────────────────────────────────────────────
function ImpactScreen({ t }) {
  const metrics = [
    { label: 'CO₂ Saved', value: '28.4', unit: 'kg', icon: 'Wind', color: '#10B981', progress: 71 },
    { label: 'Water Saved', value: '340', unit: 'L', icon: 'Droplets', color: '#3B82F6', progress: 55 },
    { label: 'Waste Reduced', value: '4.2', unit: 'kg', icon: 'Trash2', color: '#F59E0B', progress: 42 },
    { label: 'Trees Equiv.', value: '3.8', unit: 'trees', icon: 'Trees', color: '#059669', progress: 38 },
  ];

  const weeklyData = [65, 40, 80, 55, 90, 70, 85];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxBar = Math.max(...weeklyData);

  return React.createElement('div', { style: { animation: 'fadeIn 0.35s ease', fontFamily: 'Inter, sans-serif' } },
    // Header
    React.createElement('div', {
      style: { background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', padding: '20px 20px 20px', position: 'relative', overflow: 'hidden' }
    },
      React.createElement('div', { style: { position: 'absolute', top: -22, right: -22, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' } }),
      React.createElement('h2', { style: { color: '#FFF', fontSize: 22, fontWeight: 800, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' } }, 'Impact Atlas'),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, margin: '0 0 14px' } }, 'Your environmental footprint at a glance'),
      // Rank banner
      React.createElement('div', {
        style: { background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      },
        React.createElement('div', null,
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Community Rank'),
          React.createElement('div', { style: { color: '#FFF', fontSize: 20, fontWeight: 800 } }, '#1,247')
        ),
        React.createElement('div', { style: { textAlign: 'center' } },
          React.createElement('div', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 } }, 'Top Percentile'),
          React.createElement('div', { style: { color: '#34D399', fontSize: 20, fontWeight: 800 } }, '8%')
        ),
        React.createElement('div', { style: { background: '#10B981', borderRadius: 10, padding: '8px 12px', fontSize: 12, fontWeight: 700, color: '#FFF' } }, 'Eco Warrior')
      )
    ),
    // Metrics grid
    React.createElement('div', { style: { padding: '16px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      metrics.map((m, i) => {
        const Icon = window.lucide[m.icon];
        return React.createElement('div', {
          key: i,
          style: {
            background: t.cardBg, borderRadius: 16, padding: 14,
            border: `1px solid ${t.border}`,
            animation: `slideUp 0.3s ease ${i * 0.09}s both`,
          }
        },
          React.createElement('div', {
            style: { width: 36, height: 36, borderRadius: 10, background: m.color + '1E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }
          },
            Icon && React.createElement(Icon, { size: 18, color: m.color })
          ),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: 'Inter, sans-serif' } },
            m.value,
            React.createElement('span', { style: { fontSize: 11, fontWeight: 500, color: t.textSecondary, marginLeft: 3 } }, m.unit)
          ),
          React.createElement('div', { style: { fontSize: 11, color: t.textSecondary, marginBottom: 8 } }, m.label),
          React.createElement('div', { style: { background: t.border, borderRadius: 999, height: 4 } },
            React.createElement('div', { style: { width: `${m.progress}%`, height: '100%', background: `linear-gradient(90deg, ${m.color}, ${m.color}77)`, borderRadius: 999 } })
          )
        );
      })
    ),
    // Weekly chart
    React.createElement('div', { style: { margin: '14px 16px 0', background: t.cardBg, borderRadius: 18, padding: 16, border: `1px solid ${t.border}` } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 700, margin: 0, fontFamily: 'Inter, sans-serif' } }, 'Weekly Activity'),
        React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 600 } }, 'This Week')
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 } },
        weeklyData.map((val, i) => React.createElement('div', {
          key: i,
          style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }
        },
          React.createElement('div', {
            style: {
              width: '100%',
              height: `${(val / maxBar) * 68}px`,
              background: i === 6 ? t.primary : (i === 4 ? t.cta : `${t.secondary}55`),
              borderRadius: '5px 5px 2px 2px',
              transition: 'height 0.5s ease',
            }
          }),
          React.createElement('span', { style: { fontSize: 10, color: t.textSecondary, fontWeight: 500 } }, days[i])
        ))
      )
    ),
    // Community Impact
    React.createElement('div', {
      style: { margin: '14px 16px 16px', background: `linear-gradient(135deg, ${t.primary}0F, ${t.secondary}0F)`, borderRadius: 18, padding: 16, border: `1px solid ${t.primary}22` }
    },
      React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 700, margin: '0 0 12px', fontFamily: 'Inter, sans-serif' } }, 'Community Impact'),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
        [
          { label: 'Members', value: '24.8K' },
          { label: 'CO₂ Saved', value: '680T' },
          { label: 'Actions Done', value: '312K' },
        ].map((s, i) => React.createElement('div', { key: i, style: { textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: 18, fontWeight: 800, color: t.primary } }, s.value),
          React.createElement('div', { style: { fontSize: 10, color: t.textSecondary, marginTop: 2 } }, s.label)
        ))
      )
    )
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  const t = isDark ? themes.dark : themes.light;

  const styleTag = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%       { transform: scale(1.12); opacity: 0.7; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateX(-50%) translateY(0px); }
      50%       { transform: translateX(-50%) translateY(-8px); }
    }
    @keyframes growIn {
      from { transform: scale(0.85); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }

    * { box-sizing: border-box; }
    ::-webkit-scrollbar { display: none; }
    input::placeholder { color: #94A3B8; }
  `;

  const screens = {
    home: HomeScreen,
    garden: GardenScreen,
    challenges: ChallengesScreen,
    tokens: TokensScreen,
    impact: ImpactScreen,
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'garden', label: 'Garden', icon: 'Leaf' },
    { id: 'challenges', label: 'Quests', icon: 'Zap' },
    { id: 'tokens', label: 'Collect', icon: 'Star' },
    { id: 'impact', label: 'Impact', icon: 'BarChart2' },
  ];

  const ActiveScreen = screens[activeScreen];

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }
  },
    React.createElement('style', null, styleTag),
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 250ms ease',
      }
    },
      // Screen
      React.createElement('div', { style: { flex: 1, overflowY: 'auto', overflowX: 'hidden' } },
        React.createElement(ActiveScreen, { t, isDark, setIsDark, setActiveScreen })
      ),
      // Bottom nav
      React.createElement('div', {
        style: {
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: 'flex',
          paddingTop: 6,
          paddingBottom: 10,
          transition: 'background 250ms ease',
        }
      },
        navItems.map(item => {
          const Icon = window.lucide[item.icon];
          const isActive = activeScreen === item.id;
          const isPressed = pressedTab === item.id;
          return React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            onMouseDown: () => setPressedTab(item.id),
            onMouseUp: () => setPressedTab(null),
            onTouchStart: () => setPressedTab(item.id),
            onTouchEnd: () => setPressedTab(null),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '6px 4px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              minHeight: 44,
              transform: isPressed ? 'scale(0.88)' : 'scale(1)',
              transition: 'transform 140ms ease',
            }
          },
            isActive && React.createElement('div', {
              style: {
                width: 24, height: 3, borderRadius: 999,
                background: t.primary,
                position: 'absolute',
                marginTop: -8,
              }
            }),
            Icon && React.createElement(Icon, {
              size: 20,
              color: isActive ? t.primary : t.textSecondary,
              strokeWidth: isActive ? 2.4 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? t.primary : t.textSecondary,
                fontFamily: 'Inter, sans-serif',
              }
            }, item.label)
          );
        })
      )
    )
  );
}
