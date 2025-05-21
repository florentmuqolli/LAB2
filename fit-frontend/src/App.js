import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./pages/Home.css";

const AppRoutes = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && !isLoggedIn && <Navbar />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </AnimatePresence>
    </>
  );
};

function App() {

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer autoClose={2000} position="top-right" />
    </>
  );
}

export default App;
