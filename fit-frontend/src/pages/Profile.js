import { useState, useEffect, useRef } from "react";
import {jwtDecode} from "jwt-decode";
import { Modal, Button } from "react-bootstrap"; 
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import profilePicture from "../components/OIP.jpg";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, getTokenRemainingTime } from "../utils/auth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const navigate = useNavigate();
  const modalShownRef = useRef(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      const remaining = getTokenRemainingTime(token);

      if (remaining > 0 && remaining < 60000 && !modalShownRef.current) { 
        setShowSessionModal(true);
        modalShownRef.current = true;
      }

      if (isTokenExpired(token)) {
        setShowSessionModal(false); 
        modalShownRef.current = false;
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExtendSession = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/refresh-token");
      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      const remaining = getTokenRemainingTime(newAccessToken);
      console.log("New token remaining ms:", remaining);

      if (remaining > 60000) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Session extended");
          setShowSessionModal(false);
          modalShownRef.current = false;
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Failed to extend session");
    } 
  };

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put("/auth/me", formData);
      setUser(res.data);
      setEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <p>Loading or not logged in</p>;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card shadow-lg border-0 p-4 rounded-4">
        <div className="text-center mb-4">
          <motion.img
            src={profilePicture}
            alt="Profile"
            className="rounded-circle mb-3"
            width="120"
            height="120"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
        </div>

        <div className="row g-3">
          {[
            ["Age", "age"],
            ["Gender", "gender"],
            ["Membership", "membershipType"],
            ["Subscription Status", "subscriptionStatus"],
            ["Join Date", "joinDate"],
          ].map(([label, field]) => (
            <div className="col-md-6" key={field}>
              <label className="form-label fw-bold">{label}</label>
              {editing ? (
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="form-control bg-light">{user[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-end mt-4">
          {editing ? (
            <>
              <button className="btn btn-secondary me-2" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      {showSessionModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Session Expiring</h5>
              </div>
              <div className="modal-body">
                <p>Your session is about to expire. Would you like to extend it?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                <button className="btn btn-primary" onClick={handleExtendSession}>Extend Session</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
