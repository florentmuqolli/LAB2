import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaSignInAlt, FaArrowLeft, FaLock, FaEnvelope } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import PageWrapper from "../components/PageWrapper";
import "./styling/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
      navigate("/dashboard");
    } 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", response.data.accessToken); 
      localStorage.setItem("role", response.data.user.role); 

      toast.success("Logged in");

      setTimeout(() => {
        setLoading(false);
        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.user.role === "trainer") {
          navigate("/trainers");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PageWrapper>
      <div style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
        <Container className="d-flex align-items-center justify-content-center py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-100"
            style={{ maxWidth: "450px" }}
          >
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-dark text-white">
              <Card.Header className="bg-danger text-white p-4 border-0">
                <div className="d-flex align-items-center">
                  <FaSignInAlt size={28} className="me-3" />
                  <div>
                    <h2 className="mb-0">Welcome Back</h2>
                    <small className="opacity-75">Sign in to your account</small>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Body className="p-4 bg-dark">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light small mb-1">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-secondary border-secondary">
                        <FaEnvelope className="text-white" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="py-2 bg-dark text-white border-secondary"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-light small mb-1">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-secondary border-secondary">
                        <FaLock className="text-white" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="py-2 bg-dark text-white border-secondary"
                        minLength={6}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-grid gap-2 mb-3">
                    <Button 
                      variant="danger" 
                      type="submit" 
                      disabled={loading}
                      className="d-flex align-items-center justify-content-center py-2"
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        <FaSignInAlt className="me-2" />
                      )}
                      Sign In
                    </Button>
                  </div>

                  <div className="text-center mb-3">
                    <Button 
                      variant="link" 
                      className="text-decoration-none text-light small"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="bg-secondary p-4 border-0 text-center">
                  <p className="mb-0 text-light d-inline-flex align-items-center justify-content-center">
                  Don't have an account?
                  <Button 
                    variant="link" 
                    className="text-decoration-none p-0 ms-1 text-danger"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Button>
                </p>
              </Card.Footer>
            </Card>

            <div className="text-center mt-4">
              <Button 
                variant="outline-light" 
                onClick={() => navigate("/")}
                className="d-flex align-items-center mx-auto"
              >
                <FaArrowLeft className="me-2" /> Back to Home
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default Login;