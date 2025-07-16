import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Contributors from "../pages/Contributors";
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
import LoaderModal from "../components/LoaderModal"
import PDFgenerator from "../components/PDFgenerator";
const App = () => {
  const [open, setopen] = useState(false);
  const [role, setrole] = useState(() => localStorage.getItem("role") || "user");
  const [AdminName, setAdminName] = useState(() => localStorage.getItem("AdminName") || "None");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();
  const loadpopup=auth.loading

  useEffect(() => {
    if (!auth.authenticated) {
      navigate("/login", { replace: true });
    }
  }, [auth.authenticated]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      {/* {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-2">Loading...</h2>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
    </div>
  </div>
)} */}


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
              setLoading={setLoading}
            />
          }
        />
        <Route path="/contributors" element={<Contributors/>} />

        {/* Protected routes with sidebar layout */}
        <Route element={<SidebarLayout role={role} setopen={setopen} open={open} />}>
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
                username={AdminName}
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
             <Route path="/pdfgenerator" element={<PDFgenerator/>}>

        </Route>

        </Route>
     
      </Routes>
            <LoaderModal  loading={loadpopup} message="Fetching data..." />
      
    </div>
  );
};

export default App;

