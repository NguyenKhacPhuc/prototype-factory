const { useState, useEffect, useRef, useCallback } = React;

const themes = {
  dark: {
    bg: '#0A1F0E',
    surface: '#132B18',
    surfaceAlt: '#1A3620',
    card: '#1E3D25',
    cardHover: '#245030',
    primary: '#15803D',
    secondary: '#22C55E',
    cta: '#EC4899',
    ctaHover: '#DB2777',
    text: '#F0FDF4',
    textSecondary: '#A7D8B0',
    textMuted: '#6B9E78',
    border: '#2D5A38',
    navBg: '#0D1A10',
    navBorder: '#1E3D25',
    overlay: 'rgba(10,31,14,0.85)',
    inputBg: '#1A3620',
    badge: '#EC4899',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  light: {
    bg: '#F0FDF4',
    surface: '#FFFFFF',
    surfaceAlt: '#ECFDF5',
    card: '#FFFFFF',
    cardHover: '#F0FDF4',
    primary: '#15803D',
    secondary: '#22C55E',
    cta: '#EC4899',
    ctaHover: '#DB2777',
    text: '#0A1F0E',
    textSecondary: '#3D6B4A',
    textMuted: '#6B9E78',
    border: '#D1FAE5',
    navBg: '#FFFFFF',
    navBorder: '#D1FAE5',
    overlay: 'rgba(240,253,244,0.9)',
    inputBg: '#F0FDF4',
    badge: '#EC4899',
    success: '#15803D',
    warning: '#D97706',
    danger: '#DC2626',
  },
};

const fontStack = "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

// Animation keyframes
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes bloomGrow {
    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
    60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  * { -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { display: none; }
`;
if (!document.querySelector('#bloomforge-styles')) {
  styleTag.id = 'bloomforge-styles';
  document.head.appendChild(styleTag);
}

// Icon helper
function Icon({ name, size = 20, color, style: extraStyle = {} }) {
  const IconComponent = window.lucide && window.lucide[name];
  if (!IconComponent) return null;
  return React.createElement(IconComponent, { size, color, style: extraStyle });
}

// ─── HOME SCREEN ───
function HomeScreen({ t, onNavigate }) {
  const [expandedPlant, setExpandedPlant] = useState(null);

  const myPlants = [
    { id: 1, name: 'Monstera Deliciosa', health: 92, water: 3, light: 'Indirect', status: 'thriving', nextWater: 'Tomorrow' },
    { id: 2, name: 'Snake Plant', health: 88, water: 7, light: 'Low-Med', status: 'thriving', nextWater: 'In 5 days' },
    { id: 3, name: 'Fiddle Leaf Fig', health: 54, water: 2, light: 'Bright', status: 'struggling', nextWater: 'Today' },
    { id: 4, name: 'Pothos Golden', health: 96, water: 5, light: 'Any', status: 'thriving', nextWater: 'In 3 days' },
  ];

  const todayTasks = [
    { icon: 'Droplets', label: 'Water Fiddle Leaf Fig', urgent: true },
    { icon: 'Sun', label: 'Rotate Monstera for even light', urgent: false },
    { icon: 'Scissors', label: 'Prune yellowing Pothos leaf', urgent: false },
  ];

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.textMuted, fontFamily: fontStack, marginBottom: 2 } }, 'Good morning'),
        React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5 } }, 'My Garden'),
      ),
      React.createElement('div', { style: { width: 44, height: 44, borderRadius: 22, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${t.border}`, cursor: 'pointer' } },
        React.createElement(Icon, { name: 'Bell', size: 20, color: t.textSecondary }),
      ),
    ),

    // Rescue Mission Banner
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.danger}22, ${t.warning}22)`,
        border: `1px solid ${t.danger}44`,
        borderRadius: 16, padding: '16px 18px', marginBottom: 20,
        cursor: 'pointer', transition: 'transform 0.2s',
        animation: 'slideUp 0.5s ease',
      },
      onClick: () => onNavigate('rescue'),
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        React.createElement('div', { style: { width: 32, height: 32, borderRadius: 10, background: `${t.danger}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'AlertTriangle', size: 18, color: t.danger }),
        ),
        React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: t.danger, fontFamily: fontStack } }, 'RESCUE MISSION ACTIVE'),
      ),
      React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, 'Fiddle Leaf Fig needs help!'),
      React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack } }, 'Leaf browning detected — tap to start diagnosis'),
    ),

    // Today's Tasks
    React.createElement('div', { style: { marginBottom: 22 } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 14 } }, "Today's Tasks"),
      ...todayTasks.map((task, i) =>
        React.createElement('div', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 16px', borderRadius: 14,
            background: task.urgent ? `${t.warning}15` : t.surface,
            border: `1px solid ${task.urgent ? t.warning + '33' : t.border}`,
            marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s',
            animation: `fadeIn ${0.3 + i * 0.1}s ease`,
          },
        },
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: task.urgent ? `${t.warning}22` : `${t.secondary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
            React.createElement(Icon, { name: task.icon, size: 18, color: task.urgent ? t.warning : t.secondary }),
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 500, color: t.text, fontFamily: fontStack, flex: 1 } }, task.label),
          task.urgent && React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: t.warning, fontFamily: fontStack, background: `${t.warning}20`, padding: '3px 8px', borderRadius: 6 } }, 'URGENT'),
        )
      ),
    ),

    // My Plants
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3 } }, 'My Plants'),
      React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.secondary, fontFamily: fontStack, cursor: 'pointer' } }, 'See All'),
    ),
    ...myPlants.map((plant, i) =>
      React.createElement('div', {
        key: plant.id,
        style: {
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', borderRadius: 16,
          background: expandedPlant === plant.id ? t.cardHover : t.card,
          border: `1px solid ${t.border}`,
          marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s',
          animation: `slideUp ${0.3 + i * 0.08}s ease`,
        },
        onClick: () => setExpandedPlant(expandedPlant === plant.id ? null : plant.id),
      },
        // Plant avatar
        React.createElement('div', { style: {
          width: 52, height: 52, borderRadius: 16,
          background: plant.status === 'struggling' ? `linear-gradient(135deg, ${t.warning}33, ${t.danger}22)` : `linear-gradient(135deg, ${t.primary}33, ${t.secondary}22)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }},
          React.createElement(Icon, { name: plant.status === 'struggling' ? 'AlertCircle' : 'Leaf', size: 24, color: plant.status === 'struggling' ? t.warning : t.secondary }),
        ),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 3 } }, plant.name),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement(Icon, { name: 'Droplets', size: 12, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, plant.nextWater),
          ),
        ),
        // Health ring
        React.createElement('div', { style: { position: 'relative', width: 42, height: 42, flexShrink: 0 } },
          React.createElement('svg', { width: 42, height: 42, viewBox: '0 0 42 42' },
            React.createElement('circle', { cx: 21, cy: 21, r: 17, fill: 'none', stroke: t.border, strokeWidth: 3 }),
            React.createElement('circle', { cx: 21, cy: 21, r: 17, fill: 'none',
              stroke: plant.health > 70 ? t.secondary : plant.health > 40 ? t.warning : t.danger,
              strokeWidth: 3, strokeLinecap: 'round',
              strokeDasharray: `${(plant.health / 100) * 106.8} 106.8`,
              transform: 'rotate(-90 21 21)', style: { transition: 'stroke-dasharray 0.5s ease' },
            }),
          ),
          React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: t.text, fontFamily: fontStack } }, `${plant.health}%`),
        ),
      )
    ),
  );
}

// ─── RESCUE SCREEN ───
function RescueScreen({ t }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Identify Symptoms', desc: 'Take a photo of affected leaves for AI analysis. Look for brown edges, yellowing, or wilting patterns.', icon: 'Camera', done: true },
    { title: 'Diagnosis Complete', desc: 'Leaf tip browning caused by low humidity and inconsistent watering. Confidence: 94%.', icon: 'Stethoscope', done: true },
    { title: 'Treatment Plan', desc: 'Move to a humid spot, water thoroughly until drainage, mist leaves daily for 2 weeks.', icon: 'Clipboard', done: false },
    { title: 'Monitor Recovery', desc: 'Check daily for new growth and improvement. AI will track progress through your photos.', icon: 'Eye', done: false },
  ];

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Rescue Mission'),
    React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, marginBottom: 24 } }, 'Save your Fiddle Leaf Fig'),

    // Progress card
    React.createElement('div', { style: {
      background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
      borderRadius: 20, padding: '22px 20px', marginBottom: 24,
      boxShadow: `0 8px 32px ${t.primary}44`,
    }},
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: fontStack } }, 'Fiddle Leaf Fig'),
          React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: fontStack, marginTop: 2 } }, 'Mission started 2 days ago'),
        ),
        React.createElement('div', { style: { width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'HeartPulse', size: 28, color: '#fff' }),
        ),
      ),
      React.createElement('div', { style: { background: 'rgba(255,255,255,0.2)', borderRadius: 8, height: 8, overflow: 'hidden' } },
        React.createElement('div', { style: { width: '50%', height: '100%', background: '#fff', borderRadius: 8, transition: 'width 0.5s ease' } }),
      ),
      React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: fontStack, marginTop: 8, textAlign: 'right' } }, '2 of 4 steps complete'),
    ),

    // Steps
    ...steps.map((s, i) =>
      React.createElement('div', {
        key: i,
        style: {
          display: 'flex', gap: 14, marginBottom: 4,
          animation: `slideUp ${0.3 + i * 0.1}s ease`,
        },
      },
        // Timeline
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32 } },
          React.createElement('div', { style: {
            width: 32, height: 32, borderRadius: 16,
            background: s.done ? t.secondary : i === 2 ? t.cta : t.surface,
            border: `2px solid ${s.done ? t.secondary : i === 2 ? t.cta : t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }},
            React.createElement(Icon, { name: s.done ? 'Check' : s.icon, size: 16, color: s.done ? '#fff' : i === 2 ? '#fff' : t.textMuted }),
          ),
          i < steps.length - 1 && React.createElement('div', { style: { width: 2, height: 60, background: s.done ? t.secondary : t.border, margin: '4px 0' } }),
        ),
        // Content
        React.createElement('div', { style: {
          flex: 1, padding: '4px 0 20px',
        }},
          React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: s.done ? t.textSecondary : t.text, fontFamily: fontStack, marginBottom: 4, textDecoration: s.done ? 'line-through' : 'none' } }, s.title),
          React.createElement('div', { style: { fontSize: 14, color: t.textMuted, fontFamily: fontStack, lineHeight: 1.5 } }, s.desc),
          i === 2 && React.createElement('div', {
            style: {
              marginTop: 12, padding: '10px 20px', background: t.cta, borderRadius: 12,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: `0 4px 16px ${t.cta}44`,
            },
          },
            React.createElement(Icon, { name: 'Play', size: 16, color: '#fff' }),
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: fontStack } }, 'Start Treatment'),
          ),
        ),
      )
    ),

    // Reward preview
    React.createElement('div', { style: {
      background: t.surface, borderRadius: 16, padding: '18px 20px',
      border: `1px solid ${t.border}`, marginTop: 8,
      animation: 'fadeIn 0.8s ease',
    }},
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        React.createElement(Icon, { name: 'Gift', size: 18, color: t.cta }),
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack } }, 'Mission Reward'),
      ),
      React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, 'Complete this rescue to earn the rare "Phoenix Leaf" Flourish and 250 Green Points'),
    ),
  );
}

// ─── FLOURISH COLLECTION SCREEN ───
function CollectionScreen({ t }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const filters = ['all', 'rare', 'milestones', 'rescues'];

  const flourishes = [
    { name: 'First Bloom', rarity: 'Common', earned: '2026-03-15', icon: 'Flower2', color: '#22C55E', desc: 'Nurtured your first plant for 30 days' },
    { name: 'Monstera Master', rarity: 'Rare', earned: '2026-04-01', icon: 'Crown', color: '#F59E0B', desc: 'Achieved 90%+ health on Monstera' },
    { name: 'Water Sage', rarity: 'Epic', earned: '2026-04-10', icon: 'Droplets', color: '#3B82F6', desc: '100 perfect watering sessions' },
    { name: 'Night Owl Orchid', rarity: 'Legendary', earned: '2026-04-14', icon: 'Moon', color: '#8B5CF6', desc: 'Rescued a plant at critical health' },
    { name: 'Green Thumb', rarity: 'Common', earned: '2026-03-20', icon: 'ThumbsUp', color: '#15803D', desc: 'Kept 5 plants thriving simultaneously' },
    { name: 'Root Runner', rarity: 'Rare', earned: '2026-04-05', icon: 'Zap', color: '#EC4899', desc: 'Successfully propagated a plant' },
  ];

  const rarityColors = { Common: t.secondary, Rare: '#F59E0B', Epic: '#3B82F6', Legendary: '#8B5CF6' };

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Flourishes'),
    React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, marginBottom: 20 } }, '6 collected of 24 total'),

    // Stats row
    React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 22 } },
      [{ label: 'Common', val: 2, color: t.secondary }, { label: 'Rare', val: 2, color: '#F59E0B' }, { label: 'Epic', val: 1, color: '#3B82F6' }, { label: 'Legendary', val: 1, color: '#8B5CF6' }].map((s, i) =>
        React.createElement('div', { key: i, style: { flex: 1, background: t.surface, borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: `1px solid ${t.border}` } },
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: s.color, fontFamily: fontStack } }, s.val),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, marginTop: 2 } }, s.label),
        )
      )
    ),

    // Filter chips
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' } },
      filters.map(f =>
        React.createElement('div', {
          key: f,
          style: {
            padding: '8px 16px', borderRadius: 20,
            background: selectedFilter === f ? t.primary : t.surface,
            color: selectedFilter === f ? '#fff' : t.textSecondary,
            fontSize: 13, fontWeight: 600, fontFamily: fontStack,
            cursor: 'pointer', transition: 'all 0.2s',
            border: `1px solid ${selectedFilter === f ? t.primary : t.border}`,
            textTransform: 'capitalize', whiteSpace: 'nowrap',
          },
          onClick: () => setSelectedFilter(f),
        }, f)
      )
    ),

    // Flourish grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
      flourishes.map((fl, i) =>
        React.createElement('div', {
          key: i,
          style: {
            background: t.card, borderRadius: 18, padding: '18px 14px',
            border: `1px solid ${t.border}`, cursor: 'pointer',
            transition: 'all 0.25s', textAlign: 'center',
            animation: `bloomGrow ${0.4 + i * 0.08}s ease`,
          },
        },
          React.createElement('div', { style: {
            width: 56, height: 56, borderRadius: 28,
            background: `${fl.color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: `0 4px 20px ${fl.color}33`,
            animation: 'floatUp 3s ease-in-out infinite',
            animationDelay: `${i * 0.3}s`,
          }},
            React.createElement(Icon, { name: fl.icon, size: 26, color: fl.color }),
          ),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 4 } }, fl.name),
          React.createElement('div', { style: {
            display: 'inline-block', fontSize: 11, fontWeight: 700, fontFamily: fontStack,
            color: rarityColors[fl.rarity], background: `${rarityColors[fl.rarity]}18`,
            padding: '2px 8px', borderRadius: 6, marginBottom: 6,
          } }, fl.rarity),
          React.createElement('div', { style: { fontSize: 12, color: t.textMuted, fontFamily: fontStack, lineHeight: 1.4 } }, fl.desc),
        )
      )
    ),
  );
}

// ─── ECO IMPACT SCREEN ───
function EcoScreen({ t }) {
  const stats = [
    { label: 'Plants Saved', value: '7', icon: 'Heart', color: t.cta, sub: 'from critical health' },
    { label: 'Water Optimized', value: '23L', icon: 'Droplets', color: '#3B82F6', sub: 'saved vs avg gardener' },
    { label: 'CO2 Absorbed', value: '4.2kg', icon: 'Wind', color: t.secondary, sub: 'by your plants this month' },
    { label: 'Waste Prevented', value: '12', icon: 'Recycle', color: '#F59E0B', sub: 'plants that would have died' },
  ];

  const monthlyData = [40, 55, 62, 70, 68, 82, 91];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const maxVal = Math.max(...monthlyData);

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Eco Impact'),
    React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, marginBottom: 24 } }, 'Your environmental contribution'),

    // Hero stat
    React.createElement('div', { style: {
      background: `linear-gradient(135deg, ${t.primary}, #166534)`,
      borderRadius: 22, padding: '24px 22px', marginBottom: 22,
      boxShadow: `0 8px 32px ${t.primary}44`,
      animation: 'slideUp 0.4s ease',
    }},
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
        React.createElement(Icon, { name: 'TreePine', size: 20, color: 'rgba(255,255,255,0.7)' }),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: fontStack, textTransform: 'uppercase', letterSpacing: 1 } }, 'Overall Green Score'),
      ),
      React.createElement('div', { style: { fontSize: 52, fontWeight: 800, color: '#fff', fontFamily: fontStack, letterSpacing: -1, lineHeight: 1 } }, '847'),
      React.createElement('div', { style: { fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: fontStack, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement(Icon, { name: 'TrendingUp', size: 16, color: '#4ADE80' }),
        React.createElement('span', null, '+12% from last month'),
      ),
    ),

    // Stats grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 } },
      stats.map((s, i) =>
        React.createElement('div', { key: i, style: {
          background: t.card, borderRadius: 16, padding: '16px 14px',
          border: `1px solid ${t.border}`,
          animation: `fadeIn ${0.3 + i * 0.1}s ease`,
        }},
          React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } },
            React.createElement(Icon, { name: s.icon, size: 18, color: s.color }),
          ),
          React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: t.text, fontFamily: fontStack, marginBottom: 2 } }, s.value),
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: t.textSecondary, fontFamily: fontStack } }, s.label),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, marginTop: 2 } }, s.sub),
        )
      )
    ),

    // Chart
    React.createElement('div', { style: { background: t.card, borderRadius: 18, padding: '20px 16px', border: `1px solid ${t.border}` } },
      React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 20 } }, 'Green Score Trend'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 } },
        monthlyData.map((val, i) =>
          React.createElement('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            React.createElement('div', { style: { fontSize: 10, fontWeight: 600, color: t.textMuted, fontFamily: fontStack } }, val),
            React.createElement('div', { style: {
              width: '100%', height: `${(val / maxVal) * 90}px`,
              background: i === monthlyData.length - 1 ? `linear-gradient(180deg, ${t.secondary}, ${t.primary})` : `${t.secondary}33`,
              borderRadius: 6, transition: 'height 0.5s ease',
              animation: `slideUp ${0.3 + i * 0.05}s ease`,
            }}),
            React.createElement('div', { style: { fontSize: 10, color: t.textMuted, fontFamily: fontStack } }, months[i]),
          )
        )
      ),
    ),
  );
}

// ─── IDENTIFY / LIBRARY SCREEN ───
function LibraryScreen({ t }) {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPlants = [
    { name: 'Monstera Deliciosa', family: 'Araceae', difficulty: 'Easy', light: 'Indirect', water: 'Weekly', icon: 'Leaf' },
    { name: 'Calathea Orbifolia', family: 'Marantaceae', difficulty: 'Moderate', light: 'Low-Med', water: '2x Weekly', icon: 'Flower2' },
    { name: 'String of Pearls', family: 'Asteraceae', difficulty: 'Moderate', light: 'Bright', water: 'Bi-weekly', icon: 'CircleDot' },
    { name: 'Bird of Paradise', family: 'Strelitziaceae', difficulty: 'Easy', light: 'Bright', water: 'Weekly', icon: 'Feather' },
    { name: 'Peace Lily', family: 'Araceae', difficulty: 'Easy', light: 'Low', water: 'Weekly', icon: 'Sparkles' },
  ];

  const diffColors = { Easy: t.secondary, Moderate: '#F59E0B', Hard: t.danger };

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 6 } }, 'Plant Library'),
    React.createElement('div', { style: { fontSize: 15, color: t.textSecondary, fontFamily: fontStack, marginBottom: 20 } }, '2,400+ species in our database'),

    // Search
    React.createElement('div', { style: { position: 'relative', marginBottom: 20 } },
      React.createElement('div', { style: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 1 } },
        React.createElement(Icon, { name: 'Search', size: 18, color: t.textMuted }),
      ),
      React.createElement('input', {
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        placeholder: 'Search species, family, or care tips...',
        style: {
          width: '100%', padding: '14px 14px 14px 42px',
          background: t.inputBg, border: `1px solid ${t.border}`,
          borderRadius: 14, fontSize: 15, fontFamily: fontStack,
          color: t.text, outline: 'none', boxSizing: 'border-box',
        },
      }),
    ),

    // Scan CTA
    React.createElement('div', {
      style: {
        background: `linear-gradient(135deg, ${t.cta}, ${t.ctaHover})`,
        borderRadius: 18, padding: '20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 16,
        cursor: 'pointer', boxShadow: `0 6px 24px ${t.cta}44`,
        transition: 'transform 0.2s',
        animation: 'slideUp 0.4s ease',
      },
    },
      React.createElement('div', { style: { width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
        React.createElement(Icon, { name: 'Camera', size: 26, color: '#fff' }),
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: fontStack, marginBottom: 2 } }, 'Identify a Plant'),
        React.createElement('div', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: fontStack } }, 'Point your camera at any plant for instant ID'),
      ),
      React.createElement(Icon, { name: 'ChevronRight', size: 20, color: 'rgba(255,255,255,0.7)' }),
    ),

    // Featured
    React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack, letterSpacing: -0.3, marginBottom: 14 } }, 'Popular Species'),
    ...featuredPlants.map((p, i) =>
      React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', background: t.card, borderRadius: 16,
          border: `1px solid ${t.border}`, marginBottom: 10,
          cursor: 'pointer', transition: 'all 0.2s',
          animation: `fadeIn ${0.3 + i * 0.08}s ease`,
        },
      },
        React.createElement('div', { style: { width: 48, height: 48, borderRadius: 14, background: `${t.secondary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(Icon, { name: p.icon, size: 22, color: t.secondary }),
        ),
        React.createElement('div', { style: { flex: 1, minWidth: 0 } },
          React.createElement('div', { style: { fontSize: 16, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 2 } }, p.name),
          React.createElement('div', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, p.family),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 } },
          React.createElement('div', { style: {
            fontSize: 11, fontWeight: 600, fontFamily: fontStack,
            color: diffColors[p.difficulty],
            background: `${diffColors[p.difficulty]}18`,
            padding: '2px 8px', borderRadius: 6,
          } }, p.difficulty),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(Icon, { name: 'Droplets', size: 11, color: t.textMuted }),
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack } }, p.water),
          ),
        ),
      )
    ),
  );
}

// ─── PROFILE / SETTINGS SCREEN ───
function ProfileScreen({ t, onToggleTheme, isDark }) {
  const achievements = [
    { label: 'Plants', value: '12', icon: 'Leaf' },
    { label: 'Flourishes', value: '6', icon: 'Award' },
    { label: 'Rescues', value: '3', icon: 'Shield' },
    { label: 'Streak', value: '28d', icon: 'Flame' },
  ];

  return React.createElement('div', { style: { padding: '20px 16px 24px', animation: 'fadeIn 0.4s ease' } },
    React.createElement('div', { style: { fontSize: 34, fontWeight: 800, color: t.text, fontFamily: fontStack, letterSpacing: -0.5, marginBottom: 24 } }, 'Profile'),

    // Avatar card
    React.createElement('div', { style: {
      background: `linear-gradient(135deg, ${t.primary}33, ${t.secondary}22)`,
      borderRadius: 22, padding: '24px 20px', marginBottom: 22,
      textAlign: 'center', border: `1px solid ${t.border}`,
    }},
      React.createElement('div', { style: {
        width: 72, height: 72, borderRadius: 36,
        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px', boxShadow: `0 4px 20px ${t.primary}44`,
      }},
        React.createElement(Icon, { name: 'User', size: 32, color: '#fff' }),
      ),
      React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: t.text, fontFamily: fontStack } }, 'Plant Parent'),
      React.createElement('div', { style: { fontSize: 13, color: t.textSecondary, fontFamily: fontStack, marginTop: 4 } }, 'Level 7 Botanist — Joined March 2026'),
    ),

    // Stats row
    React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 24 } },
      achievements.map((a, i) =>
        React.createElement('div', { key: i, style: {
          flex: 1, background: t.card, borderRadius: 14, padding: '14px 6px',
          textAlign: 'center', border: `1px solid ${t.border}`,
          animation: `fadeIn ${0.3 + i * 0.1}s ease`,
        }},
          React.createElement('div', { style: { marginBottom: 6, display: 'flex', justifyContent: 'center' } },
            React.createElement(Icon, { name: a.icon, size: 18, color: t.secondary }),
          ),
          React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: t.text, fontFamily: fontStack } }, a.value),
          React.createElement('div', { style: { fontSize: 11, color: t.textMuted, fontFamily: fontStack, marginTop: 2 } }, a.label),
        )
      )
    ),

    // Settings
    React.createElement('div', { style: { fontSize: 17, fontWeight: 600, color: t.text, fontFamily: fontStack, marginBottom: 12 } }, 'Settings'),
    [
      { icon: isDark ? 'Moon' : 'Sun', label: 'Dark Mode', action: 'toggle' },
      { icon: 'Bell', label: 'Notifications', value: 'On' },
      { icon: 'Droplets', label: 'Watering Reminders', value: 'Smart' },
      { icon: 'MapPin', label: 'Location', value: 'San Francisco' },
      { icon: 'HelpCircle', label: 'Help & Support' },
    ].map((item, i) =>
      React.createElement('div', {
        key: i,
        style: {
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', background: t.card, borderRadius: 14,
          border: `1px solid ${t.border}`, marginBottom: 8,
          cursor: 'pointer', transition: 'all 0.2s',
        },
        onClick: item.action === 'toggle' ? onToggleTheme : undefined,
      },
        React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${t.secondary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
          React.createElement(Icon, { name: item.icon, size: 18, color: t.secondary }),
        ),
        React.createElement('div', { style: { flex: 1, fontSize: 16, fontWeight: 500, color: t.text, fontFamily: fontStack } }, item.label),
        item.action === 'toggle' ?
          React.createElement('div', { style: {
            width: 48, height: 28, borderRadius: 14,
            background: isDark ? t.secondary : t.border,
            padding: 2, cursor: 'pointer', transition: 'background 0.3s',
          }},
            React.createElement('div', { style: {
              width: 24, height: 24, borderRadius: 12,
              background: '#fff', transition: 'transform 0.3s',
              transform: isDark ? 'translateX(20px)' : 'translateX(0)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}),
          ) :
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            item.value && React.createElement('span', { style: { fontSize: 13, color: t.textMuted, fontFamily: fontStack } }, item.value),
            React.createElement(Icon, { name: 'ChevronRight', size: 16, color: t.textMuted }),
          ),
      )
    ),
  );
}

// ─── MAIN APP ───
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [themeMode, setThemeMode] = useState('dark');
  const t = themes[themeMode];
  const isDark = themeMode === 'dark';

  const toggleTheme = useCallback(() => {
    setThemeMode(m => m === 'dark' ? 'light' : 'dark');
  }, []);

  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'rescue', icon: 'ShieldAlert', label: 'Rescue' },
    { id: 'collection', icon: 'Award', label: 'Flourish' },
    { id: 'eco', icon: 'TreePine', label: 'Eco' },
    { id: 'library', icon: 'BookOpen', label: 'Library' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, { t, onNavigate: setActiveScreen }),
    rescue: () => React.createElement(RescueScreen, { t }),
    collection: () => React.createElement(CollectionScreen, { t }),
    eco: () => React.createElement(EcoScreen, { t }),
    library: () => React.createElement(LibraryScreen, { t }),
    profile: () => React.createElement(ProfileScreen, { t, onToggleTheme: toggleTheme, isDark }),
  };

  const CurrentScreen = screens[activeScreen] || screens.home;

  return React.createElement('div', {
    style: {
      minHeight: '100vh', background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 0', fontFamily: fontStack,
    },
  },
    React.createElement('div', {
      style: {
        width: 375, height: 812,
        background: t.bg,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.3s ease',
      },
    },
      // Content area
      React.createElement('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 12,
          paddingBottom: 80,
        },
      }, React.createElement(CurrentScreen)),

      // Bottom navigation
      React.createElement('div', {
        style: {
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: t.navBg,
          borderTop: `1px solid ${t.navBorder}`,
          display: 'flex',
          padding: '8px 4px 24px',
          transition: 'background 0.3s ease',
        },
      },
        tabs.map(tab =>
          React.createElement('div', {
            key: tab.id,
            style: {
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3,
              padding: '6px 0', cursor: 'pointer',
              transition: 'all 0.2s',
            },
            onClick: () => setActiveScreen(tab.id),
          },
            React.createElement('div', { style: {
              width: 44, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 14,
              background: activeScreen === tab.id ? `${t.secondary}22` : 'transparent',
              transition: 'background 0.2s',
            }},
              React.createElement(Icon, {
                name: tab.icon, size: 20,
                color: activeScreen === tab.id ? t.secondary : t.textMuted,
              }),
            ),
            React.createElement('span', {
              style: {
                fontSize: 10, fontWeight: activeScreen === tab.id ? 700 : 500,
                color: activeScreen === tab.id ? t.secondary : t.textMuted,
                fontFamily: fontStack, transition: 'color 0.2s',
              },
            }, tab.label),
          )
        )
      ),
    ),
  );
}
