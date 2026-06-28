import { useState, useEffect } from 'react';
import CloudCanvas from './CloudCanvas';

const titles = [
  'Cloud-Focused Backend Engineer',
  'AWS & Azure Solutions Builder',
  'Java Spring Boot Developer',
  'Docker & Microservices Architect',
  'Geospatial Pipeline Engineer',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
      }, 60);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const cloudIcons = [
    { label: 'AWS', cls: 'aws' },
    { label: 'Azure', cls: 'azure' },
    { label: 'Docker', cls: 'docker' },
    { label: 'Spring', cls: 'spring' },
    { label: 'Java', cls: 'java' },
    { label: 'GIS', cls: 'gis' },
  ];

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid" />
      <div className="hero-scanline" />
      <div className="hero-noise" />
      <CloudCanvas />

      <div className="hero-content">
        <div className="hero-badge brutal-reveal">
          <span className="status-dot" />
          Available for Opportunities
        </div>

        <h1 className="hero-name brutal-reveal delay-1">
          <span className="cyber-glitch text-cyan" data-text="Omm Snehasish">Omm Snehasish</span><br />
          <span className="accent cyber-glitch text-magenta" data-text="Parida">Parida</span>
        </h1>

        <div className="hero-title-line brutal-reveal delay-2">
          <span className="hero-title">{displayText}</span>
          <span className="typing-cursor" />
        </div>

        <p className="hero-description brutal-reveal delay-3">
          Building scalable cloud systems with production experience at{' '}
          <strong>Tata Power Group</strong> and{' '}
          <strong>ISRO/NESAC, Dept. of Space, Govt. of India</strong>.
          Crafting REST APIs, containerized microservices, and geospatial satellite data pipelines.
        </p>

        <div className="hero-stats-bar brutal-reveal delay-4">
          <div className="stat-item">
            <span className="stat-value">2+</span>
            <span className="stat-label">Production Orgs</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">8.95</span>
            <span className="stat-label">SGPA / 10</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">3</span>
            <span className="stat-label">Hackathon Wins</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">∞</span>
            <span className="stat-label">Scale</span>
          </div>
        </div>

        <div className="hero-tech-cloud brutal-reveal delay-5">
          {cloudIcons.map(({ label, cls }) => (
            <div key={label} className={`tech-pill ${cls}`} title={label}>
              {label}
            </div>
          ))}
        </div>

        <div className="hero-actions brutal-reveal delay-6">
          <a href="#contact" className="btn btn-primary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            ☁ Get in Touch
          </a>
          <a href="#experience" className="btn btn-secondary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            ↓ Explore My Work
          </a>
        </div>
      </div>

      <div className="hero-scroll brutal-reveal delay-6">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}