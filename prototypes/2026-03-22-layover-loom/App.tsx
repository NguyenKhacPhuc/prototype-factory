
// ─── LAYOVER LOOM ─── Turn dead travel time into local time ───────────────────

// ==================== STATUS BAR =============================================
function StatusBar({ t }) {
  const Signal = window.lucide.Signal;
  const Wifi = window.lucide.Wifi;
  const Battery = window.lucide.Battery;

  return (
    <div style={{ position: 'relative', height: 52, flexShrink: 0 }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 122, height: 34, background: '#000',
        borderRadius: 22, zIndex: 10,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
      }} />
      {/* Status content */}
      <div style={{
        position: 'absolute', bottom: 6, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 26, paddingRight: 20,
      }}>
        <span style={{ color: t.text, fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px' }}>14:13</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <Signal size={13} color={t.text} />
          <Wifi size={13} color={t.text} />
          <Battery size={17} color={t.text} />
        </div>
      </div>
    </div>
  );
}

// ==================== HOME SCREEN ============================================
function HomeScreen({ t, setActiveTab }) {
  const { useState } = React;
  const [selectedGoals, setSelectedGoals] = useState(['eat', 'explore']);
  const [energy, setEnergy] = useState('medium');
  const [generating, setGenerating] = useState(false);

  const MapPin = window.lucide.MapPin;
  const Clock = window.lucide.Clock;
  const Plane = window.lucide.Plane;
  const Sparkles = window.lucide.Sparkles;
  const ChevronRight = window.lucide.ChevronRight;
  const TrendingUp = window.lucide.TrendingUp;

  const goals = [
    { id: 'eat', label: 'Eat Well', emoji: '🍜' },
    { id: 'explore', label: 'Explore', emoji: '🗺️' },
    { id: 'rest', label: 'Rest', emoji: '😴' },
    { id: 'work', label: 'Work', emoji: '💼' },
    { id: 'see', label: 'See Sights', emoji: '📸' },
  ];

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setActiveTab('plan'); }, 1600);
  };

  return (
    <div style={{ paddingBottom: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '10px 20px 6px' }}>
        <p style={{ color: t.textSub, fontSize: 13, margin: 0, fontWeight: 500 }}>Good afternoon</p>
        <h1 style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: '2px 0 0', letterSpacing: '-0.5px' }}>
          Alex Chen <span style={{ fontSize: 18 }}>✈️</span>
        </h1>
      </div>

      {/* Layover Card */}
      <div style={{
        margin: '10px 20px',
        background: `linear-gradient(135deg, ${t.primary}1A 0%, ${t.secondary}12 100%)`,
        border: `1.5px solid ${t.primary}38`,
        borderRadius: 20, padding: '16px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -28, top: -28, width: 110, height: 110,
          background: `${t.primary}0D`, borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', right: 8, bottom: -18, width: 70, height: 70,
          background: `${t.secondary}0A`, borderRadius: '50%',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <MapPin size={13} color={t.primary} />
              <span style={{ color: t.primary, fontSize: 11, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase' }}>Layover Active</span>
            </div>
            <h2 style={{ color: t.text, fontSize: 19, fontWeight: 700, margin: '0 0 2px', letterSpacing: '-0.3px' }}>Singapore Changi</h2>
            <p style={{ color: t.textSub, fontSize: 13, margin: 0 }}>SIN — Terminal 1</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              background: t.primary, color: '#003D30', borderRadius: 10,
              padding: '5px 12px', fontSize: 15, fontWeight: 800, letterSpacing: '-0.3px',
            }}>4h 32m</div>
            <p style={{ color: t.textSub, fontSize: 11, margin: '4px 0 0', textAlign: 'center' }}>remaining</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ margin: '12px 0 10px' }}>
          <div style={{ background: t.surface3, borderRadius: 4, height: 4, overflow: 'hidden' }}>
            <div style={{
              width: '75%', height: '100%',
              background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
              borderRadius: 4,
            }} />
          </div>
        </div>

        {/* Flight + weather row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Plane size={13} color={t.textSub} />
          <span style={{ color: t.textSub, fontSize: 12 }}>SQ421 → LHR</span>
          <span style={{ color: t.textMuted }}>•</span>
          <Clock size={13} color={t.textSub} />
          <span style={{ color: t.textSub, fontSize: 12 }}>Boarding 18:45</span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { emoji: '⛅', text: '31°C Partly cloudy' },
            { emoji: '🧳', text: 'Checked in' },
            { emoji: '💵', text: '$50 budget' },
          ].map(chip => (
            <div key={chip.text} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: t.surface + 'AA', borderRadius: 8, padding: '4px 10px',
              border: `1px solid ${t.border}`,
            }}>
              <span style={{ fontSize: 12 }}>{chip.emoji}</span>
              <span style={{ color: t.text, fontSize: 11, fontWeight: 500 }}>{chip.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence factors */}
      <div style={{ padding: '4px 20px 10px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Security', value: 'Low wait', color: t.success },
            { label: 'Traffic', value: 'Normal', color: t.success },
            { label: 'Weather', value: 'Good', color: t.success },
          ].map(f => (
            <div key={f.label} style={{
              flex: 1, background: t.surface2, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: '9px 6px', textAlign: 'center',
            }}>
              <div style={{ color: f.color, fontSize: 15, marginBottom: 1 }}>✓</div>
              <div style={{ color: t.text, fontSize: 11, fontWeight: 600 }}>{f.value}</div>
              <div style={{ color: t.textMuted, fontSize: 10 }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div style={{ padding: '0 20px 10px' }}>
        <p style={{ color: t.textSub, fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}>Energy Level</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'low', label: '😴  Low' },
            { id: 'medium', label: '😊  Medium' },
            { id: 'high', label: '⚡  High' },
          ].map(e => (
            <button key={e.id} onClick={() => setEnergy(e.id)} style={{
              flex: 1, padding: '9px 0', borderRadius: 11, cursor: 'pointer',
              border: `1.5px solid ${energy === e.id ? t.primary : t.border}`,
              background: energy === e.id ? `${t.primary}1E` : 'transparent',
              color: energy === e.id ? t.primary : t.textSub,
              fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
            }}>{e.label}</button>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div style={{ padding: '0 20px 12px' }}>
        <p style={{ color: t.textSub, fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}>What do you want to do?</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {goals.map(goal => {
            const active = selectedGoals.includes(goal.id);
            return (
              <button key={goal.id} onClick={() => toggleGoal(goal.id)} style={{
                padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
                border: `1.5px solid ${active ? t.primary : t.border}`,
                background: active ? `${t.primary}1E` : 'transparent',
                color: active ? t.primary : t.textSub,
                fontSize: 13, fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <span>{goal.emoji}</span>{goal.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate CTA */}
      <div style={{ padding: '0 20px 14px' }}>
        <button onClick={handleGenerate} disabled={generating} style={{
          width: '100%', padding: '16px', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: generating ? t.textMuted : `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`,
          color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '-0.2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: generating ? 'none' : `0 8px 24px ${t.primary}40`,
        }}>
          {generating
            ? <><span>⏳</span> Building your adventure...</>
            : <><Sparkles size={17} /> Generate My Adventure</>
          }
        </button>
      </div>

      {/* Past adventures */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ color: t.textSub, fontSize: 13, fontWeight: 600, margin: 0 }}>Past Adventures</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <span style={{ color: t.primary, fontSize: 12, fontWeight: 600 }}>See all</span>
            <ChevronRight size={14} color={t.primary} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { city: 'Tokyo Narita', code: 'NRT', goal: 'Ramen + Tsukiji walk', duration: '3h 15m', saved: '¥1,200', rating: '⭐ 4.9' },
            { city: 'Dubai DXB', code: 'DXB', goal: 'Gold souk + work reset', duration: '5h 00m', saved: 'AED 80', rating: '⭐ 4.7' },
          ].map(adv => (
            <div key={adv.code} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
              background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `linear-gradient(135deg, ${t.primary}30, ${t.secondary}20)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>🌏</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{adv.city}</p>
                <p style={{ color: t.textSub, fontSize: 12, margin: '2px 0 0' }}>{adv.goal}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: t.primary, fontSize: 12, fontWeight: 600, margin: 0 }}>{adv.rating}</p>
                <p style={{ color: t.textMuted, fontSize: 11, margin: '2px 0 0' }}>{adv.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== PLAN SCREEN ============================================
function PlanScreen({ t }) {
  const { useState } = React;
  const [expandedStep, setExpandedStep] = useState(2);

  const Bell = window.lucide.Bell;
  const CheckCircle = window.lucide.CheckCircle;
  const Clock = window.lucide.Clock;
  const RefreshCw = window.lucide.RefreshCw;
  const Navigation = window.lucide.Navigation;
  const Share2 = window.lucide.Share2;
  const AlertCircle = window.lucide.AlertCircle;

  const steps = [
    {
      time: '14:15', duration: 15, title: 'Clear Immigration',
      subtitle: 'T1 Arrival Hall → Departure Zone', type: 'transit',
      icon: '🛂', status: 'done', risk: null,
      detail: 'Expected 5-8 min wait. Have your boarding pass ready.',
    },
    {
      time: '14:30', duration: 12, title: 'MRT to Jewel Changi',
      subtitle: '5 stops • $1.40 SGD', type: 'transit',
      icon: '🚇', status: 'done', risk: null,
      detail: 'Trains run every 3 min. Alight at Changi Airport Station.',
    },
    {
      time: '14:42', duration: 35, title: 'Lunch at Hawker Hall',
      subtitle: 'Chicken rice + teh tarik • ~$12 SGD', type: 'eat',
      icon: '🍜', status: 'active', risk: 'low',
      detail: 'Queue risk is Low. Recommend: Tian Tian Chicken Rice (stall 12). Cash preferred.',
    },
    {
      time: '15:17', duration: 25, title: 'Rain Vortex + Forest Valley',
      subtitle: 'Indoor waterfall — Free entry', type: 'see',
      icon: '💧', status: 'pending', risk: null,
      detail: 'Best viewed from Level 5 viewing deck. Vortex show runs every 30 min.',
    },
    {
      time: '15:42', duration: 15, title: 'Browse Jewel Shops',
      subtitle: 'Ground floor retail & duty-free', type: 'explore',
      icon: '🛍️', status: 'pending', risk: null,
      detail: 'DFS duty-free and local brands on L1-L2. Keep budget in mind.',
    },
    {
      time: '15:57', duration: 12, title: 'Return MRT to Terminal 3',
      subtitle: 'LEAVE NOW for safe buffer', type: 'transit',
      icon: '🚇', status: 'pending', risk: 'critical',
      detail: 'This is your hard departure time. Missing this risks your connection.',
    },
    {
      time: '16:09', duration: 36, title: 'T3 Security + Walk to Gate',
      subtitle: 'Gate B14 — Estimated 20 min walk', type: 'transit',
      icon: '🔒', status: 'pending', risk: null,
      detail: 'Priority lane available with SQ boarding pass. Head left after security.',
    },
  ];

  const statusColor = (step) => {
    if (step.risk === 'critical') return t.warning;
    if (step.status === 'active') return t.primary;
    if (step.status === 'done') return t.textMuted;
    return t.text;
  };

  const cardBg = (step) => {
    if (step.risk === 'critical') return `${t.warning}12`;
    if (step.status === 'active') return `${t.primary}10`;
    if (step.status === 'done') return t.surface3 + '60';
    return t.surface2;
  };

  const cardBorder = (step) => {
    if (step.risk === 'critical') return `${t.warning}50`;
    if (step.status === 'active') return `${t.primary}50`;
    return t.border;
  };

  return (
    <div style={{ paddingBottom: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '10px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: t.textSub, fontSize: 13, margin: 0, fontWeight: 500 }}>Active Itinerary</p>
          <h1 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: '2px 0 0', letterSpacing: '-0.4px' }}>Singapore Speed Run</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{
            background: `${t.primary}18`, border: `1.5px solid ${t.primary}40`,
            borderRadius: 12, padding: '6px 12px', textAlign: 'center',
          }}>
            <div style={{ color: t.primary, fontSize: 17, fontWeight: 800 }}>94%</div>
            <div style={{ color: t.textSub, fontSize: 10, fontWeight: 500 }}>confidence</div>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div style={{ padding: '0 20px 10px', display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1, padding: '9px 0', borderRadius: 12, border: `1px solid ${t.border}`,
          background: t.surface2, color: t.textSub, fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <RefreshCw size={13} color={t.textSub} /> Regenerate
        </button>
        <button style={{
          flex: 1, padding: '9px 0', borderRadius: 12, border: `1px solid ${t.border}`,
          background: t.surface2, color: t.textSub, fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Share2 size={13} color={t.textSub} /> Share Plan
        </button>
      </div>

      {/* Return reminder */}
      <div style={{
        margin: '0 20px 12px', padding: '11px 14px', borderRadius: 14,
        background: `${t.warning}15`, border: `1.5px solid ${t.warning}45`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Bell size={16} color={t.warning} />
        <div>
          <p style={{ color: t.warning, fontSize: 13, fontWeight: 700, margin: 0 }}>Return reminder set for 15:57</p>
          <p style={{ color: t.textSub, fontSize: 12, margin: '2px 0 0' }}>Leave Jewel → Gate B14 by 16:45 (+1h buffer) ✓</p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 20px' }}>
        {steps.map((step, i) => {
          const isExpanded = expandedStep === i;
          return (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 2 }}>
              {/* Time + line column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 46, flexShrink: 0 }}>
                <span style={{ color: statusColor(step), fontSize: 11, fontWeight: 700, marginBottom: 4, whiteSpace: 'nowrap' }}>{step.time}</span>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1, width: 2, minHeight: 20,
                    background: step.status === 'done' ? `${t.primary}80` : t.border,
                  }} />
                )}
              </div>

              {/* Card */}
              <div
                onClick={() => setExpandedStep(isExpanded ? -1 : i)}
                style={{
                  flex: 1, borderRadius: 13, padding: '10px 12px', marginBottom: 8,
                  background: cardBg(step), border: `1px solid ${cardBorder(step)}`,
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                }}
              >
                {step.status === 'active' && (
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                    background: t.primary, borderRadius: '3px 0 0 3px',
                  }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ fontSize: 16, lineHeight: 1 }}>{step.icon}</span>
                    <div>
                      <p style={{ color: statusColor(step), fontSize: 13, fontWeight: 600, margin: 0 }}>{step.title}</p>
                      <p style={{ color: t.textSub, fontSize: 12, margin: '2px 0 0' }}>{step.subtitle}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0, marginLeft: 8 }}>
                    <span style={{ color: t.textMuted, fontSize: 11, fontWeight: 500 }}>{step.duration}m</span>
                    {step.status === 'done' && <CheckCircle size={14} color={t.success} />}
                    {step.status === 'active' && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, boxShadow: `0 0 0 3px ${t.primary}30` }} />
                    )}
                    {step.risk === 'critical' && <AlertCircle size={14} color={t.warning} />}
                  </div>
                </div>
                {isExpanded && (
                  <div style={{
                    marginTop: 8, paddingTop: 8, borderTop: `1px solid ${t.border}`,
                    color: t.textSub, fontSize: 12, lineHeight: 1.5,
                  }}>{step.detail}</div>
                )}
              </div>
            </div>
          );
        })}

        {/* Final gate card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
          background: `${t.success}14`, border: `1.5px solid ${t.success}50`,
          borderRadius: 14, marginTop: 4,
        }}>
          <CheckCircle size={20} color={t.success} />
          <div>
            <p style={{ color: t.success, fontSize: 14, fontWeight: 700, margin: 0 }}>16:45 — At Gate B14 ✓</p>
            <p style={{ color: t.textSub, fontSize: 12, margin: '2px 0 0' }}>+1h 0m buffer before 18:45 boarding</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== EXPLORE SCREEN =========================================
function ExploreScreen({ t }) {
  const { useState } = React;
  const [filter, setFilter] = useState('all');
  const [saved, setSaved] = useState([1, 3]);

  const Search = window.lucide.Search;
  const Heart = window.lucide.Heart;
  const Star = window.lucide.Star;
  const Clock = window.lucide.Clock;
  const MapPin = window.lucide.MapPin;
  const Plus = window.lucide.Plus;

  const places = [
    {
      id: 1, name: 'YOTELAIR Singapore', category: 'rest', type: 'Sleep Pod',
      location: 'Terminal 1 — Airside', time: '1h min', price: '$45/hr',
      rating: 4.8, tags: ['Shower', 'Pod bed', 'Quiet zone'], queueRisk: null, icon: '🛌',
      compatible: true,
    },
    {
      id: 2, name: 'Hawker Hall', category: 'eat', type: 'Food Hall',
      location: 'Jewel Changi — B1', time: '35–45 min', price: '$8–15',
      rating: 4.7, tags: ['Local eats', 'Fast', 'Budget'], queueRisk: 'Low', icon: '🍜',
      compatible: true,
    },
    {
      id: 3, name: 'Rain Vortex', category: 'see', type: 'Landmark',
      location: 'Jewel Changi — L1–5', time: '20 min', price: 'Free',
      rating: 4.9, tags: ['Iconic', 'Indoor', 'No queue'], queueRisk: 'None', icon: '💧',
      compatible: true,
    },
    {
      id: 4, name: 'SilverKris Lounge (SQ)', category: 'work', type: 'Business Lounge',
      location: 'Terminal 3 — Level 2', time: 'Flexible', price: '$40 day pass',
      rating: 4.6, tags: ['Fast Wi-Fi', 'Quiet', 'Shower avail.'], queueRisk: null, icon: '💼',
      compatible: true,
    },
    {
      id: 5, name: 'Pollen Restaurant', category: 'eat', type: 'Fine Dining',
      location: 'Jewel Changi — L5', time: '70–80 min', price: '$60+',
      rating: 4.7, tags: ['Garden view', 'Relaxed', 'Upscale'], queueRisk: 'Med', icon: '🌿',
      compatible: false,
    },
    {
      id: 6, name: 'Canopy Park', category: 'see', type: 'Sky Garden',
      location: 'Jewel Changi — L5', time: '45 min', price: '$5 SGD',
      rating: 4.5, tags: ['Sky nets', 'Views', 'Active'], queueRisk: 'Low', icon: '🌳',
      compatible: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'rest', label: '😴 Rest' },
    { id: 'eat', label: '🍜 Eat' },
    { id: 'work', label: '💼 Work' },
    { id: 'see', label: '📸 See' },
  ];

  const filtered = filter === 'all' ? places : places.filter(p => p.category === filter);

  const queueColor = (risk) => {
    if (risk === 'None' || risk === 'Low') return t.success;
    if (risk === 'Med') return t.warning;
    if (risk === 'High') return t.danger;
    return t.textMuted;
  };

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div style={{ paddingBottom: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '10px 20px 10px' }}>
        <h1 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.4px' }}>Explore Nearby</h1>
        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: t.surface2, border: `1px solid ${t.border}`,
          borderRadius: 13, padding: '10px 14px',
        }}>
          <Search size={15} color={t.textMuted} />
          <span style={{ color: t.textMuted, fontSize: 14 }}>Places, food, lounges...</span>
        </div>
      </div>

      {/* Context bar */}
      <div style={{
        margin: '0 20px 12px', padding: '8px 12px', borderRadius: 11,
        background: `${t.secondary}12`, border: `1px solid ${t.secondary}30`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <MapPin size={13} color={t.secondary} />
        <span style={{ color: t.secondary, fontSize: 12, fontWeight: 600 }}>Showing places within 45-min return window</span>
      </div>

      {/* Filter pills */}
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '6px 14px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
            border: `1.5px solid ${filter === f.id ? t.primary : t.border}`,
            background: filter === f.id ? `${t.primary}1E` : 'transparent',
            color: filter === f.id ? t.primary : t.textSub,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Place cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(place => (
          <div key={place.id} style={{
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: 16, overflow: 'hidden',
            opacity: place.compatible ? 1 : 0.7,
          }}>
            <div style={{ padding: '14px 14px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13,
                    background: t.surface3, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>{place.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{place.name}</p>
                      {!place.compatible && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: t.warning,
                          background: `${t.warning}18`, border: `1px solid ${t.warning}40`,
                          borderRadius: 5, padding: '1px 6px',
                        }}>TIGHT</span>
                      )}
                    </div>
                    <p style={{ color: t.textMuted, fontSize: 12, margin: '2px 0 4px' }}>{place.type} • {place.location}</p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {place.tags.map(tag => (
                        <span key={tag} style={{
                          background: t.surface3, color: t.textSub, borderRadius: 6,
                          padding: '2px 8px', fontSize: 11, fontWeight: 500,
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleSave(place.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                  <Heart size={18} color={saved.includes(place.id) ? t.danger : t.textMuted} fill={saved.includes(place.id) ? t.danger : 'none'} />
                </button>
              </div>
            </div>

            {/* Card footer */}
            <div style={{
              padding: '9px 14px', borderTop: `1px solid ${t.border}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} color={t.textMuted} />
                  <span style={{ color: t.textSub, fontSize: 12 }}>{place.time}</span>
                </div>
                <span style={{ color: t.textSub, fontSize: 12 }}>{place.price}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {place.queueRisk && (
                  <span style={{ color: queueColor(place.queueRisk), fontSize: 11, fontWeight: 700 }}>
                    Queue: {place.queueRisk}
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Star size={12} color="#FFB347" fill="#FFB347" />
                  <span style={{ color: t.text, fontSize: 12, fontWeight: 700 }}>{place.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== SETTINGS SCREEN ========================================
function SettingsScreen({ t, isDark, setIsDark }) {
  const { useState } = React;
  const [notifications, setNotifications] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [smartBuffer, setSmartBuffer] = useState(true);
  const [budget, setBudget] = useState('$50');
  const [baggage, setBaggage] = useState('checked');

  const Sun = window.lucide.Sun;
  const Moon = window.lucide.Moon;
  const Bell = window.lucide.Bell;
  const Plane = window.lucide.Plane;
  const Globe = window.lucide.Globe;
  const DollarSign = window.lucide.DollarSign;
  const ChevronRight = window.lucide.ChevronRight;
  const Briefcase = window.lucide.Briefcase;
  const Shield = window.lucide.Shield;
  const Zap = window.lucide.Zap;

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 27, borderRadius: 14,
      background: value ? t.primary : t.surface3,
      position: 'relative', cursor: 'pointer',
      transition: 'background 0.2s',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3.5, left: value ? 22 : 3.5,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        transition: 'left 0.2s',
      }} />
    </div>
  );

  return (
    <div style={{ paddingBottom: 16, fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ padding: '10px 20px 14px' }}>
        <h1 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 14px', letterSpacing: '-0.4px' }}>Settings</h1>

        {/* Profile card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: t.surface2, border: `1px solid ${t.border}`,
          borderRadius: 16, padding: '14px 16px',
        }}>
          <div style={{
            width: 54, height: 54, borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 20, fontWeight: 800, flexShrink: 0,
          }}>AC</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: 0 }}>Alex Chen</p>
            <p style={{ color: t.textSub, fontSize: 12, margin: '3px 0 0' }}>✈️ Home: SFO • 192 visa-free countries</p>
          </div>
          <ChevronRight size={18} color={t.textMuted} />
        </div>
      </div>

      {/* Section builder */}
      {[
        {
          label: 'Appearance',
          rows: [
            {
              Icon: isDark ? Moon : Sun,
              label: isDark ? 'Dark Mode' : 'Light Mode',
              right: <Toggle value={isDark} onChange={setIsDark} />,
              border: false,
            },
          ],
        },
        {
          label: 'Travel Preferences',
          rows: [
            {
              Icon: Briefcase,
              label: 'Baggage',
              right: (
                <div style={{ display: 'flex', gap: 5 }}>
                  {['checked', 'carry-on'].map(b => (
                    <button key={b} onClick={() => setBaggage(b)} style={{
                      padding: '4px 9px', borderRadius: 8, cursor: 'pointer',
                      background: baggage === b ? `${t.primary}22` : 'transparent',
                      border: `1px solid ${baggage === b ? t.primary : t.border}`,
                      color: baggage === b ? t.primary : t.textSub,
                      fontSize: 11, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                    }}>{b === 'checked' ? 'Checked' : 'Carry-on'}</button>
                  ))}
                </div>
              ),
              border: true,
            },
            {
              Icon: DollarSign,
              label: 'Budget',
              right: (
                <div style={{ display: 'flex', gap: 5 }}>
                  {['$25', '$50', '$100+'].map(b => (
                    <button key={b} onClick={() => setBudget(b)} style={{
                      padding: '4px 9px', borderRadius: 8, cursor: 'pointer',
                      background: budget === b ? `${t.primary}22` : 'transparent',
                      border: `1px solid ${budget === b ? t.primary : t.border}`,
                      color: budget === b ? t.primary : t.textSub,
                      fontSize: 11, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                    }}>{b}</button>
                  ))}
                </div>
              ),
              border: true,
            },
            {
              Icon: Globe,
              label: 'Visa-Free Countries',
              right: (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: t.textSub, fontSize: 14 }}>192</span>
                  <ChevronRight size={15} color={t.textMuted} />
                </div>
              ),
              border: false,
            },
          ],
        },
        {
          label: 'Notifications',
          rows: [
            { Icon: Bell, label: 'Return Reminders', right: <Toggle value={notifications} onChange={setNotifications} />, border: true },
            { Icon: Plane, label: 'Auto-detect Flights', right: <Toggle value={autoDetect} onChange={setAutoDetect} />, border: true },
            { Icon: Zap, label: 'Smart Buffer Alerts', right: <Toggle value={smartBuffer} onChange={setSmartBuffer} />, border: false },
          ],
        },
        {
          label: 'Privacy & Data',
          rows: [
            {
              Icon: Shield, label: 'Location Access',
              right: (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ color: t.success, fontSize: 12, fontWeight: 600 }}>While using</span>
                  <ChevronRight size={15} color={t.textMuted} />
                </div>
              ),
              border: false,
            },
          ],
        },
      ].map(section => (
        <div key={section.label} style={{ marginBottom: 16 }}>
          <p style={{
            color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.8px',
            textTransform: 'uppercase', padding: '0 20px', margin: '0 0 6px',
          }}>{section.label}</p>
          <div style={{
            background: t.surface2, border: `1px solid ${t.border}`,
            borderRadius: 14, margin: '0 20px', overflow: 'hidden',
          }}>
            {section.rows.map((row, i) => {
              const Icon = row.Icon;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', padding: '13px 16px', gap: 12,
                  borderBottom: row.border ? `1px solid ${t.border}` : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: t.surface3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color={t.primary} />
                  </div>
                  <span style={{ flex: 1, color: t.text, fontSize: 14, fontWeight: 500 }}>{row.label}</span>
                  {row.right}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '6px 20px' }}>
        <p style={{ color: t.textMuted, fontSize: 12, margin: '0 0 2px' }}>Layover Loom v1.0.0</p>
        <p style={{ color: t.textMuted, fontSize: 12, margin: 0 }}>Turn dead travel time into local time.</p>
      </div>
    </div>
  );
}

// ==================== ROOT APP ===============================================
function App() {
  const { useState, useEffect } = React;

  const themes = {
    dark: {
      bg: '#090D18',
      surface: '#111624',
      surface2: '#181E30',
      surface3: '#202840',
      primary: '#00CFAA',
      secondary: '#6C8EFF',
      text: '#EDF1FF',
      textSub: '#7A87A8',
      textMuted: '#404D6A',
      border: '#242E4A',
      success: '#00CFAA',
      warning: '#FFB347',
      danger: '#FF6B8A',
    },
    light: {
      bg: '#EDF0F8',
      surface: '#FFFFFF',
      surface2: '#F4F7FE',
      surface3: '#E7EBF7',
      primary: '#009E80',
      secondary: '#4A6CF7',
      text: '#1A2140',
      textSub: '#57647A',
      textMuted: '#98A5BE',
      border: '#DAE0EF',
      success: '#009E80',
      warning: '#D97706',
      danger: '#DC2626',
    },
  };

  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { background: #0B0F1C; }
      button { outline: none; }
      ::-webkit-scrollbar { width: 0; height: 0; }
    `;
    document.head.appendChild(style);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'plan', label: 'Plan', icon: window.lucide.Map },
    { id: 'explore', label: 'Explore', icon: window.lucide.Compass },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    plan: PlanScreen,
    explore: ExploreScreen,
    settings: SettingsScreen,
  };

  const ActiveScreen = screens[activeTab];

  return (
    <div style={{
      background: isDark ? '#0B0F1C' : '#C8D0E4',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif',
      padding: '20px',
      transition: 'background 0.3s',
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark
          ? '0 60px 120px rgba(0,0,0,0.9), 0 0 0 1px #1E2840, 0 0 0 2px #0D1220'
          : '0 40px 80px rgba(80,100,160,0.3), 0 0 0 1px #C0CAE0, 0 0 0 2px #B0BCDC',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}>
        {/* Status Bar */}
        <StatusBar t={t} isDark={isDark} setIsDark={setIsDark} />

        {/* Scrollable screen content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          <ActiveScreen
            t={t}
            isDark={isDark}
            setIsDark={setIsDark}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Bottom Navigation */}
        <div style={{
          background: t.surface,
          borderTop: `1px solid ${t.border}`,
          padding: '8px 0 22px',
          display: 'flex',
          justifyContent: 'space-around',
          flexShrink: 0,
          transition: 'background 0.3s',
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  padding: '6px 18px',
                  borderRadius: 14,
                  background: isActive ? `${t.primary}12` : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <Icon size={22} color={isActive ? t.primary : t.textMuted} />
                <span style={{
                  fontSize: 11,
                  color: isActive ? t.primary : t.textMuted,
                  fontWeight: isActive ? 700 : 400,
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: isActive ? '-0.1px' : '0',
                }}>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
