const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: "#0F1117",
    surface: "#1C1F2A",
    card: "#252836",
    cardAlt: "#2D3045",
    border: "#333650",
    text: "#F0F2FF",
    textSec: "#9B9EC0",
    textMuted: "#5E6180",
    primary: "#FF7A3D",
    primaryDark: "#E85E1F",
    primaryBg: "rgba(255,122,61,0.12)",
    green: "#4ADE80",
    greenBg: "rgba(74,222,128,0.12)",
    yellow: "#FCD34D",
    yellowBg: "rgba(252,211,77,0.12)",
    red: "#F87171",
    redBg: "rgba(248,113,113,0.12)",
    blue: "#60A5FA",
    blueBg: "rgba(96,165,250,0.12)",
    purple: "#A78BFA",
    purpleBg: "rgba(167,139,250,0.12)",
    navBg: "#161821",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  light: {
    bg: "#FFF5EE",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    cardAlt: "#FFF8F4",
    border: "#F0E8E0",
    text: "#1A1208",
    textSec: "#6B5C4E",
    textMuted: "#B8A898",
    primary: "#E8652A",
    primaryDark: "#CC4F18",
    primaryBg: "rgba(232,101,42,0.10)",
    green: "#16A34A",
    greenBg: "rgba(22,163,74,0.10)",
    yellow: "#D97706",
    yellowBg: "rgba(217,119,6,0.10)",
    red: "#DC2626",
    redBg: "rgba(220,38,38,0.10)",
    blue: "#2563EB",
    blueBg: "rgba(37,99,235,0.10)",
    purple: "#7C3AED",
    purpleBg: "rgba(124,58,237,0.10)",
    navBg: "#FFFFFF",
    shadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
};

const INGREDIENTS = [
  { id: 1, name: "Roasted Chicken", qty: "~200g left", freshness: 1, daysLeft: 1, icon: "🍗", category: "Protein" },
  { id: 2, name: "Bell Pepper", qty: "½ medium", freshness: 2, daysLeft: 2, icon: "🫑", category: "Veggie" },
  { id: 3, name: "Baby Spinach", qty: "Wilting, ~1 cup", freshness: 1, daysLeft: 1, icon: "🌿", category: "Veggie" },
  { id: 4, name: "Cooked Rice", qty: "~2 cups", freshness: 2, daysLeft: 2, icon: "🍚", category: "Grain" },
  { id: 5, name: "Canned Chickpeas", qty: "1 can (400g)", freshness: 5, daysLeft: 730, icon: "🫘", category: "Protein" },
  { id: 6, name: "Eggs", qty: "3 large", freshness: 4, daysLeft: 14, icon: "🥚", category: "Protein" },
  { id: 7, name: "Greek Yogurt", qty: "½ cup", freshness: 3, daysLeft: 5, icon: "🥛", category: "Dairy" },
  { id: 8, name: "Cheddar Cheese", qty: "~80g block", freshness: 3, daysLeft: 10, icon: "🧀", category: "Dairy" },
  { id: 9, name: "Garlic", qty: "4 cloves", freshness: 4, daysLeft: 20, icon: "🧄", category: "Pantry" },
  { id: 10, name: "Lemon", qty: "1 whole", freshness: 4, daysLeft: 12, icon: "🍋", category: "Produce" },
  { id: 11, name: "Tortillas", qty: "3 small", freshness: 3, daysLeft: 7, icon: "🫓", category: "Grain" },
  { id: 12, name: "Olive Oil", qty: "Plenty", freshness: 5, daysLeft: 300, icon: "🫙", category: "Pantry" },
];

const RECIPES = [
  {
    id: 1,
    name: "Smoky Chicken Rice Bowl",
    time: 15,
    difficulty: "Easy",
    servings: 2,
    urgency: "Use today",
    urgencyColor: "red",
    tags: ["One Pan", "High Protein"],
    ingredients: ["Roasted Chicken", "Cooked Rice", "Bell Pepper", "Garlic", "Olive Oil"],
    wasteSaved: "$4.20",
    description: "Crispy pan-fried rice with smoky chicken and charred peppers.",
    calories: 520,
    steps: [
      { time: "0:00", action: "Chop", detail: "Dice bell pepper and mince 2 garlic cloves into small pieces." },
      { time: "2:00", action: "Heat", detail: "Heat 1 tbsp olive oil in a pan over medium-high heat until shimmering." },
      { time: "3:00", action: "Fry", detail: "Add garlic, stir 30 sec. Add pepper, cook 3 min until slightly charred." },
      { time: "6:30", action: "Combine", detail: "Add rice, spread flat. Don't stir for 2 min to get crispy bottom." },
      { time: "9:00", action: "Add", detail: "Shred chicken over rice. Stir everything together, season with salt + smoked paprika." },
      { time: "12:00", action: "Finish", detail: "Squeeze half a lemon over the bowl. Plate and serve hot." },
    ],
  },
  {
    id: 2,
    name: "Wilted Spinach Egg Scramble",
    time: 10,
    difficulty: "Easy",
    servings: 1,
    urgency: "Use today",
    urgencyColor: "red",
    tags: ["Under 10 min", "Microwave OK"],
    ingredients: ["Baby Spinach", "Eggs", "Cheddar Cheese", "Garlic", "Olive Oil"],
    wasteSaved: "$2.80",
    description: "Velvety scrambled eggs with wilting spinach folded in at the last second.",
    calories: 340,
    steps: [
      { time: "0:00", action: "Prep", detail: "Crack 3 eggs into a bowl, whisk with a pinch of salt and pepper." },
      { time: "1:00", action: "Heat", detail: "Warm 1 tsp olive oil in a non-stick pan on medium-low heat." },
      { time: "2:00", action: "Wilt", detail: "Add spinach with 1 minced garlic clove. Toss until just wilted, ~90 sec." },
      { time: "4:00", action: "Scramble", detail: "Pour eggs over spinach. Fold gently with a spatula, keeping it soft and creamy." },
      { time: "7:00", action: "Finish", detail: "Remove from heat while slightly underdone. Top with shredded cheddar and serve immediately." },
    ],
  },
  {
    id: 3,
    name: "Chickpea Flatbread Tacos",
    time: 20,
    difficulty: "Medium",
    servings: 2,
    urgency: "Use this week",
    urgencyColor: "yellow",
    tags: ["Vegetarian", "Kid Friendly"],
    ingredients: ["Canned Chickpeas", "Tortillas", "Bell Pepper", "Greek Yogurt", "Lemon"],
    wasteSaved: "$3.50",
    description: "Spiced crispy chickpeas in warm tortillas with a tangy yogurt drizzle.",
    calories: 460,
    steps: [
      { time: "0:00", action: "Prep", detail: "Drain and dry chickpeas thoroughly with a paper towel." },
      { time: "2:00", action: "Season", detail: "Toss chickpeas with olive oil, cumin, paprika, garlic powder, salt." },
      { time: "4:00", action: "Cook", detail: "Pan-fry chickpeas on high heat 8-10 min, stirring occasionally until crispy." },
      { time: "13:00", action: "Warm", detail: "Char tortillas directly on flame or in dry pan 30 sec per side." },
      { time: "16:00", action: "Sauce", detail: "Mix Greek yogurt with lemon juice and a pinch of salt." },
      { time: "18:00", action: "Assemble", detail: "Fill tortillas with chickpeas, diced pepper. Drizzle yogurt sauce over top." },
    ],
  },
  {
    id: 4,
    name: "Cheesy Garlic Rice Fritters",
    time: 18,
    difficulty: "Medium",
    servings: 2,
    urgency: "Use this week",
    urgencyColor: "yellow",
    tags: ["One Pan", "Budget Meal"],
    ingredients: ["Cooked Rice", "Eggs", "Cheddar Cheese", "Garlic", "Olive Oil"],
    wasteSaved: "$3.10",
    description: "Crispy pan-fried rice patties stuffed with melted cheddar and roasted garlic.",
    calories: 410,
    steps: [
      { time: "0:00", action: "Mix", detail: "Combine rice, 1 beaten egg, shredded cheddar, minced garlic, salt and pepper." },
      { time: "3:00", action: "Shape", detail: "Form into 6 palm-sized patties, pressing firmly so they hold together." },
      { time: "5:00", action: "Heat", detail: "Heat 2 tbsp olive oil in a pan over medium heat." },
      { time: "6:00", action: "Fry", detail: "Cook patties 4 min per side until deep golden brown. Don't flip too early." },
      { time: "14:00", action: "Rest", detail: "Let rest on paper towel 2 min. Serve with yogurt dip or hot sauce." },
    ],
  },
];

const WASTE_DATA = [
  { week: "Feb 24", saved: 12.4, items: 4 },
  { week: "Mar 3", saved: 18.7, items: 6 },
  { week: "Mar 10", saved: 9.2, items: 3 },
  { week: "Mar 17", saved: 22.1, items: 7 },
  { week: "Mar 21", saved: 14.8, items: 5 },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("scan");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [scanState, setScanState] = useState("idle");
  const [scannedItems, setScannedItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeConstraints, setActiveConstraints] = useState([]);
  const [pressedTab, setPressedTab] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cookingMode, setCookingMode] = useState(false);

  const t = themes[theme];

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  `;

  const urgencyColors = {
    red: { bg: t.redBg, text: t.red, dot: t.red },
    yellow: { bg: t.yellowBg, text: t.yellow, dot: t.yellow },
    green: { bg: t.greenBg, text: t.green, dot: t.green },
  };

  const freshnessLabel = (days) => {
    if (days <= 1) return { label: "Use today!", color: "red" };
    if (days <= 3) return { label: `${days}d left`, color: "yellow" };
    if (days <= 14) return { label: `${days}d left`, color: "green" };
    return { label: "Fresh", color: "green" };
  };

  const constraints = ["Under 20 min", "No Oven", "One Pan", "Kid Friendly", "Vegetarian", "Budget Meal"];

  const filteredRecipes = RECIPES.filter(r => {
    if (activeConstraints.length === 0) return true;
    return activeConstraints.some(c => r.tags.includes(c));
  });

  function handleScan() {
    setScanState("scanning");
    setTimeout(() => {
      setScanState("processing");
      setTimeout(() => {
        setScannedItems(["Roasted Chicken", "Bell Pepper", "Garlic"]);
        setScanState("done");
      }, 1500);
    }, 2000);
  }

  function btnPress(id) {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  }

  const Icons = {
    Camera: window.lucide?.Camera,
    Scan: window.lucide?.Scan,
    ChefHat: window.lucide?.ChefHat,
    BarChart3: window.lucide?.BarChart3,
    RefrigeratorIcon: window.lucide?.Refrigerator || window.lucide?.Package,
    Sun: window.lucide?.Sun,
    Moon: window.lucide?.Moon,
    Clock: window.lucide?.Clock,
    Star: window.lucide?.Star,
    Zap: window.lucide?.Zap,
    Flame: window.lucide?.Flame,
    Leaf: window.lucide?.Leaf,
    X: window.lucide?.X,
    ChevronRight: window.lucide?.ChevronRight,
    ChevronLeft: window.lucide?.ChevronLeft,
    Plus: window.lucide?.Plus,
    Check: window.lucide?.Check,
    AlertCircle: window.lucide?.AlertCircle,
    TrendingUp: window.lucide?.TrendingUp,
    DollarSign: window.lucide?.DollarSign,
    Trash2: window.lucide?.Trash2,
    Settings: window.lucide?.Settings,
    Users: window.lucide?.Users,
    PlayCircle: window.lucide?.PlayCircle,
    Timer: window.lucide?.Timer,
    ArrowRight: window.lucide?.ArrowRight,
    Sparkles: window.lucide?.Sparkles,
  };

  // ─── SCAN SCREEN ────────────────────────────────────────────────────────────
  function ScanScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
        {/* Hero scan area */}
        <div style={{ margin: "16px 16px 0", borderRadius: 20, overflow: "hidden", position: "relative", background: t.card, border: `1px solid ${t.border}` }}>
          <div style={{ height: 220, background: `linear-gradient(135deg, ${t.surface} 0%, ${t.card} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }}>
            {/* Scan overlay */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 160, height: 160, border: `2px solid ${scanState === "scanning" ? t.primary : t.border}`, borderRadius: 16, position: "relative", transition: "border-color 0.3s" }}>
                {["tl", "tr", "bl", "br"].map(corner => (
                  <div key={corner} style={{
                    position: "absolute",
                    width: 20, height: 20,
                    borderColor: t.primary,
                    borderStyle: "solid",
                    borderWidth: 0,
                    ...(corner === "tl" ? { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 4 } : {}),
                    ...(corner === "tr" ? { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 4 } : {}),
                    ...(corner === "bl" ? { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 4 } : {}),
                    ...(corner === "br" ? { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 4 } : {}),
                  }} />
                ))}
              </div>
            </div>
            {/* Center content */}
            <div style={{ zIndex: 2, textAlign: "center" }}>
              {scanState === "idle" && (
                <>
                  <div style={{ fontSize: 40 }}>📸</div>
                  <p style={{ color: t.textSec, fontSize: 13, marginTop: 8, fontFamily: "Nunito" }}>Snap your fridge or scan a barcode</p>
                </>
              )}
              {scanState === "scanning" && (
                <>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${t.primary}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
                  <p style={{ color: t.primary, fontSize: 13, marginTop: 10, fontFamily: "Nunito", fontWeight: 700 }}>Scanning...</p>
                </>
              )}
              {scanState === "processing" && (
                <>
                  <div style={{ fontSize: 32 }}>🧠</div>
                  <p style={{ color: t.blue, fontSize: 13, marginTop: 8, fontFamily: "Nunito", fontWeight: 700 }}>AI identifying ingredients...</p>
                </>
              )}
              {scanState === "done" && (
                <>
                  <div style={{ fontSize: 32 }}>✅</div>
                  <p style={{ color: t.green, fontSize: 13, marginTop: 8, fontFamily: "Nunito", fontWeight: 700 }}>3 items detected!</p>
                </>
              )}
            </div>
          </div>
          {/* Scan button area */}
          <div style={{ padding: "14px 16px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 10 }}>
            <button onClick={() => { btnPress("scan-photo"); handleScan(); }} style={{
              flex: 1, height: 44, borderRadius: 12, border: "none", cursor: "pointer",
              background: pressedBtn === "scan-photo" ? t.primaryDark : t.primary,
              color: "#fff", fontFamily: "Nunito", fontWeight: 800, fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transform: pressedBtn === "scan-photo" ? "scale(0.97)" : "scale(1)", transition: "all 0.15s"
            }}>
              {Icons.Camera && <Icons.Camera size={16} />} Photo Scan
            </button>
            <button onClick={() => { btnPress("scan-bar"); handleScan(); }} style={{
              flex: 1, height: 44, borderRadius: 12, border: `1px solid ${t.border}`, cursor: "pointer",
              background: t.card, color: t.text, fontFamily: "Nunito", fontWeight: 700, fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transform: pressedBtn === "scan-bar" ? "scale(0.97)" : "scale(1)", transition: "all 0.15s"
            }}>
              {Icons.Scan && <Icons.Scan size={16} />} Barcode
            </button>
          </div>
        </div>

        {/* Detected items */}
        {scanState === "done" && (
          <div style={{ margin: "12px 16px 0", padding: 14, background: t.greenBg, borderRadius: 16, border: `1px solid ${t.green}30` }}>
            <p style={{ color: t.green, fontFamily: "Nunito", fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Detected from photo</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {scannedItems.map(item => (
                <span key={item} style={{ background: t.card, color: t.text, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "Nunito", fontWeight: 600, border: `1px solid ${t.border}` }}>{item}</span>
              ))}
            </div>
            <button onClick={() => { setActiveTab("pantry"); }} style={{
              marginTop: 10, width: "100%", height: 36, borderRadius: 10, border: "none", cursor: "pointer",
              background: t.green, color: "#fff", fontFamily: "Nunito", fontWeight: 800, fontSize: 13
            }}>Add to Pantry →</button>
          </div>
        )}

        {/* Urgency Banner */}
        <div style={{ margin: "12px 16px 0", padding: 14, background: t.redBg, borderRadius: 16, border: `1px solid ${t.red}30`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: t.red, fontFamily: "Nunito", fontWeight: 800, fontSize: 13 }}>⚠️ Use Today</p>
            <p style={{ color: t.textSec, fontFamily: "Nunito", fontSize: 12, marginTop: 2 }}>Roasted Chicken + Baby Spinach expiring</p>
          </div>
          <button onClick={() => setActiveTab("recipes")} style={{ background: t.red, color: "#fff", border: "none", borderRadius: 10, padding: "6px 12px", fontFamily: "Nunito", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
            Cook Now
          </button>
        </div>

        {/* Quick add manual */}
        <div style={{ margin: "12px 16px 0" }}>
          <p style={{ color: t.textSec, fontFamily: "Nunito", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Quick Add</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["🥦 Broccoli", "🍅 Tomato", "🧅 Onion", "🫐 Blueberries", "🥕 Carrots"].map(item => (
              <button key={item} onClick={() => btnPress(item)} style={{
                background: pressedBtn === item ? t.primaryBg : t.card,
                border: `1px solid ${pressedBtn === item ? t.primary : t.border}`,
                borderRadius: 20, padding: "6px 14px", fontFamily: "Nunito", fontSize: 13, fontWeight: 600,
                color: t.text, cursor: "pointer", transition: "all 0.15s",
                transform: pressedBtn === item ? "scale(0.95)" : "scale(1)"
              }}>{item}</button>
            ))}
            <button style={{ background: t.primaryBg, border: `1px dashed ${t.primary}`, borderRadius: 20, padding: "6px 14px", fontFamily: "Nunito", fontSize: 13, fontWeight: 700, color: t.primary, cursor: "pointer" }}>
              + Custom
            </button>
          </div>
        </div>

        {/* Household tip */}
        <div style={{ margin: "12px 16px 0", padding: 14, background: t.purpleBg, borderRadius: 16, border: `1px solid ${t.purple}30` }}>
          <p style={{ color: t.purple, fontFamily: "Nunito", fontWeight: 800, fontSize: 12, marginBottom: 4 }}>🧠 AI Insight</p>
          <p style={{ color: t.textSec, fontFamily: "Nunito", fontSize: 13 }}>You've had canned chickpeas unused for 3 weeks. They pair great with your bell pepper and yogurt.</p>
        </div>
      </div>
    );
  }

  // ─── PANTRY SCREEN ──────────────────────────────────────────────────────────
  function PantryScreen() {
    const categories = ["All", "Protein", "Veggie", "Grain", "Dairy", "Pantry"];
    const filtered = activeFilter === "All" ? INGREDIENTS : INGREDIENTS.filter(i => i.category === activeFilter);
    const urgent = INGREDIENTS.filter(i => i.daysLeft <= 2).length;

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
        {/* Stats row */}
        <div style={{ display: "flex", gap: 10, margin: "16px 16px 0" }}>
          {[
            { label: "Items", val: INGREDIENTS.length, icon: "📦", color: t.blue },
            { label: "Use Today", val: urgent, icon: "⚠️", color: t.red },
            { label: "Meal Ideas", val: RECIPES.length, icon: "✨", color: t.primary },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: t.card, borderRadius: 14, padding: "10px 8px", textAlign: "center", border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ color: s.color, fontFamily: "Nunito", fontWeight: 900, fontSize: 20 }}>{s.val}</div>
              <div style={{ color: t.textMuted, fontFamily: "Nunito", fontSize: 11, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: `1px solid ${activeFilter === cat ? t.primary : t.border}`,
              background: activeFilter === cat ? t.primaryBg : t.card, color: activeFilter === cat ? t.primary : t.textSec,
              fontFamily: "Nunito", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s"
            }}>{cat}</button>
          ))}
        </div>

        {/* Ingredient list */}
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.sort((a, b) => a.daysLeft - b.daysLeft).map(item => {
            const f = freshnessLabel(item.daysLeft);
            const uc = urgencyColors[f.color];
            return (
              <div key={item.id} style={{ background: t.card, borderRadius: 16, padding: "12px 14px", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: uc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 14, color: t.text }}>{item.name}</div>
                  <div style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec, marginTop: 2 }}>{item.qty}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                  <span style={{ background: uc.bg, color: uc.text, borderRadius: 8, padding: "3px 8px", fontSize: 11, fontFamily: "Nunito", fontWeight: 700 }}>{f.label}</span>
                  <span style={{ color: t.textMuted, fontSize: 11, fontFamily: "Nunito" }}>{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add item button */}
        <div style={{ padding: "16px 16px 0" }}>
          <button onClick={() => setActiveTab("scan")} style={{
            width: "100%", height: 46, borderRadius: 14, border: `1.5px dashed ${t.primary}`, cursor: "pointer",
            background: t.primaryBg, color: t.primary, fontFamily: "Nunito", fontWeight: 800, fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            + Add Ingredient via Scan
          </button>
        </div>
      </div>
    );
  }

  // ─── RECIPE DETAIL ──────────────────────────────────────────────────────────
  function RecipeDetail({ recipe }) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Back header */}
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${t.border}` }}>
          <button onClick={() => { setActiveRecipe(null); setCookingMode(false); setActiveStep(0); }} style={{
            width: 36, height: 36, borderRadius: 10, border: `1px solid ${t.border}`, background: t.card,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text
          }}>
            {Icons.ChevronLeft && <Icons.ChevronLeft size={18} />}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: 16, color: t.text }}>{recipe.name}</div>
            <div style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec }}>{recipe.servings} servings · {recipe.calories} kcal</div>
          </div>
        </div>

        <div style={{ overflowY: "auto", paddingBottom: 20 }}>
          {/* Recipe meta */}
          <div style={{ display: "flex", gap: 8, padding: "12px 16px" }}>
            {[
              { icon: "⏱️", val: `${recipe.time} min`, label: "Cook time" },
              { icon: "🍽️", val: recipe.difficulty, label: "Difficulty" },
              { icon: "💰", val: recipe.wasteSaved, label: "Saved" },
            ].map(m => (
              <div key={m.label} style={{ flex: 1, background: t.card, borderRadius: 12, padding: "10px 8px", textAlign: "center", border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 16 }}>{m.icon}</div>
                <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 14, color: t.text, marginTop: 2 }}>{m.val}</div>
                <div style={{ fontFamily: "Nunito", fontSize: 10, color: t.textMuted }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Urgency tag */}
          <div style={{ margin: "0 16px", padding: "8px 12px", background: urgencyColors[recipe.urgencyColor].bg, borderRadius: 10, marginBottom: 12 }}>
            <p style={{ color: urgencyColors[recipe.urgencyColor].text, fontFamily: "Nunito", fontWeight: 700, fontSize: 12 }}>
              🔥 {recipe.urgency} — {recipe.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", flexWrap: "wrap" }}>
            {recipe.tags.map(tag => (
              <span key={tag} style={{ background: t.primaryBg, color: t.primary, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "Nunito", fontWeight: 700 }}>{tag}</span>
            ))}
          </div>

          {/* Ingredients used */}
          <div style={{ padding: "0 16px 12px" }}>
            <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: t.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Using from your fridge</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {recipe.ingredients.map(ing => {
                const match = INGREDIENTS.find(i => i.name === ing);
                return (
                  <span key={ing} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontFamily: "Nunito", fontWeight: 600, color: t.text }}>
                    {match ? match.icon : "🥘"} {ing}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Cooking Timeline */}
          <div style={{ padding: "0 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: t.textSec, textTransform: "uppercase", letterSpacing: 0.5 }}>Cooking Timeline</p>
              {!cookingMode ? (
                <button onClick={() => setCookingMode(true)} style={{
                  background: t.primary, color: "#fff", border: "none", borderRadius: 10, padding: "5px 12px",
                  fontFamily: "Nunito", fontWeight: 800, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                }}>
                  {Icons.PlayCircle && <Icons.PlayCircle size={14} />} Start Cooking
                </button>
              ) : (
                <button onClick={() => { setCookingMode(false); setActiveStep(0); }} style={{
                  background: t.redBg, color: t.red, border: "none", borderRadius: 10, padding: "5px 12px",
                  fontFamily: "Nunito", fontWeight: 800, fontSize: 12, cursor: "pointer"
                }}>Stop</button>
              )}
            </div>

            {/* Progress bar when cooking */}
            {cookingMode && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: t.border, borderRadius: 4, height: 6, marginBottom: 6 }}>
                  <div style={{ background: t.primary, height: 6, borderRadius: 4, width: `${((activeStep + 1) / recipe.steps.length) * 100}%`, transition: "width 0.3s" }} />
                </div>
                <p style={{ color: t.textSec, fontFamily: "Nunito", fontSize: 12 }}>Step {activeStep + 1} of {recipe.steps.length}</p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recipe.steps.map((step, idx) => {
                const isActive = cookingMode && idx === activeStep;
                const isDone = cookingMode && idx < activeStep;
                return (
                  <div key={idx} onClick={() => cookingMode && setActiveStep(idx)} style={{
                    background: isActive ? t.primaryBg : isDone ? t.greenBg : t.card,
                    borderRadius: 14, padding: "12px 14px", border: `1px solid ${isActive ? t.primary : isDone ? t.green + "50" : t.border}`,
                    cursor: cookingMode ? "pointer" : "default", transition: "all 0.2s"
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: isActive ? t.primary : isDone ? t.green : t.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {isDone ? (Icons.Check && <Icons.Check size={14} color="#fff" />) : (
                          <span style={{ color: isActive ? "#fff" : t.textSec, fontSize: 11, fontFamily: "Nunito", fontWeight: 800 }}>{step.time}</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: isActive ? t.primary : t.text }}>{step.action}</div>
                        <div style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec, marginTop: 3, lineHeight: 1.5 }}>{step.detail}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cookingMode && (
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                {activeStep > 0 && (
                  <button onClick={() => setActiveStep(s => s - 1)} style={{
                    flex: 1, height: 44, borderRadius: 14, border: `1px solid ${t.border}`, background: t.card,
                    color: t.text, fontFamily: "Nunito", fontWeight: 800, fontSize: 14, cursor: "pointer"
                  }}>← Back</button>
                )}
                {activeStep < recipe.steps.length - 1 ? (
                  <button onClick={() => setActiveStep(s => s + 1)} style={{
                    flex: 1, height: 44, borderRadius: 14, border: "none", background: t.primary,
                    color: "#fff", fontFamily: "Nunito", fontWeight: 800, fontSize: 14, cursor: "pointer"
                  }}>Next Step →</button>
                ) : (
                  <button onClick={() => { setCookingMode(false); setActiveStep(0); setActiveRecipe(null); }} style={{
                    flex: 1, height: 44, borderRadius: 14, border: "none", background: t.green,
                    color: "#fff", fontFamily: "Nunito", fontWeight: 800, fontSize: 14, cursor: "pointer"
                  }}>🎉 Done!</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── RECIPES SCREEN ─────────────────────────────────────────────────────────
  function RecipesScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
        {/* Smart constraint filters */}
        <div style={{ padding: "12px 16px 8px" }}>
          <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 12, color: t.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Smart Filters</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {constraints.map(c => {
              const active = activeConstraints.includes(c);
              return (
                <button key={c} onClick={() => setActiveConstraints(prev => active ? prev.filter(x => x !== c) : [...prev, c])} style={{
                  padding: "6px 12px", borderRadius: 20, border: `1px solid ${active ? t.primary : t.border}`,
                  background: active ? t.primaryBg : t.card, color: active ? t.primary : t.textSec,
                  fontFamily: "Nunito", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s"
                }}>{c}</button>
              );
            })}
          </div>
        </div>

        {/* AI generated header */}
        <div style={{ margin: "8px 16px", padding: "12px 14px", background: t.purpleBg, borderRadius: 14, border: `1px solid ${t.purple}30`, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <div>
            <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: t.purple }}>AI-Matched Recipes</p>
            <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec }}>Built from your exact {INGREDIENTS.length} ingredients</p>
          </div>
        </div>

        {/* Recipe cards */}
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredRecipes.map(recipe => {
            const uc = urgencyColors[recipe.urgencyColor];
            return (
              <div key={recipe.id} onClick={() => setActiveRecipe(recipe)} style={{
                background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: "hidden", cursor: "pointer",
                transform: pressedBtn === recipe.id ? "scale(0.98)" : "scale(1)", transition: "all 0.15s", boxShadow: t.shadow
              }}
                onMouseDown={() => setPressedBtn(recipe.id)}
                onMouseUp={() => setPressedBtn(null)}
                onTouchStart={() => setPressedBtn(recipe.id)}
                onTouchEnd={() => setPressedBtn(null)}
              >
                {/* Recipe emoji banner */}
                <div style={{ height: 80, background: `linear-gradient(135deg, ${uc.bg} 0%, ${t.surface} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                  🍳
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: 16, color: t.text, lineHeight: 1.2 }}>{recipe.name}</div>
                    <span style={{ background: uc.bg, color: uc.text, borderRadius: 8, padding: "3px 8px", fontSize: 10, fontFamily: "Nunito", fontWeight: 700, flexShrink: 0 }}>{recipe.urgency}</span>
                  </div>
                  <p style={{ fontFamily: "Nunito", fontSize: 13, color: t.textSec, lineHeight: 1.5, marginBottom: 10 }}>{recipe.description}</p>
                  {/* Ingredient pills */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    {recipe.ingredients.slice(0, 3).map(ing => {
                      const match = INGREDIENTS.find(i => i.name === ing);
                      return (
                        <span key={ing} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "2px 8px", fontSize: 11, fontFamily: "Nunito", fontWeight: 600, color: t.textSec }}>
                          {match?.icon} {ing}
                        </span>
                      );
                    })}
                    {recipe.ingredients.length > 3 && <span style={{ color: t.textMuted, fontSize: 11, fontFamily: "Nunito", padding: "2px 0" }}>+{recipe.ingredients.length - 3} more</span>}
                  </div>
                  {/* Meta row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ color: t.textSec, fontFamily: "Nunito", fontSize: 12, fontWeight: 600 }}>⏱️ {recipe.time} min</span>
                      <span style={{ color: t.textSec, fontFamily: "Nunito", fontSize: 12, fontWeight: 600 }}>🍽️ {recipe.difficulty}</span>
                      <span style={{ color: t.green, fontFamily: "Nunito", fontSize: 12, fontWeight: 700 }}>💰 {recipe.wasteSaved}</span>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: t.primaryBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {Icons.ChevronRight && <Icons.ChevronRight size={14} color={t.primary} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── TRACKER SCREEN ─────────────────────────────────────────────────────────
  function TrackerScreen() {
    const totalSaved = WASTE_DATA.reduce((s, w) => s + w.saved, 0).toFixed(2);
    const totalItems = WASTE_DATA.reduce((s, w) => s + w.items, 0);
    const maxVal = Math.max(...WASTE_DATA.map(d => d.saved));

    return (
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
        {/* Hero stats */}
        <div style={{ margin: "16px 16px 0", padding: "20px", background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`, borderRadius: 20 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Nunito", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>5-WEEK TOTAL SAVED</p>
          <div style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: 42, color: "#fff", lineHeight: 1 }}>${totalSaved}</div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Nunito", fontSize: 14, marginTop: 8 }}>{totalItems} ingredients rescued from the bin</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 10, margin: "12px 16px 0" }}>
          {[
            { icon: "🌍", label: "CO₂ Saved", val: "3.2 kg", color: t.green },
            { icon: "🍽️", label: "Meals Made", val: "18", color: t.blue },
            { icon: "📈", label: "Streak", val: "12 days", color: t.purple },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: t.card, borderRadius: 14, padding: "12px 8px", textAlign: "center", border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: 16, color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: "Nunito", fontSize: 11, color: t.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ margin: "12px 16px 0", background: t.card, borderRadius: 20, padding: "16px", border: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 16 }}>Weekly Savings</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100, gap: 6 }}>
            {WASTE_DATA.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontFamily: "Nunito", fontSize: 10, color: t.primary, fontWeight: 700 }}>${d.saved}</span>
                <div style={{
                  width: "100%", borderRadius: "6px 6px 0 0",
                  background: i === WASTE_DATA.length - 1 ? t.primary : t.primaryBg,
                  height: `${(d.saved / maxVal) * 80}px`,
                  border: `1px solid ${i === WASTE_DATA.length - 1 ? t.primary : t.border}`,
                  transition: "height 0.5s"
                }} />
                <span style={{ fontFamily: "Nunito", fontSize: 9, color: t.textMuted }}>{d.week.split(" ")[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most wasted ingredients */}
        <div style={{ margin: "12px 16px 0", background: t.card, borderRadius: 20, padding: "16px", border: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 12 }}>Ingredients Saved This Month</p>
          {[
            { name: "Baby Spinach", count: 5, icon: "🌿", saved: "$6.20" },
            { name: "Bread", count: 4, icon: "🍞", saved: "$4.80" },
            { name: "Bell Pepper", count: 3, icon: "🫑", saved: "$3.50" },
            { name: "Eggs", count: 6, icon: "🥚", saved: "$2.40" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < 3 ? 10 : 0 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 13, color: t.text }}>{item.name}</div>
                <div style={{ background: t.border, height: 4, borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
                  <div style={{ background: t.primary, height: 4, borderRadius: 4, width: `${(item.count / 6) * 100}%` }} />
                </div>
              </div>
              <span style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: t.green }}>{item.saved}</span>
            </div>
          ))}
        </div>

        {/* Settings toggle here */}
        <div style={{ margin: "12px 16px 0", background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.border}` }}>
            <div>
              <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 14, color: t.text }}>Appearance</p>
              <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec }}>{theme === "dark" ? "Dark mode" : "Light mode"} active</p>
            </div>
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{
              width: 48, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
              background: theme === "dark" ? t.primary : t.border, position: "relative", transition: "background 0.3s"
            }}>
              <div style={{
                position: "absolute", top: 3, left: theme === "dark" ? 23 : 3, width: 22, height: 22,
                borderRadius: "50%", background: "#fff", transition: "left 0.3s", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12
              }}>
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </button>
          </div>
          {[
            { label: "Household Profiles", sub: "2 members synced", icon: "👨‍👩‍👦" },
            { label: "Dietary Preferences", sub: "No restrictions set", icon: "🥗" },
            { label: "Notification Schedule", sub: "Daily at 5:30 PM", icon: "🔔" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < 2 ? `1px solid ${t.border}` : "none" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Nunito", fontWeight: 700, fontSize: 14, color: t.text }}>{item.label}</p>
                <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec }}>{item.sub}</p>
              </div>
              {Icons.ChevronRight && <Icons.ChevronRight size={16} color={t.textMuted} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── NAV TABS ────────────────────────────────────────────────────────────────
  const tabs = [
    { id: "scan", label: "Scan", icon: Icons.Camera },
    { id: "pantry", label: "Pantry", icon: Icons.RefrigeratorIcon },
    { id: "recipes", label: "Recipes", icon: Icons.ChefHat },
    { id: "tracker", label: "Tracker", icon: Icons.BarChart3 },
  ];

  const screenTitle = {
    scan: "FridgeCipher",
    pantry: "My Pantry",
    recipes: "Recipe Ideas",
    tracker: "Waste Tracker",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif" }}>
      <style>{fontStyle}</style>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, background: t.bg, borderRadius: 55, overflow: "hidden", position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 0 0 8px #1a1a1a, 0 0 0 10px #2a2a2a",
        display: "flex", flexDirection: "column"
      }}>
        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px 8px", height: 50, flexShrink: 0 }}>
          <span style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: t.text }}>9:41</span>
          {/* Dynamic Island */}
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000", borderRadius: 20 }} />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
              {[3, 5, 7, 9].map(h => <div key={h} style={{ width: 3, height: h, background: t.text, borderRadius: 1 }} />)}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.4C5.6 2.4 3.5 3.4 2 5L0 3C2.1 1.1 4.9 0 8 0s5.9 1.1 8 3l-2 2C12.5 3.4 10.4 2.4 8 2.4zM8 6.4c-1.3 0-2.5.5-3.4 1.3L3 6.1C4.3 4.8 6 4 8 4s3.7.8 5 2.1L11.4 7.7C10.5 6.9 9.3 6.4 8 6.4z" fill={t.text} /><circle cx="8" cy="11" r="1.5" fill={t.text} /></svg>
            <div style={{ display: "flex", gap: 1 }}>
              <div style={{ width: 22, height: 11, border: `1.5px solid ${t.text}`, borderRadius: 3, padding: 1.5, position: "relative" }}>
                <div style={{ width: "80%", height: "100%", background: t.green, borderRadius: 1 }} />
                <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 3, height: 6, background: t.text, borderRadius: "0 1px 1px 0" }} />
              </div>
            </div>
          </div>
        </div>

        {/* App header */}
        {!activeRecipe && (
          <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <h1 style={{ fontFamily: "Nunito", fontWeight: 900, fontSize: 24, color: t.text, lineHeight: 1 }}>
                {screenTitle[activeTab]}
              </h1>
              {activeTab === "scan" && <p style={{ fontFamily: "Nunito", fontSize: 12, color: t.textSec, marginTop: 2 }}>Turn leftovers into dinner</p>}
            </div>
            {activeTab === "scan" && (
              <div style={{ width: 40, height: 40, borderRadius: 12, background: t.primaryBg, border: `1px solid ${t.primary}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20 }}>🔍</span>
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activeRecipe ? (
            <RecipeDetail recipe={activeRecipe} />
          ) : (
            <>
              {activeTab === "scan" && <ScanScreen />}
              {activeTab === "pantry" && <PantryScreen />}
              {activeTab === "recipes" && <RecipesScreen />}
              {activeTab === "tracker" && <TrackerScreen />}
            </>
          )}
        </div>

        {/* Bottom nav */}
        {!activeRecipe && (
          <div style={{
            background: t.navBg, borderTop: `1px solid ${t.border}`,
            display: "flex", paddingBottom: 20, paddingTop: 10, flexShrink: 0
          }}>
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setPressedTab(tab.id); setTimeout(() => setPressedTab(null), 200); }}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                    transform: pressedTab === tab.id ? "scale(0.88)" : "scale(1)", transition: "transform 0.15s"
                  }}>
                  <div style={{
                    width: 42, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    background: active ? t.primaryBg : "transparent", transition: "background 0.2s"
                  }}>
                    {TabIcon && <TabIcon size={20} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 1.8} />}
                  </div>
                  <span style={{ fontFamily: "Nunito", fontSize: 10, fontWeight: active ? 800 : 600, color: active ? t.primary : t.textMuted }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
