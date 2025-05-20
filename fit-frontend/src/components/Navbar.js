import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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

  if (loading) return <LoadingSpinner />;

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Fitness System</Link>
      <div className="ms-auto">
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </button>
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
