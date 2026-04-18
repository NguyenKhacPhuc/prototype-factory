const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  primary: '#5A7B69',
  primaryLight: '#7A9B89',
  primaryDark: '#3A5B49',
  secondary: '#F4D1B2',
  secondaryLight: '#F8E1CC',
  cta: '#E67C6B',
  ctaHover: '#D66B5A',
  background: '#F9F7F5',
  backgroundDark: '#1A1A2E',
  cardDark: '#252540',
  textDark: '#16213E',
  white: '#FFFFFF',
  gray100: '#F5F3F1',
  gray200: '#E8E5E2',
  gray300: '#D1CCC7',
  gray400: '#9E9A95',
  gray500: '#6B6660',
  textPrimary: '#2D2926',
  textSecondary: '#6B6660',
  textLight: '#9E9A95',
  success: '#5AAF6B',
  warning: '#F5A623',
  urgent: '#E65A4B',
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const icons = {
  Home: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
  ),
  Search: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('circle', { cx: 11, cy: 11, r: 8 }),
    React.createElement('line', { x1: 21, y1: 21, x2: '16.65', y2: '16.65' })
  ),
  Plus: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }),
    React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
  ),
  Calendar: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2 }),
    React.createElement('line', { x1: 16, y1: 2, x2: 16, y2: 6 }),
    React.createElement('line', { x1: 8, y1: 2, x2: 8, y2: 6 }),
    React.createElement('line', { x1: 3, y1: 10, x2: 21, y2: 10 })
  ),
  User: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    React.createElement('circle', { cx: 12, cy: 7, r: 4 })
  ),
  Bell: () => React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
    React.createElement('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })
  ),
  Star: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
  ),
  Heart: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })
  ),
  Clock: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
    React.createElement('polyline', { points: '12 6 12 12 16 14' })
  ),
  MapPin: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
    React.createElement('circle', { cx: 12, cy: 10, r: 3 })
  ),
  MessageCircle: () => React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })
  ),
  Award: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('circle', { cx: 12, cy: 8, r: 7 }),
    React.createElement('polyline', { points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' })
  ),
  ChevronRight: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('polyline', { points: '9 18 15 12 9 6' })
  ),
  ChevronLeft: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('polyline', { points: '15 18 9 12 15 6' })
  ),
  Send: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('line', { x1: 22, y1: 2, x2: 11, y2: 13 }),
    React.createElement('polygon', { points: '22 2 15 22 11 13 2 9 22 2' })
  ),
  Moon: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
  ),
  Sun: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
    React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }),
    React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }),
    React.createElement('line', { x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64' }),
    React.createElement('line', { x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78' }),
    React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }),
    React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }),
    React.createElement('line', { x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36' }),
    React.createElement('line', { x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22' })
  ),
  Shield: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
  ),
  Check: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('polyline', { points: '20 6 9 17 4 12' })
  ),
  X: () => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
    React.createElement('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
  ),
  Zap: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1 },
    React.createElement('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })
  ),
  Dog: () => React.createElement('span', { style: { fontSize: 20 } }, '🐕'),
  Car: () => React.createElement('span', { style: { fontSize: 20 } }, '🚗'),
  Egg: () => React.createElement('span', { style: { fontSize: 20 } }, '🥚'),
  Baby: () => React.createElement('span', { style: { fontSize: 20 } }, '👶'),
  Book: () => React.createElement('span', { style: { fontSize: 20 } }, '📚'),
  Handshake: () => React.createElement('span', { style: { fontSize: 20 } }, '🤝'),
};

const TASKS = [
  {
    id: 1,
    title: 'Urgent School Pickup at 3 PM',
    category: 'pickup',
    categoryLabel: 'School Pickup',
    categoryEmoji: '🚗',
    description: 'Need someone to pick up Emma (grade 2) from Maple Elementary. I have a last-minute work meeting.',
    poster: { name: 'Sarah M.', avatar: '👩‍🦰', rating: 4.9, verified: true },
    kredits: 5,
    urgent: true,
    time: 'Today, 3:00 PM',
    distance: '0.3 mi',
    postedAgo: '12 min ago',
  },
  {
    id: 2,
    title: 'Walk my dog Buddy this afternoon',
    category: 'pet',
    categoryLabel: 'Pet Care',
    categoryEmoji: '🐕',
    description: 'Buddy is a friendly golden retriever. 30 min walk around the block would be great!',
    poster: { name: 'Mike T.', avatar: '👨', rating: 4.7, verified: true },
    kredits: 3,
    urgent: false,
    time: 'Today, 4:30 PM',
    distance: '0.5 mi',
    postedAgo: '28 min ago',
  },
  {
    id: 3,
    title: 'Borrow 2 eggs for baking',
    category: 'borrow',
    categoryLabel: 'Borrow',
    categoryEmoji: '🥚',
    description: 'Making cupcakes for the school bake sale tomorrow and I\'m 2 eggs short!',
    poster: { name: 'Lisa K.', avatar: '👩', rating: 5.0, verified: true },
    kredits: 1,
    urgent: false,
    time: 'ASAP',
    distance: '0.1 mi',
    postedAgo: '5 min ago',
  },
  {
    id: 4,
    title: 'Babysit for 1 hour (2 kids)',
    category: 'babysit',
    categoryLabel: 'Babysitting',
    categoryEmoji: '👶',
    description: 'Need someone to watch my 2 kids (ages 4 & 6) while I attend a doctor appointment.',
    poster: { name: 'James R.', avatar: '👨‍🦱', rating: 4.8, verified: false },
    kredits: 8,
    urgent: false,
    time: 'Tomorrow, 10:00 AM',
    distance: '0.4 mi',
    postedAgo: '1 hr ago',
  },
  {
    id: 5,
    title: 'Help with math homework (grade 5)',
    category: 'tutor',
    categoryLabel: 'Tutoring',
    categoryEmoji: '📚',
    description: 'My son needs help understanding fractions. Would love a patient tutor for 45 min.',
    poster: { name: 'Priya D.', avatar: '👩‍🦱', rating: 4.6, verified: true },
    kredits: 4,
    urgent: false,
    time: 'Tomorrow, 4:00 PM',
    distance: '0.7 mi',
    postedAgo: '2 hrs ago',
  },
];

const NOTIFICATIONS = [
  { id: 1, type: 'match', title: 'New task match!', body: 'Sarah M. needs a school pickup — right up your alley!', time: '2 min ago', read: false },
  { id: 2, type: 'accepted', title: 'Your offer was accepted!', body: 'Lisa K. accepted your help with borrowing eggs.', time: '15 min ago', read: false },
  { id: 3, type: 'kredits', title: '+5 Kindness Kredits earned!', body: 'Thanks for helping Mike T. with dog walking yesterday.', time: '1 hr ago', read: true },
  { id: 4, type: 'urgent', title: '🚨 Urgent request nearby', body: 'James R. urgently needs babysitting help within 0.4 mi.', time: '2 hrs ago', read: true },
  { id: 5, type: 'review', title: 'New review received!', body: 'Sarah M. left you a 5-star review: "Amazing help!"', time: '1 day ago', read: true },
];

const SCHEDULE_ITEMS = [
  { id: 1, title: 'Pick up Emma from school', with: 'For Sarah M.', time: '3:00 PM', date: 'Today', status: 'upcoming', color: COLORS.cta },
  { id: 2, title: 'Walk Buddy', with: 'For Mike T.', time: '4:30 PM', date: 'Today', status: 'upcoming', color: COLORS.primary },
  { id: 3, title: 'Math tutoring session', with: 'For Priya D.', time: '4:00 PM', date: 'Tomorrow', status: 'scheduled', color: COLORS.warning },
  { id: 4, title: 'Babysit (James R.\'s kids)', with: 'For James R.', time: '10:00 AM', date: 'Tomorrow', status: 'scheduled', color: COLORS.secondary },
];

const BADGES = [
  { name: 'First Aid Certified', emoji: '🏥', color: '#E8F5E9' },
  { name: 'Dog Walker', emoji: '🐕', color: '#FFF3E0' },
  { name: 'Super Helper', emoji: '⭐', color: '#FFF8E1' },
  { name: 'Verified Parent', emoji: '✅', color: '#E8F5E9' },
  { name: 'Early Bird', emoji: '🌅', color: '#FCE4EC' },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [notifCount, setNotifCount] = useState(2);
  const [kredits, setKredits] = useState(24);
  const [helpedCount, setHelpedCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const theme = darkMode ? {
    bg: COLORS.backgroundDark,
    card: COLORS.cardDark,
    text: '#E8E5E2',
    textSecondary: '#9E9A95',
    border: '#3A3A55',
    inputBg: '#2A2A45',
  } : {
    bg: COLORS.background,
    card: COLORS.white,
    text: COLORS.textPrimary,
    textSecondary: COLORS.textSecondary,
    border: COLORS.gray200,
    inputBg: COLORS.gray100,
  };

  const navigateTo = (screen) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimating(false);
    }, 150);
  };

  // Status bar
  const StatusBar = () => React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 20px 0',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: FONT,
      color: theme.text,
    }
  },
    React.createElement('span', null, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 4, alignItems: 'center' } },
      React.createElement('div', { style: { width: 16, height: 10, border: `1.5px solid ${theme.text}`, borderRadius: 2, position: 'relative' } },
        React.createElement('div', { style: { width: '70%', height: '100%', background: theme.text, borderRadius: 1 } })
      )
    )
  );

  // Tab Bar
  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: icons.Home },
      { id: 'schedule', label: 'Schedule', icon: icons.Calendar },
      { id: 'notifications', label: 'Alerts', icon: icons.Bell },
      { id: 'profile', label: 'Profile', icon: icons.User },
    ];

    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '10px 0 28px',
        background: theme.card,
        borderTop: `1px solid ${theme.border}`,
        position: 'relative',
      }
    },
      // Center floating button
      React.createElement('div', {
        onClick: () => setShowNewTask(true),
        style: {
          position: 'absolute',
          top: -24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 56,
          height: 56,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.ctaHover})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.white,
          boxShadow: `0 4px 16px ${COLORS.cta}66`,
          cursor: 'pointer',
          zIndex: 10,
          transition: 'transform 0.2s ease',
        }
      }, React.createElement(icons.Plus)),
      ...tabs.map((tab, i) => {
        const isActive = activeScreen === tab.id;
        return React.createElement('div', {
          key: tab.id,
          onClick: () => navigateTo(tab.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
            color: isActive ? COLORS.primary : theme.textSecondary,
            transition: 'color 0.2s ease',
            position: 'relative',
            flex: 1,
            paddingTop: 2,
            ...(i === 1 || i === 2 ? { marginLeft: i === 2 ? 24 : 0, marginRight: i === 1 ? 24 : 0 } : {}),
          }
        },
          React.createElement('div', { style: { position: 'relative' } },
            React.createElement(tab.icon),
            tab.id === 'notifications' && notifCount > 0 && React.createElement('div', {
              style: {
                position: 'absolute',
                top: -4,
                right: -6,
                width: 16,
                height: 16,
                borderRadius: 8,
                background: COLORS.cta,
                color: COLORS.white,
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            }, notifCount)
          ),
          React.createElement('span', { style: { fontSize: 11, fontWeight: isActive ? 600 : 400, fontFamily: FONT } }, tab.label)
        );
      })
    );
  };

  // Task Card
  const TaskCard = ({ task, compact }) => React.createElement('div', {
    onClick: () => { setSelectedTask(task); navigateTo('taskDetail'); },
    style: {
      background: theme.card,
      borderRadius: 16,
      padding: compact ? '14px 16px' : '18px 18px',
      marginBottom: 12,
      boxShadow: darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      border: task.urgent ? `2px solid ${COLORS.urgent}40` : `1px solid ${theme.border}`,
      position: 'relative',
      overflow: 'hidden',
    }
  },
    task.urgent && React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: `linear-gradient(90deg, ${COLORS.urgent}, ${COLORS.cta})`,
      }
    }),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: 1 } },
        React.createElement('span', { style: { fontSize: 28 } }, task.categoryEmoji),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
            task.urgent && React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: 700,
                color: COLORS.white,
                background: COLORS.urgent,
                padding: '2px 6px',
                borderRadius: 4,
                fontFamily: FONT,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }
            }, 'URGENT'),
            React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT } }, task.categoryLabel)
          ),
          React.createElement('h3', { style: { fontSize: 16, fontWeight: 600, color: theme.text, margin: 0, fontFamily: FONT, lineHeight: 1.3 } }, task.title)
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: `${COLORS.warning}20`,
          padding: '4px 8px',
          borderRadius: 8,
          flexShrink: 0,
        }
      },
        React.createElement(icons.Zap),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: COLORS.warning, fontFamily: FONT } }, task.kredits)
      )
    ),
    !compact && React.createElement('p', {
      style: { fontSize: 14, color: theme.textSecondary, margin: '0 0 12px', lineHeight: 1.5, fontFamily: FONT }
    }, task.description),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary } },
          React.createElement(icons.Clock),
          React.createElement('span', { style: { fontSize: 13, fontFamily: FONT } }, task.time)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary } },
          React.createElement(icons.MapPin),
          React.createElement('span', { style: { fontSize: 13, fontFamily: FONT } }, task.distance)
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement('span', { style: { fontSize: 22 } }, task.poster.avatar),
        React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: theme.text, fontFamily: FONT } }, task.poster.name)
      )
    )
  );

  // Home Screen
  const HomeScreen = () => {
    const categories = [
      { label: 'Pickup', emoji: '🚗', color: '#E3F2FD' },
      { label: 'Pet Care', emoji: '🐕', color: '#FFF3E0' },
      { label: 'Borrow', emoji: '🤝', color: '#F3E5F5' },
      { label: 'Babysit', emoji: '👶', color: '#FCE4EC' },
      { label: 'Tutor', emoji: '📚', color: '#E8F5E9' },
      { label: 'More', emoji: '✨', color: '#FFF8E1' },
    ];

    return React.createElement('div', { style: { flex: 1, overflow: 'auto' } },
      // Header
      React.createElement('div', {
        style: {
          padding: '16px 20px 20px',
          background: darkMode ? `linear-gradient(180deg, ${COLORS.primaryDark}, ${theme.bg})` : `linear-gradient(180deg, ${COLORS.primary}12, ${theme.bg})`,
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('h1', { style: { fontSize: 28, fontWeight: 700, color: theme.text, margin: 0, fontFamily: FONT } }, 'Good morning! 🌿'),
            React.createElement('p', { style: { fontSize: 15, color: theme.textSecondary, margin: '4px 0 0', fontFamily: FONT } }, 'How can you help today?')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            React.createElement('div', {
              onClick: () => setDarkMode(!darkMode),
              style: { cursor: 'pointer', color: theme.textSecondary, padding: 4 }
            }, darkMode ? React.createElement(icons.Sun) : React.createElement(icons.Moon)),
            React.createElement('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: `${COLORS.warning}20`,
                padding: '6px 10px',
                borderRadius: 12,
              }
            },
              React.createElement(icons.Zap),
              React.createElement('span', { style: { fontSize: 15, fontWeight: 700, color: COLORS.warning, fontFamily: FONT } }, kredits)
            )
          )
        ),
        // Search
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: theme.inputBg,
            borderRadius: 14,
            padding: '12px 16px',
            border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('div', { style: { color: theme.textSecondary } }, React.createElement(icons.Search)),
          React.createElement('span', { style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT } }, 'Search tasks, neighbors...')
        )
      ),
      // Categories
      React.createElement('div', { style: { padding: '0 20px 16px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 } },
          ...categories.map(cat => React.createElement('div', {
            key: cat.label,
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: {
                width: 46,
                height: 46,
                borderRadius: 14,
                background: darkMode ? theme.card : cat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                border: `1px solid ${theme.border}`,
              }
            }, cat.emoji),
            React.createElement('span', { style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT, fontWeight: 500 } }, cat.label)
          ))
        )
      ),
      // Urgent section
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: theme.text, margin: 0, fontFamily: FONT } }, '🔥 Needs Help Now'),
          React.createElement('span', { style: { fontSize: 14, color: COLORS.primary, fontWeight: 600, fontFamily: FONT, cursor: 'pointer' } }, 'See all')
        ),
        ...TASKS.filter(t => t.urgent || t.id <= 2).map(task => React.createElement(TaskCard, { key: task.id, task }))
      ),
      // Nearby section
      React.createElement('div', { style: { padding: '8px 20px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, color: theme.text, margin: 0, fontFamily: FONT } }, '📍 Nearby Tasks'),
          React.createElement('span', { style: { fontSize: 14, color: COLORS.primary, fontWeight: 600, fontFamily: FONT, cursor: 'pointer' } }, 'See all')
        ),
        ...TASKS.filter(t => !t.urgent).slice(0, 3).map(task => React.createElement(TaskCard, { key: task.id, task, compact: true }))
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // Task Detail Screen
  const TaskDetailScreen = () => {
    const task = selectedTask || TASKS[0];
    const [offered, setOffered] = useState(false);

    return React.createElement('div', { style: { flex: 1, overflow: 'auto' } },
      // Header
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
        }
      },
        React.createElement('div', {
          onClick: () => navigateTo('home'),
          style: { cursor: 'pointer', color: theme.text, display: 'flex', alignItems: 'center', gap: 4 }
        },
          React.createElement(icons.ChevronLeft),
          React.createElement('span', { style: { fontSize: 17, fontFamily: FONT } }, 'Back')
        ),
        React.createElement('div', { style: { color: theme.textSecondary, cursor: 'pointer' } }, React.createElement(icons.Heart))
      ),
      // Content
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        // Category tag
        React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 12 } },
          task.urgent && React.createElement('span', {
            style: {
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.white,
              background: COLORS.urgent,
              padding: '4px 10px',
              borderRadius: 8,
              fontFamily: FONT,
            }
          }, '🚨 URGENT'),
          React.createElement('span', {
            style: {
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.primary,
              background: `${COLORS.primary}15`,
              padding: '4px 10px',
              borderRadius: 8,
              fontFamily: FONT,
            }
          }, task.categoryEmoji + ' ' + task.categoryLabel)
        ),
        // Title
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 700, color: theme.text, margin: '0 0 8px', fontFamily: FONT, lineHeight: 1.3 } }, task.title),
        // Meta
        React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 20 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary } },
            React.createElement(icons.Clock),
            React.createElement('span', { style: { fontSize: 14, fontFamily: FONT } }, task.time)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary } },
            React.createElement(icons.MapPin),
            React.createElement('span', { style: { fontSize: 14, fontFamily: FONT } }, task.distance)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement(icons.Zap),
            React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: COLORS.warning, fontFamily: FONT } }, task.kredits + ' Kredits')
          )
        ),
        // Description
        React.createElement('div', {
          style: {
            background: theme.inputBg,
            borderRadius: 16,
            padding: 18,
            marginBottom: 20,
            border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: theme.text, margin: '0 0 8px', fontFamily: FONT } }, 'Details'),
          React.createElement('p', { style: { fontSize: 15, color: theme.textSecondary, margin: 0, lineHeight: 1.6, fontFamily: FONT } }, task.description)
        ),
        // Poster
        React.createElement('div', {
          style: {
            background: theme.card,
            borderRadius: 16,
            padding: 18,
            marginBottom: 20,
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
          }
        },
          React.createElement('h3', { style: { fontSize: 15, fontWeight: 600, color: theme.text, margin: '0 0 12px', fontFamily: FONT } }, 'Requested by'),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('div', {
              style: {
                width: 50,
                height: 50,
                borderRadius: 25,
                background: COLORS.secondaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }
            }, task.poster.avatar),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontSize: 17, fontWeight: 600, color: theme.text, fontFamily: FONT } }, task.poster.name),
                task.poster.verified && React.createElement('div', { style: { color: COLORS.success } }, React.createElement(icons.Shield))
              ),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 } },
                React.createElement('div', { style: { color: COLORS.warning } }, React.createElement(icons.Star)),
                React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT } }, task.poster.rating),
                React.createElement('span', { style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT } }, '· 23 tasks helped')
              )
            ),
            React.createElement('div', {
              style: { color: COLORS.primary, cursor: 'pointer', padding: 8 }
            }, React.createElement(icons.MessageCircle))
          )
        ),
        // Map placeholder
        React.createElement('div', {
          style: {
            background: darkMode ? '#2A3A35' : '#E8F0EC',
            borderRadius: 16,
            padding: 40,
            marginBottom: 24,
            textAlign: 'center',
            border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('div', { style: { fontSize: 32, marginBottom: 8 } }, '📍'),
          React.createElement('span', { style: { fontSize: 14, color: theme.textSecondary, fontFamily: FONT } }, 'Maple Street · ' + task.distance + ' away')
        ),
        // CTA
        React.createElement('div', {
          onClick: () => {
            if (!offered) {
              setOffered(true);
              setKredits(k => k + task.kredits);
              setHelpedCount(c => c + 1);
              showToast(`🎉 You offered to help! +${task.kredits} Kredits pending`);
            }
          },
          style: {
            background: offered ? COLORS.success : `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.ctaHover})`,
            color: COLORS.white,
            padding: '16px 24px',
            borderRadius: 16,
            fontSize: 17,
            fontWeight: 700,
            fontFamily: FONT,
            textAlign: 'center',
            cursor: offered ? 'default' : 'pointer',
            boxShadow: offered ? 'none' : `0 4px 16px ${COLORS.cta}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.3s ease',
          }
        },
          offered ? React.createElement(icons.Check) : null,
          offered ? 'Offer Sent! ✨' : `Offer to Help (${task.kredits} Kredits)`
        )
      )
    );
  };

  // Schedule Screen
  const ScheduleScreen = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = [14, 15, 16, 17, 18, 19, 20];
    const [selectedDay, setSelectedDay] = useState(2);

    return React.createElement('div', { style: { flex: 1, overflow: 'auto' } },
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('h1', { style: { fontSize: 34, fontWeight: 700, color: theme.text, margin: '0 0 4px', fontFamily: FONT } }, 'Schedule'),
        React.createElement('p', { style: { fontSize: 15, color: theme.textSecondary, margin: '0 0 20px', fontFamily: FONT } }, 'December 2024')
      ),
      // Calendar strip
      React.createElement('div', { style: { display: 'flex', gap: 6, padding: '0 20px 20px', justifyContent: 'space-between' } },
        ...days.map((day, i) => React.createElement('div', {
          key: day,
          onClick: () => setSelectedDay(i),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '10px 0',
            borderRadius: 14,
            width: 42,
            cursor: 'pointer',
            background: selectedDay === i ? COLORS.primary : 'transparent',
            transition: 'all 0.2s ease',
          }
        },
          React.createElement('span', {
            style: { fontSize: 12, fontWeight: 500, color: selectedDay === i ? COLORS.white + 'CC' : theme.textSecondary, fontFamily: FONT }
          }, day),
          React.createElement('span', {
            style: { fontSize: 17, fontWeight: 700, color: selectedDay === i ? COLORS.white : theme.text, fontFamily: FONT }
          }, dates[i]),
          i === 2 && React.createElement('div', {
            style: { width: 6, height: 6, borderRadius: 3, background: selectedDay === i ? COLORS.white : COLORS.cta }
          })
        ))
      ),
      // Schedule items
      React.createElement('div', { style: { padding: '0 20px' } },
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, color: theme.text, margin: '0 0 16px', fontFamily: FONT } }, 'Today'),
        ...SCHEDULE_ITEMS.filter(item => item.date === 'Today').map(item => React.createElement('div', {
          key: item.id,
          style: {
            display: 'flex',
            gap: 14,
            marginBottom: 16,
            alignItems: 'stretch',
          }
        },
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 50 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT } }, item.time.split(' ')[0]),
            React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT } }, item.time.split(' ')[1]),
            React.createElement('div', { style: { flex: 1, width: 2, background: theme.border, marginTop: 8 } })
          ),
          React.createElement('div', {
            style: {
              flex: 1,
              background: theme.card,
              borderRadius: 14,
              padding: 16,
              borderLeft: `4px solid ${item.color}`,
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
            }
          },
            React.createElement('h4', { style: { fontSize: 16, fontWeight: 600, color: theme.text, margin: '0 0 4px', fontFamily: FONT } }, item.title),
            React.createElement('p', { style: { fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: FONT } }, item.with)
          )
        )),
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, color: theme.text, margin: '16px 0 16px', fontFamily: FONT } }, 'Tomorrow'),
        ...SCHEDULE_ITEMS.filter(item => item.date === 'Tomorrow').map(item => React.createElement('div', {
          key: item.id,
          style: {
            display: 'flex',
            gap: 14,
            marginBottom: 16,
            alignItems: 'stretch',
          }
        },
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 50 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT } }, item.time.split(' ')[0]),
            React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT } }, item.time.split(' ')[1]),
            React.createElement('div', { style: { flex: 1, width: 2, background: theme.border, marginTop: 8 } })
          ),
          React.createElement('div', {
            style: {
              flex: 1,
              background: theme.card,
              borderRadius: 14,
              padding: 16,
              borderLeft: `4px solid ${item.color}`,
              boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
              opacity: 0.75,
            }
          },
            React.createElement('h4', { style: { fontSize: 16, fontWeight: 600, color: theme.text, margin: '0 0 4px', fontFamily: FONT } }, item.title),
            React.createElement('p', { style: { fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: FONT } }, item.with)
          )
        ))
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // Notifications Screen
  const NotificationsScreen = () => {
    const [notifs, setNotifs] = useState(NOTIFICATIONS);

    const getNotifIcon = (type) => {
      switch(type) {
        case 'match': return '🎯';
        case 'accepted': return '✅';
        case 'kredits': return '⚡';
        case 'urgent': return '🚨';
        case 'review': return '⭐';
        default: return '🔔';
      }
    };

    return React.createElement('div', { style: { flex: 1, overflow: 'auto' } },
      React.createElement('div', { style: { padding: '16px 20px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
          React.createElement('h1', { style: { fontSize: 34, fontWeight: 700, color: theme.text, margin: 0, fontFamily: FONT } }, 'Alerts'),
          React.createElement('span', {
            onClick: () => { setNotifs(notifs.map(n => ({ ...n, read: true }))); setNotifCount(0); },
            style: { fontSize: 15, color: COLORS.primary, fontWeight: 600, fontFamily: FONT, cursor: 'pointer' }
          }, 'Mark all read')
        ),
        ...notifs.map(notif => React.createElement('div', {
          key: notif.id,
          style: {
            display: 'flex',
            gap: 14,
            padding: '16px 0',
            borderBottom: `1px solid ${theme.border}`,
            opacity: notif.read ? 0.7 : 1,
          }
        },
          React.createElement('div', {
            style: {
              width: 44,
              height: 44,
              borderRadius: 14,
              background: notif.read ? theme.inputBg : `${COLORS.primary}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
            }
          }, getNotifIcon(notif.type)),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
              React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, color: theme.text, margin: '0 0 4px', fontFamily: FONT } }, notif.title),
              !notif.read && React.createElement('div', {
                style: { width: 8, height: 8, borderRadius: 4, background: COLORS.cta, flexShrink: 0, marginTop: 6 }
              })
            ),
            React.createElement('p', { style: { fontSize: 14, color: theme.textSecondary, margin: '0 0 4px', lineHeight: 1.4, fontFamily: FONT } }, notif.body),
            React.createElement('span', { style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT } }, notif.time)
          )
        ))
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // Profile Screen
  const ProfileScreen = () => {
    const stats = [
      { label: 'Tasks Helped', value: 23 + helpedCount, color: COLORS.primary },
      { label: 'Kredits', value: kredits, color: COLORS.warning },
      { label: 'Rating', value: '4.9', color: COLORS.cta },
    ];

    const menuItems = [
      { label: 'Edit Profile', emoji: '✏️' },
      { label: 'My Tasks', emoji: '📋' },
      { label: 'Kredit History', emoji: '⚡' },
      { label: 'Preferences', emoji: '⚙️' },
      { label: 'Invite Neighbors', emoji: '💌' },
      { label: 'Help & Support', emoji: '❓' },
    ];

    return React.createElement('div', { style: { flex: 1, overflow: 'auto' } },
      // Profile header
      React.createElement('div', {
        style: {
          padding: '16px 20px 24px',
          background: darkMode ? `linear-gradient(180deg, ${COLORS.primaryDark}60, ${theme.bg})` : `linear-gradient(180deg, ${COLORS.primary}18, ${theme.bg})`,
          textAlign: 'center',
        }
      },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: 8 } },
          React.createElement('div', {
            onClick: () => setDarkMode(!darkMode),
            style: { cursor: 'pointer', color: theme.textSecondary, padding: 4 }
          }, darkMode ? React.createElement(icons.Sun) : React.createElement(icons.Moon))
        ),
        React.createElement('div', {
          style: {
            width: 88,
            height: 88,
            borderRadius: 44,
            background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 44,
            margin: '0 auto 12px',
            border: `3px solid ${COLORS.primary}`,
            boxShadow: `0 4px 16px ${COLORS.primary}22`,
          }
        }, '👩‍💻'),
        React.createElement('h1', { style: { fontSize: 22, fontWeight: 700, color: theme.text, margin: '0 0 2px', fontFamily: FONT } }, 'Jessica Chen'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 } },
          React.createElement('div', { style: { color: COLORS.success } }, React.createElement(icons.Shield)),
          React.createElement('span', { style: { fontSize: 14, color: COLORS.success, fontWeight: 600, fontFamily: FONT } }, 'Verified Parent')
        ),
        React.createElement('p', { style: { fontSize: 14, color: theme.textSecondary, margin: '0 0 16px', fontFamily: FONT } }, 'Elm Street · Member since Oct 2024')
      ),
      // Stats
      React.createElement('div', { style: { display: 'flex', gap: 10, padding: '0 20px 20px', marginTop: -8 } },
        ...stats.map(stat => React.createElement('div', {
          key: stat.label,
          style: {
            flex: 1,
            background: theme.card,
            borderRadius: 16,
            padding: '16px 12px',
            textAlign: 'center',
            boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
            border: `1px solid ${theme.border}`,
          }
        },
          React.createElement('div', { style: { fontSize: 24, fontWeight: 700, color: stat.color, fontFamily: FONT } }, stat.value),
          React.createElement('div', { style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT, marginTop: 2 } }, stat.label)
        ))
      ),
      // Badges
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, color: theme.text, margin: '0 0 12px', fontFamily: FONT } }, 'Skill Badges'),
        React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          ...BADGES.map(badge => React.createElement('div', {
            key: badge.name,
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              borderRadius: 12,
              background: darkMode ? theme.card : badge.color,
              border: `1px solid ${theme.border}`,
            }
          },
            React.createElement('span', { style: { fontSize: 16 } }, badge.emoji),
            React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: theme.text, fontFamily: FONT } }, badge.name)
          ))
        )
      ),
      // Menu
      React.createElement('div', { style: { padding: '0 20px 20px' } },
        ...menuItems.map((item, i) => React.createElement('div', {
          key: item.label,
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: i < menuItems.length - 1 ? `1px solid ${theme.border}` : 'none',
            cursor: 'pointer',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('span', { style: { fontSize: 20 } }, item.emoji),
            React.createElement('span', { style: { fontSize: 16, fontWeight: 500, color: theme.text, fontFamily: FONT } }, item.label)
          ),
          React.createElement('div', { style: { color: theme.textSecondary } }, React.createElement(icons.ChevronRight))
        ))
      ),
      React.createElement('div', { style: { height: 20 } })
    );
  };

  // New Task Modal
  const NewTaskModal = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isUrgent, setIsUrgent] = useState(false);
    const [kreditValue, setKreditValue] = useState(3);

    const categories = [
      { id: 'pickup', label: 'Pickup', emoji: '🚗' },
      { id: 'pet', label: 'Pet Care', emoji: '🐕' },
      { id: 'borrow', label: 'Borrow', emoji: '🤝' },
      { id: 'babysit', label: 'Babysit', emoji: '👶' },
      { id: 'tutor', label: 'Tutor', emoji: '📚' },
      { id: 'other', label: 'Other', emoji: '✨' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        backdropFilter: 'blur(4px)',
      },
      onClick: (e) => { if (e.target === e.currentTarget) setShowNewTask(false); }
    },
      React.createElement('div', {
        style: {
          background: theme.bg,
          borderRadius: '24px 24px 0 0',
          padding: '8px 20px 40px',
          width: '100%',
          maxHeight: '85%',
          overflow: 'auto',
        }
      },
        // Handle
        React.createElement('div', {
          style: { width: 36, height: 4, borderRadius: 2, background: theme.border, margin: '0 auto 16px' }
        }),
        // Header
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
          React.createElement('h2', { style: { fontSize: 22, fontWeight: 700, color: theme.text, margin: 0, fontFamily: FONT } }, 'New Task'),
          React.createElement('div', {
            onClick: () => setShowNewTask(false),
            style: { cursor: 'pointer', color: theme.textSecondary, padding: 4 }
          }, React.createElement(icons.X))
        ),
        // Title input
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('label', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT, marginBottom: 8, display: 'block' } }, 'What do you need help with?'),
          React.createElement('input', {
            type: 'text',
            placeholder: 'e.g., Pick up my kids from soccer practice',
            value: taskTitle,
            onChange: (e) => setTaskTitle(e.target.value),
            style: {
              width: '100%',
              padding: '14px 16px',
              borderRadius: 14,
              border: `1.5px solid ${theme.border}`,
              background: theme.inputBg,
              fontSize: 16,
              fontFamily: FONT,
              color: theme.text,
              outline: 'none',
              boxSizing: 'border-box',
            }
          })
        ),
        // Categories
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('label', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT, marginBottom: 10, display: 'block' } }, 'Category'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
            ...categories.map(cat => React.createElement('div', {
              key: cat.id,
              onClick: () => setSelectedCategory(cat.id),
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 14,
                border: `2px solid ${selectedCategory === cat.id ? COLORS.primary : theme.border}`,
                background: selectedCategory === cat.id ? `${COLORS.primary}12` : theme.card,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }
            },
              React.createElement('span', { style: { fontSize: 18 } }, cat.emoji),
              React.createElement('span', { style: { fontSize: 14, fontWeight: 500, color: theme.text, fontFamily: FONT } }, cat.label)
            ))
          )
        ),
        // Urgent toggle
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
        },
          React.createElement('div', null,
            React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: FONT } }, '🚨 Mark as Urgent'),
            React.createElement('p', { style: { fontSize: 13, color: theme.textSecondary, margin: '2px 0 0', fontFamily: FONT } }, 'Sends instant alerts to nearby parents')
          ),
          React.createElement('div', {
            onClick: () => setIsUrgent(!isUrgent),
            style: {
              width: 52,
              height: 30,
              borderRadius: 15,
              background: isUrgent ? COLORS.cta : theme.border,
              padding: 2,
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
            }
          },
            React.createElement('div', {
              style: {
                width: 26,
                height: 26,
                borderRadius: 13,
                background: COLORS.white,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
                transform: isUrgent ? 'translateX(22px)' : 'translateX(0)',
              }
            })
          )
        ),
        // Kredit slider
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('span', { style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT } }, '⚡ Kindness Kredits Offer'),
            React.createElement('span', { style: { fontSize: 18, fontWeight: 700, color: COLORS.warning, fontFamily: FONT } }, kreditValue)
          ),
          React.createElement('input', {
            type: 'range',
            min: 1,
            max: 15,
            value: kreditValue,
            onChange: (e) => setKreditValue(parseInt(e.target.value)),
            style: { width: '100%', accentColor: COLORS.primary }
          })
        ),
        // Submit
        React.createElement('div', {
          onClick: () => {
            if (taskTitle && selectedCategory) {
              setShowNewTask(false);
              showToast('✅ Task posted successfully!');
            }
          },
          style: {
            background: (taskTitle && selectedCategory) ? `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.ctaHover})` : theme.border,
            color: (taskTitle && selectedCategory) ? COLORS.white : theme.textSecondary,
            padding: '16px 24px',
            borderRadius: 16,
            fontSize: 17,
            fontWeight: 700,
            fontFamily: FONT,
            textAlign: 'center',
            cursor: (taskTitle && selectedCategory) ? 'pointer' : 'default',
            boxShadow: (taskTitle && selectedCategory) ? `0 4px 16px ${COLORS.cta}44` : 'none',
          }
        }, 'Post Task')
      )
    );
  };

  const screens = {
    home: HomeScreen,
    taskDetail: TaskDetailScreen,
    schedule: ScheduleScreen,
    notifications: NotificationsScreen,
    profile: ProfileScreen,
  };

  const CurrentScreen = screens[activeScreen] || HomeScreen;

  return React.createElement('div', {
    style: {
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      padding: '20px 0',
    }
  },
    // Phone frame
    React.createElement('div', {
      style: {
        width: 375,
        height: 812,
        borderRadius: 44,
        overflow: 'hidden',
        background: theme.bg,
        boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }
    },
      // Notch
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 150,
          height: 34,
          background: '#000',
          borderRadius: '0 0 20px 20px',
          zIndex: 50,
        }
      }),
      React.createElement(StatusBar),
      React.createElement('div', {
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginTop: 10,
          opacity: animating ? 0.6 : 1,
          transition: 'opacity 0.15s ease',
        }
      },
        React.createElement(CurrentScreen)
      ),
      activeScreen !== 'taskDetail' && React.createElement(TabBar),
      showNewTask && React.createElement(NewTaskModal),
      // Toast
      toastVisible && React.createElement('div', {
        style: {
          position: 'absolute',
          top: 60,
          left: 20,
          right: 20,
          background: darkMode ? COLORS.cardDark : COLORS.white,
          borderRadius: 16,
          padding: '14px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          border: `1px solid ${theme.border}`,
          animation: 'none',
        }
      },
        React.createElement('span', { style: { fontSize: 15, fontWeight: 500, color: theme.text, fontFamily: FONT } }, toastMessage)
      ),
      // Home indicator
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 3,
          background: darkMode ? '#555' : '#000',
          opacity: 0.2,
        }
      })
    )
  );
}