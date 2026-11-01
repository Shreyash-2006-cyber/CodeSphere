import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuBell, LuSearch, LuMenu, LuLogOut, LuSettings, LuCircleUser } from "react-icons/lu";
import Avatar from "../Avatar";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar({ onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || "User";

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate(ROUTES.LOGIN);
  }

  return (
    <header className="navbar">
      <button className="navbar-burger" onClick={onMenuClick} aria-label="Toggle sidebar">
        <LuMenu />
      </button>

      <div className="navbar-search">
        <LuSearch />
        <input placeholder="Search problems, notes, friends…" />
      </div>

      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          <LuBell />
          <span className="navbar-dot" />
        </button>

        <div className="navbar-profile">
          <button className="navbar-profile-btn" onClick={() => setMenuOpen((o) => !o)}>
            <Avatar name={displayName} size={34} status="online" />
          </button>
          {menuOpen && (
            <div className="navbar-menu fade-in" onMouseLeave={() => setMenuOpen(false)}>
              <div className="navbar-menu-user">
                <strong>{displayName}</strong>
                <span>{user?.email || ""}</span>
              </div>
              <Link to={ROUTES.PROFILE} onClick={() => setMenuOpen(false)}>
                <LuCircleUser /> Profile
              </Link>
              <Link to={ROUTES.SETTINGS} onClick={() => setMenuOpen(false)}>
                <LuSettings /> Settings
              </Link>
              <button
                className="navbar-menu-logout"
                onClick={handleLogout}
              >
                <LuLogOut /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
