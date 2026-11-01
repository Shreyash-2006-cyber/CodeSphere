import { Link } from "react-router-dom";
import { LuArrowRight, LuGithub, LuCode } from "react-icons/lu";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";

export default function HeroSection({ stats }) {
  return (
    <section className="hm-hero">
      <div className="container hm-hero-inner">
        <div className="hm-hero-copy">
          <span className="hm-hero-badge"><LuGithub /> <LuCode /> Track everything in one place</span>
          <h1>Study, code, and grow — together.</h1>
          <p>
            CodeSphere unifies your GitHub activity, LeetCode progress, and personal goals into
            one clean dashboard, so you can focus on showing up every day.
          </p>
          <div className="hm-hero-actions">
            <Button as={Link} to={ROUTES.REGISTER} size="lg" icon={LuArrowRight} iconPosition="right">
              Get started free
            </Button>
            <Button as={Link} to={ROUTES.LOGIN} size="lg" variant="outline">
              Log in
            </Button>
          </div>
          <div className="hm-hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hm-hero-visual">
          <div className="hm-hero-card hm-hero-card-1">
            <span className="hm-hero-dot" /> GitHub · 1,240 contributions
          </div>
          <div className="hm-hero-card hm-hero-card-2">
            <span className="hm-hero-dot" style={{ background: "#f59e0b" }} /> LeetCode · 612 solved
          </div>
          <div className="hm-hero-card hm-hero-card-3">
            <span className="hm-hero-dot" style={{ background: "#16a34a" }} /> 21-day streak 🔥
          </div>
        </div>
      </div>
    </section>
  );
}
