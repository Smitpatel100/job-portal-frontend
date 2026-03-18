import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import CreateJobPage from "./pages/CreateJobPage";
import RoleRoute from "./components/RoleRoute";
import EmployerApplicationsPage from "./pages/EmployerApplicationsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import EditJobPage from "./pages/EditJobPage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <MainLayout>
              <JobsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-job"
        element={
          <RoleRoute allowedRole={["EMPLOYER", "ADMIN"]}>            <MainLayout>
            <CreateJobPage />
          </MainLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/applications/:jobId"
        element={<EmployerApplicationsPage />}
      />

      <Route path="/my-applications" element={<MyApplicationsPage />} />

      <Route
        path="/edit-job/:jobId"
        element={
          <RoleRoute allowedRole={["EMPLOYER", "ADMIN"]}>            <MainLayout>
            <EditJobPage />
          </MainLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleRoute allowedRole="ADMIN">
            <AdminPage />
          </RoleRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
