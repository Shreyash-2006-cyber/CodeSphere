import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMail, LuLock, LuFlaskConical, LuCircleAlert } from "react-icons/lu";
import Button from "../../shared/components/Button";
import { ROUTES } from "../../shared/constants/routes";
import { useAuth } from "../../shared/context/AuthContext";
import "./styles/Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await login({ email: form.email, password: form.password });
    setIsSubmitting(false);
    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-head">
          <div className="auth-logo">
            <LuFlaskConical />
          </div>
          <h2>Welcome back</h2>
          <p>Log in to keep your streak going.</p>
        </div>

        {error && (
          <div className="auth-error">
            <LuCircleAlert size={15} />
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-between">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              />
              Remember me
            </label>
            <Link to={ROUTES.LOGIN}>Forgot password?</Link>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
