import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loginpage from "../pages/Loginpage";
import Dashboard from "../components/Dashboard";
import Profile from "../pages/Profile";
import ProfileForm from "../pages/ProfileForm";
import Document from "../components/ComponentsforDashBoard/Document";
import Members from "../pages/members";
import Noticeboard from "../components/ComponentsforDashBoard/Announcement";

import SidebarLayout from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Announcements from "../components/ComponentsforDashBoard/Notice";
import Footer from "../components/Footer";

const App = () => {
  const [open, setopen] = useState(false);
  const [role, setrole] = useState(() => localStorage.getItem("role") || "user");
  const [AdminName, setAdminName] = useState(() => localStorage.getItem("AdminName") || "None");

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.authenticated) {
      navigate("/login", { replace: true });
    }
  }, [auth.authenticated]);

  return (
    <div className="relative">
      <ToastContainer />

      {/* Navbar shown across all routes */}
      <Navbar
        setopen={setopen}
        logout={auth.logout}
        role={role}
        username={AdminName}
        authenticated={auth.authenticated}
        setAdminName={setAdminName}
        setrole={setrole}
      />

      <Routes>
        {/* Public route (no sidebar) */}
        <Route
          path="/login"
          element={
            <Loginpage
              setAdminName={setAdminName}
              login={auth.login}
              setrole={setrole}
              authenticated={auth.authenticated}
            />
          }
        />

        {/* Protected routes with sidebar layout */}
        <Route element={<SidebarLayout setopen={setopen} open={open} />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard
                  token={auth.token}
                  role={role}
                  username={AdminName}
                  setopen={setopen}
                  open={open}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
          <Route
            path="/profileForm"
            element={
              <ProfileForm
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
          <Route
            path="/document"
            element={
              <Document
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
          <Route
            path="/member"
            element={
              <Members
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
          <Route
            path="/notice"
            element={
              <Announcements Announcements
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
             <Route
            path="/alerts"
            element={
              <Noticeboard
                token={auth.token}
                AdminName={AdminName}
                role={role}
                setAdminName={setAdminName}
                login={auth.login}
                setrole={setrole}
                authenticated={auth.authenticated}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

