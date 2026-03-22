const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: "#F4F2FF",
    surface: "#FFFFFF",
    surfaceAlt: "#F0EDFF",
    card: "#FFFFFF",
    cardBorder: "#E8E3FF",
    text: "#1A1433",
    textSecondary: "#6B5F8A",
    textMuted: "#9E93B8",
    primary: "#6D28D9",
    primaryLight: "#EDE9FE",
    primaryGradient: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)",
    accent: "#EC4899",
    accentLight: "#FDF2F8",
    success: "#059669",
    successLight: "#ECFDF5",
    warning: "#D97706",
    navBg: "#FFFFFF",
    navBorder: "#EDE9FE",
    inputBg: "#F8F6FF",
    inputBorder: "#DDD6FE",
    tag: "#EDE9FE",
    tagText: "#6D28D9",
    shadow: "rgba(109, 40, 217, 0.12)",
  },
  dark: {
    bg: "#0F0A1E",
    surface: "#1A1130",
    surfaceAlt: "#211840",
    card: "#1E1535",
    cardBorder: "#2D2050",
    text: "#F0EAFF",
    textSecondary: "#B8A9D9",
    textMuted: "#7A6E99",
    primary: "#A78BFA",
    primaryLight: "#2D1F5A",
    primaryGradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    accent: "#F472B6",
    accentLight: "#2D1030",
    success: "#34D399",
    successLight: "#0A2E22",
    warning: "#FBBF24",
    navBg: "#1A1130",
    navBorder: "#2D2050",
    inputBg: "#150E28",
    inputBorder: "#3B2D6A",
    tag: "#2D1F5A",
    tagText: "#A78BFA",
    shadow: "rgba(0,0,0,0.5)",
  },
};

const moodDatabase = [
  {
    id: "calm",
    label: "Calm & Reassuring",
    emoji: "🌿",
    keywords: ["wellness", "calm", "peaceful", "relax", "gentle", "soft", "healing", "mindful"],
    palette: ["#5B8DB8", "#89B4D4", "#B8D4E8", "#E8F4FA", "#2E5F7A"],
    fonts: { heading: "Lora", body: "Source Serif 4" },
    spacing: "Generous",
    tone: "Soft, inviting, trustworthy",
    why: "Cool blues and generous whitespace signal safety and openness. Serif fonts add warmth and humanity.",
    score: { trust: 90, energy: 25, urgency: 15, premium: 60 },
  },
  {
    id: "urgent",
    label: "Urgent & Bold",
    emoji: "⚡",
    keywords: ["urgent", "fundrais", "emergency", "now", "critical", "important", "deadline", "act"],
    palette: ["#DC2626", "#F97316", "#FEF3C7", "#1F2937", "#FBBF24"],
    fonts: { heading: "Oswald", body: "Inter" },
    spacing: "Compact",
    tone: "High-contrast, action-driven",
    why: "Red and orange create urgency and motion. Bold condensed type demands attention. High contrast ensures nothing is missed.",
    score: { trust: 40, energy: 95, urgency: 98, premium: 20 },
  },
  {
    id: "premium",
    label: "Premium & Refined",
    emoji: "✨",
    keywords: ["luxury", "premium", "exclusive", "elegant", "sophisticated", "high-end", "boutique"],
    palette: ["#1C1C1E", "#8B7355", "#D4B896", "#F5F0E8", "#6B5B45"],
    fonts: { heading: "Playfair Display", body: "Cormorant Garamond" },
    spacing: "Expansive",
    tone: "Understated, confident, timeless",
    why: "Neutral charcoals with warm gold accents signal quality without shouting. Generous spacing lets the message breathe.",
    score: { trust: 75, energy: 30, urgency: 10, premium: 97 },
  },
  {
    id: "energetic",
    label: "Energetic & Playful",
    emoji: "🚀",
    keywords: ["fun", "play", "energe", "excit", "vibrant", "bold", "youth", "sport", "active", "launch"],
    palette: ["#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#1F1B4B"],
    fonts: { heading: "Righteous", body: "Nunito" },
    spacing: "Dynamic",
    tone: "Vibrant, expressive, forward-moving",
    why: "Multi-hue palettes create excitement and energy. Rounded, friendly type keeps things approachable.",
    score: { trust: 55, energy: 92, urgency: 60, premium: 35 },
  },
  {
    id: "trustworthy",
    label: "Trustworthy & Professional",
    emoji: "🏛️",
    keywords: ["trust", "professional", "reliable", "corporate", "business", "secure", "finance", "legal"],
    palette: ["#1E3A5F", "#2E6DA4", "#5B9BD5", "#EBF4FF", "#0F2440"],
    fonts: { heading: "Merriweather", body: "IBM Plex Sans" },
    spacing: "Structured",
    tone: "Steady, authoritative, dependable",
    why: "Deep navy with structured layout conveys expertise. Traditional serif headings reinforce credibility and stability.",
    score: { trust: 97, energy: 35, urgency: 30, premium: 70 },
  },
  {
    id: "reflective",
    label: "Reflective & Poetic",
    emoji: "🌙",
    keywords: ["reflect", "poetic", "memoir", "story", "journal", "personal", "intimate", "quiet"],
    palette: ["#4A3560", "#7B5EA7", "#C4A8E0", "#F5F0FF", "#2A1E40"],
    fonts: { heading: "EB Garamond", body: "Lora" },
    spacing: "Breathable",
    tone: "Introspective, warm, human",
    why: "Muted purples and soft lavenders create an introspective atmosphere. Classic serifs invite slow reading and contemplation.",
    score: { trust: 70, energy: 20, urgency: 5, premium: 65 },
  },
];

const savedPresets = [
  { id: 1, name: "Wellness Brand Kit", mood: "calm", lastUsed: "2 days ago", formats: ["Instagram", "Flyer"] },
  { id: 2, name: "Campaign Launch", mood: "urgent", lastUsed: "1 week ago", formats: ["Banner", "Email"] },
  { id: 3, name: "Portfolio Site", mood: "premium", lastUsed: "3 days ago", formats: ["Web", "Deck"] },
];

const formatPreviews = [
  { id: "social", label: "Social Post", icon: "Image", aspect: "1:1" },
  { id: "flyer", label: "Flyer", icon: "FileText", aspect: "A4" },
  { id: "banner", label: "Web Banner", icon: "Monitor", aspect: "16:5" },
  { id: "deck", label: "Pitch Deck", icon: "Presentation", aspect: "16:9" },
];

function StatusBar({ theme }) {
  const t = themes[theme];
  const [time, setTime] = useState(() => {
    const d = new Date();
    return d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
  });
  const WifiIcon = window.lucide.Wifi;
  const BatteryIcon = window.lucide.Battery;
  const SignalIcon = window.lucide.Signal;
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px 6px", position:"relative", zIndex:10 }}>
      <span style={{ fontSize:15, fontWeight:700, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{time}</span>
      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        <SignalIcon size={14} color={t.text} />
        <WifiIcon size={14} color={t.text} />
        <BatteryIcon size={16} color={t.text} />
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:120, height:34, background:"#000", borderRadius:20, zIndex:100 }} />
  );
}

function MoodBar({ label, value, color }) {
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:11, fontWeight:600, color:"#888" }}>{label}</span>
        <span style={{ fontSize:11, fontWeight:700, color }}>{value}%</span>
      </div>
      <div style={{ background:"#f0f0f0", borderRadius:4, height:5, overflow:"hidden" }}>
        <div style={{ width: value+"%", height:"100%", background: color, borderRadius:4, transition:"width 0.8s ease" }} />
      </div>
    </div>
  );
}

function ColorSwatch({ color, size = 36 }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: size, height: size, borderRadius: 10, background: color,
        cursor:"pointer", transform: pressed ? "scale(0.9)" : "scale(1)",
        transition:"transform 0.15s ease", boxShadow:"0 2px 8px rgba(0,0,0,0.15)"
      }}
      title={color}
    />
  );
}

function HomeScreen({ theme, onAnalyze, analyzedMood, setAnalyzedMood }) {
  const t = themes[theme];
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const SparklesIcon = window.lucide.Sparkles;
  const ImageIcon = window.lucide.Image;
  const TypeIcon = window.lucide.Type;
  const SendIcon = window.lucide.Send;
  const ZapIcon = window.lucide.Zap;

  const exampleTexts = [
    "We're launching a fundraising campaign for clean water access in underserved communities.",
    "A new meditation app for busy professionals who need calm in their daily routine.",
    "Exclusive limited-edition sneakers for collectors who appreciate craftsmanship.",
  ];

  const detectMood = (text) => {
    const lower = text.toLowerCase();
    for (const mood of moodDatabase) {
      for (const kw of mood.keywords) {
        if (lower.includes(kw)) return mood;
      }
    }
    return moodDatabase[0];
  };

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const mood = detectMood(inputText);
      setAnalyzedMood(mood);
      setIsAnalyzing(false);
      onAnalyze(mood);
    }, 1400);
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"8px 0 16px" }}>
      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ fontSize:22, fontWeight:800, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", lineHeight:1.2, marginBottom:4 }}>
          What's the<br />
          <span style={{ background: t.primaryGradient, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>emotional intent?</span>
        </div>
        <div style={{ fontSize:13, color: t.textMuted, lineHeight:1.5 }}>
          Describe your project, paste a caption, or upload a photo. We'll translate it into a visual language.
        </div>
      </div>

      <div style={{ display:"flex", gap:8, padding:"0 20px 16px" }}>
        {[{id:"text", label:"Text", icon: TypeIcon},{id:"photo", label:"Photo", icon: ImageIcon}].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:20,
              border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans', sans-serif",
              background: activeTab===tab.id ? t.primary : t.surfaceAlt,
              color: activeTab===tab.id ? "#fff" : t.textSecondary,
              transition:"all 0.2s ease"
            }}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ background: t.inputBg, border:`1.5px solid ${t.inputBorder}`, borderRadius:16, padding:16, position:"relative" }}>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="e.g. 'A fundraising campaign for clean water access in rural communities — needs to feel urgent and hopeful...'"
            style={{
              width:"100%", minHeight:100, background:"transparent", border:"none", outline:"none", resize:"none",
              fontSize:14, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", lineHeight:1.6,
              boxSizing:"border-box"
            }}
          />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
            <span style={{ fontSize:11, color: t.textMuted }}>{inputText.length} chars</span>
            <button
              onClick={handleAnalyze}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:12,
                border:"none", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Plus Jakarta Sans', sans-serif",
                background: isAnalyzing ? t.textMuted : t.primaryGradient,
                color:"#fff", transition:"all 0.2s ease",
                opacity: inputText.trim() ? 1 : 0.5
              }}>
              {isAnalyzing ? <><ZapIcon size={14} /> Analyzing...</> : <><SparklesIcon size={14} /> Analyze</>}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ fontSize:12, fontWeight:700, color: t.textMuted, marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>Try an example</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {exampleTexts.map((ex, i) => (
            <button key={i} onClick={() => setInputText(ex)}
              style={{
                background: t.surfaceAlt, border:`1px solid ${t.cardBorder}`, borderRadius:12, padding:"10px 14px",
                cursor:"pointer", textAlign:"left", fontSize:12, color: t.textSecondary,
                fontFamily:"'Plus Jakarta Sans', sans-serif", lineHeight:1.5, transition:"all 0.2s ease"
              }}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      {analyzedMood && (
        <div style={{ margin:"0 20px", padding:16, background: t.primaryLight, border:`1.5px solid ${t.cardBorder}`, borderRadius:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <span style={{ fontSize:22 }}>{analyzedMood.emoji}</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color: t.text }}>{analyzedMood.label}</div>
              <div style={{ fontSize:11, color: t.textMuted }}>{analyzedMood.tone}</div>
            </div>
          </div>
          <div>
            <MoodBar label="Trust" value={analyzedMood.score.trust} color="#3B82F6" />
            <MoodBar label="Energy" value={analyzedMood.score.energy} color="#F59E0B" />
            <MoodBar label="Urgency" value={analyzedMood.score.urgency} color="#EF4444" />
            <MoodBar label="Premium" value={analyzedMood.score.premium} color="#8B5CF6" />
          </div>
        </div>
      )}
    </div>
  );
}

function PaletteScreen({ theme, analyzedMood }) {
  const t = themes[theme];
  const mood = analyzedMood || moodDatabase[0];
  const [selectedMood, setSelectedMood] = useState(mood.id);
  const [activeSection, setActiveSection] = useState("colors");
  const currentMood = moodDatabase.find(m => m.id === selectedMood) || moodDatabase[0];
  const CheckIcon = window.lucide.Check;
  const BookOpenIcon = window.lucide.BookOpen;

  useEffect(() => {
    if (analyzedMood) setSelectedMood(analyzedMood.id);
  }, [analyzedMood]);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"8px 0 16px" }}>
      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ fontSize:20, fontWeight:800, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:4 }}>
          Visual Direction
        </div>
        <div style={{ fontSize:13, color: t.textMuted }}>Your mood-matched design system</div>
      </div>

      <div style={{ overflowX:"auto", padding:"0 20px 16px", display:"flex", gap:8 }}>
        {moodDatabase.map(m => (
          <button key={m.id} onClick={() => setSelectedMood(m.id)}
            style={{
              flexShrink:0, display:"flex", alignItems:"center", gap:6, padding:"7px 14px",
              borderRadius:20, border:`1.5px solid ${selectedMood===m.id ? t.primary : t.cardBorder}`,
              background: selectedMood===m.id ? t.primaryLight : t.surface,
              cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'Plus Jakarta Sans', sans-serif",
              color: selectedMood===m.id ? t.primary : t.textSecondary,
              transition:"all 0.2s ease", whiteSpace:"nowrap"
            }}>
            {m.emoji} {m.label.split(" ")[0]}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", gap:0, margin:"0 20px 16px", background: t.surfaceAlt, borderRadius:12, padding:4 }}>
        {["colors","fonts","spacing"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            style={{
              flex:1, padding:"8px 0", borderRadius:9, border:"none", cursor:"pointer",
              fontSize:12, fontWeight:600, fontFamily:"'Plus Jakarta Sans', sans-serif",
              background: activeSection===s ? t.surface : "transparent",
              color: activeSection===s ? t.primary : t.textMuted,
              boxShadow: activeSection===s ? `0 1px 4px ${t.shadow}` : "none",
              transition:"all 0.2s ease", textTransform:"capitalize"
            }}>
            {s}
          </button>
        ))}
      </div>

      {activeSection === "colors" && (
        <div style={{ padding:"0 20px" }}>
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            {currentMood.palette.map((c, i) => (
              <ColorSwatch key={i} color={c} size={52} />
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {currentMood.palette.map((c, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background: t.card, borderRadius:12, border:`1px solid ${t.cardBorder}` }}>
                <div style={{ width:28, height:28, borderRadius:8, background:c, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color: t.text }}>{c.toUpperCase()}</div>
                  <div style={{ fontSize:11, color: t.textMuted }}>{["Primary","Supporting","Accent","Background","Text"][i]}</div>
                </div>
                <CheckIcon size={14} color={t.primary} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "fonts" && (
        <div style={{ padding:"0 20px" }}>
          <div style={{ background: t.card, borderRadius:16, padding:20, border:`1px solid ${t.cardBorder}`, marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Heading</div>
            <div style={{ fontSize:28, fontWeight:800, color: t.text, fontFamily:"serif", lineHeight:1.2, marginBottom:6 }}>
              {currentMood.label.split(" ")[0]}
            </div>
            <div style={{ fontSize:12, color: t.textMuted }}>Font: {currentMood.fonts.heading}</div>
          </div>
          <div style={{ background: t.card, borderRadius:16, padding:20, border:`1px solid ${t.cardBorder}`, marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Body Copy</div>
            <div style={{ fontSize:14, color: t.textSecondary, lineHeight:1.7 }}>
              This message is designed to connect emotionally before it informs practically — every word chosen to align with the audience's existing beliefs.
            </div>
            <div style={{ fontSize:12, color: t.textMuted, marginTop:6 }}>Font: {currentMood.fonts.body}</div>
          </div>
          <div style={{ background: t.primaryLight, borderRadius:14, padding:14, border:`1px solid ${t.cardBorder}` }}>
            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <BookOpenIcon size={16} color={t.primary} style={{ flexShrink:0, marginTop:2 }} />
              <div>
                <div style={{ fontSize:12, fontWeight:700, color: t.text, marginBottom:4 }}>Why this pairing works</div>
                <div style={{ fontSize:12, color: t.textSecondary, lineHeight:1.6 }}>{currentMood.why}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "spacing" && (
        <div style={{ padding:"0 20px" }}>
          <div style={{ background: t.card, borderRadius:16, padding:20, border:`1px solid ${t.cardBorder}`, marginBottom:12 }}>
            <div style={{ fontSize:13, fontWeight:700, color: t.text, marginBottom:16 }}>{currentMood.spacing} Spacing</div>
            {[["Line Height", "1.8", "Relaxed reading flow"],["Letter Spacing","+0.02em","Adds breathing room"],["Paragraph Gap","24px","Visual rhythm"],["Section Margin","48px","Clear separation"]].map(([k,v,d]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:12, marginBottom:12, borderBottom:`1px solid ${t.cardBorder}` }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color: t.text }}>{k}</div>
                  <div style={{ fontSize:11, color: t.textMuted }}>{d}</div>
                </div>
                <div style={{ fontSize:14, fontWeight:800, color: t.primary }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewScreen({ theme, analyzedMood }) {
  const t = themes[theme];
  const mood = analyzedMood || moodDatabase[0];
  const [selectedFormat, setSelectedFormat] = useState("social");
  const MonitorIcon = window.lucide.Monitor;
  const ImageIcon = window.lucide.Image;
  const FileTextIcon = window.lucide.FileText;
  const DownloadIcon = window.lucide.Download;
  const ShareIcon = window.lucide.Share2;
  const InfoIcon = window.lucide.Info;

  const primary = mood.palette[0];
  const secondary = mood.palette[1];
  const accent = mood.palette[2];
  const bg = mood.palette[3];
  const textC = mood.palette[4];

  const formatIcons = { social: ImageIcon, flyer: FileTextIcon, banner: MonitorIcon, deck: MonitorIcon };

  const renderPreview = () => {
    if (selectedFormat === "social") {
      return (
        <div style={{ background: bg, borderRadius:16, overflow:"hidden", aspectRatio:"1/1", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:24, position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"60%", background:`linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`, opacity:0.15, borderRadius:16 }} />
          <div style={{ width:48, height:48, background:`linear-gradient(135deg, ${primary}, ${secondary})`, borderRadius:14, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:22 }}>{mood.emoji}</span>
          </div>
          <div style={{ fontSize:18, fontWeight:800, color: textC, textAlign:"center", lineHeight:1.3, marginBottom:8, fontFamily:"serif" }}>
            {mood.label.split("&")[0].trim()}
          </div>
          <div style={{ fontSize:11, color: secondary, textAlign:"center", lineHeight:1.5, maxWidth:180 }}>
            {mood.tone}
          </div>
          <div style={{ position:"absolute", bottom:16, right:16, background: primary, borderRadius:8, padding:"4px 10px" }}>
            <span style={{ fontSize:10, fontWeight:700, color:"#fff" }}>@tonetrace</span>
          </div>
        </div>
      );
    }
    if (selectedFormat === "flyer") {
      return (
        <div style={{ background: bg, borderRadius:16, overflow:"hidden", padding:20, minHeight:220, display:"flex", flexDirection:"column" }}>
          <div style={{ background:`linear-gradient(135deg, ${primary}, ${secondary})`, borderRadius:12, padding:"14px 16px", marginBottom:14 }}>
            <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:2, marginBottom:6 }}>Event</div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", lineHeight:1.2 }}>{mood.label}</div>
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            {mood.palette.slice(0,3).map((c,i) => <div key={i} style={{ flex:1, height:6, borderRadius:3, background:c }} />)}
          </div>
          <div style={{ fontSize:11, color: textC, lineHeight:1.6, marginBottom:12 }}>
            Join us for an experience designed to {mood.tone.toLowerCase()}. Every detail intentional.
          </div>
          <div style={{ marginTop:"auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ background: accent, borderRadius:8, padding:"6px 14px" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Register Now</span>
            </div>
            <div style={{ fontSize:10, color: secondary }}>April 2026</div>
          </div>
        </div>
      );
    }
    if (selectedFormat === "banner") {
      return (
        <div style={{ background:`linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`, borderRadius:16, padding:"20px 24px", display:"flex", alignItems:"center", gap:16, minHeight:90 }}>
          <span style={{ fontSize:32 }}>{mood.emoji}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#fff", marginBottom:3 }}>{mood.label}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>{mood.tone}</div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:8, padding:"7px 14px", backdropFilter:"blur(4px)" }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Explore</span>
          </div>
        </div>
      );
    }
    if (selectedFormat === "deck") {
      return (
        <div style={{ background: textC, borderRadius:16, overflow:"hidden", padding:24, minHeight:180, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ fontSize:9, fontWeight:700, color: secondary, textTransform:"uppercase", letterSpacing:2, marginBottom:12 }}>Slide 01</div>
          <div style={{ fontSize:22, fontWeight:800, color: bg, lineHeight:1.2, marginBottom:10, fontFamily:"serif" }}>
            {mood.label}
          </div>
          <div style={{ width:60, height:3, background:`linear-gradient(90deg, ${primary}, ${accent})`, borderRadius:2, marginBottom:12 }} />
          <div style={{ fontSize:11, color: secondary, lineHeight:1.6 }}>{mood.tone}</div>
        </div>
      );
    }
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"8px 0 16px" }}>
      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ fontSize:20, fontWeight:800, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:4 }}>Format Preview</div>
        <div style={{ fontSize:13, color: t.textMuted }}>See how your design reads across contexts</div>
      </div>

      <div style={{ overflowX:"auto", padding:"0 20px 16px", display:"flex", gap:8 }}>
        {formatPreviews.map(f => {
          const FIcon = formatIcons[f.id];
          return (
            <button key={f.id} onClick={() => setSelectedFormat(f.id)}
              style={{
                flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"10px 14px",
                borderRadius:14, border:`1.5px solid ${selectedFormat===f.id ? t.primary : t.cardBorder}`,
                background: selectedFormat===f.id ? t.primaryLight : t.surface,
                cursor:"pointer", minWidth:72, transition:"all 0.2s ease"
              }}>
              <FIcon size={18} color={selectedFormat===f.id ? t.primary : t.textMuted} />
              <span style={{ fontSize:10, fontWeight:600, color: selectedFormat===f.id ? t.primary : t.textMuted, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{f.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ padding:"0 20px 16px" }}>
        {renderPreview()}
      </div>

      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ background: t.card, borderRadius:16, padding:16, border:`1px solid ${t.cardBorder}`, marginBottom:12 }}>
          <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
            <InfoIcon size={15} color={t.primary} style={{ flexShrink:0, marginTop:1 }} />
            <div>
              <div style={{ fontSize:12, fontWeight:700, color: t.text, marginBottom:4 }}>Design Rationale</div>
              <div style={{ fontSize:12, color: t.textSecondary, lineHeight:1.6 }}>{mood.why}</div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:12, background: t.primaryGradient, borderRadius:12, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, color:"#fff", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
            <DownloadIcon size={14} /> Export Kit
          </button>
          <button style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:12, background: t.surfaceAlt, borderRadius:12, border:`1px solid ${t.cardBorder}`, cursor:"pointer", fontSize:13, fontWeight:700, color: t.textSecondary, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
            <ShareIcon size={14} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

function PresetsScreen({ theme }) {
  const t = themes[theme];
  const [presets, setPresets] = useState(savedPresets);
  const BookmarkIcon = window.lucide.Bookmark;
  const PlusIcon = window.lucide.Plus;
  const TrashIcon = window.lucide.Trash2;
  const ClockIcon = window.lucide.Clock;
  const TagIcon = window.lucide.Tag;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"8px 0 16px" }}>
      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:20, fontWeight:800, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:4 }}>Mood Presets</div>
            <div style={{ fontSize:13, color: t.textMuted }}>Reuse your brand's emotional DNA</div>
          </div>
          <button style={{ width:36, height:36, borderRadius:10, background: t.primaryGradient, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 12px ${t.shadow}` }}>
            <PlusIcon size={18} color="#fff" />
          </button>
        </div>
      </div>

      <div style={{ padding:"0 20px", display:"flex", flexDirection:"column", gap:12 }}>
        {presets.map(preset => {
          const mood = moodDatabase.find(m => m.id === preset.mood) || moodDatabase[0];
          return (
            <div key={preset.id} style={{ background: t.card, borderRadius:18, padding:18, border:`1px solid ${t.cardBorder}`, boxShadow:`0 2px 12px ${t.shadow}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg, ${mood.palette[0]}, ${mood.palette[1]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                    {mood.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color: t.text }}>{preset.name}</div>
                    <div style={{ fontSize:11, color: t.textMuted }}>{mood.label}</div>
                  </div>
                </div>
                <button style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
                  <TrashIcon size={15} color={t.textMuted} />
                </button>
              </div>
              <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                {mood.palette.slice(0,5).map((c,i) => <div key={i} style={{ flex:1, height:8, borderRadius:4, background:c }} />)}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:6 }}>
                  {preset.formats.map(f => (
                    <div key={f} style={{ background: t.tag, borderRadius:6, padding:"3px 8px" }}>
                      <span style={{ fontSize:10, fontWeight:600, color: t.tagText }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <ClockIcon size={11} color={t.textMuted} />
                  <span style={{ fontSize:11, color: t.textMuted }}>{preset.lastUsed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ margin:"16px 20px 0", background: t.surfaceAlt, borderRadius:16, padding:16, border:`1.5px dashed ${t.inputBorder}`, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer" }}>
        <BookmarkIcon size={24} color={t.textMuted} />
        <div style={{ fontSize:13, fontWeight:600, color: t.textMuted, textAlign:"center" }}>
          Analyze a project and save<br />its mood as a preset
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ theme, setTheme }) {
  const t = themes[theme];
  const SunIcon = window.lucide.Sun;
  const MoonIcon = window.lucide.Moon;
  const UserIcon = window.lucide.User;
  const BellIcon = window.lucide.Bell;
  const HelpCircleIcon = window.lucide.HelpCircle;
  const ChevronRightIcon = window.lucide.ChevronRight;
  const SparklesIcon = window.lucide.Sparkles;
  const PaletteIcon = window.lucide.Palette;
  const ShieldIcon = window.lucide.Shield;

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const settingsGroups = [
    {
      label: "Account",
      items: [
        { icon: UserIcon, label: "Profile & Workspace", sub: "Manage your details" },
        { icon: BellIcon, label: "Notifications", sub: "Design tips & updates" },
      ],
    },
    {
      label: "Preferences",
      items: [
        { icon: PaletteIcon, label: "Default Font Style", sub: "Serif · Sans-serif · Mixed" },
        { icon: SparklesIcon, label: "Mood Engine Settings", sub: "Tune the AI behavior" },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: HelpCircleIcon, label: "Design Learning Hub", sub: "Why recommendations work" },
        { icon: ShieldIcon, label: "Privacy & Data", sub: "Your content stays yours" },
      ],
    },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"8px 0 16px" }}>
      <div style={{ padding:"0 20px 20px" }}>
        <div style={{ fontSize:20, fontWeight:800, color: t.text, fontFamily:"'Plus Jakarta Sans', sans-serif", marginBottom:20 }}>Settings</div>

        <div style={{ background: t.card, borderRadius:20, padding:20, border:`1px solid ${t.cardBorder}`, marginBottom:20, display:"flex", alignItems:"center", gap:14, boxShadow:`0 2px 12px ${t.shadow}` }}>
          <div style={{ width:52, height:52, borderRadius:16, background: t.primaryGradient, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:24 }}>🎨</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color: t.text }}>Alex Designer</div>
            <div style={{ fontSize:12, color: t.textMuted }}>alex@studio.co</div>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:4 }}>
              <div style={{ background: t.primaryLight, borderRadius:6, padding:"2px 8px" }}>
                <span style={{ fontSize:10, fontWeight:700, color: t.primary }}>Pro Plan</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: t.card, borderRadius:18, padding:16, border:`1px solid ${t.cardBorder}`, marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:38, height:38, borderRadius:12, background: theme==="light" ? "#FEF9C3" : "#1A1130", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {theme === "light" ? <SunIcon size={20} color="#D97706" /> : <MoonIcon size={20} color="#A78BFA" />}
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color: t.text }}>Appearance</div>
              <div style={{ fontSize:11, color: t.textMuted }}>{theme === "light" ? "Light mode active" : "Dark mode active"}</div>
            </div>
          </div>
          <div
            onClick={toggleTheme}
            style={{
              width:52, height:28, borderRadius:14, background: theme==="light" ? "#E5E7EB" : t.primary,
              position:"relative", cursor:"pointer", transition:"background 0.3s ease"
            }}>
            <div style={{
              position:"absolute", top:3, left: theme==="light" ? 3 : 27, width:22, height:22,
              borderRadius:11, background:"#fff", transition:"left 0.25s ease",
              boxShadow:"0 1px 4px rgba(0,0,0,0.2)"
            }} />
          </div>
        </div>

        {settingsGroups.map(group => (
          <div key={group.label} style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color: t.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8, paddingLeft:4 }}>{group.label}</div>
            <div style={{ background: t.card, borderRadius:18, border:`1px solid ${t.cardBorder}`, overflow:"hidden" }}>
              {group.items.map((item, i) => (
                <div key={item.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom: i < group.items.length - 1 ? `1px solid ${t.cardBorder}` : "none", cursor:"pointer" }}>
                  <div style={{ width:34, height:34, borderRadius:10, background: t.surfaceAlt, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <item.icon size={16} color={t.primary} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color: t.text }}>{item.label}</div>
                    <div style={{ fontSize:11, color: t.textMuted }}>{item.sub}</div>
                  </div>
                  <ChevronRightIcon size={15} color={t.textMuted} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign:"center", marginTop:8 }}>
          <div style={{ fontSize:12, color: t.textMuted }}>ToneTrace v1.0.0</div>
          <div style={{ fontSize:11, color: t.textMuted, marginTop:2 }}>Design with intention</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("home");
  const [analyzedMood, setAnalyzedMood] = useState(null);
  const [tabTransition, setTabTransition] = useState(false);
  const t = themes[theme];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      textarea::placeholder { color: #9E93B8; }
    `;
    document.head.appendChild(style);
    document.body.style.background = "#d4d4d4";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    return () => document.head.removeChild(style);
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setTabTransition(true);
    setTimeout(() => { setActiveTab(tab); setTabTransition(false); }, 120);
  };

  const handleAnalyze = (mood) => {
    setAnalyzedMood(mood);
    setTimeout(() => handleTabChange("palette"), 400);
  };

  const navItems = [
    { id:"home", icon: window.lucide.Search, label:"Analyze" },
    { id:"palette", icon: window.lucide.Palette, label:"Palette" },
    { id:"preview", icon: window.lucide.Layout, label:"Preview" },
    { id:"presets", icon: window.lucide.Bookmark, label:"Presets" },
    { id:"settings", icon: window.lucide.Settings, label:"Settings" },
  ];

  const renderScreen = () => {
    switch(activeTab) {
      case "home": return <HomeScreen theme={theme} onAnalyze={handleAnalyze} analyzedMood={analyzedMood} setAnalyzedMood={setAnalyzedMood} />;
      case "palette": return <PaletteScreen theme={theme} analyzedMood={analyzedMood} />;
      case "preview": return <PreviewScreen theme={theme} analyzedMood={analyzedMood} />;
      case "presets": return <PresetsScreen theme={theme} />;
      case "settings": return <SettingsScreen theme={theme} setTheme={setTheme} />;
      default: return null;
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", width:"100%", padding:20 }}>
      <div style={{
        width:375, height:812, background: t.bg, borderRadius:50, overflow:"hidden",
        display:"flex", flexDirection:"column", position:"relative",
        boxShadow:`0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)`,
        border:`1px solid rgba(255,255,255,0.1)`, fontFamily:"'Plus Jakarta Sans', sans-serif",
        transition:"background 0.3s ease"
      }}>
        <DynamicIsland />

        <StatusBar theme={theme} />

        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ flex:1, display:"flex", flexDirection:"column", opacity: tabTransition ? 0 : 1, transition:"opacity 0.12s ease", overflow:"hidden" }}>
            {renderScreen()}
          </div>

          <div style={{
            background: t.navBg, borderTop:`1px solid ${t.navBorder}`,
            display:"flex", paddingBottom:16, paddingTop:8,
            boxShadow:`0 -4px 20px ${t.shadow}`, flexShrink:0
          }}>
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => handleTabChange(item.id)}
                  style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                    background:"none", border:"none", cursor:"pointer", padding:"6px 0",
                    transition:"all 0.2s ease"
                  }}>
                  <div style={{
                    width:isActive ? 44 : 36, height:isActive ? 32 : 32, borderRadius:12,
                    background: isActive ? t.primaryLight : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"all 0.2s ease"
                  }}>
                    <item.icon size={18} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span style={{ fontSize:9.5, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, fontFamily:"'Plus Jakarta Sans', sans-serif", letterSpacing:0.3 }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
