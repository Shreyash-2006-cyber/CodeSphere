import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AppLayout.css";

// Layout for all authenticated/dashboard-style pages: persistent
// sidebar + top navbar with a scrollable content area.
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="app-layout-main">
        <Navbar onMenuClick={() => setMobileOpen((o) => !o)} />
        <main className="app-layout-content fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
