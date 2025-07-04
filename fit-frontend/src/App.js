import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from './pages/About';
import Classes from './pages/Classes';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PageWrapper from "./components/PageWrapper";
import ProfilePage from "./pages/Profile";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyWorkoutPlan from "./pages/MyWorkoutPlan";
import TrainerDashboard from "./pages/TrainerDashboard";
import RefreshTest from "./components/RefreshTest";

const AppRoutes = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<RefreshTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />      
          <Route path="/my-plans" element={<PageWrapper><ProtectedRoute requiredRole="member"><MyWorkoutPlan /></ProtectedRoute></PageWrapper>} />
          <Route
            path="/trainers"
            element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerDashboard />
              </ProtectedRoute>
            }
          /> 
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
