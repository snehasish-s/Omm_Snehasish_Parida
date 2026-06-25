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
      desc: 'Presented full-stack cloud-ready application at BPUT Rourkela.',
    },
  ];

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Background</div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Achievements</span>
          </h2>
        </div>

        <div className="edu-awards-grid">
          <div className="edu-card animate-on-scroll">
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
            {awards.map((award, i) => (
              <div
                key={i}
                className="award-card animate-on-scroll"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="award-icon">{award.icon}</div>
                <div>
                  <div className="award-title">{award.title}</div>
                  <div className="award-desc">{award.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
