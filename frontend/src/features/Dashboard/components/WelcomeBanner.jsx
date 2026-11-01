import { LuFlame } from "react-icons/lu";
import "./WelcomeBanner.css";

export default function WelcomeBanner({ name = "Aditi" }) {
  return (
    <div className="db-welcome fade-in">
      <div>
        <h2>Welcome back, {name} 👋</h2>
        <p>Here's what's happening across your trackers today.</p>
      </div>
      <div className="db-welcome-streak">
        <LuFlame /> 21-day streak
      </div>
    </div>
  );
}
