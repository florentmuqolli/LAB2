import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import Profile from "../components/OIP.jpg"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest._retry) {
      
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          setSessionExpired(true);  
          return Promise.reject(error);
        }
        
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          { refreshToken }
        );
        
        localStorage.setItem("accessToken", response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed - showing modal");
        setSessionExpired(true);  
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  const extendSession = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        "http://localhost:5000/api/auth/refresh-token",
        { refreshToken }
      );
      
      localStorage.setItem("accessToken", response.data.accessToken);
      setSessionExpired(false);
      fetchProfile();
    } catch (error) {
      console.error("Refresh failed:", error);
      logout();
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to fetch profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put("/auth/me", formData);
      setUser(res.data);
      setEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {sessionExpired && (
  <div 
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style={{ 
      backgroundColor: "rgba(0,0,0,0.5)", 
      zIndex: 1050 
    }}
  >
    <div className="card p-4" style={{ maxWidth: 400 }}>
      <h5 className="mb-3">Session Expired</h5>
      <p>Your session has expired. Do you want to extend it?</p>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button 
          className="btn btn-secondary" 
          onClick={logout}
        >
          Logout
        </button>
        <button 
          className="btn btn-primary" 
          onClick={extendSession}
        >
          Extend Session
        </button>
      </div>
    </div>
  </div>
)}
      <div className="card shadow-lg border-0 p-4 rounded-4">
        <div className="text-center mb-4">
          <motion.img
            src={Profile}
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
            ["Join Date", "joinDate"]
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
    </motion.div>
  );
};

export default ProfilePage;
