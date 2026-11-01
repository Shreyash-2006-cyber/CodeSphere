import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";

/**
 * Wraps authenticated-only routes.
 * - While auth is loading (hydrating from localStorage) → render nothing (no flash).
 * - If not authenticated → redirect to /login.
 * - If authenticated → render children.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}
