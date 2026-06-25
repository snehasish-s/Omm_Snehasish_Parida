import { useEffect, useState } from 'react';
import DeployLoader from './components/DeployLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDeploying, setIsDeploying] = useState(true);

  useEffect(() => {
    if (isDeploying) return;
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animatable elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Re-run observer when new elements may appear (after initial render)
    const reobserve = () => {
      const newElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
      newElements.forEach((el) => observer.observe(el));
    };
    const timer = setTimeout(reobserve, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isDeploying]);

  return (
    <>
      {isDeploying && <DeployLoader onComplete={() => setIsDeploying(false)} />}
      
      {/* Only show the actual content if not deploying, or let it render underneath */}
      <div style={{ opacity: isDeploying ? 0 : 1, transition: 'opacity 0.8s ease-in' }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

