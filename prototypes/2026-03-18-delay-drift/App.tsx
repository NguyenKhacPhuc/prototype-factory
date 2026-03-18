function App() {
  const { useState, useEffect, useRef } = React;

  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('all');
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [budget, setBudget] = useState('moderate');
  const [savedItems, setSavedItems] = useState([1, 3]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [time, setTime] = useState('10:42');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::-webkit-scrollbar { width: 0px; }
      body { background: #1a1a1a; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'DM Sans', sans-serif; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const colors = {
    bg: '#FFFDF5',
    terracotta: '#C67B5C',
    terracottaLight: '#E8967A',
    sand: '#E8D5B7',
    sandLight: '#F4EAD8',
    forest: '#4A7C59',
    forestLight: '#6BA07A',
    text: '#2D2218',
    textMid: '#6B5748',
    textLight: '#9C8577',
    white: '#FFFFFF',
    accent: '#D4956B',
    red: '#E05C5C',
    yellow: '#F2B347',
  };

  const handlePress = (id) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 200);
  };

  const toggleSave = (id) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanGenerated(true);
      setActiveTab('plan');
    }, 2000);
  };

  const experiences = [
    { id: 1, title: 'Tsukiji Outer Market Loop', type: 'Food Trail', duration: 45, dist: '0.4 km', cost: '¥800', rating: 4.8, tags: ['Snacks', 'Culture'], color: '#E8967A', icon: '🍜', weather: '☀️', desc: 'Weave through stalls of tamagoyaki, fresh tuna sashimi, and street-grilled shellfish.' },
    { id: 2, title: 'Hamarikyu Garden Sprint', type: 'Nature Walk', duration: 60, dist: '1.2 km', cost: 'Free', rating: 4.6, tags: ['Nature', 'Walk'], color: '#6BA07A', icon: '🌿', weather: '☁️', desc: 'A hidden feudal garden flanked by skyscrapers — matcha tea house included.' },
    { id: 3, title: 'teamLab Express Visit', type: 'Museum', duration: 90, dist: '2.1 km', cost: '¥1,200', rating: 4.9, tags: ['Art', 'Indoor'], color: '#7B9EC7', icon: '✨', weather: '🌧️', desc: 'Immersive digital art rooms — book the 10am slot for shortest queues.' },
    { id: 4, title: 'Sumida Skyline Walk', type: 'Scenic Route', duration: 35, dist: '0.9 km', cost: 'Free', rating: 4.5, tags: ['Walk', 'Views'], color: '#C67B5C', icon: '🌆', weather: '☀️', desc: 'Riverside promenade with framed views of Tokyo Skytree and cherry blossoms.' },
    { id: 5, title: 'Yanaka Craft Alley', type: 'Neighborhood', duration: 75, dist: '3.4 km', cost: '¥500', rating: 4.7, tags: ['Culture', 'Shops'], color: '#C4A55A', icon: '🏮', weather: '☀️', desc: 'Old Tokyo vibes in narrow lanes filled with ceramics, vintage finds, and cat cafes.' },
    { id: 6, title: 'Ramen Discovery Route', type: 'Food Trail', duration: 50, dist: '1.0 km', cost: '¥900', rating: 4.8, tags: ['Food', 'Indoor'], color: '#E08060', icon: '🍥', weather: '🌧️', desc: 'Hit three legendary ramen spots in one stretch — tonkotsu, miso, and tsukemen.' },
  ];

  const filteredExp = activeFilter === 'all' ? experiences : experiences.filter(e => e.tags.some(t => t.toLowerCase() === activeFilter));

  const planItems = [
    { time: '11:00', duration: 35, title: 'Sumida Skyline Walk', icon: '🌆', type: 'Walk', note: 'Start at Azuma Bridge' },
    { time: '11:40', duration: 15, title: 'Coffee at Starbucks Reserve', icon: '☕', type: 'Break', note: 'Nakameguro branch — roastery views' },
    { time: '11:55', duration: 45, title: 'Tsukiji Outer Market Loop', icon: '🍜', type: 'Food', note: 'Don\'t miss stall #47 tamagoyaki' },
    { time: '12:45', duration: 20, title: 'Head back to Haneda', icon: '✈️', type: 'Transit', note: 'Keikyu Line — 22 min ride' },
    { time: '13:05', duration: 0, title: 'At gate T2-23 ✓', icon: '🛂', type: 'Arrival', note: 'Buffer: 55 min before boarding' },
  ];

  // ---- SCREENS ----

  const HomeScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: colors.terracotta, padding: '20px 20px 28px', borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: 1 }}>CURRENT FLIGHT</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.white, marginTop: 2 }}>NH 847 · Tokyo HND</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '6px 12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>DELAY</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.white }}>2h 10m</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ label: 'Original', val: '10:30' }, { label: 'Updated', val: '12:40' }, { label: 'Gate', val: 'T2-23' }].map((item) => (
            <div key={item.label} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 10px', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.white }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{ margin: '16px 16px 0', background: '#FEF3C7', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #F9D77E' }}>
        <span style={{ fontSize: 18 }}>⚡</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>Delay confirmed by ANA</div>
          <div style={{ fontSize: 11, color: '#B45309' }}>You have 1h 55m of usable time near Haneda</div>
        </div>
      </div>

      {/* Context Row */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 10 }}>Your Context</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Weather */}
          <div style={{ flex: 1, background: colors.sandLight, borderRadius: 14, padding: '12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>⛅</span>
            <div>
              <div style={{ fontSize: 10, color: colors.textLight }}>Weather</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>19°C Cloudy</div>
            </div>
          </div>
          {/* Radius */}
          <div style={{ flex: 1, background: colors.sandLight, borderRadius: 14, padding: '12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>📍</span>
            <div>
              <div style={{ fontSize: 10, color: colors.textLight }}>Radius</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Within 4km</div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Level */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 10 }}>Energy Level</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ val: 'low', label: '😴 Low', desc: 'Chill only' }, { val: 'medium', label: '😊 Medium', desc: 'Light walk' }, { val: 'high', label: '🚀 High', desc: 'Full pace' }].map((e) => (
            <div key={e.val} onClick={() => setEnergyLevel(e.val)} style={{ flex: 1, borderRadius: 12, padding: '10px 6px', textAlign: 'center', cursor: 'pointer', background: energyLevel === e.val ? colors.terracotta : colors.sandLight, transition: 'all 0.2s', border: `2px solid ${energyLevel === e.val ? colors.terracotta : 'transparent'}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: energyLevel === e.val ? colors.white : colors.text }}>{e.label}</div>
              <div style={{ fontSize: 10, color: energyLevel === e.val ? 'rgba(255,255,255,0.8)' : colors.textLight }}>{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 10 }}>Budget</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ val: 'free', label: '¥0 Free' }, { val: 'moderate', label: '¥500–1k' }, { val: 'splurge', label: '¥1k+' }].map((b) => (
            <div key={b.val} onClick={() => setBudget(b.val)} style={{ flex: 1, borderRadius: 10, padding: '9px 4px', textAlign: 'center', cursor: 'pointer', background: budget === b.val ? colors.forest : colors.sandLight, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: budget === b.val ? colors.white : colors.text }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 16px 0' }}>
        <div
          onClick={() => { handlePress('gen'); generatePlan(); }}
          style={{
            background: generating ? colors.textMid : `linear-gradient(135deg, ${colors.terracotta}, ${colors.accent})`,
            borderRadius: 16, padding: '16px', textAlign: 'center', cursor: 'pointer',
            transform: pressedBtn === 'gen' ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.2s',
            boxShadow: `0 8px 24px rgba(198,123,92,0.35)`
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.white }}>
            {generating ? '✦ Generating your drift...' : '✦ Build My Delay Plan'}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            {generating ? 'Scanning 12 nearby options' : 'Matched to your 1h 55m window'}
          </div>
        </div>
      </div>

      {/* Recent */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 12 }}>Previously Saved</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ icon: '🗼', title: 'Zojo-ji Temple', time: '40 min' }, { icon: '🐟', title: 'Fish Market Stroll', time: '50 min' }].map((item) => (
            <div key={item.title} style={{ flex: 1, background: colors.sandLight, borderRadius: 14, padding: '12px' }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: colors.text, marginTop: 6 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: colors.textLight }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ExploreScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Nearby Experiences</div>
        <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>Within 4km · Fits in 1h 55m</div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ background: colors.sandLight, borderRadius: 14, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <span style={{ fontSize: 13, color: colors.textLight }}>Search experiences...</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {['all', 'food', 'walk', 'culture', 'nature', 'art'].map((f) => (
          <div key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, background: activeFilter === f ? colors.terracotta : colors.sandLight, borderRadius: 20, padding: '7px 14px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: activeFilter === f ? colors.white : colors.textMid, textTransform: 'capitalize' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredExp.map((exp) => (
          <div key={exp.id} style={{ background: colors.white, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(44,34,24,0.08)' }}>
            {/* Card Header */}
            <div style={{ background: exp.color, padding: '16px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              <div>
                <div style={{ fontSize: 28 }}>{exp.icon}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: 500 }}>{exp.type}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: colors.white, marginTop: 1 }}>{exp.title}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div onClick={() => toggleSave(exp.id)} style={{ cursor: 'pointer', fontSize: 18 }}>
                  {savedItems.includes(exp.id) ? '❤️' : '🤍'}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '3px 8px' }}>
                  <span style={{ fontSize: 11, color: colors.white, fontWeight: 600 }}>⭐ {exp.rating}</span>
                </div>
              </div>
            </div>
            {/* Card Body */}
            <div style={{ padding: '12px 16px 14px' }}>
              <div style={{ fontSize: 12, color: colors.textMid, lineHeight: 1.5, marginBottom: 10 }}>{exp.desc}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {exp.tags.map(t => (
                  <span key={t} style={{ background: colors.sandLight, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 600, color: colors.textMid }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 11, color: colors.textLight }}>⏱ {exp.duration} min</span>
                  <span style={{ fontSize: 11, color: colors.textLight }}>📍 {exp.dist}</span>
                  <span style={{ fontSize: 11, color: colors.forest, fontWeight: 600 }}>{exp.cost}</span>
                </div>
                <span style={{ fontSize: 12 }}>{exp.weather}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PlanScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Your Drift Plan</div>
        <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>1h 55m · Haneda area · ¥800 est.</div>
      </div>

      {!planGenerated ? (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 }}>No plan yet</div>
          <div style={{ fontSize: 12, color: colors.textLight, marginBottom: 24 }}>Set your preferences on Home and generate a plan</div>
          <div onClick={() => setActiveTab('home')} style={{ background: colors.terracotta, borderRadius: 14, padding: '12px 24px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.white }}>Go to Home →</span>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Card */}
          <div style={{ margin: '14px 16px 0', background: `linear-gradient(135deg, ${colors.forest}, ${colors.forestLight})`, borderRadius: 18, padding: '16px' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>✦ Drift Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: colors.white }}>94</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>/ 100 · Great use of time</div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              {[{ label: 'Stops', val: '3' }, { label: 'Walking', val: '1.3km' }, { label: 'Budget', val: '¥800' }, { label: 'Buffer', val: '55min' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: colors.white }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 14 }}>Timeline</div>
            <div style={{ position: 'relative' }}>
              {/* Vertical Line */}
              <div style={{ position: 'absolute', left: 29, top: 16, bottom: 16, width: 2, background: colors.sand }} />

              {planItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }}>
                  <div style={{ flexShrink: 0, width: 42, textAlign: 'center' }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: colors.textLight, marginBottom: 3 }}>{item.time}</div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.type === 'Transit' ? colors.terracotta : item.type === 'Arrival' ? colors.forest : colors.sand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, margin: '0 auto', border: `2px solid ${colors.bg}`, boxShadow: '0 0 0 2px ' + (item.type === 'Transit' ? colors.terracotta : item.type === 'Arrival' ? colors.forest : colors.textLight) }}>
                      {item.icon}
                    </div>
                  </div>
                  <div style={{ flex: 1, background: colors.white, borderRadius: 14, padding: '10px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginTop: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.title}</div>
                      {item.duration > 0 && <div style={{ fontSize: 10, background: colors.sandLight, borderRadius: 8, padding: '2px 7px', color: colors.textMid, fontWeight: 500 }}>{item.duration}m</div>}
                    </div>
                    <div style={{ fontSize: 11, color: colors.textLight, marginTop: 3 }}>{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ padding: '4px 16px 0', display: 'flex', gap: 10 }}>
            <div onClick={() => { handlePress('share'); setShareModal(true); }} style={{ flex: 1, background: colors.terracotta, borderRadius: 14, padding: '13px', textAlign: 'center', cursor: 'pointer', transform: pressedBtn === 'share' ? 'scale(0.97)' : 'scale(1)', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.white }}>📤 Share Plan</div>
            </div>
            <div onClick={() => { handlePress('regen'); setPlanGenerated(false); setActiveTab('home'); }} style={{ flex: 0.5, background: colors.sandLight, borderRadius: 14, padding: '13px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid }}>↺ Redo</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const SavedScreen = () => (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Saved Drifts</div>
        <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>{savedItems.length} experiences saved</div>
      </div>

      {/* Past Trips */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 12 }}>Recent Trips</div>
        {[
          { city: 'Amsterdam · AMS', delay: '3h delay', date: 'Mar 10', color: '#6B9EC7', icon: '🚲', plan: 'Canal loop + stroopwafel tour + Rijksmuseum dash' },
          { city: 'Bangkok · BKK', delay: '1h 30m delay', date: 'Feb 22', color: '#C4A55A', icon: '🛺', plan: 'Temple walk + mango sticky rice + night market' },
          { city: 'London · LHR', delay: '2h delay', date: 'Jan 15', color: '#8A6BAD', icon: '🎡', plan: 'South Bank walk + Borough Market + Tate Modern' },
        ].map((trip) => (
          <div key={trip.city} style={{ background: colors.white, borderRadius: 16, padding: '14px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: trip.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{trip.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{trip.city}</div>
                  <div style={{ fontSize: 11, color: colors.textLight }}>{trip.date}</div>
                </div>
                <div style={{ fontSize: 11, color: colors.terracotta, fontWeight: 600, marginTop: 1 }}>⏱ {trip.delay}</div>
                <div style={{ fontSize: 11, color: colors.textMid, marginTop: 4, lineHeight: 1.4 }}>{trip.plan}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saved Experiences */}
      <div style={{ padding: '4px 16px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMid, marginBottom: 12 }}>Saved Experiences</div>
        {experiences.filter(e => savedItems.includes(e.id)).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: colors.textLight, fontSize: 12 }}>No saved experiences yet. Heart items in Explore!</div>
        ) : (
          experiences.filter(e => savedItems.includes(e.id)).map((exp) => (
            <div key={exp.id} style={{ background: colors.white, borderRadius: 14, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: exp.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{exp.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{exp.title}</div>
                <div style={{ fontSize: 11, color: colors.textLight }}>⏱ {exp.duration}min · {exp.cost}</div>
              </div>
              <div onClick={() => toggleSave(exp.id)} style={{ cursor: 'pointer', fontSize: 16 }}>❤️</div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div style={{ margin: '16px 16px 0', background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.accent})`, borderRadius: 18, padding: '16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: colors.white, marginBottom: 12 }}>Your Drift Stats</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[{ val: '7', label: 'Drifts' }, { val: '14h', label: 'Saved' }, { val: '3', label: 'Countries' }, { val: '24', label: 'Stops' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.white }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Share Modal
  const ShareModal = () => shareModal && (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100, borderRadius: 44 }}>
      <div style={{ background: colors.bg, borderRadius: '24px 24px 44px 44px', width: '100%', padding: '20px 20px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>Share Your Drift</div>
          <div onClick={() => setShareModal(false)} style={{ cursor: 'pointer', fontSize: 18 }}>✕</div>
        </div>
        {[
          { icon: '💬', label: 'Send via iMessage', sub: 'Share with travel companions' },
          { icon: '📋', label: 'Copy link', sub: 'anyone with link can view' },
          { icon: '📸', label: 'Save as image', sub: 'Instagram-ready card' },
          { icon: '✉️', label: 'Email to myself', sub: 'steve@email.com' },
        ].map((item) => (
          <div key={item.label} onClick={() => setShareModal(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: `1px solid ${colors.sandLight}`, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, background: colors.sandLight, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: colors.textLight }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'explore', icon: '🗺️', label: 'Explore' },
    { id: 'plan', icon: '📋', label: 'Plan' },
    { id: 'saved', icon: '❤️', label: 'Saved' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#181512', fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
      {/* Phone Frame */}
      <div style={{ width: 375, height: 812, background: colors.bg, borderRadius: 44, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)' }}>

        {/* Status Bar */}
        <div style={{ background: colors.bg, padding: '14px 24px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{time}</div>
          {/* Dynamic Island */}
          <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              {[3,5,7,9].map((h,i) => <div key={i} style={{ width: 3, height: h, background: colors.text, borderRadius: 1 }} />)}
            </div>
            <span style={{ fontSize: 11, color: colors.text }}>WiFi</span>
            <div style={{ width: 22, height: 11, border: `1.5px solid ${colors.text}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '1px 2px' }}>
              <div style={{ width: '75%', height: '100%', background: colors.forest, borderRadius: 1 }} />
              <div style={{ position: 'absolute', right: -4, top: '25%', width: 3, height: '50%', background: colors.text, borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'explore' && <ExploreScreen />}
          {activeTab === 'plan' && <PlanScreen />}
          {activeTab === 'saved' && <SavedScreen />}
          <ShareModal />
        </div>

        {/* Bottom Nav */}
        <div style={{ background: colors.white, borderTop: `1px solid ${colors.sand}`, padding: '10px 8px 24px', display: 'flex', justifyContent: 'space-around', flexShrink: 0 }}>
          {navItems.map((item) => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 0' }}>
              <div style={{ fontSize: 20, transform: activeTab === item.id ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.2s' }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: activeTab === item.id ? 700 : 400, color: activeTab === item.id ? colors.terracotta : colors.textLight, transition: 'all 0.2s' }}>{item.label}</div>
              {activeTab === item.id && <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.terracotta }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
