import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Dashboard from "../components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Profile from "../pages/Profile";
const App = () => {
  const [open, setopen] = useState(true)
  const [role, setrole] = useState(() => {
    return localStorage.getItem("role") || "user";
  });

  const [AdminName, setAdminName] = useState(() => {
    return localStorage.getItem("AdminName") || "AdminName";
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
      {/* <ToastContainer/> */}
      <Navbar
      setopen={
        setopen
      }
        logout={auth.logout}
        role={role}
        username={AdminName}
        authenticated={auth.authenticated}
      />
     {/* <Sidebar/> */}
       
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard token={auth.token} role={role} username={AdminName}  setopen={setopen} open={
        open
      } />
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
        /> <Route
          path="/profile"
          element={
            <Profile
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
