export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-content animate-on-scroll">
          <div className="section-label">Connect</div>
          <h2 className="contact-title">
            Let's Build Something <span className="gradient-text">Cloud-Native</span>
          </h2>
          <p className="contact-subtitle">
            Currently looking for cloud engineering and backend development opportunities.
            Let's connect and deploy something amazing together.
          </p>

          <div className="contact-cards">
            <a href="mailto:ommsnehasishparidaa@gmail.com" className="contact-card" id="contact-email">
              <div className="contact-card-icon">📧</div>
              <div className="contact-card-label">Email</div>
              <div className="contact-card-value">ommsnehasishparidaa@gmail.com</div>
            </a>
            <a href="tel:+919114424401" className="contact-card" id="contact-phone">
              <div className="contact-card-icon">📱</div>
              <div className="contact-card-label">Phone</div>
              <div className="contact-card-value">+91 9114424401</div>
            </a>
            <a
              href="https://linkedin.com/in/snehasish-s"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              id="contact-linkedin"
            >
              <div className="contact-card-icon">💼</div>
              <div className="contact-card-label">LinkedIn</div>
              <div className="contact-card-value">linkedin.com/in/snehasish-s</div>
            </a>
          </div>

          <a
            href="mailto:ommsnehasishparidaa@gmail.com"
            className="connect-btn"
            id="connect-cta"
          >
            ☁ Deploy a Conversation →
          </a>
        </div>
      </div>
    </section>
  );
}
