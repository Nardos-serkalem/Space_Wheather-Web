import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./admin/context/AuthContext";
import RequireAuth from "./admin/routes/RequireAuth";

// Admin pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ManageResearch from "./admin/pages/ManageResearch";
import ManageEvents from "./admin/pages/ManageEvents";
import ManageStaff from "./admin/pages/ManageStaff";


// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Research from "./pages/Research";
import Conference from "./pages/Conference";
import StaffProfile from "./pages/StaffProfile";
import SpaceWeather from "./pages/SpaceWeather";
import Publications from "./pages/Publications";
import ResearchDomains from "./pages/ResearchDomains";

import "./index.css";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-[Poppins]">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/domains" element={<ResearchDomains />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/staff-profile" element={<StaffProfile />} />
          <Route path="/space-weather" element={<SpaceWeather />} />
          <Route path="/publications" element={<Publications />} />

          {/* Redirect /admin to /admin/login */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* Admin login (unprotected) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/manage-research"
            element={
              <RequireAuth>
                <ManageResearch />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/manage-events"
            element={
              <RequireAuth>
                <ManageEvents />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/manage-staff"
            element={
              <RequireAuth>
                <ManageStaff />
              </RequireAuth>
            }
          />

          
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
