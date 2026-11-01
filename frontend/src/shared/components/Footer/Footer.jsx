import { Link } from "react-router-dom";
import { LuGithub, LuTwitter, LuLinkedin, LuFlaskConical } from "react-icons/lu";
import "./Footer.css";

const LINKS = {
  Product: ["Dashboard", "Leaderboard", "Challenges", "Analytics"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Docs", "Community", "Support", "Status"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">
            <LuFlaskConical />
          </span>
          <span className="footer-brand-text">CodeSphere</span>
          <p>Study, track, and grow with people who show up too.</p>
          <div className="footer-social">
            <a href="#" aria-label="GitHub"><LuGithub /></a>
            <a href="#" aria-label="Twitter"><LuTwitter /></a>
            <a href="#" aria-label="LinkedIn"><LuLinkedin /></a>
          </div>
        </div>

        {Object.entries(LINKS).map(([heading, items]) => (
          <div className="footer-col" key={heading}>
            <h4>{heading}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}><Link to="/">{item}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} CodeSphere. All rights reserved.</span>
        <div className="footer-legal">
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
