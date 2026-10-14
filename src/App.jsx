import { useState } from 'react';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [contactMode, setContactMode] = useState('chat');
  // Contact links switch the card to the form; the anchor still scrolls to #contact.
  const toForm = () => setContactMode('form');

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#121214', display: 'flex', flexDirection: 'column', overflowX: 'clip' }}>
      <Nav onContact={toForm} />
      <Hero onContact={toForm} />
      <About />
      <Experience />
      <Projects />
      <Achievements contactMode={contactMode} setContactMode={setContactMode} />
      <Footer onContact={toForm} />
    </div>
  );
}

export default App;
