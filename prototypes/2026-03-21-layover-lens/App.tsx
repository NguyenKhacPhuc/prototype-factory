
// Layover Lens — Turn airport downtime into local discovery.
// Single-file React prototype (Babel standalone, no imports)

function App() {
  const { useState, useEffect, useRef } = React;

  // ── Google Fonts ──────────────────────────────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  // ── Icons ─────────────────────────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 2 }) => {
    const IconComp = window.lucide && window.lucide[name];
    if (IconComp) {
      return React.createElement(IconComp, { size, color, strokeWidth });
    }
    return React.createElement("span", { style: { display: "inline-flex", width: size, height: size } });
  };

  // ── State ─────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("home");
  const [activeMood, setActiveMood] = useState("foodie");
  const [activeBudget, setActiveBudget] = useState("mid");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeItinerary, setActiveItinerary] = useState(null);
  const [toggleSafeMode, setToggleSafeMode] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [luggageMode, setLuggageMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pressedBtn, setPressedBtn] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const timeStr = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Color Palette ─────────────────────────────────────────────────────────
  const C = {
    bg: "#0B1120",
    surface: "#131D2E",
    card: "#182236",
    cardBorder: "#1E2D42",
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    primaryDark: "#1D4ED8",
    amber: "#F59E0B",
    amberLight: "#FCD34D",
    green: "#10B981",
    greenLight: "#34D399",
    red: "#EF4444",
    purple: "#8B5CF6",
    cyan: "#06B6D4",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    textMuted: "#475569",
    navBg: "#0E1829",
    navBorder: "#1E2D42",
  };

  // ── Data ──────────────────────────────────────────────────────────────────
  const flightData = {
    flightNo: "SQ 321",
    airline: "Singapore Airlines",
    departure: "22:45",
    gate: "D42",
    terminal: "Terminal 3",
    nextStop: "London Heathrow",
    airport: "Singapore Changi",
    iata: "SIN",
    layoverTotal: "6h 15m",
    layoverMins: 375,
    exitSafe: true,
    safeWindowEnd: "20:30",
    visa: "Visa-free (90 days)",
    weather: "31°C · Partly Cloudy",
    securityWait: "8 min",
    gateWalkMin: 12,
  };

  const moods = [
    { id: "foodie", label: "Foodie", icon: "UtensilsCrossed", color: C.amber },
    { id: "culture", label: "Culture", icon: "Landmark", color: C.purple },
    { id: "chill", label: "Chill", icon: "Waves", color: C.cyan },
    { id: "shop", label: "Shop", icon: "ShoppingBag", color: C.green },
  ];

  const budgets = [
    { id: "low", label: "$ Free–15", color: C.green },
    { id: "mid", label: "$$ 15–40", color: C.amber },
    { id: "high", label: "$$$ 40+", color: C.purple },
  ];

  const itineraries = {
    foodie: {
      title: "Hawker & Harbour Walk",
      subtitle: "Lau Pa Sat + Marina Bay",
      duration: "3h 30m",
      stops: 4,
      distance: "4.2 km",
      tags: ["Local Food", "Waterfront", "MRT Easy"],
      color: C.amber,
      icon: "UtensilsCrossed",
      steps: [
        { time: "16:00", duration: "15m", label: "Changi MRT → Downtown", type: "transit", detail: "EW line → Circle line. $2.10 fare. Door to door.", icon: "Train" },
        { time: "16:15", duration: "45m", label: "Lau Pa Sat Hawker Centre", type: "stop", detail: "Try chicken rice ($3.50) or laksa ($4). Iconic Victorian cast-iron building.", icon: "UtensilsCrossed" },
        { time: "17:00", duration: "30m", label: "Marina Bay Waterfront Walk", type: "stop", detail: "Stroll along Esplanade Dr. Views of Supertrees & ArtScience Museum.", icon: "Waves" },
        { time: "17:30", duration: "25m", label: "Gardens by the Bay Preview", type: "stop", detail: "Free outdoor area. Supertrees visible from outside — skip the indoor domes.", icon: "Leaf" },
        { time: "17:55", duration: "20m", label: "Kopi at Maxwell Food Centre", type: "stop", detail: "Grab a kopi-o ($1.20) and char kway teow. Classic heartland flavour.", icon: "Coffee" },
        { time: "18:15", duration: "20m", label: "Return to Changi Airport", type: "transit", detail: "MRT back to Changi. Board at Tanjong Pagar. Arrives T3 by 18:45.", icon: "Train" },
      ],
    },
    culture: {
      title: "Museum & Mosque Mile",
      subtitle: "Arab St + National Museum",
      duration: "3h 45m",
      stops: 4,
      distance: "5.1 km",
      tags: ["Heritage", "Architecture", "Photography"],
      color: C.purple,
      icon: "Landmark",
      steps: [
        { time: "16:00", duration: "15m", label: "Changi → Bugis MRT", type: "transit", detail: "EW line direct. 35 min. $2.30 fare.", icon: "Train" },
        { time: "16:15", duration: "50m", label: "Sultan Mosque & Arab Street", type: "stop", detail: "Free entry. Dress modestly — sarongs available. Vibrant street & textile shops.", icon: "Landmark" },
        { time: "17:05", duration: "60m", label: "National Museum of Singapore", type: "stop", detail: "S$15 entry. Highlights: Singapore Living Galleries. Arrive 40 min before closing for best time.", icon: "Building2" },
        { time: "18:05", duration: "10m", label: "Haji Lane Coffee Stop", type: "stop", detail: "Grab a specialty brew at Chye Seng Huat Hardware. Instagrammable.", icon: "Coffee" },
        { time: "18:15", duration: "30m", label: "Return to Changi Airport", type: "transit", detail: "Bugis → Changi. EW line. Arrives T1 by 18:50.", icon: "Train" },
      ],
    },
    chill: {
      title: "East Coast Park Reset",
      subtitle: "Beach · Breeze · Coconut",
      duration: "2h 45m",
      stops: 3,
      distance: "3.0 km",
      tags: ["Beach", "Low Effort", "Nature"],
      color: C.cyan,
      icon: "Waves",
      steps: [
        { time: "16:00", duration: "20m", label: "Changi → East Coast Park", type: "transit", detail: "Bus 401 from T2. $2.50. 20 min ride. Direct & easy.", icon: "Bus" },
        { time: "16:20", duration: "70m", label: "East Coast Park Beach Walk", type: "stop", detail: "Sandy shoreline, sea breeze. Rent a bicycle ($8/hr) or simply walk. Zero crowds on weekdays.", icon: "Waves" },
        { time: "17:30", duration: "30m", label: "Jumbo Seafood / Long Beach", type: "stop", detail: "If budget allows: chilli crab ($45). Or grab coconut water at a park kiosk ($3).", icon: "UtensilsCrossed" },
        { time: "18:00", duration: "25m", label: "Return to Changi Airport", type: "transit", detail: "Bus 401 back to T2. Total journey ~25 min. Arrives 18:30.", icon: "Bus" },
      ],
    },
    shop: {
      title: "Orchard Road Sprint",
      subtitle: "ION · Mandarin Gallery",
      duration: "3h 15m",
      stops: 3,
      distance: "3.5 km",
      tags: ["Shopping", "Luxury", "Street Style"],
      color: C.green,
      icon: "ShoppingBag",
      steps: [
        { time: "16:00", duration: "20m", label: "Changi → Orchard MRT", type: "transit", detail: "EW line → North-South line. Change at City Hall. $2.50, 45 min total.", icon: "Train" },
        { time: "16:20", duration: "60m", label: "ION Orchard Mall", type: "stop", detail: "8 floors of brands. Basement food court for a quick bite. Great AC and charging spots.", icon: "ShoppingBag" },
        { time: "17:20", duration: "40m", label: "Mandarin Gallery / 313 Somerset", type: "stop", detail: "Mid-range fashion, local designers. H&M, Uniqlo, Charles & Keith.", icon: "Store" },
        { time: "18:00", duration: "40m", label: "Return to Changi Airport", type: "transit", detail: "Orchard → Changi EW line. 45 min. Arrives T1 by 18:50.", icon: "Train" },
      ],
    },
  };

  const amenities = [
    { name: "Luggage Storage", loc: "T3 Level 2, Arrival Hall", walk: "4 min", icon: "Package", price: "S$9/day", available: true, color: C.amber },
    { name: "Shower & Freshen Up", loc: "Ambassador Transit Hotel, T3", walk: "6 min", icon: "Droplets", price: "S$18/2hr", available: true, color: C.cyan },
    { name: "Charging Lounge", loc: "T3 Gate D, Pre-Departure", walk: "2 min", icon: "Zap", price: "Free", available: true, color: C.green },
    { name: "Family Zone", loc: "T2 Level 2, near Gate B5", walk: "8 min", icon: "Baby", price: "Free", available: true, color: C.purple },
    { name: "Sleep Pod", loc: "Snooze@T1, Arrival Hall", walk: "12 min", icon: "BedDouble", price: "S$22/hr", available: false, color: C.primary },
    { name: "Prayer Room", loc: "T3 Level 2B, near Security", walk: "3 min", icon: "Sun", price: "Free", available: true, color: C.amber },
  ];

  const returnSteps = [
    { time: "18:30", label: "Latest safe departure from city", icon: "MapPin", color: C.amber, done: false },
    { time: "19:10", label: "Arrive Changi Airport", icon: "Plane", color: C.primary, done: false },
    { time: "19:10", label: "Clear Immigration (est. 8 min)", icon: "Shield", color: C.green, done: false },
    { time: "19:25", label: "Security check (est. 8 min)", icon: "ScanLine", color: C.green, done: false },
    { time: "19:40", label: "Walk to Gate D42 (12 min)", icon: "Navigation", color: C.cyan, done: false },
    { time: "19:52", label: "At Gate — ✓ Buffer: 53 min", icon: "CheckCircle", color: C.green, done: false },
    { time: "20:45", label: "Boarding begins (est.)", icon: "Clock", color: C.purple, done: false },
    { time: "22:45", label: "Departure SQ321 → LHR", icon: "PlaneTakeoff", color: C.textSecondary, done: false },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  const press = (id, fn) => {
    setPressedBtn(id);
    setTimeout(() => { setPressedBtn(null); fn && fn(); }, 150);
  };

  const btnScale = (id) => pressedBtn === id ? "scale(0.95)" : "scale(1)";

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setPlanGenerated(true); }, 1800);
  };

  // ── Shared Components ─────────────────────────────────────────────────────
  const StatusBar = () =>
    React.createElement("div", {
      style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 4px", fontSize: 12, fontWeight: 600, color: C.textPrimary, letterSpacing: 0.3 }
    },
      React.createElement("span", null, timeStr),
      React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
        React.createElement(Icon, { name: "Wifi", size: 14, color: C.textPrimary }),
        React.createElement(Icon, { name: "Signal", size: 14, color: C.textPrimary }),
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", gap: 2, background: C.textPrimary, borderRadius: 3, padding: "1px 5px 1px 2px" }
        },
          React.createElement("div", { style: { width: 16, height: 8, borderRadius: 2, background: C.green } }),
          React.createElement("span", { style: { color: C.bg, fontSize: 10, fontWeight: 700 } }, "82")
        )
      )
    );

  const DynamicIsland = () =>
    React.createElement("div", {
      style: { display: "flex", justifyContent: "center", marginTop: 2, marginBottom: 6 }
    },
      React.createElement("div", {
        style: { width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }
      },
        React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a", border: "2px solid #333" } }),
        React.createElement("div", { style: { width: 14, height: 14, borderRadius: "50%", background: "#1a1a1a", border: "2px solid #333" } })
      )
    );

  const NavBar = () => {
    const tabs = [
      { id: "home", icon: "Home", label: "Layover" },
      { id: "plan", icon: "Map", label: "Plan" },
      { id: "return", icon: "Clock", label: "Return" },
      { id: "amenities", icon: "Package", label: "Amenities" },
    ];
    return React.createElement("div", {
      style: { background: C.navBg, borderTop: `1px solid ${C.navBorder}`, display: "flex", justifyContent: "space-around", padding: "10px 8px 20px" }
    },
      tabs.map(t =>
        React.createElement("button", {
          key: t.id,
          onClick: () => press(t.id, () => setActiveTab(t.id)),
          style: {
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer",
            color: activeTab === t.id ? C.primary : C.textMuted,
            transform: btnScale(t.id), transition: "transform 0.15s, color 0.2s",
            padding: "4px 10px", borderRadius: 10,
          }
        },
          React.createElement("div", {
            style: {
              padding: "4px 10px", borderRadius: 8,
              background: activeTab === t.id ? `${C.primary}22` : "transparent",
              transition: "background 0.2s"
            }
          },
            React.createElement(Icon, { name: t.icon, size: 20, color: activeTab === t.id ? C.primary : C.textMuted })
          ),
          React.createElement("span", { style: { fontSize: 10, fontWeight: activeTab === t.id ? 700 : 400 } }, t.label)
        )
      )
    );
  };

  // ── Screen: Home ──────────────────────────────────────────────────────────
  const HomeScreen = () => {
    const pct = 68; // time elapsed
    return React.createElement("div", {
      style: { flex: 1, overflowY: "auto", padding: "0 16px 16px", scrollbarWidth: "none" }
    },
      // Header
      React.createElement("div", { style: { marginBottom: 20 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
          React.createElement("div", null,
            React.createElement("p", { style: { fontSize: 12, color: C.textMuted, marginBottom: 2, fontFamily: "Inter, sans-serif" } }, "Good afternoon, Alex"),
            React.createElement("h1", { style: { fontSize: 22, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif", lineHeight: 1.2 } }, "Your Layover in\nSingapore")
          ),
          React.createElement("div", { style: { width: 40, height: 40, borderRadius: 12, background: `${C.primary}22`, display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement(Icon, { name: "Bell", size: 18, color: C.primary })
          )
        )
      ),

      // Flight Card
      React.createElement("div", {
        style: { background: `linear-gradient(135deg, #1a2e4a 0%, #0f1f35 100%)`, borderRadius: 20, padding: 16, marginBottom: 14, border: `1px solid ${C.cardBorder}`, position: "relative", overflow: "hidden" }
      },
        React.createElement("div", { style: { position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${C.primary}10` } }),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 } },
          React.createElement("div", null,
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 } },
              React.createElement(Icon, { name: "Plane", size: 14, color: C.primaryLight }),
              React.createElement("span", { style: { fontSize: 11, color: C.primaryLight, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" } }, "Next Flight")
            ),
            React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif" } }, flightData.flightNo),
            React.createElement("div", { style: { fontSize: 12, color: C.textSecondary, marginTop: 2 } }, `${flightData.airline} · ${flightData.nextStop}`)
          ),
          React.createElement("div", { style: { textAlign: "right" } },
            React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif" } }, flightData.departure),
            React.createElement("div", { style: { fontSize: 11, color: C.textMuted } }, `Gate ${flightData.gate}`)
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 } },
          [
            { icon: "MapPin", label: flightData.terminal },
            { icon: "Cloud", label: flightData.weather },
            { icon: "FileCheck", label: flightData.visa },
          ].map((item, i) =>
            React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "4px 8px" } },
              React.createElement(Icon, { name: item.icon, size: 12, color: C.textSecondary }),
              React.createElement("span", { style: { fontSize: 10, color: C.textSecondary } }, item.label)
            )
          )
        ),
        // Progress bar
        React.createElement("div", null,
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } },
            React.createElement("span", { style: { fontSize: 11, color: C.textMuted } }, "Layover progress"),
            React.createElement("span", { style: { fontSize: 11, color: C.primaryLight, fontWeight: 600 } }, "4h 15m remaining")
          ),
          React.createElement("div", { style: { height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99 } },
            React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`, borderRadius: 99 } })
          )
        )
      ),

      // Exit Safe Window
      React.createElement("div", {
        style: { background: C.card, borderRadius: 18, padding: 14, marginBottom: 14, border: `1px solid ${C.cardBorder}`, display: "flex", alignItems: "center", gap: 12 }
      },
        React.createElement("div", { style: { width: 48, height: 48, borderRadius: 14, background: `${C.green}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
          React.createElement(Icon, { name: "ShieldCheck", size: 24, color: C.green })
        ),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 2 } }, "Safe to Exit Airport"),
          React.createElement("div", { style: { fontSize: 11, color: C.textSecondary } }, `Return by ${flightData.safeWindowEnd} · Security: ${flightData.securityWait} wait · Gate walk: ${flightData.gateWalkMin}m`)
        ),
        React.createElement(Icon, { name: "ChevronRight", size: 18, color: C.textMuted })
      ),

      // Quick Stats Row
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 } },
        [
          { label: "Safe Exit", val: "16:00–20:30", icon: "Clock", col: C.amber },
          { label: "Visa", val: "Free Entry", icon: "Passport", col: C.green },
          { label: "Weather", val: "31°C ☁", icon: "Sun", col: C.cyan },
        ].map((s, i) =>
          React.createElement("div", { key: i, style: { background: C.card, borderRadius: 14, padding: "12px 10px", border: `1px solid ${C.cardBorder}`, textAlign: "center" } },
            React.createElement(Icon, { name: s.icon, size: 16, color: s.col }),
            React.createElement("div", { style: { fontSize: 10, color: C.textMuted, marginTop: 4, marginBottom: 2 } }, s.label),
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.textPrimary } }, s.val)
          )
        )
      ),

      // CTA
      React.createElement("button", {
        onClick: () => press("plan-cta", () => setActiveTab("plan")),
        style: {
          width: "100%", padding: "16px", borderRadius: 16, border: "none",
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
          color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700,
          cursor: "pointer", transform: btnScale("plan-cta"), transition: "transform 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: `0 8px 24px ${C.primary}40`
        }
      },
        React.createElement(Icon, { name: "Sparkles", size: 18, color: "#fff" }),
        "Plan My Mini Adventure"
      )
    );
  };

  // ── Screen: Plan ──────────────────────────────────────────────────────────
  const PlanScreen = () =>
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 16px 16px", scrollbarWidth: "none" } },
      React.createElement("h2", { style: { fontSize: 20, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif", marginBottom: 4 } }, "Build Your Plan"),
      React.createElement("p", { style: { fontSize: 12, color: C.textMuted, marginBottom: 16 } }, "Based on your 4h 15m safe window"),

      // Mood Selector
      React.createElement("div", { style: { marginBottom: 16 } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "What's your mood?"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 } },
          moods.map(m =>
            React.createElement("button", {
              key: m.id,
              onClick: () => { press(m.id, () => { setActiveMood(m.id); setPlanGenerated(false); }); },
              style: {
                padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${activeMood === m.id ? m.color : C.cardBorder}`,
                background: activeMood === m.id ? `${m.color}18` : C.card,
                cursor: "pointer", transform: btnScale(m.id), transition: "all 0.15s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4
              }
            },
              React.createElement(Icon, { name: m.icon, size: 18, color: activeMood === m.id ? m.color : C.textMuted }),
              React.createElement("span", { style: { fontSize: 10, fontWeight: activeMood === m.id ? 700 : 400, color: activeMood === m.id ? m.color : C.textMuted } }, m.label)
            )
          )
        )
      ),

      // Budget Selector
      React.createElement("div", { style: { marginBottom: 16 } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 } }, "Budget range"),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          budgets.map(b =>
            React.createElement("button", {
              key: b.id,
              onClick: () => { press(b.id, () => { setActiveBudget(b.id); setPlanGenerated(false); }); },
              style: {
                flex: 1, padding: "8px 4px", borderRadius: 10, border: `1.5px solid ${activeBudget === b.id ? b.color : C.cardBorder}`,
                background: activeBudget === b.id ? `${b.color}18` : C.card,
                color: activeBudget === b.id ? b.color : C.textMuted,
                fontSize: 11, fontWeight: activeBudget === b.id ? 700 : 400,
                cursor: "pointer", transform: btnScale(b.id), transition: "all 0.15s"
              }
            }, b.label)
          )
        )
      ),

      // Luggage toggle
      React.createElement("div", {
        style: { background: C.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          React.createElement(Icon, { name: "Luggage", size: 16, color: C.amber }),
          React.createElement("span", { style: { fontSize: 12, color: C.textSecondary } }, "Travelling with luggage")
        ),
        React.createElement("div", {
          onClick: () => setLuggageMode(!luggageMode),
          style: {
            width: 42, height: 24, borderRadius: 12, background: luggageMode ? C.amber : C.cardBorder,
            position: "relative", cursor: "pointer", transition: "background 0.3s"
          }
        },
          React.createElement("div", {
            style: {
              position: "absolute", top: 3, left: luggageMode ? 21 : 3, width: 18, height: 18,
              borderRadius: "50%", background: "#fff", transition: "left 0.3s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
            }
          })
        )
      ),

      // Generate Button
      !planGenerated && React.createElement("button", {
        onClick: () => press("gen", generatePlan),
        style: {
          width: "100%", padding: "14px", borderRadius: 14, border: "none",
          background: generating ? `${C.primary}60` : `linear-gradient(135deg, ${C.primary}, ${C.purple})`,
          color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 700,
          cursor: generating ? "not-allowed" : "pointer", transform: btnScale("gen"), transition: "all 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: generating ? "none" : `0 8px 20px ${C.primary}40`, marginBottom: 16
        }
      },
        generating
          ? React.createElement("span", null, "Calculating safe routes…")
          : React.createElement(React.Fragment, null,
              React.createElement(Icon, { name: "Sparkles", size: 16, color: "#fff" }),
              "Generate Itinerary"
            )
      ),

      // Generated Itinerary Cards
      planGenerated && React.createElement("div", null,
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 } }, "Recommended for you"),

        [itineraries[activeMood], itineraries.chill].filter((v, i, a) => a.indexOf(v) === i).map((it, i) =>
          React.createElement("div", {
            key: i,
            onClick: () => press(`it${i}`, () => setActiveItinerary(it)),
            style: {
              background: C.card, borderRadius: 18, padding: 14, marginBottom: 12,
              border: `1.5px solid ${i === 0 ? it.color + "60" : C.cardBorder}`,
              cursor: "pointer", transform: btnScale(`it${i}`), transition: "transform 0.15s",
              position: "relative", overflow: "hidden"
            }
          },
            i === 0 && React.createElement("div", {
              style: { position: "absolute", top: 10, right: 10, background: it.color, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "#000", letterSpacing: 0.5 }
            }, "BEST MATCH"),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } },
              React.createElement("div", { style: { width: 40, height: 40, borderRadius: 12, background: `${it.color}20`, display: "flex", alignItems: "center", justifyContent: "center" } },
                React.createElement(Icon, { name: it.icon, size: 20, color: it.color })
              ),
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.textPrimary } }, it.title),
                React.createElement("div", { style: { fontSize: 11, color: C.textMuted } }, it.subtitle)
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 } },
              it.tags.map((tag, j) =>
                React.createElement("span", { key: j, style: { fontSize: 10, color: it.color, background: `${it.color}18`, borderRadius: 6, padding: "2px 8px", fontWeight: 600 } }, tag)
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 16 } },
              [{ icon: "Clock", val: it.duration }, { icon: "MapPin", val: `${it.stops} stops` }, { icon: "Navigation", val: it.distance }].map((s, k) =>
                React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 4 } },
                  React.createElement(Icon, { name: s.icon, size: 12, color: C.textMuted }),
                  React.createElement("span", { style: { fontSize: 11, color: C.textSecondary } }, s.val)
                )
              )
            )
          )
        ),

        // Show itinerary detail inline if selected
        activeItinerary && React.createElement("div", { style: { marginTop: 4 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.textPrimary } }, activeItinerary.title),
            React.createElement("button", { onClick: () => setActiveItinerary(null), style: { background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 11, padding: 0 } }, "Close ✕")
          ),
          activeItinerary.steps.map((step, idx) =>
            React.createElement("div", { key: idx, style: { display: "flex", gap: 10, marginBottom: 12 } },
              React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 32 } },
                React.createElement("div", { style: { width: 32, height: 32, borderRadius: 10, background: step.type === "transit" ? `${C.primary}20` : `${activeItinerary.color}20`, display: "flex", alignItems: "center", justifyContent: "center" } },
                  React.createElement(Icon, { name: step.icon, size: 16, color: step.type === "transit" ? C.primary : activeItinerary.color })
                ),
                idx < activeItinerary.steps.length - 1 && React.createElement("div", { style: { width: 1, flex: 1, minHeight: 16, background: C.cardBorder, margin: "3px 0" } })
              ),
              React.createElement("div", { style: { flex: 1, paddingBottom: 4 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 2 } },
                  React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.textPrimary } }, step.label),
                  React.createElement("span", { style: { fontSize: 10, color: C.textMuted } }, step.time)
                ),
                React.createElement("div", { style: { fontSize: 11, color: C.textMuted } }, step.detail)
              )
            )
          )
        )
      )
    );

  // ── Screen: Return ────────────────────────────────────────────────────────
  const ReturnScreen = () =>
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 16px 16px", scrollbarWidth: "none" } },
      React.createElement("h2", { style: { fontSize: 20, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif", marginBottom: 4 } }, "Return Plan"),
      React.createElement("p", { style: { fontSize: 12, color: C.textMuted, marginBottom: 14 } }, "Buffered for SQ321 · Gate D42 · 22:45"),

      // Big countdown card
      React.createElement("div", {
        style: { background: `linear-gradient(135deg, #0d2340 0%, #0f1f35 100%)`, borderRadius: 20, padding: 20, marginBottom: 14, border: `1px solid ${C.amber}40`, textAlign: "center" }
      },
        React.createElement("div", { style: { fontSize: 11, color: C.amber, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 } }, "Leave city by"),
        React.createElement("div", { style: { fontSize: 48, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif", lineHeight: 1 } }, "18:30"),
        React.createElement("div", { style: { fontSize: 13, color: C.textSecondary, marginTop: 6 } }, "2h 15m from now · 53 min gate buffer"),
        React.createElement("div", {
          style: { marginTop: 14, background: `${C.amber}18`, borderRadius: 10, padding: "8px 14px", display: "inline-block" }
        },
          React.createElement("span", { style: { fontSize: 12, color: C.amber, fontWeight: 600 } }, "🚨 Reminder set for 18:15")
        )
      ),

      // Notification toggle
      React.createElement("div", {
        style: { background: C.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          React.createElement(Icon, { name: "BellRing", size: 16, color: C.primary }),
          React.createElement("span", { style: { fontSize: 12, color: C.textSecondary } }, "Smart return reminders")
        ),
        React.createElement("div", {
          onClick: () => setNotifEnabled(!notifEnabled),
          style: { width: 42, height: 24, borderRadius: 12, background: notifEnabled ? C.primary : C.cardBorder, position: "relative", cursor: "pointer", transition: "background 0.3s" }
        },
          React.createElement("div", {
            style: { position: "absolute", top: 3, left: notifEnabled ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }
          })
        )
      ),

      // Timeline
      React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 } }, "Return Timeline"),
      React.createElement("div", { style: { background: C.card, borderRadius: 18, padding: "14px 14px", border: `1px solid ${C.cardBorder}` } },
        returnSteps.map((step, i) =>
          React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: i < returnSteps.length - 1 ? 10 : 0 } },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 28 } },
              React.createElement("div", { style: { width: 28, height: 28, borderRadius: 8, background: `${step.color}20`, display: "flex", alignItems: "center", justifyContent: "center" } },
                React.createElement(Icon, { name: step.icon, size: 14, color: step.color })
              ),
              i < returnSteps.length - 1 && React.createElement("div", { style: { width: 1, flex: 1, minHeight: 10, background: C.cardBorder, margin: "3px 0" } })
            ),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement("span", { style: { fontSize: 12, color: C.textPrimary, fontWeight: 600 } }, step.label),
                React.createElement("span", { style: { fontSize: 11, color: C.textMuted, fontFamily: "Sora, monospace" } }, step.time)
              )
            )
          )
        )
      ),

      // Live status bar
      React.createElement("div", {
        style: { background: C.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.cardBorder}`, marginTop: 14, display: "flex", justifyContent: "space-between" }
      },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 11, color: C.textMuted, marginBottom: 2 } }, "Security wait"),
          React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.green } }, flightData.securityWait)
        ),
        React.createElement("div", { style: { textAlign: "center" } },
          React.createElement("div", { style: { fontSize: 11, color: C.textMuted, marginBottom: 2 } }, "Gate walk"),
          React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.cyan } }, `${flightData.gateWalkMin} min`)
        ),
        React.createElement("div", { style: { textAlign: "right" } },
          React.createElement("div", { style: { fontSize: 11, color: C.textMuted, marginBottom: 2 } }, "MRT to T3"),
          React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.amber } }, "38 min")
        )
      )
    );

  // ── Screen: Amenities ─────────────────────────────────────────────────────
  const AmenitiesScreen = () =>
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 16px 16px", scrollbarWidth: "none" } },
      React.createElement("h2", { style: { fontSize: 20, fontWeight: 800, color: C.textPrimary, fontFamily: "Sora, sans-serif", marginBottom: 4 } }, "Airport Amenities"),
      React.createElement("p", { style: { fontSize: 12, color: C.textMuted, marginBottom: 16 } }, "Changi T3 · Luggage-friendly spots"),

      // Safe mode toggle
      React.createElement("div", {
        style: { background: C.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          React.createElement(Icon, { name: "Accessibility", size: 16, color: C.purple }),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 12, color: C.textPrimary, fontWeight: 600 } }, "Accessibility mode"),
            React.createElement("div", { style: { fontSize: 10, color: C.textMuted } }, "Shows lift, ramp & wide routes")
          )
        ),
        React.createElement("div", {
          onClick: () => setToggleSafeMode(!toggleSafeMode),
          style: { width: 42, height: 24, borderRadius: 12, background: toggleSafeMode ? C.purple : C.cardBorder, position: "relative", cursor: "pointer", transition: "background 0.3s" }
        },
          React.createElement("div", {
            style: { position: "absolute", top: 3, left: toggleSafeMode ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }
          })
        )
      ),

      amenities.map((a, i) =>
        React.createElement("div", {
          key: i,
          style: {
            background: C.card, borderRadius: 16, padding: "12px 14px", marginBottom: 10,
            border: `1px solid ${a.available ? C.cardBorder : C.cardBorder}`,
            display: "flex", alignItems: "center", gap: 12, opacity: a.available ? 1 : 0.5
          }
        },
          React.createElement("div", { style: { width: 44, height: 44, borderRadius: 13, background: `${a.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
            React.createElement(Icon, { name: a.icon, size: 22, color: a.color })
          ),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 2 } },
              React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: C.textPrimary } }, a.name),
              React.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: a.available ? a.color : C.red } }, a.available ? a.price : "Full")
            ),
            React.createElement("div", { style: { fontSize: 11, color: C.textMuted, marginBottom: 3 } }, a.loc),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } },
              React.createElement(Icon, { name: "Navigation", size: 11, color: C.textMuted }),
              React.createElement("span", { style: { fontSize: 11, color: C.textMuted } }, `${a.walk} walk`)
            )
          )
        )
      ),

      // Bottom tip
      React.createElement("div", {
        style: { background: `${C.amber}12`, borderRadius: 14, padding: "12px 14px", border: `1px solid ${C.amber}30`, display: "flex", gap: 10, alignItems: "flex-start", marginTop: 4 }
      },
        React.createElement(Icon, { name: "Lightbulb", size: 18, color: C.amber }),
        React.createElement("div", { style: { fontSize: 11, color: C.textSecondary, lineHeight: 1.5 } },
          "Tip: Store heavy bags before heading out to enjoy the city lighter — most lockers accept Visa & Mastercard."
        )
      )
    );

  // ── Root Render ───────────────────────────────────────────────────────────
  const screens = { home: HomeScreen, plan: PlanScreen, return: ReturnScreen, amenities: AmenitiesScreen };
  const ActiveScreen = screens[activeTab];

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: "#060D1A",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif",
    }
  },
    // Ambient glow
    React.createElement("div", {
      style: { position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: `${C.primary}08`, filter: "blur(80px)", pointerEvents: "none" }
    }),

    // Phone frame
    React.createElement("div", {
      style: {
        width: 375, height: 812, background: C.bg,
        borderRadius: 48, overflow: "hidden",
        boxShadow: "0 0 0 10px #111, 0 0 0 12px #1a1a2e, 0 40px 80px rgba(0,0,0,0.8)",
        display: "flex", flexDirection: "column", position: "relative"
      }
    },
      StatusBar(),
      DynamicIsland(),
      React.createElement("div", { style: { flex: 1, overflowY: "auto", scrollbarWidth: "none" } },
        React.createElement(ActiveScreen)
      ),
      NavBar()
    )
  );
}
