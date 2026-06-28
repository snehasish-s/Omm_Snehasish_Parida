const projects = [
  {
    icon: '🛰️',
    year: '2026',
    title: 'Geospatial Disaster Monitoring System',
    description: 'Architected cloud-native disaster risk platform ingesting multi-source raster/vector satellite data via containerised pipelines. Built serverless NDVI & water-body extent module triggering automated district-level flood alerts.',
    links: { demo: 'https://gdms-2026.onrender.com' },
    tech: [
      { label: 'Docker', cls: 'docker' },
      { label: 'GIS', cls: 'default' },
      { label: 'REST APIs', cls: 'default' },
      { label: 'Remote Sensing', cls: 'default' },
    ],
  },
  {
    icon: '⚡',
    year: '2025',
    title: 'Enterprise Backend System',
    description: 'Secure, scalable REST APIs for power distribution operations deployed on cloud with environment-based config & secret management.',
    links: { github: 'https://github.com/snehasish-s/PowerGrid' },
    tech: [
      { label: 'Java', cls: 'java' },
      { label: 'Spring Boot', cls: 'spring' },
      { label: 'Docker', cls: 'docker' },
    ],
  },
  {
    icon: '⚙️',
    year: '2026',
    title: 'DevOps Pipeline Visualizer',
    description: 'Built a Flask-based GitHub webhook dashboard logging push/PR/deployment events with real-time CI/CD activity feed. Integrated AWS S3 for event artifact storage and SNS for automated alerts; provisioned infrastructure via Terraform IaC.',
    links: { demo: 'https://my-devops-dashboard.onrender.com' },
    tech: [
      { label: 'Flask', cls: 'default' },
      { label: 'AWS S3', cls: 'aws' },
      { label: 'AWS SNS', cls: 'aws' },
      { label: 'Terraform', cls: 'default' },
      { label: 'Docker', cls: 'docker' },
    ],
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Cloud-Native <span className="accent">Builds</span>
          </h2>
          <p className="section-subtitle">
            Production-grade systems deployed on AWS with Docker, Spring Boot, and geospatial pipelines.
          </p>
        </div>

        <div className="projects-grid brutal-reveal delay-1">
          {projects.map((project, i) => (
            <div key={i} className="project-card brutal-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <div className="project-year">{project.year}</div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-links" style={{ marginBottom: '12px' }}>
                {project.links?.demo && <a href={project.links.demo} target="_blank" rel="noreferrer" style={{ marginRight: '12px', fontSize: '12px', color: 'var(--accent-cyan)' }}>[LIVE DEMO]</a>}
                {project.links?.github && <a href={project.links.github} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--acid-green)' }}>[GITHUB]</a>}
              </div>

              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t.label} className={`tech-tag ${t.cls}`}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cloud Architecture Diagram — Brutalist */}
        <div className="arch-diagram brutal-reveal delay-2">
          <div className="arch-title">☁ CLOUD ARCHITECTURE OVERVIEW</div>
          <div className="arch-layers">
            <div className="arch-layer">
              <span className="arch-layer-label">Client</span>
              <div className="arch-services">
                <span className="arch-service tool">🌐 REST Client</span>
                <span className="arch-service tool">📊 GIS Dashboard</span>
                <span className="arch-service tool">📱 Mobile API</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Gateway</span>
              <div className="arch-services">
                <span className="arch-service aws">🔒 API Gateway</span>
                <span className="arch-service aws">🛡️ IAM Auth</span>
                <span className="arch-service azure">⚖️ Load Balancer</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Services</span>
              <div className="arch-services">
                <span className="arch-service green">☕ Spring Boot API</span>
                <span className="arch-service aws">λ Lambda Functions</span>
                <span className="arch-service tool">🐳 Docker Containers</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Data</span>
              <div className="arch-services">
                <span className="arch-service aws">📦 S3 Storage</span>
                <span className="arch-service azure">🗄️ PostgreSQL</span>
                <span className="arch-service aws">📈 CloudWatch</span>
                <span className="arch-service tool">🛰️ Satellite Feed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}