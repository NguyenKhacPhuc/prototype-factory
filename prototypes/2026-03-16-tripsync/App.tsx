
const { useState, useEffect, useRef } = React;

const COLORS = {
  primary: "#6C63FF",
  primaryDark: "#4C46B8",
  primaryLight: "#8B85FF",
  accent: "#FF6B35",
  accentLight: "#FF8C5A",
  bg: "#0D0D1A",
  surface: "#16162A",
  surfaceAlt: "#1E1E35",
  card: "#22223D",
  cardBorder: "#2E2E50",
  text: "#F0EFFF",
  textSecondary: "#9B9BC0",
  textMuted: "#5C5C85",
  success: "#22D3A5",
  warning: "#FFB347",
  danger: "#FF4F6A",
  tagBlue: "#1A73E8",
  tagGreen: "#0D9F6F",
  tagPurple: "#7C3AED",
  tagOrange: "#EA6D26",
};

const FAMILY = [
  { id: 1, name: "Sarah", avatar: "S", color: "#6C63FF", role: "Planner" },
  { id: 2, name: "Mike", avatar: "M", color: "#FF6B35", role: "Dad" },
  { id: 3, name: "Emma", avatar: "E", color: "#22D3A5", role: "Explorer" },
  { id: 4, name: "Jake", avatar: "J", color: "#FFB347", role: "Foodie" },
];

const ITINERARY = [
  {
    day: "Today",
    date: "Mar 16",
    activities: [
      { time: "09:00", title: "Colosseum Tour", type: "sightseeing", duration: "2h 30m", location: "Piazza del Colosseo, Rome", members: [1, 2, 3, 4], confirmed: true, icon: "Landmark" },
      { time: "12:30", title: "Lunch at Trattoria Vecchia Roma", type: "food", duration: "1h 30m", location: "Via della Tribuna di Tor de' Specchi", members: [1, 2, 3, 4], confirmed: true, icon: "Utensils" },
      { time: "15:00", title: "Vatican Museums", type: "sightseeing", duration: "3h", location: "Viale Vaticano, 00165", members: [1, 3], confirmed: false, icon: "Building2" },
      { time: "19:30", title: "Dinner at Il Pagliaccio", type: "food", duration: "2h", location: "Via dei Banchi Vecchi, 129a", members: [1, 2, 3, 4], confirmed: true, icon: "Wine" },
    ],
  },
  {
    day: "Tomorrow",
    date: "Mar 17",
    activities: [
      { time: "08:00", title: "Morning Jog – Borghese Garden", type: "activity", duration: "1h", location: "Villa Borghese, Rome", members: [2, 3], confirmed: true, icon: "PersonStanding" },
      { time: "10:00", title: "Borghese Gallery", type: "sightseeing", duration: "2h", location: "Piazzale del Museo Borghese, 5", members: [1, 2, 3, 4], confirmed: true, icon: "Palette" },
      { time: "14:00", title: "Trastevere Walking Tour", type: "tour", duration: "2h 30m", location: "Piazza di Santa Maria in Trastevere", members: [1, 2, 3, 4], confirmed: false, icon: "MapPin" },
    ],
  },
];

const EXPERIENCES = [
  { id: 1, title: "Sunset Rooftop Aperitivo", category: "Food & Drink", rating: 4.9, price: "€35/person", image: "🍹", tag: "Trending", tagColor: COLORS.tagOrange, desc: "Iconic 360° views with local wines and cicchetti above the Roman skyline.", distance: "0.8km" },
  { id: 2, title: "Hidden Gems Walking Tour", category: "Culture", rating: 4.8, price: "€20/person", image: "🗺️", tag: "Family Fave", tagColor: COLORS.tagPurple, desc: "Discover secret courtyards and ancient fountains most tourists never find.", distance: "1.2km" },
  { id: 3, title: "Roman Pasta-Making Class", category: "Workshop", rating: 4.7, price: "€65/person", image: "🍝", tag: "Popular", tagColor: COLORS.tagGreen, desc: "Learn cacio e pepe from a local nonna in her authentic kitchen.", distance: "2.0km" },
  { id: 4, title: "Vespa Tour of Ancient Rome", category: "Adventure", rating: 4.6, price: "€55/person", image: "🛵", tag: "New", tagColor: COLORS.tagBlue, desc: "Ride through the Eternal City and feel like a local for the day.", distance: "0.5km" },
  { id: 5, title: "Tiber River Sunset Cruise", category: "Experience", rating: 4.5, price: "€40/person", image: "🚢", tag: "Relaxing", tagColor: COLORS.tagPurple, desc: "A peaceful cruise along the Tiber with wine, cheese, and Roman views.", distance: "1.5km" },
];

const MEMORIES = [
  { id: 1, date: "Mar 15, 2026", time: "10:24 AM", title: "Trevi Fountain!", note: "Made a wish — Emma threw three coins! 🪙", emoji: "⛲", author: "Sarah", members: [1, 3], likes: 5, aspect: "tall" },
  { id: 2, date: "Mar 15, 2026", time: "1:10 PM", title: "Best Gelato Ever", note: "Pistachio and salted caramel from Della Palma.", emoji: "🍦", author: "Jake", members: [2, 4], likes: 7, aspect: "square" },
  { id: 3, date: "Mar 15, 2026", time: "4:45 PM", title: "Spanish Steps Golden Hour", note: "Sun setting behind St. Peter's — perfect timing.", emoji: "🌅", author: "Mike", members: [1, 2, 3, 4], likes: 12, aspect: "wide" },
  { id: 4, date: "Mar 14, 2026", time: "9:30 AM", title: "Arrival! Ciao Roma 🇮🇹", note: "Flight landed smoothly. Hotel is amazing!", emoji: "✈️", author: "Sarah", members: [1, 2, 3, 4], likes: 9, aspect: "square" },
  { id: 5, date: "Mar 14, 2026", time: "7:00 PM", title: "First Roman Dinner", note: "Carbonara and supplì. No going back to fake Italian food.", emoji: "🍽️", author: "Jake", members: [1, 2, 3, 4], likes: 8, aspect: "square" },
];

const ALERTS = [
  { id: 1, type: "reminder", icon: "Clock", text: "Vatican Museums ticket scan at 15:00 today.", time: "30 min ago", color: COLORS.primary },
  { id: 2, type: "member", icon: "UserCheck", text: "Emma confirmed tomorrow's Borghese Gallery.", time: "1 hr ago", color: COLORS.success },
  { id: 3, type: "tip", icon: "Lightbulb", text: "Pro tip: Book the pasta class 24 hrs ahead.", time: "2 hrs ago", color: COLORS.warning },
  { id: 4, type: "weather", icon: "Cloud", text: "Light rain expected Tue 18. Consider indoor plans.", time: "3 hrs ago", color: COLORS.textSecondary },
];

// ─── Micro-interaction hook ───────────────────────────────────────────────────
function usePressable() {
  const [pressed, setPressed] = useState(false);
  return {
    scale: pressed ? 0.96 : 1,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
  };
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ member, size = 28, border = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${member.color}CC, ${member.color}55)`,
      border: border ? `2px solid ${COLORS.bg}` : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 700, color: "#fff",
      flexShrink: 0,
    }}>{member.avatar}</div>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────
function AvatarGroup({ memberIds, size = 22 }) {
  return (
    <div style={{ display: "flex" }}>
      {memberIds.map((id, i) => {
        const m = FAMILY.find(f => f.id === id);
        return m ? (
          <div key={id} style={{ marginLeft: i === 0 ? 0 : -size * 0.35 }}>
            <Avatar member={m} size={size} border />
          </div>
        ) : null;
      })}
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ active, setActive }) {
  const tabs = [
    { id: "home", label: "Home", icon: "Home" },
    { id: "itinerary", label: "Plan", icon: "CalendarDays" },
    { id: "explore", label: "Explore", icon: "Compass" },
    { id: "memories", label: "Memories", icon: "Camera" },
    { id: "family", label: "Family", icon: "Users" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: COLORS.surface,
      borderTop: `1px solid ${COLORS.cardBorder}`,
      display: "flex", paddingBottom: 16, paddingTop: 10,
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const Icon = window.lucide[tab.icon];
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => setActive(tab.id)} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, background: "none",
            border: "none", cursor: "pointer", padding: "2px 0",
            transition: "transform 0.15s",
            transform: isActive ? "translateY(-1px)" : "none",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: isActive ? `${COLORS.primary}25` : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}>
              {Icon && <Icon size={20} color={isActive ? COLORS.primary : COLORS.textMuted} strokeWidth={isActive ? 2.2 : 1.8} />}
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? COLORS.primary : COLORS.textMuted, letterSpacing: 0.2 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({ setActiveTab }) {
  const today = ITINERARY[0];
  const [greeting] = useState("Good afternoon");

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: 0 }}>{greeting}, Sarah 👋</p>
            <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "2px 0 0", letterSpacing: -0.5 }}>Family Rome Trip</h1>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 13,
              background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {window.lucide.Bell && <window.lucide.Bell size={18} color={COLORS.textSecondary} />}
            </div>
            <div style={{
              position: "absolute", top: -3, right: -3,
              width: 8, height: 8, borderRadius: "50%",
              background: COLORS.danger, border: `2px solid ${COLORS.surface}`,
            }} />
          </div>
        </div>

        {/* Trip Progress */}
        <div style={{
          marginTop: 16,
          background: `linear-gradient(135deg, ${COLORS.primary}25 0%, ${COLORS.accent}15 100%)`,
          borderRadius: 18, padding: "14px 16px",
          border: `1px solid ${COLORS.primary}30`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {window.lucide.MapPin && <window.lucide.MapPin size={14} color={COLORS.primary} />}
              <span style={{ color: COLORS.primary, fontSize: 12, fontWeight: 600, letterSpacing: 0.3 }}>ROME, ITALY 🇮🇹</span>
            </div>
            <span style={{ color: COLORS.textSecondary, fontSize: 11 }}>Day 3 of 7</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {[1,2,3,4,5,6,7].map(d => (
              <div key={d} style={{
                flex: 1, height: 4, borderRadius: 3,
                background: d <= 3 ? COLORS.primary : `${COLORS.primary}25`,
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: COLORS.textSecondary, fontSize: 11 }}>Mar 14 – Mar 20</span>
            <div style={{ display: "flex", gap: -4 }}>
              <AvatarGroup memberIds={[1,2,3,4]} size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ padding: "16px 20px 0", display: "flex", gap: 10 }}>
        {[
          { label: "Today's Plans", value: "4", icon: "CalendarCheck", color: COLORS.primary },
          { label: "Memories", value: "12", icon: "ImageIcon", color: COLORS.success },
          { label: "Alerts", value: "3", icon: "Bell", color: COLORS.warning },
        ].map(s => {
          const Icon = window.lucide[s.icon];
          return (
            <div key={s.label} style={{
              flex: 1, background: COLORS.card,
              borderRadius: 14, padding: "10px 10px",
              border: `1px solid ${COLORS.cardBorder}`,
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: COLORS.text, fontSize: 20, fontWeight: 800 }}>{s.value}</span>
                {Icon && <Icon size={14} color={s.color} />}
              </div>
              <span style={{ color: COLORS.textSecondary, fontSize: 10, fontWeight: 500 }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, margin: 0 }}>Today's Schedule</h2>
          <button onClick={() => setActiveTab("itinerary")} style={{
            background: "none", border: "none", cursor: "pointer",
            color: COLORS.primary, fontSize: 12, fontWeight: 600,
          }}>See all →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {today.activities.map((act, i) => {
            const Icon = window.lucide[act.icon] || window.lucide.Star;
            const typeColors = { sightseeing: COLORS.primary, food: COLORS.accent, activity: COLORS.success, tour: COLORS.warning };
            const color = typeColors[act.type] || COLORS.primary;
            return (
              <div key={i} style={{
                background: COLORS.card,
                borderRadius: 14, padding: "12px 14px",
                border: `1px solid ${COLORS.cardBorder}`,
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: `${color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {Icon && <Icon size={17} color={color} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, display: "block" }}>{act.title}</span>
                    <div style={{
                      background: act.confirmed ? `${COLORS.success}20` : `${COLORS.warning}20`,
                      borderRadius: 6, padding: "2px 7px",
                      flexShrink: 0, marginLeft: 8,
                    }}>
                      <span style={{ color: act.confirmed ? COLORS.success : COLORS.warning, fontSize: 9, fontWeight: 700, letterSpacing: 0.3 }}>
                        {act.confirmed ? "CONFIRMED" : "PENDING"}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                    <span style={{ color: COLORS.primary, fontSize: 11, fontWeight: 700 }}>{act.time}</span>
                    <span style={{ color: COLORS.textMuted, fontSize: 11 }}>·</span>
                    <span style={{ color: COLORS.textMuted, fontSize: 11 }}>{act.duration}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 7 }}>
                    <AvatarGroup memberIds={act.members} size={18} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {window.lucide.MapPin && <window.lucide.MapPin size={10} color={COLORS.textMuted} />}
                      <span style={{ color: COLORS.textMuted, fontSize: 10, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{act.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Memory Highlight */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, margin: 0 }}>Latest Memory</h2>
          <button onClick={() => setActiveTab("memories")} style={{
            background: "none", border: "none", cursor: "pointer",
            color: COLORS.primary, fontSize: 12, fontWeight: 600,
          }}>Gallery →</button>
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.card}, ${COLORS.surfaceAlt})`,
          borderRadius: 16, padding: "16px",
          border: `1px solid ${COLORS.cardBorder}`,
          display: "flex", gap: 14, alignItems: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: `linear-gradient(135deg, ${COLORS.primary}40, ${COLORS.accent}30)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>🌅</div>
          <div style={{ flex: 1 }}>
            <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, display: "block" }}>Spanish Steps Golden Hour</span>
            <span style={{ color: COLORS.textSecondary, fontSize: 11, display: "block", marginTop: 2 }}>Sun setting behind St. Peter's — perfect timing.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <AvatarGroup memberIds={[1,2,3,4]} size={16} />
              <span style={{ color: COLORS.textMuted, fontSize: 10 }}>· 12 ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Itinerary ────────────────────────────────────────────────────────
function ItineraryScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);

  const day = ITINERARY[selectedDay];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>Itinerary</h1>
        <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "0 0 16px" }}>Rome, Italy · Mar 14 – 20</p>

        {/* Day Selector */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {ITINERARY.map((d, i) => (
            <button key={i} onClick={() => setSelectedDay(i)} style={{
              flexShrink: 0, padding: "8px 16px", borderRadius: 12,
              background: selectedDay === i ? COLORS.primary : COLORS.card,
              border: `1px solid ${selectedDay === i ? COLORS.primary : COLORS.cardBorder}`,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              <div style={{ color: selectedDay === i ? "#fff" : COLORS.textSecondary, fontSize: 12, fontWeight: 700, textAlign: "center" }}>{d.day}</div>
              <div style={{ color: selectedDay === i ? "rgba(255,255,255,0.7)" : COLORS.textMuted, fontSize: 10, textAlign: "center" }}>{d.date}</div>
            </button>
          ))}
          {/* Add Day */}
          <button style={{
            flexShrink: 0, width: 64, borderRadius: 12,
            background: COLORS.card, border: `1.5px dashed ${COLORS.cardBorder}`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {window.lucide.Plus && <window.lucide.Plus size={16} color={COLORS.textMuted} />}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 16px" }}>
        {/* Family filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
          <div style={{
            padding: "5px 12px", borderRadius: 20,
            background: COLORS.primary, fontSize: 11, fontWeight: 700,
            color: "#fff", flexShrink: 0, cursor: "pointer",
          }}>All</div>
          {FAMILY.map(m => (
            <div key={m.id} style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 11px", borderRadius: 20,
              background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`,
              flexShrink: 0, cursor: "pointer",
            }}>
              <Avatar member={m} size={16} />
              <span style={{ color: COLORS.textSecondary, fontSize: 11, fontWeight: 600 }}>{m.name}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 19, top: 0, bottom: 0,
            width: 2, background: `linear-gradient(to bottom, ${COLORS.primary}60, transparent)`,
          }} />

          {day.activities.map((act, i) => {
            const Icon = window.lucide[act.icon] || window.lucide.Star;
            const typeColors = { sightseeing: COLORS.primary, food: COLORS.accent, activity: COLORS.success, tour: COLORS.warning };
            const color = typeColors[act.type] || COLORS.primary;
            const isExpanded = expandedItem === i;

            return (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, position: "relative" }}>
                {/* Dot */}
                <div style={{
                  width: 40, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: `${color}30`, border: `2px solid ${color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1, marginTop: 10,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                  </div>
                </div>

                <div style={{
                  flex: 1, background: COLORS.card,
                  borderRadius: 16, padding: "12px 14px",
                  border: `1px solid ${isExpanded ? color + "50" : COLORS.cardBorder}`,
                  cursor: "pointer", transition: "border-color 0.2s",
                }} onClick={() => setExpandedItem(isExpanded ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        <div style={{ background: `${color}20`, borderRadius: 7, padding: "2px 7px" }}>
                          <span style={{ color, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{act.type}</span>
                        </div>
                        {!act.confirmed && (
                          <div style={{ background: `${COLORS.warning}20`, borderRadius: 7, padding: "2px 7px" }}>
                            <span style={{ color: COLORS.warning, fontSize: 10, fontWeight: 700 }}>PENDING</span>
                          </div>
                        )}
                      </div>
                      <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 700 }}>{act.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: COLORS.primary, fontSize: 12, fontWeight: 800 }}>{act.time}</span>
                      {window.lucide.ChevronDown && (
                        <div style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                          <window.lucide.ChevronDown size={14} color={COLORS.textMuted} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                    {window.lucide.Clock && <window.lucide.Clock size={11} color={COLORS.textMuted} />}
                    <span style={{ color: COLORS.textMuted, fontSize: 11 }}>{act.duration}</span>
                    <span style={{ color: COLORS.textMuted }}>·</span>
                    <AvatarGroup memberIds={act.members} size={18} />
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.cardBorder}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        {window.lucide.MapPin && <window.lucide.MapPin size={12} color={COLORS.textSecondary} />}
                        <span style={{ color: COLORS.textSecondary, fontSize: 11 }}>{act.location}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{
                          flex: 1, padding: "8px", borderRadius: 10, cursor: "pointer",
                          background: `${COLORS.primary}15`, border: `1px solid ${COLORS.primary}40`,
                          color: COLORS.primary, fontSize: 11, fontWeight: 700,
                        }}>Navigate</button>
                        <button style={{
                          flex: 1, padding: "8px", borderRadius: 10, cursor: "pointer",
                          background: `${COLORS.success}15`, border: `1px solid ${COLORS.success}40`,
                          color: COLORS.success, fontSize: 11, fontWeight: 700,
                        }}>Confirm</button>
                        <button style={{
                          width: 36, borderRadius: 10, cursor: "pointer",
                          background: COLORS.surfaceAlt, border: `1px solid ${COLORS.cardBorder}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {window.lucide.MoreHorizontal && <window.lucide.MoreHorizontal size={14} color={COLORS.textSecondary} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add Activity */}
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ width: 40, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.surfaceAlt, border: `1.5px dashed ${COLORS.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                {window.lucide.Plus && <window.lucide.Plus size={12} color={COLORS.textMuted} />}
              </div>
            </div>
            <button style={{
              flex: 1, padding: "12px", borderRadius: 16,
              background: COLORS.surfaceAlt, border: `1.5px dashed ${COLORS.cardBorder}`,
              cursor: "pointer", color: COLORS.textMuted, fontSize: 12, fontWeight: 600,
            }}>
              + Add activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Explore ──────────────────────────────────────────────────────────
function ExploreScreen() {
  const [selectedCat, setSelectedCat] = useState("All");
  const categories = ["All", "Food & Drink", "Culture", "Adventure", "Workshop", "Experience"];
  const [saved, setSaved] = useState([]);

  const filtered = selectedCat === "All" ? EXPERIENCES : EXPERIENCES.filter(e => e.category === selectedCat);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>Explore</h1>
        <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "0 0 12px" }}>Curated local experiences for your family</p>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: COLORS.card, borderRadius: 13,
          border: `1px solid ${COLORS.cardBorder}`,
          padding: "10px 14px", marginBottom: 14,
        }}>
          {window.lucide.Search && <window.lucide.Search size={15} color={COLORS.textMuted} />}
          <span style={{ color: COLORS.textMuted, fontSize: 13 }}>Search experiences...</span>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(cat)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20,
              background: selectedCat === cat ? COLORS.primary : COLORS.card,
              border: `1px solid ${selectedCat === cat ? COLORS.primary : COLORS.cardBorder}`,
              color: selectedCat === cat ? "#fff" : COLORS.textSecondary,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Experience cards */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 16px" }}>
        <p style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 12, fontWeight: 600 }}>{filtered.length} EXPERIENCES NEARBY</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(exp => {
            const isSaved = saved.includes(exp.id);
            return (
              <div key={exp.id} style={{
                background: COLORS.card, borderRadius: 18,
                border: `1px solid ${COLORS.cardBorder}`,
                overflow: "hidden",
              }}>
                {/* Card visual */}
                <div style={{
                  background: `linear-gradient(135deg, ${COLORS.surfaceAlt}, ${COLORS.cardBorder}40)`,
                  padding: "18px 18px 14px",
                  display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 15,
                    background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent}15)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, flexShrink: 0,
                  }}>{exp.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ background: `${exp.tagColor}20`, borderRadius: 8, padding: "2px 8px", display: "inline-block" }}>
                        <span style={{ color: exp.tagColor, fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{exp.tag}</span>
                      </div>
                      <button onClick={() => setSaved(s => isSaved ? s.filter(i => i !== exp.id) : [...s, exp.id])} style={{
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                      }}>
                        {window.lucide.Heart && <window.lucide.Heart size={18} color={isSaved ? COLORS.danger : COLORS.textMuted} fill={isSaved ? COLORS.danger : "none"} />}
                      </button>
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 700 }}>{exp.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span style={{ color: COLORS.textSecondary, fontSize: 11 }}>{exp.category}</span>
                      <span style={{ color: COLORS.textMuted }}>·</span>
                      {window.lucide.MapPin && <window.lucide.MapPin size={10} color={COLORS.textMuted} />}
                      <span style={{ color: COLORS.textMuted, fontSize: 11 }}>{exp.distance}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "0 18px 14px" }}>
                  <p style={{ color: COLORS.textSecondary, fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>{exp.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {window.lucide.Star && <window.lucide.Star size={13} color={COLORS.warning} fill={COLORS.warning} />}
                      <span style={{ color: COLORS.text, fontSize: 12, fontWeight: 700 }}>{exp.rating}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: 600 }}>{exp.price}</span>
                      <button style={{
                        background: COLORS.primary, borderRadius: 10,
                        border: "none", cursor: "pointer",
                        padding: "7px 14px",
                        color: "#fff", fontSize: 12, fontWeight: 700,
                      }}>Book</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Memories ─────────────────────────────────────────────────────────
function MemoriesScreen() {
  const [liked, setLiked] = useState([]);
  const [view, setView] = useState("timeline");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>Memories</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: 0 }}>Rome, Italy · 12 moments captured</p>
          </div>
          <button style={{
            background: COLORS.primary, border: "none", borderRadius: 12,
            padding: "8px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {window.lucide.Plus && <window.lucide.Plus size={14} color="#fff" />}
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Add</span>
          </button>
        </div>

        {/* View toggle */}
        <div style={{
          display: "flex", gap: 4, marginTop: 14,
          background: COLORS.card, borderRadius: 11, padding: 4,
          border: `1px solid ${COLORS.cardBorder}`,
        }}>
          {["timeline", "grid"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: "6px", borderRadius: 8,
              background: view === v ? COLORS.primary : "transparent",
              border: "none", cursor: "pointer",
              color: view === v ? "#fff" : COLORS.textSecondary,
              fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              transition: "all 0.2s",
            }}>
              {v === "timeline" ? (window.lucide.AlignLeft && <window.lucide.AlignLeft size={13} />) : (window.lucide.Grid && <window.lucide.Grid size={13} />)}
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 16px" }}>
        {view === "timeline" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {MEMORIES.map((mem, i) => {
              const isLiked = liked.includes(mem.id);
              const authorMember = FAMILY.find(f => f.name === mem.author);
              return (
                <div key={mem.id}>
                  {(i === 0 || MEMORIES[i-1].date !== mem.date) && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, marginTop: i > 0 ? 8 : 0 }}>
                      <div style={{ height: 1, flex: 1, background: COLORS.cardBorder }} />
                      <span style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 700 }}>{mem.date}</span>
                      <div style={{ height: 1, flex: 1, background: COLORS.cardBorder }} />
                    </div>
                  )}
                  <div style={{
                    background: COLORS.card, borderRadius: 18,
                    border: `1px solid ${COLORS.cardBorder}`, overflow: "hidden",
                  }}>
                    {/* Emoji visual */}
                    <div style={{
                      background: `linear-gradient(135deg, ${COLORS.primary}25, ${COLORS.accent}15)`,
                      padding: 20, display: "flex", justifyContent: "center", alignItems: "center",
                      fontSize: 56,
                      height: mem.aspect === "tall" ? 120 : mem.aspect === "wide" ? 80 : 100,
                    }}>{mem.emoji}</div>

                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 700 }}>{mem.title}</span>
                        <span style={{ color: COLORS.textMuted, fontSize: 10 }}>{mem.time}</span>
                      </div>
                      <p style={{ color: COLORS.textSecondary, fontSize: 12, margin: "4px 0 10px", lineHeight: 1.4 }}>{mem.note}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {authorMember && <Avatar member={authorMember} size={18} />}
                          <span style={{ color: COLORS.textSecondary, fontSize: 11 }}>by {mem.author}</span>
                        </div>
                        <button onClick={() => setLiked(l => isLiked ? l.filter(id => id !== mem.id) : [...l, mem.id])} style={{
                          background: "none", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 4, padding: 0,
                        }}>
                          {window.lucide.Heart && <window.lucide.Heart size={15} color={isLiked ? COLORS.danger : COLORS.textMuted} fill={isLiked ? COLORS.danger : "none"} />}
                          <span style={{ color: isLiked ? COLORS.danger : COLORS.textMuted, fontSize: 12, fontWeight: 600 }}>
                            {mem.likes + (isLiked ? 1 : 0)}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {MEMORIES.map(mem => (
              <div key={mem.id} style={{
                background: COLORS.card, borderRadius: 14,
                border: `1px solid ${COLORS.cardBorder}`,
                overflow: "hidden", cursor: "pointer",
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}25, ${COLORS.accent}15)`,
                  height: 80, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36,
                }}>{mem.emoji}</div>
                <div style={{ padding: "8px 10px" }}>
                  <span style={{ color: COLORS.text, fontSize: 11, fontWeight: 700, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mem.title}</span>
                  <span style={{ color: COLORS.textMuted, fontSize: 10 }}>{mem.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Family ───────────────────────────────────────────────────────────
function FamilyScreen() {
  const [toggled, setToggled] = useState({ sms: true, push: true, email: false });

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>Family</h1>
        <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: 0 }}>Sync, alerts, and coordination</p>
      </div>

      {/* Family Members */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, margin: 0 }}>Traveling Together</h2>
          <button style={{
            background: `${COLORS.primary}20`, border: `1px solid ${COLORS.primary}40`,
            borderRadius: 9, padding: "5px 12px", cursor: "pointer",
            color: COLORS.primary, fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            {window.lucide.UserPlus && <window.lucide.UserPlus size={12} color={COLORS.primary} />}
            Invite
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAMILY.map(m => (
            <div key={m.id} style={{
              background: COLORS.card, borderRadius: 16, padding: "12px 14px",
              border: `1px solid ${COLORS.cardBorder}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Avatar member={m} size={44} />
              <div style={{ flex: 1 }}>
                <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 700, display: "block" }}>{m.name}</span>
                <span style={{ color: COLORS.textSecondary, fontSize: 12 }}>{m.role}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{
                  background: `${COLORS.success}20`, borderRadius: 6, padding: "2px 8px",
                }}>
                  <span style={{ color: COLORS.success, fontSize: 10, fontWeight: 700 }}>ONLINE</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {window.lucide.MapPin && <window.lucide.MapPin size={10} color={COLORS.textMuted} />}
                  <span style={{ color: COLORS.textMuted, fontSize: 10 }}>Colosseum area</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, margin: 0 }}>Recent Alerts</h2>
          <span style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 600 }}>4 new</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ALERTS.map(alert => {
            const Icon = window.lucide[alert.icon];
            return (
              <div key={alert.id} style={{
                background: COLORS.card, borderRadius: 14, padding: "12px 14px",
                border: `1px solid ${COLORS.cardBorder}`,
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 11,
                  background: `${alert.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {Icon && <Icon size={16} color={alert.color} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: COLORS.text, fontSize: 12, fontWeight: 600, margin: "0 0 3px", lineHeight: 1.4 }}>{alert.text}</p>
                  <span style={{ color: COLORS.textMuted, fontSize: 10 }}>{alert.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div style={{ padding: "20px 20px 0" }}>
        <h2 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Notification Preferences</h2>
        <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.cardBorder}`, overflow: "hidden" }}>
          {[
            { key: "push", label: "Push Notifications", sub: "Itinerary updates, alerts" },
            { key: "sms", label: "SMS Alerts", sub: "Emergency & reminders" },
            { key: "email", label: "Email Digest", sub: "Daily trip summary" },
          ].map((item, i) => (
            <div key={item.key} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 16px",
              borderBottom: i < 2 ? `1px solid ${COLORS.cardBorder}` : "none",
            }}>
              <div>
                <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 600, display: "block" }}>{item.label}</span>
                <span style={{ color: COLORS.textMuted, fontSize: 11 }}>{item.sub}</span>
              </div>
              <div
                onClick={() => setToggled(t => ({ ...t, [item.key]: !t[item.key] }))}
                style={{
                  width: 42, height: 24, borderRadius: 12, cursor: "pointer",
                  background: toggled[item.key] ? COLORS.primary : COLORS.surfaceAlt,
                  position: "relative", transition: "background 0.2s",
                  border: `1px solid ${toggled[item.key] ? COLORS.primary : COLORS.cardBorder}`,
                }}>
                <div style={{
                  position: "absolute", top: 3,
                  left: toggled[item.key] ? 20 : 3,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip Summary */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent}10)`,
          borderRadius: 16, padding: "16px",
          border: `1px solid ${COLORS.primary}30`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            {window.lucide.Globe && <window.lucide.Globe size={16} color={COLORS.primary} />}
            <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 700 }}>Trip Summary</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Activities Planned", value: "18" },
              { label: "Memories Captured", value: "12" },
              { label: "Days Remaining", value: "4" },
              { label: "Places Explored", value: "7" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ color: COLORS.text, fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: COLORS.textSecondary, fontSize: 10, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 24px", height: 44, flexShrink: 0,
    }}>
      <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 700 }}>{time}</span>
      <div style={{
        width: 120, height: 32, background: "#000",
        borderRadius: 20, position: "absolute",
        left: "50%", transform: "translateX(-50%)",
        top: 0,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {window.lucide.Signal && <window.lucide.Signal size={14} color={COLORS.text} />}
        {window.lucide.Wifi && <window.lucide.Wifi size={13} color={COLORS.text} />}
        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: `1.5px solid ${COLORS.text}`, display: "flex", alignItems: "center", padding: "1.5px", position: "relative" }}>
            <div style={{ height: "100%", width: "75%", background: COLORS.success, borderRadius: 1.5 }} />
            <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 2, height: 5, background: COLORS.text, borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Font loader
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #050510; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
      ::-webkit-scrollbar { width: 0; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const screens = {
    home: <HomeScreen setActiveTab={setActiveTab} />,
    itinerary: <ItineraryScreen />,
    explore: <ExploreScreen />,
    memories: <MemoriesScreen />,
    family: <FamilyScreen />,
  };

  return (
    <div style={{
      width: 375, height: 812,
      background: COLORS.bg,
      borderRadius: 50,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 8px #1a1a2e, 0 0 0 10px #2a2a4e",
    }}>
      {/* Status bar */}
      <StatusBar />

      {/* Screen content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        <div key={activeTab} style={{
          flex: 1, display: "flex", flexDirection: "column",
          overflow: "hidden",
          animation: "fadeIn 0.18s ease-out",
        }}>
          {screens[activeTab]}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active={activeTab} setActive={setActiveTab} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
