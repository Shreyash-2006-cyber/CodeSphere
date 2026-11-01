import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMail, LuLock, LuUser, LuGithub, LuCode, LuFlaskConical, LuCircleAlert, LuBookOpen } from "react-icons/lu";
import Button from "../../shared/components/Button";
import { ROUTES } from "../../shared/constants/routes";
import { useAuth } from "../../shared/context/AuthContext";
import "./styles/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    githubUsername: "",
    leetcodeUsername: "",
    neetcodeUsername: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await register(form);
    setIsSubmitting(false);
    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-head">
          <div className="auth-logo">
            <LuFlaskConical />
          </div>
          <h2>Create your account</h2>
          <p>Start tracking progress in under a minute.</p>
        </div>

        {error && (
          <div className="auth-error">
            <LuCircleAlert size={15} />
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <div className="form-input-wrap">
              <LuUser />
              <input id="name" autoComplete="name" placeholder="Jordan Lee" value={form.name} onChange={update("name")} required />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <div className="form-input-wrap">
              <LuMail />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="form-input-wrap">
              <LuLock />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password (min 6 chars)"
                value={form.password}
                onChange={update("password")}
                minLength={6}
                required
              />
            </div>
          </div>

          {/* Platform usernames section */}
          <div className="auth-section-label">Platform usernames <span>(optional — can add later)</span></div>

          <div className="auth-two-col">
            <div className="form-field">
              <label htmlFor="gh">GitHub</label>
              <div className="form-input-wrap">
                <LuGithub />
                <input id="gh" placeholder="your-gh-username" value={form.githubUsername} onChange={update("githubUsername")} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="lc">LeetCode</label>
              <div className="form-input-wrap">
                <LuCode />
                <input id="lc" placeholder="your-lc-username" value={form.leetcodeUsername} onChange={update("leetcodeUsername")} />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="nc">NeetCode</label>
            <div className="form-input-wrap">
              <LuBookOpen />
              <input id="nc" placeholder="your-neetcode-username" value={form.neetcodeUsername} onChange={update("neetcodeUsername")} />
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
