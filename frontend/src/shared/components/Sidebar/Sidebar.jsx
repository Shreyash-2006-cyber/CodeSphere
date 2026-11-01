import { NavLink } from "react-router-dom";
import { LuChevronsLeft, LuFlaskConical } from "react-icons/lu";
import { SIDEBAR_SECTIONS } from "../../constants/navigation";
import "./Sidebar.css";

export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={onCloseMobile} />}
      <aside
        className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <span className="sidebar-logo">
            <LuFlaskConical />
          </span>
          {!collapsed && <span className="sidebar-brand-text">CodeSphere</span>}
          <button className="sidebar-collapse-btn" onClick={onToggle} aria-label="Collapse sidebar">
            <LuChevronsLeft className={collapsed ? "flip" : ""} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {SIDEBAR_SECTIONS.map((section) => (
            <div className="sidebar-section" key={section.label}>
              {!collapsed && <p className="sidebar-section-label">{section.label}</p>}
              {section.items.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                  onClick={onCloseMobile}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="sidebar-icon" />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
