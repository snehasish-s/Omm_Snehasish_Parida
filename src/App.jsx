import { useEffect, useState, useRef, useCallback } from 'react';
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
import LiveMetrics from './components/LiveMetrics';
import InteractiveArchitecture from './components/InteractiveArchitecture';

function useCyberCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const trail = document.createElement('div');
    trail.className = 'cyber-cursor-trail';
    document.body.appendChild(trail);
    trailRef.current = trail;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const onMouseOver = (e) => {
      const t = e.target;
      const isInteractive = t.closest('a, button, .btn, .pipeline-btn, .project-card, .experience-card, .nav-links a, .tech-pill, .skill-chip, input, textarea');
      if (isInteractive) {
        cursor.classList.add('hovering');
        trail.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      const t = e.target;
      const isInteractive = t.closest('a, button, .btn, .pipeline-btn, .project-card, .experience-card, .nav-links a, .tech-pill, .skill-chip, input, textarea');
      if (isInteractive) {
        cursor.classList.remove('hovering');
        trail.classList.remove('hovering');
      }
    };

    // Smooth trail animation loop
    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;
      trail.style.left = trailPos.current.x + 'px';
      trail.style.top = trailPos.current.y + 'px';
      rafRef.current = requestAnimationFrame(animateTrail);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafRef.current = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
      cursor.remove();
      trail.remove();
    };
  }, []);
}

function useParallaxGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      grid.style.transform = `translate(${x}px, ${y}px)`;

      const pctX = (e.clientX / window.innerWidth) * 100;
      const pctY = (e.clientY / window.innerHeight) * 100;
      grid.style.setProperty('--mouse-x', pctX + '%');
      grid.style.setProperty('--mouse-y', pctY + '%');
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return gridRef;
}

function use3DTilt() {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(hover: none)').matches;
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.project-card, .experience-card, .edu-card, .award-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const maxDist = 400;

        if (Math.abs(distX) < maxDist && Math.abs(distY) < maxDist) {
          const rotateX = (distY / maxDist) * -6;
          const rotateY = (distX / maxDist) * 6;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        } else {
          card.style.transform = '';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.project-card, .experience-card, .edu-card, .award-card');
      cards.forEach(card => {
        card.style.transform = '';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
}

export default function App() {
  const [isDeploying, setIsDeploying] = useState(true);
  const gridRef = useParallaxGrid();

  // Initialize interactive effects after deploy loader
  useCyberCursor();
  use3DTilt();

  useEffect(() => {
    if (isDeploying) return;

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

    const elements = document.querySelectorAll('.animate-on-scroll, .brutal-reveal');
    elements.forEach((el) => observer.observe(el));

    const reobserve = () => {
      const newElements = document.querySelectorAll('.animate-on-scroll:not(.visible), .brutal-reveal:not(.visible)');
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

      <div className="parallax-grid" ref={gridRef} />
      <div className="global-scanline" />

      <div style={{ opacity: isDeploying ? 0 : 1, transition: 'opacity 0.8s ease-in', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <InteractiveArchitecture />
        <Skills />
        <Education />
        <Contact />
        <Footer />
        <LiveMetrics />
      </div>
    </>
  );
}