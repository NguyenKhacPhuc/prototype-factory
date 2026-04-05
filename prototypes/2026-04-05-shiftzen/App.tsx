const { useState } = React;
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const t = { bg: '#FAFAFA', text: '#111', primary: '#2979FF', surface: '#FFF', muted: '#888' };
  const HomeScreen = () => React.createElement('div', { style: { padding: 20 } },
    React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text } }, 'Home'),
    React.createElement('p', { style: { color: t.muted } }, 'Mock prototype generated in test mode.')
  );
  const screens = { home: HomeScreen };
  return React.createElement('div', { style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', margin: '20px auto', fontFamily: '-apple-system, sans-serif' } },
    React.createElement(screens[activeScreen])
  );
}