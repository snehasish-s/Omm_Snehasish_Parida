const experiences = [
  {
    date: 'Jun – Jul 2025',
    role: 'Java & Cloud Developer Intern',
    company: 'TPCODL — Tata Power Group',
    location: 'Bhubaneswar',
    points: [
      'Built production-grade REST APIs (Java Spring Boot) for enterprise power distribution; containerised with Docker for CI/CD-ready deployment.',
      'Integrated AWS S3 with IAM role-based access control; implemented CloudWatch-style health monitoring and anomaly alerting.',
      'Architected decoupled microservices; participated in full SDLC — sprint planning, code review, API documentation.',
    ],
    tags: ['Java', 'Spring Boot', 'AWS S3', 'IAM', 'Docker', 'CloudWatch', 'REST APIs'],
  },
  {
    date: 'Jan 2026',
    role: 'Space Technology Trainee',
    company: 'NESAC, Dept. of Space, Govt. of India',
    location: 'Northeast India',
    points: [
      'Built satellite data pipelines and GIS-based disaster decision systems for national-level operational scenarios.',
      'Analysed multi-temporal imagery (ResourceSat, Sentinel, MODIS) for flood mapping and disaster monitoring using cloud-integrated early warning APIs.',
      'Processed and visualized geospatial datasets using Remote Sensing and GIS tools for environmental and disaster management applications.',
      'Developed data preprocessing workflows for satellite imagery, including image correction, classification, and feature extraction techniques.',
      'Collaborated with researchers and domain experts to generate geospatial insights for flood assessment and resource monitoring.',
    ],
    tags: ['GIS', 'Remote Sensing', 'Satellite Data', 'NDVI', 'Python', 'Cloud APIs'],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            Where I've <span className="gradient-text">Deployed</span>
          </h2>
          <p className="section-subtitle">
            Production experience at India's leading organizations — from power distribution to space technology.
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="experience-item animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="experience-dot" />
              <div className="experience-card">
                <div className="experience-date">{exp.date}</div>
                <h3 className="experience-role">{exp.role}</h3>
                <div className="experience-company">{exp.company} · {exp.location}</div>
                <ul className="experience-points">
                  {exp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
                <div className="experience-tags">
                  {exp.tags.map(tag => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
