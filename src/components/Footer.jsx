export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Architected with <span className="heart">♥</span> & deployed from the cloud by Omm Snehasish Parida
        <span className="divider">|</span>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
}