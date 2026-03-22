const { useState, useEffect, useRef } = React;

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [detectStep, setDetectStep] = useState(0);
  const [detectCategory, setDetectCategory] = useState(null);
  const [detectAnswers, setDetectAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [archiveFilter, setArchiveFilter] = useState('all');
  const [expandedArchive, setExpandedArchive] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const themes = {
    dark: {
      bg: '#0D0B1A',
      surface: '#16122A',
      card: '#1E1836',
      cardBorder: '#2A2347',
      text: '#EDE9FF',
      textSub: '#9B8EC4',
      textMuted: '#524D6B',
      primary: '#8B5CF6',
      primaryDark: '#6D28D9',
      primaryLight: '#A78BFA',
      primaryGlow: 'rgba(139,92,246,0.2)',
      secondary: '#EC4899',
      accent: '#06B6D4',
      success: '#10B981',
      successBg: 'rgba(16,185,129,0.15)',
      warning: '#F59E0B',
      warningBg: 'rgba(245,158,11,0.15)',
      danger: '#EF4444',
      dangerBg: 'rgba(239,68,68,0.15)',
      navBg: '#110E22',
      inputBg: '#231E3A',
    },
    light: {
      bg: '#F4F1FE',
      surface: '#FFFFFF',
      card: '#FDFCFF',
      cardBorder: '#E4DAFF',
      text: '#18102E',
      textSub: '#5C4E7A',
      textMuted: '#A098BE',
      primary: '#7C3AED',
      primaryDark: '#6D28D9',
      primaryLight: '#8B5CF6',
      primaryGlow: 'rgba(124,58,237,0.12)',
      secondary: '#DB2777',
      accent: '#0891B2',
      success: '#059669',
      successBg: 'rgba(5,150,105,0.1)',
      warning: '#D97706',
      warningBg: 'rgba(217,119,6,0.1)',
      danger: '#DC2626',
      dangerBg: 'rgba(220,38,38,0.1)',
      navBg: '#FFFFFF',
      inputBg: '#F0EAFB',
    }
  };

  const t = isDark ? themes.dark : themes.light;
  const font = "'Plus Jakarta Sans', sans-serif";

  const categories = [
    { id: 'smell', label: 'Strange Smell', emoji: '👃', color: '#F59E0B', desc: 'Burning, musty, chemical, or gas-like odors' },
    { id: 'sound', label: 'Odd Sound', emoji: '🔊', color: '#8B5CF6', desc: 'Clicks, hums, hisses, knocks, or grinding' },
    { id: 'visual', label: 'Visual Oddity', emoji: '👁️', color: '#06B6D4', desc: 'Stains, patches, mold, or discoloration' },
    { id: 'sensation', label: 'Strange Feeling', emoji: '✋', color: '#EC4899', desc: 'Tingling, drafts, heat, or itching' },
    { id: 'behavior', label: 'Odd Behavior', emoji: '⚡', color: '#10B981', desc: 'Devices, appliances, or systems acting up' },
  ];

  const questionSets = {
    smell: [
      { q: "Where is the smell coming from?", options: ["Kitchen or cooking area", "Bathroom or drains", "Living room or bedroom", "Near electrical outlets or panels", "From HVAC or vents", "Hard to pinpoint — it's everywhere"] },
      { q: "How would you describe the smell?", options: ["Burning or electrical", "Rotten egg or sulfur", "Musty or damp", "Chemical or cleaning-agent", "Sweet or sickly", "Faint gas or petroleum"] },
      { q: "When did it start?", options: ["Just appeared suddenly", "After using an appliance", "After rain or humid weather", "Been building gradually", "Comes and goes randomly", "After a power event"] },
    ],
    sound: [
      { q: "Where is the sound happening?", options: ["Inside walls or ceiling", "Kitchen appliance", "Car or vehicle", "HVAC or heating system", "Plumbing or pipes", "Unclear — it travels"] },
      { q: "How would you describe it?", options: ["Clicking or ticking", "Humming or buzzing", "Banging or knocking", "Hissing or rushing water", "Grinding or scraping", "High-pitched whine or squeal"] },
      { q: "When does it happen?", options: ["Constantly without pause", "Only at night", "Only when appliance is running", "After temperature changes", "Randomly and briefly", "Getting louder over time"] },
    ],
    visual: [
      { q: "Where is the oddity located?", options: ["Ceiling or wall surface", "Floor or baseboards", "Clothing or fabric", "Outside — siding, ground, plants", "Food or drink", "Structural — corners, joints"] },
      { q: "What does it look like?", options: ["Brown or yellow water stain", "Black or dark spots", "White powder or residue", "Faded or bleached area", "Bubbling, cracking, or peeling", "Scratch, gouge, or unexplained mark"] },
      { q: "How long has it been visible?", options: ["Just noticed it today", "Appeared a few days ago", "Over a week — possibly longer", "Appeared after rain or flooding", "Appeared after a heat wave", "Seems to be growing or spreading"] },
    ],
    sensation: [
      { q: "What kind of feeling is it?", options: ["Tingling or mild static shock", "Unexpected dampness or wetness", "Unusual warmth or heat", "Cold draft with no obvious source", "Vibration underfoot or in walls", "Skin itching or irritation"] },
      { q: "Where does it occur?", options: ["Specific room only", "When touching a surface or device", "Near electrical outlets or switches", "From air vents or drafts", "Across an entire floor", "On skin after being in a certain room"] },
      { q: "How frequent is it?", options: ["Constant — always there", "Only when near a specific spot", "Comes in waves or pulses", "Only at certain times of day", "Getting more noticeable over days"] },
    ],
    behavior: [
      { q: "What device or system is acting up?", options: ["Refrigerator or freezer", "Lights or circuit breaker", "WiFi or smart home electronics", "Heating or cooling system", "Car — dashboard or engine", "Phone, laptop, or computer"] },
      { q: "How is it behaving strangely?", options: ["Turning off or restarting unexpectedly", "Making sounds it shouldn't", "Overheating noticeably", "Not responding or lagging badly", "Running constantly or cycling fast", "Showing error lights or codes"] },
      { q: "When did the odd behavior start?", options: ["After a power outage", "After weather change", "Gradually worsened over weeks", "Right after an update or install", "Suddenly with no clear trigger", "Only happens in certain conditions"] },
    ],
  };

  const resultMap = {
    smell: {
      title: "Electrical or Moisture Smell",
      subtitle: "High urgency — do not ignore",
      urgency: "high",
      causes: [
        { rank: 1, name: "Overloaded outlet or fraying wire", confidence: 68, severity: "high" },
        { rank: 2, name: "Mold growing behind walls (musty type)", confidence: 22, severity: "medium" },
        { rank: 3, name: "Dust burning on seasonal heater", confidence: 10, severity: "low" },
      ],
      checklist: [
        { action: "Turn off appliances near the smell immediately", urgent: true },
        { action: "Open windows to ventilate the space", urgent: true },
        { action: "Check outlets for discoloration or scorch marks", urgent: false },
        { action: "If gas smell, leave and call the utility company", urgent: false },
        { action: "Schedule electrician inspection if smell persists", urgent: false },
      ],
      professional: "A burning electrical smell near outlets is a fire risk. If it doesn't clear in 10 minutes after turning things off, call an electrician today.",
    },
    sound: {
      title: "Unexplained Sound Pattern",
      subtitle: "Monitor and document",
      urgency: "medium",
      causes: [
        { rank: 1, name: "Thermal expansion in pipes or walls", confidence: 55, severity: "low" },
        { rank: 2, name: "Appliance motor or compressor wear", confidence: 30, severity: "medium" },
        { rank: 3, name: "Pest or wildlife in structure", confidence: 15, severity: "medium" },
      ],
      checklist: [
        { action: "Record a 30-second audio clip to share with a technician", urgent: false },
        { action: "Note when it happens most — time of day, temperature", urgent: false },
        { action: "Check nearby appliances for unusual heat buildup", urgent: false },
        { action: "Look for small droppings or entry-point gaps", urgent: false },
        { action: "Report to building manager if you rent", urgent: true },
      ],
      professional: "Monitor for 48 hours. If appliance-related and under warranty, report now before it escalates.",
    },
    visual: {
      title: "Moisture Stain or Growth Mark",
      subtitle: "Act within 24 hours",
      urgency: "high",
      causes: [
        { rank: 1, name: "Active water leak from above or inside wall", confidence: 62, severity: "high" },
        { rank: 2, name: "Mold or mildew colony forming", confidence: 25, severity: "medium" },
        { rank: 3, name: "Old paint bleed or structural settlement", confidence: 13, severity: "low" },
      ],
      checklist: [
        { action: "Touch the stain — wetness means an active leak", urgent: true },
        { action: "Check the floor or pipes directly above", urgent: true },
        { action: "Photograph it now and again in 48 hours", urgent: false },
        { action: "Check for a musty smell nearby", urgent: false },
        { action: "Contact landlord or plumber if area is expanding", urgent: false },
      ],
      professional: "Wet ceiling stains require prompt attention — water damage and mold spread quickly once moisture gets into drywall.",
    },
    sensation: {
      title: "Environmental Anomaly",
      subtitle: "Likely low risk, confirm one thing",
      urgency: "low",
      causes: [
        { rank: 1, name: "Electromagnetic interference or static buildup", confidence: 45, severity: "low" },
        { rank: 2, name: "Hidden air draft or insulation gap", confidence: 35, severity: "low" },
        { rank: 3, name: "Electrical grounding issue", confidence: 20, severity: "medium" },
      ],
      checklist: [
        { action: "Identify the exact spot where it occurs most", urgent: false },
        { action: "Test whether it happens when touching electronics", urgent: false },
        { action: "Feel along baseboards for cold air drafts", urgent: false },
        { action: "Use a plug-in outlet tester from a hardware store", urgent: false },
        { action: "If tingling near outlets — stop use and call electrician", urgent: true },
      ],
      professional: "Tingling sensations near outlets or switches are a grounding issue — safe to wait a few days but should be inspected.",
    },
    behavior: {
      title: "Device or System Anomaly",
      subtitle: "Check warranty before it worsens",
      urgency: "medium",
      causes: [
        { rank: 1, name: "Aging component nearing failure point", confidence: 52, severity: "medium" },
        { rank: 2, name: "Power fluctuation or recent surge", confidence: 30, severity: "low" },
        { rank: 3, name: "Firmware or software issue", confidence: 18, severity: "low" },
      ],
      checklist: [
        { action: "Restart or power cycle the device fully", urgent: false },
        { action: "Check for firmware or software updates", urgent: false },
        { action: "Look up recent power outages in your area", urgent: false },
        { action: "Document any error codes or warning lights shown", urgent: false },
        { action: "Contact manufacturer support or local technician", urgent: true },
      ],
      professional: "If the device is under warranty, report the issue now — manufacturers often won't honor claims after the problem has worsened.",
    },
  };

  const archiveData = [
    { id: 1, title: "Freezer making clicking sounds at night", category: "Sound", status: "Monitoring", date: "Mar 21", location: "Kitchen", severity: "low", emoji: "🔊" },
    { id: 2, title: "Burning smell near office power strip", category: "Smell", status: "Resolved", date: "Mar 18", location: "Office", severity: "high", emoji: "👃", resolution: "Replaced overloaded power strip. No damage to outlet." },
    { id: 3, title: "Brown water stain on bedroom ceiling", category: "Visual", status: "Escalated", date: "Mar 14", location: "Bedroom", severity: "high", emoji: "👁️" },
    { id: 4, title: "Tingling sensation from hallway light switch", category: "Sensation", status: "Resolved", date: "Mar 8", location: "Hallway", severity: "medium", emoji: "✋", resolution: "Electrician found and repaired loose neutral wire." },
    { id: 5, title: "Fridge running constantly without cycling off", category: "Behavior", status: "Monitoring", date: "Mar 2", location: "Kitchen", severity: "medium", emoji: "⚡" },
    { id: 6, title: "Musty smell in basement after rainfall", category: "Smell", status: "Resolved", date: "Feb 28", location: "Basement", severity: "medium", emoji: "👃", resolution: "Found and sealed gap behind basement window frame." },
  ];

  const getResults = () => resultMap[detectCategory] || resultMap.behavior;

  // ─── HOME SCREEN ──────────────────────────────────────────────────────────────
  function HomeScreen() {
    const recent = archiveData.slice(0, 2);
    return (
      <div style={{ paddingBottom: 24, fontFamily: font }}>
        <div style={{ padding: '18px 20px 14px', background: `linear-gradient(180deg, ${t.surface} 0%, ${t.bg} 100%)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 3, letterSpacing: 0.5 }}>MONDAY, MARCH 23</p>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, letterSpacing: -0.5, lineHeight: 1.1 }}>Oddly Useful</h1>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${t.primaryGlow}` }}>
              <span style={{ fontSize: 20 }}>🔮</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: t.textSub, marginTop: 5, lineHeight: 1.4 }}>Turn strange moments into smart actions.</p>
        </div>

        {/* CTA Card */}
        <div style={{ padding: '4px 20px 20px' }}>
          <div onClick={() => { setDetectStep(0); setDetectCategory(null); setDetectAnswers({}); setCurrentQuestion(0); setActiveTab('detect'); }}
            style={{ background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`, borderRadius: 22, padding: '22px 20px', cursor: 'pointer', boxShadow: `0 12px 40px ${t.primaryGlow}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: 65, background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', bottom: -20, right: 20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.65)', letterSpacing: 1.5, marginBottom: 6 }}>SOMETHING WEIRD?</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 5, lineHeight: 1.2 }}>Detect & Decode It</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', marginBottom: 18, lineHeight: 1.5 }}>Answer a few smart questions to figure out what's going on — and what to do about it.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 24, padding: '9px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Start Detection</span>
              {React.createElement(window.lucide.ArrowRight, { size: 14, color: '#fff' })}
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div style={{ padding: '0 20px 20px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Quick Category</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {categories.map(cat => (
              <div key={cat.id} onClick={() => { setDetectCategory(cat.id); setDetectStep(1); setCurrentQuestion(0); setDetectAnswers({}); setActiveTab('detect'); }}
                style={{ flex: '0 0 auto', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '12px 14px', cursor: 'pointer', textAlign: 'center', minWidth: 74 }}>
                <div style={{ fontSize: 24, marginBottom: 5 }}>{cat.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.textSub, whiteSpace: 'nowrap' }}>{cat.label.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Recent Incidents</h3>
            <span onClick={() => setActiveTab('archive')} style={{ fontSize: 12, color: t.primary, fontWeight: 700, cursor: 'pointer' }}>See all</span>
          </div>
          {recent.map(item => (
            <div key={item.id} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{item.location}</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                  <span style={{ fontSize: 11, color: t.textMuted }}>{item.date}</span>
                </div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 20, background: item.status === 'Resolved' ? t.successBg : item.status === 'Escalated' ? t.dangerBg : t.warningBg, fontSize: 10, fontWeight: 700, color: item.status === 'Resolved' ? t.success : item.status === 'Escalated' ? t.danger : t.warning, flexShrink: 0 }}>
                {item.status}
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: t.primaryGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(window.lucide.Lightbulb, { size: 18, color: t.primary })}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: t.primary, marginBottom: 5, letterSpacing: 0.5 }}>ODDITY FACT</p>
              <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55 }}>A burning smell from electronics often means dust caught on a heating coil — not always a fire risk, but always worth switching things off and checking.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── DETECT SCREEN ────────────────────────────────────────────────────────────
  function DetectScreen() {
    const currentResult = getResults();
    const questions = detectCategory ? questionSets[detectCategory] : [];
    const currentQ = questions[currentQuestion];

    // Step 0: Category picker
    if (detectStep === 0) {
      return (
        <div style={{ padding: '18px 20px 24px', fontFamily: font }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 5 }}>What's the oddity?</h2>
          <p style={{ fontSize: 13, color: t.textSub, marginBottom: 22, lineHeight: 1.5 }}>Pick the category that best fits what you noticed. We'll ask a few targeted questions to narrow it down.</p>
          {categories.map(cat => (
            <div key={cat.id} onClick={() => { setDetectCategory(cat.id); setDetectStep(1); setCurrentQuestion(0); setDetectAnswers({}); }}
              style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '16px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                {cat.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }}>{cat.label}</p>
                <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.4 }}>{cat.desc}</p>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })}
            </div>
          ))}
        </div>
      );
    }

    // Step 1: Questions
    if (detectStep === 1 && currentQ) {
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      const catInfo = categories.find(c => c.id === detectCategory);
      return (
        <div style={{ padding: '14px 20px 24px', fontFamily: font }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <div onClick={() => currentQuestion === 0 ? setDetectStep(0) : setCurrentQuestion(q => q - 1)} style={{ cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.textSub })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 5, background: t.cardBorder, borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 3, transition: 'width 0.35s ease' }} />
              </div>
            </div>
            <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 700 }}>{currentQuestion + 1} / {questions.length}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>{catInfo?.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: t.primary, letterSpacing: 0.8 }}>{catInfo?.label.toUpperCase()}</span>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 22, lineHeight: 1.35 }}>{currentQ.q}</h2>

          {currentQ.options.map((opt, idx) => {
            const isSelected = detectAnswers[currentQuestion] === opt;
            return (
              <div key={idx} onClick={() => {
                const newAnswers = { ...detectAnswers, [currentQuestion]: opt };
                setDetectAnswers(newAnswers);
                setTimeout(() => {
                  if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(q => q + 1);
                  } else {
                    setDetectStep(2);
                    setCheckedItems({});
                  }
                }, 180);
              }}
                style={{ background: isSelected ? `${t.primary}18` : t.card, border: `1.5px solid ${isSelected ? t.primary : t.cardBorder}`, borderRadius: 14, padding: '14px 18px', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.15s ease' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text, lineHeight: 1.3, flex: 1 }}>{opt}</span>
                {isSelected && React.createElement(window.lucide.Check, { size: 16, color: t.primary })}
              </div>
            );
          })}
        </div>
      );
    }

    // Step 2: Results
    if (detectStep === 2 && currentResult) {
      const urgencyColor = currentResult.urgency === 'high' ? t.danger : currentResult.urgency === 'medium' ? t.warning : t.success;
      const urgencyBg = currentResult.urgency === 'high' ? t.dangerBg : currentResult.urgency === 'medium' ? t.warningBg : t.successBg;
      return (
        <div style={{ paddingBottom: 24, fontFamily: font }}>
          <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={() => setDetectStep(1)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {React.createElement(window.lucide.ChevronLeft, { size: 22, color: t.textSub })}
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Analysis Results</h2>
          </div>

          <div style={{ padding: '0 20px' }}>
            {/* Summary card */}
            <div style={{ background: `linear-gradient(135deg, ${t.primary}16, ${t.secondary}0c)`, border: `1px solid ${t.primary}35`, borderRadius: 20, padding: '18px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {React.createElement(window.lucide.Sparkles, { size: 16, color: t.primary })}
                <span style={{ fontSize: 11, fontWeight: 800, color: t.primary, letterSpacing: 0.8 }}>DETECTION COMPLETE</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 6, lineHeight: 1.2 }}>{currentResult.title}</h3>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: urgencyBg }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: urgencyColor }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: urgencyColor }}>{currentResult.subtitle}</span>
              </div>
            </div>

            {/* Ranked causes */}
            <h4 style={{ fontSize: 13, fontWeight: 800, color: t.textSub, letterSpacing: 0.5, marginBottom: 10 }}>RANKED LIKELY CAUSES</h4>
            {currentResult.causes.map((cause, idx) => (
              <div key={idx} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 13, background: idx === 0 ? `linear-gradient(135deg, ${t.primary}, ${t.secondary})` : t.surface, border: `1px solid ${idx === 0 ? 'transparent' : t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: idx === 0 ? '#fff' : t.textSub, flexShrink: 0 }}>
                      {cause.rank}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1, lineHeight: 1.3 }}>{cause.name}</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 8, background: cause.severity === 'high' ? t.dangerBg : cause.severity === 'medium' ? t.warningBg : t.successBg, color: cause.severity === 'high' ? t.danger : cause.severity === 'medium' ? t.warning : t.success, marginLeft: 8, flexShrink: 0 }}>
                    {cause.severity}
                  </span>
                </div>
                <div style={{ height: 4, background: t.cardBorder, borderRadius: 2, marginBottom: 5 }}>
                  <div style={{ height: '100%', width: `${cause.confidence}%`, background: idx === 0 ? `linear-gradient(90deg, ${t.primary}, ${t.secondary})` : t.textMuted, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, color: t.textMuted }}>{cause.confidence}% likelihood based on your answers</span>
              </div>
            ))}

            {/* Action Checklist */}
            <h4 style={{ fontSize: 13, fontWeight: 800, color: t.textSub, letterSpacing: 0.5, marginBottom: 10, marginTop: 6 }}>CALM-ACTION CHECKLIST</h4>
            {currentResult.checklist.map((item, idx) => {
              const isChecked = checkedItems[idx];
              return (
                <div key={idx} onClick={() => setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', background: isChecked ? t.successBg : (item.urgent ? `${t.dangerBg}` : t.card), border: `1px solid ${isChecked ? t.success + '40' : item.urgent ? t.danger + '40' : t.cardBorder}`, borderRadius: 12, marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${isChecked ? t.success : item.urgent ? t.danger : t.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, background: isChecked ? t.success : 'transparent', transition: 'all 0.2s ease' }}>
                    {isChecked && React.createElement(window.lucide.Check, { size: 12, color: '#fff' })}
                    {!isChecked && item.urgent && React.createElement(window.lucide.AlertTriangle, { size: 11, color: t.danger })}
                  </div>
                  <p style={{ fontSize: 13, color: isChecked ? t.success : t.text, lineHeight: 1.45, textDecoration: isChecked ? 'line-through' : 'none', transition: 'all 0.2s ease' }}>{item.action}</p>
                </div>
              );
            })}

            {/* Pro tip */}
            <div style={{ background: t.primaryGlow, border: `1px solid ${t.primary}35`, borderRadius: 14, padding: '14px 16px', marginTop: 4, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              {React.createElement(window.lucide.Info, { size: 16, color: t.primaryLight })}
              <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.55 }}>{currentResult.professional}</p>
            </div>

            {/* Reset */}
            <div onClick={() => { setDetectStep(0); setDetectCategory(null); setDetectAnswers({}); setCurrentQuestion(0); setCheckedItems({}); }}
              style={{ padding: '14px', background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.primary }}>+ Start New Detection</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '18px 20px 24px', fontFamily: font }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 5 }}>What's the oddity?</h2>
        <p style={{ fontSize: 13, color: t.textSub, marginBottom: 22 }}>Pick the category that best fits what you noticed.</p>
        {categories.map(cat => (
          <div key={cat.id} onClick={() => { setDetectCategory(cat.id); setDetectStep(1); setCurrentQuestion(0); setDetectAnswers({}); }}
            style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '16px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }}>{cat.label}</p>
              <p style={{ fontSize: 12, color: t.textMuted }}>{cat.desc}</p>
            </div>
            {React.createElement(window.lucide.ChevronRight, { size: 18, color: t.textMuted })}
          </div>
        ))}
      </div>
    );
  }

  // ─── ARCHIVE SCREEN ───────────────────────────────────────────────────────────
  function ArchiveScreen() {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'monitoring', label: 'Monitoring' },
      { id: 'escalated', label: 'Escalated' },
      { id: 'resolved', label: 'Resolved' },
    ];
    const filtered = archiveFilter === 'all' ? archiveData : archiveData.filter(i => i.status.toLowerCase() === archiveFilter);
    const stats = [
      { label: 'Total', value: archiveData.length, color: t.primary },
      { label: 'Resolved', value: archiveData.filter(a => a.status === 'Resolved').length, color: t.success },
      { label: 'Active', value: archiveData.filter(a => a.status !== 'Resolved').length, color: t.warning },
    ];

    return (
      <div style={{ paddingBottom: 24, fontFamily: font }}>
        <div style={{ padding: '18px 20px 14px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Incident Archive</h2>
          <p style={{ fontSize: 13, color: t.textSub }}>Your personal history of weird & solved.</p>
        </div>

        {/* Stats */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: s.color, lineHeight: 1.1, marginBottom: 3 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {filters.map(f => (
            <div key={f.id} onClick={() => setArchiveFilter(f.id)}
              style={{ flex: '0 0 auto', padding: '7px 16px', borderRadius: 24, background: archiveFilter === f.id ? t.primary : t.card, border: `1px solid ${archiveFilter === f.id ? t.primary : t.cardBorder}`, fontSize: 12, fontWeight: 700, color: archiveFilter === f.id ? '#fff' : t.textSub, cursor: 'pointer' }}>
              {f.label}
            </div>
          ))}
        </div>

        {/* List */}
        <div style={{ padding: '0 20px' }}>
          {filtered.map(item => {
            const isExpanded = expandedArchive === item.id;
            return (
              <div key={item.id} onClick={() => setExpandedArchive(isExpanded ? null : item.id)}
                style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '14px 16px', marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.3, flex: 1 }}>{item.title}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: item.status === 'Resolved' ? t.successBg : item.status === 'Escalated' ? t.dangerBg : t.warningBg, color: item.status === 'Resolved' ? t.success : item.status === 'Escalated' ? t.danger : t.warning, flexShrink: 0 }}>
                        {item.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
                      <span style={{ fontSize: 11, color: t.textMuted }}>{item.location}</span>
                      <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                      <span style={{ fontSize: 11, color: t.textMuted }}>{item.date}</span>
                      <span style={{ fontSize: 11, color: t.textMuted }}>·</span>
                      <span style={{ fontSize: 11, color: item.severity === 'high' ? t.danger : item.severity === 'medium' ? t.warning : t.success, fontWeight: 600 }}>{item.severity} risk</span>
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.cardBorder}` }}>
                    {item.resolution ? (
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: t.successBg, borderRadius: 10 }}>
                        {React.createElement(window.lucide.CheckCircle, { size: 14, color: t.success })}
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: t.success, marginBottom: 3 }}>RESOLUTION</p>
                          <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.45 }}>{item.resolution}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: item.status === 'Escalated' ? t.dangerBg : t.warningBg, borderRadius: 10 }}>
                        {React.createElement(window.lucide.Clock, { size: 14, color: item.status === 'Escalated' ? t.danger : t.warning })}
                        <p style={{ fontSize: 12, color: t.textSub }}>{item.status === 'Escalated' ? 'This incident has been escalated to a professional.' : 'Currently being monitored — no action taken yet.'}</p>
                      </div>
                    )}
                    <div onClick={e => { e.stopPropagation(); setDetectCategory(categories.find(c => c.label.includes(item.category))?.id || 'smell'); setDetectStep(0); setDetectAnswers({}); setCurrentQuestion(0); setActiveTab('detect'); }}
                      style={{ marginTop: 10, padding: '10px', background: t.surface, borderRadius: 10, textAlign: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Re-run Detection</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── INSIGHTS SCREEN ──────────────────────────────────────────────────────────
  function InsightsScreen() {
    const activityData = [
      { month: 'Oct', count: 1 },
      { month: 'Nov', count: 2 },
      { month: 'Dec', count: 1 },
      { month: 'Jan', count: 3 },
      { month: 'Feb', count: 4 },
      { month: 'Mar', count: 6 },
    ];
    const maxCount = Math.max(...activityData.map(d => d.count));
    const patterns = [
      { label: "Kitchen sounds spike in cold months", emoji: "🔊", pct: 82 },
      { label: "Musty smells follow heavy rainfall", emoji: "👃", pct: 91 },
      { label: "Appliance issues every ~3 months", emoji: "⚡", pct: 67 },
    ];
    const catBreakdown = [
      { label: 'Sound', pct: 33, color: '#8B5CF6' },
      { label: 'Smell', pct: 50, color: '#F59E0B' },
      { label: 'Visual', pct: 17, color: '#06B6D4' },
    ];
    const contextTips = [
      { tip: "Pipe rattling is common in buildings over 25 years old.", relevant: true },
      { tip: "Hard water causes faster scale buildup in appliances.", relevant: true },
      { tip: "Pre-1990 wiring may lack proper grounding — check outlets.", relevant: false },
    ];

    return (
      <div style={{ paddingBottom: 24, fontFamily: font }}>
        <div style={{ padding: '18px 20px 14px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Insights</h2>
          <p style={{ fontSize: 13, color: t.textSub }}>Patterns and context from your history</p>
        </div>

        {/* Summary chips */}
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
          {[
            { label: 'Detected', value: '6', sub: 'this month', color: t.primary },
            { label: 'Resolved', value: '66%', sub: 'resolution rate', color: t.success },
            { label: 'Avg. time', value: '2d', sub: 'to resolve', color: t.accent },
          ].map((s, idx) => (
            <div key={idx} style={{ flex: 1, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '12px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1.1, marginBottom: 2 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: t.text, fontWeight: 600 }}>{s.label}</p>
              <p style={{ fontSize: 10, color: t.textMuted }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Activity chart */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '16px' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 16 }}>Detection Activity</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90, paddingBottom: 4 }}>
              {activityData.map((d, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', height: `${(d.count / maxCount) * 68}px`, background: idx === activityData.length - 1 ? `linear-gradient(180deg, ${t.primary}, ${t.secondary})` : t.surface, borderRadius: '5px 5px 2px 2px', minHeight: 6 }} />
                  <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 500 }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: '16px' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 14 }}>Category Breakdown</h4>
            {catBreakdown.map((c, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{c.label}</span>
                  <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{c.pct}%</span>
                </div>
                <div style={{ height: 6, background: t.cardBorder, borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: c.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring patterns */}
        <div style={{ padding: '0 20px 20px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Recurring Patterns</h3>
          {patterns.map((p, idx) => (
            <div key={idx} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: '13px 16px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 6, lineHeight: 1.35 }}>{p.label}</p>
                <div style={{ height: 4, background: t.cardBorder, borderRadius: 2, marginBottom: 4 }}>
                  <div style={{ height: '100%', width: `${p.pct}%`, background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, color: t.textMuted }}>{p.pct}% pattern match</span>
              </div>
            </div>
          ))}
        </div>

        {/* Context layer */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Your Home Context</h3>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {React.createElement(window.lucide.MapPin, { size: 11, color: t.primary })}
              <span style={{ fontSize: 11, color: t.primary, fontWeight: 700 }}>Apt · Pre-2000</span>
            </div>
          </div>
          {contextTips.map((tip, idx) => (
            <div key={idx} style={{ background: t.card, border: `1px solid ${tip.relevant ? t.primary + '45' : t.cardBorder}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0, background: tip.relevant ? t.primary : t.textMuted }} />
              <p style={{ fontSize: 13, color: tip.relevant ? t.text : t.textSub, lineHeight: 1.45 }}>{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
  function SettingsScreen() {
    const prefs = [
      { icon: window.lucide.Bell, label: 'Pattern Alerts', sub: 'Notify when recurring patterns detected', toggled: true },
      { icon: window.lucide.MapPin, label: 'Location Context', sub: 'Adapt advice to your building type', toggled: true },
      { icon: window.lucide.Camera, label: 'Media Access', sub: 'Camera & microphone for media uploads', toggled: false },
    ];
    const links = [
      { icon: window.lucide.Shield, label: 'Privacy', sub: 'Your data stays on this device' },
      { icon: window.lucide.HelpCircle, label: 'Help & FAQ', sub: 'How the detection method works' },
      { icon: window.lucide.Star, label: 'Rate the App', sub: 'Leave a review on the App Store' },
    ];

    return (
      <div style={{ paddingBottom: 24, fontFamily: font }}>
        <div style={{ padding: '18px 20px 16px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Settings</h2>
          <p style={{ fontSize: 13, color: t.textSub }}>Customize your Oddly Useful experience</p>
        </div>

        {/* Profile card */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${t.primary}18, ${t.secondary}0e)`, border: `1px solid ${t.primary}30`, borderRadius: 20, padding: '18px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: 27, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, boxShadow: `0 4px 16px ${t.primaryGlow}` }}>
              🔮
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 3 }}>Your Home Profile</p>
              <p style={{ fontSize: 12, color: t.textSub, marginBottom: 3 }}>Apartment · City · Pre-2000 building</p>
              <p style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>6 incidents tracked · 3 resolved</p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div style={{ padding: '0 20px 18px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, marginBottom: 10 }}>APPEARANCE</p>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {React.createElement(isDark ? window.lucide.Moon : window.lucide.Sun, { size: 19, color: t.primary })}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{isDark ? 'Dark Mode' : 'Light Mode'}</p>
              <p style={{ fontSize: 11, color: t.textMuted }}>Switch to {isDark ? 'light' : 'dark'} theme</p>
            </div>
            <div onClick={() => setIsDark(d => !d)} style={{ width: 50, height: 28, borderRadius: 14, background: isDark ? t.primary : t.cardBorder, position: 'relative', cursor: 'pointer', transition: 'background 0.25s ease', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: isDark ? 24 : 3, width: 22, height: 22, borderRadius: 11, background: '#fff', transition: 'left 0.25s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ padding: '0 20px 18px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, marginBottom: 10 }}>PREFERENCES</p>
          {prefs.map((pref, idx) => (
            <div key={idx} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: idx === 0 ? '16px 16px 4px 4px' : idx === prefs.length - 1 ? '4px 4px 16px 16px' : '4px', padding: '13px 16px', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(pref.icon, { size: 17, color: t.primary })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{pref.label}</p>
                <p style={{ fontSize: 11, color: t.textMuted }}>{pref.sub}</p>
              </div>
              <div style={{ width: 44, height: 26, borderRadius: 13, background: pref.toggled ? t.primary : t.cardBorder, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3, left: pref.toggled ? 20 : 3, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={{ padding: '0 20px 18px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: t.textMuted, letterSpacing: 0.8, marginBottom: 10 }}>MORE</p>
          {links.map((link, idx) => (
            <div key={idx} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: idx === 0 ? '16px 16px 4px 4px' : idx === links.length - 1 ? '4px 4px 16px 16px' : '4px', padding: '13px 16px', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.createElement(link.icon, { size: 17, color: t.primary })}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{link.label}</p>
                <p style={{ fontSize: 11, color: t.textMuted }}>{link.sub}</p>
              </div>
              {React.createElement(window.lucide.ChevronRight, { size: 16, color: t.textMuted })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '4px 20px 0' }}>
          <p style={{ fontSize: 12, color: t.textMuted }}>Oddly Useful · v1.0.0</p>
          <p style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>Turn strange moments into smart actions.</p>
        </div>
      </div>
    );
  }

  // ─── NAV + RENDER ─────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'detect', label: 'Detect', icon: window.lucide.Scan },
    { id: 'archive', label: 'Archive', icon: window.lucide.Archive },
    { id: 'insights', label: 'Insights', icon: window.lucide.TrendingUp },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: HomeScreen,
    detect: DetectScreen,
    archive: ArchiveScreen,
    insights: InsightsScreen,
    settings: SettingsScreen,
  };

  const CurrentScreen = screens[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#1a1530' : '#e8e2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        body { margin: 0; padding: 0; }
      `}</style>

      <div style={{ width: 375, height: 812, background: t.bg, borderRadius: 52, overflow: 'hidden', position: 'relative', boxShadow: isDark ? '0 48px 100px rgba(0,0,0,0.8), 0 0 0 10px #1a1530, 0 0 0 11px #2a2550' : '0 48px 100px rgba(100,60,220,0.25), 0 0 0 10px #e0d8f5, 0 0 0 11px #ccc4ee', transition: 'all 0.3s ease' }}>

        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 122, height: 34, background: '#000', borderRadius: 22, zIndex: 100 }} />

        {/* Status Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 56, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 10px', background: t.bg }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: font }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {React.createElement(window.lucide.Signal, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Wifi, { size: 14, color: t.text })}
            {React.createElement(window.lucide.Battery, { size: 16, color: t.text })}
          </div>
        </div>

        {/* Screen content */}
        <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 80, overflowY: 'auto', overflowX: 'hidden' }}>
          <CurrentScreen />
        </div>

        {/* Bottom Nav */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: t.navBg, borderTop: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 10px', borderRadius: 12, minWidth: 52 }}>
              <div style={{ width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: activeTab === tab.id ? t.primaryGlow : 'transparent', transition: 'background 0.2s ease' }}>
                {React.createElement(tab.icon, { size: 20, color: activeTab === tab.id ? t.primary : t.textMuted, strokeWidth: activeTab === tab.id ? 2.5 : 1.8 })}
              </div>
              <span style={{ fontSize: 10, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? t.primary : t.textMuted, fontFamily: font }}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
