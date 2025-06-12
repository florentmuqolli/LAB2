import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Form, Button, Container, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUserPlus, FaArrowLeft, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import PageWrapper from "../components/PageWrapper";
import "./styling/Login.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", form, {
        withCredentials: true
      });
      toast.success("Registered");

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
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
                  <FaUserPlus size={28} className="me-3" />
                  <div>
                    <h2 className="mb-0">Join Our Community</h2>
                    <small className="opacity-75">Create your account</small>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Body className="p-4 bg-dark">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light small mb-1">Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-secondary border-secondary">
                        <FaUser className="text-white" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="py-2 bg-dark text-white border-secondary"
                        minLength={3}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your full name.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

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
                    <Form.Text className="text-muted small">
                      At least 6 characters
                    </Form.Text>
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
                        <FaUserPlus className="me-2" />
                      )}
                      Create Account
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0 text-muted small">
                      By registering, you agree to our Terms and Privacy Policy
                    </p>
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="bg-secondary p-4 border-0 text-center">
                <p className="mb-0 text-light d-inline-flex align-items-center justify-content-center">
                  Already have an account?
                  <Button 
                    variant="link" 
                    className="text-decoration-none p-0 ms-1 text-danger"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
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

export default Register;