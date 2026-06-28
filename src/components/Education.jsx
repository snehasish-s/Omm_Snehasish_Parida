export default function Education() {
  const awards = [
    {
      icon: '🚀',
      title: 'ISRO Robotics Challenge 2026',
      desc: 'Qualified Round 4 nationally; autonomous systems with sensor data & mission-critical logic.',
    },
    {
      icon: '🏆',
      title: 'IIIT Bhubaneswar Hackathon — Winner',
      desc: 'Cloud-integrated REST API solution built under time constraints.',
    },
    {
      icon: '🎯',
      title: 'BPUT Hackathon — Selected Presenter',
      desc: 'Selected presenter at BPUT Rourkela for full-stack cloud-ready app.',
    },
  ];

  const certifications = [
    {
      icon: '☁️',
      title: 'Preparing for Your Associate Cloud Engineer Journey',
      issuer: 'Google Cloud & Coursera',
      date: 'Jun 2026',
      credentialId: 'OLUVQ3BYG1NF'
    }
  ];

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">Background</div>
          <h2 className="section-title">
            Education & <span className="accent">Achievements</span>
          </h2>
        </div>

        <div className="edu-awards-grid brutal-reveal delay-1">
          <div className="edu-card brutal-reveal delay-2">
            <div className="edu-icon">🎓</div>
            <div className="edu-degree">B.Tech — Computer Science & Engineering</div>
            <div className="edu-school">Aryan Institute of Engineering & Technology</div>
            <div className="edu-university">BPUT, Rourkela · Bhubaneswar · Expected 2027</div>
            <div className="edu-gpa">
              <span>📊</span>
              SGPA: 8.95 / 10.00
            </div>
          </div>

          <div className="awards-list">
            <h3 className="section-label" style={{ marginBottom: '16px' }}>Awards</h3>
            {awards.map((award, i) => (
              <div
                key={i}
                className="award-card brutal-reveal"
                style={{ transitionDelay: `${i * 0.1}s`, marginBottom: '16px' }}
              >
                <div className="award-icon">{award.icon}</div>
                <div>
                  <div className="award-title">{award.title}</div>
                  <div className="award-desc">{award.desc}</div>
                </div>
              </div>
            ))}
            
            <h3 className="section-label" style={{ marginTop: '24px', marginBottom: '16px' }}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="award-card brutal-reveal panel-acid"
                style={{ transitionDelay: `${(i + awards.length) * 0.1}s`, marginBottom: '16px' }}
              >
                <div className="award-icon">{cert.icon}</div>
                <div>
                  <div className="award-title">{cert.title}</div>
                  <div className="award-desc">{cert.issuer} · {cert.date}</div>
                  <div className="award-desc" style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--accent-cyan)' }}>Credential ID: {cert.credentialId}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}