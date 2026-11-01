import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";

export default function CTASection() {
  return (
    <section className="hm-cta">
      <div className="container hm-cta-inner">
        <h2>Ready to build your streak?</h2>
        <p>Join thousands of developers tracking their progress in one place.</p>
        <Button as={Link} to={ROUTES.REGISTER} size="lg" icon={LuArrowRight} iconPosition="right">
          Create your free account
        </Button>
      </div>
    </section>
  );
}
