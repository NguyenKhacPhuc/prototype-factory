const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F4F2FF',
    surface: '#FFFFFF',
    surfaceAlt: '#EDE9FF',
    card: '#FFFFFF',
    cardBorder: '#E5DFFF',
    text: '#1A1035',
    textSecondary: '#6B5E8A',
    textMuted: '#9E92B8',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    primaryDark: '#5B21B6',
    primarySurface: '#EDE9FF',
    accent: '#06B6D4',
    accentSurface: '#ECFEFF',
    success: '#10B981',
    successSurface: '#D1FAE5',
    warning: '#F59E0B',
    warningSurface: '#FEF3C7',
    danger: '#EF4444',
    dangerSurface: '#FEE2E2',
    navBg: '#FFFFFF',
    navBorder: '#E5DFFF',
    inputBg: '#F4F2FF',
    divider: '#EDE9FF',
    statusBar: '#1A1035',
    shadow: 'rgba(124,58,237,0.12)',
  },
  dark: {
    bg: '#0F0A1E',
    surface: '#1A1035',
    surfaceAlt: '#221748',
    card: '#1E1540',
    cardBorder: '#2D2060',
    text: '#F0EEFF',
    textSecondary: '#A99FCE',
    textMuted: '#6B5E8A',
    primary: '#A78BFA',
    primaryLight: '#C4B5FD',
    primaryDark: '#7C3AED',
    primarySurface: '#2D2060',
    accent: '#22D3EE',
    accentSurface: '#0C2A30',
    success: '#34D399',
    successSurface: '#052E1A',
    warning: '#FBBF24',
    warningSurface: '#2C1B00',
    danger: '#F87171',
    dangerSurface: '#2D0B0B',
    navBg: '#1A1035',
    navBorder: '#2D2060',
    inputBg: '#221748',
    divider: '#2D2060',
    statusBar: '#F0EEFF',
    shadow: 'rgba(167,139,250,0.15)',
  },
};

const tagColors = {
  work: { bg: '#EDE9FF', text: '#5B21B6', dark_bg: '#2D2060', dark_text: '#C4B5FD' },
  personal: { bg: '#D1FAE5', text: '#065F46', dark_bg: '#052E1A', dark_text: '#34D399' },
  urgent: { bg: '#FEE2E2', text: '#B91C1C', dark_bg: '#2D0B0B', dark_text: '#F87171' },
  meeting: { bg: '#ECFEFF', text: '#0E7490', dark_bg: '#0C2A30', dark_text: '#22D3EE' },
  followup: { bg: '#FEF3C7', text: '#92400E', dark_bg: '#2C1B00', dark_text: '#FBBF24' },
};

function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isDark, setIsDark] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [captureMode, setCaptureMode] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [pressedItem, setPressedItem] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [focusFilter, setFocusFilter] = useState('all');
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');
  const timerRef = useRef(null);

  const t = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      body { background: #e8e8e8; font-family: 'Plus Jakarta Sans', sans-serif; }
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 1; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes notif-slide {
        0% { transform: translateY(-60px); opacity: 0; }
        15% { transform: translateY(0); opacity: 1; }
        80% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-60px); opacity: 0; }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes wave {
        0%, 100% { height: 8px; }
        50% { height: 24px; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const showNotif = (msg) => {
    setNotifMsg(msg);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 3000);
  };

  const toggleComplete = (id) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const inboxItems = [
    {
      id: 'i1',
      type: 'voice',
      source: 'Voice Note',
      time: '2 min ago',
      preview: '"Call Marcus about the venue deposit before end of day, and check if catering confirmed for Saturday"',
      tasks: ['Call Marcus re: venue deposit', 'Confirm catering for Saturday'],
      tags: ['urgent', 'personal'],
      linked: true,
      icon: 'Mic',
    },
    {
      id: 'i2',
      type: 'screenshot',
      source: 'Screenshot',
      time: '18 min ago',
      preview: 'The Grand Hall — Reservation Confirmation #GH-2847, Saturday Mar 28 @ 6PM, Deposit due by Mar 24',
      tasks: ['Pay venue deposit by Mar 24', 'Add reservation to calendar'],
      tags: ['personal', 'urgent'],
      linked: true,
      icon: 'Image',
    },
    {
      id: 'i3',
      type: 'email',
      source: 'Email from Dana',
      time: '1 hr ago',
      preview: '"Hey — can you send me that Q1 deck before our 3pm? Also let\'s revisit the roadmap next week."',
      tasks: ['Send Q1 deck to Dana', 'Schedule roadmap review next week'],
      tags: ['work', 'followup'],
      linked: false,
      icon: 'Mail',
    },
    {
      id: 'i4',
      type: 'clipboard',
      source: 'Copied Text',
      time: '2 hr ago',
      preview: 'Dr. Patel appointment: Tuesday Apr 1 @ 10:30am — bring insurance card and referral form',
      tasks: ['Add Dr. Patel appt to calendar', 'Prepare insurance card + referral'],
      tags: ['personal', 'meeting'],
      linked: false,
      icon: 'Clipboard',
    },
    {
      id: 'i5',
      type: 'voice',
      source: 'Voice Note',
      time: '3 hr ago',
      preview: '"Don\'t forget to review the contractor proposal Jess sent, and loop in Tom before we decide"',
      tasks: ['Review contractor proposal from Jess', 'Brief Tom before decision'],
      tags: ['work'],
      linked: true,
      icon: 'Mic',
    },
  ];

  const taskChains = [
    {
      id: 'c1',
      title: 'Saturday Event',
      progress: 1,
      total: 5,
      color: '#7C3AED',
      steps: [
        { id: 's1', text: 'Pay venue deposit by Mar 24', done: false, dep: null, context: 'From: Reservation #GH-2847 screenshot', time: 'Today' },
        { id: 's2', text: 'Confirm catering headcount', done: false, dep: 's1', context: 'Voice note: "check if catering confirmed"', time: 'Tomorrow' },
        { id: 's3', text: 'Call Marcus re: seating', done: false, dep: 's2', context: 'Voice note: "call Marcus about venue"', time: 'Mar 25' },
        { id: 's4', text: 'Send final guest list', done: false, dep: 's3', context: 'Linked to catering confirmation', time: 'Mar 26' },
        { id: 's5', text: 'Day-of arrival checklist', done: false, dep: 's4', context: 'Auto-generated from event context', time: 'Mar 28' },
      ],
    },
    {
      id: 'c2',
      title: 'Dana — Q1 Project',
      progress: 0,
      total: 3,
      color: '#06B6D4',
      steps: [
        { id: 's6', text: 'Send Q1 deck to Dana', done: false, dep: null, context: 'Email from Dana — "before our 3pm"', time: 'Today 2:45PM' },
        { id: 's7', text: 'Prepare roadmap talking points', done: false, dep: 's6', context: '"Let\'s revisit the roadmap next week"', time: 'This week' },
        { id: 's8', text: 'Schedule roadmap review meeting', done: false, dep: 's7', context: 'Loop in Dana + relevant team', time: 'Next week' },
      ],
    },
    {
      id: 'c3',
      title: 'Contractor Decision',
      progress: 0,
      total: 2,
      color: '#F59E0B',
      steps: [
        { id: 's9', text: 'Review Jess\'s contractor proposal', done: false, dep: null, context: 'Voice note: "review the contractor proposal"', time: 'Today' },
        { id: 's10', text: 'Brief Tom before decision', done: false, dep: 's9', context: 'Voice note: "loop in Tom before we decide"', time: 'After review' },
      ],
    },
  ];

  const focusTasks = [
    { id: 'f1', text: 'Send Q1 deck to Dana', time: 'Before 3PM', priority: 'high', context: 'Dana waiting — meeting at 3pm today', source: 'Email', chain: 'Dana — Q1 Project', tag: 'work' },
    { id: 'f2', text: 'Pay venue deposit', time: 'Today EOD', priority: 'high', context: 'Due Mar 24 — 2 days left', source: 'Screenshot', chain: 'Saturday Event', tag: 'urgent' },
    { id: 'f3', text: 'Review contractor proposal', time: 'Today', priority: 'medium', context: 'Need to brief Tom afterward', source: 'Voice Note', chain: 'Contractor Decision', tag: 'work' },
    { id: 'f4', text: 'Call Marcus about venue', time: 'Before 5PM', priority: 'medium', context: 'Discuss seating & deposit timeline', source: 'Voice Note', chain: 'Saturday Event', tag: 'personal' },
    { id: 'f5', text: 'Add Dr. Patel appt to calendar', time: 'Today', priority: 'low', context: 'Tuesday Apr 1 @ 10:30am', source: 'Clipboard', chain: null, tag: 'personal' },
    { id: 'f6', text: 'Prepare insurance card + referral', time: 'Before Apr 1', priority: 'low', context: 'Needed for Dr. Patel visit', source: 'Clipboard', chain: null, tag: 'personal' },
  ];

  const getPriorityColor = (p) => {
    if (p === 'high') return t.danger;
    if (p === 'medium') return t.warning;
    return t.textMuted;
  };

  const getTagStyle = (tag) => {
    const c = tagColors[tag] || tagColors.work;
    return isDark
      ? { bg: c.dark_bg, text: c.dark_text }
      : { bg: c.bg, text: c.text };
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const phoneStyle = {
    width: 375,
    height: 812,
    background: t.bg,
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px ${t.cardBorder}`,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    transition: 'background 0.3s ease',
  };

  // --- STATUS BAR ---
  const StatusBar = () => {
    const WifiIcon = window.lucide?.Wifi;
    const BatteryIcon = window.lucide?.Battery;
    const SignalIcon = window.lucide?.Signal;
    return (
      <div style={{ height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingInline: 28, paddingBottom: 6, flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: t.statusBar, letterSpacing: 0.2 }}>9:41</span>
        <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #333' }} />
          <div style={{ width: 28, height: 6, borderRadius: 3, background: '#1a1a1a' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {SignalIcon && <SignalIcon size={14} color={t.statusBar} />}
          {WifiIcon && <WifiIcon size={14} color={t.statusBar} />}
          {BatteryIcon && <BatteryIcon size={15} color={t.statusBar} />}
        </div>
      </div>
    );
  };

  // --- NOTIFICATION TOAST ---
  const Toast = () => (
    <div style={{
      position: 'absolute', top: 56, left: 16, right: 16, zIndex: 100,
      background: isDark ? '#2D2060' : '#1A1035',
      color: '#fff', borderRadius: 14, padding: '10px 14px',
      display: notifVisible ? 'flex' : 'none', alignItems: 'center', gap: 8,
      animation: notifVisible ? 'notif-slide 3s ease forwards' : 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      {window.lucide?.CheckCircle && <window.lucide.CheckCircle size={16} color={t.primary} />}
      <span style={{ fontSize: 13, fontWeight: 500 }}>{notifMsg}</span>
    </div>
  );

  // --- INBOX SCREEN ---
  const InboxScreen = () => {
    const MicIcon = window.lucide?.Mic;
    const ImageIcon = window.lucide?.Image;
    const MailIcon = window.lucide?.Mail;
    const ClipboardIcon = window.lucide?.Clipboard;
    const ChevronRightIcon = window.lucide?.ChevronRight;
    const LinkIcon = window.lucide?.Link2;
    const SparklesIcon = window.lucide?.Sparkles;
    const PlusIcon = window.lucide?.Plus;

    const iconMap = { Mic: MicIcon, Image: ImageIcon, Mail: MailIcon, Clipboard: ClipboardIcon };

    const typeColors = {
      voice: { bg: isDark ? '#2D2060' : '#EDE9FF', color: t.primary },
      screenshot: { bg: isDark ? '#0C2A30' : '#ECFEFF', color: t.accent },
      email: { bg: isDark ? '#052E1A' : '#D1FAE5', color: t.success },
      clipboard: { bg: isDark ? '#2C1B00' : '#FEF3C7', color: t.warning },
    };

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>Task Weave</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Inbox</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ background: t.primarySurface, borderRadius: 20, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              {SparklesIcon && <SparklesIcon size={13} color={t.primary} />}
              <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>5 new</span>
            </div>
            <div
              style={{ width: 36, height: 36, borderRadius: '50%', background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 4px 12px ${t.shadow}` }}
              onClick={() => setCaptureMode('choose')}
            >
              {PlusIcon && <PlusIcon size={18} color="#fff" />}
            </div>
          </div>
        </div>

        {/* Summary strip */}
        <div style={{ marginInline: 20, marginBottom: 16, background: `linear-gradient(135deg, ${t.primary}, ${isDark ? '#5B21B6' : '#A78BFA'})`, borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>AI detected</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 1 }}>10 actions across 5 inputs</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>3 chains built</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginTop: 2 }}>2 urgent today</div>
          </div>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingInline: 20 }}>
          {inboxItems.map(item => {
            const tc = typeColors[item.type];
            const IconComp = iconMap[item.icon];
            const isPressed = pressedItem === item.id;
            return (
              <div
                key={item.id}
                style={{ background: t.card, borderRadius: 18, padding: 14, border: `1px solid ${t.cardBorder}`, cursor: 'pointer', transform: isPressed ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s ease', boxShadow: isPressed ? 'none' : `0 2px 12px ${t.shadow}`, animation: 'slide-up 0.3s ease' }}
                onMouseDown={() => setPressedItem(item.id)}
                onMouseUp={() => { setPressedItem(null); setActiveTask(item); }}
                onMouseLeave={() => setPressedItem(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {IconComp && <IconComp size={16} color={tc.color} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: tc.color }}>{item.source}</span>
                      <span style={{ fontSize: 11, color: t.textMuted }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.preview}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                      {item.tasks.map((task, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.surfaceAlt, borderRadius: 6, padding: '3px 7px' }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.primary, flexShrink: 0 }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: t.text }}>{task}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 5 }}>
                        {item.tags.map(tag => {
                          const s = getTagStyle(tag);
                          return <span key={tag} style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.text, borderRadius: 5, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: 0.6 }}>{tag}</span>;
                        })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {item.linked && LinkIcon && <LinkIcon size={11} color={t.accent} />}
                        {item.linked && <span style={{ fontSize: 10, color: t.accent, fontWeight: 600 }}>Linked</span>}
                        {ChevronRightIcon && <ChevronRightIcon size={14} color={t.textMuted} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- TASK DETAIL MODAL ---
  const TaskDetailModal = () => {
    if (!activeTask) return null;
    const XIcon = window.lucide?.X;
    const CheckCircleIcon = window.lucide?.CheckCircle;
    const CircleIcon = window.lucide?.Circle;
    const CalendarIcon = window.lucide?.Calendar;
    const SendIcon = window.lucide?.Send;
    const typeColors = {
      voice: { bg: isDark ? '#2D2060' : '#EDE9FF', color: t.primary },
      screenshot: { bg: isDark ? '#0C2A30' : '#ECFEFF', color: t.accent },
      email: { bg: isDark ? '#052E1A' : '#D1FAE5', color: t.success },
      clipboard: { bg: isDark ? '#2C1B00' : '#FEF3C7', color: t.warning },
    };
    const tc = typeColors[activeTask.type];
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(4px)' }}>
        <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', padding: '20px 20px 32px', maxHeight: '75%', overflowY: 'auto', animation: 'slide-up 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: tc.color }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: tc.color, textTransform: 'uppercase', letterSpacing: 0.8 }}>{activeTask.source}</span>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setActiveTask(null)}>
              {XIcon && <XIcon size={16} color={t.textSecondary} />}
            </div>
          </div>
          <div style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, background: t.surfaceAlt, borderRadius: 12, padding: '10px 12px', marginBottom: 16, fontStyle: 'italic' }}>{activeTask.preview}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 10 }}>Detected Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {activeTask.tasks.map((task, i) => {
              const done = completedTasks.has(`${activeTask.id}-${i}`);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card, borderRadius: 12, padding: '10px 12px', border: `1px solid ${t.cardBorder}`, cursor: 'pointer' }} onClick={() => { toggleComplete(`${activeTask.id}-${i}`); showNotif(done ? 'Task uncompleted' : 'Task marked complete!'); }}>
                  {done ? (CheckCircleIcon && <CheckCircleIcon size={18} color={t.success} />) : (CircleIcon && <CircleIcon size={18} color={t.textMuted} />)}
                  <span style={{ fontSize: 13, fontWeight: 500, color: done ? t.textMuted : t.text, textDecoration: done ? 'line-through' : 'none', flex: 1 }}>{task}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: t.primarySurface, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }} onClick={() => { showNotif('Added to calendar!'); setActiveTask(null); }}>
              {CalendarIcon && <CalendarIcon size={14} color={t.primary} />}
              <span style={{ fontSize: 12, fontWeight: 700, color: t.primary }}>Add to Calendar</span>
            </div>
            <div style={{ flex: 1, background: t.primary, borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }} onClick={() => { showNotif('Draft reply generated!'); setActiveTask(null); }}>
              {SendIcon && <SendIcon size={14} color="#fff" />}
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Draft Reply</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- CAPTURE MODAL ---
  const CaptureModal = () => {
    if (!captureMode) return null;
    const XIcon = window.lucide?.X;
    const MicIcon = window.lucide?.Mic;
    const ImageIcon = window.lucide?.Image;
    const ClipboardIcon = window.lucide?.Clipboard;
    const MailIcon = window.lucide?.Mail;
    const StopCircleIcon = window.lucide?.StopCircle;

    if (captureMode === 'choose') {
      const opts = [
        { mode: 'voice', label: 'Voice Note', icon: MicIcon, color: t.primary, bg: t.primarySurface, desc: 'Speak your thoughts' },
        { mode: 'screenshot', label: 'Screenshot', icon: ImageIcon, color: t.accent, bg: t.accentSurface, desc: 'Analyze an image' },
        { mode: 'clipboard', label: 'Paste Text', icon: ClipboardIcon, color: t.warning, bg: t.warningSurface, desc: 'From clipboard' },
        { mode: 'email', label: 'Forward Email', icon: MailIcon, color: t.success, bg: t.successSurface, desc: 'Import message' },
      ];
      return (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', padding: '20px 20px 40px', animation: 'slide-up 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Capture</div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setCaptureMode(null)}>
                {XIcon && <XIcon size={16} color={t.textSecondary} />}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {opts.map(o => (
                <div key={o.mode} style={{ background: o.bg, borderRadius: 16, padding: '16px 14px', cursor: 'pointer', border: `1px solid ${t.cardBorder}` }} onClick={() => setCaptureMode(o.mode)}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    {o.icon && <o.icon size={18} color={o.color} />}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 2 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (captureMode === 'voice') {
      const waveCount = 20;
      return (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', padding: '28px 24px 48px', animation: 'slide-up 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>Voice Capture</div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
              {isRecording && <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${t.primary}`, animation: 'pulse-ring 1.2s ease infinite' }} />}
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: isRecording ? t.primary : t.primarySurface, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: isRecording ? `0 0 30px ${t.shadow}` : 'none', cursor: 'pointer' }} onClick={() => setIsRecording(r => !r)}>
                {isRecording ? (StopCircleIcon && <StopCircleIcon size={28} color="#fff" />) : (MicIcon && <MicIcon size={28} color={t.primary} />)}
              </div>
            </div>
            {isRecording && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
                {Array.from({ length: waveCount }).map((_, i) => (
                  <div key={i} style={{ width: 3, background: t.primary, borderRadius: 3, opacity: 0.7, animation: `wave ${0.4 + (i % 5) * 0.1}s ease ${i * 0.05}s infinite` }} />
                ))}
              </div>
            )}
            <div style={{ fontSize: 24, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{formatTime(recordingSeconds)}</div>
            <div style={{ fontSize: 12, color: t.textSecondary, textAlign: 'center', maxWidth: 260, lineHeight: 1.5 }}>{isRecording ? 'Speak your thoughts — Task Weave will detect actions automatically' : 'Tap the mic to start recording'}</div>
            {isRecording && (
              <div style={{ background: t.primary, borderRadius: 14, padding: '12px 40px', cursor: 'pointer' }} onClick={() => { setIsRecording(false); setCaptureMode(null); showNotif('Voice note captured — 2 tasks detected!'); }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Done</span>
              </div>
            )}
            <div style={{ fontSize: 12, color: t.textMuted, cursor: 'pointer' }} onClick={() => { setIsRecording(false); setCaptureMode(null); }}>Cancel</div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(4px)' }}>
        <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', padding: '24px 20px 40px', animation: 'slide-up 0.3s ease', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>Paste Text</div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setCaptureMode(null)}>
              {XIcon && <XIcon size={16} color={t.textSecondary} />}
            </div>
          </div>
          <div style={{ background: t.inputBg, borderRadius: 14, padding: 14, fontSize: 13, color: t.textSecondary, lineHeight: 1.6, minHeight: 100 }}>
            "Hey team — the client pushed the kickoff to next Thursday. Can everyone update their prep docs by EOD Wednesday? Also loop in Sam from legal."
          </div>
          <div style={{ background: t.primary, borderRadius: 14, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => { setCaptureMode(null); showNotif('3 tasks extracted from text!'); }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Extract Tasks</span>
          </div>
        </div>
      </div>
    );
  };

  // --- PLAN SCREEN ---
  const PlanScreen = () => {
    const [expandedChain, setExpandedChain] = useState('c1');
    const ChevronDownIcon = window.lucide?.ChevronDown;
    const ChevronRightIcon = window.lucide?.ChevronRight;
    const LockIcon = window.lucide?.Lock;
    const UnlockIcon = window.lucide?.Unlock;
    const CheckCircleIcon = window.lucide?.CheckCircle;
    const CircleIcon = window.lucide?.Circle;
    const InfoIcon = window.lucide?.Info;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>Task Weave</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Plans</div>
          </div>
          <div style={{ background: t.primarySurface, borderRadius: 10, padding: '5px 10px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.primary }}>3 chains</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: t.textSecondary, paddingInline: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 5 }}>
          {InfoIcon && <InfoIcon size={12} color={t.textMuted} />}
          <span>Locked steps depend on earlier tasks. Complete them to unlock.</span>
        </div>
        <div style={{ paddingInline: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {taskChains.map(chain => {
            const isExpanded = expandedChain === chain.id;
            const completedCount = chain.steps.filter(s => completedTasks.has(s.id)).length;
            const pct = Math.round((completedCount / chain.total) * 100);
            return (
              <div key={chain.id} style={{ background: t.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${t.cardBorder}`, boxShadow: `0 2px 12px ${t.shadow}` }}>
                <div style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => setExpandedChain(isExpanded ? null : chain.id)}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${chain.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: chain.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 4 }}>{chain.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: t.surfaceAlt, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: chain.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.textMuted }}>{completedCount}/{chain.total}</span>
                    </div>
                  </div>
                  {isExpanded ? (ChevronDownIcon && <ChevronDownIcon size={16} color={t.textMuted} />) : (ChevronRightIcon && <ChevronRightIcon size={16} color={t.textMuted} />)}
                </div>
                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${t.divider}`, padding: '8px 0' }}>
                    {chain.steps.map((step, idx) => {
                      const isDone = completedTasks.has(step.id);
                      const prevDone = idx === 0 || completedTasks.has(chain.steps[idx - 1].id);
                      const isLocked = !prevDone && !isDone;
                      return (
                        <div key={step.id}>
                          <div
                            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 16px', opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
                            onClick={() => { if (!isLocked) { toggleComplete(step.id); showNotif(isDone ? 'Step uncompleted' : 'Step complete!'); } }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
                              {isDone ? (CheckCircleIcon && <CheckCircleIcon size={18} color={t.success} />) : isLocked ? (LockIcon && <LockIcon size={16} color={t.textMuted} />) : (CircleIcon && <CircleIcon size={18} color={chain.color} />)}
                              {idx < chain.steps.length - 1 && <div style={{ width: 1, height: 20, background: t.divider, marginTop: 4 }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: isDone ? t.textMuted : t.text, textDecoration: isDone ? 'line-through' : 'none', marginBottom: 3 }}>{step.text}</div>
                              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 2 }}>{step.context}</div>
                              <div style={{ fontSize: 11, fontWeight: 600, color: chain.color }}>{step.time}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- FOCUS SCREEN ---
  const FocusScreen = () => {
    const filters = ['all', 'high', 'work', 'personal'];
    const ZapIcon = window.lucide?.Zap;
    const CheckCircleIcon = window.lucide?.CheckCircle;
    const CircleIcon = window.lucide?.Circle;
    const ChainIcon = window.lucide?.Link2;
    const ClockIcon = window.lucide?.Clock;

    const filtered = focusTasks.filter(task => {
      if (focusFilter === 'all') return true;
      if (focusFilter === 'high') return task.priority === 'high';
      if (focusFilter === 'work') return task.tag === 'work';
      if (focusFilter === 'personal') return task.tag === 'personal';
      return true;
    });

    const completedCount = focusTasks.filter(t => completedTasks.has(t.id)).length;

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>Task Weave</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Focus</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {ZapIcon && <ZapIcon size={14} color={t.warning} fill={t.warning} />}
            <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary }}>{completedCount}/{focusTasks.length} done</span>
          </div>
        </div>

        {/* Progress ring summary */}
        <div style={{ marginInline: 20, marginBottom: 16, background: `linear-gradient(135deg, ${isDark ? '#1E1540' : '#EDE9FF'}, ${isDark ? '#221748' : '#F4F2FF'})`, borderRadius: 18, padding: '14px 16px', border: `1px solid ${t.cardBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="21" fill="none" stroke={t.divider} strokeWidth="5" />
                <circle cx="26" cy="26" r="21" fill="none" stroke={t.primary} strokeWidth="5" strokeDasharray={`${2 * Math.PI * 21}`} strokeDashoffset={`${2 * Math.PI * 21 * (1 - completedCount / focusTasks.length)}`} strokeLinecap="round" transform="rotate(-90 26 26)" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: t.primary }}>
                {Math.round((completedCount / focusTasks.length) * 100)}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Sunday, Mar 22</div>
              <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{completedCount === 0 ? 'Nothing done yet — let\'s get started' : `${completedCount} task${completedCount > 1 ? 's' : ''} complete today`}</div>
              <div style={{ fontSize: 11, color: t.primary, fontWeight: 600, marginTop: 3 }}>2 time-sensitive tasks</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, paddingInline: 20, marginBottom: 14, overflowX: 'auto' }}>
          {filters.map(f => (
            <div key={f} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, background: focusFilter === f ? t.primary : t.surfaceAlt, cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => setFocusFilter(f)}>
              <span style={{ fontSize: 12, fontWeight: 700, color: focusFilter === f ? '#fff' : t.textSecondary, textTransform: 'capitalize' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div style={{ paddingInline: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {filtered.map(task => {
            const done = completedTasks.has(task.id);
            const tagS = getTagStyle(task.tag);
            const isPressed = pressedItem === `f-${task.id}`;
            return (
              <div
                key={task.id}
                style={{ background: t.card, borderRadius: 16, padding: '12px 14px', border: `1px solid ${done ? t.divider : t.cardBorder}`, opacity: done ? 0.6 : 1, cursor: 'pointer', transform: isPressed ? 'scale(0.98)' : 'scale(1)', transition: 'all 0.15s ease', boxShadow: isPressed ? 'none' : `0 2px 8px ${t.shadow}`, borderLeft: `3px solid ${done ? t.divider : getPriorityColor(task.priority)}` }}
                onMouseDown={() => setPressedItem(`f-${task.id}`)}
                onMouseUp={() => { setPressedItem(null); toggleComplete(task.id); showNotif(done ? 'Task reopened' : 'Nice work!'); }}
                onMouseLeave={() => setPressedItem(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {done ? (CheckCircleIcon && <CheckCircleIcon size={18} color={t.success} style={{ flexShrink: 0, marginTop: 1 }} />) : (CircleIcon && <CircleIcon size={18} color={getPriorityColor(task.priority)} style={{ flexShrink: 0, marginTop: 1 }} />)}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: done ? t.textMuted : t.text, textDecoration: done ? 'line-through' : 'none', marginBottom: 4 }}>{task.text}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                      {ClockIcon && <ClockIcon size={11} color={t.textMuted} />}
                      <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 500 }}>{task.time}</span>
                      <div style={{ width: 3, height: 3, borderRadius: '50%', background: t.divider }} />
                      <span style={{ fontSize: 11, fontWeight: 700, background: tagS.bg, color: tagS.text, padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{task.tag}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textSecondary, lineHeight: 1.4, marginBottom: task.chain ? 5 : 0 }}>{task.context}</div>
                    {task.chain && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {ChainIcon && <ChainIcon size={10} color={t.primary} />}
                        <span style={{ fontSize: 10, color: t.primary, fontWeight: 600 }}>{task.chain}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: t.textMuted }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>All clear!</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- SETTINGS SCREEN ---
  const SettingsScreen = () => {
    const SunIcon = window.lucide?.Sun;
    const MoonIcon = window.lucide?.Moon;
    const BellIcon = window.lucide?.Bell;
    const MapPinIcon = window.lucide?.MapPin;
    const CalendarIcon = window.lucide?.Calendar;
    const ShieldIcon = window.lucide?.Shield;
    const SmartphoneIcon = window.lucide?.Smartphone;
    const ChevronRightIcon = window.lucide?.ChevronRight;
    const SparklesIcon = window.lucide?.Sparkles;
    const [notifOn, setNotifOn] = useState(true);
    const [locationOn, setLocationOn] = useState(true);
    const [calendarOn, setCalendarOn] = useState(true);
    const [aiOn, setAiOn] = useState(true);

    const Toggle = ({ value, onToggle }) => (
      <div style={{ width: 44, height: 24, borderRadius: 12, background: value ? t.primary : t.surfaceAlt, cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease' }} onClick={onToggle}>
        <div style={{ position: 'absolute', top: 2, left: value ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' }} />
      </div>
    );

    const SettingRow = ({ icon: Icon, color, label, desc, value, onToggle, arrow }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderBottom: `1px solid ${t.divider}` }} onClick={onToggle}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon && <Icon size={16} color={color} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
          {desc && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{desc}</div>}
        </div>
        {onToggle && !arrow ? <Toggle value={value} onToggle={onToggle} /> : null}
        {arrow && ChevronRightIcon && <ChevronRightIcon size={14} color={t.textMuted} />}
      </div>
    );

    return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '16px 20px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.primary, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>Task Weave</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Settings</div>
        </div>

        {/* Profile */}
        <div style={{ marginInline: 20, marginBottom: 16, background: `linear-gradient(135deg, ${t.primary}, ${isDark ? '#5B21B6' : '#A78BFA'})`, borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>J</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Jordan Reeves</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>jordan@hey.com</div>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '4px 8px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>PRO</div>
          </div>
        </div>

        {/* Theme */}
        <div style={{ marginInline: 20, marginBottom: 12, background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: isDark ? t.warningSurface : t.warningSurface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDark ? (MoonIcon && <MoonIcon size={16} color={t.primary} />) : (SunIcon && <SunIcon size={16} color={t.warning} />)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Appearance</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{isDark ? 'Dark mode' : 'Light mode'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 10, padding: 2 }}>
              {[false, true].map(dark => (
                <div key={dark ? 'dark' : 'light'} style={{ padding: '5px 10px', borderRadius: 8, background: isDark === dark ? t.primary : 'transparent', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setIsDark(dark)}>
                  {!dark ? (SunIcon && <SunIcon size={12} color={isDark === dark ? '#fff' : t.textMuted} />) : (MoonIcon && <MoonIcon size={12} color={isDark === dark ? '#fff' : t.textMuted} />)}
                  <span style={{ fontSize: 11, fontWeight: 600, color: isDark === dark ? '#fff' : t.textMuted }}>{dark ? 'Dark' : 'Light'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div style={{ marginInline: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Intelligence</div>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }}>
            <SettingRow icon={SparklesIcon} color={t.primary} label="AI Task Detection" desc="Auto-detect tasks in inputs" value={aiOn} onToggle={() => setAiOn(v => !v)} />
            <SettingRow icon={BellIcon} color={t.danger} label="Smart Reminders" desc="Context-rich notifications" value={notifOn} onToggle={() => setNotifOn(v => !v)} />
            <SettingRow icon={MapPinIcon} color={t.success} label="Location Awareness" desc="Suggest tasks by location" value={locationOn} onToggle={() => setLocationOn(v => !v)} />
            <SettingRow icon={CalendarIcon} color={t.accent} label="Calendar Integration" desc="Fill gaps with priorities" value={calendarOn} onToggle={() => setCalendarOn(v => !v)} />
          </div>
        </div>

        {/* More settings */}
        <div style={{ marginInline: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>General</div>
          <div style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, overflow: 'hidden' }}>
            <SettingRow icon={SmartphoneIcon} color={t.warning} label="Siri & Shortcuts" desc="Voice capture via Siri" arrow onToggle={() => {}} />
            <SettingRow icon={ShieldIcon} color={t.success} label="Privacy & Data" desc="Manage how data is stored" arrow onToggle={() => {}} />
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: 16 }}>
          <div style={{ fontSize: 11, color: t.textMuted }}>Task Weave v2.1.4 · Turn loose thoughts into done steps.</div>
        </div>
      </div>
    );
  };

  // --- BOTTOM NAV ---
  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: 'Inbox' },
    { id: 'plan', label: 'Plans', icon: 'GitBranch' },
    { id: 'focus', label: 'Focus', icon: 'Zap' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  const BottomNav = () => (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', alignItems: 'flex-start', paddingTop: 10, zIndex: 20, backdropFilter: 'blur(20px)' }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const IconComp = window.lucide?.[tab.icon];
        return (
          <div key={tab.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '2px 0' }} onClick={() => setActiveTab(tab.id)}>
            <div style={{ width: 40, height: 28, borderRadius: 14, background: isActive ? t.primarySurface : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', transform: isActive ? 'scale(1.05)' : 'scale(1)' }}>
              {IconComp && <IconComp size={18} color={isActive ? t.primary : t.textMuted} strokeWidth={isActive ? 2.5 : 1.8} />}
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? t.primary : t.textMuted, transition: 'all 0.2s ease' }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );

  const renderScreen = () => {
    if (activeTab === 'inbox') return <InboxScreen />;
    if (activeTab === 'plan') return <PlanScreen />;
    if (activeTab === 'focus') return <FocusScreen />;
    if (activeTab === 'settings') return <SettingsScreen />;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e0dce8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={phoneStyle}>
        <StatusBar />
        <Toast />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {renderScreen()}
          <BottomNav />
          <TaskDetailModal />
          <CaptureModal />
        </div>
      </div>
    </div>
  );
}
