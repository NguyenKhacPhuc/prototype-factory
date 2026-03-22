
const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: "#F4F2FF",
    surface: "#FFFFFF",
    surfaceAlt: "#EEF0FF",
    card: "#FFFFFF",
    text: "#1A1330",
    textSub: "#6B6480",
    textMuted: "#A89FC0",
    primary: "#6C3FE8",
    primaryLight: "#EDE8FF",
    primaryGrad: "linear-gradient(135deg, #6C3FE8 0%, #9B6DFF 100%)",
    secondary: "#FF6B6B",
    accent: "#00C9A7",
    border: "#E8E4F3",
    navBg: "#FFFFFF",
    scanOverlay: "rgba(108, 63, 232, 0.15)",
    statusBar: "#1A1330",
    shadow: "0 4px 24px rgba(108,63,232,0.12)",
  },
  dark: {
    bg: "#0F0C1A",
    surface: "#1A1530",
    surfaceAlt: "#231D3A",
    card: "#1E1834",
    text: "#F0ECFF",
    textSub: "#9D94C0",
    textMuted: "#5A527A",
    primary: "#9B6DFF",
    primaryLight: "#2A1F50",
    primaryGrad: "linear-gradient(135deg, #7B50E8 0%, #B88FFF 100%)",
    secondary: "#FF8080",
    accent: "#00E5BE",
    border: "#2E2650",
    navBg: "#14102A",
    scanOverlay: "rgba(155, 109, 255, 0.2)",
    statusBar: "#F0ECFF",
    shadow: "0 4px 24px rgba(0,0,0,0.5)",
  },
};

const langOptions = [
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "zh", label: "Mandarin", flag: "🇨🇳" },
];

const scanItems = [
  {
    id: 1,
    label: "Coffee Menu",
    x: 18, y: 25,
    w: 38, h: 14,
    word: "コーヒー",
    roman: "kōhī",
    meaning: "Coffee",
    example: "コーヒーをください。",
    exTrans: "Please give me coffee.",
    pos: "Noun",
    color: "#6C3FE8",
  },
  {
    id: 2,
    label: "Exit Sign",
    x: 58, y: 12,
    w: 30, h: 10,
    word: "出口",
    roman: "deguchi",
    meaning: "Exit",
    example: "出口はどこですか？",
    exTrans: "Where is the exit?",
    pos: "Noun",
    color: "#FF6B6B",
  },
  {
    id: 3,
    label: "Bread Basket",
    x: 10, y: 55,
    w: 35, h: 12,
    word: "パン",
    roman: "pan",
    meaning: "Bread",
    example: "パンをひとつください。",
    exTrans: "One bread, please.",
    pos: "Noun",
    color: "#00C9A7",
  },
  {
    id: 4,
    label: "Today's Special",
    x: 52, y: 48,
    w: 40, h: 14,
    word: "本日のおすすめ",
    roman: "honjitsu no osusume",
    meaning: "Today's Special",
    example: "本日のおすすめは何ですか？",
    exTrans: "What's today's special?",
    pos: "Phrase",
    color: "#FF9F43",
  },
];

const vocabularyData = [
  { id: 1, word: "コーヒー", roman: "kōhī", meaning: "Coffee", mastery: 85, context: "Café scan", lastSeen: "2h ago", due: false },
  { id: 2, word: "出口", roman: "deguchi", meaning: "Exit", mastery: 60, context: "Station scan", lastSeen: "Yesterday", due: true },
  { id: 3, word: "いくらですか", roman: "ikura desu ka", meaning: "How much is it?", mastery: 40, context: "Market scan", lastSeen: "3 days ago", due: true },
  { id: 4, word: "右", roman: "migi", meaning: "Right", mastery: 92, context: "Map scan", lastSeen: "5h ago", due: false },
  { id: 5, word: "パン", roman: "pan", meaning: "Bread", mastery: 70, context: "Bakery scan", lastSeen: "1h ago", due: false },
  { id: 6, word: "電車", roman: "densha", meaning: "Train", mastery: 55, context: "Station scan", lastSeen: "Yesterday", due: true },
];

const lessons = [
  {
    id: 1,
    title: "Café Vocabulary",
    words: 8,
    source: "From your café scans",
    icon: "☕",
    color: "#6C3FE8",
    progress: 65,
    tag: "Personalized",
  },
  {
    id: 2,
    title: "Getting Around",
    words: 12,
    source: "Transit & map scans",
    icon: "🚇",
    color: "#00C9A7",
    progress: 30,
    tag: "Location-based",
  },
  {
    id: 3,
    title: "Shopping Phrases",
    words: 10,
    source: "Market scans",
    icon: "🛒",
    color: "#FF9F43",
    progress: 0,
    tag: "New",
  },
];

const scenarios = [
  {
    id: 1,
    title: "Ordering at a Café",
    desc: "Practice asking for items and paying the bill.",
    icon: "☕",
    difficulty: "Beginner",
    duration: "5 min",
    color: "#6C3FE8",
    lines: [
      { speaker: "staff", text: "いらっしゃいませ！", trans: "Welcome!" },
      { speaker: "you", text: "コーヒーをひとつください。", trans: "One coffee, please." },
      { speaker: "staff", text: "サイズはいかがですか？", trans: "What size would you like?" },
      { speaker: "you", text: "Mサイズでお願いします。", trans: "Medium size, please." },
      { speaker: "staff", text: "500円になります。", trans: "That will be 500 yen." },
      { speaker: "you", text: "はい、どうぞ。", trans: "Here you go." },
    ],
  },
  {
    id: 2,
    title: "Asking for Directions",
    desc: "Find your way around the city.",
    icon: "🗺️",
    difficulty: "Intermediate",
    duration: "7 min",
    color: "#00C9A7",
    lines: [
      { speaker: "you", text: "すみません、駅はどこですか？", trans: "Excuse me, where is the station?" },
      { speaker: "staff", text: "まっすぐ行って、右に曲がってください。", trans: "Go straight, then turn right." },
      { speaker: "you", text: "どのくらいかかりますか？", trans: "How long does it take?" },
      { speaker: "staff", text: "歩いて5分くらいです。", trans: "About 5 minutes on foot." },
      { speaker: "you", text: "ありがとうございます！", trans: "Thank you very much!" },
    ],
  },
  {
    id: 3,
    title: "Shopping at a Market",
    desc: "Ask prices and make purchases.",
    icon: "🛒",
    difficulty: "Beginner",
    duration: "6 min",
    color: "#FF9F43",
    lines: [
      { speaker: "you", text: "これはいくらですか？", trans: "How much is this?" },
      { speaker: "staff", text: "300円です。", trans: "It's 300 yen." },
      { speaker: "you", text: "2つください。", trans: "I'll take two." },
      { speaker: "staff", text: "600円になります。", trans: "That's 600 yen." },
    ],
  },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const streakData = [true, true, true, false, true, true, false];

function App() {
  const [theme, setTheme] = useState("light");
  const [tab, setTab] = useState("scan");
  const [selectedScan, setSelectedScan] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [dialogStep, setDialogStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState(langOptions[0]);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [reviewCard, setReviewCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);
  const [time, setTime] = useState("9:41");
  const [notif, setNotif] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const t = themes[theme];

  useEffect(() => {
    const now = new Date();
    setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
    const interval = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const startScan = () => {
    setScanning(true);
    setScanDone(false);
    setSelectedScan(null);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
      showNotif("4 items detected!");
    }, 2000);
  };

  const Icon = (name, size = 20, color = "currentColor") => {
    const Comp = window.lucide[name];
    if (!Comp) return null;
    return React.createElement(Comp, { size, color, strokeWidth: 2 });
  };

  // ---- SCREENS ----

  const ScanScreen = () => (
    React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" } },
      // Header
      React.createElement("div", {
        style: {
          padding: "12px 20px 10px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: t.surface,
          borderBottom: `1px solid ${t.border}`,
        }
      },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: t.text, fontFamily: "Plus Jakarta Sans" } }, "LingoLens"),
          React.createElement("div", { style: { fontSize: 11, color: t.textSub } }, `Scanning in ${selectedLang.flag} ${selectedLang.label}`),
        ),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", {
            onClick: () => showNotif("History saved locally"),
            style: { background: t.surfaceAlt, border: "none", borderRadius: 10, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center" }
          }, Icon("History", 18, t.textSub)),
          React.createElement("button", {
            onClick: () => setTab("settings"),
            style: { background: t.surfaceAlt, border: "none", borderRadius: 10, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center" }
          }, Icon("Settings2", 18, t.textSub)),
        )
      ),

      // Camera Viewfinder
      React.createElement("div", {
        style: {
          position: "relative",
          flex: 1,
          background: "#0a0a12",
          overflow: "hidden",
        }
      },
        // Fake camera scene
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, #1a1025 0%, #0d1a2a 50%, #121228 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }
        },
          // Scene illustration
          React.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.35 } },
            // Table surface
            React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, #2a1f10 0%, #1a1208 100%)", borderRadius: "60% 60% 0 0 / 20% 20% 0 0" } }),
            // Coffee cup
            React.createElement("div", { style: { position: "absolute", bottom: "38%", left: "20%", width: 50, height: 60, background: "#3d2b1a", borderRadius: "6px 6px 10px 10px" } }),
            React.createElement("div", { style: { position: "absolute", bottom: "55%", left: "22%", width: 46, height: 8, background: "#5a3a1f", borderRadius: 4 } }),
            // Menu board
            React.createElement("div", { style: { position: "absolute", top: "12%", left: "8%", width: "45%", height: "35%", background: "#1a2540", borderRadius: 8, border: "2px solid #2d3a5a" } }),
            React.createElement("div", { style: { position: "absolute", top: "15%", left: "11%", width: "30%", height: 3, background: "#4a5a8a", borderRadius: 2 } }),
            React.createElement("div", { style: { position: "absolute", top: "21%", left: "11%", width: "22%", height: 2, background: "#3a4a7a", borderRadius: 2 } }),
            React.createElement("div", { style: { position: "absolute", top: "26%", left: "11%", width: "26%", height: 2, background: "#3a4a7a", borderRadius: 2 } }),
            // Exit sign
            React.createElement("div", { style: { position: "absolute", top: "8%", right: "8%", width: "32%", height: "14%", background: "#1f3520", borderRadius: 6, border: "2px solid #2f5530", display: "flex", alignItems: "center", justifyContent: "center" } },
              React.createElement("div", { style: { color: "#4aff6a", fontSize: 10, fontWeight: 700, letterSpacing: 1 } }, "EXIT ▶"),
            ),
            // Bread basket
            React.createElement("div", { style: { position: "absolute", bottom: "40%", left: "5%", width: "38%", height: "16%", background: "#3a2510", borderRadius: "50% 50% 40% 40% / 30% 30% 20% 20%", border: "2px solid #5a3a15" } }),
            // Special board
            React.createElement("div", { style: { position: "absolute", bottom: "36%", right: "5%", width: "40%", height: "18%", background: "#2a1a1a", borderRadius: 8, border: "2px solid #4a2a2a" } }),
            React.createElement("div", { style: { position: "absolute", bottom: "46%", right: "8%", width: "25%", height: 2, background: "#8a3a3a", borderRadius: 2 } }),
          ),
        ),

        // Scanning animation
        scanning && React.createElement("div", {
          style: {
            position: "absolute", inset: 0, zIndex: 5,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
          }
        },
          React.createElement("div", { style: { textAlign: "center" } },
            React.createElement("div", {
              style: {
                width: 64, height: 64, borderRadius: "50%",
                border: `3px solid ${t.primary}`,
                borderTopColor: "transparent",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }
            }),
            React.createElement("div", { style: { color: "#fff", fontSize: 14, fontWeight: 600 } }, "Analyzing scene..."),
            React.createElement("div", { style: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 } }, "Identifying objects & text"),
          )
        ),

        // AR Overlays
        scanDone && !scanning && scanItems.map(item =>
          React.createElement("div", {
            key: item.id,
            onClick: () => setSelectedScan(selectedScan?.id === item.id ? null : item),
            style: {
              position: "absolute",
              left: `${item.x}%`, top: `${item.y}%`,
              width: `${item.w}%`, height: `${item.h}%`,
              border: `2px solid ${item.color}`,
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.2s",
              background: selectedScan?.id === item.id ? `${item.color}30` : "transparent",
            }
          },
            React.createElement("div", {
              style: {
                position: "absolute", top: -22, left: 0,
                background: item.color,
                color: "#fff",
                fontSize: 10, fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "4px 4px 4px 0",
                whiteSpace: "nowrap",
              }
            }, item.word),
          )
        ),

        // Corner guides
        !scanning && !scanDone && React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          React.createElement("div", { style: { position: "relative", width: 220, height: 220 } },
            ...[
              { top: 0, left: 0, borderTop: "3px solid", borderLeft: "3px solid", borderRadius: "8px 0 0 0" },
              { top: 0, right: 0, borderTop: "3px solid", borderRight: "3px solid", borderRadius: "0 8px 0 0" },
              { bottom: 0, left: 0, borderBottom: "3px solid", borderLeft: "3px solid", borderRadius: "0 0 0 8px" },
              { bottom: 0, right: 0, borderBottom: "3px solid", borderRight: "3px solid", borderRadius: "0 0 8px 0" },
            ].map((s, i) =>
              React.createElement("div", {
                key: i, style: { position: "absolute", width: 28, height: 28, borderColor: "rgba(255,255,255,0.7)", ...s }
              })
            ),
            React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 } },
              React.createElement("div", { style: { color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center", lineHeight: 1.5 } }, "Point at any object,\nsign, or text"),
            ),
          )
        ),

        // Selected scan detail card
        selectedScan && React.createElement("div", {
          style: {
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: t.surface,
            borderRadius: "20px 20px 0 0",
            padding: "16px 20px 20px",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
          }
        },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 } },
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: -1 } }, selectedScan.word),
              React.createElement("div", { style: { fontSize: 13, color: t.primary, fontWeight: 600, marginTop: 2 } }, selectedScan.roman),
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
              React.createElement("div", { style: { background: t.primaryLight, color: t.primary, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 } }, selectedScan.pos),
              React.createElement("button", {
                onClick: () => setSelectedScan(null),
                style: { background: t.surfaceAlt, border: "none", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }
              }, Icon("X", 16, t.textSub)),
            ),
          ),
          React.createElement("div", { style: { fontSize: 16, color: t.textSub, marginBottom: 12 } }, selectedScan.meaning),
          React.createElement("div", { style: { background: t.surfaceAlt, borderRadius: 12, padding: "10px 14px", marginBottom: 14 } },
            React.createElement("div", { style: { fontSize: 13, color: t.text, fontWeight: 600, marginBottom: 2 } }, selectedScan.example),
            React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, selectedScan.exTrans),
          ),
          React.createElement("div", { style: { display: "flex", gap: 10 } },
            React.createElement("button", {
              onClick: () => { showNotif("Added to vocabulary!"); setSelectedScan(null); },
              style: {
                flex: 1, padding: "11px 0",
                background: t.primaryGrad,
                border: "none", borderRadius: 12,
                color: "#fff", fontSize: 13, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }
            }, Icon("Plus", 15, "#fff"), "Save Word"),
            React.createElement("button", {
              onClick: () => showNotif("Audio played!"),
              style: {
                padding: "11px 16px",
                background: t.surfaceAlt,
                border: "none", borderRadius: 12,
                color: t.text, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }
            }, Icon("Volume2", 18, t.primary)),
          ),
        ),

        // Scan button
        !selectedScan && React.createElement("div", {
          style: { position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center" }
        },
          React.createElement("button", {
            onClick: startScan,
            style: {
              width: 68, height: 68,
              borderRadius: "50%",
              background: t.primaryGrad,
              border: "4px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(108,63,232,0.5)",
            }
          }, Icon("Camera", 26, "#fff")),
        ),
      ),
    )
  );

  const LearnScreen = () => (
    React.createElement("div", { style: { flex: 1, overflowY: "auto", background: t.bg } },
      React.createElement("div", { style: { padding: "16px 20px 10px", background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: t.text } }, "Your Lessons"),
        React.createElement("div", { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, "Built from what you scan"),
      ),

      // Due for review
      React.createElement("div", { style: { padding: "16px 20px 8px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, "Due for Review"),
          React.createElement("div", { style: { background: t.secondary, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 } }, `${vocabularyData.filter(v => v.due).length} words`),
        ),
        React.createElement("div", {
          style: {
            background: t.primaryGrad,
            borderRadius: 16,
            padding: "16px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }
        },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 4 } }, "Spaced Review Ready"),
            React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#fff" } }, `${vocabularyData.filter(v => v.due).length} words`),
            React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 } }, "from your recent scans"),
          ),
          React.createElement("button", {
            onClick: () => {
              const dueWords = vocabularyData.filter(v => v.due);
              if (dueWords.length > 0) { setReviewCard(dueWords[0]); setFlipped(false); }
            },
            style: {
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 14,
              padding: "10px 16px",
              color: "#fff", fontSize: 13, fontWeight: 700,
              cursor: "pointer",
            }
          }, "Start →"),
        ),
      ),

      // Review Card Modal
      reviewCard && React.createElement("div", {
        style: {
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }
      },
        React.createElement("div", {
          style: {
            background: t.surface,
            borderRadius: 24,
            padding: 28,
            width: "100%",
            maxWidth: 340,
            boxShadow: t.shadow,
          }
        },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 12, color: t.textSub, fontWeight: 600 } }, `Context: ${reviewCard.context}`),
            React.createElement("button", {
              onClick: () => setReviewCard(null),
              style: { background: t.surfaceAlt, border: "none", borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }
            }, Icon("X", 16, t.textSub)),
          ),
          React.createElement("div", {
            onClick: () => setFlipped(!flipped),
            style: {
              minHeight: 140,
              background: flipped ? t.primaryGrad : t.surfaceAlt,
              borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              cursor: "pointer",
              transition: "background 0.3s",
              marginBottom: 20,
              padding: 20,
              textAlign: "center",
            }
          },
            flipped
              ? React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 8 } }, "Meaning"),
                  React.createElement("div", { style: { fontSize: 26, fontWeight: 800, color: "#fff" } }, reviewCard.meaning),
                )
              : React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: 36, fontWeight: 800, color: t.text, marginBottom: 6 } }, reviewCard.word),
                  React.createElement("div", { style: { fontSize: 14, color: t.primary } }, reviewCard.roman),
                  React.createElement("div", { style: { fontSize: 12, color: t.textMuted, marginTop: 10 } }, "Tap to reveal"),
                ),
          ),
          flipped && React.createElement("div", { style: { display: "flex", gap: 10 } },
            React.createElement("button", {
              onClick: () => { showNotif("Marked for more practice"); setReviewCard(null); },
              style: { flex: 1, padding: "12px 0", background: "#FFE8E8", border: "none", borderRadius: 12, color: "#FF4444", fontSize: 13, fontWeight: 700, cursor: "pointer" }
            }, "Again"),
            React.createElement("button", {
              onClick: () => { showNotif("Great! Word mastered"); setReviewCard(null); },
              style: { flex: 1, padding: "12px 0", background: "#E8FFF4", border: "none", borderRadius: 12, color: "#00A86B", fontSize: 13, fontWeight: 700, cursor: "pointer" }
            }, "Got it!"),
          ),
          !flipped && React.createElement("div", { style: { textAlign: "center", color: t.textMuted, fontSize: 12 } }, "Tap card to flip"),
        )
      ),

      // Lesson cards
      React.createElement("div", { style: { padding: "4px 20px 16px" } },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, "Your Lessons"),
        lessons.map(lesson =>
          React.createElement("div", {
            key: lesson.id,
            onClick: () => setActiveLesson(activeLesson === lesson.id ? null : lesson.id),
            style: {
              background: t.card,
              borderRadius: 16,
              padding: "14px 16px",
              marginBottom: 12,
              boxShadow: t.shadow,
              cursor: "pointer",
              border: `1px solid ${activeLesson === lesson.id ? lesson.color : t.border}`,
              transition: "border 0.2s",
            }
          },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
              React.createElement("div", { style: { width: 48, height: 48, background: `${lesson.color}20`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 } }, lesson.icon),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 2 } },
                  React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, lesson.title),
                  React.createElement("div", { style: { background: `${lesson.color}20`, color: lesson.color, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 } }, lesson.tag),
                ),
                React.createElement("div", { style: { fontSize: 11, color: t.textSub, marginBottom: 8 } }, `${lesson.words} words · ${lesson.source}`),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                  React.createElement("div", { style: { flex: 1, height: 5, background: t.surfaceAlt, borderRadius: 3, overflow: "hidden" } },
                    React.createElement("div", { style: { width: `${lesson.progress}%`, height: "100%", background: lesson.color, borderRadius: 3 } }),
                  ),
                  React.createElement("div", { style: { fontSize: 11, color: t.textSub, fontWeight: 600, minWidth: 30 } }, `${lesson.progress}%`),
                ),
              ),
            ),
            activeLesson === lesson.id && React.createElement("div", {
              style: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}` }
            },
              React.createElement("button", {
                onClick: (e) => { e.stopPropagation(); showNotif(`Starting ${lesson.title}!`); },
                style: {
                  width: "100%", padding: "11px 0",
                  background: lesson.color,
                  border: "none", borderRadius: 12,
                  color: "#fff", fontSize: 13, fontWeight: 700,
                  cursor: "pointer",
                }
              }, lesson.progress > 0 ? "Continue Lesson →" : "Start Lesson →"),
            ),
          )
        ),
      ),

      // Vocabulary list
      React.createElement("div", { style: { padding: "0 20px 100px" } },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 } }, "All Vocabulary"),
        vocabularyData.map(word =>
          React.createElement("div", {
            key: word.id,
            style: {
              background: t.card,
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 8,
              display: "flex", alignItems: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              border: `1px solid ${t.border}`,
            }
          },
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: t.text } }, word.word),
                word.due && React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: t.secondary } }),
              ),
              React.createElement("div", { style: { fontSize: 11, color: t.primary, marginBottom: 2 } }, word.roman),
              React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, `${word.meaning} · ${word.context}`),
            ),
            React.createElement("div", { style: { textAlign: "right" } },
              React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: word.mastery >= 80 ? t.accent : word.mastery >= 50 ? t.primary : t.secondary } }, `${word.mastery}%`),
              React.createElement("div", { style: { fontSize: 10, color: t.textMuted } }, word.lastSeen),
            ),
          )
        ),
      ),
    )
  );

  const PracticeScreen = () => (
    React.createElement("div", { style: { flex: 1, overflowY: "auto", background: t.bg } },
      React.createElement("div", { style: { padding: "16px 20px 10px", background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: t.text } }, "Speak & Practice"),
        React.createElement("div", { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, "Real-world scenario simulations"),
      ),

      selectedScenario
        ? React.createElement("div", { style: { padding: "0 0 100px" } },
            React.createElement("div", {
              style: {
                background: selectedScenario.color,
                padding: "20px 20px 28px",
              }
            },
              React.createElement("button", {
                onClick: () => { setSelectedScenario(null); setDialogStep(0); },
                style: { background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }
              }, Icon("ArrowLeft", 14, "#fff"), "Back"),
              React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: "#fff" } }, selectedScenario.title),
              React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4 } }, selectedScenario.desc),
            ),

            React.createElement("div", { style: { padding: "20px 20px 0" } },
              selectedScenario.lines.slice(0, dialogStep + 1).map((line, i) =>
                React.createElement("div", {
                  key: i,
                  style: {
                    display: "flex",
                    justifyContent: line.speaker === "you" ? "flex-end" : "flex-start",
                    marginBottom: 12,
                  }
                },
                  React.createElement("div", {
                    style: {
                      maxWidth: "78%",
                      background: line.speaker === "you" ? selectedScenario.color : t.card,
                      borderRadius: line.speaker === "you" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      padding: "10px 14px",
                      border: line.speaker === "you" ? "none" : `1px solid ${t.border}`,
                    }
                  },
                    React.createElement("div", { style: { fontSize: 12, color: line.speaker === "you" ? "rgba(255,255,255,0.7)" : t.textMuted, marginBottom: 3, fontWeight: 600 } }, line.speaker === "you" ? "You" : "Staff"),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: line.speaker === "you" ? "#fff" : t.text, marginBottom: 3 } }, line.text),
                    React.createElement("div", { style: { fontSize: 11, color: line.speaker === "you" ? "rgba(255,255,255,0.7)" : t.textSub } }, line.trans),
                  )
                )
              ),
            ),

            React.createElement("div", { style: { padding: "16px 20px" } },
              dialogStep < selectedScenario.lines.length - 1
                ? React.createElement("button", {
                    onClick: () => setDialogStep(s => s + 1),
                    style: {
                      width: "100%", padding: "14px 0",
                      background: selectedScenario.color,
                      border: "none", borderRadius: 14,
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      cursor: "pointer",
                    }
                  }, selectedScenario.lines[dialogStep + 1].speaker === "you" ? "🎤 Your Turn" : "Next →")
                : React.createElement("button", {
                    onClick: () => { showNotif("Scenario complete! Great job!"); setSelectedScenario(null); setDialogStep(0); },
                    style: {
                      width: "100%", padding: "14px 0",
                      background: t.primaryGrad,
                      border: "none", borderRadius: 14,
                      color: "#fff", fontSize: 14, fontWeight: 700,
                      cursor: "pointer",
                    }
                  }, "Complete! 🎉"),
            ),
          )
        : React.createElement("div", { style: { padding: "16px 20px 100px" } },
            scenarios.map(s =>
              React.createElement("div", {
                key: s.id,
                onClick: () => { setSelectedScenario(s); setDialogStep(0); },
                style: {
                  background: t.card,
                  borderRadius: 18,
                  overflow: "hidden",
                  marginBottom: 16,
                  boxShadow: t.shadow,
                  border: `1px solid ${t.border}`,
                  cursor: "pointer",
                }
              },
                React.createElement("div", { style: { background: `${s.color}18`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 } },
                  React.createElement("div", { style: { fontSize: 36 } }, s.icon),
                  React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 } }, s.title),
                    React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, s.desc),
                  ),
                ),
                React.createElement("div", {
                  style: {
                    padding: "10px 16px",
                    display: "flex", gap: 8,
                  }
                },
                  React.createElement("div", { style: { background: `${s.color}18`, color: s.color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 } }, s.difficulty),
                  React.createElement("div", { style: { background: t.surfaceAlt, color: t.textSub, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 } }, `⏱ ${s.duration}`),
                  React.createElement("div", { style: { background: t.surfaceAlt, color: t.textSub, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 } }, `${s.lines.length} lines`),
                ),
              )
            ),
          ),
    )
  );

  const ProgressScreen = () => (
    React.createElement("div", { style: { flex: 1, overflowY: "auto", background: t.bg } },
      React.createElement("div", { style: { padding: "16px 20px 10px", background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: t.text } }, "Your Progress"),
        React.createElement("div", { style: { fontSize: 12, color: t.textSub, marginTop: 2 } }, "Track your learning journey"),
      ),

      React.createElement("div", { style: { padding: "16px 20px 100px" } },
        // Stats row
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 20 } },
          [
            { label: "Words", value: "47", icon: "BookOpen", color: t.primary },
            { label: "Scans", value: "28", icon: "Camera", color: t.accent },
            { label: "Streak", value: "6d", icon: "Flame", color: "#FF9F43" },
          ].map((s, i) =>
            React.createElement("div", {
              key: i,
              style: {
                flex: 1, background: t.card,
                borderRadius: 16, padding: "14px 12px",
                textAlign: "center",
                boxShadow: t.shadow,
                border: `1px solid ${t.border}`,
              }
            },
              React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 8 } },
                Icon(s.icon, 20, s.color),
              ),
              React.createElement("div", { style: { fontSize: 22, fontWeight: 800, color: t.text } }, s.value),
              React.createElement("div", { style: { fontSize: 11, color: t.textSub, marginTop: 2 } }, s.label),
            )
          ),
        ),

        // Streak calendar
        React.createElement("div", {
          style: { background: t.card, borderRadius: 16, padding: "16px", marginBottom: 16, boxShadow: t.shadow, border: `1px solid ${t.border}` }
        },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 } }, "This Week"),
          React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "space-between" } },
            weekDays.map((d, i) =>
              React.createElement("div", { key: i, style: { flex: 1, textAlign: "center" } },
                React.createElement("div", {
                  style: {
                    width: "100%", aspectRatio: "1",
                    background: streakData[i] ? t.primaryGrad : t.surfaceAlt,
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 6,
                    fontSize: streakData[i] ? 14 : 0,
                  }
                }, streakData[i] ? "✓" : ""),
                React.createElement("div", { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, d),
              )
            ),
          ),
        ),

        // Mastery breakdown
        React.createElement("div", {
          style: { background: t.card, borderRadius: 16, padding: "16px", marginBottom: 16, boxShadow: t.shadow, border: `1px solid ${t.border}` }
        },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 } }, "Mastery Breakdown"),
          [
            { label: "Mastered (80%+)", count: vocabularyData.filter(v => v.mastery >= 80).length, color: t.accent },
            { label: "Learning (50-79%)", count: vocabularyData.filter(v => v.mastery >= 50 && v.mastery < 80).length, color: t.primary },
            { label: "Needs Practice", count: vocabularyData.filter(v => v.mastery < 50).length, color: t.secondary },
          ].map((item, i) =>
            React.createElement("div", { key: i, style: { marginBottom: 12 } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, item.label),
                React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: item.color } }, item.count),
              ),
              React.createElement("div", { style: { height: 6, background: t.surfaceAlt, borderRadius: 3, overflow: "hidden" } },
                React.createElement("div", { style: { width: `${(item.count / vocabularyData.length) * 100}%`, height: "100%", background: item.color, borderRadius: 3 } }),
              ),
            )
          ),
        ),

        // Location insights
        React.createElement("div", {
          style: { background: t.card, borderRadius: 16, padding: "16px", boxShadow: t.shadow, border: `1px solid ${t.border}` }
        },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 } }, "Location Insights"),
          [
            { place: "Café visits", words: 12, icon: "☕" },
            { place: "Transit stations", words: 8, icon: "🚇" },
            { place: "Markets & shops", words: 15, icon: "🛒" },
            { place: "Street signs", words: 7, icon: "🗺️" },
          ].map((loc, i) =>
            React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 } },
              React.createElement("div", { style: { width: 36, height: 36, background: t.surfaceAlt, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, loc.icon),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: t.text } }, loc.place),
                React.createElement("div", { style: { fontSize: 11, color: t.textSub } }, `${loc.words} words learned`),
              ),
              React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.primary } }, loc.words),
            )
          ),
        ),
      ),
    )
  );

  const SettingsScreen = () => (
    React.createElement("div", { style: { flex: 1, overflowY: "auto", background: t.bg } },
      React.createElement("div", { style: { padding: "16px 20px 10px", background: t.surface, borderBottom: `1px solid ${t.border}` } },
        React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: t.text } }, "Settings"),
      ),

      React.createElement("div", { style: { padding: "16px 20px 100px" } },
        // Profile
        React.createElement("div", {
          style: { background: t.primaryGrad, borderRadius: 18, padding: "18px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }
        },
          React.createElement("div", {
            style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }
          }, "👤"),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#fff" } }, "Alex Chen"),
            React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.8)" } }, "Learning Japanese · 47 words"),
          ),
        ),

        // Language selector
        React.createElement("div", {
          style: { background: t.card, borderRadius: 16, padding: "14px 16px", marginBottom: 12, boxShadow: t.shadow, border: `1px solid ${t.border}` }
        },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.textSub, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 } }, "Learning Language"),
          React.createElement("div", {
            onClick: () => setShowLangPicker(!showLangPicker),
            style: { display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }
          },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
              React.createElement("div", { style: { fontSize: 22 } }, selectedLang.flag),
              React.createElement("div", { style: { fontSize: 15, fontWeight: 600, color: t.text } }, selectedLang.label),
            ),
            Icon("ChevronDown", 16, t.textSub),
          ),
          showLangPicker && React.createElement("div", { style: { marginTop: 12, borderTop: `1px solid ${t.border}`, paddingTop: 12 } },
            langOptions.map(l =>
              React.createElement("div", {
                key: l.code,
                onClick: () => { setSelectedLang(l); setShowLangPicker(false); showNotif(`Language set to ${l.label}`); },
                style: {
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: selectedLang.code === l.code ? t.primaryLight : "transparent",
                  marginBottom: 4,
                }
              },
                React.createElement("div", { style: { fontSize: 20 } }, l.flag),
                React.createElement("div", { style: { fontSize: 14, fontWeight: selectedLang.code === l.code ? 700 : 400, color: selectedLang.code === l.code ? t.primary : t.text } }, l.label),
                selectedLang.code === l.code && React.createElement("div", { style: { marginLeft: "auto" } }, Icon("Check", 14, t.primary)),
              )
            ),
          ),
        ),

        // Theme toggle
        React.createElement("div", {
          style: { background: t.card, borderRadius: 16, padding: "14px 16px", marginBottom: 12, boxShadow: t.shadow, border: `1px solid ${t.border}` }
        },
          React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
              React.createElement("div", { style: { width: 36, height: 36, background: t.primaryLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" } },
                Icon(theme === "light" ? "Sun" : "Moon", 18, t.primary),
              ),
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: t.text } }, "Appearance"),
                React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, theme === "light" ? "Light mode" : "Dark mode"),
              ),
            ),
            React.createElement("button", {
              onClick: () => setTheme(th => th === "light" ? "dark" : "light"),
              style: {
                width: 50, height: 28,
                background: theme === "dark" ? t.primary : t.surfaceAlt,
                border: "none", borderRadius: 14,
                cursor: "pointer",
                position: "relative",
                transition: "background 0.3s",
              }
            },
              React.createElement("div", {
                style: {
                  position: "absolute",
                  top: 3, left: theme === "dark" ? 25 : 3,
                  width: 22, height: 22,
                  background: "#fff",
                  borderRadius: "50%",
                  transition: "left 0.3s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }
              })
            ),
          ),
        ),

        // Settings rows
        [
          { icon: "Bell", label: "Notifications", sub: "Daily reminders & reviews" },
          { icon: "Mic", label: "Pronunciation Practice", sub: "Voice recognition enabled" },
          { icon: "MapPin", label: "Location Insights", sub: "Auto-suggest by location" },
          { icon: "Download", label: "Offline Mode", sub: "Save lessons for offline use" },
        ].map((item, i) =>
          React.createElement("div", {
            key: i,
            onClick: () => showNotif(`${item.label} settings`),
            style: {
              background: t.card, borderRadius: 16, padding: "14px 16px",
              marginBottom: 12, boxShadow: t.shadow, border: `1px solid ${t.border}`,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
            }
          },
            React.createElement("div", { style: { width: 36, height: 36, background: t.primaryLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" } },
              Icon(item.icon, 18, t.primary),
            ),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: t.text } }, item.label),
              React.createElement("div", { style: { fontSize: 12, color: t.textSub } }, item.sub),
            ),
            Icon("ChevronRight", 16, t.textMuted),
          )
        ),

        React.createElement("div", { style: { textAlign: "center", marginTop: 8 } },
          React.createElement("div", { style: { fontSize: 12, color: t.textMuted } }, "LingoLens v1.0.0"),
        ),
      ),
    )
  );

  const tabs = [
    { id: "scan", label: "Scan", icon: "Camera" },
    { id: "learn", label: "Learn", icon: "BookOpen" },
    { id: "practice", label: "Practice", icon: "Mic" },
    { id: "progress", label: "Progress", icon: "TrendingUp" },
    { id: "settings", label: "Settings", icon: "Settings2" },
  ];

  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#E8E4F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "20px 0",
    }
  },
    // Font
    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `),

    // Phone frame
    React.createElement("div", {
      style: {
        width: 375,
        height: 812,
        background: t.bg,
        borderRadius: 50,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "background 0.3s",
      }
    },
      // Status bar
      React.createElement("div", {
        style: {
          height: 44,
          paddingTop: 14,
          paddingLeft: 28,
          paddingRight: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: t.surface,
          flexShrink: 0,
          position: "relative",
        }
      },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.statusBar } }, time),
        // Dynamic Island
        React.createElement("div", {
          style: {
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
            background: "#000",
            borderRadius: 20,
          }
        }),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, color: t.statusBar } },
          Icon("Wifi", 13, t.statusBar),
          Icon("Battery", 13, t.statusBar),
        ),
      ),

      // Notification toast
      notif && React.createElement("div", {
        style: {
          position: "absolute",
          top: 54,
          left: 20, right: 20,
          background: t.text,
          color: theme === "light" ? "#fff" : t.bg,
          fontSize: 13, fontWeight: 600,
          padding: "10px 16px",
          borderRadius: 14,
          zIndex: 100,
          textAlign: "center",
          animation: "slideUp 0.2s ease",
          boxShadow: t.shadow,
        }
      }, notif),

      // Content
      React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" } },
        tab === "scan" && React.createElement(ScanScreen),
        tab === "learn" && React.createElement(LearnScreen),
        tab === "practice" && React.createElement(PracticeScreen),
        tab === "progress" && React.createElement(ProgressScreen),
        tab === "settings" && React.createElement(SettingsScreen),
      ),

      // Bottom nav
      React.createElement("div", {
        style: {
          height: 80,
          background: t.navBg,
          borderTop: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          paddingBottom: 12,
          paddingTop: 8,
          flexShrink: 0,
          boxShadow: `0 -4px 20px rgba(0,0,0,0.06)`,
        }
      },
        tabs.map(tp =>
          React.createElement("button", {
            key: tp.id,
            onMouseDown: () => setPressedTab(tp.id),
            onMouseUp: () => setPressedTab(null),
            onClick: () => setTab(tp.id),
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
              transform: pressedTab === tp.id ? "scale(0.88)" : "scale(1)",
              transition: "transform 0.1s",
            }
          },
            tp.id === "scan"
              ? React.createElement("div", {
                  style: {
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: tab === "scan" ? t.primaryGrad : t.surfaceAlt,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: -18,
                    boxShadow: tab === "scan" ? "0 4px 14px rgba(108,63,232,0.4)" : "none",
                    border: `3px solid ${t.navBg}`,
                  }
                }, Icon("Camera", 20, tab === "scan" ? "#fff" : t.textMuted))
              : Icon(tp.icon, 22, tab === tp.id ? t.primary : t.textMuted),
            React.createElement("div", {
              style: {
                fontSize: 10,
                fontWeight: 600,
                color: tab === tp.id ? t.primary : t.textMuted,
              }
            }, tp.label),
          )
        ),
      ),
    ),
  );
}
