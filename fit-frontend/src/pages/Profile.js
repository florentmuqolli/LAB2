import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setTimeout(() => {
          setUser(res.data);
          setFormData(res.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/auth/me", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
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
      <div className="card shadow-lg border-0 p-4 rounded-4">
        <div className="text-center mb-4">
          <motion.img
            src={user?.profilePicture || "https://via.placeholder.com/120"}
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
