import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaAdjust, FaUser, FaDumbbell, FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const role = localStorage.getItem('role'); 

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
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    if (role === 'admin') {
      navigate("/dashboard");
    } else if (role === 'trainer') {
      navigate("/trainers");
    } 
  }

  if (loading) return <LoadingSpinner />;

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Fitness System</Link>
      <div className="ms-auto">
        {isLoggedIn ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              {(role === 'admin' || role === 'trainer') && (
                <>
                  <li>
                    <Link className="dropdown-item" onClick={handleNavigate}>
                      <FaAdjust className="me-2" /> Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                </>
              )}
              <li>
                <Link className="dropdown-item" to="/profile">
                  <FaUser className="me-2" /> Profile
                </Link>
              </li>
              {role !== 'admin' && role !== 'trainer' && (
                <>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/my-plans">
                      <FaDumbbell className="me-2" /> Workout
                    </Link>
                  </li>
                </>
              )}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  <FaArrowLeft className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;