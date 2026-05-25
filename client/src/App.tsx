import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import { HealthPage } from "./pages/HealthPage";
import { Ws4DemoPage } from "./pages/Ws4DemoPage";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedPermissions={["user_normal", "user_admin"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedPermissions={["user_admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ws4-demo"
          element={
            <ProtectedRoute allowedPermissions={["user_normal", "user_admin"]}>
              <Ws4DemoPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
