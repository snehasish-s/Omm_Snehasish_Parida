const skillCategories = [
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    color: 'orange',
    skills: [
      { name: 'AWS S3', dot: 'orange' },
      { name: 'IAM', dot: 'orange' },
      { name: 'EC2', dot: 'orange' },
      { name: 'CloudWatch', dot: 'orange' },
      { name: 'Docker', dot: 'blue' },
      { name: 'CI/CD', dot: 'green' },
      { name: 'Serverless', dot: 'purple' },
      { name: 'Cloud-native', dot: 'cyan' },
    ],
  },
  {
    name: 'Backend & APIs',
    icon: '⚙️',
    color: 'green',
    skills: [
      { name: 'Java', dot: 'red' },
      { name: 'Spring Boot', dot: 'green' },
      { name: 'REST APIs', dot: 'cyan' },
      { name: 'Microservices', dot: 'purple' },
      { name: 'SQL', dot: 'blue' },
      { name: 'MySQL', dot: 'blue' },
      { name: 'PostgreSQL', dot: 'blue' },
      { name: 'API Documentation', dot: 'cyan' },
      { name: 'SDLC', dot: 'green' },
    ],
  },
  {
    name: 'Geospatial',
    icon: '🛰️',
    color: 'cyan',
    skills: [
      { name: 'GIS', dot: 'cyan' },
      { name: 'Remote Sensing', dot: 'purple' },
      { name: 'NDVI Analysis', dot: 'green' },
      { name: 'Satellite Pipelines', dot: 'orange' },
    ],
  },
  {
    name: 'Tools & Concepts',
    icon: '🔧',
    color: 'purple',
    skills: [
      { name: 'Git', dot: 'orange' },
      { name: 'Linux', dot: 'green' },
      { name: 'Database Design', dot: 'blue' },
      { name: 'DBMS', dot: 'green' },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">
            Service <span className="accent">Console</span>
          </h2>
          <p className="section-subtitle">
            The cloud services, languages, and tools I deploy in production.
          </p>
        </div>

        <div className="skills-console">
          {skillCategories.map((category, i) => (
            <div key={i} className="skill-category brutal-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="skill-category-header">
                <div className="skill-category-icon">{category.icon}</div>
                <div className="skill-category-name">{category.name}</div>
                <div className="skill-category-count">{category.skills.length} services</div>
              </div>
              <div className="skill-items">
                {category.skills.map((skill, j) => (
                  <div key={j} className="skill-chip brutal-reveal" style={{ transitionDelay: `${j * 0.03}s` }}>
                    <span className={`skill-dot ${skill.dot}`} />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}