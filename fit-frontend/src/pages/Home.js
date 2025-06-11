import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import { FaChartLine, FaUserShield, FaDumbbell } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return (
    <PageWrapper>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your Fitness Journey</h1>
            <p className="hero-subtitle">
              "Push yourself, because no one else is going to do it for you."
            </p>
            {!isLoggedIn && (
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-lg me-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Login
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className="features-section py-5">
          <div className="container">
            <h2 className="section-title text-center mb-5">
              Elevate Your Training
            </h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4">
                      <FaChartLine size={32} />
                    </div>
                    <h3 className="card-title h5">Track Your Progress</h3>
                    <p className="card-text text-muted">
                      Monitor your growth with detailed analytics and workout
                      history.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon bg-info bg-opacity-10 text-info rounded-circle mx-auto mb-4">
                      <FaUserShield size={32} />
                    </div>
                    <h3 className="card-title h5">Personalized Plans</h3>
                    <p className="card-text text-muted">
                      Custom fitness plans tailored to your goals and skill
                      level.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-4">
                      <FaDumbbell size={32} />
                    </div>
                    <h3 className="card-title h5">Expert Guidance</h3>
                    <p className="card-text text-muted">
                      Learn from certified trainers with proven methodologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="motivation-section py-5 bg-light">
          <div className="container text-center">
            <blockquote className="blockquote fs-3 text-primary mb-4">
              "Discipline is doing what needs to be done, even when you don't
              want to do it."
            </blockquote>
            <p className="lead text-muted">
              Consistency builds confidence. We're here to help you stay on
              track.
            </p>
          </div>
        </section>
        {!isLoggedIn && (
          <section className="cta-section py-5 bg-primary text-white">
            <div className="container text-center">
              <h2 className="mb-4">Ready to Transform Your Fitness?</h2>
              <Link
                to="/register"
                className="btn btn-light btn-lg px-4 me-3"
              >
                Join Now
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-light btn-lg px-4"
              >
                Member Login
              </Link>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;