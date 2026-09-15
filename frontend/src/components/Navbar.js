import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-symbol">♪</span>
          <div className="logo-text">
            <span className="logo-name">SHAWN'S</span>
            <span className="logo-sub">Academy of Music</span>
          </div>
        </Link>

        <div className="nav-menu">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
          <a href="#products" onClick={(e) => scrollToSection(e, 'products')}>Products</a>
          <Link to="/production">Production</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-actions">
          <a href="https://instagram.com/shawn_mp.4" target="_blank" rel="noopener noreferrer" className="nav-social">
            <FaInstagram />
          </a>
          <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="nav-book-btn">
            Book a Session
          </a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu-open' : ''}`}>
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
        <a href="#products" onClick={(e) => scrollToSection(e, 'products')}>Products</a>
        <Link to="/production">Production</Link>
        <Link to="/blog">Blog</Link>
        <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')}>Book a Session</a>
        <Link to="/contact">Contact</Link>
        <a href="https://instagram.com/shawn_mp.4" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </nav>
  );
};

export default Navbar;