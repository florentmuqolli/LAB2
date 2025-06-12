import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="fitness-footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-text">Questions? Call 1-800-FIT-NESS</p>
          <div className="footer-links">
            <div className="footer-link-column">
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/trainers">Our Trainers</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/progress-tracking">Progress Tracking</Link></li>
              </ul>
            </div>
            <div className="footer-link-column">
              <ul>
                <li><Link to="/help-center">Help Center</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/nutrition">Nutrition Guides</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="footer-link-column">
              <ul>
                <li><Link to="/account">Your Account</Link></li>
                <li><Link to="/programs">Workout Programs</Link></li>
                <li><Link to="/corporate">Corporate Wellness</Link></li>
                <li><Link to="/exclusive">Exclusive Content</Link></li>
              </ul>
            </div>
            <div className="footer-link-column">
              <ul>
                <li><Link to="/blog">Fitness Blog</Link></li>
                <li><Link to="/contact">Contact Coaches</Link></li>
                <li><Link to="/partners">Health Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-language">
            <select className="form-select">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
          <p className="footer-country">TopFit International</p>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
        <div className="footer-disclaimer">
          <p>© 2023 TopFit, Inc. All rights reserved.</p>
          <p>The information provided is for educational purposes only and is not intended as medical advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;