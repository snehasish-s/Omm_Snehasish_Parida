const experiences = [
  {
    date: 'Jun – Jul 2025',
    role: 'Java & Cloud Developer Intern',
    company: 'TPCODL — Tata Power Group',
    location: 'Bhubaneswar',
    points: [
      'Developed REST APIs using Java Spring Boot and containerized applications with Docker.',
      'Worked on microservices, API documentation, and Agile software development practices.',
    ],
    tags: ['Java', 'Spring Boot', 'AWS S3', 'IAM', 'Docker', 'CloudWatch', 'REST APIs'],
  },
  {
    date: 'Jan 2026',
    role: 'Space Technology Trainee',
    company: 'NESAC, Dept. of Space, Govt. of India',
    location: 'Northeast India',
    points: [
      'Developed GIS-based disaster monitoring solutions using satellite imagery.',
      'Processed ResourceSat, Sentinel, and MODIS data for flood mapping and environmental analysis.',
      'Built geospatial data processing workflows using Remote Sensing and GIS techniques.',
    ],
    tags: ['GIS', 'Remote Sensing', 'Satellite Data', 'NDVI', 'Python', 'Cloud APIs'],
  },
];

export default function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            Where I've <span className="accent">Deployed</span>
          </h2>
          <p className="section-subtitle">
            Production experience at India's leading organizations — from power distribution to space technology.
          </p>
        </div>

        <div className="experience-timeline brutal-reveal delay-1">
          {experiences.map((exp, i) => (
            <div key={i} className="experience-item brutal-reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="experience-dot" />
              <div className="experience-card">
                <div className="experience-meta">
                  <span className="experience-date">{exp.date}</span>
                  <h3 className="experience-role">{exp.role}</h3>
                  <div className="experience-company">{exp.company} · {exp.location}</div>
                </div>
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