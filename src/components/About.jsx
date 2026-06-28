import { useEffect, useRef, useState } from 'react';

const terminalLines = [
  { type: 'command', prompt: 'omm@cloud:~$', text: 'cat about.json' },
  { type: 'output', text: '{' },
  { type: 'json', key: '"name"', value: '"Omm Snehasish Parida"' },
  { type: 'json', key: '"role"', value: '"Cloud-Focused Backend Engineer"' },
  { type: 'json', key: '"location"', value: '"Bhubaneswar, India"' },
  { type: 'json', key: '"experience"', value: '["Tata Power Group", "ISRO/NESAC"]' },
  { type: 'json', key: '"stack"', value: '["Java", "Spring Boot", "AWS", "Docker"]' },
  { type: 'json', key: '"passion"', value: '"Building cloud-native systems at scale"' },
  { type: 'output', text: '}' },
  { type: 'blank' },
  { type: 'command', prompt: 'omm@cloud:~$', text: 'aws sts get-caller-identity' },
  { type: 'output', text: '✓ Authenticated as Cloud Engineer — access granted.' },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= terminalLines.length) clearInterval(interval);
          }, 120);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Deploying Solutions to the <span className="accent">Cloud</span>
          </h2>
          <p className="section-subtitle">
            From satellite data pipelines at ISRO to enterprise systems at Tata Power —
            I build systems that scale.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text brutal-reveal delay-1">
            <h3>Engineering at the Intersection of Cloud & Data</h3>
            <p>
              I'm a cloud-focused backend engineer with a passion for building robust, scalable
              systems. My journey spans from developing enterprise REST APIs for India's power
              distribution infrastructure at <strong>Tata Power Group (TPCODL)</strong>, to
              architecting satellite data pipelines for disaster monitoring at <strong>ISRO/NESAC,
              Dept. of Space, Govt. of India</strong>.
            </p>
            <p>
              I specialize in Java Spring Boot, AWS cloud services, Docker containerization,
              and building microservice architectures that handle enterprise and national-scale workloads.
            </p>

            <div className="about-stats">
              <div className="stat-block brutal-reveal delay-2">
                <div className="stat-value">2+</div>
                <div className="stat-label">Production Orgs</div>
              </div>
              <div className="stat-block brutal-reveal delay-3">
                <div className="stat-value">8.95</div>
                <div className="stat-label">SGPA / 10</div>
              </div>
              <div className="stat-block brutal-reveal delay-4">
                <div className="stat-value">3</div>
                <div className="stat-label">Hackathon Wins</div>
              </div>
            </div>
          </div>

          <div className="terminal-panel brutal-reveal delay-2">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <div className="terminal-title">omm@cloud-engineer ~ bash</div>
            </div>
            <div className="terminal-body">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className="terminal-line"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {line.type === 'command' && (
                    <>
                      <span className="prompt">{line.prompt} </span>
                      <span className="command">{line.text}</span>
                    </>
                  )}
                  {line.type === 'output' && (
                    <span className="output">{line.text}</span>
                  )}
                  {line.type === 'json' && (
                    <span className="output">
                      {'  '}<span className="bracket">{'{'}</span>
                      <span className="key">{line.key}</span>
                      <span className="output">: </span>
                      <span className="string">{line.value}</span>,
                      <span className="bracket">{'}'}</span>
                    </span>
                  )}
                  {line.type === 'blank' && <br />}
                </div>
              ))}
              {visibleLines >= terminalLines.length && (
                <div className="terminal-line" style={{ animationDelay: '0.6s' }}>
                  <span className="prompt">omm@cloud:~$ </span>
                  <span className="typing-cursor" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}