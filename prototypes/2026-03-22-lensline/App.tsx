const { useState, useEffect, useRef } = React;

const themes = {
  dark: {
    bg: "#0A0C10",
    surface: "#12151C",
    surfaceAlt: "#1A1F2B",
    card: "#1E2433",
    cardBorder: "#2A3145",
    primary: "#00E5A0",
    primaryDim: "#00C98B",
    primaryGlow: "rgba(0,229,160,0.15)",
    secondary: "#5B8BF5",
    secondaryDim: "#4070D8",
    accent: "#F59E0B",
    text: "#F0F4FF",
    textSub: "#8A94B2",
    textMuted: "#4A5270",
    badge: "#00E5A0",
    badgeText: "#001A0F",
    alertBg: "#1A1020",
    alertBorder: "#3D1F5A",
    alertAccent: "#C084FC",
    tabBar: "#0E1118",
    tabBarBorder: "#1E2433",
    statusBar: "#0A0C10",
    divider: "#1E2433",
    pillBg: "#1E2433",
    pillBgActive: "#00E5A0",
    pillTextActive: "#001A0F",
    shadow: "rgba(0,0,0,0.5)",
    inputBg: "#1A1F2B",
    toggleTrack: "#2A3145",
    toggleThumb: "#F0F4FF",
    lensCard: "linear-gradient(135deg, #1A2535 0%, #1E2A3A 100%)",
    gradient1: "#00E5A0",
    gradient2: "#5B8BF5",
  },
  light: {
    bg: "#F0F4F8",
    surface: "#FFFFFF",
    surfaceAlt: "#F7F9FC",
    card: "#FFFFFF",
    cardBorder: "#E2E8F0",
    primary: "#00B87A",
    primaryDim: "#009966",
    primaryGlow: "rgba(0,184,122,0.12)",
    secondary: "#3B6FE0",
    secondaryDim: "#2D5CC4",
    accent: "#D97706",
    text: "#0D1117",
    textSub: "#4A5568",
    textMuted: "#A0AEC0",
    badge: "#00B87A",
    badgeText: "#FFFFFF",
    alertBg: "#FAF5FF",
    alertBorder: "#D8B4FE",
    alertAccent: "#9333EA",
    tabBar: "#FFFFFF",
    tabBarBorder: "#E2E8F0",
    statusBar: "#FFFFFF",
    divider: "#EDF2F7",
    pillBg: "#EDF2F7",
    pillBgActive: "#00B87A",
    pillTextActive: "#FFFFFF",
    shadow: "rgba(0,0,0,0.08)",
    inputBg: "#F7F9FC",
    toggleTrack: "#CBD5E0",
    toggleThumb: "#FFFFFF",
    lensCard: "linear-gradient(135deg, #EDF7F4 0%, #E8F4FF 100%)",
    gradient1: "#00B87A",
    gradient2: "#3B6FE0",
  },
};

const fontLink = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { display: none; }
  html, body { background: #0A0C10; }
`;

const newsData = {
  lenses: [
    {
      id: "commute",
      label: "Commute",
      icon: "Train",
      color: "#5B8BF5",
      count: 3,
      urgency: "high",
      stories: [
        {
          id: "c1",
          headline: "Transit Workers Vote on Strike Authorization Tomorrow",
          source: "City Transit Beat",
          time: "42m ago",
          impact: "Your usual Route 14 could be suspended from 6 AM. Plan an alternate or allow 25+ extra minutes.",
          tag: "Affects Your Route",
          readTime: 3,
          image: "🚊",
        },
        {
          id: "c2",
          headline: "New Highway Lane Closures Begin Monday on I-280",
          source: "State DOT",
          time: "2h ago",
          impact: "Evening commuters face delays of 15–30 min through mid-April.",
          tag: "Heads Up",
          readTime: 2,
          image: "🛣️",
        },
        {
          id: "c3",
          headline: "Bike-Share Expansion Adds 40 New Stations Downtown",
          source: "Metro Mobility",
          time: "5h ago",
          impact: "Three new stations within 2 blocks of your office. Good alternative on strike days.",
          tag: "Useful",
          readTime: 2,
          image: "🚲",
        },
      ],
    },
    {
      id: "housing",
      label: "Housing",
      icon: "Home",
      color: "#F59E0B",
      count: 2,
      urgency: "medium",
      stories: [
        {
          id: "h1",
          headline: "City Council Votes on Tenant Protections Bill This Week",
          source: "Housing Reporter",
          time: "1h ago",
          impact: "If passed, your rent increase cap drops from 10% to 5% annually. Vote is Thursday.",
          tag: "Affects You",
          readTime: 4,
          image: "🏠",
        },
        {
          id: "h2",
          headline: "Mortgage Rates Fall for Third Consecutive Week",
          source: "Financial Times",
          time: "3h ago",
          impact: "30-year fixed now at 6.4%. Could improve buying power by $30K on a median home.",
          tag: "Notable",
          readTime: 3,
          image: "📉",
        },
      ],
    },
    {
      id: "work",
      label: "Work & Tax",
      icon: "Briefcase",
      color: "#00E5A0",
      count: 4,
      urgency: "high",
      stories: [
        {
          id: "w1",
          headline: "IRS Extends Freelancer Estimated Tax Deadline by Two Weeks",
          source: "Tax Wire",
          time: "30m ago",
          impact: "Q1 payment now due April 30 instead of April 15. Applies to self-employed filers.",
          tag: "Action May Be Needed",
          readTime: 2,
          image: "📋",
        },
        {
          id: "w2",
          headline: "Home Office Deduction Rules Clarified for 2025",
          source: "Freelancer Hub",
          time: "4h ago",
          impact: "Exclusive-use rule now more strictly enforced. Review your workspace documentation.",
          tag: "Review Needed",
          readTime: 5,
          image: "💼",
        },
        {
          id: "w3",
          headline: "Senate Passes Gig Worker Benefits Framework",
          source: "Labor Report",
          time: "6h ago",
          impact: "Portable benefits pilot launches in 8 states. Could expand healthcare options for freelancers.",
          tag: "Watch This",
          readTime: 4,
          image: "⚖️",
        },
        {
          id: "w4",
          headline: "AI Tools Now Eligible for Business Expense Deduction",
          source: "Tech Policy Brief",
          time: "8h ago",
          impact: "Software subscriptions like AI assistants can be deducted as business tools for tax year 2025.",
          tag: "Good News",
          readTime: 2,
          image: "🤖",
        },
      ],
    },
    {
      id: "weather",
      label: "Weather",
      icon: "Cloud",
      color: "#C084FC",
      count: 1,
      urgency: "medium",
      stories: [
        {
          id: "wt1",
          headline: "Atmospheric River to Bring Heavy Rain Wednesday–Friday",
          source: "National Weather Service",
          time: "1h ago",
          impact: "Expect 2–4 inches of rain. High winds Thursday PM could delay your evening commute by 40+ minutes.",
          tag: "Plan Ahead",
          readTime: 2,
          image: "🌧️",
        },
      ],
    },
  ],
  alerts: [
    {
      id: "a1",
      type: "urgent",
      icon: "Zap",
      title: "Transit Strike Vote Tonight",
      body: "This could suspend your Route 14 starting tomorrow 6 AM. Consider leaving 30 min earlier or using the N-Judah line.",
      time: "Just now",
      read: false,
      color: "#F59E0B",
    },
    {
      id: "a2",
      type: "practical",
      icon: "FileText",
      title: "Tax Deadline Extended — You're Affected",
      body: "As a freelancer, your Q1 estimated payment is now due April 30. No action needed today — just update your calendar.",
      time: "32m ago",
      read: false,
      color: "#00E5A0",
    },
    {
      id: "a3",
      type: "weather",
      icon: "CloudRain",
      title: "Storm Could Delay Your Thursday Evening",
      body: "Heavy rain + high winds forecast 5–9 PM Thursday. Your area historically sees 35–45 min transit delays in these conditions.",
      time: "1h ago",
      read: false,
      color: "#C084FC",
    },
    {
      id: "a4",
      type: "policy",
      icon: "Vote",
      title: "Rent Protection Vote This Thursday",
      body: "City council votes on capping rent increases at 5%. Based on your housing context, this directly affects your lease terms.",
      time: "2h ago",
      read: true,
      color: "#5B8BF5",
    },
    {
      id: "a5",
      type: "practical",
      icon: "Shield",
      title: "Home Office Deduction Rules Changed",
      body: "New IRS guidance on exclusive-use rule. Review your home workspace setup before filing. Affects freelancers working from home.",
      time: "4h ago",
      read: true,
      color: "#00E5A0",
    },
    {
      id: "a6",
      type: "local",
      icon: "MapPin",
      title: "New Bike-Share Stations Near Your Office",
      body: "3 new Bike Share docks opened within a 2-block radius of your saved work location. Useful on transit disruption days.",
      time: "5h ago",
      read: true,
      color: "#F59E0B",
    },
  ],
  bundles: [
    {
      id: "b1",
      title: "The Transit Strike: What It Means for Your Week",
      articles: 5,
      readTime: 8,
      tag: "Breaking Bundle",
      tagColor: "#F59E0B",
      description: "Workers vote tonight, service disruptions possible by tomorrow. Includes route maps, alternate options, and negotiation timeline.",
      topics: ["Strike background", "Affected routes", "Alternatives", "Timeline", "City response"],
      icon: "Train",
      color: "#5B8BF5",
    },
    {
      id: "b2",
      title: "Freelancer Tax Season 2025: Everything Changing",
      articles: 7,
      readTime: 12,
      tag: "Deep Dive",
      tagColor: "#00E5A0",
      description: "New deductions, revised deadlines, and gig worker legislation. Built from IRS guidance, policy analysis, and expert commentary.",
      topics: ["Q1 deadline extension", "Home office rules", "AI tool deductions", "Gig benefits bill", "Health insurance options"],
      icon: "Receipt",
      color: "#00E5A0",
    },
    {
      id: "b3",
      title: "Housing in Your City: Rents, Rates & the Vote",
      articles: 4,
      readTime: 7,
      tag: "Policy Bundle",
      tagColor: "#5B8BF5",
      description: "Mortgage rate trends, the upcoming tenant protection vote, and neighborhood-level rent data all in one read.",
      topics: ["Rate analysis", "Council vote preview", "Neighborhood data", "Landlord response"],
      icon: "Home",
      color: "#F59E0B",
    },
    {
      id: "b4",
      title: "This Week's Weather: Planning Guide",
      articles: 3,
      readTime: 4,
      tag: "Practical",
      tagColor: "#C084FC",
      description: "The atmospheric river breakdown, commute impact by day, and what to watch for if you have outdoor plans this weekend.",
      topics: ["Day-by-day forecast", "Commute impacts", "Weekend outlook"],
      icon: "Cloud",
      color: "#C084FC",
    },
  ],
  briefings: [
    {
      id: "br1",
      title: "Your Sunday Evening Briefing",
      subtitle: "4 things that matter for your week ahead",
      readTime: 3,
      date: "Tonight · Mar 22",
      sections: [
        {
          emoji: "🚊",
          label: "Commute Risk",
          headline: "Transit strike vote could affect Monday morning",
          body: "Workers at the city transit authority vote tonight on strike authorization. If approved, disruptions could begin as early as 6 AM Monday. Your Route 14 is among those flagged. Backup options: N-Judah, Caltrain from 4th St, or bike share.",
        },
        {
          emoji: "💼",
          label: "Tax & Work",
          headline: "IRS gives freelancers two extra weeks",
          body: "Estimated Q1 taxes now due April 30 instead of April 15. The extension applies automatically — no filing needed. Use the extra time to confirm your home office documentation is accurate under the newly clarified rules.",
        },
        {
          emoji: "🏠",
          label: "Housing",
          headline: "Rent cap vote Thursday — what to expect",
          body: "City council votes Thursday on a bill to cap annual rent increases at 5%, down from the current 10% limit. Vote is expected to be close. If it passes, it takes effect for leases renewing after June 1.",
        },
        {
          emoji: "🌧️",
          label: "Weather",
          headline: "Heavy rain mid-week, worst Thursday evening",
          body: "An atmospheric river brings 2–4 inches of rain Wednesday through Friday. Thursday evening rush is the highest-impact window. Plan to leave early or expect 30–45 minute delays on transit and surface streets.",
        },
      ],
    },
  ],
};

const lensSettings = [
  { id: "commute", label: "Daily Commute", icon: "Train", desc: "Route 14, N-Judah", active: true },
  { id: "work", label: "Freelance & Tax", icon: "Briefcase", desc: "Self-employed, tech", active: true },
  { id: "housing", label: "Housing & Rent", icon: "Home", desc: "Renter, SF area", active: true },
  { id: "family", label: "Family & School", icon: "Users", desc: "Not configured", active: false },
  { id: "health", label: "Health & Wellness", icon: "Heart", desc: "Not configured", active: false },
  { id: "travel", label: "Travel & Flights", icon: "Plane", desc: "Not configured", active: false },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [tab, setTab] = useState("today");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedLens, setExpandedLens] = useState("commute");
  const [readStory, setReadStory] = useState(null);
  const [readBundle, setReadBundle] = useState(null);
  const [readBriefing, setReadBriefing] = useState(false);
  const [alertRead, setAlertRead] = useState({});
  const [lenses, setLenses] = useState(lensSettings);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [notifCount, setNotifCount] = useState(3);

  const t = themes[theme];

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const press = (id) => { setPressedBtn(id); setTimeout(() => setPressedBtn(null), 150); };

  const markAlertRead = (id) => setAlertRead(prev => ({ ...prev, [id]: true }));

  const unreadAlerts = newsData.alerts.filter(a => !a.read && !alertRead[a.id]).length;

  const IconComp = ({ name, size = 18, color, style = {} }) => {
    const Icon = window.lucide && window.lucide[name];
    if (!Icon) return <span style={{ color, fontSize: size, ...style }}>●</span>;
    return <Icon size={size} color={color} style={style} />;
  };

  const urgencyColors = { high: "#F59E0B", medium: "#5B8BF5", low: "#00E5A0" };

  const StatusBar = () => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 6px", background: t.statusBar }}>
      <span style={{ color: t.text, fontSize: 13, fontWeight: 600, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ width: 120, height: 30, background: "#000", borderRadius: 20, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 8 }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <IconComp name="Wifi" size={13} color={t.textSub} />
        <IconComp name="Signal" size={13} color={t.textSub} />
        <div style={{ width: 24, height: 12, border: `1.5px solid ${t.textSub}`, borderRadius: 3, display: "flex", alignItems: "center", padding: "0 1.5px", position: "relative" }}>
          <div style={{ width: "75%", height: 8, background: t.primary, borderRadius: 1.5 }} />
          <div style={{ width: 2, height: 6, background: t.textSub, borderRadius: 1, position: "absolute", right: -4 }} />
        </div>
      </div>
    </div>
  );

  const TabBar = () => {
    const tabs = [
      { id: "today", icon: "Layers", label: "Today" },
      { id: "bundles", icon: "BookOpen", label: "Bundles" },
      { id: "alerts", icon: "Bell", label: "Alerts", badge: unreadAlerts },
      { id: "briefing", icon: "Newspaper", label: "Briefing" },
      { id: "lens", icon: "SlidersHorizontal", label: "My Lens" },
    ];
    return (
      <div style={{ display: "flex", borderTop: `1px solid ${t.tabBarBorder}`, background: t.tabBar, paddingBottom: 8 }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => { press(tb.id); setTab(tb.id); }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 0 4px", background: "none", border: "none", cursor: "pointer", position: "relative", transform: pressedBtn === tb.id ? "scale(0.9)" : "scale(1)", transition: "transform 0.1s" }}>
            {tb.badge > 0 && (
              <div style={{ position: "absolute", top: 6, left: "50%", marginLeft: 4, width: 16, height: 16, background: "#EF4444", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{tb.badge}</span>
              </div>
            )}
            <IconComp name={tb.icon} size={20} color={tab === tb.id ? t.primary : t.textMuted} />
            <span style={{ fontSize: 10, fontWeight: tab === tb.id ? 600 : 400, color: tab === tb.id ? t.primary : t.textMuted }}>{tb.label}</span>
          </button>
        ))}
      </div>
    );
  };

  // STORY MODAL
  if (readStory) {
    const story = readStory;
    return (
      <div style={{ background: "#0A0C10", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
        <style>{fontLink}</style>
        <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 44, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: `0 30px 80px ${t.shadow}` }}>
          <StatusBar />
          <div style={{ flex: 1, overflowY: "auto", padding: "0 0 20px" }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${t.card} 0%, ${t.surfaceAlt} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
              {story.image}
            </div>
            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: t.primaryGlow, color: t.primary, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: `1px solid ${t.primary}40` }}>{story.tag}</span>
                <span style={{ background: t.pillBg, color: t.textSub, fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>{story.readTime} min read</span>
              </div>
              <h2 style={{ color: t.text, fontSize: 20, fontWeight: 700, lineHeight: 1.35, marginBottom: 8 }}>{story.headline}</h2>
              <div style={{ display: "flex", gap: 8, color: t.textMuted, fontSize: 12, marginBottom: 16 }}>
                <span style={{ fontWeight: 600, color: t.textSub }}>{story.source}</span>
                <span>·</span>
                <span>{story.time}</span>
              </div>
              <div style={{ background: t.primaryGlow, border: `1px solid ${t.primary}30`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <IconComp name="Lightbulb" size={16} color={t.primary} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ color: t.primary, fontSize: 11, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Impact</div>
                    <div style={{ color: t.text, fontSize: 14, lineHeight: 1.5 }}>{story.impact}</div>
                  </div>
                </div>
              </div>
              <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>This developing story has been tracked across 4 sources since early this morning. The core issue stems from contract negotiations that have been ongoing for several months, with key disputes over wages and staffing levels reaching a critical point ahead of the weekend deadline.</p>
              <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>City officials have expressed confidence that a resolution can be reached, though labor organizers are maintaining their position. The vote tonight at 7 PM will determine whether strike authorization is officially granted to union leadership.</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <button style={{ flex: 1, background: t.primary, color: t.badgeText, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Read Full Story</button>
                <button style={{ width: 48, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <IconComp name="Share2" size={18} color={t.textSub} />
                </button>
                <button style={{ width: 48, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <IconComp name="Bookmark" size={18} color={t.textSub} />
                </button>
              </div>
            </div>
          </div>
          <div style={{ padding: "0 20px 4px", borderTop: `1px solid ${t.divider}` }}>
            <button onClick={() => setReadStory(null)} style={{ width: "100%", background: t.card, color: t.text, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
              <IconComp name="ArrowLeft" size={16} color={t.textSub} /> Back
            </button>
          </div>
          <TabBar />
        </div>
      </div>
    );
  }

  // BUNDLE DETAIL
  if (readBundle) {
    const bundle = readBundle;
    return (
      <div style={{ background: "#0A0C10", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
        <style>{fontLink}</style>
        <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 44, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: `0 30px 80px ${t.shadow}` }}>
          <StatusBar />
          <div style={{ flex: 1, overflowY: "auto", padding: "0 0 20px" }}>
            <div style={{ height: 140, background: `linear-gradient(135deg, ${bundle.color}22 0%, ${bundle.color}08 100%)`, borderBottom: `1px solid ${bundle.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: `${bundle.color}22`, border: `1px solid ${bundle.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconComp name={bundle.icon} size={26} color={bundle.color} />
              </div>
            </div>
            <div style={{ padding: "20px 20px 0" }}>
              <span style={{ background: `${bundle.tagColor}20`, color: bundle.tagColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: `1px solid ${bundle.tagColor}40`, textTransform: "uppercase", letterSpacing: 0.5 }}>{bundle.tag}</span>
              <h2 style={{ color: t.text, fontSize: 19, fontWeight: 700, lineHeight: 1.3, marginTop: 12, marginBottom: 8 }}>{bundle.title}</h2>
              <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{bundle.description}</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
                  <IconComp name="FileText" size={14} color={t.textSub} />
                  <span style={{ color: t.textSub, fontSize: 13 }}>{bundle.articles} articles</span>
                </div>
                <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
                  <IconComp name="Clock" size={14} color={t.textSub} />
                  <span style={{ color: t.textSub, fontSize: 13 }}>{bundle.readTime} min read</span>
                </div>
              </div>
              <div style={{ color: t.text, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>What's inside</div>
              {bundle.topics.map((topic, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${t.divider}` }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: bundle.color, flexShrink: 0 }} />
                  <span style={{ color: t.textSub, fontSize: 14 }}>{topic}</span>
                  <IconComp name="ChevronRight" size={14} color={t.textMuted} style={{ marginLeft: "auto" }} />
                </div>
              ))}
              <button style={{ width: "100%", background: t.primary, color: t.badgeText, border: "none", borderRadius: 14, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 20 }}>
                Start Reading Bundle
              </button>
            </div>
          </div>
          <div style={{ padding: "0 20px 4px", borderTop: `1px solid ${t.divider}` }}>
            <button onClick={() => setReadBundle(null)} style={{ width: "100%", background: t.card, color: t.text, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
              <IconComp name="ArrowLeft" size={16} color={t.textSub} /> Back
            </button>
          </div>
          <TabBar />
        </div>
      </div>
    );
  }

  // BRIEFING DETAIL
  if (readBriefing) {
    const briefing = newsData.briefings[0];
    return (
      <div style={{ background: "#0A0C10", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
        <style>{fontLink}</style>
        <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 44, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: `0 30px 80px ${t.shadow}` }}>
          <StatusBar />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ background: `linear-gradient(135deg, ${t.primary}18 0%, ${t.secondary}10 100%)`, padding: "20px 20px 24px", borderBottom: `1px solid ${t.divider}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <IconComp name="Newspaper" size={16} color={t.primary} />
                <span style={{ color: t.primary, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>LensLine Briefing</span>
              </div>
              <h2 style={{ color: t.text, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{briefing.title}</h2>
              <p style={{ color: t.textSub, fontSize: 13 }}>{briefing.date} · {briefing.readTime} min read</p>
            </div>
            <div style={{ padding: "16px 20px 80px" }}>
              {briefing.sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: 20, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px 0", display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{sec.emoji}</span>
                    <div>
                      <div style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{sec.label}</div>
                      <div style={{ color: t.text, fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{sec.headline}</div>
                    </div>
                  </div>
                  <div style={{ padding: "0 16px 14px" }}>
                    <p style={{ color: t.textSub, fontSize: 13.5, lineHeight: 1.65 }}>{sec.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px 20px 4px", borderTop: `1px solid ${t.divider}`, background: t.tabBar }}>
            <button onClick={() => setReadBriefing(false)} style={{ width: "100%", background: t.card, color: t.text, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <IconComp name="ArrowLeft" size={16} color={t.textSub} /> Back to Briefing
            </button>
          </div>
          <TabBar />
        </div>
      </div>
    );
  }

  // TODAY SCREEN
  const TodayScreen = () => {
    const allLenses = newsData.lenses;
    const filters = ["all", "commute", "work", "housing", "weather"];
    const filtered = activeFilter === "all" ? allLenses : allLenses.filter(l => l.id === activeFilter);

    return (
      <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: 0.3 }}>SUNDAY, MARCH 22</div>
              <div style={{ color: t.text, fontSize: 22, fontWeight: 700 }}>Your Daily Lens</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>M</span>
            </div>
          </div>
          {/* Life themes summary */}
          <div style={{ marginTop: 12, padding: "10px 14px", background: t.primaryGlow, border: `1px solid ${t.primary}30`, borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <IconComp name="Zap" size={15} color={t.primary} />
            <span style={{ color: t.textSub, fontSize: 12.5 }}><span style={{ color: t.primary, fontWeight: 600 }}>3 contexts active</span> · Commute, Freelance, Housing</span>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: `1px solid ${activeFilter === f ? "transparent" : t.cardBorder}`, background: activeFilter === f ? t.primary : t.pillBg, color: activeFilter === f ? t.badgeText : t.textSub, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Lens sections */}
        <div style={{ padding: "12px 0 100px" }}>
          {filtered.map(lens => (
            <div key={lens.id} style={{ marginBottom: 8 }}>
              {/* Lens header */}
              <button onClick={() => setExpandedLens(expandedLens === lens.id ? null : lens.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: t.surface, border: "none", borderBottom: `1px solid ${t.divider}`, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${lens.color}20`, border: `1px solid ${lens.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconComp name={lens.icon} size={16} color={lens.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: t.text, fontSize: 14, fontWeight: 700 }}>{lens.label}</div>
                  <div style={{ color: t.textMuted, fontSize: 12 }}>{lens.count} stories · {lens.urgency === "high" ? "⚡ Urgent" : lens.urgency === "medium" ? "📌 Notable" : "💡 Info"}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: 11, background: urgencyColors[lens.urgency] + "20", border: `1px solid ${urgencyColors[lens.urgency]}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: urgencyColors[lens.urgency], fontSize: 11, fontWeight: 700 }}>{lens.count}</span>
                </div>
                <IconComp name={expandedLens === lens.id ? "ChevronUp" : "ChevronDown"} size={16} color={t.textMuted} />
              </button>

              {/* Stories */}
              {expandedLens === lens.id && lens.stories.map((story, si) => (
                <button key={story.id} onClick={() => setReadStory(story)} style={{ width: "100%", display: "flex", gap: 12, padding: "14px 20px", background: si % 2 === 0 ? t.bg : t.surface, border: "none", borderBottom: `1px solid ${t.divider}`, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: t.card, border: `1px solid ${t.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{story.image}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                      <span style={{ background: `${lens.color}20`, color: lens.color, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, flexShrink: 0 }}>{story.tag}</span>
                    </div>
                    <div style={{ color: t.text, fontSize: 13.5, fontWeight: 600, lineHeight: 1.35, marginBottom: 5 }}>{story.headline}</div>
                    <div style={{ color: t.primary, fontSize: 12, lineHeight: 1.4, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.impact}</div>
                    <div style={{ display: "flex", gap: 8, color: t.textMuted, fontSize: 11 }}>
                      <span>{story.source}</span><span>·</span><span>{story.time}</span><span>·</span><span>{story.readTime}m read</span>
                    </div>
                  </div>
                  <IconComp name="ChevronRight" size={14} color={t.textMuted} style={{ flexShrink: 0, marginTop: 6 }} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // BUNDLES SCREEN
  const BundlesScreen = () => (
    <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
      <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
        <div style={{ color: t.text, fontSize: 22, fontWeight: 700 }}>Context Bundles</div>
        <p style={{ color: t.textSub, fontSize: 13, marginTop: 4 }}>Deep dives combining articles, maps & timelines</p>
      </div>
      <div style={{ padding: "16px 16px 100px", display: "flex", flexDirection: "column", gap: 12 }}>
        {newsData.bundles.map(bundle => (
          <button key={bundle.id} onClick={() => setReadBundle(bundle)} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: "18px", textAlign: "left", cursor: "pointer", width: "100%" }}>
            <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: `${bundle.color}18`, border: `1px solid ${bundle.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconComp name={bundle.icon} size={24} color={bundle.color} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ background: `${bundle.tagColor}18`, color: bundle.tagColor, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{bundle.tag}</span>
                <div style={{ color: t.text, fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginTop: 6 }}>{bundle.title}</div>
              </div>
            </div>
            <p style={{ color: t.textSub, fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>{bundle.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <IconComp name="FileText" size={13} color={t.textMuted} />
                  <span style={{ color: t.textMuted, fontSize: 12 }}>{bundle.articles} articles</span>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <IconComp name="Clock" size={13} color={t.textMuted} />
                  <span style={{ color: t.textMuted, fontSize: 12 }}>{bundle.readTime} min</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", color: t.primary, fontSize: 13, fontWeight: 600 }}>
                Open <IconComp name="ArrowRight" size={14} color={t.primary} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ALERTS SCREEN
  const AlertsScreen = () => (
    <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
      <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: t.text, fontSize: 22, fontWeight: 700 }}>Smart Alerts</div>
            <p style={{ color: t.textSub, fontSize: 13, marginTop: 2 }}>Only what's relevant to your day</p>
          </div>
          {unreadAlerts > 0 && <span style={{ background: t.primary, color: t.badgeText, fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 12 }}>{unreadAlerts} new</span>}
        </div>
      </div>
      <div style={{ padding: "12px 16px 100px" }}>
        {newsData.alerts.map(alert => {
          const isRead = alert.read || alertRead[alert.id];
          return (
            <button key={alert.id} onClick={() => markAlertRead(alert.id)} style={{ width: "100%", display: "flex", gap: 12, padding: "14px 16px", background: isRead ? t.card : `${alert.color}08`, border: `1px solid ${isRead ? t.cardBorder : alert.color + "30"}`, borderRadius: 14, marginBottom: 8, textAlign: "left", cursor: "pointer", position: "relative" }}>
              {!isRead && <div style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: 4, background: alert.color }} />}
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${alert.color}20`, border: `1px solid ${alert.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconComp name={alert.icon} size={18} color={alert.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: isRead ? t.textSub : t.text, fontSize: 14, fontWeight: isRead ? 500 : 700, lineHeight: 1.3, marginBottom: 5 }}>{alert.title}</div>
                <div style={{ color: t.textSub, fontSize: 12.5, lineHeight: 1.55, marginBottom: 6 }}>{alert.body}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{alert.time}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // BRIEFING SCREEN
  const BriefingScreen = () => {
    const briefing = newsData.briefings[0];
    return (
      <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
          <div style={{ color: t.text, fontSize: 22, fontWeight: 700 }}>Briefing</div>
          <p style={{ color: t.textSub, fontSize: 13, marginTop: 2 }}>Long-form journalism in 3 minutes</p>
        </div>

        {/* Today's briefing card */}
        <div style={{ margin: "16px 16px 12px", background: `linear-gradient(135deg, ${t.primary}18 0%, ${t.secondary}10 100%)`, border: `1px solid ${t.primary}30`, borderRadius: 20, padding: "20px", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: 50, background: `${t.primary}10` }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <IconComp name="Newspaper" size={15} color={t.primary} />
            <span style={{ color: t.primary, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>Today's Briefing</span>
          </div>
          <div style={{ color: t.text, fontSize: 19, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{briefing.title}</div>
          <div style={{ color: t.textSub, fontSize: 13, marginBottom: 16 }}>{briefing.date} · {briefing.readTime} min read</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {briefing.sections.map((s, i) => (
              <span key={i} style={{ background: t.card + "90", color: t.textSub, fontSize: 11, padding: "3px 10px", borderRadius: 12, border: `1px solid ${t.cardBorder}` }}>
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
          <button onClick={() => setReadBriefing(true)} style={{ width: "100%", background: t.primary, color: t.badgeText, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Read in 3 Minutes →
          </button>
        </div>

        {/* Preview cards */}
        <div style={{ padding: "0 16px 100px" }}>
          <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Inside Today's Briefing</div>
          {briefing.sections.map((sec, i) => (
            <div key={i} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{sec.emoji}</span>
              <div>
                <div style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{sec.label}</div>
                <div style={{ color: t.text, fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>{sec.headline}</div>
              </div>
            </div>
          ))}

          {/* Previous briefings */}
          <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 16, marginBottom: 10 }}>Previous Briefings</div>
          {["Saturday, Mar 21", "Friday, Mar 20", "Thursday, Mar 19"].map((day, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, marginBottom: 6 }}>
              <div>
                <div style={{ color: t.textSub, fontSize: 13, fontWeight: 600 }}>{day}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>4 topics · 3 min</div>
              </div>
              <IconComp name="ChevronRight" size={14} color={t.textMuted} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // LENS / SETTINGS SCREEN
  const LensScreen = () => {
    const [localLenses, setLocalLenses] = useState(lenses);

    const toggle = (id) => {
      setLocalLenses(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
    };

    return (
      <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
        <div style={{ padding: "16px 20px 12px", background: t.surface, borderBottom: `1px solid ${t.divider}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: t.text, fontSize: 22, fontWeight: 700 }}>My Lens</div>
              <p style={{ color: t.textSub, fontSize: 13, marginTop: 2 }}>Configure your life contexts</p>
            </div>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} style={{ width: 38, height: 38, borderRadius: 19, background: t.card, border: `1px solid ${t.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <IconComp name={theme === "dark" ? "Sun" : "Moon"} size={18} color={t.textSub} />
            </button>
          </div>
        </div>

        <div style={{ padding: "16px 16px 24px" }}>
          {/* Profile */}
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, padding: "16px", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>M</span>
              </div>
              <div>
                <div style={{ color: t.text, fontSize: 16, fontWeight: 700 }}>Maya Chen</div>
                <div style={{ color: t.textSub, fontSize: 13 }}>Freelance Designer · San Francisco</div>
              </div>
              <button style={{ marginLeft: "auto", background: t.pillBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "6px 12px", color: t.textSub, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
            </div>
          </div>

          {/* Life contexts */}
          <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Life Contexts</div>
          {localLenses.map((lens) => (
            <div key={lens.id} style={{ background: t.card, border: `1px solid ${lens.active ? t.primary + "30" : t.cardBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: lens.active ? t.primaryGlow : t.pillBg, border: `1px solid ${lens.active ? t.primary + "40" : t.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconComp name={lens.icon} size={17} color={lens.active ? t.primary : t.textMuted} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{lens.label}</div>
                <div style={{ color: t.textMuted, fontSize: 12 }}>{lens.desc}</div>
              </div>
              {/* Toggle */}
              <div onClick={() => toggle(lens.id)} style={{ width: 44, height: 26, borderRadius: 13, background: lens.active ? t.primary : t.toggleTrack, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 3, left: lens.active ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
              </div>
            </div>
          ))}

          {/* Alert preferences */}
          <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 16, marginBottom: 10 }}>Alert Preferences</div>
          {[
            { label: "Commute disruptions", desc: "Strike, delays, closures", on: true, icon: "Train" },
            { label: "Breaking relevance", desc: "Only when it affects you", on: true, icon: "Zap" },
            { label: "Policy & legislation", desc: "Bills that affect your contexts", on: true, icon: "FileText" },
            { label: "Daily briefing", desc: "Every morning at 7 AM", on: false, icon: "Bell" },
          ].map((pref, i) => (
            <div key={i} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "12px 16px", marginBottom: 6, display: "flex", gap: 10, alignItems: "center" }}>
              <IconComp name={pref.icon} size={16} color={t.textSub} />
              <div style={{ flex: 1 }}>
                <div style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{pref.label}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{pref.desc}</div>
              </div>
              <div style={{ width: 38, height: 22, borderRadius: 11, background: pref.on ? t.primary : t.toggleTrack, position: "relative", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 3, left: pref.on ? 19 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}

          {/* Appearance */}
          <div style={{ color: t.textMuted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 16, marginBottom: 10 }}>Appearance</div>
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
            <IconComp name={theme === "dark" ? "Moon" : "Sun"} size={18} color={t.textSub} />
            <div style={{ flex: 1 }}>
              <div style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{theme === "dark" ? "Dark Mode" : "Light Mode"}</div>
              <div style={{ color: t.textMuted, fontSize: 12 }}>Tap to switch theme</div>
            </div>
            <button onClick={toggleTheme} style={{ background: t.pillBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "6px 14px", color: t.textSub, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {theme === "dark" ? "Go Light" : "Go Dark"}
            </button>
          </div>

          <div style={{ marginTop: 24, padding: "0 4px" }}>
            <div style={{ color: t.textMuted, fontSize: 12, textAlign: "center" }}>LensLine · v1.0.0 · Personalized news for your real day</div>
          </div>
        </div>
      </div>
    );
  };

  const screens = { today: <TodayScreen />, bundles: <BundlesScreen />, alerts: <AlertsScreen />, briefing: <BriefingScreen />, lens: <LensScreen /> };

  return (
    <div style={{ background: "#0A0C10", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{fontLink}</style>
      <div style={{ width: 375, height: 812, background: t.surface, borderRadius: 44, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: `0 30px 80px ${t.shadow}, 0 0 0 1px ${t.cardBorder}` }}>
        <StatusBar />
        {screens[tab]}
        <TabBar />
      </div>
    </div>
  );
}
