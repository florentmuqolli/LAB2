import React from 'react';
import { FaDumbbell, FaHeartbeat, FaUsers, FaChartLine, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';
import "./styling/About.css";

const About = () => {
  const features = [
    {
      icon: <FaDumbbell size={40} />,
      title: "Expert Training",
      description: "Access world-class training programs designed by certified fitness professionals"
    },
    {
      icon: <FaHeartbeat size={40} />,
      title: "Health Focused",
      description: "Programs designed to improve both physical and mental wellbeing"
    },
    {
      icon: <FaUsers size={40} />,
      title: "Community Support",
      description: "Join a thriving community of fitness enthusiasts"
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Progress Tracking",
      description: "Advanced tools to monitor and visualize your fitness journey"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Head Trainer",
      bio: "10+ years experience in strength and conditioning",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Williams",
      role: "Nutrition Specialist",
      bio: "Registered dietitian and sports nutrition expert",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Yoga Instructor",
      bio: "Specializes in mobility and functional movement",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  return (
    <PageWrapper>
      <div className="fitness-about" style={{ backgroundColor: '#141414', color: 'white' }}>
        <section className="about-hero py-5" style={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b) center/cover',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-3 fw-bold mb-4">Our Fitness Story</h1>
              <p className="lead" style={{ maxWidth: '700px' }}>
                Transforming lives through innovative training programs and community support since 2018
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-5">
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="fw-bold mb-4">Our Mission</h2>
                  <p className="fs-5">
                    We're dedicated to breaking down barriers to fitness by providing accessible, science-backed training programs that deliver real results.
                  </p>
                  <p className="fs-5">
                    Our platform combines cutting-edge technology with expert knowledge to create personalized experiences that adapt as you progress.
                  </p>
                </motion.div>
              </div>
              <div className="col-lg-6">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="ratio ratio-16x9">
                    <iframe 
                      src="https://www.youtube.com/embed/embed/MLpWrANjFbI" 
                      title="About our fitness program" 
                      allowFullScreen
                      style={{ borderRadius: '8px' }}
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-dark">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Why Choose Us</h2>
              <p className="text-muted">What makes our approach different</p>
            </div>
            <div className="row g-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="col-md-6 col-lg-3"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-card p-4 h-100 text-center" style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="icon-wrapper mb-3" style={{ color: '#e50914' }}>
                      {feature.icon}
                    </div>
                    <h4>{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5" style={{ background: 'linear-gradient(to right, #e50914, #b20710)' }}>
          <div className="container py-4">
            <div className="row text-center">
              <div className="col-md-3 mb-4 mb-md-0">
                <h2 className="display-4 fw-bold">10K+</h2>
                <p className="mb-0">Active Members</p>
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <h2 className="display-4 fw-bold">50+</h2>
                <p className="mb-0">Training Programs</p>
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <h2 className="display-4 fw-bold">15</h2>
                <p className="mb-0">Expert Trainers</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold">24/7</h2>
                <p className="mb-0">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Meet Our Team</h2>
              <p className="text-muted">The experts behind your transformation</p>
            </div>
            <div className="row g-4 justify-content-center">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="col-md-6 col-lg-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="team-card text-center p-4" style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px'
                  }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="rounded-circle mb-3" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h4>{member.name}</h4>
                    <p className="text-danger mb-2">{member.role}</p>
                    <p className="text-muted">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 bg-dark">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Success Stories</h2>
              <p className="text-muted">Hear from our members</p>
            </div>
            <div className="row g-4">
              {[1, 2, 3].map((item, index) => (
                <motion.div 
                  key={index}
                  className="col-md-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="testimonial-card p-4 h-100" style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px'
                  }}>
                    <div className="d-flex align-items-center mb-3">
                      <FaTrophy className="text-danger me-2" size={24} />
                      <h5 className="mb-0">Transformation #{index + 1}</h5>
                    </div>
                    <p className="text-muted mb-3">
                      "This program completely changed my life. I lost 25kg and gained so much confidence. The trainers are incredibly supportive!"
                    </p>
                    <div className="d-flex align-items-center">
                      <img 
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`} 
                        alt="Member" 
                        className="rounded-circle me-3" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-0">Member Name</h6>
                        <small className="text-muted">6 months progress</small>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5" style={{ background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b) center/cover' }}>
          <div className="container py-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="display-5 fw-bold mb-4">Ready to Transform Your Life?</h2>
              <button className="btn btn-danger btn-lg px-5 py-3">
                Join Now
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  );
};

export default About;