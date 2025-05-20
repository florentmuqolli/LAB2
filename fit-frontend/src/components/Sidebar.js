import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Sidebar = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? "active" : "";

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
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">Fitness System</h4>
      <ul className="nav flex-column">
        <li className={`nav-item ${isActive("/dashboard/members")}`}>
          <Link className="nav-link text-white" to="/dashboard/members">Members</Link>
        </li>
        <li className={`nav-item ${isActive("/dashboard/subscriptions")}`}>
          <Link className="nav-link text-white" to="/dashboard/subscriptions">Subscriptions</Link>
        </li>
        <li className={`nav-item ${isActive("/dashboard/trainers")}`}>
          <Link className="nav-link text-white" to="/dashboard/trainers">Trainers</Link>
        </li>
      </ul>
      <div className="mt-auto pt-4">
        <button className="btn btn-danger" onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
