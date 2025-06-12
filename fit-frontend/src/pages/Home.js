import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import { FaChartLine, FaUserShield, FaDumbbell, FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";
import "./styling/Home.css";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fitnessCategories = [
    {
      title: "Strength Training",
      description: "Build muscle and increase power",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
    },
    {
      title: "Cardio Blast",
      description: "Burn fat and improve endurance",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
    },
    {
      title: "Flexibility & Mobility",
      description: "Enhance your range of motion",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
    },
    {
      title: "Nutrition Plans",
      description: "Fuel your body right",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    }
  ];

  const faqItems = [
    {
      question: "What is TopFit?",
      answer: "FitStream is a premium fitness platform offering personalized workout programs, nutrition guidance, and progress tracking to help you achieve your health goals from home or at the gym."
    },
    {
      question: "How much does TopFit cost?",
      answer: "We offer flexible plans starting at $14.99/month for basic access, $24.99/month for premium features including personalized coaching, and family plans starting at $34.99/month."
    },
    {
      question: "Do I need equipment for the workouts?",
      answer: "Most programs offer equipment-free modifications, but we also provide guidance for those with access to dumbbells, resistance bands, or gym equipment for enhanced results."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! There are no contracts or cancellation fees. You can pause or cancel your membership anytime through your account settings."
    },
    {
      question: "Is TopFit suitable for beginners?",
      answer: "Yes! We have programs for all fitness levels with modifications for each exercise. Our beginner programs focus on proper form and gradual progression."
    },
    {
      question: "How often is new content added?",
      answer: "We add new workout programs weekly and refresh our nutrition content monthly based on the latest scientific research in exercise physiology and sports nutrition."
    }
  ];

  return (
    <PageWrapper>
      <div className="fitness-home">
        <section className="hero-banner">
          <div className="hero-gradient">
            <div className="hero-content container">
              <h1 className="hero-title">Transform Your Body, Elevate Your Life</h1>
              <p className="hero-subtitle">
                Expert-led programs for every fitness level
              </p>
              {!isLoggedIn && (
                <div className="hero-cta">
                  <Link to="/register" className="btn btn-danger btn-lg">
                    Start Your Free Trial <FaArrowRight className="ms-2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="container">
            <h2 className="section-title">Our Most Popular Programs</h2>
            <div className="category-row">
              {fitnessCategories.map((category, index) => (
                <div className="category-card" key={index}>
                  <div 
                    className="category-image"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    <div className="category-overlay">
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section dark-bg">
          <div className="container">
            <h2 className="section-title">Why Our Members Love TopFit</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaChartLine size={40} />
                </div>
                <h3>Smart Progress Tracking</h3>
                <p>Advanced analytics to measure strength gains, endurance improvements, and body composition changes</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FaUserShield size={40} />
                </div>
                <h3>Customized Plans</h3>
                <p>Workouts tailored to your goals, schedule, and available equipment</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FaDumbbell size={40} />
                </div>
                <h3>Certified Coaches</h3>
                <p>Learn from elite trainers with proven results in strength, conditioning, and rehabilitation</p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={activeIndex === index}
                  >
                    {item.question}
                    <svg 
                      viewBox="0 0 26 26" 
                      className="faq-icon" 
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path 
                        d="M10.5 19.3v-8.8H1.7v-1.6h8.8V0h1.6v8.8h8.8v1.6h-8.8v8.8z"
                        className="faq-icon-plus"
                      />
                      <path 
                        d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"
                        className="faq-icon-close"
                      />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isLoggedIn && (
              <div className="text-center mt-5">
                <p className="mb-3">Ready to transform your health? Join thousands of members achieving their fitness goals.</p>
                <div className="subscribe-form">
                  <input type="email" placeholder="Enter your email" className="form-control" />
                  <button className="btn btn-danger">
                    Get Started<FaArrowRight className="ms-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="testimonial-section">
          <div className="container">
            <blockquote>
              "I lost 28 pounds and gained muscle tone in just 3 months with FitStream. The guided programs made it so easy to stay consistent!"
              <span className="author">- Sarah J., Verified Member</span>
            </blockquote>
            {!isLoggedIn && (
              <div className="text-center mt-4">
                <Link to="/register" className="btn btn-outline-light btn-lg">
                  Start Your Transformation Today
                </Link>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Home;