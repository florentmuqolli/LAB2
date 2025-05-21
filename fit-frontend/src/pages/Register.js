import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import PageWrapper from "../components/PageWrapper";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
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
      <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Back
        </button>
      </form>
    </div>
    </PageWrapper>
  );
};

export default Register;
