import React, { useState, useEffect, useRef } from "react";
import {jwtDecode} from "jwt-decode";
import { Card, Button, Modal, Form, Badge, ProgressBar, Tab, Tabs, Row, Col } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import profilePicture from "../components/OIP.jpg";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, getTokenRemainingTime } from "../utils/auth";
import { FaUserEdit, FaSave, FaTimes, FaSignOutAlt, FaClock, FaChartLine, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import "./Profile.css";

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
      className="container py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="row">
        <div className="col-lg-4 mb-4">
          <Card className="shadow-lg border-0 h-80">
            <Card.Body className="text-center p-4">
              <motion.div
                className="position-relative mx-auto mb-3"
                style={{ width: "150px", height: "150px" }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="rounded-circle img-fluid border border-4 border-primary shadow"
                  style={{ 
                    objectFit: "cover", 
                    width: "100%", 
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0, 180, 255, 0.3)"
                  }}
                />
                {editing && (
                  <motion.div 
                    className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 shadow"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaUserEdit className="text-white" size={18} />
                  </motion.div>
                )}
              </motion.div>

              <h3 className="mb-1">{user.name}</h3>
              <p className="text-muted mb-2">{user.email}</p>
              
              <Badge bg="primary" pill className="px-3 py-2 mb-3 fs-6">
                {user.membershipType || 'Premium Member'}
              </Badge>

              <div className="d-grid gap-2 mt-3">
                <Button
                  variant={editing ? "outline-secondary" : "outline-primary"}
                  onClick={() => setEditing(!editing)}
                  className="d-flex align-items-center justify-content-center"
                >
                  {editing ? (
                    <>
                      <FaTimes className="me-2" /> Cancel Editing
                    </>
                  ) : (
                    <>
                      <FaUserEdit className="me-2" /> Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mt-4">
            <Card.Body>
              <h5 className="d-flex align-items-center mb-3">
                <FaChartLine className="text-primary me-2" />
                Fitness Stats
              </h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Workout Completion</span>
                  <span>75%</span>
                </div>
                <ProgressBar now={75} variant="primary" className="rounded-pill" style={{ height: '8px' }} />
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Goals Achieved</span>
                  <span>4/6</span>
                </div>
                <ProgressBar now={66} variant="success" className="rounded-pill" style={{ height: '8px' }} />
              </div>
              
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Consistency</span>
                  <span>88%</span>
                </div>
                <ProgressBar now={88} variant="info" className="rounded-pill" style={{ height: '8px' }} />
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-8">
          <Card className="shadow-lg border-0 h-80">
            <Card.Body className="p-4">
              <Tabs defaultActiveKey="profile" className="mb-4">
                <Tab eventKey="profile" title="Profile Details">
                  <div className="mt-4">
                    <Row className="g-3">
                      {[                                   //icon: <FaUserEdit />
                        { label: "Full Name", field: "name" },
                        { label: "Email", field: "email" },
                        { label: "Age", field: "age" },
                        { label: "Gender", field: "gender" },
                        { label: "Membership", field: "membershipType" },
                        { label: "Join Date", field: "joinDate" },
                      ].map(({ label, field, icon }) => (
                        <Col md={6} key={field}>
                          <Card className="border-0 shadow-sm mb-3">
                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center">
                                {/*{icon && (
                                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                                    {React.cloneElement(icon, { 
                                      className: "text-primary", 
                                      size: 18 
                                    })}
                                  </div>
                                )}*/}
                                <div className="flex-grow-1 text-center">
                                  <small className="text-muted">{label}</small>
                                  {editing && field !== "membershipType" && field !== "joinDate" ? (
                                    <Form.Control
                                      type="text"
                                      name={field}
                                      value={formData[field] || ""}
                                      onChange={handleChange}
                                      className="text-center border-0 border-bottom rounded-0 px-0"
                                      plaintext
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <p className="mb-0 fw-semibold">
                                        {user[field] || "N/A"}
                                      </p>
                                      <div className="flex-grow-1 mx-2"></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    {editing && (
                      <div className="d-flex justify-content-end mt-3">
                        <Button
                          variant="primary"
                          className="d-flex align-items-center px-4"
                          onClick={handleUpdate}
                        >
                          <FaSave className="me-2" /> Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </Tab>

                <Tab eventKey="activity" title="Recent Activity">
                  <div className="mt-3">
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                      <FaDumbbell className="text-primary me-3" size={24} />
                      <div>
                        <h6 className="mb-0">Completed Full Body Workout</h6>
                        <small className="text-muted">Yesterday at 6:30 PM</small>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                      <FaHeartbeat className="text-danger me-3" size={24} />
                      <div>
                        <h6 className="mb-0">Achieved New Personal Record</h6>
                        <small className="text-muted">2 days ago - Bench Press: 185lbs</small>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal
        show={showSessionModal}
        onHide={() => setShowSessionModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-gradient-primary text-white">
          <Modal.Title className="d-flex align-items-center">
            <FaClock className="me-2" /> Session Expiring Soon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 text-center">
          <div className="mb-4">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h5 className="mb-3">Your session will expire in less than 1 minute</h5>
          <p className="text-muted">Would you like to extend your current session?</p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button
            variant="outline-danger"
            className="d-flex align-items-center me-3"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
          <Button
            variant="primary"
            className="d-flex align-items-center px-4"
            onClick={handleExtendSession}
          >
            <FaClock className="me-2" /> Extend Session
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default ProfilePage;
