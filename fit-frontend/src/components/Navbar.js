import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaDollarSign,
  FaListAlt,
  FaUser,
  FaDumbbell,
  FaArrowLeft,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      toast.success("Logged out");
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDashboardRedirect = () => {
    if (role === "admin") navigate("/dashboard");
    else if (role === "trainer") navigate("/trainers");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <button 
        className="navbar-toggler d-lg-none" 
        type="button" 
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <Link className="navbar-brand fw-bold text-red fs-3" to="/">
        TOPFIT
      </Link>

      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <Link className="nav-link d-flex align-items-center" to="/">
              <FaHome className="me-1" /> Home
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link d-flex align-items-center" to="/about">
              <FaInfoCircle className="me-1" /> About
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link d-flex align-items-center" to="/classes">
              <FaListAlt className="me-1" /> Classes
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link d-flex align-items-center" to="/pricing">
              <FaDollarSign className="me-1" /> Pricing
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link d-flex align-items-center" to="/contact">
              <FaPhone className="me-1" /> Contact
            </Link>
          </li>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div className="d-lg-none mobile-menu bg-dark p-3">
          <ul className="navbar-nav">
            <li className="nav-item my-2">
              <Link className="nav-link d-flex align-items-center" to="/" onClick={toggleMobileMenu}>
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link d-flex align-items-center" to="/about" onClick={toggleMobileMenu}>
                <FaInfoCircle className="me-2" /> About
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link d-flex align-items-center" to="/classes" onClick={toggleMobileMenu}>
                <FaListAlt className="me-2" /> Classes
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link d-flex align-items-center" to="/pricing" onClick={toggleMobileMenu}>
                <FaDollarSign className="me-2" /> Pricing
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link d-flex align-items-center" to="/contact" onClick={toggleMobileMenu}>
                <FaPhone className="me-2" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="d-flex align-items-center ms-auto">
        {isLoggedIn ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUser className="me-1" /> Profile
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end bg-dark border-secondary"
              aria-labelledby="profileDropdown"
            >
              {(role === "admin" || role === "trainer") && (
                <>
                  <li>
                    <button
                      className="dropdown-item text-white bg-dark"
                      onClick={handleDashboardRedirect}
                    >
                      <FaUser className="me-2" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-secondary" />
                  </li>
                </>
              )}

              <li>
                <Link className="dropdown-item text-white bg-dark" to="/profile">
                  <FaUser className="me-2" />
                  Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider bg-secondary" /></li>

              {role === "member" && (
                <li>
                  <Link className="dropdown-item text-white bg-dark" to="/my-plans">
                    <FaDumbbell className="me-2" />
                    Workout Plans
                  </Link>
                </li>
              )}

              <li><hr className="dropdown-divider bg-secondary" /></li>
              <li>
                <button
                  className="dropdown-item text-danger bg-dark"
                  onClick={handleLogout}
                >
                  <FaArrowLeft className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-danger">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;