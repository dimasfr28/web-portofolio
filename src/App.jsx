import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Project from './components/Project';
import Achievement from './components/Achievement';
import AskMe from './components/AskMe';
import CTABox from './components/CTABox';
import Contact from './components/Contact';
import './App.css';

function App() {
  useEffect(() => {
    // Prevent any auto-scroll behavior
    const preventScroll = () => {
      window.scrollTo(0, 0);
    };

    // Clear hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Prevent scroll for a short time after mount
    window.addEventListener('scroll', preventScroll);

    const timeout = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Project />
        <Achievement />
        <AskMe />
        <CTABox />
        <Contact />
      </main>
    </div>
  );
}

export default App;
