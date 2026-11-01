import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LuFlaskConical, LuMenu, LuX } from "react-icons/lu";
import Button from "../components/Button";
import { ROUTES } from "../constants/routes";
import "./PublicNavbar.css";

const LINKS = [
  { label: "Product", to: "/#features" },
  { label: "Leaderboard", to: "/#leaderboard" },
  { label: "Testimonials", to: "/#testimonials" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="public-nav">
      <div className="container public-nav-inner">
        <Link to={ROUTES.HOME} className="public-nav-brand">
          <span className="public-nav-logo"><LuFlaskConical /></span>
          CodeSphere
        </Link>

        <nav className={`public-nav-links ${open ? "open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="public-nav-cta">
            <Button as={Link} to={ROUTES.LOGIN} variant="ghost" size="sm">
              Log in
            </Button>
            <Button as={Link} to={ROUTES.REGISTER} variant="primary" size="sm">
              Get started
            </Button>
          </div>
        </nav>

        <button className="public-nav-burger" onClick={() => setOpen((o) => !o)}>
          {open ? <LuX /> : <LuMenu />}
        </button>
      </div>
    </header>
  );
}
