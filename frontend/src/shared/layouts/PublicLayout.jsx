import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "../components/Footer";

// Layout for marketing/auth pages (Home, Login, Register):
// simple top nav + footer, no sidebar.
export default function PublicLayout() {
  return (
    <div>
      <PublicNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
