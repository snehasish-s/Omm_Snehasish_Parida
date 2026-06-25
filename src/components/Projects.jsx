const projects = [
  {
    icon: '🛰️',
    year: '2026',
    title: 'Cloud-Deployed Geospatial Disaster Monitoring System',
    description: 'Architected a cloud-native disaster risk platform ingesting multi-source raster/vector satellite data via containerised pipelines. Built serverless NDVI & water-body extent module triggering automated district-level flood alerts.',
    tech: [
      { label: 'AWS', cls: 'aws' },
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
    description: 'Built secure, scalable REST APIs for power distribution operations deployed on cloud with environment-based configuration and secret management. Full CI/CD pipeline with Docker containerization.',
    tech: [
      { label: 'Java', cls: 'java' },
      { label: 'Spring Boot', cls: 'spring' },
      { label: 'Docker', cls: 'docker' },
      { label: 'AWS', cls: 'aws' },
    ],
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Cloud-Native <span className="gradient-text">Builds</span>
          </h2>
          <p className="section-subtitle">
            Production-grade systems deployed on AWS with Docker, Spring Boot, and geospatial pipelines.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card animate-on-scroll" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="project-icon">{project.icon}</div>
              <div className="project-year">{project.year}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t.label} className={`tech-pill ${t.cls}`}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cloud Architecture Diagram */}
        <div className="arch-diagram animate-on-scroll delay-2">
          <div className="arch-title">☁ CLOUD ARCHITECTURE OVERVIEW</div>
          <div className="arch-layers">
            <div className="arch-layer">
              <span className="arch-layer-label">Client</span>
              <div className="arch-services">
                <span className="arch-service tool-svc">🌐 REST Client</span>
                <span className="arch-service tool-svc">📊 GIS Dashboard</span>
                <span className="arch-service tool-svc">📱 Mobile API</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Gateway</span>
              <div className="arch-services">
                <span className="arch-service aws-svc">🔒 API Gateway</span>
                <span className="arch-service aws-svc">🛡️ IAM Auth</span>
                <span className="arch-service azure-svc">⚖️ Load Balancer</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Services</span>
              <div className="arch-services">
                <span className="arch-service green-svc">☕ Spring Boot API</span>
                <span className="arch-service aws-svc">λ Lambda Functions</span>
                <span className="arch-service tool-svc">🐳 Docker Containers</span>
              </div>
            </div>
            <div className="arch-connector"><div className="arch-arrow" /></div>

            <div className="arch-layer">
              <span className="arch-layer-label">Data</span>
              <div className="arch-services">
                <span className="arch-service aws-svc">📦 S3 Storage</span>
                <span className="arch-service azure-svc">🗄️ PostgreSQL</span>
                <span className="arch-service aws-svc">📈 CloudWatch</span>
                <span className="arch-service tool-svc">🛰️ Satellite Feed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
