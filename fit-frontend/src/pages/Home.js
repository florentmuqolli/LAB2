import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return (
    <PageWrapper>
      <div className="home-container">
        <section className="hero-section">
          <div className="overlay">
            <h1>Fitness Management System</h1>
            <p>"Push yourself, because no one else is going to do it for you."</p>
            <Link to="/register" className="cta-button">Get Started</Link>
          </div>
        </section>

        <section className="features-section">
          <h2>What We Offer</h2>
          <div className="features">
            <div className="feature-card">
              <h3>Track Your Progress</h3>
              <p>Stay motivated by logging workouts and monitoring your growth.</p>
            </div>
            <div className="feature-card">
              <h3>Personalized Plans</h3>
              <p>Get customized fitness plans tailored to your goals and level.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Advice</h3>
              <p>Learn from certified trainers and health professionals.</p>
            </div>
          </div>
        </section>

        <section className="motivation-section">
          <blockquote>
            "Discipline is doing what needs to be done, even if you don’t want to do it."
          </blockquote>
          <p>Consistency builds confidence. We're here to help you stay on track.</p>
        </section>
        {!isLoggedIn && 
        <section className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <Link to="/login" className="cta-button">Login</Link>
        </section>}
      </div>
    </PageWrapper>
  );
};

export default Home;
