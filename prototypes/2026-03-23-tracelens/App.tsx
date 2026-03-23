const { useState, useEffect, useRef } = React;

const themes = {
  light: {
    bg: '#F0F4F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F7FAFC',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    text: '#1A202C',
    textSecondary: '#718096',
    textMuted: '#A0AEC0',
    primary: '#0EA5E9',
    primaryDark: '#0284C7',
    primaryLight: '#E0F2FE',
    accent: '#06B6D4',
    accentLight: '#CFFAFE',
    danger: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F0',
    statusBar: '#0EA5E9',
    overlay: 'rgba(0,0,0,0.4)',
    inputBg: '#F1F5F9',
    tagBg: '#E0F2FE',
    tagText: '#0369A1',
    divider: '#E2E8F0',
    gradient1: '#0EA5E9',
    gradient2: '#06B6D4',
  },
  dark: {
    bg: '#0B1120',
    surface: '#131E30',
    surfaceAlt: '#1A2844',
    card: '#1E2D40',
    cardBorder: '#263345',
    text: '#F0F6FF',
    textSecondary: '#94A3B8',
    textMuted: '#475569',
    primary: '#38BDF8',
    primaryDark: '#0EA5E9',
    primaryLight: '#0C2948',
    accent: '#22D3EE',
    accentLight: '#083344',
    danger: '#F87171',
    success: '#4ADE80',
    warning: '#FBBF24',
    navBg: '#0F1A2E',
    navBorder: '#1E2D40',
    statusBar: '#38BDF8',
    overlay: 'rgba(0,0,0,0.7)',
    inputBg: '#1A2844',
    tagBg: '#0C2948',
    tagText: '#38BDF8',
    divider: '#1E2D40',
    gradient1: '#38BDF8',
    gradient2: '#22D3EE',
  }
};

const fontLink = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
::-webkit-scrollbar { width: 0; }
body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; }`;

const incidents = [
  {
    id: 1,
    title: 'Apartment Water Damage',
    date: 'Mar 22, 2026 · 9:14 AM',
    location: '142 Maple St, Apt 3B',
    weather: 'Clear, 58°F',
    clips: 4,
    photos: 7,
    tags: ['Water Damage', 'Ceiling', 'Bedroom'],
    status: 'Documented',
    thumbnail: null,
    color: '#EF4444'
  },
  {
    id: 2,
    title: 'Road Hazard – Pothole',
    date: 'Mar 21, 2026 · 7:42 AM',
    location: 'Oak Ave & 5th St',
    weather: 'Overcast, 52°F',
    clips: 2,
    photos: 3,
    tags: ['Road Hazard', 'Cycling'],
    status: 'Shared',
    thumbnail: null,
    color: '#F59E0B'
  },
  {
    id: 3,
    title: 'Parking Lot Collision',
    date: 'Mar 19, 2026 · 3:28 PM',
    location: 'Westfield Mall – P3',
    weather: 'Sunny, 67°F',
    clips: 1,
    photos: 12,
    tags: ['Vehicle', 'Collision', 'Insurance'],
    status: 'Report Ready',
    thumbnail: null,
    color: '#0EA5E9'
  }
];

const timelineItems = [
  { id: 1, time: '9:11 AM', type: 'video', duration: '0:18', note: 'Noticed stain on ceiling when I woke up', tags: ['Ceiling', 'Bedroom'], thumb: '#4B5563' },
  { id: 2, time: '9:13 AM', type: 'photo', duration: null, note: 'Close-up of water stain edge', tags: ['Stain', 'Paint'], thumb: '#6B7280' },
  { id: 3, time: '9:14 AM', type: 'photo', duration: null, note: '', tags: ['Dripping'], thumb: '#374151' },
  { id: 4, time: '9:16 AM', type: 'voice', duration: '0:32', note: 'Voice memo: described the drip pattern and when it started', tags: [], thumb: null },
  { id: 5, time: '9:18 AM', type: 'video', duration: '0:24', note: 'Showed the wet carpet below', tags: ['Carpet', 'Wet'], thumb: '#4B5563' },
  { id: 6, time: '9:22 AM', type: 'photo', duration: null, note: 'Hallway ceiling – same issue', tags: ['Hallway'], thumb: '#374151' },
];

function StatusBar({ t }) {
  return React.createElement('div', {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 16,
      paddingTop: 14,
    }
  },
    React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: '-0.2px' } }, '9:41'),
    React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
      React.createElement(window.lucide.Wifi, { size: 14, color: t.text }),
      React.createElement(window.lucide.Signal, { size: 14, color: t.text }),
      React.createElement(window.lucide.Battery, { size: 16, color: t.text }),
    )
  );
}

function DynamicIsland() {
  return React.createElement('div', {
    style: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 34,
      background: '#000',
      borderRadius: 20,
      zIndex: 10,
    }
  });
}

function IncidentCard({ incident, t, onClick }) {
  const [pressed, setPressed] = useState(false);
  const statusColors = {
    'Documented': { bg: t.tagBg, text: t.tagText },
    'Shared': { bg: '#DCFCE7', text: '#15803D' },
    'Report Ready': { bg: '#FEF9C3', text: '#92400E' },
  };
  const sc = statusColors[incident.status] || statusColors['Documented'];
  return React.createElement('div', {
    onClick,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16,
      padding: '16px',
      marginBottom: 12,
      cursor: 'pointer',
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      boxShadow: pressed ? 'none' : `0 2px 8px rgba(0,0,0,0.06)`,
    }
  },
    React.createElement('div', { style: { display: 'flex', gap: 12 } },
      React.createElement('div', {
        style: {
          width: 56,
          height: 56,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${incident.color}33, ${incident.color}22)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: `1px solid ${incident.color}44`,
        }
      },
        React.createElement(window.lucide.FileVideo, { size: 22, color: incident.color })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } },
          React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1.2 } }, incident.title),
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontWeight: 600,
              color: sc.text,
              background: sc.bg,
              padding: '2px 7px',
              borderRadius: 99,
              whiteSpace: 'nowrap',
              marginLeft: 6,
            }
          }, incident.status)
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 } },
          React.createElement(window.lucide.MapPin, { size: 11, color: t.textMuted }),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, incident.location)
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
            React.createElement(window.lucide.Video, { size: 11, color: t.textSecondary }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 600 } }, incident.clips)
          ),
          React.createElement('div', { style: { width: 3, height: 3, borderRadius: '50%', background: t.textMuted } }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 3 } },
            React.createElement(window.lucide.Image, { size: 11, color: t.textSecondary }),
            React.createElement('span', { style: { fontSize: 11, color: t.textSecondary, fontWeight: 600 } }, incident.photos)
          ),
          React.createElement('div', { style: { width: 3, height: 3, borderRadius: '50%', background: t.textMuted } }),
          React.createElement('span', { style: { fontSize: 11, color: t.textMuted } }, incident.date.split('·')[1]?.trim())
        )
      )
    )
  );
}

function HomeScreen({ t, onOpenIncident }) {
  const [search, setSearch] = useState('');
  const filtered = incidents.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return React.createElement('div', {
    style: { flex: 1, overflowY: 'auto', background: t.bg }
  },
    React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.gradient1}, ${t.gradient2})`, padding: '0 20px 24px', paddingTop: 4 } },
      React.createElement(StatusBar, { t: { ...t, text: '#fff' } }),
      React.createElement('div', { style: { height: 44 } }),
      React.createElement('div', { style: { marginBottom: 4 } },
        React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: 4 } }, 'Good morning, Alex'),
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: 14 } }, 'Your Incident\nRecords')
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 12,
          padding: '10px 14px',
          gap: 8,
          border: '1px solid rgba(255,255,255,0.25)',
        }
      },
        React.createElement(window.lucide.Search, { size: 16, color: 'rgba(255,255,255,0.8)' }),
        React.createElement('input', {
          value: search,
          onChange: e => setSearch(e.target.value),
          placeholder: 'Search incidents or tags...',
          style: {
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 14,
            color: '#fff',
            flex: 1,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }
        })
      )
    ),
    React.createElement('div', { style: { padding: '20px 20px 4px' } },
      React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto' } },
        [
          { label: 'All', count: 3, active: true },
          { label: 'Insurance', count: 1 },
          { label: 'Hazards', count: 1 },
          { label: 'Property', count: 1 },
        ].map((chip, i) => React.createElement('div', {
          key: i,
          style: {
            padding: '6px 14px',
            borderRadius: 99,
            background: chip.active ? t.primary : t.inputBg,
            color: chip.active ? '#fff' : t.textSecondary,
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            border: chip.active ? 'none' : `1px solid ${t.cardBorder}`,
          }
        }, chip.label, chip.active ? null : React.createElement('span', { style: { marginLeft: 4, opacity: 0.6 } }, chip.count)))
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, `Recent Incidents`),
        React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'View all')
      ),
      filtered.map(incident =>
        React.createElement(IncidentCard, {
          key: incident.id,
          incident,
          t,
          onClick: () => onOpenIncident(incident)
        })
      )
    )
  );
}

function CaptureScreen({ t }) {
  const [recording, setRecording] = useState(false);
  const [captured, setCaptured] = useState([
    { type: 'photo', time: '9:41 AM' },
    { type: 'video', time: '9:41 AM', duration: '0:12' },
  ]);
  const [voiceActive, setVoiceActive] = useState(false);
  const [pulseAnim, setPulseAnim] = useState(false);

  useEffect(() => {
    if (recording || voiceActive) {
      const t = setInterval(() => setPulseAnim(p => !p), 700);
      return () => clearInterval(t);
    }
  }, [recording, voiceActive]);

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg } },
    React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.gradient1}, ${t.gradient2})`, padding: '0 20px 20px' } },
      React.createElement(StatusBar, { t: { ...t, text: '#fff' } }),
      React.createElement('div', { style: { height: 44 } }),
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' } }, 'New Incident'),
      React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 } }, 'Capture evidence while it\'s fresh')
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '20px' } },
      React.createElement('div', {
        style: {
          background: '#0B1120',
          borderRadius: 16,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
          border: recording ? `2px solid ${t.danger}` : `2px solid ${t.cardBorder}`,
        }
      },
        recording && React.createElement('div', {
          style: {
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: t.danger,
            padding: '4px 10px',
            borderRadius: 99,
          }
        },
          React.createElement('div', {
            style: {
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#fff',
              opacity: pulseAnim ? 1 : 0.3,
              transition: 'opacity 0.3s',
            }
          }),
          React.createElement('span', { style: { fontSize: 11, color: '#fff', fontWeight: 700 } }, 'REC 00:08')
        ),
        React.createElement(window.lucide.Camera, { size: 40, color: 'rgba(255,255,255,0.3)' }),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 8 } }, 'Camera preview'),
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 12,
            display: 'flex',
            gap: 10,
          }
        },
          React.createElement('div', {
            onClick: () => setRecording(r => !r),
            style: {
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: recording ? t.danger : t.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: `0 0 ${recording ? '16px' : '8px'} ${recording ? t.danger : t.primary}88`,
              transition: 'all 0.2s',
            }
          },
            React.createElement(recording ? window.lucide.Square : window.lucide.Video, { size: 22, color: '#fff' })
          ),
          React.createElement('div', {
            style: {
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.4)',
            }
          },
            React.createElement(window.lucide.Camera, { size: 22, color: '#fff' })
          )
        )
      ),
      React.createElement('div', {
        onClick: () => setVoiceActive(v => !v),
        style: {
          background: voiceActive ? `${t.primary}22` : t.card,
          border: `1px solid ${voiceActive ? t.primary : t.cardBorder}`,
          borderRadius: 14,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }
      },
        React.createElement('div', {
          style: {
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: voiceActive ? t.primary : t.inputBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: voiceActive ? `0 0 12px ${t.primary}66` : 'none',
          }
        },
          React.createElement(window.lucide.Mic, { size: 18, color: voiceActive ? '#fff' : t.textSecondary })
        ),
        React.createElement('div', {},
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, voiceActive ? 'Recording voice note...' : 'Add voice note'),
          React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, voiceActive ? 'Tap to stop' : 'Describe what happened')
        ),
        voiceActive && React.createElement('div', {
          style: {
            marginLeft: 'auto',
            display: 'flex',
            gap: 2,
            alignItems: 'flex-end',
          }
        },
          [3, 6, 4, 8, 5, 7, 3].map((h, i) => React.createElement('div', {
            key: i,
            style: {
              width: 3,
              height: h * (pulseAnim ? 1 : 0.6),
              background: t.primary,
              borderRadius: 2,
              transition: 'height 0.3s',
            }
          }))
        )
      ),
      captured.length > 0 && React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text } }, `Captured (${captured.length})`),
          React.createElement('span', { style: { fontSize: 12, color: t.primary, fontWeight: 600 } }, 'Add from gallery')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 10 } },
          captured.map((item, i) => React.createElement('div', {
            key: i,
            style: {
              width: 80,
              height: 80,
              borderRadius: 12,
              background: t.inputBg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${t.cardBorder}`,
              position: 'relative',
            }
          },
            React.createElement(item.type === 'video' ? window.lucide.Video : window.lucide.Image, { size: 22, color: t.primary }),
            item.duration && React.createElement('span', {
              style: {
                position: 'absolute',
                bottom: 6,
                right: 6,
                fontSize: 9,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                padding: '1px 4px',
                borderRadius: 4,
                fontWeight: 600,
              }
            }, item.duration)
          )),
          React.createElement('div', {
            onClick: () => setCaptured(c => [...c, { type: 'photo', time: '9:42 AM' }]),
            style: {
              width: 80,
              height: 80,
              borderRadius: 12,
              background: t.inputBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1.5px dashed ${t.cardBorder}`,
              cursor: 'pointer',
            }
          },
            React.createElement(window.lucide.Plus, { size: 22, color: t.textMuted })
          )
        )
      ),
      React.createElement('div', { style: { background: t.card, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${t.cardBorder}` } },
        React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 } }, 'Auto-detected Context'),
        [
          { icon: window.lucide.MapPin, label: 'GPS', value: '142 Maple St, Apt 3B' },
          { icon: window.lucide.Cloud, label: 'Weather', value: 'Clear, 58°F' },
          { icon: window.lucide.Clock, label: 'Time', value: 'Mar 23, 2026 · 9:41 AM' },
        ].map((row, i) => React.createElement('div', {
          key: i,
          style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 2 ? 10 : 0 }
        },
          React.createElement('div', {
            style: { width: 32, height: 32, borderRadius: 8, background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement(row.icon, { size: 14, color: t.primary })
          ),
          React.createElement('div', {},
            React.createElement('p', { style: { fontSize: 10, color: t.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' } }, row.label),
            React.createElement('p', { style: { fontSize: 12, color: t.text, fontWeight: 600 } }, row.value)
          )
        ))
      ),
      React.createElement('div', {
        style: {
          background: `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})`,
          borderRadius: 14,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          boxShadow: `0 4px 16px ${t.primary}44`,
        }
      },
        React.createElement(window.lucide.CheckCircle2, { size: 18, color: '#fff' }),
        React.createElement('span', { style: { fontSize: 14, fontWeight: 700, color: '#fff' } }, 'Save Incident')
      )
    )
  );
}

function TimelineScreen({ t, incident }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const inc = incident || incidents[0];

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg } },
    React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.gradient1}, ${t.gradient2})`, padding: '0 20px 20px' } },
      React.createElement(StatusBar, { t: { ...t, text: '#fff' } }),
      React.createElement('div', { style: { height: 44 } }),
      React.createElement('h1', { style: { fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 2 } }, inc.title),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement(window.lucide.MapPin, { size: 11, color: 'rgba(255,255,255,0.7)' }),
        React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, inc.location),
        React.createElement('span', { style: { color: 'rgba(255,255,255,0.4)', margin: '0 4px' } }, '·'),
        React.createElement('span', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)' } }, inc.weather)
      )
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '20px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
        React.createElement('h2', { style: { fontSize: 15, fontWeight: 700, color: t.text } }, 'Incident Timeline'),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: t.primaryLight,
            padding: '4px 10px',
            borderRadius: 99,
          }
        },
          React.createElement(window.lucide.Sparkles, { size: 12, color: t.primary }),
          React.createElement('span', { style: { fontSize: 11, color: t.primary, fontWeight: 700 } }, 'AI-sorted')
        )
      ),
      timelineItems.map((item, i) => React.createElement('div', {
        key: item.id,
        onClick: () => setSelectedItem(selectedItem === item.id ? null : item.id),
        style: {
          display: 'flex',
          gap: 12,
          marginBottom: 12,
          cursor: 'pointer',
        }
      },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 } },
          React.createElement('div', {
            style: {
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: item.type === 'voice' ? `${t.warning}22` : item.type === 'video' ? `${t.primary}22` : `${t.accent}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${item.type === 'voice' ? t.warning : item.type === 'video' ? t.primary : t.accent}`,
            }
          },
            React.createElement(
              item.type === 'voice' ? window.lucide.Mic : item.type === 'video' ? window.lucide.Video : window.lucide.Image,
              { size: 14, color: item.type === 'voice' ? t.warning : item.type === 'video' ? t.primary : t.accent }
            )
          ),
          i < timelineItems.length - 1 && React.createElement('div', {
            style: { width: 2, flex: 1, background: t.divider, marginTop: 4, marginBottom: 4 }
          })
        ),
        React.createElement('div', {
          style: {
            flex: 1,
            background: t.card,
            borderRadius: 14,
            padding: '12px 14px',
            border: `1px solid ${selectedItem === item.id ? t.primary : t.cardBorder}`,
            transition: 'border-color 0.2s',
            marginBottom: i < timelineItems.length - 1 ? 0 : 0,
          }
        },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } },
            React.createElement('span', { style: { fontSize: 11, color: t.textMuted, fontWeight: 600 } }, item.time),
            item.duration && React.createElement('span', {
              style: {
                fontSize: 10,
                background: t.inputBg,
                color: t.textSecondary,
                padding: '1px 6px',
                borderRadius: 4,
                fontWeight: 600,
              }
            }, item.duration)
          ),
          item.thumb && React.createElement('div', {
            style: {
              height: selectedItem === item.id ? 90 : 54,
              background: item.thumb,
              borderRadius: 8,
              marginBottom: 8,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'height 0.25s ease',
            }
          },
            React.createElement(item.type === 'video' ? window.lucide.Play : window.lucide.Image, { size: 20, color: 'rgba(255,255,255,0.4)' })
          ),
          item.note ? React.createElement('p', { style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.4, marginBottom: item.tags.length ? 8 : 0 } }, item.note) : null,
          item.tags.length > 0 && React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
            item.tags.map((tag, ti) => React.createElement('span', {
              key: ti,
              style: {
                fontSize: 10,
                background: t.tagBg,
                color: t.tagText,
                padding: '2px 7px',
                borderRadius: 99,
                fontWeight: 600,
              }
            }, tag))
          )
        )
      ))
    )
  );
}

function ReportsScreen({ t }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [privacyBlur, setPrivacyBlur] = useState(true);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2200);
  };

  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg } },
    React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.gradient1}, ${t.gradient2})`, padding: '0 20px 20px' } },
      React.createElement(StatusBar, { t: { ...t, text: '#fff' } }),
      React.createElement('div', { style: { height: 44 } }),
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px', marginBottom: 2 } }, 'Reports'),
      React.createElement('p', { style: { fontSize: 13, color: 'rgba(255,255,255,0.75)' } }, 'Share-ready incident summaries')
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '20px' } },
      React.createElement('div', { style: { background: t.card, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${t.cardBorder}` } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 } },
          React.createElement('div', {},
            React.createElement('h3', { style: { fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 2 } }, 'Apartment Water Damage'),
            React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, 'Mar 22, 2026 · 4 clips · 7 photos')
          ),
          React.createElement('div', {
            style: {
              background: t.primaryLight,
              padding: '3px 8px',
              borderRadius: 99,
            }
          },
            React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700 } }, 'PROPERTY')
          )
        ),
        !generated ? React.createElement('div', {
          onClick: handleGenerate,
          style: {
            background: `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})`,
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            opacity: generating ? 0.7 : 1,
          }
        },
          generating ? React.createElement(window.lucide.Loader2, { size: 16, color: '#fff', className: 'spin' }) : React.createElement(window.lucide.Sparkles, { size: 16, color: '#fff' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 700, color: '#fff' } }, generating ? 'Generating Summary...' : 'Generate AI Summary')
        ) : React.createElement('div', {},
          React.createElement('div', {
            style: {
              background: t.surfaceAlt,
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
              border: `1px solid ${t.divider}`,
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 } },
              React.createElement(window.lucide.FileText, { size: 13, color: t.primary }),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Incident Summary')
            ),
            React.createElement('p', {
              style: { fontSize: 12, color: t.textSecondary, lineHeight: 1.6 }
            }, 'On March 22, 2026 at 9:11 AM, water damage was observed in the bedroom and hallway ceiling of 142 Maple St, Apt 3B. Footage documents active dripping from a discolored ceiling stain, wet carpet beneath, and a second affected area in the hallway. Weather conditions were clear (58°F). Evidence includes 4 video clips and 7 photographs with GPS metadata.')
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
            React.createElement('p', { style: { fontSize: 12, fontWeight: 700, color: t.text } }, 'Privacy Controls'),
            React.createElement('div', {
              onClick: () => setPrivacyBlur(p => !p),
              style: {
                width: 40,
                height: 22,
                borderRadius: 11,
                background: privacyBlur ? t.primary : t.inputBg,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.25s',
                border: `1px solid ${t.cardBorder}`,
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute',
                  top: 2,
                  left: privacyBlur ? 20 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.25s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }
              })
            )
          ),
          privacyBlur && React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 12 } },
            ['Faces blurred', 'Plates hidden'].map((label, i) => React.createElement('div', {
              key: i,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: `${t.success}22`,
                padding: '3px 8px',
                borderRadius: 99,
                border: `1px solid ${t.success}44`,
              }
            },
              React.createElement(window.lucide.ShieldCheck, { size: 11, color: t.success }),
              React.createElement('span', { style: { fontSize: 10, color: t.success, fontWeight: 700 } }, label)
            ))
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
            [
              { icon: window.lucide.Share2, label: 'Share Link', primary: true },
              { icon: window.lucide.Download, label: 'Export PDF', primary: false },
              { icon: window.lucide.Mail, label: 'Email', primary: false },
              { icon: window.lucide.Copy, label: 'Copy Text', primary: false },
            ].map((btn, i) => React.createElement('div', {
              key: i,
              style: {
                background: btn.primary ? `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})` : t.inputBg,
                borderRadius: 10,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                cursor: 'pointer',
                border: btn.primary ? 'none' : `1px solid ${t.cardBorder}`,
              }
            },
              React.createElement(btn.icon, { size: 14, color: btn.primary ? '#fff' : t.textSecondary }),
              React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: btn.primary ? '#fff' : t.textSecondary } }, btn.label)
            ))
          )
        )
      ),
      incidents.slice(1).map((inc, i) => React.createElement('div', {
        key: i,
        style: {
          background: t.card,
          borderRadius: 14,
          padding: '14px 16px',
          marginBottom: 10,
          border: `1px solid ${t.cardBorder}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
      },
        React.createElement('div', {},
          React.createElement('p', { style: { fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 } }, inc.title),
          React.createElement('p', { style: { fontSize: 11, color: t.textMuted } }, inc.date)
        ),
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: t.inputBg,
            padding: '6px 10px',
            borderRadius: 99,
            cursor: 'pointer',
          }
        },
          React.createElement(window.lucide.Sparkles, { size: 12, color: t.textSecondary }),
          React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: t.textSecondary } }, 'Generate')
        )
      ))
    )
  );
}

function SettingsScreen({ t, theme, setTheme }) {
  return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', background: t.bg } },
    React.createElement('div', { style: { background: `linear-gradient(160deg, ${t.gradient1}, ${t.gradient2})`, padding: '0 20px 20px' } },
      React.createElement(StatusBar, { t: { ...t, text: '#fff' } }),
      React.createElement('div', { style: { height: 44 } }),
      React.createElement('h1', { style: { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' } }, 'Settings')
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '20px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 } },
        React.createElement('div', {
          style: {
            width: 60,
            height: 60,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 16px ${t.primary}44`,
          }
        },
          React.createElement('span', { style: { fontSize: 22, fontWeight: 800, color: '#fff' } }, 'A')
        ),
        React.createElement('div', {},
          React.createElement('p', { style: { fontSize: 16, fontWeight: 700, color: t.text } }, 'Alex Rivera'),
          React.createElement('p', { style: { fontSize: 12, color: t.textMuted } }, 'alex.rivera@email.com'),
          React.createElement('div', {
            style: {
              background: t.primaryLight,
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: 99,
              marginTop: 4,
            }
          },
            React.createElement('span', { style: { fontSize: 10, color: t.primary, fontWeight: 700 } }, 'PRO PLAN')
          )
        )
      ),
      [
        {
          section: 'Appearance',
          items: [
            {
              icon: window.lucide.Sun,
              label: 'Theme',
              value: theme === 'light' ? 'Light' : 'Dark',
              toggle: true,
              onToggle: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
              active: theme === 'dark',
            },
          ]
        },
        {
          section: 'Privacy & Security',
          items: [
            { icon: window.lucide.EyeOff, label: 'Auto-blur faces', value: null, toggle: true, active: true },
            { icon: window.lucide.Shield, label: 'Blur license plates', value: null, toggle: true, active: true },
            { icon: window.lucide.Lock, label: 'Local encryption', value: 'On', toggle: false },
          ]
        },
        {
          section: 'Storage',
          items: [
            { icon: window.lucide.HardDrive, label: 'Local storage used', value: '1.2 GB', toggle: false },
            { icon: window.lucide.Cloud, label: 'iCloud backup', value: 'Off', toggle: false },
          ]
        },
        {
          section: 'About',
          items: [
            { icon: window.lucide.Info, label: 'Version', value: '1.0.0', toggle: false },
            { icon: window.lucide.HelpCircle, label: 'Help & Support', value: null, toggle: false, arrow: true },
          ]
        }
      ].map((group, gi) => React.createElement('div', { key: gi, style: { marginBottom: 20 } },
        React.createElement('p', {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: t.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: 8,
            paddingLeft: 4,
          }
        }, group.section),
        React.createElement('div', {
          style: {
            background: t.card,
            borderRadius: 14,
            overflow: 'hidden',
            border: `1px solid ${t.cardBorder}`,
          }
        },
          group.items.map((item, ii) => React.createElement('div', {
            key: ii,
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 16px',
              borderBottom: ii < group.items.length - 1 ? `1px solid ${t.divider}` : 'none',
            }
          },
            React.createElement('div', {
              style: {
                width: 32,
                height: 32,
                borderRadius: 9,
                background: t.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            },
              React.createElement(item.icon, { size: 14, color: t.primary })
            ),
            React.createElement('span', { style: { flex: 1, fontSize: 13, fontWeight: 600, color: t.text } }, item.label),
            item.toggle ? React.createElement('div', {
              onClick: item.onToggle,
              style: {
                width: 42,
                height: 24,
                borderRadius: 12,
                background: item.active ? t.primary : t.inputBg,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.25s',
                border: `1px solid ${item.active ? t.primary : t.cardBorder}`,
              }
            },
              React.createElement('div', {
                style: {
                  position: 'absolute',
                  top: 3,
                  left: item.active ? 21 : 3,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.25s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }
              })
            ) : item.value ? React.createElement('span', { style: { fontSize: 12, color: t.textMuted, fontWeight: 500 } }, item.value) : null,
            item.arrow && React.createElement(window.lucide.ChevronRight, { size: 14, color: t.textMuted })
          ))
        )
      ))
    )
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const t = themes[theme];

  const tabs = [
    { id: 'home', label: 'Home', icon: window.lucide.Home },
    { id: 'capture', label: 'Capture', icon: window.lucide.Plus },
    { id: 'timeline', label: 'Timeline', icon: window.lucide.ListOrdered },
    { id: 'reports', label: 'Reports', icon: window.lucide.FileText },
    { id: 'settings', label: 'Settings', icon: window.lucide.Settings },
  ];

  const screens = {
    home: () => React.createElement(HomeScreen, {
      t,
      onOpenIncident: (inc) => { setSelectedIncident(inc); setActiveTab('timeline'); }
    }),
    capture: () => React.createElement(CaptureScreen, { t }),
    timeline: () => React.createElement(TimelineScreen, { t, incident: selectedIncident }),
    reports: () => React.createElement(ReportsScreen, { t }),
    settings: () => React.createElement(SettingsScreen, { t, theme, setTheme }),
  };

  return React.createElement('div', null,
    React.createElement('style', null, fontLink),
    React.createElement('div', {
      style: {
        width: '100vw',
        minHeight: '100vh',
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }
    },
      React.createElement('div', {
        style: {
          width: 375,
          height: 812,
          borderRadius: 50,
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: t.bg,
          border: '8px solid #111',
        }
      },
        React.createElement(DynamicIsland),
        React.createElement('div', {
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }
        },
          React.createElement(screens[activeTab])
        ),
        React.createElement('div', {
          style: {
            background: t.navBg,
            borderTop: `1px solid ${t.navBorder}`,
            display: 'flex',
            paddingBottom: 8,
            paddingTop: 8,
          }
        },
          tabs.map(tab => React.createElement('div', {
            key: tab.id,
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: '4px 0',
              position: 'relative',
            }
          },
            tab.id === 'capture' ? React.createElement('div', {
              style: {
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${t.primary}55`,
                marginTop: -14,
                border: `3px solid ${t.navBg}`,
              }
            },
              React.createElement(tab.icon, { size: 20, color: '#fff' })
            ) : React.createElement(tab.icon, {
              size: 22,
              color: activeTab === tab.id ? t.primary : t.textMuted,
              strokeWidth: activeTab === tab.id ? 2.5 : 1.8,
            }),
            React.createElement('span', {
              style: {
                fontSize: 10,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? t.primary : t.textMuted,
                letterSpacing: '0.1px',
              }
            }, tab.label)
          ))
        )
      )
    )
  );
}
