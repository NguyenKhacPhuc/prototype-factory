const { useState, useEffect, useRef } = React;

// ── THEMES ─────────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    bg: '#EEF7F6',
    surface: '#FFFFFF',
    surfaceAlt: '#E4F2F1',
    card: '#F7FFFE',
    cardHigh: '#DDEEED',
    text: '#0A1F1E',
    sub: '#3D6A68',
    muted: '#7BABA8',
    primary: '#0D9488',
    primaryLight: 'rgba(13,148,136,0.12)',
    primaryGlow: 'rgba(13,148,136,0.2)',
    amber: '#D97706',
    amberLight: 'rgba(217,119,6,0.12)',
    red: '#DC2626',
    redLight: 'rgba(220,38,38,0.1)',
    blue: '#2563EB',
    blueLight: 'rgba(37,99,235,0.1)',
    purple: '#7C3AED',
    purpleLight: 'rgba(124,58,237,0.1)',
    border: 'rgba(13,148,136,0.16)',
    faint: 'rgba(0,0,0,0.045)',
    nav: '#FFFFFF',
    tag: 'rgba(13,148,136,0.1)',
    tagText: '#0D9488',
    shadow: 'rgba(13,148,136,0.08)',
  },
  dark: {
    bg: '#070E0D',
    surface: '#0E1A19',
    surfaceAlt: '#142120',
    card: '#192928',
    cardHigh: '#1F3332',
    text: '#D9F0EE',
    sub: '#6DBAB6',
    muted: '#2E5452',
    primary: '#14B8A6',
    primaryLight: 'rgba(20,184,166,0.15)',
    primaryGlow: 'rgba(20,184,166,0.25)',
    amber: '#FBBF24',
    amberLight: 'rgba(251,191,36,0.12)',
    red: '#F87171',
    redLight: 'rgba(248,113,113,0.12)',
    blue: '#60A5FA',
    blueLight: 'rgba(96,165,250,0.12)',
    purple: '#A78BFA',
    purpleLight: 'rgba(167,139,250,0.12)',
    border: 'rgba(20,184,166,0.18)',
    faint: 'rgba(255,255,255,0.04)',
    nav: '#0A1614',
    tag: 'rgba(20,184,166,0.14)',
    tagText: '#14B8A6',
    shadow: 'rgba(0,0,0,0.35)',
  },
};

// ── DATA ────────────────────────────────────────────────────────────────────
const CALENDAR_EVENTS = [
  { time: '9:00 AM', title: 'Sprint Standup', type: 'work', color: '#2563EB' },
  { time: '12:30 PM', title: 'Lunch w/ Priya', type: 'personal', color: '#7C3AED' },
  { time: '3:00 PM', title: 'Dentist — Dr. Cho', type: 'health', color: '#D97706' },
  { time: '7:00 PM', title: 'Yoga class', type: 'health', color: '#0D9488' },
];

const STORIES = [
  {
    id: 1,
    category: 'Finance',
    headline: 'Fed signals two more rate cuts before year-end, markets rally',
    source: 'Reuters',
    time: '14m ago',
    readTime: '4 min',
    contextTag: 'Affects your rent',
    contextDetail: 'Your lease renews in August — landlords may adjust pricing based on borrowing costs.',
    contextColor: 'amber',
    saved: false,
    img: '#2E4057',
    topics: ['Finance', 'Local'],
  },
  {
    id: 2,
    category: 'Transit',
    headline: 'MTA announces L-train service cuts on weekday evenings starting April',
    source: 'NY Transit News',
    time: '32m ago',
    readTime: '3 min',
    contextTag: 'On your commute',
    contextDetail: 'You take the L from Bedford Av. Evening departures after 6pm affected.',
    contextColor: 'red',
    saved: true,
    img: '#1A3A2A',
    topics: ['Transit'],
  },
  {
    id: 3,
    category: 'Policy',
    headline: 'NYC Council votes to expand zoning for mixed-use buildings in North Brooklyn',
    source: 'City Limits',
    time: '1h ago',
    readTime: '6 min',
    contextTag: 'Near your home',
    contextDetail: 'Your neighborhood (Williamsburg 11211) falls in the affected rezoning corridor.',
    contextColor: 'blue',
    saved: false,
    img: '#2D1B4E',
    topics: ['Policy', 'Local'],
  },
  {
    id: 4,
    category: 'Education',
    headline: 'Schools Chancellor proposes new literacy curriculum for K-3 citywide',
    source: 'Chalkbeat NY',
    time: '2h ago',
    readTime: '5 min',
    contextTag: 'Your district',
    contextDetail: 'PS 84 (District 14) is included in the pilot rollout starting September.',
    contextColor: 'purple',
    saved: false,
    img: '#1C3040',
    topics: ['Policy', 'Local'],
  },
  {
    id: 5,
    category: 'Health',
    headline: 'Air quality index forecast to hit "Unhealthy for Sensitive Groups" Thursday',
    source: 'Dept. of Health',
    time: '3h ago',
    readTime: '2 min',
    contextTag: 'Today at 3pm',
    contextDetail: 'Your dentist appointment is outdoors-adjacent. Consider a mask for the walk.',
    contextColor: 'amber',
    saved: false,
    img: '#2A1F0E',
    topics: ['Finance'],
  },
];

const ROUTE_ALERTS = [
  {
    id: 1,
    line: 'L',
    lineColor: '#A7A9AC',
    severity: 'high',
    title: 'Service Change — Evening Cuts',
    detail: 'No service Bedford Av → Canarsie after 9:30pm on weekdays. Starts April 7.',
    impact: 'Your 7pm yoga class return trip affected',
    time: 'Active Apr 7',
  },
  {
    id: 2,
    line: 'G',
    lineColor: '#6CBE45',
    severity: 'low',
    title: 'Planned Maintenance — Weekend',
    detail: 'G train running express Nassau Av to Hoyt-Schermerhorn Sat–Sun.',
    impact: '~8 extra minutes on weekend trips',
    time: 'Sat–Sun',
  },
  {
    id: 3,
    line: 'BUS',
    lineColor: '#E63' ,
    severity: 'medium',
    title: 'B62 Detour — Kent Ave',
    detail: 'Water main repair on Kent Ave between N 7th and N 10th through March 29.',
    impact: 'Affects your usual bus to dentist',
    time: 'Until Mar 29',
  },
];

const NEARBY_CARDS = [
  {
    id: 1,
    icon: 'Home',
    iconColor: '#2563EB',
    headline: 'Williamsburg Rezoning',
    national: 'City Council expands mixed-use zoning in North Brooklyn',
    local: 'Buildings on Bedford Ave between N 1st and N 9th St can now add 2–4 floors. Expect construction noise by Q3. Property assessments may rise 8–15% within the zone.',
    tag: '11211 ZIP',
    tagColor: 'blue',
  },
  {
    id: 2,
    icon: 'TrendingUp',
    iconColor: '#D97706',
    headline: 'Rent Pressure Ahead',
    national: 'Fed rate cuts signal cheaper borrowing — landlords watching refinancing windows',
    local: 'In your neighborhood, median asking rent rose 6% last quarter. Rate cuts may ease pressure slightly, but limited inventory keeps Williamsburg competitive.',
    tag: 'Your Rent',
    tagColor: 'amber',
  },
  {
    id: 3,
    icon: 'Wind',
    iconColor: '#7C3AED',
    headline: 'Air Quality Alert',
    national: 'Regional AQI forecast to reach "Unhealthy for Sensitive Groups" Thursday',
    local: 'Your neighborhood has above-average particulate exposure due to the BQE. Thursday afternoon (your dentist trip time) is the peak window. Air clears by 8pm.',
    tag: 'Thursday',
    tagColor: 'purple',
  },
  {
    id: 4,
    icon: 'BookOpen',
    iconColor: '#0D9488',
    headline: 'PS 84 Literacy Pilot',
    national: 'NYC Schools Chancellor proposes new K-3 literacy curriculum',
    local: 'PS 84 on John Street is in District 14 and is named in the September pilot. Parent information sessions likely to be scheduled by May.',
    tag: 'District 14',
    tagColor: 'primary',
  },
];

const SAVED_STORIES = [
  {
    id: 2,
    headline: 'MTA announces L-train service cuts on weekday evenings starting April',
    source: 'NY Transit News',
    savedAt: 'Saved 32m ago',
    bestTime: 'Tonight, 6 min window at 8:45pm',
    readTime: '3 min',
    contextTag: 'On your commute',
    contextColor: 'red',
  },
];

// ── HELPERS ─────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, color, style = {} }) {
  const LucideIcon = window.lucide && window.lucide[name];
  if (!LucideIcon) return React.createElement('span', { style: { width: size, height: size, display: 'inline-block', ...style } });
  return React.createElement(LucideIcon, { size, color, strokeWidth: 2, style });
}

function ContextPill({ label, color, t }) {
  const map = {
    amber: { bg: t.amberLight, text: t.amber },
    red: { bg: t.redLight, text: t.red },
    blue: { bg: t.blueLight, text: t.blue },
    purple: { bg: t.purpleLight, text: t.purple },
    primary: { bg: t.primaryLight, text: t.primary },
  };
  const c = map[color] || map.primary;
  return React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.text, letterSpacing: '0.02em',
    }
  },
    React.createElement(Icon, { name: 'Zap', size: 11, color: c.text }),
    label
  );
}

// ── SCREENS ─────────────────────────────────────────────────────────────────

function TodayScreen({ t, darkMode }) {
  const [pressedId, setPressedId] = useState(null);
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', paddingBottom: 90 }
  },
    // Header
    React.createElement('div', {
      style: {
        padding: '16px 20px 12px',
        background: `linear-gradient(160deg, ${t.primary} 0%, ${darkMode ? '#0A6B62' : '#0F766E'} 100%)`,
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement('div', null,
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0, fontWeight: 500 } }, greeting + ', Alex'),
          React.createElement('h2', { style: { color: '#fff', fontSize: 22, fontWeight: 700, margin: '2px 0 0', letterSpacing: '-0.4px' } }, 'Your Sunday Briefing'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: 12, margin: '4px 0 0' } }, '4 stories shaped to your day'),
        ),
        React.createElement('div', {
          style: {
            background: 'rgba(255,255,255,0.18)', borderRadius: 12,
            padding: '8px 12px', textAlign: 'center',
          }
        },
          React.createElement('p', { style: { color: '#fff', fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.1 } }, '63°'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 } }, 'Partly cloudy'),
        )
      ),
      // Calendar strip
      React.createElement('div', {
        style: {
          marginTop: 14, background: 'rgba(0,0,0,0.18)', borderRadius: 12,
          padding: '10px 12px',
        }
      },
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, margin: '0 0 8px', letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'Today'),
        React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto' } },
          CALENDAR_EVENTS.map(ev =>
            React.createElement('div', {
              key: ev.time,
              style: {
                flexShrink: 0, background: 'rgba(255,255,255,0.12)',
                borderRadius: 8, padding: '6px 10px',
                borderLeft: `3px solid ${ev.color}`,
              }
            },
              React.createElement('p', { style: { color: '#fff', fontSize: 12, fontWeight: 600, margin: 0 } }, ev.time),
              React.createElement('p', { style: { color: 'rgba(255,255,255,0.75)', fontSize: 11, margin: '2px 0 0', whiteSpace: 'nowrap' } }, ev.title),
            )
          )
        )
      )
    ),

    // Section: Before your standup
    React.createElement('div', { style: { padding: '16px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 } },
        React.createElement('div', { style: { width: 3, height: 16, background: t.blue, borderRadius: 2 } }),
        React.createElement('p', { style: { color: t.sub, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 } }, 'Before your 9:00 AM standup'),
      ),
      // Featured story
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16, overflow: 'hidden',
          boxShadow: `0 2px 16px ${t.shadow}`,
          border: `1px solid ${t.border}`,
          marginBottom: 10,
          transform: pressedId === 'feat' ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        },
        onMouseDown: () => setPressedId('feat'),
        onMouseUp: () => setPressedId(null),
        onTouchStart: () => setPressedId('feat'),
        onTouchEnd: () => setPressedId(null),
      },
        React.createElement('div', {
          style: {
            height: 80,
            background: `linear-gradient(135deg, #1A3A2A 0%, #2E4057 100%)`,
            display: 'flex', alignItems: 'flex-end', padding: '10px 14px',
          }
        },
          React.createElement('span', {
            style: {
              background: t.blue, color: '#fff', fontSize: 10, fontWeight: 700,
              padding: '3px 8px', borderRadius: 6, letterSpacing: '0.05em', textTransform: 'uppercase',
            }
          }, 'Finance')
        ),
        React.createElement('div', { style: { padding: '12px 14px 14px' } },
          React.createElement('h3', { style: { color: t.text, fontSize: 15, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.35, letterSpacing: '-0.2px' } },
            'Fed signals two more rate cuts before year-end, markets rally'
          ),
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement(ContextPill, { label: 'Affects your rent', color: 'amber', t })
          ),
          React.createElement('p', { style: { color: t.sub, fontSize: 12, lineHeight: 1.5, margin: '0 0 10px' } },
            'Your lease renews in August — landlords may adjust pricing based on borrowing costs. This story explains the timeline.'
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement('span', { style: { color: t.muted, fontSize: 11 } }, 'Reuters · 14m ago · 4 min read'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, color: t.primary, fontSize: 12, fontWeight: 600 } },
              'Read', React.createElement(Icon, { name: 'ChevronRight', size: 14, color: t.primary })
            )
          )
        )
      )
    ),

    // Section: Route alert
    React.createElement('div', { style: { padding: '14px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 } },
        React.createElement('div', { style: { width: 3, height: 16, background: t.red, borderRadius: 2 } }),
        React.createElement('p', { style: { color: t.sub, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 } }, 'Route Alert'),
      ),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 14, padding: '12px 14px',
          border: `1px solid ${t.redLight}`,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }
      },
        React.createElement('div', {
          style: {
            background: '#A7A9AC', borderRadius: 8, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontWeight: 800, fontSize: 16, color: '#fff',
          }
        }, 'L'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600, margin: '0 0 2px' } }, 'L-train evening cuts — April 7'),
          React.createElement('p', { style: { color: t.sub, fontSize: 12, margin: '0 0 6px', lineHeight: 1.4 } }, 'Your 7pm yoga return trip is affected. Last reliable train from DeKalb is 9:22pm.'),
          React.createElement(ContextPill, { label: 'Yoga class at 7pm', color: 'red', t }),
        )
      )
    ),

    // Section: Evening preview
    React.createElement('div', { style: { padding: '14px 20px 0' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 } },
        React.createElement('div', { style: { width: 3, height: 16, background: t.primary, borderRadius: 2 } }),
        React.createElement('p', { style: { color: t.sub, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 } }, 'This evening'),
      ),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 14, padding: '12px 14px',
          border: `1px solid ${t.border}`,
        }
      },
        React.createElement('p', { style: { color: t.muted, fontSize: 11, fontWeight: 600, margin: '0 0 6px' } }, '3 stories saved for tonight'),
        SAVED_STORIES.map(s =>
          React.createElement('div', {
            key: s.id,
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: `1px solid ${t.faint}` }
          },
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('p', { style: { color: t.text, fontSize: 12, fontWeight: 600, margin: '0 0 2px' } }, s.headline.slice(0, 48) + '…'),
              React.createElement('p', { style: { color: t.muted, fontSize: 11, margin: 0 } }, s.bestTime),
            ),
            React.createElement(Icon, { name: 'BookmarkCheck', size: 16, color: t.primary })
          )
        ),
        React.createElement('div', {
          style: {
            padding: '7px 0 0',
            borderTop: `1px solid ${t.faint}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }
        },
          React.createElement('p', { style: { color: t.sub, fontSize: 12, margin: 0 } }, 'Best window: 8:30–9:00pm · 22 min free'),
          React.createElement(Icon, { name: 'Clock', size: 14, color: t.primary })
        )
      )
    )
  );
}

function StoriesScreen({ t }) {
  const [filter, setFilter] = useState('All');
  const [savedIds, setSavedIds] = useState([2]);
  const [pressedId, setPressedId] = useState(null);
  const tabs = ['All', 'Local', 'Transit', 'Policy', 'Finance'];

  const visible = filter === 'All' ? STORIES : STORIES.filter(s => s.topics.includes(filter));

  const colorMap = { amber: t.amber, red: t.red, blue: t.blue, purple: t.purple, primary: t.primary };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90 } },
    // Header
    React.createElement('div', { style: { padding: '14px 20px 10px', borderBottom: `1px solid ${t.faint}` } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.3px' } }, 'Stories'),
      React.createElement('div', { style: { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 } },
        tabs.map(tab =>
          React.createElement('button', {
            key: tab,
            onClick: () => setFilter(tab),
            style: {
              flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none',
              background: filter === tab ? t.primary : t.faint,
              color: filter === tab ? '#fff' : t.sub,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }
          }, tab)
        )
      )
    ),
    // Stories list
    React.createElement('div', { style: { padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
      visible.map(story =>
        React.createElement('div', {
          key: story.id,
          style: {
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
            boxShadow: `0 1px 8px ${t.shadow}`,
            transform: pressedId === story.id ? 'scale(0.985)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          },
          onMouseDown: () => setPressedId(story.id),
          onMouseUp: () => setPressedId(null),
          onTouchStart: () => setPressedId(story.id),
          onTouchEnd: () => setPressedId(null),
        },
          // Context banner
          React.createElement('div', {
            style: {
              padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8,
              background: t.primaryLight, borderBottom: `1px solid ${t.border}`,
            }
          },
            React.createElement(Icon, { name: 'Zap', size: 13, color: t.primary }),
            React.createElement('p', {
              style: { color: t.primary, fontSize: 11, fontWeight: 600, margin: 0, flex: 1 }
            }, story.contextDetail),
          ),
          React.createElement('div', { style: { padding: '10px 14px 12px' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 } },
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 } },
                  React.createElement('span', {
                    style: {
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: colorMap[story.contextColor] || t.primary,
                    }
                  }, story.category),
                  React.createElement('span', { style: { color: t.muted, fontSize: 10 } }, '·'),
                  React.createElement('span', { style: { color: t.muted, fontSize: 11 } }, story.source),
                ),
                React.createElement('h3', { style: { color: t.text, fontSize: 14, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.35, letterSpacing: '-0.15px' } }, story.headline),
                React.createElement(ContextPill, { label: story.contextTag, color: story.contextColor, t }),
              ),
              React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); setSavedIds(prev => prev.includes(story.id) ? prev.filter(x => x !== story.id) : [...prev, story.id]); },
                style: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }
              },
                React.createElement(Icon, {
                  name: savedIds.includes(story.id) ? 'BookmarkCheck' : 'Bookmark',
                  size: 18,
                  color: savedIds.includes(story.id) ? t.primary : t.muted,
                })
              )
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 8 } },
              React.createElement('span', { style: { color: t.muted, fontSize: 11 } }, story.time + ' · ' + story.readTime + ' read'),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3, color: t.primary, fontSize: 12, fontWeight: 600 } },
                'Read', React.createElement(Icon, { name: 'ChevronRight', size: 13, color: t.primary })
              )
            )
          )
        )
      )
    )
  );
}

function RouteScreen({ t }) {
  const severityColor = { high: t.red, medium: t.amber, low: t.primary };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90 } },
    // Route header
    React.createElement('div', {
      style: {
        padding: '14px 20px 16px',
        background: `linear-gradient(160deg, #1A1A2E 0%, #16213E 100%)`,
      }
    },
      React.createElement('h2', { style: { color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.3px' } }, 'Route Watch'),
      React.createElement('p', { style: { color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: '0 0 14px' } }, 'Bedford Av → Downtown Brooklyn'),
      // Route map visual
      React.createElement('div', {
        style: {
          background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px',
          display: 'flex', alignItems: 'center', gap: 0, position: 'relative',
        }
      },
        // Stops
        [
          { label: 'Bedford Av', sub: 'Home', color: '#A7A9AC', dot: true },
          { label: 'L Train', sub: '⚠ Cuts', color: '#A7A9AC', line: true },
          { label: 'Union Sq', sub: 'Transfer', color: '#A7A9AC', dot: true },
          { label: '4/5/6', sub: 'Express', color: '#4CAF50', line: true },
          { label: 'Fulton St', sub: 'Office', color: '#4CAF50', dot: true },
        ].map((stop, i) =>
          stop.line
            ? React.createElement('div', {
                key: i,
                style: {
                  flex: 1, height: 3, background: stop.color,
                  position: 'relative',
                }
              },
                React.createElement('span', {
                  style: {
                    position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, color: stop.color, whiteSpace: 'nowrap', fontWeight: 600,
                  }
                }, stop.label),
                React.createElement('span', {
                  style: {
                    position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap',
                  }
                }, stop.sub),
              )
            : React.createElement('div', {
                key: i,
                style: {
                  width: 12, height: 12, borderRadius: '50%',
                  background: stop.color, flexShrink: 0, position: 'relative',
                }
              },
                i === 0 && React.createElement('span', {
                  style: {
                    position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap',
                  }
                }, stop.sub),
                i === 4 && React.createElement('span', {
                  style: {
                    position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 10, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap',
                  }
                }, stop.sub),
              )
        ),
        // Alert dot on route
        React.createElement('div', {
          style: {
            position: 'absolute', top: 10, left: '30%',
            width: 18, height: 18, borderRadius: '50%',
            background: t.red, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#fff', fontWeight: 800,
          }
        }, '!')
      )
    ),

    // Alerts
    React.createElement('div', { style: { padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 } },
        React.createElement('p', { style: { color: t.sub, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 } }, '3 Active Alerts'),
        React.createElement('span', { style: { color: t.primary, fontSize: 12, fontWeight: 600 } }, 'All Routes'),
      ),
      ROUTE_ALERTS.map(alert =>
        React.createElement('div', {
          key: alert.id,
          style: {
            background: t.surface, borderRadius: 14, padding: '12px 14px',
            border: `1px solid ${severityColor[alert.severity]}33`,
            borderLeft: `4px solid ${severityColor[alert.severity]}`,
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10 } },
            React.createElement('div', {
              style: {
                background: alert.lineColor, borderRadius: 6, width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontWeight: 800, fontSize: 13, color: '#fff',
              }
            }, alert.line),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 2 } },
                React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, margin: 0 } }, alert.title),
                React.createElement('span', { style: { color: t.muted, fontSize: 11 } }, alert.time),
              ),
              React.createElement('p', { style: { color: t.sub, fontSize: 12, margin: '2px 0 6px', lineHeight: 1.4 } }, alert.detail),
              React.createElement('div', {
                style: {
                  background: severityColor[alert.severity] + '1A', borderRadius: 6,
                  padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6,
                }
              },
                React.createElement(Icon, { name: 'Zap', size: 11, color: severityColor[alert.severity] }),
                React.createElement('span', { style: { color: severityColor[alert.severity], fontSize: 11, fontWeight: 600 } }, alert.impact),
              )
            )
          )
        )
      ),

      // News linked to route
      React.createElement('div', { style: { marginTop: 8 } },
        React.createElement('p', { style: { color: t.sub, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 10px' } }, 'Related News'),
        React.createElement('div', {
          style: {
            background: t.surface, borderRadius: 14, padding: '12px 14px',
            border: `1px solid ${t.border}`,
          }
        },
          React.createElement('p', { style: { color: t.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px', fontWeight: 600 } }, 'Transit · NY Transit News'),
          React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.35 } }, 'MTA announces L-train service cuts on weekday evenings starting April'),
          React.createElement('p', { style: { color: t.sub, fontSize: 12, margin: '0 0 8px', lineHeight: 1.4 } }, 'Capital repair work requires single-tracking on the Canarsie tunnel section after 9pm.'),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            React.createElement(ContextPill, { label: 'On your commute', color: 'red', t }),
            React.createElement('span', { style: { color: t.muted, fontSize: 11 } }, '3 min read'),
          )
        )
      )
    )
  );
}

function NearbyScreen({ t }) {
  const [expanded, setExpanded] = useState(1);
  const colorMap = { blue: t.blue, amber: t.amber, purple: t.purple, primary: t.primary };

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90 } },
    React.createElement('div', { style: { padding: '14px 20px 12px', borderBottom: `1px solid ${t.faint}` } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 2px', letterSpacing: '-0.3px' } }, 'Neighborhood'),
      React.createElement('p', { style: { color: t.sub, fontSize: 13, margin: 0 } }, 'Williamsburg · ZIP 11211'),
    ),
    React.createElement('div', { style: { padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12 } },
      NEARBY_CARDS.map(card => {
        const isOpen = expanded === card.id;
        const col = colorMap[card.tagColor] || t.primary;
        return React.createElement('div', {
          key: card.id,
          style: {
            background: t.surface, borderRadius: 16,
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
            boxShadow: `0 1px 8px ${t.shadow}`,
          }
        },
          React.createElement('button', {
            onClick: () => setExpanded(isOpen ? null : card.id),
            style: {
              width: '100%', textAlign: 'left', background: 'none', border: 'none',
              padding: '14px 14px 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }
          },
            React.createElement('div', {
              style: {
                width: 36, height: 36, borderRadius: 10,
                background: col + '1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }
            },
              React.createElement(Icon, { name: card.icon, size: 18, color: col })
            ),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 } },
                React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 700, margin: 0 } }, card.headline),
                React.createElement(Icon, { name: isOpen ? 'ChevronUp' : 'ChevronDown', size: 16, color: t.muted })
              ),
              React.createElement('p', { style: { color: t.sub, fontSize: 12, margin: '0 0 6px', lineHeight: 1.4 } }, card.national),
              React.createElement('span', {
                style: {
                  display: 'inline-block', padding: '3px 8px', borderRadius: 20,
                  background: col + '18', color: col,
                  fontSize: 11, fontWeight: 600,
                }
              }, card.tag)
            )
          ),
          isOpen && React.createElement('div', {
            style: {
              padding: '0 14px 14px 62px',
              borderTop: `1px solid ${t.faint}`,
              paddingTop: 12,
            }
          },
            React.createElement('div', {
              style: {
                background: col + '0E', borderRadius: 10, padding: '10px 12px',
                borderLeft: `3px solid ${col}`,
              }
            },
              React.createElement('p', { style: { color: t.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 4px' } }, 'What this means for you'),
              React.createElement('p', { style: { color: t.text, fontSize: 13, lineHeight: 1.55, margin: 0 } }, card.local),
            )
          )
        );
      })
    )
  );
}

function SettingsScreen({ t, darkMode, setDarkMode }) {
  const [calOn, setCalOn] = useState(true);
  const [locOn, setLocOn] = useState(true);
  const [routeOn, setRouteOn] = useState(true);
  const [notifOn, setNotifOn] = useState(true);

  const Toggle = ({ value, onChange, color }) =>
    React.createElement('button', {
      onClick: () => onChange(!value),
      style: {
        width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
        background: value ? (color || t.primary) : t.faint,
        position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
      }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 3,
          left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.25s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }
      })
    );

  const Row = ({ icon, label, sub, value, onChange, color }) =>
    React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderBottom: `1px solid ${t.faint}`,
      }
    },
      React.createElement('div', {
        style: {
          width: 34, height: 34, borderRadius: 9,
          background: (color || t.primary) + '1A',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }
      },
        React.createElement(Icon, { name: icon, size: 16, color: color || t.primary })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600, margin: 0 } }, label),
        sub && React.createElement('p', { style: { color: t.muted, fontSize: 12, margin: '2px 0 0' } }, sub),
      ),
      React.createElement(Toggle, { value, onChange, color })
    );

  return React.createElement('div', { style: { flex: 1, overflowY: 'auto', paddingBottom: 90 } },
    React.createElement('div', { style: { padding: '14px 20px 16px' } },
      React.createElement('h2', { style: { color: t.text, fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.3px' } }, 'Settings'),
      React.createElement('p', { style: { color: t.sub, fontSize: 13, margin: 0 } }, 'Alex Rivera · alex@example.com'),
    ),

    // Appearance
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('p', { style: { color: t.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px 4px' } }, 'Appearance'),
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` } },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 9,
              background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            React.createElement(Icon, { name: darkMode ? 'Moon' : 'Sun', size: 16, color: t.primary })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600, margin: 0 } }, 'Dark Mode'),
            React.createElement('p', { style: { color: t.muted, fontSize: 12, margin: '2px 0 0' } }, darkMode ? 'On — easy on the eyes at night' : 'Off — editorial light mode'),
          ),
          React.createElement(Toggle, { value: darkMode, onChange: setDarkMode })
        )
      )
    ),

    // Context Sources
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('p', { style: { color: t.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px 4px' } }, 'Context Sources'),
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` } },
        React.createElement(Row, { icon: 'Calendar', label: 'Calendar Access', sub: 'Powers briefings tied to your events', value: calOn, onChange: setCalOn }),
        React.createElement(Row, { icon: 'MapPin', label: 'Location', sub: 'Neighborhood & route detection', value: locOn, onChange: setLocOn }),
        React.createElement(Row, { icon: 'Train', label: 'Route Watch', sub: 'Transit alerts on your commute paths', value: routeOn, onChange: setRouteOn }),
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }
        },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: 9, background: t.amberLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }
          },
            React.createElement(Icon, { name: 'Bell', size: 16, color: t.amber })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('p', { style: { color: t.text, fontSize: 14, fontWeight: 600, margin: 0 } }, 'Morning Briefing'),
            React.createElement('p', { style: { color: t.muted, fontSize: 12, margin: '2px 0 0' } }, 'Delivered at 7:30 AM daily'),
          ),
          React.createElement(Toggle, { value: notifOn, onChange: setNotifOn, color: t.amber })
        )
      )
    ),

    // Reading Profile
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('p', { style: { color: t.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px 4px' } }, 'Reading Profile'),
      React.createElement('div', { style: { background: t.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${t.border}` } },
        ['Finance & Housing', 'NYC Transit', 'Local Policy', 'Education'].map((topic, i, arr) =>
          React.createElement('div', {
            key: topic,
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${t.faint}` : 'none',
            }
          },
            React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 500, margin: 0 } }, topic),
            React.createElement(Icon, { name: 'Check', size: 16, color: t.primary })
          )
        )
      )
    ),

    // Location
    React.createElement('div', { style: { padding: '0 20px 12px' } },
      React.createElement('p', { style: { color: t.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px 4px' } }, 'Your Location'),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 16, padding: '14px 16px',
          border: `1px solid ${t.border}`,
          display: 'flex', gap: 12, alignItems: 'center',
        }
      },
        React.createElement(Icon, { name: 'MapPin', size: 20, color: t.primary }),
        React.createElement('div', null,
          React.createElement('p', { style: { color: t.text, fontSize: 13, fontWeight: 600, margin: 0 } }, 'Williamsburg, Brooklyn'),
          React.createElement('p', { style: { color: t.muted, fontSize: 12, margin: '2px 0 0' } }, 'ZIP 11211 · L, G trains detected'),
        )
      )
    )
  );
}

// ── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tab, setTab] = useState('today');
  const t = darkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #d8d8d8; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const NAV_TABS = [
    { id: 'today', label: 'Today', icon: 'Sun' },
    { id: 'stories', label: 'Stories', icon: 'Newspaper' },
    { id: 'route', label: 'Route', icon: 'Train' },
    { id: 'nearby', label: 'Nearby', icon: 'MapPin' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  const renderScreen = () => {
    if (tab === 'today') return React.createElement(TodayScreen, { t, darkMode });
    if (tab === 'stories') return React.createElement(StoriesScreen, { t });
    if (tab === 'route') return React.createElement(RouteScreen, { t });
    if (tab === 'nearby') return React.createElement(NearbyScreen, { t });
    if (tab === 'settings') return React.createElement(SettingsScreen, { t, darkMode, setDarkMode });
    return null;
  };

  return React.createElement('div', {
    style: {
      width: 375, height: 812, borderRadius: 50,
      background: t.bg,
      boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      position: 'relative', fontFamily: "'Plus Jakarta Sans', sans-serif",
    }
  },
    // Status bar
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 28px 8px',
        background: tab === 'today' ? `linear-gradient(160deg, ${t.primary} 0%, ${darkMode ? '#0A6B62' : '#0F766E'} 100%)` : tab === 'route' ? '#1A1A2E' : t.bg,
        zIndex: 10,
      }
    },
      React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: (tab === 'today' || tab === 'route') ? '#fff' : t.text } }, '9:41'),
      React.createElement('div', {
        style: {
          width: 120, height: 34, background: '#111', borderRadius: 20,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }
      }),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
        React.createElement(Icon, { name: 'Wifi', size: 14, color: (tab === 'today' || tab === 'route') ? '#fff' : t.text }),
        React.createElement(Icon, { name: 'Battery', size: 16, color: (tab === 'today' || tab === 'route') ? '#fff' : t.text }),
      )
    ),

    // Screen content
    React.createElement('div', { style: { flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' } },
      renderScreen()
    ),

    // Bottom nav
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 8px 18px',
        background: t.nav,
        borderTop: `1px solid ${t.border}`,
        position: 'absolute', bottom: 0, left: 0, right: 0,
      }
    },
      NAV_TABS.map(navTab =>
        React.createElement('button', {
          key: navTab.id,
          onClick: () => setTab(navTab.id),
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px',
            flex: 1,
          }
        },
          React.createElement('div', {
            style: {
              width: 36, height: 28, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: tab === navTab.id ? t.primaryLight : 'transparent',
              transition: 'background 0.2s ease',
            }
          },
            React.createElement(Icon, { name: navTab.icon, size: 19, color: tab === navTab.id ? t.primary : t.muted })
          ),
          React.createElement('span', {
            style: {
              fontSize: 10, fontWeight: 600,
              color: tab === navTab.id ? t.primary : t.muted,
              letterSpacing: '0.01em',
            }
          }, navTab.label)
        )
      )
    )
  );
}
