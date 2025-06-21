import React from 'react';
import { FaFire, FaStar, FaCrown, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';
import "./styling/Pricing.css";

const Pricing = () => {
  const plans = [
    { 
      name: 'Basic', 
      price: '$29', 
      period: 'month',
      featured: false,
      icon: <FaFire className="text-danger" />,
      features: [
        'Access to all basic workouts',
        '1 personal training session/month',
        'Standard progress tracking',
        'Email support'
      ] 
    },
    { 
      name: 'Standard', 
      price: '$49', 
      period: 'month',
      featured: true,
      icon: <FaStar className="text-warning" />,
      features: [
        'Everything in Basic',
        '4 personal training sessions/month',
        'Access to group classes',
        'Advanced analytics',
        'Priority support'
      ],
      popular: true
    },
    { 
      name: 'Premium', 
      price: '$69', 
      period: 'month',
      featured: false,
      icon: <FaCrown className="text-primary" />,
      features: [
        'Everything in Standard',
        'Unlimited personal training',
        'Custom nutrition plan',
        '1-on-1 coaching calls',
        'VIP support',
        'Early access to new features'
      ] 
    },
  ];

  return (
    <PageWrapper>
      <div className="fitness-pricing" style={{ backgroundColor: '#141414', color: 'white' }}>
        <section className="pricing-hero py-5" style={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b) center/cover',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-4 fw-bold mb-4">Choose Your Plan</h1>
              <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Flexible options for every fitness level. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="py-5">
          <div className="container py-5">
            <div className="row g-4 justify-content-center">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  className="col-lg-4 col-md-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`pricing-card h-100 ${plan.featured ? 'featured' : ''}`} style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: plan.featured ? '2px solid #e50914' : '1px solid #333',
                    transition: 'all 0.3s ease'
                  }}>
                    {plan.popular && (
                      <div className="popular-badge" style={{
                        position: 'absolute',
                        top: '0',
                        right: '20px',
                        backgroundColor: '#e50914',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '0 0 8px 8px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="pricing-header p-4 text-center" style={{
                      borderBottom: '1px solid #333'
                    }}>
                      <div className="icon-wrapper mb-3" style={{ fontSize: '2rem' }}>
                        {plan.icon}
                      </div>
                      <h3 className="mb-1">{plan.name}</h3>
                      <div className="price-display">
                        <span className="display-4 fw-bold">{plan.price}</span>
                        <span className="text-muted">/{plan.period}</span>
                      </div>
                    </div>
                    
                    <div className="pricing-body p-4">
                      <ul className="list-unstyled">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="mb-3 d-flex align-items-start">
                            <FaCheck className="text-success me-2 mt-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pricing-footer p-4 text-center">
                      <button className={`btn ${plan.featured ? 'btn-danger' : 'btn-outline-light'} w-100 py-3`}>
                        Get {plan.name}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-5 bg-dark">
          <div className="container py-4">
            <h3 className="text-center mb-5">Frequently Asked Questions</h3>
            <div className="accordion" id="pricingFAQ">
              {[
                {
                  question: "Can I change or cancel my plan anytime?",
                  answer: "Yes! You can upgrade, downgrade or cancel your plan at any time with no penalties."
                },
                {
                  question: "Do you offer family or group plans?",
                  answer: "We offer special discounted rates for groups of 3 or more. Contact our support team for details."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "We offer a 7-day free trial for all new members to try our Basic plan."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and in some regions, Apple Pay and Google Pay."
                }
              ].map((item, index) => (
                <div key={index} className="accordion-item border-0 mb-3" style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px'
                }}>
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed text-white" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#faq${index}`}
                      style={{
                        backgroundColor: '#1a1a1a',
                        color: 'white'
                      }}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div 
                    id={`faq${index}`} 
                    className="accordion-collapse collapse" 
                    data-bs-parent="#pricingFAQ"
                  >
                    <div className="accordion-body text-secondary">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-5 text-center">
          <div className="container">
            <h3 className="mb-4">Still have questions?</h3>
            <p className="text-secondary mb-4">Our team is happy to help you choose the perfect plan</p>
            <button className="btn btn-outline-light px-5 py-3">
              Contact Support
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Pricing;