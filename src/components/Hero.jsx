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
  ];

  return (
    <section className="hero" id="hero">
      <CloudCanvas />
      <div className="hero-grid-overlay" />

      {/* Floating service labels in background */}
      <div className="floating-services">
        {['S3', 'EC2', 'IAM', 'Lambda', 'RDS', 'ECS', 'SNS', 'SQS'].map((svc, i) => (
          <div
            key={svc}
            className="floating-service"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
              color: i % 2 === 0 ? 'var(--aws-orange)' : 'var(--azure-blue)',
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          >
            {svc}
          </div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="status-dot" />
          Available for opportunities
        </div>

        <h1 className="hero-name">
          Omm Snehasish<br />
          <span className="gradient-text">Parida</span>
        </h1>

        <div className="hero-title-line">
          <span className="hero-title">{displayText}</span>
          <span className="typing-cursor" />
        </div>

        <p className="hero-description">
          Building scalable cloud systems with production experience at{' '}
          <strong style={{ color: 'var(--accent-orange)' }}>Tata Power Group</strong> and{' '}
          <strong style={{ color: 'var(--accent-cyan)' }}>ISRO/NESAC, Dept. of Space, Govt. of India</strong>.
          Crafting REST APIs, containerized microservices, and geospatial satellite data pipelines.
        </p>

        <div className="hero-cloud-icons">
          {cloudIcons.map(({ label, cls }) => (
            <div key={label} className={`cloud-service-icon ${cls}`} title={label}>
              {label}
            </div>
          ))}
        </div>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            ☁ Get in Touch
          </a>
          <a href="#experience" className="btn-secondary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            ↓ Explore My Work
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
