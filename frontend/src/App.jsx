import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./shared/components/Toast";
import { AuthProvider } from "./shared/context/AuthContext";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import AppLayout from "./shared/layouts/AppLayout";
import PublicLayout from "./shared/layouts/PublicLayout";
import { ROUTES } from "./shared/constants/routes";

import Home from "./features/Home";
import { Login, Register } from "./features/Auth";
import Dashboard from "./features/Dashboard";
import GitHub from "./features/GitHub";
import LeetCode from "./features/LeetCode";
import NeetCode from "./features/NeetCode";
import ManualTracker from "./features/ManualTracker";
import Friends from "./features/Friends";
import Leaderboard from "./features/Leaderboard";
import TopPerformers from "./features/TopPerformers";
import Challenges from "./features/Challenges";
import Goals from "./features/Goals";
import Notes from "./features/Notes";
import Analytics from "./features/Analytics";
import Profile from "./features/Profile";
import Settings from "./features/Settings";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public / marketing + auth routes */}
            <Route element={<PublicLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
            </Route>

            {/* Authenticated dashboard routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.GITHUB} element={<GitHub />} />
              <Route path={ROUTES.LEETCODE} element={<LeetCode />} />
              <Route path={ROUTES.NEETCODE} element={<NeetCode />} />
              <Route path={ROUTES.MANUAL_TRACKER} element={<ManualTracker />} />
              <Route path={ROUTES.FRIENDS} element={<Friends />} />
              <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
              <Route path={ROUTES.TOP_PERFORMERS} element={<TopPerformers />} />
              <Route path={ROUTES.CHALLENGES} element={<Challenges />} />
              <Route path={ROUTES.GOALS} element={<Goals />} />
              <Route path={ROUTES.NOTES} element={<Notes />} />
              <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
