import { useState, useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="logo-bracket">{'<'}</span>
        OSP
        <span className="logo-slash">/</span>
        <span className="logo-bracket">{'>'}</span>
      </div>

      <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
        {navItems.map(item => (
          <li key={item.href}>
            <a
              href={item.href}
              className={activeSection === item.href.slice(1) ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Connect
          </a>
        </li>
        {mobileOpen && (
          <li>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', padding: '10px 30px', borderRadius: '8px',
                cursor: 'pointer', marginTop: '20px', fontSize: '0.9rem'
              }}
            >
              ✕ Close
            </button>
          </li>
        )}
      </ul>

      <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
