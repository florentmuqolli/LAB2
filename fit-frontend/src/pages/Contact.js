import React, { useState } from 'react';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Footer from '../components/Footer';
import "./styling/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: <FaMapMarkerAlt size={24} className="text-danger" />,
      title: "Our Location",
      detail: "20 W 34th St., New York, NY 10001"
    },
    {
      icon: <FaPhone size={24} className="text-danger" />,
      title: "Phone",
      detail: "(123) 456-7890"
    },
    {
      icon: <FaEnvelope size={24} className="text-danger" />,
      title: "Email",
      detail: "support@topfit.com"
    }
  ];

  return (
    <PageWrapper>
      <div className="fitness-contact" style={{ backgroundColor: '#141414', color: 'white' }}>
        <section className="contact-hero py-5" style={{
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
              <h1 className="display-4 fw-bold mb-4">Get In Touch</h1>
              <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Have questions? Our team is here to help you with anything you need.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="py-5">
          <div className="container py-5">
            <div className="row g-5">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-form p-4" style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px'
                }}>
                  <h3 className="mb-4">Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label text-light">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="form-control bg-dark text-white border-secondary" 
                        required 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="form-control bg-dark text-white border-secondary" 
                        required 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-light">Message</label>
                      <textarea 
                        name="message" 
                        value={form.message} 
                        onChange={handleChange} 
                        className="form-control bg-dark text-white border-secondary" 
                        rows="5" 
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-danger w-100 py-3 d-flex align-items-center justify-content-center"
                    >
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>

              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-info p-4 h-100" style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px'
                }}>
                  <h3 className="mb-4">Contact Information</h3>
                  <p className="text-secondary mb-5">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you.
                  </p>

                  <div className="contact-methods">
                    {contactMethods.map((method, index) => (
                      <div key={index} className="d-flex mb-4">
                        <div className="me-4 mt-1">
                          {method.icon}
                        </div>
                        <div>
                          <h5 className="mb-1">{method.title}</h5>
                          <p className="text-secondary mb-0">{method.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <h5 className="mb-3">Business Hours</h5>
                    <ul className="list-unstyled text-secondary">
                      <li className="mb-2">Monday - Friday: 9am - 8pm</li>
                      <li className="mb-2">Saturday: 10am - 6pm</li>
                      <li>Sunday: 10am - 4pm</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-5 bg-dark">
          <div className="container py-4">
            <h3 className="text-center mb-5">Our Location</h3>
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179035!2d-73.987844924017!3d40.74844047138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1711234567890!5m2!1sen!2sus" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  );
};

export default Contact;