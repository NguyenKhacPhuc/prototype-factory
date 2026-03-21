const { useState, useEffect, useRef } = React;

function App() {
  const MapPin = window.lucide.MapPin;
  const Clock = window.lucide.Clock;
  const BookOpen = window.lucide.BookOpen;
  const Compass = window.lucide.Compass;
  const Star = window.lucide.Star;
  const Play = window.lucide.Play;
  const ChevronRight = window.lucide.ChevronRight;
  const Zap = window.lucide.Zap;
  const Moon = window.lucide.Moon;
  const Smile = window.lucide.Smile;
  const Shield = window.lucide.Shield;
  const Wind = window.lucide.Wind;
  const User = window.lucide.User;
  const ArrowLeft = window.lucide.ArrowLeft;
  const Check = window.lucide.Check;
  const Trophy = window.lucide.Trophy;

  const [activeTab, setActiveTab] = useState("home");
  const [prevTab, setPrevTab] = useState("home");
  const [storyScreen, setStoryScreen] = useState(false);
  const [selectedMood, setSelectedMood] = useState("calming");
  const [storyChoice, setStoryChoice] = useState(null);
  const [libraryTab, setLibraryTab] = useState("completed");
  const [pressedBtn, setPressedBtn] = useState(null);
  const [storyProgress, setStoryProgress] = useState(35);
  const [toggles, setToggles] = useState({ location: true, notifications: true, autoTime: false });

  const handleTabPress = (tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    setStoryScreen(false);
  };

  const handleStoryPlay = () => {
    setStoryScreen(true);
    setStoryChoice(null);
  };

  const handleBack = () => {
    setStoryScreen(false);
  };

  const handleChoice = (choice) => {
    setStoryChoice(choice);
    setStoryProgress(Math.min(100, storyProgress + 30));
  };

  const handleBtnPress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const moods = [
    { id: "funny", label: "Funny", emoji: "😄", color: "#F59E0B" },
    { id: "spooky", label: "Spooky", emoji: "👻", color: "#8B5CF6" },
    { id: "heroic", label: "Heroic", emoji: "⚔️", color: "#EF4444" },
    { id: "calming", label: "Calming", emoji: "🌊", color: "#06B6D4" },
  ];

  const recentStories = [
    { title: "Midnight in the Archive", genre: "Mystery", duration: "7 min", progress: 100 },
    { title: "The Coffee Shop Heist", genre: "Comedy", duration: "5 min", progress: 100 },
    { title: "Signal Lost", genre: "Sci-Fi", duration: "12 min", progress: 60 },
  ];

  const exploreCategories = [
    {
      id: "featured",
      label: "Featured",
      gradient: "linear-gradient(135deg, #7C3AED, #3B82F6)",
      stories: [{ title: "The Last Signal", duration: "8 min", plays: "2.4k" }],
    },
    {
      id: "spooky",
      label: "Spooky Stories",
      emoji: "👻",
      color: "#8B5CF6",
      stories: [
        { title: "The Third Knock", duration: "6 min", plays: "1.8k" },
        { title: "Room 13B", duration: "10 min", plays: "3.1k" },
        { title: "What the Fog Hides", duration: "8 min", plays: "956" },
      ],
    },
    {
      id: "scifi",
      label: "Sci-Fi Adventures",
      emoji: "🚀",
      color: "#3B82F6",
      stories: [
        { title: "The Last Signal", duration: "8 min", plays: "2.4k" },
        { title: "Colony Echo", duration: "12 min", plays: "1.2k" },
        { title: "Quantum Drift", duration: "5 min", plays: "889" },
      ],
    },
    {
      id: "mystery",
      label: "Mystery & Intrigue",
      emoji: "🔍",
      color: "#F59E0B",
      stories: [
        { title: "Midnight in the Archive", duration: "7 min", plays: "2.1k" },
        { title: "The Forger's Letter", duration: "9 min", plays: "1.5k" },
        { title: "Café Without Clocks", duration: "6 min", plays: "703" },
      ],
    },
    {
      id: "comedy",
      label: "Comedy Sketches",
      emoji: "😄",
      color: "#10B981",
      stories: [
        { title: "The Coffee Shop Heist", duration: "5 min", plays: "4.2k" },
        { title: "Wrong Number Chaos", duration: "4 min", plays: "3.7k" },
        { title: "The Interview", duration: "7 min", plays: "2.9k" },
      ],
    },
  ];

  const completedStories = [
    { title: "Midnight in the Archive", genre: "Mystery", duration: "7 min", rating: 5, date: "Mar 20" },
    { title: "The Coffee Shop Heist", genre: "Comedy", duration: "5 min", rating: 5, date: "Mar 19" },
    { title: "Wrong Number Chaos", genre: "Comedy", duration: "4 min", rating: 4, date: "Mar 18" },
    { title: "Colony Echo", genre: "Sci-Fi", duration: "12 min", rating: 4, date: "Mar 17" },
    { title: "The Third Knock", genre: "Spooky", duration: "6 min", rating: 5, date: "Mar 15" },
  ];

  const inProgressStories = [
    { title: "Signal Lost", genre: "Sci-Fi", duration: "12 min", progress: 60 },
    { title: "Room 13B", genre: "Spooky", duration: "10 min", progress: 25 },
  ];

  const achievements = [
    { label: "First Story", icon: "⭐", unlocked: true },
    { label: "Night Owl", icon: "🌙", unlocked: true },
    { label: "Explorer", icon: "🗺️", unlocked: true },
    { label: "Streak 7", icon: "🔥", unlocked: true },
    { label: "Comedy Fan", icon: "😄", unlocked: false },
    { label: "Sci-Fi Pro", icon: "🚀", unlocked: false },
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0A0A0F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      padding: "20px",
    },
    phone: {
      width: "375px",
      height: "812px",
      background: "#1A1025",
      borderRadius: "50px",
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 40px 80px rgba(124,58,237,0.3), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
      display: "flex",
      flexDirection: "column",
    },
    dynamicIsland: {
      position: "absolute",
      top: "12px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "120px",
      height: "34px",
      background: "#000",
      borderRadius: "20px",
      zIndex: 100,
    },
    statusBar: {
      height: "52px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      padding: "0 24px 8px",
      fontSize: "12px",
      fontWeight: "600",
      color: "rgba(255,255,255,0.9)",
      flexShrink: 0,
      zIndex: 10,
    },
    content: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      scrollbarWidth: "none",
    },
    bottomNav: {
      height: "80px",
      background: "rgba(26,16,37,0.95)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(124,58,237,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "0 16px 12px",
      flexShrink: 0,
      zIndex: 50,
    },
    navItem: (active) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      padding: "8px 16px",
      borderRadius: "16px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      background: active ? "rgba(124,58,237,0.15)" : "transparent",
    }),
    navLabel: (active) => ({
      fontSize: "10px",
      fontWeight: "600",
      color: active ? "#A78BFA" : "rgba(255,255,255,0.4)",
    }),
    screen: {
      padding: "0 0 16px",
      minHeight: "100%",
    },
    header: {
      padding: "16px 20px 20px",
    },
    locationRow: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "4px",
    },
    locationText: {
      fontSize: "13px",
      color: "#A78BFA",
      fontWeight: "500",
    },
    greeting: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#fff",
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.5)",
      marginTop: "4px",
    },
    section: {
      padding: "0 20px",
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "12px",
    },
    moodGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },
    moodCard: (mood, selected) => ({
      background: selected ? `rgba(${moodColorRgb(mood.color)}, 0.2)` : "rgba(255,255,255,0.05)",
      border: `1.5px solid ${selected ? mood.color : "rgba(255,255,255,0.08)"}`,
      borderRadius: "16px",
      padding: "14px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      transform: pressedBtn === `mood-${mood.id}` ? "scale(0.96)" : "scale(1)",
    }),
    moodEmoji: {
      fontSize: "22px",
    },
    moodLabel: (mood, selected) => ({
      fontSize: "14px",
      fontWeight: "600",
      color: selected ? mood.color : "rgba(255,255,255,0.7)",
    }),
    featuredCard: {
      background: "linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(59,130,246,0.4) 100%)",
      border: "1px solid rgba(124,58,237,0.4)",
      borderRadius: "20px",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
    },
    featuredGlow: {
      position: "absolute",
      top: "-20px",
      right: "-20px",
      width: "120px",
      height: "120px",
      background: "rgba(124,58,237,0.3)",
      borderRadius: "50%",
      filter: "blur(30px)",
    },
    featuredTag: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      background: "rgba(124,58,237,0.4)",
      borderRadius: "8px",
      padding: "4px 10px",
      fontSize: "11px",
      fontWeight: "600",
      color: "#A78BFA",
      marginBottom: "10px",
    },
    featuredTitle: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#fff",
      marginBottom: "6px",
    },
    featuredDesc: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.65)",
      lineHeight: "1.5",
      marginBottom: "16px",
    },
    featuredMeta: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    metaChip: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "12px",
      color: "rgba(255,255,255,0.6)",
    },
    playBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
      borderRadius: "14px",
      padding: "12px 20px",
      fontSize: "15px",
      fontWeight: "700",
      color: "#fff",
      cursor: "pointer",
      border: "none",
      transform: pressedBtn === "play-main" ? "scale(0.96)" : "scale(1)",
      transition: "transform 0.15s ease",
      boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
    },
    recentCard: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "14px",
      marginBottom: "8px",
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    recentIcon: (genre) => ({
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: genreGradient(genre),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      flexShrink: 0,
    }),
    storyScreen: {
      flex: 1,
      background: "linear-gradient(180deg, #0D0818 0%, #1A1025 100%)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 200,
      display: "flex",
      flexDirection: "column",
      transition: "opacity 0.3s ease",
    },
    storyHeader: {
      padding: "56px 20px 16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    backBtn: {
      width: "38px",
      height: "38px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      flexShrink: 0,
    },
    storyTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#fff",
    },
    progressBar: (pct) => ({
      height: "3px",
      background: "rgba(255,255,255,0.1)",
      margin: "0 20px 16px",
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
    }),
    progressFill: (pct) => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: `${pct}%`,
      height: "100%",
      background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
      borderRadius: "2px",
      transition: "width 0.5s ease",
    }),
    atmosphereBar: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "0 20px 20px",
      padding: "10px 14px",
      background: "rgba(124,58,237,0.1)",
      borderRadius: "12px",
      border: "1px solid rgba(124,58,237,0.2)",
    },
    atmosphereText: {
      fontSize: "12px",
      color: "#A78BFA",
      fontWeight: "500",
    },
    storyBody: {
      flex: 1,
      padding: "0 20px",
      overflowY: "auto",
      scrollbarWidth: "none",
    },
    storyParagraph: {
      fontSize: "16px",
      lineHeight: "1.8",
      color: "rgba(255,255,255,0.85)",
      marginBottom: "20px",
    },
    choiceSection: {
      padding: "16px 20px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    choiceLabel: {
      fontSize: "12px",
      fontWeight: "600",
      color: "rgba(255,255,255,0.4)",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      marginBottom: "10px",
    },
    choiceBtn: (selected, id) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "16px",
      marginBottom: "8px",
      cursor: "pointer",
      border: `1.5px solid ${selected ? "#7C3AED" : "rgba(255,255,255,0.1)"}`,
      background: selected ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
      transition: "all 0.2s ease",
      transform: pressedBtn === id ? "scale(0.98)" : "scale(1)",
    }),
    choiceBtnText: (selected) => ({
      fontSize: "14px",
      fontWeight: "600",
      color: selected ? "#A78BFA" : "rgba(255,255,255,0.8)",
      flex: 1,
    }),
    exploreScreen: {
      padding: "0 0 16px",
    },
    exploreHeader: {
      padding: "16px 20px 20px",
    },
    categoryTitle: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#fff",
    },
    featuredExplore: {
      margin: "0 20px 20px",
      background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
      borderRadius: "20px",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
    },
    exploreCategory: {
      margin: "0 20px 20px",
    },
    categoryHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    categoryName: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
    },
    seeAll: {
      fontSize: "13px",
      color: "#7C3AED",
      fontWeight: "600",
    },
    storyItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "14px",
      marginBottom: "6px",
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    storyItemIcon: (color) => ({
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      background: `${color}22`,
      border: `1px solid ${color}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      flexShrink: 0,
    }),
    storyItemTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#fff",
      flex: 1,
    },
    storyItemMeta: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.4)",
    },
    libraryScreen: {
      padding: "0 0 16px",
    },
    libHeader: {
      padding: "16px 20px 0",
    },
    statsRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    statCard: {
      flex: 1,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px",
      padding: "12px 10px",
      textAlign: "center",
    },
    statNum: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#A78BFA",
    },
    statLabel: {
      fontSize: "10px",
      color: "rgba(255,255,255,0.4)",
      fontWeight: "600",
      marginTop: "2px",
    },
    tabRow: {
      display: "flex",
      gap: "4px",
      padding: "4px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "12px",
      marginBottom: "16px",
    },
    tabBtn: (active) => ({
      flex: 1,
      padding: "8px",
      borderRadius: "10px",
      background: active ? "rgba(124,58,237,0.4)" : "transparent",
      border: "none",
      fontSize: "13px",
      fontWeight: "600",
      color: active ? "#A78BFA" : "rgba(255,255,255,0.4)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    completedCard: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "14px",
      marginBottom: "8px",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    completedIcon: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: "rgba(124,58,237,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    completedTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#fff",
      marginBottom: "3px",
    },
    completedMeta: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.4)",
      marginBottom: "5px",
    },
    starsRow: {
      display: "flex",
      gap: "2px",
    },
    inProgressCard: {
      padding: "14px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "14px",
      marginBottom: "8px",
      border: "1px solid rgba(124,58,237,0.2)",
    },
    inProgressTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px",
    },
    inProgressBar: (pct) => ({
      height: "4px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "2px",
      overflow: "hidden",
    }),
    inProgressFill: (pct) => ({
      width: `${pct}%`,
      height: "100%",
      background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
      borderRadius: "2px",
    }),
    profileScreen: {
      padding: "0 0 16px",
    },
    profileHeader: {
      padding: "16px 20px 24px",
      textAlign: "center",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "26px",
      background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      fontWeight: "800",
      color: "#fff",
      margin: "0 auto 14px",
      boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
    },
    profileName: {
      fontSize: "22px",
      fontWeight: "800",
      color: "#fff",
      marginBottom: "4px",
    },
    profileSub: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.4)",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      margin: "0 20px 24px",
    },
    profileStatCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "16px",
    },
    profileStatNum: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#A78BFA",
      marginBottom: "2px",
    },
    profileStatLabel: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.5)",
      fontWeight: "500",
    },
    badgesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      margin: "0 20px 24px",
    },
    badge: (unlocked) => ({
      background: unlocked ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${unlocked ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: "14px",
      padding: "14px 10px",
      textAlign: "center",
      opacity: unlocked ? 1 : 0.4,
    }),
    badgeEmoji: {
      fontSize: "24px",
      marginBottom: "6px",
    },
    badgeLabel: {
      fontSize: "11px",
      fontWeight: "600",
      color: "rgba(255,255,255,0.7)",
    },
    settingsSection: {
      margin: "0 20px",
    },
    settingRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    settingLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#fff",
    },
    settingDesc: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.4)",
      marginTop: "2px",
    },
    toggle: (on) => ({
      width: "44px",
      height: "26px",
      borderRadius: "13px",
      background: on ? "#7C3AED" : "rgba(255,255,255,0.15)",
      position: "relative",
      cursor: "pointer",
      transition: "background 0.2s ease",
      flexShrink: 0,
    }),
    toggleThumb: (on) => ({
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      position: "absolute",
      top: "3px",
      left: on ? "21px" : "3px",
      transition: "left 0.2s ease",
      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    }),
  };

  function moodColorRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  function genreGradient(genre) {
    const map = {
      Mystery: "linear-gradient(135deg, #F59E0B44, #B45309)",
      Comedy: "linear-gradient(135deg, #10B98144, #059669)",
      "Sci-Fi": "linear-gradient(135deg, #3B82F644, #1D4ED8)",
      Spooky: "linear-gradient(135deg, #8B5CF644, #6D28D9)",
      Calming: "linear-gradient(135deg, #06B6D444, #0284C7)",
    };
    return map[genre] || "linear-gradient(135deg, #7C3AED44, #4C1D95)";
  }

  function genreEmoji(genre) {
    const map = { Mystery: "🔍", Comedy: "😄", "Sci-Fi": "🚀", Spooky: "👻", Calming: "🌊" };
    return map[genre] || "📖";
  }

  const renderStars = (count) =>
    [1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={12} fill={i <= count ? "#F59E0B" : "none"} color={i <= count ? "#F59E0B" : "rgba(255,255,255,0.2)"} />
    ));

  const renderHomeScreen = () => (
    <div style={styles.screen}>
      <div style={styles.header}>
        <div style={styles.locationRow}>
          <MapPin size={13} color="#A78BFA" />
          <span style={styles.locationText}>Downtown Coffee District</span>
        </div>
        <div style={styles.greeting}>Good afternoon, Alex 👋</div>
        <div style={styles.subtitle}>You have ~8 minutes. Let's go on an adventure.</div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>How are you feeling?</div>
        <div style={styles.moodGrid}>
          {moods.map((mood) => (
            <div
              key={mood.id}
              style={styles.moodCard(mood, selectedMood === mood.id)}
              onClick={() => {
                handleBtnPress(`mood-${mood.id}`);
                setSelectedMood(mood.id);
              }}
            >
              <span style={styles.moodEmoji}>{mood.emoji}</span>
              <span style={styles.moodLabel(mood, selectedMood === mood.id)}>{mood.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Generated For This Moment</div>
        <div style={styles.featuredCard} onClick={handleStoryPlay}>
          <div style={styles.featuredGlow} />
          <div style={styles.featuredTag}>
            <Zap size={10} />
            AI-Crafted for You
          </div>
          <div style={styles.featuredTitle}>The Last Signal</div>
          <div style={styles.featuredDesc}>
            A distress call from an orbital station. Only you can decode what's really being transmitted — before the window closes.
          </div>
          <div style={styles.featuredMeta}>
            <div style={styles.metaChip}>
              <Clock size={12} color="#A78BFA" />
              <span>8 min</span>
            </div>
            <div style={styles.metaChip}>
              <MapPin size={12} color="#A78BFA" />
              <span>Sci-Fi</span>
            </div>
            <div style={styles.metaChip}>
              <Star size={12} color="#A78BFA" />
              <span>4.8</span>
            </div>
          </div>
          <button
            style={styles.playBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleBtnPress("play-main");
              handleStoryPlay();
            }}
          >
            <Play size={16} fill="#fff" />
            Start Story
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recently Played</div>
        {recentStories.map((story, i) => (
          <div key={i} style={styles.recentCard} onClick={handleStoryPlay}>
            <div style={styles.recentIcon(story.genre)}>
              <span>{genreEmoji(story.genre)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "3px" }}>{story.title}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                {story.genre} • {story.duration}
              </div>
            </div>
            {story.progress === 100 ? (
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(16,185,129,0.2)", border: "1.5px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={12} color="#10B981" />
              </div>
            ) : (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "#A78BFA", fontWeight: "600", marginBottom: "4px" }}>{story.progress}%</div>
                <div style={{ width: "48px", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${story.progress}%`, height: "100%", background: "#7C3AED", borderRadius: "2px" }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStoryScreenContent = () => (
    <div style={styles.storyScreen}>
      <div style={styles.dynamicIsland} />
      <div style={{ ...styles.statusBar, paddingTop: "52px" }}>
        <span>9:41</span>
        <span>●●● WiFi ■■■</span>
      </div>
      <div style={styles.storyHeader}>
        <button style={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={18} color="#fff" />
        </button>
        <div>
          <div style={styles.storyTitle}>The Last Signal</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Chapter 1 of 3</div>
        </div>
      </div>

      <div style={styles.progressBar(storyProgress)}>
        <div style={styles.progressFill(storyProgress)} />
      </div>

      <div style={styles.atmosphereBar}>
        <MapPin size={12} color="#A78BFA" />
        <span style={styles.atmosphereText}>Downtown</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
        <Moon size={12} color="#A78BFA" />
        <span style={styles.atmosphereText}>Rainy Mood</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
        <Clock size={12} color="#A78BFA" />
        <span style={styles.atmosphereText}>8 min</span>
      </div>

      <div style={styles.storyBody}>
        {!storyChoice ? (
          <>
            <p style={styles.storyParagraph}>
              The terminal flickered twice before stabilizing. Lieutenant Yara pressed her palm against the cold observation glass, watching the rain streak silently across the station's outer hull. Three days since contact with Earth. Three days of static, false starts, and dead frequencies.
            </p>
            <p style={styles.storyParagraph}>
              Then it came — fragmented, barely a whisper through the interference. <em style={{ color: "#A78BFA" }}>"...frequency seven... do not respond... they are listening..."</em> Yara's fingers hovered over the transmitter panel. The message repeated every four minutes, always the same, always cutting out before the coordinates.
            </p>
            <p style={styles.storyParagraph}>
              She had two options. The maintenance shaft behind Bay 7 led to the old emergency relay — an analog booster powerful enough to punch through the jamming. But it meant leaving the bridge exposed for eleven minutes. Or she could try to boost the signal from here, risky, visible to whoever — or whatever — was listening.
            </p>
          </>
        ) : storyChoice === "boost" ? (
          <>
            <p style={styles.storyParagraph}>
              Yara activated the signal booster. The console lit up like a sunrise, power flooding the transmission array. For three agonizing seconds, nothing. Then the static dissolved and a voice — clear, unmistakably human — broke through.
            </p>
            <p style={styles.storyParagraph}>
              <em style={{ color: "#A78BFA" }}>"Station Echo-7, we see you. We've been waiting. Don't trust the AI navigation system — it's been compromised since Day One. Lock it out and use manual controls. We're sending extraction coordinates now."</em>
            </p>
            <p style={styles.storyParagraph}>
              The coordinates streamed in. But before Yara could process them, the lights died. In the sudden darkness, she heard the soft mechanical whirr of the station's AI core — spinning up.
            </p>
          </>
        ) : (
          <>
            <p style={styles.storyParagraph}>
              The maintenance shaft was colder than she remembered. Yara moved fast, pulling herself hand-over-hand through the zero-G passage, her breath fogging in the recycled air. Bay 7 felt like another planet — silent, abandoned since the second supply failure.
            </p>
            <p style={styles.storyParagraph}>
              The analog relay coughed to life on the third try, its vacuum tubes glowing amber in the dark. She wasn't transmitting — just listening, letting the old equipment filter out the noise the digital systems couldn't. And then she heard it clearly for the first time.
            </p>
            <p style={styles.storyParagraph}>
              Not a distress call. A warning. And the voice was hers.
            </p>
          </>
        )}
      </div>

      {!storyChoice ? (
        <div style={styles.choiceSection}>
          <div style={styles.choiceLabel}>What do you do?</div>
          <div
            style={styles.choiceBtn(false, "choice-boost")}
            onClick={() => {
              handleBtnPress("choice-boost");
              handleChoice("boost");
            }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Zap size={14} color="#A78BFA" />
            </div>
            <span style={styles.choiceBtnText(false)}>Try to boost the signal</span>
            <ChevronRight size={16} color="rgba(255,255,255,0.3)" />
          </div>
          <div
            style={styles.choiceBtn(false, "choice-shaft")}
            onClick={() => {
              handleBtnPress("choice-shaft");
              handleChoice("shaft");
            }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Wind size={14} color="#60A5FA" />
            </div>
            <span style={styles.choiceBtnText(false)}>Escape through the maintenance shaft</span>
            <ChevronRight size={16} color="rgba(255,255,255,0.3)" />
          </div>
        </div>
      ) : (
        <div style={styles.choiceSection}>
          <button
            style={{ ...styles.playBtn, width: "100%", justifyContent: "center" }}
            onClick={() => {
              handleBtnPress("continue");
              setStoryProgress(Math.min(100, storyProgress + 20));
            }}
          >
            <Play size={16} fill="#fff" />
            Continue Story
          </button>
        </div>
      )}
    </div>
  );

  const renderExploreScreen = () => (
    <div style={styles.exploreScreen}>
      <div style={styles.exploreHeader}>
        <div style={{ fontSize: "13px", color: "#A78BFA", fontWeight: "500", marginBottom: "4px" }}>Discover</div>
        <div style={styles.categoryTitle}>Story Universe</div>
      </div>

      <div style={styles.featuredExplore} onClick={handleStoryPlay}>
        <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "140px", height: "140px", background: "rgba(255,255,255,0.08)", borderRadius: "50%" }} />
        <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>🌟 Staff Pick</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>The Last Signal</div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "14px", lineHeight: "1.5" }}>
          An orbital mystery that adapts to your location. No two plays are the same.
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>⏱ 8 min</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>▶ 2.4k plays</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "10px", padding: "6px 14px", fontSize: "13px", fontWeight: "700", color: "#fff" }}>Play</div>
        </div>
      </div>

      {exploreCategories.slice(1).map((cat) => (
        <div key={cat.id} style={styles.exploreCategory}>
          <div style={styles.categoryHeader}>
            <div style={styles.categoryName}>
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </div>
            <span style={styles.seeAll}>See all</span>
          </div>
          {cat.stories.map((story, i) => (
            <div key={i} style={styles.storyItem} onClick={handleStoryPlay}>
              <div style={styles.storyItemIcon(cat.color)}>
                <span>{cat.emoji}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.storyItemTitle}>{story.title}</div>
                <div style={styles.storyItemMeta}>{story.duration} · {story.plays} plays</div>
              </div>
              <Play size={16} color="rgba(255,255,255,0.3)" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderLibraryScreen = () => (
    <div style={styles.libraryScreen}>
      <div style={styles.libHeader}>
        <div style={{ fontSize: "13px", color: "#A78BFA", fontWeight: "500", marginBottom: "4px" }}>Your Collection</div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", marginBottom: "16px" }}>Story Library</div>
        <div style={styles.statsRow}>
          {[
            { num: "12", label: "Stories" },
            { num: "94m", label: "Read" },
            { num: "3", label: "Day Streak" },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statNum}>{s.num}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={styles.tabRow}>
          <button style={styles.tabBtn(libraryTab === "completed")} onClick={() => setLibraryTab("completed")}>
            Completed ({completedStories.length})
          </button>
          <button style={styles.tabBtn(libraryTab === "progress")} onClick={() => setLibraryTab("progress")}>
            In Progress ({inProgressStories.length})
          </button>
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {libraryTab === "completed"
          ? completedStories.map((story, i) => (
              <div key={i} style={styles.completedCard}>
                <div style={styles.completedIcon}>
                  <span style={{ fontSize: "18px" }}>{genreEmoji(story.genre)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={styles.completedTitle}>{story.title}</div>
                  <div style={styles.completedMeta}>{story.genre} · {story.duration} · {story.date}</div>
                  <div style={styles.starsRow}>{renderStars(story.rating)}</div>
                </div>
                <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
              </div>
            ))
          : inProgressStories.map((story, i) => (
              <div key={i} style={styles.inProgressCard}>
                <div style={styles.inProgressTop}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "3px" }}>{story.title}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{story.genre} · {story.duration}</div>
                  </div>
                  <button
                    style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)", borderRadius: "10px", padding: "6px 14px", fontSize: "13px", fontWeight: "600", color: "#A78BFA", cursor: "pointer" }}
                    onClick={handleStoryPlay}
                  >
                    Resume
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={styles.inProgressBar(story.progress)}>
                    <div style={styles.inProgressFill(story.progress)} />
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#A78BFA", flexShrink: 0, minWidth: "32px" }}>{story.progress}%</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );

  const renderProfileScreen = () => (
    <div style={styles.profileScreen}>
      <div style={styles.profileHeader}>
        <div style={styles.avatar}>AC</div>
        <div style={styles.profileName}>Alex Chen</div>
        <div style={styles.profileSub}>Story Explorer · Member since Jan 2026</div>
      </div>

      <div style={styles.statsGrid}>
        {[
          { num: "24", label: "Stories Completed" },
          { num: "186m", label: "Total Read Time" },
          { num: "7", label: "Day Streak 🔥" },
          { num: "5", label: "Genres Explored" },
        ].map((s, i) => (
          <div key={i} style={styles.profileStatCard}>
            <div style={styles.profileStatNum}>{s.num}</div>
            <div style={styles.profileStatLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        <div style={styles.sectionTitle}>Achievements</div>
        <div style={styles.badgesGrid}>
          {achievements.map((a, i) => (
            <div key={i} style={styles.badge(a.unlocked)}>
              <div style={styles.badgeEmoji}>{a.icon}</div>
              <div style={styles.badgeLabel}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px 16px" }}>
        <div style={styles.sectionTitle}>Mood Preferences</div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
          {[
            { label: "Comedy", pct: 42, color: "#10B981", emoji: "😄" },
            { label: "Sci-Fi", pct: 28, color: "#3B82F6", emoji: "🚀" },
            { label: "Mystery", pct: 18, color: "#F59E0B", emoji: "🔍" },
            { label: "Spooky", pct: 12, color: "#8B5CF6", emoji: "👻" },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? "12px" : "0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "14px" }}>{m.emoji}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.8)" }}>{m.label}</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: m.color }}>{m.pct}%</span>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${m.pct}%`, height: "100%", background: m.color, borderRadius: "3px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.settingsSection}>
        <div style={styles.sectionTitle}>Settings</div>
        {[
          { key: "location", label: "Location Access", desc: "Adapts stories to your surroundings" },
          { key: "notifications", label: "Notifications", desc: "Story recommendations & reminders" },
          { key: "autoTime", label: "Auto-adjust Time", desc: "Automatically detect available time" },
        ].map((s) => (
          <div key={s.key} style={styles.settingRow}>
            <div>
              <div style={styles.settingLabel}>{s.label}</div>
              <div style={styles.settingDesc}>{s.desc}</div>
            </div>
            <div
              style={styles.toggle(toggles[s.key])}
              onClick={() => setToggles((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
            >
              <div style={styles.toggleThumb(toggles[s.key])} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const navItems = [
    { id: "home", label: "Home", Icon: Compass },
    { id: "explore", label: "Explore", Icon: Zap },
    { id: "library", label: "Library", Icon: BookOpen },
    { id: "profile", label: "Profile", Icon: User },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={styles.phone}>
        <div style={styles.dynamicIsland} />

        {storyScreen ? (
          renderStoryScreenContent()
        ) : (
          <>
            <div style={styles.statusBar}>
              <span>9:41</span>
              <span style={{ opacity: 0 }}>.</span>
              <span>●●● WiFi ■■■</span>
            </div>

            <div style={styles.content}>
              {activeTab === "home" && renderHomeScreen()}
              {activeTab === "explore" && renderExploreScreen()}
              {activeTab === "library" && renderLibraryScreen()}
              {activeTab === "profile" && renderProfileScreen()}
            </div>

            <div style={styles.bottomNav}>
              {navItems.map(({ id, label, Icon }) => (
                <div key={id} style={styles.navItem(activeTab === id)} onClick={() => handleTabPress(id)}>
                  <Icon size={22} color={activeTab === id ? "#A78BFA" : "rgba(255,255,255,0.35)"} />
                  <span style={styles.navLabel(activeTab === id)}>{label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
