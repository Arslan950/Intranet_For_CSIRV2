import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Dashboard from "../components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Profile from "../pages/Profile";
import ProfileForm from "../pages/ProfileForm";
const App = () => {
  const [open, setopen] = useState(true);
  const [role, setrole] = useState(() => {
    return localStorage.getItem("role") || "user";
  });

  const [AdminName, setAdminName] = useState(() => {
    return localStorage.getItem("AdminName") || "None";
  });

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
      <Navbar
        setopen={setopen}
        logout={auth.logout}
        role={role}
        username={AdminName}
        authenticated={auth.authenticated}
        setAdminName={setAdminName}
        setrole={setrole}
      />
      {/* <Sidebar/> */}

      <Routes>
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
          path="/login"
          element={
            <Loginpage
              setAdminName={setAdminName}
              login={auth.login}
              setrole={setrole}
              authenticated={auth.authenticated}
            />
          }
        />{" "}
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
      </Routes>
    </div>
  );
};

export default App;
