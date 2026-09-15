import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSpotify, FaMusic, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-symbol">♪</span>
              <div className="logo-text">
                <span className="logo-name">SHAWN'S</span>
                <span className="logo-sub">Academy of Music</span>
              </div>
            </div>
            <p>
              Empowering musicians to grow in their craft and worship through excellence,
              passion, and purpose.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/shawn_mp.4" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><FaSpotify /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Shawn</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
            <Link to="/production">Music Production</Link>
            <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')}>Book a Session</a>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Music Lessons</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Studio Sessions</a>
            <Link to="/production">Music Production</Link>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Worship Training</a>
            <a href="#products" onClick={(e) => scrollToSection(e, 'products')}>Digital Products</a>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Instagram: @shawn_mp.4</p>
            <p>UPI: shawnsaldana75@okaxis</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p><FaMusic className="footer-note" /> &copy; {new Date().getFullYear()} Shawn's Academy of Music. All rights reserved.</p>
          <p>Made with <FaHeart className="footer-heart" /> & Worship</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;