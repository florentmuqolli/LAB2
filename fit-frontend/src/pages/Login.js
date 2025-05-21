import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
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
      const response = await axios.post("http://localhost:5000/api/auth/login", form, {
        withCredentials: true
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("role", response.data.user.role); 
      console.log('Role: ',response.data.user.role);

      toast.success("Logged in");

      setTimeout(() => {
        setLoading(false);
        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.user.role === "trainer") {
          navigate("/dashboard/trainers");
        } else {
          navigate("/");
        }
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary" disabled={loading} onClick={handleSubmit}>
          {loading ? "Logging in..." : "Login"}
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

export default Login;
